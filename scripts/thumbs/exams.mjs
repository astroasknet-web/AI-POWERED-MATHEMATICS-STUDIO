/**
 * Exam-preparation thumbnails: one 1920x1080 and one 640x360 WebP per exam in public/exam-thumbs (<key>.webp, <key>-640.webp).
 *
 *   node scripts/thumbs/exams.mjs            all ten
 *   node scripts/thumbs/exams.mjs jee ielts  only these
 *
 * Drawn in code, like the course and Olympiad thumbnails: each exam has its own palette and its own picture. The words on a picture are the exam's name and the
 * real section names from lib/market/data/exam-prep.json, so they always match what the product contains.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { PALETTES } from "./engine.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const out = path.join(root, "public/exam-thumbs");
fs.mkdirSync(out, { recursive: true });
const W = 1920, H = 1080;
const f = (n) => Math.round(n * 10) / 10;
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const hubs = JSON.parse(fs.readFileSync(path.join(root, "lib/market/data/exam-prep.json"), "utf8")).hubs;

const R = (x, y, w, h, r, fill, ex = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}" fill="${fill}" ${ex}/>`;
const C = (x, y, r, fill, ex = "") => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" ${ex}/>`;
const L = (x1, y1, x2, y2, s, w = 6, ex = "") => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
const P = (d, fill = "none", s = "none", w = 0, ex = "") => `<path d="${d}" fill="${fill}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const T = (x, y, s, size, fill, anchor = "middle", weight = 800, fam = "Segoe UI, Arial", ex = "") => `<text x="${f(x)}" y="${f(y)}" font-family="${fam}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" ${ex}>${esc(s)}</text>`;
const sh = `filter="url(#sh)"`;

/* ---- one picture per exam (scene space 1000 x 1000, centred on 0,0) ---- */
const ART = {
  jee: (p) => { // atom, orbits, equation
    let s = "";
    for (const a of [0, 60, 120]) s += `<ellipse cx="0" cy="-30" rx="330" ry="120" fill="none" stroke="${p.a}" stroke-width="10" transform="rotate(${a} 0 -30)" opacity="0.95"/>`;
    s += C(0, -30, 62, p.c, sh) + C(0, -30, 26, p.w);
    s += C(300, -30, 22, p.b, sh) + C(-150, 150, 22, p.b, sh) + C(-150, -210, 22, p.b, sh);
    s += R(-380, 280, 760, 150, 40, p.d, `stroke="${p.w}" stroke-width="6" ${sh}`) + T(0, 385, "F = ma     ∫ f(x) dx", 74, p.w, "middle", 800, "Georgia, serif");
    return s;
  },
  neet: (p) => { // DNA double helix
    let s = "";
    for (let i = 0; i < 12; i++) { const y = -400 + i * 72, ph = i * 0.62, x1 = Math.sin(ph) * 190, x2 = -x1; s += L(x1, y, x2, y, p.w, 7, `opacity="0.55"`) + C(x1, y, 24, i % 2 ? p.a : p.b, sh) + C(x2, y, 24, i % 2 ? p.c : p.a, sh); }
    let d1 = "", d2 = ""; for (let t = 0; t <= 12.1; t += 0.2) { const y = -400 + t * 72, x = Math.sin(t * 0.62) * 190; d1 += `${d1 ? "L" : "M"}${f(x)} ${f(y)}`; d2 += `${d2 ? "L" : "M"}${f(-x)} ${f(y)}`; }
    s += P(d1, "none", p.a, 14) + P(d2, "none", p.c, 14);
    s += R(300, -300, 170, 170, 34, p.d, `stroke="${p.w}" stroke-width="6" ${sh}`) + T(385, -180, "+", 150, p.w, "middle", 900) + R(-470, 190, 190, 120, 28, p.d, `stroke="${p.b}" stroke-width="6" ${sh}`) + T(-375, 275, "Bio", 70, p.w);
    return s;
  },
  upsc: (p) => { // pillars, dome, chakra
    let s = R(-430, 330, 860, 54, 12, p.w, sh) + R(-390, 276, 780, 54, 10, p.b);
    for (let i = 0; i < 6; i++) s += R(-330 + i * 125, -70, 70, 346, 10, p.w, sh) + R(-342 + i * 125, -96, 94, 30, 8, p.b);
    s += P("M-400 -96 L0 -230 L400 -96Z", p.c, "none", 0, sh);
    s += P("M-190 -230 A190 190 0 0 1 190 -230Z", p.a, "none", 0, sh) + L(0, -420, 0, -360, p.w, 10) + P("M0 -420 L90 -395 L0 -370Z", p.c);
    s += C(0, 40, 92, p.d, `stroke="${p.c}" stroke-width="8"`);
    for (let k = 0; k < 24; k++) { const a = (k / 24) * Math.PI * 2; s += L(0, 40, Math.cos(a) * 86, 40 + Math.sin(a) * 86, p.c, 3); }
    s += C(0, 40, 14, p.c);
    return s;
  },
  "ssc-cgl": (p) => { // pie, bars, rupee
    let s = C(-250, -120, 190, p.a, sh);
    s += P("M-250 -120 L-250 -310 A190 190 0 0 1 -62 -150Z", p.c) + P("M-250 -120 L-62 -150 A190 190 0 0 1 -250 70Z", p.b);
    const bars = [150, 250, 190, 330, 280]; bars.forEach((h, i) => { s += R(40 + i * 82, 80 - h + 150, 62, h, 12, [p.a, p.b, p.c][i % 3], sh); });
    s += L(20, 230, 450, 230, p.w, 8);
    s += C(-250, 310, 92, p.d, `stroke="${p.c}" stroke-width="8" ${sh}`) + T(-250, 346, "₹", 120, p.c, "middle", 900, "Georgia, serif");
    s += T(250, -230, "Tier I · II", 80, p.w, "middle", 900);
    return s;
  },
  "cat-quant": (p) => { // percent, venn, arrow
    let s = C(-130, -60, 210, p.a, `opacity="0.85" ${sh}`) + C(130, -60, 210, p.b, `opacity="0.85" ${sh}`);
    s += T(0, 10, "%", 210, p.w, "middle", 900, "Georgia, serif");
    s += R(-440, 230, 880, 150, 40, p.d, `stroke="${p.w}" stroke-width="6" ${sh}`) + T(0, 330, "Arithmetic · Algebra · Geometry", 52, p.w, "middle", 800);
    s += P("M-400 190 L-250 120 L-120 160 L60 70 L220 110 L420 -10", "none", p.c, 14) + P("M370 -20 L430 -8 L400 42", "none", p.c, 14);
    return s;
  },
  "sat-math": (p) => { // coordinate plane, parabola, line, ruler
    let s = R(-430, -400, 860, 640, 36, p.d, `stroke="${p.w}" stroke-width="6" ${sh}`);
    for (let i = -3; i <= 3; i++) s += L(-430, -80 + i * 100, 430, -80 + i * 100, "rgba(255,255,255,0.14)", 3) + L(i * 120, -400, i * 120, 240, "rgba(255,255,255,0.14)", 3);
    s += L(-430, -80, 430, -80, p.w, 7) + L(0, -400, 0, 240, p.w, 7);
    let d = ""; for (let x = -3.4; x <= 3.4; x += 0.1) d += `${d ? "L" : "M"}${f(x * 120)} ${f(150 - x * x * 40 - 90)}`;
    s += P(d, "none", p.a, 14) + L(-380, 190, 380, -300, p.c, 12) + C(-120, 190 - (260 * (-120 + 380)) / 760 * 1.0 + 0, 0, p.b);
    s += R(-440, 300, 880, 96, 22, p.c, sh);
    for (let i = 0; i < 17; i++) s += L(-410 + i * 51, 300, -410 + i * 51, i % 4 === 0 ? 346 : 328, p.d, 5);
    return s;
  },
  gre: (p) => { // quantity A vs B
    return R(-440, -300, 380, 380, 40, p.a, sh) + R(60, -300, 380, 380, 40, p.b, sh) + T(-250, -20, "A", 220, p.d, "middle", 900) + T(250, -20, "B", 220, p.d, "middle", 900) + T(-250, -230, "Quantity", 52, p.d, "middle", 800) + T(250, -230, "Quantity", 52, p.d, "middle", 800)
      + C(0, -110, 70, p.c, sh) + T(0, -80, "?", 100, p.d, "middle", 900) + R(-440, 150, 880, 200, 40, p.d, `stroke="${p.w}" stroke-width="6" ${sh}`) + T(0, 270, "Compare. Reason. Solve.", 64, p.w, "middle", 800);
  },
  gmat: (p) => { // data table + scatter
    let s = R(-440, -400, 520, 420, 30, p.d, `stroke="${p.w}" stroke-width="6" ${sh}`);
    for (let r = 0; r < 4; r++) { s += L(-440, -300 + r * 80, 80, -300 + r * 80, "rgba(255,255,255,0.25)", 3); } for (let c = 1; c < 4; c++) s += L(-440 + c * 130, -400, -440 + c * 130, 20, "rgba(255,255,255,0.25)", 3);
    s += R(-440, -400, 520, 100, 30, p.a);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) s += R(-420 + c * 130, r === 0 ? -378 : -285 + (r - 1) * 80, 90, 18, 9, r === 0 ? p.d : p.w, `opacity="${r === 0 ? 0.9 : 0.55}"`);
    s += R(120, -400, 330, 420, 30, p.d, `stroke="${p.w}" stroke-width="6" ${sh}`);
    const pts = [[160, -60], [210, -130], [260, -110], [300, -200], [350, -180], [400, -280]]; pts.forEach(([x, y], i) => { s += C(x, y, 20, [p.a, p.b, p.c][i % 3], sh); }); s += L(150, -30, 420, -300, p.w, 6, `stroke-dasharray="12 14"`);
    s += R(-440, 110, 890, 220, 40, p.c, sh) + T(5, 250, "Data Insights", 112, p.d, "middle", 900);
    return s;
  },
  ielts: (p) => { // globe, speech bubbles, band 9
    let s = C(-120, -100, 270, p.d, `stroke="${p.w}" stroke-width="8" ${sh}`);
    for (const rx of [270, 190, 90]) s += `<ellipse cx="-120" cy="-100" rx="${rx}" ry="270" fill="none" stroke="${p.a}" stroke-width="6" opacity="0.8"/>`;
    for (const y of [-220, -100, 20]) s += L(-380, y, 140, y, p.a, 6, `opacity="0.8"`);
    s += P("M200 -300 H440 Q480 -300 480 -260 V-180 Q480 -140 440 -140 H320 L270 -90 V-140 H200 Q160 -140 160 -180 V-260 Q160 -300 200 -300Z", p.c, "none", 0, sh) + T(320, -200, "Aa", 70, p.d, "middle", 900);
    s += P("M-440 160 H-130 Q-90 160 -90 200 V280 Q-90 320 -130 320 H-250 L-300 370 V320 H-440 Q-480 320 -480 280 V200 Q-480 160 -440 160Z", p.b, "none", 0, sh);
    s += C(250, 200, 140, p.c, `stroke="${p.w}" stroke-width="10" ${sh}`) + T(250, 262, "9", 200, p.d, "middle", 900, "Georgia, serif") + T(250, 380, "BAND", 44, p.w, "middle", 900, "Segoe UI, Arial", `letter-spacing="6"`);
    return s;
  },
  "ap-calculus": (p) => { // curve, tangent, area, d/dx
    let d = "M-440 260"; for (let x = -440; x <= 440; x += 10) d += `L${x} ${f(260 - 420 * (1 / (1 + Math.exp(-(x + 60) / 120))) * (1 - 0.35 * (x + 440) / 880))}`;
    let s = R(-460, -400, 920, 700, 36, p.d, `stroke="${p.w}" stroke-width="6" ${sh}`);
    s += P(d + "L440 260Z", p.a, "none", 0, `opacity="0.35"`) + L(-440, 260, 440, 260, p.w, 8) + L(-440, 260, -440, -380, p.w, 8);
    s += P(d, "none", p.c, 16) + L(-250, 190, 130, -110, p.b, 10) + C(-60, 40, 22, p.w);
    s += T(-240, -250, "d/dx", 130, p.w, "middle", 900, "Georgia, serif") + T(250, -250, "∫", 220, p.w, "middle", 900, "Georgia, serif");
    return s;
  },
};

