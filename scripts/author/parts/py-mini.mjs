/** Tiny tables for the analytics lessons: small enough to check every result by eye. */
export const steps = ["steps", ["user_id", "step"], [
  [1, "visit"], [1, "signup"], [1, "cart"], [1, "purchase"],
  [2, "visit"], [2, "signup"], [2, "cart"],
  [3, "visit"], [3, "signup"],
  [4, "visit"],
  [5, "visit"], [5, "signup"], [5, "cart"], [5, "purchase"],
  [6, "visit"], [6, "signup"],
]];
export const activity = ["activity", ["user_id", "signup_m", "active_m"], [
  ["A", 1, 1], ["A", 1, 2], ["A", 1, 3], ["B", 1, 1], ["B", 1, 2], ["C", 1, 1], ["D", 2, 2], ["D", 2, 3], ["E", 2, 2],
]];
export const buys = ["buys", ["customer", "order_date", "amount"], [
  ["P", "2025-06-20", 500], ["P", "2025-06-25", 300], ["Q", "2025-05-02", 1200], ["R", "2025-03-10", 200], ["R", "2025-04-10", 250], ["R", "2025-05-15", 300], ["S", "2025-06-28", 900], ["T", "2025-01-15", 100],
]];
export const contacts = ["contacts", ["id", "email", "updated_at"], [
  [1, "a@x.com", "2025-01-01"], [2, "a@x.com", "2025-03-01"], [3, "b@x.com", "2025-02-01"], [4, "c@x.com", "2025-01-15"], [5, "c@x.com", "2025-01-20"], [6, "c@x.com", "2025-01-10"],
]];
export const daily = ["daily", ["day", "visits"], [["2025-03-01", 100], ["2025-03-02", 120], ["2025-03-03", 90], ["2025-03-04", 140], ["2025-03-05", 130], ["2025-03-06", 160], ["2025-03-07", 150]]];
export default [steps, activity, buys, contacts, daily];
