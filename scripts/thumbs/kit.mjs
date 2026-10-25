/**
 * Drawing kit for the course thumbnails. Every helper returns an SVG fragment in a 1000 x 1000 scene space centred on (0, 0); the builder places and scales
 * the scene. Colours come from a palette `P` ({ bg1, bg2, a, b, c, d, w, k, light }). Nothing here is random except through the seeded `rng` a scene is given,
 * so a build always produces the same pictures.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
export const glyphs = JSON.parse(fs.readFileSync(path.join(here, "../../lib/market/data/course-glyphs.json"), "utf8"));

export function rng(seed) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) { h = Math.imul(h ^ seed.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let s = h >>> 0;
  return () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

let uidN = 0;
export const uid = (p = "u") => `${p}${++uidN}`;
export const resetUid = () => { uidN = 0; };
const f = (n) => Math.round(n * 10) / 10;

export const defs = () => `
<filter id="sh" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="16"/><feOffset dy="18"/><feComponentTransfer><feFuncA type="linear" slope="0.38"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="sh2" x="-30%" y="-30%" width="160%" height="170%"><feGaussianBlur in="SourceAlpha" stdDeviation="7"/><feOffset dy="8"/><feComponentTransfer><feFuncA type="linear" slope="0.28"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="gl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
<filter id="gl2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter>`;

/** A linear gradient definition; returns [defString, ref]. */
export function grad(c1, c2, angle = 90, id = uid("g")) {
  const r = (angle * Math.PI) / 180;
  const x = Math.cos(r) / 2, y = Math.sin(r) / 2;
  return [`<linearGradient id="${id}" x1="${f(0.5 - x)}" y1="${f(0.5 - y)}" x2="${f(0.5 + x)}" y2="${f(0.5 + y)}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`, `url(#${id})`];
}
/** A gradient-filled shape helper: wraps content with its own defs. */
export function gfill(c1, c2, angle, shapeFn) {
  const [d, ref] = grad(c1, c2, angle);
  return `<defs>${d}</defs>${shapeFn(ref)}`;
}

