/** Scenes for Software Development, Cloud/DevOps/Infrastructure and Cybersecurity courses. */
import { win, rect, circle, line, path_, g, rot, text, icon, textLines, codeRows, bars, lineChart, donut, graph, cube, pill, page, chipIcon, star, dotsGrid, ring, glow } from "./kit.mjs";

const dark = (P) => (P.light ? "#0f172a" : "#e2e8f0");
const panel = (P) => (P.light ? "#ffffff" : "#0f172a");
const mute = (P) => (P.light ? "#cbd5e1" : "#334155");

const cloudPath = (x, y, s) => `M${x - 150 * s} ${y + 60 * s}a${70 * s} ${70 * s} 0 0 1 ${20 * s} -${136 * s}a${100 * s} ${100 * s} 0 0 1 ${190 * s} -${30 * s}a${80 * s} ${80 * s} 0 0 1 ${110 * s} ${166 * s}Z`;
const cloud = (x, y, s, fill, op = 1) => `<g filter="url(#sh)">${path_(cloudPath(x, y, s), fill, "none", 0, `opacity="${op}"`)}</g>`;
const editor = (P, r, x, y, w, h, tag, rows = 8) => win(x, y, w, h, P, { title: tag }) + codeRows(x + 30, y + 100, w - 60, rows, P, r, { gap: Math.min(46, (h - 130) / rows), h: 17 });
const shieldPath = (s, x = 0, y = 0) => `M${x} ${y - 330 * s}L${x + 270 * s} ${y - 230 * s}V${y + 10 * s}C${x + 270 * s} ${y + 170 * s} ${x + 150 * s} ${y + 270 * s} ${x} ${y + 330 * s}C${x - 150 * s} ${y + 270 * s} ${x - 270 * s} ${y + 170 * s} ${x - 270 * s} ${y + 10 * s}V${y - 230 * s}Z`;

