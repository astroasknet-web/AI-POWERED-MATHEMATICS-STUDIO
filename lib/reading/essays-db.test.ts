import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { boot, DB, emailOf, mkUser, type Boot } from "../pay/test-setup";

/** The essay reading tests on a real database: seeded into the Studio bank, free samples and the paywall, scoring through the Studio, and kept out of the level pathway. */
describe.skipIf(!DB)("essay reading tests on a real database", () => {
  let B: Boot;
  let S: typeof import("./store");
  let V: typeof import("./views");
  let L: typeof import("./essays/library");
  let free = 0, paid = 0;
  let rzp: InstanceType<typeof import("../pay/test-support").FakeRazorpay>;
  const slug = "ai-reading-studio";

  const play = async (userId: number, id: string, right: boolean) => {
    const a = (await S.getAssessment(userId, id))!;
    let now = a.plan.lastEventAt;
    const ids = a.plan.units.flatMap((u) => u.questionIds);
    const qs = await S.questionsByIds(ids);
    await S.markPhase(userId, id, 0, "read_start", now); now += 240_000; await S.markPhase(userId, id, 0, "read_done", now);
    for (const qid of ids) { const q = qs.get(qid)!; now += 30_000; await S.submitAnswer(userId, id, qid, right ? (q.answer as number) : ((q.answer as number) + 1) % 4, 30_000, now); }
    await S.finishAssessment(userId, id, now + 500);
  };

  beforeAll(async () => {
    B = await boot();
    S = await import("./store");
    V = await import("./views");
    L = await import("./essays/library");
    await (await import("../pay/catalogue")).seedCatalogue();
    await S.ensureSeed(undefined, true);
    await B.db.run("DELETE FROM rd_config");
    rzp = new B.T.FakeRazorpay();
    free = await mkUser(B.db, "student", "essayfree");
    paid = await mkUser(B.db, "student", "essaypaid");
  });
  beforeEach(() => { B.T.setTestEnv(); rzp.install(); });
  afterAll(async () => { rzp.uninstall(); await B.db.closePool(); });

  it("seeds 30 essay passages and 300 questions, flagged as the exam collection, and never twice", async () => {
    const t = await L.essayTotals();
    expect(t).toMatchObject({ tests: 30, questions: 300 });
    const again = await S.ensureEssays();
    expect(again).toEqual({ passages: 0, questions: 0 });
    const q = await B.db.one<{ n: number }>("SELECT COUNT(*) AS n FROM rd_questions q JOIN rd_passages p ON p.id = q.passage_id WHERE p.collection = 'exam' AND q.explanation = ''");
    expect(Number(q!.n)).toBe(0);
  });

  it("keeps the essays out of the level pathway and the other Studio pools", async () => {
    const lv = await B.db.one<{ n: number }>("SELECT COUNT(*) AS n FROM rd_passages WHERE collection = 'exam' AND (level_key IS NOT NULL OR is_diagnostic = 1)");
    expect(Number(lv!.n)).toBe(0);
    await (async () => { const P = await import("../pay/orders"); const C = await import("../pay/checkout"); const { order, accessToken } = await P.createOrder(P.createOrderSchema.parse({ items: [{ sku: `course-${slug}`, qty: 1 }], country: "IN", billing: { name: "Essay Paid", email: emailOf("essaypaid") } }), { userId: paid }); const started = await C.startCheckout(order.id, { userId: paid, token: accessToken }, { origin: "https://growqr.test", provider: null }); rzp.pay((started.checkout as { orderId: string }).orderId); await C.confirmPayment(order.id, { userId: paid }, {}); })();
    for (const kind of ["fresh", "timed"] as const) {
      const r = await S.startAssessment(paid, kind);
      if (!r.ok) throw new Error(r.error);
      const a = (await S.getAssessment(paid, r.id))!;
      const ps = await S.passagesByIds(a.plan.units.map((u) => u.passageId));
      for (const p of ps.values()) expect(p.slug.startsWith("essay-"), `${kind} must not pick an essay`).toBe(false);
      await B.db.run("UPDATE rd_assessments SET status = 'submitted', completion = 'partial', submitted_at = UTC_TIMESTAMP(3) WHERE public_id = $1", [r.id]);
    }
    const recall = await S.startAssessment(paid, "recall", {}, new Date(Date.now() + 86_400_000 * 5));
    if (recall.ok) { const a = (await S.getAssessment(paid, recall.id))!; const ps = await S.passagesByIds(a.plan.units.map((u) => u.passageId)); for (const p of ps.values()) expect(p.slug.startsWith("essay-")).toBe(false); }
  });

  it("lets a free student take the three free tests, and sends them to the package for the rest", async () => {
    const cards = (await L.essayCards(free)).cards;
    expect(cards.filter((c) => c.free).map((c) => c.n)).toEqual([6, 11, 20]);
    expect(cards.find((c) => c.n === 6)!.locked).toBe(false);
    expect(cards.find((c) => c.n === 7)!.locked).toBe(true);
    expect(await S.startAssessment(free, "essay", { skill: "essay-7" })).toMatchObject({ ok: false, code: "locked" });
    expect(await S.startAssessment(free, "essay", { skill: "essay-99" })).toMatchObject({ ok: false, code: "none" });
    expect(await S.startAssessment(free, "essay", { skill: "essay-abc" })).toMatchObject({ ok: false, code: "none" });
    const r = await S.startAssessment(free, "essay", { skill: "essay-6" });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const st = (await S.runnerState(free, r.id))!;
    expect(st.units).toHaveLength(1);
    expect(st.units[0].questions).toHaveLength(10);
    expect(st.feedback).toBe(false);
    expect(JSON.stringify(st)).not.toMatch(/"explanation"|"answer"|"reveal"/);
    // starting the same test again resumes it; a different test does not
    const again = await S.startAssessment(free, "essay", { skill: "essay-6" });
    expect(again).toMatchObject({ ok: true, id: r.id, resumed: true });
    await play(free, r.id, false);
  });

  it("scores the test through the Studio, shows the free view to a free student and records the attempt on the card", async () => {
    const cards = (await L.essayCards(free)).cards;
    const c6 = cards.find((c) => c.n === 6)!;
    expect(c6.attempts).toBe(1);
    expect(c6.lastId).not.toBeNull();
    const v = (await V.buildResults(free, c6.lastId!))!;
    expect(v.kind).toBe("essay");
    expect(v.premium).toBe(false);
    expect(v.skills).toBeNull();
    expect(v.overall.score).not.toBeNull();
    expect(v.tiles.total).toBe(10);
    expect(v.tiles.correct).toBe(0);
    const diag = await S.loadHistory(free);
    expect(diag.length).toBe(10); // the answers feed the student's skill history
  });

  it("a package holder takes any test and gets the full analysis; a second test is a separate attempt", async () => {
    const r = await S.startAssessment(paid, "essay", { skill: "essay-7" });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    await play(paid, r.id, true);
    const v = (await V.buildResults(paid, r.id))!;
    expect(v.premium).toBe(true);
    expect(v.tiles.correct).toBe(10);
    expect(v.overall.score).toBeGreaterThan(80);
    expect(v.review!.length).toBe(10);
    expect(v.review!.every((x) => x.explanation.length > 30)).toBe(true);
    const r2 = await S.startAssessment(paid, "essay", { skill: "essay-8" });
    expect(r2.ok && r2.id !== r.id).toBe(true);
    const cards = (await L.essayCards(paid)).cards;
    expect(cards.find((c) => c.n === 7)!.best).toBeGreaterThan(80);
    expect(cards.find((c) => c.n === 7)!.locked).toBe(false);
    expect(cards.find((c) => c.n === 9)!.locked).toBe(false);
  });

  it("the administrator can change which tests are free", async () => {
    const A = await import("./admin");
    const admin = await mkUser(B.db, "admin", "essayadmin");
    expect((await A.saveConfig(admin, { freeEssays: [1, 2, 3, 4] })).ok).toBe(true);
    expect((await L.essayCards(free)).cards.filter((c) => c.free).map((c) => c.n)).toEqual([1, 2, 3, 4]);
    expect((await A.saveConfig(admin, { freeEssays: Array.from({ length: 70 }, (_, i) => i + 1) })).ok).toBe(false);
    await B.db.run("DELETE FROM rd_config");
  });
});
