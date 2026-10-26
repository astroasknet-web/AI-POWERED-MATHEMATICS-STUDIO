import { bars, daxPlay, example, flow, formula, list, mistakes, module_, p, table, topic, tryIt, warn } from "../kit.mjs";
import { miniModel } from "./bi-data.mjs";

const V_CAT = { label: "Sales by category", rows: ["Products[Category]"] };
const V_REGION = { label: "Sales by region", rows: ["Stores[Region]"] };
const V_YEAR = { label: "Sales by year", rows: ["Dates[Year]"] };
const V_MONTH_YEAR = { label: "Month by year", rows: ["Dates[Month]"], cols: ["Dates[Year]"] };
const V_CAT_YEAR = { label: "Category by year", rows: ["Products[Category]"], cols: ["Dates[Year]"] };

/* ------------------------------------------------------------------------------------------------ module 4 */
export const M4 = module_({
  slug: "calculate-and-time-intelligence", title: "CALCULATE and time intelligence", hours: 5, level: "Intermediate",
  summary: "Change the filter context with CALCULATE, build percent-of-total and share measures, and compare time periods: year to date, last year and growth.",
  outcome: "You can write CALCULATE measures that add, replace or remove filters, build percent of total and share within a group, and calculate year to date, same period last year and year-on-year growth.",
  intro: "If DAX has a single most important function, it is **CALCULATE**. It evaluates an expression in a **modified** filter context: 'sales, but for Home only', 'sales, ignoring the category filter', 'sales, for the same period last year'. Nearly every business measure beyond a plain total is CALCULATE in disguise. This module teaches how it works, then applies it to the measures every report needs: percent of total, share within a category, year to date and growth. The practice windows run all of it on a small star schema.",
  topics: [
    topic({
      title: "CALCULATE: changing the filters", slug: "calculate",
      blocks: [
        formula("CALCULATE", "CALCULATE( expression, filter1, filter2, ... )", "Evaluate the expression after applying the filters to the current context. A filter on a column replaces any existing filter on that same column."),
        daxPlay({ id: "pb-play-calculate", title: "Sales for Home only", intro: "The filter on Products[Category] replaces whatever category the cell has, so every row shows Home's sales. Try \"Stationery\", or use the 'Sales by region' visual.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])\nHome Sales =\n    CALCULATE([Total Sales], Products[Category] = \"Home\")", visuals: [V_CAT, V_REGION, V_YEAR], show: "Home Sales" }),
        p("Look at the result by category: the Stationery row shows 400, **not 0**. The row's own filter (Category = Stationery) was **replaced** by CALCULATE's filter (Category = Home). That is the rule: a CALCULATE filter on a column overrides the existing filter on that column, and adds to filters on other columns."),
        table("What each filter argument does", ["Argument", "Effect"], [["`Products[Category] = \"Home\"`", "Replaces the filter on Category with Home"], ["`Dates[Year] = 2025`", "Replaces the filter on Year with 2025; other filters stay"], ["`Products[Category] IN { \"Home\", \"Stationery\" }`", "Replaces Category with the listed values"], ["`FILTER(Products, Products[Price] >= 100)`", "Keeps only products meeting a condition on several columns"], ["`ALL(Products)`", "Removes every filter on the Products table"], ["`KEEPFILTERS(...)`", "Adds the new filter **without** replacing the old one (intersects)"]]),
        example("Why the order of filters does not matter", "`CALCULATE([Total Sales], Dates[Year] = 2025, Products[Category] = \"Home\")`", ["All filter arguments are evaluated in the **original** context, then applied together.", "Year becomes 2025, Category becomes Home, other filters remain.", "Swapping the two filters gives the same answer."], "CALCULATE first works out all the new filters, then evaluates the expression once."),
        warn("A true/false filter such as `Products[Category] = \"Home\"` can mention **one column** (or columns of one table). For conditions that use several tables, or an aggregate such as `[Total Sales] > 1000`, use FILTER over the right table, because a boolean filter cannot contain a measure."),
        mistakes(["Expecting CALCULATE to add to an existing filter on the same column: it replaces (use KEEPFILTERS to intersect).", "Writing a measure inside a boolean filter argument.", "Forgetting that a row context becomes a filter inside CALCULATE (context transition)."]),
        tryIt("What does `CALCULATE([Total Sales], Stores[Region] = \"North\")` return in the cell for category Home?", "Sales of Home products in North stores: the Home row filter stays (different column), and Region becomes North."),
      ],
      points: ["CALCULATE evaluates an expression in a modified filter context.", "A filter on a column replaces the existing filter on that column and adds to other columns.", "Use FILTER for conditions that need measures or several tables; KEEPFILTERS to intersect."],
      check: [["CALCULATE([Total Sales], Products[Category] = \"Home\") in the Stationery row shows:", ["0", "Home's sales", "Stationery's sales", "An error"], 1, "The new filter replaces the row's category filter."], ["Filter arguments of CALCULATE are applied:", ["One at a time, in order", "Together, each evaluated in the original context", "Only the first", "Randomly"], 1, "Their order does not matter."]],
    }),
    topic({
      title: "ALL, ALLEXCEPT and percent of total", slug: "all-share",
      blocks: [
        p("Removing filters is as useful as adding them. `ALL(table)` or `ALL(column)` removes the filters on a table or column; `REMOVEFILTERS` does the same and reads better; `ALLEXCEPT(table, column)` removes all filters on a table **except** those on the named columns."),
        formula("Percent of total", "Share of Total = DIVIDE( [Total Sales], CALCULATE([Total Sales], ALL(Products)) )", "The numerator keeps the row's filters; the denominator removes the Products filters, so it is the total of all products."),
        daxPlay({ id: "pb-play-share", title: "Percent of total", intro: "Each category's share of all sales. Change ALL(Products) to ALL(Stores) and see what the denominator becomes, or try the 'Category by year' visual.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])\nShare of Total =\n    DIVIDE(\n        [Total Sales],\n        CALCULATE([Total Sales], ALL(Products))\n    )", visuals: [V_CAT, V_CAT_YEAR], show: "Share of Total" }),
        table("Result by category", ["Category", "Total Sales", "Share of Total"], [["Stationery", "510", "0.5604"], ["Home", "400", "0.4396"], ["Total", "910", "1"]]),
        p("Format the measure as a percentage in Power BI (Measure tools → Format → Percentage) and the shares read 56.0% and 44.0%. Notice that the shares add up to 100%, which is a good sanity check."),
        example("Share within a group", "Each product's share of **its category** (not of all sales).", ["The denominator must keep the category filter but remove the product filter.", "`ALLEXCEPT(Products, Products[Category])` removes every Products filter except the category.", "`DIVIDE([Total Sales], CALCULATE([Total Sales], ALLEXCEPT(Products, Products[Category])))`."], "With ALL the share would be of everything; with ALLEXCEPT it is of the group."),
        daxPlay({ id: "pb-play-allexcept", title: "Share within category", intro: "Rows are category then product. The denominator keeps the category and removes the product filter.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])\nShare in Category =\n    DIVIDE(\n        [Total Sales],\n        CALCULATE([Total Sales], ALLEXCEPT(Products, Products[Category]))\n    )", visuals: [{ label: "Product in category", rows: ["Products[Category]", "Products[Product]"] }], show: "Share in Category" }),
        warn("`ALL` removes filters from the **table or column you name**, nothing else. If a slicer on Stores should also be ignored in the denominator, you must remove it too: `ALL(Products), ALL(Stores)` (or use ALLSELECTED in the Desktop, which this practice engine does not run)."),
        mistakes(["Using ALL on the wrong table, so the denominator is not the total you meant.", "Forgetting to format the result as a percentage.", "Using ALL on a whole table when only one column should be cleared."]),
        tryIt("Which function removes all filters on Products except the Category filter?", "`ALLEXCEPT(Products, Products[Category])`."),
      ],
      points: ["ALL, REMOVEFILTERS and ALLEXCEPT remove filters for a measure's denominator.", "Percent of total = measure ÷ the same measure with the relevant filters removed.", "Check that shares add up to 100%."],
      check: [["The denominator of 'percent of total' usually uses:", ["The same filters as the numerator", "ALL (or REMOVEFILTERS) on the table being split", "SUM only", "FILTER"], 1, "It must ignore the row filter."], ["ALLEXCEPT(Products, Products[Category]) keeps:", ["No filters", "Only the Category filter", "All filters", "Only Product"], 1, "It removes the others."]],
    }),
    topic({
      title: "Time intelligence: year to date and last year", slug: "time-intelligence",
      blocks: [
        p("Time intelligence functions need the **date table** from module 2. They return a set of dates, and CALCULATE uses those dates as a filter."),
        table("The core time-intelligence functions", ["Function", "Returns", "Example use"], [["`TOTALYTD([m], Dates[Date])`", "The measure from 1 January of the year to the latest date in context", "Year-to-date sales"], ["`SAMEPERIODLASTYEAR(Dates[Date])`", "The same dates one year earlier", "Sales last year"], ["`DATEADD(Dates[Date], -1, MONTH)`", "The dates shifted by a number of days, months, quarters or years", "Sales last month"], ["`DATESYTD`, `DATESMTD`", "Dates from the start of the year or month to now", "Used inside CALCULATE"], ["`PREVIOUSMONTH`, `PREVIOUSYEAR`", "The whole previous month or year", "Last month's total"]]),
        daxPlay({ id: "pb-play-ytd", title: "Year to date", intro: "Each cell is the running total from 1 January to that month. Compare 2024 and 2025 in the 'Month by year' visual, and note the totals column.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])\nSales YTD = TOTALYTD([Total Sales], Dates[Date])", visuals: [V_MONTH_YEAR], show: "Sales YTD" }),
        daxPlay({ id: "pb-play-ly", title: "Same period last year, and growth", intro: "Sales LY looks one year back. 2024 has no earlier year in the data, so its row is blank and hidden, as in Power BI. Growth is the change divided by last year.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])\nSales LY =\n    CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date]))\nGrowth % =\n    VAR ly = [Sales LY]\n    RETURN DIVIDE([Total Sales] - ly, ly)", visuals: [V_YEAR, V_CAT_YEAR], show: "Growth %" }),
        formula("Year-on-year growth", "growth = (this period − same period last year) ÷ same period last year", "In the sample, 2025 sales were 660 against 250 in 2024: growth is (660 − 250) ÷ 250 = 1.64, or 164%."),
        example("Why the date table matters", "A measure uses `SAMEPERIODLASTYEAR(Sales[Date])` on the fact table's date column.", ["The fact table has gaps: no row for days without sales.", "Time intelligence on a column with gaps gives wrong or empty results.", "Using `Dates[Date]` from a proper, continuous date table fixes it."], "Always pass the date column of the date table, never the fact table's own date column."),
        warn("**Compare like with like.** Year to date in the middle of a year compared with a full previous year overstates growth. A YTD against the **same YTD last year** is the fair comparison; `SAMEPERIODLASTYEAR` applied to a YTD measure does exactly that."),
        mistakes(["Using the date column of the fact table in time-intelligence functions.", "A date table with gaps or that does not cover the whole data.", "Comparing a partial period with a full one."]),
        tryIt("What does `CALCULATE([Total Sales], DATEADD(Dates[Date], -1, MONTH))` give for March 2025?", "February 2025's sales (the previous month)."),
      ],
      points: ["Time intelligence needs a continuous date table and uses its Date column.", "TOTALYTD, SAMEPERIODLASTYEAR and DATEADD return dates that CALCULATE uses as a filter.", "Compare the same period last year, not a partial against a full period."],
      check: [["Which date column do you pass to time-intelligence functions?", ["The fact table's date", "The date table's Date column", "Any text column", "Year"], 1, "A continuous, marked date table is required."], ["Year-on-year growth is:", ["this − last", "(this − last year's same period) ÷ last year's same period", "this ÷ 100", "last year ÷ this"], 1, "Change as a share of the base."]],
    }),
    topic({
      title: "Patterns that combine it all", slug: "patterns",
      blocks: [
        p("Real reports use a handful of measure patterns again and again. Build them from small measures."),
        table("Measure patterns", ["Pattern", "Shape"], [["Percent of total", "`DIVIDE([m], CALCULATE([m], ALL(dimension)))`"], ["Growth versus last year", "`VAR ly = CALCULATE([m], SAMEPERIODLASTYEAR(Dates[Date])) RETURN DIVIDE([m] - ly, ly)`"], ["Running total", "`TOTALYTD([m], Dates[Date])` or a CALCULATE over dates up to now"], ["Status flag", "`SWITCH(TRUE(), cond1, \"A\", cond2, \"B\", \"C\")`"], ["Customers who bought", "`DISTINCTCOUNT(Sales[CustomerID])`"], ["Average per order", "`DIVIDE([Total Sales], [Order Count])`"]]),
        daxPlay({ id: "pb-play-switch", title: "A status measure with SWITCH(TRUE())", intro: "SWITCH(TRUE(), ...) checks the conditions in order and returns the first that is true. Change the thresholds and the labels.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])\nSales LY = CALCULATE([Total Sales], SAMEPERIODLASTYEAR(Dates[Date]))\nStatus =\n    VAR growth = DIVIDE([Total Sales] - [Sales LY], [Sales LY])\n    RETURN\n        SWITCH(\n            TRUE(),\n            ISBLANK(growth), \"No prior year\",\n            growth >= 1, \"Star\",\n            growth >= 0, \"Steady\",\n            \"Watch\"\n        )", visuals: [V_CAT_YEAR], show: "Status" }),
        list("Habits for a maintainable model of measures", ["Create a separate, empty table named `_Measures` and keep all measures there.", "Name measures for the business meaning: `Sales LY`, not `Measure 4`.", "Put the format (currency, percentage, decimals) in the measure, not in each visual.", "Build ratios from base measures so a change flows everywhere.", "Write a short comment above any measure that is not obvious."]),
        example("A change flows everywhere", "Finance decides that 'sales' should exclude cancelled orders.", ["Because every other measure is built on [Total Sales], you change that one definition.", "Share, growth, YTD and the dashboards all update.", "In a model with the logic copied into twenty visuals, you would edit twenty places and miss one."], "Small, well-named base measures are the best investment in a model."),
        warn("Avoid measures that are one gigantic nested formula. If you cannot explain it in a sentence, split it into smaller measures or variables."),
        mistakes(["Copying the same logic into several measures.", "Measures scattered across tables.", "No formatting, so users see 0.5604 where they should see 56%."]),
      ],
      points: ["A few patterns (share, growth, YTD, status) cover most reports.", "Keep measures in one place, named for their meaning, built from small base measures.", "Put formatting in the measure; comment what is not obvious."],
      check: [["Why build ratios from base measures?", ["It is required", "A change to a base definition flows everywhere", "It is shorter", "It avoids filters"], 1, "One definition, many uses."], ["SWITCH(TRUE(), ...) returns:", ["All results", "The result of the first true condition", "The last result", "A table"], 1, "Conditions are tested in order."]],
    }),
  ],
  practical: { title: "Practical: the measures every report needs", intro: "Open the **Home sales**, **Percent of total**, **Share within category**, **Same period last year**, **Year to date** and **Growth %** labs.", steps: ["For each measure, say in words which filter changes: added, replaced or removed.", "Run it in the visuals and check the total row.", "Check that shares add up to 100%.", "Press Check my work: it compares your measure with the model measure in every visual."] },
  terms: [["CALCULATE", "Evaluates an expression in a modified filter context."], ["ALL / REMOVEFILTERS", "Remove filters from a table or column."], ["ALLEXCEPT", "Remove all filters on a table except the named columns."], ["KEEPFILTERS", "Add a filter without replacing the existing one."], ["Time intelligence", "Functions that shift or accumulate dates."], ["Year to date", "From 1 January to the latest date in context."], ["Year-on-year growth", "Change versus the same period last year, as a share."]],
  quiz: [
    ["A CALCULATE filter on a column:", ["Adds to the existing filter on it", "Replaces the existing filter on that column", "Is ignored", "Removes all filters"], 1, "It overrides that column's filter."],
    ["The denominator of percent of total uses:", ["ALL on the dimension being split", "SUM only", "A slicer", "TOTALYTD"], 0, "It must ignore the row's filter."],
    ["ALLEXCEPT(Products, Products[Category]) keeps:", ["Category filter only (of Products)", "Nothing", "Everything", "Dates"], 0, "All other Products filters are removed."],
    ["TOTALYTD needs:", ["No date table", "A proper date table's Date column", "A text column", "A relationship to Products"], 1, "Time intelligence needs a continuous date table."],
    ["SAMEPERIODLASTYEAR returns:", ["A number", "A set of dates one year earlier", "A table of products", "Text"], 1, "CALCULATE uses it as a filter."],
    ["In the sample, 2025 sales 660 versus 250 in 2024 give growth of:", ["164%", "40%", "37.9%", "2.64%"], 0, "(660 − 250) ÷ 250 = 1.64."],
    ["A boolean filter in CALCULATE can reference:", ["A measure", "Columns of a single table", "Any number of tables", "A chart"], 1, "Use FILTER for more complex conditions."],
    ["Why keep all measures in one table?", ["Required by DAX", "They are easier to find and maintain", "They run faster", "It hides them"], 1, "Organisation helps maintenance."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 5 */
export const M5 = module_({
  slug: "visuals-and-report-design", title: "Visuals and report design", hours: 3.5, level: "Intermediate",
  summary: "Choose the right visual for each question, lay out a report people can read at a glance, and use filters and interactions well.",
  outcome: "You can choose visuals by the question, design a clear page layout, use slicers and filters at the right level, add drill-through and tooltips, and avoid the habits that make reports hard to read.",
  intro: "A report is a conversation between a person and the data. The best model and the cleverest measures are wasted if the page confuses people. This module is about the design decisions that make a report clear: which visual answers which question, where to put things, how interactions should work, and how to make a report accessible and fast. The report canvas is Power BI Desktop's, so this module teaches the decisions and checks your understanding with sorting and writing activities rather than a canvas.",
  topics: [
    topic({
      title: "Choosing the right visual", slug: "visuals",
      blocks: [
        p("Pick the visual by the **question**, not by what looks interesting."),
        table("Question to visual", ["You want to show", "Use", "Avoid"], [["One headline number against a target", "Card or KPI visual", "A gauge with decorative colours"], ["Compare categories", "Bar chart (sorted), or clustered columns", "A pie with many slices"], ["Change over time", "Line chart or area chart", "A column chart with a truncated axis"], ["Parts of a whole (few parts)", "A stacked bar, donut or treemap with a handful of parts", "3D charts"], ["Relationship between two numbers", "Scatter chart", "Two separate charts"], ["Ranking", "A sorted bar chart (top N)", "An unsorted table"], ["Exact values", "Table or matrix", "A chart that hides the numbers"], ["Geography", "Map (when location matters)", "A map of data that is not about place"], ["Flow or contribution to a change", "Waterfall", "A line chart"]]),
        bars("A sorted bar chart compares categories at a glance (revenue by category, ₹ thousand)", [["Home", 115.2], ["Electronics", 72], ["Stationery", 9.6]], "k"),
        list("Rules of good visual design", ["Bars start at zero; lines may not.", "Sort categories by value unless they have a natural order.", "Use colour to highlight one thing, not to decorate everything.", "Label axes and units; give each visual a title that states the point.", "Remove clutter: gridlines, borders, shadows, 3D.", "Limit each page to about six visuals."]),
        warn("Pie and donut charts are easy to misread beyond three or four slices because people compare angles poorly. A sorted bar chart almost always communicates the same data better."),
        mistakes(["A chart type chosen because it looks impressive.", "Too many colours with no meaning.", "A table where a chart would show the pattern at once."]),
        tryIt("Which visual suits 'which five products sold most?'", "A sorted horizontal bar chart showing the top five (a Top N filter on the visual)."),
      ],
      points: ["Choose the visual by the question: cards for numbers, bars for categories, lines for time, scatter for relationships.", "Bars start at zero; sort; label; use colour with purpose.", "About six visuals per page."],
      check: [["Which visual suits change over time?", ["Pie", "Line", "Scatter without time", "Donut"], 1, "Lines show trends."], ["Pies are best limited to:", ["Dozens of slices", "A few parts", "Time series", "Rankings"], 1, "Many slices are hard to compare."]],
    }),
    topic({
      title: "Layout, slicers, filters and interactions", slug: "layout-interactions",
      blocks: [
        p("A reader should know what the page says within five seconds. Layout does most of the work."),
        list("Page layout guidelines", ["**Top left first**: put the most important number or the page title there; people read from the top left.", "**KPIs across the top**, detail below, filters at the left or top.", "**Group related visuals** and align them to a grid; equal spacing looks professional and calm.", "**Consistent colours**: the same colour always means the same thing across pages.", "**White space** is not wasted space.", "**One page, one story**: split a crowded page into two."]),
        table("Filters at three levels", ["Level", "Applies to", "Example"], [["Visual", "One visual", "Show only the top 5 products in this bar chart"], ["Page", "Every visual on the page", "This page covers the current year only"], ["Report", "Every page", "Exclude test stores"]]),
        p("**Slicers** let the reader filter the page. They are easy to overuse: too many slicers make a page look like a cockpit and invite confusion. Offer the two or three filters people really use (date range, region, category)."),
        list("Interactions that help readers", ["**Cross-filtering**: clicking a bar filters the other visuals. Edit interactions (Format → Edit interactions) when a visual should ignore a click.", "**Drill down**: move through a hierarchy (Year → Quarter → Month).", "**Drill through**: right-click a value to jump to a detail page that is filtered to it.", "**Tooltips**: a custom tooltip page can show extra context on hover.", "**Bookmarks and buttons**: save a state (a view or filter) and let readers jump between them; good for navigation and for toggling between two charts."]),
        example("Designing for the five-second test", "A manager opens the sales report.", ["Top left: a card showing Sales this year with the growth against last year, in green or red.", "Across the top: three more KPI cards (margin %, orders, average order value).", "Below: a line chart of sales by month against last year, and a sorted bar of sales by region.", "Slicers for Year and Category on the left."], "In five seconds the manager knows whether sales are up or down, by how much, and where to look next."),
        warn("Interactivity can hide information: a report that only makes sense after the right slicer is clicked is a puzzle. Always set sensible defaults, and say on the page what the current filters are."),
        mistakes(["Twenty visuals on a page.", "A slicer for every column.", "Colour meaning different things on different pages."]),
        tryIt("What is the difference between drill-down and drill-through?", "Drill-down goes deeper within the same visual (year to quarter to month); drill-through jumps to a different, filtered detail page."),
      ],
      points: ["Lay out for the five-second test: key number top left, KPIs across the top, detail below.", "Filters apply at visual, page or report level; use few slicers.", "Use drill-down, drill-through, tooltips and bookmarks to give detail without clutter."],
      check: [["A page-level filter applies to:", ["One visual", "Every visual on that page", "The whole report", "No visuals"], 1, "Page-level filters affect the page."], ["Drill-through:", ["Goes deeper in the same visual", "Jumps to a detail page filtered by the selected value", "Deletes data", "Prints"], 1, "It opens a detail page."]],
    }),
    topic({
      title: "Accessibility, performance and storytelling", slug: "access-performance",
      blocks: [
        p("A report is only useful if everyone can read it, it loads quickly, and it tells the story."),
        list("Accessibility", ["**Colour contrast**: text and bars must be readable; do not rely on colour alone (add labels or patterns).", "**Alt text** for every visual so screen readers describe it.", "**Tab order**: set the order in which keyboard users move through visuals.", "**Titles that say something**: 'Sales fell in March' rather than 'Sales by month'.", "**Readable font sizes** and enough spacing.", "Use colour-blind-friendly palettes; avoid red/green as the only signal."]),
        list("Performance", ["Reduce data in Power Query: only needed columns and rows.", "Use a star schema and one date table.", "Prefer measures to calculated columns; avoid heavy iterators over large tables.", "Limit visuals per page, and avoid very high-cardinality fields (an invoice number) in visuals.", "Use **Performance Analyzer** (View → Performance analyzer) to see which visual or DAX query is slow.", "Avoid bi-directional filters and many-to-many relationships unless needed."]),
        example("Reading a slow visual", "A page takes eight seconds to load. Performance Analyzer shows one table visual taking six.", ["The table lists every transaction (200,000 rows).", "Replace it with a Top N filter, or a summarised matrix, with drill-through to detail.", "Load time drops to two seconds."], "Measure first, then fix the slowest thing."),
        p("**Storytelling** ties it together: a headline in the title, an order that leads the reader (overview, then cause, then detail), and a clear call to action. Use annotation (text boxes) to point at what matters: 'March fell because of one lost customer'."),
        warn("A beautiful report that tells people nothing is decoration. Before building, write the one sentence you want a reader to take away, and design backward from it."),
        mistakes(["Relying on colour alone to show good and bad.", "Never testing the report for speed or accessibility.", "A story that is only visible after ten clicks."]),
        tryIt("Name two ways to make a report accessible.", "Add alt text to visuals, and ensure good contrast and do not use colour as the only signal (also set tab order and use clear titles)."),
      ],
      points: ["Accessibility: contrast, alt text, tab order, clear titles, not relying on colour alone.", "Performance: trim data, use a star schema, prefer measures, use Performance Analyzer.", "Lead with the takeaway and annotate what matters."],
      check: [["Alt text helps:", ["Search engines only", "Screen-reader users understand visuals", "Printing", "Colour"], 1, "It describes the visual in words."], ["The tool to find slow visuals is:", ["Edit interactions", "Performance Analyzer", "Mark as date table", "Bookmarks"], 1, "It times each visual and query."]],
    }),
  ],
  practical: { title: "Practical: design decisions", intro: "Open the **Which visual?**, **What is wrong with this report?** and **Write the report brief** activities.", steps: ["Choose the visual for each question.", "Spot the design problem and its fix.", "Write the brief: audience, question, key visuals and filters."] },
  terms: [["KPI visual", "A number compared with a target."], ["Slicer", "An on-page filter control."], ["Drill-through", "Jump to a filtered detail page."], ["Bookmark", "A saved view or filter state."], ["Alt text", "A text description of a visual for screen readers."], ["Performance Analyzer", "A tool that times visuals and queries."]],
  quiz: [
    ["The best visual for comparing a handful of categories is:", ["A sorted bar chart", "A 3D pie", "A gauge", "A map"], 0, "Bars compare lengths accurately."],
    ["A page-level filter affects:", ["The report", "Visuals on that page", "One visual", "Nothing"], 1, "Page level."],
    ["Which is a sign of a crowded page?", ["White space", "Twenty visuals and ten slicers", "A clear title", "Alignment"], 1, "Too much hides the message."],
    ["Good accessibility includes:", ["Colour as the only signal", "Alt text and good contrast", "Tiny fonts", "No titles"], 1, "Make it readable for all."],
    ["Drill-down goes:", ["To another page", "Deeper in the same visual's hierarchy", "To another file", "Nowhere"], 1, "Year to quarter to month."],
    ["Performance Analyzer helps you:", ["Choose colours", "Find slow visuals and queries", "Mark a date table", "Share a report"], 1, "Measure before fixing."],
    ["Bars should start at:", ["Zero", "The minimum", "The average", "Any value"], 0, "Length must be proportional."],
    ["A strong visual title:", ["Names the field", "States the point", "Is blank", "Is long"], 1, "Tell readers what to see."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 6 */
export const M6 = module_({
  slug: "publish-secure-and-govern", title: "Publish, secure and govern", hours: 3, level: "Intermediate",
  summary: "Share reports through the Power BI Service, schedule refresh, restrict who sees which rows with row-level security, and keep a model trustworthy as it grows.",
  outcome: "You can describe workspaces, apps and refresh, write a row-level security rule as a DAX filter, and list the practices of a governed, certified model.",
  intro: "Building a report is half the job; getting it to the right people, safely and reliably, is the other half. This module covers the Power BI Service: publishing, workspaces and apps, scheduled refresh and gateways, row-level security (RLS) so that each person sees only their own data, and the governance habits that keep a model trusted. These are Service and Desktop features, so they are explained with scenarios and checked with activities; the DAX that defines an RLS rule is a filter expression that you can practise.",
  topics: [
    topic({
      title: "Publishing, workspaces and apps", slug: "publishing",
      blocks: [
        p("When a report is ready in Desktop, **publish** it to a **workspace** in the Power BI Service. A workspace is a shared space where a team keeps related reports, models and dashboards."),
        table("Sharing choices", ["Option", "Who it suits", "Notes"], [["Workspace roles (Admin, Member, Contributor, Viewer)", "The team that builds and maintains content", "Roles control who can edit, publish and manage"], ["Share a report with a link", "A few colleagues, quickly", "Recipients usually need a suitable licence"], ["Publish an **app**", "A larger audience of consumers", "A packaged, read-only version of the content with its own navigation"], ["Embed in Teams or SharePoint", "People who work there", "Reports appear in the tools they already use"], ["Publish to web", "Public data only", "Anyone with the link can see it: never for private data"]]),
        flow("A typical release path", ["Build in Desktop", "Publish to a development workspace", "Test and review", "Promote to production", "Publish an app to consumers"]),
        warn("**'Publish to web' makes a report public to anyone with the link, with no sign-in.** Never use it for company data. For internal sharing use workspaces, apps and proper permissions."),
        example("Separating build from consumption", "A finance report is used by 200 managers.", ["The analysts work in a workspace with Contributor access.", "Managers get an app: a polished, read-only copy that updates when the analysts publish a new version.", "A mistake in a draft never reaches a manager."], "Apps keep consumers away from half-finished work."),
        p("**Licensing** decides who can publish and share: a free licence for viewing in some situations, Pro or Premium Per User for sharing and collaboration, and Premium or Fabric capacity for large audiences and advanced features. Details and prices change, so check Microsoft's current licensing guide for your organisation."),
        mistakes(["Publishing to web for convenience.", "Everyone editing the production report.", "Sharing individual reports one by one instead of an app."]),
        tryIt("Which option gives a large audience a read-only, packaged version of reports?", "Publish an app from the workspace."),
      ],
      points: ["Publish from Desktop to a workspace; share with roles, links or an app.", "Use apps for large audiences and separate development from production.", "Never use Publish to web for private data."],
      check: [["An app is:", ["A phone", "A packaged read-only version of workspace content for consumers", "A visual", "A data source"], 1, "It is a curated release."], ["Publish to web is:", ["Safe for company data", "Public to anyone with the link", "Required", "Encrypted per user"], 1, "It exposes data without sign-in."]],
    }),
    topic({
      title: "Refresh, gateways and keeping data current", slug: "refresh",
      blocks: [
        p("Imported data is a snapshot. **Scheduled refresh** reloads it on a timetable so reports stay current."),
        table("Refresh basics", ["Topic", "What to know"], [["Scheduled refresh", "Set in the Service on the semantic model: choose the days and times; a limited number of refreshes a day on shared capacity, more on Premium"], ["On-premises sources", "Need an **on-premises data gateway** that securely connects the Service to a database or file inside your network"], ["Cloud sources", "Connect directly with stored credentials"], ["Incremental refresh", "Reload only recent partitions of a large table instead of everything"], ["Failures", "The owner is emailed; check credentials, gateway status, changed column names or a source that was moved"]]),
        list("A reliable refresh", ["Use a service account or organisational credential, not one person's password.", "Keep the gateway on a reliable always-on machine, and install it as a standard (not personal) gateway for shared use.", "Schedule refresh after the source's own overnight load completes.", "Monitor failures and set alerts.", "Do not rename or remove source columns without updating the query."]),
        example("A morning report that is stale", "Managers complain that the 8 a.m. report shows yesterday's data.", ["The source database finishes its overnight load at 6:30.", "The refresh was scheduled at 5:00, before the load.", "Move the refresh to 7:00: the report is current at 8:00."], "Align refresh with when the source is ready."),
        warn("A report's 'last refreshed' time is easy to forget. Show it on the page, so readers know how old the numbers are."),
        mistakes(["Refreshing before the source has finished updating.", "Tying refresh to one employee's personal credentials.", "A gateway on a laptop that is switched off at night."]),
        tryIt("Why does an on-premises database need a gateway?", "The Power BI Service is in the cloud; the gateway is a secure bridge so it can reach data inside your own network."),
      ],
      points: ["Scheduled refresh keeps imported data current; time it after the source loads.", "On-premises sources need a gateway.", "Use shared credentials, monitor failures and show the last-refreshed time."],
      check: [["Why schedule refresh after the source's overnight load?", ["It is cheaper", "So the report reflects the finished data", "Power BI requires it", "To skip it"], 1, "Refresh too early reloads old data."], ["A gateway is needed for:", ["Cloud files only", "Data sources inside your own network", "Charts", "Colours"], 1, "It bridges the cloud and on-premises."]],
    }),
    topic({
      title: "Row-level security and governance", slug: "rls-governance",
      blocks: [
        p("**Row-level security (RLS)** restricts which rows of data each person sees, with one report and one model. You define **roles**, each with a DAX **filter expression** on a table, and assign people to roles in the Service."),
        table("RLS examples", ["Role", "Filter expression on a table", "Effect"], [["North managers", "`Stores[Region] = \"North\"`", "Only North's stores, and so only their sales (the filter flows to Sales)"], ["Product team", "`Products[Category] IN { \"Home\", \"Stationery\" }`", "Only those categories"], ["Each manager (dynamic)", "`Stores[ManagerEmail] = USERPRINCIPALNAME()`", "Each user sees their own stores: one role for everyone"]]),
        daxPlay({ id: "pb-play-rls", title: "What a role would see", intro: "An RLS rule is a filter on a dimension table. This measure shows the sales a North-only role would see: it applies the same filter. Compare with the unfiltered total.", model: { ...miniModel, tables: miniModel.tables }, code: "Total Sales = SUM(Sales[Amount])\nNorth Role Sales =\n    CALCULATE([Total Sales], Stores[Region] = \"North\")", visuals: [V_REGION, V_CAT], show: "North Role Sales" }),
        p("The filter flows through the relationship exactly as in the DAX you have written: a rule on Stores restricts Sales. In the Service you test a role with **View as**. Desktop lets you define roles (Modeling → Manage roles) and test them with View as."),
        warn("**RLS only protects data if people access it through the Service with their own identity, and if they are not workspace Admins, Members or Contributors** (those roles can see all the data). Test every role, and never rely on hiding a visual as security."),
        list("Governance habits", ["**Certify and promote** trusted semantic models, so people reuse them instead of building their own copies.", "**Document**: descriptions on tables, columns and measures.", "**Sensitivity labels** classify data (for example Confidential) and travel with it.", "**Lineage and impact analysis** show which reports depend on a model before you change it.", "**Naming standards** and version control for the model files.", "**Least privilege**: give people the lowest access that lets them do their job."]),
        example("One model, many audiences", "A regional sales model serves four regional managers and a head-office team.", ["Four RLS roles, one per region, each with a filter on Stores[Region].", "A head-office role with no filter.", "One report, one refresh, and each manager sees only their region."], "RLS replaces four copies of the report with one."),
        mistakes(["Hiding a visual and calling it security.", "Testing RLS only as the report author (an admin sees everything).", "Building a new model for every report."]),
        tryIt("Write an RLS filter so each manager sees only their stores, if Stores has a ManagerEmail column.", "`Stores[ManagerEmail] = USERPRINCIPALNAME()` (a dynamic rule: one role for all managers)."),
      ],
      points: ["RLS uses DAX filter expressions on tables, per role, with one model.", "Test with View as; workspace Admins, Members and Contributors bypass RLS.", "Govern with certified models, documentation, sensitivity labels and least privilege."],
      check: [["An RLS rule is:", ["A chart", "A DAX filter expression on a table", "A refresh schedule", "A slicer"], 1, "It filters a table for a role."], ["Who can bypass RLS?", ["Viewers", "Workspace Admins, Members and Contributors", "Nobody", "App users"], 1, "Edit-level roles see all data."]],
    }),
  ],
  practical: { title: "Practical: deliver and secure", intro: "Open the **Choose the sharing option**, **Write the RLS rule** and the final project labs.", steps: ["Choose the right sharing option for each audience.", "Write an RLS rule as a DAX filter and test it with a measure.", "Review the model against the governance checklist."] },
  terms: [["Workspace", "A shared space for related content."], ["App", "A packaged, read-only release of workspace content."], ["Scheduled refresh", "Reloading imported data on a timetable."], ["Gateway", "A secure bridge to on-premises data."], ["Row-level security", "Restricting which rows a person sees."], ["Sensitivity label", "A classification that travels with data."], ["Certified model", "A model endorsed as trustworthy for reuse."]],
  quiz: [
    ["An app is best for:", ["Developing", "Giving a large audience a curated read-only release", "Refreshing data", "RLS"], 1, "It packages content for consumers."],
    ["Publish to web:", ["Is secure by default", "Makes a report public to anyone with the link", "Needs a gateway", "Applies RLS"], 1, "Never use it for private data."],
    ["An on-premises database needs:", ["A gateway", "A bigger monitor", "A pie chart", "A slicer"], 0, "The gateway links the cloud and your network."],
    ["Scheduled refresh should run:", ["Before the source loads", "After the source's load completes", "Never", "Randomly"], 1, "Otherwise the report is stale."],
    ["RLS roles are defined with:", ["DAX filter expressions", "Pie charts", "Gateways", "Bookmarks"], 0, "A filter expression on a table."],
    ["Workspace Admins and Contributors:", ["Are restricted by RLS", "See all data and bypass RLS", "Cannot publish", "Are viewers"], 1, "Test as a viewer."],
    ["Certified models help because:", ["They look nicer", "People reuse a trusted model instead of making copies", "They remove refresh", "They are faster to draw"], 1, "One trusted source."],
    ["Least privilege means:", ["Everyone is admin", "Give only the access needed for the job", "No access", "Share passwords"], 1, "Limit access to what is needed."],
  ],
});

