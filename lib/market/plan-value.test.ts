import { describe, expect, it } from "vitest";
import { PLANS } from "./plans";
import { PLAN_COURSE_QUOTA } from "./plan-quota";
import { bestValue, buildStacks, chargedRupees, perUnit, savingFor } from "./plan-value";
import { pickableFees, planStacks, valuePrices } from "../pay/plan-value-prices";
import { PLAN_STUDIOS } from "../pay/plans";
import { COURSE_FEE_RUPEES, RESUME_STUDIO_PRO_RUPEES, STUDIO_COURSES } from "../pay/course-fees";

const P = { pickMin: 300, pickMax: 800, resumeStudioPro: 200, mathsSpeedStudio: 700, englishWritingStudio: 500 };

describe("value stack arithmetic", () => {
  const s = buildStacks(P);
  it("totals are the sum of the priced lines, with picks at the cheapest course", () => {
    expect(s.pro.value).toBe(1 * 300 + 200);
    expect(s.silver.value).toBe(2 * 300 + 200 + 700);
    expect(s.gold.value).toBe(4 * 300 + 200 + 700 + 500);
    for (const k of ["pro", "silver", "gold"] as const) expect(s[k].lines.reduce((t, l) => t + l.rupees, 0)).toBe(s[k].value);
  });
  it("the 'up to' total swaps only the picks to the dearest course", () => {
    expect(s.silver.valueMax).toBe(2 * 800 + 200 + 700);
    expect(buildStacks({ ...P, pickMax: 300 }).silver.valueMax).toBe(buildStacks({ ...P, pickMax: 300 }).silver.value);
  });
  it("counts the number of courses and studios", () => {
    expect([s.pro.units, s.silver.units, s.gold.units]).toEqual([1, 3, 6]);
  });
  it("unpriced extras never enter the totals", () => {
    expect(s.gold.extras.length).toBeGreaterThan(0);
    const bumped = buildStacks(P);
    expect(bumped.gold.value).toBe(s.gold.value);
  });
});

describe("saving", () => {
  it("is the difference and its rounded percentage of the standalone value", () => {
    expect(savingFor(699, 1496)).toEqual({ amount: 797, percent: 53 });
    expect(savingFor(100, 300)).toEqual({ amount: 200, percent: 67 });
  });
  it("claims nothing when the plan costs the same or more", () => {
    expect(savingFor(500, 500)).toBeNull();
    expect(savingFor(900, 500)).toBeNull();
  });
  it("per-course price only appears alongside a real saving", () => {
    const s = buildStacks(P);
    expect(perUnit(699, s.silver)).toBe(233);
    expect(perUnit(399, s.pro)).toBeNull(); // one item: nothing to divide
    expect(perUnit(11988, s.gold)).toBeNull(); // costs more than its priced contents
  });
  it("best value is the biggest saving percentage, or none", () => {
    const s = buildStacks(P);
    expect(bestValue({ pro: 399, silver: 699, gold: 2000 }, s)).toBe("silver"); // 20%, 53%, 9%
    expect(bestValue({ pro: 399, silver: 1400, gold: 1000 }, s)).toBe("gold");
    expect(bestValue({ pro: 9999, silver: 9999, gold: 9999 }, s)).toBeNull();
  });
});

describe("what is charged", () => {
  const gold = PLANS.find((x) => x.key === "gold")!;
  const silver = PLANS.find((x) => x.key === "silver")!;
  it("Gold is annual only, so even the monthly view compares the yearly charge", () => {
    expect(chargedRupees(gold, false)).toBe(11988);
    expect(chargedRupees(silver, false)).toBe(silver.monthly);
    expect(chargedRupees(silver, true)).toBe(silver.yearly);
  });
  it("with real prices Gold's priced contents do not beat its yearly price, so no saving is claimed for it", () => {
    expect(savingFor(chargedRupees(gold, false), planStacks().gold.value)).toBeNull();
  });
  it("with real prices Silver is the best value in the monthly view", () => {
    const s = planStacks();
    const price = (k: "pro" | "silver" | "gold") => chargedRupees(PLANS.find((x) => x.key === k)!, false);
    expect(bestValue({ pro: price("pro"), silver: price("silver"), gold: price("gold") }, s)).toBe("silver");
  });
  it("no plan saves anything against its yearly price, so no 'best value' is awarded in the yearly view", () => {
    const s = planStacks();
    const price = (k: "pro" | "silver" | "gold") => chargedRupees(PLANS.find((x) => x.key === k)!, true);
    expect(bestValue({ pro: price("pro"), silver: price("silver"), gold: price("gold") }, s)).toBeNull();
  });
});

describe("the real catalogue behind the numbers", () => {
  it("prices come from the lists that seed the shop", () => {
    const v = valuePrices();
    expect(v.resumeStudioPro).toBe(RESUME_STUDIO_PRO_RUPEES);
    expect(v.mathsSpeedStudio).toBe(STUDIO_COURSES.find((x) => x.slug === "mathematics-speed-enhancement")!.rupees);
    expect(v.englishWritingStudio).toBe(STUDIO_COURSES.find((x) => x.slug === "english-writing-studio")!.rupees);
    const fees = pickableFees();
    expect(fees.length).toBeGreaterThan(10);
    expect(v.pickMin).toBe(Math.min(...fees));
    expect(v.pickMax).toBe(Math.max(...fees));
    for (const f of fees) expect(Object.values(COURSE_FEE_RUPEES)).toContain(f);
  });
  it("course picks in the stack match the plans' real quotas, and the maths studio matches what the plan opens", () => {
    const s = planStacks();
    expect(PLAN_COURSE_QUOTA).toEqual({ pro: 1, silver: 2, gold: 4 });
    expect(PLAN_STUDIOS["mathematics-speed-enhancement"]).toBe("silver");
    expect(s.pro.lines.some((l) => /Mathematics Speed/.test(l.label))).toBe(false);
    expect(s.silver.lines.some((l) => /Mathematics Speed/.test(l.label))).toBe(true);
    expect(s.gold.lines.some((l) => /Mathematics Speed/.test(l.label))).toBe(true);
    expect(s.silver.lines[0].label).toBe("2 courses of your choice");
  });
  it("a wider plan never shows less than a narrower one", () => {
    const s = planStacks();
    expect(s.silver.value).toBeGreaterThan(s.pro.value);
    expect(s.gold.value).toBeGreaterThan(s.silver.value);
  });
  it("home page Silver and Pro beat their standalone value in the monthly view (the shown saving is positive)", () => {
    const s = planStacks();
    const monthly = Object.fromEntries(PLANS.map((p) => [p.key, p.monthly]));
    expect(savingFor(monthly.silver, s.silver.value)).not.toBeNull();
  });
});
