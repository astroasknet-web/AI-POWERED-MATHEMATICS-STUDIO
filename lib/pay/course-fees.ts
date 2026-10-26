/**
 * Fees set by the owner, in rupees, charged once per course. The key is the category name in lib/market/data/courses.json.
 * Seeding only creates missing products, so a price changed in the console is never overwritten by these numbers.
 */
export const COURSE_FEE_RUPEES: Record<string, number> = {
  "Blockchain & Web3": 799,
  "AI & Machine Learning": 699,
  "Data, Analytics & BI": 599,
  "Business, Management & Product": 499,
  "Digital & Office Productivity": 399,
  "Software Development": 499,
  "Cloud, DevOps & Infrastructure": 599,
  "Digital Marketing & Growth": 499,
  "Cybersecurity": 499,
  "Design & Creative": 599,
  "Finance, Accounting & Investing": 399,
  "Communication & Career Skills": 499,
  "Entrepreneurship & Freelancing": 399,
  "Test Prep & Study Skills": 399,
  "Content & Personal Branding": 499,
  "Foreign Languages": 699,
  "Health & Wellness": 499,
  "Digital Safety & Life Skills": 299,
  "University Programmes (BBA, BCA, MCA, MBA)": 299,
};

/**
 * Other fees set by the owner. They are saved as products but kept OFF sale: what each one unlocks (and which free pages, if any,
 * move behind it) is still to be decided, so nothing can be bought yet.
 */
export const EXAM_PRODUCTS: Array<{ sku: string; title: string; description: string; rupees: number }> = [
  { sku: "exam-jee", title: "JEE preparation", description: "JEE preparation.", rupees: 699 },
  { sku: "exam-neet", title: "NEET preparation", description: "NEET preparation.", rupees: 699 },
  { sku: "ielts-prep", title: "IELTS preparation", description: "IELTS preparation.", rupees: 799 },
  { sku: "writing-studio", title: "Writing Clinic (Writing studio)", description: "Essay checks and writing practice.", rupees: 499 },
];

/** Maths Olympiad (IMO) is sold one class at a time: Class 1 to 5 Rs 499, Class 6 to 8 Rs 599, Class 9 to 12 Rs 799. Nothing in it is free. */
export const imoFeeRupees = (classNumber: number): number => (classNumber <= 5 ? 499 : classNumber <= 8 ? 599 : 799);
export const imoSlug = (classNumber: number): string => `imo-class-${classNumber}`;

/**
 * Studios sold as one course each. They are not in the course catalogue, but they are bought, entitled and refunded exactly like a catalogue course
 * (sku `course-<slug>`, kind `course`, see lib/pay/course-access.ts). The fee is the owner's to change in the console; seeding never overwrites it.
 * `onSale: false` saves the product and its price but keeps it off sale, as with EXAM_PRODUCTS.
 */
export const STUDIO_COURSES: Array<{ slug: string; title: string; description: string; rupees: number; onSale: boolean }> = [
  ...Array.from({ length: 12 }, (_, i) => ({
    slug: imoSlug(i + 1),
    title: `Class ${i + 1} Maths Olympiad (IMO)`,
    description: `Class ${i + 1} IMO preparation: every chapter with lessons, in-lesson checks and chapter tests, plus unlimited full-syllabus mock tests sectioned like the real olympiad, with worked explanations.`,
    rupees: imoFeeRupees(i + 1),
    onSale: true,
  })),
  {
    slug: "mathematics-speed-enhancement",
    title: "Mathematics Speed Enhancement Studio",
    description: "One continuous course in 15 levels (A to O) that builds speed and accuracy in mental calculation, with a placement check, timed practice and spaced review. Level A, Module 1 is free.",
    rupees: 699,
    onSale: true,
  },
  {
    slug: "english-writing-studio",
    title: "English Writing Studio",
    description: "Exam writing practice for IELTS, SAT, GRE and GMAT: timed prompts, an instant score on every criterion and unlimited essay checks. A free taste of 2 checks a month stays open to everyone.",
    rupees: 499,
    onSale: true,
  },
  {
    slug: "vedic-mathematics",
    title: "Vedic Mathematics & Speed Calculation",
    description: "30 modules in three levels: mental arithmetic, the 16 Sutras and 13 Sub-Sutras, with worked examples, practice and test banks, in English and Hindi. Module 1 is free. Pro, Silver and Gold plans open the whole course too.",
    rupees: 799,
    onSale: true,
  },
  {
    slug: "ielts-practice-tests",
    title: "IELTS Practice Tests: Reading and Listening",
    description: "All 30 full-length IELTS Reading tests and all 30 Listening tests, timed and marked on the server with an indicative band and an explanation for every answer. The first 3 tests of each stay free.",
    rupees: 1599,
    onSale: true,
  },
];

/**
 * Services delivered by GrowQR staff, sold one at a time (sku `service-<key>`, kind `consulting`, so a purchase alerts staff, see lib/pay/fulfil.ts).
 * Silver and Gold include some of them (lib/market/plan-services.ts); the fee here is what one costs on its own.
 */
export const SERVICE_PRODUCTS: Array<{ key: string; title: string; description: string; rupees: number }> = [
  { key: "career-counselling", title: "Career counselling session (30 minutes, online)", description: "A 1:1 online session with an expert on your career direction, course and skill choices, or to clear academic doubts.", rupees: 799 },
  { key: "overseas-counselling", title: "Overseas education counselling (1:1 session)", description: "A 1:1 session on country and university choice, admission requirements, budget and scholarships, and your application plan.", rupees: 1499 },
  { key: "resume-review", title: "Expert resume review", description: "An expert reviews your resume and sends back specific changes.", rupees: 999 },
  { key: "mock-visa-interview", title: "Mock visa interview", description: "A practice visa interview with an expert and feedback on your answers.", rupees: 799 },
  { key: "expert-shortlist", title: "Overseas universities shortlist by experts", description: "A shortlist of overseas universities chosen by our experts to fit your documents and qualifications. For registered students.", rupees: 2499 },
];

/** Resume Studio Pro, sold on its own once (sku `resume-studio-pro`) and opened by any paid plan while it is active. */
export const RESUME_STUDIO_PRO_RUPEES = 199;
