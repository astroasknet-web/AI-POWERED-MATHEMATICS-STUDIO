import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Calculator, CalendarDays, GraduationCap, PenLine, PlayCircle, Radio, Route as RouteIcon, Shapes, Sigma } from "lucide-react";
import Globe from "@/components/home-options/Globe";
import InternshipBoard from "@/components/home-options/InternshipBoard";
import { COUNTRIES } from "@/components/home-options/data";
import { EBOOKS_URL, LIBRARY_TOPICS, portal } from "./data";
import { featuredCourses, staticCategories, staticCourses } from "@/lib/market/static-catalogue";
import LearnShowcase, { type LearnTab } from "./LearnShowcase";

const WRAP = "mx-auto max-w-[1180px]";
const H2 = "text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.07] tracking-tight";

export function Abroad() {
  const total = COUNTRIES.reduce((n, c) => n + c.count, 0);
  return (
    <section id="abroad" className="hx-v-abroad scroll-mt-24 overflow-hidden bg-[var(--hx-navy)] px-6 py-24 text-white md:px-14 md:py-32" aria-labelledby="hx-abroad">
      <div className={`${WRAP} grid items-center gap-10 lg:grid-cols-[0.9fr,1.1fr]`}>
        <div>
          <p data-rv className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--v)]">Overseas Education</p>
          <h2 data-rv id="hx-abroad" className={`${H2} text-white`}>Think Beyond Borders. <span className="hx-grad-text">Study Around the World.</span></h2>
          <p data-rv className="mt-4 max-w-[32em] text-[1.05rem] leading-relaxed text-white/70">Explore {total} universities across {COUNTRIES.length} destinations, understand requirements, and prepare your application documents.</p>
          <ul data-rv className="mt-6 grid grid-cols-2 gap-x-6 text-[0.94rem]">
            {COUNTRIES.map((c) => <li key={c.name} className="flex justify-between border-b border-white/10 py-2"><Link href={portal(`/study-abroad/${c.name.toLowerCase()}`)} className="font-semibold hover:text-[var(--v)]">{c.name}</Link><span className="text-white/55">{c.count}</span></li>)}
          </ul>
          <Link data-rv href={portal("/study-abroad")} className="hx-btn hx-btn-pri mt-8">Start My Study Abroad Journey <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          <p data-rv className="mt-4 text-[0.8rem] text-white/45">Guidance only. We do not guarantee admission, scholarships or visas.</p>
        </div>
        <div data-rv><Globe dark /></div>
      </div>
    </section>
  );
}

export function Opportunities() {
  return (
    <section id="internships" className="hx-v-internships scroll-mt-24 bg-white px-6 py-24 md:px-14 md:py-32" aria-labelledby="hx-intern">
      <div className={WRAP}>
        <div className="mx-auto mb-12 max-w-[720px] text-center">
          <h2 data-rv id="hx-intern" className={`${H2} text-[var(--hx-text)]`}>Experience Today. <span className="hx-grad-text">Lead Tomorrow.</span></h2>
          <p data-rv className="mt-4 text-[1.05rem] text-[var(--hx-muted)]">Verified employers, no application fees. Slide the score to see which roles open up.</p>
        </div>
        <div data-rv><InternshipBoard initial={72} href={portal("/internships")} /></div>
        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-[0.84rem] text-[var(--hx-muted)]">Sample listings shown here. Live roles are on the internships page.</p>
          <Link href={portal("/internships")} className="hx-btn hx-btn-dark">Find Your Next Opportunity <ArrowRight className="h-4 w-4" aria-hidden /></Link>
        </div>
      </div>
    </section>
  );
}

