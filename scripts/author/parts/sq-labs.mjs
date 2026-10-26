import { ck, classifyLab, Q, sqlLab, W, wordLab } from "../kit.mjs";
import { retail } from "./sql-data.mjs";

export const SK_SQL = "sql-querying";
export const SK_ANALYSIS = "data-analysis";

/**
 * Every SQL lab runs on the Kiran Stores tables (customers, products, orders, order_items) in the student's own browser. Each lab judges ONE query:
 * it must run, use the right idea, and return the same rows as the model query (and, where the task asks for an order, in that order).
 * The model queries are replayed by the course tests, so a lab can always be finished.
 */
const T = retail;
const STARTER = "-- Write your query here, then press Run query\n";

/** The standard set of checks for a one-query lab. uses is [[regex, what the student should use], ...]. */
function qc({ solution, uses = [], ordered = false, explain, hint }) {
  const out = [ck("runs", "Your query runs without an error", "Press Run query and read any message under the editor: it names the problem.", "A query that does not run cannot be checked. The message tells you which word or column it could not understand.", Q.runs())];
  uses.forEach(([re, what], i) => out.push(ck(`uses-${i + 1}`, `It uses ${what}`, `The task needs ${what}. Think about which clause does that job.`, `${what[0].toUpperCase()}${what.slice(1)} is the clause built for this part of the task.`, Q.uses(re, what))));
  out.push(ck("rows", "It returns the right rows and columns", hint ?? "Compare the number of rows and columns you get with what the task describes, then check your conditions.", explain, Q.result(solution)));
  if (ordered) out.push(ck("order", "The rows are in the order the task asks for", "Check the ORDER BY: which column, and ascending or descending?", "The task names the sort order; ORDER BY with DESC puts the largest first, and a second column breaks ties.", Q.result(solution, { ordered: true })));
  return out;
}
const lab = (o) => sqlLab({ tables: T.map((t) => t), starter: STARTER, level: "beginner", minutes: 10, xp: 40, skills: [SK_SQL], ...o });

