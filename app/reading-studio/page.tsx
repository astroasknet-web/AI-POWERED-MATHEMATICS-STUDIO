import type { Metadata } from "next";
import Link from "next/link";
import { MarketShell, currentViewer } from "@/components/market/shell";
import { SEED_LEVELS } from "@/lib/reading/content/levels";
import { FREE_FEATURES, PREMIUM_FEATURES, feeNow } from "@/lib/reading/access";
import { databaseConfigured } from "@/lib/portal/db";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

const TITLE = "AI-Powered Reading Studio: Find How You Read, Then Improve It | GrowQR";
const DESC = "A reading assessment that explains itself: reading speed with comprehension, skill-by-skill analysis, charts, a personalised 7-day plan and ten learning levels. The starting assessment is free.";
export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/reading-studio` },
  openGraph: { type: "website", url: `${SITE_URL}/reading-studio`, siteName: "GrowQR", title: TITLE, description: DESC },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const btn = "inline-flex min-h-[52px] items-center justify-center rounded-lg px-7 text-[16px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-deep";

const STEPS: Array<[string, string]> = [
  ["Read and answer", "Two short passages, then questions that test main ideas, details, vocabulary in context, inference and critical reading. You read at your normal pace."],
  ["See exactly where you stand", "An overall score you can trace line by line, a reading-speed estimate that only counts together with accuracy, and your strongest and weakest skills."],
  ["Practise what matters", "Targeted practice on your weakest skills with an explanation after every answer, and a 7-day plan sized to the time you have."],
  ["Climb the levels", "Ten levels from Reading Foundations to Advanced Reading Mastery. A level opens when you show mastery, not when time has passed."],
  ["Measure real change", "Fresh passages, delayed recall in a later session, and progress compared like with like, so a harder passage is never counted as a decline."],
];

const HONEST: Array<[string, string]> = [
  ["Scores are provisional", "The overall score uses published formulas and starting weights that have not yet been checked against real student data. We say so on every result. Treat it as a guide to what to practise, not a measurement of ability."],
  ["Speed is an estimate", "Reading speed comes from the time the passage was on your screen. It does not measure eye movement or how you read, and it is not used if the time looks like skimming or an interrupted session."],
  ["Scoring is not done by AI", "Every score comes from fixed, published rules on our server. Any AI-written feedback is optional, uses only the numbers the scoring engine produced, and cannot change them."],
  ["Premium access needs a verified payment", "The package unlocks only through our payment system after the payment is verified. Nothing in your browser can unlock it."],
];

const FAQ: Array<[string, string]> = [
  ["Is it really free to start?", "Yes. The starting assessment, your overall score, a basic reading-speed result, your strongest and weakest skills and the Level A lesson are free for any signed-in student."],
  ["Is this for a particular exam or country?", "No. It teaches universal reading skills, with levels named for the skill, so it suits any class, board or country."],
  ["How long does the starting assessment take?", "About 20 to 25 minutes: two passages and around sixteen questions. You can leave and return; your answers are saved."],
  ["What does the package add?", "Skill-by-skill analysis with the questions behind each score, full explanations, interactive charts, a personalised 7-day plan, all ten levels with mastery checks, delayed recall, timed reading and your full history."],
];

export default async function ReadingStudioLanding() {
  const me = await currentViewer();
  const fee = databaseConfigured() ? await feeNow().catch(() => null) : null;
  const cta = me && me.role === "student" ? { href: "/reading-studio/dashboard", label: "Open my Reading Studio" } : { href: `/login?next=${encodeURIComponent("/reading-studio/dashboard")}`, label: "Start free: take the starting assessment" };
  const jsonld = {
    "@context": "https://schema.org", "@type": "Course", name: "AI-Powered Reading Studio", description: DESC, url: `${SITE_URL}/reading-studio`,
    provider: { "@type": "Organization", name: "GrowQR", url: SITE_URL }, inLanguage: "en",
    ...(fee ? { offers: { "@type": "Offer", category: "Paid", price: String(fee.amountMinor / 100), priceCurrency: "INR", url: `${SITE_URL}/reading-studio` } } : {}),
  };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return (
    <MarketShell user={me} active="courses">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <header className="max-w-3xl">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-orange-deep">Reading studio · 10 levels · free starting assessment</p>
        <h1 className="mt-2 text-[clamp(1.9rem,4.5vw,2.9rem)] font-bold leading-tight text-ink">AI-Powered Reading Studio</h1>
        <p className="mt-3 text-[18px] leading-relaxed text-ink-2">Find out how well you read, where you lose marks, and what to do about it. An assessment that explains its own score, then a practice pathway that proves progress.</p>
        <div className="mt-6 flex flex-wrap items-center gap-4"><Link href={cta.href} className={`${btn} bg-orange text-white hover:bg-orange-dark`}>{cta.label}</Link><a href="#how" className="text-[15px] font-medium underline">How it works</a></div>
        <p className="mt-3 text-[14px] text-ink-3">{fee ? `The full package is ₹${(fee.amountMinor / 100).toLocaleString("en-IN")}, paid once. ` : ""}No countdowns, no pressure: the free assessment gives you real value on its own.</p>
      </header>

      <section id="how" className="mt-12 scroll-mt-28" aria-labelledby="how-h">
        <h2 id="how-h" className="text-[24px] font-bold text-ink">How it works</h2>
        <ol className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{STEPS.map(([t, d], i) => <li key={t} className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-card"><span className="grid h-8 w-8 place-items-center rounded-full bg-orange-light text-[14px] font-bold text-orange-deep" aria-hidden>{i + 1}</span><h3 className="mt-2 text-[17px] font-semibold text-ink">{t}</h3><p className="mt-1 text-[14.5px] text-ink-3">{d}</p></li>)}</ol>
      </section>

      <section className="mt-12" aria-labelledby="free-h">
        <h2 id="free-h" className="text-[24px] font-bold text-ink">Free and package</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-card"><h3 className="text-[17px] font-semibold text-ink">Free for every student</h3><ul className="mt-2 space-y-1.5 text-[14.5px] text-ink-2">{FREE_FEATURES.map((f) => <li key={f}>✓ {f}</li>)}</ul></div>
          <div className="rounded-2xl border border-orange/50 bg-orange-lighter p-5 shadow-card"><h3 className="text-[17px] font-semibold text-ink">With the package</h3><ul className="mt-2 space-y-1.5 text-[14.5px] text-ink-2">{PREMIUM_FEATURES.map((f) => <li key={f}>+ {f}</li>)}</ul></div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="levels-h">
        <h2 id="levels-h" className="text-[24px] font-bold text-ink">Ten levels, named for the skill</h2>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">{SEED_LEVELS.map((l) => <li key={l.key} className="flex gap-4 rounded-2xl border border-black/[0.08] bg-white p-4 shadow-card"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cream-3 text-[20px] font-bold text-ink" aria-hidden>{l.key}</span><div><h3 className="text-[16px] font-semibold text-ink">Level {l.key}: {l.name}</h3><p className="mt-0.5 text-[13.5px] text-ink-3">{l.objective}</p></div></li>)}</ol>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="honest-h">
        <h2 id="honest-h" className="text-[24px] font-bold text-ink">What we are careful to say</h2>
        <dl className="mt-3 space-y-3">{HONEST.map(([t, d]) => <div key={t} className="rounded-xl border border-black/[0.08] bg-white p-4"><dt className="text-[15.5px] font-semibold text-ink">{t}</dt><dd className="mt-1 text-[14.5px] leading-relaxed text-ink-2">{d}</dd></div>)}</dl>
      </section>

      <section className="mt-12 max-w-3xl" aria-labelledby="faq-h">
        <h2 id="faq-h" className="text-[24px] font-bold text-ink">Questions</h2>
        <div className="mt-3 divide-y divide-black/[0.08] rounded-2xl border border-black/[0.08] bg-white shadow-card">{FAQ.map(([q, a]) => <details key={q} className="group p-4"><summary className="cursor-pointer text-[16px] font-semibold text-ink">{q}</summary><p className="mt-2 text-[15px] text-ink-2">{a}</p></details>)}</div>
        <div className="mt-8"><Link href={cta.href} className={`${btn} bg-orange text-white hover:bg-orange-dark`}>{cta.label}</Link></div>
      </section>
    </MarketShell>
  );
}
