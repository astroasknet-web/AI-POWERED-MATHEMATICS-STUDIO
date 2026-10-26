import { capstone, course } from "../kit.mjs";
import { labs, SK } from "../parts/vba-labs.mjs";
import { M1, M2, M3 } from "../parts/vba-m1-3.mjs";
import { M4, M5, M6 } from "../parts/vba-m4-6.mjs";

export default course({
  slug: "excel-macros-vba", title: "Excel Automation with Macros & VBA", tagline: "Record, read, write and debug macros, with code you can run in your own Excel", level: "Advanced", hours: 14,
  summary: "Automate Excel the way professionals do. Decide what is worth automating, record and read macros, write VBA with variables, decisions and loops, work with ranges and sheets, handle errors, debug step by step and design macros others can trust. VBA runs inside desktop Excel, so every lesson gives code you can run in your own copy, and the practice labs train the thinking: choosing what to automate, predicting code, spotting errors and checking a macro's result with formulas.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: design a safe, maintainable macro", summary: "Write the design document for a macro, and pass the final assessment.",
    intro: "Before any real macro comes a good design. In this final step you write the design document for a macro you would be happy to hand to a colleague: its purpose, inputs and outputs, a numbered procedure that mentions where you will loop and how you will handle errors, and a safety paragraph about backup and testing. Then take the final assessment, which covers the whole course.",
    steps: ["Work through the **Macro design document** lab: purpose, inputs and outputs, procedure and safety.", "Check your procedure: does every step have a clear input and output?", "If you have desktop Excel, build the macro from your design and test it on a copy.", "Take the final assessment below."], projectTitle: "Design a safe, maintainable macro",
    quiz: [
      ["What is a macro?", ["A kind of chart", "A saved set of instructions", "A file type", "A formula"], 1, "A macro stores steps for Excel to repeat."],
      ["Which file type keeps macros?", [".xlsx", ".xlsm", ".pdf", ".csv"], 1, ".xlsm stores macros."],
      ["Why should you not click Enable Content on an unexpected macro file?", ["It is slow", "It may run harmful code", "It deletes Excel", "It changes colours"], 1, "Unexpected macro files are a common way to spread malware."],
      ["Which keyword declares a variable?", ["Dim", "Make", "Var", "Let"], 0, "Dim declares a variable."],
      ["What does Option Explicit do?", ["Makes macros faster", "Forces you to declare every variable", "Locks the file", "Turns off errors"], 1, "It catches undeclared names and typos."],
      ["Which type holds a price with decimals?", ["Long", "String", "Double", "Boolean"], 2, "Double holds numbers with decimals."],
      ["What does an InputBox return?", ["A number", "Text", "A Boolean", "A range"], 1, "Always text, so convert it."],
      ["Which line finds the last row used in column A?", ["Cells(Rows.Count, 1).End(xlUp).Row", "Rows(1)", "A1.End", "Range(\"A\")"], 0, "End(xlUp) from the bottom finds it."],
      ["Why avoid Select in macros?", ["It is illegal", "It is slow and fragile; act on the range directly", "Excel forbids it", "It does nothing"], 1, "Working directly on the range is faster and safer."],
      ["How many times does For i = 1 To 10 Step 2 run?", ["10", "5", "2", "1"], 1, "i takes the values 1, 3, 5, 7 and 9."],
      ["Why delete rows from the bottom up?", ["It is faster", "Deleting from the top makes the loop skip rows", "VBA requires it", "It saves memory"], 1, "Rows beneath shift up and one can be skipped."],
      ["What is the difference between a Sub and a Function?", ["None", "A Function returns a value", "A Sub is faster", "A Function cannot take arguments"], 1, "A Function gives a value back."],
      ["Which tool steps through code one line at a time?", ["F5", "F8", "F9", "F12"], 1, "F8 is Step Into."],
      ["Why switch events off before writing inside a Change event?", ["To save memory", "To stop the write triggering the event again", "Excel forbids writing", "To hide code"], 1, "Otherwise the event can loop."],
      ["Why restore ScreenUpdating in an error handler?", ["To be tidy", "So Excel is not left frozen after a crash", "VBA requires it", "To speed up code"], 1, "The handler runs whatever happens."],
      ["When is a macro not the right answer?", ["When a PivotTable already does the job", "When the task is repeated", "When it is boring", "When it is slow"], 0, "Simpler tools are easier to maintain."],
    ],
  }),
  labs,
  skills: [{ id: SK, label: "Excel automation" }],
  badges: [
    { id: "automation-thinker", title: "Automation thinker", description: "Chose what is worth automating and stayed safe with macros.", when: { all: ["v1-good-candidates", "v2-macro-security"] } },
    { id: "code-reader", title: "Code reader", description: "Matched data types and predicted code results.", when: { all: ["v3-data-types", "v4-predict-msgbox"] } },
    { id: "object-explorer", title: "Object explorer", description: "Identified Excel objects and reproduced a macro's result.", when: { all: ["v5-objects", "v6-by-hand"] } },
    { id: "loop-tracer", title: "Loop tracer", description: "Traced loops by hand.", when: { all: ["v7-loop-results"] } },
    { id: "bug-hunter", title: "Bug hunter", description: "Classified errors by kind.", when: { all: ["v10-error-kinds"] } },
    { id: "macro-designer", title: "Macro designer", description: "Wrote the design of a safe, maintainable macro.", when: { all: ["cap-macro-design"] } },
  ],
  landing: {
    hero: { eyebrow: "Automation · Code you can run in your own Excel", title: "Excel Automation with Macros & VBA", subtitle: "Learn to record, read, write and debug macros: variables, decisions, loops, ranges, functions and error handling, and how to design automation that people trust. Practice labs check your thinking.", level: "Advanced", outcomeLine: "After this course you can plan, write and hand over a macro that saves real time." },
    outcomes: [
      { icon: "computer", title: "Decide what to automate", text: "Spot the tasks worth a macro and the ones that are not." },
      { icon: "sheet", title: "Record and read code", text: "Use the recorder, then read and improve what it wrote." },
      { icon: "ai", title: "Write VBA", text: "Variables, types, If, Select Case, loops and arrays." },
      { icon: "web", title: "Control Excel", text: "Workbooks, sheets, ranges, last row and formatting." },
      { icon: "sort", title: "Handle errors and debug", text: "Error handlers, F8 stepping, breakpoints and watches." },
      { icon: "slides", title: "Build trusted tools", text: "Fast, safe, documented macros and user-defined functions." },
    ],
    projects: [
      { title: "Is it worth automating?", text: "Judge tasks and macro security.", module: "macros-first-steps" },
      { title: "Predict the code", text: "Data types and message-box results.", module: "vba-building-blocks" },
      { title: "A macro's result by formula", text: "Reproduce what a loop would write.", module: "excel-objects" },
      { title: "Trace the loops", text: "Predict a loop and choose the right one.", module: "decisions-and-loops" },
      { title: "Classify the bugs", text: "Syntax, run-time and logic errors.", module: "procedures-errors-debugging" },
      { title: "A macro design document", text: "Inputs, procedure and safety.", module: "capstone" },
    ],
    tools: [{ icon: "sort", title: "Predict and classify", text: "Short activities that train reading and debugging code." }, { icon: "sheet", title: "Spreadsheet lab", text: "Work out by formula what a macro would produce." }, { icon: "doc", title: "Document lab", text: "Write plans and design documents." }],
    assessment: ["Finish the required labs in each module: they are checked automatically and explained when something is missing.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Complete the final project and the final assessment to finish the course."],
    faq: [
      { q: "Do I need desktop Excel?", a: "To run the macros you write, yes: VBA runs inside the desktop version of Excel for Windows or Mac, not in a browser. Every lesson gives code you can paste into your own copy. The practice labs in GrowQR train the thinking around macros without needing Excel." },
      { q: "Do I need to know programming?", a: "No. The course starts with the recorder and builds up. You should be comfortable with Excel formulas first; Basic Excel and Advanced Excel are good preparation." },
      { q: "Is VBA still worth learning?", a: "Yes for automating Excel and other Office programs, and the ideas (variables, decisions, loops, errors) carry straight over to other languages." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile." },
    ],
  },
  catalogue: {
    hours: "~14 hrs", weeks: "~4 weeks", pace: "3 to 4 hrs/wk", badge: "Excel Automation",
    brief: "Record, read, write and debug VBA macros, with code to run in your own Excel and labs that train your thinking.",
    learn: ["What to automate, recording macros and macro security", "VBA building blocks: variables, types, MsgBox and InputBox", "Workbooks, worksheets, ranges and finding the last row", "If, Select Case, loops and arrays", "Subs, Functions, error handling, debugging and events", "Fast, safe, documented automation you can hand over"],
    handsOn: "Write the design document for a safe, maintainable macro: inputs and outputs, procedure and safety.",
    outcome: "Plan, write and hand over macros that save real time.",
  },
});
