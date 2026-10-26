import { rng } from "../kit.mjs";

/**
 * Sample data for the SQL course: a small online-and-store retailer ("Kiran Stores"). All values are invented for teaching and generated with a fixed
 * seed, so the tables are identical on every build. Two customers have no city on purpose (to teach NULL) and some customers never ordered (to teach LEFT JOIN).
 */
const r = rng(2025);
const NAMES = ["Asha Rao", "Bilal Khan", "Chitra Iyer", "Dev Malhotra", "Esha Gupta", "Farhan Ali", "Gita Nair", "Harsh Vora", "Isha Menon", "Jay Patel", "Kavya Reddy", "Lakshmi Pillai", "Manav Singh", "Nisha Das", "Omkar Joshi", "Pooja Shah", "Qasim Sheikh", "Riya Kapoor", "Sameer Bhat", "Tara Dutta", "Uday Kulkarni", "Vani Rao", "Wasim Akram", "Yash Chopra"];
const CITIES = ["Pune", "Delhi", "Mumbai", "Bengaluru", "Chennai"];

export const customers = ["customers", ["id", "name", "city", "segment", "joined"], NAMES.map((name, i) => {
  const id = i + 1;
  const city = id === 5 || id === 19 ? null : CITIES[(id * 7 + 3) % 5];
  const segment = id % 4 === 0 ? "Business" : "Consumer";
  const m = 1 + (id % 6), d = 1 + ((id * 5) % 27);
  return [id, name, city, segment, `2024-${String(6 + (id % 7)).padStart(2, "0")}-${String(d).padStart(2, "0")}`];
})];

export const products = ["products", ["id", "name", "category", "price"], [
  [1, "Notebook A5", "Stationery", 90], [2, "Gel pen (pack of 5)", "Stationery", 120], [3, "Desk lamp", "Home", 750], [4, "Water bottle", "Home", 350],
  [5, "USB cable", "Electronics", 199], [6, "Earphones", "Electronics", 899], [7, "Power bank", "Electronics", 1499], [8, "Backpack", "Home", 1250],
  [9, "Sticky notes", "Stationery", 60], [10, "Wireless mouse", "Electronics", 649],
]];

const STATUS = ["completed", "completed", "completed", "completed", "completed", "returned", "cancelled"];
const CHANNEL = ["web", "app", "store"];
const orderRows = [];
const itemRows = [];
let itemId = 1;
for (let id = 1; id <= 60; id++) {
  const cust = r.int(1, 20); // customers 21-24 never order
  const month = 1 + Math.floor((id - 1) / 10), day = r.int(1, 28);
  orderRows.push([id, cust, `2025-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`, r.pick(STATUS), r.pick(CHANNEL)]);
  const n = r.int(1, 3), used = new Set();
  for (let k = 0; k < n; k++) {
    let pid = r.int(1, 10);
    while (used.has(pid)) pid = r.int(1, 10);
    used.add(pid);
    itemRows.push([itemId++, id, pid, r.int(1, 4)]);
  }
}
export const orders = ["orders", ["id", "customer_id", "order_date", "status", "channel"], orderRows];
export const order_items = ["order_items", ["id", "order_id", "product_id", "qty"], itemRows];
export const retail = [customers, products, orders, order_items];
export const retailNoItems = [customers, products, orders];
