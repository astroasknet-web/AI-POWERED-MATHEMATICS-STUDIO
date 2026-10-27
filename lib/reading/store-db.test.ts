import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { boot, DB, emailOf, mkUser, type Boot } from "../pay/test-setup";

/**
 * The Reading Studio on a real database: the free starting assessment and its limit, server-side marking, tamper resistance, the paywall, a verified
 * purchase unlocking the package, level progression by mastery, delayed recall, and that a student can never reach another student's assessment.
 * Run with PORTAL_TEST_DATABASE_URL=mysql://root@127.0.0.1:3307/growqr_test DATABASE_SSL=disable.
 */
describe.skipIf(!DB)("reading studio on a real database", () => {
  let B: Boot;
  let S: typeof import("./store");
  let V: typeof import("./views");
  let alice = 0, bob = 0, carol = 0, dan = 0, erin = 0;
  let rzp: InstanceType<typeof import("../pay/test-support").FakeRazorpay>;
  const slug = "ai-reading-studio";

  const keyOf = (q: { format: string; answer: unknown }) => (q.format === "short" ? (q.answer as string[])[0] : q.answer) as number | number[] | string;

  /** Answer an open assessment: every question right, wrong or only some. Reading is recorded first, as the page does. */
  const play = async (userId: number, id: string, how: "right" | "wrong" | "half" | "none" = "right", opts: { readMs?: number; ms?: number; finish?: boolean } = {}) => {
    const a = (await S.getAssessment(userId, id))!;
    const t0 = a.plan.lastEventAt;
    let now = t0;
    for (let u = 0; u < a.plan.units.length; u++) {
      await S.markPhase(userId, id, u, "read_start", now);
      now += opts.readMs ?? 90_000;
      await S.markPhase(userId, id, u, "read_done", now);
    }
    const qs = await S.questionsByIds(a.plan.units.flatMap((u) => u.questionIds));
    let i = 0;
    for (const qid of a.plan.units.flatMap((u) => u.questionIds)) {
      const q = qs.get(qid)!;
      if (how !== "none") {
        const right = how === "right" || (how === "half" && i % 2 === 0);
        const wrongAns = q.format === "match" ? (q.options as { left: string[] }).left.map(() => 0).reverse() : q.format === "short" ? "zzz" : ((q.answer as number) + 1) % (q.options as string[]).length;
        now += opts.ms ?? 20_000;
        const r = await S.submitAnswer(userId, id, qid, right ? keyOf(q) : wrongAns, opts.ms ?? 20_000, now);
        if (!r.ok) throw new Error(r.error);
      }
      i++;
    }
    return opts.finish === false ? null : S.finishAssessment(userId, id, now + 1000);
  };

  const start = async (userId: number, kind: Parameters<typeof S.startAssessment>[1], o: Parameters<typeof S.startAssessment>[2] = {}) => {
    const r = await S.startAssessment(userId, kind, o);
    if (!r.ok) throw new Error(`${kind}: ${r.error}`);
    return r.id;
  };

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
    V = await import("./views");
    await (await import("../pay/catalogue")).seedCatalogue();
    await S.ensureSeed(undefined, true);
    rzp = new B.T.FakeRazorpay();
    alice = await mkUser(B.db, "student", "rdalice");
    bob = await mkUser(B.db, "student", "rdbob");
    carol = await mkUser(B.db, "student", "rdcarol");
    dan = await mkUser(B.db, "student", "rddan");
    erin = await mkUser(B.db, "student", "rderin");
  });
  beforeEach(() => { B.T.setTestEnv(); rzp.install(); });
  afterAll(async () => { rzp.uninstall(); await B.db.closePool(); });

  it("seeds the bank once and never overwrites an administrator's edit", async () => {
    const n = await B.db.one<{ n: number }>("SELECT COUNT(*) AS n FROM rd_questions");
    expect(Number(n!.n)).toBeGreaterThan(100);
    await B.db.run("UPDATE rd_levels SET name = 'Renamed by admin' WHERE level_key = 'A'");
    await S.ensureSeed(undefined, true);
    expect((await B.db.one<{ name: string }>("SELECT name FROM rd_levels WHERE level_key = 'A'"))!.name).toBe("Renamed by admin");
    await B.db.run("UPDATE rd_levels SET name = 'Reading Foundations' WHERE level_key = 'A'");
  });

  it("is sold as a course product on the existing payment catalogue", async () => {
    const p = await B.db.one<{ kind: string; fulfil_ref: string; amount_minor: number }>("SELECT p.kind, p.fulfil_ref, pr.amount_minor FROM pay_products p JOIN pay_prices pr ON pr.product_id = p.id AND pr.currency = 'INR' WHERE p.sku = $1", [`course-${slug}`]);
    expect(p).toMatchObject({ kind: "course", fulfil_ref: slug });
    expect(Number(p!.amount_minor)).toBe(59900);
  });

  it("never sends keys or explanations to the browser for an assessment", async () => {
    const id = await start(alice, "diagnostic");
    const st = (await S.runnerState(alice, id))!;
    const json = JSON.stringify(st);
    expect(json).not.toMatch(/explanation|"answer"|reveal|correct/);
    expect(st.units).toHaveLength(2);
    expect(st.feedback).toBe(false);
    expect(st.units[0].questions.every((q) => !("answer" in q))).toBe(true);
  });

  it("rejects an answer for a question that is not in the assessment, and a forged shape stores nothing odd", async () => {
    const id = await start(alice, "diagnostic");
    const bad = await S.submitAnswer(alice, id, 999999, 1, 1000);
    expect(bad.ok).toBe(false);
    const a = (await S.getAssessment(alice, id))!;
    const qid = a.plan.units[0].questionIds[0];
    expect((await S.submitAnswer(alice, id, qid, 99, 1000)).ok).toBe(true); // out of range: stored as no answer
    const row = await B.db.one<{ selected_json: string | null; skipped: number }>("SELECT selected_json, skipped FROM rd_answers WHERE assessment_id = $1 AND question_id = $2", [a.id, qid]);
    expect(row!.selected_json).toBeNull();
    expect(Number(row!.skipped)).toBe(1);
  });

  it("marks on the server, finishes once, and is deterministic", async () => {
    const id = await start(bob, "diagnostic");
    const done = (await play(bob, id, "right"))!;
    expect(done.id).toBe(id);
    const a = (await S.getAssessment(bob, id))!;
    expect(a.status).toBe("submitted");
    expect(a.result!.score.overall).toBeGreaterThan(80);
    expect(a.result!.score.provisional).toBe(true);
    expect(a.scoringVersion).toBe("rs-1.0");
    const again = await S.finishAssessment(bob, id, Date.now() + 5000);
    expect(again!.id).toBe(id);
    const b = (await S.getAssessment(bob, id))!;
    expect(b.overall).toBe(a.overall);
    expect(b.submittedAt).toBe(a.submittedAt);
    // the same answers, scored again by the engine, give the same score
    const { scoreAssessment } = await import("./scoring");
    const { getConfig } = await import("./store");
    const rescored = scoreAssessment(await S.itemsOf(a), a.result!.timing, await getConfig());
    expect(rescored.overall).toBe(a.overall);
  });

  it("limits free students to the configured number of starting assessments", async () => {
    for (let i = 0; i < 2; i++) { const id = await start(carol, "diagnostic"); await play(carol, id, "half"); }
    const r = await S.startAssessment(carol, "diagnostic");
    expect(r).toMatchObject({ ok: false, code: "limit" });
  });

  it("a free student cannot start practice, mastery, recall, timed, fresh or targeted work", async () => {
    for (const [kind, o] of [["practice", { levelKey: "A" }], ["mastery", { levelKey: "A" }], ["recall", {}], ["timed", {}], ["fresh", {}], ["practice", { skill: "inference" }]] as const) {
      const r = await S.startAssessment(dan, kind, o);
      expect(r, kind).toMatchObject({ ok: false, code: "locked" });
    }
  });

  it("the results page for a free student carries no premium fields and no explanations", async () => {
    const id = await start(dan, "diagnostic");
    await play(dan, id, "half");
    const v = (await V.buildResults(dan, id))!;
    expect(v.premium).toBe(false);
    for (const k of ["skills", "strengths", "weaknesses", "causes", "charts", "plan", "review", "trend", "skillProgress"] as const) expect(v[k], k).toBeNull();
    expect(v.locked).not.toBeNull();
    expect(v.overall.score).not.toBeNull();
    expect(v.tiles.total).toBeGreaterThan(10);
    const json = JSON.stringify(v);
    expect(json).not.toMatch(/"explanation"|correctText|"reveal"/);
    // locked previews only use real counts
    expect(v.locked!.counts.missed).toBe(v.tiles.incorrect + v.tiles.skipped);
  });

  it("another student's assessment is invisible", async () => {
    const id = await start(erin, "diagnostic");
    expect(await S.getAssessment(dan, id)).toBeNull();
    expect(await S.runnerState(dan, id)).toBeNull();
    expect(await V.buildResults(dan, id)).toBeNull();
    expect((await S.submitAnswer(dan, id, 1, 0, 100)).ok).toBe(false);
    expect(await S.finishAssessment(dan, id)).toBeNull();
    await play(erin, id, "right");
  });

  it("clamps a claimed response time to what the server clock allows", async () => {
    const id = await start(alice, "diagnostic");
    const a = (await S.getAssessment(alice, id))!;
    const q = a.plan.units[0].questionIds[0];
    const before = await B.db.one<{ response_ms: number }>("SELECT response_ms FROM rd_answers WHERE assessment_id = $1 AND question_id = $2", [a.id, q]);
    await S.submitAnswer(alice, id, q, 0, 900_000, a.plan.lastEventAt + 4000);
    const row = await B.db.one<{ response_ms: number }>("SELECT response_ms FROM rd_answers WHERE assessment_id = $1 AND question_id = $2", [a.id, q]);
    expect(Number(row!.response_ms) - Number(before?.response_ms ?? 0)).toBeLessThanOrEqual(5500);
    await play(alice, id, "none");
  });

  it("scores a partial completion as partial and leaves it out of progress", async () => {
    const id = await start(alice, "diagnostic");
    const a = (await S.getAssessment(alice, id))!;
    const qs = a.plan.units.flatMap((u) => u.questionIds).slice(0, 4);
    const all = await S.questionsByIds(qs);
    let now = a.plan.lastEventAt;
    for (const q of qs) { now += 15000; await S.submitAnswer(alice, id, q, keyOf(all.get(q)!) as number, 15000, now); }
    await S.finishAssessment(alice, id, now + 1000);
    const done = (await S.getAssessment(alice, id))!;
    expect(done.completion).toBe("partial");
    expect(done.result!.score.skipped).toBeGreaterThan(8);
    const sums = await S.summaries(alice);
    const mine = sums.find((s) => s.id === done.id)!;
    expect(mine.completion).toBe("partial");
    const { trendOf } = await import("./progress");
    expect(trendOf(sums.filter((s) => s.completion === "complete"))?.window.some((w) => w.id === mine.id) ?? false).toBe(false);
  });

  it("flags a repeat of the same passages", async () => {
    const first = await start(bob, "diagnostic");
    const a = (await S.getAssessment(bob, first))!;
    expect(a.repeatOf).not.toBeNull();
    await play(bob, first, "none");
  });

  it("unlocks the package only through a verified payment, then runs the levels by mastery", async () => {
    // a claim of payment does nothing: there is no endpoint or field that grants access
    expect(await S.startAssessment(alice, "practice", { levelKey: "A" })).toMatchObject({ ok: false, code: "locked" });
    await buy(alice, "rdalice");
    // level B is closed until level A is mastered
    expect(await S.startAssessment(alice, "practice", { levelKey: "B" })).toMatchObject({ ok: false, code: "level" });
    // mastery cannot be attempted before the practice
    expect(await S.startAssessment(alice, "mastery", { levelKey: "A" })).toMatchObject({ ok: false, code: "practice" });
    const p = await start(alice, "practice", { levelKey: "A" });
    const st = (await S.runnerState(alice, p))!;
    expect(st.feedback).toBe(true);
    // a practice answer is revealed only once committed, and the first answer is final
    const q = st.units[0].questions[0];
    const qs = (await S.questionsByIds([q.id])).get(q.id)!;
    const wrongFirst = ((qs.answer as number) + 1) % (qs.options as string[]).length;
    const r1 = await S.submitAnswer(alice, p, q.id, wrongFirst, 5000);
    expect(r1).toMatchObject({ ok: true, locked: true, correct: false });
    const r2 = await S.submitAnswer(alice, p, q.id, qs.answer as number, 5000);
    expect(r2).toMatchObject({ ok: true, locked: true, correct: false });
    await play(alice, p, "right");
    const m = await start(alice, "mastery", { levelKey: "A" });
    await play(alice, m, "right");
    const states = await S.levelStatesFor(alice);
    expect(states.find((s) => s.key === "A")!.mastered).toBe(true);
    expect(states.find((s) => s.key === "B")!.unlocked).toBe(true);
    expect((await S.startAssessment(alice, "practice", { levelKey: "B" })).ok).toBe(true);
    const lp = await B.db.one<{ mastered_at: string | null }>("SELECT mastered_at FROM rd_level_progress WHERE user_id = $1 AND level_key = 'A'", [alice]);
    expect(lp!.mastered_at).not.toBeNull();
  });

  it("does not master a level on a failed check, and keeps the next level closed", async () => {
    await buy(bob, "rdbob");
    const p = await start(bob, "practice", { levelKey: "A" });
    await play(bob, p, "right");
    const m = await start(bob, "mastery", { levelKey: "A" });
    await play(bob, m, "wrong");
    const states = await S.levelStatesFor(bob);
    expect(states.find((s) => s.key === "A")!.mastered).toBe(false);
    expect(states.find((s) => s.key === "B")!.unlocked).toBe(false);
  });

  it("premium results carry the full analysis; a refund-free student keeps free-only views", async () => {
    const id = await start(alice, "fresh");
    await play(alice, id, "half");
    const v = (await V.buildResults(alice, id))!;
    expect(v.premium).toBe(true);
    expect(v.locked).toBeNull();
    expect(v.skills!.length).toBeGreaterThan(3);
    expect(v.plan!.days).toHaveLength(7);
    expect(v.review!.length).toBe(v.tiles.total);
    expect(v.review!.some((r) => r.explanation.length > 20)).toBe(true);
    expect(v.charts).not.toBeNull();
  });

  it("opens delayed recall only after the configured gap, and recall is scored without the passage", async () => {
    const early = await S.startAssessment(alice, "recall");
    expect(early).toMatchObject({ ok: false, code: "delay" });
    await B.db.run("INSERT INTO rd_config (k, v_json) VALUES ('recallDelayHours', '0') ON DUPLICATE KEY UPDATE v_json = '0'");
    const r = await S.startAssessment(alice, "recall", {}, new Date(Date.now() + 3600_000));
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const st = (await S.runnerState(alice, r.id))!;
    expect(st.hidePassage).toBe(true);
    expect(st.units[0].body).toBeNull();
    await play(alice, r.id, "right");
    const done = (await S.getAssessment(alice, r.id))!;
    const retention = done.result!.score.dimensions.find((d) => d.dimension === "retention")!;
    expect(retention.score).not.toBeNull();
    expect(done.result!.score.efficiency.wpm).toBeNull();
    await B.db.run("DELETE FROM rd_config WHERE k = 'recallDelayHours'");
  });
});
