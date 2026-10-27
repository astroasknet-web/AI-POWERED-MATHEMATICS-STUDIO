import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { boot, DB, mkUser, tag, type Boot } from "../pay/test-setup";
import * as gre from "../tests/gre";

/** Administrator tools on a real database: integration status, scoring configuration with audit, taxonomy edits, reprocessing, and withheld small-group reports. */
describe.skipIf(!DB)("mathematics studio administration", () => {
  let B: Boot;
  let S: typeof import("./store");
  let I: typeof import("./ingest");
  let A: typeof import("./admin");
  let admin = 0, stu = 0;

  beforeAll(async () => {
    B = await boot();
    S = await import("./store");
    I = await import("./ingest");
    A = await import("./admin");
    await S.ensureSeed(undefined, true);
    await B.db.run("DELETE FROM mx_config");
    admin = await mkUser(B.db, "admin", `mxadm-${tag}`);
    stu = await mkUser(B.db, "student", `mxstu-${tag}`);
    await I.ingestGre(stu, 1, Object.fromEntries(gre.mock(1).map((q) => [String(q.id), String(q.correct)])), 2000, new Date());
  });
  beforeEach(() => { B.T.setTestEnv(); });
  afterAll(async () => { await B.db.closePool(); });

  it("shows integration status with processed and available counts", async () => {
    const st = await A.integrationStatus();
    const g = st.find((s) => s.source === "gre-quant")!;
    expect(g.processed).toBeGreaterThanOrEqual(1);
    expect(g.available).toBeGreaterThanOrEqual(0);
    expect(st.some((s) => s.source === "math-speed")).toBe(true);
  });

  it("saves valid scoring settings, rejects invalid ones, and audits the change", async () => {
    expect((await A.saveConfig(admin, { weights: { mastery: 50, accuracy: 25, efficiency: 15, consistency: 15 } })).ok).toBe(false); // sums to 105
    const ok = await A.saveConfig(admin, { weights: { mastery: 50, accuracy: 20, efficiency: 15, consistency: 15 }, freeTopics: 4 });
    expect(ok.ok).toBe(true);
    const cfg = await S.getConfig();
    expect(cfg.weights.mastery).toBe(50);
    expect(cfg.freeTopics).toBe(4);
    const entry = (await A.recentAudit(20)).find((a) => a.action === "config.changed")!;
    expect(entry.detail).toMatch(/before/);
    expect((await A.saveConfig(admin, { bands: { support: 70, developing: 60, secure: 80 } })).ok).toBe(false);
    await A.resetConfig(admin);
    expect((await S.getConfig()).weights.mastery).toBe(45);
  });

  it("renames a taxonomy topic without breaking the engine, and refuses an unknown id", async () => {
    expect((await A.saveTopic(admin, { id: "triangles", name: "Triangles & their properties", area: "geometry", position: 20, active: true })).ok).toBe(true);
    const topics = await A.listTopics();
    expect(topics.find((t) => t.id === "triangles")!.name).toBe("Triangles & their properties");
    expect((await A.saveTopic(admin, { id: "not-real", name: "X", area: "geometry", position: 1, active: true })).ok).toBe(false);
    expect((await A.saveTopic(admin, { id: "circles", name: "Circles", area: "not-an-area", position: 1, active: true })).ok).toBe(false);
  });

  it("recomputes one student mastery on demand, idempotently", async () => {
    const before = (await S.cachedMastery(stu)).length;
    const r = await A.reprocessUser(admin, stu);
    expect(r.ok).toBe(true);
    expect((await S.cachedMastery(stu)).length).toBe(before);
    expect((await A.recentAudit(10)).some((a) => a.action === "reprocess.user")).toBe(true);
  });

  it("withholds aggregate figures below the minimum cohort", async () => {
    await A.saveConfig(admin, { minCohort: 100 });
    const st = await A.adminStats();
    expect(st.suppressed).toBe(true);
    expect(st.hardestTopics).toBeNull();
    expect(st.avgScore).toBeNull();
    expect(st.conversion).toBeNull();
    const csv = await A.aggregateCsv();
    expect(csv).toMatch(/no topic has at least 100/);
    await A.resetConfig(admin);
  });
});
