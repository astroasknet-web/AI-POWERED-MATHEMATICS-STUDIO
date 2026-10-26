import { ck, classifyLab, daxLab, W, wordLab, X } from "../kit.mjs";
import { withMeasures } from "./bi-data.mjs";

export const SK_BI = "bi-concepts";
export const SK_MODEL = "data-modelling";
export const SK_DAX = "dax";
export const SK_TIME = "time-intelligence";
export const SK_REPORT = "report-design-and-governance";

/**
 * The DAX labs run on the Kiran Stores BI model (Products, Stores, Sales and a calendar) in the student's own browser. Each lab asks for one measure: it must
 * run, and it must show the same values as the model measure in every visual (rows, columns and totals). The model measures are replayed by the course tests.
 */
const VIS = {
  cat: { label: "Sales by category", rows: ["Products[Category]"] },
  region: { label: "Sales by region", rows: ["Stores[Region]"] },
  year: { label: "Sales by year", rows: ["Dates[Year]"] },
  catYear: { label: "Category by year", rows: ["Products[Category]"], cols: ["Dates[Year]"] },
  regionYear: { label: "Region by year", rows: ["Stores[Region]"], cols: ["Dates[Year]"] },
  qtrYear: { label: "Quarter by year", rows: ["Dates[Quarter]"], cols: ["Dates[Year]"] },
  monthYear: { label: "Month by year", rows: ["Dates[Month]"], cols: ["Dates[Year]"] },
  prodCat: { label: "Product within category", rows: ["Products[Category]", "Products[Product]"] },
};

function dc({ name, solution, uses = [], explain }) {
  const out = [ck("runs", "Your formulas run without an error", "Press Run and read any message under the editor: it names the problem.", "A measure that does not run cannot be checked. The message tells you which function, table or column it could not find.", X.runs())];
  uses.forEach(([re, what], i) => out.push(ck(`uses-${i + 1}`, `It uses ${what}`, `The task needs ${what}. Think about which function does that job.`, `${what[0].toUpperCase()}${what.slice(1)} is the function built for this part of the task.`, X.uses(re, what))));
  out.push(ck("matches", `[${name}] shows the right values in every visual`, "Run it and compare each visual, including the total row. Think about which filters apply in each cell.", explain, X.measure(name, solution)));
  return out;
}
const lab = (o) => daxLab({ level: "intermediate", minutes: 15, xp: 60, skills: [SK_DAX], required: true, ...o });
const STARTER = (name) => `// Define the measure ${name}\n${name} = \n`;