const META = {
  jee: { pal: "indigocy", topics: "Mathematics · Physics · Chemistry", label: "JEE", sub: "Main & Advanced", hub: "jee" },
  neet: { pal: "emerald", label: "NEET UG", sub: "Medical entrance", hub: "neet" },
  upsc: { pal: "crimson", topics: "Polity · History · Geography · CSAT", label: "UPSC", sub: "Civil Services Prelims", hub: "upsc-prelims" },
  "ssc-cgl": { pal: "teal", topics: "Quant · Reasoning · English · Awareness", label: "SSC CGL", sub: "Government jobs", hub: "ssc-cgl" },
  "cat-quant": { pal: "royal", topics: "Arithmetic · Algebra · Geometry", label: "CAT Quant", sub: "MBA entrance", hub: "cat-quant" },
  "sat-math": { pal: "ocean", topics: "Algebra · Advanced Math · Data Analysis", label: "SAT Math", sub: "Study abroad (undergraduate)", hub: "sat" },
  gre: { pal: "plum", topics: "Arithmetic · Algebra · Geometry", label: "GRE Quant", sub: "Study abroad (graduate)", hub: "gre-maths" },
  gmat: { pal: "graphite", topics: "Arithmetic · Algebra · Data Insights", label: "GMAT Quant", sub: "Study abroad (MBA)", hub: "gmat-maths" },
  ielts: { pal: "sunsetmg", topics: "Reading · Writing · Speaking tests", label: "IELTS", sub: "English test for study abroad", hub: "ielts" },
  "ap-calculus": { pal: "midnight", topics: "Limits · Derivatives · Integration", label: "AP Calculus AB", sub: "Advanced Placement", hub: "ap-calculus-ab" },
};

