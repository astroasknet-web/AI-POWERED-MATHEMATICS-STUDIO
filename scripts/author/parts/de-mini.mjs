/** Tiny tables for the data engineering lessons: small enough to check every result by eye. */
export const raw_events = ["raw_events", ["event_id", "order_id", "status", "event_ts"], [
  [1, 101, "created", "2025-03-01 09:00"], [2, 101, "paid", "2025-03-01 09:05"], [2, 101, "paid", "2025-03-01 09:05"], [3, 102, "created", "2025-03-01 10:00"],
  [4, 101, "shipped", "2025-03-02 08:00"], [5, 102, "cancelled", "2025-03-01 10:30"], [6, 103, "created", "2025-03-02 11:00"], [7, 103, "paid", "2025-03-02 11:02"],
]];
export const changes = ["changes", ["customer_id", "city", "changed_at"], [[1, "Pune", "2025-01-01"], [1, "Mumbai", "2025-03-10"], [2, "Delhi", "2025-01-01"], [3, "Chennai", "2025-01-01"], [3, "Pune", "2025-02-15"], [3, "Delhi", "2025-04-20"]]];
export const sales = ["sales", ["sale_id", "sale_date", "product_id", "customer_id", "amount"], [[1, "2025-03-01", 10, 1, 500], [2, "2025-03-05", 11, 2, 300], [3, "2025-03-12", 10, 1, 700], [4, "2025-03-20", 12, 3, 200]]];
export const products = ["products", ["product_id", "product", "category"], [[10, "Notebook", "Stationery"], [11, "Desk lamp", "Home"], [12, "USB cable", "Electronics"]]];
export const visits = ["visits", ["visit_id", "visit_ts"], [[1, "2025-03-01 10:02:10"], [2, "2025-03-01 10:07:45"], [3, "2025-03-01 10:11:30"], [4, "2025-03-01 10:14:00"], [5, "2025-03-01 10:19:59"], [6, "2025-03-01 10:21:05"], [7, "2025-03-01 10:38:20"]]];
export const checks = ["orders_raw", ["order_id", "customer_id", "status", "amount"], [[1, 5, "paid", 500], [2, 6, "paid", 300], [2, 6, "paid", 300], [3, null, "shipped", 700], [4, 7, "paid", -50], [5, 99, "lost", 200]]];
export const known_customers = ["known_customers", ["customer_id"], [[5], [6], [7], [8]]];
export default [raw_events, changes, sales, products, visits, checks, known_customers];
