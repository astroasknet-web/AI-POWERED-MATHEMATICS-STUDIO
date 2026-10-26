import { ck, classifyLab, Q, sqlLab, V, vizLab, W, wordLab } from "../kit.mjs";
import { ga_events, trafficData } from "./ga-data.mjs";

export const SK_BASICS = "ga4-basics";
export const SK_COLLECT = "data-collection";
export const SK_ANALYSE = "traffic-analysis";
export const SK_CONV = "conversion-and-funnels";
export const SK_STRAT = "strategy-and-privacy";

/**
 * The report-builder labs run on the sessions of Kiran Learning, a small learning site, in the student's own browser; the SQL labs run on the same traffic as
 * flat GA4 events. Each lab judges one view or one query. The model answers are replayed by the course tests, so a lab can always be finished.
 */
const lab = (o) => vizLab({ data: trafficData, level: "intermediate", minutes: 12, xp: 50, skills: [SK_ANALYSE], required: true, ...o });
function vc({ shelves = [], kind, kindWhat, solution, calcs, ordered, sorted, extra = [], explain }) {
  const out = [ck("runs", "Your view draws without an error", "Add fields to Columns and Rows; if a message appears above the chart, it names the problem.", "A view that cannot be drawn cannot be checked. The message tells you which field or calculation it could not understand.", V.runs())];
  shelves.forEach(([shelf, field, o], i) => {
    const name = shelf === "columns" ? "Columns" : shelf === "rows" ? "Rows" : shelf[0].toUpperCase() + shelf.slice(1);
    const how = o?.agg ? ` (${o.agg === "avg" ? "average" : o.agg === "countd" ? "distinct count" : o.agg})` : o?.date ? ` (by ${o.date})` : "";
    out.push(ck(`shelf-${i + 1}`, `${field} is on ${name}${how}`, `Use the + Add field menu on ${name}${o?.agg || o?.date ? ", then set it in the pill's menu" : ""}.`, `${field} on ${name} ${shelf === "color" ? "colours the marks" : shelf === "label" ? "prints its value on each mark" : "sets the layout of the view"}.`, V.shelf(shelf, field, o ?? {})));
  });
  if (kind) out.push(ck("kind", `The view is ${kindWhat}`, "The chart type follows the fields: check which shelf holds the dimension and which the metric.", "The Automatic mark draws the chart that fits the fields on the shelves.", V.kind(kind, kindWhat)));
  if (sorted) out.push(ck("sorted", sorted === "desc" ? "The marks are sorted high to low" : "The marks are sorted low to high", "Use the Sort control above the chart.", "Sorting puts the largest (or smallest) first so the ranking is obvious.", V.sorted(sorted)));
  out.push(...extra);
  out.push(ck("marks", "The marks and values are what the task asks for", "Open View data below the chart and compare the marks with the task: which fields split them, and which metric is used?", explain, V.data(solution, { calcs, ordered })));
  return out;
}

const STARTER = "-- Write your query here, then press Run query\n";
function qc({ solution, uses = [], ordered = false, explain, hint }) {
  const out = [ck("runs", "Your query runs without an error", "Press Run query and read any message under the editor: it names the problem.", "A query that does not run cannot be checked. The message tells you which word or column it could not understand.", Q.runs())];
  uses.forEach(([re, what], i) => out.push(ck(`uses-${i + 1}`, `It uses ${what}`, `The task needs ${what}. Think about which clause does that job.`, `${what[0].toUpperCase()}${what.slice(1)} is the tool built for this part of the task.`, Q.uses(re, what))));
  out.push(ck("rows", "It returns the right rows and columns", hint ?? "Compare the number of rows and columns you get with what the task describes, then check your conditions.", explain, Q.result(solution)));
  if (ordered) out.push(ck("order", "The rows are in the order the task asks for", "Check the ORDER BY: which column, and ascending or descending?", "The task names the sort order; a second sort column breaks ties.", Q.result(solution, { ordered: true })));
  return out;
}
const sql = (o) => sqlLab({ tables: [ga_events], starter: STARTER, level: "intermediate", minutes: 15, xp: 60, skills: [SK_CONV], required: true, ...o });

