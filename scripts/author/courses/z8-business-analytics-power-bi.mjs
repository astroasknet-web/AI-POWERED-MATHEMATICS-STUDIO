import { capstone, course } from "../kit.mjs";
import { labs, SK_BI, SK_DAX, SK_MODEL, SK_REPORT, SK_TIME } from "../parts/pb-labs.mjs";
import { M1, M2, M3 } from "../parts/pb-m1-3.mjs";
import { M4, M5, M6 } from "../parts/pb-m4-6.mjs";

export default course({
  slug: "business-analytics-power-bi", title: "Business Analytics with Power BI", tagline: "Learn the part of Power BI that decides whether the numbers are right: the model and DAX, with a live DAX window in your browser", level: "Intermediate", hours: 26,
  summary: "Learn Power BI the way it is really built: a clean star-schema model, measures in DAX, and reports that people can read. Every DAX lesson and lab has a live DAX window that evaluates your measures on a real model in a matrix like Power BI's, with filter context, CALCULATE, relationships and time intelligence. Power BI Desktop itself is a Windows application and does not run in a browser, so the Power Query, report-design and Service lessons are explained with scenarios and checked with sorting and writing activities.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: the executive scorecard and a report design brief", summary: "Write the scorecard measure that combines growth and margin, write the design brief for the report, and pass the final assessment.",
    intro: "You can now explain the Power BI workflow, design a star-schema model with a date table, write measures with SUMX, CALCULATE and time intelligence, and make design and sharing decisions. In this final project you play the BI developer for Kiran Stores. First build the **Scorecard** measure in the DAX lab: it gives each region and year one status word using growth against last year and margin. Then, in the document lab, write a one-page report design brief with the audience, the question, the visuals, the refresh and the row-level security. Finally take the assessment, which covers the whole course.",
    steps: ["Work through the **Executive scorecard** lab: variables, SAMEPERIODLASTYEAR growth, a margin ratio and SWITCH(TRUE()).", "Check the scorecard against the matrices of growth and margin: does each word follow the rules?", "Write the **report design brief**: audience, visuals, refresh and security.", "Take the final assessment below."], projectTitle: "Executive scorecard and report design brief",
    quiz: [
      ["The BI workflow is:", ["Share, model, get data", "Get, transform, model, visualise, share", "Visualise only", "Model, then get data"], 1, "Data first, sharing last."],
      ["Import mode:", ["Copies data into a fast in-memory engine", "Queries the source live", "Needs no refresh", "Cannot use DAX"], 0, "It is the default and supports everything."],
      ["In a star schema filters flow:", ["From many to one", "From the one side (dimension) to the many side (fact)", "Both ways always", "Nowhere"], 1, "A dimension filter reaches the fact table."],
      ["A proper date table:", ["Has gaps", "Has one row per day without gaps and is marked as the date table", "Contains only sales days", "Is hidden"], 1, "Time intelligence needs it."],
      ["A measure is calculated:", ["Once at refresh", "For each cell, using the cell's filters", "Never", "Only in totals"], 1, "Measures respond to filter context."],
      ["The total row of a ratio measure is:", ["The sum of the cells", "The measure with fewer filters", "Always 100%", "Blank"], 1, "A total is a smaller filter context."],
      ["Which needs an iterator such as SUMX?", ["Adding one column", "Quantity times price on each row", "Counting rows", "Sorting"], 1, "A calculation per row."],
      ["CALCULATE([Total Sales], Products[Category] = \"Home\") in the Stationery row shows:", ["0", "Home's sales", "Stationery's sales", "An error"], 1, "The filter replaces the category."],
      ["The denominator of percent of total usually uses:", ["The row's filters", "ALL on the table being split", "SUM", "FILTER"], 1, "It must ignore the row filter."],
      ["SAMEPERIODLASTYEAR needs:", ["No date table", "A continuous date table's Date column", "A text column", "A relationship to Products"], 1, "Use Dates[Date]."],
      ["Which is best for comparing a few categories?", ["A 3D pie", "A sorted bar chart", "A gauge", "A map"], 1, "Bars compare lengths accurately."],
      ["Publish to web:", ["Is safe for company data", "Makes a report public to anyone with the link", "Applies row-level security", "Needs a gateway"], 1, "Only for public data."],
      ["A row-level security role is defined with:", ["A DAX filter expression on a table", "A pie chart", "A bookmark", "A gateway"], 0, "It filters a dimension table."],
      ["Workspace Admins, Members and Contributors:", ["Are restricted by RLS", "Can see all data, bypassing RLS", "Cannot publish", "See nothing"], 1, "Test RLS as a viewer."],
    ],
  }),
  labs,
  skills: [{ id: SK_BI, label: "BI concepts" }, { id: SK_MODEL, label: "Data modelling" }, { id: SK_DAX, label: "DAX" }, { id: SK_TIME, label: "Time intelligence" }, { id: SK_REPORT, label: "Report design and governance" }],
  badges: [
    { id: "bi-foundations", title: "BI foundations", description: "Knows Power BI's parts and storage modes.", when: { all: ["pb1-parts", "pb2-storage"] } },
    { id: "model-builder", title: "Model builder", description: "Classified a star schema, spotted model problems and wrote a first measure.", when: { all: ["pb3-fact-dim", "pb4-model-problems", "pb5-total-margin"] } },
    { id: "dax-writer", title: "DAX writer", description: "Wrote ratio, iterator and variable measures.", when: { all: ["pb6-margin-pct", "pb7-sumx", "pb8-discount-pct"] } },
    { id: "filter-master", title: "Filter master", description: "Changed filters with CALCULATE, ALL and ALLEXCEPT.", when: { all: ["pb10-home", "pb11-share", "pb12-share-cat"] } },
    { id: "time-traveller", title: "Time traveller", description: "Built last-year, year-to-date and growth measures.", when: { all: ["pb13-ly", "pb14-ytd", "pb15-growth"] } },
    { id: "report-designer", title: "Report designer", description: "Chose visuals, spotted design problems and chose how to share.", when: { all: ["pb16-visuals", "pb17-report-problems", "pb18-sharing"] } },
    { id: "bi-developer", title: "BI developer", description: "Built the executive scorecard and wrote the design brief.", when: { all: ["cap-pb-scorecard", "cap-pb-brief"] } },
  ],
  landing: {
    hero: { eyebrow: "Live DAX in your browser · Desktop steps explained", title: "Business Analytics with Power BI", subtitle: "Master the model and the measures: star schemas, filter context, CALCULATE and time intelligence, with a live DAX window and labs that check every measure.", level: "Intermediate", outcomeLine: "After this course you can design a model that gives right answers, write the DAX measures a report needs, and plan a report people can read, share and trust." },
    outcomes: [
      { icon: "flow", title: "Understand the BI workflow", text: "Get, transform, model, visualise, share; Import versus DirectQuery; what Power Query does." },
      { icon: "star", title: "Design a star schema", text: "Facts, dimensions, relationships, filter direction and a proper date table." },
      { icon: "dax", title: "Write DAX measures", text: "Measures versus columns, DIVIDE, SUMX, RELATED and variables." },
      { icon: "filter", title: "Master filter context", text: "CALCULATE, ALL, ALLEXCEPT, percent of total and share within a group." },
      { icon: "time", title: "Compare across time", text: "Year to date, same period last year, growth and a status scorecard." },
      { icon: "report", title: "Design, share and secure", text: "Visual choice, layout, refresh, apps and row-level security." },
    ],
    projects: [
      { title: "Your first measure", text: "Total Margin from two measures, sliced by every dimension.", module: "data-modelling" },
      { title: "Margin % and List Revenue", text: "A safe ratio and an iterator reading a related price.", module: "dax-fundamentals" },
      { title: "Percent of total and share in category", text: "Remove filters with ALL and ALLEXCEPT.", module: "calculate-and-time-intelligence" },
      { title: "Last year, YTD and growth", text: "Time intelligence on a real date table.", module: "calculate-and-time-intelligence" },
      { title: "Who sees what", text: "A row-level security rule as a DAX filter.", module: "publish-secure-and-govern" },
      { title: "Scorecard and design brief", text: "One measure that ranks regions, and a report plan.", module: "capstone" },
    ],
    tools: [
      { icon: "dax", title: "Live DAX window", text: "Write measures and see them in a matrix with totals, on a model with relationships and a date table." },
      { icon: "sort", title: "Sort and decide", text: "Short activities on model design, visuals and sharing." },
      { icon: "doc", title: "Document lab", text: "Write the report design brief in a real editor." },
    ],
    assessment: ["Finish the required labs in each module: the DAX labs compare your measure with the model measure in every visual.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Write the scorecard measure and the design brief, and pass the final assessment to finish the course."],
    faq: [
      { q: "Do I need Power BI Desktop?", a: "No, to do this course. The DAX window runs in your browser on a built-in model. Power BI Desktop is a free Windows application; if you have it, you can repeat the model and DAX exercises there, and the Power Query, report-building and Service lessons describe exactly what to click." },
      { q: "Is the DAX engine the real one?", a: "It is a practice engine that follows DAX's rules for filter context, relationships, CALCULATE, iterators and the core time-intelligence functions, and it says so when you use something it does not support (for example ALLSELECTED, RANKX or USERELATIONSHIP). Measures that run here use real DAX syntax and work in Power BI." },
      { q: "What is not covered hands-on?", a: "Power Query (M), building report pages and the Power BI Service. They are explained with scenarios and practised with sorting and writing activities, because they need the desktop app." },
      { q: "What should I know first?", a: "Comfort with a spreadsheet. SQL for Data & Business or Advanced Excel for Data Analysis in this category help, but are not required." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile. It is not a Microsoft certification." },
    ],
  },
  catalogue: {
    hours: "~26 hrs", weeks: "~6 weeks", pace: "4-5 hrs/wk", badge: "Power BI Analyst",
    brief: "Master the Power BI model and DAX with a live DAX window: star schemas, filter context, CALCULATE and time intelligence, plus report design and sharing.",
    learn: ["The BI workflow, storage modes and what Power Query does", "Star-schema modelling, relationships and a proper date table", "DAX measures, filter context, SUMX, RELATED and variables", "CALCULATE, ALL, ALLEXCEPT, percent of total and share in a group", "Year to date, same period last year and growth", "Report design, workspaces, apps, refresh and row-level security"],
    handsOn: "Write a scorecard measure that combines growth and margin, then write the design brief for the report.",
    outcome: "Design models that give right answers, write the DAX a report needs, and plan reports people can read and trust.",
  },
});
