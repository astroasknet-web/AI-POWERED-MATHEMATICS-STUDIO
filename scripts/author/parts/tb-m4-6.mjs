import { example, flow, list, mistakes, module_, p, table, topic, tryIt, vizPlay, warn } from "../kit.mjs";
import { lessonOrders } from "./tb-data.mjs";
import { NOTE_RUN } from "./tb-m1-3.mjs";

const D = lessonOrders;

/* ------------------------------------------------------------------------------------------------ module 4 */
export const M4 = module_({
  slug: "design-and-storytelling", title: "Design, dashboards and storytelling", hours: 4, level: "Intermediate",
  summary: "Use visual encoding well, design dashboards people can read in seconds, make them interactive with actions, and tell a story with data.",
  outcome: "You can choose encodings by how accurately people read them, lay out a dashboard, use filter and highlight actions, make a view accessible, and structure a story.",
  intro: "A chart can be correct and still fail: too much colour, a pie with twelve slices, an axis that exaggerates, a dashboard with so much on it that nobody knows where to look. Design is how you make the right answer easy to see. This module teaches the research-backed principles (what the eye reads accurately), how to arrange and connect views into a dashboard, and how to turn a dashboard into a story with a point. " + NOTE_RUN,
  topics: [
    topic({
      title: "Visual encoding: what the eye reads well", slug: "encoding",
      blocks: [
        p("Every chart turns numbers into visual properties: position, length, angle, area, colour. Researchers (notably Cleveland and McGill) have ranked how accurately people judge each, and the ranking should shape your choices."),
        table("From most to least accurate", ["Encoding", "Accuracy", "Example"], [["Position on a common scale", "Most accurate", "Dots on the same axis, a bar's end"], ["Length", "Very good", "Bars from a shared baseline"], ["Angle and slope", "Fair", "Pie slices, a line's steepness"], ["Area", "Weak", "Bubble size, treemap boxes"], ["Colour intensity (saturation)", "Weak", "A heat map's shades"], ["Colour hue", "Good for telling categories apart, poor for quantities", "Different colours for different regions"]]),
        p("So: put the **most important comparison on position or length** (a bar chart or a dot plot), and use colour to **separate categories or highlight**, not to carry the main numbers. That is why a sorted bar chart beats a pie for comparison, and why a heat map is for spotting patterns, not reading values."),
        vizPlay({ id: "tb-play-encoding", title: "The same data, two encodings", intro: "Sales by category as bars (length: easy to compare). Switch the mark to Pie (angle: harder). Which makes the order obvious?", data: D, start: { columns: [{ field: "Category" }], rows: [{ field: "Sales" }] } }),
        list("Using colour well", ["Use **one accent colour** to highlight what matters and grey for the rest.", "Use a **sequential** palette (light to dark) for a measure and a **categorical** palette for categories.", "Use a **diverging** palette (two hues around a neutral midpoint) when there is a meaningful centre such as zero profit.", "Keep colour meaning **consistent** across a dashboard.", "Design for colour-blind readers: avoid red and green as the only signal; add labels or shapes."]),
        warn("Colour is the most over-used encoding. A chart with eight colours has no emphasis: everything shouts. Ask what you want the reader to notice, and colour only that."),
        mistakes(["Encoding the key comparison with area or colour intensity.", "Rainbow palettes for ordered numbers.", "Red and green as the only difference."]),
        tryIt("Which is easier to compare: five bars or five pie slices of the same values?", "The bars: length from a common baseline is judged more accurately than angle."),
      ],
      points: ["Position and length are read most accurately; angle, area and colour intensity least.", "Put the key comparison on position or length; use colour to separate or highlight.", "Use sequential, categorical and diverging palettes appropriately, and design for colour blindness."],
      check: [["Which encoding is read most accurately?", ["Colour intensity", "Area", "Position on a common scale", "Angle"], 2, "Position beats the others."], ["Colour hue is best used to:", ["Show exact quantities", "Tell categories apart or highlight", "Replace axes", "Decorate"], 1, "Hue separates categories."]],
    }),
    topic({
      title: "Dashboards: layout and actions", slug: "dashboards",
      blocks: [
        p("A **dashboard** brings several sheets together so a reader can see the situation and explore it. Two things make or break it: layout and interactivity."),
        list("Layout principles", ["**Start with the question and the reader.** A dashboard for executives answers 'are we on track?'; one for analysts supports exploration.", "**Put the most important view top left**, and give it the most space.", "**Group related views**, align them to a grid and keep spacing even.", "**Use containers** (horizontal and vertical layout containers) so the layout stays tidy when the window resizes.", "**Limit the number of views**: three to five is plenty.", "**Set a fixed or automatic size on purpose**, and add device layouts for phones and tablets."]),
        table("Dashboard actions", ["Action", "What it does", "Use for"], [["Filter", "Selecting marks in one sheet filters other sheets", "Click a region, and every other view shows only that region"], ["Highlight", "Selecting marks highlights related marks in other sheets", "See where one category sits across charts"], ["Go to sheet / URL", "Jump to another sheet or open a web page", "Navigation and drill to detail"], ["Change parameter / set", "Selecting a mark changes a parameter or set", "Advanced interactive designs"]]),
        flow("Design a dashboard in five steps", ["Write the question and the reader", "Choose three to five views that answer it", "Arrange: key view top left, filters grouped", "Add actions so clicking explores", "Test with a real user and simplify"]),
        example("A sales dashboard for managers", "Managers want to know whether sales are on track and where to look.", ["Top left: a monthly sales line against target.", "Right: a sorted bar chart of profit by sub-category, with loss-makers in a different colour.", "Below: a heat map of region by category.", "A filter action: clicking a region filters all three views."], "In five seconds the manager sees the trend; one click answers 'is it the same in the West?'"),
        warn("A dashboard is not a place to show everything you built. Every extra chart competes for attention. If a view does not help answer the question, remove it."),
        mistakes(["Ten views on one dashboard.", "Filters with no indication of what is filtered.", "A layout that breaks on a laptop screen or a phone."]),
        tryIt("What does a filter action do?", "Selecting marks in one sheet filters the data in the other sheets on the dashboard."),
      ],
      points: ["Start from the question and reader; key view top left; three to five views.", "Use containers for a tidy, resizable layout; add device layouts.", "Actions (filter, highlight, go to) make a dashboard explorable."],
      check: [["How many views suit a typical dashboard?", ["About three to five", "Twenty", "One hundred", "None"], 0, "Fewer views read faster."], ["A filter action means:", ["Filters are hidden", "Selecting marks in one sheet filters the others", "A colour change", "A new data source"], 1, "Clicking marks filters other sheets."]],
    }),
    topic({
      title: "Accessibility, honesty and polish", slug: "accessibility-polish",
      blocks: [
        p("The finishing touches decide whether a dashboard is trusted and usable."),
        list("Accessibility", ["**Colour contrast** between text and background must be strong.", "**Not colour alone**: add labels, shapes or patterns so colour-blind readers can tell marks apart.", "**Alt text** on dashboards and key views, so screen readers can describe them.", "**Readable font sizes** and a logical reading order.", "**Titles that say something**, not just the field names."]),
        list("Honest charts", ["Bars start at zero; do not truncate the axis.", "Label axes and units; include the time period and filters in the title or caption.", "Do not use a dual axis to make two unrelated lines look correlated.", "Avoid 3D and decoration that distorts values.", "Show uncertainty where it exists."]),
        table("Polish checklist", ["Check", "Question"], [["Title", "Does it state the finding or the question?"], ["Labels", "Are axes, units and the key marks labelled?"], ["Tooltips", "Do they add useful context, not a data dump?"], ["Colour", "One accent, consistent meaning, colour-blind safe?"], ["Clutter", "Can any gridline, border or legend be removed?"], ["Defaults", "Is the default view the one most readers need?"]]),
        example("Fixing a misleading dual axis", "A chart overlays sales and temperature with two separate vertical axes, scaled so the lines track each other.", ["The relationship looks strong, but it was created by choosing the axis scales.", "Change to two small charts stacked on a shared time axis, each starting at its natural baseline.", "Now any real relationship is visible without the scaling trick."], "If you can make two lines look correlated just by changing the axes, the chart is not telling you anything."),
        warn("A dashboard that looks professional but is wrong is worse than a plain one that is right. Reconcile key numbers to a trusted source before publishing."),
        mistakes(["Low-contrast grey text on a grey background.", "A truncated axis to exaggerate a change.", "Tooltips full of every field in the data."]),
      ],
      points: ["Accessibility: contrast, not colour alone, alt text, readable text, meaningful titles.", "Honest charts: zero baselines, labelled axes, no misleading dual axes.", "Polish by checking title, labels, tooltips, colour and clutter, and reconcile numbers."],
      check: [["To help colour-blind readers you should:", ["Use red and green only", "Add labels or shapes as well as colour", "Use more colours", "Remove the legend"], 1, "Do not rely on colour alone."], ["A truncated bar chart axis:", ["Is honest", "Exaggerates differences", "Is required", "Improves accuracy"], 1, "Bar length must be proportional."]],
    }),
    topic({
      title: "Telling a story with data", slug: "stories",
      blocks: [
        p("A **story** in Tableau is a sequence of sheets or dashboards (story points), each with a caption, that guides a reader to a conclusion. The tool matters less than the shape of the narrative."),
        flow("A simple narrative arc for data", ["Context: what is the situation?", "The problem or surprise: what changed?", "The explanation: why?", "The action: what should we do?"]),
        example("A four-point story", "Why did profit fall in 2025 despite higher sales?", ["Point 1: Sales rose a little in 2025 (a line chart).", "Point 2: Profit fell (a second line: the gap is the surprise).", "Point 3: Furniture lost money overall, driven by Tables and Bookcases (a scatter with the loss-makers highlighted).", "Point 4: Recommendation: review the pricing and costs of Tables and Bookcases before the next promotion (a short text caption)."], "Each point adds one idea, and the headline of each caption says it in a sentence."),
        list("Habits of good data storytellers", ["**Headline first**: caption each view with what to notice, not what it is.", "**One idea per view.**", "**Guide the eye**: highlight the one mark that matters, and grey the rest.", "**Show the evidence**, then the conclusion, then the action.", "**Know your audience**: an executive wants the answer; an analyst wants the method too."]),
        warn("Do not hide what does not fit your story. If other explanations exist, say so; it builds trust and protects you from being wrong in public."),
        mistakes(["A story that is a slideshow of charts with no point.", "Captions that only name the chart.", "A conclusion the data does not support."]),
        tryIt("Write a headline caption for a chart showing profit falling while sales rise.", "For example: 'Sales rose slightly in 2025, but profit fell: we are selling more of the products that lose money.'"),
      ],
      points: ["A story has context, a surprise, an explanation and an action.", "Caption each view with the point, one idea per view.", "Be honest about what the data does and does not show."],
      check: [["A good story caption:", ["Names the chart", "States what to notice", "Is blank", "Repeats the axis"], 1, "Headline first."], ["A data story ends with:", ["The raw data", "A clear action or conclusion", "More charts", "A colour legend"], 1, "Readers need to know what to do."]],
    }),
  ],
  practical: { title: "Practical: design decisions", intro: "Open the **Which encoding?**, **What is wrong with this dashboard?** and **Loss-makers only** activities.", steps: ["Decide how accurately each encoding is read.", "Spot the design problem in each dashboard description.", "Build the view that isolates the loss-making sub-categories."] },
  terms: [["Encoding", "How data is shown: position, length, angle, area, colour."], ["Dashboard", "Several sheets on one page with interactivity."], ["Container", "A layout object that keeps a dashboard tidy."], ["Action", "Clicking marks filters, highlights or navigates."], ["Device layout", "A layout for phones or tablets."], ["Story point", "One step in a Tableau story."], ["Diverging palette", "Two hues around a neutral midpoint."]],
  quiz: [
    ["The most accurately read encoding is:", ["Colour intensity", "Position on a common scale", "Area", "Angle"], 1, "Position beats the rest."],
    ["A filter action on a dashboard:", ["Selecting marks filters other sheets", "Deletes data", "Prints", "Changes fonts"], 0, "It links the sheets."],
    ["A diverging palette suits:", ["Data with a meaningful centre such as zero", "Any numbers", "Categories", "Dates"], 0, "Two hues around a neutral mid."],
    ["A dual axis scaled to make two lines match is:", ["Honest", "Misleading", "Required", "Accessible"], 1, "It manufactures a relationship."],
    ["A dashboard should usually have:", ["Three to five views", "Twenty views", "No views", "Only a table"], 0, "Fewer views read faster."],
    ["Not using colour alone helps:", ["Colour-blind readers", "Printers only", "Servers", "Nobody"], 0, "Add labels or shapes."],
    ["A story caption should:", ["Name the chart", "State the point", "Be empty", "Repeat the title"], 1, "Headline first."],
    ["Before publishing a dashboard you should:", ["Add colours", "Reconcile key numbers to a trusted source", "Hide filters", "Rename the file"], 1, "Wrong numbers destroy trust."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 5 */
export const M5 = module_({
  slug: "data-prep-and-performance", title: "Connecting, preparing and speeding up data", hours: 3.5, level: "Intermediate",
  summary: "Choose between live connections and extracts, combine tables with joins, unions, relationships and blends, reshape data, and keep dashboards fast.",
  outcome: "You can choose live or extract, pick the right way to combine tables, reshape data with pivot, and apply the main performance habits.",
  intro: "The quality of a Tableau dashboard is limited by its data. This module covers how Tableau connects to data, how tables are combined, how to prepare and reshape data (in Tableau and in Tableau Prep), and the habits that keep dashboards fast. These are desktop features, so they are explained with scenarios and checked with sorting activities. The ideas match the SQL and Power Query ideas you may already know.",
  topics: [
    topic({
      title: "Live connections and extracts", slug: "live-extract",
      blocks: [
        p("When you connect Tableau to data you choose how it reads it."),
        table("Live or extract?", ["", "Live connection", "Extract (.hyper)"], [["How it works", "Each view queries the source when it is drawn", "A fast, compressed snapshot of the data is stored with the workbook or on the server"], ["Data freshness", "Always current", "As current as the last refresh"], ["Speed", "As fast as the source", "Usually much faster"], ["Offline use", "No", "Yes"], ["Good for", "Fast databases, real-time needs", "Slow sources, large files, shared dashboards, offline work"]]),
        example("Choosing for a monthly report", "A dashboard reads a slow, shared database and is refreshed monthly.", ["A live connection would hit the database on every click, slowly, for every viewer.", "An extract refreshed overnight serves everyone from a fast snapshot.", "The data is current enough for a monthly report."], "Use an extract unless you truly need up-to-the-minute data."),
        list("Extract habits", ["Filter the extract to the rows and columns the dashboard needs (extract filters), so it stays small.", "Aggregate to the level the dashboard needs, if possible.", "Schedule refreshes on the server after the source updates.", "Use incremental refresh for large tables where new rows are added."]),
        warn("An extract is a copy. If the source changes and the extract is not refreshed, the dashboard quietly shows old numbers. Show the last refresh date on the dashboard."),
        mistakes(["Live connections to a slow database for a dashboard with many viewers.", "An extract of every column of a huge table.", "Forgetting to refresh."]),
        tryIt("When is a live connection the better choice?", "When data must be current to the moment and the source is fast enough to answer each query."),
      ],
      points: ["Live queries the source each time; an extract is a fast stored snapshot.", "Use extracts for slow sources and shared dashboards; filter and aggregate them.", "Refresh on a schedule and show the last refresh."],
      check: [["An extract is:", ["A live query", "A fast stored snapshot of the data", "A chart", "A filter"], 1, "It is a compressed copy."], ["A risk of extracts is:", ["They are always slow", "They can be out of date if not refreshed", "They cannot be filtered", "They need a gateway"], 1, "Refresh them."]],
    }),
    topic({
      title: "Combining tables: joins, unions, relationships and blends", slug: "combining",
      blocks: [
        p("Real analysis usually needs more than one table. Tableau offers several ways to combine them."),
        table("Ways to combine data", ["Method", "What it does", "Use when"], [["Relationship", "Keeps tables separate and joins them as needed for each view, at the right level of detail", "The default in Tableau's data model: the safest way to link tables"], ["Join", "Combines tables row by row into one (inner, left, right, full outer)", "You want one flat table and understand the key"], ["Union", "Stacks tables with the same columns on top of each other", "Monthly files with the same layout"], ["Data blend", "Combines separate data sources at the level of the view, on shared dimensions", "Tables from different sources that cannot be joined"], ["Cross-database join", "Joins tables from different databases", "Occasional, small-scale combining"]]),
        p("**Relationships** are usually the best start: Tableau joins the tables **for each view**, using only the tables the view needs, and keeps the right level of detail, so totals are not inflated the way a careless join can inflate them. A **join** fixes the combination in advance, so a one-to-many join can repeat the 'one' side's values (the fan-out problem from the SQL course)."),
        example("Why a join inflated a total", "Orders (one row per order) are joined to payments (two payments for some orders).", ["Orders with two payments appear twice.", "SUM of an order-level amount counts those orders twice.", "A relationship, or aggregating payments to one row per order before joining, avoids the double count."], "Always check row counts and totals after combining tables."),
        list("Preparing data", ["**Pivot** columns to rows (wide to long) so each fact is one row: Tableau's Pivot, or Tableau Prep.", "**Split** columns, fix data types and rename fields in the data source pane.", "**Clean** with the Data Interpreter for messy spreadsheets, or Tableau Prep for repeatable flows.", "**Hide** unused fields and group them into folders.", "**Document** calculations and sources."]),
        warn("Dimensions with the same name in two tables are not automatically the same. Check keys for type mismatches and stray spaces before relating or joining."),
        mistakes(["Joining on a column that is not unique and not noticing the extra rows.", "Using a blend when a relationship would do.", "Leaving data in wide format (a column per month) and fighting it in every view."]),
        tryIt("Which method stacks twelve monthly files with the same columns?", "A union."),
      ],
      points: ["Relationships keep tables separate and join per view; joins combine rows; unions stack; blends link sources by shared dimensions.", "Check row counts and totals after combining tables.", "Pivot wide data to long, and clean before analysis."],
      check: [["Which combines monthly files with the same columns?", ["Join", "Union", "Blend", "Filter"], 1, "A union stacks them."], ["Relationships are useful because they:", ["Always copy data", "Join tables per view at the right level of detail", "Need no keys", "Remove filters"], 1, "They avoid accidental fan-outs."]],
    }),
    topic({
      title: "Performance: keeping dashboards fast", slug: "performance",
      blocks: [
        p("A slow dashboard is a dashboard nobody uses. Most of the time the cause is one of a few things, and Tableau can tell you which."),
        table("Common causes and fixes", ["Cause", "Fix"], [["Too many marks (hundreds of thousands of points)", "Aggregate, filter, or use fewer detail dimensions"], ["Too many views and filters on one dashboard", "Fewer views; use fewer quick filters; apply 'Apply' buttons to filters"], ["A live connection to a slow source", "Use an extract; filter and aggregate it"], ["Complex calculations on large data (string functions, nested LODs, many table calculations)", "Simplify; pre-calculate in the data source or in Tableau Prep"], ["Custom SQL that scans everything for every query", "Use tables or views; add indexes at the source"], ["Large, high-resolution images and many sheets", "Compress images; remove unused sheets"]]),
        flow("A performance routine", ["Run Performance Recording", "Find the slowest query or view", "Fix the biggest cause first", "Re-measure", "Repeat"]),
        example("Reading a slow dashboard", "A dashboard takes 25 seconds to load.", ["Performance Recording shows one scatter sheet rendering 400,000 marks.", "The reader only needs one dot per customer, not per order line: aggregate.", "Marks drop to 3,000; load time drops to 4 seconds."], "Measure first, then fix the biggest thing."),
        list("Habits that keep dashboards fast", ["Show an **overview first**, with detail on demand (drill-through, tooltips).", "Prefer extracts for shared dashboards.", "Keep calculations simple, or move them upstream.", "Use **context filters** sparingly; they create a temporary table.", "Test on the slowest realistic device."]),
        warn("Do not optimise by guessing. Use Performance Recording (Help → Settings and Performance) to see what the time is spent on, and fix that."),
        mistakes(["Adding a filter to every field.", "Plotting every row when a summary would do.", "Never measuring."]),
        tryIt("Name two ways to reduce marks in a view.", "Aggregate to a coarser level, and filter to the data needed (or use fewer detail dimensions)."),
      ],
      points: ["Too many marks, views, filters and heavy calculations are the usual causes of slowness.", "Use extracts, simple calculations and fewer quick filters.", "Measure with Performance Recording, then fix the biggest cause."],
      check: [["The first step in speeding up a dashboard is to:", ["Guess", "Measure with Performance Recording", "Add filters", "Add colour"], 1, "Find the real cause."], ["Reducing the number of marks helps because:", ["Tableau draws fewer shapes and queries less data", "It adds colour", "It prints faster", "It sorts"], 0, "Fewer marks mean less work."]],
    }),
  ],
  practical: { title: "Practical: prepare and tune", intro: "Open the **Live or extract?**, **Join, union, relationship or blend?** and **Fast or slow?** activities.", steps: ["Choose the connection type for each situation.", "Choose how to combine each pair of tables.", "Decide which habits help performance and which hurt."] },
  terms: [["Live connection", "Queries the source each time."], ["Extract", "A stored, fast snapshot of the data."], ["Relationship", "A flexible link between tables, joined per view."], ["Join", "Combines tables row by row."], ["Union", "Stacks tables with the same columns."], ["Blend", "Links separate sources by shared dimensions."], ["Performance Recording", "A tool that shows where time is spent."]],
  quiz: [
    ["An extract is best when:", ["Data must be real-time", "The source is slow and many people use the dashboard", "There is no data", "You use Public"], 1, "Extracts are fast snapshots."],
    ["A union is used to:", ["Join on a key", "Stack tables with the same columns", "Blend sources", "Filter"], 1, "Monthly files, for example."],
    ["A one-to-many join can cause:", ["A fan-out inflating totals", "Faster queries", "Better colours", "Nothing"], 0, "The 'one' side repeats."],
    ["Pivoting columns to rows makes data:", ["Wide", "Long (tidy)", "Smaller", "Encrypted"], 1, "One fact per row."],
    ["Which causes slow dashboards?", ["Hundreds of thousands of marks", "A title", "A caption", "A legend"], 0, "Too many marks."],
    ["Performance Recording helps you:", ["Choose colours", "Find the slowest queries and views", "Publish", "Pivot"], 1, "Measure first."],
    ["Context filters should be used:", ["Everywhere", "Sparingly", "Never", "Only on dates"], 1, "They create a temporary table."],
    ["An out-of-date extract is a risk because:", ["It is slow", "It shows old numbers without warning", "It cannot be filtered", "It breaks colours"], 1, "Show the last refresh."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 6 */
export const M6 = module_({
  slug: "publish-and-govern", title: "Publish, secure and govern", hours: 3, level: "Intermediate",
  summary: "Share work through Tableau Cloud or Server, control who sees what with permissions and user filters, and keep data trustworthy with governance.",
  outcome: "You can choose where to publish, describe projects, permissions and subscriptions, explain row-level security with a user filter, and list governance practices.",
  intro: "A dashboard on your laptop helps nobody. This module covers getting work to the right people safely: publishing to Tableau Cloud or Server, organising content in projects with permissions, restricting data per user, scheduling refreshes, and the governance habits that make an organisation trust its numbers. As with the previous module, these are desktop and server features, explained with scenarios and checked with activities. The last lesson adds Tableau's built-in analytics.",
  topics: [
    topic({
      title: "Publishing and sharing", slug: "publishing",
      blocks: [
        p("Where you publish decides who can see your work."),
        table("Where to publish", ["Destination", "Audience", "Notes"], [["Tableau Public", "Anyone on the internet", "Free; everything is public. Never for private data"], ["Tableau Cloud", "Your organisation, in a hosted service", "Managed by Tableau; sign-in and permissions apply"], ["Tableau Server", "Your organisation, on your own servers", "You manage the infrastructure"], ["A packaged workbook (.twbx)", "A person you send it to", "Contains the data: share carefully"]]),
        list("Server building blocks", ["**Projects** organise content into folders, and permissions can be set per project.", "**Workbooks** hold sheets and dashboards; **published data sources** are shared, governed connections to data.", "**Permissions** control who can view, edit, download, delete or administer content.", "**Subscriptions and alerts** email a snapshot of a view on a schedule or when a value crosses a threshold.", "**Refresh schedules** update extracts on a timetable."]),
        example("Publishing a data source once", "Five analysts each connect to the sales database and write the same calculations.", ["Instead, an owner publishes one **data source** with the agreed calculations and an extract refreshed nightly.", "Analysts connect to it from Desktop and build workbooks.", "A fix to a calculation is made once and reaches every workbook."], "Shared data sources give one definition of each metric."),
        warn("Embedding credentials or sharing a workbook that contains the data can leak information. Publish data sources with the right authentication and share through the server, not by email."),
        mistakes(["Publishing company data to Tableau Public.", "Emailing packaged workbooks that contain sensitive data.", "Every analyst building their own version of a metric."]),
        tryIt("Why publish a shared data source instead of embedding the data in every workbook?", "One governed definition and refresh serves every workbook, and a fix is made once."),
      ],
      points: ["Publish to Cloud or Server for organisations; Public is for public data only.", "Projects, permissions, subscriptions and refresh schedules organise and deliver content.", "Share data sources, not copies of data."],
      check: [["Tableau Public is suitable for:", ["Confidential data", "Public data you are happy to share with anyone", "Row-level security", "Server administration"], 1, "Everything published there is public."], ["A published data source gives you:", ["One governed definition used by many workbooks", "A new colour palette", "Faster typing", "A filter"], 0, "Reuse and consistency."]],
    }),
    topic({
      title: "Row-level security and permissions", slug: "security",
      blocks: [
        p("**Permissions** control what a person can do with content. **Row-level security (RLS)** controls which rows of data they see inside it. You often need both."),
        table("Two layers of access", ["Layer", "Controls", "Example"], [["Permissions", "Who can view, edit or download a workbook or data source", "Sales managers can view the Sales project; only analysts can edit"], ["Row-level security", "Which rows of data each viewer sees", "Each regional manager sees only their region's sales in the same dashboard"]]),
        p("One common way to do RLS is a **user filter** based on the signed-in user. A calculated field compares a column of the data with the user's name or group, and the view is filtered to the rows where it is true:"),
        table("A user-filter calculation", ["Idea", "Calculation"], [["Match the manager column to the signed-in user", "`[Manager Email] = USERNAME()`"], ["Match a group", "`ISMEMBEROF('West Sales')`"], ["Use it as a data-source filter", "Add the calculated field as a filter that keeps True"]]),
        example("One dashboard, many views", "A sales dashboard is used by four regional managers.", ["A data source filter keeps rows where the Region's manager is the signed-in user.", "Each manager opens the same dashboard and sees only their own region.", "Head office sees everything through a group that bypasses the filter."], "RLS replaces four copies of the dashboard with one."),
        warn("**Row-level security must be applied at the data source and tested as each kind of user.** If a person can edit or download the workbook or connect to the data directly, a filter inside the workbook may not protect them. Apply the filter in a published data source and limit who can edit it."),
        mistakes(["Hiding a sheet and calling it security.", "Testing only as the author, who sees everything.", "Relying on a filter that a user with edit rights can remove."]),
        tryIt("Write a user-filter calculation that keeps rows where the Manager Email column matches the signed-in user.", "`[Manager Email] = USERNAME()`"),
      ],
      points: ["Permissions control actions; row-level security controls which rows a user sees.", "A user filter compares data with USERNAME() or group membership.", "Apply RLS in a published data source and test as each user type."],
      check: [["Row-level security controls:", ["Colours", "Which rows each viewer sees", "Fonts", "Chart types"], 1, "It filters the data per user."], ["USERNAME() returns:", ["The signed-in user's name", "The workbook name", "The server", "A colour"], 0, "It identifies the viewer."]],
    }),
    topic({
      title: "Governance and analytics features", slug: "governance-analytics",
      blocks: [
        p("Governance is how an organisation keeps its analytics **trusted, consistent and secure** as more people create content."),
        list("Governance practices", ["**Certified data sources** that the data team vouches for, so people use them instead of making copies.", "**Naming standards** and clear descriptions for data sources and calculations.", "**A defined content lifecycle**: draft, test, publish, review and retire.", "**Clear ownership** for each data source and dashboard.", "**Least privilege**: give the lowest access that lets people do their work.", "**Usage monitoring**: remove dashboards nobody opens."]),
        p("Tableau also has built-in **analytics** features you can add to a view from the Analytics pane. They are quick, but use them with care."),
        table("Analytics pane features", ["Feature", "What it does", "Caution"], [["Trend line", "Fits a line or curve through the marks", "Shows a pattern, not a cause; check the fit (R-squared)"], ["Forecast", "Projects a time series forward with a statistical model", "Needs enough history; show the uncertainty band; it is not a promise"], ["Clusters", "Groups similar marks with k-means", "Groups depend on the fields and the number of clusters you choose"], ["Reference line", "Draws an average, median, target or constant", "State what the line is"], ["Box plot / distribution band", "Shows the spread of a measure", "Useful for outliers"]]),
        example("A forecast with honesty", "A forecast line extends monthly sales three months ahead.", ["The shaded band shows the range of likely values, not just one line.", "The caption says: 'Forecast assumes the 2025 pattern continues; it does not include planned price changes.'", "The decision-maker plans for the range."], "A forecast is a range with assumptions, never a promise."),
        warn("Built-in analytics make it easy to produce an impressive-looking forecast from too little data. Always check the history length, show the uncertainty and state the assumptions."),
        mistakes(["Uncertified, duplicated data sources with different numbers.", "A forecast presented as a certainty.", "A trend line read as proof of cause."]),
      ],
      points: ["Governance: certified data sources, naming, ownership, lifecycle, least privilege, usage monitoring.", "Trend lines, forecasts, clusters and reference lines are quick analytics.", "Show uncertainty and assumptions; a trend is not a cause."],
      check: [["A certified data source is:", ["Any file", "One the data team vouches for as trusted", "A colour", "A filter"], 1, "It is the preferred source."], ["A forecast should be shown with:", ["Only a line", "A range and stated assumptions", "No caption", "Fewer data"], 1, "Uncertainty must be visible."]],
    }),
  ],
  practical: { title: "Practical: deliver and secure", intro: "Open the **Where to publish?**, **Who sees what?** and the final project labs.", steps: ["Choose the publishing destination for each situation.", "Decide where each access control belongs.", "Build the final view and write the dashboard brief."] },
  terms: [["Project", "A folder of server content with permissions."], ["Published data source", "A shared, governed connection."], ["Permission", "What a person may do with content."], ["Row-level security", "Which rows each viewer sees."], ["USERNAME()", "The signed-in user's name."], ["Certified data source", "A source the data team vouches for."], ["Forecast", "A projection with uncertainty."]],
  quiz: [
    ["Tableau Public is for:", ["Confidential company data", "Public data", "Server admin", "Row-level security"], 1, "Everything published is public."],
    ["A project on a server is:", ["A folder with permissions", "A chart", "A colour", "A filter"], 0, "It organises content."],
    ["Row-level security restricts:", ["The font", "Which rows a user sees", "The chart type", "The extract size"], 1, "Per-user data filtering."],
    ["A user-filter uses:", ["USERNAME() or group membership", "SUM", "ROUND", "DATETRUNC"], 0, "It identifies the viewer."],
    ["Certified data sources help because:", ["They are prettier", "People reuse a trusted source", "They remove permissions", "They are faster to type"], 1, "One trusted definition."],
    ["A forecast should show:", ["Only a line", "An uncertainty range and assumptions", "Nothing", "A pie"], 1, "It is a range, not a promise."],
    ["A trend line shows:", ["Proof of cause", "A pattern in the marks", "A filter", "A colour"], 1, "Correlation is not cause."],
    ["Least privilege means:", ["Everyone is admin", "The lowest access needed to do the job", "No access", "Sharing passwords"], 1, "Limit access."],
  ],
});


