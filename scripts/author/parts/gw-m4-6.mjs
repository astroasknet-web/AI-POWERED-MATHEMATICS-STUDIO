import { bars, example, flow, list, mistakes, module_, p, table, tip, topic, tryIt, warn } from "../kit.mjs";

/* ------------------------------------------------------------------------------------------------ module 4 */
export const M4 = module_({
  slug: "slides-that-present", title: "Slides that present", hours: 2, level: "Core skills",
  summary: "Plan a talk, build clear slides with themes, layouts and diagrams, and present with notes and confidence.",
  outcome: "You can make a short deck that supports your voice instead of competing with it, and present it from Slides.",
  intro: "Slides support a talk; they are not the talk. The best decks have **few words, one idea per slide** and a design that stays out of the way. Google Slides gives you themes, layouts and shapes; your job is to use them lightly.",
  topics: [
    topic({
      title: "Plan the talk before you open Slides", slug: "plan-first",
      blocks: [
        p("The most common mistake is opening Slides and typing. A talk starts as a **message**, a handful of points and a sense of who is listening."),
        flow("Plan in four steps", ["Who is listening and what do they need?", "Write the message in one sentence", "Choose three main points", "Sketch one headline per slide on paper"]),
        table("A simple five-slide structure for a short pitch", ["Slide", "Job", "Example"], [["1. Title", "Name the topic", "Recycle Right"], ["2. The problem", "Why should anyone care?", "One bin for everything"], ["3. Our idea", "What you propose", "Three labelled bins"], ["4. What we need", "The ask", "Two bins, posters, ten minutes"], ["5. Thank you", "Close and invite questions", "Questions?"]]),
        example("From message to slides", "Your message: *Three labelled bins will cut our waste.*", ["Point 1: today every item goes in one bin.", "Point 2: three bins separate paper, plastic and food.", "Point 3: students and posters make it easy.", "Each point becomes a slide whose **title is the point**, with two or three short bullets."], "A slide title that says the point (not just a topic) is the single best habit."),
        tip("Write the slide titles in a Doc first. If the titles read like a story, the deck will too."),
        warn("If your slide has a paragraph on it, your audience will read it and stop listening to you. Put the detail in the speaker notes."),
      ],
      points: ["Plan the message and three points before building.", "A slide title that states the point beats a topic label.", "Detail goes in speaker notes, not on the slide."],
      check: [["What should you decide first?", ["The theme colour", "Who is listening and your one-sentence message", "The font size", "The animation"], 1, "Everything else depends on the message and the audience."], ["Where does the detail go?", ["On the slide in small text", "In the speaker notes", "In the footer", "Nowhere"], 1, "Notes hold what you say; the slide holds the point."]],
    }),
    topic({
      title: "Themes, layouts and readable slides", slug: "themes-and-layouts",
      blocks: [
        p("A **theme** sets the fonts, colours and background for every slide. A **layout** sets where things go on one slide (title, title and body, two columns, section header). Use them and your deck looks consistent with almost no effort."),
        table("Choosing a layout", ["You want...", "Layout"], [["To open the talk", "Title slide"], ["A point with a few bullets", "Title and body"], ["A before-and-after or two lists", "Two columns"], ["To mark a new part", "Section header"], ["A picture to speak for itself", "Title only or blank, with the picture"]]),
        list("Rules for readable slides", ["**Few words.** Aim for no more than about five short bullets, and each bullet a few words.", "**Large text.** Nothing smaller than about 24 points; if it will not fit, split the slide.", "**High contrast.** Dark text on a light background, or the reverse, never grey on grey.", "**One idea per slide.**", "**Consistent.** Change the theme once in the master, not slide by slide."]),
        bars("Words on slide versus how well an audience remembers it (an illustrative guide)", [["Full sentences", 25], ["Short bullets", 55], ["One picture and a word", 85]]),
        mistakes(["Reading the slide aloud word for word.", "A different font and size on every slide.", "Text over a busy picture so it cannot be read.", "More than three colours."]),
        tip("Open **Slide > Edit theme** (the master) to change the font or colour for the whole deck at once."),
      ],
      points: ["Themes give consistency; layouts give each slide a structure.", "Few words, large text, high contrast, one idea.", "Change the master, not every slide."],
      check: [["Why use layouts?", ["To add animation", "To keep titles and text in consistent places", "To save storage", "To print faster"], 1, "Layouts put the same things in the same place on each slide."], ["How many ideas should one slide hold?", ["As many as fit", "One", "Ten", "Three paragraphs"], 1, "One idea per slide is easier to follow."]],
    }),
    topic({
      title: "Diagrams, notes and presenting", slug: "diagrams-and-presenting",
      blocks: [
        p("A diagram shows a process faster than bullets. Use **shapes and arrows** (Insert > Shape) and keep their text tiny: a box that says *Sort* beats a paragraph."),
        example("A process in four boxes", "How a bottle is reborn: collected, sorted, melted, made new.", ["Draw four rounded boxes in a row.", "Type one word in each: Collect, Sort, Melt, Make.", "Join them with arrows.", "Give the slide a title that states the point: One bottle can become a new one."], "A reader gets the whole process in two seconds."),
        list("Presenting well", ["Open **Present** (or Ctrl+F5) and **rehearse aloud** at least once.", "Use **speaker notes** (View > Show speaker notes) to hold your detail; the audience does not see them.", "Face the audience, not the screen.", "Use the **Q&A** feature in Present mode to take questions from the audience on their phones.", "Have the file open offline or exported to PDF in case the internet fails."]),
        table("Useful presenting keys", ["Key", "Does"], [["Right arrow or Space", "Next slide"], ["Left arrow", "Previous slide"], ["B", "Black screen (to focus attention on you)"], ["Esc", "Leave presenting"]]),
        warn("Never rely on the venue's internet. Download a PDF or make the deck available offline before you present."),
        tryIt("You have ten minutes. About how many slides?", "Around eight to ten. A common guide is about one to two minutes per slide, with fewer slides if each has an idea that takes time to explain."),
      ],
      points: ["Shapes and arrows show a process quickly.", "Speaker notes hold detail the audience does not need to read.", "Rehearse aloud and keep an offline copy."],
      check: [["Where does detail you will say aloud belong?", ["On the slide", "In speaker notes", "In the theme", "In the title"], 1, "Notes are visible only to you."], ["What is a sensible backup if the internet fails?", ["Hope", "An exported PDF or an offline copy", "A bigger screen", "Fewer slides"], 1, "A local copy works without the internet."]],
    }),
  ],
  terms: [["Theme", "Fonts, colours and background for the whole deck"], ["Layout", "Where things sit on one slide"], ["Master", "The template all slides inherit from"], ["Speaker notes", "Your private notes under each slide"], ["Present mode", "Full-screen slideshow"], ["Q&A", "A way for the audience to ask questions during the talk"]],
  practical: { title: "Practical: a two-minute talk", intro: "Prepare and present a short talk on something you care about.", steps: ["Write your message and three points on paper.", "Build five slides: title, three points, thank you.", "Add a diagram on one slide and speaker notes on all.", "Rehearse out loud, time yourself, and cut anything that does not fit."] },
  quiz: [
    ["What should you do before opening Slides?", ["Choose animations", "Decide the message and main points", "Pick a font", "Add photos"], 1, "Planning comes first."],
    ["A good slide title:", ["Names a topic only", "States the point", "Is as long as possible", "Is hidden"], 1, "A title that states the point guides the audience."],
    ["How much text should a slide have?", ["A full page", "A few short bullets", "Two paragraphs", "No limit"], 1, "Few words keeps people listening to you."],
    ["Where do you change the font for the whole deck?", ["On each slide", "In the theme or master", "In the footer", "In Drive"], 1, "The master controls every slide."],
    ["Which key blanks the screen during a talk?", ["B", "Q", "Z", "F"], 0, "B gives a black screen."],
    ["Why prepare an offline copy?", ["It looks nicer", "The venue internet may fail", "It is required", "It saves storage"], 1, "A local copy removes the risk."],
    ["What do speaker notes hold?", ["The slide's picture", "What you will say, visible only to you", "The theme", "Comments from the audience"], 1, "Notes are for the presenter."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 5 */
export const M5 = module_({
  slug: "forms-and-surveys", title: "Forms and surveys", hours: 2, level: "Applied skills",
  summary: "Design a form that people will finish, choose the right question types, and turn the answers into something useful.",
  outcome: "You can plan, build and read a survey or quiz, and avoid the mistakes that spoil results.",
  intro: "Forms collects answers from many people and puts every response in a Sheet automatically. It is the right tool for sign-ups, feedback, quizzes and registrations. A good form is **short, clear and aimed at one decision**.",
  topics: [
    topic({
      title: "Ask the right question the right way", slug: "question-types",
      blocks: [
        p("The question type decides how easy it is to answer and how easy it is to analyse. Choose the type that **limits** the answer to what you can use."),
        table("Question types", ["Type", "Use for", "Example"], [["Multiple choice", "One answer from a short list", "Which lunch slot do you prefer?"], ["Checkboxes", "Several answers from a list", "Which clubs would you join?"], ["Drop-down", "One answer from a long list", "Which class are you in?"], ["Linear scale", "A rating you can average", "Rate the workshop from 1 to 5"], ["Short answer", "A word or number", "Your admission number"], ["Paragraph", "An open opinion", "What would you change?"], ["Date or time", "A clean date", "When would you like the meeting?"]]),
        example("Good and poor wording", "You want feedback on a workshop.", ["Poor: *Was the workshop good and useful?* Two questions in one; nobody knows which to answer.", "Better: *How useful was the workshop? (1 not at all to 5 very)*.", "Poor: *Don't you agree the workshop was excellent?* A leading question.", "Better: *What would you change about the workshop?*"], "Ask one thing at a time, in neutral words."),
        list("Rules for good questions", ["**One question, one idea.**", "**Neutral wording**: do not push people towards an answer.", "**A fixed list** wherever you can, so answers can be counted.", "**Mark essential questions Required**, and nothing else.", "**Keep it short.** Every extra question loses some people."]),
        mistakes(["Asking for information you will not use.", "Two questions in one.", "Scales without labels at each end.", "Making every question Required."]),
      ],
      points: ["Choose the type that limits the answer to what you can count.", "One question, one idea, neutral wording.", "Only mark essential questions Required."],
      check: [["Which type suits 'Which of these would you join? (pick any)'?", ["Multiple choice", "Checkboxes", "Date", "Paragraph"], 1, "People may choose several, so use checkboxes."], ["Which wording is better?", ["Don't you agree the workshop was excellent?", "How useful was the workshop, from 1 to 5?", "Was it good and useful and fun?", "Tell us everything"], 1, "A neutral, single, answerable question."]],
    }),
    topic({
      title: "Build, share and protect a form", slug: "build-and-share",
      blocks: [
        p("A form is built from **questions** grouped into **sections**. Settings decide who can fill it and how."),
        flow("From idea to responses", ["Draft the questions in a Doc", "Build the form and set Required questions", "Preview and test it yourself", "Share the link, then watch Responses"]),
        table("Important settings", ["Setting", "What it does", "Use it when"], [["Required", "The question must be answered", "You really need the answer"], ["Response validation", "Checks the answer fits a rule (a number, an email, a length)", "You want clean data"], ["Sections", "Splits a long form into pages", "A form has more than about ten questions"], ["Limit to 1 response", "Each person can answer once (they must sign in)", "A vote or a registration"], ["Quiz mode", "Gives a score and feedback", "A test, not a survey"], ["Collect email addresses", "Records who answered", "You need to follow up, and have told them"]]),
        list("Before you send", ["Fill it in yourself on a phone.", "Ask one other person to try it.", "Check the thank-you message and the closing date.", "Do not ask for passwords or sensitive information."]),
        warn("Never ask for passwords, card numbers or other sensitive details in a form. A form is not a secure place for secrets, and people should not be trained to type them into links."),
        tip("Responses land in a linked Sheet (Responses > Link to Sheets). Use it for charts and for formulas such as COUNTIF."),
      ],
      points: ["Draft first, build, preview, then share.", "Validation and Required keep the data clean.", "Never ask for passwords or card details."],
      check: [["Which setting stops a vote from being answered twice by the same person?", ["Required", "Limit to 1 response", "Sections", "Paragraph"], 1, "It allows one response per signed-in person."], ["Where should you check the form before sharing?", ["Only on your laptop", "Fill it in yourself, ideally on a phone too", "Nowhere", "In Drive"], 1, "Test it as a respondent would."]],
    }),
    topic({
      title: "Read the results", slug: "read-results",
      blocks: [
        p("Forms shows a summary of each question as a chart, and keeps every response as a row in a Sheet. Use both."),
        table("Where to look", ["View", "Good for"], [["Summary", "A quick picture: pie charts for choices, bars for scales, a list for open answers"], ["Question", "The answers to one question at a time"], ["Individual", "One person's whole response"], ["Linked Sheet", "Sorting, filtering, formulas and your own charts"]]),
        example("Turn feedback into a decision", "Forty people rated a workshop 1 to 5 and wrote one open comment.", ["In the linked Sheet find the average rating with `=AVERAGE(B2:B41)`.", "Count how many gave 4 or 5: `=COUNTIF(B2:B41,\">=4\")`.", "Read the open comments and group them under two or three themes.", "Write one sentence of insight and one action."], "A survey is only useful when it ends in a decision."),
        warn("A small, self-selected sample can mislead. If only the keenest people answered, the results may be more positive than the whole group feels. Say how many people answered."),
        list("A short report from a survey", ["How many people answered, out of how many asked.", "The two or three most important findings, with numbers.", "A chart for the one finding that matters most.", "What you will do about it."], true),
      ],
      points: ["Use the Summary for a quick picture and the linked Sheet for analysis.", "Say how many people answered.", "End with a decision."],
      check: [["Where do you do your own calculations on responses?", ["In the form editor", "In the linked Sheet", "In Slides", "In Gmail"], 1, "Responses are saved as rows in a Sheet."], ["Why say how many people answered?", ["To look big", "A small or self-selected group may not represent everyone", "Because Forms requires it", "To save space"], 1, "Readers need to judge how far to trust the result."]],
    }),
  ],
  terms: [["Form", "A set of questions that collects responses"], ["Required", "A question that must be answered"], ["Response validation", "A rule an answer must meet"], ["Linked Sheet", "The Sheet that stores responses"], ["Quiz mode", "A form with scoring and feedback"], ["Sample", "The people who answered"]],
  practical: { title: "Practical: a feedback form", intro: "Collect feedback on something real, such as a club or a class.", steps: ["Draft six questions in a Doc: two choices, a rating and an open question.", "Build the form and mark only the essential questions Required.", "Test it on a phone and ask three friends to answer.", "Link it to a Sheet and write one sentence of insight."] },
  quiz: [
    ["Which type suits a 1 to 5 rating?", ["Linear scale", "Paragraph", "Date", "Checkboxes"], 0, "A scale can be averaged."],
    ["What is wrong with 'Was the workshop good and useful?'", ["Nothing", "It asks two things at once", "It is too short", "It needs a date"], 1, "Ask one question at a time."],
    ["When should a question be Required?", ["Always", "Only when you really need the answer", "Never", "Only the first"], 1, "Too many Required questions make people leave."],
    ["Which setting limits each person to one response?", ["Limit to 1 response", "Quiz mode", "Section", "Paragraph"], 0, "It requires sign-in and allows one response."],
    ["Where are responses stored for analysis?", ["A linked Sheet", "Drive trash", "Slides", "Calendar"], 0, "Responses are saved as rows in a Sheet."],
    ["Why should a form never ask for passwords?", ["Passwords are long", "A form is not a secure place for secrets", "Forms are slow", "Only teachers may ask"], 1, "People should never be trained to type passwords into links."],
    ["What should you report along with survey results?", ["Only the best answers", "How many people answered", "The form's colour", "Nothing"], 1, "Readers need the size of the sample."],
  ],
});

/* ------------------------------------------------------------------------------------------------ module 6 */
export const M6 = module_({
  slug: "collaborate-and-stay-safe", title: "Collaborate and stay safe", hours: 1.5, level: "Professional skills",
  summary: "Work together smoothly with Calendar and Meet, keep your account and files safe, and run a small project across Drive, Docs, Sheets and Slides.",
  outcome: "You can coordinate a team project in Workspace and protect your account from the most common problems.",
  intro: "Tools are only half of working together. The other half is **habits**: where decisions are recorded, who can see what, and how to avoid the mistakes that cost teams a day. This module ties the tools into a way of working, and teaches the few safety habits that matter most.",
  topics: [
    topic({
      title: "A way of working for a team", slug: "team-way-of-working",
      blocks: [
        p("Teams that work well in Workspace follow a small number of rules. They are simple, and they save a lot of confusion."),
        table("A simple team setup", ["Need", "Tool", "Habit"], [["One place for all files", "A shared folder in Drive", "Everything for the project lives there, with a clear folder tree"], ["The plan", "A Doc", "Goals, owners and dates in one document with headings and a task table"], ["Who does what by when", "A Sheet", "A tracker with owner, due date and status drop-downs"], ["Talking things through", "Meet and chat", "Short calls with an agenda and notes written afterwards"], ["Dates everyone sees", "Calendar", "Add milestones and invite the team so they appear on everyone's calendar"], ["Showing progress", "Slides", "One short deck for each update"]]),
        example("Run a school event", "Five students organise a cleanliness week.", ["Make a shared folder, Cleanliness Week, and share it with the five students as Editors and the teacher as Commenter.", "Write the plan in one Doc: goals, a task table with owners and dates, and next steps.", "Track progress in a Sheet with a Status drop-down.", "Put each milestone on a shared Calendar and use Meet for a ten-minute check-in each Monday."], "One folder, one plan, one tracker: nobody asks which version is the latest."),
        list("Habits that keep a team out of trouble", ["**One source of truth.** Link to the file; do not email attachments.", "**Name an owner** for every task and every file.", "**Write decisions down** in the Doc, not only in chat.", "**Meet with an agenda**, and end with who does what by when."]),
        tip("Paste a Drive link into an email or chat instead of attaching the file. Everyone then opens the same, latest copy."),
      ],
      points: ["One shared folder, one plan, one tracker.", "Link to files; do not email copies.", "Name an owner, and write decisions down."],
      check: [["Why share a link instead of emailing an attachment?", ["Links are shorter", "Everyone sees the same latest version", "Attachments are illegal", "Links are faster"], 1, "A link points at one living file."], ["What belongs in the task tracker?", ["Only ideas", "Owner, due date and status for each task", "Pictures", "Passwords"], 1, "A tracker shows who does what by when."]],
    }),
    topic({
      title: "Calendar and Meet", slug: "calendar-and-meet",
      blocks: [
        p("**Calendar** shows when things happen; **Meet** is where a call happens. Together they replace most of the 'when are we meeting?' messages."),
        table("Good calendar habits", ["Do", "Because"], [["Give every event a clear title and a description with the agenda", "People know why they are invited"], ["Add a Meet link to the event", "Everyone joins with one click"], ["Check availability before you invite", "Avoids clashes"], ["Add reminders", "Fewer missed meetings"], ["Attach the notes Doc to the event", "The meeting and its notes stay together"]]),
        list("Running a good meeting", ["Share the **agenda** in the event description.", "Start on time and **name a note-taker**.", "Use **Present** to share the screen when you review a Slides deck or a Sheet.", "End by reading the **actions** aloud: who, what, by when.", "Send the notes **the same day**."], true),
        warn("Be careful about recording or sharing a call: ask everyone first, and check the rules of your school or organisation."),
        tryIt("A meeting runs over. What is the most useful thing to do in the last minute?", "Read out the actions: who does what by when. Then the next steps are clear even if the discussion was long."),
      ],
      points: ["A clear title, an agenda and a Meet link make a good event.", "Attach the notes Doc to the event.", "End meetings by reading out the actions."],
      check: [["What should an event description contain?", ["Nothing", "The agenda", "A joke", "A password"], 1, "An agenda tells people what the meeting is for."], ["How do you end a meeting well?", ["Say goodbye", "Read the actions: who, what, by when", "Delete the notes", "Start another meeting"], 1, "Clear actions are the point of a meeting."]],
    }),
    topic({
      title: "Keep your account and files safe", slug: "stay-safe",
      blocks: [
        p("Your Google Account is the key to your email, your files and often your other accounts. A few habits protect nearly all of it."),
        table("Safe and risky habits", ["Habit", "Safe or risky", "Why"], [["Turn on 2-Step Verification", "Safe", "A second proof stops someone who only has your password"], ["One strong password per account (a password manager helps)", "Safe", "A leak at one site cannot open the others"], ["One password everywhere", "Risky", "One leak opens everything"], ["Sign in only from the real Google address, typed or bookmarked", "Safe", "Avoids fake pages"], ["Typing your password into a page from an unexpected email", "Risky", "It may be a fake sign-in page"], ["Review sharing and remove people when a project ends", "Safe", "Old access is a quiet risk"], ["Anyone with the link as Editor", "Risky", "Anyone with the link can change or delete the file"]]),
        list("Spot a phishing message", ["It creates **urgency**: *Your account will close in one hour.*", "It asks you to **sign in or confirm details** through a link.", "The **sender or link looks slightly wrong**.", "It **asks for something unusual**, such as gift cards or a password.", "If in doubt, **do not click**: go to the site yourself, or ask a trusted person."]),
        example("Check your account", "Ten minutes, once in a while.", ["Open your Google Account's security page.", "Check that 2-Step Verification is on.", "Look at the devices signed in and remove any you do not know.", "Look at which apps have access and remove those you no longer use."], "Small, regular checks stop most account problems."),
        warn("No real organisation will ask you for your password by email or message. If a message asks, it is a scam."),
      ],
      points: ["Turn on 2-Step Verification and use a unique password.", "Do not click sign-in links in unexpected messages.", "Review sharing and devices from time to time."],
      check: [["What does 2-Step Verification add?", ["A longer password", "A second proof that it is really you", "More storage", "A faster login"], 1, "It protects you if your password is stolen."], ["An email says your account will close in an hour unless you sign in through its link. What do you do?", ["Click quickly", "Do not click; go to the site yourself or ask someone", "Reply with your password", "Forward it to everyone"], 1, "Urgency and a sign-in link are classic signs of phishing."]],
    }),
  ],
  terms: [["Shared folder", "One folder the whole team uses"], ["Single source of truth", "One file everyone uses"], ["2-Step Verification", "A second proof when signing in"], ["Phishing", "A fake message that tries to steal details"], ["Agenda", "What a meeting will cover"], ["Owner", "The person responsible for a task or file"]],
  practical: { title: "Practical: set up a small project", intro: "Set up a project for a group you belong to.", steps: ["Create a shared folder and add two people with the right access.", "Write a one-page plan in a Doc with a task table.", "Make a tracker Sheet with a status drop-down.", "Check your account's security settings and write down one thing you will change."] },
  quiz: [
    ["Why link to a file rather than attach it?", ["Links are prettier", "Everyone uses the same latest copy", "Attachments are slow", "Links are secret"], 1, "A link points at one living file."],
    ["What should every task have?", ["A colour", "An owner and a due date", "A picture", "A password"], 1, "Someone must be responsible, and by when."],
    ["What belongs in an event description?", ["The agenda", "Nothing", "A password", "A rumour"], 0, "An agenda tells people why they are meeting."],
    ["Which is a sign of phishing?", ["A calm, personal message", "Urgency and a link to sign in", "A plain greeting", "A long email"], 1, "Urgency plus a sign-in link is a warning sign."],
    ["What does 2-Step Verification do?", ["Makes passwords shorter", "Needs a second proof when signing in", "Deletes old files", "Speeds up Drive"], 1, "It protects the account even if the password leaks."],
    ["When a project ends you should:", ["Leave all access on", "Remove people who no longer need access", "Delete the folder", "Rename it"], 1, "Old access is a risk."],
    ["Which should you never ask for in a form or message?", ["Someone's name", "Someone's password", "Someone's class", "Someone's favourite subject"], 1, "Nobody legitimate asks for a password this way."],
  ],
});