const WAYS = [
  { icon: GraduationCap, t: "Self-paced courses", d: "Structured lessons, knowledge checks and progress tracking.", href: portal("/courses"), cta: "Browse courses", tag: "Certificate and badge", v: "#35d9ff", v2: "#8ff0ff" },
  { icon: Shapes, t: "Maths Olympiad (IMO)", d: "Every class from 1 to 12 is its own course, with chapter tests and full mock tests.", href: "/olympiad/imo", cta: "Choose a class", tag: "From ₹499 per class", v: "#a78bfa", v2: "#ddd0ff" },
  { icon: Calculator, t: "Maths Speed Studio", d: "15 levels that build speed and accuracy, with a placement check and daily review.", href: portal("/math-speed"), cta: "Take the placement check", tag: "Free placement check", v: "#ff8a4c", v2: "#ffc36b" },
  { icon: Sigma, t: "Vedic Mathematics", d: "30 modules of mental-maths shortcuts, with worked examples, in English and Hindi.", href: portal("/vedic-math"), cta: "Start Module 1", tag: "Module 1 free", v: "#2fd39a", v2: "#8cf0c9" },
  { icon: PenLine, t: "English Writing Studio", d: "IELTS, SAT, GRE and GMAT prompts, scored instantly on every criterion.", href: portal("/writing-clinic"), cta: "Write and get scored", tag: "Free checks every month", v: "#5eead4", v2: "#b6f5ea" },
  { icon: RouteIcon, t: "Exam prep", d: "JEE, NEET, UPSC, SSC, CAT, SAT, GRE, GMAT and IELTS study material.", href: portal("/exam-prep"), cta: "See exams", tag: "Free study material", v: "#ff5f8f", v2: "#ffa3be" },
  { icon: PlayCircle, t: "Practice tests", d: "IELTS and GRE practice, timed and marked instantly, with an explanation for every answer.", href: portal("/practice-tests"), cta: "Practise", tag: "Marked instantly", v: "#7857ff", v2: "#b39dff" },
  { icon: Radio, t: "Live sessions", d: "Workshops and events with experts you can join live.", href: portal("/events"), cta: "See sessions", tag: "Live with experts", v: "#f2c14e", v2: "#ffe29a" },
];

/** The fields shown as tabs: the home page's own choice of well-stocked fields (the blockchain track is not featured here). */
const TAB_FIELDS = ["data", "ai", "dev", "cloud", "cyber", "design", "marketing", "business", "finance"];

