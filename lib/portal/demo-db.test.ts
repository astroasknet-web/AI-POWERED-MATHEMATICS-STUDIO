import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
// Not the payment tests' shared set-up: that one mocks next/headers itself, and this test needs its own cookies and headers.
const DB = process.env.PORTAL_TEST_DATABASE_URL;
const boot = async () => {
  process.env.DATABASE_URL = DB;
  const { runPortalMigrations } = await import("./migrate");
  await runPortalMigrations(DB as string);
  return { db: await import("./db") };
};
type Boot = Awaited<ReturnType<typeof boot>>;
const mkUser = async (db: Boot["db"], role: string, label: string): Promise<number> =>
  Number(await db.val<number>("INSERT INTO users (role, email, password_hash, name, email_verified_at, created_at) VALUES ($1,$2,'x',$3,NOW(),NOW()) RETURNING id", [role, `demo-${label}-${Math.random().toString(16).slice(2, 8)}@demo-test.invalid`, label]));

const state = vi.hoisted(() => ({ token: "", block: "0" as string | null }));
vi.mock("next/headers", () => ({
  cookies: async () => ({ get: (k: string) => (k === "gq_session" && state.token ? { value: state.token } : undefined), set: () => undefined, delete: () => undefined }),
  headers: async () => new Headers(state.block === null ? {} : { "x-gq-block-demo": state.block, "x-forwarded-for": "198.51.100.77" }),
}));
vi.mock("next/navigation", () => ({ redirect: (to: string) => { throw new Error(`REDIRECT:${to}`); } }));

/** A demo administrator can look at everything, but is signed out for any request that changes or downloads data. */
describe.skipIf(!DB)("read-only demo administrator on a real database", () => {
  let B: Boot;
  let adminId = 0, demoId = 0;
  const tag = createHash("sha256").update(String(Math.random())).digest("hex").slice(0, 8);
  const tok = (c: string) => (c + tag).repeat(16).slice(0, 64);
  const seat = async (userId: number, c: string) => {
    await B.db.run("INSERT INTO portal_sessions (id, user_id, csrf, data, ip_hash, created_at, last_seen_at, expires_at) VALUES ($1,$2,'c','{}','x',NOW(),NOW(),NOW() + INTERVAL 1 DAY)", [createHash("sha256").update(tok(c)).digest("hex"), userId]);
  };

  beforeAll(async () => {
    B = await boot();
    adminId = await mkUser(B.db, "admin", "realadmin");
    demoId = await mkUser(B.db, "admin", "demoadmin");
    await B.db.run("UPDATE users SET is_demo = 1 WHERE id = $1", [demoId]);
    await seat(adminId, "a");
    await seat(demoId, "d");
  });
  afterAll(async () => { await B.db.closePool(); });

  it("shows the demo admin every page on a read request", async () => {
    const S = await import("./session");
    state.token = tok("d"); state.block = "0";
    const s = await S.getSession();
    expect(s?.user).toMatchObject({ id: demoId, role: "admin", is_demo: true });
    const G = await import("./guard");
    expect((await G.requireUser("admin")).id).toBe(demoId);
  });

  it("treats the demo admin as signed out on a write, and says why", async () => {
    vi.resetModules();
    const S = await import("./session");
    state.token = tok("d"); state.block = "1";
    const s = await S.getSession();
    expect(s?.user).toBeNull();
    expect(s?.demoBlocked).toBe(true);
    const G = await import("./guard");
    await expect(G.requireUser("admin")).rejects.toThrow("REDIRECT:/demo-readonly");
    const A = await import("../auth/admin");
    expect(await A.getAdminUser()).toBeNull();
  });

  it("never fails open when the header is missing", async () => {
    vi.resetModules();
    const S = await import("./session");
    state.token = tok("d"); state.block = null;
    expect((await S.getSession())?.user).toBeNull();
  });

  it("leaves a real administrator untouched on writes", async () => {
    vi.resetModules();
    const S = await import("./session");
    state.token = tok("a"); state.block = "1";
    expect((await S.getSession())?.user).toMatchObject({ id: adminId, is_demo: false });
  });

  it("does not require two-step login for the demo login, but still does for a real admin", async () => {
    const A = await import("./auth");
    expect(A.mfaRequiredFor({ role: "admin", is_demo: true })).toBe(false);
    expect(A.mfaRequiredFor({ role: "admin" })).toBe(true);
  });
});
