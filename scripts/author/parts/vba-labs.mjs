import { ck, classifyLab, S, sheetLab, W, wordLab } from "../kit.mjs";

export const SK = "automation";

/**
 * VBA runs inside desktop Excel, not in a browser, so the labs here train the skills that come before and around writing code: deciding what to
 * automate, reading and predicting code, spotting errors, and working out by formula what a macro would produce. The lessons give code you can run
 * in your own copy of Excel. Every model answer is replayed by the course tests.
 */
export const labs = [
  /* ------------------------------------------------------------------ module 1: macros */
  classifyLab({
    id: "v1-good-candidates", module: "macros-first-steps", title: "Is it worth automating?", level: "beginner", minutes: 8, xp: 30, skills: [SK], required: true,
    objective: "Decide which tasks suit a macro and which do not.",
    scenario: "A macro is best for work that is repeated, rule-based and identical each time. It is a poor fit for work that needs judgement or happens once.",
    steps: ["Read each task.", "Choose Good for a macro or Not a good fit.", "Press Check my work."],
    categories: [["good", "Good for a macro"], ["poor", "Not a good fit"]],
    items: [
      ["Formatting the same weekly sales report the same way every Monday", "good", "Repeated, rule-based and identical each time."],
      ["Copying data from fifty identical files into one summary sheet", "good", "A repetitive job a loop can do in seconds."],
      ["Deciding which customers deserve a discount, case by case", "poor", "It needs human judgement, not a fixed rule."],
      ["A one-off clean-up of a file you will never use again", "poor", "Writing the macro would take longer than doing the job once."],
      ["Colouring overdue invoices red every day", "good", "A simple daily rule applied to many rows."],
      ["Writing a thoughtful reply to each customer complaint", "poor", "Personal judgement and tone cannot be automated by a rule."],
    ],
  }),
  classifyLab({
    id: "v2-macro-security", module: "macros-first-steps", title: "Macro security: safe or risky?", level: "beginner", minutes: 8, xp: 35, skills: [SK], required: true,
    objective: "Recognise safe and risky habits when working with macro-enabled files.",
    scenario: "A macro can do anything you can do in Excel, including deleting files, so a malicious macro is dangerous. Safe habits keep you protected.",
    steps: ["Read each habit.", "Choose Safe habit or Risky habit.", "Press Check my work."],
    categories: [["safe", "Safe habit"], ["risky", "Risky habit"]],
    items: [
      ["Leaving macros disabled in files from people you do not know", "safe", "Excel's default is to ask first; stay with it for unknown files."],
      ["Clicking Enable Content on a file that arrived in an unexpected email", "risky", "Unexpected macro files are a common way to spread malware."],
      ["Saving your own workbook as .xlsm so its macros are kept", "safe", "An .xlsx file cannot store macros; .xlsm can."],
      ["Reading a macro's code before running one you were given", "safe", "Looking first lets you see whether it does anything it should not."],
      ["Lowering macro security to Enable all macros so nothing ever asks", "risky", "It removes your only protection against harmful macros."],
      ["Keeping a backup copy before running a new macro", "safe", "A macro can change many cells at once and Undo may not reverse it."],
    ],
  }),

  /* ------------------------------------------------------------------ module 2: the language */
  classifyLab({
    id: "v3-data-types", module: "vba-building-blocks", title: "Choose the data type", level: "beginner", minutes: 10, xp: 40, skills: [SK], required: true,
    objective: "Match each value to the variable type that holds it correctly.",
    scenario: "Dim lets you say what kind of value a variable holds. Choosing the right type avoids errors and saves memory.",
    steps: ["Read each value.", "Choose its data type.", "Press Check my work."],
    categories: [["string", "String (text)"], ["long", "Long (whole number)"], ["double", "Double (decimal number)"], ["boolean", "Boolean (True or False)"], ["date", "Date"]],
    items: [
      ["\"Asha Rao\"", "string", "Text in quotation marks is a String."],
      ["250000", "long", "A whole number, possibly large, suits Long."],
      ["3.14159", "double", "A number with decimals suits Double."],
      ["True", "boolean", "True and False are Boolean values."],
      ["#14-Mar-2026#", "date", "A date written between hash signs is a Date."],
      ["\"2026\"", "string", "Anything in quotes is text, even if it looks like a number."],
      ["The number of rows in a sheet (up to 1,048,576)", "long", "Row counts can exceed what an Integer holds, so use Long."],
    ],
  }),
  classifyLab({
    id: "v4-predict-msgbox", module: "vba-building-blocks", title: "Predict the message box", level: "intermediate", minutes: 10, xp: 45, skills: [SK], required: true,
    objective: "Work out what a line of code will show before running it.",
    scenario: "Reading code and predicting its result is the core debugging skill. In VBA, & joins text and + adds numbers.",
    steps: ["Read each line.", "Choose what the message box shows.", "Press Check my work."],
    categories: [["five", "5"], ["twothree", "23"], ["error", "A run-time error"]],
    items: [
      ["MsgBox 2 + 3", "five", "Plus adds two numbers: 5."],
      ["MsgBox \"2\" & \"3\"", "twothree", "The ampersand joins text: 23."],
      ["MsgBox 2 & 3", "twothree", "The ampersand joins the two values as text: 23."],
      ["MsgBox 10 / 0", "error", "Dividing by zero causes run-time error 11."],
      ["MsgBox 10 - 5", "five", "Ten minus five is 5."],
    ],
  }),

  /* ------------------------------------------------------------------ module 3: Excel objects */
  classifyLab({
    id: "v5-objects", module: "excel-objects", title: "Which object is it?", level: "beginner", minutes: 10, xp: 40, skills: [SK], required: true,
    objective: "Tell the main Excel objects apart: the application, a workbook, a worksheet and a range.",
    scenario: "VBA talks to Excel through objects arranged in a hierarchy: the Application contains Workbooks, which contain Worksheets, which contain Ranges.",
    steps: ["Read each item.", "Choose the object it refers to.", "Press Check my work."],
    categories: [["app", "Application"], ["wb", "Workbook"], ["ws", "Worksheet"], ["rng", "Range"]],
    items: [
      ["ThisWorkbook", "wb", "ThisWorkbook is the file that contains the running code."],
      ["Worksheets(\"Sales\")", "ws", "A worksheet is referred to by its tab name."],
      ["Range(\"A1:B5\")", "rng", "A range is a cell or a block of cells."],
      ["Application.ScreenUpdating", "app", "ScreenUpdating is a setting of the Excel application itself."],
      ["Cells(2, 3)", "rng", "Cells(row, column) returns a single-cell range."],
      ["Workbooks(\"Budget.xlsx\")", "wb", "A workbook is referred to by its file name."],
      ["ActiveSheet", "ws", "ActiveSheet is the worksheet currently showing."],
    ],
  }),
  sheetLab({
    id: "v6-by-hand", module: "excel-objects", title: "Do by formula what the macro would do", level: "beginner", minutes: 12, xp: 50, skills: [SK], required: true,
    objective: "Work out what a macro would write, and produce the same result with formulas.",
    scenario: "A macro loops over rows 2 to 6, writes quantity times price in column D, then writes the total under the list in D7 and bolds the heading. Produce the same result by hand with formulas, so you can check any macro's work.",
    steps: ["In D2 multiply quantity by price; do the same for D3 to D6.", "In D7 add the five amounts.", "Make the heading row (A1:D1) bold by making A1 bold."],
    cells: { A1: "Item", B1: "Qty", C1: "Price", D1: "Amount", A2: "Pen", B2: "10", C2: "12", A3: "Book", B3: "4", C3: "45", A4: "Bag", B4: "2", C4: "800", A5: "Ruler", B5: "6", C5: "30", A6: "Eraser", B6: "20", C6: "5", A7: "Total" }, view: { cols: 5, rows: 9 },
    checks: [
      ck("d2", "D2 is 120", "=B2*C2", "The macro writes quantity times price on every row.", S.formula("D2", { equals: 120 })),
      ck("d4", "D4 is 1,600", "=B4*C4", "2 bags at 800 each.", S.formula("D4", { equals: 1600 })),
      ck("d6", "D6 is 100", "=B6*C6", "20 erasers at 5 each.", S.formula("D6", { equals: 100 })),
      ck("tot", "D7 is the total (2,180)", "=SUM(D2:D6)", "120 + 180 + 1,600 + 180 + 100 = 2,180.", S.formula("D7", { fns: ["SUM"], cover: "D2:D6", equals: 2180 })),
      ck("bold", "A1 is bold", "Select A1 and press B.", "The macro's last step bolds the header.", S.format("A1", "bold")),
    ],
    solution: { cells: { D2: "=B2*C2", D3: "=B3*C3", D4: "=B4*C4", D5: "=B5*C5", D6: "=B6*C6", D7: "=SUM(D2:D6)" }, formats: { A1: { bold: true } } },
  }),

  /* ------------------------------------------------------------------ module 4: decisions and loops */
  classifyLab({
    id: "v7-loop-results", module: "decisions-and-loops", title: "Predict the loop", level: "intermediate", minutes: 12, xp: 55, skills: [SK], required: true,
    objective: "Trace a loop by hand and work out the final value of x.",
    scenario: "Before you run a loop on real data, trace it on paper. Each item starts with x = 0 unless stated.",
    steps: ["Read each loop.", "Choose the final value of x.", "Press Check my work."],
    categories: [["five", "x = 5"], ["ten", "x = 10"], ["fifteen", "x = 15"], ["zero", "x = 0"]],
    items: [
      ["For i = 1 To 5: x = x + 1: Next i", "five", "The loop runs five times and adds 1 each time."],
      ["For i = 1 To 5: x = x + 2: Next i", "ten", "Five times 2 is 10."],
      ["For i = 1 To 5: x = x + i: Next i", "fifteen", "1 + 2 + 3 + 4 + 5 = 15."],
      ["For i = 5 To 1: x = x + 1: Next i", "zero", "The count goes up by 1 and 5 is already past 1, so the loop never runs."],
      ["For i = 1 To 10 Step 2: x = x + 1: Next i", "five", "i takes the values 1, 3, 5, 7, 9: five times."],
      ["x = 5 first, then: Do While x < 5: x = x + 1: Loop", "five", "The test x < 5 is false at once, so the loop body never runs and x stays 5."],
    ],
  }),
  classifyLab({
    id: "v8-which-loop", module: "decisions-and-loops", title: "Which loop fits?", level: "intermediate", minutes: 10, xp: 45, skills: [SK], required: false,
    objective: "Choose the loop that matches the job.",
    scenario: "VBA has three main loops: For...Next when you know how many times, For Each when you visit every item in a collection, and Do While when you repeat until something changes.",
    steps: ["Read each job.", "Choose the best loop.", "Press Check my work."],
    categories: [["for", "For...Next (a known count)"], ["foreach", "For Each (every item in a group)"], ["do", "Do While or Do Until (until a condition changes)"]],
    items: [
      ["Do something to rows 2 to 100", "for", "The start and end are known."],
      ["Visit every worksheet in the workbook", "foreach", "For Each steps through every item in the Worksheets collection."],
      ["Keep asking the user for a number until they type a valid one", "do", "You cannot know in advance how many attempts it takes."],
      ["Format each cell in the selected range", "foreach", "For Each cell In Selection visits every cell."],
      ["Print the numbers 1 to 10", "for", "A known count."],
      ["Read rows down until the first empty cell is reached", "do", "The end is found by a condition, not a count."],
    ],
  }),
  sheetLab({
    id: "v9-tally", module: "decisions-and-loops", title: "Tally like a loop would", level: "intermediate", minutes: 14, xp: 60, skills: [SK], required: false,
    objective: "Work out by formula what a loop with an If would count and add.",
    scenario: "A macro loops over six marks, and whenever a mark is 40 or more it adds 1 to a pass counter and adds the mark to a pass total. Produce the same three results with formulas so you can check the macro's answers.",
    steps: ["In B9 count the marks of 40 or more.", "In B10 add up only the marks of 40 or more.", "In B11 find the average of the passing marks."],
    cells: { A1: "Student", B1: "Marks", A2: "Asha", B2: "56", A3: "Bilal", B3: "38", A4: "Chitra", B4: "40", A5: "Dev", B5: "29", A6: "Esha", B6: "77", A7: "Farid", B7: "90", A9: "Passes", A10: "Total of passing marks", A11: "Average of passing marks" }, view: { cols: 3, rows: 13 },
    checks: [
      ck("n", "B9 counts 4 passes", "=COUNTIF(B2:B7,\">=40\")", "COUNTIF does what a loop with an If and a counter does.", S.formula("B9", { fns: ["COUNTIF"], equals: 4 })),
      ck("t", "B10 totals the passing marks (263)", "=SUMIF(B2:B7,\">=40\")", "56 + 40 + 77 + 90 = 263.", S.formula("B10", { fns: ["SUMIF"], equals: 263 })),
      ck("a", "B11 averages the passing marks (65.75)", "=AVERAGEIF(B2:B7,\">=40\")", "263 divided by 4 is 65.75.", S.formula("B11", { fns: ["AVERAGEIF"], equals: 65.75 })),
    ],
    solution: { cells: { B9: "=COUNTIF(B2:B7,\">=40\")", B10: "=SUMIF(B2:B7,\">=40\")", B11: "=AVERAGEIF(B2:B7,\">=40\")" } },
  }),

  /* ------------------------------------------------------------------ module 5: procedures, errors, debugging */
  classifyLab({
    id: "v10-error-kinds", module: "procedures-errors-debugging", title: "Syntax, run-time or logic error?", level: "intermediate", minutes: 12, xp: 55, skills: [SK], required: true,
    objective: "Name the kind of error from how it shows up.",
    scenario: "Three kinds of mistakes appear in code. A syntax error is a grammar mistake that VBA flags as you type or before it runs. A run-time error stops a macro that is running. A logic error runs without complaint but gives the wrong answer.",
    steps: ["Read each situation.", "Choose the kind of error.", "Press Check my work."],
    categories: [["syntax", "Syntax error"], ["runtime", "Run-time error"], ["logic", "Logic error"]],
    items: [
      ["You typed Fro i = 1 To 5 and the line turns red", "syntax", "A misspelled keyword is a grammar mistake found before the code runs."],
      ["A macro stops with 'Subscript out of range' because the sheet name does not exist", "runtime", "The code is valid but fails when it runs."],
      ["A macro runs fine but the total is always 10 too high because the loop starts at row 1 instead of 2", "logic", "No error message, but the answer is wrong."],
      ["A macro stops with 'Division by zero' on one row of data", "runtime", "It fails at run time on that value."],
      ["You forgot End If and VBA says 'Block If without End If'", "syntax", "The structure is incomplete, so VBA cannot compile it."],
      ["A pass mark test uses > 40 when it should be >= 40, so students on 40 fail", "logic", "The code runs but the rule is wrong."],
    ],
  }),
  classifyLab({
    id: "v11-sub-or-function", module: "procedures-errors-debugging", title: "Sub or Function?", level: "intermediate", minutes: 8, xp: 40, skills: [SK], required: false,
    objective: "Choose between a Sub (does something) and a Function (returns a value).",
    scenario: "A Sub performs actions such as formatting or copying. A Function calculates and returns a value, and can be used in a worksheet cell like =GSTAmount(B2,0.18).",
    steps: ["Read each job.", "Choose Sub or Function.", "Press Check my work."],
    categories: [["sub", "Sub (does something)"], ["func", "Function (returns a value)"]],
    items: [
      ["Format the heading row bold and yellow", "sub", "It performs an action and returns nothing."],
      ["Calculate the GST on a price so a cell can use it", "func", "It returns a number the cell can display."],
      ["Copy data from one sheet to another", "sub", "An action, not a value."],
      ["Return the grade letter for a mark, to be used in a worksheet formula", "func", "A worksheet formula needs a value back."],
      ["Delete all blank rows", "sub", "A task that changes the sheet."],
    ],
  }),

  /* ------------------------------------------------------------------ module 6 and capstone */
  wordLab({
    id: "v12-macro-plan", module: "automation-in-practice", title: "Plan a macro before you write it", level: "intermediate", minutes: 15, xp: 60, skills: [SK], required: true,
    objective: "Write a short plan with the goal, the steps and the risks, as professionals do before coding.",
    scenario: "A shop owner wants a macro that tidies the daily sales sheet: remove blank rows, format the header, add a total and highlight sales over 5,000. Write the plan.",
    steps: ["Write a title as a heading and a goal paragraph of at least 20 words.", "Under a heading called Steps, write a numbered list of at least five steps.", "Under a heading called Risks, write a bulleted list of at least three risks.", "Bold the one step that must happen first."],
    checks: [
      ck("title", "A title heading", "Apply a heading style to the title.", "The title names the macro.", W.heading(1)),
      ck("goal", "A goal paragraph of at least 20 words", "Say what the macro does and why.", "A clear goal prevents building the wrong thing.", W.paragraphs(1, 20)),
      ck("steps", "A numbered list of at least five steps", "Use the numbered-list button.", "A macro is a sequence of steps.", W.list(5, "ol")),
      ck("risks", "A bulleted list of at least three risks", "Use the bullet-list button.", "Thinking about what could go wrong is half of good automation.", W.list(3, "ul")),
      ck("heads", "At least three headings", "Use headings for the title, Steps and Risks.", "Headings make the plan scannable.", W.heading(3)),
      ck("bold", "The first step is bold", "Select it and press B.", "Back up first is the step that must not be skipped.", W.format("bold")),
    ],
    solution: "<h1>Daily sales tidy-up macro</h1><p>This macro will clean the daily sales sheet in one click, removing blank rows, formatting the header, adding a total and highlighting large sales, so that the owner no longer spends ten minutes each evening on it.</p><h2>Steps</h2><ol><li><b>Save a backup copy of the workbook</b></li><li>Find the last row of data</li><li>Delete the blank rows</li><li>Format the header row</li><li>Add the total under the last row</li><li>Highlight sales over 5,000</li></ol><h2>Risks</h2><ul><li>Deleting a row that looks blank but holds a note</li><li>The data may not always start in row 2</li><li>A macro cannot always be undone with Undo</li></ul>",
  }),
  wordLab({
    id: "cap-macro-design", module: "capstone", title: "Capstone: design a safe, maintainable macro", level: "challenge", minutes: 30, xp: 150, skills: [SK], required: true,
    objective: "Write the design document for a macro you would be happy to hand to a colleague.",
    scenario: "Choose a real repeated task (for example consolidating monthly files, cleaning an export or building a weekly report) and write its design document.",
    steps: ["A title heading and a purpose paragraph of at least 25 words.", "A heading called Inputs and outputs with a bulleted list of at least three items.", "A heading called Procedure with a numbered list of at least six steps, using the words loop and error at least once between them.", "A heading called Safety with a paragraph that mentions backup and testing.", "Bold the name of the macro."],
    checks: [
      ck("title", "A title heading", "Apply a heading style to the title.", "The title names the macro.", W.heading(1)),
      ck("purpose", "A purpose paragraph of at least 25 words", "Say what the macro does and for whom.", "A purpose statement keeps the macro focused.", W.paragraphs(1, 25)),
      ck("heads", "At least four headings", "Use Inputs and outputs, Procedure and Safety headings.", "Headings let a colleague find what they need.", W.heading(4)),
      ck("io", "A bulleted list of inputs and outputs", "List what goes in and what comes out.", "Knowing the inputs and outputs makes a macro testable.", W.list(3, "ul")),
      ck("proc", "A numbered procedure of at least six steps", "Use the numbered-list button.", "A procedure is the design of the code.", W.list(6, "ol")),
      ck("loop", "The procedure mentions a loop and error handling", "Say where you will loop and how you will handle errors.", "Loops and error handling are the two parts that most need planning.", W.pattern("loop[\\s\\S]*error|error[\\s\\S]*loop", "both a loop and error handling")),
      ck("safe", "A safety paragraph that mentions backup and testing", "Say how you will back up and test.", "A macro can change thousands of cells at once.", W.pattern("backup[\\s\\S]*test|test[\\s\\S]*backup", "both backup and testing")),
      ck("bold", "The macro name is bold", "Select the macro name and press B.", "A bold name is easy to find.", W.format("bold")),
    ],
    solution: "<h1>Monthly branch report consolidation</h1><p>This macro will collect the monthly sales sheets sent by six branches into one summary sheet, so that the finance team no longer copies and pastes by hand, and the numbers always arrive in the same layout.</p><h2>Inputs and outputs</h2><ul><li>Input: one workbook with a sheet for each branch</li><li>Input: the month name typed into a cell</li><li>Output: a Summary sheet with all branch rows and a total</li></ul><h2>Procedure</h2><ol><li>Ask the user to confirm the month</li><li>Clear the old Summary data</li><li>Loop over every branch sheet</li><li>Find the last row of each sheet and copy the data to the next free row of Summary</li><li>Add the total and format the header</li><li>If any sheet has an error or is empty, log it in a list and carry on, using error handling</li></ol><h2>Safety</h2><p>Before running, save a backup of the workbook. The macro is first tested on a copy with three small sheets, and its results are checked against a manual total.</p><p><b>Macro name: ConsolidateBranches</b></p>",
  }),
];
