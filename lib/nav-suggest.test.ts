import { describe, expect, it } from "vitest";
import { INDEX } from "@/components/home-options/nav-data";
import { KEYWORDS, matchPages, relatedTerms } from "@/components/home-options/nav-suggest";

describe("header search suggestions", () => {
  it("keywords only point at pages that exist in the menus", () => {
    const hrefs = new Set(INDEX.map((h) => h.href));
    for (const href of Object.keys(KEYWORDS)) expect(hrefs.has(href), href).toBe(true);
  });
  it("plain words people type find the right page", () => {
    const top = (q: string) => matchPages(q)[0]?.href;
    expect(top("cv")).toBe("/resume-score");
    expect(matchPages("visa").some((h) => h.href === "/abroad/visa")).toBe(true);
    expect(matchPages("mentor").some((h) => h.href === "/experts")).toBe(true);
    expect(matchPages("loan").some((h) => h.href === "/abroad/loans")).toBe(true);
    expect(matchPages("canada").some((h) => h.href === "/study-abroad/canada")).toBe(true);
    expect(matchPages("pric")[0]?.href).toBe("/pricing");
  });
  it("every typed word must match, and nonsense matches nothing", () => {
    expect(matchPages("study canada").every((h) => /canada/i.test(h.label + h.sub))).toBe(true);
    expect(matchPages("zzqxv")).toEqual([]);
    expect(matchPages("   ")).toEqual([]);
  });
  it("related terms complete the last word from our own pages", () => {
    const t = relatedTerms("int");
    expect(t.length).toBeGreaterThan(0);
    expect(t.every((w) => w.startsWith("int"))).toBe(true);
    expect(relatedTerms("i")).toEqual([]);
    expect(relatedTerms("study int").every((w) => w.startsWith("study int"))).toBe(true);
  });
});