export const labs = [
  /* ------------------------------------------------------------------ module 1 */
  classifyLab({
    id: "sq1-terms", module: "meet-the-database", title: "Table, row, column or key?", level: "beginner", minutes: 6, xp: 25, skills: [SK_SQL], required: true,
    objective: "Name the part of a database each description refers to.",
    scenario: "Before writing queries, make sure the words are clear. Each item describes one part of a relational database.",
    steps: ["Read each description.", "Choose Table, Row, Column, Primary key or Foreign key.", "Press Check my work."],
    categories: [["table", "Table"], ["row", "Row"], ["column", "Column"], ["pk", "Primary key"], ["fk", "Foreign key"]],
    items: [
      ["All the orders, stored together with the same fields", "table", "A table holds one kind of thing, here orders."],
      ["One single order with its date, channel and status", "row", "A row is one record."],
      ["The order_date of every order", "column", "A column is one fact about every row."],
      ["order_id, which is different for every order", "pk", "A primary key identifies one row for certain."],
      ["customer_id inside the orders table, pointing at a customer", "fk", "A foreign key holds another table's primary key."],
      ["The list of customers: names, cities and segments", "table", "It is a collection of rows with the same columns."],
      ["The city of customer 7", "column", "It is one cell of the city column, a fact about one row; the column is what holds this fact for all customers."],
      ["product_id inside order_items, linking to products", "fk", "It points at a row in another table."],
    ],
  }),
  lab({
    id: "sq2-pune", module: "meet-the-database", title: "Interview the store: customers in Pune", required: true,
    objective: "Choose columns, filter rows and sort the result.",
    scenario: "The Pune delivery team wants a list. Show the `name` and `city` of every customer whose city is Pune, sorted by name from A to Z.",
    steps: ["Look at the customers table in the panel on the left.", "SELECT the two columns FROM customers.", "Add WHERE for the city and ORDER BY name.", "Run it, then press Check my work."],
    solution: "SELECT name, city FROM customers WHERE city = 'Pune' ORDER BY name",
    checks: qc({ solution: "SELECT name, city FROM customers WHERE city = 'Pune' ORDER BY name", uses: [["\\bwhere\\b", "WHERE to filter the rows"]], ordered: true, explain: "Filter with WHERE city = 'Pune' (text in single quotes), choose the two columns, and sort with ORDER BY name." }),
  }),
  lab({
    id: "sq3-priciest", module: "meet-the-database", title: "The five priciest products", required: false, minutes: 8,
    objective: "Sort descending and keep only the first rows.",
    scenario: "The marketing team wants to feature our most expensive products. Show the `name` and `price` of the five most expensive products, highest price first.",
    steps: ["Query the products table.", "Sort by price with the largest first (DESC).", "Keep five rows with LIMIT."],
    solution: "SELECT name, price FROM products ORDER BY price DESC LIMIT 5",
    checks: qc({ solution: "SELECT name, price FROM products ORDER BY price DESC LIMIT 5", uses: [["order\\s+by", "ORDER BY"], ["\\blimit\\b", "LIMIT"]], ordered: true, explain: "ORDER BY price DESC puts the largest first, and LIMIT 5 keeps the first five rows of that sorted list." }),
  }),
  lab({
    id: "sq4-nocity", module: "meet-the-database", title: "Not Pune, and also not recorded", required: true, level: "intermediate", minutes: 10,
    objective: "Handle NULL correctly: a condition on a missing value is neither true nor false.",
    scenario: "The sales team asks for every customer who is **not** in Pune, **including customers whose city was never recorded**. Show only the `name`, sorted by name.",
    steps: ["`city <> 'Pune'` alone will silently leave out customers with no city.", "Add a second condition that catches the missing cities.", "Join the two conditions so that either one is enough."],
    solution: "SELECT name FROM customers WHERE city <> 'Pune' OR city IS NULL ORDER BY name",
    checks: qc({ solution: "SELECT name FROM customers WHERE city <> 'Pune' OR city IS NULL ORDER BY name", uses: [["is\\s+null", "IS NULL"]], ordered: true, explain: "A comparison with NULL is unknown, so <> 'Pune' drops customers with no city. Adding OR city IS NULL brings them back.", hint: "Two customers have no city. Do they appear in your result?" }),
  }),

  /* ------------------------------------------------------------------ module 2 */
  lab({
    id: "sq5-tidy-products", module: "shape-the-data", title: "Price list with GST and a band", required: true, level: "intermediate", minutes: 12,
    objective: "Calculate new columns and label them with CASE.",
    scenario: "Finance wants a price list. For every product show `name`, `price`, `price_with_gst` (the price plus 18%, rounded to a whole rupee) and `band`: 'premium' for 1000 or more, 'standard' for 300 to 999, otherwise 'budget'. Sort by price, lowest first.",
    steps: ["Add the 18% in a calculated column and wrap it in ROUND(..., 0).", "Write the band with CASE, highest threshold first.", "Name the new columns exactly as the task says, then sort."],
    solution: "SELECT name, price, ROUND(price * 1.18, 0) AS price_with_gst, CASE WHEN price >= 1000 THEN 'premium' WHEN price >= 300 THEN 'standard' ELSE 'budget' END AS band FROM products ORDER BY price",
    checks: qc({ solution: "SELECT name, price, ROUND(price * 1.18, 0) AS price_with_gst, CASE WHEN price >= 1000 THEN 'premium' WHEN price >= 300 THEN 'standard' ELSE 'budget' END AS band FROM products ORDER BY price", uses: [["\\bcase\\b", "CASE"], ["round\\s*\\(", "ROUND"]], ordered: true, explain: "price * 1.18 adds 18%. CASE tests the highest band first, so 1250 is 'premium' and not caught by the lower test. ELSE covers everything else." }),
  }),
  lab({
    id: "sq6-march", module: "shape-the-data", title: "Completed orders in March", required: true, level: "intermediate", minutes: 10,
    objective: "Select a period with a half-open date range.",
    scenario: "Show the `id` and `order_date` of every **completed** order placed in March 2025, newest first (and by `id` when two share a date). Use a start-and-next-start date range.",
    steps: ["Filter status with =.", "Filter the dates with >= the first of March and < the first of April.", "Sort by order_date descending, then id."],
    solution: "SELECT id, order_date FROM orders WHERE status = 'completed' AND order_date >= '2025-03-01' AND order_date < '2025-04-01' ORDER BY order_date DESC, id",
    checks: qc({ solution: "SELECT id, order_date FROM orders WHERE status = 'completed' AND order_date >= '2025-03-01' AND order_date < '2025-04-01' ORDER BY order_date DESC, id", uses: [["order_date", "the order_date column in your conditions"]], ordered: true, explain: "A half-open range (>= 1 March and < 1 April) captures exactly March, whatever the time of day. ORDER BY order_date DESC, id sorts newest first with id breaking ties." }),
  }),
  lab({
    id: "sq7-unknown-city", module: "shape-the-data", title: "Every customer gets a city", required: false, minutes: 8,
    objective: "Replace missing values with COALESCE.",
    scenario: "For a mailing list, show each customer's `name` and `city`, but where the city is missing show 'Unknown'. Sort by `id`.",
    steps: ["Use COALESCE(city, 'Unknown').", "Give the column its original name with AS city.", "Sort by id."],
    solution: "SELECT name, COALESCE(city, 'Unknown') AS city FROM customers ORDER BY id",
    checks: qc({ solution: "SELECT name, COALESCE(city, 'Unknown') AS city FROM customers ORDER BY id", uses: [["coalesce", "COALESCE"]], ordered: true, explain: "COALESCE returns its first argument that is not NULL, so a missing city becomes 'Unknown' in the result without changing the table." }),
  }),
  classifyLab({
    id: "sq8-which-tool", module: "shape-the-data", title: "Which tool fixes it?", level: "beginner", minutes: 6, xp: 25, skills: [SK_SQL], required: true,
    objective: "Match a data problem to the SQL tool that solves it.",
    scenario: "Analysts spend much of their time shaping data. For each problem, choose the best SQL tool.",
    steps: ["Read the problem.", "Pick the tool: COALESCE, NULLIF, CASE, a date function or ROUND.", "Press Check my work."],
    categories: [["coalesce", "COALESCE"], ["nullif", "NULLIF"], ["case", "CASE"], ["date", "A date function"], ["round", "ROUND"]],
    items: [
      ["Show 'Unknown' wherever a city is missing", "coalesce", "COALESCE replaces NULL with a chosen value."],
      ["The text 'N/A' was typed instead of a real missing value", "nullif", "NULLIF(col, 'N/A') turns 'N/A' into NULL."],
      ["Label each amount as small, medium or large", "case", "CASE turns values into labels using conditions."],
      ["Get the month number from 2025-03-09", "date", "MONTH() (or SUBSTR on an ISO date) extracts a part."],
      ["Show a price as 578.33 instead of 578.3333333", "round", "ROUND limits the number of decimals."],
      ["Avoid an error when a divisor can be 0", "nullif", "x / NULLIF(y, 0) returns NULL instead of failing."],
      ["Flag each order as 1 if paid and 0 otherwise", "case", "CASE returns 1 or 0 depending on the condition."],
      ["Count the days between two order dates", "date", "DATEDIFF(a, b) gives the number of days."],
    ],
  }),

  /* ------------------------------------------------------------------ module 3 */
  lab({
    id: "sq9-summary-row", module: "aggregate-and-group", title: "The one-row summary", required: true, level: "intermediate", minutes: 10,
    objective: "Count rows, count rows that meet a condition, and count distinct values.",
    scenario: "The manager's dashboard needs one row with three numbers from the orders table: `orders` (how many), `completed` (how many have status 'completed') and `customers` (how many different customers placed an order).",
    steps: ["COUNT(*) counts all rows.", "A CASE inside SUM counts only completed ones.", "COUNT(DISTINCT customer_id) counts each customer once."],
    solution: "SELECT COUNT(*) AS orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed, COUNT(DISTINCT customer_id) AS customers FROM orders",
    checks: qc({ solution: "SELECT COUNT(*) AS orders, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed, COUNT(DISTINCT customer_id) AS customers FROM orders", uses: [["count\\s*\\(\\s*distinct", "COUNT(DISTINCT ...)"]], explain: "COUNT(DISTINCT customer_id) counts each customer once, while COUNT(*) counts orders. SUM(CASE WHEN ... THEN 1 ELSE 0 END) counts rows that meet a condition." }),
  }),
  lab({
    id: "sq10-by-channel", module: "aggregate-and-group", title: "Orders by channel", required: true, level: "intermediate", minutes: 10,
    objective: "Group rows and count them.",
    scenario: "Show how many orders came through each `channel`: columns `channel` and `orders`, with the busiest channel first.",
    steps: ["One row per channel means GROUP BY channel.", "Count the rows in each group.", "Sort by the count, largest first."],
    solution: "SELECT channel, COUNT(*) AS orders FROM orders GROUP BY channel ORDER BY orders DESC",
    checks: qc({ solution: "SELECT channel, COUNT(*) AS orders FROM orders GROUP BY channel ORDER BY orders DESC", uses: [["group\\s+by", "GROUP BY"]], ordered: true, explain: "GROUP BY channel makes one row per channel, COUNT(*) counts the orders in each, and ORDER BY orders DESC puts the busiest first." }),
  }),
  lab({
    id: "sq11-repeat", module: "aggregate-and-group", title: "Customers with three or more orders", required: true, level: "intermediate", minutes: 12,
    objective: "Filter groups with HAVING.",
    scenario: "Find customers who placed **at least 3 orders**. Show `customer_id` and `orders` (the count), highest count first, then lowest customer_id first.",
    steps: ["Group the orders by customer_id.", "Count each group.", "Keep groups of 3 or more with HAVING, since WHERE cannot see the counts."],
    solution: "SELECT customer_id, COUNT(*) AS orders FROM orders GROUP BY customer_id HAVING COUNT(*) >= 3 ORDER BY orders DESC, customer_id",
    checks: qc({ solution: "SELECT customer_id, COUNT(*) AS orders FROM orders GROUP BY customer_id HAVING COUNT(*) >= 3 ORDER BY orders DESC, customer_id", uses: [["\\bhaving\\b", "HAVING"]], ordered: true, explain: "The count only exists after grouping, so the condition COUNT(*) >= 3 belongs in HAVING, not WHERE." }),
  }),
  lab({
    id: "sq12-completed-share", module: "aggregate-and-group", title: "Share of completed orders by channel", required: false, level: "challenge", minutes: 15, xp: 60,
    objective: "Build a rate with conditional aggregation.",
    scenario: "For each channel show `channel`, `orders` (all orders), and `completed_pct`: the percentage of that channel's orders that are completed, rounded to one decimal place. Sort by channel.",
    steps: ["Count the completed rows with SUM(CASE ...).", "Divide by COUNT(*) after multiplying by 100.0 so the result is not truncated.", "ROUND the percentage to 1 decimal."],
    solution: "SELECT channel, COUNT(*) AS orders, ROUND(100.0 * SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) / COUNT(*), 1) AS completed_pct FROM orders GROUP BY channel ORDER BY channel",
    checks: qc({ solution: "SELECT channel, COUNT(*) AS orders, ROUND(100.0 * SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) / COUNT(*), 1) AS completed_pct FROM orders GROUP BY channel ORDER BY channel", uses: [["\\bcase\\b", "CASE"], ["round", "ROUND"]], ordered: true, explain: "A rate is part over whole: completed rows divided by all rows in the group, times 100.0 (a decimal) so the division is not truncated." }),
  }),

  /* ------------------------------------------------------------------ module 4 */
  lab({
    id: "sq13-orders-names", module: "combine-with-joins", title: "Web orders with customer names", required: true, level: "intermediate", minutes: 10,
    objective: "Join two tables on a key.",
    scenario: "Show `order_id` (the order's id), the customer's `name` and the `order_date` for every order placed on the **web** channel, sorted by order_id.",
    steps: ["Start from orders and JOIN customers ON orders.customer_id = customers.id.", "Use short aliases and rename the order's id AS order_id.", "Filter the channel and sort."],
    solution: "SELECT o.id AS order_id, c.name, o.order_date FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.channel = 'web' ORDER BY o.id",
    checks: qc({ solution: "SELECT o.id AS order_id, c.name, o.order_date FROM orders o JOIN customers c ON c.id = o.customer_id WHERE o.channel = 'web' ORDER BY o.id", uses: [["\\bjoin\\b", "JOIN"], ["\\bon\\b", "an ON condition"]], ordered: true, explain: "orders.customer_id is a foreign key to customers.id, so ON c.id = o.customer_id lines each order up with its customer." }),
  }),
  lab({
    id: "sq14-never-ordered", module: "combine-with-joins", title: "Customers who never ordered", required: true, level: "intermediate", minutes: 12,
    objective: "Find rows with no match using LEFT JOIN and IS NULL (an anti-join).",
    scenario: "The retention team wants to email customers who have **never placed an order**. Show their `name` and `joined` date, sorted by name.",
    steps: ["Start from customers and LEFT JOIN orders onto them.", "Customers with no order have NULL in the orders columns.", "Keep those with WHERE o.id IS NULL."],
    solution: "SELECT c.name, c.joined FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL ORDER BY c.name",
    checks: qc({ solution: "SELECT c.name, c.joined FROM customers c LEFT JOIN orders o ON o.customer_id = c.id WHERE o.id IS NULL ORDER BY c.name", uses: [["(left\\s+join[\\s\\S]*is\\s+null)|not\\s+exists|not\\s+in", "a LEFT JOIN with IS NULL, or NOT EXISTS"]], ordered: true, explain: "A LEFT JOIN keeps every customer; those without orders have NULLs from the orders side, and WHERE o.id IS NULL keeps exactly those." }),
  }),
  lab({
    id: "sq15-category-revenue", module: "combine-with-joins", title: "Revenue by product category", required: true, level: "challenge", minutes: 18, xp: 60,
    objective: "Join four tables and sum a calculated value.",
    scenario: "Revenue for a line is `qty * price`. Using only **completed** orders, show each product `category` and its `revenue`, largest first.",
    steps: ["order_items links an order to a product: join orders, order_items and products.", "Keep only completed orders.", "Group by category and SUM(qty * price).", "Sort by revenue descending."],
    solution: "SELECT p.category, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY p.category ORDER BY revenue DESC",
    checks: qc({ solution: "SELECT p.category, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY p.category ORDER BY revenue DESC", uses: [["order_items", "the order_items table"], ["group\\s+by", "GROUP BY"]], ordered: true, explain: "Join orders → order_items → products, filter to completed orders, then GROUP BY category and add up qty * price for each line." }),
  }),
  classifyLab({
    id: "sq16-which-join", module: "combine-with-joins", title: "Which join answers it?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_SQL], required: true,
    objective: "Choose the right kind of join for a business question.",
    scenario: "The skill in joins is choosing the right one. Decide how each question should be answered.",
    steps: ["Read the question.", "Choose Inner join, Left join, Anti-join or Watch for fan-out.", "Press Check my work."],
    categories: [["inner", "Inner join"], ["left", "Left join (keep all)"], ["anti", "Anti-join (no match)"], ["fan", "Fan-out risk"]],
    items: [
      ["Show orders together with their customer's name", "inner", "Every order has a customer, so an inner join gives matching pairs."],
      ["List every customer, with their order count (0 if none)", "left", "A LEFT JOIN keeps customers with no orders."],
      ["Find customers who never placed an order", "anti", "LEFT JOIN with IS NULL, or NOT EXISTS."],
      ["Add up order shipping fees after joining orders to order items", "fan", "Each order is repeated once per item, so the fees are counted several times."],
      ["Find products that were never sold", "anti", "Products with no matching order_items row."],
      ["Count orders per customer after joining orders to items", "fan", "COUNT(*) now counts items; use COUNT(DISTINCT order id)."],
      ["Show each product with its sales if any, otherwise blank", "left", "Keep every product even when nothing matches."],
      ["Show only the products that appear on at least one order", "inner", "An inner join drops products with no sales."],
    ],
  }),
  lab({
    id: "sq17-fanout", module: "combine-with-joins", title: "Count orders, not lines", required: false, level: "challenge", minutes: 15, xp: 60,
    objective: "Avoid a fan-out when counting after a join to a many-side table.",
    scenario: "For each customer who has at least one order line, show `customer_id`, `orders` (the number of different orders) and `lines` (the number of order lines). Sort by customer_id. If you use COUNT(*) for `orders` you will get the wrong answer.",
    steps: ["Join orders to order_items.", "Group by customer_id.", "Count the lines with COUNT(*) but orders with COUNT(DISTINCT o.id)."],
    solution: "SELECT o.customer_id, COUNT(DISTINCT o.id) AS orders, COUNT(*) AS lines FROM orders o JOIN order_items i ON i.order_id = o.id GROUP BY o.customer_id ORDER BY o.customer_id",
    checks: qc({ solution: "SELECT o.customer_id, COUNT(DISTINCT o.id) AS orders, COUNT(*) AS lines FROM orders o JOIN order_items i ON i.order_id = o.id GROUP BY o.customer_id ORDER BY o.customer_id", uses: [["count\\s*\\(\\s*distinct", "COUNT(DISTINCT ...)"]], ordered: true, explain: "After the join there is one row per order line, so COUNT(*) counts lines. COUNT(DISTINCT o.id) counts each order once." }),
  }),

  /* ------------------------------------------------------------------ module 5 */
  lab({
    id: "sq18-above-avg", module: "subqueries-and-ctes", title: "Products priced above average", required: true, level: "intermediate", minutes: 10,
    objective: "Compare each row with an overall figure using a scalar subquery.",
    scenario: "Show the `name` and `price` of products whose price is higher than the **average product price**. Highest price first.",
    steps: ["Write SELECT AVG(price) FROM products on its own and run it.", "Put that query in brackets inside WHERE price > (...).", "Sort by price descending."],
    solution: "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC",
    checks: qc({ solution: "SELECT name, price FROM products WHERE price > (SELECT AVG(price) FROM products) ORDER BY price DESC", uses: [["\\(\\s*select", "a subquery in brackets"]], ordered: true, explain: "The bracketed query computes the average once and the outer query keeps rows above it. This stays correct when prices change." }),
  }),
  lab({
    id: "sq19-top-customers", module: "subqueries-and-ctes", title: "Top five customers, in named steps", required: true, level: "challenge", minutes: 18, xp: 60,
    objective: "Structure a two-step analysis with a CTE.",
    scenario: "Step 1: compute each customer's `spend` on **completed** orders (sum of qty * price). Step 2: show the top five by spend, with their `name` and `spend`, largest first (ties by name). Use WITH to name step 1.",
    steps: ["Write the revenue per customer_id as a CTE named customer_spend.", "Join the CTE to customers to get the name.", "ORDER BY spend DESC, name and LIMIT 5."],
    solution: "WITH customer_spend AS (SELECT o.customer_id, SUM(i.qty * p.price) AS spend FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY o.customer_id) SELECT c.name, s.spend FROM customer_spend s JOIN customers c ON c.id = s.customer_id ORDER BY s.spend DESC, c.name LIMIT 5",
    checks: qc({ solution: "WITH customer_spend AS (SELECT o.customer_id, SUM(i.qty * p.price) AS spend FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY o.customer_id) SELECT c.name, s.spend FROM customer_spend s JOIN customers c ON c.id = s.customer_id ORDER BY s.spend DESC, c.name LIMIT 5", uses: [["\\bwith\\b", "WITH to name a step"]], ordered: true, explain: "The CTE returns one row per customer, so the join to customers cannot multiply rows. Sorting by spend and keeping five gives the top five." }),
  }),
  lab({
    id: "sq20-lamp-not-earphones", module: "subqueries-and-ctes", title: "Bought a desk lamp but not earphones", required: false, level: "challenge", minutes: 15, xp: 60,
    objective: "Combine two result sets with EXCEPT (or NOT EXISTS).",
    scenario: "Show the `customer_id` of customers who have bought **Desk lamp** (product 3) at least once but **never Earphones** (product 6), on any order. Sort by customer_id.",
    steps: ["Query 1: customer_ids from orders joined to order_items where product_id = 3.", "Query 2: the same for product_id = 6.", "Subtract query 2 from query 1 with EXCEPT."],
    solution: "SELECT o.customer_id FROM orders o JOIN order_items i ON i.order_id = o.id WHERE i.product_id = 3 EXCEPT SELECT o.customer_id FROM orders o JOIN order_items i ON i.order_id = o.id WHERE i.product_id = 6 ORDER BY 1",
    checks: qc({ solution: "SELECT o.customer_id FROM orders o JOIN order_items i ON i.order_id = o.id WHERE i.product_id = 3 EXCEPT SELECT o.customer_id FROM orders o JOIN order_items i ON i.order_id = o.id WHERE i.product_id = 6 ORDER BY 1", uses: [["except|not\\s+exists|not\\s+in", "EXCEPT (or NOT EXISTS)"]], ordered: true, explain: "EXCEPT returns rows in the first result that are not in the second, and removes duplicates, so each customer appears once." }),
  }),

  /* ------------------------------------------------------------------ module 6 */
  lab({
    id: "sq21-top-product", module: "window-functions-and-analysis", title: "Best-selling product in each category", required: true, level: "challenge", minutes: 20, xp: 70,
    objective: "Rank within groups and keep the top row of each.",
    scenario: "Using **completed** orders, find for every product category the product with the highest revenue (qty * price). Show `category`, `product` (the name) and `revenue`, sorted by category. Rank inside a CTE, then filter the rank.",
    steps: ["Step 1 (CTE): revenue per product, with its category.", "Step 2: ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC, product).", "Keep rn = 1 and sort by category."],
    solution: "WITH rev AS (SELECT p.category, p.name AS product, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY p.category, p.name), ranked AS (SELECT category, product, revenue, ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC, product) AS rn FROM rev) SELECT category, product, revenue FROM ranked WHERE rn = 1 ORDER BY category",
    checks: qc({ solution: "WITH rev AS (SELECT p.category, p.name AS product, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY p.category, p.name), ranked AS (SELECT category, product, revenue, ROW_NUMBER() OVER (PARTITION BY category ORDER BY revenue DESC, product) AS rn FROM rev) SELECT category, product, revenue FROM ranked WHERE rn = 1 ORDER BY category", uses: [["partition\\s+by", "PARTITION BY"], ["over\\s*\\(", "a window function with OVER"]], ordered: true, explain: "A window function cannot be filtered in WHERE, so rank in a CTE (PARTITION BY category, highest revenue first) and keep rn = 1 in the outer query." }),
  }),
  lab({
    id: "sq22-running", module: "window-functions-and-analysis", title: "Running revenue by month", required: true, level: "challenge", minutes: 18, xp: 70,
    objective: "Build a running total over months.",
    scenario: "Using **completed** orders, show for each month (as text like '2025-03') the `revenue` and the `running_revenue` so far this year, in month order.",
    steps: ["Get the month with SUBSTR(order_date, 1, 7).", "Sum qty * price per month in a CTE.", "In the outer query use SUM(revenue) OVER (ORDER BY month)."],
    solution: "WITH monthly AS (SELECT SUBSTR(o.order_date, 1, 7) AS month, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY SUBSTR(o.order_date, 1, 7)) SELECT month, revenue, SUM(revenue) OVER (ORDER BY month) AS running_revenue FROM monthly ORDER BY month",
    checks: qc({ solution: "WITH monthly AS (SELECT SUBSTR(o.order_date, 1, 7) AS month, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY SUBSTR(o.order_date, 1, 7)) SELECT month, revenue, SUM(revenue) OVER (ORDER BY month) AS running_revenue FROM monthly ORDER BY month", uses: [["over\\s*\\(", "a window function with OVER"]], ordered: true, explain: "SUM(x) OVER (ORDER BY month) accumulates: each row adds its month to everything before it. The last row equals the grand total." }),
  }),
  lab({
    id: "sq23-growth", module: "window-functions-and-analysis", title: "Month-on-month growth", required: false, level: "challenge", minutes: 20, xp: 80,
    objective: "Use LAG to compare each month with the one before.",
    scenario: "For completed orders show `month`, `revenue` and `growth_pct`: the change from the previous month as a percentage of the previous month, rounded to one decimal. The first month has no previous month, so its growth is empty (NULL).",
    steps: ["Build monthly revenue in a CTE.", "Fetch last month with LAG(revenue) OVER (ORDER BY month).", "growth_pct = ROUND(100.0 * (revenue - prev) / prev, 1)."],
    solution: "WITH monthly AS (SELECT SUBSTR(o.order_date, 1, 7) AS month, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY SUBSTR(o.order_date, 1, 7)), x AS (SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prev FROM monthly) SELECT month, revenue, ROUND(100.0 * (revenue - prev) / prev, 1) AS growth_pct FROM x ORDER BY month",
    checks: qc({ solution: "WITH monthly AS (SELECT SUBSTR(o.order_date, 1, 7) AS month, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY SUBSTR(o.order_date, 1, 7)), x AS (SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prev FROM monthly) SELECT month, revenue, ROUND(100.0 * (revenue - prev) / prev, 1) AS growth_pct FROM x ORDER BY month", uses: [["\\blag\\b", "LAG"]], ordered: true, explain: "LAG(revenue) gives the previous month's revenue on the current row. Growth is (this - last) / last, times 100.0 to avoid whole-number division." }),
  }),

  /* ------------------------------------------------------------------ capstone */
  lab({
    id: "cap-sq-channels", module: "capstone", title: "Channel scorecard", required: true, level: "challenge", minutes: 25, xp: 100,
    objective: "Combine joins, aggregation, a CTE and a window function into one analysis.",
    scenario: "Kiran Stores wants a channel scorecard for completed orders: for each `channel` show `orders` (different orders), `revenue` (qty * price), `share_pct` (the channel's share of total revenue, one decimal) and `rank_by_revenue` (1 = highest revenue). Sort by rank_by_revenue.",
    steps: ["Step 1 (CTE): per channel, COUNT(DISTINCT o.id) and SUM(qty * price) across the joined tables, completed orders only.", "Step 2: add share_pct with revenue / SUM(revenue) OVER ().", "Add RANK() OVER (ORDER BY revenue DESC) and sort."],
    solution: "WITH ch AS (SELECT o.channel, COUNT(DISTINCT o.id) AS orders, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY o.channel) SELECT channel, orders, revenue, ROUND(100.0 * revenue / SUM(revenue) OVER (), 1) AS share_pct, RANK() OVER (ORDER BY revenue DESC) AS rank_by_revenue FROM ch ORDER BY rank_by_revenue",
    checks: qc({ solution: "WITH ch AS (SELECT o.channel, COUNT(DISTINCT o.id) AS orders, SUM(i.qty * p.price) AS revenue FROM orders o JOIN order_items i ON i.order_id = o.id JOIN products p ON p.id = i.product_id WHERE o.status = 'completed' GROUP BY o.channel) SELECT channel, orders, revenue, ROUND(100.0 * revenue / SUM(revenue) OVER (), 1) AS share_pct, RANK() OVER (ORDER BY revenue DESC) AS rank_by_revenue FROM ch ORDER BY rank_by_revenue", uses: [["\\bwith\\b", "a CTE (WITH)"], ["over\\s*\\(", "a window function"], ["count\\s*\\(\\s*distinct", "COUNT(DISTINCT ...) so orders are not counted once per line"]], ordered: true, explain: "Join the three tables, count distinct order ids to avoid the fan-out, sum qty * price, then use SUM(...) OVER () for the total and RANK() for the order." }),
  }),
  wordLab({
    id: "cap-sq-memo", module: "capstone", title: "A one-page findings memo", level: "challenge", minutes: 20, xp: 80, skills: [SK_ANALYSIS], required: true,
    objective: "Explain what the numbers mean, in writing a manager can act on.",
    scenario: "The channel scorecard is done. Now write the memo your manager will read. Lead with the answer, give the evidence, state one limit of the data, and recommend an action.",
    steps: ["Add a heading as the memo title.", "Write a short summary paragraph that starts with the answer.", "Add a second heading, 'Evidence', and a bulleted list of at least three numbers with their definition.", "Add a final paragraph that begins with the word Recommendation."],
    html: "<p><br></p>",
    checks: [
      ck("title", "The memo has a heading", "Use the heading style for the title of the memo.", "A heading tells the reader what the memo is about before they read a word of it.", W.heading(1)),
      ck("headings", "There are at least two headings (title and Evidence)", "Add a second heading, Evidence, above the list.", "Headings let a busy reader jump to the evidence.", W.heading(2)),
      ck("para", "There are at least two paragraphs", "Write a summary paragraph and a recommendation paragraph.", "A memo needs prose that connects the numbers to a decision.", W.paragraphs(2, 12)),
      ck("list", "The evidence is a list of at least three points", "Use the bullet list button and write three numbers with their definitions.", "Short lists make evidence easy to scan.", W.list(3, "ul")),
      ck("rec", "It contains a recommendation", "Start the last paragraph with the word Recommendation.", "A finding without an action is only half of the work.", W.contains("Recommendation")),
      ck("limit", "It names a limit of the data", "Include the word limit or limitation and say what the data does not show.", "Honest analysis says what the numbers cannot tell you.", W.pattern("limit", "a sentence about a limit of the data")),
    ],
    solution: "<h1>Channel performance, January to June 2025</h1><p>The web channel earned the most revenue from completed orders, and store sales were smallest, so extra promotion budget should go to web and app first.</p><h2>Evidence</h2><ul><li>Revenue means qty times list price on completed orders only.</li><li>Web had the most orders, followed by app, then store.</li><li>The share of total revenue for each channel is shown in the scorecard.</li></ul><p>One limit: the data covers six months and returned and cancelled orders are excluded, so seasonal effects are not visible.</p><p>Recommendation: test a web-only offer in July and compare its completed-order revenue with the same month for the app.</p>",
  }),
];
