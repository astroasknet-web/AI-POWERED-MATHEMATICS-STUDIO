import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ABROAD_PACKAGES, MATRIX, ONLINE_PACKAGES, cumulativeItems, packageSku, priceLabel } from "./packages";
import { INDEX } from "@/components/home-options/nav-data";

describe("overseas education packages", () => {
  it("has five levels at the prices the owner set, each building on the one before", () => {
    expect(ABROAD_PACKAGES.map((p) => [p.level, p.from, p.to ?? null])).toEqual([[1, 1999, null], [2, 5999, null], [3, 14999, null], [4, 24999, 29999], [5, 49999, 59999]]);
    ABROAD_PACKAGES.forEach((p, i) => expect(p.builds).toBe(i === 0 ? undefined : ABROAD_PACKAGES[i - 1].name));
    expect(ABROAD_PACKAGES.map((p) => p.reaches)).toEqual([1, 2, 3, 4, 5]);
  });
  it("sells levels 1 to 3 online at a fixed fee and quotes levels 4 and 5", () => {
    expect(ONLINE_PACKAGES.map((p) => p.key)).toEqual(["discovery", "application-pro", "incubator"]);
    expect(ABROAD_PACKAGES.filter((p) => !p.online).every((p) => p.to && p.to > p.from)).toBe(true);
    expect(priceLabel(ABROAD_PACKAGES[3])).toBe("₹24,999 – ₹29,999");
    expect(priceLabel(ABROAD_PACKAGES[0])).toBe("₹1,999");
    expect(packageSku("incubator")).toBe("abroad-incubator");
  });
  it("each level adds services, so the running total only grows", () => {
    const totals = ABROAD_PACKAGES.map(cumulativeItems);
    for (let i = 1; i < totals.length; i++) expect(totals[i]).toBeGreaterThan(totals[i - 1]);
  });
  it("the comparison table agrees with the packages: a row's level is where it first appears", () => {
    expect(MATRIX.filter((r) => r.level === 5).length).toBe(6); // the six Global Guardian groups
    expect(MATRIX.every((r) => r.level >= 1 && r.level <= 5)).toBe(true);
  });
  it("the pages that sell them exist and search can find them", () => {
    for (const rel of ["app/overseas-packages/page.tsx", "app/(portal)/abroad/packages/page.tsx"]) expect(fs.existsSync(path.join(process.cwd(), rel)), rel).toBe(true);
    expect(INDEX.some((h) => h.href === "/overseas-packages")).toBe(true);
  });
});
