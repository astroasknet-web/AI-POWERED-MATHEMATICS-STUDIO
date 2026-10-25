/** Scenes for Design & Creative, Digital Marketing & Growth, Content & Personal Branding, Business/Management/Product. */
import { win, rect, circle, line, path_, g, rot, text, icon, textLines, codeRows, bars, lineChart, donut, graph, cube, pill, page, chipIcon, star, dotsGrid, ring, glow } from "./kit.mjs";

const dark = (P) => (P.light ? "#0f172a" : "#e2e8f0");
const panel = (P) => (P.light ? "#ffffff" : "#0f172a");
const mute = (P) => (P.light ? "#cbd5e1" : "#334155");
const card = (x, y, w, h, P, inner = "", r = 28) => g(x, y, `<g filter="url(#sh)">${rect(0, 0, w, h, r, panel(P))}</g>${inner}`);
const avatar = (x, y, r, c, P) => circle(x, y, r, c) + circle(x, y - r * 0.25, r * 0.34, "#fff") + path_(`M${x - r * 0.6} ${y + r * 0.7}a${r * 0.6} ${r * 0.5} 0 0 1 ${r * 1.2} 0`, "#fff");

export const C = {
  // ---- Design & Creative ----
  "ui-ux-design-figma": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.35);
    s += g(-430, -300, `<g filter="url(#sh)">${rect(0, 0, 560, 620, 30, panel(P))}</g>` + rect(30, 30, 500, 80, 18, P.a) + rect(30, 130, 240, 180, 18, P.b, 'opacity=".85"') + rect(290, 130, 240, 180, 18, P.c, 'opacity=".85"') + textLines(30, 340, 500, 4, mute(P), 38, 16, r) + rect(30, 520, 200, 64, 32, P.a));
    // pen tool bezier
    s += path_("M60 230C140 60 300 330 420 140", "none", P.w, 8) + [[60, 230], [420, 140]].map(([x, y]) => `<rect x="${x - 14}" y="${y - 14}" width="28" height="28" fill="#fff" stroke="${P.c}" stroke-width="6" transform="translate(0 0)"/>`).join("");
    s += path_("M140 60L300 330", "none", P.c, 4, 'stroke-dasharray="8 8" opacity=".8"');
    s += g(210, -200, `<g filter="url(#sh)">${circle(0, 0, 120, P.c)}</g>` + path_("M-60 70L-10 -60L60 10Z", "#fff") + path_("M-10 -60l20 -34l36 34", "none", "#fff", 14));
    s += chipIcon("pen", 330, 250, P, { size: 120, color: P.a }) + chipIcon("palette", 80, 320, P, { size: 100, color: P.b });
    return s;
  },
  "graphic-design-canva": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-470, -300, `<g filter="url(#sh)">${rect(0, 0, 520, 640, 30, panel(P))}</g>` + circle(260, 190, 120, P.a) + rect(60, 360, 400, 38, 19, P.c) + rect(60, 420, 300, 22, 11, mute(P)) + rect(60, 464, 340, 22, 11, mute(P)) + rect(60, 540, 190, 60, 30, P.b));
    s += g(120, -250, `<g filter="url(#sh)">${rect(0, 0, 340, 200, 26, panel(P))}</g>` + [P.a, P.b, P.c, "#f43f5e", "#22c55e", "#a78bfa"].map((c, i) => circle(54 + (i % 3) * 100, 60 + Math.floor(i / 3) * 80, 32, c)).join(""));
    s += g(120, 10, `<g filter="url(#sh)">${rect(0, 0, 340, 280, 26, panel(P))}</g>` + path_("M40 220L110 120L170 190L230 90L300 220Z", P.b, "none", 0, 'opacity=".9"') + circle(250, 70, 28, P.c));
    s += g(330, 350, star(0, 0, 60, P.a)) + chipIcon("palette", -380, 300, P, { size: 110, color: P.a });
    return s;
  },
  "photoshop-illustrator": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.32);
    s += card(-470, -270, 520, 420, P, `<path d="M0 420 L160 220 L300 330 L420 160 L520 300 V420Z" fill="${P.b}" opacity=".9" transform="translate(0 -10)"/><circle cx="380" cy="100" r="54" fill="${P.c}"/>`).replace('rx="28"', 'rx="28"');
    s += g(-100, 40, `<g filter="url(#sh)">${rect(0, 0, 520, 360, 30, panel(P), `stroke="${P.a}" stroke-width="6"`)}</g>` + path_("M60 280C120 60 240 360 300 150S420 120 460 240", "none", P.a, 14) + [[60, 280], [300, 150], [460, 240]].map(([x, y]) => rect(x - 14, y - 14, 28, 28, 4, "#fff", `stroke="${P.c}" stroke-width="6"`)).join(""));
    s += g(350, -280, `<g filter="url(#sh)">${rect(0, 0, 150, 150, 30, "#001e36")}</g>` + text(75, 106, "Ps", 76, "#31a8ff", 900, "Segoe UI", "middle")) + g(350, -100, `<g filter="url(#sh)">${rect(0, 0, 150, 150, 30, "#330000")}</g>` + text(75, 106, "Ai", 76, "#ff9a00", 900, "Segoe UI", "middle"));
    s += chipIcon("image", 380, 250, P, { size: 100, color: P.a });
    return s;
  },
  "video-editing-premiere-pro": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.32);
    s += g(-470, -300, `<g filter="url(#sh)">${rect(0, 0, 940, 520, 30, panel(P))}</g>` + rect(30, 30, 560, 330, 18, P.d) + path_("M270 120l130 75l-130 75Z", P.c) + rect(620, 30, 290, 330, 18, mute(P)) + textLines(640, 60, 250, 5, dark(P), 50, 14, r).replace(/fill="[^"]+"/g, `fill="${dark(P)}" opacity=".3"`));
    const clips = [[30, 0.32, P.a], [190, 0.22, P.c], [350, 0.3, P.b], [560, 0.34, P.a]];
    s += g(-470, 250, `<g filter="url(#sh)">${rect(0, 0, 940, 170, 26, panel(P))}</g>` + [0, 1, 2].map((tr) => clips.map(([x, w, c], i) => rect(30 + x + (tr * 40) % 120, 22 + tr * 46, w * 600, 34, 8, c, `opacity="${0.55 + ((i + tr) % 3) * 0.15}"`)).join("")).join("") + rect(380, 6, 8, 160, 4, "#f43f5e"));
    s += chipIcon("film", -400, 360, P, { size: 90, color: P.c }) + star(400, -330, 44, P.c);
    return s;
  },
  "short-form-video": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.38);
    const phone = (x, y, rotA, c1, c2) => rot(rotA, `<g filter="url(#sh)">${rect(x - 160, y - 330, 320, 660, 50, "#0b1020")}</g>` + rect(x - 140, y - 310, 280, 620, 36, c1) + circle(x, y - 60, 70, c2) + path_(`M${x - 26} ${y - 92}l66 32l-66 32Z`, "#fff") + rect(x - 110, y + 120, 180, 20, 10, "#fff", 'opacity=".85"') + rect(x - 110, y + 160, 120, 16, 8, "#fff", 'opacity=".6"') + circle(x + 108, y + 40, 20, "#fff", 'opacity=".9"') + circle(x + 108, y + 100, 20, "#fff", 'opacity=".75"'), x, y);
    s += phone(-130, 10, -6, P.a, P.c) + phone(200, -40, 8, P.b, P.a);
    s += star(-400, -240, 56, P.c) + star(400, 230, 44, P.a) + pill(-440, 290, "0:15", P, { color: P.c, w: 150 });
    return s;
  },
  "3d-blender-basics": (P, r) => {
    let s = glow(0, 0, 400, P.a, 0.35);
    s += cube(-200, 90, 190, P.a, P.d, P.b) + cube(170, 190, 120, P.c, P.d, P.a) + cube(60, -190, 130, P.b, P.d, P.c);
    s += `<g filter="url(#sh2)"><ellipse cx="260" cy="-110" rx="110" ry="110" fill="${P.c}"/></g>` + `<ellipse cx="225" cy="-145" rx="40" ry="30" fill="#fff" opacity=".35"/>`;
    s += path_("M-420 300h840", "none", P.w, 3, 'opacity=".35"') + path_("M-380 340L380 340", "none", P.w, 3, 'opacity=".25"');
    s += chipIcon("box", -380, -250, P, { size: 110, color: P.a });
    return s;
  },
  // ---- Digital marketing ----
  "digital-marketing-foundations": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.32);
    s += g(-250, -80, `<g filter="url(#sh)">${path_("M-110 -40L170 -190V190L-110 40Z", P.a)}${rect(-170, -60, 80, 120, 16, P.b)}${path_("M-140 60l30 130h60l-30 -110Z", P.d)}</g>`);
    [90, 150, 210].forEach((rr, i) => { s += path_(`M${220 + i * 40} -60a${rr} ${rr} 0 0 1 0 120`, "none", P.c, 12 - i * 3, `opacity="${0.9 - i * 0.2}"`); });
    s += chipIcon("mail", 250, -290, P, { size: 100, color: P.a }) + chipIcon("share", 360, 140, P, { size: 100, color: P.c }) + chipIcon("search", -100, 260, P, { size: 100, color: P.b }) + chipIcon("trendingUp", 130, 290, P, { size: 100, color: P.a });
    return s;
  },
  "seo": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += card(-460, -280, 640, 560, P, rect(40, 40, 560, 64, 32, mute(P)) + icon("search", 80, 72, 36, P.a, 2.4) + [0, 1, 2].map((i) => rect(40, 150 + i * 120, 200 - i * 20, 20, 10, [P.a, P.b, P.c][i]) + rect(40, 184 + i * 120, 520, 16, 8, mute(P)) + rect(40, 214 + i * 120, 440, 16, 8, mute(P), 'opacity=".7"')).join(""));
    s += g(220, -120, `<g filter="url(#sh2)">${circle(0, 0, 90, P.c)}</g>` + text(0, 28, "#1", 80, "#1f2937", 900, "Segoe UI", "middle"));
    s += `<circle cx="260" cy="150" r="108" fill="${P.light ? "#fff" : "#1e293b"}" stroke="${P.a}" stroke-width="18"/>` + path_("M338 228l100 100", "none", P.a, 34) + icon("trendingUp", 260, 150, 100, P.c, 2.4);
    return s;
  },
  "performance-marketing-ads": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += circle(-110, 20, 280, "none", `stroke="${P.w}" stroke-width="3" opacity=".35"`) + circle(-110, 20, 200, P.a) + circle(-110, 20, 130, "#fff") + circle(-110, 20, 66, P.c) + circle(-110, 20, 22, P.d);
    s += path_("M-110 20L240 -240", "none", P.b, 14) + path_("M190 -200l60 -50l-90 -20Z", P.b);
    s += card(200, -40, 300, 220, P, bars(34, 40, 232, 140, [0.4, 0.6, 0.8, 1], [P.a, P.c], { r: 8 })) + card(220, 220, 280, 110, P, text(140, 78, "ROAS", 46, P.a, 900, "Segoe UI", "middle"));
    s += chipIcon("target", -360, -270, P, { size: 100, color: P.c });
    return s;
  },
  "social-media-marketing": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.32);
    const nodes = [[0, 0, 70], [-300, -170, 50], [290, -200, 50], [-340, 160, 50], [300, 180, 50], [0, -300, 42], [0, 300, 42]];
    s += graph(nodes, [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 5], [2, 5], [3, 6], [4, 6]], P, { w: 6, fills: [P.a, P.c, P.b] });
    s += card(-180, -90, 360, 180, P, avatar(80, 90, 46, P.b, P) + rect(150, 60, 160, 18, 9, mute(P)) + rect(150, 94, 120, 14, 7, mute(P), 'opacity=".7"')) + icon("heart", 330, 90, 70, "#f43f5e", 2.4) + icon("share", -300, 260, 60, P.a, 2.2);
    s += star(-420, -290, 50, P.c);
    return s;
  },
  "growth-marketing-funnels": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.32);
    const seg = (y, w1, w2, h, c) => path_(`M${-w1 / 2} ${y}H${w1 / 2}L${w2 / 2} ${y + h}H${-w2 / 2}Z`, c);
    s += `<g filter="url(#sh)">${seg(-300, 760, 600, 150, P.a)}${seg(-140, 590, 430, 150, P.b)}${seg(20, 420, 260, 150, P.c)}</g>` + path_("M-130 190H130V300a40 40 0 0 1 -40 40H-90a40 40 0 0 1 -40 -40Z", P.d);
    [[-120, -230], [20, -250], [140, -220], [-70, -90], [60, -70]].forEach(([x, y]) => { s += circle(x, y, 18, "#fff", 'opacity=".9"'); });
    s += chipIcon("trendingUp", 380, 230, P, { size: 120, color: P.c }) + chipIcon("users", -400, 230, P, { size: 110, color: P.a });
    return s;
  },
  "email-marketing-automation": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.32);
    s += g(-250, -190, `<g filter="url(#sh)">${rect(0, 0, 500, 360, 34, panel(P))}</g>` + path_("M0 50L250 220L500 50", "none", P.a, 14) + path_("M0 330L190 170M500 330L310 170", "none", mute(P), 8));
    s += circle(250, -190, 44, P.c) + text(250, -172, "1", 52, "#1f2937", 900, "Segoe UI", "middle");
    s += g(-420, 220, [0, 1, 2].map((i) => `<g filter="url(#sh2)">${rect(i * 290, 0, 250, 100, 50, panel(P))}</g>` + icon(["mail", "clock", "target"][i], i * 290 + 62, 50, 54, [P.a, P.c, P.b][i], 2) + rect(i * 290 + 110, 38, 100, 14, 7, mute(P))).join("") + [0, 1].map((i) => path_(`M${250 + i * 290 + 8} 50h26`, "none", P.w, 6, 'stroke-dasharray="3 8"')).join(""));
    s += star(330, -260, 54, P.c);
    return s;
  },
  "content-marketing-copywriting": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += page(-400, -310, 500, 640, P, { head: P.a, lines: 10, r });
    s += rect(-360, 70, 380, 24, 12, P.c, 'opacity=".5"');
    s += g(80, -40, rot(40, `<g filter="url(#sh)">${rect(-26, -250, 52, 400, 10, P.c)}${path_("M-26 150H26L0 230Z", "#f3c99a")}${rect(-26, -250, 52, 70, 10, P.b)}</g>`));
    s += g(200, 180, `<g filter="url(#sh)">${rect(0, 0, 280, 130, 40, P.a)}</g>` + textLines(40, 36, 200, 2, "#fff", 36, 14, r)) + star(380, -280, 50, P.c) + chipIcon("pen", -420, 300, P, { size: 100, color: P.b });
    return s;
  },
  "ecommerce-marketplace-selling": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-450, -280, `<g filter="url(#sh)">${rect(0, 0, 900, 520, 34, panel(P))}</g>` + rect(30, 30, 840, 70, 20, mute(P)) + [0, 1, 2].map((i) => rect(40 + i * 280, 140, 250, 190, 22, [P.a, P.b, P.c][i]) + rect(40 + i * 280, 350, 150, 18, 9, dark(P), 'opacity=".4"') + rect(40 + i * 280, 384, 100, 22, 11, P.d)).join(""));
    s += g(160, 120, `<g filter="url(#sh)">${circle(0, 0, 130, P.a)}</g>` + icon("cart", 0, 0, 150, "#fff", 1.8) + circle(86, -86, 34, P.c) + text(86, -70, "3", 42, "#1f2937", 900, "Segoe UI", "middle"));
    s += chipIcon("truck", -380, 330, P, { size: 100, color: P.b }) + chipIcon("rupee", 400, -300, P, { size: 100, color: P.c });
    return s;
  },
  // ---- Content & brand ----
  "youtube-creator": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.35);
    s += g(-450, -270, `<g filter="url(#sh)">${rect(0, 0, 900, 500, 40, P.d)}</g>` + path_("M360 120l260 130l-260 130Z", "#fff") + rect(30, 440, 840, 14, 7, mute(P)) + rect(30, 440, 360, 14, 7, "#ff0033") + circle(390, 447, 14, "#ff0033"));
    s += g(-420, 270, avatar(60, 60, 56, P.a, P) + rect(150, 22, 260, 22, 11, mute(P)) + rect(150, 62, 180, 16, 8, mute(P), 'opacity=".7"') + `<g filter="url(#sh2)">${rect(520, 14, 260, 80, 40, "#ff0033")}</g>` + text(650, 66, "Subscribe", 36, "#fff", 800, "Segoe UI", "middle"));
    s += chipIcon("mic", 380, -300, P, { size: 100, color: P.c }) + star(-430, -300, 46, P.c);
    return s;
  },
  "linkedin-personal-branding": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += g(-400, -300, `<g filter="url(#sh)">${rect(0, 0, 800, 620, 34, panel(P))}</g>` + rect(0, 0, 800, 190, 34, P.a) + rect(0, 150, 800, 40, 0, P.a) + circle(150, 200, 90, "#fff") + avatar(150, 200, 80, P.b, P) + rect(280, 220, 360, 30, 15, dark(P), 'opacity=".75"') + rect(280, 268, 260, 20, 10, mute(P)) + [0, 1, 2].map((i) => `<rect x="${50 + i * 230}" y="400" width="210" height="60" rx="30" fill="${[P.a, P.b, P.c][i]}" opacity=".9"/>`).join("") + textLines(50, 500, 640, 3, mute(P), 36, 14, r));
    s += chipIcon("briefcase", 400, -300, P, { size: 110, color: P.c }) + chipIcon("users", 400, 290, P, { size: 100, color: P.b }) + star(-430, 300, 44, P.c);
    return s;
  },
  "ai-assisted-content-creation": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.34);
    s += page(-440, -300, 440, 560, P, { head: P.b, lines: 8, r });
    s += card(0, -180, 400, 220, P, `<rect x="30" y="30" width="340" height="160" rx="18" fill="${P.a}" opacity=".9"/><path d="M60 170L140 90L200 140L260 70L340 170Z" fill="#fff" opacity=".5"/><circle cx="290" cy="76" r="24" fill="#fff"/>`);
    s += g(60, 100, `<g filter="url(#sh)">${rect(0, 0, 400, 160, 44, P.c)}</g>` + textLines(44, 40, 310, 3, "#1f2937", 36, 14, r));
    s += star(-10, -270, 90, P.w, 1) + star(460, 40, 56, P.a) + star(-300, 300, 50, P.c) + chipIcon("sparkles", 300, 320, P, { size: 100, color: P.b });
    return s;
  },
  // ---- Business, management, product ----
  "product-management-fundamentals": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += g(-460, -280, [0, 1, 2].map((i) => `<g filter="url(#sh)">${rect(i * 310, 0, 280, 560, 28, panel(P))}</g>` + rect(i * 310 + 24, 24, 150, 20, 10, [P.a, P.b, P.c][i]) + [0, 1, 2].slice(0, 3 - (i === 2 ? 1 : 0)).map((k) => rect(i * 310 + 24, 80 + k * 150, 232, 124, 18, mute(P)) + rect(i * 310 + 44, 100 + k * 150, 120, 14, 7, dark(P), 'opacity=".5"') + circle(i * 310 + 230, 190 + k * 150, 14, [P.a, P.b, P.c][(i + k) % 3])).join("")).join(""));
    s += chipIcon("layers", 400, 330, P, { size: 100, color: P.c }) + pill(-440, 330, "Roadmap", P, { color: P.a });
    return s;
  },
  "advanced-product-management": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += cube(0, 40, 200, P.a, P.d, P.b) + cube(-230, 170, 120, P.c, P.d, P.a) + cube(240, 190, 140, P.b, P.d, P.c);
    s += path_("M-420 -130C-200 -330 200 -330 420 -130", "none", P.w, 5, 'stroke-dasharray="6 14" opacity=".7"') + path_("M380 -140l44 20l-18 -50Z", P.w);
    s += card(-440, -330, 300, 130, P, lineChart(34, 30, 232, 70, [0.3, 0.5, 0.4, 0.9], P.a, { width: 6, dots: false })) + chipIcon("target", 380, 330, P, { size: 100, color: P.c });
    return s;
  },
  "project-management-pmp": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += g(-460, -270, `<g filter="url(#sh)">${rect(0, 0, 920, 540, 32, panel(P))}</g>` + [0, 1, 2, 3, 4].map((i) => rect(40, 50 + i * 94, 180, 22, 11, mute(P)) + rect(250 + i * 70, 44 + i * 94, 200 + (i % 2) * 120, 34, 17, [P.a, P.b, P.c, P.a, P.b][i])).join("") + line(560, 20, 560, 520, "#f43f5e", 4, 'stroke-dasharray="10 8"'));
    s += g(240, 250, `<g filter="url(#sh)">${rect(0, 0, 230, 170, 24, P.c)}</g>` + path_("M50 90l36 36l80 -80", "none", "#1f2937", 14)) + pill(-440, 330, "PMP · CAPM · Agile", P, { color: P.a, w: 370 });
    return s;
  },
  "agile-scrum-jira": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += path_("M-250 -80a250 250 0 1 1 90 190", "none", P.a, 36) + path_("M-140 110l-70 20l40 -66Z", P.a, P.a, 6) + path_("M-250 -80l-60 -40M-250 -80l-20 70", "none", P.a, 0);
    ["Backlog", "Sprint", "Done"].forEach((t, i) => { s += g(-460 + i * 320, 230, `<g filter="url(#sh2)">${rect(0, 0, 280, 130, 24, panel(P))}</g>` + rect(20, 18, 120, 18, 9, [P.a, P.c, P.b][i]) + rect(20, 52, 240, 26, 8, mute(P)) + rect(20, 90, 180, 26, 8, mute(P), 'opacity=".7"')); });
    s += g(60, -200, [0, 1, 2].map((i) => `<g filter="url(#sh2)">${rect(i * 100 - 20, i * 20, 90, 110, 14, [P.c, P.a, P.b][i])}</g>`).join(""));
    s += chipIcon("repeat", 380, -260, P, { size: 100, color: P.c });
    return s;
  },
  "business-strategy-consulting": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-460, -290, `<g filter="url(#sh)">${rect(0, 0, 920, 540, 32, panel(P))}</g>` + line(460, 30, 460, 510, mute(P), 4) + line(40, 270, 880, 270, mute(P), 4) + [[300, 130, 46, P.a], [640, 110, 62, P.c], [190, 370, 38, P.b], [700, 390, 54, "#f43f5e"], [480, 330, 28, P.a]].map(([x, y, r2, c]) => circle(x, y, r2, c, 'opacity=".85"')).join("") + text(480, 54, "↑", 44, dark(P), 700, "Segoe UI", "middle"));
    s += g(-80, 270, `<g filter="url(#sh)">${rect(0, 0, 360, 130, 30, P.a)}</g>` + icon("target", 70, 66, 70, "#fff", 2) + rect(130, 38, 180, 20, 10, "#fff", 'opacity=".9"') + rect(130, 72, 130, 16, 8, "#fff", 'opacity=".6"'));
    s += chipIcon("briefcase", -380, 330, P, { size: 100, color: P.c });
    return s;
  },
  "operations-supply-chain": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    const pts = [[-380, -160], [-130, -250], [150, -200], [380, -60], [200, 160], [-60, 210], [-330, 110]];
    s += path_("M" + pts.map((p) => p.join(" ")).join("L") + "Z", "none", P.w, 5, 'stroke-dasharray="6 12" opacity=".7"');
    pts.forEach(([x, y], i) => { s += `<g filter="url(#sh2)">${circle(x, y, 54, panel(P))}</g>` + icon(["box", "truck", "layers", "clipboard", "truck", "box", "cart"][i], x, y, 56, [P.a, P.c, P.b][i % 3], 2); });
    s += g(-120, -40, `<g filter="url(#sh)">${rect(0, 0, 180, 90, 14, P.c)}${rect(180, 20, 70, 70, 14, P.a)}${circle(40, 100, 24, "#1f2937")}${circle(200, 100, 24, "#1f2937")}</g>`);
    return s;
  },
  "hr-people-analytics": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += graph([[0, 0, 70], [-270, -150, 52], [260, -170, 52], [-290, 170, 52], [280, 180, 52], [0, -300, 44], [0, 300, 44]], [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]], P, { w: 6, fills: [P.a, P.c, P.b] });
    [[-270, -150], [260, -170], [-290, 170], [280, 180]].forEach(([x, y], i) => { s += avatar(x, y, 44, [P.c, P.b, P.a, P.c][i], P); });
    s += card(-170, 60, 340, 160, P, donut(90, 80, 50, [[45, P.a], [30, P.c], [25, P.b]], 22) + textLines(170, 50, 140, 3, mute(P), 30, 12, r));
    s += chipIcon("users", 0, -320, P, { size: 90, color: P.a });
    return s;
  },
  "sales-business-development": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += bars(-380, -60, 500, 330, [0.3, 0.45, 0.6, 0.78, 0.95], [P.a, P.b, P.c], { r: 14 });
    s += path_("M-380 150L-190 70L-10 -10L150 -120L330 -250", "none", P.w, 12) + path_("M290 -250l50 -10l-20 50Z", P.w, P.w, 6);
    s += card(150, 40, 320, 210, P, coinsRow(P)) + chipIcon("rupee", -300, -270, P, { size: 110, color: P.c }) + chipIcon("briefcase", 380, -260, P, { size: 100, color: P.b });
    function coinsRow(Q) { return circle(80, 105, 50, Q.c) + circle(160, 105, 50, Q.a) + circle(240, 105, 50, Q.b); }
    return s;
  },
  "customer-success-support": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.32);
    s += g(0, 0, `<g filter="url(#sh)">${circle(0, 0, 200, P.a)}</g>` + path_("M0 80C-130 -10 -110 -110 -50 -110C-20 -110 0 -90 0 -70C0 -90 20 -110 50 -110C110 -110 130 -10 0 80Z", "#fff") );
    s += card(-470, -280, 330, 190, P, circle(70, 70, 36, P.c) + rect(130, 44, 160, 18, 9, mute(P)) + rect(130, 78, 110, 14, 7, mute(P), 'opacity=".7"') + text(180, 150, "★★★★★", 34, P.c, 800, "Segoe UI", "middle")) + card(150, 120, 330, 190, P, circle(70, 70, 36, P.b) + rect(130, 44, 160, 18, 9, mute(P)) + rect(130, 78, 110, 14, 7, mute(P), 'opacity=".7"') + icon("message", 180, 140, 50, P.a, 2));
    s += chipIcon("users", -400, 270, P, { size: 100, color: P.c });
    return s;
  },
  "digital-transformation-leaders": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.34);
    s += rect(-420, 60, 360, 320, 20, P.d) + rect(-340, -20, 250, 100, 20, P.d, 'opacity=".8"') + Array.from({ length: 12 }, (_, i) => rect(-390 + (i % 4) * 80, 90 + Math.floor(i / 4) * 90, 50, 56, 8, i % 3 ? P.a : P.c, 'opacity=".9"')).join("");
    s += path_("M-20 200H120", "none", P.w, 8, 'stroke-dasharray="4 14"') + g(300, 40, `<g filter="url(#sh)">${circle(0, 0, 180, P.a)}</g>` + path_("M30 -150L-60 20H10L-20 150L90 -30H20Z", P.c) );
    s += graph([[120, -250, 22], [260, -300, 22], [380, -240, 22], [200, -160, 22]], [[0, 1], [1, 2], [0, 3], [3, 2]], P, { w: 4 }) + chipIcon("cloud", -300, -230, P, { size: 100, color: P.c });
    return s;
  },
};
