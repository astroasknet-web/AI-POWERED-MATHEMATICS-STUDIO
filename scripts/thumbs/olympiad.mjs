/**
 * Maths Olympiad thumbnails: one 1920x1080 and one 640x360 WebP per class in public/olympiad-thumbs (class-1.webp, class-1-640.webp ... class-12).
 *
 *   node scripts/thumbs/olympiad.mjs            all 12
 *   node scripts/thumbs/olympiad.mjs 3 7        only these classes
 *
 * Drawn in code, like the course thumbnails: each class has its own palette and its own picture (counting blocks, number line, fractions, times table,
 * shapes, a balance, an equation, Pythagoras, a parabola, the unit circle, a sequence, an integral). The three topics named on a picture are the first three
 * chapter titles of that class's own IMO course, read from content/lms/school, so the words always match what the class contains.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { PALETTES } from "./engine.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const out = path.join(root, "public/olympiad-thumbs");
fs.mkdirSync(out, { recursive: true });
const W = 1920, H = 1080;
const f = (n) => Math.round(n * 10) / 10;

const PAL = ["ember", "teal", "plum", "ocean", "forest", "crimson", "inkviolet", "sunsetmg", "indigocy", "emerald", "royal", "midnight"];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const chapters = (n) => {
  const dir = path.join(root, `content/lms/school/class-${n}/imo`);
  return fs.readdirSync(dir).filter((x) => x.endsWith(".json")).map((x) => JSON.parse(fs.readFileSync(path.join(dir, x), "utf8"))).sort((a, b) => a.number - b.number).map((c) => c.title).filter(Boolean);
};

/* ---- small drawing helpers (scene space is 1000 x 1000, centred on 0,0) ---- */
const R = (x, y, w, h, r, fill, ex = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}" fill="${fill}" ${ex}/>`;
const C = (x, y, r, fill, ex = "") => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" ${ex}/>`;
const L = (x1, y1, x2, y2, s, w = 6, ex = "") => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`;
const P = (d, fill = "none", s = "none", w = 0, ex = "") => `<path d="${d}" fill="${fill}" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${ex}/>`;
const T = (x, y, s, size, fill, anchor = "middle", weight = 800, fam = "Segoe UI, Arial", ex = "") => `<text x="${f(x)}" y="${f(y)}" font-family="${fam}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" ${ex}>${esc(s)}</text>`;
const shadow = `filter="url(#sh)"`;

/* ---- one picture per class ---- */
const ART = {
  1: (p) => { // counting blocks 1, 2, 3 in a staircase
    let s = "";
    const col = [p.a, p.b, p.c];
    for (let c = 0; c < 3; c++) for (let r = 0; r <= c; r++) s += R(-330 + c * 230, 230 - r * 215, 200, 200, 38, col[c], shadow) + T(-230 + c * 230, 355 - r * 215, String(c + 1), 110, p.d, "middle", 900);
    return s + T(0, -330, "1 + 2 + 3", 150, p.w, "middle", 900) + C(-300, -230, 22, p.c) + C(300, -230, 22, p.a) + C(0, -240 - 190, 0, p.b);
  },
  2: (p) => { // number line with jumps
    let s = L(-430, 120, 430, 120, p.w, 12);
    for (let i = 0; i <= 10; i++) { const x = -430 + i * 86; s += L(x, 90, x, 150, p.w, 8) + T(x, 240, String(i), 62, p.w, "middle", 800); }
    const jumps = [[0, 3, p.a], [3, 7, p.b], [7, 10, p.c]];
    for (const [a, b, col] of jumps) { const x1 = -430 + a * 86, x2 = -430 + b * 86, m = (x1 + x2) / 2, h = 150 + (b - a) * 14; s += P(`M${x1} 90 Q${m} ${90 - h} ${x2} 90`, "none", col, 12) + C(x2, 120, 22, col); }
    return s + C(-430, 120, 30, p.w) + T(0, -240, "+3  +4  +3", 130, p.w, "middle", 900);
  },
  3: (p) => { // three fraction pies
    const pie = (cx, cy, n, k, col) => { let s = C(cx, cy, 150, p.d, shadow) + C(cx, cy, 150, "none", `stroke="${p.w}" stroke-width="8"`); for (let i = 0; i < n; i++) { const a0 = (i / n) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2; const d = `M${cx} ${cy} L${f(cx + 150 * Math.cos(a0))} ${f(cy + 150 * Math.sin(a0))} A150 150 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${f(cx + 150 * Math.cos(a1))} ${f(cy + 150 * Math.sin(a1))}Z`; s += P(d, i < k ? col : "none", p.w, 6); } return s; };
    return pie(-260, -150, 2, 1, p.a) + pie(260, -150, 4, 3, p.b) + pie(0, 230, 8, 5, p.c) + T(-260, 90, "1/2", 78, p.w) + T(260, 90, "3/4", 78, p.w) + T(0, 480, "5/8", 78, p.w);
  },
  4: (p) => { // times table grid
    let s = "";
    for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) s += R(-340 + c * 118, -300 + r * 118, 104, 104, 22, (r + c) % 3 === 0 ? p.a : (r + c) % 3 === 1 ? p.b : p.c, `opacity="0.92"`) + T(-288 + c * 118, -228 + r * 118, String((r + 2) * (c + 2)), 44, p.d, "middle", 900);
    return s + R(-360, -320, 744, 744, 40, "none", `stroke="${p.w}" stroke-width="8"`) + T(0, 530, "6 × 7 = 42", 120, p.w, "middle", 900);
  },
  5: (p) => { // shapes with angle marks
    return P("M-380 220 L-60 -250 L260 220Z", p.a, p.w, 10, shadow) + R(-20, -60, 330, 330, 30, p.b, `transform="rotate(14 145 105)" opacity="0.95" ${shadow}`) + C(220, -230, 150, p.c, shadow) + P("M-300 220 A60 60 0 0 1 -330 160", "none", p.d, 10) + T(-250, 175, "60°", 56, p.w) + P("M-60 -250 L60 -250", "none", p.w, 6, `stroke-dasharray="14 16"`) + T(0, 400, "△  □  ○  ⬡", 130, p.w, "middle", 900);
  },
  6: (p) => { // balance scale / ratio
    return L(0, -300, 0, 280, p.w, 16) + R(-140, 270, 280, 34, 17, p.w) + L(-380, -250, 380, -330, p.w, 18) + L(-380, -250, -380, -60, p.w, 6) + L(380, -330, 380, -140, p.w, 6) + P("M-540 -60 H-220 Q-240 90 -380 90 Q-520 90 -540 -60Z", p.a, "none", 0, shadow) + P("M220 -140 H540 Q520 10 380 10 Q240 10 220 -140Z", p.b, "none", 0, shadow) + R(-450, -170, 70, 100, 12, p.c) + R(-370, -150, 70, 80, 12, p.c) + R(260, -250, 70, 100, 12, p.c) + R(340, -230, 70, 80, 12, p.c) + R(420, -230, 70, 80, 12, p.c) + T(0, 450, "2 : 3", 150, p.w, "middle", 900);
  },
  7: (p) => { // equation card
    return R(-420, -230, 840, 460, 56, p.d, `stroke="${p.w}" stroke-width="8" ${shadow}`) + T(0, 40, "x + 3 = 7", 150, p.w, "middle", 900) + R(-340, 120, 180, 70, 18, p.a) + T(-250, 170, "x = 4", 52, p.d, "middle", 900) + C(310, -150, 56, p.c) + T(310, -128, "?", 80, p.d, "middle", 900) + L(-340, -150, -60, -150, p.b, 10) + L(-340, -110, -160, -110, p.b, 10);
  },
  8: (p) => { // Pythagoras
    return P("M-200 120 L-200 -200 L180 120Z", p.a, p.w, 10, shadow) + R(-520, -200, 320, 320, 12, p.b, `opacity="0.9"`) + R(-200, 120, 380, 380, 12, p.c, `opacity="0.9"`) + P("M-200 -200 L180 120 L420 -140 L40 -460Z", p.d, p.w, 8, `opacity="0.95"`) + T(-360, -30, "a²", 100, p.d, "middle", 900) + T(-10, 330, "b²", 100, p.d, "middle", 900) + T(210, -170, "c²", 100, p.w, "middle", 900) + R(-200, 70, 50, 50, 4, "none", `stroke="${p.w}" stroke-width="7"`);
  },
  9: (p) => { // parabola on a plane
    let s = R(-440, -440, 880, 880, 36, p.d, `opacity="0.85" stroke="${p.w}" stroke-width="6"`);
    for (let i = -3; i <= 3; i++) s += L(-440, i * 110, 440, i * 110, "rgba(255,255,255,0.14)", 3) + L(i * 110, -440, i * 110, 440, "rgba(255,255,255,0.14)", 3);
    s += L(-440, 0, 440, 0, p.w, 7) + L(0, -440, 0, 440, p.w, 7);
    let d = ""; for (let x = -3.7; x <= 3.71; x += 0.1) d += `${d ? "L" : "M"}${f(x * 110)} ${f(330 - x * x * 50 - 40)}`;
    return s + P(d, "none", p.a, 16) + C(-220, 330 - 4 * 50 - 40 + 0, 0, p.b) + C(0, 290, 24, p.c) + C(165, 330 - 2.25 * 50 - 40, 24, p.b) + C(-165, 330 - 2.25 * 50 - 40, 24, p.b) + T(290, 400, "y = x²", 90, p.c, "middle", 900);
  },
  10: (p) => { // unit circle and sine wave
    let s = C(-230, 0, 240, "none", `stroke="${p.w}" stroke-width="10"`) + L(-500, 0, 40, 0, p.w, 5) + L(-230, -270, -230, 270, p.w, 5);
    const a = -Math.PI / 3, px = -230 + 240 * Math.cos(a), py = 240 * Math.sin(a);
    s += L(-230, 0, px, py, p.c, 12) + L(px, py, px, 0, p.b, 8, `stroke-dasharray="12 12"`) + C(px, py, 24, p.c) + P(`M-230 0 A60 60 0 0 0 ${f(-230 + 60 * Math.cos(a))} ${f(60 * Math.sin(a))}`, "none", p.a, 8);
    let d = ""; for (let t = 0; t <= 4 * Math.PI + 0.01; t += 0.12) d += `${d ? "L" : "M"}${f(40 + t * 62)} ${f(-Math.sin(t) * 150)}`;
    return s + P(d, "none", p.a, 14) + L(40, 0, 340, 0, p.w, 4) + T(-230, 400, "sin  cos  tan", 100, p.w, "middle", 900);
  },
  11: (p) => { // sequence rising bars + sigma
    let s = ""; const cols = [p.a, p.b, p.c];
    for (let i = 0; i < 7; i++) { const h = 70 + i * 62 + (i * i) * 4; s += R(-420 + i * 125, 300 - h, 100, h, 18, cols[i % 3], shadow); }
    return s + T(-250, -190, "Σ", 330, p.w, "middle", 900, "Georgia, serif") + T(110, -340, "aₙ = a₁ + (n−1)d", 66, p.w, "middle", 800) + P("M-420 120 Q-100 20 440 -190", "none", p.w, 8, `stroke-dasharray="4 20"`);
  },
  12: (p) => { // integral area
    let d = "M-430 300"; for (let x = -430; x <= 430; x += 10) d += `L${x} ${f(300 - 450 * (1 / (1 + Math.exp(-(x + 100) / 110))) * (1 - 0.3 * (x + 430) / 860))}`;
    const area = d + "L430 300Z";
    return P(area, p.a, "none", 0, `opacity="0.55"`) + P(d, "none", p.c, 16) + L(-440, 300, 440, 300, p.w, 8) + L(-430, 300, -430, -250, p.w, 8) + L(100, 300, 100, 60, p.w, 5, `stroke-dasharray="10 12"`) + T(-300, -190, "∫", 420, p.w, "middle", 900, "Georgia, serif") + T(180, -260, "area under", 70, p.w, "middle", 700) + T(180, -190, "the curve", 70, p.w, "middle", 700);
  },
};

const GLYPHS = { 1: "+ − 1 2 3 =", 2: "0 5 10 + −", 3: "½ ¼ ¾ ⅛", 4: "× 6 7 ÷ =", 5: "△ □ ○ ∠", 6: "% : ≈ 2 3", 7: "x y = + −", 8: "√ a² b² c²", 9: "x² y f(x)", 10: "sin cos θ π", 11: "Σ n aₙ Σ", 12: "∫ dx ∞ lim" };

function svg(n) {
  const p = PALETTES[PAL[n - 1]];
  const ch = chapters(n);
  const short = (s) => (s.length > 30 ? s.slice(0, 28).trim() + "…" : s);
  const topics = ch.filter(Boolean).slice(0, 2).map(short).join("  ·  ");
  const rnd = (() => { let s = 1234 + n * 977; return () => ((s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296); })();
  const g = GLYPHS[n].split(" ");
  let floaters = "";
  for (let i = 0; i < 26; i++) { const x = rnd() * W, y = rnd() * H, size = 44 + rnd() * 90; floaters += T(x, y, g[i % g.length], size, p.w, "middle", 800, "Georgia, serif", `opacity="${f(0.05 + rnd() * 0.09)}" transform="rotate(${f(rnd() * 50 - 25)} ${f(x)} ${f(y)})"`); }
  const big = String(n);
  const title = `Class ${n}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.bg1}"/><stop offset="1" stop-color="${p.bg2}"/></linearGradient>
