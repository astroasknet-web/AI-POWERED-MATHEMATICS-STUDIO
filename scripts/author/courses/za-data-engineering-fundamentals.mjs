import { capstone, course } from "../kit.mjs";
import { labs, SK_FOUND, SK_GOV, SK_MODEL, SK_OPS, SK_SQL } from "../parts/de-labs.mjs";
import { M1, M2, M3 } from "../parts/de-m1-3.mjs";
import { M4, M5, M6 } from "../parts/de-m4-6.mjs";

export default course({
  slug: "data-engineering-fundamentals", title: "Data Engineering Fundamentals", tagline: "Model, transform, test and run data pipelines, with live SQL on raw, messy data", level: "Advanced", hours: 26,
  summary: "Learn what holds across every data platform: how data is modelled for analytics (star schemas and slowly changing dimensions), how raw data is cleaned in layers with SQL (deduplication, latest records, incremental loads, quality tests), and how pipelines are designed, scheduled, monitored, secured and costed. You practise the SQL for all of it, live in your browser, on a raw order-event log with duplicates, late events, customers who move city and a messy payments feed. Python, Spark, Airflow and Kafka are explained with annotated code for you to read or run elsewhere; they do not run in this browser.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: a delivered-revenue pipeline, prototyped and documented", summary: "Prototype the pipeline query on the raw shop tables, write the design document, and pass the final assessment.",
    intro: "You can now explain how data moves and where it lives, model it as a star schema with history, clean it in layers, test it, schedule and monitor it, reason about scale and streams, and protect it. In this final project you play the data engineer for the shop. First prototype the pipeline's core query in the SQL lab: deduplicate the order events, keep each order's latest status, apply the finance rule that only delivered orders count, and join each order to the customer's city as it was on the order date. Then write the one-page pipeline design document. Finally take the assessment, which covers the whole course.",
    steps: ["Work through the **Revenue by customer city** lab: ROW_NUMBER for the latest event, LEAD for the type 2 customer history, and a half-open date join.", "Check the answer: does every delivered order appear once, in exactly one city?", "Write the **pipeline design document**: purpose, model, idempotent processing, tests, security and a risk.", "Take the final assessment below."], projectTitle: "Delivered revenue by city: pipeline and design document",
    quiz: [
      ["A data engineer's main product is:", ["Dashboards", "Reliable pipelines and datasets", "Models", "Slides"], 1, "Others build on their datasets."],
      ["OLTP systems are designed for:", ["Large historical scans", "Many small reads and writes", "Image storage", "Dashboards only"], 1, "They run the application."],
      ["Why is a columnar format good for analytics?", ["Queries read only the needed columns", "It is plain text", "It removes schemas", "It is slower"], 0, "Reports touch few columns of many rows."],
      ["The grain of a fact table is:", ["What one row represents", "Its file size", "Its owner", "Its colour"], 0, "State it first."],
      ["Which SCD type adds a versioned row with validity dates?", ["Type 1", "Type 2", "Type 3", "None"], 1, "Type 2 keeps full history."],
      ["To join a fact to a type 2 dimension you use:", ["The key only", "The key and a half-open date range", "The date only", "Nothing"], 1, "The range picks one version."],
      ["To keep the latest record per entity you use:", ["ROW_NUMBER with a descending timestamp and rn = 1", "SUM", "UNION", "LIMIT 1 on everything"], 0, "Number rows newest first."],
      ["An idempotent pipeline:", ["Cannot be rerun", "Gives the same result however often it runs", "Always inserts", "Has no schedule"], 1, "Retries and backfills are safe."],
      ["The watermark should be updated:", ["Before the load", "After the load succeeds", "Never", "Randomly"], 1, "Otherwise a failure skips data."],
      ["COUNT(*) - COUNT(DISTINCT key) measures:", ["Duplicate keys", "Null keys", "Freshness", "Row size"], 0, "Rows beyond the distinct keys."],
      ["A DAG:", ["May contain cycles", "Has tasks and dependencies with no cycles", "Is a file format", "Is a password"], 1, "Directed and acyclic."],
      ["A volume check catches:", ["Silent partial loads", "Typos", "Colour", "Slow typing"], 0, "Row counts reveal missing data."],
      ["In Kafka-style systems order is guaranteed:", ["Within a partition", "Across the topic", "Never", "Only for numbers"], 0, "Use a key to keep related events together."],
      ["Least privilege means:", ["Only the access needed for the job", "Everyone is admin", "No access", "Shared passwords"], 0, "Limit access."],
    ],
  }),
  labs,
  skills: [{ id: SK_FOUND, label: "Foundations" }, { id: SK_MODEL, label: "Data modelling" }, { id: SK_SQL, label: "SQL transformations" }, { id: SK_OPS, label: "Pipelines and operations" }, { id: SK_GOV, label: "Governance and design" }],
  badges: [
    { id: "de-foundations", title: "Foundations", description: "Knows the roles, formats and processing styles, and profiled raw data.", when: { all: ["de1-roles", "de4-profile-log", "de5-batch-stream"] } },
    { id: "modeller", title: "Data modeller", description: "Classified facts and dimensions and built type 2 history.", when: { all: ["de6-fact-dim", "de7-scd-type", "de8-scd2-build"] } },
    { id: "time-traveller-de", title: "Time traveller", description: "Joined facts to the customer version valid at the time.", when: { all: ["de9-scd2-join"] } },
    { id: "cleaner", title: "Pipeline cleaner", description: "Deduplicated events and built a business mart.", when: { all: ["de10-latest-status", "de11-mart"] } },
    { id: "quality-guard", title: "Quality guard", description: "Wrote data-quality checks and matched tests to problems.", when: { all: ["de12-dq-payments", "de13-which-test"] } },
    { id: "reliable", title: "Reliable operator", description: "Ordered pipeline steps and recognised idempotent operations.", when: { all: ["de14-order", "de15-idempotent"] } },
    { id: "data-engineer", title: "Data engineer", description: "Built the revenue-by-city pipeline query and wrote its design document.", when: { all: ["cap-de-city-revenue", "cap-de-design"] } },
  ],
  landing: {
    hero: { eyebrow: "Live SQL on raw, messy data · Pipelines explained", title: "Data Engineering Fundamentals", subtitle: "Learn the ideas behind every data platform, and practise the SQL: dimensional modelling, slowly changing history, deduplication, incremental loads and data-quality tests.", level: "Advanced", outcomeLine: "After this course you can design, build and document a reliable pipeline from raw data to a trusted, business-ready table." },
    outcomes: [
      { icon: "pipeline", title: "Understand the landscape", text: "Roles, OLTP and OLAP, warehouses, lakes and lakehouses, formats, batch and streaming, ETL and ELT." },
      { icon: "star", title: "Model data for analytics", text: "Normalisation, star schemas, grain, surrogate keys and slowly changing dimensions." },
      { icon: "sql", title: "Transform with SQL", text: "Layers, deduplication, latest records, incremental loads and idempotency." },
      { icon: "check", title: "Test the data", text: "Not null, unique, accepted values, relationships, range, freshness and volume checks." },
      { icon: "dag", title: "Run it reliably", text: "DAGs, schedules, retries, backfills, monitoring, alerting and CI for data." },
      { icon: "lock", title: "Scale, secure and document", text: "Partitions and shuffles, streaming ideas, privacy, cost and a design document." },
    ],
    projects: [
      { title: "Profile the raw order log", text: "Rows, distinct events and duplicate deliveries.", module: "data-engineering-foundations" },
      { title: "Type 2 customer history", text: "Validity dates with LEAD, and a join to the version valid then.", module: "data-modelling" },
      { title: "Latest status, mart and quality checks", text: "Dedupe, a business mart and a payments quality query.", module: "sql-transformations" },
      { title: "Incremental load", text: "Only the events newer than the watermark.", module: "pipelines-and-orchestration" },
      { title: "Tumbling windows", text: "Aggregating events into time windows.", module: "big-data-and-streaming" },
      { title: "Revenue by city, and the design document", text: "A full prototype and the document that explains it.", module: "capstone" },
    ],
    tools: [
      { icon: "sql", title: "Live SQL window", text: "Run queries in lessons and labs on raw shop tables, with plain-language errors." },
      { icon: "sort", title: "Sort and decide", text: "Short activities on roles, formats, SCD types, test choice and idempotency." },
      { icon: "doc", title: "Document lab", text: "Write the pipeline design document in a real editor." },
    ],
    assessment: ["Finish the required labs in each module: the SQL labs run your query and explain what is wrong.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Build the revenue-by-city query, write the design document and pass the final assessment to finish the course."],
    faq: [
      { q: "Does the code run in the browser?", a: "The SQL does: the practice window runs a SQL engine on built-in raw tables, and nothing leaves your device. Python, Spark, Airflow and Kafka are shown as annotated code to read or to run in your own environment; the lessons say where." },
      { q: "Which cloud or tool does it teach?", a: "None in particular. It teaches the ideas that hold across warehouses, lakes, orchestrators and streaming systems, and names tools as examples. Check each vendor's current documentation when you choose one." },
      { q: "What should I know first?", a: "SQL basics. SQL for Data & Business in this category is the best preparation; Data Analytics with Python & SQL helps too." },
      { q: "What is not covered hands-on?", a: "Running a cluster, an orchestrator or a streaming platform. They need infrastructure, so they are taught with scenarios, listings and sorting activities, while the modelling, transformation and testing, which are the core of the job, run here." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile. It is not a vendor certification." },
    ],
  },
  catalogue: {
    hours: "~26 hrs", weeks: "~6 weeks", pace: "4-5 hrs/wk", badge: "Data Engineer",
    brief: "Model, transform, test and run data pipelines: star schemas, slowly changing dimensions, deduplication, incremental loads, quality tests, orchestration and governance, with live SQL labs.",
    learn: ["Roles, OLTP and OLAP, warehouses, lakes, file formats, batch and streaming", "Star schemas, grain and slowly changing dimensions (type 2 with SQL)", "Raw, staging and mart layers, deduplication and the latest record", "Incremental, idempotent loads and SQL data-quality tests", "DAGs, retries, backfills, monitoring, testing and deployment", "Partitions, streaming ideas, privacy, cost and a pipeline design document"],
    handsOn: "Prototype a delivered-revenue-by-city pipeline on raw shop data, then write its design document.",
    outcome: "Design, build and document a reliable pipeline from raw data to a trusted, business-ready table.",
  },
});