export const rect = (x, y, w, h, r, fill, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" rx="${r}" fill="${fill}" ${extra}/>`;
export const circle = (x, y, r, fill, extra = "") => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" ${extra}/>`;
export const line = (x1, y1, x2, y2, stroke, w = 4, extra = "") => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" ${extra}/>`;
export const path_ = (d, fill = "none", stroke = "none", w = 0, extra = "") => `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
export const g = (x, y, inner, extra = "") => `<g transform="translate(${f(x)} ${f(y)})" ${extra}>${inner}</g>`;
export const rot = (a, inner, cx = 0, cy = 0) => `<g transform="rotate(${a} ${cx} ${cy})">${inner}</g>`;
export const scale = (s, inner) => `<g transform="scale(${s})">${inner}</g>`;
export const text = (x, y, s, size, fill, weight = 700, family = "Consolas, Segoe UI", anchor = "start", extra = "") => `<text x="${f(x)}" y="${f(y)}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" ${extra}>${String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>`;

/** One of the course icons, drawn large with a stroke. `size` is the drawn width in scene units. */
export function icon(name, x, y, size, color, sw = 1.6, extra = "") {
  const body = glyphs[name] ?? glyphs.sparkles;
  const k = size / 24;
  return `<g transform="translate(${f(x - size / 2)} ${f(y - size / 2)}) scale(${f(k)})" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra}>${body}</g>`;
}

/** A soft glowing blob, for depth behind a scene. */
export const glow = (x, y, r, color, o = 0.5) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="${color}" opacity="${o}" filter="url(#gl2)"/>`;

/** An application window with a title bar. */
export function win(x, y, w, h, P, o = {}) {
  const { bar = true, fill = P.light ? "#ffffff" : "#0f172a", barFill = P.light ? "#e8edf5" : "#1e293b", radius = 26, title = "", shadow = true } = o;
  let s = `<g ${shadow ? 'filter="url(#sh)"' : ""}>${rect(x, y, w, h, radius, fill)}</g>`;
  if (bar) {
    s += `<clipPath id="${uid("c")}"></clipPath>`;
    s += path_(`M${x} ${y + 64}V${y + radius}Q${x} ${y} ${x + radius} ${y}H${x + w - radius}Q${x + w} ${y} ${x + w} ${y + radius}V${y + 64}Z`, barFill);
    s += circle(x + 40, y + 32, 9, "#ff6b6b") + circle(x + 70, y + 32, 9, "#ffd166") + circle(x + 100, y + 32, 9, "#4ade80");
    if (title) s += text(x + w / 2, y + 40, title, 22, P.light ? "#64748b" : "#94a3b8", 600, "Segoe UI", "middle");
  }
  return s;
}

/** Rows that read as lines of text. */
export function textLines(x, y, w, n, color, gap = 30, h = 12, r = rng("t")) {
  let s = "";
  for (let i = 0; i < n; i++) s += rect(x, y + i * gap, i === n - 1 ? w * (0.4 + r() * 0.3) : w * (0.7 + r() * 0.3), h, h / 2, color);
  return s;
}

const TOK = (P) => [P.a, P.b, P.c, P.w, "#94a3b8"];
/** Code-looking rows, syntax coloured, with indentation steps. */
export function codeRows(x, y, w, rows, P, r, o = {}) {
  const { gap = 38, h = 16, indent = [0, 0, 1, 2, 2, 1, 0, 1, 2, 0], numbers = true } = o;
  const cols = TOK(P);
  let s = "";
  for (let i = 0; i < rows; i++) {
    const ind = (indent[i % indent.length] ?? 0) * 40;
    let cx = x + (numbers ? 56 : 0) + ind;
    if (numbers) s += rect(x, y + i * gap, 24, h, 6, "#64748b", 'opacity="0.55"');
    const parts = 2 + Math.floor(r() * 3);
    for (let p = 0; p < parts; p++) {
      const pw = 50 + r() * 130;
      if (cx + pw > x + w - 20) break;
      s += rect(cx, y + i * gap, pw, h, h / 2, cols[Math.floor(r() * cols.length)], 'opacity="0.95"');
      cx += pw + 14;
    }
  }
  return s;
}

export function bars(x, y, w, h, vals, fills, o = {}) {
  const { gap = 0.3, r = 10, base = true } = o;
  const n = vals.length, bw = w / (n + (n - 1) * gap);
  let s = "";
  vals.forEach((v, i) => { const bh = h * v; s += rect(x + i * bw * (1 + gap), y + h - bh, bw, bh, r, Array.isArray(fills) ? fills[i % fills.length] : fills); });
  if (base) s += line(x - 16, y + h + 10, x + w + 16, y + h + 10, "#94a3b8", 3, 'opacity=".5"');
  return s;
}

export function lineChart(x, y, w, h, pts, stroke, o = {}) {
  const { width = 8, area = true, dots = true, fillTop = stroke } = o;
  const n = pts.length;
  const P2 = pts.map((v, i) => [x + (w * i) / (n - 1), y + h - h * v]);
  const d = P2.map((p, i) => `${i ? "L" : "M"}${f(p[0])} ${f(p[1])}`).join("");
  const id = uid("a");
  let s = "";
  if (area) s += `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${fillTop}" stop-opacity=".35"/><stop offset="1" stop-color="${fillTop}" stop-opacity="0"/></linearGradient></defs>` + path_(`${d}L${x + w} ${y + h}L${x} ${y + h}Z`, `url(#${id})`);
  s += path_(d, "none", stroke, width);
  if (dots) P2.forEach((p) => { s += circle(p[0], p[1], width * 1.1, "#fff", `stroke="${stroke}" stroke-width="${width * 0.55}"`); });
  return s;
}

export function donut(cx, cy, r, segs, w = 46) {
  const tot = segs.reduce((a, s) => a + s[0], 0);
  let a0 = -Math.PI / 2, out = "";
  for (const [v, col] of segs) {
    const a1 = a0 + (v / tot) * Math.PI * 2 - 0.04;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0), x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    out += path_(`M${f(x0)} ${f(y0)}A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${f(x1)} ${f(y1)}`, "none", col, w);
    a0 += (v / tot) * Math.PI * 2;
  }
  return out;
}

/** A graph of circles joined by lines. */
export function graph(nodes, edges, P, o = {}) {
  const { r = 26, stroke = P.b, fills = [P.a, P.b, P.c], w = 5 } = o;
  let s = "";
  edges.forEach(([a, b]) => { s += line(nodes[a][0], nodes[a][1], nodes[b][0], nodes[b][1], stroke, w, 'opacity=".55"'); });
  nodes.forEach((n, i) => { s += circle(n[0], n[1], n[2] ?? r, fills[i % fills.length]) + circle(n[0], n[1], (n[2] ?? r) * 0.45, "#fff", 'opacity=".85"'); });
  return s;
}

