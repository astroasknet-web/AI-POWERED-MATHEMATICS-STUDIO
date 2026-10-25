import sharp from "sharp";
import { defs, text, rng, resetUid, uid, dotsGrid, ring, line, circle, path_, rect } from "./kit.mjs";

export const W = 1920, H = 1080;

/** Curated palettes. Dark ones carry white type, light ones carry dark type. a/b/c are the artwork colours, d a deep tone, w a near-white. */
export const PALETTES = {
  midnight:  { bg1: "#0b1b3a", bg2: "#12306b", a: "#38bdf8", b: "#818cf8", c: "#fbbf24", d: "#1e3a8a", w: "#e0f2fe", k: "#ffffff" },
  teal:      { bg1: "#042f2e", bg2: "#0f766e", a: "#2dd4bf", b: "#a7f3d0", c: "#fde047", d: "#115e59", w: "#ccfbf1", k: "#ffffff" },
  plum:      { bg1: "#2e1065", bg2: "#6d28d9", a: "#f0abfc", b: "#c4b5fd", c: "#fdba74", d: "#4c1d95", w: "#f5f3ff", k: "#ffffff" },
  forest:    { bg1: "#052e16", bg2: "#166534", a: "#86efac", b: "#bef264", c: "#fde68a", d: "#14532d", w: "#dcfce7", k: "#ffffff" },
  ember:     { bg1: "#3b0d02", bg2: "#c2410c", a: "#fdba74", b: "#fcd34d", c: "#fef3c7", d: "#7c2d12", w: "#fff7ed", k: "#ffffff" },
  inkviolet: { bg1: "#1e1b4b", bg2: "#4338ca", a: "#a5b4fc", b: "#67e8f9", c: "#fda4af", d: "#312e81", w: "#eef2ff", k: "#ffffff" },
  ocean:     { bg1: "#082f49", bg2: "#0369a1", a: "#7dd3fc", b: "#5eead4", c: "#fef08a", d: "#0c4a6e", w: "#e0f2fe", k: "#ffffff" },
  graphite:  { bg1: "#111827", bg2: "#374151", a: "#fbbf24", b: "#f59e0b", c: "#e5e7eb", d: "#1f2937", w: "#f3f4f6", k: "#ffffff" },
  crimson:   { bg1: "#2a0a12", bg2: "#9f1239", a: "#fda4af", b: "#fecdd3", c: "#fde68a", d: "#4c0519", w: "#fff1f2", k: "#ffffff" },
  indigocy:  { bg1: "#172554", bg2: "#1d4ed8", a: "#22d3ee", b: "#a5f3fc", c: "#f0abfc", d: "#1e3a8a", w: "#ecfeff", k: "#ffffff" },
  emerald:   { bg1: "#022c22", bg2: "#047857", a: "#34d399", b: "#6ee7b7", c: "#fcd34d", d: "#064e3b", w: "#d1fae5", k: "#ffffff" },
  steel:     { bg1: "#0f172a", bg2: "#334155", a: "#94a3b8", b: "#38bdf8", c: "#f472b6", d: "#1e293b", w: "#f1f5f9", k: "#ffffff" },
  sunsetmg:  { bg1: "#3b0764", bg2: "#be185d", a: "#fb923c", b: "#fda4af", c: "#fde68a", d: "#581c87", w: "#fdf2f8", k: "#ffffff" },
  navylime:  { bg1: "#0a1a33", bg2: "#14396b", a: "#a3e635", b: "#67e8f9", c: "#fde047", d: "#0f2a52", w: "#ecfccb", k: "#ffffff" },
  cocoa:     { bg1: "#1c1210", bg2: "#5a3a2a", a: "#fbbf77", b: "#f5d0a9", c: "#86efac", d: "#3a2418", w: "#fff7ed", k: "#ffffff" },
  slatesky:  { bg1: "#0f2433", bg2: "#1e4a66", a: "#7dd3fc", b: "#fcd34d", c: "#fb7185", d: "#17364d", w: "#f0f9ff", k: "#ffffff" },
  royal:     { bg1: "#1a1446", bg2: "#3730a3", a: "#facc15", b: "#a78bfa", c: "#38bdf8", d: "#26208a", w: "#eef2ff", k: "#ffffff" },
  aquadeep:  { bg1: "#012a36", bg2: "#0e7490", a: "#67e8f9", b: "#bae6fd", c: "#fca5a5", d: "#0b4a5c", w: "#ecfeff", k: "#ffffff" },
  berry:     { bg1: "#2a0f2e", bg2: "#86198f", a: "#f5d0fe", b: "#e879f9", c: "#fde047", d: "#4a1a52", w: "#fdf4ff", k: "#ffffff" },
  onyxgreen: { bg1: "#0b0f0e", bg2: "#14332b", a: "#4ade80", b: "#22d3ee", c: "#fde047", d: "#0f2a23", w: "#ecfdf5", k: "#ffffff" },
  // light, paper-like
  paperblue: { bg1: "#eff6ff", bg2: "#bfdbfe", a: "#2563eb", b: "#0ea5e9", c: "#f59e0b", d: "#1e3a8a", w: "#ffffff", k: "#0f172a", light: true },
  mint:      { bg1: "#ecfdf5", bg2: "#a7f3d0", a: "#059669", b: "#14b8a6", c: "#f97316", d: "#064e3b", w: "#ffffff", k: "#052e22", light: true },
  peach:     { bg1: "#fff7ed", bg2: "#fed7aa", a: "#ea580c", b: "#f43f5e", c: "#0ea5e9", d: "#7c2d12", w: "#ffffff", k: "#431407", light: true },
  lilac:     { bg1: "#f5f3ff", bg2: "#ddd6fe", a: "#7c3aed", b: "#c026d3", c: "#10b981", d: "#4c1d95", w: "#ffffff", k: "#1e1b4b", light: true },
  sand:      { bg1: "#fefce8", bg2: "#fde68a", a: "#b45309", b: "#d97706", c: "#0f766e", d: "#78350f", w: "#ffffff", k: "#422006", light: true },
  sky:       { bg1: "#f0f9ff", bg2: "#bae6fd", a: "#0284c7", b: "#6366f1", c: "#f59e0b", d: "#0c4a6e", w: "#ffffff", k: "#082f49", light: true },
  rose:      { bg1: "#fff1f2", bg2: "#fecdd3", a: "#e11d48", b: "#f97316", c: "#6366f1", d: "#881337", w: "#ffffff", k: "#4c0519", light: true },
  lime:      { bg1: "#f7fee7", bg2: "#d9f99d", a: "#65a30d", b: "#16a34a", c: "#0ea5e9", d: "#365314", w: "#ffffff", k: "#1a2e05", light: true },
  ice:       { bg1: "#f8fafc", bg2: "#cbd5e1", a: "#334155", b: "#3b82f6", c: "#ef4444", d: "#0f172a", w: "#ffffff", k: "#0f172a", light: true },
  creamorg:  { bg1: "#fffbeb", bg2: "#fcd9a8", a: "#c2410c", b: "#0d9488", c: "#7c3aed", d: "#7c2d12", w: "#ffffff", k: "#3b1d0a", light: true },
};

