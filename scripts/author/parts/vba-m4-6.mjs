import { bars, code, def, example, explorer, flow, list, mistakes, module_, p, table, tip, topic, tryIt, warn } from "../kit.mjs";

/* ------------------------------------------------------------------------------------------------ module 4 */
export const M4 = module_({
  slug: "decisions-and-loops", title: "Decisions and loops", hours: 2.5, level: "Core skills",
  summary: "Make a macro decide with If and Select Case, repeat work with For, For Each and Do loops, and use arrays to hold lists.",
  outcome: "You can write a macro that goes through every row of data, applies a rule to each and records the result.",
  intro: "Decisions and loops are what make a macro more than a recording. **Decisions** let it choose between actions based on the data. **Loops** let it repeat an action across hundreds or thousands of rows without getting tired. Together they turn a ten-minute chore into a one-second click.",
  topics: [
    topic({
      title: "If and Select Case", slug: "if-and-select-case",
      blocks: [
        p("`If ... Then ... Else` runs different code depending on a test. When there are many exact choices, `Select Case` is easier to read."),
        code("VBA", "Dim mark As Long\nmark = Range(\"B2\").Value\n\nIf mark >= 75 Then\n    Range(\"C2\").Value = \"Distinction\"\nElseIf mark >= 40 Then\n    Range(\"C2\").Value = \"Pass\"\nElse\n    Range(\"C2\").Value = \"Fail\"\nEnd If", "Three outcomes with If, ElseIf and Else. Every If needs End If"),
        code("VBA", "Select Case grade\n    Case \"A\", \"B\"\n        bonus = 1000\n    Case \"C\"\n        bonus = 500\n    Case Else\n        bonus = 0\nEnd Select", "Select Case picks the matching branch; Case Else catches the rest"),
        table("Combining tests", ["Operator", "Means", "Example"], [["And", "Both must be true", "If a >= 40 And b >= 40 Then"], ["Or", "At least one is true", "If a > 90 Or b > 90 Then"], ["Not", "Reverses a test", "If Not IsEmpty(Range(\"A1\")) Then"]]),
        mistakes(["Forgetting End If.", "Using > when you mean >= (the boundary case, like exactly 40, is the commonest logic error).", "Testing text with the wrong capitals: \"pass\" and \"Pass\" are different unless you use LCase or UCase.", "Writing ElseIf conditions in the wrong order: put the most demanding test first."]),
        tip("Write the rule in plain words first (*75 or more is a distinction; 40 or more is a pass; otherwise fail*), then translate it line by line."),
      ],
      points: ["If chooses between actions; ElseIf adds more tests; every If ends with End If.", "Select Case is clearer for many exact choices.", "Check the boundary values."],
      check: [["What ends an If block?", ["End", "End If", "Stop", "Close If"], 1, "A block If ends with End If."], ["Which test is the commonest source of a logic error?", ["Spelling", "The boundary, such as > instead of >=", "Indentation", "Comments"], 1, "Values exactly on the limit are the usual trap."]],
    }),
    topic({
      title: "For...Next and For Each", slug: "for-loops",
      blocks: [
        p("A **For loop** repeats a block a set number of times. The counter takes each value from the start to the end."),
        code("VBA", "Dim r As Long, lastRow As Long\nlastRow = Cells(Rows.Count, 1).End(xlUp).Row\n\nFor r = 2 To lastRow\n    Cells(r, 4).Value = Cells(r, 2).Value * Cells(r, 3).Value\nNext r", "Row 2 down to the last row: amount = quantity x price. Row 1 is the header, so the loop starts at 2"),
        explorer({ id: "loop-explorer", title: "Trace a For loop", intro: "Choose where the loop ends and how big each step is, for a loop that starts at 1 and does x = x + i each time.", inputs: [{ id: "n", label: "For i = 1 To", min: 1, max: 20, step: 1, value: 5 }, { id: "s", label: "Step", min: 1, max: 5, step: 1, value: 1 }], outputs: [{ label: "Times the loop runs", expr: "floor((n - 1) / s) + 1", unit: "n" }, { label: "Final x (x = x + i)", expr: "(floor((n - 1) / s) + 1) * (2 + (floor((n - 1) / s)) * s) / 2", unit: "n" }] }),
        def("For Each", "A loop that visits every item in a group (a collection of worksheets or every cell in a range) without counting. `For Each ws In ThisWorkbook.Worksheets` visits every sheet."),
        code("VBA", "Dim ws As Worksheet\nFor Each ws In ThisWorkbook.Worksheets\n    Debug.Print ws.Name\nNext ws", "Print the name of every sheet to the Immediate window"),
        list("Choosing", ["**For...Next** when you know the start and the end (rows 2 to lastRow).", "**For Each** when you want every item in a group (every sheet, every cell in a selection).", "Use **Exit For** to leave a loop early, for example when you have found what you want."]),
        warn("A loop that goes the wrong way (For i = 5 To 1 with the default Step of 1) never runs at all. To count down, write For i = 5 To 1 Step -1."),
      ],
      points: ["For...Next repeats a known number of times.", "For Each visits every item in a group.", "Start at the first data row, not the header."],
      check: [["How many times does For i = 1 To 5 run?", ["4", "5", "6", "1"], 1, "i takes the values 1, 2, 3, 4 and 5."], ["Which loop visits every worksheet?", ["For i = 1 To 5", "For Each ws In Worksheets", "Do Until", "If"], 1, "For Each steps through every item of a collection."]],
    }),
    topic({
      title: "Do loops and arrays", slug: "do-loops-and-arrays",
      blocks: [
        p("A **Do loop** repeats while (or until) a condition holds. It suits jobs where you do not know in advance how many times."),
        code("VBA", "Dim r As Long\nr = 2\nDo While Cells(r, 1).Value <> \"\"\n    Cells(r, 4).Value = Cells(r, 2).Value * Cells(r, 3).Value\n    r = r + 1\nLoop", "Keep going down until the first empty cell in column A"),
        table("Do loop forms", ["Form", "Repeats", "Use for"], [["Do While test ... Loop", "While the test is true", "Until something changes"], ["Do Until test ... Loop", "Until the test becomes true", "Same idea, read the other way"], ["Do ... Loop While test", "At least once, then while true", "Ask again until valid"]]),
        warn("A Do loop that never changes its test runs forever and freezes Excel. Make sure something inside the loop (like r = r + 1) moves it towards the end. Press **Ctrl+Break** to stop a runaway macro."),
        p("An **array** is a numbered list of values held under one name. Use one when you need to keep many values in memory, for example every mark so you can find the highest."),
        code("VBA", "Dim marks(1 To 5) As Long\nDim i As Long, best As Long\n\nFor i = 1 To 5\n    marks(i) = Cells(i + 1, 2).Value\n    If marks(i) > best Then best = marks(i)\nNext i\n\nMsgBox \"Highest mark: \" & best", "Read five marks into an array and keep track of the biggest"),
        tip("Reading a whole range into an array with `arr = Range(\"A2:C500\").Value` and looping over the array is far faster than reading cell by cell on a big sheet."),
        tryIt("Which loop would you use to keep asking a user for a number until they type a valid one?", "A Do loop, because you cannot know how many attempts it will take."),
      ],
      points: ["Do While and Do Until repeat until a condition changes.", "Make sure something inside the loop moves it towards the end.", "Arrays hold many values under one name."],
      check: [["What stops a runaway macro?", ["Ctrl+Break", "Ctrl+C", "Alt+F4 only", "Nothing can"], 0, "Ctrl+Break interrupts running code."], ["When is a Do loop better than a For loop?", ["When the count is known", "When you repeat until a condition changes", "Never", "Only for text"], 1, "A Do loop repeats while or until something changes."]],
    }),
    topic({
      title: "Patterns: process every row", slug: "row-patterns",
      blocks: [
        p("Almost every useful macro is one of a few patterns: go through rows, do something to each, and perhaps collect a result."),
        table("Four patterns you will use again and again", ["Pattern", "Idea", "Sketch"], [["Fill a column", "Calculate a value for every row", "For r = 2 To lastRow: Cells(r, 4) = ... : Next r"], ["Flag rows", "Test each row and mark it", "If Cells(r, 3) < 40 Then Cells(r, 4) = \"Fail\""], ["Tally", "Count or add what matches", "If rule Then count = count + 1"], ["Delete rows", "Remove rows that match", "Loop from the bottom up: For r = lastRow To 2 Step -1"]]),
        code("VBA", "Sub TallyPasses()\n    Dim r As Long, lastRow As Long\n    Dim passes As Long, total As Long\n\n    lastRow = Cells(Rows.Count, 1).End(xlUp).Row\n    For r = 2 To lastRow\n        If Cells(r, 2).Value >= 40 Then\n            passes = passes + 1\n            total = total + Cells(r, 2).Value\n        End If\n    Next r\n\n    MsgBox passes & \" passes, total \" & total\nEnd Sub", "A tally: count the passes and add their marks"),
        example("Check a macro against a formula", "The tally above should match COUNTIF and SUMIF.", ["`=COUNTIF(B2:B7,\">=40\")` gives the number of passes.", "`=SUMIF(B2:B7,\">=40\")` gives their total.", "If the macro and the formulas disagree, one of them has a mistake."], "A formula is a good independent check on a macro."),
        warn("When you delete rows in a loop, work from the **bottom up** (Step -1). Deleting from the top shifts the rows beneath up, so the loop skips the row that moved into the gap."),
        bars("Marks in the example: the loop tests each one", [["Asha", 56], ["Bilal", 38], ["Chitra", 40], ["Dev", 29], ["Esha", 77], ["Farid", 90]]),
      ],
      points: ["Fill, flag, tally and delete are the four basic row patterns.", "Check macro results against a formula.", "Delete rows from the bottom up."],
      check: [["Why delete rows from the bottom up?", ["It is faster", "Deleting from the top makes the loop skip rows", "VBA requires it", "It saves memory"], 1, "Rows beneath shift up and one can be skipped."], ["What is a good independent check on a tally macro?", ["Nothing", "A COUNTIF or SUMIF formula", "A bigger font", "A new sheet"], 1, "A formula gives the same answer another way."]],
    }),
  ],
  terms: [["If ... Then", "Runs code only when a test is true"], ["Select Case", "Chooses between exact options"], ["For ... Next", "Repeats a set number of times"], ["For Each", "Visits every item in a group"], ["Do While", "Repeats while a condition is true"], ["Array", "A numbered list of values under one name"]],
  practical: { title: "Practical: grade a class", intro: "Write this in your own copy of Excel.", steps: ["Make a table of ten students with marks.", "Write a macro that loops over every row and writes Distinction, Pass or Fail in the next column.", "Add a tally that counts each result and shows it in a message box.", "Check the counts with COUNTIF formulas."] },
  quiz: [
    ["What ends a block If statement?", ["End If", "Stop", "End", "Next"], 0, "A block If ends with End If."],
    ["How many times does For i = 1 To 10 Step 2 run?", ["10", "5", "2", "1"], 1, "i takes the values 1, 3, 5, 7 and 9."],
    ["Why start the row loop at 2?", ["Excel counts from 2", "Row 1 is the header", "VBA requires it", "Row 2 is empty"], 1, "The first row holds headings."],
    ["Which loop visits every worksheet?", ["For Each ws In Worksheets", "Do While", "If", "Select Case"], 0, "For Each steps through a collection."],
    ["What stops an endless loop?", ["Ctrl+Break", "Ctrl+S", "Ctrl+P", "Ctrl+A"], 0, "Ctrl+Break interrupts the macro."],
    ["How should you delete rows in a loop?", ["From the top", "From the bottom up", "Randomly", "All at once with a selection only"], 1, "It avoids skipping rows."],
    ["Select Case is best when:", ["There are many exact choices", "You need a loop", "You need a date", "You need a function"], 0, "It reads clearly for many cases."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 5 */
export const M5 = module_({
  slug: "procedures-errors-debugging", title: "Procedures, errors and debugging", hours: 2.5, level: "Professional skills",
  summary: "Structure code with Subs that take arguments and Functions you can use in cells, handle errors gracefully, and find bugs with the debugger.",
  outcome: "You can break a big job into small procedures, write a custom worksheet function, and track down why a macro misbehaves.",
  intro: "As macros grow, one long Sub becomes hard to read and harder to fix. Professionals split work into **small procedures**, each doing one job with a clear name, and they plan for things going wrong. This module teaches you to structure code, handle errors, and debug methodically instead of guessing.",
  topics: [
    topic({
      title: "Subs with arguments, and Functions", slug: "subs-and-functions",
      blocks: [
        p("A **Sub** does something. A **Function** works something out and **returns a value**. Both can take **arguments**: values passed in so the same procedure can be used in many places."),
        code("VBA", "Function GSTAmount(price As Double, rate As Double) As Double\n    GSTAmount = price * rate\nEnd Function\n\nSub ShowGST()\n    MsgBox \"GST on 800: \" & GSTAmount(800, 0.18)\nEnd Sub", "A Function returns a value by assigning to its own name"),
        table("Sub or Function?", ["Use a Sub when", "Use a Function when"], [["You perform an action (format, copy, delete)", "You calculate a value and give it back"], ["You do not need a value back", "You want to use it in a worksheet formula as well"], ["Example: FormatHeader", "Example: GSTAmount or GradeLetter"]]),
        example("A function in a cell", "You write GSTAmount in a standard module.", ["In a cell type `=GSTAmount(B2,0.18)`.", "Excel calls your Function and shows the result, just like a built-in function.", "Change B2 and the answer updates by itself."], "A user-defined function extends Excel with your own calculations."),
        list("Rules of good procedures", ["One procedure, **one job**, with a name that says it (CalculateTotal, not Proc1).", "Pass in what it needs as **arguments** rather than reaching for global values.", "Keep each procedure to **about a screen** of code.", "Put a **comment** above each saying what it does and what it expects."]),
        warn("A user-defined function used in a cell cannot change other cells or the sheet. It can only calculate and return a value."),
      ],
      points: ["A Sub does; a Function returns a value.", "Arguments let one procedure serve many cases.", "A Function can be used in a worksheet cell."],
      check: [["Which can be used in a worksheet cell?", ["A Sub", "A Function", "A comment", "A loop"], 1, "A Function returns a value that the cell shows."], ["How does a Function return its value?", ["With Return", "By assigning to its own name", "With MsgBox", "With End"], 1, "Assign the result to the function's name."]],
    }),
    topic({
      title: "Handling errors", slug: "error-handling",
      blocks: [
        p("A run-time error stops a macro in a box of yellow code. For your own use that is fine; for a macro others will use, you should plan for the errors you can expect: a missing sheet, an empty cell, text where a number should be."),
        code("VBA", "Sub SafeDivide()\n    Dim a As Double, b As Double\n    On Error GoTo Oops\n\n    a = Range(\"A1\").Value\n    b = Range(\"B1\").Value\n    Range(\"C1\").Value = a / b\n    Exit Sub\n\nOops:\n    MsgBox \"Something went wrong: \" & Err.Description\nEnd Sub", "On Error GoTo sends the macro to a label; Exit Sub stops it falling into the handler on success"),
        table("Error-handling tools", ["Tool", "Does"], [["On Error GoTo label", "On an error, jump to the label"], ["Err.Number and Err.Description", "Say what went wrong"], ["Exit Sub", "Leaves before the handler on success"], ["On Error Resume Next", "Ignore errors and carry on (dangerous)"], ["On Error GoTo 0", "Turns error handling off again"]]),
        warn("`On Error Resume Next` hides every error, including real mistakes, and lets the macro carry on with wrong data. Use it only around one line you expect to fail, and switch it off straight afterwards."),
        list("Prevent before you handle", ["**Check first** if a sheet exists, a cell is empty or a number is not zero, instead of waiting for an error.", "**Validate input** from InputBox before using it.", "**Tell the user** what went wrong in plain words.", "Always put **Exit Sub** before the handler."]),
        example("Check, do not just catch", "Dividing by a number that might be zero.", ["Better: `If b <> 0 Then Range(\"C1\").Value = a / b Else Range(\"C1\").Value = \"n/a\"`.", "A simple check is clearer than an error handler for a case you can predict."], "Use error handlers for the unexpected and If for the expected."),
      ],
      points: ["On Error GoTo jumps to a handler; Err.Description says what happened.", "Put Exit Sub before the handler.", "Prevent expected problems with If; handle the unexpected."],
      check: [["Why put Exit Sub before the error handler?", ["It is optional", "So the macro does not run the handler when everything worked", "It speeds up code", "To close Excel"], 1, "Otherwise the code flows into the handler."], ["Which is the risk of On Error Resume Next?", ["It is slow", "It hides real errors", "It deletes files", "It needs Excel 365"], 1, "It lets the macro carry on with wrong data."]],
    }),
    topic({
      title: "Debugging like a professional", slug: "debugging",
      blocks: [
        p("Debugging is finding out *why* code does what it does. The method matters more than cleverness: **observe, then change one thing**."),
        table("The debugger's tools", ["Tool", "Key", "Use it to"], [["Step into", "F8", "Run one line at a time and watch what happens"], ["Breakpoint", "F9", "Stop at a chosen line when running normally"], ["Run to cursor", "Ctrl+F8", "Run until the line your cursor is on"], ["Immediate window", "Ctrl+G", "Ask for a value: ? lastRow, or test a line"], ["Watch window", "View > Watch", "See a variable change as the code runs"], ["Debug.Print", "(code)", "Write values to the Immediate window while the macro runs"]]),
        flow("A debugging routine", ["Reproduce the problem with a small example", "Step through with F8 and watch the variables", "Find the first line where reality differs from what you expected", "Fix one thing, then test again"]),
        example("The total is 10 too high", "A tally macro always adds an extra 10.", ["Set a breakpoint at the start of the loop and press F5.", "Press F8 and watch the row variable: it starts at 1, not 2, so the header (10) is included.", "Change For r = 1 To lastRow to For r = 2 To lastRow and test again."], "Stepping through shows exactly where the code and your intention part ways."),
        list("Habits that prevent bugs", ["Use **Option Explicit** and meaningful names.", "Write and test **small pieces** before joining them.", "**Test the edges**: an empty sheet, one row, the largest realistic data.", "Keep a **copy** before big changes."]),
        tip("Hover over a variable while the code is paused to see its current value in a small tooltip."),
      ],
      points: ["Reproduce, step with F8, find the first wrong line, change one thing.", "Immediate and Watch windows show values.", "Test the edges: empty, one row, large data."],
      check: [["Which key runs the code one line at a time?", ["F5", "F8", "F9", "F12"], 1, "F8 steps into the next line."], ["What is the best first step when a macro gives a wrong answer?", ["Rewrite it all", "Reproduce it with a small example and step through", "Ignore it", "Add On Error Resume Next"], 1, "Observation comes before changes."]],
    }),
    topic({
      title: "Events: macros that run by themselves", slug: "events",
      blocks: [
        p("An **event** is something that happens in Excel: a workbook opens, a cell changes, a sheet is activated. An **event procedure** is a Sub that runs automatically when it does."),
        table("Common events", ["Event", "Runs when", "Lives in"], [["Workbook_Open", "The file is opened", "ThisWorkbook"], ["Worksheet_Change", "A cell on the sheet is changed", "That sheet's code module"], ["Worksheet_SelectionChange", "The selection moves", "That sheet's code module"], ["Workbook_BeforeSave", "Just before saving", "ThisWorkbook"]]),
        code("VBA", "Private Sub Worksheet_Change(ByVal Target As Range)\n    If Not Intersect(Target, Range(\"B2:B100\")) Is Nothing Then\n        Application.EnableEvents = False\n        Target.Offset(0, 1).Value = Now\n        Application.EnableEvents = True\n    End If\nEnd Sub", "Stamp the date and time next to any change in B2:B100"),
        warn("Writing to a cell inside Worksheet_Change triggers the same event again, which can loop forever. Switch events off with Application.EnableEvents = False before you write, and switch them back on straight after."),
        list("Use events sparingly", ["Keep event code **short and fast**; it runs every time.", "Always **switch events back on**, even if an error occurs (put it in the error handler too).", "Tell users the workbook has automatic behaviour."]),
      ],
      points: ["Events run macros automatically when something happens.", "Switch EnableEvents off before writing inside Change events.", "Keep event code short and switch events back on."],
      check: [["Which event runs when a cell on a sheet changes?", ["Workbook_Open", "Worksheet_Change", "Workbook_BeforeSave", "Worksheet_Activate"], 1, "Worksheet_Change runs when a cell changes."], ["Why switch EnableEvents off before writing in a Change event?", ["To save memory", "To stop the write triggering the event again in a loop", "Excel requires it", "To hide the code"], 1, "Otherwise the event calls itself endlessly."]],
    }),
  ],
  terms: [["Procedure", "A Sub or a Function"], ["Argument", "A value passed into a procedure"], ["Function", "A procedure that returns a value"], ["Error handler", "Code that runs when an error occurs"], ["Breakpoint", "A line where running pauses"], ["Event", "Something that triggers a procedure automatically"]],
  practical: { title: "Practical: a function and a safe macro", intro: "Do this in your own copy of Excel.", steps: ["Write a Function called GradeLetter that takes a mark and returns A, B, C or F, and use it in a cell.", "Write a Sub that asks for a mark with InputBox, validates it, and shows the grade.", "Add error handling for text input and Cancel.", "Use F8 to step through it once and watch the variables."] },
  quiz: [
    ["Which is the difference between a Sub and a Function?", ["None", "A Function returns a value", "A Sub is faster", "A Function cannot take arguments"], 1, "A Function gives a value back."],
    ["How does a Function return its result?", ["With MsgBox", "By assigning to its own name", "With Exit", "With Return"], 1, "Assign the result to the function's name."],
    ["What does Err.Description give?", ["The row", "A text description of the error", "The macro name", "The file name"], 1, "It says what went wrong."],
    ["Why is On Error Resume Next risky?", ["It is slow", "It hides real errors and lets code carry on with wrong data", "It needs a license", "It deletes data"], 1, "Errors become invisible."],
    ["Which key steps through code one line at a time?", ["F8", "F5", "F9", "F11"], 0, "F8 is Step Into."],
    ["What is a breakpoint?", ["An error", "A line where running pauses", "A comment", "A sheet"], 1, "Running pauses at the breakpoint line."],
    ["Why switch events off before writing inside Worksheet_Change?", ["To save memory", "To stop the write triggering the event again", "Excel forbids writing", "To speed up Excel"], 1, "Otherwise the event can loop."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 6 */
export const M6 = module_({
  slug: "automation-in-practice", title: "Automation in practice", hours: 2, level: "Professional skills",
  summary: "Put it all together: automate reports, clean and consolidate data, make macros fast and safe, and design them so others can use and maintain them.",
  outcome: "You can plan, build, test and hand over a macro that saves real time, and judge when not to automate.",
  intro: "A macro is only valuable if people trust it and can keep it working. In this last module you meet the patterns professionals automate most, learn how to keep macros fast and safe, and practise the skill that matters most: **designing before coding**.",
  topics: [
    topic({
      title: "Real tasks worth automating", slug: "real-tasks",
      blocks: [
        p("Four jobs make up most of the macros people actually use: formatting reports, cleaning data, combining files or sheets, and producing outputs such as PDFs."),
        table("Common automation jobs", ["Job", "What the macro does", "Ideas it uses"], [["Format the weekly report", "Applies fonts, number formats, borders, column widths and totals", "Ranges, With, last row"], ["Clean a data export", "Trims spaces, fixes capitals, removes blank rows, converts text numbers", "Loops, If, string functions"], ["Combine sheets or files", "Copies data from many sheets into one", "For Each, last row, Copy"], ["Produce outputs", "Saves each sheet as a PDF or sends a file", "Loops, file paths"]]),
        code("VBA", "Sub CombineSheets()\n    Dim ws As Worksheet, target As Worksheet\n    Dim lastRow As Long, nextRow As Long\n\n    Set target = ThisWorkbook.Worksheets(\"Summary\")\n    For Each ws In ThisWorkbook.Worksheets\n        If ws.Name <> target.Name Then\n            lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row\n            nextRow = target.Cells(target.Rows.Count, 1).End(xlUp).Row + 1\n            ws.Range(\"A2:D\" & lastRow).Copy\n            target.Cells(nextRow, 1).PasteSpecial xlPasteValues\n        End If\n    Next ws\n    Application.CutCopyMode = False\nEnd Sub", "Copy the data rows of every other sheet to the bottom of the Summary sheet"),
        example("Plan it in plain words first", "The monthly branch report: six sheets, one summary.", ["Inputs: six branch sheets with the same columns.", "Output: a Summary sheet with every row and a total.", "Steps: clear Summary, loop over branch sheets, copy rows to the next free row, total, format.", "Risks: a sheet with no data; a sheet in a different layout."], "A page of plain-words planning saves hours of rewriting code."),
        warn("The macro assumes every branch sheet has the same columns. If a sheet differs, the Summary will be wrong without any error. Check the layout in code, and say so if it is not what you expect."),
      ],
      points: ["Most macros format, clean, combine or output.", "Plan inputs, outputs, steps and risks in plain words first.", "Check that the data has the layout the macro assumes."],
      check: [["Which loop would combine every sheet?", ["For r = 1 To 3", "For Each ws In ThisWorkbook.Worksheets", "Do Until", "If"], 1, "For Each steps through every sheet."], ["What should you do before writing code?", ["Nothing", "Plan inputs, outputs, steps and risks in plain words", "Choose colours", "Delete data"], 1, "Planning prevents rewriting."]],
    }),
    topic({
      title: "Fast, safe and tidy macros", slug: "fast-and-safe",
      blocks: [
        p("A macro that takes five minutes will not be used. A macro that damages data once will never be used again. Speed and safety come from a few habits."),
        table("Speed-ups that matter", ["Setting", "Effect", "Remember to"], [["Application.ScreenUpdating = False", "Stops the screen redrawing at each step", "Set it back to True at the end, and in the error handler"], ["Application.Calculation = xlCalculationManual", "Stops recalculation until you are done", "Restore xlCalculationAutomatic"], ["Avoid Select and Activate", "Acts on ranges directly", "Use With and variables"], ["Read ranges into arrays", "Far fewer calls to the sheet", "Write the results back in one go"]]),
        code("VBA", "Sub FastMacro()\n    On Error GoTo Done\n    Application.ScreenUpdating = False\n    Application.Calculation = xlCalculationManual\n\n    ' ... the real work goes here ...\n\nDone:\n    Application.Calculation = xlCalculationAutomatic\n    Application.ScreenUpdating = True\nEnd Sub", "Switch settings off, do the work, and always switch them back on, even after an error"),
        list("Safety habits", ["**Back up** the workbook before the macro changes anything important.", "**Test on a copy** and on small data first.", "**Ask before destroying**: a MsgBox with Yes and No before deleting.", "**Log** what the macro did (a message or a hidden sheet) so a result can be checked.", "**Never** hard-code file paths that only exist on your computer."]),
        warn("If a macro turns ScreenUpdating off and then crashes, Excel can look frozen. Always put the settings back in a handler that runs whatever happens."),
        tip("To make a macro easy to maintain, keep settings (sheet names, column numbers, a tax rate) as **constants** at the top of the module, not buried in the code."),
      ],
      points: ["Turn off screen updating and automatic calculation, and always turn them back on.", "Back up, test on a copy, ask before destroying.", "Keep settings as constants at the top."],
      check: [["Why restore ScreenUpdating at the end?", ["It is optional", "Otherwise Excel looks frozen", "It speeds up code", "To delete data"], 1, "Leaving it off leaves the screen not redrawing."], ["Which habit prevents loss if a macro goes wrong?", ["Skipping tests", "Backing up before running", "Hard-coding paths", "Using On Error Resume Next"], 1, "A backup lets you start again."]],
    }),
    topic({
      title: "Hand it over: documentation, sharing and when not to automate", slug: "handover",
      blocks: [
        p("A macro you cannot explain, others cannot maintain. A few small things make the difference between a clever trick and a tool the team depends on."),
        list("A hand-over checklist", ["A **short description** at the top of each procedure: what it does, what it needs, what it changes.", "A **Read me sheet** in the workbook: purpose, how to run it, who to ask.", "A **button** on the sheet to run it, labelled clearly.", "**Error messages** that say what to do next.", "A **version number** and date in a comment, with a list of changes.", "The file saved as **.xlsm**, with an unprotected master copy kept safe."], true),
        table("When not to automate", ["Situation", "Why"], [["The process is still changing every week", "You will rewrite the macro each time"], ["A formula, filter or PivotTable already does it", "Simple tools are easier to maintain than code"], ["It needs judgement", "A rule cannot replace a person"], ["Nobody will maintain the macro", "A macro nobody understands becomes a risk"]]),
        example("Formula first", "You need totals by region.", ["A SUMIFS or a PivotTable already does it, with no code.", "A macro would add something to maintain and could break.", "Automate only when the simpler tools cannot do the job."], "The best code is often the code you did not need to write."),
        warn("Security: share macro workbooks only with people who expect them, explain why macros are needed, and never ask people to lower their macro security."),
      ],
      points: ["Document each procedure and add a Read me sheet.", "Show errors that say what to do next.", "Prefer simple tools first; automate when they cannot do the job."],
      check: [["What belongs on a Read me sheet?", ["Passwords", "Purpose, how to run it and who to ask", "Nothing", "Random notes"], 1, "A new user needs to know what it is and how to use it."], ["When should you not write a macro?", ["When a formula or PivotTable already does the job", "When it is repeated", "When it is slow", "When it is useful"], 0, "Simple tools are easier to keep working."]],
    }),
  ],
  terms: [["ScreenUpdating", "Whether Excel redraws the screen while running"], ["Constant", "A named value that never changes"], ["Read me sheet", "A sheet that explains the workbook"], ["Hand-over", "Passing a macro to others with documentation"], ["Consolidate", "Combine data from many sheets into one"], ["Maintainable", "Easy for someone else to understand and fix"]],
  practical: { title: "Practical: a macro design document", intro: "Plan a real macro before writing a line of code.", steps: ["Choose a repeated task you or a friend do in Excel.", "Write the inputs, outputs, numbered steps and the risks.", "Say where you would use a loop, an If and error handling.", "Write what you would test and how you would back up first."] },
  quiz: [
    ["What is the first step when automating a task?", ["Write code at once", "Plan inputs, outputs, steps and risks", "Choose a colour", "Delete data"], 1, "Planning comes first."],
    ["Which setting makes a macro faster?", ["ScreenUpdating = False", "Calculation = xlCalculationAutomatic only", "Select everything", "More message boxes"], 0, "Not redrawing the screen saves a lot of time."],
    ["Why restore settings in an error handler?", ["To be tidy", "So Excel is not left frozen after a crash", "VBA requires it", "To speed up the code"], 1, "The handler runs whatever happens."],
    ["Which is a good safety habit?", ["Run on the only copy", "Back up before changing important data", "Hard-code paths", "Disable all security"], 1, "A backup lets you recover."],
    ["Where should settings like a tax rate live in code?", ["Buried in the middle", "As constants at the top", "In a comment", "Nowhere"], 1, "Constants are easy to change in one place."],
    ["When is a macro not the right answer?", ["When a PivotTable already does it", "When it is repeated", "When it is slow", "When it is boring"], 0, "Prefer simpler tools when they work."],
    ["What should a Read me sheet say?", ["Passwords", "What it is, how to run it, and who to ask", "Nothing", "Jokes"], 1, "It helps the next user."],
  ],
});
