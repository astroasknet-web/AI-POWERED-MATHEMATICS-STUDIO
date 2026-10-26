import { rng } from "../kit.mjs";

/**
 * Sample data for the data engineering course: "ShopCore", the raw tables a pipeline would receive from an online shop's systems. All values are invented
 * and generated with a fixed seed. The raw event log has exact duplicate deliveries and events that arrive out of order, and customers move city over time,
 * on purpose, so the transformations in the course have real work to do.
 */
const r = rng(5150);
const pad = (n) => String(n).padStart(2, "0");
const addDays = (s, n) => { const [y, m, d] = s.split("-").map(Number); const t = new Date(Date.UTC(y, m - 1, d + n)); return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`; };

const NAMES = ["Asha Rao", "Bilal Khan", "Chitra Iyer", "Dev Malhotra", "Esha Gupta", "Farhan Ali", "Gita Nair", "Harsh Vora", "Isha Menon", "Jay Patel", "Kavya Reddy", "Lakshmi Pillai"];
const CITIES = ["Pune", "Delhi", "Mumbai", "Bengaluru", "Chennai"];

export const customers = ["customers", ["customer_id", "name"], NAMES.map((n, i) => [i + 1, n])];

// each customer starts in one city on 2025-01-01; some move later in the year
const changes = [];
let cid = 1;
NAMES.forEach((_, i) => {
  const first = CITIES[(i * 2) % 5];
  changes.push([cid++, i + 1, first, "2025-01-01"]);
  if (i % 3 === 0) changes.push([cid++, i + 1, CITIES[(i * 2 + 3) % 5], addDays("2025-03-01", r.int(0, 60))]);
});
export const customer_changes = ["customer_changes", ["change_id", "customer_id", "city", "changed_at"], changes];

const orders = [], events = [];
let eid = 1;
const FINAL = ["delivered", "delivered", "delivered", "delivered", "cancelled", "refunded"];
for (let k = 0; k < 40; k++) {
  const orderId = 1001 + k, cust = r.int(1, 12), date = addDays("2025-01-05", r.int(0, 150)), amount = r.int(2, 30) * 100;
  orders.push([orderId, cust, date]);
  const path = ["created", "paid"];
  const fin = r.pick(FINAL);
  if (fin === "delivered") path.push("shipped", "delivered"); else if (fin === "cancelled") path.push("cancelled"); else path.push("shipped", "delivered", "refunded");
  path.forEach((status, i) => {
    const ts = `${addDays(date, i)} ${pad(8 + (r.int(0, 10)))}:${pad(r.int(0, 59))}:00`;
    const row = [eid++, orderId, status, amount, ts];
    events.push(row);
    if (r.next() < 0.1) events.push([...row]); // the same event delivered twice
  });
}
// events arrive out of order: shuffle a deterministic slice of the log
for (let i = events.length - 1; i > 0; i -= 7) { const j = r.int(0, i); [events[i], events[j]] = [events[j], events[i]]; }
// payments arrive from a separate system and are deliberately messy, so the quality checks in the course have something to find
const payments = [];
let pid = 1;
for (const [orderId, , date] of orders) {
  payments.push([pid++, orderId, r.int(2, 30) * 100, r.pick(["card", "upi", "card", "upi", "cod"]), `${addDays(date, 1)} 10:${pad(r.int(0, 59))}:00`]);
}
payments.push([payments[3][0], ...payments[3].slice(1)], [payments[11][0], ...payments[11].slice(1)], [payments[20][0], ...payments[20].slice(1)]); // duplicate deliveries
payments.push([pid++, null, 700, "card", "2025-03-04 11:00:00"], [pid++, null, 1200, "upi", "2025-04-09 15:30:00"]); // no order
payments.push([pid++, 9999, 500, "card", "2025-02-14 12:00:00"], [pid++, 8888, 900, "upi", "2025-05-02 09:45:00"]); // an order that does not exist
payments.push([pid++, 1005, -300, "card", "2025-03-21 16:10:00"], [pid++, 1017, -150, "upi", "2025-04-18 13:20:00"]); // negative amounts
payments.push([pid++, 1009, 400, "cheque", "2025-03-30 14:00:00"], [pid++, 1022, 600, "wallet", "2025-05-11 17:25:00"]); // a method we do not accept
export const orders_t = ["orders", ["order_id", "customer_id", "order_date"], orders];
export const order_events = ["order_events", ["event_id", "order_id", "status", "amount", "event_ts"], events];
export const payments_t = ["payments", ["payment_id", "order_id", "amount", "method", "paid_at"], payments];
export const shopcore = [customers, customer_changes, orders_t, order_events, payments_t];
export default shopcore;
export const retail = shopcore; // lets the authoring probes load this file like the other data files