export const labs = [
  /* ------------------------------------------------------------------ module 1 */
  classifyLab({
    id: "ga1-terms", module: "ga4-foundations", title: "Dimension or metric?", level: "beginner", minutes: 6, xp: 25, skills: [SK_BASICS], required: true,
    objective: "Classify GA4 terms as dimensions or metrics.",
    scenario: "Every GA4 report is dimensions (what you break the data down by) and metrics (the numbers). Classify each term.",
    steps: ["Read each term.", "Choose Dimension or Metric.", "Press Check my work."],
    categories: [["dim", "Dimension"], ["met", "Metric"]],
    items: [
      ["Device category", "dim", "It breaks the data down by type of device."],
      ["Sessions", "met", "A count."],
      ["Landing page", "dim", "A category to group by."],
      ["Engagement rate", "met", "A rate calculated from engaged sessions and sessions."],
      ["Session default channel group", "dim", "A category of traffic source."],
      ["Total revenue", "met", "A sum of money."],
      ["Country", "dim", "A category to group by."],
      ["Key events", "met", "A count of marked events."],
    ],
  }),
  lab({
    id: "ga2-sessions-channel", module: "ga4-foundations", title: "Sessions by channel", level: "beginner", minutes: 8, xp: 40, skills: [SK_BASICS],
    objective: "Build your first report: a dimension with a metric, sorted.",
    scenario: "Which channels bring the most sessions? Show Sessions for each Channel, with the largest first. (Sessions is a ready-made metric.)",
    steps: ["Channel on Columns, Sessions on Rows.", "Sort high to low.", "Which channel is biggest, and which is smallest?"],
    solution: { spec: { columns: [{ field: "Channel" }], rows: [{ field: "Sessions" }], sort: { dir: "desc" } } },
    checks: vc({ shelves: [["columns", "Channel"], ["rows", "Sessions"]], kind: ["bar-v"], kindWhat: "a bar chart", sorted: "desc", ordered: true, solution: { columns: [{ field: "Channel" }], rows: [{ field: "Sessions" }], sort: { dir: "desc" } }, explain: "A dimension on Columns with a metric on Rows gives one bar per channel; sorting ranks them." }),
  }),
  classifyLab({
    id: "ga3-model", module: "ga4-foundations", title: "Event, parameter or user property?", level: "beginner", minutes: 8, xp: 30, skills: [SK_BASICS], required: false,
    objective: "Place each item in GA4's data model.",
    scenario: "GA4 records events, parameters that describe them, and properties of users. Classify each item.",
    steps: ["Read each item.", "Choose Event, Event parameter or User property.", "Press Check my work."],
    categories: [["event", "Event"], ["param", "Event parameter"], ["prop", "User property"]],
    items: [
      ["purchase", "event", "Something a user did."],
      ["currency on a purchase", "param", "Detail attached to the event."],
      ["The language a user prefers", "prop", "A fact about the user that persists."],
      ["scroll", "event", "An interaction."],
      ["page_location on a page_view", "param", "Detail about the event."],
      ["A user's subscription plan", "prop", "It describes the user, not one event."],
    ],
  }),

  /* ------------------------------------------------------------------ module 2 */
  classifyLab({
    id: "ga4-event-types", module: "collecting-data", title: "Which kind of event?", level: "beginner", minutes: 8, xp: 30, skills: [SK_COLLECT], required: true,
    objective: "Tell the four kinds of GA4 event apart.",
    scenario: "GA4 has automatic, enhanced measurement, recommended and custom events. Classify each event.",
    steps: ["Read each event.", "Choose Automatic, Enhanced measurement, Recommended or Custom.", "Press Check my work."],
    categories: [["auto", "Automatically collected"], ["enh", "Enhanced measurement"], ["rec", "Recommended"], ["cust", "Custom"]],
    items: [
      ["session_start", "auto", "Sent automatically when the tag is installed."],
      ["scroll", "enh", "An enhanced measurement option for pages."],
      ["add_to_cart", "rec", "One of Google's recommended ecommerce events."],
      ["brochure_download (a name you invent)", "cust", "You define it yourself."],
      ["first_visit", "auto", "Collected automatically."],
      ["generate_lead", "rec", "A recommended event with defined parameters."],
      ["file_download", "enh", "An enhanced measurement event."],
      ["calculator_used", "cust", "A custom event."],
    ],
  }),
  classifyLab({
    id: "ga5-channel-groups", module: "collecting-data", title: "Which channel group?", level: "beginner", minutes: 8, xp: 30, skills: [SK_COLLECT], required: true,
    objective: "Assign traffic to GA4's default channel groups from source and medium.",
    scenario: "GA4 groups traffic into channels using rules on source and medium. Choose the channel for each source / medium.",
    steps: ["Read each source / medium.", "Choose the default channel group.", "Press Check my work."],
    categories: [["org", "Organic Search"], ["paid", "Paid Search"], ["email", "Email"], ["social", "Organic Social"], ["ref", "Referral"], ["direct", "Direct"]],
    items: [
      ["google / organic", "org", "A search engine with an organic medium."],
      ["google / cpc", "paid", "A search engine with a paid medium."],
      ["newsletter / email", "email", "The medium email gives the Email channel."],
      ["instagram / social", "social", "A social medium gives Organic Social."],
      ["partner-blog.in / referral", "ref", "Another website sending visitors."],
      ["(direct) / (none)", "direct", "No source: typed address, bookmark or untagged link."],
    ],
  }),
  classifyLab({
    id: "ga6-utm-check", module: "collecting-data", title: "Is the campaign tag correct?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_COLLECT], required: false,
    objective: "Spot faulty UTM tagging.",
    scenario: "Inconsistent or misplaced UTM tags fragment channels and hide the real source. Decide whether each tagging practice is good or faulty.",
    steps: ["Read each practice.", "Choose Good tagging or Faulty tagging.", "Press Check my work."],
    categories: [["good", "Good tagging"], ["bad", "Faulty tagging"]],
    items: [
      ["utm_medium=email on every newsletter link", "good", "A consistent medium maps to the Email channel."],
      ["utm_medium=Email on one campaign and e-mail on another", "bad", "Values are case sensitive and the spellings differ."],
      ["UTM tags on links between pages of your own site", "bad", "Internal tags start a new session and hide the real source."],
      ["All lowercase source and medium names from a shared template", "good", "One convention keeps channels whole."],
      ["An email address inside utm_content", "bad", "Personal data must never be in URLs."],
      ["A campaign name such as spring_sale_2025", "good", "A clear, consistent campaign name."],
    ],
  }),
  classifyLab({
    id: "ga7-gtm-pieces", module: "collecting-data", title: "Tag, trigger, variable or data layer?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_COLLECT], required: false,
    objective: "Name the Google Tag Manager piece that does each job.",
    scenario: "Google Tag Manager has four main pieces. Match each description to the right one.",
    steps: ["Read each description.", "Choose Tag, Trigger, Variable or Data layer.", "Press Check my work."],
    categories: [["tag", "Tag"], ["trigger", "Trigger"], ["var", "Variable"], ["dl", "Data layer"]],
    items: [
      ["Sends the brochure_download event to GA4", "tag", "A tag says what to send and where."],
      ["Fires when someone clicks a link ending in .pdf", "trigger", "A trigger is the firing condition."],
      ["Holds the value of the clicked link's URL for a tag to use", "var", "A variable supplies a value."],
      ["A structured object the site fills with the order total and items", "dl", "The data layer carries information from the site."],
      ["Waits for a click on the Buy button before anything is sent", "trigger", "It decides when."],
      ["Reads the purchase value that the website pushed", "var", "A data layer variable reads a value."],
    ],
  }),

  /* ------------------------------------------------------------------ module 3 */
  lab({
    id: "ga8-monthly", module: "acquisition-and-engagement", title: "Sessions by month", level: "beginner", minutes: 8, xp: 40,
    objective: "Show a trend: a date at the month level on Columns.",
    scenario: "Is traffic growing? Show Sessions for each month of the six months as a line.",
    steps: ["Session Date on Columns, then set the level to Month.", "Sessions on Rows."],
    solution: { spec: { columns: [{ field: "Session Date", date: "month" }], rows: [{ field: "Sessions" }] } },
    checks: vc({ shelves: [["columns", "Session Date", { date: "month" }], ["rows", "Sessions"]], kind: ["line"], kindWhat: "a line chart", solution: { columns: [{ field: "Session Date", date: "month" }], rows: [{ field: "Sessions" }] }, explain: "A date on Columns draws a line; the Month level groups sessions by year and month." }),
  }),
  lab({
    id: "ga9-engagement", module: "acquisition-and-engagement", title: "Engagement rate by channel", level: "intermediate", minutes: 15, xp: 65, allowCalcs: true,
    objective: "Build a calculated rate: total engaged over total sessions.",
    scenario: "Which channels hold visitors' attention? Create **Engagement Rate** = engaged sessions divided by sessions, and show it for each Channel, highest first.",
    steps: ["Create: Engagement Rate = SUM([Engaged]) / COUNTD([Session ID])", "Channel on Columns, Engagement Rate on Rows.", "Sort high to low."],
    solution: { spec: { columns: [{ field: "Channel" }], rows: [{ field: "Engagement Rate" }], sort: { dir: "desc" } }, calcs: { "Engagement Rate": "SUM([Engaged]) / COUNTD([Session ID])" } },
    checks: vc({ shelves: [["columns", "Channel"], ["rows", "Engagement Rate"]], kind: ["bar-v"], kindWhat: "a bar chart", sorted: "desc", ordered: true, calcs: { "Engagement Rate": "SUM([Engaged]) / COUNTD([Session ID])" }, extra: [ck("hascalc", "You created a calculated field called Engagement Rate", "Type the name, an equals sign and the formula in the Create a calculated field box.", "A calculated metric is defined once and then used like any other metric.", V.hasCalc("Engagement Rate")), ck("ratio", "It divides totals: SUM(...) / COUNTD(...)", "Use SUM([Engaged]) / COUNTD([Session ID]).", "A rate of totals is correct at every level; the average of row rates is not.", V.uses("sum\\s*\\(.*\\/.*countd\\s*\\(", "SUM([Engaged]) / COUNTD([Session ID])"))], solution: { columns: [{ field: "Channel" }], rows: [{ field: "Engagement Rate" }], sort: { dir: "desc" } }, explain: "For each channel, total engaged sessions divided by total sessions: a ratio of totals, calculated per mark." }),
  }),
  lab({
    id: "ga10-conv-device", module: "acquisition-and-engagement", title: "Conversion rate by device", level: "intermediate", minutes: 15, xp: 65, allowCalcs: true,
    objective: "Calculate a conversion rate and show its base beside it.",
    scenario: "Do mobile visitors convert as well as desktop visitors? Create **Conversion Rate** = sessions that converted divided by sessions, and show it by Device, with Sessions on Label so every rate shows how many sessions it rests on.",
    steps: ["Create: Conversion Rate = SUM([Converted]) / COUNTD([Session ID])", "Device on Columns, Conversion Rate on Rows.", "Sessions on Label."],
    solution: { spec: { columns: [{ field: "Device" }], rows: [{ field: "Conversion Rate" }], label: { field: "Sessions" } }, calcs: { "Conversion Rate": "SUM([Converted]) / COUNTD([Session ID])" } },
    checks: vc({ shelves: [["columns", "Device"], ["rows", "Conversion Rate"], ["label", "Sessions"]], kind: ["bar-v"], kindWhat: "a bar chart", calcs: { "Conversion Rate": "SUM([Converted]) / COUNTD([Session ID])" }, extra: [ck("hascalc", "You created a calculated field called Conversion Rate", "Type the name, an equals sign and the formula.", "A conversion rate is converted sessions over sessions.", V.hasCalc("Conversion Rate"))], solution: { columns: [{ field: "Device" }], rows: [{ field: "Conversion Rate" }], label: { field: "Sessions" } }, explain: "Total converted sessions divided by total sessions for each device, with the number of sessions printed so small groups (tablet) are not over-read." }),
  }),
  lab({
    id: "ga11-heat", module: "acquisition-and-engagement", title: "Channel by device: where are the sessions?", level: "intermediate", minutes: 10, xp: 50,
    objective: "Build a heat map to see two dimensions at once.",
    scenario: "Show Channel down the side, Device across the top, and colour each square by Sessions, so you can see where the traffic is concentrated.",
    steps: ["Device on Columns, Channel on Rows.", "Choose the Square mark.", "Sessions on Color."],
    solution: { spec: { mark: "square", columns: [{ field: "Device" }], rows: [{ field: "Channel" }], color: { field: "Sessions" } } },
    checks: vc({ shelves: [["columns", "Device"], ["rows", "Channel"], ["color", "Sessions"]], kind: ["heat"], kindWhat: "a heat map", solution: { mark: "square", columns: [{ field: "Device" }], rows: [{ field: "Channel" }], color: { field: "Sessions" } }, explain: "Dimensions on both shelves make a grid; the Square mark with a metric on Color makes a heat map." }),
  }),
  lab({
    id: "ga12-landing", module: "acquisition-and-engagement", title: "Revenue by landing page", level: "intermediate", minutes: 10, xp: 50, required: false,
    objective: "Rank entry pages by the revenue their sessions produce.",
    scenario: "Which landing pages bring the most revenue? Show total Revenue for each Landing Page as horizontal bars, largest first.",
    steps: ["Revenue on Columns, Landing Page on Rows.", "Sort high to low."],
    solution: { spec: { columns: [{ field: "Revenue" }], rows: [{ field: "Landing Page" }], sort: { dir: "desc" } } },
    checks: vc({ shelves: [["columns", "Revenue", { agg: "sum" }], ["rows", "Landing Page"]], kind: ["bar-h"], kindWhat: "a horizontal bar chart", sorted: "desc", ordered: true, solution: { columns: [{ field: "Revenue" }], rows: [{ field: "Landing Page" }], sort: { dir: "desc" } }, explain: "A measure on Columns with a dimension on Rows gives horizontal bars; sorting ranks the pages by revenue." }),
  }),

  /* ------------------------------------------------------------------ module 4 */
  classifyLab({
    id: "ga13-which-event", module: "conversion-and-ecommerce", title: "Which ecommerce event?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_CONV], required: true,
    objective: "Match each step of a shopping journey to GA4's recommended event.",
    scenario: "GA4 defines recommended events for a purchase journey. Choose the event that fits each step.",
    steps: ["Read each step.", "Choose the event.", "Press Check my work."],
    categories: [["view_item", "view_item"], ["add_to_cart", "add_to_cart"], ["begin_checkout", "begin_checkout"], ["purchase", "purchase"]],
    items: [
      ["A visitor opens a course page", "view_item", "A product page view."],
      ["The visitor clicks Add to cart", "add_to_cart", "A product is added."],
      ["The visitor presses Checkout", "begin_checkout", "Checkout starts."],
      ["Payment succeeds and the order is complete", "purchase", "The order is completed."],
      ["A visitor views the page of a different course", "view_item", "Another product page view."],
      ["A confirmation shows the transaction id and the amount paid", "purchase", "A purchase carries transaction_id, value and currency."],
    ],
  }),
  sql({
    id: "ga14-funnel", module: "conversion-and-ecommerce", title: "The purchase funnel", level: "challenge", minutes: 20, xp: 80,
    objective: "Count a funnel with distinct sessions and a window function.",
    scenario: "Count the funnel: for the steps view_item, add_to_cart, begin_checkout and purchase, return `event_name`, `sessions` (distinct sessions that had the event) and `pct_of_views` (sessions as a percentage of the view_item step, one decimal). Show the steps in funnel order.",
    steps: ["Filter the four events and count COUNT(DISTINCT session_id) per event_name in a CTE, with a step number from CASE.", "Divide by FIRST_VALUE(sessions) OVER (ORDER BY step) times 100.0.", "Sort by the step number."],
    solution: "WITH s AS (SELECT event_name, COUNT(DISTINCT session_id) AS sessions, CASE event_name WHEN 'view_item' THEN 1 WHEN 'add_to_cart' THEN 2 WHEN 'begin_checkout' THEN 3 ELSE 4 END AS step FROM ga_events WHERE event_name IN ('view_item', 'add_to_cart', 'begin_checkout', 'purchase') GROUP BY event_name) SELECT event_name, sessions, ROUND(100.0 * sessions / FIRST_VALUE(sessions) OVER (ORDER BY step), 1) AS pct_of_views FROM s ORDER BY step",
    checks: qc({ solution: "WITH s AS (SELECT event_name, COUNT(DISTINCT session_id) AS sessions, CASE event_name WHEN 'view_item' THEN 1 WHEN 'add_to_cart' THEN 2 WHEN 'begin_checkout' THEN 3 ELSE 4 END AS step FROM ga_events WHERE event_name IN ('view_item', 'add_to_cart', 'begin_checkout', 'purchase') GROUP BY event_name) SELECT event_name, sessions, ROUND(100.0 * sessions / FIRST_VALUE(sessions) OVER (ORDER BY step), 1) AS pct_of_views FROM s ORDER BY step", uses: [["count\\s*\\(\\s*distinct", "COUNT(DISTINCT session_id)"], ["first_value", "FIRST_VALUE"]], ordered: true, explain: "A funnel counts distinct sessions at each step, because one session can fire the same event several times. FIRST_VALUE gives the top of the funnel to divide by, and the CASE orders the steps." }),
  }),
  sql({
    id: "ga15-revenue-source", module: "conversion-and-ecommerce", title: "Revenue by source and medium", level: "intermediate", minutes: 15, xp: 60,
    objective: "Aggregate purchase events by traffic source.",
    scenario: "Using only the **purchase** events, return `source`, `medium`, `purchases` (the number of different sessions that purchased) and `revenue` (the sum of value). Biggest revenue first, then source.",
    steps: ["Filter WHERE event_name = 'purchase'.", "GROUP BY source and medium.", "COUNT(DISTINCT session_id) and SUM(value); sort by revenue descending, then source."],
    solution: "SELECT source, medium, COUNT(DISTINCT session_id) AS purchases, SUM(value) AS revenue FROM ga_events WHERE event_name = 'purchase' GROUP BY source, medium ORDER BY revenue DESC, source",
    checks: qc({ solution: "SELECT source, medium, COUNT(DISTINCT session_id) AS purchases, SUM(value) AS revenue FROM ga_events WHERE event_name = 'purchase' GROUP BY source, medium ORDER BY revenue DESC, source", uses: [["group\\s+by", "GROUP BY"]], ordered: true, explain: "Filter to the purchase events, group by where the traffic came from, count distinct purchasing sessions and add up the value." }),
  }),
  sql({
    id: "ga16-conv-rate", module: "conversion-and-ecommerce", title: "Conversion rate by source and medium", level: "challenge", minutes: 22, xp: 80,
    objective: "Build a conversion rate with conditional distinct counts.",
    scenario: "For each source and medium return `source`, `medium`, `sessions` (distinct sessions), `buying_sessions` (distinct sessions that had a purchase event) and `conversion_pct` (buying sessions as a percentage of sessions, one decimal). Sort by sessions descending, then source.",
    steps: ["COUNT(DISTINCT session_id) counts sessions.", "COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN session_id END) counts buying sessions.", "Divide, multiply by 100.0 and ROUND to 1 decimal."],
    solution: "SELECT source, medium, COUNT(DISTINCT session_id) AS sessions, COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN session_id END) AS buying_sessions, ROUND(100.0 * COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN session_id END) / COUNT(DISTINCT session_id), 1) AS conversion_pct FROM ga_events GROUP BY source, medium ORDER BY sessions DESC, source",
    checks: qc({ solution: "SELECT source, medium, COUNT(DISTINCT session_id) AS sessions, COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN session_id END) AS buying_sessions, ROUND(100.0 * COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN session_id END) / COUNT(DISTINCT session_id), 1) AS conversion_pct FROM ga_events GROUP BY source, medium ORDER BY sessions DESC, source", uses: [["\\bcase\\b", "CASE inside COUNT(DISTINCT ...)"]], ordered: true, explain: "A CASE inside COUNT(DISTINCT ...) counts only sessions with a purchase, so the ratio is buying sessions over all sessions, both counted once per session." }),
  }),
  classifyLab({
    id: "ga17-attribution", module: "conversion-and-ecommerce", title: "Which attribution model?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_CONV], required: false,
    objective: "Match each description to the attribution model it fits.",
    scenario: "A visitor clicks a paid ad, opens an email, and then buys by typing the address. Different models share the credit differently.",
    steps: ["Read each statement.", "Choose Last click, First click or Data-driven.", "Press Check my work."],
    categories: [["last", "Last click"], ["first", "First click"], ["dd", "Data-driven"]],
    items: [
      ["All credit goes to Direct, where the visitor finally bought", "last", "The final touchpoint gets everything."],
      ["All credit goes to the paid ad that first brought them", "first", "The first touchpoint gets everything."],
      ["Credit is shared using a model learned from many conversion paths", "dd", "It reflects each step's contribution."],
      ["It ignores what built interest earlier in the journey", "last", "A weakness of last click."],
      ["It ignores what closed the sale", "first", "A weakness of first click."],
      ["It needs enough conversion data to work well", "dd", "Models need volume."],
    ],
  }),

  /* ------------------------------------------------------------------ module 5 */
  classifyLab({
    id: "ga18-exploration", module: "explorations-and-bigquery", title: "Which exploration?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_CONV], required: true,
    objective: "Choose the exploration technique that fits the question.",
    scenario: "Different questions use different GA4 explorations. Choose the best technique for each.",
    steps: ["Read each question.", "Choose Free form, Funnel, Path, Cohort or Segment overlap.", "Press Check my work."],
    categories: [["free", "Free form"], ["funnel", "Funnel exploration"], ["path", "Path exploration"], ["cohort", "Cohort exploration"], ["overlap", "Segment overlap"]],
    items: [
      ["What share of sessions complete each step from view_item to purchase?", "funnel", "A funnel counts completion step by step."],
      ["What pages do visitors open after the pricing page?", "path", "A path exploration follows what happens next."],
      ["Do users who first visited in January come back more than February's?", "cohort", "A cohort groups users by when they started."],
      ["Sessions and revenue by channel and device in one table", "free", "A free-form exploration builds any table."],
      ["How many mobile users are also returning users?", "overlap", "Segment overlap shows how segments intersect."],
    ],
  }),
  sql({
    id: "ga19-abandoners", module: "explorations-and-bigquery", title: "Who added to cart but never purchased?", level: "intermediate", minutes: 12, xp: 55,
    objective: "Build the user list behind a cart-abandoner audience.",
    scenario: "Return the distinct `user_pseudo_id` of users who had an add_to_cart event but **never** a purchase event, sorted by user_pseudo_id. This is the list a 'cart abandoners' audience would contain.",
    steps: ["SELECT DISTINCT user_pseudo_id for add_to_cart events.", "Subtract the users who purchased with EXCEPT (or NOT EXISTS).", "Sort by user_pseudo_id."],
    solution: "SELECT DISTINCT user_pseudo_id FROM ga_events WHERE event_name = 'add_to_cart' EXCEPT SELECT user_pseudo_id FROM ga_events WHERE event_name = 'purchase' ORDER BY 1",
    checks: qc({ solution: "SELECT DISTINCT user_pseudo_id FROM ga_events WHERE event_name = 'add_to_cart' EXCEPT SELECT user_pseudo_id FROM ga_events WHERE event_name = 'purchase' ORDER BY 1", uses: [["except|not\\s+exists|not\\s+in", "EXCEPT (or NOT EXISTS)"]], ordered: true, explain: "Users who did A but not B: take the add_to_cart users and subtract the purchasers. A live audience is this list kept up to date." }),
  }),
  sql({
    id: "ga20-returning", module: "explorations-and-bigquery", title: "New and returning users", level: "challenge", minutes: 20, xp: 75,
    objective: "Count users with more than one session.",
    scenario: "Return one row with `users` (distinct user_pseudo_id), `returning_users` (users with two or more distinct sessions) and `returning_pct` (returning users as a percentage of users, one decimal).",
    steps: ["In a CTE count distinct sessions per user.", "users = COUNT(*), returning_users = SUM(CASE WHEN sessions >= 2 THEN 1 ELSE 0 END).", "Divide, multiply by 100.0 and ROUND to 1 decimal."],
    solution: "WITH u AS (SELECT user_pseudo_id, COUNT(DISTINCT session_id) AS sessions FROM ga_events GROUP BY user_pseudo_id) SELECT COUNT(*) AS users, SUM(CASE WHEN sessions >= 2 THEN 1 ELSE 0 END) AS returning_users, ROUND(100.0 * SUM(CASE WHEN sessions >= 2 THEN 1 ELSE 0 END) / COUNT(*), 1) AS returning_pct FROM u",
    checks: qc({ solution: "WITH u AS (SELECT user_pseudo_id, COUNT(DISTINCT session_id) AS sessions FROM ga_events GROUP BY user_pseudo_id) SELECT COUNT(*) AS users, SUM(CASE WHEN sessions >= 2 THEN 1 ELSE 0 END) AS returning_users, ROUND(100.0 * SUM(CASE WHEN sessions >= 2 THEN 1 ELSE 0 END) / COUNT(*), 1) AS returning_pct FROM u", uses: [["\\bwith\\b", "a CTE (WITH)"], ["\\bcase\\b", "CASE"]], explain: "First reduce the events to one row per user with the number of sessions; then count the users and the ones with two or more sessions." }),
  }),

  /* ------------------------------------------------------------------ module 6 */
  classifyLab({
    id: "ga21-limits", module: "measurement-strategy-and-privacy", title: "A limit of the data", level: "intermediate", minutes: 8, xp: 30, skills: [SK_STRAT], required: true,
    objective: "Match each data limit to what it means for a report.",
    scenario: "Analytics data has limits. Match each situation to the limit that explains it.",
    steps: ["Read each situation.", "Choose Consent, Sampling, Thresholds or Not causal.", "Press Check my work."],
    categories: [["consent", "Consent and ad blockers"], ["sampling", "Sampling"], ["threshold", "Thresholds"], ["cause", "Not causal"]],
    items: [
      ["Reports show fewer visitors after a consent banner is added", "consent", "Visitors who decline are not measured in the usual way."],
      ["A huge exploration is based on a subset of the events", "sampling", "Large queries can use a sample."],
      ["A report hides rows for very small groups to protect privacy", "threshold", "Thresholds suppress small groups."],
      ["Mobile visitors convert less, but you cannot say mobile is the reason", "cause", "A report shows association, not proof of cause."],
      ["A visitor who blocks all tracking never appears", "consent", "Ad blockers and declined consent reduce counts."],
    ],
  }),
  classifyLab({
    id: "ga22-privacy", module: "measurement-strategy-and-privacy", title: "Good practice or risk?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_STRAT], required: true,
    objective: "Recognise responsible and risky analytics practice.",
    scenario: "Decide whether each practice protects visitors' privacy or puts it at risk.",
    steps: ["Read each practice.", "Choose Good practice or Risk.", "Press Check my work."],
    categories: [["good", "Good practice"], ["risk", "Risk"]],
    items: [
      ["Do not send customers' emails or names to GA4", "good", "Keep personal data out of analytics."],
      ["Put a customer's email address in an event parameter", "risk", "Personal data must not be sent."],
      ["Honour a visitor's declined consent", "good", "Respect their choice."],
      ["Work around a declined consent banner to keep tracking", "risk", "It breaks trust and the rules."],
      ["Set a data retention period that matches your needs", "good", "Do not keep data longer than needed."],
      ["Combine pseudonymous analytics data with other data to identify individuals", "risk", "Re-identification can break the law and trust."],
      ["Explain in a privacy notice what you collect and why", "good", "Transparency."],
      ["State the limits of the data in a report", "good", "Honesty makes reports trustworthy."],
    ],
  }),
  lab({
    id: "cap-ga-channel", module: "capstone", title: "Which channel deserves the budget?", level: "challenge", minutes: 25, xp: 100, allowCalcs: true, skills: [SK_ANALYSE, SK_STRAT],
    objective: "Build the view that answers the marketing question, with its base.",
    scenario: "The marketing lead asks: which channel deserves more budget? Create **Conversion Rate** = SUM([Converted]) / COUNTD([Session ID]) and show it for each Channel, highest first, with Sessions on Label so each rate shows how many sessions it rests on.",
    steps: ["Create the Conversion Rate calculated field.", "Channel on Columns, Conversion Rate on Rows, Sessions on Label.", "Sort high to low and read the chart: which rates are based on few sessions?"],
    solution: { spec: { columns: [{ field: "Channel" }], rows: [{ field: "Conversion Rate" }], label: { field: "Sessions" }, sort: { dir: "desc" } }, calcs: { "Conversion Rate": "SUM([Converted]) / COUNTD([Session ID])" } },
    checks: vc({ shelves: [["columns", "Channel"], ["rows", "Conversion Rate"], ["label", "Sessions"]], kind: ["bar-v"], kindWhat: "a bar chart", sorted: "desc", ordered: true, calcs: { "Conversion Rate": "SUM([Converted]) / COUNTD([Session ID])" }, extra: [ck("hascalc", "You created a calculated field called Conversion Rate", "Type the name, an equals sign and the formula.", "A conversion rate is converted sessions over sessions.", V.hasCalc("Conversion Rate"))], solution: { columns: [{ field: "Channel" }], rows: [{ field: "Conversion Rate" }], label: { field: "Sessions" }, sort: { dir: "desc" } }, explain: "Converted sessions over sessions for each channel, ranked, with sessions printed so a high rate on a small channel is not over-read." }),
  }),
  wordLab({
    id: "cap-ga-plan", module: "capstone", title: "Write the measurement plan and findings", level: "challenge", minutes: 25, xp: 100, skills: [SK_STRAT], required: true,
    objective: "Turn the analysis into a plan and a recommendation the marketing lead can act on.",
    scenario: "Write a one-page document for the marketing lead of the learning site: the goal and KPIs, the events you rely on, what the channel analysis shows, a recommendation, and how privacy and the limits of the data are handled.",
    steps: ["Add a title heading and headings 'Goal and KPIs', 'Findings' and 'Limits and privacy'.", "List at least three KPIs or events in a bulleted list, with their definitions.", "Write a recommendation paragraph that begins with the word Recommendation.", "Mention consent or personal data, and a limit of the data such as a small group."],
    html: "<p><br></p>",
    checks: [
      ck("title", "The document has a title heading", "Use the heading style for the title.", "A heading tells the reader what the document is.", W.heading(1)),
      ck("sections", "There are at least four headings (title and three sections)", "Add the three section headings.", "Headings let a busy reader find each part.", W.heading(4)),
      ck("para", "There are at least two paragraphs", "Write the findings and the recommendation as paragraphs.", "Prose connects the numbers to a decision.", W.paragraphs(2, 12)),
      ck("list", "The KPIs and events are a list of at least three items", "Use the bullet list button.", "A list makes the plan easy to scan.", W.list(3, "ul")),
      ck("rec", "It contains a recommendation", "Start a paragraph with Recommendation.", "A finding without an action is half the work.", W.contains("Recommendation")),
      ck("limit", "It states a limit of the data", "Include the word limit or limitation and say what the data cannot show.", "Honest analysis says what the numbers cannot tell you.", W.pattern("limit", "a sentence about a limit of the data")),
      ck("privacy", "It mentions consent or personal data", "Say how consent and personal data are handled.", "Privacy is part of the plan.", W.pattern("consent|personal data|privacy", "consent or personal data")),
    ],
    solution: "<h1>Measurement plan and findings: Kiran Learning</h1><h2>Goal and KPIs</h2><p>The goal is to grow course sales efficiently. The marketing lead needs to know which channels deserve budget.</p><ul><li>Sessions: visits, excluding internal traffic.</li><li>Conversion rate: sessions with a purchase divided by sessions.</li><li>Revenue per session: total revenue divided by sessions.</li><li>Events: view_item, add_to_cart, begin_checkout and purchase with value and currency.</li></ul><h2>Findings</h2><p>Email converts best and organic search brings the most sessions, while paid search brought many sessions but no purchases in these six months.</p><p>Recommendation: review the targeting of paid search before adding budget, and grow the email list, then compare conversion by channel again next month.</p><h2>Limits and privacy</h2><p>One limit is that several channels have few sessions, so their rates are indicative only. Visitors who decline consent are not measured, and no personal data is sent to GA4.</p>",
  }),
];