export function coin(cx, cy, r, P, label = "", o = {}) {
  const [d, ref] = grad(o.c1 ?? "#ffe08a", o.c2 ?? "#f59e0b", 60);
  let s = `<defs>${d}</defs><g filter="url(#sh2)">${circle(cx, cy, r, ref)}</g>${circle(cx, cy, r * 0.8, "none", `stroke="#fff" stroke-opacity=".55" stroke-width="${r * 0.07}"`)}`;
  if (label) s += text(cx, cy + r * 0.28, label, r * 0.9, "#b45309", 800, "Segoe UI", "middle");
  return s;
}

/** An isometric cube centred on (cx, cy) with edge length s. */
export function cube(cx, cy, s, top, left, right, o = {}) {
  const a = s * 0.866, b = s * 0.5;
  return `<g ${o.shadow === false ? "" : 'filter="url(#sh2)"'}>${path_(`M${f(cx)} ${f(cy - s)}L${f(cx + a)} ${f(cy - b)}L${f(cx)} ${f(cy)}L${f(cx - a)} ${f(cy - b)}Z`, top)}${path_(`M${f(cx - a)} ${f(cy - b)}L${f(cx)} ${f(cy)}L${f(cx)} ${f(cy + s)}L${f(cx - a)} ${f(cy + b)}Z`, left)}${path_(`M${f(cx + a)} ${f(cy - b)}L${f(cx)} ${f(cy)}L${f(cx)} ${f(cy + s)}L${f(cx + a)} ${f(cy + b)}Z`, right)}</g>`;
}

export const pill = (x, y, label, P, o = {}) => {
  const w = (o.w ?? label.length * 17 + 44);
  return `<g filter="url(#sh2)">${rect(x, y, w, 52, 26, o.fill ?? (P.light ? "#fff" : "#1e293b"))}</g>${text(x + w / 2, y + 35, label, 25, o.color ?? (P.light ? "#334155" : "#e2e8f0"), 700, "Consolas", "middle")}`;
};

/** A document page with a folded corner and some content. */
export function page(x, y, w, h, P, o = {}) {
  const { fill = "#ffffff", head = P.a, lines = 5, r = rng("pg") } = o;
  const c = 54;
  let s = `<g filter="url(#sh)">${path_(`M${x} ${y + 18}Q${x} ${y} ${x + 18} ${y}H${x + w - c}L${x + w} ${y + c}V${y + h - 18}Q${x + w} ${y + h} ${x + w - 18} ${y + h}H${x + 18}Q${x} ${y + h} ${x} ${y + h - 18}Z`, fill)}</g>`;
  s += path_(`M${x + w - c} ${y}V${y + c - 14}Q${x + w - c} ${y + c} ${x + w - c + 14} ${y + c}H${x + w}Z`, "#e2e8f0");
  s += rect(x + 34, y + 40, w * 0.5, 22, 11, head);
  s += textLines(x + 34, y + 96, w - 68, lines, "#cbd5e1", 34, 13, r);
  return s;
}

export const chipIcon = (name, x, y, P, o = {}) => {
  const s = o.size ?? 120;
  return `<g filter="url(#sh2)">${rect(x - s / 2, y - s / 2, s, s, s * 0.28, o.fill ?? (P.light ? "#fff" : "#1e293b"))}</g>${icon(name, x, y, s * 0.55, o.color ?? P.a, o.sw ?? 1.7)}`;
};

export const star = (x, y, r, fill, o = 0.9) => `<path d="M${f(x)} ${f(y - r)}Q${f(x + r * 0.16)} ${f(y - r * 0.16)} ${f(x + r)} ${f(y)}Q${f(x + r * 0.16)} ${f(y + r * 0.16)} ${f(x)} ${f(y + r)}Q${f(x - r * 0.16)} ${f(y + r * 0.16)} ${f(x - r)} ${f(y)}Q${f(x - r * 0.16)} ${f(y - r * 0.16)} ${f(x)} ${f(y - r)}Z" fill="${fill}" opacity="${o}"/>`;

export const dotsGrid = (x, y, cols, rows, gap, r, fill, o = 0.5) => { let s = ""; for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) s += circle(x + i * gap, y + j * gap, r, fill, `opacity="${o}"`); return s; };
export const ring = (x, y, r, stroke, w = 6, o = 0.6) => `<circle cx="${f(x)}" cy="${f(y)}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${w}" opacity="${o}"/>`;
