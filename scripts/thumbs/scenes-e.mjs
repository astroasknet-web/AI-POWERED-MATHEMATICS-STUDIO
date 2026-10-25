/** Scenes for the 18 Blockchain & Web3 courses. Artwork only: no course content is read or changed. */
import { win, rect, circle, line, path_, g, rot, text, icon, textLines, codeRows, bars, lineChart, donut, graph, coin, cube, pill, page, chipIcon, star, ring, glow } from "./kit.mjs";

const dark = (P) => (P.light ? "#0f172a" : "#e2e8f0");
const panel = (P) => (P.light ? "#ffffff" : "#0f172a");
const mute = (P) => (P.light ? "#cbd5e1" : "#334155");
const card = (x, y, w, h, P, inner = "", r = 28) => g(x, y, `<g filter="url(#sh)">${rect(0, 0, w, h, r, panel(P))}</g>${inner}`);
const hex = (x, y, rr, c, extra = "") => path_(`M${x + rr} ${y}L${x + rr / 2} ${y + rr * 0.866}L${x - rr / 2} ${y + rr * 0.866}L${x - rr} ${y}L${x - rr / 2} ${y - rr * 0.866}L${x + rr / 2} ${y - rr * 0.866}Z`, c, "none", 0, extra);
/** One block in a chain: a header strip, hash lines and a nonce chip. */
const block = (x, y, w, h, P, c, r2, label = "") => `<g filter="url(#sh)">${rect(x, y, w, h, 24, panel(P))}</g>` + rect(x, y, w, 56, 24, c) + rect(x, y + 30, w, 26, 0, c) + text(x + w / 2, y + 40, label, 28, "#fff", 800, "Consolas", "middle") + [0, 1, 2].map((i) => rect(x + 24, y + 84 + i * 36, w - 48 - i * 26, 14, 7, mute(P))).join("") + rect(x + 24, y + h - 40, 74, 18, 9, c, 'opacity=".7"');
const chainLink = (x1, y1, x2, y2, c) => path_(`M${x1} ${y1}H${x2}`, "none", c, 10) + circle(x1, y1, 12, c) + circle(x2, y2, 12, c);
const eth = (x, y, s, c1, c2) => path_(`M${x} ${y - s}L${x + s * 0.6} ${y + s * 0.05}L${x} ${y + s * 0.38}L${x - s * 0.6} ${y + s * 0.05}Z`, c1) + path_(`M${x - s * 0.6} ${y + s * 0.22}L${x} ${y + s * 0.55}L${x + s * 0.6} ${y + s * 0.22}L${x} ${y + s}Z`, c2) + path_(`M${x} ${y - s}L${x + s * 0.6} ${y + s * 0.05}L${x} ${y + s * 0.38}Z`, "#fff", "none", 0, 'opacity=".25"');

