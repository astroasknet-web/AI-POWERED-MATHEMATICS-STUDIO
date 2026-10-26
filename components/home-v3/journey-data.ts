/**
 * The goal guide on the home page ("Your Journey. Your Goals. Your Next Step."). Each goal points at one part of GrowQR that exists: every href is a real
 * route (a test checks them against the app's own route files), and every fact on a card is something the product does today. No number is typed here
 * that the app can compute: counts come in as props from the page.
 */
import type { LucideIcon } from "lucide-react";
import { Award, BookOpen, Briefcase, Calculator, FileText, GraduationCap, Globe2, Languages, LifeBuoy, Mic, PenLine, ScanLine, Shapes, Sigma, Target, Video, Wallet } from "lucide-react";
import { CLASSROOM_URL } from "@/lib/links";
import { EBOOKS_URL } from "./data";

export type JourneyCat = "careers" | "abroad" | "exams" | "skills";
export const CATEGORIES: Array<{ key: JourneyCat; label: string; blurb: string }> = [
  { key: "careers", label: "Careers", blurb: "Score, build and prove" },
  { key: "abroad", label: "Study abroad", blurb: "Plan the move" },
  { key: "exams", label: "Exams and school", blurb: "Practise and pass" },
  { key: "skills", label: "Skills", blurb: "Learn and get faster" },
];

export interface Counts { courses: number; countries: number; templates: number }

export interface JourneyGoal {
  id: string;
  cat: JourneyCat;
  label: string;
  product: string;
  title: string;
  why: string;
  steps: string[];
  facts: string[];
  cta: string;
  href: string;
  external?: boolean;
  next: [string, string];
  icon: LucideIcon;
  /** Accent colours for this goal's panel (the home page's own palette family). */
  v: string;
  v2: string;
}

const ORANGE = ["#ff8a4c", "#ffc36b"], VIOLET = ["#7857ff", "#b39dff"], CYAN = ["#35d9ff", "#8ff0ff"], GREEN = ["#2fd39a", "#8cf0c9"], PINK = ["#ff5f8f", "#ffa3be"], GOLD = ["#f2c14e", "#ffe29a"], LILAC = ["#a78bfa", "#ddd0ff"], TEAL = ["#5eead4", "#b6f5ea"];

