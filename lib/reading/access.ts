import { accessFor, buyHref, courseFee, type Access } from "../pay/course-access";

/**
 * Who may use what. The studio's premium package is one product (`course-ai-reading-studio`, the same pattern as every other course) so purchase,
 * verification, refund and plan behaviour are exactly the existing course rules: premium is granted only by a verified payment recorded by the
 * payment system (an entitlement), never by anything the browser claims.
 *
 * Free for every signed-in student: the starting assessment (a configurable number of times), its overall score, the basic reading-speed result,
 * the summary of strongest and weakest skills, and the Level A lesson. Everything else needs the package.
 */
export const READING_SLUG = "ai-reading-studio";

export const readingAccess = (userId: number): Promise<Access> => accessFor(userId, READING_SLUG);
export const hasPremium = async (userId: number): Promise<boolean> => (await readingAccess(userId)) !== null;
export const buyLink = (): string => buyHref(READING_SLUG);
export const feeNow = () => courseFee(READING_SLUG);

/** What a student without the package may do. Used by the pages and, again, by the server routes. */
export const FREE_FEATURES = ["Starting assessment with an overall score", "Basic reading-speed result (an estimate)", "Strongest and weakest skill summary", "Level A lesson"] as const;
export const PREMIUM_FEATURES = [
  "Skill-by-skill analysis with the questions behind each score",
  "Full explanations for every answer, including the tempting wrong options",
  "Interactive charts: profile, skills, difficulty, timing, speed and comprehension, skill-by-difficulty",
  "A personalised 7-day improvement plan",
  "Level practice, mastery checks and all ten levels",
  "Delayed-recall sessions and timed reading",
  "Complete progress history and downloadable reports",
] as const;