function svg(key) {
  const m = META[key], p = PALETTES[m.pal];
  const h = hubs.find((x) => x.slug === m.hub);
  const topics = m.topics ?? h.sections.map((s) => s.name.replace(/^(Module \d+: |Reading: |Writing: |Writing Task \d \(General Training\): |Writing Task \d: )/, "")).filter((v, i, a) => a.indexOf(v) === i).slice(0, 3).map((t) => (t.length > 22 ? t.slice(0, 20).trim() + "…" : t)).join("  ·  ");
  const rnd = (() => { let s = 99 + key.length * 131 + key.charCodeAt(0); return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296); })();
  let floaters = ""; const g = ["+", "−", "×", "÷", "=", "π", "√", "∑", "%", "x²"];
  for (let i = 0; i < 24; i++) { const x = rnd() * W, y = rnd() * H; floaters += T(x, y, g[i % g.length], 44 + rnd() * 90, p.w, "middle", 800, "Georgia, serif", `opacity="${f(0.05 + rnd() * 0.08)}" transform="rotate(${f(rnd() * 50 - 25)} ${f(x)} ${f(y)})"`); }
  const size = m.label.length <= 6 ? 250 : m.label.length <= 8 ? 200 : m.label.length <= 10 ? 150 : 128;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.bg1}"/><stop offset="1" stop-color="${p.bg2}"/></linearGradient>
