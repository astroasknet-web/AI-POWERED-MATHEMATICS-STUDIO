import { capstone, course } from "../kit.mjs";
import { labs, SK_COMM, SK_MODEL, SK_PREP, SK_STATS, SK_SUM } from "../parts/ad-labs.mjs";
import { M1, M2, M3 } from "../parts/ad-m1-3.mjs";
import { M4, M5, M6 } from "../parts/ad-m4-6.mjs";

export default course({
  slug: "advanced-excel-data-analysis", title: "Advanced Excel for Data Analysis", tagline: "Clean, describe, summarise, model and present data with formulas you can check", level: "Intermediate", hours: 22,
  summary: "Go beyond formulas to real analysis. Clean messy data, describe it with the right statistics, summarise it like a pivot table, measure relationships and trends, build what-if models and A/B tests, and present the result as a dashboard and a story. Labs run in an in-browser spreadsheet that checks every formula. Power Query, PivotTables, Power Pivot and DAX are explained and mapped to formulas, but they run in desktop Excel, not in this browser.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: analyse a sales workbook and write the memo", summary: "Describe, summarise and test a small sales dataset in the sheet, write the findings memo, and pass the final assessment.",
    intro: "You can now clean data, describe it with the right statistics, summarise it like a pivot table, measure relationships, build a model and present it. In this final project you analyse twelve orders: calculate each order's revenue after discount, total it by region, find the best region and test whether discounts go with higher units. Then you write the one-page memo that explains the result to a sales manager, with the answer first and the limits stated. Finally take the assessment, which covers the whole course.",
    steps: ["Work through the **Analyse the sales workbook** lab: revenue per order, totals by region, the best region and a correlation.", "Reconcile: do the regional totals add up to the total of the revenue column?", "Write the **findings memo**: answer first, evidence as a list, one limit and a recommendation.", "Take the final assessment below."], projectTitle: "Sales analysis and findings memo",
    quiz: [
      ["Which layout is tidy?", ["A column for each month", "One row per observation with one fact per column", "Merged heading cells", "Totals typed inside the data"], 1, "One variable per column, one observation per row."],
      ["Which formula turns \"Rs 850\" into a number?", ["=TRIM(A1)", "=VALUE(SUBSTITUTE(A1,\"Rs \",\"\"))", "=PROPER(A1)", "=LEFT(A1,2)"], 1, "Remove the text, then convert."],
      ["Which statistic is not pulled by one extreme value?", ["Mean", "Median", "Standard deviation", "Range"], 1, "The median is robust."],
      ["The IQR rule flags values above:", ["Q3 + 1.5 × IQR", "The mean", "Q1", "The median + SD"], 0, "That is the upper fence."],
      ["A z-score of 1 means:", ["One below the mean", "One standard deviation above the mean", "The mean", "An error"], 1, "Standard deviations from the mean."],
      ["Mixed references in a cross-tab formula such as $F2 and G$1 allow:", ["Nothing special", "One formula to fill the whole grid", "Faster sorting", "Rounding"], 1, "Each part of the reference locks one direction."],
      ["The correct overall conversion rate across channels is:", ["The average of channel rates", "Total orders ÷ total visits", "The highest rate", "The median"], 1, "Add the numerators and the denominators first."],
      ["Correlation between two columns:", ["Proves one causes the other", "Describes a straight-line association only", "Is always 1", "Needs no chart"], 1, "It does not prove causation."],
      ["Predicting far outside your data is risky because:", ["Excel stops", "The pattern may change there", "The slope is negative", "It is slow"], 1, "You have no evidence outside the range."],
      ["A p-value of 0.125 in an A/B test means:", ["B is better for certain", "The gap could easily be chance", "The test is wrong", "A is better"], 1, "It is above the usual 0.05."],
      ["Break-even units equal:", ["Fixed costs ÷ (price − variable cost)", "Price × units", "Profit ÷ price", "Variable cost × units"], 0, "Each unit contributes price minus variable cost."],
      ["A bar chart should start its axis at:", ["Any value", "Zero", "The minimum", "The average"], 1, "Bar length must be proportional."],
      ["A strong report headline:", ["Names the topic", "States the finding", "Lists methods", "Asks a question"], 1, "Lead with the answer."],
      ["Power Query's main benefit is:", ["Prettier charts", "Recorded steps that re-run on new data", "No need for data", "Faster typing"], 1, "Refresh replays the cleaning."],
    ],
  }),
  labs,
  skills: [{ id: SK_PREP, label: "Data preparation" }, { id: SK_STATS, label: "Descriptive statistics" }, { id: SK_SUM, label: "Summarising data" }, { id: SK_MODEL, label: "Modelling and forecasting" }, { id: SK_COMM, label: "Dashboards and communication" }],
  badges: [
    { id: "data-cleaner", title: "Data cleaner", description: "Cleaned text, numbers and dates and spotted untidy data.", when: { all: ["ad1-clean", "ad2-dates", "ad3-tidy"] } },
    { id: "statistician", title: "Describing data", description: "Profiled a column and built a histogram.", when: { all: ["ad4-profile", "ad5-histogram"] } },
    { id: "pivot-thinker", title: "Pivot thinker", description: "Built a cross-tab, a Pareto and a correct overall rate.", when: { all: ["ad7-crosstab", "ad8-pareto", "ad9-ratio"] } },
    { id: "trend-spotter", title: "Trend spotter", description: "Fitted a line and found the seasons.", when: { all: ["ad10-regression", "ad11-seasonal"] } },
    { id: "decision-maker", title: "Decision maker", description: "Built a break-even model and tested an A/B result.", when: { all: ["ad13-breakeven", "ad14-abtest"] } },
    { id: "dashboard-builder", title: "Dashboard builder", description: "Built a KPI dashboard.", when: { all: ["ad16-kpi"] } },
    { id: "data-analyst", title: "Data analyst", description: "Analysed the sales workbook and wrote the findings memo.", when: { all: ["cap-ad-analysis", "cap-ad-memo"] } },
  ],
  landing: {
    hero: { eyebrow: "In-browser spreadsheet labs · Nothing to install", title: "Advanced Excel for Data Analysis", subtitle: "Analyse data the way analysts do: clean it, describe it, summarise it, test it and tell the story, with labs that check every formula.", level: "Intermediate", outcomeLine: "After this course you can take a messy dataset to a clear, honest recommendation, and explain every number." },
    outcomes: [
      { icon: "clean", title: "Clean and prepare", text: "TRIM, VALUE, SUBSTITUTE, dates, duplicates and tidy data." },
      { icon: "stats", title: "Describe with statistics", text: "Mean, median, standard deviation, quartiles, outliers and z-scores." },
      { icon: "pivot", title: "Summarise like a pivot", text: "Cross-tabs with SUMIFS, Pareto analysis and correct rates." },
      { icon: "trend", title: "Find relationships and trends", text: "Correlation, regression, forecasts, moving averages and seasonality." },
      { icon: "model", title: "Model and decide", text: "Break-even, scenarios, A/B significance and weighted scores." },
      { icon: "dash", title: "Present and persuade", text: "KPI dashboards, honest charts and a finding-first story." },
    ],
    projects: [
      { title: "Clean the customer list", text: "Names, text amounts and dates made analysis-ready.", module: "clean-and-prepare" },
      { title: "Profile the daily sales", text: "Centre, spread, quartiles and an outlier fence.", module: "describe-the-data" },
      { title: "Region by product cross-tab", text: "One SUMIFS formula filling a whole grid.", module: "summarise-like-a-pivot" },
      { title: "Ads and sales: fit a line", text: "Correlation, slope, intercept and a forecast.", module: "relationships-and-trends" },
      { title: "Break-even and an A/B test", text: "A model with inputs and a significance check.", module: "models-and-decisions" },
      { title: "Sales analysis and memo", text: "A full analysis and a one-page findings memo.", module: "capstone" },
    ],
    tools: [
      { icon: "sheet", title: "Spreadsheet lab", text: "A real grid with formulas, ranges and charts, and checks that explain what is missing." },
      { icon: "sort", title: "Sort and decide", text: "Short activities on tidy data and on what a result does and does not show." },
      { icon: "doc", title: "Document lab", text: "Write the findings memo in a real editor." },
    ],
    assessment: ["Finish the required labs in each module: they are checked automatically and explained when something is missing.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Complete the sales analysis, the memo and the final assessment to finish the course."],
    faq: [
      { q: "Do I need Excel installed?", a: "No. The labs run in an in-browser spreadsheet that supports the functions this course uses, including SUMIFS, STDEV.S, QUARTILE, FORECAST and NORM.S.DIST." },
      { q: "Does it cover Power Query, PivotTables and Power Pivot?", a: "They are explained and mapped to the formulas that do the same job, so you understand what they do. They run only in desktop Excel and Power BI, so there is no hands-on lab for them here." },
      { q: "What should I know first?", a: "Basic formulas such as SUM, AVERAGE and IF. If you are new to Excel, start with Basic Microsoft Excel." },
      { q: "How long does it take?", a: "About 22 hours at a relaxed pace, in short sessions." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile." },
    ],
  },
  catalogue: {
    hours: "~22 hrs", weeks: "~5 weeks", pace: "4-5 hrs/wk", badge: "Excel Data Analyst",
    brief: "Clean, describe, summarise, model and present data in Excel, with in-browser labs that check your formulas.",
    learn: ["Clean and prepare data with formulas and tidy-data habits", "Describe data with mean, median, spread, quartiles, outliers and z-scores", "Summarise like a pivot table with SUMIFS cross-tabs and Pareto analysis", "Measure relationships, fit a line and forecast with seasonality", "Build break-even models, scenarios and an A/B significance test", "Design KPI dashboards and write findings people act on"],
    handsOn: "Analyse a small sales dataset end to end and write the one-page memo that explains it.",
    outcome: "Take messy data to a clear, honest recommendation, and explain every number.",
  },
});