const LAYOUTS = {
  L: { title: { x: 120, y: 250, w: 840 }, art: { x: 1405, y: 545, s: 880 }, align: "left" },
  R: { title: { x: 1000, y: 250, w: 800 }, art: { x: 500, y: 545, s: 880 }, align: "left" },
  B: { title: { x: 120, y: 640, w: 900 }, art: { x: 1460, y: 345, s: 660 }, align: "left" },
  C: { title: { x: 960, y: 170, w: 1500 }, art: { x: 960, y: 835, s: 520 }, align: "center" },
};

/** Text width in pixels, measured with the real font so titles never overflow. */
const cache = new Map();
export async function measure(str, family, size) {
  const key = `${family}|${size}|${str}`;
  if (cache.has(key)) return cache.get(key);
  const markup = `<span font="${family} ${size}">${str.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</span>`;
  const m = await sharp({ text: { text: markup, rgba: true, dpi: 72 } }).metadata();
  cache.set(key, m.width);
  return m.width;
}

async function wrap(str, family, size, maxW) {
  const words = str.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    const t = cur ? cur + " " + w : w;
    if ((await measure(t, family, size)) <= maxW || !cur) cur = t; else { lines.push(cur); cur = w; }
  }
  if (cur) lines.push(cur);
  return lines;
}

/** Fit a title: the biggest size (down to a floor) that sets in at most `maxLines` lines. */
async function fitTitle(str, family, maxW, maxLines, sizes) {
  for (const s of sizes) {
    const lines = await wrap(str, family, s, maxW);
    if (lines.length <= maxLines && (await Promise.all(lines.map((l) => measure(l, family, s)))).every((w) => w <= maxW)) return { size: s, lines };
  }
  const s = sizes[sizes.length - 1];
  return { size: s, lines: await wrap(str, family, s, maxW) };
}

export function splitTitle(title) {
  let main = title.trim(), sub = "";
  const par = main.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (par) { main = par[1]; sub = par[2]; }
  const sep = main.match(/^(.*?)\s*(?:—|:| \/ )\s*(.+)$/);
  if (sep) { sub = sep[2] + (sub ? ` · ${sub}` : ""); main = sep[1]; }
  return { main: main.trim(), sub: sub.trim() };
}