<radialGradient id="spot" cx="0.76" cy="0.5" r="0.55"><stop offset="0" stop-color="${p.a}" stop-opacity="0.38"/><stop offset="1" stop-color="${p.a}" stop-opacity="0"/></radialGradient>
<filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="14"/><feOffset dy="16"/><feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<pattern id="dots" width="44" height="44" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#fff" opacity="0.1"/></pattern>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#spot)"/><rect width="${W}" height="${H}" fill="url(#dots)"/>
${floaters}
<g transform="translate(1545 520) scale(0.72)">${ART[key](p)}</g>
<rect x="120" y="150" width="440" height="62" rx="31" fill="${p.a}"/>
<text x="340" y="193" font-family="Segoe UI, Arial" font-weight="900" font-size="30" letter-spacing="4" fill="${p.bg1}" text-anchor="middle">EXAM PREPARATION</text>
<text x="112" y="500" font-family="Segoe UI Black, Segoe UI, Arial" font-weight="900" font-size="${size}" fill="#ffffff" letter-spacing="-4">${esc(m.label)}</text>
<rect x="124" y="548" width="210" height="12" rx="6" fill="${p.c}"/>
<text x="124" y="650" font-family="Segoe UI, Arial" font-weight="700" font-size="46" fill="${p.w}" opacity="0.95">${esc(m.sub)}</text>
<text x="124" y="730" font-family="Georgia, serif" font-style="italic" font-size="38" fill="${p.b}">${esc(topics)}</text>
</svg>`;
}

const only = process.argv.slice(2);
for (const key of Object.keys(META)) {
  if (only.length && !only.includes(key)) continue;
  const buf = Buffer.from(svg(key));
  await sharp(buf).resize(W, H).webp({ quality: 84 }).toFile(path.join(out, `${key}.webp`));
  await sharp(buf).resize(640, 360).webp({ quality: 82 }).toFile(path.join(out, `${key}-640.webp`));
  process.stdout.write(`${key} ok\n`);
}
