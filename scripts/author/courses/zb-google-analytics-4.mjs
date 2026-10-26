import { capstone, course } from "../kit.mjs";
import { labs, SK_ANALYSE, SK_BASICS, SK_COLLECT, SK_CONV, SK_STRAT } from "../parts/ga-labs.mjs";
import { M1, M2, M3 } from "../parts/ga-m1-3.mjs";
import { M4, M5, M6 } from "../parts/ga-m4-6.mjs";

export default course({
  slug: "google-analytics-4", title: "Google Analytics 4", tagline: "Measure a website the way GA4 does, and turn the numbers into decisions, with live reports and SQL", level: "Intermediate", hours: 22,
  summary: "Learn how Google Analytics 4 thinks: events, parameters and users, how data is collected with the tag and Google Tag Manager, how traffic is grouped into channels, and how to read acquisition, engagement and conversion. You build the reports yourself, live in your browser, on the sessions of a small learning site: rates, trends, heat maps and funnels, plus SQL on the same traffic as flat events, the way GA4 data looks in a BigQuery export. The GA4 interface, Google Tag Manager and BigQuery themselves are explained and shown as listings; they need a Google account and a real site, so they do not run here.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: which channel deserves the budget?", summary: "Build the channel view, write the measurement plan and findings, and pass the final assessment.",
    intro: "You can now explain GA4's data model, plan and check collection, read acquisition and engagement, follow a funnel, query event data and describe the limits of what the numbers can tell you. In this final project you are the analyst for Kiran Learning. The marketing lead asks which channel deserves more budget. First build the view in the report builder: the conversion rate of each channel, ranked, with the number of sessions printed beside it. Then write the measurement plan and findings document, with a recommendation and an honest statement of the limits. Finally take the assessment, which covers the whole course.",
    steps: ["Work through the **Which channel deserves the budget?** lab: create the rate, show it by channel and print the sessions.", "Check your reading: which channel has the highest rate, and which rates rest on only a few sessions?", "Write the **measurement plan and findings** document: goal, KPIs, findings, a recommendation, limits and privacy.", "Take the final assessment below."], projectTitle: "Channel budget recommendation and measurement plan",
    quiz: [
      ["In GA4 everything that happens is recorded as:", ["A page view only", "An event", "A session only", "A cookie"], 1, "Page views, clicks and purchases are all events."],
      ["A dimension is:", ["A number", "A category to break data down by", "A password", "A file type"], 1, "Metrics are the numbers."],
      ["An engaged session is one that:", ["Has any visit", "Lasts long enough, has a key event, or has several page views", "Comes from email", "Is on mobile"], 1, "GA4 counts engagement by time, key events or page views."],
      ["Which tool lets you add and change tags without editing the site code each time?", ["Google Tag Manager", "A spreadsheet", "An email", "A PDF"], 0, "It holds tags, triggers and variables."],
      ["The medium cpc normally places traffic in:", ["Organic Search", "Paid Search", "Email", "Direct"], 1, "Paid medium on a search source."],
      ["UTM values are:", ["Case-insensitive", "Case sensitive, so use one convention", "Ignored by GA4", "Secret"], 1, "Email and email are different values."],
      ["A conversion rate of sessions is calculated as:", ["Average of the daily rates", "Total converted sessions divided by total sessions", "Revenue divided by pages", "Sessions divided by users"], 1, "A ratio of totals."],
      ["Why print the number of sessions beside a rate?", ["It looks neat", "A high rate on very few sessions can be chance", "It is required by GA4", "It changes the rate"], 1, "Small bases are unreliable."],
      ["To count a funnel step correctly you count:", ["Every event", "Distinct sessions or users that had the event", "Only the first day", "Page titles"], 1, "One session can fire the same event many times."],
      ["Last click attribution gives all the credit to:", ["The first touchpoint", "The final touchpoint before the conversion", "Every touchpoint equally", "None"], 1, "It ignores earlier steps."],
      ["A cart-abandoner audience is users who:", ["Purchased", "Added to cart but did not purchase", "Never visited", "Only used email"], 1, "A set difference: add_to_cart minus purchase."],
      ["Why can reports show fewer visitors after a consent banner is added?", ["A bug in GA4", "Visitors who decline are not measured in the usual way", "Fewer people exist", "Sampling"], 1, "Consent changes what can be collected."],
      ["Which should never be sent to GA4?", ["Event names", "Customers' email addresses or names", "Page paths", "Currency"], 1, "Keep personal data out of analytics."],
      ["A report shows mobile converts less than desktop. What can you conclude?", ["Mobile causes lower sales", "They differ, but the report alone does not show why", "Remove mobile", "Nothing is different"], 1, "Association is not proof of cause."],
    ],
  }),
  labs,
  skills: [{ id: SK_BASICS, label: "GA4 basics" }, { id: SK_COLLECT, label: "Data collection" }, { id: SK_ANALYSE, label: "Traffic analysis" }, { id: SK_CONV, label: "Conversion and funnels" }, { id: SK_STRAT, label: "Strategy and privacy" }],
  badges: [
    { id: "ga-basics", title: "GA4 basics", description: "Told dimensions from metrics and built a first report.", when: { all: ["ga1-terms", "ga2-sessions-channel"] } },
    { id: "ga-collector", title: "Data collector", description: "Classified event types, channel groups, UTM tagging and Tag Manager pieces.", when: { all: ["ga4-event-types", "ga5-channel-groups"] } },
    { id: "ga-traffic-reader", title: "Traffic reader", description: "Built trend, engagement, conversion and heat-map views.", when: { all: ["ga8-monthly", "ga9-engagement", "ga10-conv-device", "ga11-heat"] } },
    { id: "ga-funnel-builder", title: "Funnel builder", description: "Counted a purchase funnel and conversion by source with SQL.", when: { all: ["ga14-funnel", "ga15-revenue-source", "ga16-conv-rate"] } },
    { id: "ga-audience", title: "Audience builder", description: "Listed cart abandoners and measured returning users.", when: { all: ["ga19-abandoners", "ga20-returning"] } },
    { id: "ga-responsible", title: "Responsible analyst", description: "Recognised the limits of the data and good privacy practice.", when: { all: ["ga21-limits", "ga22-privacy"] } },
    { id: "ga-analyst", title: "GA4 analyst", description: "Built the channel view and wrote the measurement plan and findings.", when: { all: ["cap-ga-channel", "cap-ga-plan"] } },
  ],
  landing: {
    hero: { eyebrow: "Live reports and SQL on real traffic · GA4 explained", title: "Google Analytics 4", subtitle: "Understand events, channels, engagement and conversion, build the reports and funnels yourself, and learn what the numbers can and cannot tell you.", level: "Intermediate", outcomeLine: "After this course you can plan measurement, read GA4 reports with care and recommend where to spend the budget." },
    outcomes: [
      { icon: "analytics", title: "Think in events", text: "Events, parameters, users, sessions, dimensions and metrics." },
      { icon: "tag", title: "Plan data collection", text: "The tag, Google Tag Manager, event types, UTM tagging and consent." },
      { icon: "chart", title: "Read acquisition and engagement", text: "Channels, source and medium, engagement rate, landing pages and devices." },
      { icon: "funnel", title: "Follow conversion", text: "Key events, ecommerce events, funnels and attribution models." },
      { icon: "sql", title: "Query event data", text: "Funnels, revenue by source, audiences and returning users in SQL." },
      { icon: "lock", title: "Use data responsibly", text: "Consent, thresholds, sampling, personal data and honest reporting." },
    ],
    projects: [
      { title: "Sessions by channel", text: "Your first report: a dimension, a metric and a sort.", module: "ga4-foundations" },
      { title: "Classify events and channels", text: "Event types, channel groups, UTM tags and Tag Manager pieces.", module: "collecting-data" },
      { title: "Engagement, conversion and heat map", text: "Rates built from totals, shown with their base.", module: "acquisition-and-engagement" },
      { title: "The purchase funnel in SQL", text: "Distinct sessions at each step and the share of views.", module: "conversion-and-ecommerce" },
      { title: "Cart abandoners and returning users", text: "Audiences and cohorts from flat events.", module: "explorations-and-bigquery" },
      { title: "Channel budget recommendation", text: "The view, the plan and the findings document.", module: "capstone" },
    ],
    tools: [
      { icon: "chart", title: "Report builder", text: "Drag fields to shelves, create rates and see the chart, in your browser." },
      { icon: "sql", title: "Live SQL window", text: "Query GA4-style event data with plain-language errors." },
      { icon: "doc", title: "Document lab", text: "Write the measurement plan and findings in a real editor." },
    ],
    assessment: ["Finish the required labs in each module: the report builder and SQL window check your work and explain what is wrong.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Build the channel view, write the measurement plan and findings and pass the final assessment to finish the course."],
    faq: [
      { q: "Does this connect to my own GA4 property?", a: "No. The lessons use a built-in sample of a small learning site, so you can practise without a website or a Google account. Everything you build runs in your browser." },
      { q: "Are the GA4 screens shown?", a: "They are described step by step with listings and examples, because the interface changes often and needs a real property. Check Google's current documentation for exact menu names." },
      { q: "Does Google Tag Manager or BigQuery run here?", a: "No. They are explained, and the SQL labs query the same traffic as a flat events table, the shape of a BigQuery export, so the thinking carries over." },
      { q: "What should I know first?", a: "Comfort with basic percentages. SQL for Data & Business in this category helps for the SQL labs." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile. It is not a Google certification." },
    ],
  },
  catalogue: {
    hours: "~22 hrs", weeks: "~5 weeks", pace: "4-5 hrs/wk", badge: "GA4 Analyst",
    brief: "Understand GA4's event model, plan collection, read acquisition, engagement and conversion, build funnels with SQL and use data responsibly, with live report and SQL labs.",
    learn: ["Events, parameters, users, sessions, dimensions and metrics", "The tag, Google Tag Manager, event types, UTM tagging and channel groups", "Engagement rate, conversion rate and rates built from totals", "Ecommerce events, funnels and attribution models", "Explorations, audiences and event data in SQL", "Consent, thresholds, sampling, privacy and a measurement plan"],
    handsOn: "Build the channel conversion view for a learning site and write the measurement plan and recommendation.",
    outcome: "Plan measurement, read GA4 reports with care and recommend where to spend the budget.",
  },
});
