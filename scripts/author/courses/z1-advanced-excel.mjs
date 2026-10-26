import { capstone, course } from "../kit.mjs";
import { labs, SK_D, SK_F } from "../parts/ax-labs.mjs";
import { M1, M2, M3 } from "../parts/ax-m1-3.mjs";
import { M4, M5, M6 } from "../parts/ax-m4-6.mjs";

export default course({
  slug: "advanced-excel", title: "Advanced Excel", tagline: "Lookups, conditional analysis, data cleaning, finance and dashboards, with a checked lab in every module", level: "Intermediate", hours: 14,
  summary: "Go from competent to confident. Write formulas that survive copying, look things up in tables, answer business questions with SUMIFS and rankings, clean messy data, use dates and text, build pivot-style summaries and charts, price loans and investments, and finish with a working regional dashboard. Every module has working spreadsheet labs that check your formulas and explain what is missing.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: regional performance dashboard", summary: "Build a complete dashboard and pass the final assessment.",
    intro: "You now have the toolkit of an analyst: mixed references, logic, lookups, conditional totals, ranking, cleaning, summaries, charts and finance. In this final step you build a dashboard in the spreadsheet lab: actual revenue per region from raw data with SUMIFS, percent of target, a status, a rank, the best region by name, the company total and a chart. Then take the final assessment, which covers the whole course.",
    steps: ["Work through the **Regional performance dashboard** lab: SUMIFS on the raw data, percent of target, nested IF status, RANK, INDEX with MATCH, a total and a bar chart.", "Test the dashboard: change one revenue figure and check that every result follows.", "Look for errors and check the company total against the raw data by adding the twelve revenue figures.", "Take the final assessment below."], projectTitle: "Build a regional performance dashboard",
    quiz: [
      ["Which reference locks the row but lets the column move?", ["$A1", "A$1", "$A$1", "A1"], 1, "The dollar sign sits before the row number."],
      ["Why does the order of tests matter in IFS?", ["It does not", "The first true test wins", "The last test wins", "Excel sorts them"], 1, "IFS returns the answer beside the first true test."],
      ["Which wrapper handles only a missing lookup?", ["IFERROR", "IFNA", "ISBLANK", "ROUND"], 1, "IFNA catches only #N/A."],
      ["An exact lookup should end with:", ["TRUE", "FALSE (or a match type of 0)", "A comma", "A dollar sign"], 1, "FALSE and 0 both ask for an exact match."],
      ["An approximate match requires the table to be:", ["Sorted ascending", "Sorted descending", "Locked", "Text"], 0, "The method assumes ascending order."],
      ["INDEX and MATCH together can:", ["Only look right", "Look in any direction, including a two-way table", "Only sort", "Replace SUM"], 1, "INDEX with two MATCHes finds a value at a row and column crossing."],
      ["SUMIFS puts which range first?", ["The first condition", "The range to add", "The sheet name", "The total"], 1, "SUMIFS starts with the sum range."],
      ["What does =RANK(D2,$D$2:$D$5) give for the highest value?", ["0", "1", "4", "#N/A"], 1, "The highest value is ranked 1."],
      ["=PROPER(TRIM(\"  asha   RAO \")) gives:", ["asha rao", "Asha Rao", "ASHA RAO", "Asha   Rao"], 1, "TRIM removes extra spaces and PROPER capitalises each word."],
      ["A date in Excel is really:", ["Text", "A serial number shown with a date format", "A picture", "Three cells"], 1, "Dates are day counts."],
      ["Which function counts working days between two dates?", ["EOMONTH", "NETWORKDAYS", "EDATE", "DATEDIF"], 1, "NETWORKDAYS counts Monday to Friday."],
      ["A PivotTable cell is, in effect:", ["A random number", "A SUMIFS-style group total", "A chart", "A macro"], 1, "Each cell adds the values for one row group and one column group."],
      ["Why check correlation before a straight-line forecast?", ["To format the sheet", "To see whether the points really follow a line", "To sort the data", "Excel requires it"], 1, "A weak correlation makes a straight-line forecast unreliable."],
      ["A 12% yearly loan is repaid monthly. Which rate goes into PMT?", ["12%", "1%", "144%", "0.1%"], 1, "Divide the yearly rate by 12 to match monthly periods."],
      ["Why is the year 0 cost added outside the NPV function?", ["It is optional", "NPV discounts every value inside it by at least one period", "Excel ignores negatives", "It saves time"], 1, "Today's cost must not be discounted."],
      ["What is the best way to stop people overwriting formulas?", ["Colour them", "Protect the sheet and unlock only the input cells", "Hide the formulas in a comment", "Rename the sheet"], 1, "Protection locks every cell except the ones you unlock."],
    ],
  }),
  labs,
  skills: [{ id: SK_F, label: "Advanced formulas" }, { id: SK_D, label: "Data analysis" }],
  badges: [
    { id: "mixed-master", title: "Mixed references", description: "Filled a grid with one mixed-reference formula.", when: { all: ["ax2-grid"] } },
    { id: "decision-engine", title: "Decision engine", description: "Built banded decisions with IFS and handled errors.", when: { all: ["ax1-commission"] } },
    { id: "lookup-pro", title: "Lookup pro", description: "Used VLOOKUP, an approximate match and INDEX with MATCH.", when: { all: ["ax4-price-lookup", "ax5-slabs", "ax6-two-way"] } },
    { id: "data-cleaner", title: "Data cleaner", description: "Cleaned text and worked with dates.", when: { all: ["ax10-clean", "ax12-dates"] } },
    { id: "pivot-builder", title: "Summary builder", description: "Built a pivot-style summary with SUMIFS and a chart.", when: { all: ["ax7-regional", "ax13-summary"] } },
    { id: "dashboard-builder", title: "Dashboard builder", description: "Finished the regional performance dashboard.", when: { all: ["cap-dashboard"] } },
  ],
  landing: {
    hero: { eyebrow: "Advanced spreadsheet skills · No software to install", title: "Advanced Excel: from competent to confident", subtitle: "Lookups, SUMIFS, INDEX and MATCH, data cleaning, dates, pivot-style summaries, forecasts and finance, in a working spreadsheet inside your browser. Every formula you write is checked and explained.", level: "Intermediate", outcomeLine: "After this course you can build, check and share a dashboard that answers real business questions." },
    outcomes: [
      { icon: "sheet", title: "Build formulas that scale", text: "Mixed references, IFS, SWITCH and error handling that survive copying." },
      { icon: "computer", title: "Look things up", text: "VLOOKUP, approximate matches, INDEX with MATCH and XLOOKUP, and when to use which." },
      { icon: "sort", title: "Answer with conditions", text: "SUMIFS, COUNTIFS, AVERAGEIFS, rankings, SUMPRODUCT and shares of a total." },
      { icon: "web", title: "Clean and shape data", text: "TRIM, PROPER, LEFT, MID, FIND, VALUE and TEXT, and dates that calculate." },
      { icon: "ai", title: "Analyse and forecast", text: "Pivot-style summaries, charts that answer a question, SLOPE, INTERCEPT and CORREL." },
      { icon: "slides", title: "Model finance", text: "PMT, NPV, IRR and break-even, then finish a workbook others can trust." },
    ],
    projects: [
      { title: "Tiered commission", text: "One IFS formula and a checked total.", module: "smarter-formulas" },
      { title: "Priced order", text: "VLOOKUP, discount slabs and INDEX with MATCH.", module: "lookup-and-match" },
      { title: "Regional questions", text: "Five answers with the IFS family, and a top three.", module: "conditional-analysis" },
      { title: "Project schedule", text: "Clean names, split codes and calculate due dates.", module: "text-dates-cleaning" },
      { title: "Summary and forecast", text: "A pivot-style grid, a chart and a straight-line forecast.", module: "analysis-tools" },
      { title: "Regional performance dashboard", text: "SUMIFS, status, rank, best region and a chart.", module: "capstone" },
    ],
    tools: [{ icon: "sheet", title: "Spreadsheet lab", text: "A real grid with formulas, number formats, charts, sorting and filters." }, { icon: "sort", title: "Instant feedback", text: "Every lab tells you which check passed and why a formula is not right yet." }, { icon: "computer", title: "Explorer sliders", text: "Change a number and watch rates, payments and break-even update." }],
    assessment: ["Finish the required labs in each module: they are checked automatically and explained when something is missing.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Complete the final dashboard project and the final assessment to finish the course."],
    faq: [
      { q: "What should I know before starting?", a: "The basics: entering data, writing simple formulas, SUM, AVERAGE, IF and absolute references. If you are new to Excel, take Basic Microsoft Excel first." },
      { q: "Do I need Microsoft Excel installed?", a: "No. The labs run in your browser with a spreadsheet that behaves like Excel for everything taught here. The skills carry straight over to Excel, Google Sheets and LibreOffice. A few desktop features such as PivotTables, conditional formatting and Goal Seek are explained and you build the same results with formulas." },
      { q: "How long does it take?", a: "About fourteen hours, in short sessions. Each module takes around two to two and a half hours." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile." },
    ],
  },
  catalogue: {
    hours: "~14 hrs", weeks: "~4 weeks", pace: "3 to 4 hrs/wk", badge: "Excel Advanced",
    brief: "Lookups, SUMIFS, INDEX and MATCH, data cleaning, dates, pivot-style summaries, forecasts and finance, with a checked spreadsheet lab in every module.",
    learn: ["Mixed references, IFS, SWITCH and error handling", "VLOOKUP, approximate matches, INDEX with MATCH and XLOOKUP", "SUMIFS, COUNTIFS, AVERAGEIFS, rankings and SUMPRODUCT", "Cleaning text, splitting codes and calculating with dates", "Pivot-style summaries, charts that answer questions, trends and forecasts", "Loans, NPV, IRR, break-even and a workbook you can share with confidence"],
    handsOn: "Build a regional performance dashboard with SUMIFS, percent of target, a status, a rank, the best region and a chart.",
    outcome: "Analyse and report on real business data with the formulas professionals use every day.",
  },
});
