/** Scenes for Digital & Office Productivity, Data/Analytics/BI and AI & Machine Learning courses. */
import { win, rect, circle, line, path_, g, rot, text, icon, textLines, codeRows, bars, lineChart, donut, graph, coin, cube, pill, page, chipIcon, star, dotsGrid, ring, glow, grad, uid } from "./kit.mjs";

const dark = (P) => (P.light ? "#0f172a" : "#e2e8f0");
const panel = (P) => (P.light ? "#ffffff" : "#0f172a");
const mute = (P) => (P.light ? "#cbd5e1" : "#334155");

/** A spreadsheet window: header row, grid cells, and highlighted ranges. */
function sheet(P, x, y, w, h, cols, rows, hi = [], r) {
  let s = win(x, y, w, h, P, { title: "" });
  const gx = x + 30, gy = y + 100, cw = (w - 60) / cols, ch = (h - 130) / rows;
  s += rect(gx, gy, w - 60, ch, 6, P.light ? "#e2e8f0" : "#1e293b");
  for (let c = 0; c <= cols; c++) s += line(gx + c * cw, gy, gx + c * cw, gy + rows * ch, mute(P), 2, 'opacity=".7"');
  for (let rr = 0; rr <= rows; rr++) s += line(gx, gy + rr * ch, gx + cols * cw, gy + rr * ch, mute(P), 2, 'opacity=".7"');
  hi.forEach(([c0, r0, c1, r1, col, o = 0.28]) => { s += rect(gx + c0 * cw + 3, gy + r0 * ch + 3, (c1 - c0 + 1) * cw - 6, (r1 - r0 + 1) * ch - 6, 8, col, `opacity="${o}" stroke="${col}" stroke-width="3"`); });
  for (let rr = 1; rr < rows; rr++) for (let c = 0; c < cols; c++) if (r() > 0.35) s += rect(gx + c * cw + 14, gy + rr * ch + ch / 2 - 6, cw * (0.3 + r() * 0.4), 12, 6, dark(P), 'opacity=".35"');
  return s;
}