export function Learn() {
  const all = staticCourses();
  const cats = staticCategories();
  const names = Object.fromEntries(cats.map((c) => [c.key, c.name]));
  const pick = (c: (typeof all)[number]) => ({ slug: c.slug, title: c.title, brief: c.brief, levelLabel: c.levelLabel, hours: c.hours, cat: c.cat });
  const tabs: LearnTab[] = [
    { key: "popular", label: "Popular", courses: featuredCourses(["data", "ai", "dev", "design", "marketing", "business"]).map(pick) },
    ...TAB_FIELDS.filter((k) => names[k]).map((k) => ({ key: k, label: names[k].split(/[,&]/)[0].trim(), courses: all.filter((c) => c.cat === k).slice(0, 6).map(pick) })),
  ];
  return (
    <section id="learn" className="hx-v-courses hx-ln scroll-mt-24 px-5 py-20 md:px-14 md:py-28" aria-labelledby="hx-learn">
      <div className={WRAP}>
        <div className="mx-auto mb-10 max-w-[760px] text-center">
          <p data-rv className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#0a8fb0]">Learn</p>
          <h2 data-rv id="hx-learn" className={`mt-3 ${H2} text-[var(--hx-text)]`}>Learn Something That <span className="hx-grad-text">Changes Everything.</span></h2>
          <p data-rv className="mt-4 text-[1.05rem] leading-relaxed text-[var(--hx-muted)]">Courses, studios, exam practice and live sessions that work together: learn at your pace, practise, then ask questions live.</p>
        </div>

        <LearnShowcase tabs={tabs} total={all.length} fields={cats.length} catNames={names} />

        <div className="mt-14">
          <p data-rv className="mb-5 text-center text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--hx-muted)]">More ways to learn</p>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WAYS.map((l, i) => (
              <li key={l.t} data-rv style={{ ["--d" as string]: `${(i % 4) * 0.06}s`, ["--v" as string]: l.v, ["--v2" as string]: l.v2 }}>
                <Link href={l.href} className="hx-way group">
                  <span className="hx-way-ic"><l.icon className="h-5 w-5" aria-hidden /></span>
                  <span className="hx-way-tag">{l.tag}</span>
                  <h3 className="mt-3 text-[1.08rem] font-semibold text-[var(--hx-text)]">{l.t}</h3>
                  <p className="mt-1.5 flex-1 text-[0.9rem] leading-relaxed text-[var(--hx-muted)]">{l.d}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-[var(--hx-text)]">{l.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div data-rv className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link href={portal("/courses")} className="hx-btn hx-btn-pri">Explore all {all.length} courses <ArrowRight className="h-4 w-4" aria-hidden /></Link>
          <Link href="/pricing" className="hx-btn hx-btn-dark">See plans</Link>
        </div>
      </div>
    </section>
  );
}

/** Shelf topics are the library's own sections (LIBRARY_TOPICS). The books are a picture of the shelves, not a list of titles; every click opens mathstudy.in. */
const SHELF = [
  { h: 250, c1: "#f2c14e", c2: "#e08a1e", rot: -3 },
  { h: 290, c1: "#35d9ff", c2: "#2b6fe0", rot: 2 },
  { h: 235, c1: "#ff5f8f", c2: "#b8286a", rot: -2 },
  { h: 270, c1: "#2fd39a", c2: "#12805c", rot: 3 },
];
const LIB_STEPS = [
  { t: "Browse the library", d: "Open MathStudy and look through the shelves by subject." },
  { t: "Pick your subject", d: "Find the guide that matches your exam, class or goal." },
  { t: "Study at your pace", d: "Buy and download on MathStudy, then study whenever suits you." },
];

export function Library() {
  return (
    <section id="library" className="hx-v-ebooks hx-lib scroll-mt-24 px-5 py-20 md:px-14 md:py-28" aria-labelledby="hx-lib">
      <span aria-hidden className="hx-lib-glow" />
      <div className={`${WRAP} relative`}>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr,1.05fr]">
          <div>
            <p data-rv className="mb-3 inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#f2c14e]"><BookOpen className="h-4 w-4" aria-hidden /> E-Books · MathStudy library</p>
            <h2 data-rv id="hx-lib" className={`${H2} text-white`}>A World of Knowledge, <span className="hx-lib-grad">One Click Away.</span></h2>
            <p data-rv className="mt-4 max-w-[34em] text-[1.05rem] leading-relaxed text-white/75">Study guides and learning resources from our MathStudy library. Browsing, purchases and downloads happen on mathstudy.in.</p>
            <div data-rv className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a href={EBOOKS_URL} target="_blank" rel="noopener noreferrer" className="hx-btn hx-lib-cta">Explore the Library <ArrowUpRight className="h-4 w-4" aria-hidden /><span className="sr-only"> (opens mathstudy.in in a new tab)</span></a>
              <Link href="/exam-prep" className="text-[0.95rem] font-semibold text-white/85 underline underline-offset-4 hover:text-white">Free study material on GrowQR</Link>
            </div>
          </div>

          <div data-rv style={{ ["--d" as string]: ".1s" }}>
            <ul className="hx-shelf" aria-label="Library shelves">
              {LIBRARY_TOPICS.map((t, i) => (
                <li key={t} style={{ ["--h" as string]: `${SHELF[i].h}px`, ["--c1" as string]: SHELF[i].c1, ["--c2" as string]: SHELF[i].c2, ["--r" as string]: `${SHELF[i].rot}deg` }}>
                  <a href={EBOOKS_URL} target="_blank" rel="noopener noreferrer" className="hx-book">
                    <span className="hx-book-spine" aria-hidden />
                    <span className="hx-book-face"><BookOpen className="h-6 w-6" aria-hidden /><b>{t}</b><span>Open on MathStudy</span></span>
                    <span className="sr-only"> (opens mathstudy.in in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <div aria-hidden className="hx-shelf-board" />
          </div>
        </div>

        <ol className="hx-lib-steps mt-14">
          {LIB_STEPS.map((s, i) => (
            <li key={s.t} data-rv style={{ ["--d" as string]: `${i * 0.08}s` }}>
              <span className="hx-lib-n" aria-hidden>{i + 1}</span>
              <span><b>{s.t}</b><span>{s.d}</span></span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const STEPS = [
  { n: "01", t: "Discover", d: "Find the services that match your goals." },
  { n: "02", t: "Learn", d: "Build skills through courses, classes and resources." },
  { n: "03", t: "Advance", d: "Move on to internships, stronger applications and global education." },
];

export function HowItWorks3() {
  return (
    <section className="bg-[var(--hx-soft)] px-6 py-24 md:px-14 md:py-28" aria-labelledby="hx-how">
      <div className={WRAP}>
        <h2 data-rv id="hx-how" className={`${H2} mb-12 text-center text-[var(--hx-text)]`}>Discover <span className="hx-grad-text">→ Learn → Advance</span></h2>
        <ol className="relative grid gap-4 md:grid-cols-3">
          <span aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-[var(--hx-violet)] to-[var(--hx-cyan)] md:block" />
          {STEPS.map((s, i) => (
            <li key={s.n} data-rv style={{ ["--d" as string]: `${i * 0.08}s` }} className="relative rounded-3xl border border-slate-200 bg-white p-7">
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--hx-navy)] text-[0.95rem] font-semibold text-white">{s.n}</span>
              <h3 className="text-[1.25rem] font-semibold text-[var(--hx-text)]">{s.t}</h3>
              <p className="mt-1.5 text-[0.95rem] text-[var(--hx-muted)]">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Trust({ templateCount }: { templateCount: number }) {
  const unis = COUNTRIES.reduce((n, c) => n + c.count, 0);
  const facts: [string, string][] = [
    [String(COUNTRIES.length), "study destinations"],
    [String(unis), "universities listed"],
    [String(templateCount), "resume template options"],
    ["0", "application fees on internships"],
  ];
  return (
    <section className="bg-[var(--hx-navy)] px-6 py-16 text-white md:px-14" aria-label="GrowQR in numbers">
      <dl className={`${WRAP} grid grid-cols-2 gap-8 md:grid-cols-4`}>
        {facts.map(([n, l]) => (
          <div key={l} data-rv className="text-center">
            <dt className="hx-grad-text text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-none">{n}</dt>
            <dd className="mt-2 text-[0.9rem] text-white/60">{l}</dd>
          </div>
        ))}
      </dl>
      {/* Learner counts and testimonials are left out until real, permissioned data exists. */}
    </section>
  );
}

export function FinalCTA3() {
  return (
    <section className="hx-hero relative isolate overflow-hidden px-6 py-28 text-center text-white md:px-14 md:py-36" aria-labelledby="hx-final">
      <div className="relative z-10 mx-auto max-w-[760px]">
        <CalendarDays className="mx-auto mb-6 h-8 w-8 text-[var(--hx-cyan)]" aria-hidden />
        <h2 data-rv id="hx-final" className="text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] text-white">Your Next Chapter <span className="hx-grad-text">Starts Here.</span></h2>
        <p data-rv className="mx-auto mt-5 max-w-[34em] text-[1.08rem] leading-relaxed text-white/75">Whether you&rsquo;re building skills, preparing for your career, or planning an international education journey, take the first step today.</p>
        <div data-rv className="mt-9 flex flex-wrap justify-center gap-3">
          <a href="https://app.growqr.ai/signup" className="hx-btn hx-btn-pri">Get Started <ArrowRight className="h-4 w-4" aria-hidden /></a>
          <a href="#pillars" className="hx-btn hx-btn-ghost">Explore the Platform</a>
        </div>
      </div>
    </section>
  );
}
