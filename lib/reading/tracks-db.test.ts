import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { boot, DB, emailOf, mkUser, type Boot } from "../pay/test-setup";

/** The English Reading Studio's three tracks: what a student chose to see, what they hold, and that analytics open with any paid track. */
describe.skipIf(!DB)("reading studio tracks on a real database", () => {
  let B: Boot;
  let S: typeof import("./store");
  let V: typeof import("./views");
  let A: typeof import("./access");
  let none = 0, skills = 0, indian = 0;
  let rzp: InstanceType<typeof import("../pay/test-support").FakeRazorpay>;

  const buy = async (userId: number, label: string, slug: string) => {
    const P = await import("../pay/orders");
    const C = await import("../pay/checkout");
    const { order, accessToken } = await P.createOrder(P.createOrderSchema.parse({ items: [{ sku: `course-${slug}`, qty: 1 }], country: "IN", billing: { name: `Track ${label}`, email: emailOf(label) } }), { userId });
    const started = await C.startCheckout(order.id, { userId, token: accessToken }, { origin: "https://growqr.test", provider: null });
    rzp.pay((started.checkout as { orderId: string }).orderId);
    await C.confirmPayment(order.id, { userId }, {});
  };
  const finish = async (userId: number, kind: "diagnostic" | "essay", skill?: string) => {
    const r = await S.startAssessment(userId, kind, skill ? { skill } : {});
    if (!r.ok) throw new Error(r.error);
    const a = (await S.getAssessment(userId, r.id))!;
    const ids = a.plan.units.flatMap((u) => u.questionIds);
    const qs = await S.questionsByIds(ids);
    let now = a.plan.lastEventAt;
    for (let u = 0; u < a.plan.units.length; u++) { await S.markPhase(userId, r.id, u, "read_start", now); now += 150_000; await S.markPhase(userId, r.id, u, "read_done", now); }
    for (const id of ids) { now += 25_000; await S.submitAnswer(userId, r.id, id, qs.get(id)!.answer as number, 25_000, now); }
    await S.finishAssessment(userId, r.id, now + 500);
    return r.id;
  };

  beforeAll(async () => {
    B = await boot();
    S = await import("./store");
    V = await import("./views");
    A = await import("./access");
    await (await import("../pay/catalogue")).seedCatalogue();
    await S.ensureSeed(undefined, true);
    await B.db.run("DELETE FROM rd_config");
    rzp = new B.T.FakeRazorpay();
    none = await mkUser(B.db, "student", "trknone");
    skills = await mkUser(B.db, "student", "trkskills");
    indian = await mkUser(B.db, "student", "trkindian");
  });
  beforeEach(() => { B.T.setTestEnv(); rzp.install(); });
  afterAll(async () => { rzp.uninstall(); await B.db.closePool(); });

  it("has three tracks, each sold as its own product", async () => {
    expect(A.TRACKS.map((t) => t.id)).toEqual(["skills", "indian", "international"]);
    for (const t of A.TRACKS) expect(await B.db.one("SELECT id FROM pay_products WHERE sku = $1", [`course-${t.slug}`]), t.slug).not.toBeNull();
  });

  it("remembers the tracks a student chose, in a fixed order, and ignores anything unknown", async () => {
    expect(await S.getTracks(none)).toEqual([]);
    expect(await S.setTracks(none, ["international", "bogus", "skills", "skills"])).toEqual(["skills", "international"]);
    expect(await S.getTracks(none)).toEqual(["skills", "international"]);
    expect(await S.setTracks(none, [])).toEqual([]);
  });

  it("choosing a track grants nothing", async () => {
    await S.setTracks(none, ["skills", "indian", "international"]);
    const acc = await A.trackAccess(none);
    expect(acc).toMatchObject({ skills: false, indian: false, analytics: false });
    expect(await S.startAssessment(none, "practice", { levelKey: "A" })).toMatchObject({ ok: false, code: "locked" });
    expect(await S.startAssessment(none, "essay", { skill: "essay-7" })).toMatchObject({ ok: false, code: "locked" });
    await S.setTracks(none, []);
  });

  it("each package opens its own track, and analytics open with either", async () => {
    await buy(skills, "trkskills", "ai-reading-studio");
    await buy(indian, "trkindian", "indian-competitive-reading");
    expect(await A.trackAccess(skills)).toMatchObject({ skills: true, indian: false, analytics: true });
    expect(await A.trackAccess(indian)).toMatchObject({ skills: false, indian: true, analytics: true });
    expect((await S.startAssessment(skills, "essay", { skill: "essay-7" })).ok).toBe(false);
    expect((await S.startAssessment(indian, "essay", { skill: "essay-7" })).ok).toBe(true);
    expect((await S.startAssessment(skills, "fresh")).ok).toBe(true);
    expect((await S.startAssessment(indian, "fresh")).ok).toBe(false);
  });

  it("an essay result is a full analytics page for a holder of any paid track, and a free page for no package", async () => {
    const id = await finish(indian, "diagnostic");
    const v = (await V.buildResults(indian, id))!;
    expect(v.premium).toBe(true);
    expect(v.skills).not.toBeNull();
    const freeId = await finish(none, "diagnostic");
    const f = (await V.buildResults(none, freeId))!;
    expect(f.premium).toBe(false);
    expect(f.skills).toBeNull();
  });

  it("the dashboard lists the three tracks with ownership, progress and a next step", async () => {
    await S.setTracks(indian, ["indian"]);
    const d = await V.buildDashboard(indian);
    expect(d.chosen).toEqual(["indian"]);
    expect(d.tracks.map((t) => t.id)).toEqual(["skills", "indian", "international"]);
    expect(d.tracks.find((t) => t.id === "indian")).toMatchObject({ owned: true });
    expect(d.tracks.find((t) => t.id === "skills")).toMatchObject({ owned: false });
    expect(d.tracks.find((t) => t.id === "indian")!.progress).toMatch(/essay tests/);
    expect(d.tracks.find((t) => t.id === "indian")!.next!.href).toMatch(/^\/reading-tests\/\d+$/);
    expect(d.tracks.every((t) => t.buyHref.includes(`track=${t.id}`))).toBe(true);
    expect(d.analytics).toBe(true);
    expect(d.suggested).toContain("indian");
    const free = await V.buildDashboard(none);
    expect(free.chosen).toEqual([]);
    expect(free.analytics).toBe(false);
    expect(free.tracks.every((t) => !t.owned)).toBe(true);
  });
});
