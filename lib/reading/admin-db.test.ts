import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { boot, DB, emailOf, mkUser, type Boot } from "../pay/test-setup";

/**
 * Administrator tools and subscription-status changes on a real database: content approval rules, AI-draft review, validated imports, configuration
 * and its audit trail, withheld small-group reports, and that a refunded or revoked package closes premium again.
 */
describe.skipIf(!DB)("reading studio administration on a real database", () => {
  let B: Boot;
  let S: typeof import("./store");
  let A: typeof import("./admin");
  let V: typeof import("./views");
  let admin = 0, stu = 0;
  let rzp: InstanceType<typeof import("../pay/test-support").FakeRazorpay>;
  const slug = "ai-reading-studio";

  const body = Array.from({ length: 12 }, (_, i) => `Sentence number ${i + 1} explains that careful readers check each claim against the text before they accept it.`).join(" ");
  const draft = (s: string, extra: Record<string, unknown> = {}) => ({
    slug: s, title: "A drafted passage", topic: "study", difficulty: 2, vocabLevel: 2, levelKey: "B", isDiagnostic: false, body,
    questions: [{ ref: `${s}-1`, mode: "practice", format: "mcq", stem: "What do careful readers do before accepting a claim?", options: ["Ignore it", "Check it against the text", "Repeat it aloud", "Skip it"], answer: 1, explanation: "The passage says careful readers check each claim against the text, which rules out ignoring, repeating or skipping it.", skill: "main_idea", qtype: "interpret", difficulty: 1, expectedSecs: 30 }],
    ...extra,
  });

  const buy = async (userId: number, label: string) => {
    const P = await import("../pay/orders");
    const C = await import("../pay/checkout");
    const { order, accessToken } = await P.createOrder(P.createOrderSchema.parse({ items: [{ sku: `course-${slug}`, qty: 1 }], country: "IN", billing: { name: label, email: emailOf(label) } }), { userId });
    const started = await C.startCheckout(order.id, { userId, token: accessToken }, { origin: "https://growqr.test", provider: null });
    rzp.pay((started.checkout as { orderId: string }).orderId);
    await C.confirmPayment(order.id, { userId }, {});
    return order;
  };

  beforeAll(async () => {
    B = await boot();
    S = await import("./store");
    A = await import("./admin");
    V = await import("./views");
    await (await import("../pay/catalogue")).seedCatalogue();
    await S.ensureSeed(undefined, true);
    await B.db.run("DELETE FROM rd_passages WHERE slug IN ('bad-one', 'good-human', 'from-ai')");
    await B.db.run("DELETE FROM rd_levels WHERE level_key IN ('K', 'Z')");
    await B.db.run("DELETE FROM rd_config");
    rzp = new B.T.FakeRazorpay();
    admin = await mkUser(B.db, "admin", "rdadmin");
    stu = await mkUser(B.db, "student", "rdadminstu");
  });
  beforeEach(() => { B.T.setTestEnv(); rzp.install(); });
  afterAll(async () => { rzp.uninstall(); await B.db.closePool(); });

  it("imports a valid passage as a draft, and rejects an invalid one without saving anything", async () => {
    const bad = await A.importDrafts(admin, JSON.stringify([{ ...draft("bad-one"), questions: [{ ...draft("bad-one").questions[0], answer: 9 }] }]), "authored");
    expect(bad.ok).toBe(false);
    expect(bad.message).toMatch(/key is not one of the options/);
    expect(await B.db.one("SELECT id FROM rd_passages WHERE slug = 'bad-one'")).toBeNull();
    const ok = await A.importDrafts(admin, JSON.stringify([draft("good-human")]), "authored");
    expect(ok).toMatchObject({ ok: true, value: 1 });
    const row = await B.db.one<{ status: string; source: string; review_state: string }>("SELECT status, source, review_state FROM rd_passages WHERE slug = 'good-human'");
    expect(row).toMatchObject({ status: "draft", source: "authored", review_state: "unreviewed" });
    expect((await A.importDrafts(admin, "not json", "ai")).ok).toBe(false);
    expect((await A.importDrafts(admin, JSON.stringify([draft("good-human")]), "authored")).ok).toBe(false); // duplicate slug
  });

  it("a passage with validation errors cannot be approved; a valid one can, and drafts are not shown to students", async () => {
    const id = Number((await B.db.one<{ id: number }>("SELECT id FROM rd_passages WHERE slug = 'good-human'"))!.id);
    const q = await B.db.one<{ id: number }>("SELECT id FROM rd_questions WHERE passage_id = $1", [id]);
    expect((await A.setPassageStatus(admin, id, "approved")).ok).toBe(true);
    expect(Number((await B.db.one<{ n: number }>("SELECT COUNT(*) AS n FROM rd_questions WHERE passage_id = $1 AND status = 'approved'", [id]))!.n)).toBe(1);
    await B.db.run("UPDATE rd_questions SET explanation = 'Short.' WHERE id = $1", [q!.id]);
    expect((await A.setPassageStatus(admin, id, "approved")).message).toMatch(/explanation/);
  });

  it("AI-drafted content cannot be approved until a person has reviewed it", async () => {
    expect((await A.importDrafts(admin, JSON.stringify([draft("from-ai")]), "ai")).ok).toBe(true);
    const id = Number((await B.db.one<{ id: number }>("SELECT id FROM rd_passages WHERE slug = 'from-ai'"))!.id);
    const refused = await A.setPassageStatus(admin, id, "approved");
    expect(refused.ok).toBe(false);
    expect(refused.message).toMatch(/reviewed by a person/);
    expect((await A.markReviewed(admin, "passage", id)).ok).toBe(true);
    expect((await A.setPassageStatus(admin, id, "approved")).ok).toBe(true);
    expect((await A.setPassageStatus(admin, id, "archived")).ok).toBe(true);
    const audit = await A.recentAudit(50);
    expect(audit.some((a) => a.action === "content.reviewed" && a.entityId === String(id))).toBe(true);
    expect(audit.some((a) => a.action === "passage.archived")).toBe(true);
  });

  it("an edited question is validated, returns to unreviewed, and is audited", async () => {
    const q = await B.db.one<{ id: number }>("SELECT id FROM rd_questions WHERE ref = 'A-P1'");
    const edit = { id: Number(q!.id), stem: "How many stalls does the market have, about?", optionsText: "Twelve\nThirty\nAbout sixty\nAbout a hundred", keyText: "2", explanation: "The first paragraph says the market has about sixty stalls; twelve and thirty are other figures in the text.", skill: "details", qtype: "locate", difficulty: 1, expectedSecs: 25, status: "approved" };
    expect((await A.updateQuestion(admin, edit)).ok).toBe(true);
    expect((await A.updateQuestion(admin, { ...edit, keyText: "9" })).ok).toBe(false);
    expect((await A.updateQuestion(admin, { ...edit, optionsText: "Same\nsame\nOther" })).ok).toBe(false);
    expect((await B.db.one<{ review_state: string }>("SELECT review_state FROM rd_questions WHERE id = $1", [q!.id]))!.review_state).toBe("unreviewed");
  });

  it("saves scoring settings only when they validate, and writes before and after to the audit log", async () => {
    expect((await A.saveConfig(admin, { weights: { comprehension: 50, qa: 25, inference: 15, efficiency: 15, vocabulary: 10, retention: 5 } })).ok).toBe(false);
    const ok = await A.saveConfig(admin, { weights: { comprehension: 40, qa: 20, inference: 15, efficiency: 10, vocabulary: 10, retention: 5 }, freeDiagnostics: 1 });
    expect(ok.ok).toBe(true);
    const cfg = await S.getConfig();
    expect(cfg.weights.comprehension).toBe(40);
    expect(cfg.freeDiagnostics).toBe(1);
    const entry = (await A.recentAudit(20)).find((a) => a.action === "config.changed")!;
    expect(entry.detail).toMatch(/"before"/);
    expect(entry.detail).toMatch(/"after"/);
    expect((await A.saveConfig(admin, { bands: { support: 80, developing: 60, progressing: 90 } })).ok).toBe(false);
    await A.resetConfig(admin);
    expect((await S.getConfig()).weights.comprehension).toBe(30);
  });

  it("levels can be added, renamed and reordered without touching the algorithm, and bad values are refused", async () => {
    const base = { name: "Reading for Research", objective: "Read academic sources.", position: 11, passPct: 80, minQuestions: 4, masterySize: 6, active: true, timed: false };
    expect((await A.saveLevel(admin, { key: "K", ...base }, true)).ok).toBe(true);
    expect((await A.saveLevel(admin, { key: "K", ...base }, true)).ok).toBe(false);
    expect((await A.saveLevel(admin, { key: "K", ...base, name: "Research Reading", position: 3 }, false)).ok).toBe(true);
    expect((await A.saveLevel(admin, { key: "Z", ...base, passPct: 20 }, true)).ok).toBe(false);
    const lv = await S.loadLevels();
    expect(lv.find((l) => l.key === "K")).toMatchObject({ name: "Research Reading", position: 3, passPct: 80 });
    expect(lv.map((l) => l.position)).toEqual([...lv.map((l) => l.position)].sort((a, b) => a - b));
    const states = await S.levelStatesFor(stu);
    expect(states.find((s) => s.key === "K")!.unlocked).toBe(false); // it sits behind the levels before it
    await A.saveLevel(admin, { key: "K", ...base, active: false }, false);
    expect((await S.loadLevels()).some((l) => l.key === "K")).toBe(false);
  });

  it("withholds group figures below the minimum cohort and never lists an individual", async () => {
    await B.db.run("DELETE FROM rd_config");
    await A.saveConfig(admin, { minCohort: 100 });
    const small = await A.adminStats();
    expect(small.suppressed).toBe(true);
    expect(small.hardTypes).toBeNull();
    expect(small.avgOverall).toBeNull();
    expect(small.conversion).toBeNull();
    const csv = await A.aggregateCsv();
    expect(csv).toMatch(/no row has at least 100 students/);
    expect(csv).not.toMatch(/@/);
    await A.resetConfig(admin);
  });

  it("a refunded or ended package closes premium again, and the free views return", async () => {
    await buy(stu, "rdadminstu");
    const id = await (async () => {
      const r = await S.startAssessment(stu, "diagnostic");
      if (!r.ok) throw new Error(r.error);
      const a = (await S.getAssessment(stu, r.id))!;
      let now = a.plan.lastEventAt;
      const qs = await S.questionsByIds(a.plan.units.flatMap((u) => u.questionIds));
      for (let u = 0; u < a.plan.units.length; u++) { await S.markPhase(stu, r.id, u, "read_start", now); now += 80_000; await S.markPhase(stu, r.id, u, "read_done", now); }
      for (const qid of a.plan.units.flatMap((u) => u.questionIds)) { now += 15_000; const q = qs.get(qid)!; await S.submitAnswer(stu, r.id, qid, q.answer as number, 15_000, now); }
      await S.finishAssessment(stu, r.id, now + 1000);
      return r.id;
    })();
    expect((await V.buildResults(stu, id))!.premium).toBe(true);
    await B.db.run("UPDATE pay_entitlements SET status = 'revoked' WHERE user_id = $1 AND kind = 'course' AND ref = $2", [stu, slug]);
    const free = (await V.buildResults(stu, id))!;
    expect(free.premium).toBe(false);
    expect(free.skills).toBeNull();
    expect(free.review).toBeNull();
    expect(await S.startAssessment(stu, "fresh")).toMatchObject({ ok: false, code: "locked" });
    expect(await (await import("./access")).hasPremium(stu)).toBe(false);
  });
});
