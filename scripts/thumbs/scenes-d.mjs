/** Scenes for Finance, Entrepreneurship, Communication & Career, Languages, Test Prep, Health, Life Skills and the BBA course. */
import { win, rect, circle, line, path_, g, rot, text, icon, textLines, codeRows, bars, lineChart, donut, graph, coin, cube, pill, page, chipIcon, star, dotsGrid, ring, glow } from "./kit.mjs";

const dark = (P) => (P.light ? "#0f172a" : "#e2e8f0");
const panel = (P) => (P.light ? "#ffffff" : "#0f172a");
const mute = (P) => (P.light ? "#cbd5e1" : "#334155");
const card = (x, y, w, h, P, inner = "", r = 28) => g(x, y, `<g filter="url(#sh)">${rect(0, 0, w, h, r, panel(P))}</g>${inner}`);
const bubble = (x, y, w, h, fill, tail = "l", P) => `<g filter="url(#sh)">${rect(x, y, w, h, h / 2.4, fill)}${tail === "l" ? path_(`M${x + 50} ${y + h - 6}l-30 56l76 -40Z`, fill) : path_(`M${x + w - 50} ${y + h - 6}l30 56l-76 -40Z`, fill)}</g>`;
const ledger = (P, x, y, w, h, r) => `<g filter="url(#sh)">${rect(x, y, w, h, 24, "#fffdf5")}</g>` + rect(x + w / 2 - 4, y, 8, h, 0, "#e5dcc3") + [0, 1, 2, 3, 4, 5].map((i) => line(x + 30, y + 80 + i * 56, x + w / 2 - 24, y + 80 + i * 56, "#d6cdb4", 3) + line(x + w / 2 + 24, y + 80 + i * 56, x + w - 30, y + 80 + i * 56, "#d6cdb4", 3)).join("") + [0, 1, 2, 3].map((i) => rect(x + 30, y + 64 + i * 56, 70 + (i % 3) * 30, 14, 7, P.a, 'opacity=".6"') + rect(x + w / 2 + 24, y + 64 + i * 56, 80 + (i % 2) * 40, 14, 7, P.c, 'opacity=".7"')).join("");