<radialGradient id="spot" cx="0.74" cy="0.5" r="0.55"><stop offset="0" stop-color="${p.a}" stop-opacity="0.38"/><stop offset="1" stop-color="${p.a}" stop-opacity="0"/></radialGradient>
<filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="14"/><feOffset dy="16"/><feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<pattern id="dots" width="44" height="44" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#fff" opacity="0.1"/></pattern>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#spot)"/>
<rect width="${W}" height="${H}" fill="url(#dots)"/>
${floaters}
<text x="1500" y="900" font-family="Georgia, serif" font-weight="700" font-size="1000" fill="${p.w}" opacity="0.07" text-anchor="middle">${big}</text>
<g transform="translate(1490 520) scale(0.8)">${ART[n](p)}</g>
<g>
<rect x="120" y="150" width="470" height="62" rx="31" fill="${p.a}"/>
<text x="355" y="193" font-family="Segoe UI, Arial" font-weight="900" font-size="30" letter-spacing="4" fill="${p.bg1}" text-anchor="middle">MATHS OLYMPIAD · IMO</text>
<text x="112" y="500" font-family="Segoe UI Black, Segoe UI, Arial" font-weight="900" font-size="236" fill="#ffffff" letter-spacing="-4">${esc(title)}</text>
<rect x="124" y="548" width="210" height="12" rx="6" fill="${p.c}"/>
<text x="124" y="650" font-family="Segoe UI, Arial" font-weight="700" font-size="44" fill="${p.w}" opacity="0.95">${esc(ch.length)} chapters + full mock tests</text>
<text x="124" y="730" font-family="Georgia, serif" font-style="italic" font-size="40" fill="${p.b}">${esc(topics)}</text>
</g>
</svg>`;
}

const only = process.argv.slice(2).map(Number).filter(Boolean);
for (let n = 1; n <= 12; n++) {
  if (only.length && !only.includes(n)) continue;
  const buf = Buffer.from(svg(n));
  await sharp(buf).resize(W, H).webp({ quality: 84 }).toFile(path.join(out, `class-${n}.webp`));
  await sharp(buf).resize(640, 360).webp({ quality: 82 }).toFile(path.join(out, `class-${n}-640.webp`));
  process.stdout.write(`class ${n} ok\n`);
}
