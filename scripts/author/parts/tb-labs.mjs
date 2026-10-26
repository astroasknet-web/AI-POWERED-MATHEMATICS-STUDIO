import { ck, classifyLab, V, vizLab, W, wordLab } from "../kit.mjs";
import { orders } from "./tb-data.mjs";

export const SK_BASICS = "tableau-basics";
export const SK_CHARTS = "charts";
export const SK_CALC = "calculations";
export const SK_DESIGN = "design-and-data";
export const SK_GOV = "publishing-and-governance";

/**
 * The viz labs run on the Kiran Office Supplies orders in the student's own browser. Each lab judges one view: fields on the right shelves, the right kind of
 * chart, and the same marks and values as the model view. The model views are replayed by the course tests, so a lab can always be finished.
 */
const lab = (o) => vizLab({ data: orders, level: "intermediate", minutes: 12, xp: 50, skills: [SK_CHARTS], required: true, ...o });

/** checks: shelf checks the task names, then the kind of chart, then the marks and values. */
function vc({ shelves = [], kind, kindWhat, solution, calcs, ordered, sorted, extra = [], explain }) {
  const out = [ck("runs", "Your view draws without an error", "Add fields to Columns and Rows; if a message appears above the chart, it names the problem.", "A view that cannot be drawn cannot be checked. The message tells you which field or calculation it could not understand.", V.runs())];
  shelves.forEach(([shelf, field, o], i) => {
    const name = shelf === "columns" ? "Columns" : shelf === "rows" ? "Rows" : shelf[0].toUpperCase() + shelf.slice(1);
    const how = o?.agg ? ` (${o.agg === "avg" ? "average" : o.agg === "countd" ? "distinct count" : o.agg})` : o?.date ? ` (by ${o.date})` : o?.quick ? ` (${o.quick})` : "";
    out.push(ck(`shelf-${i + 1}`, `${field} is on ${name}${how}`, `Use the + Add field menu on ${name}${o?.agg || o?.date || o?.quick ? `, then set it in the pill's menu` : ""}.`, `${field} on ${name} ${shelf === "color" ? "colours the marks" : shelf === "detail" ? "splits the marks without changing how they look" : "sets the layout of the view"}.`, V.shelf(shelf, field, o ?? {})));
  });
  if (kind) out.push(ck("kind", `The view is ${kindWhat}`, "The chart type follows the fields: check which shelf holds the dimension and which the measure.", "Tableau's Automatic mark draws the chart that fits the fields on the shelves.", V.kind(kind, kindWhat)));
  if (sorted) out.push(ck("sorted", sorted === "desc" ? "The marks are sorted high to low" : "The marks are sorted low to high", "Use the Sort control above the chart.", "Sorting puts the largest (or smallest) at the start so the ranking is obvious.", V.sorted(sorted)));
  out.push(...extra);
  out.push(ck("marks", "The marks and values are what the task asks for", "Open View data below the chart and compare the marks with the task: which fields split them, and which aggregation is used?", explain, V.data(solution, { calcs, ordered })));
  return out;
}

export const labs = [
  /* ------------------------------------------------------------------ module 1 */
  classifyLab({
    id: "tb1-roles", module: "tableau-basics", title: "Dimension or measure?", level: "beginner", minutes: 6, xp: 25, skills: [SK_BASICS], required: true,
    objective: "Classify fields the way Tableau does.",
    scenario: "Tableau puts every field in the data pane as a dimension (a category that groups the data) or a measure (a number that is aggregated). Classify each field.",
    steps: ["Read each field.", "Choose Dimension or Measure.", "Press Check my work."],
    categories: [["dim", "Dimension"], ["meas", "Measure"]],
    items: [
      ["Region", "dim", "A category that groups the orders."],
      ["Sales", "meas", "A number that is added up."],
      ["Customer", "dim", "A label for who bought."],
      ["Profit", "meas", "A number that is aggregated."],
      ["Order Date", "dim", "A date is a dimension (it can be grouped by year, month or day)."],
      ["Quantity", "meas", "A number of units, summed or averaged."],
      ["Category", "dim", "A category that groups the products."],
      ["Discount", "meas", "A number (usually averaged, not summed)."],
    ],
  }),
  lab({
    id: "tb2-first-bar", module: "tableau-basics", title: "Your first bar chart: sales by category", level: "beginner", minutes: 8, xp: 40, skills: [SK_BASICS],
    objective: "Put a dimension on Columns and a measure on Rows.",
    scenario: "Show the total Sales for each Category as a bar chart.",
    steps: ["Add Category to Columns (it makes one bar per category).", "Add Sales to Rows (it sets the height of each bar; Tableau sums it).", "Read the chart: which category sells most?"],
    solution: { spec: { columns: [{ field: "Category" }], rows: [{ field: "Sales" }] } },
    checks: vc({ shelves: [["columns", "Category"], ["rows", "Sales", { agg: "sum" }]], kind: ["bar-v"], kindWhat: "a vertical bar chart", solution: { columns: [{ field: "Category" }], rows: [{ field: "Sales" }] }, explain: "A dimension on Columns makes one bar per member; a measure on Rows sets the bar's height, summed by default." }),
  }),
  lab({
    id: "tb3-sorted-bars", module: "tableau-basics", title: "Sorted horizontal bars by sub-category", level: "beginner", minutes: 10, xp: 40, skills: [SK_BASICS],
    objective: "Swap the shelves for horizontal bars and sort by the measure.",
    scenario: "Show total Sales for each Sub-Category as **horizontal** bars, with the largest at the top (high to low).",
    steps: ["Put Sales on Columns and Sub-Category on Rows.", "Use the Sort control to sort high to low.", "Check that the first bar is the largest."],
    solution: { spec: { columns: [{ field: "Sales" }], rows: [{ field: "Sub-Category" }], sort: { dir: "desc" } } },
    checks: vc({ shelves: [["columns", "Sales", { agg: "sum" }], ["rows", "Sub-Category"]], kind: ["bar-h"], kindWhat: "a horizontal bar chart", sorted: "desc", ordered: true, solution: { columns: [{ field: "Sales" }], rows: [{ field: "Sub-Category" }], sort: { dir: "desc" } }, explain: "A measure on Columns with a dimension on Rows gives horizontal bars; sorting by the measure ranks them." }),
  }),

  /* ------------------------------------------------------------------ module 2 */
  lab({
    id: "tb4-monthly", module: "core-charts", title: "Monthly sales as a line", level: "beginner", minutes: 8, xp: 40,
    objective: "Use a date at the month level to draw a line.",
    scenario: "Show total Sales for each month of the two years as a line chart.",
    steps: ["Add Order Date to Columns, then set its level to Month in the pill's menu.", "Add Sales to Rows.", "Look for the seasonal pattern."],
    solution: { spec: { columns: [{ field: "Order Date", date: "month" }], rows: [{ field: "Sales" }] } },
    checks: vc({ shelves: [["columns", "Order Date", { date: "month" }], ["rows", "Sales"]], kind: ["line"], kindWhat: "a line chart", solution: { columns: [{ field: "Order Date", date: "month" }], rows: [{ field: "Sales" }] }, explain: "A date on Columns draws a line; the date level (Month) groups the sales by year and month." }),
  }),
  lab({
    id: "tb5-stacked", module: "core-charts", title: "Sales by region, split by category", level: "beginner", minutes: 10, xp: 45,
    objective: "Stack bars by putting a second dimension on Color.",
    scenario: "Show total Sales for each Region as bars, with each bar split by Category so you can see the mix.",
    steps: ["Region on Columns and Sales on Rows.", "Add Category to Color on the Marks card.", "Which region depends most on Technology?"],
    solution: { spec: { columns: [{ field: "Region" }], rows: [{ field: "Sales" }], color: { field: "Category" } } },
    checks: vc({ shelves: [["columns", "Region"], ["rows", "Sales"], ["color", "Category"]], kind: ["bar-v"], kindWhat: "a stacked bar chart", solution: { columns: [{ field: "Region" }], rows: [{ field: "Sales" }], color: { field: "Category" } }, explain: "A dimension on Color splits each bar into segments, one per member." }),
  }),
  lab({
    id: "tb6-scatter", module: "core-charts", title: "Sales against profit by customer", level: "intermediate", minutes: 12, xp: 55,
    objective: "Build a scatter plot with one dot per customer.",
    scenario: "Show whether customers who buy more are more profitable: plot total Sales (x) against total Profit (y), with one dot per Customer, coloured by Segment.",
    steps: ["Sales on Columns and Profit on Rows (two measures give a scatter).", "Customer on Detail (one dot per customer).", "Segment on Color."],
    solution: { spec: { columns: [{ field: "Sales" }], rows: [{ field: "Profit" }], detail: [{ field: "Customer" }], color: { field: "Segment" } } },
    checks: vc({ shelves: [["columns", "Sales"], ["rows", "Profit"], ["detail", "Customer"], ["color", "Segment"]], kind: ["scatter"], kindWhat: "a scatter plot", solution: { columns: [{ field: "Sales" }], rows: [{ field: "Profit" }], detail: [{ field: "Customer" }], color: { field: "Segment" } }, explain: "A measure on each shelf gives a scatter; Detail makes one dot per customer, and Color tells the segments apart." }),
  }),
  lab({
    id: "tb7-heat", module: "core-charts", title: "A profit heat map", level: "intermediate", minutes: 12, xp: 55,
    objective: "Build a heat map with a dimension on each shelf and a measure on Color.",
    scenario: "Show where profit is made and lost: Sub-Category down the side, Region across the top, and the squares coloured by Profit.",
    steps: ["Region on Columns and Sub-Category on Rows.", "Choose the Square mark.", "Put Profit on Color."],
    solution: { spec: { mark: "square", columns: [{ field: "Region" }], rows: [{ field: "Sub-Category" }], color: { field: "Profit" } } },
    checks: vc({ shelves: [["columns", "Region"], ["rows", "Sub-Category"], ["color", "Profit"]], kind: ["heat"], kindWhat: "a heat map", solution: { mark: "square", columns: [{ field: "Region" }], rows: [{ field: "Sub-Category" }], color: { field: "Profit" } }, explain: "Dimensions on both shelves make a grid; the Square mark with a measure on Color makes a heat map." }),
  }),
  lab({
    id: "tb8-top5", module: "core-charts", title: "The top five customers", level: "intermediate", minutes: 10, xp: 45,
    objective: "Rank and limit: sort and show the top N.",
    scenario: "Show only the five customers with the highest total Sales, as horizontal bars with the biggest first.",
    steps: ["Sales on Columns, Customer on Rows.", "Sort high to low.", "Choose Show: Top 5."],
    solution: { spec: { columns: [{ field: "Sales" }], rows: [{ field: "Customer" }], sort: { dir: "desc" }, top: 5 } },
    checks: vc({ shelves: [["columns", "Sales"], ["rows", "Customer"]], kind: ["bar-h"], kindWhat: "a horizontal bar chart", sorted: "desc", ordered: true, extra: [ck("top", "Only the top 5 are shown", "Use the Show control above the chart.", "Top N keeps only the highest members after sorting.", V.top(5))], solution: { columns: [{ field: "Sales" }], rows: [{ field: "Customer" }], sort: { dir: "desc" }, top: 5 }, explain: "Sorting ranks the customers; Top 5 keeps the first five." }),
  }),
  lab({
    id: "tb9-filter", module: "core-charts", title: "East and West only", level: "beginner", minutes: 8, xp: 40, required: false,
    objective: "Filter a dimension to focus on some members.",
    scenario: "Show total Sales by Category, but only for the East and West regions.",
    steps: ["Build the bar chart: Category on Columns, Sales on Rows.", "Add a filter on Region.", "Keep only East and West ticked."],
    solution: { spec: { columns: [{ field: "Category" }], rows: [{ field: "Sales" }], filters: [{ field: "Region", values: ["East", "West"] }] } },
    checks: vc({ shelves: [["columns", "Category"], ["rows", "Sales"]], kind: ["bar-v"], kindWhat: "a bar chart", extra: [ck("filter", "A filter keeps only East and West", "Use + Add filter, choose Region, and untick Central and South.", "A dimension filter keeps only the ticked members before the data is aggregated.", V.filter("Region", { values: ["East", "West"] }))], solution: { columns: [{ field: "Category" }], rows: [{ field: "Sales" }], filters: [{ field: "Region", values: ["East", "West"] }] }, explain: "The filter removes the other regions' rows, so each bar is the sum over East and West only." }),
  }),
  classifyLab({
    id: "tb10-which-chart", module: "core-charts", title: "Which chart answers it?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_CHARTS], required: true,
    objective: "Choose the chart that fits the question.",
    scenario: "The question decides the chart. Pick the best one for each.",
    steps: ["Read each question.", "Choose Bar chart, Line chart, Stacked bar, Scatter plot or Heat map.", "Press Check my work."],
    categories: [["bar", "Sorted bar chart"], ["line", "Line chart"], ["stack", "Stacked bar"], ["scatter", "Scatter plot"], ["heat", "Heat map"]],
    items: [
      ["Which sub-category has the highest sales?", "bar", "A sorted bar compares categories."],
      ["How have monthly sales changed over two years?", "line", "A line shows change over time."],
      ["What does each region's sales consist of, by category?", "stack", "A stacked bar shows composition."],
      ["Do customers who buy more also earn us more profit?", "scatter", "A scatter shows the relationship between two measures."],
      ["Where, across regions and sub-categories, do we lose money?", "heat", "A heat map highlights hot and cold spots in a grid."],
      ["Which five customers bought most?", "bar", "A sorted bar (top 5) ranks them."],
    ],
  }),

  /* ------------------------------------------------------------------ module 3 */
  lab({
    id: "tb11-profit-ratio", module: "calculations", title: "Profit ratio by sub-category", level: "intermediate", minutes: 15, xp: 60, skills: [SK_CALC], allowCalcs: true,
    objective: "Create an aggregate calculated field and use it in a view.",
    scenario: "Which sub-categories keep the least of each rupee of sales? Create a calculated field called **Profit Ratio** (total profit divided by total sales) and show it by Sub-Category as horizontal bars, lowest first.",
    steps: ["In the box at the left write: Profit Ratio = SUM([Profit]) / SUM([Sales]) and press Create field.", "Put Profit Ratio on Columns and Sub-Category on Rows.", "Sort low to high."],
    solution: { spec: { columns: [{ field: "Profit Ratio" }], rows: [{ field: "Sub-Category" }], sort: { dir: "asc" } }, calcs: { "Profit Ratio": "SUM([Profit]) / SUM([Sales])" } },
    checks: vc({ shelves: [["columns", "Profit Ratio"], ["rows", "Sub-Category"]], kind: ["bar-h"], kindWhat: "a horizontal bar chart", sorted: "asc", ordered: true, calcs: { "Profit Ratio": "SUM([Profit]) / SUM([Sales])" }, extra: [ck("hascalc", "You created a calculated field called Profit Ratio", "Type the name, an equals sign and the formula in the Create a calculated field box.", "A calculated field is defined once and then used like any other field.", V.hasCalc("Profit Ratio")), ck("sums", "It divides totals: SUM(...) / SUM(...)", "Use SUM([Profit]) / SUM([Sales]).", "A ratio of totals is correct at every level; the average of row ratios is not.", V.uses("sum\\s*\\(.*\\/.*sum\\s*\\(", "SUM([Profit]) / SUM([Sales])"))], solution: { columns: [{ field: "Profit Ratio" }], rows: [{ field: "Sub-Category" }], sort: { dir: "asc" } }, explain: "An aggregate calculation is worked out per mark, so each sub-category gets its own total profit divided by its total sales." }),
  }),
  lab({
    id: "tb12-loss-flag", module: "calculations", title: "Count loss-making orders", level: "intermediate", minutes: 15, xp: 60, skills: [SK_CALC], allowCalcs: true, required: false,
    objective: "Create a row-level calculation that makes a dimension.",
    scenario: "How many orders lose money in each Category? Create a field called **Result** that is 'Loss' when Profit is below zero and 'Profit' otherwise. Show the number of different orders (distinct count of Order ID) for each Category, coloured by Result.",
    steps: ["Create: Result = IF [Profit] < 0 THEN \"Loss\" ELSE \"Profit\" END", "Category on Columns, Order ID on Rows (change its aggregation to Count (distinct)).", "Result on Color."],
    solution: { spec: { columns: [{ field: "Category" }], rows: [{ field: "Order ID", agg: "countd" }], color: { field: "Result" } }, calcs: { Result: 'IF [Profit] < 0 THEN "Loss" ELSE "Profit" END' } },
    checks: vc({ shelves: [["columns", "Category"], ["rows", "Order ID", { agg: "countd" }], ["color", "Result"]], kind: ["bar-v"], kindWhat: "a stacked bar chart", calcs: { Result: 'IF [Profit] < 0 THEN "Loss" ELSE "Profit" END' }, extra: [ck("hascalc", "You created a calculated field called Result", "Type the name, an equals sign and the formula.", "A row-level calculation that returns text becomes a dimension.", V.hasCalc("Result")), ck("if", "It uses IF ... THEN ... END", "Write IF [Profit] < 0 THEN \"Loss\" ELSE \"Profit\" END.", "IF tests a condition for each row.", V.uses("\\bif\\b[\\s\\S]*\\bthen\\b[\\s\\S]*\\bend\\b", "IF ... THEN ... END"))], solution: { columns: [{ field: "Category" }], rows: [{ field: "Order ID", agg: "countd" }], color: { field: "Result" } }, explain: "The IF is worked out for every row, giving a dimension that splits the bars; COUNTD counts each order once." }),
  }),
  lab({
    id: "tb13-running", module: "calculations", title: "Running total of sales", level: "intermediate", minutes: 12, xp: 50, skills: [SK_CALC],
    objective: "Apply a quick table calculation along the months.",
    scenario: "Show cumulative sales through the two years: the running total of Sales by month.",
    steps: ["Order Date (Month) on Columns and Sales on Rows.", "Open the menu on the Sales pill and choose Running total as the table calculation."],
    solution: { spec: { columns: [{ field: "Order Date", date: "month" }], rows: [{ field: "Sales", quick: "running" }] } },
    checks: vc({ shelves: [["columns", "Order Date", { date: "month" }], ["rows", "Sales", { quick: "running" }]], kind: ["line"], kindWhat: "a line chart", solution: { columns: [{ field: "Order Date", date: "month" }], rows: [{ field: "Sales", quick: "running" }] }, explain: "A running-total table calculation adds each month to all the months before it, so the line only rises." }),
  }),
  lab({
    id: "tb14-pct", module: "calculations", title: "Each category's share of total sales", level: "intermediate", minutes: 10, xp: 45, skills: [SK_CALC], required: false,
    objective: "Apply Percent of total.",
    scenario: "Show each Category's share of total Sales as bars, using a table calculation.",
    steps: ["Category on Columns and Sales on Rows.", "Choose Percent of total in the Sales pill's table-calculation menu."],
    solution: { spec: { columns: [{ field: "Category" }], rows: [{ field: "Sales", quick: "pct" }] } },
    checks: vc({ shelves: [["columns", "Category"], ["rows", "Sales", { quick: "pct" }]], kind: ["bar-v"], kindWhat: "a bar chart", solution: { columns: [{ field: "Category" }], rows: [{ field: "Sales", quick: "pct" }] }, explain: "Percent of total divides each mark by the sum of all the marks along the table, so the bars add to 100%." }),
  }),
  lab({
    id: "tb15-fixed", module: "calculations", title: "Share of region with a FIXED expression", level: "challenge", minutes: 20, xp: 80, skills: [SK_CALC], allowCalcs: true,
    objective: "Use a level-of-detail expression to divide by a figure at a different level.",
    scenario: "What share of each region's sales comes from each category? Create **Region Sales** = { FIXED [Region] : SUM([Sales]) } and **Share of Region** = SUM([Sales]) / MAX([Region Sales]). Show Share of Region by Region as bars, coloured by Category: each region's stack adds up to 100%.",
    steps: ["Create the two calculated fields (one at a time).", "Region on Columns, Share of Region on Rows, Category on Color."],
    solution: { spec: { columns: [{ field: "Region" }], rows: [{ field: "Share of Region" }], color: { field: "Category" } }, calcs: { "Region Sales": "{ FIXED [Region] : SUM([Sales]) }", "Share of Region": "SUM([Sales]) / MAX([Region Sales])" } },
    checks: vc({ shelves: [["columns", "Region"], ["rows", "Share of Region"], ["color", "Category"]], kind: ["bar-v"], kindWhat: "a stacked bar chart", calcs: { "Region Sales": "{ FIXED [Region] : SUM([Sales]) }", "Share of Region": "SUM([Sales]) / MAX([Region Sales])" }, extra: [ck("hascalc", "You created Region Sales and Share of Region", "Create both calculated fields with exactly these names.", "The second field uses the first, so the names matter.", V.hasCalc("Share of Region")), ck("fixed", "It uses a FIXED expression", "Write { FIXED [Region] : SUM([Sales]) }.", "FIXED calculates at exactly the named level whatever the view shows.", V.uses("\\{\\s*fixed", "{ FIXED ... }"))], solution: { columns: [{ field: "Region" }], rows: [{ field: "Share of Region" }], color: { field: "Category" } }, explain: "The FIXED expression puts each region's total on every row, so dividing a category's sales by it (MAX picks that single value) gives the share of its region." }),
  }),
  classifyLab({
    id: "tb16-calc-kind", module: "calculations", title: "Which kind of calculation?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_CALC], required: true,
    objective: "Decide which kind of calculation each need calls for.",
    scenario: "Tableau has four kinds of calculation. Match each need to the right one.",
    steps: ["Read each calculation or need.", "Choose Row-level, Aggregate, Table calculation or LOD.", "Press Check my work."],
    categories: [["row", "Row-level"], ["agg", "Aggregate"], ["table", "Table calculation"], ["lod", "LOD expression"]],
    items: [
      ["[Sales] - [Profit] (cost of each order line)", "row", "It is worked out for every row."],
      ["SUM([Profit]) / SUM([Sales])", "agg", "It aggregates before dividing, once per mark."],
      ["The running total of sales by month", "table", "It depends on the order of marks in the view."],
      ["{ FIXED [Customer] : SUM([Sales]) }", "lod", "It calculates at the Customer level whatever the view."],
      ["IF [Discount] > 0.2 THEN \"Deep\" ELSE \"Normal\" END", "row", "It tests each row."],
      ["The rank of customers by profit", "table", "Rank is a table calculation over the marks."],
      ["AVG({ INCLUDE [Customer] : SUM([Sales]) })", "lod", "INCLUDE adds a level of detail."],
      ["SUM([Sales]) / COUNTD([Order ID])", "agg", "Both parts are aggregates."],
    ],
  }),

  /* ------------------------------------------------------------------ module 4 */
  classifyLab({
    id: "tb17-encoding", module: "design-and-storytelling", title: "How accurately is it read?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_DESIGN], required: true,
    objective: "Rank visual encodings by how accurately people read them.",
    scenario: "People read some visual properties much more accurately than others. Decide for each whether it is a good choice for the main comparison.",
    steps: ["Read each encoding.", "Choose Accurate (good for the main comparison) or Less accurate.", "Press Check my work."],
    categories: [["good", "Accurate: good for the main comparison"], ["weak", "Less accurate: use sparingly"]],
    items: [
      ["Position along a common scale (dots on one axis)", "good", "Position is the most accurately read encoding."],
      ["Length of bars from a shared baseline", "good", "Length is very accurate."],
      ["The angle of pie slices", "weak", "Angle is judged less accurately than length."],
      ["The area of bubbles", "weak", "Area is hard to compare."],
      ["The shade (intensity) of a colour", "weak", "People judge intensity poorly; use it for patterns, not exact values."],
      ["Different colour hues for different categories", "good", "Hue is good for telling categories apart (not for quantities)."],
    ],
  }),
  classifyLab({
    id: "tb18-dashboard-problems", module: "design-and-storytelling", title: "What is wrong with this dashboard?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_DESIGN], required: true,
    objective: "Name the design problem in a dashboard description.",
    scenario: "Each statement describes a dashboard. Decide whether it shows good practice or a design problem.",
    steps: ["Read each description.", "Choose Good practice, Too busy, Misleading or Hard to read.", "Press Check my work."],
    categories: [["good", "Good practice"], ["busy", "Too busy"], ["misleading", "Misleading"], ["hard", "Hard to read or inaccessible"]],
    items: [
      ["Key trend top left, three supporting views, a filter action on region", "good", "Clear priority and light interactivity."],
      ["Twelve charts and eight quick filters on one dashboard", "busy", "Too many views compete for attention."],
      ["A bar chart axis that starts at 90, making a 3% gap look huge", "misleading", "Truncated bar axes exaggerate differences."],
      ["Red and green are the only difference between 'good' and 'bad', with no labels", "hard", "Colour alone fails colour-blind readers."],
      ["A caption under each chart that states what to notice", "good", "Headline captions guide the reader."],
      ["Two lines on separate axes scaled so they match perfectly", "misleading", "Dual-axis scaling can invent a relationship."],
      ["Light grey text on a white background at a tiny font size", "hard", "Contrast and size make it unreadable."],
      ["Every field in the data in every tooltip", "busy", "Tooltips should add context, not dump data."],
    ],
  }),
  lab({
    id: "tb19-lossmakers", module: "design-and-storytelling", title: "Which sub-categories lose money?", level: "intermediate", minutes: 12, xp: 55, skills: [SK_DESIGN],
    objective: "Focus a view on the story: only the loss-making sub-categories, worst first.",
    scenario: "Show total Profit by Sub-Category as horizontal bars, keep only the sub-categories whose total profit is **below zero**, and put the biggest loss at the top.",
    steps: ["Profit on Columns, Sub-Category on Rows.", "Add a filter on Profit with at most 0 (a measure filter).", "Sort low to high so the biggest loss comes first."],
    solution: { spec: { columns: [{ field: "Profit" }], rows: [{ field: "Sub-Category" }], filters: [{ field: "Profit", max: 0 }], sort: { dir: "asc" } } },
    checks: vc({ shelves: [["columns", "Profit"], ["rows", "Sub-Category"]], kind: ["bar-h"], kindWhat: "a horizontal bar chart", sorted: "asc", ordered: true, extra: [ck("filter", "A measure filter keeps only totals at or below zero", "Use + Add filter, choose Profit and set at most to 0.", "A measure filter keeps marks whose aggregated value is in a range.", V.filter("Profit", { max: 0 }))], solution: { columns: [{ field: "Profit" }], rows: [{ field: "Sub-Category" }], filters: [{ field: "Profit", max: 0 }], sort: { dir: "asc" } }, explain: "A measure filter acts on the aggregated profit of each sub-category, so only the loss-makers remain; sorting low to high puts the biggest loss first." }),
  }),

  /* ------------------------------------------------------------------ module 5 */
  classifyLab({
    id: "tb20-live-extract", module: "data-prep-and-performance", title: "Live connection or extract?", level: "beginner", minutes: 6, xp: 25, skills: [SK_DESIGN], required: true,
    objective: "Choose how Tableau should read the data.",
    scenario: "A live connection queries the source each time; an extract is a fast stored snapshot. Choose the better fit for each situation.",
    steps: ["Read each situation.", "Choose Live connection or Extract.", "Press Check my work."],
    categories: [["live", "Live connection"], ["extract", "Extract"]],
    items: [
      ["A slow shared database feeding a dashboard used by hundreds of people", "extract", "A fast snapshot serves everyone."],
      ["A dashboard that must show trades to the second from a fast, dedicated database", "live", "Real-time needs a live connection."],
      ["A very large CSV file you want to explore quickly", "extract", "An extract is much faster."],
      ["You need to work on the plane with no internet", "extract", "Extracts work offline."],
      ["A small fast database and always-current numbers are required", "live", "The source can answer each query."],
      ["A monthly report refreshed once a month", "extract", "No need for real-time data."],
    ],
  }),
  classifyLab({
    id: "tb21-combine", module: "data-prep-and-performance", title: "Join, union, relationship or blend?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_DESIGN], required: true,
    objective: "Choose how to combine tables.",
    scenario: "Tableau can combine tables in several ways. Choose the best for each situation.",
    steps: ["Read each situation.", "Choose Relationship, Join, Union or Blend.", "Press Check my work."],
    categories: [["rel", "Relationship"], ["join", "Join"], ["union", "Union"], ["blend", "Data blend"]],
    items: [
      ["Twelve monthly files that all have the same columns", "union", "Stack tables with the same layout."],
      ["Orders and returns tables you want linked flexibly, at the right level of detail for each view", "rel", "Relationships join per view."],
      ["Link a sales database to an Excel file of targets from another source, on shared dimensions", "blend", "A blend links separate sources at the level of the view."],
      ["Combine two tables from one database into one flat table on a clean key", "join", "A join fixes the combination row by row."],
      ["Avoid double-counting order totals when orders have several payments", "rel", "Relationships avoid the fan-out of a careless join."],
      ["Add this quarter's file to last quarter's, same columns", "union", "A union appends rows."],
    ],
  }),
  classifyLab({
    id: "tb22-performance", module: "data-prep-and-performance", title: "Does it speed up the dashboard?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_DESIGN], required: false,
    objective: "Tell the habits that speed up a dashboard from those that slow it down.",
    scenario: "Some habits make dashboards fast and others slow. Decide which each is.",
    steps: ["Read each habit.", "Choose Speeds it up or Slows it down.", "Press Check my work."],
    categories: [["fast", "Speeds it up"], ["slow", "Slows it down"]],
    items: [
      ["Using an extract filtered to the rows and columns needed", "fast", "Smaller, faster data."],
      ["Plotting 400,000 order lines as individual marks", "slow", "Too many marks."],
      ["Aggregating to the level the reader needs", "fast", "Fewer marks and rows."],
      ["Adding a quick filter for every field", "slow", "Each filter adds queries."],
      ["Measuring with Performance Recording before changing anything", "fast", "Fix the real cause."],
      ["Nested level-of-detail expressions on a huge table", "slow", "Heavy calculations are expensive."],
    ],
  }),

  /* ------------------------------------------------------------------ module 6 */
  classifyLab({
    id: "tb23-publish", module: "publish-and-govern", title: "Where should it be published?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_GOV], required: true,
    objective: "Choose the right destination for each piece of work.",
    scenario: "Where you publish decides who can see the work. Choose the best destination for each.",
    steps: ["Read each situation.", "Choose Tableau Public, Cloud or Server, or Do not share.", "Press Check my work."],
    categories: [["public", "Tableau Public"], ["server", "Tableau Cloud or Server"], ["no", "Do not publish it there"]],
    items: [
      ["A portfolio dashboard of a public government dataset", "public", "Public data suits Tableau Public."],
      ["A dashboard of regional sales for the company's managers", "server", "Internal data belongs on Cloud or Server with permissions."],
      ["A dashboard of employee salaries on Tableau Public", "no", "Private data must never go on Tableau Public."],
      ["A governed data source that many analysts connect to", "server", "Published data sources live on Cloud or Server."],
      ["Customer names and phone numbers on Tableau Public", "no", "Personal data must not be published publicly."],
      ["A practice project built from open data for learning", "public", "Public data and learning suit Tableau Public."],
    ],
  }),
  classifyLab({
    id: "tb24-access", module: "publish-and-govern", title: "Permissions or row-level security?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_GOV], required: false,
    objective: "Decide whether a need is solved by permissions or by row-level security.",
    scenario: "Permissions control what people can do with content; row-level security controls which rows they see. Match each need.",
    steps: ["Read each need.", "Choose Permissions or Row-level security.", "Press Check my work."],
    categories: [["perm", "Permissions"], ["rls", "Row-level security"]],
    items: [
      ["Only analysts may edit the workbook; managers may only view it", "perm", "Who can view or edit is a permission."],
      ["Each regional manager sees only their own region in one shared dashboard", "rls", "Which rows each user sees is row-level security."],
      ["Stop viewers from downloading the data", "perm", "Download is a permission."],
      ["A user filter with USERNAME() on the data source", "rls", "A user filter restricts rows per user."],
      ["Allow the finance team to see the Finance project but nobody else", "perm", "Access to a project is a permission."],
      ["Salespeople see only their own customers", "rls", "A per-user row restriction."],
    ],
  }),

  /* ------------------------------------------------------------------ capstone */
  lab({
    id: "cap-tb-scatter", module: "capstone", title: "Which sub-categories sell a lot but lose money?", level: "challenge", minutes: 25, xp: 100, skills: [SK_CHARTS, SK_DESIGN],
    objective: "Build the view that answers the business question, then explain it.",
    scenario: "Management asks: which sub-categories sell a lot but lose money? Plot total Sales (x) against total Profit (y), with one dot per Sub-Category, coloured by Category, so the problem sub-categories sit below the zero line on the right.",
    steps: ["Sales on Columns, Profit on Rows.", "Sub-Category on Detail (one dot per sub-category).", "Category on Color.", "Read the chart: which dots are low and to the right?"],
    solution: { spec: { columns: [{ field: "Sales" }], rows: [{ field: "Profit" }], detail: [{ field: "Sub-Category" }], color: { field: "Category" } } },
    checks: vc({ shelves: [["columns", "Sales"], ["rows", "Profit"], ["detail", "Sub-Category"], ["color", "Category"]], kind: ["scatter"], kindWhat: "a scatter plot", solution: { columns: [{ field: "Sales" }], rows: [{ field: "Profit" }], detail: [{ field: "Sub-Category" }], color: { field: "Category" } }, explain: "Two measures on the shelves make a scatter; Detail gives one dot per sub-category and Color groups them by category." }),
  }),
  wordLab({
    id: "cap-tb-memo", module: "capstone", title: "Write the dashboard brief and findings", level: "challenge", minutes: 20, xp: 80, skills: [SK_DESIGN], required: true,
    objective: "Turn the analysis into a brief for a dashboard and a message management can act on.",
    scenario: "You found that some well-selling sub-categories lose money. Write a one-page brief: the finding, the dashboard views that show it, who can see what, and your recommendation.",
    steps: ["Add a title heading and a second heading, 'Dashboard views'.", "Write a summary paragraph that starts with the finding.", "List at least three views of the dashboard and what each shows.", "Write a final paragraph that begins with the word Recommendation, and mention how access is controlled (for example row-level security) and a limit of the data."],
    html: "<p><br></p>",
    checks: [
      ck("title", "The brief has a heading", "Use the heading style for the title.", "A heading tells the reader what the document is.", W.heading(1)),
      ck("two", "There are at least two headings (title and Dashboard views)", "Add a Dashboard views heading above the list.", "Headings help a busy reader find the views.", W.heading(2)),
      ck("para", "There are at least two paragraphs", "Write a summary and a recommendation paragraph.", "Prose connects the evidence to a decision.", W.paragraphs(2, 12)),
      ck("list", "The views are a list of at least three items", "Use the bullet list button.", "A list makes the dashboard plan easy to scan.", W.list(3, "ul")),
      ck("rec", "It contains a recommendation", "Start the last paragraph with Recommendation.", "A finding without an action is half the work.", W.contains("Recommendation")),
      ck("limit", "It states a limit of the data", "Include the word limit or limitation and say what the data cannot show.", "Honest analysis says what the numbers cannot tell you.", W.pattern("limit", "a sentence about a limit of the data")),
      ck("access", "It says how access is controlled", "Mention permissions or row-level security.", "Who sees what is part of the design.", W.pattern("row-level|permission|rls", "a sentence about access control")),
    ],
    solution: "<h1>Profit problems in the sales range</h1><p>Tables and Bookcases are among the best-selling sub-categories but lose money overall, so selling more of them lowers profit.</p><h2>Dashboard views</h2><ul><li>A scatter of sales against profit by sub-category, with loss-makers below the zero line.</li><li>A sorted bar chart of profit by sub-category, filtered to loss-makers.</li><li>A heat map of profit by region and sub-category.</li></ul><p>One limit: the data covers two years of orders from one distributor, so seasonal effects and customer mix may explain part of the pattern.</p><p>Recommendation: review the pricing and costs of Tables and Bookcases before the next promotion; publish the dashboard to Tableau Cloud with row-level security so each regional manager sees only their own region.</p>",
  }),
];
