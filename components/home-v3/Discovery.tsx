"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { CATEGORIES, journeyGoals, type Counts, type JourneyCat } from "./journey-data";

/**
 * "Your Journey. Your Goals. Your Next Step." A rules-based guide, not an AI, and the copy says so: pick an area, pick a goal, and see the route through
 * the part of GrowQR built for it, what you get, and where people usually go next. Every goal, fact and link comes from journey-data.ts.
 */
export default function Discovery({ counts }: { counts: Counts }) {
  const goals = useMemo(() => journeyGoals(counts), [counts]);
  const [cat, setCat] = useState<JourneyCat>("careers");
  const [id, setId] = useState<string>(goals[0].id);
  const list = goals.filter((g) => g.cat === cat);
  const goal = goals.find((g) => g.id === id)!;
  const Icon = goal.icon;
  const listRef = useRef<HTMLDivElement>(null);

  const pickCat = (c: JourneyCat) => { setCat(c); const first = goals.find((g) => g.cat === c)!; setId(first.id); };
  const jump = (to: string) => { const g = goals.find((x) => x.id === to)!; setCat(g.cat); setId(g.id); };
  const onKey = (e: React.KeyboardEvent) => {
    const i = list.findIndex((g) => g.id === id);
    const k = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!k) return;
    e.preventDefault();
    const n = list[(i + k + list.length) % list.length];
    setId(n.id);
    requestAnimationFrame(() => listRef.current?.querySelector<HTMLElement>(`[data-goal="${n.id}"]`)?.focus());
  };

  const btnCls = "hx-btn hx-jn-cta";
  const cta = goal.external
    ? <a href={goal.href} target="_blank" rel="noopener noreferrer" className={btnCls}>{goal.cta} <ArrowUpRight className="h-4 w-4" aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>
    : <Link href={goal.href} className={btnCls}>{goal.cta} <ArrowRight className="h-4 w-4" aria-hidden /></Link>;

  return (
    <section id="journey" className="hx-jn scroll-mt-24 px-5 py-20 md:px-14 md:py-28" aria-labelledby="hx-journey">
      <div className="mx-auto max-w-[1180px]">
        <div className="mx-auto max-w-[44rem] text-center">
          <p data-rv className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[var(--hx-violet)]">Your guide to GrowQR</p>
          <h2 data-rv id="hx-journey" className="mt-3 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.06] tracking-tight text-[var(--hx-text)]">Your Journey. Your Goals. <span className="hx-grad-text">Your Next Step.</span></h2>
          <p data-rv className="mt-4 text-[1.05rem] leading-relaxed text-[var(--hx-muted)]">Tell us what you want to do. This is a simple guide, not an AI: pick a goal and see the route, what you get, and the first step to take.</p>
        </div>

        <div data-rv role="group" aria-label="Choose an area" className="hx-jn-tabs mx-auto mt-9">
          {CATEGORIES.map((c) => (
            <button key={c.key} type="button" aria-pressed={cat === c.key} onClick={() => pickCat(c.key)} className="hx-jn-tab">
              <span className="hx-jn-tab-t">{c.label}</span><span className="hx-jn-tab-b">{c.blurb}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[0.82fr,1.18fr] lg:gap-8">
          <div ref={listRef} data-rv role="radiogroup" aria-label="Choose your goal" onKeyDown={onKey} className="grid gap-2.5">
            {list.map((g) => {
              const on = g.id === id; const GI = g.icon;
              return (
                <button key={g.id} data-goal={g.id} type="button" role="radio" aria-checked={on} tabIndex={on ? 0 : -1} onClick={() => setId(g.id)}
                  className={`hx-jn-goal ${on ? "hx-jn-goal-on" : ""}`} style={{ ["--v" as string]: g.v, ["--v2" as string]: g.v2 }}>
                  <span className="hx-jn-goal-ic"><GI className="h-5 w-5" aria-hidden /></span>
                  <span className="min-w-0 flex-1"><span className="block text-[0.98rem] font-semibold leading-snug">{g.label}</span><span className="block text-[0.8rem] text-[var(--hx-muted)]">{g.product}</span></span>
                  <span aria-hidden className={`hx-jn-radio ${on ? "hx-jn-radio-on" : ""}`}>{on && <Check className="h-3 w-3" />}</span>
                </button>
              );
            })}
          </div>

          <div data-rv style={{ ["--d" as string]: ".08s", ["--v" as string]: goal.v, ["--v2" as string]: goal.v2 }} className="hx-jn-panel" aria-live="polite">
            <span aria-hidden className="hx-jn-glow" />
            <span aria-hidden className="hx-jn-grid" />
            <div key={goal.id} className="hx-jn-in relative">
              <div className="flex items-center gap-3">
                <span className="hx-jn-chip"><Icon className="h-6 w-6" aria-hidden /></span>
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white/60">Recommended: {goal.product}</p>
              </div>
              <h3 className="mt-5 text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold leading-tight text-white">{goal.title}</h3>
              <p className="mt-3 max-w-[34em] text-[1.02rem] leading-relaxed text-white/75">{goal.why}</p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="What you get">
                {goal.facts.map((f) => <li key={f} className="hx-jn-fact"><Check className="h-3.5 w-3.5" aria-hidden />{f}</li>)}
              </ul>

              <p className="mt-7 text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white/55">Your route</p>
              <ol className="hx-jn-route mt-3">
                {goal.steps.map((s, i) => (
                  <li key={s}><span className="hx-jn-step" aria-hidden>{i + 1}</span><span>{s}</span></li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                {cta}
                <Link href="/pricing" className="text-[0.92rem] font-semibold text-white/80 underline underline-offset-4 hover:text-white">See plans and prices</Link>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-white/55">Related next steps</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {goal.next.map((n) => { const t = goals.find((x) => x.id === n)!; const TI = t.icon; return (
                    <button key={n} type="button" onClick={() => jump(n)} className="hx-jn-next"><TI className="h-4 w-4" aria-hidden />{t.label}</button>
                  ); })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
