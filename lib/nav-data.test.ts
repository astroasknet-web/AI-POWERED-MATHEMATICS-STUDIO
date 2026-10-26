import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import catalogue from "@/lib/market/data/courses.json";
import abroad from "@/lib/abroad/data/study-abroad.json";
import { ACCOUNT_LINKS, ALL_LINKS, FIELD_SHORTCUTS, INDEX, MENUS, SUPPORT_LINK } from "@/components/home-options/nav-data";

const appDir = path.join(process.cwd(), "app");

/** Does `href` (an internal path) resolve to a page in the app directory? Route groups, dynamic segments and catch-all folders are honoured. */
function routeExists(pathname: string, dir = appDir): boolean {
  const segs = pathname.split("/").filter(Boolean);
  const walk = (d: string, i: number): boolean => {
    if (i === segs.length) {
      if (fs.existsSync(path.join(d, "page.tsx")) || fs.existsSync(path.join(d, "page.ts"))) return true;
      return fs.readdirSync(d, { withFileTypes: true }).some((e) => e.isDirectory() && /^\(.+\)$/.test(e.name) && walk(path.join(d, e.name), i));
    }
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const group = /^\(.+\)$/.test(e.name);
      const dynamic = /^\[(\.\.\.)?[^\]]+\]$/.test(e.name);
      if (group && walk(path.join(d, e.name), i)) return true;
      if (e.name === segs[i] && walk(path.join(d, e.name), i + 1)) return true;
      if (dynamic && walk(path.join(d, e.name), i + 1)) return true;
    }
    return false;
  };
  return walk(dir, 0);
}

const internal = ALL_LINKS.filter((l) => !l.external);

describe("navigation: no dead links", () => {
  it("every internal link in the menus opens a page that exists", () => {
    const missing = internal.map((l) => l.href.split("?")[0]).filter((h) => !routeExists(h));
    expect(missing).toEqual([]);
  });
  it("every account-menu link opens a page that exists", () => {
    const missing = Object.values(ACCOUNT_LINKS).flat().map((l) => l.href).filter((h) => !routeExists(h));
    expect(missing).toEqual([]);
  });
  it("every external link is https", () => {
    for (const l of ALL_LINKS.filter((x) => x.external)) expect(l.href, l.label).toMatch(/^https:\/\//);
  });
  it("every internal link is a clean path", () => {
    for (const l of internal) expect(l.href, l.label).toMatch(/^\/[a-z0-9\-/?=&]*$/i);
  });
});

describe("navigation: links are backed by real data", () => {
  it("field shortcuts use real course categories", () => {
    const cats = Object.keys((catalogue as unknown as { categories: Record<string, unknown> }).categories);
    for (const f of FIELD_SHORTCUTS) expect(cats, f.label).toContain(f.cat);
  });
  it("country links use real study-abroad countries", () => {
    const keys = (abroad as unknown as { countries: Array<{ key?: string; slug?: string; name: string }> }).countries.map((c) => (c.key ?? c.slug ?? c.name).toLowerCase());
    const abroadMenu = MENUS.find((m) => m.id === "abroad")!;
    const links = abroadMenu.groups.find((g) => g.title === "Countries")!.links;
    expect(links.length).toBeGreaterThan(0);
    for (const l of links) expect(keys, l.label).toContain(l.href.split("/").pop());
  });
  it("labels carry no figures that could go stale (prices or counts)", () => {
    for (const l of ALL_LINKS) { expect(`${l.label} ${l.badge ?? ""}`, l.label).not.toMatch(/₹|\d{2,}\s+(courses|universities)/i); }
  });
});

describe("navigation: structure", () => {
  it("has a short top level, with unique labels inside each menu", () => {
    expect(MENUS.length).toBeLessThanOrEqual(5);
    for (const m of MENUS) {
      const labels = m.groups.flatMap((g) => g.links.map((l) => l.label));
      expect(new Set(labels).size, m.label).toBe(labels.length);
      expect(m.groups.length, m.label).toBeLessThanOrEqual(3);
    }
  });
  it("every link has a label, and descriptions stay short", () => {
    for (const l of ALL_LINKS) { expect(l.label.trim().length).toBeGreaterThan(0); expect((l.desc ?? "").length, l.label).toBeLessThanOrEqual(80); }
  });
  it("Learn, Careers and Study Abroad exist, as the information architecture promises", () => {
    expect(MENUS.map((m) => m.id)).toEqual(["learn", "careers", "abroad", "resources", "solutions"]);
  });
  it("the search index lists each page once and never invents internships", () => {
    const hrefs = INDEX.map((h) => h.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(INDEX.some((h) => h.group === "Internships")).toBe(false);
  });
  it("no staff or admin route is offered in any menu", () => {
    const all = [...ALL_LINKS.map((l) => l.href), ...Object.values(ACCOUNT_LINKS).flat().map((l) => l.href)];
    for (const h of all) expect(h, h).not.toMatch(/^\/(admin|console|crm|counselor)/);
  });

  it("Support lives beside the search bar, so the two Resources columns are the same length", () => {
    expect(ALL_LINKS.some((l) => l.href === "/support")).toBe(false);
    expect(SUPPORT_LINK.href).toBe("/support");
    expect(INDEX.some((h) => h.href === "/support")).toBe(true); // still found by search
    const res = MENUS.find((m) => m.id === "resources")!;
    expect(res.groups.map((g) => g.links.length)).toEqual([4, 4]);
  });
});