export const D = {
  "financial-literacy-investing": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.32);
    s += coin(-250, 120, 150, P, "₹") + coin(-60, 200, 110, P, "₹") + coin(-290, -90, 90, P, "₹");
    s += card(20, -250, 460, 330, P, lineChart(40, 60, 380, 210, [0.2, 0.3, 0.28, 0.5, 0.62, 0.85], P.a) + rect(40, 24, 150, 18, 9, mute(P)));
    s += g(120, 140, `<g filter="url(#sh)">${rect(0, 0, 360, 130, 30, P.c)}</g>` + text(180, 84, "SIP", 64, "#1f2937", 900, "Segoe UI", "middle") + icon("trendingUp", 300, 66, 64, "#1f2937", 2.4));
    s += chipIcon("wallet", 400, 300, P, { size: 100, color: P.b });
    return s;
  },
  "basic-accounting-bookkeeping": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += ledger(P, -470, -230, 620, 460, r);
    s += g(170, -190, `<g filter="url(#sh)">${rect(0, 0, 300, 400, 28, panel(P))}</g>` + [0, 1, 2, 3].map((i) => rect(30 + (i % 2) * 130, 36 + Math.floor(i / 2) * 90, 110, 64, 14, [P.a, P.b, P.c, P.a][i])).join("") + [0, 1, 2].map((i) => rect(30, 230 + i * 50, 240, 20, 10, mute(P))).join(""));
    s += text(-160, 280, "Dr  |  Cr", 56, P.a, 900, "Georgia", "middle", 'font-style="italic"') + chipIcon("calculator", 380, 290, P, { size: 100, color: P.c });
    return s;
  },
  "tally-gst-compliance": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += page(-450, -300, 420, 560, P, { head: P.a, lines: 8, r });
    s += g(-60, -250, `<g filter="url(#sh)">${rect(0, 0, 500, 360, 30, panel(P))}</g>` + text(250, 130, "GST", 130, P.a, 900, "Segoe UI", "middle") + [0, 1, 2, 3].map((i) => rect(40, 190 + i * 40, 420, 14, 7, mute(P))).join("") + rect(40, 24, 160, 22, 11, P.c));
    s += g(-30, 170, `<g filter="url(#sh2)">${rect(0, 0, 250, 110, 28, P.c)}</g>` + text(125, 76, "% 18", 52, "#1f2937", 900, "Segoe UI", "middle")) + g(250, 170, `<g filter="url(#sh2)">${rect(0, 0, 230, 110, 28, P.a)}</g>` + path_("M60 56l36 36l70 -70", "none", "#fff", 14));
    s += chipIcon("calculator", -380, 320, P, { size: 100, color: P.b });
    return s;
  },
  "executive-financial-management": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += card(-450, -300, 600, 400, P, lineChart(40, 60, 520, 260, [0.3, 0.42, 0.38, 0.6, 0.55, 0.78, 0.95], P.a) + rect(40, 24, 140, 18, 9, mute(P)));
    s += g(200, -240, `<g filter="url(#sh)">${rect(0, 0, 260, 300, 28, panel(P))}</g>` + donut(130, 120, 70, [[50, P.a], [30, P.c], [20, P.b]], 30) + rect(40, 240, 180, 16, 8, mute(P)));
    s += bars(-440, 170, 480, 170, [0.5, 0.7, 0.4, 0.9, 0.65, 0.8], [P.b, P.c], { r: 10 }) + coin(300, 250, 100, P, "₹") + chipIcon("briefcase", 400, -300, P, { size: 90, color: P.b });
    return s;
  },
  "crypto-blockchain-basics": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.34);
    s += coin(-110, 20, 190, P, "₿", { c1: "#fde68a", c2: "#f59e0b" });
    const chain = (x, y, c) => `<g filter="url(#sh2)">${rect(x, y, 150, 90, 26, "none", `stroke="${c}" stroke-width="16"`)}</g>`;
    s += chain(130, -190, P.a) + chain(220, -140, P.b) + chain(130, -60, P.a) + path_("M-420 260H420", "none", P.w, 4, 'stroke-dasharray="6 12" opacity=".5"');
    s += cube(260, 190, 100, P.a, P.d, P.b) + cube(-330, 250, 80, P.c, P.d, P.a) + chipIcon("link", 380, -300, P, { size: 100, color: P.c });
    return s;
  },
  // ---- Entrepreneurship ----
  "entrepreneurship-startup": (P, r) => {
    let s = glow(0, 0, 400, P.c, 0.36);
    s += rot(40, `<g filter="url(#sh)">${path_("M0 -280C90 -190 100 -60 70 80H-70C-100 -60 -90 -190 0 -280Z", "#fff")}${path_("M0 -280C20 -230 30 -170 24 -100H-24C-30 -170 -20 -230 0 -280Z", P.a)}${circle(0, -120, 38, P.d)}${circle(0, -120, 22, P.b)}${path_("M-70 80L-150 150L-70 120Z", P.c)}${path_("M70 80L150 150L70 120Z", P.c)}</g>`, 0, 0);
    s += path_("M-280 300C-220 240 -170 250 -120 180", "none", P.w, 6, 'stroke-dasharray="3 14" opacity=".8"') + path_("M-120 380C-60 300 -20 310 40 240", "none", P.w, 6, 'stroke-dasharray="3 14" opacity=".6"');
    s += star(-330, -250, 54, P.w) + star(300, -300, 40, P.c) + star(380, 120, 46, P.a) + card(-460, 120, 300, 150, P, bars(34, 30, 232, 90, [0.3, 0.5, 0.75, 1], [P.a, P.c], { r: 6, base: false }));
    return s;
  },
  "freelancing-gig-economy": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += card(-430, -280, 560, 470, P, rect(40, 40, 360, 34, 17, P.a) + textLines(40, 110, 470, 6, mute(P), 52, 18, r) + rect(40, 400, 190, 52, 26, P.c));
    s += g(160, -90, `<g filter="url(#sh)">${rect(0, 0, 300, 380, 34, P.d)}</g>` + avatar(150, 120, 70, P.c, P) + rect(50, 230, 200, 22, 11, "#fff", 'opacity=".9"') + rect(80, 270, 140, 16, 8, "#fff", 'opacity=".6"') + `<g>${[0, 1, 2, 3, 4].map((i) => `<path d="M${68 + i * 40} 340l8 18h19l-15 12 6 19-18 -11-18 11 6-19-15-12h19Z" fill="${P.c}" transform="translate(0 -12) scale(.9)"/>`).join("")}</g>`);
    s += chipIcon("briefcase", -380, 290, P, { size: 100, color: P.b }) + chipIcon("rupee", 400, 280, P, { size: 100, color: P.c });
    return s;
  },
  "no-code-app-development": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.34);
    const blk = (x, y, w, c, label) => `<g filter="url(#sh2)">${rect(x, y, w, 96, 22, c)}${rect(x - 6, y + 26, 22, 44, 8, c)}${rect(x + w - 16, y + 26, 22, 44, 8, panel(P), 'opacity=".25"')}</g>` + text(x + w / 2, y + 62, label, 36, "#fff", 800, "Segoe UI", "middle");
    s += blk(-440, -250, 420, P.a, "When clicked") + blk(-400, -140, 420, P.b, "Show form") + blk(-360, -30, 420, P.c, "Save record").replace('fill="#fff"', 'fill="#1f2937"');
    s += g(100, -250, `<g filter="url(#sh)">${rect(0, 0, 330, 560, 44, "#0b1020")}</g>` + rect(20, 20, 290, 520, 30, P.light ? "#fff" : "#1e293b") + rect(40, 50, 250, 90, 18, P.a) + [0, 1, 2].map((i) => rect(40, 170 + i * 110, 250, 84, 16, mute(P))).join("") + rect(60, 460, 210, 52, 26, P.c));
    s += star(-300, 220, 56, P.c) + chipIcon("blocks", -380, 330, P, { size: 100, color: P.a });
    return s;
  },
  "public-speaking-leadership": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.34);
    s += g(-60, -60, `<g filter="url(#sh)">${rect(-70, -250, 140, 300, 70, P.c)}${path_("M-170 -20a170 170 0 0 0 340 0", "none", P.w, 18)}${rect(-12, 150, 24, 90, 8, P.w)}${rect(-110, 240, 220, 28, 14, P.w)}</g>` + [-30, 0, 30].map((y) => line(-40, y - 120, 40, y - 120, P.d, 6, 'opacity=".4"')).join(""));
    [140, 220, 300].forEach((rr, i) => { s += path_(`M${250 + i * 10} -80a${rr} ${rr} 0 0 1 0 160`, "none", P.w, 10 - i * 2, `opacity="${0.7 - i * 0.18}"`); });
    s += g(-460, 120, [0, 1, 2, 3, 4].map((i) => avatar(40 + i * 90, 100 + (i % 2) * 20, 38, [P.a, P.b, P.c, P.a, P.b][i], P)).join("")) + star(380, -300, 50, P.c);
    return s;
  },
  // ---- Communication & career ----
  "spoken-english": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += bubble(-450, -270, 520, 200, P.a, "l", P) + text(-190, -140, "Hello!", 90, "#fff", 800, "Segoe UI", "middle");
    s += bubble(-60, -20, 520, 200, P.c, "r", P) + text(200, 110, "How are you?", 68, "#1f2937", 800, "Segoe UI", "middle");
    s += path_("M-380 250q60 -60 120 0t120 0t120 0t120 0t120 0", "none", P.w, 10) + chipIcon("mic", 380, -290, P, { size: 110, color: P.c }) + star(-400, 300, 44, P.c);
    return s;
  },
  "business-communication": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += card(-450, -280, 700, 520, P, rect(0, 0, 700, 78, 28, P.a) + rect(0, 50, 700, 28, 0, P.a) + circle(50, 39, 14, "#fff") + rect(90, 28, 250, 22, 11, "#fff", 'opacity=".9"') + rect(40, 120, 420, 20, 10, dark(P), 'opacity=".55"') + textLines(40, 180, 600, 5, mute(P), 50, 18, r) + rect(40, 430, 200, 54, 27, P.c));
    s += g(130, 120, `<g filter="url(#sh)">${rect(0, 0, 330, 170, 40, P.c)}</g>` + text(165, 100, "Best regards,", 40, "#1f2937", 700, "Georgia", "middle", 'font-style="italic"'));
    s += chipIcon("mail", -380, 320, P, { size: 100, color: P.b }) + chipIcon("clock", 400, -270, P, { size: 90, color: P.c });
    return s;
  },
  "corporate-readiness-interview": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-430, -230, avatar(120, 120, 120, P.a, P) + `<g filter="url(#sh)">${rect(0, 270, 520, 70, 22, panel(P))}</g>` + rect(30, 290, 200, 20, 10, mute(P)) + rect(30, 316, 140, 14, 7, mute(P), 'opacity=".7"'));
    s += bubble(-100, -270, 520, 140, P.b, "l", P) + textLines(-60, -230, 420, 2, "#fff", 40, 16, r) + bubble(-20, -80, 500, 140, P.c, "r", P) + textLines(20, -40, 400, 2, "#1f2937", 40, 16, r);
    s += g(-60, 140, `<g filter="url(#sh)">${rect(0, 0, 460, 220, 28, panel(P))}</g>` + path_("M30 110l40 40l80 -90", "none", P.a, 14) + rect(180, 40, 240, 18, 9, mute(P)) + rect(180, 86, 200, 18, 9, mute(P)) + rect(180, 132, 220, 18, 9, mute(P)));
    s += chipIcon("briefcase", 400, 300, P, { size: 100, color: P.c });
    return s;
  },
  "time-management-productivity": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += circle(-100, -20, 260, panel(P), 'filter="url(#sh)"') + circle(-100, -20, 260, "none", `stroke="${P.a}" stroke-width="18"`);
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; s += line(-100 + Math.cos(a) * 220, -20 + Math.sin(a) * 220, -100 + Math.cos(a) * 244, -20 + Math.sin(a) * 244, dark(P), i % 3 ? 5 : 10, 'opacity=".6"'); }
    s += line(-100, -20, -100, -170, P.c, 14) + line(-100, -20, 20, 40, P.a, 12) + circle(-100, -20, 18, P.c);
    s += card(190, -240, 300, 150, P, rect(30, 30, 40, 40, 10, "none", `stroke="${P.a}" stroke-width="6"`) + path_("M38 50l12 12l20 -26", "none", P.a, 7) + rect(100, 36, 150, 16, 8, mute(P))) + card(190, -60, 300, 150, P, rect(30, 30, 40, 40, 10, P.a) + path_("M38 50l12 12l20 -26", "none", "#fff", 7) + rect(100, 36, 150, 16, 8, mute(P), 'opacity=".6"')) + card(190, 120, 300, 150, P, rect(30, 30, 40, 40, 10, "none", `stroke="${P.c}" stroke-width="6"`) + rect(100, 36, 120, 16, 8, mute(P)));
    s += chipIcon("clock", -380, 300, P, { size: 90, color: P.c });
    return s;
  },
  "critical-thinking-problem-solving": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.34);
    s += g(-60, -120, `<g filter="url(#sh)">${circle(0, 0, 190, P.c)}</g>` + path_("M-60 150h120M-45 190h90", "none", P.w, 18) + path_("M-60 110C-60 60 -130 40 -130 -30a130 130 0 0 1 260 0C130 40 60 60 60 110Z", "#fff", "none", 0, 'opacity=".95"') + path_("M-40 -20l40 40l40 -40", "none", P.c, 14));
    s += graph([[-400, 170, 34], [-250, 270, 34], [-90, 230, 34], [90, 300, 34], [250, 220, 34], [400, 140, 34]], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 3]], P, { w: 6, fills: [P.a, P.b, P.c] });
    s += star(300, -270, 60, P.w) + chipIcon("bulb", 380, -120, P, { size: 100, color: P.c }) + chipIcon("target", -400, -250, P, { size: 100, color: P.a });
    return s;
  },
  // ---- Languages ----
  "german-a1-b2": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += `<g filter="url(#sh)">${rect(-450, -280, 560, 340, 34, "#111827")}${rect(-450, -170, 560, 114, 0, "#dd0000")}${rect(-450, -56, 560, 116, 0, "#ffce00")}${path_("M-450 -246a34 34 0 0 1 34 -34H76a34 34 0 0 1 34 34V-166H-450Z", "#111827")}${path_("M-450 60V50H110V60a34 34 0 0 1 -34 34H-416a34 34 0 0 1 -34 -34Z", "#ffce00")}</g>`;
    s += bubble(80, -250, 400, 160, P.a, "r", P) + text(280, -150, "Hallo!", 80, "#fff", 800, "Segoe UI", "middle");
    s += g(-420, 140, ["A1", "A2", "B1", "B2"].map((t, i) => `<g filter="url(#sh2)">${rect(i * 215, 0, 190, 130, 28, panel(P))}</g>` + text(i * 215 + 95, 88, t, 64, [P.a, P.b, P.c, P.a][i], 900, "Segoe UI", "middle") + rect(i * 215 + 30, 108, 130, 8, 4, mute(P))).join(""));
    s += chipIcon("globe", 400, 300, P, { size: 100, color: P.c });
    return s;
  },
  "french-spanish-global": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += `<g filter="url(#sh)">${rect(-450, -290, 280, 400, 30, "#ffffff")}${rect(-450, -290, 94, 400, 30, "#1d4ed8")}${rect(-262, -290, 92, 400, 30, "#ef4444")}</g>`;
    s += `<g filter="url(#sh)">${rect(-130, -290, 400, 400, 30, "#c8102e")}${rect(-130, -140, 400, 200, 0, "#ffc400")}</g>` + g(0, 0, "");
    s += bubble(-390, -300, 320, 130, P.c, "l", P) + text(-230, -208, "Bonjour", 50, "#1f2937", 800, "Segoe UI", "middle") + bubble(0, -170, 280, 130, P.b, "r", P) + text(140, -78, "¡Hola!", 62, "#fff", 800, "Segoe UI", "middle");
    s += g(-400, 170, `<g filter="url(#sh)">${rect(0, 0, 780, 150, 36, panel(P))}</g>` + path_("M40 75q40 -50 80 0t80 0t80 0t80 0t80 0t80 0t80 0", "none", P.a, 10)) + chipIcon("globe", 370, -320, P, { size: 100, color: P.c }) + chipIcon("briefcase", -400, 360, P, { size: 80, color: P.b });
    return s;
  },
  // ---- Test prep ----
  "vedic-mathematics": (P, r) => {
    let s = glow(0, 0, 400, P.a, 0.34);
    s += ring(0, 0, 330, P.w, 4, 0.35) + ring(0, 0, 260, P.w, 4, 0.4);
    for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; s += path_(`M${Math.cos(a) * 140} ${Math.sin(a) * 140}Q${Math.cos(a + 0.2) * 250} ${Math.sin(a + 0.2) * 250} ${Math.cos(a) * 330} ${Math.sin(a) * 330}`, "none", i % 2 ? P.a : P.c, 6, 'opacity=".75"'); }
    s += rot(0, `<path d="M0 -150L130 75H-130Z" fill="${P.c}" opacity=".9"/><path d="M0 150L130 -75H-130Z" fill="${P.a}" opacity=".85"/>`);
    s += circle(0, 0, 70, panel(P)) + text(0, 24, "×", 90, P.a, 900, "Segoe UI", "middle");
    s += card(-470, 190, 560, 150, P, text(280, 100, "97 × 93 = 9021", 58, P.a, 800, "Consolas", "middle")) + chipIcon("calculator", 380, -290, P, { size: 100, color: P.c }) + star(-400, -260, 50, P.c);
    return s;
  },
  "ielts-toefl-prep": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    [["Listening", "mic", -450, -270, P.a], ["Reading", "book", 20, -270, P.b], ["Writing", "pen", -450, 10, P.c], ["Speaking", "message", 20, 10, P.a]].forEach(([t, ic, x, y, c]) => { s += card(x, y, 430, 250, P, circle(86, 86, 56, c, 'opacity=".95"') + icon(ic, 86, 86, 56, "#fff", 2.2) + text(30, 200, t, 54, dark(P), 800, "Segoe UI") + rect(160, 70, 220, 14, 7, mute(P)) + rect(160, 104, 150, 14, 7, mute(P), 'opacity=".7"')); });
    s += g(-100, 290, [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => rect(i * 56, 70 - (i + 1) * 7, 40, (i + 1) * 7 + 10, 8, i < 6 ? P.c : mute(P))).join("")) + pill(-440, 300, "Band score", P, { color: P.c, w: 250 }) + chipIcon("globe", 400, 300, P, { size: 90, color: P.b });
    return s;
  },
  "sat-preparation": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += g(-440, -290, `<g filter="url(#sh)">${rect(0, 0, 560, 600, 28, "#fffdf5")}</g>` + [0, 1, 2, 3, 4, 5].map((i) => text(40, 80 + i * 90, String(i + 1) + ".", 38, "#64748b", 700, "Consolas") + [0, 1, 2, 3].map((k) => circle(130 + k * 80, 66 + i * 90, 24, k === (i * 3) % 4 ? P.a : "none", `stroke="${P.a}" stroke-width="4"`)).join("") + [0, 1, 2, 3].map((k) => text(130 + k * 80, 80 + i * 90, "ABCD"[k], 26, k === (i * 3) % 4 ? "#fff" : P.a, 700, "Segoe UI", "middle")).join("")).join(""));
    s += g(170, -40, rot(-20, `<g filter="url(#sh)">${rect(-26, -280, 52, 460, 8, P.c)}${rect(-26, -280, 52, 60, 8, P.b)}${path_("M-26 180H26L0 250Z", "#f3c99a")}${path_("M-9 226H9L0 250Z", "#1f2937")}</g>`)) + chipIcon("cap", 400, -260, P, { size: 120, color: P.c }) + chipIcon("clock", 330, 290, P, { size: 100, color: P.a });
    return s;
  },
  "coding-for-kids": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.36);
    const blk = (x, y, w, c, t) => `<g filter="url(#sh2)">${rect(x, y, w, 100, 26, c)}${rect(x + 30, y - 14, 60, 22, 8, c)}</g>` + text(x + w / 2, y + 66, t, 44, "#fff", 800, "Segoe UI", "middle");
    s += blk(-450, -270, 360, P.a, "go ▶") + blk(-450, -150, 360, P.b, "turn ↻") + blk(-450, -30, 360, P.c, "jump ⤴").replace('fill="#fff"', 'fill="#1f2937"');
    s += g(160, -60, `<g filter="url(#sh)">${rect(-120, -150, 240, 190, 50, P.a)}</g>` + rect(-80, -110, 160, 100, 30, "#fff") + circle(-36, -62, 18, P.d) + circle(36, -62, 18, P.d) + path_("M-34 -20q34 24 68 0", "none", P.d, 8) + line(0, -150, 0, -200, P.a, 10) + circle(0, -206, 16, P.c) + rect(-150, 30, 300, 190, 40, P.b) + circle(-60, 125, 26, "#fff") + circle(60, 125, 26, "#fff"));
    s += star(-400, 250, 60, P.c) + star(400, -250, 50, P.b) + star(330, 280, 38, P.a) + pill(-440, 120, "print('Hi!')", P, { color: P.a, w: 270 });
    return s;
  },
  // ---- Health, life skills, BBA ----
  "yoga-nutrition-health": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.34);
    s += circle(0, -20, 280, P.w, 'opacity=".18"');
    s += g(-60, 20, `<g filter="url(#sh)">${circle(0, -210, 58, P.b)}${path_("M-48 -140Q0 -160 48 -140L64 -10Q0 14 -64 -10Z", P.a)}${path_("M-52 -128Q-140 -50 -150 70", "none", P.b, 36)}${path_("M52 -128Q140 -50 150 70", "none", P.b, 36)}${circle(-150, 78, 28, P.c)}${circle(150, 78, 28, P.c)}${path_("M-200 120Q0 20 200 120Q150 190 0 180Q-150 190 -200 120Z", P.a)}${path_("M-120 130Q0 90 120 130", "none", P.w, 8, 'opacity=".6"')}</g>`);
    s += path_("M260 -240C340 -280 420 -230 400 -150C340 -130 280 -170 260 -240Z", P.a) + path_("M260 -240C300 -200 350 -170 400 -150", "none", P.w, 5, 'opacity=".7"') + circle(320, 160, 70, P.c) + path_("M320 90C340 60 370 70 370 70", "none", P.a, 10) + circle(400, 250, 40, "#f43f5e");
    s += chipIcon("leaf", -400, 270, P, { size: 100, color: P.a }) + chipIcon("heart", 380, -300, P, { size: 90, color: P.c });
    return s;
  },
  "mental-health-mindfulness": (P, r) => {
    let s = glow(0, 40, 400, P.b, 0.36);
    [330, 260, 190].forEach((rr, i) => { s += `<ellipse cx="0" cy="210" rx="${rr + 50}" ry="${rr / 4}" fill="none" stroke="${P.w}" stroke-width="5" opacity="${0.5 - i * 0.1}"/>`; });
    const petal = (a, c, len = 250, w = 90) => rot(a, `<path d="M0 0C${w} -${len * 0.35} ${w * 0.7} -${len * 0.85} 0 -${len}C-${w * 0.7} -${len * 0.85} -${w} -${len * 0.35} 0 0Z" fill="${c}" opacity=".92"/>`, 0, 0);
    s += g(0, 170, petal(-70, P.a, 230) + petal(70, P.a, 230) + petal(-38, P.b, 270) + petal(38, P.b, 270) + petal(0, P.c, 300) + path_("M-20 0Q0 -50 20 0", "none", "#fff", 6, 'opacity=".5"'));
    s += star(-330, -200, 56, P.w) + star(340, -240, 46, P.c) + chipIcon("heart", -380, 300, P, { size: 100, color: P.c }) + chipIcon("clock", 380, 290, P, { size: 90, color: P.a });
    return s;
  },
  "cyber-hygiene-families": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.34);
    s += g(0, 0, `<g filter="url(#sh)">${path_("M0 -330L270 -230V10C270 170 150 270 0 330C-150 270 -270 170 -270 10V-230Z", P.a)}</g>` + path_("M-130 20L0 -90L130 20V130H-130Z", "#fff") + rect(-30, 50, 60, 80, 12, P.d) + path_("M-160 30L0 -110L160 30", "none", "#fff", 18) + circle(0, -20, 26, P.c));
    s += g(-460, 190, [0, 1, 2].map((i) => avatar(60 + i * 100, 60, [40, 48, 30][i], [P.c, P.b, P.a][i], P)).join("")) + chipIcon("smartphone", 380, -250, P, { size: 110, color: P.c }) + chipIcon("lock", 400, 260, P, { size: 100, color: P.b }) + chipIcon("wifi", -400, -270, P, { size: 100, color: P.c });
    return s;
  },
  "everyday-financial-digital-life": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-100, -270, `<g filter="url(#sh)">${rect(0, 0, 330, 600, 50, "#0b1020")}</g>` + rect(20, 20, 290, 560, 34, panel(P)) + rect(50, 60, 230, 70, 18, P.a) + (() => { let q = ""; for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) if ((i * 7 + j * 3 + (i ^ j)) % 3 !== 0 || (i < 2 && j < 2) || (i > 4 && j < 2) || (i < 2 && j > 4)) q += rect(80 + i * 24, 170 + j * 24, 20, 20, 3, dark(P)); return q; })() + rect(50, 380, 230, 40, 20, P.c) + text(165, 408, "₹ Paid", 26, "#1f2937", 800, "Segoe UI", "middle") + rect(50, 450, 230, 28, 14, mute(P)));
    s += g(100, -60, `<g filter="url(#sh)">${rect(0, 0, 360, 240, 34, P.d)}</g>` + rect(0, 60, 360, 56, 0, "#000", 'opacity=".25"') + rect(30, 150, 120, 20, 10, "#fff", 'opacity=".7"') + circle(290, 190, 24, P.c) + circle(260, 190, 24, "#f43f5e", 'opacity=".9"'));
    s += coin(300, 260, 90, P, "₹") + chipIcon("wallet", 100, 330, P, { size: 100, color: P.a }) + chipIcon("shield", -400, 300, P, { size: 90, color: P.b });
    return s;
  },
  "bba-financial-accounting": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += ledger(P, -460, -250, 640, 480, r);
    s += g(240, -230, `<g filter="url(#sh)">${rect(0, 0, 240, 460, 22, panel(P))}</g>` + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => rect(30 + (i % 2) * 90, 40 + Math.floor(i / 2) * 90, 60, 60, 10, [P.a, P.b, P.c, P.a][i % 4], 'opacity=".9"')).join("") + rect(90, 400, 60, 60, 8, P.d));
    s += path_("M-420 284H-80M-250 284V160M-420 160H-80", "none", P.c, 12) + path_("M-420 162l-50 90h100ZM-80 162l-50 90h100Z", P.c, "none", 0, 'opacity=".35"') + path_("M-420 162l-50 90h100ZM-80 162l-50 90h100Z", "none", P.c, 8) + text(-250, 340, "Balance Sheet", 54, dark(P), 700, "Georgia", "middle", 'font-style="italic"') + chipIcon("calculator", 400, 300, P, { size: 100, color: P.b });
    return s;
  },
};
const avatar = (x, y, r, c, P) => circle(x, y, r, c) + circle(x, y - r * 0.25, r * 0.34, "#fff") + path_(`M${x - r * 0.6} ${y + r * 0.7}a${r * 0.6} ${r * 0.5} 0 0 1 ${r * 1.2} 0`, "#fff");
