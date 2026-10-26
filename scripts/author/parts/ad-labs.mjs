import { ck, classifyLab, S, sheetLab, W, wordLab } from "../kit.mjs";

export const SK_PREP = "data-preparation";
export const SK_STATS = "descriptive-statistics";
export const SK_SUM = "summarising-data";
export const SK_MODEL = "modelling-and-forecasting";
export const SK_COMM = "dashboards-and-communication";

/** Every lab runs in GrowQR's in-browser sheet. Each model answer is replayed by the course tests, so a lab can always be finished. */
const fill = (col, from, to, f) => Object.fromEntries(Array.from({ length: to - from + 1 }, (_, i) => [`${col}${from + i}`, f(from + i)]));

const SALES12 = [18, 22, 20, 19, 23, 21, 20, 24, 22, 19, 21, 96];
const ORDERS20 = [45, 80, 120, 95, 210, 60, 150, 330, 75, 180, 40, 260, 110, 90, 410, 130, 70, 220, 55, 140];

export const labs = [
  /* ------------------------------------------------------------------ module 1 */
  sheetLab({
    id: "ad1-clean", module: "clean-and-prepare", title: "Clean the customer list", level: "beginner", minutes: 12, xp: 50, skills: [SK_PREP], required: true,
    objective: "Turn messy names and text amounts into clean names and real numbers using formulas.",
    scenario: "An export gives customer names with stray spaces and wrong capitals, and amounts typed as text such as 'Rs 1200'. Clean both in helper columns and total the amounts.",
    steps: ["In B2 clean the name with PROPER(TRIM(A2)), then copy the same formula down to B6.", "In D2 remove the 'Rs ' prefix with SUBSTITUTE and convert the result with VALUE, then fill down to D6.", "In D7 add the five amounts with SUM."],
    cells: { A1: "Raw name", B1: "Clean name", C1: "Raw sales", D1: "Sales (number)", A2: "  asha RAO ", C2: "Rs 1200", A3: "BILAL   khan", C3: "Rs 850", A4: "chitra IYER", C4: "Rs 2300", A5: " dev malhotra", C5: "Rs 400", A6: "ESHA gupta ", C6: "Rs 1750", A7: "Total" }, view: { cols: 5, rows: 9 },
    checks: [
      ck("b2", "B2 shows Asha Rao", "=PROPER(TRIM(A2))", "TRIM removes the extra spaces first, then PROPER capitalises each word.", S.formula("B2", { fns: ["PROPER", "TRIM"], equals: "Asha Rao" })),
      ck("b3", "B3 shows Bilal Khan (extra spaces inside the name removed)", "Copy the formula from B2 to B3.", "TRIM also removes repeated spaces between words.", S.formula("B3", { fns: ["PROPER", "TRIM"], equals: "Bilal Khan" })),
      ck("b6", "B6 shows Esha Gupta", "Fill the formula down to row 6.", "Every row needs its own formula pointing at its own raw name.", S.formula("B6", { fns: ["PROPER", "TRIM"], equals: "Esha Gupta" })),
      ck("d2", "D2 is the number 1200", "=VALUE(SUBSTITUTE(C2,\"Rs \",\"\"))", "SUBSTITUTE removes the text prefix; VALUE turns what is left into a real number.", S.formula("D2", { fns: ["VALUE", "SUBSTITUTE"], equals: 1200 })),
      ck("d5", "D5 is the number 400", "Fill the formula down to row 5.", "The same pattern works for every row.", S.formula("D5", { fns: ["VALUE", "SUBSTITUTE"], equals: 400 })),
      ck("d7", "D7 totals the amounts to 6,500", "=SUM(D2:D6)", "SUM only adds real numbers, so a total of 6,500 proves the text became numbers.", S.formula("D7", { fns: ["SUM"], cover: "D2:D6", equals: 6500 })),
      ck("ok", "No error messages", "If you see #VALUE!, check the exact text you remove in SUBSTITUTE (it includes a space).", "Errors usually come from a reference or text that does not match.", S.noerrors()),
    ],
    solution: { cells: { ...fill("B", 2, 6, (r) => `=PROPER(TRIM(A${r}))`), ...fill("D", 2, 6, (r) => `=VALUE(SUBSTITUTE(C${r},"Rs ",""))`), D7: "=SUM(D2:D6)" } },
  }),
  sheetLab({
    id: "ad2-dates", module: "clean-and-prepare", title: "Dates and weekdays", level: "beginner", minutes: 10, xp: 40, skills: [SK_PREP], required: true,
    objective: "Take dates apart and measure the time between them.",
    scenario: "Orders carry a date. The warehouse wants the month and weekday of each order, and the number of days left until 1 April 2025.",
    steps: ["In B2 show the month as text with TEXT(A2,\"mmm\"), then fill down.", "In C2 show the weekday with TEXT(A2,\"dddd\"), then fill down.", "In D2 subtract the order date from DATE(2025,4,1) to get the days left, then fill down."],
    cells: { A1: "Order date", B1: "Month", C1: "Weekday", D1: "Days to 1 Apr", A2: "2025-01-15", A3: "2025-02-03", A4: "2025-02-28", A5: "2025-03-09", A6: "2025-03-31" }, view: { cols: 5, rows: 8 },
    checks: [
      ck("b2", "B2 shows Jan", "=TEXT(A2,\"mmm\")", "The format code mmm shows a three-letter month name.", S.formula("B2", { fns: ["TEXT"], equals: "Jan" })),
      ck("c3", "C3 shows Monday (3 February 2025)", "=TEXT(A3,\"dddd\")", "dddd shows the full weekday name.", S.formula("C3", { fns: ["TEXT"], equals: "Monday" })),
      ck("c4", "C4 shows Friday", "Fill the weekday formula down.", "28 February 2025 was a Friday.", S.formula("C4", { fns: ["TEXT"], equals: "Friday" })),
      ck("d2", "D2 is 76 days", "=DATE(2025,4,1)-A2", "Dates are numbers underneath, so subtracting gives the days between.", S.formula("D2", { fns: ["DATE"], equals: 76 })),
      ck("d6", "D6 is 1 day", "Fill the formula down to row 6.", "31 March is one day before 1 April.", S.formula("D6", { fns: ["DATE"], equals: 1 })),
      ck("ok", "No error messages", "Check that each date is typed as year-month-day.", "ISO dates (2025-03-09) are understood by every function.", S.noerrors()),
    ],
    solution: { cells: { ...fill("B", 2, 6, (r) => `=TEXT(A${r},"mmm")`), ...fill("C", 2, 6, (r) => `=TEXT(A${r},"dddd")`), ...fill("D", 2, 6, (r) => `=DATE(2025,4,1)-A${r}`) } },
  }),
  classifyLab({
    id: "ad3-tidy", module: "clean-and-prepare", title: "Tidy or needs fixing?", level: "beginner", minutes: 6, xp: 25, skills: [SK_PREP], required: true,
    objective: "Recognise what makes a table ready for analysis.",
    scenario: "Before you analyse a table, check its shape. Decide whether each description is tidy or needs fixing.",
    steps: ["Read each description.", "Choose Tidy or Needs fixing.", "Press Check my work."],
    categories: [["tidy", "Tidy as it is"], ["fix", "Needs fixing"]],
    items: [
      ["One row per order, with columns for date, product, units and amount", "tidy", "Each column is one variable and each row is one observation."],
      ["Separate columns named Jan, Feb and Mar holding the sales for each month", "fix", "Month is hidden in the headings. Unpivot it into a Month column and a Sales column."],
      ["Amounts typed as text, such as 'Rs 1,200 /-'", "fix", "Text is ignored by SUM; convert it to numbers."],
      ["A blank row between each region's data", "fix", "Blank rows break filters, pivots and tables."],
      ["Every date written like 2025-03-09", "tidy", "ISO dates are consistent and sort correctly."],
      ["Merged cells for the region headings", "fix", "Merged cells break sorting and pivots; repeat the region in every row."],
      ["Each product always spelled the same way", "tidy", "Consistent labels let you group and count correctly."],
      ["A Total row typed at the bottom of the data", "fix", "A total is not an observation; it would be counted as a row in a pivot or average."],
    ],
  }),

  /* ------------------------------------------------------------------ module 2 */
  sheetLab({
    id: "ad4-profile", module: "describe-the-data", title: "Profile the daily sales", level: "intermediate", minutes: 18, xp: 70, skills: [SK_STATS], required: true,
    objective: "Describe a column: centre, spread, quartiles and outliers.",
    scenario: "Twelve days of unit sales are in A2:A13, and one day looks unusually high. Build the profile: the mean, median, mode, sample standard deviation, quartiles, interquartile range, the upper fence of the IQR rule, and how many days exceed that fence.",
    steps: ["Fill E2 to E7 with AVERAGE, MEDIAN, MODE, STDEV.S, and the first and third QUARTILE of A2:A13.", "In E8 subtract Q1 from Q3 to get the IQR, and in E9 add 1.5 times the IQR to Q3 for the upper fence.", "In E10 count the days above the fence with COUNTIF(A2:A13,\">\"&E9)."],
    cells: { A1: "Daily sales (units)", ...Object.fromEntries(SALES12.map((v, i) => [`A${i + 2}`, String(v)])), D1: "Measure", E1: "Value", D2: "Mean", D3: "Median", D4: "Mode", D5: "Std deviation (sample)", D6: "Q1", D7: "Q3", D8: "IQR", D9: "Upper fence", D10: "Days above the fence" }, view: { cols: 5, rows: 13 },
    checks: [
      ck("mean", "The mean is about 27.08", "=AVERAGE(A2:A13)", "The mean adds all values and divides by how many there are; the one high day lifts it.", S.formula("E2", { fns: ["AVERAGE"], equals: 27.0833333, })),
      ck("median", "The median is 21", "=MEDIAN(A2:A13)", "The middle two sorted values are both 21, so the median is not affected by the high day.", S.formula("E3", { fns: ["MEDIAN"], equals: 21 })),
      ck("mode", "The mode is 22 (four values tie at two days; MODE returns the first one in the list)", "=MODE(A2:A13)", "MODE returns the value that appears most often. When several tie, it returns the one that appears first in the data.", S.formula("E4", { fns: ["MODE"], equals: 22 })),
      ck("sd", "The sample standard deviation is about 21.77", "=STDEV.S(A2:A13)", "STDEV.S measures the typical distance from the mean; the high day makes it large.", S.formula("E5", { fns: ["STDEV.S"], equals: 21.77345479 })),
      ck("q1", "Q1 is 19.75", "=QUARTILE(A2:A13,1)", "A quarter of the days are below this value.", S.formula("E6", { fns: ["QUARTILE"], equals: 19.75 })),
      ck("q3", "Q3 is 22.25", "=QUARTILE(A2:A13,3)", "Three quarters of the days are below this value.", S.formula("E7", { fns: ["QUARTILE"], equals: 22.25 })),
      ck("iqr", "The IQR is 2.5", "=E7-E6", "The IQR is Q3 minus Q1, the spread of the middle half.", S.formula("E8", { cover: "E6:E7", equals: 2.5 })),
      ck("fence", "The upper fence is 26", "=E7+1.5*E8", "Values above Q3 plus 1.5 times the IQR are flagged as outliers.", S.formula("E9", { cover: "E7:E8", equals: 26 })),
      ck("count", "One day is above the fence", "=COUNTIF(A2:A13,\">\"&E9)", "Only the 96 exceeds 26.", S.formula("E10", { fns: ["COUNTIF"], equals: 1 })),
    ],
    solution: { cells: { E2: "=AVERAGE(A2:A13)", E3: "=MEDIAN(A2:A13)", E4: "=MODE(A2:A13)", E5: "=STDEV.S(A2:A13)", E6: "=QUARTILE(A2:A13,1)", E7: "=QUARTILE(A2:A13,3)", E8: "=E7-E6", E9: "=E7+1.5*E8", E10: "=COUNTIF(A2:A13,\">\"&E9)" } },
  }),
  sheetLab({
    id: "ad5-histogram", module: "describe-the-data", title: "Build a histogram", level: "intermediate", minutes: 15, xp: 60, skills: [SK_STATS], required: true,
    objective: "Count values into bins with COUNTIFS and chart the result.",
    scenario: "Twenty order values (in rupees) are in A2:A21. Count how many fall into each of four bins and chart the counts. The counts should add up to 20.",
    steps: ["In G2 count the values that are at least the lower bound (E2) and below the upper bound (F2) with COUNTIFS.", "Copy the formula down to G5. Use $A$2:$A$21 so the data range does not slide.", "In G6 add the four counts and check that you get 20.", "Insert a bar chart of the counts (labels D2:D5, values G2:G5)."],
    cells: { A1: "Order value", ...Object.fromEntries(ORDERS20.map((v, i) => [`A${i + 2}`, String(v)])), D1: "Bin", E1: "From", F1: "Below", G1: "Orders", D2: "0 to 99", E2: "0", F2: "100", D3: "100 to 199", E3: "100", F3: "200", D4: "200 to 299", E4: "200", F4: "300", D5: "300 and above", E5: "300", F5: "100000", D6: "Total" }, view: { cols: 7, rows: 22 },
    checks: [
      ck("g2", "The first bin counts 9 orders", "=COUNTIFS($A$2:$A$21,\">=\"&E2,$A$2:$A$21,\"<\"&F2)", "Two conditions give a lower and an upper bound: at least 0 and below 100.", S.formula("G2", { fns: ["COUNTIFS"], equals: 9 })),
      ck("g3", "The second bin counts 6 orders", "Copy the formula down; E3 and F3 are the bounds.", "Each bin has its own lower and upper bound.", S.formula("G3", { fns: ["COUNTIFS"], equals: 6 })),
      ck("g4", "The third bin counts 3 orders", "Copy the formula down to row 4.", "Values from 200 up to but not including 300.", S.formula("G4", { fns: ["COUNTIFS"], equals: 3 })),
      ck("g5", "The last bin counts 2 orders", "Copy the formula down to row 5.", "The last bin has a very high upper bound so it catches everything above 300.", S.formula("G5", { fns: ["COUNTIFS"], equals: 2 })),
      ck("tot", "The counts add up to 20", "=SUM(G2:G5)", "If the total is not 20, a bin boundary overlaps or leaves a gap.", S.formula("G6", { fns: ["SUM"], cover: "G2:G5", equals: 20 })),
      ck("chart", "A bar chart of the counts exists", "Use the chart button, choose a bar chart, labels D2:D5 and values G2:G5.", "A histogram is a column chart of counts per bin.", S.chart({ type: "bar", labels: "D2:D5", values: "G2:G5" })),
    ],
    solution: { cells: { ...fill("G", 2, 5, (r) => `=COUNTIFS($A$2:$A$21,">="&E${r},$A$2:$A$21,"<"&F${r})`), G6: "=SUM(G2:G5)" }, charts: [{ type: "bar", labels: "D2:D5", values: "G2:G5", title: "Orders by value" }] },
  }),
  sheetLab({
    id: "ad6-zscore", module: "describe-the-data", title: "Compare two exam scores", level: "intermediate", minutes: 12, xp: 50, skills: [SK_STATS], required: false,
    objective: "Use z-scores to compare values on different scales.",
    scenario: "Anil scored 78 in a test with mean 70 and standard deviation 8. Beena scored 85 in a test with mean 80 and standard deviation 10. Who did better compared with their own class?",
    steps: ["In B5 compute Anil's z-score with STANDARDIZE(B2,B3,B4), and in C5 do the same for Beena.", "In B6 convert each z-score to a percentile with NORM.S.DIST(z, TRUE).", "In B7 write 'Anil' or 'Beena' for whoever has the higher percentile, using IF."],
    cells: { B1: "Anil", C1: "Beena", A2: "Score", B2: "78", C2: "85", A3: "Class mean", B3: "70", C3: "80", A4: "Std deviation", B4: "8", C4: "10", A5: "z-score", A6: "Percentile", A7: "Better relative to class" }, view: { cols: 4, rows: 9 },
    checks: [
      ck("za", "Anil's z-score is 1", "=STANDARDIZE(B2,B3,B4)", "z = (78 - 70) / 8 = 1: one standard deviation above his class mean.", S.formula("B5", { fns: ["STANDARDIZE"], equals: 1 })),
      ck("zb", "Beena's z-score is 0.5", "=STANDARDIZE(C2,C3,C4)", "z = (85 - 80) / 10 = 0.5.", S.formula("C5", { fns: ["STANDARDIZE"], equals: 0.5 })),
      ck("pa", "Anil's percentile is about 0.841", "=NORM.S.DIST(B5,TRUE)", "A z-score of 1 sits at about the 84th percentile of a bell curve.", S.formula("B6", { fns: ["NORM.S.DIST"], equals: 0.8413, })),
      ck("pb", "Beena's percentile is about 0.691", "=NORM.S.DIST(C5,TRUE)", "A z-score of 0.5 sits at about the 69th percentile.", S.formula("C6", { fns: ["NORM.S.DIST"], equals: 0.6915 })),
      ck("who", "B7 names Anil", "=IF(B6>C6,\"Anil\",\"Beena\")", "Compare the percentiles, not the raw scores.", S.formula("B7", { fns: ["IF"], equals: "Anil" })),
    ],
    solution: { cells: { B5: "=STANDARDIZE(B2,B3,B4)", C5: "=STANDARDIZE(C2,C3,C4)", B6: "=NORM.S.DIST(B5,TRUE)", C6: "=NORM.S.DIST(C5,TRUE)", B7: "=IF(B6>C6,\"Anil\",\"Beena\")" } },
  }),

  /* ------------------------------------------------------------------ module 3 */
  sheetLab({
    id: "ad7-crosstab", module: "summarise-like-a-pivot", title: "Region by product cross-tab", level: "intermediate", minutes: 18, xp: 70, skills: [SK_SUM], required: true,
    objective: "Build a cross-tab with one SUMIFS formula that uses mixed references.",
    scenario: "Ten sales rows are in A2:D11. Build a cross-tab of revenue by region (down the side) and product (across the top), with totals.",
    steps: ["In G2 write SUMIFS with $D$2:$D$11 as the values, region criteria $F2 and product criteria G$1.", "Copy it across to H2 and down to row 4 without changing it.", "Add the row totals in I2:I4, the column totals in G5:H5, and the grand total in I5."],
    cells: { A1: "Region", B1: "Product", C1: "Units", D1: "Revenue", A2: "North", B2: "Pen", C2: "10", D2: "100", A3: "South", B3: "Pen", C3: "20", D3: "200", A4: "North", B4: "Book", C4: "5", D4: "250", A5: "East", B5: "Pen", C5: "7", D5: "70", A6: "South", B6: "Book", C6: "2", D6: "100", A7: "East", B7: "Book", C7: "4", D7: "200", A8: "North", B8: "Pen", C8: "8", D8: "80", A9: "South", B9: "Pen", C9: "6", D9: "60", A10: "East", B10: "Pen", C10: "12", D10: "120", A11: "North", B11: "Book", C11: "3", D11: "150", F1: "Revenue", G1: "Pen", H1: "Book", I1: "Total", F2: "North", F3: "South", F4: "East", F5: "Total" }, view: { cols: 9, rows: 12 },
    checks: [
      ck("g2", "G2 is North Pen revenue: 180", "=SUMIFS($D$2:$D$11,$A$2:$A$11,$F2,$B$2:$B$11,G$1)", "SUMIFS adds revenue where the region matches the row label and the product matches the column heading.", S.formula("G2", { fns: ["SUMIFS"], equals: 180, pattern: "\\$F2.*G\\$1", patternMsg: "Use $F2 for the region and G$1 for the product, so the formula can be copied across the grid." })),
      ck("h2", "H2 is North Book revenue: 400", "Copy the G2 formula right.", "Copying right moves G$1 to H$1, which picks up Book.", S.formula("H2", { fns: ["SUMIFS"], equals: 400, pattern: "\\$F2.*H\\$1", patternMsg: "Copy the same formula from G2 so the references stay mixed." })),
      ck("g3", "G3 is South Pen revenue: 260", "Copy the formula down.", "Copying down moves $F2 to $F3, which picks up South.", S.formula("G3", { fns: ["SUMIFS"], equals: 260 })),
      ck("h4", "H4 is East Book revenue: 200", "Copy the formula to the bottom right cell.", "Each cell of the grid has its own region and product.", S.formula("H4", { fns: ["SUMIFS"], equals: 200 })),
      ck("i2", "I2 is the North row total: 580", "=SUM(G2:H2)", "A row total adds the products for one region.", S.formula("I2", { fns: ["SUM"], cover: "G2:H2", equals: 580 })),
      ck("g5", "G5 is the Pen column total: 630", "=SUM(G2:G4)", "A column total adds the regions for one product.", S.formula("G5", { fns: ["SUM"], cover: "G2:G4", equals: 630 })),
      ck("i5", "I5 is the grand total: 1,330, the same as the source column", "=SUM(I2:I4)", "The grand total must equal the sum of the source data: if it does not, a category is missing or misspelled.", S.formula("I5", { fns: ["SUM"], equals: 1330 })),
    ],
    solution: { cells: { ...Object.fromEntries(["G", "H"].flatMap((c) => [2, 3, 4].map((r) => [`${c}${r}`, `=SUMIFS($D$2:$D$11,$A$2:$A$11,$F${r},$B$2:$B$11,${c}$1)`]))), I2: "=SUM(G2:H2)", I3: "=SUM(G3:H3)", I4: "=SUM(G4:H4)", G5: "=SUM(G2:G4)", H5: "=SUM(H2:H4)", I5: "=SUM(I2:I4)" } },
  }),
  sheetLab({
    id: "ad8-pareto", module: "summarise-like-a-pivot", title: "Pareto of products", level: "intermediate", minutes: 15, xp: 60, skills: [SK_SUM], required: true,
    objective: "Calculate share, cumulative share and an A/B/C class.",
    scenario: "Products are already sorted by revenue, largest first. Find which few products make up most of the revenue.",
    steps: ["In B9 add the revenues. In C2 divide each product's revenue by the total ($B$9) and fill down.", "In D2 the cumulative share starts equal to the share; from D3 add the share to the cumulative above.", "In E2 classify: A while the cumulative share is up to 80%, B up to 95%, otherwise C."],
    cells: { A1: "Product", B1: "Revenue", C1: "Share", D1: "Cumulative", E1: "Class", A2: "Laptop", B2: "520", A3: "Phone", B3: "310", A4: "Tablet", B4: "190", A5: "Watch", B5: "120", A6: "Earbuds", B6: "90", A7: "Cable", B7: "40", A8: "Case", B8: "30", A9: "Total" }, view: { cols: 6, rows: 11 },
    checks: [
      ck("tot", "B9 is the total revenue: 1,300", "=SUM(B2:B8)", "The total is the denominator for every share.", S.formula("B9", { fns: ["SUM"], cover: "B2:B8", equals: 1300 })),
      ck("c2", "C2 is the Laptop share: 40%", "=B2/$B$9", "Lock the total with $B$9 so it does not slide when you copy the formula down.", S.formula("C2", { equals: 0.4, pattern: "\\$B\\$9", patternMsg: "Lock the total with $B$9 so every row divides by the same number." })),
      ck("c5", "C5 is the Watch share: about 9.2%", "Copy the formula down.", "120 divided by 1,300.", S.formula("C5", { equals: 0.0923, })),
      ck("d3", "D3 is the cumulative share of the top two: about 63.8%", "=D2+C3", "The cumulative share adds each share to the running total above it.", S.formula("D3", { equals: 0.6385 })),
      ck("d8", "D8 reaches 100%", "Fill the cumulative formula down to row 8.", "The last cumulative share is always 100%.", S.formula("D8", { equals: 1 })),
      ck("e4", "E4 classifies Tablet as A", "=IF(D4<=0.8,\"A\",IF(D4<=0.95,\"B\",\"C\"))", "Tablet's cumulative share is 78.5%, within the first 80%.", S.formula("E4", { fns: ["IF"], equals: "A" })),
      ck("e6", "E6 classifies Earbuds as B", "Fill the class formula down.", "94.6% is above 80% and up to 95%.", S.formula("E6", { fns: ["IF"], equals: "B" })),
      ck("e8", "E8 classifies Case as C", "Fill the class formula down to row 8.", "Anything beyond 95% cumulative is class C.", S.formula("E8", { fns: ["IF"], equals: "C" })),
    ],
    solution: { cells: { B9: "=SUM(B2:B8)", ...fill("C", 2, 8, (r) => `=B${r}/$B$9`), D2: "=C2", ...fill("D", 3, 8, (r) => `=D${r - 1}+C${r}`), ...fill("E", 2, 8, (r) => `=IF(D${r}<=0.8,"A",IF(D${r}<=0.95,"B","C"))`) } },
  }),
  sheetLab({
    id: "ad9-ratio", module: "summarise-like-a-pivot", title: "The conversion-rate trap", level: "intermediate", minutes: 10, xp: 50, skills: [SK_SUM], required: true,
    objective: "Calculate an overall rate as a ratio of totals, and see why averaging rates is wrong.",
    scenario: "Three channels bring visitors and orders. The channel rates are 5%, 10% and 20%. What is the real overall conversion rate?",
    steps: ["In D2 to D4 divide orders by visits for each channel.", "In D6 do the wrong thing on purpose: the average of the three rates.", "In D7 do it right: total orders divided by total visits."],
    cells: { A1: "Channel", B1: "Visits", C1: "Orders", D1: "Rate", A2: "Email", B2: "1000", C2: "50", A3: "Ads", B3: "200", C3: "20", A4: "Social", B4: "50", C4: "10", A6: "Average of the rates (wrong)", A7: "Overall rate (right)" }, view: { cols: 5, rows: 9 },
    checks: [
      ck("d2", "D2 is Email's rate: 5%", "=C2/B2", "Orders divided by visits.", S.formula("D2", { equals: 0.05 })),
      ck("d4", "D4 is Social's rate: 20%", "Fill the formula down.", "10 divided by 50.", S.formula("D4", { equals: 0.2 })),
      ck("wrong", "D6 averages the three rates (about 11.7%)", "=AVERAGE(D2:D4)", "This gives each channel equal weight, even though Email has most of the visitors.", S.formula("D6", { fns: ["AVERAGE"], equals: 0.1167 })),
      ck("right", "D7 is total orders over total visits: 6.4%", "=SUM(C2:C4)/SUM(B2:B4)", "Add the numerators and the denominators first, then divide once: 80 / 1,250.", S.formula("D7", { fns: ["SUM"], equals: 0.064 })),
    ],
    solution: { cells: { D2: "=C2/B2", D3: "=C3/B3", D4: "=C4/B4", D6: "=AVERAGE(D2:D4)", D7: "=SUM(C2:C4)/SUM(B2:B4)" } },
  }),

  /* ------------------------------------------------------------------ module 4 */
  sheetLab({
    id: "ad10-regression", module: "relationships-and-trends", title: "Ads and sales: fit a line", level: "intermediate", minutes: 18, xp: 70, skills: [SK_MODEL], required: true,
    objective: "Measure a relationship and use it to predict.",
    scenario: "Six months of advertising spend (₹ thousand) and sales (₹ lakh) are in A2:B7. Measure the relationship and predict the sales for a spend of 70.",
    steps: ["In E2 find the correlation with CORREL(B2:B7,A2:A7), and in E3 the R squared with RSQ.", "In E4 and E5 find the slope and the intercept of sales on spend.", "In E6 forecast the sales for a spend of 70 with FORECAST(70,B2:B7,A2:A7) and in E7 check it equals the intercept plus the slope times 70."],
    cells: { A1: "Ad spend", B1: "Sales", A2: "10", B2: "12", A3: "20", B3: "19", A4: "30", B4: "31", A5: "40", B5: "38", A6: "50", B6: "52", A7: "60", B7: "57", D2: "Correlation", D3: "R squared", D4: "Slope", D5: "Intercept", D6: "Forecast at 70", D7: "Line at 70 (check)" }, view: { cols: 5, rows: 9 },
    checks: [
      ck("r", "The correlation is about 0.994", "=CORREL(B2:B7,A2:A7)", "The points lie close to a rising straight line.", S.formula("E2", { fns: ["CORREL"], equals: 0.9944006 })),
      ck("rsq", "R squared is about 0.989", "=RSQ(B2:B7,A2:A7)", "R squared is the correlation squared: the share of the variation the line explains.", S.formula("E3", { fns: ["RSQ"], equals: 0.9888326 })),
      ck("slope", "The slope is about 0.946", "=SLOPE(B2:B7,A2:A7)", "Each extra ₹1 thousand of ads goes with about ₹0.95 lakh more sales.", S.formula("E4", { fns: ["SLOPE"], equals: 0.9457143 })),
      ck("int", "The intercept is about 1.73", "=INTERCEPT(B2:B7,A2:A7)", "The line's value when the spend is 0.", S.formula("E5", { fns: ["INTERCEPT"], equals: 1.7333333 })),
      ck("fc", "The forecast for a spend of 70 is about 67.93", "=FORECAST(70,B2:B7,A2:A7)", "Put the new x first, then known y values, then known x values.", S.formula("E6", { fns: ["FORECAST"], equals: 67.9333333 })),
      ck("chk", "E7 rebuilds the forecast from the slope and intercept", "=E5+E4*70", "FORECAST is just intercept plus slope times x.", S.formula("E7", { equals: 67.9333333 })),
    ],
    solution: { cells: { E2: "=CORREL(B2:B7,A2:A7)", E3: "=RSQ(B2:B7,A2:A7)", E4: "=SLOPE(B2:B7,A2:A7)", E5: "=INTERCEPT(B2:B7,A2:A7)", E6: "=FORECAST(70,B2:B7,A2:A7)", E7: "=E5+E4*70" } },
  }),
  sheetLab({
    id: "ad11-seasonal", module: "relationships-and-trends", title: "Smooth the series and find the seasons", level: "intermediate", minutes: 18, xp: 70, skills: [SK_MODEL], required: true,
    objective: "Build a moving average and a seasonal index.",
    scenario: "Twelve months of sales are in B2:B13. Smooth them with a 3-month moving average, and measure each month against the yearly average with a seasonal index.",
    steps: ["In C4 average the latest three months with AVERAGE(B2:B4) and fill down to C13.", "In B14 find the average month with AVERAGE(B2:B13).", "In D2 divide each month by the average ($B$14) and fill down: that is the seasonal index."],
    cells: { A1: "Month", B1: "Sales", C1: "3-month average", D1: "Seasonal index", A2: "Jan", B2: "120", A3: "Feb", B3: "130", A4: "Mar", B4: "150", A5: "Apr", B5: "160", A6: "May", B6: "180", A7: "Jun", B7: "210", A8: "Jul", B8: "200", A9: "Aug", B9: "190", A10: "Sep", B10: "170", A11: "Oct", B11: "150", A12: "Nov", B12: "140", A13: "Dec", B13: "100", A14: "Average month" }, view: { cols: 5, rows: 16 },
    checks: [
      ck("c4", "C4 averages Jan to Mar: 133.3", "=AVERAGE(B2:B4)", "The first moving average needs three months, so it starts in March.", S.formula("C4", { fns: ["AVERAGE"], cover: "B2:B4", equals: 133.3333 })),
      ck("c8", "C8 averages May to Jul: 196.7", "Fill the formula down: each row averages its own and the two months above.", "The window moves one month at a time.", S.formula("C8", { fns: ["AVERAGE"], equals: 196.6667 })),
      ck("c13", "C13 averages Oct to Dec: 130", "Fill the formula down to row 13.", "(150 + 140 + 100) / 3.", S.formula("C13", { fns: ["AVERAGE"], equals: 130 })),
      ck("avg", "B14 is the average month: 158.3", "=AVERAGE(B2:B13)", "The seasonal index divides each month by this average.", S.formula("B14", { fns: ["AVERAGE"], cover: "B2:B13", equals: 158.3333 })),
      ck("d7", "June's seasonal index is about 1.33", "=B7/$B$14", "210 / 158.3: June is about a third above an average month.", S.formula("D7", { equals: 1.3263, pattern: "\\$B\\$14", patternMsg: "Lock the average with $B$14 so every month divides by the same number." })),
      ck("d13", "December's seasonal index is about 0.63", "Fill the index formula down.", "100 / 158.3: December is well below an average month.", S.formula("D13", { equals: 0.6316 })),
    ],
    solution: { cells: { ...fill("C", 4, 13, (r) => `=AVERAGE(B${r - 2}:B${r})`), B14: "=AVERAGE(B2:B13)", ...fill("D", 2, 13, (r) => `=B${r}/$B$14`) } },
  }),
  classifyLab({
    id: "ad12-causation", module: "relationships-and-trends", title: "What does the data support?", level: "intermediate", minutes: 8, xp: 30, skills: [SK_MODEL], required: true,
    objective: "Tell a supported conclusion from an over-claim.",
    scenario: "Analysts are often asked to say more than the data allows. For each statement, decide what the data supports.",
    steps: ["Read each statement.", "Choose Supported, Over-claims causation, Extrapolates too far or Weak evidence.", "Press Check my work."],
    categories: [["ok", "Supported"], ["cause", "Over-claims causation"], ["extrap", "Extrapolates too far"], ["weak", "Weak evidence"]],
    items: [
      ["Weeks with higher ad spend had higher sales in our 52 weeks of data (r = 0.7).", "ok", "It describes an association in the data without claiming a cause."],
      ["Ads raised our sales by 70%, because the two are strongly correlated.", "cause", "Correlation alone does not prove ads caused the sales; other factors may drive both."],
      ["The line fitted to spends of 10 to 60 predicts sales of 400 at a spend of 500.", "extrap", "That is far outside the data; the relationship may flatten."],
      ["Version B won the A/B test with 3 out of 5 visitors converting, so it is 60% better.", "weak", "Five visitors is far too few to conclude anything."],
      ["December sales were 37% below an average month in the seasonal index, so we should plan lower stock.", "ok", "A seasonal index describes a repeating pattern and supports a planning conclusion."],
      ["Cities with more ice cream sales have more drownings, so ice cream causes drowning.", "cause", "Hot weather is a confounder driving both."],
      ["The trend line predicts next month's sales within 5.0 to 6.6, assuming no change in price.", "ok", "A range with a stated assumption is an honest forecast."],
      ["Our average rating is 4.8 from 3 reviews, so customers love us.", "weak", "Three reviews are not enough evidence."],
    ],
  }),

  /* ------------------------------------------------------------------ module 5 */
  sheetLab({
    id: "ad13-breakeven", module: "models-and-decisions", title: "Break-even and scenarios", level: "intermediate", minutes: 18, xp: 70, skills: [SK_MODEL], required: true,
    objective: "Build a small model with inputs, then compute break-even, profit under three scenarios and the margin of safety.",
    scenario: "A product sells for ₹500, costs ₹300 per unit to make, and has ₹200,000 of fixed costs. Sales could be 800 units (worst), 1,200 (base) or 1,600 (best). Use only the input cells in your formulas.",
    steps: ["In B5 compute the contribution per unit (price minus variable cost) and in B6 the break-even units.", "In C9:C11 compute the profit for each scenario from its units (B9:B11).", "In B13 compute the margin of safety for the base case: units above break-even divided by base units."],
    cells: { A1: "Price per unit", B1: "500", A2: "Variable cost per unit", B2: "300", A3: "Fixed costs", B3: "200000", A5: "Contribution per unit", A6: "Break-even units", A8: "Scenario", B8: "Units", C8: "Profit", A9: "Worst", B9: "800", A10: "Base", B10: "1200", A11: "Best", B11: "1600", A13: "Margin of safety (base)" }, view: { cols: 4, rows: 15 },
    checks: [
      ck("cm", "B5 (contribution) is 200", "=B1-B2", "Each unit contributes the price minus its variable cost toward fixed costs.", S.formula("B5", { cover: "B1:B2", equals: 200 })),
      ck("be", "B6 (break-even) is 1,000 units", "=B3/B5", "Fixed costs divided by the contribution per unit.", S.formula("B6", { equals: 1000 })),
      ck("worst", "C9 is the worst-case profit: -40,000", "=B9*B5-B3", "800 units earn 160,000, which does not cover 200,000 of fixed costs.", S.formula("C9", { equals: -40000 })),
      ck("base", "C10 is the base-case profit: 40,000", "Copy the formula down, using each scenario's units.", "1,200 times 200, minus 200,000.", S.formula("C10", { equals: 40000 })),
      ck("best", "C11 is the best-case profit: 120,000", "Copy the formula down to row 11.", "1,600 times 200, minus 200,000.", S.formula("C11", { equals: 120000 })),
      ck("mos", "B13 (margin of safety) is about 16.7%", "=(B10-B6)/B10", "The base volume is 200 above break-even, which is a sixth of 1,200.", S.formula("B13", { equals: 0.1667 })),
    ],
    solution: { cells: { B5: "=B1-B2", B6: "=B3/B5", C9: "=B9*$B$5-$B$3", C10: "=B10*$B$5-$B$3", C11: "=B11*$B$5-$B$3", B13: "=(B10-B6)/B10" } },
  }),
  sheetLab({
    id: "ad14-abtest", module: "models-and-decisions", title: "Test an A/B result", level: "challenge", minutes: 22, xp: 90, skills: [SK_MODEL], required: true,
    objective: "Decide whether a difference in conversion rates is statistically significant.",
    scenario: "Version A converted 120 of 2,400 visitors; version B converted 150 of 2,500. B looks better. Is the difference big enough to rule out chance?",
    steps: ["In B4 and C4 compute each version's rate. In B5 compute the pooled rate: all conversions divided by all visitors.", "In B6 compute the standard error: SQRT(pooled × (1 − pooled) × (1/visitorsA + 1/visitorsB)).", "In B7 compute z = (rate B − rate A) / standard error. In B8 compute the two-sided p-value: 2*(1-NORM.S.DIST(ABS(z),TRUE)).", "In B9 write 'Significant' if the p-value is below 0.05, otherwise 'Not significant'."],
    cells: { B1: "A", C1: "B", A2: "Visitors", B2: "2400", C2: "2500", A3: "Conversions", B3: "120", C3: "150", A4: "Conversion rate", A5: "Pooled rate", A6: "Standard error", A7: "z", A8: "p-value (two-sided)", A9: "Decision at 5%" }, view: { cols: 4, rows: 11 },
    checks: [
      ck("ra", "B4 is A's rate: 5%", "=B3/B2", "Conversions divided by visitors.", S.formula("B4", { equals: 0.05 })),
      ck("rb", "C4 is B's rate: 6%", "=C3/C2", "The same calculation for version B.", S.formula("C4", { equals: 0.06 })),
      ck("pool", "B5 is the pooled rate: about 5.5%", "=(B3+C3)/(B2+C2)", "If there were no real difference, the best estimate of the rate is all conversions over all visitors.", S.formula("B5", { equals: 0.0551 })),
      ck("se", "B6 is the standard error: about 0.00652", "=SQRT(B5*(1-B5)*(1/B2+1/C2))", "It measures how much a difference between two such samples would wobble by chance.", S.formula("B6", { fns: ["SQRT"], equals: 0.00652 })),
      ck("z", "B7 is z: about 1.53", "=(C4-B4)/B6", "The observed difference, in standard errors.", S.formula("B7", { equals: 1.5336 })),
      ck("p", "B8 is the p-value: about 0.125", "=2*(1-NORM.S.DIST(ABS(B7),TRUE))", "The chance of seeing a gap at least this large if the versions were really equal.", S.formula("B8", { fns: ["NORM.S.DIST", "ABS"], equals: 0.1251 })),
      ck("dec", "B9 says Not significant", "=IF(B8<0.05,\"Significant\",\"Not significant\")", "A p-value of 0.125 is above 0.05: the data does not show B is reliably better.", S.formula("B9", { fns: ["IF"], equals: "Not significant" })),
    ],
    solution: { cells: { B4: "=B3/B2", C4: "=C3/C2", B5: "=(B3+C3)/(B2+C2)", B6: "=SQRT(B5*(1-B5)*(1/B2+1/C2))", B7: "=(C4-B4)/B6", B8: "=2*(1-NORM.S.DIST(ABS(B7),TRUE))", B9: "=IF(B8<0.05,\"Significant\",\"Not significant\")" } },
  }),
  sheetLab({
    id: "ad15-weighted", module: "models-and-decisions", title: "Choose a supplier by weighted score", level: "intermediate", minutes: 12, xp: 50, skills: [SK_MODEL], required: false,
    objective: "Compare options with weights, and check the ranking is robust.",
    scenario: "Three suppliers are scored from 1 to 10 on cost, quality and speed. Cost weighs 40%, quality 35% and speed 25%. Which supplier wins?",
    steps: ["In E2 compute supplier A's weighted score with SUMPRODUCT(B2:D2,$B$6:$D$6) and fill down to E4.", "In B8 name the best supplier using INDEX and MATCH on the highest score."],
    cells: { A1: "Supplier", B1: "Cost", C1: "Quality", D1: "Speed", E1: "Score", A2: "A", B2: "7", C2: "8", D2: "6", A3: "B", B3: "9", C3: "6", D3: "7", A4: "C", B4: "6", C4: "9", D4: "9", A5: "Weight", A6: "Weights", B6: "0.4", C6: "0.35", D6: "0.25", A8: "Best supplier" }, view: { cols: 5, rows: 10 },
    checks: [
      ck("a", "E2 is A's score: 7.1", "=SUMPRODUCT(B2:D2,$B$6:$D$6)", "SUMPRODUCT multiplies each score by its weight and adds them.", S.formula("E2", { fns: ["SUMPRODUCT"], equals: 7.1, pattern: "\\$B\\$6", patternMsg: "Lock the weights with $B$6:$D$6 so they do not slide when you fill down." })),
      ck("b", "E3 is B's score: 7.45", "Fill the formula down.", "9 × 0.4 + 6 × 0.35 + 7 × 0.25.", S.formula("E3", { fns: ["SUMPRODUCT"], equals: 7.45 })),
      ck("c", "E4 is C's score: 7.8", "Fill the formula down to row 4.", "6 × 0.4 + 9 × 0.35 + 9 × 0.25.", S.formula("E4", { fns: ["SUMPRODUCT"], equals: 7.8 })),
      ck("best", "B8 names supplier C", "=INDEX(A2:A4,MATCH(MAX(E2:E4),E2:E4,0))", "MATCH finds the position of the highest score and INDEX returns the supplier name in that position.", S.formula("B8", { fns: ["INDEX", "MATCH"], equals: "C" })),
    ],
    solution: { cells: { E2: "=SUMPRODUCT(B2:D2,$B$6:$D$6)", E3: "=SUMPRODUCT(B3:D3,$B$6:$D$6)", E4: "=SUMPRODUCT(B4:D4,$B$6:$D$6)", B8: "=INDEX(A2:A4,MATCH(MAX(E2:E4),E2:E4,0))" } },
  }),

  /* ------------------------------------------------------------------ module 6 */
  sheetLab({
    id: "ad16-kpi", module: "dashboards-and-storytelling", title: "Build a KPI dashboard", level: "intermediate", minutes: 20, xp: 80, skills: [SK_COMM], required: true,
    objective: "Compute KPI cards with a target comparison and a status, and chart the trend.",
    scenario: "Monthly revenue for six months is in B2:B7 with a target of 100,000 a month. Build three KPI cards (total revenue, best month, average vs target) with a status, and a chart.",
    steps: ["In E2 total the revenue and in E3 find the best month's value with MAX. In E4 find the best month's name with INDEX and MATCH.", "In E5 compute the average month as a percentage of the target (D1) and in E6 give a status: 'On track' at 100% or more, 'Watch' from 90%, otherwise 'Behind'.", "Add a bar chart of revenue by month with the months as labels."],
    cells: { A1: "Month", B1: "Revenue", C1: "Target:", D1: "100000", A2: "Jan", B2: "92000", A3: "Feb", B3: "88000", A4: "Mar", B4: "105000", A5: "Apr", B5: "98000", A6: "May", B6: "112000", A7: "Jun", B7: "101000", D2: "Total revenue", D3: "Best month (value)", D4: "Best month (name)", D5: "Average vs target", D6: "Status" }, view: { cols: 5, rows: 9 },
    checks: [
      ck("tot", "E2 is the total revenue: 596,000", "=SUM(B2:B7)", "The total of six months.", S.formula("E2", { fns: ["SUM"], cover: "B2:B7", equals: 596000 })),
      ck("best", "E3 is the best month's revenue: 112,000", "=MAX(B2:B7)", "MAX returns the largest value.", S.formula("E3", { fns: ["MAX"], equals: 112000 })),
      ck("name", "E4 names May as the best month", "=INDEX(A2:A7,MATCH(E3,B2:B7,0))", "MATCH finds the row of the best value and INDEX returns the month name from the same row.", S.formula("E4", { fns: ["INDEX", "MATCH"], equals: "May" })),
      ck("pct", "E5 is the average month as a share of target: about 99.3%", "=AVERAGE(B2:B7)/D1", "The average month is 99,333, just under the target.", S.formula("E5", { fns: ["AVERAGE"], equals: 0.9933 })),
      ck("stat", "E6 says Watch", "=IF(E5>=1,\"On track\",IF(E5>=0.9,\"Watch\",\"Behind\"))", "99.3% is below 100% but at least 90%.", S.formula("E6", { fns: ["IF"], equals: "Watch" })),
      ck("chart", "A bar chart of revenue by month exists", "Use the chart button: bar chart, labels A2:A7, values B2:B7.", "A bar chart compares the months; it starts at zero.", S.chart({ type: "bar", labels: "A2:A7", values: "B2:B7" })),
      ck("ok", "No error messages", "Check that each reference points at the right cell.", "A dashboard with errors loses trust at once.", S.noerrors()),
    ],
    solution: { cells: { E2: "=SUM(B2:B7)", E3: "=MAX(B2:B7)", E4: "=INDEX(A2:A7,MATCH(E3,B2:B7,0))", E5: "=AVERAGE(B2:B7)/D1", E6: "=IF(E5>=1,\"On track\",IF(E5>=0.9,\"Watch\",\"Behind\"))" }, charts: [{ type: "bar", labels: "A2:A7", values: "B2:B7", title: "Revenue by month" }] },
  }),

  /* ------------------------------------------------------------------ capstone */
  sheetLab({
    id: "cap-ad-analysis", module: "capstone", title: "Analyse the sales workbook", level: "challenge", minutes: 30, xp: 120, skills: [SK_STATS, SK_SUM, SK_MODEL], required: true,
    objective: "Combine description, summary and a simple model in one analysis.",
    scenario: "Twelve orders from three regions are in A2:E13: units, price and a discount in percent. Revenue is units × price × (1 − discount). Describe them, summarise by region and test whether discounts go with higher units.",
    steps: ["In F2 compute each order's revenue as C2*D2*(1-E2/100) and fill down to F13.", "In I2:I4 total the revenue by region with SUMIF, and in I5 find the overall average order revenue.", "In I6 find the best region's name with INDEX and MATCH on the highest regional total.", "In I7 compute the correlation between the discount (E) and the units (C)."],
    cells: { A1: "Order", B1: "Region", C1: "Units", D1: "Price", E1: "Discount %", F1: "Revenue", H1: "Summary", A2: "1", B2: "North", C2: "10", D2: "500", E2: "0", A3: "2", B3: "South", C3: "14", D3: "500", E3: "5", A4: "3", B4: "East", C4: "8", D4: "500", E4: "0", A5: "4", B5: "North", C5: "16", D5: "450", E5: "10", A6: "5", B6: "South", C6: "12", D6: "450", E6: "5", A7: "6", B7: "East", C7: "9", D7: "450", E7: "0", A8: "7", B8: "North", C8: "20", D8: "400", E8: "15", A9: "8", B9: "South", C9: "11", D9: "400", E9: "0", A10: "9", B10: "East", C10: "15", D10: "400", E10: "10", A11: "10", B11: "North", C11: "18", D11: "500", E11: "10", A12: "11", B12: "South", C12: "16", D12: "450", E12: "10", A13: "12", B13: "East", C13: "13", D13: "500", E13: "5", H2: "North revenue", H3: "South revenue", H4: "East revenue", H5: "Average order revenue", H6: "Best region", H7: "Correlation: discount vs units", K1: "Regions", K2: "North", K3: "South", K4: "East" }, view: { cols: 9, rows: 15 },
    checks: [
      ck("f2", "F2 is the first order's revenue: 5,000", "=C2*D2*(1-E2/100)", "Units times price, reduced by the discount percentage.", S.formula("F2", { cover: "C2:E2", equals: 5000 })),
      ck("f8", "F8 is the seventh order's revenue: 6,800", "Fill the formula down to row 13.", "20 × 400 × 0.85.", S.formula("F8", { equals: 6800 })),
      ck("north", "I2 totals North's revenue", "=SUMIF($B$2:$B$13,\"North\",$F$2:$F$13)", "SUMIF adds the revenue where the region is North.", S.formula("I2", { fns: ["SUMIF"], equals: 5000 + 6480 + 6800 + 8100 })),
      ck("avg", "I5 is the average order revenue", "=AVERAGE(F2:F13)", "The mean of the revenue column.", S.formula("I5", { fns: ["AVERAGE"], cover: "F2:F13" })),
      ck("best", "I6 names the best region", "=INDEX(K2:K4,MATCH(MAX(I2:I4),I2:I4,0))", "Find the position of the highest total in I2:I4 with MATCH, and return the region name from K2:K4 with INDEX.", S.formula("I6", { fns: ["INDEX", "MATCH"] })),
      ck("corr", "I7 is the correlation of discount and units", "=CORREL(E2:E13,C2:C13)", "A positive value means bigger discounts went with more units in these twelve orders.", S.formula("I7", { fns: ["CORREL"] })),
      ck("ok", "No error messages", "Check each reference.", "Clean results are trustworthy results.", S.noerrors()),
    ],
    solution: { cells: { ...fill("F", 2, 13, (r) => `=C${r}*D${r}*(1-E${r}/100)`), I2: "=SUMIF($B$2:$B$13,\"North\",$F$2:$F$13)", I3: "=SUMIF($B$2:$B$13,\"South\",$F$2:$F$13)", I4: "=SUMIF($B$2:$B$13,\"East\",$F$2:$F$13)", I5: "=AVERAGE(F2:F13)", I6: "=INDEX(K2:K4,MATCH(MAX(I2:I4),I2:I4,0))", I7: "=CORREL(E2:E13,C2:C13)" } },
  }),
  wordLab({
    id: "cap-ad-memo", module: "capstone", title: "Write the findings memo", level: "challenge", minutes: 20, xp: 80, skills: [SK_COMM], required: true,
    objective: "Turn the analysis into a message a manager can act on.",
    scenario: "Write the memo for the sales manager: lead with the answer, give the evidence, state the limits and recommend an action.",
    steps: ["Add a heading as the memo title and a second heading, 'Evidence'.", "Write a summary paragraph that starts with the answer.", "List at least three pieces of evidence as bullets, each with its definition.", "Write a final paragraph that starts with the word Recommendation and a sentence about a limit of the data."],
    html: "<p><br></p>",
    checks: [
      ck("title", "The memo has a heading", "Use the heading style for the memo title.", "A heading tells the reader what the memo is about.", W.heading(1)),
      ck("two", "There are at least two headings (title and Evidence)", "Add an Evidence heading above the list.", "Headings help a busy reader find the evidence.", W.heading(2)),
      ck("para", "There are at least two paragraphs", "Write a summary and a recommendation paragraph.", "Prose connects numbers to a decision.", W.paragraphs(2, 12)),
      ck("list", "The evidence is a list of at least three points", "Use the bullet list button.", "A short list makes evidence easy to scan.", W.list(3, "ul")),
      ck("rec", "It contains a recommendation", "Start the last paragraph with Recommendation.", "A finding without an action is half the work.", W.contains("Recommendation")),
      ck("limit", "It states a limit of the data", "Include the word limit or limitation and say what the data cannot show.", "Honest analysis says what the numbers cannot tell you.", W.pattern("limit", "a sentence about a limit of the data")),
    ],
    solution: "<h1>Regional sales, last twelve orders</h1><p>The North region produced the most revenue, and orders with bigger discounts tended to carry more units, but the sample is small.</p><h2>Evidence</h2><ul><li>North revenue was the highest of the three regions.</li><li>The correlation between discount and units is positive in these twelve orders.</li><li>Revenue is units times price after the discount.</li></ul><p>One limit: twelve orders are too few to show that discounts cause higher units.</p><p>Recommendation: run a controlled discount test in North and South for one month before changing the pricing policy.</p>",
  }),
];
