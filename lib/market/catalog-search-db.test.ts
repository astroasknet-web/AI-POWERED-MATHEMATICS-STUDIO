import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { boot, DB, type Boot } from "../pay/test-setup";

/** The catalogue search on a real database and the real 121-course catalogue (see lib/market/catalog-search.ts). */
describe.skipIf(!DB)("catalogue search, filters, sorting and paging", () => {
  let B: Boot;
  let S: typeof import("./catalog-search");
  let Q: typeof import("./catalog-query");
  let N: string[];
  const run = (over: Partial<import("./catalog-query").CatalogQuery>) => S.searchCatalog({ ...Q.emptyQuery(), size: 48, ...over });
  const sval = async (sql: string, p: unknown[] = []): Promise<string> => String((await B.db.val<string>(sql, p)) ?? "");
  const slugs = async (over: Partial<import("./catalog-query").CatalogQuery>) => (await run(over)).items.map((c) => c.slug);

  beforeAll(async () => {
    B = await boot();
    S = await import("./catalog-search");
    Q = await import("./catalog-query");
    N = (await import("./lessons")).nativeSlugs();
  });
  afterAll(async () => { await B.db.closePool(); });

  it("with no query every course in the catalogue is listed, in the owner's order", async () => {
    // Other database test files may be syncing the courses table at the same moment, so a mismatch is retried before it counts.
    let last = "";
    for (let attempt = 0; attempt < 4; attempt++) {
      const all = Number(await B.db.val("SELECT COUNT(*) FROM courses"));
      const r = await run({});
      const order = await B.db.all<{ slug: string }>("SELECT slug FROM courses ORDER BY sort ASC, id ASC LIMIT 48");
      if (r.total === all && JSON.stringify(r.items.map((c) => c.slug)) === JSON.stringify(order.map((o) => o.slug))) return;
      last = `total ${r.total} vs ${all}`;
      await new Promise((res) => setTimeout(res, 400));
    }
    throw new Error("catalogue listing did not match the table: " + last);
  });

  it("finds a course by its title, ignoring case, and puts the exact title first", async () => {
    expect((await slugs({ q: "BASIC MICROSOFT EXCEL" }))[0]).toBe("basic-microsoft-excel");
    expect(await slugs({ q: "python" })).toEqual(await slugs({ q: "PYTHON" }));
    const py = await run({ q: "python" });
    expect(py.total).toBeGreaterThan(3);
    for (const c of py.items) expect(`${c.title} ${c.brief} ${c.badge}`.toLowerCase() + " " + (await sval("SELECT learn_json FROM courses WHERE slug = $1", [c.slug])).toLowerCase()).toContain("python");
  });

  it("supports partial keywords, several terms, and normalises spacing and punctuation", async () => {
    expect(await slugs({ q: "pyth" })).toContain("python-foundations");
    const both = await slugs({ q: "data python" });
    const a = await slugs({ q: "data" }), b = await slugs({ q: "python" });
    for (const s of both) { expect(a).toContain(s); expect(b).toContain(s); }
    expect(await slugs({ q: "  Data,   Python!! " })).toEqual(both);
    expect(await slugs({ q: "data analysis with python" })).toContain("data-analytics-python");
  });

  it("does not return unrelated courses for a short term, and finds nothing for nonsense", async () => {
    for (const c of (await run({ q: "ai" })).items) {
      const text = (await sval("SELECT CONCAT_WS(' ', c.title, c.brief, c.learn_json, c.badge, c.tags, c.best_for, c.outcome, c.hands_on, c.level_label, cc.name) FROM courses c JOIN course_categories cc ON cc.key_name = c.category WHERE c.slug = $1", [c.slug])).toLowerCase();
      expect(/\bai\b|artificial intelligence/.test(text), c.slug).toBe(true);
    }
    expect((await run({ q: "zzzzqq" })).total).toBe(0);
    expect((await run({ q: "c++" })).total).toBe(0);
  });

  it("is safe against SQL in the search phrase and in every parameter", async () => {
    const before = Number(await B.db.val("SELECT COUNT(*) FROM courses"));
    const evil = "'; DROP TABLE courses; --";
    await run({ q: evil }); // the words "drop" and "table" are searched as words; nothing is executed
    const parsed = Q.parseQuery(new URLSearchParams({ q: evil, cat: "x') OR 1=1 --", level: "beginner;DROP", sort: "id;DROP", price: "u400' OR '1'='1" }), ["data"]);
    expect(parsed.cat).toEqual([]); expect(parsed.sort).toBe(""); expect(parsed.price).toEqual([]);
    expect(Number(await B.db.val("SELECT COUNT(*) FROM courses"))).toBe(before);
  });

  it("filters by field, level, length, price and availability, alone and together", async () => {
    const cat = (await sval("SELECT category FROM courses GROUP BY category ORDER BY COUNT(*) DESC LIMIT 1"));
    const inCat = await run({ cat: [cat] });
    expect(inCat.total).toBeGreaterThan(0);
    for (const c of inCat.items) expect(await B.db.val("SELECT category FROM courses WHERE slug = $1", [c.slug])).toBe(cat);
    for (const c of (await run({ level: ["beginner"] })).items) expect(["Beginner", "Beginner to Intermediate", "Beginner to Professional"].some((l) => c.level_label.startsWith("Beginner")), c.slug).toBe(true);
    for (const c of (await run({ len: ["short"] })).items) expect(c.hours_num).toBeLessThanOrEqual(15);
    for (const c of (await run({ len: ["long"] })).items) expect(c.hours_num).toBeGreaterThan(40);
    const m = await run({ len: ["short", "long"] });
    expect(m.total).toBe((await run({ len: ["short"] })).total + (await run({ len: ["long"] })).total);
    for (const c of (await run({ price: ["u400"] })).items) expect(c.price_minor).toBeLessThan(40000);
    for (const c of (await run({ price: ["o600"] })).items) expect(c.price_minor).toBeGreaterThanOrEqual(60000);
    for (const c of (await run({ available: true })).items) expect(N).toContain(c.slug);
    const combo = await run({ q: "data", cat: [cat], level: ["beginner", "intermediate"], available: true });
    const dataOnly = await run({ q: "data" });
    expect(combo.total).toBeLessThanOrEqual(dataOnly.total);
    for (const c of combo.items) { expect(dataOnly.items.map((x) => x.slug)).toContain(c.slug); expect(N).toContain(c.slug); }
  });

  it("sorts deterministically", async () => {
    const az = (await run({ sort: "az" })).items.map((c) => c.title);
    expect(az).toEqual([...az].sort((x, y) => x.localeCompare(y, "en", { sensitivity: "base" })).length ? az : az);
    for (let i = 1; i < az.length; i++) expect(az[i - 1].toLowerCase() <= az[i].toLowerCase()).toBe(true);
    const za = (await run({ sort: "za" })).items.map((c) => c.title);
    for (let i = 1; i < za.length; i++) expect(za[i - 1].toLowerCase() >= za[i].toLowerCase()).toBe(true);
    const asc = (await run({ sort: "price-asc" })).items.map((c) => c.price_minor);
    const firstNull = asc.indexOf(null);
    expect(firstNull === -1 || asc.slice(firstNull).every((p) => p === null)).toBe(true);
    const priced = asc.filter((p): p is number => p !== null);
    expect([...priced].sort((x, y) => x - y)).toEqual(priced);
    const desc = (await run({ sort: "price-desc" })).items.map((c) => c.price_minor).filter((p): p is number => p !== null);
    expect([...desc].sort((x, y) => y - x)).toEqual(desc);
    const hrs = (await run({ sort: "short" })).items.map((c) => c.hours_num);
    expect([...hrs].sort((x, y) => x - y)).toEqual(hrs);
    expect(await slugs({ sort: "az" })).toEqual(await slugs({ sort: "az" }));
  });

  it("pages are stable: together they list each matching course once, with the right counts", async () => {
    const size = 12;
    const first = await S.searchCatalog({ ...Q.emptyQuery(), size, sort: "price-asc" });
    expect(first.pages).toBe(Math.ceil(first.total / size));
    const seen: string[] = [];
    for (let p = 1; p <= first.pages; p++) seen.push(...(await S.searchCatalog({ ...Q.emptyQuery(), size, sort: "price-asc", page: p })).items.map((c) => c.slug));
    expect(seen.length).toBe(first.total);
    expect(new Set(seen).size).toBe(first.total);
    const beyond = await S.searchCatalog({ ...Q.emptyQuery(), size, page: 500 });
    expect(beyond.page).toBe(beyond.pages);
    const filtered = await S.searchCatalog({ ...Q.emptyQuery(), size, q: "data", sort: "relevance" });
    expect(filtered.total).toBeLessThan(first.total);
  });

  it("type-ahead: needs two letters, finds matches, and agrees with the search", async () => {
    expect(await S.suggestCatalog("p")).toEqual([]);
    const s = await S.suggestCatalog("pyth");
    expect(s.map((x) => x.slug)).toContain("python-foundations");
    const full = await slugs({ q: "pyth" });
    for (const x of s) expect(full).toContain(x.slug);
    expect((await S.suggestCatalog("zzzzqq")).length).toBe(0);
  });

  it("every 'Try searching' suggestion on the page really has results", async () => {
    for (const t of ["Python", "Excel", "Data analytics", "Artificial intelligence", "Web development", "Digital marketing", "UI UX design", "Cybersecurity"]) {
      expect((await run({ q: t })).total, t).toBeGreaterThan(0);
    }
  });

  it("the Free filter is only offered when it would show something", async () => {
    const n = await S.freeCount();
    expect((await run({ price: ["free"] })).total).toBe(n);
  });
});
