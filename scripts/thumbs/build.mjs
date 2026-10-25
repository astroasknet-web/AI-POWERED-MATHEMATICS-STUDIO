/**
 * Builds the course thumbnails: one 1920 x 1080 WebP and one 640 x 360 WebP per course in public/course-thumbs, and a manifest.
 *
 *   node scripts/thumbs/build.mjs                 every course
 *   node scripts/thumbs/build.mjs slug-a slug-b   only these
 *   node scripts/thumbs/build.mjs --sheet out.png  also write a contact sheet of what was built
 *
 * Every picture is drawn in code from the course's own concept (scripts/thumbs/concepts-*.mjs and scenes-*.mjs), with the exact catalogue title set in real type.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { compose, render, PALETTES, W, H } from "./engine.mjs";
import { A } from "./scenes-a.mjs";
import { CA } from "./concepts-a.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const catalogue = JSON.parse(fs.readFileSync(path.join(root, "lib/market/data/courses.json"), "utf8"));
const cats = catalogue.categories;

const scenes = { ...A };
const concepts = { ...CA };
for (const mod of ["b", "c", "d", "e"]) {
  try {
    const s = await import(`./scenes-${mod}.mjs`);
    const c = await import(`./concepts-${mod}.mjs`);
    Object.assign(scenes, s[mod.toUpperCase()] ?? {});
    Object.assign(concepts, c[`C${mod.toUpperCase()}`] ?? {});
  } catch (e) { if (!String(e.code).includes("MODULE_NOT_FOUND")) throw e; }
}

const args = process.argv.slice(2);
const sheetIdx = args.indexOf("--sheet");
const sheetOut = sheetIdx >= 0 ? args[sheetIdx + 1] : null;
const only = args.filter((a, i) => !a.startsWith("--") && i !== sheetIdx + 1);
const outDir = path.join(root, "public/course-thumbs");
fs.mkdirSync(outDir, { recursive: true });

const levelLabel = { B: "Beginner", "B→I": "Beginner to Intermediate", I: "Intermediate", "I→A": "Intermediate to Advanced", A: "Advanced", P: "Professional", E: "Expert" };
const list = catalogue.courses.filter((c) => !only.length || only.includes(c.slug));
const made = [];
const missing = [];
for (const c of list) {
  const concept = concepts[c.slug], scene = scenes[c.slug];
  if (!concept || !scene) { missing.push(c.slug); continue; }
  const course = { slug: c.slug, title: c.title, cat_name: cats[c.cat].name };
  const svg = await compose(course, { ...concept, level: levelLabel[c.level] ?? "" }, scene);
  const file = path.join(outDir, `${c.slug}.webp`), small = path.join(outDir, `${c.slug}-640.webp`);
  const r = await render(svg, file, small);
  made.push({ id: c.slug, title: c.title, file: `${c.slug}.webp`, small: `${c.slug}-640.webp`, width: W, height: H, bytes: r.full.size, concept: concept.concept, palette: concept.pal, colours: [PALETTES[concept.pal].bg1, PALETTES[concept.pal].a, PALETTES[concept.pal].b, PALETTES[concept.pal].c], layout: concept.layout, background: concept.bg, status: "generated" });
  process.stdout.write(`${c.slug} ${(r.full.size / 1024).toFixed(0)}KB\n`);
}
if (missing.length) console.log("MISSING scene or concept:", missing.join(", "));

// manifest: merge with what is already on disk so a partial build does not drop other courses
const mfile = path.join(outDir, "manifest.json");
const old = fs.existsSync(mfile) ? JSON.parse(fs.readFileSync(mfile, "utf8")) : { thumbnails: [] };
const byId = new Map(old.thumbnails.map((t) => [t.id, t]));
for (const m of made) byId.set(m.id, m);
const order = catalogue.courses.map((c) => c.slug);
const thumbnails = order.filter((s) => byId.has(s)).map((s) => byId.get(s));
fs.writeFileSync(mfile, JSON.stringify({ generated: "scripts/thumbs/build.mjs", size: `${W}x${H}`, total: catalogue.courses.length, complete: thumbnails.length, missing: order.filter((s) => !byId.has(s)), thumbnails }, null, 1));

if (sheetOut && made.length) {
  const cols = 4, tw = 480, th = 270;
  const rows = Math.ceil(made.length / cols);
  const comps = await Promise.all(made.map(async (m, i) => ({ input: await sharp(path.join(outDir, m.small)).resize(tw, th).toBuffer(), left: (i % cols) * tw, top: Math.floor(i / cols) * th })));
  await sharp({ create: { width: cols * tw, height: rows * th, channels: 3, background: "#000" } }).composite(comps).png().toFile(sheetOut);
  console.log("sheet", sheetOut);
}
