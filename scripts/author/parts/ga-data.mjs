import { rng } from "../kit.mjs";

/**
 * Sample data for the Google Analytics 4 course: "Kiran Learning", a small online learning site. All values are invented for teaching and generated with
 * a fixed seed, so the tables are identical on every build. `sessions` has one row per session and feeds the viz builder; `ga_events` is the same traffic
 * flattened to one row per event, the way an analyst meets GA4 data in an export, and feeds the SQL labs.
 */
const r = rng(20250);
const pad = (n) => String(n).padStart(2, "0");

// channel, source / medium, share of traffic, engagement chance, conversion chance (given engaged), average order value
const CHANNELS = [
  ["Organic Search", "google / organic", 0.3, 0.62, 0.1, 1400],
  ["Paid Search", "google / cpc", 0.2, 0.55, 0.09, 1200],
  ["Direct", "(direct) / (none)", 0.17, 0.7, 0.14, 1500],
  ["Email", "newsletter / email", 0.12, 0.8, 0.22, 1300],
  ["Organic Social", "instagram / social", 0.14, 0.4, 0.04, 900],
  ["Referral", "partner-blog.in / referral", 0.07, 0.66, 0.12, 1100],
];
const DEVICES = [["Mobile", 0.62, 0.85], ["Desktop", 0.33, 1.15], ["Tablet", 0.05, 1]];
const COUNTRIES = [["India", 0.7], ["United States", 0.1], ["United Kingdom", 0.08], ["UAE", 0.06], ["Other", 0.06]];
const PAGES = ["/", "/pricing", "/blog/guide", "/courses", "/contact"];
const pickW = (list) => { let x = r.next(), acc = 0; for (const it of list) { acc += it[it.length === 6 ? 2 : 1]; if (x < acc) return it; } return list[list.length - 1]; };

const sessions = [];
const events = [];
let eid = 1;
const N = 160;
for (let i = 1; i <= N; i++) {
  const month = 1 + Math.floor(((i - 1) * 6) / N), day = r.int(1, 28);
  const date = `2025-${pad(month)}-${pad(day)}`;
  const ch = pickW(CHANNELS);
  const dev = pickW(DEVICES);
  const country = pickW(COUNTRIES)[0];
  const landing = ch[0] === "Email" ? "/courses" : ch[0] === "Paid Search" ? "/pricing" : r.pick(PAGES);
  const user = `U${String(r.int(1, 95)).padStart(3, "0")}`;
  const engaged = r.next() < ch[3] * (dev[2] > 1 ? 1.1 : 0.92) ? 1 : 0;
  const pageviews = engaged ? r.int(2, 7) : 1;
  const secs = engaged ? r.int(25, 400) : r.int(1, 9);
  const converted = engaged && r.next() < ch[4] * dev[2] * 1.6 ? 1 : 0;
  const revenue = converted ? Math.round((ch[5] * (0.6 + r.next() * 0.9)) / 50) * 50 : 0;
  const sid = `S${String(i).padStart(4, "0")}`;
  sessions.push([sid, user, date, ch[0], ch[1], dev[0], country, landing, engaged, secs, pageviews, converted, revenue]);
  const [src, med] = ch[1].split(" / ");
  const ev = (name, value = null) => events.push([eid++, date, user, sid, name, src, med, dev[0], landing, value]);
  ev("session_start");
  for (let k = 0; k < pageviews; k++) ev("page_view");
  if (engaged && r.next() < 0.7) ev("scroll");
  if (engaged && r.next() < 0.6) { ev("view_item"); if (r.next() < 0.5) { ev("add_to_cart"); if (r.next() < 0.6) { ev("begin_checkout"); } } }
  if (converted) { if (!events.some((e) => e[3] === sid && e[4] === "view_item")) ev("view_item"); if (!events.some((e) => e[3] === sid && e[4] === "add_to_cart")) ev("add_to_cart"); if (!events.some((e) => e[3] === sid && e[4] === "begin_checkout")) ev("begin_checkout"); ev("purchase", revenue); }
}

export const fields = [
  { name: "Session ID", role: "dimension", type: "string" }, { name: "User ID", role: "dimension", type: "string" }, { name: "Session Date", role: "dimension", type: "date" },
  { name: "Channel", role: "dimension", type: "string" }, { name: "Source / Medium", role: "dimension", type: "string" }, { name: "Device", role: "dimension", type: "string" },
  { name: "Country", role: "dimension", type: "string" }, { name: "Landing Page", role: "dimension", type: "string" },
  { name: "Engaged", role: "measure", type: "number" }, { name: "Engagement Seconds", role: "measure", type: "number" }, { name: "Pageviews", role: "measure", type: "number" },
  { name: "Converted", role: "measure", type: "number" }, { name: "Revenue", role: "measure", type: "number" },
];
/** Sessions and Users are ready-made, as GA4's own metrics are; the rates are for students to build. */
export const trafficData = { fields, rows: sessions, calcs: { Sessions: "COUNTD([Session ID])", Users: "COUNTD([User ID])" } };
export const ga_events = ["ga_events", ["event_id", "event_date", "user_pseudo_id", "session_id", "event_name", "source", "medium", "device", "landing_page", "value"], events];
export const ga_sessions = ["ga_sessions", fields.map((f) => f.name.toLowerCase().replace(/ \/ /g, "_").replace(/ /g, "_")), sessions];
export default trafficData;
export const retail = [ga_events, ga_sessions]; // lets the authoring probes load this file like the other data files
