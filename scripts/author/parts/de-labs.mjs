import { ck, classifyLab, Q, sqlLab, W, wordLab } from "../kit.mjs";
import { shopcore } from "./de-data.mjs";

export const SK_FOUND = "foundations";
export const SK_MODEL = "data-modelling";
export const SK_SQL = "sql-transformations";
export const SK_OPS = "pipelines-and-operations";
export const SK_GOV = "governance-and-design";

/**
 * The SQL labs run on ShopCore (customers, customer_changes, orders, order_events and payments): raw tables with duplicate deliveries, out-of-order events,
 * customers who move city, and a messy payments feed. Each lab judges one query: it must run, use the right idea, and return the same rows as the model query.
 * The model queries are replayed by the course tests, so a lab can always be finished.
 */
const STARTER = "-- Write your query here, then press Run query\n";
function qc({ solution, uses = [], ordered = false, explain, hint }) {
  const out = [ck("runs", "Your query runs without an error", "Press Run query and read any message under the editor: it names the problem.", "A query that does not run cannot be checked. The message tells you which word or column it could not understand.", Q.runs())];
  uses.forEach(([re, what], i) => out.push(ck(`uses-${i + 1}`, `It uses ${what}`, `The task needs ${what}. Think about which clause does that job.`, `${what[0].toUpperCase()}${what.slice(1)} is the tool built for this part of the task.`, Q.uses(re, what))));
  out.push(ck("rows", "It returns the right rows and columns", hint ?? "Compare the number of rows and columns you get with what the task describes, then check your conditions.", explain, Q.result(solution)));
  if (ordered) out.push(ck("order", "The rows are in the order the task asks for", "Check the ORDER BY: which column, and ascending or descending?", "The task names the sort order; a second sort column breaks ties.", Q.result(solution, { ordered: true })));
  return out;
}
const lab = (o) => sqlLab({ tables: shopcore, starter: STARTER, level: "intermediate", minutes: 15, xp: 60, skills: [SK_SQL], required: true, ...o });

const DEDUPED = "SELECT DISTINCT event_id, order_id, status, amount, event_ts FROM order_events";
const LATEST = `SELECT order_id, status, amount, ROW_NUMBER() OVER (PARTITION BY order_id ORDER BY event_ts DESC, event_id DESC) AS rn FROM (${DEDUPED}) d`;
const SCD2 = "SELECT customer_id, city, changed_at AS valid_from, COALESCE(LEAD(changed_at) OVER (PARTITION BY customer_id ORDER BY changed_at), '9999-12-31') AS valid_to FROM customer_changes";

