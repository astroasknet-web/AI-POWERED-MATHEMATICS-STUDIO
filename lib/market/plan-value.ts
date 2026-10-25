/**
 * The "value stack" shown on the student packages: what each paid plan includes at its standalone price, the total, and the saving.
 * Pure arithmetic over prices passed in (see lib/pay/plan-value-prices.ts for where they come from), so it can be tested without a database.
 *
 * Only things the plan really grants AND that can be bought on their own at a catalogue price are priced:
 *   - course picks (PLAN_COURSE_QUOTA in lib/pay/plans.ts: Pro 1, Silver 2, Gold 4), valued at the cheapest course that can be picked, so the
 *     total is a floor and never flatters the plan;
 *   - the complete Vedic Mathematics course (any paid plan opens modules 2 to 30, see app/vedic-math), at the price it sells for;
 *   - Resume Studio Pro (any paid plan opens it, see lib/studio/access.ts) at its own price;
 *   - the Maths Speed Enhancement Studio (PLAN_STUDIOS: Silver and Gold) at its price;
 *   - unlimited Writing Clinic checks (Gold), which is what the English Writing Studio sells.
 * Everything else a plan includes (tests, counselling, reviews, classes) has no standalone price, so it is listed unpriced and left out of every total.
 */
import { PLAN_COURSE_QUOTA } from "@/lib/market/plan-quota";

export type PaidPlanKey = "pro" | "silver" | "gold";

export interface ValuePrices {
  /** Cheapest and dearest rupee price among the courses a student can pick with a plan. */
  pickMin: number;
  pickMax: number;
  vedicMathematics: number;
  resumeStudioPro: number;
  mathsSpeedStudio: number;
  englishWritingStudio: number;
}

export interface StackLine { label: string; detail?: string; rupees: number }
export interface PlanStack {
  key: PaidPlanKey;
  /** Priced lines; `rupees` is what the line costs on its own. */
  lines: StackLine[];
  /** Included but not priced: never counted in the totals. */
  extras: string[];
  /** Total of the priced lines (course picks at the cheapest course). */
  value: number;
  /** The same total if every pick is the dearest course. Equals `value` when all courses cost the same. */
  valueMax: number;
  /** Courses and studios in the priced lines. */
  units: number;
  /** Everything the plan includes, priced or not: each course pick counts one. */
  items: number;
}

const EXTRAS: Record<PaidPlanKey, string[]> = {
  pro: [
    "Resume scan and score check, plus 1 AI resume score check a month",
    "Writing Clinic: 15 essay checks a month",
  ],
  silver: [
    "5 AI resume score checks a month, with ATS feedback",
    "10 IELTS Reading and Writing tests",
    "Verified, shareable Skill Passport with QR credential",
    "2 AI interview practice sessions with feedback",
    "Writing Clinic: 25 essay checks a month",
    "One career counselling and doubt-solving session with experts every month",
  ],
  gold: [
    "5 AI resume score checks a month, with ATS feedback",
    "30 IELTS Reading and Writing tests",
    "Verified, shareable Skill Passport with QR credential",
    "2 AI interview practice sessions with feedback",
    "One career counselling and doubt-solving session with experts every month",
    "QR Score Booster plan for your recommended courses",
    "Live English speaking classes, for IELTS, TOEFL and professional growth",
    "Study abroad registration portal, with a university shortlist matched to your documents",
    "One 1:1 overseas education counselling session a year",
    "One expert review of your resume a year",
    "2 mock visa interviews a year",
    "Priority email support",
  ],
};

const rs = (n: number): string => `₹${n.toLocaleString("en-IN")}`;
const plural = (n: number, one: string, many: string): string => (n === 1 ? `1 ${one}` : `${n} ${many}`);

export function buildStacks(p: ValuePrices): Record<PaidPlanKey, PlanStack> {
  const make = (key: PaidPlanKey, studios: StackLine[]): PlanStack => {
    const picks = PLAN_COURSE_QUOTA[key];
    const pickLine: StackLine = {
      label: `${plural(picks, "course", "courses")} of your choice`,
      detail: p.pickMax > p.pickMin ? `Courses cost ${rs(p.pickMin)} to ${rs(p.pickMax)} each. Counted at ${rs(p.pickMin)}.` : `${rs(p.pickMin)} each`,
      rupees: picks * p.pickMin,
    };
    const vedic: StackLine = { label: "Vedic Mathematics, complete course", detail: "30 modules in English and Hindi", rupees: p.vedicMathematics };
    const lines = [pickLine, vedic, { label: "Resume Studio Pro", detail: "All templates, no waiting between saves", rupees: p.resumeStudioPro }, ...studios];
    const value = lines.reduce((t, l) => t + l.rupees, 0);
    return { key, lines, extras: EXTRAS[key], value, valueMax: value + picks * (p.pickMax - p.pickMin), units: picks + 1 + studios.length, items: picks + 2 + studios.length + EXTRAS[key].length };
  };
  const maths: StackLine = { label: "Mathematics Speed Enhancement Studio", detail: "15 levels of mental-maths speed training", rupees: p.mathsSpeedStudio };
  const writing: StackLine = { label: "Writing Clinic: unlimited essay checks", detail: "What the English Writing Studio sells", rupees: p.englishWritingStudio };
  return { pro: make("pro", []), silver: make("silver", [maths]), gold: make("gold", [maths, writing]) };
}

export interface Saving { amount: number; percent: number }

/** The saving of paying `price` for what is worth `value` separately, or null when the plan costs the same or more (then nothing is claimed). */
export function savingFor(price: number, value: number): Saving | null {
  if (!(value > price) || price < 0) return null;
  return { amount: value - price, percent: Math.round(((value - price) / value) * 100) };
}

/** What each course or studio works out to, only meaningful (and only shown) when the plan beats buying them one by one. */
export function perUnit(price: number, stack: PlanStack): number | null {
  return stack.units >= 2 && savingFor(price, stack.value) ? Math.round(price / stack.units) : null;
}

/** The plan with the biggest saving percentage at these prices, or null when none saves anything. Ties go to the cheaper plan. */
export function bestValue(prices: Record<PaidPlanKey, number>, stacks: Record<PaidPlanKey, PlanStack>): PaidPlanKey | null {
  let best: PaidPlanKey | null = null;
  let pct = 0;
  for (const k of ["pro", "silver", "gold"] as const) {
    const s = savingFor(prices[k], stacks[k].value);
    if (s && s.percent > pct) { best = k; pct = s.percent; }
  }
  return best;
}

/** What checkout charges for the plan as shown: the year for yearly billing and for annual-only plans (Gold), otherwise the month. Savings are measured against this. */
export const chargedRupees = (p: { monthly: number; yearly: number; annualOnly?: boolean }, yearly: boolean): number => (yearly || p.annualOnly ? p.yearly : p.monthly);

/** What paying for a year saves over twelve months of paying monthly. Real arithmetic on the two checkout prices; null when a year does not cost less. */
export function yearlySaving(p: { monthly: number; yearly: number }): Saving | null {
  return savingFor(p.yearly, p.monthly * 12);
}