/** The background for a style, as SVG, drawn under everything. */
function background(style, P, r) {
  const id = uid("bg");
  let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.bg1}"/><stop offset="1" stop-color="${P.bg2}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#${id})"/>`;
  const ink = P.light ? P.d : "#ffffff";
  const o = P.light ? 0.1 : 0.09;
  if (style === "grid") {
    for (let x = 0; x <= W; x += 80) s += line(x, 0, x, H, ink, 1.5, `opacity="${o}"`);
    for (let y = 0; y <= H; y += 80) s += line(0, y, W, y, ink, 1.5, `opacity="${o}"`);
  } else if (style === "dots") {
    s += dotsGrid(40, 40, 24, 13, 80, 3.5, ink, o * 2);
  } else if (style === "rings") {
    for (let i = 0; i < 6; i++) s += ring(r() > 0.5 ? 1500 : 400, 540, 180 + i * 130, ink, 3, o * 1.4);
  } else if (style === "diagonal") {
    for (let i = -6; i < 30; i++) s += line(i * 110, H + 40, i * 110 + 700, -40, ink, 2, `opacity="${o}"`);
  } else if (style === "waves") {
    for (let i = 0; i < 7; i++) s += path_(`M-20 ${700 + i * 55}Q 400 ${620 + i * 55 + r() * 60} 960 ${700 + i * 55}T 1940 ${700 + i * 55}`, "none", ink, 3, `opacity="${o * 1.3}"`);
  } else if (style === "stripes") {
    for (let i = 0; i < 12; i++) s += rect(i * 170 - 40, 0, 70, H, 0, ink, `opacity="${o * 0.7}" transform="skewX(-14)"`);
  } else if (style === "orbs") {
    for (let i = 0; i < 5; i++) s += circle(r() * W, r() * H, 80 + r() * 200, ink, `opacity="${o * 0.8}"`);
  }
  return s;
}

/**
 * Compose one thumbnail. `concept` = { pal, layout, bg, scene, title, label, level, scale? }; `scene(P, rng)` returns SVG in 1000x1000 scene space.
 */
export async function compose(course, concept, scene) {
  resetUid();
  const P = PALETTES[concept.pal];
  if (!P) throw new Error(`palette ${concept.pal} missing for ${course.slug}`);
  const L = LAYOUTS[concept.layout];
  const r = rng(course.slug);
  const { main, sub } = splitTitle(course.title);
  const light = !!P.light;
  const fg = light ? P.k : "#ffffff";
  const soft = light ? P.d : "#dbeafe";
  const centered = L.align === "center";

  // Title block
  const family = "Segoe UI Black";
  const tw = L.title.w;
  const fit = await fitTitle(main, family, tw, concept.layout === "C" ? 2 : 3, centered ? [118, 108, 98, 90, 82, 74] : [124, 112, 102, 94, 86, 78, 70]);
  const lh = Math.round(fit.size * 1.08);
  const ax = centered ? L.title.x : L.title.x;
  const anchor = centered ? "middle" : "start";
  const y0 = concept.layout === "B" ? L.title.y : L.title.y;
  const blockH = fit.lines.length * lh;
  let ty = concept.layout === "B" ? 1000 - blockH - (sub ? 110 : 40) - 40 : (centered ? L.title.y + 90 : Math.round(540 - (blockH + (sub ? 130 : 40) + 110) / 2) + 110);
  if (concept.layout === "B") ty = Math.min(ty, 820 - blockH);
  let t = "";
  const labelY = ty - 62;
  t += text(ax, labelY, concept.label ?? course.cat_name, 34, light ? P.a : P.a, 400, "Georgia", anchor, 'font-style="italic" letter-spacing="1.5"');
  t += rect(centered ? ax - 40 : ax, labelY + 20, 80, 6, 3, P.c);
  fit.lines.forEach((ln, i) => { t += text(ax, ty + fit.size + i * lh - 12, ln, fit.size, fg, 900, family, anchor, 'letter-spacing="-1"'); });
  let by = ty + blockH + 24;
  if (sub) {
    const subLines = await wrap(sub, "Segoe UI", 44, tw);
    subLines.slice(0, 2).forEach((ln, i) => { t += text(ax, by + 44 + i * 56, ln, 44, soft, 500, "Segoe UI", anchor, 'opacity=".92"'); });
    by += subLines.slice(0, 2).length * 56 + 20;
  }
  if (concept.level) {
    const lw = (await measure(concept.level, "Segoe UI Semibold", 30)) + 56;
    const lx = centered ? ax - lw / 2 : ax;
    t += rect(lx, by + 36, lw, 56, 28, light ? "#ffffff" : "rgba(255,255,255,0.14)", light ? `stroke="${P.a}" stroke-width="2"` : 'stroke="rgba(255,255,255,0.35)" stroke-width="2"');
    t += text(lx + lw / 2, by + 74, concept.level, 30, light ? P.d : "#ffffff", 600, "Segoe UI Semibold", "middle");
  }

  const sc = (concept.scale ?? 1) * L.art.s / 1000;
  const art = `<g transform="translate(${L.art.x} ${L.art.y}) scale(${sc})">${scene(P, r)}</g>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs()}</defs>${background(concept.bg, P, r)}${art}${t}</svg>`;
  return svg;
}

export async function render(svg, file, file640) {
  const buf = Buffer.from(svg);
  const full = await sharp(buf).webp({ quality: 84, effort: 5 }).toFile(file);
  const small = await sharp(buf).resize(640, 360).webp({ quality: 80, effort: 5 }).toFile(file640);
  return { full, small };
}