export const E = {
  "intro-blockchain-web3": (P, r) => {
    let s = glow(0, 0, 400, P.a, 0.34);
    s += block(-470, -150, 250, 300, P, P.a, r, "#001") + block(-110, -150, 250, 300, P, P.b, r, "#002") + block(250, -150, 250, 300, P, P.c, r, "#003");
    s += chainLink(-220, 0, -110, 0, P.w) + chainLink(140, 0, 250, 0, P.w);
    s += chipIcon("globe", 0, -310, P, { size: 120, color: P.a }) + chipIcon("link", -300, 300, P, { size: 100, color: P.c }) + chipIcon("users", 300, 300, P, { size: 100, color: P.b }) + star(400, -290, 48, P.c);
    return s;
  },
  "blockchain-blocks-hashing-consensus": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += block(-450, -280, 330, 260, P, P.a, r, "BLOCK") + block(120, 20, 330, 260, P, P.b, r, "BLOCK");
    s += path_("M-290 -20C-290 100 -100 120 120 150", "none", P.w, 6, 'stroke-dasharray="4 12"') + text(-290, 100, "#a3f9…", 44, P.c, 800, "Consolas", "middle");
    s += g(120, -280, `<g filter="url(#sh)">${rect(0, 0, 330, 160, 28, panel(P))}</g>` + [0, 1, 2, 3, 4].map((i) => circle(40 + i * 62, 80, 22, i < 4 ? P.a : mute(P))).join("") + text(165, 40, "CONSENSUS", 28, dark(P), 800, "Segoe UI", "middle"));
    s += g(-460, 130, hex(70, 70, 70, P.a) + hex(70 + 105, 70 - 60, 50, P.b, 'opacity=".8"') + text(70, 82, "SHA", 34, "#fff", 900, "Consolas", "middle")) + chipIcon("lock", -360, 320, P, { size: 90, color: P.c });
    return s;
  },
  "cryptocurrency-digital-assets-fundamentals": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.32);
    s += coin(-190, -20, 190, P, "₿") + coin(110, 130, 130, P, "Ξ", { c1: "#c7d2fe", c2: "#6366f1" });
    s += card(160, -290, 330, 240, P, lineChart(30, 40, 270, 150, [0.3, 0.5, 0.4, 0.75, 0.62, 0.9], P.a) + rect(30, 16, 100, 14, 7, mute(P)));
    s += g(-460, 230, `<g filter="url(#sh)">${rect(0, 0, 340, 130, 30, P.d)}</g>` + icon("wallet", 70, 65, 70, P.c, 1.9) + rect(130, 40, 170, 16, 8, "#fff", 'opacity=".8"') + rect(130, 70, 120, 14, 7, "#fff", 'opacity=".5"'));
    s += star(380, 160, 44, P.c) + chipIcon("wallet", 330, 300, P, { size: 90, color: P.b });
    return s;
  },
  "blockchain-architecture-networks": (P, r) => {
    let s = glow(0, 0, 400, P.b, 0.32);
    const nodes = [[0, 0, 56], [-330, -190, 40], [320, -210, 40], [-380, 150, 40], [340, 180, 40], [-90, -330, 34], [110, 310, 34], [-130, 250, 34], [150, -170, 34], [-180, -60, 34], [200, 60, 34]];
    const edges = [[0, 1], [0, 2], [0, 3], [0, 4], [1, 5], [5, 2], [3, 7], [7, 6], [6, 4], [8, 2], [9, 1], [10, 4], [9, 0], [10, 0], [8, 0], [1, 3], [2, 4]];
    s += graph(nodes, edges, P, { w: 5, stroke: P.w, fills: [P.a, P.c, P.b] });
    s += card(-60, -90, 120, 180, P, "", 28).replace(/<g filter="url\(#sh\)">.*?<\/g>/, "") + path_("M0 -60L40 -20V30L0 70L-40 30V-20Z", "#fff");
    s += pill(-470, 330, "peer-to-peer", P, { color: P.a, w: 280 }) + pill(160, 360, "P2P · nodes", P, { color: P.c, w: 260 });
    return s;
  },
  "ethereum-smart-contracts": (P, r) => {
    let s = glow(0, 0, 400, P.a, 0.4);
    s += eth(-170, -20, 290, P.a, P.b);
    s += win(60, -250, 420, 330, P, { title: "" }) + codeRows(80, -150, 380, 5, P, r, { gap: 44, numbers: false }) + g(240, 140, `<g filter="url(#sh)">${rect(-190, 0, 380, 120, 30, P.c)}</g>` + text(0, 78, "contract { }", 50, "#1f2937", 800, "Consolas", "middle"));
    s += star(-440, -260, 50, P.w) + chipIcon("code", 380, 330, P, { size: 100, color: P.b }) + chipIcon("link", -400, 290, P, { size: 100, color: P.c });
    return s;
  },
  "solidity-programming-beginners": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += win(-470, -280, 620, 560, P, { title: "Token.sol" });
    const L = [["pragma solidity ^0.8;", P.c], ["contract Hello {", P.a], ["  string public msg;", P.b], ["  function set(string m)", P.a], ["    public { msg = m; }", P.c], ["}", P.a]];
    L.forEach(([t, c], i) => { s += text(-430, -150 + i * 66, t, 38, c, 700, "Consolas"); });
    s += g(250, -60, `<g filter="url(#sh)">${path_("M0 -240L110 -110L0 20L-110 -110Z", P.a)}${path_("M0 -240L110 -110L0 -80Z", "#fff")}${path_("M-110 -90L0 40L110 -90L0 130Z", P.b)}${path_("M-70 70L0 200L70 70L0 110Z", P.c)}</g>`);
    s += pill(-420, 320, "Beginner", P, { color: P.c, w: 200 }) + chipIcon("braces", 400, 300, P, { size: 100, color: P.a });
    return s;
  },
  "build-first-blockchain-dapp": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-190, -300, `<g filter="url(#sh)">${rect(0, 0, 380, 620, 54, "#0b1020")}</g>` + rect(22, 22, 336, 576, 38, panel(P)) + rect(50, 56, 280, 74, 22, P.a) + text(190, 106, "Connect", 36, "#fff", 800, "Segoe UI", "middle") + [0, 1, 2].map((i) => rect(50, 160 + i * 120, 280, 94, 20, mute(P)) + circle(100, 207 + i * 120, 28, [P.a, P.b, P.c][i])).join("") + rect(60, 520, 260, 56, 28, P.c));
    s += g(-460, -140, `<g filter="url(#sh)">${rect(0, 0, 250, 300, 28, panel(P))}</g>` + icon("wallet", 125, 100, 120, P.a, 1.7) + rect(40, 210, 170, 16, 8, mute(P)));
    s += g(240, -140, `<g filter="url(#sh)">${rect(0, 0, 250, 300, 28, panel(P))}</g>` + block(20, 24, 210, 250, P, P.b, r, "tx").replace(/filter="url\(#sh\)"/, ""));
    s += path_("M-210 10H-190M180 10H240", "none", P.w, 8, 'stroke-dasharray="3 10"') + star(400, -290, 50, P.c) + chipIcon("blocks", 380, 300, P, { size: 100, color: P.c });
    return s;
  },
  "advanced-solidity-development": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.34);
    s += win(-470, -270, 560, 520, P, { title: "Vault.sol" }) + codeRows(-440, -160, 500, 8, P, r, { gap: 46 });
    s += g(250, -90, `<g filter="url(#sh)">${rect(-190, -190, 380, 380, 40, panel(P))}</g>` + eth(0, 0, 130, P.a, P.b) + ring(0, 0, 160, P.c, 8, 0.7) + path_("M-190 -90H-250M190 90H250", "none", P.w, 6, 'stroke-dasharray="3 10"'));
    s += pill(-440, 300, "gas · storage · proxy", P, { color: P.c, w: 380 }) + chipIcon("braces", 400, 300, P, { size: 100, color: P.a }) + chipIcon("layers", 330, -300, P, { size: 90, color: P.b });
    return s;
  },
  "smart-contract-security-auditing": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += win(-470, -280, 620, 560, P, { title: "audit" }) + codeRows(-440, -170, 560, 8, P, r, { gap: 52 });
    s += rect(-460, 10, 600, 62, 10, "#f43f5e", 'opacity=".28"') + rect(-460, 10, 8, 62, 4, "#f43f5e") + path_("M-300 -170l24 -20", "none", "#f43f5e", 0);
    s += g(250, -40, `<g filter="url(#sh)">${path_("M0 -250L180 -180V0C180 110 100 180 0 220C-100 180 -180 110 -180 0V-180Z", P.a)}</g>` + path_("M-90 -10l70 70l120 -130", "none", "#fff", 24));
    s += `<circle cx="120" cy="190" r="86" fill="${P.light ? "#fff" : "#1e293b"}" stroke="${P.c}" stroke-width="14"/>` + path_("M182 252l80 80", "none", P.c, 28) + pill(-440, 310, "re-entrancy ✓", P, { color: P.a, w: 330 });
    return s;
  },
  "token-development-erc-standards": (P, r) => {
    let s = glow(0, 0, 380, P.b, 0.3);
    s += coin(-280, -90, 150, P, "20", { c1: "#fde68a", c2: "#f59e0b" }) + coin(-60, 140, 120, P, "", { c1: "#bae6fd", c2: "#0ea5e9" });
    s += g(120, -260, `<g filter="url(#sh)">${rect(0, 0, 330, 400, 34, panel(P))}</g>` + rect(26, 26, 278, 220, 20, P.a) + path_("M26 200L110 120L170 180L240 90L304 200Z", "#fff", "none", 0, 'opacity=".5"') + circle(240, 76, 26, "#fff") + rect(26, 270, 200, 20, 10, dark(P), 'opacity=".45"') + rect(26, 312, 140, 16, 8, mute(P)) + text(26 + 270, 340, "721", 34, P.c, 900, "Consolas", "end"));
    s += g(-460, 230, ["ERC-20", "ERC-721", "ERC-1155"].map((t, i) => `<g filter="url(#sh2)">${rect(i * 300, 0, 270, 100, 50, panel(P))}</g>` + text(i * 300 + 135, 66, t, 40, [P.a, P.c, P.b][i], 900, "Consolas", "middle")).join(""));
    s += star(380, 130, 46, P.c) + chipIcon("link", 400, -290, P, { size: 90, color: P.c });
    return s;
  },
  "nfts-decentralized-applications": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.34);
    const art = (x, y, rot_, c1, c2, w = 300, h = 380) => rot(rot_, `<g filter="url(#sh)">${rect(x, y, w, h, 28, "#fff")}</g>` + rect(x + 18, y + 18, w - 36, h - 120, 18, c1) + `<circle cx="${x + w * 0.62}" cy="${y + 110}" r="46" fill="${c2}"/>` + `<path d="M${x + 18} ${y + h - 102}L${x + w * 0.35} ${y + 140}L${x + w * 0.55} ${y + 210}L${x + w * 0.72} ${y + 160}L${x + w - 18} ${y + h - 102}Z" fill="${c2}" opacity=".7"/>` + rect(x + 22, y + h - 82, 160, 18, 9, "#64748b", 'opacity=".4"') + rect(x + 22, y + h - 50, 100, 14, 7, "#64748b", 'opacity=".3"'), x + w / 2, y + h / 2);
    s += art(-460, -260, -9, P.a, P.c) + art(-130, -300, 2, P.b, P.a) + art(200, -250, 10, P.c, P.b);
    s += g(-400, 200, `<g filter="url(#sh)">${rect(0, 0, 800, 150, 34, panel(P))}</g>` + icon("wallet", 90, 75, 80, P.a, 1.8) + rect(160, 44, 280, 18, 9, mute(P)) + rect(160, 78, 200, 16, 8, mute(P), 'opacity=".7"') + rect(560, 40, 190, 70, 35, P.c) + text(655, 86, "Mint", 36, "#1f2937", 800, "Segoe UI", "middle"));
    s += chipIcon("image", 400, 340, P, { size: 90, color: P.b }) + star(-420, 330, 44, P.c);
    return s;
  },
  "web3-development-javascript-nodejs": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    s += g(-460, -270, `<g filter="url(#sh)">${rect(0, 0, 300, 300, 40, "#f7df1e")}</g>` + text(150, 220, "JS", 160, "#1f2937", 900, "Segoe UI", "middle"));
    s += g(-100, -270, `<g filter="url(#sh)">${hex(150, 150, 150, "#3c873a")}</g>` + text(150, 178, "node", 62, "#fff", 900, "Segoe UI", "middle"));
    s += g(240, -230, `<g filter="url(#sh)">${rect(0, 0, 250, 250, 36, panel(P))}</g>` + eth(125, 120, 90, P.a, P.b));
    s += win(-470, 80, 940, 290, P, { title: "app.js" }) + codeRows(-440, 170, 880, 3, P, r, { gap: 52, indent: [0, 1, 0] }) + text(-420, 340, "await contract.methods", 32, P.a, 700, "Consolas");
    s += pill(120, 300, "web3.js", P, { color: P.c, w: 200 });
    return s;
  },
  "blockchain-php-nodejs": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += g(-470, -240, `<g filter="url(#sh)">${rect(0, 0, 480, 280, 140, "#6d78b3")}</g>` + text(240, 186, "php", 130, "#1f2937", 900, "Segoe UI", "middle", 'font-style="italic"') + text(240, 186, "php", 130, "#111827", 900, "Segoe UI", "middle", 'font-style="italic" opacity=".0"'));
    s += g(70, -250, `<g filter="url(#sh)">${hex(170, 160, 170, "#3c873a")}</g>` + text(170, 186, "node", 70, "#fff", 900, "Segoe UI", "middle"));
    s += path_("M-230 60V150H170V60", "none", P.w, 8, 'stroke-dasharray="4 12"') + block(-120, 150, 260, 190, P, P.c, r, "chain") + chainLink(-340, 245, -120, 245, P.a) + chainLink(140, 245, 340, 245, P.b);
    s += g(-460, 190, `<g filter="url(#sh2)">${rect(0, 0, 170, 110, 26, panel(P))}</g>` + icon("server", 85, 55, 66, P.a, 2)) + g(300, 190, `<g filter="url(#sh2)">${rect(0, 0, 170, 110, 26, panel(P))}</g>` + icon("database", 85, 55, 66, P.c, 2));
    return s;
  },
  "production-ready-web3-apps": (P, r) => {
    let s = glow(0, 0, 400, P.b, 0.36);
    s += g(-60, 20, `<g filter="url(#sh)">${path_("M0 -280C100 -190 110 -60 80 90H-80C-110 -60 -100 -190 0 -280Z", "#fff")}${circle(0, -120, 40, P.a)}${path_("M-80 90L-160 160L-80 130Z", P.c)}${path_("M80 90L160 160L80 130Z", P.c)}</g>` + path_("M-20 130Q0 250 20 130", P.c, "none", 0));
    s += card(-470, -280, 340, 210, P, lineChart(30, 30, 280, 140, [0.4, 0.5, 0.45, 0.7, 0.9], P.a, { width: 6, dots: false }) + circle(300, 30, 12, "#22c55e")) + card(150, -280, 340, 210, P, icon("shield", 170, 105, 110, P.c, 1.7)) + card(150, 110, 340, 210, P, [0, 1, 2].map((i) => rect(34, 36 + i * 52, 270 - i * 50, 22, 11, [P.a, P.b, P.c][i])).join("")) + card(-470, 110, 340, 210, P, eth(170, 105, 80, P.a, P.b));
    s += pill(-120, 340, "monitored · tested", P, { color: P.c, w: 320 });
    return s;
  },
  "blockchain-5-real-world-projects": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.3);
    const ico = ["truck", "book", "heart", "rupee", "users"], cols = [P.a, P.b, P.c, P.a, P.b];
    ico.forEach((n, i) => { const a = -Math.PI / 2 + (i / 5) * Math.PI * 2; const x = Math.cos(a) * 300, y = Math.sin(a) * 270; s += line(0, 0, x, y, P.w, 4, 'stroke-dasharray="4 12" opacity=".6"') + `<g filter="url(#sh2)">${circle(x, y, 96, panel(P))}</g>` + circle(x, y, 96, "none", `stroke="${cols[i]}" stroke-width="8"`) + icon(n, x, y, 80, cols[i], 1.9) + circle(x + 70, y - 70, 26, P.c) + text(x + 70, y - 58, String(i + 1), 34, "#1f2937", 900, "Segoe UI", "middle"); });
    s += `<g filter="url(#sh)">${circle(0, 0, 100, P.d)}</g>` + hex(0, 0, 60, P.c) + text(0, 14, "5", 56, "#1f2937", 900, "Segoe UI", "middle");
    return s;
  },
  "blockchain-enterprise-architecture": (P, r) => {
    let s = glow(0, 0, 380, P.a, 0.3);
    s += g(-470, -280, `<g filter="url(#sh)">${rect(0, 0, 940, 580, 34, panel(P))}</g>`);
    ["Org A", "Org B", "Org C"].forEach((t, i) => { s += g(-430 + i * 300, -230, rect(0, 0, 260, 150, 24, [P.a, P.b, P.c][i], 'opacity=".95"') + text(130, 62, t, 36, "#fff", 800, "Segoe UI", "middle").replace('fill="#fff"', i === 2 ? 'fill="#1f2937"' : 'fill="#fff"') + icon("briefcase", 130, 106, 44, i === 2 ? "#1f2937" : "#fff", 2)); });
    s += path_("M-300 -80V0M0 -80V0M300 -80V0", "none", P.w, 6, 'stroke-dasharray="3 10"') + rect(-440, 0, 880, 130, 26, panel(P), `stroke="${P.a}" stroke-width="5"`) + [0, 1, 2, 3, 4].map((i) => rect(-410 + i * 170, 30, 144, 70, 14, [P.a, P.b, P.c, P.a, P.b][i], 'opacity=".9"')).join("") + text(0, 168, "shared permissioned ledger", 32, dark(P), 700, "Consolas", "middle");
    s += g(-440, 190, [0, 1, 2].map((i) => `<g filter="url(#sh2)">${rect(i * 300, 0, 260, 84, 42, panel(P))}</g>` + icon(["lock", "users", "layers"][i], i * 300 + 54, 42, 44, [P.a, P.c, P.b][i], 2) + rect(i * 300 + 100, 34, 120, 14, 7, mute(P))).join(""));
    return s;
  },
  "blockchain-defi": (P, r) => {
    let s = glow(0, 0, 380, P.c, 0.34);
    s += g(-290, -150, `<g filter="url(#sh)">${path_("M0 120L200 0L400 120V150H0Z", P.a)}${rect(30, 150, 340, 190, 0, "none")}${[0, 1, 2, 3].map((i) => rect(40 + i * 86, 150, 50, 150, 12, P.w)).join("")}${rect(10, 300, 380, 36, 10, P.a)}</g>`);
    s += coin(300, -150, 110, P, "₹") + coin(210, 40, 80, P, "Ξ", { c1: "#c7d2fe", c2: "#6366f1" });
    s += path_("M100 -30C200 -90 260 -60 330 -50", "none", P.w, 6, 'stroke-dasharray="4 12" opacity=".7"') + path_("M-80 -20C20 -110 140 -110 190 -30", "none", P.w, 6, 'stroke-dasharray="4 12" opacity=".7"');
    s += card(100, 160, 380, 170, P, donut(100, 85, 50, [[50, P.a], [30, P.c], [20, P.b]], 24) + text(280, 92, "APY", 50, P.a, 900, "Segoe UI", "middle")) + pill(-440, 330, "lend · swap · stake", P, { color: P.c, w: 330 }) + chipIcon("link", 400, -300, P, { size: 90, color: P.b });
    return s;
  },
  "blockchain-capstone-project": (P, r) => {
    let s = glow(0, 0, 400, P.a, 0.38);
    s += g(-60, -60, `<g filter="url(#sh)">${rect(-300, -240, 600, 420, 40, panel(P))}</g>`);
    s += block(-270, -200, 170, 270, P, P.a, r, "01") + block(-60, -200, 170, 270, P, P.b, r, "02") + block(150, -200, 170, 270, P, P.c, r, "03");
    s += g(-60, 260, `<g filter="url(#sh)">${rect(-250, -40, 500, 90, 45, P.c)}</g>` + text(0, 24, "SHIPPED", 54, "#1f2937", 900, "Segoe UI", "middle"));
    s += path_("M-60 -300l30 60h66l-54 40l22 62-64 -40-64 40 22-62-54-40h66Z", P.c, "none", 0, 'transform="translate(80 40) scale(.9)"');
    s += chipIcon("rocket", 380, -290, P, { size: 110, color: P.c }) + chipIcon("cap", -380, 330, P, { size: 100, color: P.a }) + star(400, 280, 44, P.w);
    return s;
  },
};
