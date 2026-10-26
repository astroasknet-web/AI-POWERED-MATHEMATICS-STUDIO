import { ck, classifyLab, Q, sqlLab, W, wordLab } from "../kit.mjs";
import { shoplens } from "./py-data.mjs";

export const SK_FLOW = "analytics-workflow";
export const SK_TABLES = "pandas-and-sql-thinking";
export const SK_ANALYSIS = "sql-analysis";
export const SK_STATS = "exploration-and-statistics";
export const SK_COMM = "communication-and-practice";

/**
 * The SQL labs run on the ShopLens tables (users, events, orders) in the student's browser. Each lab judges one query: it must run, use the right idea,
 * and return the same rows as the model query (in the same order where the task asks for an order). The Python in the lessons is not run here, so
 * the labs practise the same logic in SQL, and the sorting activities practise the pandas ideas in words. Model answers are replayed by the course tests.
 */
const STARTER = "-- Write your query here, then press Run query\n";

function qc({ solution, uses = [], ordered = false, explain, hint }) {
  const out = [ck("runs", "Your query runs without an error", "Press Run query and read any message under the editor: it names the problem.", "A query that does not run cannot be checked. The message tells you which word or column it could not understand.", Q.runs())];
  uses.forEach(([re, what], i) => out.push(ck(`uses-${i + 1}`, `It uses ${what}`, `The task needs ${what}. Think about which clause does that job.`, `${what[0].toUpperCase()}${what.slice(1)} is the tool built for this part of the task.`, Q.uses(re, what))));
  out.push(ck("rows", "It returns the right rows and columns", hint ?? "Compare the number of rows and columns you get with what the task describes, then check your conditions.", explain, Q.result(solution)));
  if (ordered) out.push(ck("order", "The rows are in the order the task asks for", "Check the ORDER BY: which column, and ascending or descending?", "The task names the sort order; a second sort column breaks ties.", Q.result(solution, { ordered: true })));
  return out;
}
const lab = (o) => sqlLab({ tables: shoplens, starter: STARTER, level: "intermediate", minutes: 12, xp: 50, skills: [SK_ANALYSIS], ...o });