export function journeyGoals(c: Counts): JourneyGoal[] {
  return [
    // ---- careers ----
    { id: "score", cat: "careers", label: "Know how strong my resume is", product: "QR Score", title: "Get your resume scored out of 100", why: "Upload a PDF or Word file, or paste the text, and see your RQ Score and the three things to fix first. No sign-up to see it.", steps: ["Upload or paste your resume", "See your score and focus areas", "Fix the gaps and score again"], facts: ["Free", "Score in seconds", "No account needed"], cta: "Score My Resume", href: "/resume-score", next: ["resume", "interview"], icon: ScanLine, v: ORANGE[0], v2: ORANGE[1] },
    { id: "resume", cat: "careers", label: "Build a resume that gets shortlisted", product: "Resume Studio", title: "Open Resume Studio", why: "Choose a template, edit with live scoring, and export when it reads well.", steps: ["Choose a template", "Fill in your experience", "Check the score and export"], facts: [`${c.templates} templates`, "Live scoring", "Export when ready"], cta: "Create Your Resume", href: "/studio", next: ["score", "passport"], icon: FileText, v: VIOLET[0], v2: VIOLET[1] },
    { id: "intern", cat: "careers", label: "Find an internship", product: "Internships", title: "Browse verified internships", why: "Roles come from verified employers with no application fees.", steps: ["Browse and filter roles", "Strengthen your resume if needed", "Apply and track each stage"], facts: ["Verified employers", "No application fees", "Track every stage"], cta: "Find Your Next Opportunity", href: "/internships", next: ["resume", "interview"], icon: Briefcase, v: ORANGE[0], v2: ORANGE[1] },
    { id: "interview", cat: "careers", label: "Practise for interviews", product: "Interview practice", title: "Rehearse with a mock interview", why: "Answer realistic questions out loud and get feedback straight away, before the real one.", steps: ["Open the interviewer", "Answer the questions", "Read the feedback and go again"], facts: ["Mock interviews", "Instant feedback", "Go again after feedback"], cta: "Start Interview Practice", href: "/ai-interviewer", next: ["score", "expert"], icon: Mic, v: PINK[0], v2: PINK[1] },
    { id: "passport", cat: "careers", label: "Prove my skills to employers", product: "Skill Passport", title: "Build your Skill Passport", why: "Your scored, proctored results in one record, with a QR code that an employer or university can scan to check.", steps: ["Sign in and open your passport", "Add scored results", "Share the QR code"], facts: ["Scored and proctored", "QR anyone can scan", "One record"], cta: "Open My Passport", href: "/passport", next: ["score", "intern"], icon: Award, v: CYAN[0], v2: CYAN[1] },
    { id: "expert", cat: "careers", label: "Talk to an expert about my career", product: "Expert sessions", title: "Book a session with a human expert", why: "A 1:1 online session on your career direction, course and skill choices, or to clear academic doubts.", steps: ["Choose a session", "Book a time", "Leave with a clear next step"], facts: ["1:1 and online", "30-minute sessions", "Career counselling from ₹799"], cta: "Book an Expert", href: "/experts", next: ["interview", "passport"], icon: LifeBuoy, v: GOLD[0], v2: GOLD[1] },

    // ---- study abroad ----
    { id: "abroad", cat: "abroad", label: "Study abroad", product: "Overseas Education", title: "Start with the destination map", why: "Compare countries and universities first, then build your application documents.", steps: ["Pick a country and shortlist universities", "Check admission requirements", "Prepare your resume and documents"], facts: [`${c.countries} countries`, "Costs and visas", "One application plan"], cta: "Start My Study Abroad Journey", href: "/study-abroad", next: ["ielts", "funds"], icon: Globe2, v: GREEN[0], v2: GREEN[1] },
    { id: "ielts", cat: "abroad", label: "Prove my English with IELTS", product: "IELTS practice tests", title: "Practise IELTS Reading and Listening", why: "Full-length tests, timed and marked on the server with an indicative band and an explanation for every answer.", steps: ["Take a timed test", "Review every explanation", "See an indicative band"], facts: ["Reading and Listening", "Marked instantly", "First tests free"], cta: "Open IELTS Practice", href: "/ielts", next: ["writing", "abroad"], icon: Languages, v: TEAL[0], v2: TEAL[1] },
    { id: "funds", cat: "abroad", label: "Plan the cost, loan and visa", product: "Funds and visa", title: "Work out funding, loans and your visa", why: "See what it costs, how to pay for it, which documents to prepare and what the visa asks for, country by country.", steps: ["Check scholarships and funds", "Compare education loans", "Follow the visa steps"], facts: ["Scholarships and funds", "Loan options", "Visa interview practice"], cta: "Plan My Funding", href: "/abroad/funds", next: ["abroad", "expert"], icon: Wallet, v: GREEN[0], v2: GREEN[1] },

    // ---- exams and school ----
    { id: "exam", cat: "exams", label: "Prepare for an entrance exam", product: "Exam preparation", title: "Study for JEE, NEET, UPSC, SAT, GRE and more", why: "Chapter lists, study material and mock tests for the major entrance and government exams.", steps: ["Choose your exam", "Work through the chapters", "Test yourself with mock tests"], facts: ["Many exams in one place", "Mock tests", "Study material"], cta: "Explore Exam Prep", href: "/exam-prep", next: ["practice", "mathspeed"], icon: Target, v: PINK[0], v2: PINK[1] },
    { id: "practice", cat: "exams", label: "Take practice tests", product: "Practice tests", title: "Practise IELTS and GRE, marked instantly", why: "Sit the full test against the clock, then see exactly what you got right and why.", steps: ["Choose a test", "Sit it against the clock", "Study the explanations"], facts: ["IELTS and GRE", "Timed", "Explanations included"], cta: "Take a Practice Test", href: "/practice-tests", next: ["exam", "writing"], icon: PenLine, v: CYAN[0], v2: CYAN[1] },
    { id: "olympiad", cat: "exams", label: "Prepare my child for the Maths Olympiad", product: "Maths Olympiad (IMO)", title: "Pick your child's class", why: "Every class from 1 to 12 is its own course: chapter lessons, chapter tests and full mock tests sectioned like the real olympiad.", steps: ["Choose the class", "Study chapter by chapter", "Sit the mock tests"], facts: ["Class 1 to 12", "From ₹499 per class", "Worked explanations"], cta: "Choose a Class", href: "/olympiad/imo", next: ["school", "classes"], icon: Shapes, v: LILAC[0], v2: LILAC[1] },
    { id: "school", cat: "exams", label: "Revise school chapters (Class 1 to 12)", product: "School lessons", title: "Study school subjects class by class", why: "Lessons with worked examples, quick quizzes and chapter tests for every class.", steps: ["Pick the class and subject", "Read the lesson", "Take the chapter test"], facts: ["Class 1 to 12", "Worked examples", "Chapter tests"], cta: "Open School Lessons", href: "/school", next: ["olympiad", "classes"], icon: GraduationCap, v: GOLD[0], v2: GOLD[1] },
    { id: "classes", cat: "exams", label: "Join live online classes", product: "Online Classes", title: "Open the live classroom", why: "Join live classes with verified teachers, with homework and progress tracking.", steps: ["Browse courses and teachers", "Enrol", "Join live"], facts: ["Verified teachers", "Homework and quizzes", "Progress tracking"], cta: "Find Your Classes", href: CLASSROOM_URL, external: true, next: ["school", "ebooks"], icon: Video, v: PINK[0], v2: PINK[1] },

    // ---- skills ----
    { id: "skill", cat: "skills", label: "Learn a new skill", product: "Courses", title: "Find a course or career path", why: "Courses give you structured lessons and checks you can complete at your pace.", steps: ["Choose a field", "Start a course", "Add the skill to your resume"], facts: [`${c.courses} courses`, "Hands-on project", "Certificate and badge"], cta: "Explore Learning", href: "/courses", next: ["resume", "mathspeed"], icon: BookOpen, v: CYAN[0], v2: CYAN[1] },
    { id: "mathspeed", cat: "skills", label: "Get faster at maths", product: "Maths Speed Studio", title: "Take the free placement check", why: "One course in 15 levels that builds speed and accuracy, with timed practice and daily review.", steps: ["Take the placement check", "Start at your level", "Practise and review daily"], facts: ["15 levels", "Free placement check", "Timed practice"], cta: "Try Maths Speed Studio", href: "/math-speed", next: ["vedic", "exam"], icon: Calculator, v: LILAC[0], v2: LILAC[1] },
    { id: "vedic", cat: "skills", label: "Learn Vedic mental maths", product: "Vedic Mathematics", title: "Calculate in your head with Vedic methods", why: "30 modules of mental-maths shortcuts, with worked examples and practice, in English and Hindi.", steps: ["Start with free Module 1", "Work through the sutras", "Practise with the test banks"], facts: ["30 modules", "English and Hindi", "Module 1 free"], cta: "Start Vedic Maths", href: "/vedic-math", next: ["mathspeed", "exam"], icon: Sigma, v: LILAC[0], v2: LILAC[1] },
    { id: "writing", cat: "skills", label: "Improve my English writing", product: "English Writing Studio", title: "Write against the clock, scored at once", why: "Exam-style prompts for IELTS, SAT, GRE and GMAT, with an instant score on every criterion.", steps: ["Pick a prompt", "Write against the clock", "Read your score and improve"], facts: ["IELTS, SAT, GRE, GMAT", "Instant criterion scores", "Free checks every month"], cta: "Open Writing Studio", href: "/writing-clinic", next: ["ielts", "practice"], icon: Languages, v: TEAL[0], v2: TEAL[1] },
    { id: "ebooks", cat: "skills", label: "Get study materials and e-books", product: "E-Books", title: "Open the MathStudy library", why: "Study guides and learning resources, available on MathStudy.", steps: ["Browse the library", "Pick your subject", "Study at your pace"], facts: ["Study guides", "On MathStudy", "Pick your subject"], cta: "Explore the Library", href: EBOOKS_URL, external: true, next: ["classes", "skill"], icon: BookOpen, v: GOLD[0], v2: GOLD[1] },
  ];
}
