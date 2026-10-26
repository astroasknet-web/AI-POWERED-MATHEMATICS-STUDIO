import { capstone, course } from "../kit.mjs";
import { labs, SK_ANALYSIS, SK_COMM, SK_FLOW, SK_STATS, SK_TABLES } from "../parts/py-labs.mjs";
import { M1, M2, M3 } from "../parts/py-m1-3.mjs";
import { M4, M5, M6 } from "../parts/py-m4-6.mjs";

export default course({
  slug: "data-analytics-python-sql", title: "Data Analytics with Python & SQL", tagline: "The analyst's workflow: SQL for the data, pandas thinking for the analysis, and a clear story at the end", level: "Intermediate", hours: 24,
  summary: "Learn how an analyst works from question to decision. You practise the SQL side live in your browser on a shop's users, events and orders: funnels, cohort retention, segmentation, deduplication and a growth report. The Python side (pandas, plotting, statistics, pipelines) is taught with annotated code, each idea paired with its SQL equivalent, for you to run in a free notebook such as Google Colab. Python does not run in this browser, so the labs use SQL and sorting activities, and the final project is a SQL report and a written memo.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: the growth report and the founders' memo", summary: "Build a growth report from three tables in SQL, write the memo that explains it, and pass the final assessment.",
    intro: "You can now take a question through the workflow, use pandas ideas and their SQL equivalents, build funnels and cohorts, and reason about uncertainty and bias. In this final project you play the analyst for ShopLens, a small online shop. First build the signup-month growth report in the SQL lab: users, buyers, conversion and revenue per signup month. Then, in the document lab, write the memo that explains it to the founders, with the answer first, the evidence, a limit of the data and a recommendation. Finally take the assessment, which covers the whole course.",
    steps: ["Work through the **Growth report** lab: a LEFT JOIN, distinct counts, a conversion rate and revenue with COALESCE.", "Reconcile: do the monthly users add up to all users, and the monthly revenue to the total order amount?", "Write the **founders' memo**: answer first, evidence as a list, one limit and a recommendation.", "Take the final assessment below."], projectTitle: "Growth report and founders' memo",
    quiz: [
      ["Which step of the analysis workflow comes first?", ["Clean", "Ask", "Communicate", "Get"], 1, "Start from the question and the decision."],
      ["Where should heavy filtering of a huge table happen?", ["In pandas after loading it all", "In the database with SQL", "In a chart", "In the memo"], 1, "Move as little data as possible."],
      ["The pandas expression `df[(df.a > 1) & (df.b == 2)]` corresponds to:", ["JOIN", "WHERE a > 1 AND b = 2", "ORDER BY", "UNION"], 1, "A Boolean mask is a filter."],
      ["`groupby` with `agg` corresponds to:", ["GROUP BY with aggregates", "JOIN", "DISTINCT", "LIMIT"], 0, "Split, apply a summary, combine."],
      ["pandas `merge(..., validate=\"one_to_many\")` helps you to:", ["Draw charts", "Catch a fan-out by checking key uniqueness", "Sort", "Fill gaps"], 1, "It raises an error if the left key repeats."],
      ["A funnel should count:", ["Events", "Distinct users per step", "Rows", "Columns"], 1, "People, not events."],
      ["Why compare cohorts at the same age?", ["Speed", "Different ages are not comparable", "SQL requires it", "Style"], 1, "Like with like."],
      ["Keeping the latest record per email is done with:", ["DISTINCT", "ROW_NUMBER() OVER (PARTITION BY email ORDER BY updated_at DESC) = 1", "LIMIT 1", "GROUP BY id"], 1, "Number the records in each group and keep the first."],
      ["The standard error of the mean is:", ["s × √n", "s ÷ √n", "s ÷ n", "n ÷ s"], 1, "It falls with the square root of n."],
      ["A 95% confidence interval is about:", ["mean ± 1.96 × SE", "mean ± SE ÷ 2", "mean × 1.96", "median ± 1"], 0, "For a large, roughly bell-shaped sample."],
      ["Studying only successful companies is an example of:", ["Random sampling", "Survivorship bias", "A funnel", "A cohort"], 1, "The failures are missing."],
      ["Passing a value to a query as a parameter prevents:", ["Slow queries", "SQL injection", "Duplicates", "NULLs"], 1, "The value is treated purely as data."],
      ["A reproducible notebook:", ["Needs cells run in a special order", "Runs top to bottom after a restart", "Has hidden variables", "Holds passwords"], 1, "Order and hidden state break reproducibility."],
      ["A strong finding includes:", ["Only a chart", "The answer, evidence, limits and a recommendation", "Only the method", "A long story"], 1, "Decision makers need all four."],
    ],
  }),
  labs,
  skills: [{ id: SK_FLOW, label: "Analytics workflow" }, { id: SK_TABLES, label: "pandas and SQL thinking" }, { id: SK_ANALYSIS, label: "SQL for analysis" }, { id: SK_STATS, label: "Exploration and statistics" }, { id: SK_COMM, label: "Communication and practice" }],
  badges: [
    { id: "workflow-ready", title: "Workflow ready", description: "Knows the analysis stages and profiled a table.", when: { all: ["py1-stages", "py3-profile"] } },
    { id: "table-thinker", title: "Table thinker", description: "Translated pandas ideas to SQL, filtered and counted gaps.", when: { all: ["py4-translate", "py5-target", "py6-missing"] } },
    { id: "group-and-join", title: "Group and join", description: "Summarised by group, found unmatched rows and pivoted.", when: { all: ["py7-source", "py8-never", "py9-pivot"] } },
    { id: "growth-analyst", title: "Growth analyst", description: "Built a funnel, a retention table and customer segments.", when: { all: ["py11-funnel", "py12-retention", "py13-segments"] } },
    { id: "chart-and-stats", title: "Chart and stats", description: "Chose charts and computed a correlation by hand.", when: { all: ["py15-charts", "py16-corr"] } },
    { id: "practice-pro", title: "Safe and reproducible", description: "Knows safe, reproducible and responsible habits.", when: { all: ["py17-practice"] } },
    { id: "data-analyst-ps", title: "Data analyst", description: "Built the growth report and wrote the founders' memo.", when: { all: ["cap-py-report", "cap-py-memo"] } },
  ],
  landing: {
    hero: { eyebrow: "Live SQL labs in your browser · Python for your own notebook", title: "Data Analytics with Python & SQL", subtitle: "Work like an analyst: ask the right question, pull the data with SQL, think in pandas, explore, test and tell the story.", level: "Intermediate", outcomeLine: "After this course you can take a business question through a full analysis and present a result people will act on." },
    outcomes: [
      { icon: "flow", title: "Run the workflow", text: "Ask, get, clean, analyse and communicate, with a clear question and defined metrics." },
      { icon: "table", title: "Think in tables", text: "DataFrames, filters, new columns, missing data and duplicates, with the SQL for each." },
      { icon: "group", title: "Group, join, reshape", text: "groupby, merge, pivot, melt and window ideas, side by side with SQL." },
      { icon: "funnel", title: "Answer growth questions", text: "Funnels, cohort retention, RFM segments and deduplication in SQL." },
      { icon: "chart", title: "Explore and reason", text: "EDA, honest charts, confidence intervals and the traps of bias and confounding." },
      { icon: "doc", title: "Work professionally", text: "Parameterised queries, reproducible notebooks, privacy and a finding-first memo." },
    ],
    projects: [
      { title: "Profile the shop's users", text: "A profiling query for size, span and sources.", module: "the-analytics-workflow" },
      { title: "Find the users to target", text: "Combine conditions and count the gaps.", module: "pandas-thinking" },
      { title: "Revenue by source and a pivot", text: "Join, group and pivot with conditional aggregation.", module: "group-merge-reshape" },
      { title: "Funnel, retention and segments", text: "The three analyses behind every growth team.", module: "sql-for-analysts" },
      { title: "Correlation by hand", text: "Compute and interpret a correlation from sums.", module: "eda-and-statistics" },
      { title: "Growth report and memo", text: "A full report from three tables and a written finding.", module: "capstone" },
    ],
    tools: [
      { icon: "sql", title: "Live SQL window", text: "Run queries in lessons and labs on a shop dataset, with plain-language errors." },
      { icon: "sort", title: "Sort and decide", text: "Short activities that translate pandas to SQL and choose the right chart." },
      { icon: "doc", title: "Document lab", text: "Write the findings memo in a real editor." },
    ],
    assessment: ["Finish the required labs in each module: they run your query and explain what is wrong.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Build the growth report, write the memo and pass the final assessment to finish the course."],
    faq: [
      { q: "Does the Python code run here?", a: "No. The SQL windows and labs run in your browser, but Python does not. The Python lessons are annotated code with the SQL equivalent beside it, and you run the code in a free notebook such as Google Colab, which needs no installation. The labs practise the same logic in SQL." },
      { q: "Do I need to know Python or SQL first?", a: "No. The course teaches the Python essentials. If you have never written SQL, the SQL for Data & Business course in this category is a good first step, and this course builds on it." },
      { q: "Which libraries does it cover?", a: "pandas for tables, matplotlib and seaborn for charts, and numpy for the basic statistics. Machine learning is not covered; see the Machine Learning with Python course." },
      { q: "How long does it take?", a: "About 24 hours at a relaxed pace, in short sessions." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile." },
    ],
  },
  catalogue: {
    hours: "~24 hrs", weeks: "~6 weeks", pace: "4 hrs/wk", badge: "Data Analyst",
    brief: "The analyst's workflow with SQL and pandas thinking: funnels, cohorts, segments, EDA, statistics and a finding-first memo, with live SQL labs in the browser.",
    learn: ["The analysis workflow from question to decision", "Python essentials and pandas: select, filter, create, clean", "groupby, merge, pivot and window ideas, each paired with SQL", "Funnels, cohort retention, RFM segmentation and deduplication in SQL", "EDA, honest charts, confidence intervals, bias and Simpson's paradox", "Parameterised queries, reproducible notebooks, privacy and communicating results"],
    handsOn: "Build a signup-month growth report for an online shop in SQL and write the memo that explains it.",
    outcome: "Take a business question through a complete analysis and present a result people will act on.",
  },
});