export const labs = [
  /* ------------------------------------------------------------------ module 1 */
  classifyLab({
    id: "de1-roles", module: "data-engineering-foundations", title: "Who does what?", level: "beginner", minutes: 6, xp: 25, skills: [SK_FOUND], required: true,
    objective: "Tell the data roles apart.",
    scenario: "Data teams have several roles with different questions and outputs. Match each task to the role that usually does it.",
    steps: ["Read each task.", "Choose Data engineer, Data analyst or Data scientist.", "Press Check my work."],
    categories: [["eng", "Data engineer"], ["analyst", "Data analyst"], ["sci", "Data scientist"]],
    items: [
      ["Build a nightly pipeline that loads and cleans the orders data", "eng", "Pipelines and datasets are the engineer's product."],
      ["Create a dashboard of monthly revenue for managers", "analyst", "Reports and dashboards are the analyst's product."],
      ["Train a model to predict which customers will churn", "sci", "Prediction and modelling are the scientist's work."],
      ["Add a check that alerts when the daily load is late", "eng", "Reliability and monitoring belong to engineering."],
      ["Investigate why returns rose in March", "analyst", "Diagnosing what happened is analysis."],
      ["Design the star schema for the sales warehouse", "eng", "Modelling the warehouse is an engineering task."],
    ],
  }),
  classifyLab({
    id: "de2-oltp-olap", module: "data-engineering-foundations", title: "OLTP or OLAP?", level: "beginner", minutes: 6, xp: 25, skills: [SK_FOUND], required: false,
    objective: "Tell systems that run the business from systems that analyse it.",
    scenario: "OLTP systems process transactions; OLAP systems analyse history. Decide which each description fits.",
    steps: ["Read each description.", "Choose OLTP or OLAP.", "Press Check my work."],
    categories: [["oltp", "OLTP (transactions)"], ["olap", "OLAP (analytics)"]],
    items: [
      ["Insert one new order the moment a customer pays", "oltp", "Many small writes of single rows."],
      ["Sum revenue by month across three years of orders", "olap", "A large scan and aggregation over history."],
      ["Update a customer's phone number", "oltp", "A small, fast update."],
      ["A warehouse table organised as a star schema", "olap", "Dimensional models serve analytics."],
      ["The shop's production order database", "oltp", "It runs the application."],
      ["Find the ten products with the highest return rate this year", "olap", "An analytical question over a lot of data."],
    ],
  }),
  classifyLab({
    id: "de3-formats", module: "data-engineering-foundations", title: "Row-oriented or columnar?", level: "beginner", minutes: 6, xp: 25, skills: [SK_FOUND], required: false,
    objective: "Know how common file formats store data.",
    scenario: "Some formats keep a record together; others keep a column together. Classify each format.",
    steps: ["Read each format.", "Choose Row-oriented or Columnar.", "Press Check my work."],
    categories: [["row", "Row-oriented"], ["col", "Columnar"]],
    items: [
      ["CSV", "row", "One record per line."],
      ["Parquet", "col", "Stores each column together, compressed."],
      ["JSON Lines", "row", "One record per line."],
      ["ORC", "col", "A columnar format."],
      ["Avro", "row", "A row-oriented binary format with a schema."],
    ],
  }),
  lab({
    id: "de4-profile-log", module: "data-engineering-foundations", title: "Profile the raw order log", level: "beginner", minutes: 10, xp: 45, skills: [SK_FOUND],
    objective: "Profile raw data before touching it.",
    scenario: "The shop's order-event log has just landed. Return one row with `rows_received` (all rows), `distinct_events` (different event_id values), `duplicate_rows` (rows beyond the distinct events) and `orders` (different order_id values).",
    steps: ["COUNT(*) counts every row received.", "COUNT(DISTINCT event_id) counts events.", "Subtract to get the duplicate deliveries."],
    solution: "SELECT COUNT(*) AS rows_received, COUNT(DISTINCT event_id) AS distinct_events, COUNT(*) - COUNT(DISTINCT event_id) AS duplicate_rows, COUNT(DISTINCT order_id) AS orders FROM order_events",
    checks: qc({ solution: "SELECT COUNT(*) AS rows_received, COUNT(DISTINCT event_id) AS distinct_events, COUNT(*) - COUNT(DISTINCT event_id) AS duplicate_rows, COUNT(DISTINCT order_id) AS orders FROM order_events", uses: [["count\\s*\\(\\s*distinct", "COUNT(DISTINCT ...)"]], explain: "Rows received minus distinct event ids is the number of duplicate deliveries: events sent more than once." }),
  }),
  classifyLab({
    id: "de5-batch-stream", module: "data-engineering-foundations", title: "Batch, micro-batch or streaming?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_FOUND], required: true,
    objective: "Match the processing style to the need.",
    scenario: "Faster is not always better. Choose the simplest style that meets each need.",
    steps: ["Read each need.", "Choose Batch, Micro-batch or Streaming.", "Press Check my work."],
    categories: [["batch", "Batch"], ["micro", "Micro-batch"], ["stream", "Streaming"]],
    items: [
      ["A finance report ready every morning", "batch", "A scheduled daily batch is simple and cheap."],
      ["A dashboard that should be fresh within a few minutes", "micro", "Small frequent batches meet minutes-level freshness."],
      ["Block a suspicious card payment within seconds", "stream", "Seconds-level reaction needs streaming."],
      ["Monthly cohort retention analysis", "batch", "No need for speed."],
      ["A live operations screen showing the last 5 minutes of orders", "micro", "Micro-batches every minute are enough."],
      ["Alert when a sensor reading crosses a limit", "stream", "Each event must be checked as it arrives."],
    ],
  }),

  /* ------------------------------------------------------------------ module 2 */
  classifyLab({
    id: "de6-fact-dim", module: "data-modelling", title: "Fact or dimension?", level: "beginner", minutes: 8, xp: 30, skills: [SK_MODEL], required: true,
    objective: "Classify tables in a dimensional model.",
    scenario: "A star schema has fact tables of events and dimension tables of descriptions. Classify each table.",
    steps: ["Read each table.", "Choose Fact or Dimension.", "Press Check my work."],
    categories: [["fact", "Fact table"], ["dim", "Dimension table"]],
    items: [
      ["One row per order line, with quantity and amount", "fact", "Events with numeric measures."],
      ["Products: name, category and brand", "dim", "Descriptions of the things sold."],
      ["One row per payment attempt, with amount and result", "fact", "Each payment is an event."],
      ["Customers, with city and signup date", "dim", "Descriptions of who."],
      ["A calendar: one row per day with month and holiday flag", "dim", "A date dimension."],
      ["One row per website page view", "fact", "Each view is an event."],
    ],
  }),
  classifyLab({
    id: "de7-scd-type", module: "data-modelling", title: "Which SCD type?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_MODEL], required: true,
    objective: "Choose how to handle a changing dimension attribute.",
    scenario: "When a dimension attribute changes you choose how to treat history. Choose the type that fits each need.",
    steps: ["Read each need.", "Choose Type 1, Type 2 or Type 3.", "Press Check my work."],
    categories: [["t1", "Type 1: overwrite"], ["t2", "Type 2: add a versioned row"], ["t3", "Type 3: keep the previous value"]],
    items: [
      ["Fix a misspelt customer name; the old spelling is useless", "t1", "A correction does not need history."],
      ["Report sales by the city each customer lived in at the time of the sale", "t2", "Full history with validity dates is needed."],
      ["Show only the current region and the one before it", "t3", "An extra column holds the previous value."],
      ["A product's category is re-organised and analysts must see sales under the category it had then", "t2", "History matters."],
      ["A phone number was entered wrongly and has been corrected", "t1", "Overwrite: the old value was never right."],
      ["Compare this year's sales territory with last year's only", "t3", "Only the previous value is needed."],
    ],
  }),
  lab({
    id: "de8-scd2-build", module: "data-modelling", title: "Build the type 2 customer history", level: "challenge", minutes: 18, xp: 70,
    objective: "Build validity dates from a change log with LEAD.",
    scenario: "customer_changes records every city a customer has lived in and when they moved in. Build the type 2 history: `customer_id`, `city`, `valid_from` (the change date), `valid_to` (the date of the next change, or '9999-12-31' for the current city) and `is_current` (1 for the current city, otherwise 0). Sort by customer_id, then valid_from.",
    steps: ["Use LEAD(changed_at) OVER (PARTITION BY customer_id ORDER BY changed_at) to find the next change.", "COALESCE it with '9999-12-31' for valid_to.", "is_current is 1 where there is no next change."],
    solution: "SELECT customer_id, city, changed_at AS valid_from, COALESCE(LEAD(changed_at) OVER (PARTITION BY customer_id ORDER BY changed_at), '9999-12-31') AS valid_to, CASE WHEN LEAD(changed_at) OVER (PARTITION BY customer_id ORDER BY changed_at) IS NULL THEN 1 ELSE 0 END AS is_current FROM customer_changes ORDER BY customer_id, valid_from",
    checks: qc({ solution: "SELECT customer_id, city, changed_at AS valid_from, COALESCE(LEAD(changed_at) OVER (PARTITION BY customer_id ORDER BY changed_at), '9999-12-31') AS valid_to, CASE WHEN LEAD(changed_at) OVER (PARTITION BY customer_id ORDER BY changed_at) IS NULL THEN 1 ELSE 0 END AS is_current FROM customer_changes ORDER BY customer_id, valid_from", uses: [["\\blead\\b", "LEAD"], ["over\\s*\\(", "a window function"]], ordered: true, explain: "LEAD reads the next change for the same customer; that date is when this version stops. The last version has no next change, so it gets the far-future date and is current." }),
  }),
  lab({
    id: "de9-scd2-join", module: "data-modelling", title: "Which city was it then?", level: "challenge", minutes: 20, xp: 80,
    objective: "Join facts to the dimension version that was valid at the time.",
    scenario: "For every order show `order_id`, `order_date` and `city`: the city the customer lived in **on the order date**. Build the type 2 versions in a CTE (as in the previous lab, without is_current) and join with a half-open date range. Every order must match exactly one version. Sort by order_id.",
    steps: ["WITH v AS (...) builds customer_id, city, valid_from, valid_to.", "Join orders to v on customer_id and order_date >= valid_from AND order_date < valid_to.", "Sort by order_id."],
    solution: `WITH v AS (${SCD2}) SELECT o.order_id, o.order_date, v.city FROM orders o JOIN v ON v.customer_id = o.customer_id AND o.order_date >= v.valid_from AND o.order_date < v.valid_to ORDER BY o.order_id`,
    checks: qc({ solution: `WITH v AS (${SCD2}) SELECT o.order_id, o.order_date, v.city FROM orders o JOIN v ON v.customer_id = o.customer_id AND o.order_date >= v.valid_from AND o.order_date < v.valid_to ORDER BY o.order_id`, uses: [["valid_from", "the validity dates in the join"]], ordered: true, explain: "A half-open range (>= valid_from and < valid_to) matches exactly one version of the customer for each order date, so no order is duplicated or lost." }),
  }),

  /* ------------------------------------------------------------------ module 3 */
  lab({
    id: "de10-latest-status", module: "sql-transformations", title: "Latest status per order", level: "intermediate", minutes: 15, xp: 60,
    objective: "Remove duplicate deliveries, then keep the newest event for each order.",
    scenario: "order_events is a raw log: some events were delivered twice, and events for an order can arrive out of order. Return `order_id` and `status` of the **latest** event for every order (by event_ts; break ties with the larger event_id), after removing the duplicate deliveries. Sort by order_id.",
    steps: ["First SELECT DISTINCT the event columns.", "Number the rows per order, newest first, with ROW_NUMBER.", "Keep rn = 1."],
    solution: `SELECT order_id, status FROM (${LATEST}) t WHERE rn = 1 ORDER BY order_id`,
    checks: qc({ solution: `SELECT order_id, status FROM (${LATEST}) t WHERE rn = 1 ORDER BY order_id`, uses: [["row_number", "ROW_NUMBER"], ["partition\\s+by", "PARTITION BY"]], ordered: true, explain: "DISTINCT removes the exact duplicate deliveries; ROW_NUMBER numbers each order's events newest first, with event_id as a tie-breaker, and rn = 1 keeps the latest." }),
  }),
  lab({
    id: "de11-mart", module: "sql-transformations", title: "The monthly revenue mart", level: "challenge", minutes: 22, xp: 80,
    objective: "Build a business-ready table on top of the cleaned events.",
    scenario: "Finance counts an order as revenue only when its **latest** status is 'delivered'. Build the mart: `month` (the first seven characters of the order_date from the orders table), `delivered_orders` (how many) and `revenue` (the sum of amount from the latest event). Sort by month.",
    steps: ["Reuse the dedupe and latest-event logic in a CTE.", "Keep rn = 1 and status = 'delivered'.", "Join to orders for the date, group by month."],
    solution: `WITH l AS (${LATEST}) SELECT SUBSTR(o.order_date, 1, 7) AS month, COUNT(*) AS delivered_orders, SUM(l.amount) AS revenue FROM l JOIN orders o ON o.order_id = l.order_id WHERE l.rn = 1 AND l.status = 'delivered' GROUP BY SUBSTR(o.order_date, 1, 7) ORDER BY month`,
    checks: qc({ solution: `WITH l AS (${LATEST}) SELECT SUBSTR(o.order_date, 1, 7) AS month, COUNT(*) AS delivered_orders, SUM(l.amount) AS revenue FROM l JOIN orders o ON o.order_id = l.order_id WHERE l.rn = 1 AND l.status = 'delivered' GROUP BY SUBSTR(o.order_date, 1, 7) ORDER BY month`, uses: [["\\bwith\\b", "a CTE (WITH)"], ["group\\s+by", "GROUP BY"]], ordered: true, explain: "The business rule (latest status is delivered) lives in the mart, on top of a deduplicated latest-event staging step; the join to orders supplies the date." }),
  }),
  lab({
    id: "de12-dq-payments", module: "sql-transformations", title: "Quality checks on the payments feed", level: "challenge", minutes: 22, xp: 80,
    objective: "Write several data-quality tests as one query.",
    scenario: "The payments feed arrives from another system. Return one row counting each kind of problem: `null_orders` (payments with no order_id), `duplicate_payments` (rows beyond the distinct payment_id values), `negative_amounts` (amount below zero), `orphan_payments` (an order_id that does not exist in orders) and `bad_methods` (method not one of 'card', 'upi', 'cod').",
    steps: ["Use COUNT(*) - COUNT(col) for nulls and COUNT(*) - COUNT(DISTINCT payment_id) for duplicates.", "SUM(CASE WHEN ... THEN 1 ELSE 0 END) counts a condition.", "For orphans: order_id IS NOT NULL AND order_id NOT IN (SELECT order_id FROM orders)."],
    solution: "SELECT COUNT(*) - COUNT(order_id) AS null_orders, COUNT(*) - COUNT(DISTINCT payment_id) AS duplicate_payments, SUM(CASE WHEN amount < 0 THEN 1 ELSE 0 END) AS negative_amounts, SUM(CASE WHEN order_id IS NOT NULL AND order_id NOT IN (SELECT order_id FROM orders) THEN 1 ELSE 0 END) AS orphan_payments, SUM(CASE WHEN method NOT IN ('card', 'upi', 'cod') THEN 1 ELSE 0 END) AS bad_methods FROM payments",
    checks: qc({ solution: "SELECT COUNT(*) - COUNT(order_id) AS null_orders, COUNT(*) - COUNT(DISTINCT payment_id) AS duplicate_payments, SUM(CASE WHEN amount < 0 THEN 1 ELSE 0 END) AS negative_amounts, SUM(CASE WHEN order_id IS NOT NULL AND order_id NOT IN (SELECT order_id FROM orders) THEN 1 ELSE 0 END) AS orphan_payments, SUM(CASE WHEN method NOT IN ('card', 'upi', 'cod') THEN 1 ELSE 0 END) AS bad_methods FROM payments", uses: [["\\bcase\\b", "CASE"]], explain: "Each column is one test that counts violations: nulls (COUNT difference), duplicates (COUNT DISTINCT difference), a range test, a relationships test and an accepted-values test. A healthy feed would return zeros." }),
  }),
  classifyLab({
    id: "de13-which-test", module: "sql-transformations", title: "Which test catches it?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_SQL], required: true,
    objective: "Match a data problem to the quality test that finds it.",
    scenario: "Different problems need different tests. Choose the test that would catch each one.",
    steps: ["Read each problem.", "Choose Not null, Unique, Accepted values, Relationships, Range or Freshness.", "Press Check my work."],
    categories: [["notnull", "Not null"], ["unique", "Unique"], ["accepted", "Accepted values"], ["rel", "Relationships"], ["range", "Range"], ["fresh", "Freshness"]],
    items: [
      ["Some orders have no customer_id", "notnull", "A required column is empty."],
      ["Two rows have the same order_id", "unique", "A key must appear once."],
      ["A status column contains 'lost' and 'refnded'", "accepted", "Only allowed values should appear."],
      ["A payment refers to order 9999, which does not exist", "rel", "A foreign key with no parent."],
      ["An amount of -300 appears", "range", "A value outside the sensible range."],
      ["The orders table was last updated three days ago", "fresh", "Data is stale."],
    ],
  }),

  /* ------------------------------------------------------------------ module 4 */
  classifyLab({
    id: "de14-order", module: "pipelines-and-orchestration", title: "Put the pipeline steps in order", level: "intermediate", minutes: 8, xp: 30, skills: [SK_OPS], required: true,
    objective: "Order the steps of a daily pipeline.",
    scenario: "A reliable daily pipeline runs its steps in a sensible order. Put each step in its position.",
    steps: ["Read each step.", "Choose the position (1st to 6th) where it belongs.", "Press Check my work."],
    categories: [["1", "1st"], ["2", "2nd"], ["3", "3rd"], ["4", "4th"], ["5", "5th"], ["6", "6th"]],
    items: [
      ["Extract yesterday's data from the source system", "1", "Nothing can happen before the data is read."],
      ["Load it unchanged into the raw layer", "2", "Land it before changing anything."],
      ["Clean, type and deduplicate it into staging", "3", "Technical cleaning comes next."],
      ["Build the business-ready marts", "4", "Business logic runs on clean staging data."],
      ["Run the data quality tests on the marts", "5", "Test the results before anyone uses them."],
      ["Publish the tables to analysts and notify the owner", "6", "Release only tested data."],
    ],
  }),
  classifyLab({
    id: "de15-idempotent", module: "pipelines-and-orchestration", title: "Idempotent or not?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_OPS], required: true,
    objective: "Tell safe-to-rerun operations from unsafe ones.",
    scenario: "An idempotent step gives the same result however many times it runs. Decide for each step whether it is safe to rerun.",
    steps: ["Read each step.", "Choose Idempotent (safe to rerun) or Not idempotent (risky).", "Press Check my work."],
    categories: [["safe", "Idempotent: safe to rerun"], ["risky", "Not idempotent: risky"]],
    items: [
      ["INSERT the day's rows with no check for existing rows", "risky", "A rerun adds the rows again."],
      ["MERGE the day's rows into the table by order_id", "safe", "A rerun updates the same rows."],
      ["Delete the day's partition and rewrite it", "safe", "The final state is the same."],
      ["Add today's date from the system clock to each row", "risky", "A rerun for yesterday gives different values."],
      ["Append rows to a file every time the job runs", "risky", "Retries duplicate data."],
      ["Overwrite one partition with a deterministic query", "safe", "The same input gives the same output."],
    ],
  }),
  classifyLab({
    id: "de16-failure", module: "pipelines-and-orchestration", title: "What should happen next?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_OPS], required: false,
    objective: "Choose the right response to a pipeline problem.",
    scenario: "Pipelines fail in different ways. Choose the best response for each.",
    steps: ["Read each situation.", "Choose Retry, Backfill, Alert a person or Add a test.", "Press Check my work."],
    categories: [["retry", "Retry automatically"], ["backfill", "Backfill"], ["alert", "Alert a person"], ["test", "Add a test"]],
    items: [
      ["A call to the source API timed out once", "retry", "A transient failure: retry with a delay."],
      ["You fixed a transformation bug and last month's results are wrong", "backfill", "Re-run the fixed pipeline for the past dates."],
      ["The source renamed a column and every run now fails", "alert", "A person must change the pipeline or talk to the source team."],
      ["A bug let negative amounts through last week", "test", "Add a test so it cannot return unnoticed."],
      ["The warehouse was busy and a query failed once", "retry", "Retry usually succeeds."],
      ["A new pipeline needs six months of history loaded", "backfill", "Run it for each past period."],
    ],
  }),
  lab({
    id: "de17-incremental", module: "pipelines-and-orchestration", title: "Load only the new events", level: "intermediate", minutes: 12, xp: 50,
    objective: "Select rows newer than a watermark.",
    scenario: "The last successful run loaded events up to '2025-04-01 00:00:00'. Return one row for the **new** events: `new_events` (how many rows have an event_ts after the watermark), `orders_touched` (how many different orders they belong to) and `new_watermark` (the latest event_ts among them).",
    steps: ["Filter WHERE event_ts > '2025-04-01 00:00:00'.", "COUNT(*), COUNT(DISTINCT order_id) and MAX(event_ts) over those rows."],
    solution: "SELECT COUNT(*) AS new_events, COUNT(DISTINCT order_id) AS orders_touched, MAX(event_ts) AS new_watermark FROM order_events WHERE event_ts > '2025-04-01 00:00:00'",
    checks: qc({ solution: "SELECT COUNT(*) AS new_events, COUNT(DISTINCT order_id) AS orders_touched, MAX(event_ts) AS new_watermark FROM order_events WHERE event_ts > '2025-04-01 00:00:00'", uses: [["\\bwhere\\b", "a WHERE condition on the watermark"]], explain: "An incremental load reads only rows newer than the watermark; the maximum timestamp of what was read becomes the next watermark once the load succeeds." }),
  }),

  /* ------------------------------------------------------------------ module 5 */
  classifyLab({
    id: "de18-streaming", module: "big-data-and-streaming", title: "Streaming ideas", level: "advanced", minutes: 8, xp: 30, skills: [SK_OPS], required: false,
    objective: "Match streaming vocabulary to its meaning.",
    scenario: "Streaming systems use their own vocabulary. Match each description to the term.",
    steps: ["Read each description.", "Choose Partition, Offset, Consumer group, Watermark or Key.", "Press Check my work."],
    categories: [["partition", "Partition"], ["offset", "Offset"], ["group", "Consumer group"], ["watermark", "Watermark"], ["key", "Key"]],
    items: [
      ["A slice of a topic; order is guaranteed only inside one", "partition", "Order is per partition."],
      ["An event's position within a partition", "offset", "It marks how far a consumer has read."],
      ["Several consumers that share the work of reading a topic", "group", "Each partition is read by one consumer in the group."],
      ["A promise that events older than some point have probably all arrived", "watermark", "It tells a window when it can close."],
      ["The value that decides which partition an event goes to, keeping related events together", "key", "Events with the same key share a partition and keep order."],
    ],
  }),
  classifyLab({
    id: "de19-partition", module: "big-data-and-streaming", title: "Is it a good partition column?", level: "advanced", minutes: 8, xp: 30, skills: [SK_OPS], required: true,
    objective: "Choose sensible partition columns for a lake table.",
    scenario: "A good partition column is one queries filter on, with a moderate number of distinct values. Decide for each candidate.",
    steps: ["Read each candidate.", "Choose Good or Poor.", "Press Check my work."],
    categories: [["good", "Good partition column"], ["poor", "Poor partition column"]],
    items: [
      ["event_date, when most queries ask about a date range", "good", "Time filters are common, and there are a manageable number of dates."],
      ["user_id, with 40 million different values", "poor", "Millions of tiny partitions."],
      ["country, with about 40 values and many queries filtering by it", "good", "Moderate cardinality that queries use."],
      ["a free-text comment column", "poor", "Nobody filters on it and every value is different."],
      ["order_id, unique for every order", "poor", "One partition per order is far too many."],
      ["month, with 12 values per year, for yearly reports", "good", "A sensible, commonly filtered grain."],
    ],
  }),
  lab({
    id: "de20-window", module: "big-data-and-streaming", title: "Orders created per two-hour window", level: "intermediate", minutes: 15, xp: 60,
    objective: "Aggregate events into tumbling time windows.",
    scenario: "Group the **created** events into two-hour windows by the hour of event_ts (8, 10, 12, ...). Return `hour_window` (the start hour of the window, as a number such as 8, 10 or 12) and `orders` (how many different orders had a created event in that window). Sort by hour_window.",
    steps: ["The hour is CAST(SUBSTR(event_ts, 12, 2) AS INTEGER).", "Window start = FLOOR(hour / 2) * 2.", "Filter status = 'created', COUNT DISTINCT order_id, GROUP BY 1."],
    solution: "SELECT FLOOR(CAST(SUBSTR(event_ts, 12, 2) AS INTEGER) / 2) * 2 AS hour_window, COUNT(DISTINCT order_id) AS orders FROM order_events WHERE status = 'created' GROUP BY 1 ORDER BY 1",
    checks: qc({ solution: "SELECT FLOOR(CAST(SUBSTR(event_ts, 12, 2) AS INTEGER) / 2) * 2 AS hour_window, COUNT(DISTINCT order_id) AS orders FROM order_events WHERE status = 'created' GROUP BY 1 ORDER BY 1", uses: [["group\\s+by", "GROUP BY"], ["floor", "FLOOR to build the window"]], ordered: true, explain: "FLOOR(hour / 2) * 2 turns each hour into the start of its two-hour window: a tumbling window. COUNT DISTINCT counts each order once even if its event was delivered twice." }),
  }),

  /* ------------------------------------------------------------------ module 6 / capstone */
  classifyLab({
    id: "de21-privacy", module: "governance-and-practice", title: "Good practice or risk?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_GOV], required: true,
    objective: "Recognise safe and risky data handling.",
    scenario: "Decide whether each practice protects data or puts it at risk.",
    steps: ["Read each practice.", "Choose Good practice or Risk.", "Press Check my work."],
    categories: [["good", "Good practice"], ["risk", "Risk"]],
    items: [
      ["Give each analyst only the tables they need", "good", "Least privilege."],
      ["Copy production customer phone numbers into the test environment", "risk", "Personal data must not leak into test systems."],
      ["Store database passwords in a secrets manager", "good", "Secrets stay out of code."],
      ["Commit an API key to the repository", "risk", "Keys in repositories get leaked."],
      ["Expose a hashed customer id and city in the mart instead of the phone number", "good", "Minimise and mask personal data."],
      ["Keep every customer's personal data forever 'just in case'", "risk", "Retention should be limited to what is needed."],
      ["Assume a hashed phone number is fully anonymous", "risk", "Hashing is not guaranteed anonymisation."],
      ["Record who accessed sensitive tables", "good", "Audit logging."],
    ],
  }),
  lab({
    id: "cap-de-city-revenue", module: "capstone", title: "Revenue by customer city, as it was then", level: "challenge", minutes: 30, xp: 120,
    objective: "Combine deduplication, the latest event, a business rule and a type 2 join in one pipeline query.",
    scenario: "Finance wants delivered revenue by the city each customer lived in **when they ordered**. Return `city`, `orders` (how many delivered orders) and `revenue` (the sum of the amount from each order's latest event). An order counts only if its latest status (after removing duplicate deliveries) is 'delivered'. Sort by revenue descending, then city.",
    steps: ["CTE 1: the deduplicated events with ROW_NUMBER per order (newest first).", "CTE 2: the type 2 customer versions with LEAD.", "Join the latest delivered events to orders, then to the version valid on the order date, and aggregate by city."],
    solution: `WITH l AS (${LATEST}), v AS (${SCD2}) SELECT v.city, COUNT(*) AS orders, SUM(l.amount) AS revenue FROM l JOIN orders o ON o.order_id = l.order_id JOIN v ON v.customer_id = o.customer_id AND o.order_date >= v.valid_from AND o.order_date < v.valid_to WHERE l.rn = 1 AND l.status = 'delivered' GROUP BY v.city ORDER BY revenue DESC, v.city`,
    checks: qc({ solution: `WITH l AS (${LATEST}), v AS (${SCD2}) SELECT v.city, COUNT(*) AS orders, SUM(l.amount) AS revenue FROM l JOIN orders o ON o.order_id = l.order_id JOIN v ON v.customer_id = o.customer_id AND o.order_date >= v.valid_from AND o.order_date < v.valid_to WHERE l.rn = 1 AND l.status = 'delivered' GROUP BY v.city ORDER BY revenue DESC, v.city`, uses: [["\\bwith\\b", "CTEs (WITH)"], ["row_number", "ROW_NUMBER for the latest event"], ["\\blead\\b", "LEAD for the customer versions"]], ordered: true, explain: "Dedupe and keep the latest event per order, build the type 2 versions with LEAD, join the order date into the version's half-open range, and aggregate. Every order matches one event and one customer version, so no total is inflated." }),
  }),
  wordLab({
    id: "cap-de-design", module: "capstone", title: "Write the pipeline design document", level: "challenge", minutes: 25, xp: 100, skills: [SK_GOV], required: true,
    objective: "Describe the pipeline so a colleague could review and build it.",
    scenario: "Finance asked for a daily 'delivered revenue by customer city' table. Write the one-page design document for the pipeline you just prototyped.",
    steps: ["Add a title heading and three more headings: 'Purpose and sources', 'Model and processing' and 'Quality, security and operations'.", "List at least three quality tests that will run.", "Mention that the load is idempotent and how it is scheduled.", "Mention how personal data is protected, and a risk of the design."],
    html: "<p><br></p>",
    checks: [
      ck("title", "The document has a title heading", "Use the heading style for the title.", "A heading tells the reader what the document is.", W.heading(1)),
      ck("sections", "There are at least four headings (title and three sections)", "Add the three section headings.", "Headings let a reviewer find each part.", W.heading(4)),
      ck("para", "There are at least two paragraphs", "Explain the model and the processing in prose.", "Prose explains the reasoning behind the design.", W.paragraphs(2, 12)),
      ck("list", "The quality tests are a list of at least three items", "Use the bullet list button.", "A list makes the tests easy to review.", W.list(3, "ul")),
      ck("idem", "It says the load is idempotent", "Use the word idempotent and say how reruns are made safe.", "Safe reruns are the heart of a reliable pipeline.", W.pattern("idempotent", "a sentence about idempotency")),
      ck("scd", "It mentions the type 2 customer history", "Say that the customer's city comes from a type 2 dimension (SCD).", "The design must say how history is kept.", W.pattern("type 2|scd|slowly changing", "the type 2 customer history")),
      ck("pii", "It says how personal data is protected", "Mention masking, least privilege or access control.", "Privacy is part of the design.", W.pattern("mask|privilege|access|personal data|pii", "how personal data is protected")),
    ],
    solution: "<h1>Pipeline design: delivered revenue by customer city</h1><h2>Purpose and sources</h2><p>Finance needs daily revenue by the city each customer lived in when they ordered, ready by 07:00. Sources are the order-event log, which can repeat events and deliver them out of order, and the customer change history.</p><h2>Model and processing</h2><p>Raw events are kept unchanged, then deduplicated and reduced to the latest event per order. The customer city comes from a type 2 dimension (slowly changing) built with LEAD, and orders join the version valid on the order date. The nightly batch load is incremental by watermark and idempotent: it rewrites the affected dates, so a rerun or a backfill never duplicates revenue.</p><h2>Quality, security and operations</h2><ul><li>Not-null and unique tests on order id in staging.</li><li>A relationships test that every order has exactly one customer version.</li><li>A volume check that today's row count is within the usual range.</li></ul><p>Customer names and contact details stay in the restricted staging layer; the mart holds only a masked customer id and the city, and access follows least privilege. One risk is late events changing past results, so the pipeline reprocesses the last three days each night.</p>",
  }),
];
