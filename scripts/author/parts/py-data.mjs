import { rng } from "../kit.mjs";

/**
 * Sample data for the analytics course: "ShopLens", a small online shop's users, their events and their orders. All values are invented for teaching
 * and generated with a fixed seed, so the tables are identical on every build. Three users have no city, and a few events are exact duplicates, on purpose.
 */
const r = rng(4242);
const iso = (y, m, d) => `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const addDays = (s, n) => { const [y, m, d] = s.split("-").map(Number); const t = new Date(Date.UTC(y, m - 1, d + n)); return iso(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate()); };

const SOURCES = ["organic", "ads", "referral", "organic", "ads", "organic"];
const CITIES = ["Pune", "Delhi", "Mumbai", "Bengaluru"];
const users = [];
for (let id = 1; id <= 36; id++) {
  const month = 1 + Math.floor((id - 1) / 6), day = 1 + ((id * 4) % 27);
  users.push([id, iso(2025, month, day), id % 4 === 0 ? "pro" : "free", SOURCES[id % 6], id === 7 || id === 19 || id === 31 ? null : CITIES[(id * 3) % 4]]);
}

const events = [];
const orders = [];
let eid = 1, oid = 1;
const ev = (u, d, t) => events.push([eid++, u, d, t]);
for (const [id, signup] of users) {
  ev(id, signup, "visit");
  ev(id, signup, "signup");
  let carted = r.next() < 0.72;
  if (carted) {
    const d = addDays(signup, r.int(0, 2));
    ev(id, d, "add_to_cart");
    if (r.next() < 0.55) {
      const pd = addDays(d, r.int(0, 3));
      ev(id, pd, "purchase");
      orders.push([oid++, id, pd, r.int(3, 30) * 100]);
      if (r.next() < 0.35) orders.push([oid++, id, addDays(pd, r.int(20, 60)), r.int(2, 20) * 100]);
    }
  }
  for (const [gap, p] of [[30, 0.62], [60, 0.4], [90, 0.25]]) if (r.next() < p) ev(id, addDays(signup, gap + r.int(0, 10)), "visit");
}
events.push([eid++, 3, events.find((e) => e[1] === 3 && e[3] === "visit")[2], "visit"]); // exact duplicates, to be found in the course
events.push([eid++, 9, events.find((e) => e[1] === 9 && e[3] === "signup")[2], "signup"]);
events.push([eid++, 14, events.find((e) => e[1] === 14 && e[3] === "visit")[2], "visit"]);

export const T_USERS = ["users", ["id", "signup_date", "plan", "source", "city"], users];
export const T_EVENTS = ["events", ["id", "user_id", "event_date", "event_type"], events];
export const T_ORDERS = ["orders", ["id", "user_id", "order_date", "amount"], orders];
export const shoplens = [T_USERS, T_EVENTS, T_ORDERS];
export default shoplens.map((t) => t);
export const labs_tables = shoplens;
export const retail = shoplens; // lets the authoring probes (q.mjs) load this file like the retail data
