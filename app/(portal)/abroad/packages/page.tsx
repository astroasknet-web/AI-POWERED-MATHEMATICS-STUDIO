import type { Metadata } from "next";
import Link from "next/link";
import { requireUser } from "@/lib/portal/guard";
import { entitlementsFor } from "@/lib/pay/entitlements";
import { ABROAD_PACKAGES, PACKAGE_DISCLAIMER, packageByKey, priceLabel } from "@/lib/abroad/packages";
import PackageShowcase from "@/components/abroad/PackageShowcase";
import { packageCtas } from "@/components/abroad/package-ctas";
import { PortalPage } from "@/components/portal/shell";
import { requestPackageQuoteAction } from "./actions";
import "@/components/abroad/packages.css";

export const metadata: Metadata = { title: "Overseas education packages | GrowQR" };
export const dynamic = "force-dynamic";

type SP = { quote?: string; ok?: string; e?: string; pkg?: string };

export default async function AbroadPackagesPage({ searchParams }: { searchParams: Promise<SP> }) {
  const me = await requireUser("student");
  const sp = await searchParams;
  const keys = new Set<string>(ABROAD_PACKAGES.map((p) => p.key));
  const owned = (await entitlementsFor(me.id).catch(() => [])).filter((e) => e.kind === "consulting" && e.status === "active" && keys.has(e.ref)).map((e) => e.ref);
  const quote = packageByKey(sp.quote ?? "");
  const initial = quote?.key ?? packageByKey(sp.pkg ?? "")?.key ?? "application-pro";
  return (
    <PortalPage user={me} active="abroad-packages" title="Overseas education" subtitle="Expert help for every step of studying abroad. Pick a package to see exactly what it includes." wide="full">
      <div className="mb-6 flex flex-wrap gap-3 text-[14px]">
        <Link href="/abroad" className="inline-flex min-h-[44px] items-center rounded-lg border border-black/[0.15] bg-white px-4 font-semibold text-ink hover:bg-cream-2">My study-abroad journey</Link>
        <Link href="/abroad/matches" className="inline-flex min-h-[44px] items-center rounded-lg border border-black/[0.15] bg-white px-4 font-semibold text-ink hover:bg-cream-2">My university matches</Link>
        <Link href="/overseas-packages" className="inline-flex min-h-[44px] items-center rounded-lg px-4 font-semibold text-ink underline underline-offset-4">Compare every service</Link>
      </div>

      {owned.length ? (
        <p role="status" className="mb-6 rounded-2xl bg-emerald-50 px-5 py-3 text-[14.5px] text-emerald-900">
          Your package{owned.length > 1 ? "s" : ""}: <b>{owned.map((k) => packageByKey(k)?.name).join(", ")}</b>. Your counsellor will contact you about the next steps, and you can follow the conversation under <Link href="/support/tickets" className="font-semibold underline">Support</Link>.
        </p>
      ) : null}

      <div className="rounded-[32px] bg-gradient-to-br from-[#0b1020] via-[#10204a] to-[#1b1740] p-5 sm:p-9">
        <PackageShowcase ctas={packageCtas(true)} owned={owned} initial={initial} variant="page" headingLevel={2} />
      </div>

      <section id="quote" className="mt-8 scroll-mt-24 rounded-2xl border border-black/[0.08] bg-white p-5 shadow-card sm:p-7" aria-labelledby="quote-h">
        <h2 id="quote-h" className="text-[18px] font-semibold text-ink">Request a quote</h2>
        <p className="mt-1 text-[14.5px] text-ink-3">End-to-End Global Success and Global Guardian are priced by destination and scope. Tell us a little and a counsellor will reply on a support ticket with your fee. You pay nothing until you agree it.</p>
        {sp.ok ? <p role="status" className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-[14px] text-emerald-900">Requested. Your ticket is <Link className="font-semibold underline" href={`/support/tickets/${sp.ok}`}>{sp.ok}</Link>.</p> : null}
        {sp.e ? <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-[14px] text-red-800">{sp.e}</p> : null}
        <form action={requestPackageQuoteAction} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-[14px] font-semibold text-ink">Package
            <select name="pkg" defaultValue={quote?.key ?? "global-success"} className="min-h-[46px] rounded-lg border border-black/[0.15] bg-white px-3 font-normal">
              {ABROAD_PACKAGES.filter((p) => !p.online).map((p) => <option key={p.key} value={p.key}>{p.name} ({priceLabel(p)})</option>)}
            </select>
          </label>
          <label className="grid gap-1.5 text-[14px] font-semibold text-ink">Country you have in mind (optional)
            <input name="country" maxLength={80} className="min-h-[46px] rounded-lg border border-black/[0.15] px-3 font-normal" placeholder="For example, Canada" />
          </label>
          <label className="grid gap-1.5 text-[14px] font-semibold text-ink sm:col-span-2">Anything we should know (optional)
            <textarea name="note" rows={3} maxLength={1500} className="rounded-lg border border-black/[0.15] px-3 py-2 font-normal" placeholder="Course, intake, budget, or questions" />
          </label>
          <div className="sm:col-span-2"><button type="submit" className="inline-flex min-h-[48px] items-center rounded-lg bg-orange-deep px-6 font-semibold text-white hover:bg-ink">Send quote request</button></div>
        </form>
      </section>
      <p className="mt-5 max-w-[60em] text-[12.5px] leading-relaxed text-ink-4">{PACKAGE_DISCLAIMER}</p>
    </PortalPage>
  );
}
