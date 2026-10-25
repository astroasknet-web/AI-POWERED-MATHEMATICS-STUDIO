import { Check } from "lucide-react";
import { perUnit, savingFor, type PlanStack } from "@/lib/market/plan-value";

const rs = (n: number): string => `₹${n.toLocaleString("en-IN")}`;

/** The saving line under a plan's price: shown only when the plan costs less than its priced contents bought one by one. */
export function SavingBadge({ stack, price }: { stack: PlanStack; price: number }) {
  const s = savingFor(price, stack.value);
  if (!s) return null;
  return (
    <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-[0.85rem] leading-snug text-emerald-900">
      Worth <strong>{rs(stack.value)}</strong> bought one by one. <strong>You save {rs(s.amount)} ({s.percent}%)</strong>
    </p>
  );
}

/** What the plan includes with each item's own price, the total, and what is included but not priced. */
export function ValueStack({ stack, price, period, accent }: { stack: PlanStack; price: number; period: string; accent: string }) {
  const s = savingFor(price, stack.value);
  const each = perUnit(price, stack);
  return (
    <div className="mt-6 border-t border-black/[0.07] pt-5">
      <p className="mb-3 text-[0.82rem] font-semibold text-ink">What you get, at its own price</p>
      <ul className="space-y-3">
        {stack.lines.map((l) => (
          <li key={l.label} className="flex items-start justify-between gap-3 text-[0.9rem] leading-snug text-ink-2">
            <span className="flex min-w-0 gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} aria-hidden />
              <span className="min-w-0">
                {l.label}
                {l.detail ? <span className="mt-0.5 block text-[0.76rem] text-ink-4">{l.detail}</span> : null}
              </span>
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-ink">{rs(l.rupees)}</span>
          </li>
        ))}
      </ul>
      {s ? (
        <dl className="mt-4 space-y-1.5 border-t border-dashed border-black/15 pt-3 text-[0.88rem]">
          <div className="flex justify-between gap-3"><dt className="text-ink-3">Bought one by one</dt><dd className="font-semibold tabular-nums text-ink">{rs(stack.value)}</dd></div>
          <div className="flex justify-between gap-3"><dt className="text-ink-3">This plan, {period}</dt><dd className="font-semibold tabular-nums text-ink">{rs(price)}</dd></div>
          <div className="flex justify-between gap-3 text-emerald-700"><dt className="font-semibold">You save</dt><dd className="font-semibold tabular-nums">{rs(s.amount)} ({s.percent}%)</dd></div>
        </dl>
      ) : (
        <p className="mt-4 border-t border-dashed border-black/15 pt-3 text-[0.82rem] leading-snug text-ink-3">
          Those items come to {rs(stack.value)} bought one by one. The {rs(price)} for {period} also covers everything listed below, which has no price of its own, so we do not claim a saving here.
        </p>
      )}
      {each ? <p className="mt-2 text-[0.8rem] text-ink-3">Works out to about {rs(each)} per course or studio.</p> : null}
      {s && stack.valueMax > stack.value ? <p className="mt-1 text-[0.8rem] text-ink-3">Worth up to {rs(stack.valueMax)} if you pick the higher-priced courses.</p> : null}

      <p className="mb-2 mt-5 text-[0.82rem] font-semibold text-ink">Also included <span className="font-normal text-ink-4">(not priced, not counted above)</span></p>
      <ul className="space-y-2">
        {stack.extras.map((t) => (
          <li key={t} className="flex gap-2.5 text-[0.85rem] leading-snug text-ink-3">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink-4" aria-hidden />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
