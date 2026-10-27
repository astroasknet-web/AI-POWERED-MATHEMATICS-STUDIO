import type { Metadata } from "next";
import Link from "next/link";
import { PortalPage } from "@/components/portal/shell";
import { Bar, Card, Flash, Locked, StartButton, btnLight, btnPrimary, when } from "@/components/reading/ui";
import { studentPage } from "@/lib/reading/page";
import { buildDashboard } from "@/lib/reading/views";
import { getStudyMinutes, openAssessment } from "@/lib/reading/store";
import { FREE_FEATURES, PREMIUM_FEATURES, feeNow } from "@/lib/reading/access";
import { KIND_LABEL, type Kind } from "@/lib/reading/taxonomy";
import { studyMinutesAction } from "../actions";

export const metadata: Metadata = { title: "My Reading Studio | GrowQR", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function Dashboard({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const { me } = await studentPage("/reading-studio/dashboard");
  const [d, open, fee, minutes] = await Promise.all([buildDashboard(me.id), openAssessment(me.id), feeNow(), getStudyMinutes(me.id)]);
  const mastered = d.levels.filter((l) => l.mastered).length;
  return (
    <PortalPage user={me} active="reading-studio" title="My Reading Studio" subtitle="Find out how you read, what to practise, and track the change." wide="full">
      <Flash text={sp.e} />
      {open ? (
        <Card tone="soft" title="You have an assessment in progress">
          <p className="text-[14.5px] text-ink-2">{KIND_LABEL[open.kind as Kind]} started {when(open.createdAt)}. Your saved answers are kept.</p>
          <Link href={`/reading-studio/assessment/${open.publicId}`} className={`${btnPrimary} mt-3`}>Continue</Link>
        </Card>
      ) : null}

      <section className="mb-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]" aria-label="Where you are">
        <Card title={d.latest ? "Your latest result" : "Start here: your starting assessment"} className="!mb-0">
          {d.latest ? (
            <div>
              <p className="text-[40px] font-semibold leading-none text-ink">{d.latest.overall === null ? "n/a" : d.latest.overall}<span className="text-[18px] font-normal text-ink-3"> / 100 · provisional</span></p>
              <p className="mt-2 text-[14px] text-ink-3">{KIND_LABEL[d.latest.kind as Kind]} on {when(d.latest.at)}{d.latest.completion === "partial" ? " (partial)" : ""}</p>
              {d.strongest.length || d.weakest.length ? (
                <ul className="mt-3 space-y-1 text-[14.5px] text-ink-2">
                  {d.strongest.length ? <li><span className="font-semibold text-ink">Going well:</span> {d.strongest.join(", ")}</li> : null}
                  {d.weakest.length ? <li><span className="font-semibold text-ink">To build next:</span> {d.weakest.join(", ")}</li> : null}
                </ul>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href={`/reading-studio/results/${d.latest.id}`} className={btnPrimary}>See my results</Link>
                <Link href="/reading-studio/progress" className={btnLight}>My progress</Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="max-w-prose text-[15px] leading-relaxed text-ink-2">Two short passages and about sixteen questions. You read, then answer. You get an overall score, an estimate of your reading speed, and which skills are strongest and which need work. It is free{d.freeLeft ? ` (${d.freeLeft} included)` : ""}.</p>
              <div className="mt-4"><StartButton kind="diagnostic" back="/reading-studio/dashboard">Start the starting assessment</StartButton></div>
            </div>
          )}
          {d.latest && d.freeLeft > 0 && !d.premium ? <div className="mt-4 border-t border-black/10 pt-4"><StartButton kind="diagnostic" back="/reading-studio/dashboard" className={btnLight}>Take another starting assessment ({d.freeLeft} free left)</StartButton></div> : null}
        </Card>

        <Card title="Study time" className="!mb-0">
          <form action={studyMinutesAction} className="flex flex-wrap items-end gap-3">
            <input type="hidden" name="back" value="/reading-studio/dashboard" />
            <div><label htmlFor="mins" className="block text-[13.5px] text-ink-3">Minutes a day you can study</label>
              <select id="mins" name="minutes" defaultValue={minutes ?? 20} className="mt-1 min-h-[44px] rounded-lg border border-black/20 bg-white px-3 text-[15px]">{[10, 15, 20, 30, 45, 60].map((m) => <option key={m} value={m}>{m} minutes</option>)}</select></div>
            <button type="submit" className={btnLight}>Save</button>
          </form>
          <p className="mt-2 text-[13px] text-ink-3">Your 7-day plan is sized to this.</p>
        </Card>
      </section>

      {d.premium ? (
        <Card title="Your levels" id="levels">
          <p className="mb-4 text-[14.5px] text-ink-2">Each level opens when you show mastery of the one before it, not after a set time. {d.current ? <>You are working on <strong>Level {d.current.key}: {d.current.name}</strong>.</> : null}</p>
          <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {d.levels.map((l) => (
              <li key={l.key} className={`rounded-xl border p-4 ${l.mastered ? "border-[#0F766E] bg-[#F0F8F6]" : l.unlocked ? "border-black/15 bg-white" : "border-black/10 bg-cream-2"}`}>
                <p className="text-[12.5px] font-semibold uppercase tracking-wide text-ink-3">Level {l.key} · {l.mastered ? "Mastered" : l.unlocked ? "Open" : "Locked"}</p>
                <h3 className="mt-0.5 text-[16px] font-semibold text-ink">{l.name}</h3>
                <p className="mt-1 text-[13.5px] leading-snug text-ink-3">{l.message}</p>
                {l.unlocked ? <Link href={`/reading-studio/levels/${l.key}`} className="mt-2 inline-block text-[14px] font-semibold text-orange-deep underline">Open level</Link> : null}
              </li>
            ))}
          </ol>
          <div className="mt-5"><Bar pct={(mastered / Math.max(1, d.levels.length)) * 100} label="Levels mastered" tone="teal" /><p className="mt-1 text-[12.5px] text-ink-3">{mastered} of {d.levels.length} levels mastered</p></div>
        </Card>
      ) : (
        <Card title="What the package adds" tone="soft">
          <div className="grid gap-5 md:grid-cols-2">
            <div><p className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-ink-3">Free for every student</p><ul className="space-y-1.5 text-[14.5px] text-ink-2">{FREE_FEATURES.map((f) => <li key={f}>✓ {f}</li>)}</ul></div>
            <div><p className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-orange-deep">With the Reading Studio package</p><ul className="space-y-1.5 text-[14.5px] text-ink-2">{PREMIUM_FEATURES.map((f) => <li key={f}>+ {f}</li>)}</ul></div>
          </div>
          <Link href="/reading-studio/upgrade?from=dashboard" className={`${btnPrimary} mt-4`}>See the package{fee ? ` (₹${(fee.amountMinor / 100).toLocaleString("en-IN")})` : ""}</Link>
          <p className="mt-3 text-[13px] text-ink-3">Level A is free to read: <Link className="underline" href="/reading-studio/levels/A">open the Level A lesson</Link>.</p>
        </Card>
      )}

      {d.premium ? (
        <Card title="More ways to practise">
          <div className="flex flex-wrap gap-3">
            <StartButton kind="fresh" back="/reading-studio/dashboard" className={btnLight}>Fresh assessment</StartButton>
            <StartButton kind="timed" back="/reading-studio/dashboard" className={btnLight}>Timed reading</StartButton>
            <StartButton kind="recall" back="/reading-studio/dashboard" className={btnLight}>Delayed recall</StartButton>
            <Link href="/reading-studio/plan" className={btnLight}>My 7-day plan</Link>
          </div>
        </Card>
      ) : (
        <Locked headline="Levels, practice and your plan" body={d.latest ? `You have ${d.assessments} assessment${d.assessments === 1 ? "" : "s"} on record. The package adds ten levels with mastery checks, targeted practice and a 7-day plan built from your answers.` : "Take your starting assessment first. The package then turns the result into targeted practice, ten levels and a 7-day plan."} source="dashboard" />
      )}
    </PortalPage>
  );
}