export const B = {
  "python-foundations": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += editor(P, r, -470, -270, 620, 470, "main.py", 8);
    // two interlocking snakes as Python mark
    s += g(250, -90, `<g filter="url(#sh)">${path_("M-120 -40V-120a80 80 0 0 1 80 -80H60a80 80 0 0 1 80 80V10H-30a70 70 0 0 0 -70 70H-120Z", P.a)}${path_("M120 40V120a80 80 0 0 1 -80 80H-60a80 80 0 0 1 -80 -80V-10H30a70 70 0 0 0 70 -70H120Z", P.c)}</g>` + circle(-40, -140, 16, "#fff") + circle(40, 140, 16, "#fff"));
    s += pill(-420, 250, "print('Hello')", P, { color: P.c }) + pill(-80, 250, "for i in range", P, { color: P.a }) + chipIcon("code", 400, 270, P, { size: 100, color: P.b });
    return s;
  },
  "front-end-development": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += win(-470, -280, 940, 520, P, { title: "" }) + rect(-430, -190, 860, 38, 19, P.light ? "#eef2f7" : "#1e293b") + circle(-400, -171, 9, P.c) + rect(-370, -178, 300, 14, 7, mute(P));
    s += rect(-430, -120, 380, 300, 18, P.a, 'opacity=".9"') + textLines(-30, -110, 440, 5, dark(P), 52, 18, r).replace(/fill="[^"]+"/g, `fill="${dark(P)}" opacity=".3"`) + rect(-30, 130, 200, 54, 27, P.c);
    s += `<g>${["<>", "{ }", "#"].map((t, i) => `<g filter="url(#sh2)">${rect(-420 + i * 300, 270, 260, 90, 28, panel(P))}</g>` + text(-290 + i * 300, 330, t, 52, [P.a, P.c, P.b][i], 900, "Consolas", "middle")).join("")}</g>`;
    return s;
  },
  "java-spring-boot": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += editor(P, r, -470, -280, 560, 480, "App.java", 8);
    s += g(250, -110, `<g filter="url(#sh)">${circle(0, 0, 180, P.a)}</g>` + path_("M-60 -90q50 70 0 130q80 -40 20 -130ZM20 -70q40 40 10 90" , "none", "#fff", 10) + rect(-110, 60, 220, 26, 13, "#fff") + path_("M-90 110q90 40 180 0", "none", "#fff", 10));
    s += g(-380, 250, `<g filter="url(#sh2)">${rect(0, 0, 280, 110, 55, panel(P))}</g>` + icon("layers", 70, 55, 70, P.a, 1.8) + rect(120, 36, 120, 18, 9, mute(P)) + rect(120, 64, 80, 14, 7, mute(P)));
    s += chipIcon("server", 90, 290, P, { size: 110, color: P.b }) + chipIcon("database", 320, 280, P, { size: 100, color: P.c });
    return s;
  },
  "flutter-mobile-development": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.35);
    const phone = (x, y, rotA, c1, c2) => rot(rotA, `<g filter="url(#sh)">${rect(x - 150, y - 300, 300, 600, 46, "#0b1020")}</g>` + rect(x - 130, y - 280, 260, 560, 32, c1) + rect(x - 130, y - 280, 260, 120, 32, c2) + rect(x - 100, y - 120, 200, 70, 20, "#fff", 'opacity=".9"') + rect(x - 100, y - 30, 200, 70, 20, "#fff", 'opacity=".7"') + rect(x - 100, y + 60, 120, 70, 20, "#fff", 'opacity=".5"') + circle(x + 70, y + 230, 34, P.c), x, y);
    s += phone(-210, 20, -8, P.b, P.a) + phone(210, -20, 7, P.a, P.d);
    s += path_("M-330 -300l120 -80l-30 130Z", P.c) + path_("M-330 -210l120 -80", "none", P.a, 14) + chipIcon("smartphone", 0, 330, P, { size: 110, color: P.c }) + star(400, -300, 50, P.c);
    return s;
  },
  "git-github": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    const lanes = [[-300, P.a], [-100, P.c], [100, P.b]];
    lanes.forEach(([y, c]) => { s += line(-400, y, 400, y, c, 10, 'opacity=".35"'); });
    s += path_("M-300 -300C-200 -300 -200 -100 -100 -100", "none", P.c, 10) + path_("M-100 -100C0 -100 0 100 100 100", "none", P.b, 10);
    const dots = [[-400, -300, P.a], [-300, -300, P.a], [-200, -300, P.a], [-100, -100, P.c], [0, -100, P.c], [100, 100, P.b], [200, 100, P.b], [300, -300, P.a], [100, -300, P.a], [0, -300, P.a]];
    s += line(-400, -300, 400, -300, P.a, 10) + path_("M200 100C260 100 300 -100 300 -300", "none", P.b, 10);
    dots.forEach(([x, y, c]) => { s += circle(x, y, 28, c) + circle(x, y, 12, "#fff"); });
    s += g(-400, 160, `<g filter="url(#sh)">${rect(0, 0, 800, 150, 34, panel(P))}</g>` + text(40, 90, "git commit -m", 52, P.a, 700, "Consolas") + text(430, 90, '"ship it"', 52, P.c, 700, "Consolas"));
    s += chipIcon("gitBranch", 360, 320, P, { size: 100, color: P.b }) + pill(-400, 320, "main", P, { color: P.a }) + pill(-240, 320, "feature/login", P, { color: P.c, w: 280 });
    return s;
  },
  "dsa-for-interviews": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.28);
    const nodes = [[0, -300], [-200, -140], [200, -140], [-300, 40], [-100, 40], [100, 40], [300, 40], [-350, 220], [-250, 220]];
    const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [3, 8]];
    s += graph(nodes.map((n) => [n[0], n[1], 36]), edges, P, { w: 7, fills: [P.a, P.c, P.b] });
    s += g(120, 150, `<g filter="url(#sh)">${rect(0, 0, 360, 130, 28, panel(P))}</g>` + [0, 1, 2, 3, 4].map((i) => rect(24 + i * 62, 30, 54, 70, 12, [P.a, P.b, P.c, P.a, P.b][i])).join(""));
    s += pill(-440, 300, "O(n log n)", P, { color: P.a }) + pill(-60, 320, "BFS · DFS", P, { color: P.c }) + chipIcon("braces", 400, -300, P, { size: 100, color: P.b });
    return s;
  },
  "api-development": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += g(-460, -130, `<g filter="url(#sh)">${rect(0, 0, 280, 280, 40, panel(P))}</g>` + icon("smartphone", 140, 140, 150, P.a, 1.6));
    s += g(180, -130, `<g filter="url(#sh)">${rect(0, 0, 280, 280, 40, panel(P))}</g>` + icon("server", 140, 140, 150, P.c, 1.6));
    s += path_("M-170 -40H170M120 -80l50 40l-50 40", "none", P.a, 12) + path_("M170 60H-170M-120 20l-50 40l50 40", "none", P.c, 12);
    s += win(-300, 190, 600, 190, P, { title: "" }) + text(-260, 300, "GET /api/courses", 40, P.a, 700, "Consolas") + text(-260, 350, "200 OK  { json }", 36, P.c, 700, "Consolas");
    s += pill(-430, -300, "REST", P, { color: P.b }) + pill(250, -300, "JSON", P, { color: P.c }) + star(0, -300, 50, P.c);
    return s;
  },
  "html-css-academy": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-470, -270, `<g filter="url(#sh)">${path_("M0 0H300L270 300L150 340L30 300Z", "#e34f26")}</g>` + text(150, 220, "5", 220, "#fff", 900, "Segoe UI", "middle"));
    s += g(170, -270, `<g filter="url(#sh)">${path_("M0 0H300L270 300L150 340L30 300Z", "#1572b6")}</g>` + text(150, 220, "3", 220, "#fff", 900, "Segoe UI", "middle"));
    s += editor(P, r, -400, 120, 800, 260, "index.html", 4);
    s += pill(-60, -320, "<h1>", P, { color: P.a }) + pill(100, -320, "{ color }", P, { color: P.c });
    return s;
  },
  // ---- Cloud, DevOps ----
  "cloud-computing-fundamentals": (P, r) => {
    let s = glow(0, 0, 400, P.a, 0.35);
    s += cloud(0, -60, 2.0, P.w) + cloud(-170, 80, 1.2, P.b, 0.9) + cloud(210, 120, 1.0, P.a, 0.9);
    [["server", -330, 260], ["database", -110, 300], ["shield", 120, 300], ["globe", 340, 260]].forEach(([n, x, y], i) => { s += line(x, y - 50, x * 0.4, 100, P.w, 4, 'stroke-dasharray="3 12" opacity=".7"') + chipIcon(n, x, y, P, { size: 130, color: [P.a, P.c, P.b, P.a][i] }); });
    s += pill(-120, -110, "IaaS · PaaS · SaaS", P, { color: P.d, fill: "#fff", w: 330 });
    return s;
  },
  "aws-solutions-architect": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += g(-460, -300, `<g filter="url(#sh)">${rect(0, 0, 920, 600, 36, P.d)}</g>` + rect(30, 30, 860, 540, 26, "none", `stroke="${P.a}" stroke-width="5" stroke-dasharray="18 14"`));
    s += rect(-390, -240, 380, 200, 22, panel(P), `stroke="${P.b}" stroke-width="5"`) + rect(30, -240, 380, 200, 22, panel(P), `stroke="${P.b}" stroke-width="5"`);
    [[-300, -140, "server"], [-120, -140, "database"], [120, -140, "server"], [300, -140, "database"]].forEach(([x, y, n], i) => { s += icon(n, x, y, 90, [P.a, P.c][i % 2], 1.8); });
    s += path_("M-200 -40V60M210 -40V60", "none", P.w, 6, 'stroke-dasharray="4 12"') + rect(-390, 70, 800, 150, 26, panel(P), `stroke="${P.c}" stroke-width="5"`) + [0, 1, 2, 3].map((i) => icon(["cloud", "lock", "wifi", "layers"][i], -280 + i * 190, 145, 80, P.a, 1.8)).join("");
    s += chipIcon("cloud", 0, 340, P, { size: 110, color: P.c }) + pill(-440, 270, "VPC · Multi-AZ", P, { color: P.a, w: 290 });
    return s;
  },
  "azure-administration": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.35);
    s += cloud(0, -90, 1.9, P.w);
    s += g(-420, 90, `<g filter="url(#sh)">${rect(0, 0, 840, 250, 34, panel(P))}</g>` + [0, 1, 2, 3].map((i) => circle(110 + i * 200, 85, 54, [P.a, P.b, P.c, P.d][i]) + rect(60 + i * 200, 170, 100, 16, 8, mute(P))).join(""));
    s += icon("users", -300, 170, 70, P.a, 2) + chipIcon("cog", 380, -280, P, { size: 110, color: P.c }) + chipIcon("lock", -400, -280, P, { size: 100, color: P.b });
    return s;
  },
  "google-cloud-essentials": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    const col = ["#4285f4", "#ea4335", "#fbbc05", "#34a853"];
    s += cloud(0, -100, 1.9, P.w);
    col.forEach((c, i) => { s += `<g filter="url(#sh2)">${circle(-300 + i * 200, 190, 80, c)}</g>` + icon(["server", "database", "chartBar", "brain"][i], -300 + i * 200, 190, 80, "#fff", 2); });
    s += path_("M-300 110V20M-100 110V10M100 110V10M300 110V20", "none", P.d, 6, 'stroke-dasharray="3 12"') + pill(-250, 330, "Compute · Storage · AI", P, { color: P.a, w: 420 });
    return s;
  },
  "devops-cicd": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += path_("M-220 0C-220 -170 -80 -170 0 0C80 170 220 170 220 0C220 -170 80 -170 0 0C-80 170 -220 170 -220 0Z", "none", P.a, 34, 'opacity=".95"') + path_("M-220 0C-220 -170 -80 -170 0 0C80 170 220 170 220 0C220 -170 80 -170 0 0C-80 170 -220 170 -220 0Z", "none", P.w, 6, 'stroke-dasharray="3 22" opacity=".8"');
    s += g(-460, 250, [["Build", P.a], ["Test", P.b], ["Deploy", P.c]].map(([t, c], i) => `<g filter="url(#sh2)">${rect(i * 310, 0, 280, 100, 50, panel(P))}</g>` + circle(i * 310 + 50, 50, 20, c) + text(i * 310 + 90, 64, t, 38, dark(P), 700, "Segoe UI")).join("") + [0, 1].map((i) => path_(`M${280 + i * 310 + 8} 50h14l-6 -10M${280 + i * 310 + 22} 50l-6 10`, "none", P.w, 5)).join(""));
    s += chipIcon("code", -400, -280, P, { size: 100, color: P.a }) + chipIcon("cloud", 400, -280, P, { size: 100, color: P.c }) + star(0, -330, 46, P.c);
    return s;
  },
  "docker-kubernetes": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.32);
    for (let row = 0; row < 3; row++) for (let c = 0; c < 5 - (row === 2 ? 1 : 0); c++) { const x = -330 + c * 150 + (row === 2 ? 75 : 0), y = 40 - row * 100; s += rect(x, y, 130, 86, 14, [P.a, P.b, P.c][(row + c) % 3]) + rect(x + 14, y + 14, 36, 20, 6, "#fff", 'opacity=".7"'); }
    s += path_("M-400 150H380C380 230 300 280 160 280H-260C-360 280 -400 220 -400 150Z", P.d) + path_("M-260 150v50M-100 150v50M60 150v50M220 150v50", "none", P.w, 5, 'opacity=".5"');
    s += g(330, -250, `<g filter="url(#sh)">${circle(0, 0, 110, P.a)}</g>` + circle(0, 0, 30, "#fff") + Array.from({ length: 7 }, (_, i) => rot(i * 51.4, line(0, -34, 0, -86, "#fff", 12))).join("") + Array.from({ length: 7 }, (_, i) => rot(i * 51.4, circle(0, -92, 14, "#fff"))).join(""));
    s += pill(-420, 320, "docker build", P, { color: P.a }) + pill(-60, 320, "kubectl apply", P, { color: P.c, w: 280 });
    return s;
  },
  "linux-shell-scripting": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += win(-470, -280, 940, 560, P, { title: "bash", fill: "#05080f", barFill: "#111827" });
    const L = [["$", " ls -la", P.c], ["$", " cat deploy.sh", P.c], ["#!/bin/bash", "", P.b], ["for f in *.log; do", "", P.a], ["  gzip $f", "", P.a], ["done", "", P.a], ["$", " ./deploy.sh", P.c]];
    L.forEach(([a, b, c], i) => { s += text(-430, -150 + i * 62, a, 42, c, 700, "Consolas") + text(-430 + a.length * 25, -150 + i * 62, b, 42, "#e2e8f0", 500, "Consolas"); });
    s += rect(-40, 232 - 62 * 0, 22, 44, 4, P.c, 'opacity=".9"') + g(380, 300, `<g filter="url(#sh2)">${circle(0, 0, 70, P.d)}</g>` + text(0, 28, ">_", 70, P.a, 900, "Consolas", "middle"));
    return s;
  },
  "site-reliability-monitoring": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.28);
    s += g(-460, -290, `<g filter="url(#sh)">${rect(0, 0, 920, 420, 32, panel(P))}</g>` + path_("M30 220H190L240 100L310 340L370 160L430 220H890", "none", P.a, 10) + [0, 1, 2].map((i) => rect(30 + i * 300, 40, 260, 14, 7, mute(P))).join(""));
    [["99.9", P.a, -460], ["OK", P.b, -150], ["ALERT", P.c, 160]].forEach(([t, c, x]) => { s += g(x, 160, `<g filter="url(#sh2)">${rect(0, 0, 300, 170, 28, panel(P))}</g>` + circle(50, 50, 18, c) + text(150, 130, t === "99.9" ? "SLO" : t, 52, c, 900, "Segoe UI", "middle") + rect(34, 70, 120, 12, 6, mute(P))); });
    s += chipIcon("activity", 390, 330, P, { size: 90, color: P.c });
    return s;
  },
  // ---- Cybersecurity ----
  "cybersecurity-essentials": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.35);
    s += g(0, 0, `<g filter="url(#sh)">${path_(shieldPath(1), P.a)}</g>` + path_(shieldPath(0.82), P.d, "none", 0, 'opacity=".6"') + path_("M-130 10l90 90l170 -190", "none", "#fff", 34));
    s += chipIcon("lock", -400, -200, P, { size: 110, color: P.c }) + chipIcon("wifi", 400, -200, P, { size: 110, color: P.b }) + chipIcon("user", -380, 250, P, { size: 100, color: P.a }) + chipIcon("mail", 390, 250, P, { size: 100, color: P.c });
    return s;
  },
  "ethical-hacking-pentesting": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += win(-470, -280, 940, 520, P, { title: "root@kali", fill: "#05080f", barFill: "#111827" });
    [["$ nmap -sV 10.0.0.5", P.c], ["22/tcp  open  ssh", "#e2e8f0"], ["80/tcp  open  http", "#e2e8f0"], ["[!] CVE found: test only", P.a], ["$ exploit --report", P.c]].forEach(([t, c], i) => { s += text(-430, -160 + i * 76, t, 44, c, 700, "Consolas"); });
    s += g(300, 230, `<g filter="url(#sh)">${circle(0, 0, 110, P.d)}</g>` + path_("M-50 10v-50a50 50 0 0 1 100 0v50", "none", P.a, 14) + rect(-70, 8, 140, 100, 20, P.a) + circle(0, 56, 14, P.d) + path_("M0 66v22", "none", P.d, 10));
    s += pill(-440, 300, "scope: authorised", P, { color: P.b, w: 330 });
    return s;
  },
  "network-security-firewalls": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    for (let row = 0; row < 5; row++) for (let c = 0; c < 4; c++) { const off = row % 2 ? 0 : 60; s += rect(-300 + c * 150 - off + 30, -250 + row * 90, 138, 76, 10, [P.c, "#f97316", "#fb923c"][(row + c) % 3], 'opacity=".95"'); }
    s += rect(-400, -270, 800, 480, 30, "none", `stroke="${P.w}" stroke-width="5" opacity=".4"`);
    s += g(-440, 240, [["wifi", P.a], ["server", P.b], ["lock", P.c]].map(([n, c], i) => chipIcon(n, 90 + i * 260, 40, P, { size: 100, color: c })).join("") + path_("M170 40H220M430 40H480", "none", P.w, 6, 'stroke-dasharray="4 10"'));
    s += star(380, -260, 50, P.w);
    return s;
  },
  "cloud-security": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.32);
    s += cloud(0, -60, 2.0, P.w);
    s += g(0, 80, `<g filter="url(#sh)">${rect(-100, -20, 200, 170, 34, P.a)}</g>` + path_("M-50 -20v-50a50 50 0 0 1 100 0v50", "none", P.a, 24) + circle(0, 56, 24, "#fff") + path_("M0 70v34", "none", "#fff", 12));
    s += chipIcon("shield", -380, 230, P, { size: 120, color: P.c }) + chipIcon("key" in {} ? "key" : "lock", 380, 230, P, { size: 120, color: P.b }) + chipIcon("eye", 0, 340, P, { size: 100, color: P.a });
    return s;
  },
  "soc-analyst": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.28);
    for (let i = 0; i < 3; i++) s += g(-470 + i * 320, -280, `<g filter="url(#sh)">${rect(0, 0, 300, 220, 24, panel(P))}</g>` + (i === 0 ? path_("M30 150L80 100L130 130L190 50L270 90", "none", P.a, 8) : i === 1 ? donut(150, 120, 60, [[50, P.c], [30, P.a], [20, "#f43f5e"]], 26) : bars(40, 40, 220, 140, [0.4, 0.8, 0.5, 0.9], [P.b, P.a], { r: 6 })));
    s += g(-470, 10, `<g filter="url(#sh)">${rect(0, 0, 940, 300, 28, panel(P))}</g>` + [0, 1, 2, 3].map((i) => circle(50, 60 + i * 64, 14, [P.a, P.c, "#f43f5e", P.b][i]) + rect(90, 50 + i * 64, 420 - i * 40, 20, 10, mute(P)) + rect(560, 50 + i * 64, 160, 20, 10, [P.a, P.c, "#f43f5e", P.b][i], 'opacity=".7"')).join(""));
    s += chipIcon("activity", 390, 340, P, { size: 90, color: P.c }) + pill(-440, 340, "ALERT · TRIAGE", P, { color: P.c, w: 330 });
    return s;
  },
  "data-privacy-compliance": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += page(-360, -320, 460, 600, P, { head: P.a, lines: 8, r });
    s += g(60, -30, `<g filter="url(#sh)">${circle(0, 0, 190, P.a)}</g>` + rect(-80, -10, 160, 130, 26, "#fff") + path_("M-50 -10v-50a50 50 0 0 1 100 0v50", "none", "#fff", 24) + circle(0, 56, 18, P.a) + path_("M0 66v26", "none", P.a, 10));
    s += pill(-420, 320, "DPDP", P, { color: P.c, w: 150 }) + pill(-230, 320, "GDPR", P, { color: P.b, w: 150 }) + chipIcon("user", 330, -300, P, { size: 100, color: P.c }) + star(360, 260, 40, P.c);
    return s;
  },
};