export const labs = [
  /* ------------------------------------------------------------------ module 1 */
  classifyLab({
    id: "py1-stages", module: "the-analytics-workflow", title: "Which stage of the analysis?", level: "beginner", minutes: 6, xp: 25, skills: [SK_FLOW], required: true,
    objective: "Place each activity in the right stage of the analytics workflow.",
    scenario: "An analysis moves from a question to a decision. Each activity below belongs to one stage.",
    steps: ["Read each activity.", "Choose Ask, Get, Clean, Analyse or Communicate.", "Press Check my work."],
    categories: [["ask", "Ask"], ["get", "Get the data"], ["clean", "Clean"], ["analyse", "Analyse"], ["communicate", "Communicate"]],
    items: [
      ["Agree that 'active user' means any event in the last 30 days", "ask", "Defining the question and its metrics comes first."],
      ["Run a query that extracts last quarter's orders from the database", "get", "Extracting data is the Get stage."],
      ["Convert text dates to real dates and remove duplicate events", "clean", "Fixing problems in the data is Clean."],
      ["Compute conversion rates by signup source", "analyse", "Summarising and comparing is Analyse."],
      ["Write a one-page memo with a recommendation", "communicate", "Telling people what to do is Communicate."],
      ["Decide which decision the analysis should support", "ask", "A good analysis starts from a decision."],
      ["Fill missing cities with 'Unknown' and record how many", "clean", "Handling gaps is Clean."],
      ["Draw a chart comparing cohort retention", "analyse", "Exploring and charting results is Analyse (the chart in the final report is Communicate)."],
    ],
  }),
  classifyLab({
    id: "py2-types", module: "the-analytics-workflow", title: "What type is it?", level: "beginner", minutes: 6, xp: 25, skills: [SK_FLOW], required: false,
    objective: "Recognise the Python type of a value.",
    scenario: "Python has a handful of basic types. Pick the type of each value as Python would see it.",
    steps: ["Read each value.", "Choose int, float, str, bool, list, dict or None.", "Press Check my work."],
    categories: [["int", "int (whole number)"], ["float", "float (decimal)"], ["str", "str (text)"], ["bool", "bool"], ["list", "list"], ["dict", "dict"], ["none", "None"]],
    items: [
      ["42", "int", "A whole number with no quotes."],
      ["3.14", "float", "A number with a decimal point."],
      ["\"Pune\"", "str", "Text is written in quotes."],
      ["True", "bool", "True and False are Booleans."],
      ["[10, 20, 30]", "list", "Square brackets make a list."],
      ["{\"city\": \"Pune\", \"n\": 3}", "dict", "Curly brackets with key: value pairs make a dictionary."],
      ["None", "none", "None means no value, like NULL in SQL."],
      ["\"42\"", "str", "The quotes make it text, even though it looks like a number."],
    ],
  }),
  lab({
    id: "py3-profile", module: "the-analytics-workflow", title: "Profile the shop's users", required: true, level: "beginner", minutes: 8, xp: 40,
    objective: "Write a profiling query that tells you the size and span of a table.",
    scenario: "Before analysing anything, profile the users table. Return one row with `users` (how many users), `first_signup` and `last_signup` (the earliest and latest signup_date) and `sources` (how many different sources).",
    steps: ["Look at the users table in the panel.", "Use COUNT(*), MIN, MAX and COUNT(DISTINCT ...).", "Name the four columns exactly as the task says."],
    solution: "SELECT COUNT(*) AS users, MIN(signup_date) AS first_signup, MAX(signup_date) AS last_signup, COUNT(DISTINCT source) AS sources FROM users",
    checks: qc({ solution: "SELECT COUNT(*) AS users, MIN(signup_date) AS first_signup, MAX(signup_date) AS last_signup, COUNT(DISTINCT source) AS sources FROM users", uses: [["count\\s*\\(\\s*distinct", "COUNT(DISTINCT ...)"]], explain: "COUNT(*) counts rows, MIN and MAX give the earliest and latest dates (ISO dates sort correctly), and COUNT(DISTINCT source) counts the different sources once each." }),
  }),

  /* ------------------------------------------------------------------ module 2 */
  classifyLab({
    id: "py4-translate", module: "pandas-thinking", title: "Translate pandas into SQL", level: "intermediate", minutes: 8, xp: 30, skills: [SK_TABLES], required: true,
    objective: "Match each pandas expression to the SQL idea that does the same job.",
    scenario: "pandas and SQL express the same ideas in different words. Match each pandas expression to its SQL counterpart.",
    steps: ["Read the pandas expression.", "Choose the SQL idea it matches.", "Press Check my work."],
    categories: [["where", "WHERE"], ["select", "SELECT columns"], ["order", "ORDER BY"], ["group", "GROUP BY"], ["join", "JOIN"], ["window", "Window function"], ["case", "CASE WHEN"]],
    items: [
      ["df[df[\"amount\"] > 500]", "where", "A Boolean mask keeps the rows where the condition is true, like WHERE."],
      ["df[[\"name\", \"city\"]]", "select", "Choosing columns is SELECT."],
      ["df.sort_values(\"amount\", ascending=False)", "order", "Sorting is ORDER BY ... DESC."],
      ["df.groupby(\"city\")[\"amount\"].sum()", "group", "groupby with an aggregation is GROUP BY with SUM."],
      ["orders.merge(users, left_on=\"user_id\", right_on=\"id\")", "join", "merge combines tables on matching keys, like JOIN."],
      ["df[\"amount\"].shift(1)", "window", "The previous row's value is LAG, a window function."],
      ["pd.cut(df[\"amount\"], bins=[0, 300, 1000, 3000], labels=[\"s\", \"m\", \"l\"])", "case", "Turning a number into labelled bands is CASE WHEN."],
      ["df[\"amount\"].rolling(3).mean()", "window", "A moving average is AVG over a window frame."],
    ],
  }),
  lab({
    id: "py5-target", module: "pandas-thinking", title: "Find the users to target", required: true,
    objective: "Combine several conditions, the SQL version of a Boolean mask.",
    scenario: "Marketing wants pro-plan users who came from ads or referral and signed up **after** 1 March 2025. Show `id`, `signup_date` and `source`, sorted by signup_date and then id.",
    steps: ["The pandas version would be a mask with & and isin.", "In SQL combine the conditions with AND and use IN for the sources.", "Sort by signup_date, then id."],
    solution: "SELECT id, signup_date, source FROM users WHERE plan = 'pro' AND source IN ('ads', 'referral') AND signup_date > '2025-03-01' ORDER BY signup_date, id",
    checks: qc({ solution: "SELECT id, signup_date, source FROM users WHERE plan = 'pro' AND source IN ('ads', 'referral') AND signup_date > '2025-03-01' ORDER BY signup_date, id", uses: [["\\bin\\s*\\(", "IN (...) for the list of sources"]], ordered: true, explain: "Three conditions joined with AND: plan = 'pro', source IN a list, and signup_date later than the cut-off. Dates in ISO form compare correctly as text." }),
  }),
  lab({
    id: "py6-missing", module: "pandas-thinking", title: "How much is missing?", required: true, level: "intermediate", minutes: 10, xp: 40,
    objective: "Count missing values with COUNT(*) and COUNT(column).",
    scenario: "Return one row with `users` (all users), `missing_city` (how many have no city) and `pct_missing` (that count as a percentage of all users, rounded to one decimal).",
    steps: ["COUNT(*) counts every row; COUNT(city) skips the NULLs.", "Subtract to get the missing count.", "Divide by the total after multiplying by 100.0, and ROUND to 1 decimal."],
    solution: "SELECT COUNT(*) AS users, COUNT(*) - COUNT(city) AS missing_city, ROUND(100.0 * (COUNT(*) - COUNT(city)) / COUNT(*), 1) AS pct_missing FROM users",
    checks: qc({ solution: "SELECT COUNT(*) AS users, COUNT(*) - COUNT(city) AS missing_city, ROUND(100.0 * (COUNT(*) - COUNT(city)) / COUNT(*), 1) AS pct_missing FROM users", uses: [["round\\s*\\(", "ROUND"]], explain: "COUNT(city) ignores NULLs, so COUNT(*) minus COUNT(city) is the number of missing cities. Multiply by 100.0 to avoid whole-number division." }),
  }),

  /* ------------------------------------------------------------------ module 3 */
  lab({
    id: "py7-source", module: "group-merge-reshape", title: "Revenue by source", required: true,
    objective: "Join two tables, group, and aggregate: the SQL of groupby with named aggregation.",
    scenario: "Show for each user `source`: `orders` (number of orders), `revenue` (sum of amount) and `avg_order` (average amount, rounded to a whole number). Largest revenue first.",
    steps: ["Join orders to users on o.user_id = u.id.", "Group by u.source and aggregate.", "ROUND the average to 0 decimals and sort by revenue descending."],
    solution: "SELECT u.source, COUNT(*) AS orders, SUM(o.amount) AS revenue, ROUND(AVG(o.amount), 0) AS avg_order FROM orders o JOIN users u ON u.id = o.user_id GROUP BY u.source ORDER BY revenue DESC",
    checks: qc({ solution: "SELECT u.source, COUNT(*) AS orders, SUM(o.amount) AS revenue, ROUND(AVG(o.amount), 0) AS avg_order FROM orders o JOIN users u ON u.id = o.user_id GROUP BY u.source ORDER BY revenue DESC", uses: [["\\bjoin\\b", "JOIN"], ["group\\s+by", "GROUP BY"]], ordered: true, explain: "Each order matches one user, so the join does not multiply rows. GROUP BY source gives one row per source, with COUNT, SUM and AVG computed inside each group." }),
  }),
  lab({
    id: "py8-never", module: "group-merge-reshape", title: "Users who never ordered", required: true,
    objective: "Find unmatched rows: a left merge with indicator, in SQL.",
    scenario: "List the `id`, `signup_date` and `source` of users who have **never placed an order**, sorted by id.",
    steps: ["LEFT JOIN orders onto users.", "Users with no order have NULL in the orders columns.", "Keep them with WHERE o.id IS NULL."],
    solution: "SELECT u.id, u.signup_date, u.source FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL ORDER BY u.id",
    checks: qc({ solution: "SELECT u.id, u.signup_date, u.source FROM users u LEFT JOIN orders o ON o.user_id = u.id WHERE o.id IS NULL ORDER BY u.id", uses: [["(left\\s+join[\\s\\S]*is\\s+null)|not\\s+exists|not\\s+in", "a LEFT JOIN with IS NULL, or NOT EXISTS"]], ordered: true, explain: "A LEFT JOIN keeps every user; those with no orders have NULLs from the orders side, and WHERE o.id IS NULL keeps exactly those." }),
  }),
  lab({
    id: "py9-pivot", module: "group-merge-reshape", title: "A manual pivot by plan", required: true, level: "intermediate", minutes: 14, xp: 60,
    objective: "Pivot long data to wide with conditional aggregation.",
    scenario: "For each user `source`, show revenue split by plan in two columns: `free_revenue` and `pro_revenue` (sum of amount from users on each plan). Sort by source.",
    steps: ["Join orders to users and group by source.", "Use SUM(CASE WHEN u.plan = 'free' THEN o.amount ELSE 0 END) for the first column.", "Do the same for pro, and sort by source."],
    solution: "SELECT u.source, SUM(CASE WHEN u.plan = 'free' THEN o.amount ELSE 0 END) AS free_revenue, SUM(CASE WHEN u.plan = 'pro' THEN o.amount ELSE 0 END) AS pro_revenue FROM orders o JOIN users u ON u.id = o.user_id GROUP BY u.source ORDER BY u.source",
    checks: qc({ solution: "SELECT u.source, SUM(CASE WHEN u.plan = 'free' THEN o.amount ELSE 0 END) AS free_revenue, SUM(CASE WHEN u.plan = 'pro' THEN o.amount ELSE 0 END) AS pro_revenue FROM orders o JOIN users u ON u.id = o.user_id GROUP BY u.source ORDER BY u.source", uses: [["\\bcase\\b", "CASE inside SUM"]], ordered: true, explain: "A CASE inside SUM adds only the matching rows, one column per category: this is how SQL pivots, the same idea as pivot_table." }),
  }),
  lab({
    id: "py10-moving", module: "group-merge-reshape", title: "Monthly revenue with a moving average", required: false, level: "challenge", minutes: 18, xp: 70,
    objective: "Combine grouping with a window function: the SQL of resample plus rolling.",
    scenario: "Show `month` (like '2025-03'), `revenue` (sum of order amount in the month) and `avg2` (the average of this month's revenue and the previous month's, rounded to a whole number; the first month averages only itself). Sort by month.",
    steps: ["Group orders by SUBSTR(order_date, 1, 7) in a CTE.", "Use AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 1 PRECEDING AND CURRENT ROW).", "ROUND to 0 decimals."],
    solution: "WITH m AS (SELECT SUBSTR(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM orders GROUP BY SUBSTR(order_date, 1, 7)) SELECT month, revenue, ROUND(AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 1 PRECEDING AND CURRENT ROW), 0) AS avg2 FROM m ORDER BY month",
    checks: qc({ solution: "WITH m AS (SELECT SUBSTR(order_date, 1, 7) AS month, SUM(amount) AS revenue FROM orders GROUP BY SUBSTR(order_date, 1, 7)) SELECT month, revenue, ROUND(AVG(revenue) OVER (ORDER BY month ROWS BETWEEN 1 PRECEDING AND CURRENT ROW), 0) AS avg2 FROM m ORDER BY month", uses: [["rows\\s+between", "a ROWS BETWEEN frame"], ["over\\s*\\(", "a window function"]], ordered: true, explain: "First aggregate to one row per month, then apply a two-row window: the frame covers the previous row and the current one." }),
  }),

  /* ------------------------------------------------------------------ module 4 */
  lab({
    id: "py11-funnel", module: "sql-for-analysts", title: "The shop funnel", required: true, level: "challenge", minutes: 18, xp: 70,
    objective: "Build a conversion funnel with distinct users and a window function.",
    scenario: "The events table logs steps with event_type: visit, signup, add_to_cart and purchase. For each step show `event_type`, `users` (distinct users who did it) and `pct_of_visits` (users as a percentage of the visit step, one decimal). Order by the funnel order: visit, signup, add_to_cart, purchase.",
    steps: ["Count distinct user_id for each event_type in a CTE, adding a step number with CASE.", "Divide by FIRST_VALUE(users) OVER (ORDER BY step_no) times 100.0.", "Sort by the step number."],
    solution: "WITH s AS (SELECT event_type, COUNT(DISTINCT user_id) AS users, CASE event_type WHEN 'visit' THEN 1 WHEN 'signup' THEN 2 WHEN 'add_to_cart' THEN 3 ELSE 4 END AS n FROM events GROUP BY event_type) SELECT event_type, users, ROUND(100.0 * users / FIRST_VALUE(users) OVER (ORDER BY n), 1) AS pct_of_visits FROM s ORDER BY n",
    checks: qc({ solution: "WITH s AS (SELECT event_type, COUNT(DISTINCT user_id) AS users, CASE event_type WHEN 'visit' THEN 1 WHEN 'signup' THEN 2 WHEN 'add_to_cart' THEN 3 ELSE 4 END AS n FROM events GROUP BY event_type) SELECT event_type, users, ROUND(100.0 * users / FIRST_VALUE(users) OVER (ORDER BY n), 1) AS pct_of_visits FROM s ORDER BY n", uses: [["count\\s*\\(\\s*distinct", "COUNT(DISTINCT user_id)"], ["first_value", "FIRST_VALUE"]], ordered: true, explain: "A funnel counts people, so COUNT(DISTINCT user_id) (some users repeat a step). FIRST_VALUE gives the top of the funnel to divide by, and the CASE puts the steps in journey order." }),
  }),
  lab({
    id: "py12-retention", module: "sql-for-analysts", title: "Retention by signup month", required: true, level: "challenge", minutes: 22, xp: 80,
    objective: "Compute next-month retention for each signup cohort.",
    scenario: "A user is retained if they have a `visit` event in the calendar month **after** their signup month. For each signup month number (1 to 6, from MONTH(signup_date)) show `cohort` (the month number), `cohort_size`, `returned` (users with a visit in the next month) and `pct` (returned as a percentage of the cohort, rounded to a whole number). Sort by cohort.",
    steps: ["Cohort = MONTH(u.signup_date).", "LEFT JOIN visit events where MONTH(e.event_date) = MONTH(u.signup_date) + 1.", "Count distinct users and distinct returning users per cohort, then compute the percentage."],
    solution: "SELECT MONTH(u.signup_date) AS cohort, COUNT(DISTINCT u.id) AS cohort_size, COUNT(DISTINCT e.user_id) AS returned, ROUND(100.0 * COUNT(DISTINCT e.user_id) / COUNT(DISTINCT u.id), 0) AS pct FROM users u LEFT JOIN events e ON e.user_id = u.id AND e.event_type = 'visit' AND MONTH(e.event_date) = MONTH(u.signup_date) + 1 GROUP BY MONTH(u.signup_date) ORDER BY cohort",
    checks: qc({ solution: "SELECT MONTH(u.signup_date) AS cohort, COUNT(DISTINCT u.id) AS cohort_size, COUNT(DISTINCT e.user_id) AS returned, ROUND(100.0 * COUNT(DISTINCT e.user_id) / COUNT(DISTINCT u.id), 0) AS pct FROM users u LEFT JOIN events e ON e.user_id = u.id AND e.event_type = 'visit' AND MONTH(e.event_date) = MONTH(u.signup_date) + 1 GROUP BY MONTH(u.signup_date) ORDER BY cohort", uses: [["left\\s+join", "a LEFT JOIN (so users who did not return still count in the cohort)"], ["count\\s*\\(\\s*distinct", "COUNT(DISTINCT ...)"]], ordered: true, explain: "A LEFT JOIN keeps every user in the cohort, whether or not they returned, and the next-month condition goes in ON so it does not remove them. COUNT DISTINCT counts each person once." }),
  }),
  lab({
    id: "py13-segments", module: "sql-for-analysts", title: "Repeat or one-time customers", required: true,
    objective: "Segment customers with aggregation and CASE.",
    scenario: "For every user who has ordered, show `user_id`, `orders` (count), `spend` (sum of amount) and `segment`: 'repeat' if they placed 2 or more orders, otherwise 'one-time'. Sort by spend descending, then user_id.",
    steps: ["Group the orders by user_id.", "Add the CASE on COUNT(*) for the segment.", "Sort by spend descending, then user_id."],
    solution: "SELECT user_id, COUNT(*) AS orders, SUM(amount) AS spend, CASE WHEN COUNT(*) >= 2 THEN 'repeat' ELSE 'one-time' END AS segment FROM orders GROUP BY user_id ORDER BY spend DESC, user_id",
    checks: qc({ solution: "SELECT user_id, COUNT(*) AS orders, SUM(amount) AS spend, CASE WHEN COUNT(*) >= 2 THEN 'repeat' ELSE 'one-time' END AS segment FROM orders GROUP BY user_id ORDER BY spend DESC, user_id", uses: [["\\bcase\\b", "CASE"]], ordered: true, explain: "A CASE can use an aggregate: after GROUP BY user_id, COUNT(*) is the number of orders for that user." }),
  }),
  lab({
    id: "py14-dupes", module: "sql-for-analysts", title: "How many duplicate events?", required: false, level: "challenge", minutes: 12, xp: 50,
    objective: "Detect duplicate rows when the id differs.",
    scenario: "Some events were logged twice with different ids. Two events are duplicates when they have the same user_id, event_type and event_date. Return one row with `duplicate_rows`: the number of extra rows (total rows minus the number of distinct combinations).",
    steps: ["Build a key for each row with || between the three columns (add a separator such as '-').", "COUNT(*) counts all rows; COUNT(DISTINCT key) counts unique ones.", "Subtract."],
    solution: "SELECT COUNT(*) - COUNT(DISTINCT user_id || '-' || event_type || '-' || event_date) AS duplicate_rows FROM events",
    checks: qc({ solution: "SELECT COUNT(*) - COUNT(DISTINCT user_id || '-' || event_type || '-' || event_date) AS duplicate_rows FROM events", uses: [["count\\s*\\(\\s*distinct", "COUNT(DISTINCT ...)"]], explain: "DISTINCT on the combined key counts each (user, type, date) once, so the difference from COUNT(*) is the number of repeated rows." }),
  }),

  /* ------------------------------------------------------------------ module 5 */
  classifyLab({
    id: "py15-charts", module: "eda-and-statistics", title: "Which chart answers it?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_STATS], required: true,
    objective: "Choose the chart that fits the question.",
    scenario: "The question decides the chart. Pick the one that answers each question best.",
    steps: ["Read the question.", "Choose Histogram, Bar chart, Line chart, Scatter plot or Heatmap.", "Press Check my work."],
    categories: [["hist", "Histogram"], ["bar", "Bar chart"], ["line", "Line chart"], ["scatter", "Scatter plot"], ["heat", "Correlation heatmap"]],
    items: [
      ["How are order values spread: are most small with a few huge ones?", "hist", "A histogram shows the distribution of one numeric column."],
      ["Which source brings the most revenue?", "bar", "A sorted bar chart compares categories."],
      ["How has weekly revenue changed over the last year?", "line", "A line shows change over time."],
      ["Do users who visit more often also order more?", "scatter", "A scatter plot shows the relationship between two numeric columns."],
      ["Which of the twelve numeric columns move together?", "heat", "A correlation heatmap shows many pairwise correlations at once."],
      ["How do the cities compare on average order value?", "bar", "Comparing categories calls for bars."],
      ["Is daily traffic higher on weekends?", "line", "Daily values over time; a line (or a bar by weekday) shows the pattern."],
      ["Are there unusually high order values?", "hist", "A histogram (or box plot) reveals the tail."],
    ],
  }),
  lab({
    id: "py16-corr", module: "eda-and-statistics", title: "Correlation by hand in SQL", required: true, level: "challenge", minutes: 25, xp: 90, skills: [SK_STATS],
    objective: "Compute a Pearson correlation from sums, and say what it does and does not show.",
    scenario: "For every user who has ordered, let x be the number of orders and y the total spend. Return one row with `r`, the correlation between x and y, rounded to two decimals, using r = (n·Σxy − Σx·Σy) / √((n·Σx² − (Σx)²) · (n·Σy² − (Σy)²)).",
    steps: ["In a CTE compute x (COUNT(*)) and y (SUM(amount)) for each user.", "In the main query take n = COUNT(*), Σx, Σy, Σxy, Σx² and Σy² over those rows.", "Put them into the formula with SQRT, and ROUND to 2 decimals."],
    solution: "WITH u AS (SELECT user_id, COUNT(*) AS x, SUM(amount) AS y FROM orders GROUP BY user_id) SELECT ROUND((COUNT(*) * SUM(x * y) - SUM(x) * SUM(y)) / SQRT((COUNT(*) * SUM(x * x) - SUM(x) * SUM(x)) * (COUNT(*) * SUM(y * y) - SUM(y) * SUM(y))), 2) AS r FROM u",
    checks: qc({ solution: "WITH u AS (SELECT user_id, COUNT(*) AS x, SUM(amount) AS y FROM orders GROUP BY user_id) SELECT ROUND((COUNT(*) * SUM(x * y) - SUM(x) * SUM(y)) / SQRT((COUNT(*) * SUM(x * x) - SUM(x) * SUM(x)) * (COUNT(*) * SUM(y * y) - SUM(y) * SUM(y))), 2) AS r FROM u", uses: [["sqrt\\s*\\(", "SQRT"]], explain: "Per-user x and y come first; then Pearson's formula needs only n and five sums. An r near 0 means there is little straight-line relationship between how many orders a user placed and how much they spent in this data; an r near 1 would mean users who order more also spend more. Either way, correlation alone does not show a cause." }),
  }),

  /* ------------------------------------------------------------------ module 6 */
  classifyLab({
    id: "py17-practice", module: "analysis-in-practice", title: "Good practice or risk?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_COMM], required: true,
    objective: "Recognise safe and risky habits in analysis work.",
    scenario: "Professional analysts follow habits that keep their work correct and safe. Decide which of these are good practice and which are risks.",
    steps: ["Read each habit.", "Choose Good practice or Risk.", "Press Check my work."],
    categories: [["good", "Good practice"], ["risk", "Risk"]],
    items: [
      ["Pass a date to a query as a parameter", "good", "Parameters are treated as data and prevent SQL injection."],
      ["Build a query by pasting a user's text into the SQL string", "risk", "Pasted text can change the query: SQL injection."],
      ["Restart the notebook and run all cells before sharing it", "good", "It proves the notebook runs top to bottom."],
      ["Commit an API key to the project's Git repository", "risk", "Secrets must never be committed."],
      ["Replace customer names with anonymous ids before analysis", "good", "It minimises personal data."],
      ["Publish a result for a group of two customers", "risk", "Small groups can identify individuals."],
      ["Write down what 'active user' means in a data dictionary", "good", "Shared definitions prevent confusion."],
      ["Fix a wrong number by typing over it in the exported file", "risk", "Manual edits cannot be reproduced; fix the rule or the query instead."],
    ],
  }),
  lab({
    id: "cap-py-report", module: "capstone", title: "The signup-month growth report", required: true, level: "challenge", minutes: 30, xp: 120, skills: [SK_ANALYSIS],
    objective: "Combine joins, distinct counts, conditional logic and rates in one report.",
    scenario: "The founders want a growth report by signup month (as text like '2025-03', from the first seven characters of signup_date). For each month show `month`, `users` (users who signed up), `buyers` (users who placed at least one order), `conversion_pct` (buyers as a percentage of users, one decimal) and `revenue` (total order amount from those users, 0 if none). Sort by month.",
    steps: ["LEFT JOIN orders onto users so users without orders still count.", "users = COUNT(DISTINCT u.id), buyers = COUNT(DISTINCT o.user_id).", "revenue = COALESCE(SUM(o.amount), 0); conversion = 100.0 * buyers / users, rounded to 1 decimal."],
    solution: "SELECT SUBSTR(u.signup_date, 1, 7) AS month, COUNT(DISTINCT u.id) AS users, COUNT(DISTINCT o.user_id) AS buyers, ROUND(100.0 * COUNT(DISTINCT o.user_id) / COUNT(DISTINCT u.id), 1) AS conversion_pct, COALESCE(SUM(o.amount), 0) AS revenue FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY SUBSTR(u.signup_date, 1, 7) ORDER BY month",
    checks: qc({ solution: "SELECT SUBSTR(u.signup_date, 1, 7) AS month, COUNT(DISTINCT u.id) AS users, COUNT(DISTINCT o.user_id) AS buyers, ROUND(100.0 * COUNT(DISTINCT o.user_id) / COUNT(DISTINCT u.id), 1) AS conversion_pct, COALESCE(SUM(o.amount), 0) AS revenue FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY SUBSTR(u.signup_date, 1, 7) ORDER BY month", uses: [["left\\s+join", "a LEFT JOIN"], ["count\\s*\\(\\s*distinct", "COUNT(DISTINCT ...)"], ["coalesce", "COALESCE"]], ordered: true, explain: "The LEFT JOIN repeats a user once per order, so users and buyers must be counted with DISTINCT; COALESCE turns the NULL revenue of months with no orders into 0." }),
  }),
  wordLab({
    id: "cap-py-memo", module: "capstone", title: "Write the founders' memo", level: "challenge", minutes: 20, xp: 80, skills: [SK_COMM], required: true,
    objective: "Turn the report into a message the founders can act on.",
    scenario: "Write the memo for the founders: lead with the answer, give the evidence, state a limit of the data and recommend an action.",
    steps: ["Add a heading as the memo title and a second heading, 'Evidence'.", "Write a summary paragraph that starts with the answer.", "List at least three pieces of evidence as bullets, each with its definition.", "Write a final paragraph that begins with the word Recommendation, and include a sentence about a limit of the data."],
    html: "<p><br></p>",
    checks: [
      ck("title", "The memo has a heading", "Use the heading style for the memo title.", "A heading tells the reader what the memo is about.", W.heading(1)),
      ck("two", "There are at least two headings (title and Evidence)", "Add an Evidence heading above the list.", "Headings help a busy reader find the evidence.", W.heading(2)),
      ck("para", "There are at least two paragraphs", "Write a summary and a recommendation paragraph.", "Prose connects numbers to a decision.", W.paragraphs(2, 12)),
      ck("list", "The evidence is a list of at least three points", "Use the bullet list button.", "A short list makes evidence easy to scan.", W.list(3, "ul")),
      ck("rec", "It contains a recommendation", "Start the last paragraph with Recommendation.", "A finding without an action is half the work.", W.contains("Recommendation")),
      ck("limit", "It states a limit of the data", "Include the word limit or limitation and say what the data cannot show.", "Honest analysis says what the numbers cannot tell you.", W.pattern("limit", "a sentence about a limit of the data")),
    ],
    solution: "<h1>Growth by signup month, January to June 2025</h1><p>Conversion from signup to first order is uneven across months, so the next experiment should target the weakest month's onboarding.</p><h2>Evidence</h2><ul><li>Users means people who signed up in the month.</li><li>Buyers means users with at least one order, so conversion is buyers divided by users.</li><li>Revenue is the total order amount from those users, in rupees.</li></ul><p>One limit: each month has only six users, so a percentage can move a lot with one person.</p><p>Recommendation: repeat this report after three more months of data before changing the onboarding flow.</p>",
  }),
];
