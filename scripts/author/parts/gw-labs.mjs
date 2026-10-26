import { ck, classifyLab, D, S, sheetLab, sl, slidesLab, W, wordLab, withShapes } from "../kit.mjs";

export const SK = "workspace";

/** Labs run in GrowQR's own editors, which work like Docs, Sheets and Slides for everything taught here. Each model answer is replayed by the course tests. */
export const labs = [
  /* ------------------------------------------------------------------ module 1: account, Drive and sharing */
  classifyLab({
    id: "g1-sharing", module: "drive-and-sharing", title: "Choose the right access", level: "beginner", minutes: 8, xp: 30, skills: [SK], required: true,
    objective: "Match each situation to the least access that gets the job done.",
    scenario: "Every file in Drive has a list of people and what each may do. Giving more access than needed is the commonest way work gets changed or leaked by accident.",
    steps: ["Read each situation.", "Choose Viewer, Commenter or Editor.", "Press Check my work."],
    categories: [["viewer", "Viewer (read only)"], ["commenter", "Commenter (can suggest and comment)"], ["editor", "Editor (can change the file)"]],
    items: [
      ["Parents who should read the class newsletter", "viewer", "They only need to read it. Viewer access cannot change anything."],
      ["Your teacher who will mark your essay and leave feedback without changing your words", "commenter", "A commenter can leave comments and suggestions but cannot rewrite the text."],
      ["The three classmates writing a group report with you", "editor", "People who are building the file with you need to edit it."],
      ["Someone who will check the facts in your draft and suggest corrections", "commenter", "Suggestions let you accept or reject each change."],
      ["The whole school, for a published event poster", "viewer", "A public notice should be read-only so nobody can alter it."],
      ["Your co-organiser who keeps the event budget sheet up to date", "editor", "They update the numbers, so they must be able to edit."],
    ],
  }),
  wordLab({
    id: "g2-naming-guide", module: "drive-and-sharing", title: "Write a file-naming and folder guide", level: "beginner", minutes: 12, xp: 40, skills: [SK], required: true,
    objective: "Write a short guide with headings and a list so a team keeps Drive tidy.",
    scenario: "A student club's Drive is a mess: files called Untitled, Final, Final2 and Final FINAL. Draft a one-page guide so everyone names and stores files the same way.",
    steps: ["Give the guide a title and two headings: Names and Folders.", "Under Names, write a short paragraph and a list of at least three naming rules.", "Under Folders, write a short paragraph describing how folders are organised.", "Bold the most important rule."],
    checks: [
      ck("title", "A title that mentions Drive or files", "Start with a title such as Our Drive guide.", "A clear title says what the document is for.", W.pattern("drive|file|guide", "a title that names the guide")),
      ck("heads", "At least two headings", "Make Names and Folders headings with the paragraph style box.", "Headings let readers jump to the part they need and build the outline.", W.heading(2)),
      ck("list", "A list of at least three rules", "Press the bullet-list button and write three rules.", "Rules are easier to follow as a short list.", W.list(3)),
      ck("paras", "At least two paragraphs of real sentences", "Write a sentence or two under each heading.", "A guide needs a reason as well as a rule.", W.paragraphs(2, 8)),
      ck("bold", "One important rule is bold", "Select the key rule and press B.", "Bold draws the eye to the rule that matters most.", W.format("bold")),
    ],
    solution: "<h1>Our Drive guide</h1><h2>Names</h2><p>A good file name tells you what is inside without opening it, so nobody has to guess which version is the latest.</p><ul><li><b>Start every file name with the date as 2026-03-14.</b></li><li>Then add the topic, for example Newsletter or Budget.</li><li>Use v1, v2 and v3 for versions instead of the word Final.</li></ul><h2>Folders</h2><p>Each project gets one folder with the same three folders inside: Drafts, Finished and Pictures, so everyone knows where to look.</p>",
  }),

  /* ------------------------------------------------------------------ module 2: Docs */
  wordLab({
    id: "g3-meeting-notes", module: "docs-that-work", title: "Turn rough notes into meeting minutes", level: "beginner", minutes: 14, xp: 50, skills: [SK], required: true,
    objective: "Use headings, a table and a numbered list to make minutes that people will actually use.",
    scenario: "Here are rough notes from the student council meeting. Turn them into clear minutes with a title, headings, an attendance table and numbered action items.",
    steps: ["Make the first line a title and give it a larger size.", "Make Attendance, Decisions and Actions into headings.", "Turn the three names and roles into a table with three rows and two columns.", "Turn the actions into a numbered list.", "Bold the deadline line."],
    html: "<p>Student council meeting</p><p>Attendance</p><p>Meera, chair</p><p>Karan, secretary</p><p>Zoya, treasurer</p><p>Decisions</p><p>We will hold the charity bake sale on 20 March in the main hall.</p><p>Actions</p><p>Meera books the hall</p><p>Karan writes the poster text</p><p>Zoya counts the cash box</p><p>All actions are due by Friday 13 March</p>",
    checks: [
      ck("size", "The title is larger", "Select the first line and choose a larger size or the Title style.", "A bigger title shows what the document is.", W.format("size")),
      ck("heads", "Three or more headings", "Select Attendance, Decisions and Actions and apply Heading 2.", "Real headings give structure and let people navigate.", W.heading(3)),
      ck("table", "A table with 3 rows and 2 columns", "Insert a table and type each name and role in a row.", "A table lines up related facts in rows and columns.", W.table(3, 2)),
      ck("ol", "A numbered list of three actions", "Select the three actions and press the numbered-list button.", "Numbers show there are exactly three jobs and make it easy to refer to one.", W.list(3, "ol")),
      ck("bold", "The deadline is bold", "Select the deadline line and press B.", "A deadline is the line people must not miss.", W.format("bold")),
      ck("keep", "The text is still there", "Do not delete any of the notes.", "Formatting changes how notes look, not what they say.", W.contains("bake sale")),
    ],
    solution: "<h1 style=\"font-size: 30px\">Student council meeting</h1><h2>Attendance</h2><table><tbody><tr><td>Meera</td><td>Chair</td></tr><tr><td>Karan</td><td>Secretary</td></tr><tr><td>Zoya</td><td>Treasurer</td></tr></tbody></table><h2>Decisions</h2><p>We will hold the charity bake sale on 20 March in the main hall.</p><h2>Actions</h2><ol><li>Meera books the hall</li><li>Karan writes the poster text</li><li>Zoya counts the cash box</li></ol><p><b>All actions are due by Friday 13 March</b></p>",
  }),
  wordLab({
    id: "g4-fix-structure", module: "docs-that-work", title: "Give a report a real structure", level: "intermediate", minutes: 12, xp: 45, skills: [SK], required: false,
    objective: "Replace hand-formatted lines with heading styles so the document has an outline.",
    scenario: "A report was typed with every line the same. Mark the title and the three sections as proper headings, put the findings in a list and write one summary sentence at the top.",
    steps: ["Make the first line a title.", "Make Method, Findings and Recommendation into headings.", "Turn the three findings into a bulleted list.", "Add a one-sentence summary paragraph of at least ten words under the title."],
    html: "<p>Water use at school</p><p>Method</p><p>We read the water meter every morning for two weeks.</p><p>Findings</p><p>Most water is used before 9 am</p><p>The playground tap leaks overnight</p><p>Handwashing is the biggest single use</p><p>Recommendation</p><p>Fix the playground tap and add a timer to the hand basins.</p>",
    checks: [
      ck("heads", "Four headings (title and three sections)", "Use the paragraph style box: Title or Heading 1 for the title, Heading 2 for the sections.", "Heading styles build the document outline and the navigation pane.", W.heading(4)),
      ck("list", "The findings are a bulleted list of three", "Select the three findings and press the bullet button.", "Parallel findings read best as a list.", W.list(3, "ul")),
      ck("sum", "A summary paragraph of at least ten words", "Add a sentence under the title that states the main finding.", "A summary lets a busy reader get the point first.", W.paragraphs(3, 8)),
      ck("keep", "The recommendation is still there", "Do not delete the original sentences.", "Structure should not change the content.", W.contains("playground tap")),
    ],
    solution: "<h1>Water use at school</h1><p>Our two-week meter readings show that most water is wasted by one leaking tap and heavy use before assembly.</p><h2>Method</h2><p>We read the water meter every morning for two weeks.</p><h2>Findings</h2><ul><li>Most water is used before 9 am</li><li>The playground tap leaks overnight</li><li>Handwashing is the biggest single use</li></ul><h2>Recommendation</h2><p>Fix the playground tap and add a timer to the hand basins.</p>",
  }),

  /* ------------------------------------------------------------------ module 3: Sheets */
  sheetLab({
    id: "g5-trip-budget", module: "sheets-for-teams", title: "Budget a class trip", level: "beginner", minutes: 12, xp: 50, skills: [SK], required: true,
    objective: "Calculate costs with formulas, total them and show the split per student.",
    scenario: "A class of 25 is planning a trip. Work out each cost line, the total and what each student pays.",
    steps: ["In D2 multiply the number in B2 by the price in C2, then do the same for D3 and D4.", "In D5 total the three amounts.", "In D6 divide the total by the number of students in B6.", "Format D5 and D6 as currency."],
    cells: { A1: "Item", B1: "Qty", C1: "Price", D1: "Cost", A2: "Bus (per bus)", B2: "2", C2: "6000", A3: "Entry tickets", B3: "25", C3: "150", A4: "Lunch boxes", B4: "25", C4: "120", A5: "Total", A6: "Students", B6: "25", C6: "Each pays" }, view: { cols: 5, rows: 8 },
    checks: [
      ck("d2", "D2 is the bus cost (12,000)", "=B2*C2", "Quantity times price gives the cost of each line.", S.formula("D2", { equals: 12000 })),
      ck("d3", "D3 is the ticket cost (3,750)", "=B3*C3", "25 tickets at 150 each.", S.formula("D3", { equals: 3750 })),
      ck("d4", "D4 is the lunch cost (3,000)", "=B4*C4", "25 lunch boxes at 120 each.", S.formula("D4", { equals: 3000 })),
      ck("d5", "D5 is the total (18,750)", "=SUM(D2:D4)", "12,000 + 3,750 + 3,000.", S.formula("D5", { fns: ["SUM"], cover: "D2:D4", equals: 18750 })),
      ck("d6", "D6 is what each student pays (750)", "=D5/B6", "Divide the total by the number of students.", S.formula("D6", { equals: 750 })),
      ck("fmt", "D5 is formatted as currency", "Select D5 and choose Currency.", "Money reads better with a currency format.", S.format("D5", "currency")),
    ],
    solution: { cells: { D2: "=B2*C2", D3: "=B3*C3", D4: "=B4*C4", D5: "=SUM(D2:D4)", D6: "=D5/B6" }, formats: { D5: { num: "currency" }, D6: { num: "currency" } } },
  }),
  sheetLab({
    id: "g6-attendance", module: "sheets-for-teams", title: "Track attendance with IF and COUNTIF", level: "intermediate", minutes: 14, xp: 60, skills: [SK], required: true,
    objective: "Flag students who are low on attendance and count them.",
    scenario: "A club records how many of 20 sessions each member attended. Anyone under 15 sessions needs a reminder.",
    steps: ["In C2 write an IF that shows Remind when B2 is below 15 and OK otherwise.", "Fill C3 to C6.", "In B8 count how many members need a reminder with COUNTIF.", "Chart the sessions attended (names as labels) as a bar chart."],
    cells: { A1: "Member", B1: "Sessions", C1: "Status", A2: "Anil", B2: "18", A3: "Bhavna", B3: "12", A4: "Chirag", B4: "15", A5: "Deepa", B5: "9", A6: "Eshan", B6: "20", A8: "Need a reminder" }, view: { cols: 4, rows: 10 },
    checks: [
      ck("c2", "C2 is OK for Anil", "=IF(B2<15,\"Remind\",\"OK\")", "IF tests the sessions and chooses a word.", S.formula("C2", { fns: ["IF"], equals: "OK" })),
      ck("c3", "C3 is Remind for Bhavna", "Same formula with B3.", "12 is below 15.", S.formula("C3", { fns: ["IF"], equals: "Remind" })),
      ck("c4", "C4 is OK for Chirag (exactly 15)", "Use < not <=.", "Exactly 15 meets the target, so no reminder.", S.formula("C4", { fns: ["IF"], equals: "OK" })),
      ck("cnt", "B8 counts two reminders", "=COUNTIF(C2:C6,\"Remind\")", "COUNTIF counts the cells that say Remind.", S.formula("B8", { fns: ["COUNTIF"], cover: "C2:C6", equals: 2 })),
      ck("chart", "A bar chart of sessions by member", "Use A2:A6 as labels and B2:B6 as values.", "A bar chart compares members at a glance.", S.chart({ type: "bar", labels: "A2:A6", values: "B2:B6" })),
    ],
    solution: { cells: { C2: "=IF(B2<15,\"Remind\",\"OK\")", C3: "=IF(B3<15,\"Remind\",\"OK\")", C4: "=IF(B4<15,\"Remind\",\"OK\")", C5: "=IF(B5<15,\"Remind\",\"OK\")", C6: "=IF(B6<15,\"Remind\",\"OK\")", B8: "=COUNTIF(C2:C6,\"Remind\")" }, charts: [{ type: "bar", labels: "A2:A6", values: "B2:B6", title: "Sessions attended" }] },
  }),
  sheetLab({
    id: "g7-sales-by-product", module: "sheets-for-teams", title: "Summarise sales with SUMIF and sort", level: "intermediate", minutes: 14, xp: 60, skills: [SK], required: false,
    objective: "Add up sales for one product with SUMIF, and sort a list from highest to lowest.",
    scenario: "A school shop logged sales. Find the total for Pens, the total for Books, and sort the log by amount, largest first.",
    steps: ["In F2 total the amount for Pen with SUMIF.", "In F3 total the amount for Book with SUMIF.", "Sort the sales (A2:B7) by amount, largest first."],
    cells: { A1: "Product", B1: "Amount", A2: "Pen", B2: "40", A3: "Book", B3: "120", A4: "Pen", B4: "60", A5: "Book", B5: "90", A6: "Pen", B6: "25", A7: "Book", B7: "150", E1: "Product", F1: "Total", E2: "Pen", E3: "Book" }, view: { cols: 6, rows: 9 },
    checks: [
      ck("f2", "F2 is the Pen total (125)", "=SUMIF(A2:A7,E2,B2:B7)", "SUMIF adds the amounts for rows that match the product.", S.formula("F2", { fns: ["SUMIF"], equals: 125 })),
      ck("f3", "F3 is the Book total (360)", "=SUMIF(A2:A7,E3,B2:B7)", "Change only the product cell.", S.formula("F3", { fns: ["SUMIF"], equals: 360 })),
      ck("sort", "The amounts are sorted largest first", "Select A1:B7 and sort by column B, Z to A.", "Always sort the whole table so the rows stay together.", S.sorted("B2:B7", "desc")),
    ],
    solution: { cells: { A2: "Book", B2: "150", A3: "Book", B3: "120", A4: "Book", B4: "90", A5: "Pen", B5: "60", A6: "Pen", B6: "40", A7: "Pen", B7: "25", F2: "=SUMIF(A2:A7,E2,B2:B7)", F3: "=SUMIF(A2:A7,E3,B2:B7)" } },
  }),

  /* ------------------------------------------------------------------ module 4: Slides */
  slidesLab({
    id: "g8-pitch", module: "slides-that-present", title: "A five-slide project pitch", level: "beginner", minutes: 16, xp: 55, skills: [SK], required: true,
    objective: "Build a short, readable deck with a title slide, clear slide titles and a theme.",
    scenario: "Your team is pitching a school recycling project. Make five slides that a class can follow in two minutes.",
    steps: ["Slide 1 is a Title slide with the project name.", "Add four more slides: The problem, Our idea, What we need, and Thank you.", "Keep each content slide to a few short bullet points.", "Choose a theme other than the default."],
    checks: [
      ck("count", "Five to seven slides", "Use Add slide to make more.", "A two-minute pitch needs only a few slides.", D.count(5, 7)),
      ck("first", "A title slide first", "Choose the Title slide layout for slide 1.", "The first slide names the project.", D.titleFirst()),
      ck("titles", "Every slide has a title", "Type a title on each slide.", "Titles tell the audience where they are.", D.titles()),
      ck("read", "Short, readable bullets", "Keep to about four bullets of a few words.", "People cannot read and listen to a wall of text.", D.readable(5, 14)),
      ck("theme", "A theme other than the default", "Open the theme picker and choose another.", "A theme gives every slide the same look.", D.theme()),
    ],
    initialDeck: { theme: "clean", slides: [{ id: "a1", layout: "title", title: "", body: "", body2: "", shapes: [] }] },
    solutionTheme: "ocean",
    solution: [sl.title("Recycle Right", "Class 9B pitch"), sl.bullets("The problem", "- One bin for everything\n- Paper ends up in landfill\n- Nobody knows the rules"), sl.bullets("Our idea", "- Three labelled bins\n- A poster at each bin\n- A weekly student monitor"), sl.bullets("What we need", "- Two extra bins\n- Printing for posters\n- Ten minutes in assembly"), sl.title("Thank you", "Questions?")],
  }),
  slidesLab({
    id: "g9-diagram", module: "slides-that-present", title: "Draw a process with shapes", level: "intermediate", minutes: 14, xp: 55, skills: [SK], required: false,
    objective: "Use shapes and arrows on a slide to show a process instead of listing it.",
    scenario: "Show how a recycled bottle gets a new life: collected, sorted, melted, made into something new. A diagram says it faster than four bullets.",
    steps: ["Make a slide titled How a bottle is reborn.", "Add at least four shapes (boxes and arrows) in a row.", "Keep the slide free of long text."],
    checks: [
      ck("title", "A slide with the title How a bottle is reborn", "Type the title at the top.", "The title says what the diagram shows.", D.contains("bottle")),
      ck("shapes", "At least four shapes", "Use the shape button to add boxes and arrows.", "Shapes make a process visible.", D.shapes(4)),
      ck("read", "No long text on the slides", "Keep text short; let the shapes carry the idea.", "A diagram works because it needs few words.", D.readable(4, 12)),
    ],
    solution: [withShapes(sl.bullets("How a bottle is reborn", ""), 4)],
  }),

  /* ------------------------------------------------------------------ module 5: Forms */
  classifyLab({
    id: "g10-question-types", module: "forms-and-surveys", title: "Pick the right question type", level: "beginner", minutes: 10, xp: 40, skills: [SK], required: true,
    objective: "Match each thing you want to ask to the Forms question type that collects clean answers.",
    scenario: "A good form makes it easy to answer and easy to analyse. The question type decides both.",
    steps: ["Read each thing you want to find out.", "Choose the best question type.", "Press Check my work."],
    categories: [["choice", "Multiple choice (one answer)"], ["boxes", "Checkboxes (several answers)"], ["scale", "Linear scale (1 to 5)"], ["text", "Paragraph (open answer)"], ["date", "Date"]],
    items: [
      ["Which one lunch break slot do you prefer?", "choice", "One answer from a short list is multiple choice."],
      ["Which of these clubs would you join? (pick any)", "boxes", "People may choose more than one, so use checkboxes."],
      ["How useful was today's workshop, from 1 (not at all) to 5 (very)?", "scale", "A rating that can be averaged is a linear scale."],
      ["What would you change about the workshop?", "text", "An open opinion needs a free-text answer."],
      ["When would you like the next meeting?", "date", "A date question gives clean, consistent dates."],
      ["Are you in Class 8, 9 or 10?", "choice", "One answer from a fixed list is multiple choice."],
    ],
  }),
  wordLab({
    id: "g11-survey-draft", module: "forms-and-surveys", title: "Draft a feedback survey", level: "intermediate", minutes: 15, xp: 55, skills: [SK], required: true,
    objective: "Plan a short survey on paper before building it in Forms: a purpose, numbered questions and a thank-you.",
    scenario: "The robotics club wants feedback on its first term. Draft the survey as a document first, so you can check it before building the form.",
    steps: ["Write a title and a two-sentence introduction saying why you are asking and how long it takes.", "Write at least six numbered questions, mixing multiple choice, a rating and one open question.", "End with a one-line thank-you.", "Make the title a heading."],
    checks: [
      ck("head", "A title as a heading", "Apply a heading style to the title.", "A heading marks the title as the start of the document.", W.heading(1)),
      ck("intro", "An introduction of at least 20 words", "Say why you are asking and how long it takes.", "People answer more honestly when they know why you are asking.", W.paragraphs(1, 20)),
      ck("qs", "At least six numbered questions", "Use the numbered list button and write six questions.", "A numbered list makes questions easy to count and discuss.", W.list(6, "ol")),
      ck("rating", "One rating question", "Include a question such as 'Rate the club from 1 to 5'.", "A rating can be averaged across everyone's answers.", W.pattern("rate|scale|1 to 5|1-5|out of 5", "a rating question")),
      ck("thanks", "A thank-you", "End with a line that thanks people.", "Thanking people encourages them to respond next time.", W.contains("thank")),
    ],
    solution: "<h1>Robotics club feedback survey</h1><p>We want to make the club better next term, so please tell us honestly what you thought. The survey takes about three minutes and your answers are anonymous.</p><ol><li>Which day suits you best for meetings? (Monday, Wednesday or Friday)</li><li>Rate the club overall from 1 to 5.</li><li>Which projects did you enjoy? (robot car, sensor kit, drawing arm)</li><li>How many meetings did you attend this term? (0 to 3, 4 to 7, 8 or more)</li><li>Did you feel you had enough time with the equipment? (yes or no)</li><li>What one thing should we change next term?</li></ol><p>Thank you for your time!</p>",
  }),

  /* ------------------------------------------------------------------ module 6: collaboration and safety */
  classifyLab({
    id: "g12-safe-or-risky", module: "collaborate-and-stay-safe", title: "Safe or risky?", level: "beginner", minutes: 8, xp: 35, skills: [SK], required: true,
    objective: "Spot habits that protect your account and your files, and habits that put them at risk.",
    scenario: "Cloud tools make sharing easy, which also makes mistakes easy. Sort these habits.",
    steps: ["Read each habit.", "Choose Safe habit or Risky habit.", "Press Check my work."],
    categories: [["safe", "Safe habit"], ["risky", "Risky habit"]],
    items: [
      ["Turning on 2-step verification for your account", "safe", "A second proof stops someone who has only your password."],
      ["Sharing a file with Anyone with the link as Editor, to save time", "risky", "Anyone who gets the link can change or delete your work."],
      ["Using one password for every site", "risky", "One leaked password opens every account."],
      ["Reviewing who has access to a shared folder when a project ends", "safe", "Removing people who no longer need access keeps files private."],
      ["Typing your password into a page you reached from an unexpected email", "risky", "It may be a fake sign-in page built to steal passwords."],
      ["Using version history to restore an earlier copy after a mistake", "safe", "Version history is the safety net for accidental edits."],
      ["Signing out of a shared computer when you finish", "safe", "Otherwise the next person can open your files."],
    ],
  }),
  wordLab({
    id: "cap-team-plan", module: "capstone", title: "Capstone: a one-page team project plan", level: "intermediate", minutes: 25, xp: 120, skills: [SK], required: true,
    objective: "Combine headings, a summary, a task table, numbered next steps and emphasis into a plan your team could share.",
    scenario: "Your team will run a school cleanliness week. Write the one-page plan you would share in Drive with the right people.",
    steps: ["A title that is a heading, and a summary paragraph of at least 25 words.", "A heading called Tasks followed by a table with at least four rows and three columns (task, owner, date).", "A heading called Sharing with a short paragraph saying who gets Viewer, Commenter and Editor access.", "A heading called Next steps followed by a numbered list of at least three steps.", "Bold the date of the final event."],
    checks: [
      ck("title", "A title heading", "Apply a heading style to the title.", "The title opens the document.", W.heading(1)),
      ck("sum", "A summary paragraph of at least 25 words", "Explain what the week is and why you are running it.", "A summary lets a reader decide in seconds whether to read on.", W.paragraphs(1, 25)),
      ck("tasks", "A Tasks section with a table of 4 rows and 3 columns", "Insert a table with columns for task, owner and date.", "A table keeps tasks, owners and dates lined up.", W.table(4, 3)),
      ck("heads", "At least three headings", "Use headings for Tasks, Sharing and Next steps.", "Headings make a one-page plan scannable.", W.heading(3)),
      ck("share", "A sharing paragraph that mentions Viewer, Commenter and Editor", "Say who gets each kind of access.", "Deciding access in writing prevents later confusion.", W.pattern("viewer.*commenter.*editor|editor.*commenter.*viewer|viewer.*editor", "a sharing paragraph naming the access levels")),
      ck("steps", "A numbered list of at least three next steps", "Use the numbered-list button.", "Numbered steps show the order to do things in.", W.list(3, "ol")),
      ck("bold", "The final event date is bold", "Select the date and press B.", "The date everyone must remember should stand out.", W.format("bold")),
    ],
    solution: "<h1>Cleanliness Week plan</h1><p>Our school will run a cleanliness week from 16 to 20 March to reduce litter in the playground and classrooms, and to teach every class how to separate waste correctly, with daily checks and a prize for the cleanest class.</p><h2>Tasks</h2><table><tbody><tr><td>Task</td><td>Owner</td><td>Date</td></tr><tr><td>Make posters</td><td>Art club</td><td>9 March</td></tr><tr><td>Label the bins</td><td>Eco team</td><td>12 March</td></tr><tr><td>Daily class checks</td><td>Monitors</td><td>16 to 20 March</td></tr></tbody></table><h2>Sharing</h2><p>Teachers get Viewer access, the student council gets Commenter access and the three organisers get Editor access, so only the organisers change the plan.</p><h2>Next steps</h2><ol><li>Share this plan with the principal for approval</li><li>Book the assembly slot</li><li>Order the bin labels</li></ol><p><b>Final event: Friday 20 March</b></p>",
  }),
];