export const labs = [
  /* ------------------------------------------------------------------ module 1 */
  classifyLab({
    id: "pb1-parts", module: "power-bi-and-the-bi-workflow", title: "Which Power BI part?", level: "beginner", minutes: 6, xp: 25, skills: [SK_BI], required: true,
    objective: "Know which part of Power BI does each job.",
    scenario: "Power BI is a family of tools. Decide which part each task belongs to.",
    steps: ["Read each task.", "Choose Desktop, Service or Mobile.", "Press Check my work."],
    categories: [["desktop", "Power BI Desktop"], ["service", "Power BI Service (online)"], ["mobile", "Power BI Mobile"]],
    items: [
      ["Build the data model and create measures", "desktop", "Models and measures are authored in Desktop."],
      ["Schedule a daily data refresh", "service", "Refresh schedules are set in the Service."],
      ["Check a sales dashboard on the train", "mobile", "The mobile apps are for viewing on the move."],
      ["Publish an app for 200 managers", "service", "Apps are published from a workspace in the Service."],
      ["Write Power Query steps to unpivot columns", "desktop", "The Power Query Editor is part of Desktop."],
      ["Add a colleague to a workspace as a Contributor", "service", "Workspace roles are managed in the Service."],
      ["Define a relationship between two tables", "desktop", "Relationships are set in the model view in Desktop."],
      ["Open a report with a tap and filter it by region", "mobile", "Mobile is for viewing and interacting."],
    ],
  }),
  classifyLab({
    id: "pb2-storage", module: "power-bi-and-the-bi-workflow", title: "Import or DirectQuery?", level: "beginner", minutes: 8, xp: 30, skills: [SK_BI], required: true,
    objective: "Choose the storage mode that fits a situation.",
    scenario: "Import is the default. DirectQuery and live connections suit particular needs. Choose the best mode for each situation.",
    steps: ["Read each situation.", "Choose Import, DirectQuery or Live connection.", "Press Check my work."],
    categories: [["import", "Import"], ["dq", "DirectQuery"], ["live", "Live connection"]],
    items: [
      ["A finance team reviews 8 million rows once a week", "import", "Import is fast and a daily refresh is current enough."],
      ["A tiny Excel file of targets updated monthly", "import", "Small data is best imported."],
      ["A very large table that must show to-the-minute values", "dq", "DirectQuery queries the source live and does not copy the data."],
      ["Reuse a certified model that IT already maintains", "live", "A live connection uses the existing model without copying it."],
      ["Data too large to fit in memory but needed in reports", "dq", "DirectQuery leaves the data at the source."],
      ["You need the full set of DAX features and the fastest visuals", "import", "Import supports everything and is fastest."],
    ],
  }),

  /* ------------------------------------------------------------------ module 2 */
  classifyLab({
    id: "pb3-fact-dim", module: "data-modelling", title: "Fact or dimension?", level: "beginner", minutes: 6, xp: 25, skills: [SK_MODEL], required: true,
    objective: "Classify tables in a star schema.",
    scenario: "A star schema has fact tables (events with numbers) and dimension tables (descriptions). Classify each table.",
    steps: ["Read each table description.", "Choose Fact or Dimension.", "Press Check my work."],
    categories: [["fact", "Fact table"], ["dim", "Dimension table"]],
    items: [
      ["Sales: one row per sale, with quantity and amount", "fact", "It records events and has the numbers to add up."],
      ["Products: name, category and price for each product", "dim", "It describes the things sold."],
      ["Stores: store name, city and region", "dim", "It describes where sales happen."],
      ["Dates: one row per day with year, month and quarter", "dim", "A calendar is a dimension."],
      ["Web clicks: one row per click with a timestamp", "fact", "Each click is an event."],
      ["Customers: name, segment and signup date", "dim", "It describes the customers."],
      ["Shipments: one row per parcel with weight and cost", "fact", "Each shipment is an event with measures."],
      ["Employees: name, team and manager", "dim", "It describes the people."],
    ],
  }),
  classifyLab({
    id: "pb4-model-problems", module: "data-modelling", title: "Spot the model problem", level: "intermediate", minutes: 8, xp: 30, skills: [SK_MODEL], required: true,
    objective: "Match a symptom in a report to the model fix.",
    scenario: "Most wrong numbers trace back to the model. For each symptom choose the fix.",
    steps: ["Read each symptom.", "Choose the model fix that solves it.", "Press Check my work."],
    categories: [["datetable", "Add a continuous, marked date table"], ["sortcol", "Sort the column by another column"], ["keys", "Fix the key (type or missing rows)"], ["star", "Split into fact and dimension tables"], ["dir", "Use one-to-many with a single direction"]],
    items: [
      ["Year-to-date and last-year measures give blanks for days with no sales", "datetable", "Time intelligence needs a continuous date table."],
      ["The model is huge because the category name is repeated on every sale row", "star", "A star schema stores each fact once in a dimension."],
      ["Some sales appear under (Blank) when sliced by product", "keys", "Those sales have a key that is missing from the Products table."],
      ["Months appear as Apr, Aug, Dec, Feb ...", "sortcol", "Sort Month by MonthNum."],
      ["Totals are doubled when two tables are linked many-to-many in both directions", "dir", "Prefer one-to-many with a single filter direction."],
      ["A relationship does not filter: ProductID is text in one table and a number in the other", "keys", "Keys must have the same data type on both sides."],
    ],
  }),
  lab({
    id: "pb5-total-margin", module: "data-modelling", title: "Your first measure: Total Margin", minutes: 10, xp: 40, level: "beginner",
    objective: "Write a measure from two ready-made measures and watch the filters flow through the model.",
    scenario: "The model has the measures [Total Sales] and [Total Cost]. Define **Total Margin**: sales minus cost. Then look at it by category and by region: the same measure answers both because each dimension filters the Sales table through its relationship.",
    steps: ["Write Total Margin = [Total Sales] - [Total Cost].", "Press Run and read the matrix.", "Switch between the visuals and see how the value changes."],
    model: withMeasures({}), visuals: [VIS.cat, VIS.region, VIS.year], show: "Total Margin", starter: STARTER("Total Margin"),
    solution: "Total Margin = [Total Sales] - [Total Cost]",
    checks: dc({ name: "Total Margin", solution: "[Total Sales] - [Total Cost]", explain: "A measure can use other measures. [Total Sales] and [Total Cost] are each calculated in the filter context of every cell, so their difference is too." }),
  }),

  /* ------------------------------------------------------------------ module 3 */
  lab({
    id: "pb6-margin-pct", module: "dax-fundamentals", title: "Margin % with DIVIDE", minutes: 12,
    objective: "Write a ratio measure safely with DIVIDE.",
    scenario: "[Total Margin] is ready-made. Define **Margin %**: the margin as a share of sales, using DIVIDE so that a cell with no sales shows blank, not an error.",
    steps: ["Write Margin % = DIVIDE([Total Margin], [Total Sales]).", "Run it and check the total row: it is not the average of the rows.", "Compare categories: which has the best margin?"],
    model: withMeasures({ "Total Margin": "[Total Sales] - [Total Cost]" }), visuals: [VIS.cat, VIS.region, VIS.catYear], show: "Margin %", starter: STARTER("Margin %"),
    solution: "Margin % = DIVIDE([Total Margin], [Total Sales])",
    checks: dc({ name: "Margin %", solution: "DIVIDE([Total Margin], [Total Sales])", uses: [["divide\\s*\\(", "DIVIDE"]], explain: "A ratio is the measure divided by the measure, each in the cell's own filter context. DIVIDE returns blank instead of an error when the denominator is zero." }),
  }),
  lab({
    id: "pb7-sumx", module: "dax-fundamentals", title: "List revenue with SUMX and RELATED", minutes: 18, level: "intermediate",
    objective: "Use an iterator to calculate per row, reading a price from a related table.",
    scenario: "List revenue is what each sale would have earned at the **list price**: quantity times the product's price, even if a discount was given. Define **List Revenue** with SUMX over Sales and RELATED to read the price from Products.",
    steps: ["SUMX(Sales, ...) walks the Sales rows.", "Inside, multiply Sales[Qty] by RELATED(Products[Price]).", "Compare the matrix with [Total Sales]: the difference is the discount."],
    model: withMeasures({}), visuals: [VIS.cat, VIS.year, VIS.regionYear], show: "List Revenue", starter: STARTER("List Revenue"),
    solution: "List Revenue = SUMX(Sales, Sales[Qty] * RELATED(Products[Price]))",
    checks: dc({ name: "List Revenue", solution: "SUMX(Sales, Sales[Qty] * RELATED(Products[Price]))", uses: [["sumx", "SUMX"], ["related", "RELATED"]], explain: "SUM adds one column, but quantity times price needs two columns on each row, so an iterator is needed. RELATED follows the relationship from a Sales row to its product." }),
  }),
  lab({
    id: "pb8-discount-pct", module: "dax-fundamentals", title: "Discount % from two measures", minutes: 12,
    objective: "Build a measure from measures, with a variable for clarity.",
    scenario: "[List Revenue] and [Total Sales] are ready-made. Define **Discount %**: the discount given (list revenue minus sales) as a share of list revenue. Use VAR and RETURN so the formula reads like a sentence.",
    steps: ["Store [List Revenue] in a variable.", "RETURN DIVIDE(list - [Total Sales], list).", "Check the total row against the categories."],
    model: withMeasures({ "List Revenue": "SUMX(Sales, Sales[Qty] * RELATED(Products[Price]))" }), visuals: [VIS.cat, VIS.regionYear], show: "Discount %", starter: STARTER("Discount %"),
    solution: "Discount % =\n    VAR list = [List Revenue]\n    RETURN DIVIDE(list - [Total Sales], list)",
    checks: dc({ name: "Discount %", solution: "VAR list = [List Revenue] RETURN DIVIDE(list - [Total Sales], list)", uses: [["\\bvar\\b[\\s\\S]*\\breturn\\b", "VAR and RETURN"]], explain: "The variable holds list revenue once; the measure is then its difference from sales, divided by list revenue." }),
  }),
  classifyLab({
    id: "pb9-measure-column", module: "dax-fundamentals", title: "Measure or calculated column?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_DAX], required: true,
    objective: "Decide whether a calculation should be a measure or a calculated column.",
    scenario: "Measures respond to filters; calculated columns are fixed values stored per row. Decide which each calculation should be.",
    steps: ["Read each calculation.", "Choose Measure or Calculated column.", "Press Check my work."],
    categories: [["measure", "Measure"], ["column", "Calculated column"]],
    items: [
      ["Total sales for whichever region is selected", "measure", "It must change with the filters."],
      ["A 'Price band' (Low, Medium, High) on each product, used in a slicer", "column", "A fixed attribute per row that you slice by."],
      ["Margin % shown in a KPI card", "measure", "A ratio of totals must be recalculated per filter."],
      ["Year-to-date sales", "measure", "It depends on the date filter."],
      ["Full name made from first and last name columns", "column", "A fixed value per row."],
      ["Average order value", "measure", "An aggregate that responds to filters."],
      ["Whether a customer signed up before 2025 (Yes or No), used to filter", "column", "A fixed row-level flag."],
      ["Share of total sales for each category", "measure", "It needs the filter context of each cell."],
    ],
  }),

  /* ------------------------------------------------------------------ module 4 */
  lab({
    id: "pb10-home", module: "calculate-and-time-intelligence", title: "Home sales with CALCULATE", minutes: 12, skills: [SK_DAX],
    objective: "Change a filter with CALCULATE.",
    scenario: "Define **Home Sales**: the total sales of the Home category, whatever the cell's own category is. Notice what the Stationery row shows.",
    steps: ["Write CALCULATE([Total Sales], Products[Category] = \"Home\").", "Run it with the category visual: every row shows the same value. Why?", "Switch to the region visual: the region filter still applies."],
    model: withMeasures({}), visuals: [VIS.cat, VIS.region, VIS.catYear], show: "Home Sales", starter: STARTER("Home Sales"),
    solution: "Home Sales = CALCULATE([Total Sales], Products[Category] = \"Home\")",
    checks: dc({ name: "Home Sales", solution: "CALCULATE([Total Sales], Products[Category] = \"Home\")", uses: [["calculate\\s*\\(", "CALCULATE"]], explain: "The filter on Category inside CALCULATE replaces the category of the row, so every row shows Home's sales; filters on other columns (region, year) still apply." }),
  }),
  lab({
    id: "pb11-share", module: "calculate-and-time-intelligence", title: "Percent of total sales", minutes: 15, skills: [SK_DAX],
    objective: "Build percent of total by removing a filter in the denominator.",
    scenario: "Define **Share of Total**: each category's sales as a share of the sales of all categories. The denominator must ignore the category of the row.",
    steps: ["The numerator is [Total Sales].", "The denominator is CALCULATE([Total Sales], ALL(Products)).", "Wrap them in DIVIDE and check that the shares add up to 100%."],
    model: withMeasures({}), visuals: [VIS.cat, VIS.catYear, VIS.region], show: "Share of Total", starter: STARTER("Share of Total"),
    solution: "Share of Total = DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Products)))",
    checks: dc({ name: "Share of Total", solution: "DIVIDE([Total Sales], CALCULATE([Total Sales], ALL(Products)))", uses: [["\\ball\\b|removefilters", "ALL (or REMOVEFILTERS) to remove the category filter"]], explain: "The numerator keeps the row's filters; the denominator removes the Products filters so it is the total of all categories." }),
  }),
  lab({
    id: "pb12-share-cat", module: "calculate-and-time-intelligence", title: "Share within category", minutes: 18, level: "challenge", skills: [SK_DAX],
    objective: "Keep one filter and remove the others with ALLEXCEPT.",
    scenario: "Define **Share in Category**: each product's sales as a share of its **own category's** sales, so the products in a category add up to 100%.",
    steps: ["The numerator is [Total Sales].", "The denominator removes the product filter but keeps the category: ALLEXCEPT(Products, Products[Category]).", "Check that each category's products add up to 100%."],
    model: withMeasures({}), visuals: [VIS.prodCat, VIS.cat], show: "Share in Category", starter: STARTER("Share in Category"),
    solution: "Share in Category = DIVIDE([Total Sales], CALCULATE([Total Sales], ALLEXCEPT(Products, Products[Category])))",
    checks: dc({ name: "Share in Category", solution: "DIVIDE([Total Sales], CALCULATE([Total Sales], ALLEXCEPT(Products, Products[Category])))", uses: [["allexcept", "ALLEXCEPT"]], explain: "ALLEXCEPT removes all Products filters except Category, so the denominator is the category's total while the numerator is the product's." }),
  }),
  lab({
    id: "pb13-ly", module: "calculate-and-time-intelligence", title: "Same period last year", minutes: 15, level: "intermediate", skills: [SK_TIME],
    objective: "Look back one year with time intelligence.",
    scenario: "Define **Sales LY**: the sales for the same period one year earlier. The first year in the data has no earlier year, so its rows are blank and hidden, as in Power BI.",
    steps: ["Use CALCULATE with SAMEPERIODLASTYEAR(Dates[Date]) as the filter.", "Check the 'Sales by year' visual: 2024's row is hidden (no prior year).", "Look at the quarter visual: each 2025 quarter shows the same quarter of 2024."],
    model: withMeasures({}), visuals: [VIS.year, VIS.qtrYear, VIS.catYear], show: "Sales LY", starter: STARTER("Sales LY"),
    solution: "Sales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date]))",
    checks: dc({ name: "Sales LY", solution: "CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date]))", uses: [["sameperiodlastyear|dateadd", "SAMEPERIODLASTYEAR (or DATEADD)"]], explain: "SAMEPERIODLASTYEAR returns the dates one year earlier than those in the cell, and CALCULATE uses them as the date filter." }),
  }),
  lab({
    id: "pb14-ytd", module: "calculate-and-time-intelligence", title: "Year to date", minutes: 15, level: "intermediate", skills: [SK_TIME],
    objective: "Accumulate from the start of the year.",
    scenario: "Define **Sales YTD**: sales from 1 January to the latest date in the cell. In the month-by-year matrix each cell should be the running total for its year.",
    steps: ["Use TOTALYTD([Total Sales], Dates[Date]), or CALCULATE with DATESYTD.", "Check that December of each year equals that year's total.", "Notice the total column: it shows the latest year's YTD."],
    model: withMeasures({}), visuals: [VIS.monthYear, VIS.year], show: "Sales YTD", starter: STARTER("Sales YTD"),
    solution: "Sales YTD = TOTALYTD([Total Sales], Dates[Date])",
    checks: dc({ name: "Sales YTD", solution: "TOTALYTD([Total Sales], Dates[Date])", uses: [["totalytd|datesytd", "TOTALYTD (or DATESYTD)"]], explain: "TOTALYTD evaluates the measure over the dates from 1 January to the last date in the current context." }),
  }),
  lab({
    id: "pb15-growth", module: "calculate-and-time-intelligence", title: "Year-on-year growth %", minutes: 15, level: "intermediate", skills: [SK_TIME],
    objective: "Compare a period with the same period last year.",
    scenario: "[Sales LY] is ready-made. Define **Growth %**: this period's sales minus last year's, divided by last year's. Use a variable for last year so the formula reads clearly, and DIVIDE for safety.",
    steps: ["VAR ly = [Sales LY].", "RETURN DIVIDE([Total Sales] - ly, ly).", "In the first year, last year is blank, so the measure is blank too."],
    model: withMeasures({ "Sales LY": "CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date]))" }), visuals: [VIS.year, VIS.catYear, VIS.regionYear], show: "Growth %", starter: STARTER("Growth %"),
    solution: "Growth % =\n    VAR ly = [Sales LY]\n    RETURN DIVIDE([Total Sales] - ly, ly)",
    checks: dc({ name: "Growth %", solution: "VAR ly = [Sales LY] RETURN DIVIDE([Total Sales] - ly, ly)", uses: [["divide\\s*\\(", "DIVIDE"]], explain: "Growth is the change divided by the starting point. DIVIDE returns blank when there is no prior year." }),
  }),

  /* ------------------------------------------------------------------ module 5 */
  classifyLab({
    id: "pb16-visuals", module: "visuals-and-report-design", title: "Which visual answers it?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_REPORT], required: true,
    objective: "Choose the visual that fits the question.",
    scenario: "The question decides the visual. Choose the best one for each.",
    steps: ["Read each question.", "Choose Card, Bar chart, Line chart, Scatter chart, Matrix or Waterfall.", "Press Check my work."],
    categories: [["card", "Card (one number)"], ["bar", "Sorted bar chart"], ["line", "Line chart"], ["scatter", "Scatter chart"], ["matrix", "Matrix or table"], ["waterfall", "Waterfall"]],
    items: [
      ["What is total sales this year, against target?", "card", "A single headline number."],
      ["Which five products sold most?", "bar", "A sorted bar compares and ranks categories."],
      ["How have monthly sales changed over two years?", "line", "A line shows change over time."],
      ["Do stores with more staff sell more per day?", "scatter", "A scatter shows the relationship between two numbers."],
      ["What exactly were sales by region and quarter?", "matrix", "A matrix shows exact values in a grid."],
      ["How did revenue move from last year to this year: price, volume, discounts?", "waterfall", "A waterfall shows how contributions add up to a change."],
    ],
  }),
  classifyLab({
    id: "pb17-report-problems", module: "visuals-and-report-design", title: "What is wrong with this report?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_REPORT], required: true,
    objective: "Name the design problem in a report description.",
    scenario: "Each statement describes a report page. Decide whether it shows a good practice or a design problem.",
    steps: ["Read each description.", "Choose Good practice, Too crowded, Misleading or Hard to read.", "Press Check my work."],
    categories: [["good", "Good practice"], ["crowded", "Too crowded"], ["misleading", "Misleading"], ["hard", "Hard to read or inaccessible"]],
    items: [
      ["Key figure and growth top left, three KPIs across the top, detail below", "good", "It supports the five-second test."],
      ["A page with twenty visuals and ten slicers", "crowded", "Too much hides the message."],
      ["A bar chart whose axis starts at 96, so a 2% gap looks huge", "misleading", "Bars must start at zero."],
      ["Status shown only by red and green, with no labels", "hard", "Colour alone fails colour-blind readers."],
      ["A sorted bar chart with a title that states the finding", "good", "Sorted, labelled and clear."],
      ["A 3D pie with nine slices", "misleading", "3D and many slices distort comparison."],
      ["Tiny fonts and no alt text on visuals", "hard", "Not readable or screen-reader friendly."],
      ["Four unrelated topics on one page", "crowded", "One page should tell one story."],
    ],
  }),

  /* ------------------------------------------------------------------ module 6 */
  classifyLab({
    id: "pb18-sharing", module: "publish-secure-and-govern", title: "Choose the sharing option", level: "intermediate", minutes: 8, xp: 30, skills: [SK_REPORT], required: true,
    objective: "Choose how to share content for each audience.",
    scenario: "Power BI offers several ways to share. Choose the best for each audience.",
    steps: ["Read each situation.", "Choose Workspace role, Share link, App or Publish to web.", "Press Check my work."],
    categories: [["role", "Workspace role"], ["link", "Share a link"], ["app", "Publish an app"], ["web", "Publish to web (public data only)"]],
    items: [
      ["Two analysts building a report together", "role", "Collaborators on content need workspace roles."],
      ["200 managers need a polished, read-only version", "app", "An app is the packaged release for a large audience."],
      ["Quickly show a draft to one colleague", "link", "A link shares a single item with a few people."],
      ["A public open-data dashboard for a press release, with no private data", "web", "Publish to web is only for data that is meant to be public."],
      ["Keep draft changes away from the managers", "app", "The app updates only when you publish a new version."],
      ["Let a new colleague edit and publish reports in the team's workspace", "role", "A Contributor or Member role allows editing."],
    ],
  }),
  lab({
    id: "pb19-rls", module: "publish-secure-and-govern", title: "What would a North role see?", minutes: 12, level: "intermediate", skills: [SK_REPORT],
    objective: "See how a row-level security filter on one table restricts the facts.",
    scenario: "A row-level security role for northern managers filters Stores to the North region. Define **North Sales**: the total sales as that role would see them. (In Power BI the rule itself is the filter expression Stores[Region] = \"North\" on the Stores table.)",
    steps: ["Use CALCULATE([Total Sales], Stores[Region] = \"North\").", "Run it: the filter flows from Stores to Sales through the relationship.", "Look at the category visual: the role sees only North's sales in every category."],
    model: withMeasures({}), visuals: [VIS.region, VIS.cat, VIS.year], show: "North Sales", starter: STARTER("North Sales"),
    solution: "North Sales = CALCULATE([Total Sales], Stores[Region] = \"North\")",
    checks: dc({ name: "North Sales", solution: "CALCULATE([Total Sales], Stores[Region] = \"North\")", uses: [["stores\\s*\\[\\s*region", "a filter on Stores[Region]"]], explain: "An RLS role is a filter on a dimension table. It flows to the fact table through the relationship, so the role sees only North's sales." }),
  }),

  /* ------------------------------------------------------------------ capstone */
  lab({
    id: "cap-pb-scorecard", module: "capstone", title: "The executive scorecard", minutes: 30, xp: 120, level: "challenge", skills: [SK_DAX, SK_TIME],
    objective: "Combine variables, time intelligence, a ratio and SWITCH in one measure.",
    scenario: "Executives want one status word per region and year. Define **Scorecard**: 'No prior year' when there is no last-year figure; 'Star' when growth is at least 20% and the margin is at least 34%; 'Steady' when growth is zero or more; otherwise 'Watch'. [Total Margin] and [Sales LY] are ready-made.",
    steps: ["VAR growth = DIVIDE([Total Sales] - [Sales LY], [Sales LY]).", "VAR margin = DIVIDE([Total Margin], [Total Sales]).", "RETURN SWITCH(TRUE(), ISBLANK(growth), ..., growth >= 0.2 && margin >= 0.34, ..., growth >= 0, ..., ...)."],
    model: withMeasures({ "Total Margin": "[Total Sales] - [Total Cost]", "Sales LY": "CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date]))" }), visuals: [VIS.regionYear, VIS.catYear, VIS.year], show: "Scorecard", starter: STARTER("Scorecard"),
    solution: "Scorecard =\n    VAR growth = DIVIDE([Total Sales] - [Sales LY], [Sales LY])\n    VAR margin = DIVIDE([Total Margin], [Total Sales])\n    RETURN\n        SWITCH(\n            TRUE(),\n            ISBLANK(growth), \"No prior year\",\n            growth >= 0.2 && margin >= 0.34, \"Star\",\n            growth >= 0, \"Steady\",\n            \"Watch\"\n        )",
    checks: dc({ name: "Scorecard", solution: "VAR growth = DIVIDE([Total Sales] - [Sales LY], [Sales LY]) VAR margin = DIVIDE([Total Margin], [Total Sales]) RETURN SWITCH(TRUE(), ISBLANK(growth), \"No prior year\", growth >= 0.2 && margin >= 0.34, \"Star\", growth >= 0, \"Steady\", \"Watch\")", uses: [["switch\\s*\\(", "SWITCH"], ["\\bvar\\b", "VAR"]], explain: "SWITCH(TRUE(), ...) tests the conditions in order and returns the first that is true, so the blank check must come first. The variables hold growth and margin once." }),
  }),
  wordLab({
    id: "cap-pb-brief", module: "capstone", title: "Write the report design brief", level: "challenge", minutes: 20, xp: 80, skills: [SK_REPORT], required: true,
    objective: "Turn the model into a report plan that someone else could build and a manager could approve.",
    scenario: "Management wants a sales report from the Kiran Stores model. Write a one-page brief: who it is for, the question it answers, the visuals, the filters, and how it is kept current and secure.",
    steps: ["Add a title heading, then headings 'Audience and question', 'Pages and visuals' and 'Refresh and security'.", "Under 'Pages and visuals' list at least three visuals and what each shows.", "Mention how often the data refreshes and that regional managers see only their region using row-level security.", "Write at least two paragraphs explaining your choices."],
    html: "<p><br></p>",
    checks: [
      ck("title", "The brief has a title heading", "Use the heading style for the title.", "A heading tells the reader what the document is.", W.heading(1)),
      ck("sections", "There are at least four headings (title and three sections)", "Add the three section headings.", "Headings let a reviewer find each part.", W.heading(4)),
      ck("para", "There are at least two paragraphs", "Explain your choices in paragraphs.", "Prose explains why, not just what.", W.paragraphs(2, 12)),
      ck("list", "The visuals are a list of at least three items", "Use the bullet list button.", "A list makes the page plan easy to scan.", W.list(3, "ul")),
      ck("refresh", "It says how the data is kept current", "Mention the scheduled refresh.", "A report is only as useful as it is current.", W.pattern("refresh", "a sentence about refresh")),
      ck("rls", "It mentions row-level security", "Write row-level security (or RLS).", "Security is part of the design, not an afterthought.", W.pattern("row-level|rls", "row-level security")),
    ],
    solution: "<h1>Sales report brief</h1><h2>Audience and question</h2><p>Regional managers want to know whether sales and margin are growing against last year, and where to act.</p><h2>Pages and visuals</h2><ul><li>KPI cards for Total Sales, Margin % and Growth %.</li><li>A line chart of sales by month against last year.</li><li>A sorted bar chart of sales by category.</li></ul><p>The model is a star schema with a date table, so year-to-date and last-year measures are accurate.</p><h2>Refresh and security</h2><p>The model refreshes every morning after the overnight load, and row-level security means each regional manager sees only their own region.</p>",
  }),
];
