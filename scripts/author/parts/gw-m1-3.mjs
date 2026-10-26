import { bars, example, flow, list, mistakes, module_, p, table, tip, topic, tryIt, warn } from "../kit.mjs";

/* ------------------------------------------------------------------------------------------------ module 1 */
export const M1 = module_({
  slug: "drive-and-sharing", title: "Your account, Drive and sharing", hours: 2, level: "Getting started",
  summary: "Understand what a Google Account and Workspace are, keep files organised in Drive, and share them with exactly the right access.",
  outcome: "You can find your way around Drive, name and organise files, and share work safely with a person, a team or the world.",
  intro: "Google Workspace is a set of connected tools (Docs, Sheets, Slides, Forms, Drive, Gmail, Calendar and Meet) that live in the browser. Everything you make is **saved automatically to the cloud**, so you can open it on any device and work on it with other people at the same time. That changes how you work: you stop emailing copies and start **sharing one living file**.",
  topics: [
    topic({
      title: "What Workspace is, and the account behind it", slug: "what-is-workspace",
      blocks: [
        p("Everything starts with a **Google Account**. Your account holds your email address, your files in Drive, your calendar and your settings. A **Workspace** account is the version a school, company or club gets from an administrator; it works like a personal account, with extra controls set by the organisation (for example, who you may share files with)."),
        table("The tools and what each is for", ["Tool", "Use it to", "Like"], [["Drive", "Store, organise and share files", "A cloud filing cabinet"], ["Docs", "Write text documents", "A word processor"], ["Sheets", "Calculate, track and chart data", "A spreadsheet"], ["Slides", "Build presentations", "A presentation tool"], ["Forms", "Collect answers with surveys and quizzes", "A survey builder"], ["Gmail, Calendar, Meet", "Email, schedule and video call", "Mail, diary and meetings"]]),
        list("What makes it different from desktop software", ["**Autosave.** There is no Save button; every change is saved as you type.", "**Real-time collaboration.** Several people can edit one file at once and see each other's cursors.", "**Version history.** Every change is recorded and you can go back.", "**Works anywhere.** A browser and your account are all you need."]),
        tip("Look for the small cloud icon near the file name. A tick means everything is saved; a spinning icon means it is still saving, so do not close the tab yet."),
        warn("Your files belong to your account. If you use a school or work account, the organisation may be able to see and manage those files, and you may lose access when you leave. Keep personal files in a personal account."),
        tryIt("You are halfway through writing in Docs and your battery dies. Is your work lost?", "No. Docs saves automatically as you type, so open the file again on any device and your work is there, up to the last few seconds."),
      ],
      points: ["A Google Account holds your files, email and settings.", "Workspace tools are linked and live in the browser.", "Everything autosaves, and several people can edit at once."],
      check: [["Which tool is mainly for collecting survey answers?", ["Docs", "Sheets", "Forms", "Slides"], 2, "Forms builds surveys and quizzes and gathers the answers."], ["What does autosave mean?", ["You must press Save often", "Changes are saved as you type", "Files are deleted after a week", "Only the owner can save"], 1, "Workspace tools save your changes continuously."]],
    }),
    topic({
      title: "Drive: find, organise and name your files", slug: "organising-drive",
      blocks: [
        p("Drive is where every file lives. The left-hand menu is your map; learn the main places and you will never lose a file."),
        table("Where things are in Drive", ["Place", "What is there"], [["My Drive", "Files and folders you own"], ["Shared with me", "Files other people gave you access to"], ["Recent", "What you opened lately, a quick way back to work"], ["Starred", "Files you marked so they are easy to find"], ["Trash", "Deleted files, kept for 30 days before they are removed for good"], ["Shared drives", "Team-owned spaces in Workspace, where files stay when a person leaves"]]),
        example("A tidy structure for a school year", "You have notes, assignments and group projects for four subjects.", ["Make one folder for the year: 2026 School.", "Inside it make a folder per subject: Maths, Science, English, Computing.", "Inside each subject, make Notes, Assignments and Group work.", "Name files with the date first: 2026-03-14 Science Lab Report v2."], "A file you can find in two clicks is a file you will use."),
        list("Naming rules that save time", ["Start with the **date** (year-month-day) so files sort in order.", "Say **what it is**, not Untitled or Final.", "Use **v1, v2, v3** for versions; do not call anything Final.", "Keep names short; avoid special characters."]),
        mistakes(["Leaving files as Untitled document.", "Making folders inside folders ten levels deep.", "Keeping everything on the Drive home screen.", "Emptying the Trash without checking what is in it."]),
        tip("Press **Shift+Z** on a selected file to add it to a second folder without copying it, a shortcut: one file, two places."),
      ],
      points: ["My Drive is yours; Shared with me is other people's files you can access.", "Trash keeps deleted files for 30 days.", "A date first, a clear name and a simple folder tree keep Drive usable."],
      check: [["Where do you find files other people shared with you?", ["Trash", "Shared with me", "Starred", "Settings"], 1, "Shared with me lists files others gave you access to."], ["Which file name is best?", ["Final", "2026-03-14 Science Lab Report v2", "Untitled document", "asdf"], 1, "It has a date, a clear subject and a version."]],
    }),
    topic({
      title: "Sharing: the right access for each person", slug: "sharing-access",
      blocks: [
        p("Click **Share** on any file and you decide **who** can open it and **what** they can do. Choosing carefully is the most valuable security skill in Workspace."),
        table("Access levels", ["Role", "Can", "Cannot", "Good for"], [["Viewer", "Read, download (unless the owner turns it off)", "Change or comment", "Parents, the public, final copies"], ["Commenter", "Read, comment, suggest changes", "Change the text directly", "Teachers and reviewers"], ["Editor", "Read, change, and add people (unless restricted)", "Delete the file for the owner", "Co-authors and partners"]]),
        table("Who can open it", ["Setting", "Meaning"], [["Restricted", "Only the people you add by name can open it"], ["Anyone in your organisation with the link", "Everyone in your school or company who has the link"], ["Anyone with the link", "Anyone in the world who has the link, with the role you choose"]]),
        example("Choose by purpose", "You are sharing three things this week.", ["The class newsletter for parents: **Anyone with the link, Viewer**. They read; nobody edits.", "Your essay draft for the teacher: **the teacher by name, Commenter**. They suggest; you decide.", "The group report with three classmates: **each by name, Editor**."], "Start with the smallest access that gets the job done; you can always give more later."),
        warn("**Anyone with the link, Editor** means anyone who gets the link, even by accident, can change or delete your work. Use it almost never."),
        list("Habits that keep files safe", ["Add people **by email address** rather than sharing a public link when you can.", "Look at the **sharing list** (the Share dialog) before you send a link.", "When a project ends, **remove people** who no longer need access.", "Share a **folder** for a project so new files inherit the same people."]),
      ],
      points: ["Viewer reads, Commenter suggests, Editor changes.", "Restricted means only the people you name.", "Give the least access that works, and review it when a project ends."],
      check: [["A teacher should leave feedback without changing your words. Which role?", ["Viewer", "Commenter", "Editor", "Owner"], 1, "Commenters can comment and suggest but not rewrite."], ["What does 'Anyone with the link' mean?", ["Only people you named", "Anyone in the world who has the link", "Only your school", "Nobody"], 1, "Anyone who has the link can open it with the role you chose."]],
    }),
  ],
  terms: [["Google Account", "Your identity for all Google tools"], ["Autosave", "Changes are saved continuously"], ["Shared with me", "Files others gave you access to"], ["Viewer", "Can read only"], ["Commenter", "Can read, comment and suggest"], ["Editor", "Can change the file"]],
  practical: { title: "Practical: organise a Drive", intro: "Create a clean structure for something real.", steps: ["Create a folder for your current course or project with three folders inside it.", "Make or upload three files and give each a good name with the date first.", "Share the project folder with one friend as Commenter and check the sharing list.", "Star the file you use most."] },
  quiz: [
    ["Why does Workspace not have a Save button?", ["It is broken", "Everything is saved automatically", "Only owners can save", "Files are never saved"], 1, "Changes are saved continuously."],
    ["How long does Drive keep deleted files in Trash?", ["Forever", "30 days", "1 hour", "Until you log out"], 1, "Trash keeps files for 30 days before removing them permanently."],
    ["Which access suits a final newsletter for parents?", ["Anyone with the link, Editor", "Anyone with the link, Viewer", "Restricted, Editor", "Nobody"], 1, "Parents only need to read it."],
    ["A friend needs to suggest edits but not change your text. Which role?", ["Viewer", "Commenter", "Editor", "Owner"], 1, "Commenter allows comments and suggestions."],
    ["Which file name is clearest?", ["Final FINAL 2", "2026-03-14 Maths Notes v1", "Untitled", "New document (3)"], 1, "A date, a subject and a version make it clear."],
    ["Why remove people from a shared folder when a project ends?", ["To save storage", "So they cannot keep seeing or changing your files", "Because Drive requires it", "To speed up Drive"], 1, "Old access is a quiet risk."],
    ["Why is 'Anyone with the link, Editor' risky?", ["It is slow", "Anyone with the link can change or delete the file", "It hides the file", "It blocks comments"], 1, "The link may reach people you did not intend."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 2 */
export const M2 = module_({
  slug: "docs-that-work", title: "Docs that work", hours: 2, level: "Core skills",
  summary: "Write structured documents with styles and lists, work with tables, and collaborate with comments, suggestions and version history.",
  outcome: "You can produce a clear document, work on it with others without chaos, and recover from mistakes.",
  intro: "A good document is easy to **scan**: a title, headings that tell the story, short paragraphs, lists where things come in sequence. Google Docs does the layout for you if you use its **styles**. This module teaches the habits of people whose documents get read.",
  topics: [
    topic({
      title: "Styles and structure", slug: "styles-and-structure",
      blocks: [
        p("In Docs you do not make a heading by making text big and bold. You apply a **paragraph style** from the box in the toolbar (Normal text, Title, Heading 1, Heading 2, Heading 3). A real heading tells Docs, and screen readers, and search, that this is a section title."),
        table("Why use real styles", ["With real heading styles", "With big bold text"], [["The **Outline** panel lists every section so you can jump to it", "Docs does not know it is a heading"], ["Change the look of all Heading 2s in one go", "Change each one by hand"], ["Screen readers announce the structure", "A blind reader hears a wall of text"], ["A table of contents builds itself", "You type one yourself"]]),
        flow("Build a document top-down", ["Type the title and apply Title", "Write the section names and apply Heading 2", "Fill in the text under each heading", "Open the Outline to check the story"]),
        example("Structure a short report", "Water use at school: method, findings, recommendation.", ["The first line is the Title.", "Method, Findings and Recommendation are Heading 2.", "Under Findings, the three results are a bulleted list.", "Open the Outline panel: the three sections should read as a clear plan."], "If the Outline reads like a good plan, the document will read well."),
        tip("Shortcuts: **Ctrl+Alt+1** for Heading 1, **Ctrl+Alt+2** for Heading 2, **Ctrl+Alt+0** for Normal text. **Ctrl+/** shows every shortcut."),
        mistakes(["Pressing Enter twice for space instead of changing paragraph spacing.", "Using spaces or the Tab key to line things up: use a table or a list.", "Ten different fonts: pick one or two and stay with them.", "A heading at the bottom of a page with its text on the next page."]),
      ],
      points: ["Use paragraph styles for titles and headings.", "The Outline panel shows your structure.", "Real structure helps readers, screen readers and search."],
      check: [["How do you make a real heading in Docs?", ["Make text big and bold", "Apply a heading style", "Underline it", "Press Enter twice"], 1, "A heading style tells Docs it is a section title."], ["What does the Outline panel show?", ["Spelling mistakes", "The headings of your document", "Your contacts", "The word count only"], 1, "It lists the headings so you can jump around."]],
    }),
    topic({
      title: "Lists, tables and tidy layout", slug: "lists-and-tables",
      blocks: [
        p("Use a **list** when items belong together, and a **table** when facts line up in rows and columns. Both are faster to read than a paragraph."),
        table("List or table?", ["You have...", "Use", "Example"], [["Items in no particular order", "Bulleted list", "Things to bring"], ["Steps in a sequence", "Numbered list", "Instructions, action items"], ["Things with several facts each", "Table", "Name, role, phone"], ["Tasks to tick off", "Checklist", "A packing list"]]),
        example("Meeting minutes", "You took rough notes in a meeting.", ["Make the first line a Title and give each part a Heading 2.", "Turn the three names and their roles into a three-row, two-column table.", "Turn the actions into a numbered list and bold the deadline."], "Minutes with a table and numbered actions are faster to act on than a page of text."),
        list("Table tips", ["Put the **headings** in the first row and make them bold.", "Keep **one fact per cell**.", "Avoid tables for layout: use them for data only.", "Use **Format > Table > Table properties** to set borders and padding."]),
        tip("To add a row at the end of a table, click in the last cell and press **Tab**."),
        warn("Do not use a table to position pictures or to fake columns of text. Screen readers read tables cell by cell and become confusing."),
      ],
      points: ["Lists for items; tables for facts in rows and columns.", "Numbered lists show order; bulleted lists do not.", "Header row first, one fact per cell."],
      check: [["Which is best for the steps of a recipe?", ["Bulleted list", "Numbered list", "Table", "Heading 1"], 1, "Steps happen in order, so number them."], ["When should you use a table?", ["To fake columns of text", "For facts that line up in rows and columns", "For a title", "For colour"], 1, "Tables are for data."]],
    }),
    topic({
      title: "Comments, suggestions and version history", slug: "comments-suggestions",
      blocks: [
        p("Docs has three tools that let people work on one file without stepping on each other."),
        table("Three collaboration tools", ["Tool", "What it does", "Use when"], [["Comment", "A note attached to a selection; can be replied to and resolved", "You have a question or a general note"], ["Suggesting mode", "Your edits appear as suggestions the owner can accept or reject", "You edit someone else's work and want them to decide"], ["Version history", "Every earlier version, with who changed what", "You need to go back, or see who made a change"]]),
        flow("A review round that works", ["Author shares the draft as Commenter or Editor", "Reviewers use Suggesting mode and comments", "Author accepts or rejects each suggestion", "Author resolves comments and names the version"]),
        example("Recover from a mistake", "Someone deleted a whole section last night.", ["Open **File > Version history > See version history**.", "Pick last night's version from the list.", "Read it, then choose **Restore this version**, or copy only the lost section back."], "Version history means no mistake in a shared document is permanent."),
        list("Etiquette for shared documents", ["Use **comments and @mentions** to ask a person a question; they get an email.", "Switch to **Suggesting** when editing someone else's text.", "**Resolve** a comment when it is dealt with; do not delete other people's comments.", "**Name a version** (File > Version history > Name current version) before big changes."]),
        tip("Type **@** followed by a name in a comment to notify that person and, if they cannot yet see the file, offer to share it."),
      ],
      points: ["Comments ask, suggestions propose, version history restores.", "Use Suggesting mode on other people's text.", "Name a version before a big change."],
      check: [["You are editing a classmate's essay and want them to approve each change. Use:", ["Editing mode", "Suggesting mode", "Viewing mode", "Print preview"], 1, "Suggestions can be accepted or rejected one by one."], ["Where can you go back to last night's version?", ["Version history", "Trash", "Outline", "Explore"], 0, "Version history lists every earlier version."]],
    }),
  ],
  terms: [["Paragraph style", "Title, Heading 1, Normal text and so on"], ["Outline", "A panel listing the headings"], ["Suggesting mode", "Edits appear as suggestions to accept or reject"], ["Comment", "A note attached to text"], ["Version history", "Every earlier version of a file"], ["@mention", "Notifies a person inside a comment"]],
  practical: { title: "Practical: a well-structured document", intro: "Write a one-page document on a topic you know.", steps: ["Write a title and three section headings using heading styles.", "Add a bulleted list and a small table.", "Share it with a friend as Commenter and ask them to leave two comments.", "Reply to the comments, resolve them, and name the final version."] },
  quiz: [
    ["Why use heading styles instead of big bold text?", ["They look nicer", "Docs, screen readers and search understand the structure", "They are shorter", "Bold is forbidden"], 1, "Real headings carry meaning as well as looks."],
    ["Which tool shows your edits as proposals?", ["Comment", "Suggesting mode", "Print", "Explore"], 1, "Suggesting mode lets the owner accept or reject."],
    ["What do you use to see who changed a sentence yesterday?", ["Outline", "Version history", "Word count", "Spelling check"], 1, "Version history records who changed what."],
    ["Which is the better choice for a sequence of steps?", ["A bulleted list", "A numbered list", "A heading", "A footer"], 1, "Numbers show order."],
    ["Why avoid a table for layout?", ["It looks bad", "Screen readers read it cell by cell and it becomes confusing", "Tables are slow", "Docs forbids it"], 1, "Tables are for data."],
    ["What does resolving a comment do?", ["Deletes the document", "Marks the note as dealt with", "Locks the file", "Emails everyone"], 1, "Resolving closes the conversation and keeps it in history."],
    ["Pressing Enter twice for extra space is a poor habit because:", ["It is illegal", "It makes empty paragraphs; use paragraph spacing instead", "It deletes text", "It uses more storage"], 1, "Empty paragraphs create messy spacing and structure."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 3 */
export const M3 = module_({
  slug: "sheets-for-teams", title: "Sheets for teams", hours: 2.5, level: "Core skills",
  summary: "Use Sheets to calculate, flag, summarise and chart, and to keep clean data a team can trust.",
  outcome: "You can build a shared tracker or budget with formulas, drop-down choices, filters and a chart.",
  intro: "Sheets is Google's spreadsheet. If you have used a spreadsheet before, you already know the grid, the formula bar and the way formulas begin with an equals sign. What makes Sheets special is that a whole team can **edit the same data at once**, so it becomes the place for trackers, budgets and shared lists.",
  topics: [
    topic({
      title: "Formulas and functions that you use every week", slug: "formulas-and-functions",
      blocks: [
        p("A formula begins with `=` and can use cell references (`B2`), operators (`+ - * /`) and functions (`SUM`, `AVERAGE`, `IF`, `COUNTIF`). Change a cell and every formula that depends on it updates."),
        table("Functions worth knowing first", ["Function", "Does", "Example"], [["SUM", "Adds numbers", "=SUM(D2:D4)"], ["AVERAGE", "The mean", "=AVERAGE(B2:B20)"], ["IF", "Chooses between two answers", "=IF(B2<15,\"Remind\",\"OK\")"], ["COUNTIF", "Counts matching cells", "=COUNTIF(C2:C6,\"Remind\")"], ["SUMIF", "Adds matching rows", "=SUMIF(A2:A7,\"Pen\",B2:B7)"], ["TODAY", "Today's date", "=TODAY()"]]),
        example("A class-trip budget", "25 students; two buses at 6,000 each; tickets 150 each; lunch 120 each.", ["Cost of each line: quantity times price, `=B2*C2`.", "Total: `=SUM(D2:D4)`, which is 18,750.", "Each student pays: `=D5/B6`, which is 750.", "Change the price of a ticket and the total and the share update by themselves."], "Never type a calculated number; let a formula calculate it."),
        list("Things that are only in Sheets", ["`IMPORTRANGE` pulls data from another spreadsheet, so one sheet can feed another.", "`QUERY` filters and groups data with a few words, a bit like a small database question.", "`ARRAYFORMULA` fills a whole column from one formula.", "`GOOGLEFINANCE` and `GOOGLETRANSLATE` bring in live prices and translations."]),
        tip("Type = in a cell and start a function name: Sheets suggests it and shows a hint of the arguments. Press Tab to accept."),
        warn("Dates and numbers typed with the wrong format become text and will not calculate. If a SUM looks wrong, check that the numbers are right-aligned."),
      ],
      points: ["Formulas start with = and update when cells change.", "SUM, AVERAGE, IF, COUNTIF and SUMIF cover most weekly jobs.", "Let formulas calculate; do not type results."],
      check: [["Which function counts how many cells say Remind?", ["SUM", "COUNTIF", "AVERAGE", "TODAY"], 1, "COUNTIF counts the cells that match a condition."], ["Why use a formula instead of typing a total?", ["It looks professional", "It updates when the numbers change", "Typing is forbidden", "It prints faster"], 1, "Formulas keep results correct as data changes."]],
    }),
    topic({
      title: "Clean data: formats, drop-downs and validation", slug: "clean-data",
      blocks: [
        p("Shared sheets go wrong when people type things in different ways: *Yes*, *yes*, *Y*, *yeah*. A team tracker is only as good as its data, so make the right answer the **easy** answer."),
        table("Tools that keep data clean", ["Tool", "What it does", "Where"], [["Drop-down (data validation)", "Lets people choose from a list instead of typing", "Data > Data validation"], ["Number and date formats", "Make 0.256 show as 25.6% and a number show as a date", "Format > Number"], ["Conditional formatting", "Colours a cell by its value, for example red when overdue", "Format > Conditional formatting"], ["Freeze rows", "Keeps the headings visible while you scroll", "View > Freeze"], ["Protected ranges", "Stops people editing formulas and headings", "Data > Protect sheets and ranges"]]),
        example("A task tracker", "Five people update a task list.", ["Status column: add a drop-down with Not started, In progress, Done.", "Conditional formatting: green when Done, amber when In progress.", "Freeze the heading row so it stays visible.", "Protect the formula column that counts tasks so nobody overwrites it."], "People pick instead of type, so the counts are right every time."),
        list("Rules of a tidy shared sheet", ["One row per item, one fact per column.", "A heading row, and no merged cells in the data.", "No blank rows inside the table.", "Inputs and formulas in separate columns, formulas protected."]),
        mistakes(["Merged cells in the middle of data, which break sorting and filtering.", "Typing units into number cells (500 kg) so they become text.", "Colour used as the only way to show status: also write the word."]),
      ],
      points: ["Drop-downs and validation keep data consistent.", "Conditional formatting shows status at a glance.", "Freeze headings, protect formulas, avoid merged cells."],
      check: [["What stops five people typing the same answer five different ways?", ["A bigger font", "A drop-down list", "A merged cell", "Autosave"], 1, "A drop-down makes the correct answer the easy answer."], ["Why avoid merged cells in the data?", ["They are ugly", "They break sorting and filtering", "They cost money", "They hide formulas"], 1, "Data tools expect one value per cell."]],
    }),
    topic({
      title: "Sorting, filtering and charting", slug: "sort-filter-chart",
      blocks: [
        p("Once the data is clean, three moves turn it into answers: **sort** it, **filter** it, **chart** it."),
        table("Sort, filter or filter view?", ["Move", "Effect", "Who sees it"], [["Sort range", "Rearranges rows, for everyone", "Everyone (it changes the data order)"], ["Filter", "Hides rows that do not match", "Everyone who opens the sheet (it is saved with the sheet)"], ["Filter view", "Your own filter and sort, saved by name", "Only you, until you share it"]]),
        bars("Sessions attended (a bar chart compares people at a glance)", [["Anil", 18], ["Bhavna", 12], ["Chirag", 15], ["Deepa", 9], ["Eshan", 20]]),
        example("A chart that answers a question", "Which members attended fewest sessions?", ["Select the names and the sessions columns.", "Insert > Chart and choose a Column chart.", "Sort the data from lowest to highest first so the shortest bars sit on one side.", "Give the chart a title that states the point: Four members are below 15 sessions."], "A chart should answer a question, not decorate a sheet."),
        warn("Always sort the whole table, not a single column. If you sort one column alone the other columns stay where they were and every row is now wrong."),
        tip("Use a **filter view** when you only want to look at your own tasks; a normal filter would change what everybody else sees."),
      ],
      points: ["Sort the whole table; filter to focus; chart to answer a question.", "A filter view is private to you.", "Give charts a title that states the finding."],
      check: [["Which tool lets you filter without changing what others see?", ["Sort range", "Filter view", "Merge cells", "Freeze"], 1, "A filter view is your own saved view."], ["Why sort the whole table rather than one column?", ["It is faster", "Rows would no longer match across columns", "Excel forbids it", "It saves memory"], 1, "The other columns would stay put and the rows would be wrong."]],
    }),
  ],
  terms: [["Formula", "A calculation starting with ="], ["Data validation", "Rules or drop-downs that limit what can be typed"], ["Conditional formatting", "Colour that changes with the value"], ["Filter view", "A private saved filter and sort"], ["IMPORTRANGE", "Pulls data from another spreadsheet"], ["Protected range", "Cells others cannot edit"]],
  practical: { title: "Practical: a team tracker", intro: "Build a tracker you could really share.", steps: ["Make a table of at least eight tasks with owner, due date and status.", "Add a drop-down for status and colour the cells with conditional formatting.", "Add a COUNTIF that counts the tasks not yet done.", "Freeze the heading row and protect the formula cell."] },
  quiz: [
    ["What does every formula begin with?", ["A dollar sign", "An equals sign", "A hash", "A bracket"], 1, "A formula starts with =."],
    ["Which function adds only the rows that match a condition?", ["SUM", "SUMIF", "COUNT", "TODAY"], 1, "SUMIF adds matching rows."],
    ["Which Sheets function pulls data from another spreadsheet?", ["IMPORTRANGE", "SUMIF", "ROUND", "FREEZE"], 0, "IMPORTRANGE links sheets together."],
    ["A drop-down list in a cell is made with:", ["Format > Number", "Data validation", "A chart", "Merge cells"], 1, "Data validation limits what can be entered."],
    ["Why not use colour alone for status?", ["Colour is expensive", "Some people cannot see the difference, so also write the word", "Colour breaks formulas", "Sheets does not support colour"], 1, "Accessible sheets do not rely on colour alone."],
    ["Which is private to you?", ["A sorted range", "A filter view", "A chart", "A protected range"], 1, "A filter view is saved for you."],
    ["A SUM gives a surprisingly low answer. One likely cause is:", ["Numbers stored as text", "A bold heading", "A frozen row", "A chart"], 0, "Text numbers are skipped by SUM."],
  ],
});
