import { describe, expect, it } from "vitest";
import { PLANS } from "./plans";
import { PLAN_COURSE_QUOTA } from "./plan-quota";
import { bestValue, buildStacks, chargedRupees, perUnit, savingFor, yearlySaving } from "./plan-value";
import { pickableFees, planStacks, valuePrices } from "../pay/plan-value-prices";
import { PLAN_STUDIOS } from "../pay/plans";
import { COURSE_FEE_RUPEES, RESUME_STUDIO_PRO_RUPEES, STUDIO_COURSES } from "../pay/course-fees";

const P = { pickMin: 300, pickMax: 800, vedicMathematics: 800, resumeStudioPro: 200, mathsSpeedStudio: 700, englishWritingStudio: 500 };
const plan = (k: string) => PLANS.find((x) => x.key === k)!;
const price = (k: "pro" | "silver" | "gold", yearly: boolean) => chargedRupees(plan(k), yearly);

describe("value stack arithmetic", () => {
  const s = buildStacks(P);
  it("totals are the sum of the priced lines, with picks at the cheapest course", () => {
    expect(s.pro.value).toBe(2 * 300 + 800 + 200);
    expect(s.silver.value).toBe(4 * 300 + 800 + 200 + 700);
    expect(s.gold.value).toBe(8 * 300 + 800 + 200 + 700 + 500);
    for (const k of ["pro", "silver", "gold"] as const) expect(s[k].lines.reduce((t, l) => t + l.rupees, 0)).toBe(s[k].value);
  });
  it("the 'up to' total swaps only the picks to the dearest course", () => {
    expect(s.silver.valueMax).toBe(4 * 800 + 800 + 200 + 700);
    expect(buildStacks({ ...P, pickMax: 300 }).silver.valueMax).toBe(buildStacks({ ...P, pickMax: 300 }).silver.value);
  });
  it("counts courses and studios, and every item the plan includes", () => {
    expect([s.pro.units, s.silver.units, s.gold.units]).toEqual([3, 6, 11]);
    for (const k of ["pro", "silver", "gold"] as const) expect(s[k].items).toBe(PLAN_COURSE_QUOTA[k] + 2 + (k === "pro" ? 0 : k === "silver" ? 1 : 2) + s[k].extras.length);
  });
  it("unpriced extras never enter the totals", () => {
    expect(s.gold.extras.length).toBeGreaterThan(0);
    expect(s.gold.value).toBe(buildStacks(P).gold.value);
  });
});

describe("saving", () => {
  it("is the difference and its rounded percentage of the standalone value", () => {
    expect(savingFor(899, 2893)).toEqual({ amount: 1994, percent: 69 });
    expect(savingFor(100, 300)).toEqual({ amount: 200, percent: 67 });
  });
  it("claims nothing when the plan costs the same or more", () => {
    expect(savingFor(500, 500)).toBeNull();
    expect(savingFor(900, 500)).toBeNull();
  });
  it("per-course price only appears alongside a real saving", () => {
    const s = buildStacks(P);
    expect(perUnit(900, s.silver)).toBe(150);
    expect(perUnit(10392, s.gold)).toBeNull(); // costs more than its priced contents
  });
  it("best value is the biggest saving percentage, or none", () => {
    const s = buildStacks(P);
    expect(bestValue({ pro: 1500, silver: 900, gold: 4000 }, s)).toBe("silver");
    expect(bestValue({ pro: 1500, silver: 2800, gold: 1000 }, s)).toBe("gold");
    expect(bestValue({ pro: 9999, silver: 9999, gold: 9999 }, s)).toBeNull();
  });
  it("a year's saving is twelve months minus the yearly price", () => {
    expect(yearlySaving({ monthly: 499, yearly: 3992 })).toEqual({ amount: 1996, percent: 33 });
    expect(yearlySaving({ monthly: 100, yearly: 1200 })).toBeNull();
  });
});

describe("the new prices and what is charged", () => {
  it("monthly prices are Pro 499, Silver 899, Gold 1,299 and a year costs eight months", () => {
    expect([plan("pro").monthly, plan("silver").monthly, plan("gold").monthly]).toEqual([499, 899, 1299]);
    for (const k of ["pro", "silver", "gold"]) expect(plan(k).yearly).toBe(plan(k).monthly * 8);
  });
  it("every paid plan can be bought monthly, so the monthly view compares the monthly charge", () => {
    for (const k of ["pro", "silver", "gold"] as const) expect(price(k, false)).toBe(plan(k).monthly);
    expect(price("gold", true)).toBe(10392);
  });
});

describe("the real catalogue behind the numbers", () => {
  it("prices come from the lists that seed the shop", () => {
    const v = valuePrices();
    expect(v.resumeStudioPro).toBe(RESUME_STUDIO_PRO_RUPEES);
    for (const [key, slug] of [["mathsSpeedStudio", "mathematics-speed-enhancement"], ["englishWritingStudio", "english-writing-studio"], ["vedicMathematics", "vedic-mathematics"]] as const) {
      expect(v[key]).toBe(STUDIO_COURSES.find((x) => x.slug === slug)!.rupees);
    }
    expect(v.vedicMathematics).toBe(799);
    const fees = pickableFees();
    expect(fees.length).toBeGreaterThan(10);
    expect(v.pickMin).toBe(Math.min(...fees));
    expect(v.pickMax).toBe(Math.max(...fees));
    for (const f of fees) expect(Object.values(COURSE_FEE_RUPEES)).toContain(f);
  });
  it("course picks in the stack match the plans' real quotas, and the maths studio matches what the plan opens", () => {
    const s = planStacks();
    expect(PLAN_COURSE_QUOTA).toEqual({ pro: 2, silver: 4, gold: 8 });
    expect(PLAN_STUDIOS["mathematics-speed-enhancement"]).toBe("silver");
    expect(s.pro.lines.some((l) => /Mathematics Speed/.test(l.label))).toBe(false);
    expect(s.silver.lines.some((l) => /Mathematics Speed/.test(l.label))).toBe(true);
    expect(s.gold.lines.some((l) => /Mathematics Speed/.test(l.label))).toBe(true);
    expect(s.silver.lines[0].label).toBe("4 courses of your choice");
    for (const k of ["pro", "silver", "gold"] as const) expect(s[k].lines.some((l) => /Vedic/.test(l.label))).toBe(true);
  });
  it("a wider plan never shows less than a narrower one", () => {
    const s = planStacks();
    expect(s.silver.value).toBeGreaterThan(s.pro.value);
    expect(s.gold.value).toBeGreaterThan(s.silver.value);
    expect(s.gold.items).toBeGreaterThan(s.silver.items);
  });
  it("with real prices every plan saves in the monthly view, and none claims a saving against its yearly price", () => {
    const s = planStacks();
    for (const k of ["pro", "silver", "gold"] as const) {
      expect(savingFor(price(k, false), s[k].value), k).not.toBeNull();
      expect(savingFor(price(k, true), s[k].value), k).toBeNull();
    }
    expect(bestValue({ pro: price("pro", true), silver: price("silver", true), gold: price("gold", true) }, s)).toBeNull();
    expect(bestValue({ pro: price("pro", false), silver: price("silver", false), gold: price("gold", false) }, s)).not.toBeNull();
  });
});
