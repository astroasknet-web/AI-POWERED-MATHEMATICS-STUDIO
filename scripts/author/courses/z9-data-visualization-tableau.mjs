import { capstone, course } from "../kit.mjs";
import { labs, SK_BASICS, SK_CALC, SK_CHARTS, SK_DESIGN, SK_GOV } from "../parts/tb-labs.mjs";
import { M1, M2, M3 } from "../parts/tb-m1-3.mjs";
import { M4, M5, M6 } from "../parts/tb-m4-6.mjs";

export default course({
  slug: "data-visualization-tableau", title: "Data Visualization with Tableau", tagline: "Build charts the Tableau way in a live viz builder in your browser: shelves, marks, calculated fields, table calculations and LOD expressions", level: "Intermediate", hours: 24,
  summary: "Learn visual analytics the way Tableau teaches it: fields on shelves, the Marks card, filters, calculated fields, table calculations and level-of-detail expressions, then design, dashboards, data preparation, performance and publishing. A live viz builder in your browser has the same shelves and writes real Tableau calculation syntax, so you build and check the charts yourself. Tableau Desktop is a desktop application and does not run in a browser, so dashboards, actions, Prep, publishing and security are explained with scenarios and checked with sorting and writing activities.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: find the problem and brief the dashboard", summary: "Build the view that shows which sub-categories sell a lot but lose money, write the dashboard brief and findings, and pass the final assessment.",
    intro: "You can now build the core charts, write calculated fields, table calculations and level-of-detail expressions, design for the reader, and describe how data is prepared, speeded up, published and secured. In this final project you play the analyst for Kiran Office Supplies. First, in the viz builder, build the scatter that answers the management question: which sub-categories sell a lot but lose money? Then, in the document lab, write the dashboard brief: the finding, the views, who sees what, a limit of the data and your recommendation. Finally take the assessment, which covers the whole course.",
    steps: ["Work through the **Sales against profit** lab: Sales on Columns, Profit on Rows, Sub-Category on Detail and Category on Color.", "Read the chart and write down which dots sit low and to the right.", "Write the **dashboard brief**: finding, views, access control, a limit and a recommendation.", "Take the final assessment below."], projectTitle: "Profit scatter and dashboard brief",
    quiz: [
      ["A dimension in Tableau is:", ["A number to add up", "A category that groups the data", "A chart", "A colour"], 1, "Dimensions create the groups."],
      ["Blue and green pills mean:", ["Dimension and measure", "Discrete and continuous", "Good and bad", "Filter and sort"], 1, "Colour shows discrete or continuous."],
      ["A measure on each of Columns and Rows gives (Automatic marks):", ["Bars", "A scatter plot", "A pie", "A text table"], 1, "Two measures position each mark on both axes."],
      ["Sorting a bar chart high to low is wrong when:", ["Categories have a natural order such as months", "There are many bars", "Names are long", "Bars are horizontal"], 0, "Preserve natural order."],
      ["Top 5 customers within the East needs:", ["A context filter on Region", "No special setup", "A pie", "A calculated field"], 0, "The region filter must run first."],
      ["The correct overall profit ratio is:", ["The average of row ratios", "SUM(Profit) / SUM(Sales)", "MAX(Profit)", "SUM(Sales) / SUM(Profit)"], 1, "Divide totals."],
      ["You cannot mix in one calculation:", ["Two measures", "Aggregate and non-aggregate values", "Text", "Dates"], 1, "Wrap everything in an aggregate."],
      ["A running total is a:", ["Row-level calculation", "Table calculation", "Data source filter", "Join"], 1, "It works across the marks of the view."],
      ["{ FIXED [Region] : SUM([Sales]) } calculates:", ["At the view's level", "At the Region level whatever the view", "Only for dates", "After table calculations"], 1, "FIXED fixes the level of detail."],
      ["Which encoding is read most accurately?", ["Area", "Colour intensity", "Position on a common scale", "Angle"], 2, "Position beats the others."],
      ["A truncated bar-chart axis:", ["Is honest", "Exaggerates differences", "Is required", "Helps accessibility"], 1, "Bars must start at zero."],
      ["An extract is best when:", ["Real-time data is essential", "The source is slow and many people use the dashboard", "There is no data", "You use Public"], 1, "Extracts are fast snapshots."],
      ["A one-to-many join can cause:", ["A fan-out that inflates totals", "Faster queries", "Better colours", "Nothing"], 0, "The 'one' side repeats."],
      ["Row-level security controls:", ["Fonts", "Which rows each viewer sees", "Chart types", "Colours"], 1, "It filters the data per user."],
      ["Tableau Public is for:", ["Confidential data", "Public data you are happy to share with anyone", "Server administration", "Row-level security"], 1, "Everything published there is public."],
    ],
  }),
  labs,
  skills: [{ id: SK_BASICS, label: "Tableau basics" }, { id: SK_CHARTS, label: "Core charts" }, { id: SK_CALC, label: "Calculations" }, { id: SK_DESIGN, label: "Design and data" }, { id: SK_GOV, label: "Publishing and governance" }],
  badges: [
    { id: "tableau-starter", title: "Tableau starter", description: "Classified fields and built the first bar charts.", when: { all: ["tb1-roles", "tb2-first-bar", "tb3-sorted-bars"] } },
    { id: "chart-builder", title: "Chart builder", description: "Built line, stacked, scatter and heat-map views.", when: { all: ["tb4-monthly", "tb5-stacked", "tb6-scatter", "tb7-heat"] } },
    { id: "focus-and-rank", title: "Focus and rank", description: "Ranked, limited and chose charts by the question.", when: { all: ["tb8-top5", "tb10-which-chart"] } },
    { id: "calc-writer", title: "Calculation writer", description: "Wrote calculated fields and table calculations.", when: { all: ["tb11-profit-ratio", "tb13-running"] } },
    { id: "lod-master", title: "LOD master", description: "Used a FIXED level-of-detail expression and chose the right calculation type.", when: { all: ["tb15-fixed", "tb16-calc-kind"] } },
    { id: "designer", title: "Designer", description: "Chose encodings, spotted dashboard problems and focused a view on a story.", when: { all: ["tb17-encoding", "tb18-dashboard-problems", "tb19-lossmakers"] } },
    { id: "tableau-analyst", title: "Tableau analyst", description: "Built the profit scatter and wrote the dashboard brief.", when: { all: ["cap-tb-scatter", "cap-tb-memo"] } },
  ],
  landing: {
    hero: { eyebrow: "A live viz builder in your browser · Real Tableau calculations", title: "Data Visualization with Tableau", subtitle: "Build charts by putting fields on shelves, write calculated fields and LOD expressions, and learn the design and publishing habits of a professional.", level: "Intermediate", outcomeLine: "After this course you can build, calculate, design and brief a dashboard that answers a real business question." },
    outcomes: [
      { icon: "shelves", title: "Think in shelves", text: "Dimensions, measures, discrete and continuous fields, and what each shelf controls." },
      { icon: "chart", title: "Build the core charts", text: "Bars, lines, stacks, scatters and heat maps, filtered, sorted and ranked." },
      { icon: "calc", title: "Write calculations", text: "Calculated fields, quick table calculations and FIXED, INCLUDE and EXCLUDE." },
      { icon: "design", title: "Design for the reader", text: "Visual encoding, honest charts, dashboards, actions and stories." },
      { icon: "data", title: "Prepare and speed up data", text: "Live or extract, joins, unions, relationships, pivots and performance." },
      { icon: "lock", title: "Publish and secure", text: "Projects, permissions, row-level security, governance and built-in analytics." },
    ],
    projects: [
      { title: "Sales by category", text: "Your first view: a dimension, a measure, a bar chart.", module: "tableau-basics" },
      { title: "Lines, stacks, scatters and a heat map", text: "The core charts on a real orders table.", module: "core-charts" },
      { title: "Profit ratio and a FIXED share", text: "A calculated field and a level-of-detail expression.", module: "calculations" },
      { title: "Which sub-categories lose money?", text: "A measure filter and a sort that tell one story.", module: "design-and-storytelling" },
      { title: "Choose how to combine and publish", text: "Joins, extracts, destinations and row-level security.", module: "publish-and-govern" },
      { title: "Profit scatter and dashboard brief", text: "The view that answers the question, and the brief that explains it.", module: "capstone" },
    ],
    tools: [
      { icon: "viz", title: "Live viz builder", text: "Columns, Rows, Marks, filters, sorting, table calculations and calculated fields, with a chart that redraws as you build." },
      { icon: "sort", title: "Sort and decide", text: "Short activities on chart choice, encodings, combining data and access control." },
      { icon: "doc", title: "Document lab", text: "Write the dashboard brief in a real editor." },
    ],
    assessment: ["Finish the required labs in each module: the viz labs check the shelves, the chart and the values.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Build the profit scatter, write the brief and pass the final assessment to finish the course."],
    faq: [
      { q: "Do I need Tableau installed?", a: "No. The viz builder runs in your browser and follows Tableau's logic and calculation syntax. Tableau Desktop is a desktop application; Tableau Public is a free version you can install to repeat the exercises, and the lessons describe the corresponding steps." },
      { q: "Is the viz builder the real Tableau?", a: "No. It is a practice tool that follows Tableau's rules for dimensions, measures, shelves, aggregation, filters, quick table calculations and level-of-detail expressions, and says so when you use something it does not support, such as dual axes, maps, parameters or dashboards. The calculations you write use real Tableau syntax." },
      { q: "What is explained but not practised hands-on?", a: "Dashboards and actions, stories, Tableau Prep, extracts, joins and relationships, publishing, permissions and row-level security. They need the desktop or server products, so they are covered with scenarios and sorting activities." },
      { q: "What should I know first?", a: "Comfort with a spreadsheet. SQL for Data & Business and Advanced Excel for Data Analysis in this category help but are not required." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile. It is not a Tableau certification." },
    ],
  },
  catalogue: {
    hours: "~24 hrs", weeks: "~6 weeks", pace: "4 hrs/wk", badge: "Tableau Visualizer",
    brief: "Build charts the Tableau way in a live viz builder: shelves, marks, calculated fields, table calculations and LOD expressions, plus design, data preparation and publishing.",
    learn: ["Dimensions, measures, shelves and the Marks card", "Bars, lines, stacks, scatters and heat maps with filters, sorts and Top N", "Calculated fields, quick table calculations and FIXED, INCLUDE and EXCLUDE", "Visual encoding, honest charts, dashboards, actions and stories", "Live versus extract, joins, unions, relationships and performance", "Publishing, permissions, row-level security and governance"],
    handsOn: "Build the profit scatter that shows which sub-categories sell a lot but lose money, then write the dashboard brief.",
    outcome: "Build, calculate, design and brief a dashboard that answers a real business question.",
  },
});
