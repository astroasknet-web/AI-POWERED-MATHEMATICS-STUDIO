import { capstone, course } from "../kit.mjs";
import { labs, SK } from "../parts/gw-labs.mjs";
import { M1, M2, M3 } from "../parts/gw-m1-3.mjs";
import { M4, M5, M6 } from "../parts/gw-m4-6.mjs";

export default course({
  slug: "google-workspace", title: "Google Workspace (Docs, Sheets, Slides, Forms)", tagline: "Drive, Docs, Sheets, Slides, Forms and safe teamwork, with practice in every module", level: "Beginner", hours: 11.5,
  summary: "Learn the tools millions of schools and teams use every day: organise and share files in Drive, write structured Docs, track and chart data in Sheets, build and present Slides, collect answers with Forms, and work together safely. Every module has practice labs that check your work and explain what is missing.",
  modules: [M1, M2, M3, M4, M5, M6],
  capstone: capstone({
    title: "Final project: a team project plan", summary: "Write a one-page plan a team could share, and pass the final assessment.",
    intro: "You can now organise files, write clear documents, track data, present ideas, collect feedback and stay safe. In this final step you write a one-page team plan in the document lab: a title, a summary, a task table with owners and dates, a sharing plan, numbered next steps and a bold final date. Then take the final assessment, which covers the whole course.",
    steps: ["Work through the **Team project plan** lab: title, summary, task table, sharing paragraph, next steps and emphasis.", "Read your plan as if you were a teammate: could they act on it?", "Take the final assessment below."], projectTitle: "Write a one-page team project plan",
    quiz: [
      ["Which role lets someone suggest changes but not rewrite your text?", ["Viewer", "Commenter", "Editor", "Owner"], 1, "Commenters can comment and suggest."],
      ["What does autosave mean?", ["You must press Save", "Changes are saved as you type", "Files are deleted weekly", "Only owners can save"], 1, "Workspace saves continuously."],
      ["Which file name is clearest?", ["Final", "2026-03-14 Maths Notes v2", "Untitled", "asdf"], 1, "A date, a subject and a version."],
      ["How do you make a real heading in Docs?", ["Big bold text", "Apply a heading style", "Underline", "Press Enter twice"], 1, "A style tells Docs it is a heading."],
      ["Where do you go back to an earlier version of a Doc?", ["Version history", "Trash", "Explore", "Outline"], 0, "Version history lists earlier versions."],
      ["Which Sheets feature keeps answers consistent when many people type?", ["A drop-down (data validation)", "A bigger font", "A merged cell", "A chart"], 0, "Drop-downs limit answers to a list."],
      ["Why sort a whole table rather than one column?", ["It is faster", "Rows would no longer match across columns", "Sheets forbids it", "It saves storage"], 1, "The other columns would stay put."],
      ["Which function counts matching cells?", ["SUM", "COUNTIF", "TODAY", "ROUND"], 1, "COUNTIF counts the cells that match."],
      ["What should a slide title do?", ["Name a topic only", "State the point", "Be hidden", "Fill the slide"], 1, "A title that states the point guides the audience."],
      ["Where do you put detail you will say aloud?", ["On the slide", "In speaker notes", "In the theme", "In the footer"], 1, "Speaker notes are private."],
      ["Which question type suits 'pick any clubs you would join'?", ["Multiple choice", "Checkboxes", "Date", "Paragraph"], 1, "People may choose several."],
      ["What should you never ask for in a form?", ["A name", "A password", "A class", "A favourite subject"], 1, "Forms are not a safe place for secrets."],
      ["Why link a file instead of emailing a copy?", ["Links are shorter", "Everyone uses the same latest copy", "Copies are illegal", "Links are faster"], 1, "One living file avoids version confusion."],
      ["What does 2-Step Verification add?", ["A longer password", "A second proof of who you are", "More storage", "A theme"], 1, "It protects the account if the password leaks."],
      ["What is the best response to a message that creates urgency and links to a sign-in page?", ["Click quickly", "Do not click; go to the site yourself", "Reply with your password", "Forward it"], 1, "Urgency plus a sign-in link is phishing."],
      ["When a project ends you should:", ["Leave all access on", "Review and remove people who no longer need access", "Delete the folder", "Rename the folder"], 1, "Old access is a quiet risk."],
    ],
  }),
  labs,
  skills: [{ id: SK, label: "Google Workspace" }],
  badges: [
    { id: "sharing-smart", title: "Sharing smart", description: "Chose the right access for each person.", when: { all: ["g1-sharing"] } },
    { id: "doc-builder", title: "Doc builder", description: "Structured meeting minutes with headings, a table and a numbered list.", when: { all: ["g3-meeting-notes"] } },
    { id: "sheet-tracker", title: "Sheet tracker", description: "Built a budget and an attendance tracker.", when: { all: ["g5-trip-budget", "g6-attendance"] } },
    { id: "presenter", title: "Presenter", description: "Built a clear five-slide pitch.", when: { all: ["g8-pitch"] } },
    { id: "survey-maker", title: "Survey maker", description: "Chose question types and drafted a survey.", when: { all: ["g10-question-types", "g11-survey-draft"] } },
    { id: "team-planner", title: "Team planner", description: "Wrote a one-page team project plan.", when: { all: ["cap-team-plan"] } },
  ],
  landing: {
    hero: { eyebrow: "Teamwork tools · Nothing to install", title: "Google Workspace: Docs, Sheets, Slides and Forms", subtitle: "Organise Drive, write structured Docs, track data in Sheets, present with Slides, collect answers with Forms and keep your account safe, with practice labs that check your work.", level: "Beginner", outcomeLine: "After this course you can run a small project from one shared folder and keep it safe." },
    outcomes: [
      { icon: "web", title: "Organise and share", text: "Name and sort files in Drive, and share with the right access." },
      { icon: "doc", title: "Write clear documents", text: "Styles, lists, tables, comments, suggestions and version history." },
      { icon: "sheet", title: "Track and chart data", text: "Formulas, drop-downs, filters and charts in Sheets." },
      { icon: "slides", title: "Present with confidence", text: "Plan a talk, build readable slides and present with notes." },
      { icon: "ai", title: "Collect answers", text: "Choose the right question type and read the results." },
      { icon: "computer", title: "Work safely together", text: "Calendar, Meet, a team way of working and account security." },
    ],
    projects: [
      { title: "A Drive guide", text: "Naming rules and folder plan for a team.", module: "drive-and-sharing" },
      { title: "Meeting minutes", text: "Headings, a table and numbered actions.", module: "docs-that-work" },
      { title: "A trip budget and tracker", text: "Formulas, IF, COUNTIF and a chart.", module: "sheets-for-teams" },
      { title: "A project pitch", text: "Five clear slides and a diagram.", module: "slides-that-present" },
      { title: "A feedback survey", text: "Question types and a drafted form.", module: "forms-and-surveys" },
      { title: "A team project plan", text: "A shareable one-page plan.", module: "capstone" },
    ],
    tools: [{ icon: "doc", title: "Document lab", text: "A real editor with headings, lists, tables and formatting." }, { icon: "sheet", title: "Spreadsheet lab", text: "A grid with formulas, formats, charts, sorting and filters." }, { icon: "slides", title: "Slides lab", text: "Layouts, themes, bullets and shapes." }],
    assessment: ["Finish the required labs in each module: they are checked automatically and explained when something is missing.", "Pass each module quiz (70% or more). You can retry as often as you like.", "Complete the final project and the final assessment to finish the course."],
    faq: [
      { q: "Do I need a Google account?", a: "Not for this course: the practice labs run in GrowQR. To use the skills for real you will want a free Google Account, or a school or work account." },
      { q: "Do the labs work exactly like Google's own tools?", a: "They work like Docs, Sheets and Slides for everything taught here: structure, formulas, formats, layouts and checks. Google's menus move from time to time, so the lessons describe what each feature is called and what it does." },
      { q: "How long does it take?", a: "About eleven and a half hours, in short sessions. Each module takes around two hours." },
      { q: "Is there a certificate?", a: "Finishing every module and the final assessment marks the course complete on your GrowQR profile." },
    ],
  },
  catalogue: {
    hours: "~11.5 hrs", weeks: "~3 weeks", pace: "3 to 4 hrs/wk", badge: "Workspace Ready",
    brief: "Drive, Docs, Sheets, Slides, Forms and safe teamwork, with a practice lab in every module.",
    learn: ["Organising and sharing files in Drive with the right access", "Writing structured Docs with styles, lists, tables and comments", "Tracking data in Sheets with formulas, drop-downs and charts", "Planning and presenting with Slides", "Designing Forms and reading the results", "A team way of working, Calendar, Meet and account safety"],
    handsOn: "Write a one-page team project plan with a task table, a sharing plan and next steps.",
    outcome: "Run a small team project from one shared folder, confidently and safely.",
  },
});
