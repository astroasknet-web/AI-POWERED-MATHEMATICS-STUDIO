/**
 * Checks the thumbnail set: every catalogue course has a 1920x1080 WebP and a 640x360 WebP, filenames are unique, no two pictures are byte-identical, and no two
 * pictures look alike (a perceptual hash of each picture is compared with every other one). Exits non-zero on a problem.
 *
 *   node scripts/thumbs/verify.mjs
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dir = path.join(root, "public/course-thumbs");
const courses = JSON.parse(fs.readFileSync(path.join(root, "lib/market/data/courses.json"), "utf8")).courses;
const problems = [];
const hashes = new Map();
const md5 = new Map();

async function dhash(file) {
  const { data } = await sharp(file).resize(17, 16, { fit: "fill" }).grayscale().raw().toBuffer({ resolveWithObject: true });
  let bits = "";
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) bits += data[y * 17 + x] > data[y * 17 + x + 1] ? "1" : "0";
  return bits;
}
const dist = (a, b) => { let d = 0; for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) d++; return d; };

for (const c of courses) {
  const full = path.join(dir, `${c.slug}.webp`), small = path.join(dir, `${c.slug}-640.webp`);
  if (!fs.existsSync(full) || !fs.existsSync(small)) { problems.push(`missing files for ${c.slug}`); continue; }
  const m = await sharp(full).metadata(), ms = await sharp(small).metadata();
  if (m.width !== 1920 || m.height !== 1080) problems.push(`${c.slug}: full size ${m.width}x${m.height}`);
  if (ms.width !== 640 || ms.height !== 360) problems.push(`${c.slug}: small size ${ms.width}x${ms.height}`);
  const h = crypto.createHash("md5").update(fs.readFileSync(full)).digest("hex");
  if (md5.has(h)) problems.push(`${c.slug} is byte-identical to ${md5.get(h)}`); else md5.set(h, c.slug);
  hashes.set(c.slug, await dhash(small));
}
let min = [999, "", ""];
const slugs = [...hashes.keys()];
for (let i = 0; i < slugs.length; i++) for (let j = i + 1; j < slugs.length; j++) { const d = dist(hashes.get(slugs[i]), hashes.get(slugs[j])); if (d < min[0]) min = [d, slugs[i], slugs[j]]; if (d < 20) problems.push(`${slugs[i]} and ${slugs[j]} look alike (distance ${d} of 256)`); }
const manifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
if (manifest.complete !== courses.length) problems.push(`manifest lists ${manifest.complete} of ${courses.length}`);
const concepts = manifest.thumbnails.map((t) => t.concept);
if (new Set(concepts).size !== concepts.length) problems.push("two courses share the same written concept");
console.log(`checked ${slugs.length} courses; closest pair: ${min[1]} / ${min[2]} (distance ${min[0]} of 256)`);
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
console.log("OK: every course has its own 1920x1080 and 640x360 thumbnail, all different.");