export const A = {
  "basic-computer-internet-literacy": (P, r) => {
    let s = glow(0, 0, 360, P.a, 0.4);
    s += win(-380, -250, 760, 480, P, { title: "" });
    s += rect(-340, -150, 680, 330, 14, P.light ? "#e0f2fe" : "#0b2447");
    s += circle(-120, -10, 90, P.a, 'opacity=".9"') + path_("M-120 -100v180M-210 -10h180", "none", "#fff", 6) + ring(-120, -10, 90, "#fff", 5, 0.8);
    s += rect(0, -110, 300, 38, 19, P.light ? "#fff" : "#1e3a5f") + circle(30, -91, 10, P.c) + rect(60, -97, 140, 12, 6, mute(P));
    s += textLines(10, -30, 290, 4, dark(P), 38, 12, r).replace(/fill="[^"]+"/g, `fill="${dark(P)}" opacity=".35"`);
    s += path_("M-90 230H90L130 290H-130Z", P.d) + rect(-230, 290, 460, 28, 14, P.b);
    s += chipIcon("wifi", 360, -280, P, { size: 130 }) + chipIcon("mail", -400, 250, P, { size: 110, color: P.c }) + chipIcon("globe", 400, 150, P, { size: 100, color: P.b });
    return s;
  },
  "digital-literacy-master": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.35);
    const items = [["monitor", -250, -140, P.a], ["smartphone", 20, -200, P.c], ["cloud", 250, -90, P.b], ["shield", -170, 130, P.c], ["mail", 110, 90, P.a], ["globe", 330, 190, P.c]];
    items.forEach(([n, x, y, c], i) => { s += line(0, 0, x, y, P.b, 4, 'opacity=".4"') + chipIcon(n, x, y, P, { size: 170 - i * 8, color: c }); });
    s += circle(0, 0, 100, P.a) + circle(0, 0, 100, "none", 'stroke="#fff" stroke-opacity=".5" stroke-width="6"') + icon("user", 0, 0, 100, "#fff", 1.8);
    return s;
  },
  "basic-microsoft-excel": (P, r) => {
    let s = glow(60, 40, 340, P.a, 0.35);
    s += sheet(P, -400, -270, 760, 540, 5, 7, [[0, 0, 4, 0, P.a, 0.5], [1, 2, 3, 4, P.c, 0.25]], r);
    s += g(90, 120, `<g filter="url(#sh)">${rect(0, 0, 330, 220, 22, panel(P))}</g>` + bars(40, 40, 250, 140, [0.4, 0.7, 0.5, 0.9, 0.65], [P.a, P.b, P.c]));
    s += text(-360, -178, "fx", 30, P.a, 800, "Georgia", "start", 'font-style="italic"') + rect(-300, -198, 360, 30, 8, mute(P), 'opacity=".6"');
    return s;
  },
  "advanced-excel": (P, r) => {
    let s = glow(0, 0, 360, P.c, 0.3);
    s += sheet(P, -460, -260, 640, 440, 5, 6, [[0, 0, 4, 0, P.b, 0.5], [2, 2, 4, 5, P.a, 0.22]], r);
    s += g(20, -120, `<g filter="url(#sh)">${rect(0, 0, 420, 400, 26, panel(P))}</g>` + donut(210, 190, 110, [[40, P.a], [28, P.c], [20, P.b], [12, "#f43f5e"]], 44) + rect(40, 40, 160, 22, 11, dark(P), 'opacity=".4"'));
    s += pill(-300, 230, "PIVOT", P, { color: P.a }) + pill(-120, 230, "XLOOKUP", P, { color: P.c });
    return s;
  },
  "excel-macros-vba": (P, r) => {
    let s = glow(0, 0, 360, P.a, 0.3);
    s += sheet(P, -480, -240, 560, 420, 4, 6, [[0, 0, 3, 0, P.c, 0.5]], r);
    s += win(-10, -120, 520, 440, P, { title: "" }) + codeRows(30, -20, 440, 8, P, r, { gap: 44, h: 18 });
    s += g(330, -260, rot(0, circle(0, 0, 70, P.d) + circle(0, 0, 28, P.bg1 ?? "#000") + Array.from({ length: 8 }, (_, i) => rot(i * 45, rect(-12, -92, 24, 34, 6, P.d))).join("")));
    s += g(440, -150, rot(0, circle(0, 0, 44, P.c) + circle(0, 0, 17, "#fff") + Array.from({ length: 8 }, (_, i) => rot(i * 45, rect(-8, -58, 16, 22, 4, P.c))).join("")));
    s += path_("M-60 260l40 -30l-40 -30", "none", P.a, 10) + rect(0, 244, 130, 16, 8, P.a);
    return s;
  },
  "google-workspace": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    const cards = [[-340, -230, "#4285f4"], [20, -270, "#34a853"], [-300, 60, "#fbbc05"], [60, 40, "#ea4335"]];
    cards.forEach(([x, y, c], i) => { s += page(x, y, 290, 340, P, { head: c, lines: 5 - (i % 2), r }); });
    s += chipIcon("users", 340, 290, P, { size: 130, color: P.a }) + chipIcon("cloud", -420, 280, P, { size: 110, color: P.c });
    return s;
  },
  "microsoft-word": (P, r) => {
    let s = glow(0, 0, 360, P.a, 0.3);
    s += page(-330, -330, 560, 660, P, { head: P.a, lines: 11, r });
    s += g(130, -80, `<g filter="url(#sh)">${rect(0, 0, 330, 360, 24, P.a)}</g>` + text(165, 240, "W", 260, "#fff", 900, "Segoe UI", "middle") );
    s += rect(-290, -100, 420, 26, 8, P.c, 'opacity=".25"') + rect(-290, -52, 300, 20, 8, P.b, 'opacity=".25"');
    s += g(-20, 200, `<g filter="url(#sh2)">${rect(0, 0, 220, 64, 32, panel(P))}</g>` + text(110, 44, "B  I  U", 30, dark(P), 800, "Segoe UI", "middle"));
    return s;
  },
  "powerpoint-presentation-design": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-400, -270, `<g filter="url(#sh)">${rect(0, 0, 800, 480, 28, panel(P))}</g>` + rect(50, 60, 360, 34, 12, P.a) + rect(50, 120, 280, 18, 9, mute(P)) + rect(50, 160, 320, 18, 9, mute(P)) + donut(600, 250, 110, [[45, P.a], [30, P.c], [25, P.b]], 50) + bars(50, 230, 300, 160, [0.4, 0.7, 0.55, 0.9], [P.b, P.a]));
    s += rect(-340, 250, 180, 100, 14, panel(P), `stroke="${P.a}" stroke-width="5"`) + rect(-130, 250, 180, 100, 14, panel(P), 'opacity=".7"') + rect(80, 250, 180, 100, 14, panel(P), 'opacity=".5"');
    s += path_("M260 300h160M380 270l40 30l-40 30", "none", P.c, 12) + chipIcon("presentation", 330, -330, P, { size: 120, color: P.a });
    return s;
  },
  // ---- Data, analytics, BI ----
  "data-analytics-python-sql": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += win(-470, -250, 520, 460, P, { title: "" }) + codeRows(-440, -150, 470, 7, P, r, { gap: 46 });
    s += g(-10, -230, `<g filter="url(#sh)">${rect(0, 0, 480, 430, 26, panel(P))}</g>` + lineChart(40, 60, 400, 220, [0.2, 0.45, 0.35, 0.7, 0.6, 0.95], P.a) + bars(40, 300, 400, 90, [0.5, 0.8, 0.4, 0.9, 0.6, 0.75], [P.b, P.c], { r: 6, base: false }));
    s += `<g filter="url(#sh2)">${rect(-250, 230, 320, 90, 45, P.c)}</g>` + text(-90, 290, "SELECT *", 38, "#1f2937", 800, "Consolas", "middle");
    s += pill(120, 250, "pandas", P, { color: P.a });
    return s;
  },
  "sql-for-data-business": (P, r) => {
    let s = glow(0, 0, 360, P.b, 0.32);
    const cyl = (x, y, col) => `<g filter="url(#sh2)">${path_(`M${x - 130} ${y}v150a130 44 0 0 0 260 0v-150`, col)}${`<ellipse cx="${x}" cy="${y}" rx="130" ry="44" fill="${P.w}" opacity=".95"/>`}${path_(`M${x - 130} ${y + 60}a130 44 0 0 0 260 0`, "none", "#fff", 5, 'opacity=".5"')}${path_(`M${x - 130} ${y + 110}a130 44 0 0 0 260 0`, "none", "#fff", 5, 'opacity=".5"')}</g>`;
    s += cyl(-230, -90, P.a) + cyl(240, -190, P.b) + cyl(160, 130, P.c);
    s += path_("M-110 -10C0 40 20 -100 120 -140", "none", P.w, 6, 'stroke-dasharray="4 18" opacity=".8"') + path_("M-120 60C-40 140 40 150 40 150", "none", P.w, 6, 'stroke-dasharray="4 18" opacity=".8"');
    s += win(-440, 120, 440, 230, P, { title: "" }) + text(-400, 210, "JOIN  orders", 34, P.a, 700, "Consolas") + text(-400, 262, "GROUP BY region", 34, P.c, 700, "Consolas") + text(-400, 314, "ORDER BY total", 34, P.b, 700, "Consolas");
    return s;
  },
  "business-analytics-power-bi": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-430, -300, `<g filter="url(#sh)">${rect(0, 0, 860, 620, 32, panel(P))}</g>` + rect(0, 0, 860, 78, 32, P.light ? "#fff7d6" : "#1f2a44") + circle(54, 39, 14, P.c) + rect(90, 28, 180, 22, 11, mute(P)));
    s += g(-400, -190, rect(0, 0, 240, 130, 18, P.c, 'opacity=".9"') + rect(260, 0, 240, 130, 18, P.a, 'opacity=".9"') + rect(520, 0, 240, 130, 18, P.b, 'opacity=".9"') + [0, 260, 520].map((x) => rect(x + 24, 28, 90, 18, 9, "#fff", 'opacity=".9"') + rect(x + 24, 66, 140, 30, 10, "#fff", 'opacity=".95"')).join(""));
    s += bars(-390, -10, 320, 230, [0.5, 0.8, 0.6, 0.95, 0.7, 0.55], [P.a, P.c]) + donut(110, 120, 100, [[38, P.a], [30, P.c], [20, P.b], [12, "#f43f5e"]], 46) + lineChart(250, 10, 150, 150, [0.3, 0.5, 0.4, 0.8], P.b, { width: 6, dots: false });
    return s;
  },
  "data-visualization-tableau": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += g(-440, -290, `<g filter="url(#sh)">${rect(0, 0, 880, 580, 30, panel(P))}</g>`);
    const cols = [P.a, P.b, P.c, "#f43f5e", "#a78bfa", "#22c55e"];
    for (let i = 0; i < 38; i++) { const x = -380 + (i % 9) * 80 + r() * 20, y = -230 + Math.floor(i / 9) * 70 + r() * 30; s += circle(x + 40, y + 40, 12 + r() * 26, cols[Math.floor(r() * cols.length)], 'opacity=".85"'); }
    s += path_("M-390 240C-250 120 -150 260 -20 160S210 120 380 230", "none", P.a, 10) + path_("M-390 280C-260 200 -120 300 40 220S260 190 380 270", "none", P.c, 10, 'opacity=".8"');
    s += `<g filter="url(#sh2)">${rect(150, -310, 260, 120, 22, P.light ? "#fff" : "#1e293b")}</g>` + rect(176, -285, 150, 18, 9, mute(P)) + text(176, -215, "+ + +", 46, P.c, 900, "Segoe UI");
    return s;
  },
  "advanced-excel-data-analysis": (P, r) => {
    let s = glow(0, 0, 360, P.a, 0.3);
    s += sheet(P, -470, -230, 520, 420, 4, 6, [[0, 1, 3, 4, P.a, 0.2]], r);
    s += g(30, -280, `<g filter="url(#sh)">${rect(0, 0, 440, 280, 24, panel(P))}</g>` + lineChart(34, 40, 372, 180, [0.35, 0.5, 0.42, 0.7, 0.62, 0.9], P.c));
    s += g(70, 40, `<g filter="url(#sh)">${rect(0, 0, 400, 270, 24, panel(P))}</g>` + bars(34, 34, 330, 190, [0.4, 0.65, 0.9, 0.55, 0.8], [P.a, P.b]));
    s += path_("M-250 240l60 -50l60 30l70 -80l60 50", "none", P.c, 12) + chipIcon("table", -400, 250, P, { size: 100 });
    return s;
  },
  "statistics-for-analysts": (P, r) => {
    let s = glow(0, 0, 360, P.c, 0.26);
    s += g(-450, -240, `<g filter="url(#sh)">${rect(0, 0, 900, 560, 30, panel(P))}</g>`);
    const pts = []; for (let i = 0; i <= 60; i++) { const x = -380 + i * 12.6, k = (i - 30) / 9; pts.push([x, 200 - 330 * Math.exp(-k * k / 2)]); }
    s += path_("M" + pts.map((p) => p.join(" ")).join("L") + "L370 200L-380 200Z", P.a, "none", 0, 'opacity=".22"') + path_("M" + pts.map((p) => p.join(" ")).join("L"), "none", P.a, 10);
    s += line(-10, -140, -10, 210, P.c, 5, 'stroke-dasharray="14 12"') + line(-190, 90, -190, 210, P.b, 4, 'stroke-dasharray="10 10" opacity=".8"') + line(170, 90, 170, 210, P.b, 4, 'stroke-dasharray="10 10" opacity=".8"');
    for (let i = 0; i < 26; i++) s += circle(-360 + r() * 720, 140 + r() * 60, 7, P.c, 'opacity=".75"');
    s += text(-390, -170, "μ  σ", 64, P.c, 700, "Georgia", "start", 'font-style="italic"') + text(150, 280, "p < 0.05", 36, dark(P), 700, "Consolas") + chipIcon("chartLine", 380, -240, P, { size: 100 });
    return s;
  },
  "data-engineering-fundamentals": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    const rack = (x, y, c) => `<g filter="url(#sh2)">${rect(x, y, 220, 300, 22, panel(P))}</g>` + [0, 1, 2, 3].map((i) => rect(x + 24, y + 28 + i * 66, 172, 46, 12, mute(P)) + circle(x + 52, y + 51 + i * 66, 8, i % 2 ? c : P.c) + rect(x + 80, y + 45 + i * 66, 80, 12, 6, dark(P), 'opacity=".4"')).join("");
    s += rack(-440, -150, P.a) + rack(-110, -150, P.b) + rack(220, -150, P.a);
    s += path_("M-210 200C-210 260 -110 260 -110 200M110 200C110 260 220 260 220 200", "none", P.c, 8) + path_("M-330 -190v-60M0 -190v-60M330 -190v-60", "none", P.c, 8);
    s += rect(-440, 260, 880, 40, 20, P.d, 'opacity=".8"') + Array.from({ length: 9 }, (_, i) => rect(-400 + i * 100, 270, 44, 20, 10, P.c)).join("");
    s += chipIcon("database", -380, -310, P, { size: 100 }) + chipIcon("server", 380, -310, P, { size: 100, color: P.c });
    return s;
  },
  "google-analytics-4": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.28);
    s += g(-440, -280, `<g filter="url(#sh)">${rect(0, 0, 640, 520, 30, panel(P))}</g>` + lineChart(50, 130, 540, 300, [0.2, 0.38, 0.3, 0.52, 0.5, 0.72, 0.95], P.c) + rect(50, 54, 220, 24, 12, mute(P)) + circle(560, 66, 16, P.a));
    s += g(160, -130, `<g filter="url(#sh)">${rect(0, 0, 280, 380, 26, panel(P))}</g>` + [0, 1, 2, 3].map((i) => rect(30, 40 + i * 80, 220 - i * 40, 34, 17, [P.a, P.b, P.c, P.d][i])).join(""));
    s += `<circle cx="-60" cy="250" r="86" fill="${P.light ? "#fff" : "#1e293b"}" stroke="${P.a}" stroke-width="14"/>` + path_("M-6 312l80 90", "none", P.a, 26) + icon("trendingUp", -60, 250, 80, P.c, 2.2);
    return s;
  },
  // ---- AI & ML ----
  "ai-literacy-productivity": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.38);
    s += g(-330, -320, `<g filter="url(#sh)">${rect(0, 0, 560, 200, 100, panel(P), "")}</g>` + textLines(70, 54, 400, 3, mute(P), 42, 16, r) + path_("M60 200l-20 70l70 -40Z", panel(P)));
    s += g(-20, -40, `<g filter="url(#sh)">${rect(0, 0, 560, 210, 100, P.a)}</g>` + textLines(80, 60, 380, 3, "#ffffff", 42, 16, r) + path_("M500 210l30 70l-90 -60Z", P.a));
    s += star(-360, 210, 70, P.c) + star(330, -330, 50, P.b) + star(380, 270, 36, P.c) + chipIcon("sparkles", -330, 130, P, { size: 120, color: P.c }) + chipIcon("clock", 250, 250, P, { size: 110, color: P.b });
    return s;
  },
  "prompt-engineering": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.35);
    s += win(-450, -280, 900, 330, P, { title: "" }) + text(-410, -150, ">", 70, P.c, 900, "Consolas") + rect(-350, -180, 560, 26, 13, P.a) + rect(-350, -130, 420, 26, 13, P.b, 'opacity=".8"') + rect(-350, -80, 500, 26, 13, mute(P)) + rect(240, -86, 20, 40, 4, P.c);
    s += g(-330, 90, `<g filter="url(#sh)">${rect(0, 0, 680, 190, 40, P.a)}</g>` + textLines(50, 46, 560, 3, "#fff", 40, 15, r) + path_("M600 190l50 60l-110 -40Z", P.a));
    s += pill(-440, 330, "{ role: user }", P, { color: P.a }) + pill(40, 330, "temperature 0.7", P, { color: P.c }) + star(400, -330, 56, P.c) + star(-480, -330, 40, P.b);
    return s;
  },
  "machine-learning-python": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += g(-440, -290, `<g filter="url(#sh)">${rect(0, 0, 640, 560, 30, panel(P))}</g>`);
    for (let i = 0; i < 46; i++) { const x = -400 + r() * 560, y = -250 + r() * 480, up = y < 220 - x * 0.5 - 60 + r() * 20; s += circle(x + 40, y + 10, 11, up ? P.a : P.c, 'opacity=".9"'); }
    s += line(-400, 230, 230, -230, P.w, 8, 'opacity=".9"') + path_("M-400 230L230 -230", "none", P.b, 4, 'stroke-dasharray="14 12"');
    s += win(230, -120, 280, 330, P, { title: "" }) + codeRows(250, -20, 240, 5, P, r, { gap: 44, numbers: false, h: 16 });
    s += chipIcon("brain", 300, 290, P, { size: 130, color: P.c }) + pill(-280, 270, "fit()  predict()", P, { color: P.b });
    return s;
  },
  "deep-learning-neural-networks": (P, r) => {
    let s = glow(0, 0, 400, P.b, 0.34);
    const layers = [3, 5, 6, 5, 2], nodes = [], edges = [];
    layers.forEach((n, li) => { for (let i = 0; i < n; i++) nodes.push([-420 + li * 210, (i - (n - 1) / 2) * 120, 24]); });
    let idx = 0; const starts = [];
    layers.forEach((n) => { starts.push(idx); idx += n; });
    for (let li = 0; li < layers.length - 1; li++) for (let a = 0; a < layers[li]; a++) for (let b = 0; b < layers[li + 1]; b++) edges.push([starts[li] + a, starts[li + 1] + b]);
    s += graph(nodes, edges, P, { stroke: P.w, w: 2.5, fills: [P.a, P.b, P.c, P.a, P.b] });
    s += path_("M-420 -330H420", "none", P.a, 4, 'opacity=".4"') + text(-440, -300, "input", 28, P.w, 600, "Consolas") + text(360, -300, "output", 28, P.w, 600, "Consolas", "end") + chipIcon("network", 0, 340, P, { size: 110, color: P.c });
    return s;
  },
  "natural-language-processing": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    const words = [["The", P.a], ["model", P.b], ["reads", P.c], ["language", P.a], ["as", P.b], ["tokens", P.c]];
    let x = -420, y = -230;
    words.forEach(([w, c], i) => { const ww = w.length * 36 + 60; if (x + ww > 440) { x = -420; y += 110; } s += `<g filter="url(#sh2)">${rect(x, y, ww, 80, 40, panel(P))}</g>` + rect(x, y + 66, ww, 14, 7, c, 'opacity=".9"') + text(x + ww / 2, y + 54, w, 38, dark(P), 700, "Segoe UI", "middle"); x += ww + 24; });
    s += path_("M-380 130C-260 40 -120 220 20 130S240 40 380 130", "none", P.w, 5, 'opacity=".6"');
    s += g(-420, 190, `<g filter="url(#sh)">${rect(0, 0, 420, 150, 40, P.a)}</g>` + textLines(44, 40, 320, 3, "#fff", 34, 13, r)) + g(40, 250, `<g filter="url(#sh)">${rect(0, 0, 380, 120, 40, P.c)}</g>` + textLines(40, 36, 290, 2, "#1f2937", 34, 13, r));
    s += chipIcon("message", 370, -300, P, { size: 110, color: P.b });
    return s;
  },
  "generative-ai-llm-development": (P, r) => {
    let s = glow(0, 0, 420, P.c, 0.3) + glow(-120, 60, 240, P.a, 0.3);
    s += g(0, 0, `<g filter="url(#sh)">${circle(0, 0, 210, P.d)}</g>` + circle(0, 0, 210, "none", `stroke="${P.a}" stroke-width="10"`) + circle(0, 0, 150, "none", `stroke="${P.c}" stroke-width="6" opacity=".7"`));
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; s += line(Math.cos(a) * 150, Math.sin(a) * 150, Math.cos(a) * 330, Math.sin(a) * 330, P.w, 4, 'opacity=".5"') + circle(Math.cos(a) * 330, Math.sin(a) * 330, 18, i % 2 ? P.a : P.c); }
    s += star(0, 0, 130, P.w, 1) + star(250, -250, 60, P.c) + star(-280, 250, 46, P.a);
    s += pill(-470, -380, "LLM", P, { color: P.a }) + pill(190, 360, "RAG", P, { color: P.c }) + pill(-480, 330, "API", P, { color: P.b });
    return s;
  },
  "agentic-ai-multi-agent": (P, r) => {
    let s = glow(0, 0, 400, P.a, 0.3);
    const center = [0, 0], ring_ = [[-330, -200], [330, -200], [380, 150], [0, 300], [-380, 150]];
    ring_.forEach(([x, y]) => { s += line(0, 0, x, y, P.w, 5, 'stroke-dasharray="6 14" opacity=".7"'); });
    ring_.forEach(([x, y], i) => { s += `<g filter="url(#sh2)">${circle(x, y, 78, panel(P))}</g>` + icon(["code", "search", "database", "mail", "chartBar"][i], x, y, 80, [P.a, P.b, P.c, P.a, P.b][i], 1.9); });
    s += `<g filter="url(#sh)">${circle(0, 0, 118, P.a)}</g>` + `<rect x="-62" y="-52" width="124" height="104" rx="30" fill="#fff"/>` + circle(-24, -6, 13, P.d) + circle(24, -6, 13, P.d) + path_("M-22 26q22 16 44 0", "none", P.d, 7) + line(0, -52, 0, -86, "#fff", 6) + circle(0, -92, 10, P.c);
    return s;
  },
  "mlops-model-deployment": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += rect(-460, 170, 920, 60, 30, P.d) + Array.from({ length: 11 }, (_, i) => rect(-430 + i * 84, 192, 40, 16, 8, P.w, 'opacity=".6"')).join("");
    s += cube(-300, 90, 90, P.a, P.d, P.b) + cube(-40, 90, 90, P.c, P.d, P.a) + cube(220, 90, 90, P.b, P.d, P.c);
    s += g(-330, -330, `<g filter="url(#sh)">${rect(0, 0, 330, 160, 28, panel(P))}</g>` + path_("M30 110l50 -40l40 30l70 -60l60 20", "none", P.a, 8) + circle(280, 40, 16, "#22c55e"));
    s += g(70, -330, `<g filter="url(#sh)">${rect(0, 0, 330, 160, 28, panel(P))}</g>` + icon("cloud", 165, 80, 100, P.b, 1.7));
    s += path_("M-170 -150C-120 -60 -150 20 -170 60M230 -170C260 -60 230 20 220 60", "none", P.c, 6, 'stroke-dasharray="3 14"') + chipIcon("cog", 400, 330, P, { size: 110 }) + chipIcon("repeat", -400, 340, P, { size: 100, color: P.c });
    return s;
  },
  "computer-vision-essentials": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.28);
    s += g(-450, -290, `<g filter="url(#sh)">${rect(0, 0, 900, 580, 30, P.d)}</g>`);
    s += path_("M-450 120L-250 -60L-60 100L150 -120L450 120V290H-450Z", P.b, "none", 0, 'opacity=".55"') + circle(220, -190, 60, P.c, 'opacity=".9"');
    const box = (x, y, w, h, c, label) => rect(x, y, w, h, 10, "none", `stroke="${c}" stroke-width="7"`) + rect(x, y - 44, label.length * 18 + 26, 40, 8, c) + text(x + 13, y - 14, label, 26, "#0b1220", 800, "Consolas");
    s += box(-330, -100, 250, 300, P.a, "person") + box(40, 10, 220, 190, P.c, "tree") + box(290, -110, 130, 110, "#f43f5e", "sun");
    s += icon("eye", 0, 330, 110, P.a, 1.8) + `<g stroke="${P.w}" stroke-width="4" opacity=".6">${[-1, 1].map((sx) => [-1, 1].map((sy) => `<path d="M${sx * 440} ${sy * 280 - sy * 40}v${sy * 40}h${-sx * 40}" fill="none"/>`).join("")).join("")}</g>`;
    return s;
  },
  "ai-for-business-leaders": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.32);
    s += circle(0, 20, 300, "none", `stroke="${P.w}" stroke-width="3" opacity=".3"`) + circle(0, 20, 210, "none", `stroke="${P.w}" stroke-width="3" opacity=".4"`) + circle(0, 20, 120, P.c, 'opacity=".95"') + circle(0, 20, 50, P.d);
    s += path_("M0 20L260 -250", "none", P.a, 10) + path_("M215 -210l45 -40l-60 -5Z", P.a, P.a, 4);
    s += g(-450, -330, `<g filter="url(#sh)">${rect(0, 0, 360, 170, 26, panel(P))}</g>` + bars(34, 34, 290, 100, [0.4, 0.55, 0.7, 0.92], [P.a, P.c], { r: 6, base: false }));
    s += g(120, 160, `<g filter="url(#sh)">${rect(0, 0, 360, 200, 26, panel(P))}</g>` + lineChart(34, 34, 290, 120, [0.2, 0.4, 0.3, 0.7, 0.9], P.b, { width: 6 }));
    s += chipIcon("sparkles", -330, 230, P, { size: 130, color: P.c }) + chipIcon("briefcase", 380, -330, P, { size: 110, color: P.b });
    return s;
  },
  "responsible-ethical-ai": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += g(0, 0, `<g filter="url(#sh)">${path_("M0 -330L270 -230V10C270 170 150 270 0 330C-150 270 -270 170 -270 10V-230Z", P.a)}</g>` + path_("M0 -270L220 -190V6C220 130 120 214 0 270C-120 214 -220 130 -220 6V-190Z", P.d, "none", 0, 'opacity=".55"'));
    s += rect(-12, -150, 24, 240, 8, "#fff") + rect(-150, -150, 300, 18, 9, "#fff") + path_("M-150 -140l-70 130h140ZM150 -140l-70 130h140Z", "none", "#fff", 8) + path_("M-220 -10a70 40 0 0 0 140 0M80 -10a70 40 0 0 0 140 0", "#fff") + circle(0, 150, 30, P.c);
    s += chipIcon("users", -400, -250, P, { size: 110, color: P.a }) + chipIcon("eye", 400, -230, P, { size: 110, color: P.c }) + chipIcon("heart", 390, 250, P, { size: 100, color: P.b });
    return s;
  },
  "data-science-python": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += g(-470, -300, `<g filter="url(#sh)">${rect(0, 0, 600, 520, 30, panel(P))}</g>` + lineChart(40, 70, 520, 280, [0.3, 0.45, 0.4, 0.62, 0.55, 0.85, 0.7], P.a) + [0, 1, 2].map((i) => circle(60 + i * 40, 440, 12, [P.c, P.b, P.a][i])).join(""));
    s += win(80, -170, 400, 330, P, { title: "" }) + codeRows(100, -70, 360, 5, P, r, { gap: 44, numbers: false });
    s += g(-120, 180, `<g filter="url(#sh)">${rect(0, 0, 360, 190, 26, panel(P))}</g>` + donut(110, 95, 62, [[40, P.a], [30, P.c], [30, P.b]], 30) + textLines(200, 60, 120, 3, mute(P), 30, 12, r));
    s += chipIcon("brain", 400, 260, P, { size: 110, color: P.c });
    return s;
  },
  "data-analytics-python": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-460, -280, `<g filter="url(#sh)">${rect(0, 0, 920, 520, 30, panel(P))}</g>` + bars(50, 70, 380, 330, [0.4, 0.75, 0.55, 0.9, 0.65], [P.a, P.c], { r: 12 }) + lineChart(480, 90, 380, 220, [0.3, 0.5, 0.42, 0.78, 0.9], P.b) + donut(660, 380, 56, [[50, P.a], [30, P.c], [20, P.b]], 22));
    s += win(-380, 130, 420, 210, P, { title: "" }) + text(-340, 226, "df.groupby()", 30, P.c, 700, "Consolas") + text(-340, 274, "plt.show()", 30, P.a, 700, "Consolas");
    s += chipIcon("chartBar", 240, 300, P, { size: 120, color: P.b }) + chipIcon("code", 400, 330, P, { size: 100, color: P.c });
    return s;
  },
};
