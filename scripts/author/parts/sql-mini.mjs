/** Tiny tables used inside SQL lessons, small enough that every result can be checked by eye. */
export const sales = ["sales", ["id", "customer", "city", "amount", "status", "order_date"], [
  [1, "Asha", "Pune", 500, "paid", "2025-01-05"], [2, "Bilal", "Delhi", 700, "paid", "2025-01-18"], [3, "Chitra", "Pune", 200, "refunded", "2025-02-02"], [4, "Dev", "Mumbai", 450, "paid", "2025-02-14"],
  [5, "Esha", null, 320, "paid", "2025-02-27"], [6, "Farhan", "Delhi", 150, "cancelled", "2025-03-03"], [7, "Gita", "Pune", 900, "paid", "2025-03-09"], [8, "Harsh", "Mumbai", 600, "paid", "2025-03-21"],
]];
export const people = ["people", ["id", "name"], [[1, "Asha"], [2, "Bilal"], [3, "Chitra"], [4, "Dev"]]];
export const purchases = ["purchases", ["id", "person_id", "item", "amount"], [[101, 1, "Lamp", 750], [102, 1, "Pen", 120], [103, 2, "Bag", 1250], [104, 3, "Mouse", 649], [105, 9, "Cable", 199]]];
export const orders_m = ["orders", ["id", "customer", "shipping"], [[1, "Asha", 50], [2, "Bilal", 40]]];
export const items_m = ["items", ["id", "order_id", "product", "price"], [[1, 1, "Lamp", 750], [2, 1, "Pen", 120], [3, 1, "Cable", 199], [4, 2, "Bag", 1250]]];
export const staff = ["staff", ["id", "name", "manager_id"], [[1, "Ravi", null], [2, "Sana", 1], [3, "Tej", 1], [4, "Uma", 2]]];
export default [sales, people, purchases, orders_m, items_m, staff];
