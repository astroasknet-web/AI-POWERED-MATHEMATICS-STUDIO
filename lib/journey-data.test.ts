import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CATEGORIES, journeyGoals } from "@/components/home-v3/journey-data";

const appDir = path.join(process.cwd(), "app");
function routeExists(pathname: string): boolean {
  const segs = pathname.split("/").filter(Boolean);
  const walk = (d: string, i: number): boolean => {
    if (i === segs.length) return fs.existsSync(path.join(d, "page.tsx")) || fs.readdirSync(d, { withFileTypes: true }).some((e) => e.isDirectory() && /^\(.+\)$/.test(e.name) && walk(path.join(d, e.name), i));
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      if (/^\(.+\)$/.test(e.name) && walk(path.join(d, e.name), i)) return true;
      if (e.name === segs[i] && walk(path.join(d, e.name), i + 1)) return true;
      if (/^\[[^\]]+\]$/.test(e.name) && walk(path.join(d, e.name), i + 1)) return true;
    }
    return false;
  };
  return walk(appDir, 0);
}

describe("home goal guide", () => {
  const goals = journeyGoals({ courses: 121, countries: 7, templates: 12 });
  it("has several goals in every area, with unique ids", () => {
    expect(new Set(goals.map((g) => g.id)).size).toBe(goals.length);
    for (const c of CATEGORIES) expect(goals.filter((g) => g.cat === c.key).length, c.key).toBeGreaterThanOrEqual(3);
    expect(goals.length).toBeGreaterThanOrEqual(15);
  });
  it("every internal link opens a page that exists, every external link is https", () => {
    for (const g of goals) {
      if (g.external) expect(g.href, g.id).toMatch(/^https:\/\//);
      else expect(routeExists(g.href.split("?")[0]), `${g.id} -> ${g.href}`).toBe(true);
    }
  });
  it("related goals exist, are not the goal itself, and each goal has a three-step route", () => {
    const ids = new Set(goals.map((g) => g.id));
    for (const g of goals) {
      for (const n of g.next) { expect(ids.has(n), `${g.id} -> ${n}`).toBe(true); expect(n).not.toBe(g.id); }
      expect(g.steps).toHaveLength(3);
      expect(g.facts.length).toBeGreaterThanOrEqual(2);
    }
  });
  it("counts shown on a card are the ones passed in, not typed in", () => {
    expect(goals.find((g) => g.id === "skill")!.facts[0]).toBe("121 courses");
    expect(goals.find((g) => g.id === "abroad")!.facts[0]).toBe("7 countries");
    expect(goals.find((g) => g.id === "resume")!.facts[0]).toBe("12 templates");
  });
});
