import { code, daxPlay, def, example, flow, formula, list, mistakes, module_, p, table, tip, topic, tryIt, warn } from "../kit.mjs";
import { miniModel } from "./bi-data.mjs";

const NOTE_RUN = "Power BI Desktop is a Windows application, so the report-building steps in this course are explained and shown rather than run in your browser. What does run here is the DAX: the practice window evaluates your measures on a model, in a matrix like Power BI's.";
const V_CAT = { label: "Sales by category", rows: ["Products[Category]"] };
const V_REGION = { label: "Sales by region", rows: ["Stores[Region]"] };
const V_YEAR = { label: "Sales by year", rows: ["Dates[Year]"] };
const V_CAT_YEAR = { label: "Category by year", rows: ["Products[Category]"], cols: ["Dates[Year]"] };

/* ------------------------------------------------------------------------------------------------ module 1 */
export const M1 = module_({
  slug: "power-bi-and-the-bi-workflow", title: "Power BI and the BI workflow", hours: 3, level: "Getting started",
  summary: "See what business intelligence is for, how Power BI's parts fit together, how data gets in, and how Power Query prepares it.",
  outcome: "You can describe the Power BI components and the BI workflow, choose between Import and DirectQuery, and explain what Power Query steps and query folding do.",
  intro: "Business intelligence (BI) turns data into decisions people can see: a sales dashboard a manager opens every Monday, a report that shows why a number moved. Power BI is Microsoft's BI tool, and it is built around a simple pipeline: get data, shape it, model it, visualise it, share it. This course teaches the middle of that pipeline in depth, the **data model** and the **DAX** language that makes a report intelligent, because that is where reports are made right or wrong. One honest note up front: " + NOTE_RUN,
  topics: [
    topic({
      title: "What Power BI is, and its parts", slug: "what-is-power-bi",
      blocks: [
        p("Power BI is a family of tools, not one program. Knowing which part does what saves a lot of confusion."),
        table("The Power BI family", ["Part", "What it is", "Typical use"], [["Power BI Desktop", "A free Windows application", "Connect to data, shape it, build the model and the report"], ["Power BI Service", "The online site (app.powerbi.com)", "Publish, share, schedule refresh, collaborate, build dashboards"], ["Power BI Mobile", "Apps for phones and tablets", "View and interact with reports on the move"], ["Power BI Report Builder", "A separate desktop tool", "Paginated (print-ready) reports"], ["Power BI Report Server", "An on-premises server", "Organisations that must keep reports inside their own network"]]),
        flow("The BI workflow", ["Get data from sources", "Transform it with Power Query", "Model: tables, relationships, measures", "Visualise in a report", "Publish and share"]),
        p("The **semantic model** (the new name for what was called a *dataset*) is the heart: the tables, relationships and measures that many reports can share. A good model means a new report takes minutes and every report gives the same numbers; a bad one means every report needs its own fixes."),
        def("Semantic model", "The data tables, relationships, calculations (measures) and settings behind a report. One model can feed many reports."),
        example("Who does what in a small team", "A retailer's BI workflow.", ["An analyst builds the model and report in Desktop and publishes it to a workspace in the Service.", "The Service refreshes the data every morning.", "Store managers open the report on their phones; the finance lead builds a second report from the same model."], "Build the model once and reuse it. That is the single biggest time saver in Power BI."),
        warn("Several screens in this course are described rather than run, because they need the desktop app. Where that is so, the lesson says so, and the practice windows that do run (DAX) check that you understand the idea."),
        tip("When you meet a new Power BI term, ask: is it about data (Power Query), the model, calculation (DAX), presentation (the report) or sharing (the Service)? Sorting terms this way makes the product much less confusing."),
        mistakes(["Thinking Power BI is only a charting tool. Most of the skill is in the model and the measures.", "Building a separate copy of the data for every report.", "Skipping the model and putting everything in one huge flat table."]),
        tryIt("Which part would you use to share a finished report with colleagues?", "The Power BI Service: publish the report from Desktop to a workspace, then share it or publish an app."),
      ],
      points: ["Desktop builds, the Service shares, Mobile views, Report Builder makes paginated reports.", "The workflow is get, transform, model, visualise, share.", "A semantic model is built once and reused by many reports."],
      check: [["Where do you build the data model and the report?", ["Power BI Mobile", "Power BI Desktop", "The browser only", "Excel"], 1, "Desktop is the authoring tool."], ["A semantic model is:", ["A chart", "The tables, relationships and measures behind reports", "A colour theme", "A phone app"], 1, "It is the shared foundation."]],
    }),
    topic({
      title: "Getting data: connectors and storage modes", slug: "storage-modes",
      blocks: [
        p("Power BI connects to hundreds of sources through **connectors**: Excel and CSV files, folders, SQL databases, SharePoint, web APIs, cloud services. The first real decision is how the data is stored once connected."),
        table("Storage modes", ["Mode", "How it works", "Good for", "Watch out"], [["Import", "Data is copied into Power BI's compressed in-memory engine", "Speed; the full set of DAX and Power Query features", "Data is as old as the last refresh; size limits"], ["DirectQuery", "Nothing is copied; each visual sends a query to the source when you view it", "Very large data; always-current data", "Slower; some features limited; load on the source"], ["Live connection", "Connect to a model that already exists elsewhere", "Reusing one governed model", "You cannot change the model"], ["Composite", "Mix of Import and DirectQuery tables in one model", "Large facts plus small imported lookups", "More complex to design"]]),
        p("**Import is the default choice.** It is fast because Power BI's engine stores each column compressed in memory, and it supports everything. Choose DirectQuery only when the data is too big to import or must be current to the minute."),
        example("Choosing a mode", "A sales table has 8 million rows and finance reviews it weekly.", ["Eight million rows compress well: Import is usually fine.", "Weekly review does not need live data: a scheduled refresh each morning is enough.", "Import is faster for users and supports full DAX."], "Reach for DirectQuery when you must, not by default."),
        list("Habits when connecting", ["Connect to the cleanest, most stable source available (a database view rather than a hand-edited spreadsheet).", "Bring in only the columns and rows you need; every extra column costs memory.", "Use a **parameter** for a folder path or server name so the report moves between test and production.", "Keep credentials out of the file: Power BI stores them securely with the data source."]),
        warn("Hand-edited spreadsheets are the fragile link in many reports: someone adds a column, renames a header or leaves a blank row, and the refresh fails. Connect to a controlled source whenever you can."),
        mistakes(["Choosing DirectQuery 'to stay live' for data that changes once a day.", "Importing every column of a wide table.", "Pointing a report at a file on a personal computer."]),
        tryIt("Which storage mode is the default, and why?", "Import: it is fast and supports the full feature set; the data is refreshed on a schedule."),
      ],
      points: ["Connectors bring data in; Import copies it into a fast in-memory engine.", "DirectQuery queries the source live: for huge or always-current data only.", "Bring in only what you need and prefer controlled sources."],
      check: [["Which mode copies the data into Power BI?", ["DirectQuery", "Import", "Live connection", "None"], 1, "Import loads a compressed copy."], ["DirectQuery is best when:", ["Data is tiny", "Data is too big to import or must be current", "You want faster visuals", "You use Excel files"], 1, "It trades speed for freshness and scale."]],
    }),
    topic({
      title: "Power Query: preparing data with repeatable steps", slug: "power-query",
      blocks: [
        p("**Power Query** (the Transform data window) is where you clean and reshape data before it reaches the model. Every action you take becomes a recorded, editable **applied step**, written in a language called **M**. Refreshing the report replays all the steps on the latest data."),
        table("Common transformations", ["Task", "Power Query command"], [["Remove unwanted columns", "Choose Columns / Remove Columns"], ["Fix types (text, number, date)", "Data Type (set it explicitly)"], ["Clean text", "Transform → Format → Trim, Clean, Capitalize"], ["Split 'Pune, 411001'", "Split Column → By Delimiter"], ["Months in columns to rows", "Transform → Unpivot Columns"], ["Summarise before loading", "Group By"], ["Stack two tables", "Append Queries"], ["Look up from another table", "Merge Queries (a join)"], ["Remove blanks and duplicates", "Remove Rows"]]),
        example("A tidy-up in five steps", "A monthly sales file arrives with a title row, months as column headings and prices stored as text.", ["Use First Row as Headers, after removing the title row.", "Select the Product column and choose **Unpivot Other Columns**: months become rows.", "Set Month to a date type and Amount to a decimal type.", "Remove blank rows.", "Rename the columns clearly and Close & Apply."], "Next month's file goes through the same five steps automatically."),
        def("Query folding", "When Power Query translates your steps into a single query the source database runs itself (for example SQL), so the filtering and grouping happen at the source and only the result travels to Power BI. Steps that fold are fast; one step that cannot fold may force everything after it to run locally."),
        warn("Do the steps that reduce data (filter rows, remove columns) **early**, so they can fold to the source. A late filter after a step that breaks folding can mean Power BI downloads everything first."),
        p("This course's browser practice does not run Power Query: it needs Power BI Desktop. The cleaning ideas are the same as in the Excel and Python courses: trim, set types, unpivot, remove blanks and duplicates, and record what you did. If you understand those, you understand Power Query."),
        mistakes(["Leaving columns as the wrong type, which breaks relationships and totals later.", "Editing values by hand in the query instead of fixing the rule.", "Merging queries on columns with different types or stray spaces."]),
        tryIt("Which command turns month columns into rows?", "Unpivot Columns (or Unpivot Other Columns)."),
      ],
      points: ["Power Query records cleaning as applied steps (written in M) that refresh replays.", "Filter and remove columns early so steps can fold to the source.", "Set data types explicitly and keep the cleaning rule-based."],
      check: [["What is an applied step?", ["A chart", "A recorded transformation that is replayed on refresh", "A DAX measure", "A workspace"], 1, "Power Query records every action."], ["Query folding means:", ["Folding a report", "Power Query's steps run as one query at the data source", "Compressing a file", "Merging two charts"], 1, "The source does the work."]],
    }),
  ],
  practical: { title: "Practical: orient yourself", intro: "Open the **Which Power BI part?** and **Import or DirectQuery?** labs.", steps: ["Sort each activity into the Power BI component that does it.", "Choose the storage mode that fits each situation.", "Say why in one sentence."] },
  terms: [["Power BI Desktop", "The authoring application for models and reports."], ["Power BI Service", "The online site for publishing and sharing."], ["Semantic model", "The tables, relationships and measures behind reports."], ["Import", "Data copied into Power BI's in-memory engine."], ["DirectQuery", "Each visual queries the source live."], ["Applied step", "A recorded Power Query transformation."], ["Query folding", "Steps run at the source as one query."]],
  quiz: [
    ["The BI workflow is:", ["Visualise, then get data", "Get, transform, model, visualise, share", "Share, then model", "Model only"], 1, "Data comes first."],
    ["Which tool is used to publish and share reports online?", ["Power BI Desktop", "Power BI Service", "Excel", "Notepad"], 1, "The Service is the online site."],
    ["Import mode is the default because it is:", ["Slow but safe", "Fast and supports the full feature set", "Always current", "Free of refresh"], 1, "Data is in a compressed in-memory engine."],
    ["DirectQuery should be chosen when:", ["Data is small", "Data is too large to import or must be current", "You want offline use", "You like waiting"], 1, "It trades speed for freshness and scale."],
    ["Power Query steps are written in:", ["DAX", "M", "SQL only", "Python"], 1, "The M language."],
    ["Unpivot Columns does what?", ["Turns rows into columns", "Turns column headings into rows", "Deletes data", "Sorts"], 1, "It makes wide data tidy."],
    ["Doing filters early in Power Query helps because:", ["They look neater", "They can fold to the source and reduce data", "They change the model", "They add steps"], 1, "Less data travels."],
    ["One semantic model can feed:", ["Exactly one report", "Many reports", "No reports", "Only dashboards"], 1, "Reuse is the point."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 2 */
export const M2 = module_({
  slug: "data-modelling", title: "Data modelling: the star schema", hours: 3.5, level: "Building skills",
  summary: "Design a model that gives correct answers: facts and dimensions, relationships and filter direction, and a date table.",
  outcome: "You can split data into fact and dimension tables, set up relationships with the right cardinality and direction, build and mark a date table, and explain how a filter flows through a model.",
  intro: "If you remember one thing from this course, make it this: **the model is more important than the report.** Almost every wrong number in a Power BI report traces back to the model: a missing relationship, a table that is a flat copy of everything, a missing date table. The good news is that there is one pattern that works nearly everywhere, the star schema, and once you see how filters flow through it, DAX becomes far easier to understand. The practice windows use a small star schema, so you can watch filters flow.",
  topics: [
    topic({
      title: "Facts, dimensions and the star schema", slug: "star-schema",
      blocks: [
        p("A **star schema** has one central **fact table** surrounded by **dimension tables**, joined like the points of a star."),
        table("Fact versus dimension", ["", "Fact table", "Dimension table"], [["Holds", "Events or transactions: each sale, each click, each shipment", "Descriptions of the things involved: products, stores, dates, customers"], ["Rows", "Many (thousands to billions)", "Fewer (tens to millions)"], ["Columns", "Keys to dimensions, and numbers to add up (quantity, amount)", "A unique key, and descriptive attributes (name, category, region)"], ["Example", "Sales", "Products, Stores, Dates"]]),
        flow("Relationships point from dimension to fact", ["Products (one) → Sales (many)", "Stores (one) → Sales (many)", "Dates (one) → Sales (many)"]),
        p("Filters flow **from the 'one' side to the 'many' side**. Select the category 'Home' in the Products table and Power BI keeps only the Sales rows for Home products; select the region 'North' in Stores and only North's sales remain. You never write a join: the relationship does it."),
        daxPlay({ id: "pb-play-star", title: "Watch a filter flow through the model", intro: "Run it: the measure adds up Sales[Amount], and the matrix splits it by a column of the Products table. Then change the visual to 'Sales by region' to see the Stores table filter the same facts.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])", visuals: [V_CAT, V_REGION, V_YEAR], show: "Total Sales" }),
        example("Why not one big flat table?", "A flat table repeats the product name, category, store name and region on every sale row.", ["Fix a typo in a category name and you must change thousands of rows.", "The model is larger and slower, because repeated text takes memory.", "Different questions need different lists (all products, even ones not sold), and a flat table cannot provide them."], "A star schema stores each fact once and is smaller, faster and easier to change."),
        warn("A **snowflake** (a dimension that links to another dimension) is allowed but adds hops and complexity. Prefer to flatten dimensions into one table each unless there is a reason."),
        mistakes(["One giant table with everything in it.", "Using a fact table's own columns (product name text) to slice instead of the dimension.", "Several fact tables joined directly to each other instead of through shared dimensions."]),
        tryIt("In the model above, which table is the fact table?", "Sales: it holds one row per sale and the numbers to add up. Products, Stores and Dates describe the sales."),
      ],
      points: ["A star schema has a central fact table and dimension tables around it.", "Facts hold numbers and keys; dimensions hold descriptions and a unique key.", "Filters flow from the one side (dimension) to the many side (fact)."],
      check: [["Which table in a sales model is the fact table?", ["Products", "Stores", "Sales", "Dates"], 2, "It holds one row per sale and the numbers."], ["Filters flow:", ["From many to one", "From the one side to the many side", "Both ways always", "Nowhere"], 1, "A filter on a dimension reaches the fact table."]],
    }),
    topic({
      title: "Relationships: cardinality, direction and keys", slug: "relationships",
      blocks: [
        p("A relationship connects a column in one table to a column in another. Three properties matter."),
        table("Relationship properties", ["Property", "Options", "Rule of thumb"], [["Cardinality", "One-to-many (dimension to fact), one-to-one, many-to-many", "Use one-to-many. Avoid many-to-many unless you understand the consequences."], ["Cross-filter direction", "Single (one to many) or Both", "Keep Single. 'Both' can create ambiguity and slow reports; use it rarely and deliberately."], ["Active", "One active relationship between two tables; others inactive", "Inactive ones are switched on inside a measure (with USERELATIONSHIP)."]]),
        list("What makes a good key", ["**Unique** on the one side (a product id appears once in Products).", "**The same data type** on both sides.", "**A surrogate key or an id**, not a name that might be spelled two ways.", "**Present in the dimension** for every value in the fact (otherwise facts fall into a '(Blank)' group)."]),
        example("An orphaned key", "A sale refers to ProductID 'P9', but the Products table has no P9.", ["The sale still counts in the grand total.", "When you slice by Product, it appears under '(Blank)'.", "Totals by product then do not add up to the grand total unless you show the blank group."], "Check for facts without a matching dimension row; fixing it at the source is better than hiding the blank."),
        warn("Many-to-many relationships and two-way filters are the usual cause of 'the numbers are wrong but I cannot see why' reports. The default pattern, single direction one-to-many from each dimension, is simple and predictable."),
        p("**Role-playing dimensions.** A sales table might have an order date and a ship date, both related to one Dates table. Only one relationship can be active; the other is inactive and used in measures with `USERELATIONSHIP`. The practice engine here covers the core idea (one active relationship) and does not run USERELATIONSHIP, which the Desktop does."),
        mistakes(["Relating tables on a name column that has duplicates.", "Mismatched data types (text on one side, number on the other), which silently match nothing.", "Turning on two-way filtering to 'make it work'."]),
        tryIt("What cardinality and direction should a Products-to-Sales relationship have?", "One-to-many (one product, many sales), with a single filter direction from Products to Sales."),
      ],
      points: ["Use one-to-many relationships with single-direction filters.", "Keys must be unique on the one side, the same type on both, and present in the dimension.", "Check for orphaned keys; avoid many-to-many and two-way filters unless needed."],
      check: [["Which is the recommended relationship setup?", ["Many-to-many, both directions", "One-to-many, single direction", "One-to-one everywhere", "No relationships"], 1, "It is simple and predictable."], ["A sale whose key is missing from the dimension appears under:", ["The first product", "(Blank)", "Nothing at all", "A new product"], 1, "Orphaned facts group under blank."]],
    }),
    topic({
      title: "The date table and model hygiene", slug: "date-table",
      blocks: [
        p("Time intelligence (year to date, same period last year) needs a proper **date table**: a table with one row per day, with no gaps, covering every date in your data, marked as the model's date table."),
        table("A date table", ["Date", "Year", "MonthNum", "Month", "Quarter"], [["2024-01-01", "2024", "1", "Jan", "Q1"], ["2024-01-02", "2024", "1", "Jan", "Q1"], ["…", "…", "…", "…", "…"], ["2025-12-31", "2025", "12", "Dec", "Q4"]]),
        list("Date table rules", ["One row per day, no gaps, from before the first sale to after the last.", "A unique Date column, with no times.", "Mark it as the date table (Table tools → Mark as date table) so time intelligence works correctly.", "Relate its Date column to the date column of each fact table.", "Add Year, Quarter, Month and MonthNum, and **sort Month by MonthNum** so months appear Jan to Dec, not alphabetically."]),
        datesPlay(),
        warn("The 'Auto date/time' feature creates hidden date tables for every date column. It is convenient for one-off reports but bloats the model; switch it off and use one proper date table."),
        list("Model hygiene checklist", ["Hide columns users should not drag into visuals: foreign keys, helper columns.", "Name tables and columns for humans (Total Sales, not col_ttl_sls).", "Remove columns you will never use: they cost memory.", "Set data types and formats (currency, percentage, no decimals for counts).", "Put measures in one place and format them.", "Use the **star schema** and one date table."]),
        example("Why the month order matters", "A chart shows months in alphabetical order: Apr, Aug, Dec, Feb ...", ["The Month column holds text, which sorts alphabetically.", "Select Month, then Column tools → Sort by column → MonthNum.", "Now the months run Jan to Dec in every visual."], "A tiny model setting fixes what no chart setting can."),
        mistakes(["Using a date column from the fact table for time intelligence instead of a date table.", "Gaps in the date table.", "Leaving auto date/time on and duplicating dates everywhere."]),
        tryIt("Why must a date table have no gaps?", "Time-intelligence functions assume a continuous run of days; missing days can give wrong 'previous period' results."),
      ],
      points: ["A date table has one row per day, no gaps, is marked as the date table and is related to the facts.", "Sort Month by MonthNum so months are in order.", "Hide, name, type and trim the model for users and performance."],
      check: [["A proper date table has:", ["Only dates that had sales", "One row per day with no gaps", "Times as well as dates", "No relationships"], 1, "Continuity is required."], ["To show months Jan to Dec you:", ["Rename them", "Sort Month by MonthNum", "Delete the Month column", "Use a pie chart"], 1, "Sorting by another column fixes the order."]],
    }),
  ],
  practical: { title: "Practical: design the model", intro: "Open the **Fact or dimension?**, **Spot the model problem** and **Watch the filters flow** labs.", steps: ["Decide for each table whether it is a fact or a dimension.", "Match each model symptom to its cause and fix.", "Write the first measure and see how each dimension filters it."] },
  terms: [["Fact table", "Transactions and the numbers to add up."], ["Dimension table", "Descriptions of the things involved."], ["Star schema", "A fact table surrounded by dimensions."], ["Cardinality", "One-to-many, one-to-one or many-to-many."], ["Cross-filter direction", "Which way filters flow across a relationship."], ["Date table", "One row per day, marked as the date table."], ["Sort by column", "Order one column by another, such as Month by MonthNum."]],
  quiz: [
    ["A dimension table holds:", ["Transactions", "Descriptions and a unique key", "Only numbers", "Visuals"], 1, "Dimensions describe the facts."],
    ["Which relationship setup is best?", ["Many-to-many, both directions", "One-to-many, single direction", "None", "Two-way everywhere"], 1, "It is predictable."],
    ["Filters flow from:", ["Fact to dimension", "Dimension to fact", "Report to model", "Visual to visual"], 1, "From the one side to the many side."],
    ["A flat table is a problem because it:", ["Is easier", "Repeats text, bloats the model and is hard to change", "Is a star", "Has no rows"], 1, "Stars store each fact once."],
    ["A date table must:", ["Have gaps", "Have one row per day without gaps", "Contain only weekends", "Be hidden"], 1, "Time intelligence needs continuity."],
    ["Mark as date table lets you:", ["Print", "Use time-intelligence functions correctly", "Hide columns", "Export"], 1, "It tells Power BI which table is the calendar."],
    ["Many-to-many relationships should be:", ["The default", "Used rarely and carefully", "Always avoided in every case", "Required"], 1, "They cause ambiguity."],
    ["Sorting Month by MonthNum gives:", ["Alphabetical order", "Calendar order", "Random order", "No months"], 1, "Jan to Dec."],
  ],
});

function datesPlay() {
  return daxPlay({ id: "pb-play-dates", title: "Dates filter the facts too", intro: "The Dates table filters Sales by year. Try the visual 'Category by year', and change SUM to COUNTROWS(Sales) to count sales instead.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])", visuals: [V_YEAR, V_CAT_YEAR], show: "Total Sales" });
}

/* ------------------------------------------------------------------------------------------------ module 3 */
export const M3 = module_({
  slug: "dax-fundamentals", title: "DAX fundamentals: measures and context", hours: 4.5, level: "Intermediate",
  summary: "Write your first measures, understand row context and filter context, and use iterators and RELATED.",
  outcome: "You can write measures with SUM, DIVIDE and SUMX, say whether something should be a measure or a calculated column, and explain why a measure gives a different value in every cell of a visual.",
  intro: "DAX (Data Analysis Expressions) is the formula language of Power BI. It looks like Excel formulas, and that is both its comfort and its trap: DAX does not work row by row on cells, it works on **tables and filters**. A single measure such as Total Sales gives a different value in every cell of a matrix, because each cell applies a different **filter context**. Once that idea clicks, DAX becomes logical. Every lesson here has a live DAX window running on a small star schema, so you see the context at work.",
  topics: [
    topic({
      title: "Measures: calculations that respond to filters", slug: "measures",
      blocks: [
        p("A **measure** is a formula that is calculated when a visual is drawn, once for every cell, using whatever filters apply to that cell. Write it once, and it works in every chart, table and matrix."),
        formula("The simplest measure", "Total Sales = SUM(Sales[Amount])", "SUM adds the Amount column of the rows that are visible in the current filter context."),
        daxPlay({ id: "pb-play-measure", title: "One measure, many answers", intro: "The same Total Sales measure gives a different value in each row, because each row applies a different filter. Switch between the visuals.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])", visuals: [V_CAT, V_REGION, V_CAT_YEAR], show: "Total Sales" }),
        table("Measure or calculated column?", ["", "Measure", "Calculated column"], [["Calculated", "When the visual is drawn", "When the data is refreshed, once per row"], ["Stored", "Not stored (no memory cost)", "Stored in the model (uses memory)"], ["Responds to filters", "Yes, in every cell", "No: a fixed value in each row"], ["Use for", "Totals, ratios, KPIs, anything you aggregate", "A fixed attribute you slice or filter by (a price band, a flag)"]]),
        p("The rule of thumb: **if you would put it in the Values area of a visual, it is a measure; if you would put it in Rows, Columns or a slicer, it might be a column.** Beginners often create calculated columns for things that should be measures, then wonder why the numbers do not respond to filters."),
        daxPlay({ id: "pb-play-ratio", title: "Build a measure from measures", intro: "Measures can use other measures. Define Cost and Margin % by changing the formulas, then show [Margin %].", model: { ...miniModel, tables: miniModel.tables.map((t) => (t.name === "Sales" ? { ...t, columns: [...t.columns, "Cost"], rows: t.rows.map((r) => [...r, Math.round(Number(r[5]) * 0.6)]) } : t)) }, code: "Total Cost = SUM(Sales[Cost])\nMargin = [Total Sales] - [Total Cost]\nMargin % = DIVIDE([Margin], [Total Sales])", visuals: [V_CAT, V_YEAR], show: "Margin %" }),
        warn("Always write ratios with **DIVIDE(numerator, denominator)**, not `/`. DIVIDE returns BLANK when the denominator is zero or blank, so a cell with no sales shows nothing instead of an error."),
        mistakes(["A calculated column for a total or ratio: it will not change with filters.", "Writing a ratio with / and getting divide-by-zero errors.", "Naming measures 'Measure 1': name them for what they mean."]),
        tryIt("Should 'Profit margin %' be a measure or a calculated column?", "A measure: it is a ratio of totals, so it must be recalculated for every filter context."),
      ],
      points: ["A measure is calculated per cell, using that cell's filters.", "Use measures for anything you aggregate and calculated columns for fixed row-level attributes.", "Use DIVIDE for ratios."],
      check: [["A measure is calculated:", ["Once at refresh", "When a visual is drawn, for each cell", "Never", "Only for totals"], 1, "It responds to the filters of each cell."], ["Which is safer for a ratio?", ["a / b", "DIVIDE(a, b)", "a - b", "a * b"], 1, "DIVIDE returns BLANK instead of an error when b is zero."]],
    }),
    topic({
      title: "Filter context: why a cell shows what it shows", slug: "filter-context",
      blocks: [
        p("Every cell of a visual has a **filter context**: the set of filters applying to it, from the row and column it sits in, from slicers, from page and report filters. The measure is evaluated against only the rows that survive those filters."),
        table("Filter context for the cell 'Home / 2025'", ["Source of the filter", "Filter applied"], [["Row of the matrix", "Products[Category] = Home"], ["Column of the matrix", "Dates[Year] = 2025"], ["A slicer on Stores[Region] set to North", "Stores[Region] = North"]]),
        p("In that cell, `SUM(Sales[Amount])` adds only the sales rows that pass **all three** filters: Home products, in 2025, in North stores. The relationship does the work: the Products, Dates and Stores filters flow to the Sales table."),
        daxPlay({ id: "pb-play-context", title: "See the filter context", intro: "In 'Category by year' each cell is a different category and year. The total row and column remove one or both filters.", model: miniModel, code: "Total Sales = SUM(Sales[Amount])\nOrders = COUNTROWS(Sales)", visuals: [V_CAT_YEAR, V_REGION], show: "Orders" }),
        example("Why the total is not the sum of the visible numbers", "A matrix shows two categories with sales of 510 and 400, and a total of 910.", ["The Total row has **no category filter**, so its context is the whole table.", "For a SUM, the total equals the sum of the rows (510 + 400).", "For a ratio or an average, the total is computed over everything, not added from the rows above, so it can differ."], "A total is not 'add up the cells'. It is the measure in a smaller (or no) filter context."),
        warn("When a number looks wrong, ask: **what is the filter context in this cell?** Which filters apply, and which are missing? Nine in ten DAX puzzles are answered this way."),
        mistakes(["Thinking a measure works on one row at a time.", "Expecting a total row to add up the rows above for ratios and averages.", "Forgetting that slicers and page filters are part of the context too."]),
        tryIt("What is the filter context in the grand-total cell of a matrix with no slicers?", "None: no filters apply, so the measure sees the whole model."),
      ],
      points: ["Each cell's filter context comes from its row, column, slicers and filters.", "Filters flow through relationships to the fact table.", "A total is the measure with fewer filters, not the sum of the cells."],
      check: [["The grand total of a ratio measure is:", ["The sum of the cells above", "The measure evaluated with no row or column filter", "Always zero", "The average of the cells"], 1, "A total is a smaller filter context."], ["A slicer on Region is part of:", ["The row context", "The filter context", "The model", "The data type"], 1, "Slicers add filters."]],
    }),
    topic({
      title: "Row context, iterators and RELATED", slug: "row-context",
      blocks: [
        p("Filter context decides **which rows**. **Row context** is different: it means 'we are on one particular row' and lets a formula read that row's columns. It exists in two places: calculated columns (one row at a time) and **iterators**, functions ending in X that walk a table row by row."),
        table("Aggregators and their iterators", ["Aggregator (works on one column)", "Iterator (works row by row on a table)"], [["`SUM(Sales[Amount])`", "`SUMX(Sales, Sales[Qty] * RELATED(Products[Price]))`"], ["`AVERAGE(Sales[Qty])`", "`AVERAGEX(Sales, ...)`"], ["`MAX(Sales[Amount])`", "`MAXX(Sales, ...)`"], ["`COUNT(Sales[Qty])`", "`COUNTX(Sales, ...)`"]]),
        p("Use an iterator when the thing to add up is a **calculation per row**, not a single column. Price times quantity needs both columns on each row, so `SUM` cannot do it; `SUMX` can."),
        daxPlay({ id: "pb-play-sumx", title: "SUMX with RELATED", intro: "For each Sales row, SUMX multiplies the quantity by the price of the related product. RELATED reads a column from the one side of the relationship. The Difference measure is zero because this small sample has no discounts: a good consistency check.", model: miniModel, code: "List Revenue = SUMX(Sales, Sales[Qty] * RELATED(Products[Price]))\nDifference = [List Revenue] - [Total Sales]", visuals: [V_CAT, V_YEAR], show: "List Revenue" }),
        def("RELATED", "Reads a column from a table on the 'one' side of a relationship, from a row of the 'many' side. Inside SUMX over Sales, RELATED(Products[Price]) is the price of the product on the current sales row."),
        example("A measure inside an iterator", "Average of the category totals: `AVERAGEX(VALUES(Products[Category]), [Total Sales])`.", ["VALUES(Products[Category]) lists the categories in the current context: Stationery and Home.", "For each one, [Total Sales] is evaluated **for that category** (a row context becomes a filter: the *context transition*).", "The results, 510 and 400, are averaged: 455."], "Using a measure inside an iterator re-applies the filter for each row, which is how you average, rank or compare across groups."),
        warn("Iterators over big tables are slow, and an iterator inside an iterator multiplies the work. Iterate over the smallest table that gives the right answer, such as VALUES of a column, not the whole fact table."),
        mistakes(["Using SUM when a per-row calculation is needed.", "Forgetting RELATED when reading a dimension column from a fact row.", "Iterating over a fact table when a dimension would do."]),
        tryIt("Write the SUMX for total cost if Cost is price times quantity but the cost per unit is in Products[UnitCost].", "`SUMX(Sales, Sales[Qty] * RELATED(Products[UnitCost]))`"),
      ],
      points: ["Row context means 'on this row'; iterators (SUMX and friends) create it.", "RELATED reads a one-side column from a many-side row.", "A measure inside an iterator re-applies filters per row (context transition)."],
      check: [["When do you need SUMX rather than SUM?", ["Always", "When each row needs a calculation from several columns", "Never", "For text"], 1, "SUM adds one column; SUMX evaluates an expression per row."], ["RELATED returns:", ["A table", "A column value from the one side of a relationship", "A filter", "A measure"], 1, "It follows the relationship."]],
    }),
    topic({
      title: "Variables and readable measures", slug: "variables",
      blocks: [
        p("**VAR** stores an intermediate result, and **RETURN** gives the final answer. Variables make measures easier to read and often faster, because the calculation is done once and reused."),
        code("DAX", "Margin % =\n    VAR sales = [Total Sales]\n    VAR cost = [Total Cost]\n    RETURN\n        DIVIDE(sales - cost, sales)", "A readable measure with variables"),
        list("Habits of readable DAX", ["Put each argument of a long function on its own indented line.", "Name variables for what they hold (`sales`, `last_year`), not `a` and `b`.", "Use VAR for a value you use more than once.", "Comment the why with `//`.", "Define small measures and build bigger ones from them."]),
        daxPlay({ id: "pb-play-var", title: "Variables and IF", intro: "VAR holds the value once; RETURN uses it. Change the threshold from 300, or return the number instead of a label.", model: miniModel, code: "Size =\n    VAR t = [Total Sales]\n    RETURN\n        IF(t >= 300, \"large\", \"small\")", visuals: [V_CAT, V_REGION], show: "Size" }),
        example("A variable that avoids repeating work", "Year-on-year growth needs last year's sales twice: once to subtract, once to divide.", ["Without a variable the same CALCULATE would be written (and evaluated) twice.", "With `VAR ly = CALCULATE(...)`, it is evaluated once.", "The formula reads: growth is (this − ly) divided by ly."], "Variables turn a puzzle into a sentence."),
        warn("A variable is evaluated **where it is defined**, in the filter context at that point, not where it is used later. This matters inside CALCULATE and iterators, and is a feature when you understand it."),
        mistakes(["Meaningless variable names.", "Defining a variable and never using it.", "Expecting a variable to change when the context changes later in the formula."]),
      ],
      points: ["VAR stores a value; RETURN gives the result.", "Variables improve readability and performance.", "A variable keeps the context of where it was defined."],
      check: [["VAR is used to:", ["Draw charts", "Store an intermediate value", "Create a table", "Filter rows"], 1, "It holds a result for reuse."], ["A variable is evaluated:", ["Where it is defined", "At the end", "Never", "In the report"], 0, "It keeps that context."]],
    }),
  ],
  practical: { title: "Practical: your first measures", intro: "Open the **Margin and margin %**, **List revenue with SUMX** and **Measure or column?** labs.", steps: ["Write each measure in the editor, with one measure per line starting with Name = ...", "Run it and read the matrix: does each cell make sense?", "Check the total row against the parts.", "Press Check my work."] },
  terms: [["Measure", "A formula calculated per cell of a visual."], ["Calculated column", "A value stored for every row at refresh."], ["Filter context", "The filters that apply to a cell."], ["Row context", "'On this row' inside an iterator or calculated column."], ["Iterator", "A function ending in X that walks a table row by row."], ["RELATED", "Reads a one-side column from a many-side row."], ["VAR / RETURN", "Store an intermediate value and return the result."]],
  quiz: [
    ["A measure is best for:", ["A price band to slice by", "A total or ratio that responds to filters", "A fixed label", "A relationship"], 1, "Measures respond to the context of each cell."],
    ["`DIVIDE(a, b)` returns what when b is zero?", ["An error", "BLANK (or your alternate result)", "Zero always", "Infinity"], 1, "It handles the zero safely."],
    ["The Total row of a matrix is calculated:", ["By adding the rows", "By the measure with fewer filters", "Randomly", "Never"], 1, "A total is a smaller filter context."],
    ["SUMX is needed when:", ["Adding one column", "A per-row calculation is needed", "Counting rows", "Sorting"], 1, "It evaluates an expression for each row."],
    ["RELATED is used to:", ["Create a relationship", "Read a column from a related one-side table", "Filter", "Sort"], 1, "It follows the relationship."],
    ["Row context exists in:", ["Every measure", "Iterators and calculated columns", "Slicers", "Relationships"], 1, "They process one row at a time."],
    ["A good habit with long formulas is:", ["One line", "Use VAR and clear indentation", "No comments", "Single-letter names"], 1, "Readability matters."],
    ["A calculated column is recalculated:", ["For every cell", "Only when data is refreshed", "Never", "When you click"], 1, "Its values are stored."],
  ],
});

