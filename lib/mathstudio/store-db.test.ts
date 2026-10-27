import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { boot, DB, mkUser, tag, type Boot } from "../pay/test-setup";
import * as gre from "../tests/gre";

/**
 * The Mathematics Studio engine on a real database: ingest from both live adapters (GRE Quant, Mathematics Speed), idempotency, the cached mastery
 * snapshot, cross-student isolation, and the historical backfill. Run with PORTAL_TEST_DATABASE_URL=mysql://root@127.0.0.1:3307/growqr_test.
 */
describe.skipIf(!DB)("mathematics studio on a real database", () => {
  let B: Boot;
  let S: typeof import("./store");
  let I: typeof import("./ingest");
  let alice = 0, bob = 0;

  /** Insert a submitted Mathematics Speed session with marked answers, the way the studio would. */
  const seedMsSession = async (userId: number, publicId: string, answers: Array<{ skill: string; d: number; correct: boolean; ms: number; allowed: number }>) => {
    const sid = Number(await B.db.val<number>("INSERT INTO ms_sessions (public_id, user_id, kind, ref, plan_json, status, submitted_at, total, correct) VALUES ($1,$2,'practice','A-01','{}','submitted',NOW(),$3,$4) RETURNING id", [publicId, userId, answers.length, answers.filter((a) => a.correct).length]));
    let idx = 0;
    for (const a of answers) await B.db.run("INSERT INTO ms_attempts (session_id, idx, skill, d, response, correct, ms, allowed_ms) VALUES ($1,$2,$3,$4,'x',$5,$6,$7)", [sid, idx++, a.skill, a.d, a.correct ? 1 : 0, a.ms, a.allowed]);
    return sid;
  };
  /** Correct answers for GRE mock n, as the player would store them. */
  const greAllCorrect = (n: number): Record<string, string> => Object.fromEntries(gre.mock(n).map((q) => [String(q.id), String(q.correct)]));

  beforeAll(async () => {
    B = await boot();
    S = await import("./store");
    I = await import("./ingest");
    await S.ensureSeed(undefined, true);
    alice = await mkUser(B.db, "student", "mxalice");
    bob = await mkUser(B.db, "student", "mxbob");
  });
  beforeEach(() => { B.T.setTestEnv(); });
  afterAll(async () => { await B.db.closePool(); });

  it("seeds the taxonomy once", async () => {
    expect(Number(await B.db.val<number>("SELECT COUNT(*) FROM mx_topics"))).toBeGreaterThan(30);
    expect(await S.ensureSeed(undefined, true)).toBe(0); // nothing new on a second run
  });

  it("ingests a GRE mock, maps it to the taxonomy, and scores it", async () => {
    const res = await I.ingestGre(alice, 1, greAllCorrect(1), 1800, new Date());
    expect(res).toMatchObject({ ok: true, created: true });
    const a = (await S.attempts(alice))[0];
    expect(a.source).toBe("gre-quant");
    expect(a.itemCount).toBe(gre.QUESTIONS);
    expect(a.overall).toBeGreaterThan(60);
    const items = await S.loadItems(alice);
    expect(items.length).toBe(gre.QUESTIONS);
    expect(items.every((i) => i.timeMs === null)).toBe(true); // GRE records no per-question time
    const topics = new Set(items.map((i) => i.topic));
    expect(topics.size).toBeGreaterThan(10);
    for (const t of topics) expect(await B.db.val<number>("SELECT COUNT(*) FROM mx_topics WHERE id = $1", [t])).toBe(1);
  });

  it("is idempotent: re-ingesting the same attempt updates in place and never double-counts", async () => {
    const before = (await S.attempts(alice)).length;
    const beforeItems = (await S.loadItems(alice)).length;
    const res = await I.ingestGre(alice, 1, greAllCorrect(1), 1700, new Date());
    expect(res.created).toBe(false);
    expect((await S.attempts(alice)).length).toBe(before);
    expect((await S.loadItems(alice)).length).toBe(beforeItems);
  });

  it("ingests a Mathematics Speed session with per-question timing, so speed is measurable", async () => {
    await seedMsSession(alice, `ms-${tag}-1`, [
      { skill: "add-single", d: 4, correct: true, ms: 3000, allowed: 6000 },
      { skill: "fraction-addsub", d: 6, correct: false, ms: 9000, allowed: 8000 },
      { skill: "pct-of", d: 6, correct: true, ms: 5000, allowed: 7000 },
      { skill: "solve-2step", d: 8, correct: false, ms: 12000, allowed: 10000 },
      { skill: "triangle-angles", d: 6, correct: true, ms: 7000, allowed: 9000 },
    ]);
    const res = await I.ingestMathSpeedSession(alice, `ms-${tag}-1`);
    expect(res).toMatchObject({ ok: true, created: true });
    const ms = (await S.attempts(alice)).find((a) => a.source === "math-speed")!;
    const items = await S.attemptItems(alice, ms.id);
    expect(items.map((i) => i.topic).sort()).toEqual(["fractions-decimals", "mental-calc", "percentages", "algebra-basics", "triangles"].sort());
    expect(items.every((i) => i.timeMs !== null)).toBe(true);
  });

  it("caches per-topic mastery and recomputes it on every ingest", async () => {
    const cached = await S.cachedMastery(alice);
    expect(cached.length).toBeGreaterThan(10);
    const live = (await import("./engine")).masteryByTopic(await S.loadItems(alice), await S.getConfig(), Date.now());
    const liveTri = live.find((m) => m.topic === "triangles")!;
    const cachedTri = cached.find((m) => m.topic === "triangles")!;
    expect(cachedTri.score).toBeCloseTo(liveTri.score, 1);
  });

  it("rejects an attempt that does not satisfy the contract, without storing anything", async () => {
    const res = await S.ingest({ v: 1, source: "bad", sourceRef: "x", userId: alice, label: "bad", startedAt: new Date().toISOString(), finishedAt: new Date().toISOString(), totalMs: 0, items: [{ ref: "1", topic: "not-real", cognitive: "procedure", difficulty: 3, format: "mcq", credit: 1, maxMarks: 1, correct: true, skipped: false, timeMs: null, expectedSecs: null }] });
    expect(res.ok).toBe(false);
    expect(res.errors!.join()).toMatch(/topic/);
  });

  it("keeps one student's analytics invisible to another", async () => {
    expect(await S.getAttempt(bob, (await S.attempts(alice))[0].id)).toBeNull();
    expect(await S.loadItems(bob)).toEqual([]);
    expect(await S.cachedMastery(bob)).toEqual([]);
  });

  it("backfills historical attempts from both sources, idempotently", async () => {
    await B.db.run("INSERT INTO test_attempts (user_id, exam, test_no, raw, total, score, answers_json, seconds) VALUES ($1,'gre-quant',3,20,27,160,$2,2000)", [bob, JSON.stringify(greAllCorrect(3))]);
    await seedMsSession(bob, `ms-${tag}-bob`, [{ skill: "pct-change", d: 5, correct: true, ms: 4000, allowed: 7000 }, { skill: "average", d: 4, correct: false, ms: 6000, allowed: 7000 }]);
    const r1 = await I.backfill(undefined, bob);
    expect(r1.gre).toBe(1);
    expect(r1.mathspeed).toBe(1);
    expect(r1.errors).toBe(0);
    expect((await S.attempts(bob)).length).toBe(2);
    const r2 = await I.backfill(undefined, bob); // idempotent
    expect(r2.gre).toBe(1);
    expect((await S.attempts(bob)).length).toBe(2);
  });
});
