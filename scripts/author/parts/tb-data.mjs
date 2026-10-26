import { rng } from "../kit.mjs";

/**
 * Sample data for the Tableau course: "Kiran Office Supplies", a small distributor's orders (one row per order line). All values are invented for teaching and
 * generated with a fixed seed, so the table is identical on every build. Some Tables sales are loss-making when heavily discounted, on purpose.
 */
const r = rng(31337);
const pad = (n) => String(n).padStart(2, "0");
const SUB = [
  ["Furniture", "Chairs", 200, 900, 0.1], ["Furniture", "Tables", 300, 1200, -0.04], ["Furniture", "Bookcases", 150, 800, 0.04],
  ["Office Supplies", "Binders", 10, 80, 0.24], ["Office Supplies", "Paper", 8, 60, 0.32], ["Office Supplies", "Storage", 30, 300, 0.14],
  ["Technology", "Phones", 150, 1000, 0.16], ["Technology", "Accessories", 20, 200, 0.27],
];
const CUSTOMERS = [["Asha Rao", "Consumer"], ["Bilal Khan", "Corporate"], ["Chitra Iyer", "Consumer"], ["Dev Malhotra", "Home Office"], ["Esha Gupta", "Corporate"], ["Farhan Ali", "Consumer"], ["Gita Nair", "Home Office"], ["Harsh Vora", "Corporate"], ["Isha Menon", "Consumer"], ["Jay Patel", "Corporate"]];
const REGIONS = ["West", "East", "Central", "South"];

const rows = [];
let n = 1;
for (let y = 2024; y <= 2025; y++) for (let m = 1; m <= 12; m++) for (let k = 0; k < 5; k++) {
  const [cat, sub, lo, hi, margin] = r.pick(SUB);
  const [cust, seg] = r.pick(CUSTOMERS);
  const qty = r.int(1, 6), disc = r.pick([0, 0, 0.1, 0.2, 0.3]);
  const price = r.int(lo, hi);
  const sales = Math.round(qty * price * (1 - disc) * (y === 2025 ? 1.12 : 1));
  const profit = Math.round(sales * (margin - disc * 0.6));
  rows.push([`OS-${y}-${String(n++).padStart(4, "0")}`, `${y}-${pad(m)}-${pad(r.int(1, 28))}`, r.pick(REGIONS), cat, sub, seg, cust, sales, qty, disc, profit]);
}

export const fields = [
  { name: "Order ID", role: "dimension", type: "string" }, { name: "Order Date", role: "dimension", type: "date" }, { name: "Region", role: "dimension", type: "string" },
  { name: "Category", role: "dimension", type: "string" }, { name: "Sub-Category", role: "dimension", type: "string" }, { name: "Segment", role: "dimension", type: "string" },
  { name: "Customer", role: "dimension", type: "string" }, { name: "Sales", role: "measure", type: "number" }, { name: "Quantity", role: "measure", type: "number" },
  { name: "Discount", role: "measure", type: "number" }, { name: "Profit", role: "measure", type: "number" },
];
export const orders = { fields, rows, calcs: {} };
/** A smaller slice for lessons (two orders from each month), so a lesson page stays light. */
export const lessonOrders = { fields, rows: rows.filter((_, i) => i % 5 < 2), calcs: {} };
export default orders;
