import { bars, code, def, example, flow, list, mistakes, module_, p, table, tip, topic, tryIt, warn } from "../kit.mjs";

/* ------------------------------------------------------------------------------------------------ module 1 */
export const M1 = module_({
  slug: "macros-first-steps", title: "Macros: first steps", hours: 2, level: "Getting started",
  summary: "Understand what a macro and VBA are, record and run a macro, save a macro-enabled file, and handle macro security with care.",
  outcome: "You can decide whether a task is worth automating, record a simple macro, run it safely and read what it recorded.",
  intro: "If you do the same thing in Excel every week (format a report, clean an export, copy data between files), a **macro** can do it for you in one click. A macro is a recorded or written list of instructions that Excel follows. They are written in **VBA** (Visual Basic for Applications), the programming language built into Excel and the other Office programs. You do not need to be a programmer to start: Excel can record your actions and write the first code for you.",
  topics: [
    topic({
      title: "What a macro is and when to use one", slug: "what-is-a-macro",
      blocks: [
        p("A **macro** is a saved set of instructions. **VBA** is the language those instructions are written in. When you press a button or a shortcut, Excel carries the instructions out faster, and the same way, every time."),
        table("Good and poor candidates for a macro", ["Good for a macro", "Poor fit"], [["Repeated every day, week or month", "Done once"], ["Follows fixed rules", "Needs human judgement each time"], ["Identical structure each time", "The layout changes constantly"], ["Many rows or many files", "A handful of cells"], ["Boring and error-prone by hand", "Quicker to do than to automate"]]),
        flow("Is it worth automating?", ["How often do I do it?", "How long does it take by hand?", "Are the rules always the same?", "How long to build and test the macro?"]),
        example("The Monday report", "Every Monday you spend twenty minutes formatting the same report.", ["Twenty minutes a week is about seventeen hours a year.", "A macro that does it in one click might take two hours to build and test.", "It pays for itself in about six weeks, and removes the typing mistakes."], "Automate when the time saved over a year clearly beats the time to build, test and maintain."),
        warn("A macro is a program that can change or delete data across a whole workbook in a second. Test on a copy, and keep a backup of anything important before running a new macro."),
        tryIt("You must write a personal reply to each customer complaint. Is that a macro job?", "No. Each reply needs judgement and the right tone, which a fixed set of rules cannot provide."),
      ],
      points: ["A macro is a saved set of instructions written in VBA.", "Automate work that is repeated, rule-based and identical each time.", "Test macros on a copy and keep a backup."],
      check: [["Which task suits a macro?", ["Deciding who gets a discount case by case", "Formatting the same weekly report", "A one-off clean-up", "Writing thoughtful replies"], 1, "It is repeated, rule-based and identical."], ["What is VBA?", ["A kind of chart", "The language macros are written in", "A file type", "A spreadsheet function"], 1, "Visual Basic for Applications is the language behind macros."]],
    }),
    topic({
      title: "Record and run your first macro", slug: "record-and-run",
      blocks: [
        p("The **macro recorder** watches what you do and writes the VBA for you. It is the best way to learn: you can do a task, then read the code it produced."),
        flow("Record a macro", ["Show the Developer tab (File > Options > Customize Ribbon)", "Click Record Macro and give it a name with no spaces", "Do the steps you want to repeat", "Click Stop Recording"]),
        table("Running and managing macros", ["You want to", "Do this"], [["See your macros", "Developer > Macros, or press Alt+F8"], ["Run a macro", "Select it and click Run, or use its shortcut key"], ["Open the code editor", "Press Alt+F11 (the Visual Basic Editor)"], ["Run from a button", "Insert a shape or button and Assign Macro"], ["Keep the macro in the file", "Save as Excel Macro-Enabled Workbook (.xlsm)"]]),
        example("Record a header format", "You always make the heading row bold and shaded.", ["Click Record Macro, name it FormatHeader, then select A1:D1.", "Press Bold and choose a fill colour, then stop recording.", "Press Alt+F8, select FormatHeader and run it on another sheet."], "One click now does what took four."),
        code("VBA", "Sub FormatHeader()\n    Range(\"A1:D1\").Select\n    Selection.Font.Bold = True\n    Selection.Interior.Color = RGB(255, 242, 204)\nEnd Sub", "What the recorder writes: a Sub that selects the range, then bolds and shades it"),
        warn("An ordinary .xlsx file cannot store macros. If you save a workbook with macros as .xlsx, Excel warns you and the macros are lost. Use .xlsm."),
        tip("Give recorded macros clear names such as FormatHeader or CleanExport, not Macro1. In a year you will thank yourself."),
      ],
      points: ["The recorder writes VBA for the steps you perform.", "Alt+F8 lists macros; Alt+F11 opens the code editor.", "Macros are kept only in .xlsm files."],
      check: [["Which file type keeps macros?", [".xlsx", ".xlsm", ".csv", ".txt"], 1, ".xlsm is the macro-enabled workbook."], ["How do you open the Visual Basic Editor?", ["Alt+F11", "Ctrl+Z", "Alt+Tab", "F5 only"], 0, "Alt+F11 opens the editor."]],
    }),
    topic({
      title: "Reading recorded code, and absolute versus relative recording", slug: "reading-recorded-code",
      blocks: [
        p("Open the editor and look at what the recorder wrote. You will see a **Sub** (a named block of instructions) containing lines that do one thing each. Each line is a *sentence*: an object, what to do with it, and sometimes a value."),
        table("Reading a line of recorded code", ["Line", "In plain words"], [["Range(\"A1:D1\").Select", "Select the cells A1 to D1"], ["Selection.Font.Bold = True", "Make the selected cells' font bold"], ["Selection.Interior.Color = RGB(255, 242, 204)", "Fill the selected cells with a pale yellow"], ["Sub FormatHeader() ... End Sub", "A named macro that begins and ends here"]]),
        def("Absolute and relative recording", "By default the recorder is **absolute**: it records exact cell addresses such as A1:D1. With **Use Relative References** switched on it records movements relative to the active cell, so the macro works from wherever you start."),
        example("Why the choice matters", "You record a macro that formats the cell you click and the cell below it.", ["Absolute: it always formats the same two cells, whatever you click first.", "Relative: it formats the cell you click and the one below, wherever you are."], "Choose relative when the macro should work on whatever cell is active."),
        list("What recorded code does badly", ["It **selects** everything before acting on it, which is slow; good code works on a range directly.", "It records **every** step, including ones you did by mistake.", "It cannot **decide** or **repeat**: no If, no loops. You add those by writing code."]),
        mistakes(["Recording while you click around, so the macro contains useless steps.", "Leaving the macro named Macro1.", "Never opening the code to read it."]),
      ],
      points: ["A Sub is a named macro; each line is an instruction.", "Absolute recording uses fixed addresses; relative follows the active cell.", "Recorded code selects too much and cannot decide or repeat."],
      check: [["What does Selection.Font.Bold = True do?", ["Selects the cell", "Makes the selected cells bold", "Deletes the cells", "Saves the file"], 1, "It sets the bold property of the selection to True."], ["Recording with relative references means the macro:", ["Always uses A1", "Acts relative to the active cell", "Cannot be run", "Runs on a timer"], 1, "It follows where you start."]],
    }),
    topic({
      title: "Macro security", slug: "macro-security",
      blocks: [
        p("A macro can do anything you can do in Excel, and more: open files, send data, delete things. That power is why attackers send **macro-enabled files** by email and ask you to click *Enable Content*."),
        table("Safe habits with macros", ["Safe", "Risky"], [["Leave macros disabled for files from people you do not know", "Click Enable Content on a file that arrived unexpectedly"], ["Read the code of a macro you were given before running it", "Run any macro you find online without reading it"], ["Keep macros in files you wrote, saved as .xlsm", "Turn macro security down to Enable all macros"], ["Keep a backup before running a new macro", "Run a new macro on your only copy"]]),
        flow("When a file asks you to enable macros", ["Where did the file come from? Expected, and from someone you know?", "If unsure, do not enable; ask the sender by another route", "Open the editor and read the code if you know what to look for", "Enable only for files you trust"]),
        warn("Never lower the macro security setting to *Enable all macros*. It turns off the one protection that stops a harmful macro running automatically."),
        list("Things to be suspicious of in a macro", ["Code that **downloads** something from the internet.", "Code that works with **files and folders** you did not expect it to touch.", "Code that **hides** itself or tries to confuse the reader.", "A document that says the content is 'protected' and you must enable macros to see it."]),
        tip("Excel's default asks before running macros in files from the internet. Keep that default."),
      ],
      points: ["Macros can do harm, so enable them only for files you trust.", "Never set macro security to Enable all.", "Read unknown code, and keep backups before running new macros."],
      check: [["A file arrives unexpectedly and asks you to Enable Content. You should:", ["Click Enable at once", "Not enable it, and check with the sender another way", "Forward it", "Lower macro security"], 1, "Unexpected macro files are a common way to spread malware."], ["What is the safest macro security setting to keep?", ["Enable all macros", "Disable with notification (ask first)", "Delete Excel", "Never save files"], 1, "Asking first keeps you in control."]],
    }),
  ],
  terms: [["Macro", "A saved set of instructions"], ["VBA", "The language macros are written in"], ["Sub", "A named block of VBA code"], ["Macro recorder", "Writes code from your actions"], [".xlsm", "The file type that keeps macros"], ["Enable Content", "The button that lets a file's macros run"]],
  practical: { title: "Practical: record and read a macro", intro: "Do this in your own copy of Excel.", steps: ["Show the Developer tab and record a macro named FormatHeader that makes the first row bold and shaded.", "Save the workbook as .xlsm.", "Press Alt+F11 and read the code that was written, line by line.", "Run the macro on a second sheet."] },
  quiz: [
    ["What is a macro?", ["A kind of chart", "A saved set of instructions", "A file type", "A formula"], 1, "A macro stores steps for Excel to repeat."],
    ["Which task is the best macro candidate?", ["A one-off clean-up", "A weekly report formatted the same way", "A judgement call", "A single cell edit"], 1, "Repeated and rule-based work is the best fit."],
    ["Which file type keeps macros?", [".xlsx", ".xlsm", ".pdf", ".csv"], 1, ".xlsm stores macros."],
    ["Which shortcut opens the Visual Basic Editor?", ["Alt+F11", "Ctrl+S", "Ctrl+Z", "Alt+Tab"], 0, "Alt+F11 opens the editor."],
    ["Why is recorded code often slow?", ["It is encrypted", "It selects everything before acting", "It uses old Excel", "It runs on the internet"], 1, "Writing code that works directly on ranges is faster."],
    ["What should you do with an unexpected macro file?", ["Enable content at once", "Not enable it and check with the sender", "Share it", "Lower security"], 1, "Unexpected macro files may be malicious."],
    ["Why keep a backup before running a new macro?", ["It runs faster", "A macro can change thousands of cells and Undo may not reverse it", "Excel requires it", "To save space"], 1, "Macros can make changes Undo cannot reverse."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 2 */
export const M2 = module_({
  slug: "vba-building-blocks", title: "VBA building blocks", hours: 2.5, level: "Core skills",
  summary: "Write your first VBA: the editor, Subs, variables and data types, operators, message and input boxes, and clear comments.",
  outcome: "You can write a short, readable Sub that asks for input, calculates and reports a result.",
  intro: "VBA reads like a very strict version of English. A line says *do this to that*. In this module you learn the grammar: where code lives, how to store values in **variables**, the kinds of value there are, and how to talk to the user. These few ideas appear in every macro you will ever write.",
  topics: [
    topic({
      title: "The editor and your first Sub", slug: "editor-and-first-sub",
      blocks: [
        p("Press **Alt+F11** to open the Visual Basic Editor. On the left is the **Project Explorer**, listing your workbook and its modules; the big window on the right is where code is written. Code lives in a **module** (Insert > Module)."),
        table("The editor at a glance", ["Part", "Use it for"], [["Project Explorer", "Browse workbooks, sheets and modules"], ["Code window", "Write and edit code"], ["Immediate window (Ctrl+G)", "Try a line at once and see Debug.Print output"], ["Properties window", "Change names and settings of objects"]]),
        code("VBA", "Sub HelloGrowQR()\n    ' This line is a comment: it is ignored by VBA\n    MsgBox \"Hello from my first macro!\"\nEnd Sub", "A complete macro. Put the cursor inside it and press F5 to run"),
        list("The anatomy of a Sub", ["It starts with `Sub` and a name, with brackets.", "It ends with `End Sub`.", "Lines in between are the instructions, one per line, indented for readability.", "A line beginning with an apostrophe `'` is a **comment**, a note for humans."]),
        tip("Put your cursor anywhere inside a Sub and press **F5** to run it. Press **F8** to step through it one line at a time."),
        mistakes(["Writing code outside any Sub.", "Spaces in the name of a Sub: use HelloGrowQR or Hello_GrowQR.", "Forgetting End Sub.", "Forgetting the quotation marks around text."]),
      ],
      points: ["Alt+F11 opens the editor; code lives in modules.", "A Sub runs from Sub to End Sub.", "F5 runs, F8 steps, an apostrophe starts a comment."],
      check: [["Which line ends a macro?", ["Stop", "End Sub", "Close", "Exit"], 1, "A Sub always ends with End Sub."], ["What does an apostrophe at the start of a line do?", ["Runs the line twice", "Makes it a comment that VBA ignores", "Stops the macro", "Prints it"], 1, "It marks a note for humans."]],
    }),
    topic({
      title: "Variables and data types", slug: "variables-and-types",
      blocks: [
        p("A **variable** is a named box that holds a value while the macro runs. You create one with **Dim** (short for *dimension*) and say what kind of value it holds."),
        table("The data types you will use most", ["Type", "Holds", "Example"], [["String", "Text", "\"Asha Rao\""], ["Long", "A whole number (up to about 2 billion)", "250000"], ["Double", "A number with decimals", "3.14159"], ["Boolean", "True or False", "True"], ["Date", "A date or time", "#14-Mar-2026#"], ["Variant", "Anything (flexible but slower and easier to misuse)", "(avoid unless needed)"]]),
        code("VBA", "Option Explicit\n\nSub VariablesDemo()\n    Dim customerName As String\n    Dim quantity As Long\n    Dim unitPrice As Double\n    Dim total As Double\n\n    customerName = \"Asha Rao\"\n    quantity = 4\n    unitPrice = 45.5\n    total = quantity * unitPrice\n\n    MsgBox customerName & \" owes \" & total\nEnd Sub", "Declare, assign, use. The result is Asha Rao owes 182"),
        list("Rules and habits", ["Names start with a letter, have no spaces, and are not VBA keywords.", "Choose **meaningful names**: unitPrice, not x.", "Put **Option Explicit** at the top of every module: VBA then complains about any variable you forgot to declare, which catches spelling mistakes.", "Use `=` to **assign** a value: the variable on the left receives the value on the right."]),
        example("A typo that Option Explicit catches", "You write totl = quantity * unitPrice by mistake, meaning total.", ["Without Option Explicit, VBA quietly makes a new variable called totl and your total stays empty.", "With Option Explicit, VBA stops and says Variable not defined, pointing at the typo."], "Option Explicit turns silent mistakes into visible ones."),
        warn("A Long holds whole numbers only. Assigning 4.7 to a Long rounds it to 5. Use Double for decimals."),
      ],
      points: ["Dim creates a variable and its type.", "Use the right type: String, Long, Double, Boolean, Date.", "Always use Option Explicit and meaningful names."],
      check: [["Which type suits a price of 45.50?", ["String", "Long", "Double", "Boolean"], 2, "A number with decimals suits Double."], ["Why use Option Explicit?", ["It speeds up Excel", "It forces you to declare variables and catches typos", "It hides errors", "It is optional decoration"], 1, "Undeclared names become errors instead of silent mistakes."]],
    }),
    topic({
      title: "Operators, MsgBox and InputBox", slug: "operators-and-dialogs",
      blocks: [
        p("A macro becomes useful when it takes **input** and gives **output**. `InputBox` asks the user for something; `MsgBox` tells them something."),
        table("Operators", ["Operator", "Does", "Example", "Result"], [["+  -  *  /", "Arithmetic", "10 / 4", "2.5"], ["\\", "Whole-number division", "10 \\ 4", "2"], ["Mod", "The remainder", "10 Mod 4", "2"], ["^", "Power", "2 ^ 3", "8"], ["&", "Joins text", "\"a\" & \"b\"", "ab"], ["=  <>  <  >  <=  >=", "Compare", "5 <> 3", "True"]]),
        code("VBA", "Option Explicit\n\nSub PriceWithGST()\n    Dim price As Double\n    Dim answer As String\n\n    answer = InputBox(\"Enter the price in rupees:\")\n    If answer = \"\" Then Exit Sub   ' the user pressed Cancel\n\n    price = CDbl(answer)\n    MsgBox \"With 18% GST: \" & price * 1.18\nEnd Sub", "Ask for a number, convert the text to a number with CDbl, and report"),
        list("Good habits with dialogs", ["**InputBox always returns text**: convert it with CLng, CDbl or CDate before calculating.", "**Check for Cancel**: it returns an empty string.", "**Join** text and numbers with &, not +.", "Use **Debug.Print** while building: it writes to the Immediate window without bothering the user."]),
        mistakes(["Adding two InputBox results with +: they are text, so \"2\" + \"3\" gives \"23\", not 5. Convert first.", "Forgetting that division by zero stops the macro with an error.", "Using a MsgBox for dozens of messages: use Debug.Print while testing."]),
        tryIt("What does MsgBox \"Total: \" & 2 + 3 show?", "Total: 5. The arithmetic is worked out before the join, so 2 + 3 becomes 5 and then the text is joined."),
      ],
      points: ["InputBox returns text; convert it before calculating.", "Join with &; add with +.", "Check for Cancel and use Debug.Print while testing."],
      check: [["What type of value does InputBox return?", ["A number", "Text", "A date", "A range"], 1, "It always returns a String."], ["Which joins text?", ["+", "&", "*", "^"], 1, "The ampersand joins text."]],
    }),
  ],
  terms: [["Variable", "A named box for a value"], ["Dim", "Declares a variable and its type"], ["String", "Text"], ["Long", "A whole number"], ["Option Explicit", "Forces variables to be declared"], ["Comment", "A note starting with an apostrophe"]],
  practical: { title: "Practical: a calculating macro", intro: "Write this in your own copy of Excel.", steps: ["Open the editor with Alt+F11 and insert a module with Option Explicit at the top.", "Write a Sub that asks for a price and a quantity with InputBox.", "Convert them with CDbl and CLng, calculate the total and show it in a message box.", "Test it with a normal value, with Cancel and with letters instead of a number."] },
  quiz: [
    ["Which keyword declares a variable?", ["Dim", "Make", "Var", "Let"], 0, "Dim declares a variable."],
    ["Which type holds a price with decimals?", ["Long", "String", "Double", "Boolean"], 2, "Double holds numbers with decimals."],
    ["What does Option Explicit do?", ["Makes macros faster", "Forces you to declare every variable", "Locks the workbook", "Turns off errors"], 1, "It catches undeclared names and typos."],
    ["What does an InputBox return?", ["A number", "Text", "A Boolean", "A range"], 1, "Text, which you must convert."],
    ["Which operator joins text?", ["&", "+", "^", "Mod"], 0, "The ampersand joins text."],
    ["What is 10 Mod 4?", ["2", "2.5", "6", "40"], 0, "The remainder after dividing 10 by 4 is 2."],
    ["What does an apostrophe at the start of a line do?", ["Runs it twice", "Marks a comment", "Stops the macro", "Declares a variable"], 1, "It starts a comment."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 3 */
export const M3 = module_({
  slug: "excel-objects", title: "Talking to Excel: objects, ranges and sheets", hours: 2.5, level: "Core skills",
  summary: "Use the Excel object model: workbooks, worksheets and ranges, their properties and methods, and the patterns for finding data and writing results.",
  outcome: "You can read and write cells, format ranges and find the last row of data, which is the base of nearly every useful macro.",
  intro: "To make Excel do things, VBA talks to Excel's **objects**: the workbook, the sheets in it, the ranges on a sheet. Each object has **properties** (things it has, like a value or a colour) and **methods** (things it can do, like Copy or Clear). Once you see Excel as a set of objects arranged in a hierarchy, you can name anything in it.",
  topics: [
    topic({
      title: "The object model: workbooks, sheets and ranges", slug: "object-model",
      blocks: [
        p("Objects sit inside each other like folders. To point at a cell you name the path from the outside in, separated by dots."),
        flow("The hierarchy", ["Application: Excel itself", "Workbook: one file", "Worksheet: one sheet in the file", "Range: a cell or block of cells"]),
        table("Naming objects", ["Object", "How you refer to it", "Example"], [["Application", "Application", "Application.ScreenUpdating"], ["Workbook", "ThisWorkbook, ActiveWorkbook, Workbooks(\"Name.xlsx\")", "ThisWorkbook.Name"], ["Worksheet", "Worksheets(\"Sales\"), ActiveSheet", "Worksheets(\"Sales\").Name"], ["Range", "Range(\"A1:B5\"), Cells(row, column)", "Range(\"A1\").Value"]]),
        code("VBA", "Sub WhereAmI()\n    MsgBox ThisWorkbook.Name & \" / \" & ActiveSheet.Name\n    MsgBox ThisWorkbook.Worksheets(\"Sales\").Range(\"B2\").Value\nEnd Sub", "A full path: workbook, then worksheet, then range, then property"),
        tip("If you do not name the workbook or sheet, VBA uses the **active** ones. That is convenient but can hit the wrong sheet if the user clicks elsewhere: name the sheet in macros you share."),
        warn("ThisWorkbook is the file that contains the running code; ActiveWorkbook is whichever file is in front. They are the same only if you have not switched windows."),
      ],
      points: ["Objects nest: Application > Workbook > Worksheet > Range.", "Use dots to walk the path from the outside in.", "Name the sheet explicitly rather than relying on the active one."],
      check: [["Which object is a single sheet tab?", ["Application", "Workbook", "Worksheet", "Range"], 2, "A worksheet is one sheet in a workbook."], ["What does ThisWorkbook mean?", ["The file in front", "The file that contains the running code", "The newest file", "Any file"], 1, "It is the workbook holding the macro."]],
    }),
    topic({
      title: "Ranges, properties and methods", slug: "ranges-properties-methods",
      blocks: [
        p("A **Range** is the object you use most. It can be one cell or many. Use **properties** to read or change things about it, and **methods** to make it do something."),
        table("Everyday properties and methods", ["Name", "Kind", "Does"], [[".Value", "Property", "The value in the cell"], [".Formula", "Property", "The formula as typed"], [".Font.Bold", "Property", "True makes it bold"], [".Interior.Color", "Property", "The fill colour"], [".NumberFormat", "Property", "The number format, such as \"0.00\""], [".Clear", "Method", "Removes everything from the cells"], [".Copy", "Method", "Copies the cells"], [".Select", "Method", "Selects the cells (rarely needed)"]]),
        code("VBA", "Sub FormatReport()\n    With Worksheets(\"Sales\")\n        .Range(\"A1:D1\").Font.Bold = True\n        .Range(\"A1:D1\").Interior.Color = RGB(255, 242, 204)\n        .Range(\"D2:D6\").NumberFormat = \"#,##0.00\"\n        .Range(\"D7\").Formula = \"=SUM(D2:D6)\"\n    End With\nEnd Sub", "With ... End With avoids repeating the sheet name; no Select is needed"),
        list("Habits that make code faster and clearer", ["**Avoid Select and Activate.** Work on the range directly.", "Use **With ... End With** for several actions on the same object.", "Use **Cells(row, column)** when the row or column is a variable: Cells(r, 3).", "Use `.Value` explicitly; it is clearer than relying on the default."]),
        example("Write and read a cell", "You want to put a total in D7 and read it back.", ["`Range(\"D7\").Value = 2180` writes 2180.", "`x = Range(\"D7\").Value` reads it into a variable.", "`Range(\"D7\").Formula = \"=SUM(D2:D6)\"` writes a live formula instead of a fixed number."], "Use Formula when the result should keep updating; use Value for a fixed number."),
        mistakes(["Selecting a range and then acting on Selection when you could act on the range directly.", "Forgetting that Cells takes (row, column), not (column, row).", "Writing a number into a cell with .Value when you meant a formula, so it never updates."]),
      ],
      points: ["Properties describe an object; methods make it act.", "Avoid Select; use With ... End With.", "Cells(row, column) is the tool for loops."],
      check: [["Which line writes the number 2180 into D7?", ["Range(\"D7\").Clear", "Range(\"D7\").Value = 2180", "Range(\"D7\").Select", "Range(\"D7\").Copy"], 1, "Assigning to .Value writes the number into the cell."], ["In Cells(3, 2), what is 2?", ["The row", "The column", "The sheet", "The value"], 1, "Cells takes the row first and then the column."]],
    }),
    topic({
      title: "Finding the end of the data", slug: "finding-the-last-row",
      blocks: [
        p("Real data grows. A macro that always works on rows 2 to 100 will miss row 101. The standard fix is to **find the last row** of data every time."),
        code("VBA", "Dim lastRow As Long\nlastRow = Cells(Rows.Count, 1).End(xlUp).Row", "Start at the very bottom of column A and jump up to the last filled cell"),
        flow("How End(xlUp) works", ["Rows.Count is the last row of the sheet", "Cells(Rows.Count, 1) is the bottom cell of column A", "End(xlUp) is like pressing Ctrl and the up arrow", "Excel stops at the last cell that holds something"]),
        table("Other ways to find your data", ["Tool", "Does", "Watch out"], [["End(xlUp)", "The last filled cell in a column", "Use a column that is always filled"], ["CurrentRegion", "The block of data around a cell, up to the first blank row and column", "Blank rows inside the data stop it early"], ["UsedRange", "Everything Excel thinks is in use", "Can include formatted but empty cells"]]),
        example("Loop over all the data", "A table of marks with a header in row 1.", ["Find the last row with End(xlUp).", "Loop from row 2 to lastRow so the header is skipped.", "The macro now works whether there are ten rows or ten thousand."], "Finding the last row makes a macro safe for any size of data."),
        warn("Choose a column that has a value in every row for End(xlUp). If column A has blanks, the macro will stop at the last filled cell of A, which may be above the real end."),
      ],
      points: ["Find the last row every time; do not hard-code it.", "End(xlUp) from the bottom of a column is the common method.", "CurrentRegion and UsedRange are alternatives with limits."],
      check: [["What does Cells(Rows.Count, 1).End(xlUp).Row give?", ["The first row", "The last row with data in column A", "The number of columns", "The sheet name"], 1, "It jumps up from the bottom of column A to the last filled cell."], ["Why not hard-code row 100?", ["It is illegal", "The data may grow or shrink", "VBA forbids it", "It is slower"], 1, "A macro should adapt to the data it finds."]],
    }),
  ],
  terms: [["Object", "A thing in Excel such as a workbook, sheet or range"], ["Property", "Something an object has: Value, Font.Bold"], ["Method", "Something an object can do: Copy, Clear"], ["Range", "A cell or block of cells"], ["With ... End With", "A way to act on one object several times"], ["xlUp", "The direction used to find the last cell"]],
  practical: { title: "Practical: write a total", intro: "Do this in your own copy of Excel.", steps: ["Make a table of quantity and price for six items.", "Write a Sub that finds the last row and writes quantity times price in column D for every row.", "Make it write a total under the list and bold the header, without using Select.", "Add two rows of data and run it again to check it adapts."] },
  quiz: [
    ["Which is the correct order of the hierarchy?", ["Range > Worksheet > Workbook > Application", "Application > Workbook > Worksheet > Range", "Worksheet > Application > Range", "Workbook > Range > Application"], 1, "Each object lives inside the one before it."],
    ["What is .Value?", ["A method", "A property holding what is in the cell", "A sheet", "A workbook"], 1, ".Value is a property."],
    ["What is .Clear?", ["A property", "A method that removes the contents and formats", "A sheet", "A type"], 1, "Clear is a method."],
    ["Why avoid Select?", ["It is illegal", "It is slow and can hit the wrong place; act on the range directly", "Excel forbids it", "It does nothing"], 1, "Working directly on the range is faster and safer."],
    ["In Cells(3, 2) what is 3?", ["The column", "The row", "The sheet", "The value"], 1, "The row comes first."],
    ["What gives the last used row in column A?", ["Cells(Rows.Count, 1).End(xlUp).Row", "Rows(1)", "A1.End", "Range(\"A\")"], 0, "End(xlUp) from the bottom finds it."],
    ["Why does a macro need to find the last row?", ["To look clever", "So it works however much data there is", "To use more memory", "To rename sheets"], 1, "Real data grows and shrinks."],
  ],
});
