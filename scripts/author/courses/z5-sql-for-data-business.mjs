import { capstone, course } from "../kit.mjs";
import { labs, SK_ANALYSIS, SK_SQL } from "../parts/sq-labs.mjs";
import { M1, M2, M3 } from "../parts/sq-m1-3.mjs";
import { M4, M5, M6 } from "../parts/sq-m4-6.mjs";

export default course({
  slug: "sql-for-data-business", title: "SQL for Data & Business", tagline: "Write real SQL in your browser: from your first SELECT to joins, windows and a business analysis", level: "Beginner to Intermediate", hours: 20,
  summary: "Learn SQL the way analysts use it. Every lesson has a live SQL window and every module has labs that run your query on a retail database right in the browser and tell you what is wrong. You start with tables and SELECT, then shape data, summarise it, join tables, break problems into steps, and finish with window functions, a channel scorecard and a written memo.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: a channel scorecard and a memo", summary: "Build one analysis with joins, a CTE and window functions, write the memo that explains it, and pass the final assessment.",
    intro: "You can now read tables, filter and shape data, summarise it, join tables without inflating totals, structure a query in steps and use window functions. In this final project you play the analyst for Kiran Stores. First build the channel scorecard in the SQL lab: orders, revenue, each channel's share of revenue and its rank. Then, in the document lab, write the one-page memo that explains the result to a manager. Finally take the assessment, which covers the whole course.",
    steps: ["Work through the **Channel scorecard** lab: join three tables, count distinct orders, compute a share with a window and rank the channels.", "Reconcile: do the three revenues add up to the total you get from a simple query? Does each order count once?", "Write the **findings memo**: answer first, evidence as a list, one limit of the data, and a recommendation.", "Take the final assessment below."], projectTitle: "Channel scorecard and findings memo",
    quiz: [
      ["Which clause keeps only rows that meet a condition before grouping?", ["HAVING", "WHERE", "ORDER BY", "LIMIT"], 1, "WHERE filters rows; HAVING filters groups."],
      ["A condition `city <> 'Pune'` on a customer whose city is NULL:", ["Is true", "Is unknown, so the row is dropped", "Is an error", "Is false but kept"], 1, "A comparison with NULL is unknown."],
      ["Which counts each customer once?", ["COUNT(*)", "COUNT(customer_id)", "COUNT(DISTINCT customer_id)", "SUM(customer_id)"], 2, "DISTINCT inside COUNT removes repeats."],
      ["A CASE with no ELSE and no match returns:", ["0", "NULL", "An empty string", "An error"], 1, "Unmatched rows become NULL."],
      ["Joining orders to order items and summing an order-level shipping fee gives a total that is:", ["Correct", "Inflated, because each order repeats once per item", "Halved", "Always zero"], 1, "This is the fan-out."],
      ["Which finds customers with no orders?", ["INNER JOIN", "LEFT JOIN ... WHERE o.id IS NULL", "CROSS JOIN", "UNION"], 1, "Unmatched rows have NULLs on the right."],
      ["WHERE on the right table of a LEFT JOIN usually:", ["Keeps unmatched rows", "Removes unmatched rows and acts like an inner join", "Is ignored", "Adds rows"], 1, "NULLs fail the condition."],
      ["NOT IN (subquery) is risky because:", ["It is slow", "A NULL in the list makes it return no rows", "It only works with text", "It sorts the data"], 1, "Use NOT EXISTS instead."],
      ["Which gives each row its city's total without collapsing rows?", ["GROUP BY city", "SUM(amount) OVER (PARTITION BY city)", "HAVING SUM(amount)", "DISTINCT city"], 1, "A window function keeps every row."],
      ["To keep the top 2 rows per group you:", ["LIMIT 2", "Rank with PARTITION BY in a CTE and filter rn <= 2", "ORDER BY twice", "GROUP BY twice"], 1, "Window results are filtered in an outer query."],
      ["LAG(revenue) in the first row returns:", ["0", "NULL", "The revenue", "An error"], 1, "There is no previous row."],
      ["Before reporting a number you should:", ["Round it", "Define it and reconcile it with another calculation", "Make a chart", "Hide the NULLs"], 1, "Definitions and reconciliation make a number trustworthy."],
      ["For a half-open date range of March 2025 you write:", ["BETWEEN '2025-03-01' AND '2025-03-31'", ">= '2025-03-01' AND < '2025-04-01'", "= 'March'", "LIKE '%03%'"], 1, "It never misses the end of the month."],
      ["UNION ALL differs from UNION because it:", ["Sorts the result", "Keeps duplicate rows", "Needs more columns", "Joins tables"], 1, "UNION removes duplicates."],
    ],
  }),
  labs,
  skills: [{ id: SK_SQL, label: "SQL querying" }, { id: SK_ANALYSIS, label: "Analysis and communication" }],
  badges: [
    { id: "first-query", title: "First query", description: "Selected, filtered and sorted real data, and handled NULL.", when: { all: ["sq2-pune", "sq4-nocity"] } },
    { id: "data-shaper", title: "Data shaper", description: "Calculated, labelled and cleaned columns.", when: { all: ["sq5-tidy-products", "sq6-march"] } },
    { id: "summariser", title: "Summariser", description: "Grouped, counted and filtered groups.", when: { all: ["sq9-summary-row", "sq10-by-channel", "sq11-repeat"] } },
    { id: "join-master", title: "Join master", description: "Joined tables, found missing rows and revenue by category.", when: { all: ["sq13-orders-names", "sq14-never-ordered", "sq15-category-revenue"] } },
    { id: "step-by-step", title: "Step by step", description: "Used a subquery and a CTE to build an analysis.", when: { all: ["sq18-above-avg", "sq19-top-customers"] } },
    { id: "window-pro", title: "Window pro", description: "Ranked within groups and built a running total.", when: { all: ["sq21-top-product", "sq22-running"] } },
    { id: "business-analyst", title: "Business analyst", description: "Built the channel scorecard and wrote the findings memo.", when: { all: ["cap-sq-channels", "cap-sq-memo"] } },
  ],
  landing: {
    hero: { eyebrow: "Live SQL in your browser · Nothing to install", title: "SQL for Data & Business", subtitle: "Learn SQL by writing it. A real query window in every lesson, a retail database to analyse, and labs that run your query and explain what is wrong.", level: "Beginner to Intermediate", outcomeLine: "After this course you can answer business questions from a database with joins, aggregates, CTEs and window functions, and explain what the numbers mean." },
    outcomes: [
      { icon: "table", title: "Query with confidence", text: "SELECT, WHERE, ORDER BY, LIMIT and the way NULL really behaves." },
      { icon: "calc", title: "Shape and clean data", text: "Expressions, CASE, dates, COALESCE and safe division." },
      { icon: "chart", title: "Summarise at scale", text: "COUNT, SUM, AVG, GROUP BY, HAVING and conditional totals." },
      { icon: "link", title: "Join without errors", text: "INNER and LEFT joins, anti-joins and spotting a fan-out before it inflates a total." },
      { icon: "steps", title: "Structure hard questions", text: "Subqueries, CTEs, UNION, INTERSECT and EXCEPT in readable steps." },
      { icon: "doc", title: "Analyse and explain", text: "Rank, running totals, growth, share of total, and a memo a manager can act on." },
    ],
    projects: [
      { title: "Interview the store", text: "Choose columns, filter rows and handle missing cities.", module: "meet-the-database" },
      { title: "Price list with GST and bands", text: "Calculated columns, CASE and date ranges.", module: "shape-the-data" },
      { title: "The weekly sales report", text: "Counts, groups, HAVING and a conditional rate.", module: "aggregate-and-group" },
      { title: "Who bought what", text: "Joins across four tables and a fan-out repair.", module: "combine-with-joins" },
      { title: "Top customers in named steps", text: "A CTE, a subquery and a set operation.", module: "subqueries-and-ctes" },
      { title: "Channel scorecard and memo", text: "Joins, a CTE, a window and a written finding.", module: "capstone" },
    ],
    tools: [
      { icon: "sql", title: "Live SQL window", text: "Run queries in the lesson and in labs. Plain-language errors, a schema panel, and results in a grid." },
      { icon: "check", title: "Checks that explain", text: "Each lab checks that your query runs, uses the right idea and returns the right rows." },
      { icon: "doc", title: "Document lab", text: "Write the findings memo in a real editor with headings and lists." },
    ],
    assessment: ["Finish the required labs in each module: they run your query and explain what is wrong.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Build the channel scorecard, write the memo and pass the final assessment to finish the course."],
    faq: [
      { q: "Do I need to install a database?", a: "No. The practice window runs a SQL engine in your browser on built-in tables. Your queries never leave your device." },
      { q: "Which SQL dialect is this?", a: "A common core that works in MySQL, PostgreSQL, SQL Server and SQLite. The lessons point out where dialects differ, such as date functions. The practice window supports SELECT queries only, so you cannot damage anything." },
      { q: "Do I need any experience?", a: "No. The course starts from what a table is. Comfort with a spreadsheet helps." },
      { q: "What is not covered here?", a: "Creating or changing tables (INSERT, UPDATE, DELETE, CREATE), indexes and query tuning are mentioned but not practised, because the practice window is read-only. They are the next step after this course." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile." },
    ],
  },
  catalogue: {
    hours: "~20 hrs", weeks: "~5 weeks", pace: "4 hrs/wk", badge: "SQL Analyst",
    brief: "Learn SQL in your browser: SELECT, joins, grouping, CTEs and window functions on a retail database, with a live query window in every lesson.",
    learn: ["Tables, keys and how NULL really behaves", "Expressions, CASE, dates and cleaning data in a query", "COUNT, SUM, AVG, GROUP BY, HAVING and conditional rates", "INNER and LEFT joins, anti-joins and avoiding a fan-out", "Subqueries, CTEs, UNION, INTERSECT and EXCEPT", "Window functions: ranking, running totals, growth and share of total"],
    handsOn: "Build a channel scorecard for a retailer with joins, a CTE and window functions, then write the memo that explains it.",
    outcome: "Answer business questions from a relational database with confidence and explain the numbers clearly.",
  },
});
