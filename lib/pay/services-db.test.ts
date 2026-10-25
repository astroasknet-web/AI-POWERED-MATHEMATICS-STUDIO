import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { boot, buy, DB, emailOf, mkProduct, mkUser, tag, type Boot } from "./test-setup";

/** Included services (claims against a plan's count) and the IELTS test limit, on a real database with the real purchase flow. */
describe.skipIf(!DB)("plan services and IELTS limits", () => {
  let B: Boot;
  let SV: typeof import("./services");
  let AC: typeof import("../tests/access");
  let rzp: InstanceType<typeof import("./test-support").FakeRazorpay>;
  const proSku = `t-svc-pro-${tag}`, silverSku = `t-svc-silver-${tag}`, goldSku = `t-svc-gold-${tag}`, setSku = "course-ielts-practice-tests";
  const user = async (label: string) => { const id = await mkUser(B.db, "student", label); return { id, email: emailOf(label), name: label }; };

  beforeAll(async () => {
    B = await boot();
    SV = await import("./services");
    AC = await import("../tests/access");
    rzp = new B.T.FakeRazorpay();
    await mkProduct(B.db, proSku, "plan", "pro", 59900, null, { days: 30 });
    await mkProduct(B.db, silverSku, "plan", "silver", 99900, null, { days: 30 });
    await mkProduct(B.db, goldSku, "plan", "gold", 169900, null, { days: 365 });
    if (!(await B.db.one("SELECT 1 AS x FROM pay_products WHERE sku = $1", [setSku]))) await mkProduct(B.db, setSku, "course", "ielts-practice-tests", 159900, null, { days: null });
  });
  beforeEach(() => B.T.setTestEnv());
  afterAll(async () => { rzp.uninstall(); await B.db.closePool(); });

  it("free and Pro students have no included services", async () => {
    const f = await user("svc-free"); const p = await user("svc-pro");
    await buy(rzp, p.id, p.email, proSku);
    expect(await SV.serviceLines(f.id)).toEqual([]);
    expect(await SV.serviceLines(p.id)).toEqual([]);
    expect(await SV.claimService(f, "career-counselling")).toMatchObject({ ok: false });
    expect(await SV.claimService(p, "career-counselling")).toMatchObject({ ok: false });
  });

  it("Silver gets one career counselling session a month: the first request opens a ticket, the second is refused, other services are not included", async () => {
    const u = await user("svc-silver");
    await buy(rzp, u.id, u.email, silverSku);
    const lines = await SV.serviceLines(u.id);
    expect(lines.map((l) => [l.key, l.left])).toEqual([["career-counselling", 1]]);
    const a = await SV.claimService(u, "career-counselling");
    expect(a).toMatchObject({ ok: true });
    const ticket = await B.db.one<{ subject: string }>("SELECT subject FROM support_tickets WHERE ticket_no = $1", [(a as { ticketNo: string }).ticketNo]);
    expect(ticket?.subject).toContain("Career counselling");
    expect((await SV.serviceLines(u.id))[0].left).toBe(0);
    expect(await SV.claimService(u, "career-counselling")).toMatchObject({ ok: false });
    expect(await SV.claimService(u, "expert-shortlist")).toMatchObject({ ok: false });
    expect(await SV.claimService(u, "not-a-service")).toMatchObject({ ok: false });
  });

  it("quick double clicks cannot use more than the plan allows", async () => {
    const u = await user("svc-gold-race");
    await buy(rzp, u.id, u.email, goldSku);
    const r = await Promise.all([SV.claimService(u, "expert-shortlist"), SV.claimService(u, "expert-shortlist"), SV.claimService(u, "expert-shortlist")]);
    expect(r.filter((x) => x.ok).length).toBe(1);
    expect(Number(await B.db.val("SELECT COUNT(*) FROM plan_service_claims WHERE user_id = $1 AND service = 'expert-shortlist'", [u.id]))).toBe(1);
  });

  it("Gold gets two mock visa interviews a year, and the count renews after the window", async () => {
    const u = await user("svc-gold");
    await buy(rzp, u.id, u.email, goldSku);
    expect((await SV.serviceLines(u.id)).map((l) => l.key).sort()).toEqual(["career-counselling", "expert-shortlist", "mock-visa-interview", "overseas-counselling", "resume-review"]);
    expect(await SV.claimService(u, "mock-visa-interview")).toMatchObject({ ok: true });
    await B.db.run("DELETE FROM support_tickets WHERE user_id = $1", [u.id]); // the same-subject-in-a-day check is about tickets, not the count
    expect(await SV.claimService(u, "mock-visa-interview")).toMatchObject({ ok: true });
    await B.db.run("DELETE FROM support_tickets WHERE user_id = $1", [u.id]);
    expect(await SV.claimService(u, "mock-visa-interview")).toMatchObject({ ok: false });
    await B.db.run("UPDATE plan_service_claims SET claimed_at = DATE_SUB(NOW(), INTERVAL 400 DAY) WHERE user_id = $1", [u.id]);
    expect((await SV.serviceLines(u.id)).find((l) => l.key === "mock-visa-interview")?.left).toBe(2);
  });

  it("a lapsed plan has nothing to ask for", async () => {
    const u = await user("svc-lapsed");
    await buy(rzp, u.id, u.email, silverSku);
    await B.db.run("UPDATE pay_entitlements SET expires_at = DATE_SUB(UTC_TIMESTAMP(), INTERVAL 1 DAY) WHERE user_id = $1 AND kind = 'plan'", [u.id]);
    expect(await SV.claimService(u, "career-counselling")).toMatchObject({ ok: false });
  });

  it("IELTS tests: 3 free, 10 on Silver, 30 on Gold or after buying the set", async () => {
    const free = await user("ielts-free"); const silver = await user("ielts-silver"); const gold = await user("ielts-gold"); const buyer = await user("ielts-buyer");
    await buy(rzp, silver.id, silver.email, silverSku); await buy(rzp, gold.id, gold.email, goldSku); await buy(rzp, buyer.id, buyer.email, setSku);
    expect(await AC.ieltsLimit(null)).toBe(3);
    expect(await AC.ieltsLimit(free.id)).toBe(3);
    expect(await AC.ieltsLimit(silver.id)).toBe(10);
    expect(await AC.ieltsLimit(gold.id)).toBe(30);
    expect(await AC.ieltsLimit(buyer.id)).toBe(30);
  });
});
