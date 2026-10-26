import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { currentViewer, MarketShell } from "@/components/market/shell";
import PackageShowcase from "@/components/abroad/PackageShowcase";
import PackageMatrix from "@/components/abroad/PackageMatrix";
import { packageCtas } from "@/components/abroad/package-ctas";
import { ABROAD_PACKAGES, PACKAGE_DISCLAIMER, packageByKey, priceLabel, rs } from "@/lib/abroad/packages";
import { SITE_URL } from "@/lib/seo";
import "@/components/abroad/packages.css";

export const dynamic = "force-dynamic"; // the buttons depend on whether you are signed in

export const metadata: Metadata = {
  title: "Overseas Education Packages: From Shortlisting to Settling Abroad | GrowQR",
  description: `Five levels of expert help for studying abroad, from a university shortlist at ${rs(1999)} to arrival, housing and welfare support after you land. Compare every service.`,
  alternates: { canonical: `${SITE_URL}/overseas-packages` },
};

const FAQ: Array<[string, string]> = [
  ["Which package should I start with?", "If you are still choosing where to apply, start with Discovery & Shortlisting. If you already know your course and universities, Application Pro covers the applications. Each level includes everything in the one before, so you can start small."],
  ["Can I move up to a higher package later?", "Yes. Tell your counsellor or raise a support ticket and we will work out what you have already covered."],
  ["Why are the top two packages a price range?", "The work depends on the destination, the number of applications and how much support you want after landing. A counsellor confirms the exact fee with you before you pay anything."],
  ["Does any package guarantee admission or a visa?", "No. Universities and governments make those decisions. The packages improve how prepared and organised you are."],
  ["How do I pay?", "Levels 1 to 3 are paid online at checkout. Levels 4 and 5 are paid once the fee is agreed with your counsellor."],
];

export default async function OverseasPackagesPage({ searchParams }: { searchParams: Promise<{ pkg?: string }> }) {
  const me = await currentViewer();
  const sp = await searchParams;
  const initial = packageByKey(sp.pkg ?? "")?.key ?? "application-pro";
  return (
    <MarketShell user={me} active="abroad">
      <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-ink-3"><Link href="/study-abroad" className="underline">Study abroad</Link> / Packages</nav>
      <div className="rounded-[32px] bg-gradient-to-br from-[#0b1020] via-[#10204a] to-[#1b1740] p-5 text-white sm:p-10">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#8ff0ff]">Overseas education</p>
        <h1 className="mt-3 max-w-[18em] text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.06] tracking-tight">From the first shortlist to your first month abroad.</h1>
        <p className="mt-4 max-w-[44em] text-[1.05rem] leading-relaxed text-white/75">Five levels of hands-on help from GrowQR&apos;s counsellors. Each level includes everything in the one before it, so you can start where you are and go as far as you need. Prices run from {rs(ABROAD_PACKAGES[0].from)} to {priceLabel(ABROAD_PACKAGES[4])}.</p>
        <div className="mt-10"><PackageShowcase ctas={packageCtas(!!me)} initial={initial} variant="page" headingLevel={2} /></div>
      </div>

      <section className="mt-10 rounded-[32px] bg-[#0b1020] p-5 text-white sm:p-10" aria-labelledby="ap-compare">
        <h2 id="ap-compare" className="text-[clamp(1.5rem,3vw,2.2rem)] font-semibold">Compare every service</h2>
        <p className="mt-2 mb-6 max-w-[40em] text-white/70">A tick means the service is included from that level upward.</p>
        <PackageMatrix />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]" aria-labelledby="ap-faq">
        <div>
          <h2 id="ap-faq" className="text-[clamp(1.5rem,3vw,2.2rem)] font-semibold text-ink">Questions families ask</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-3">{PACKAGE_DISCLAIMER}</p>
          <p className="mt-5 flex flex-wrap gap-3">
            <Link href="/study-abroad" className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-black/[0.15] px-5 font-semibold text-ink hover:bg-cream-3">Explore universities <ArrowRight className="h-4 w-4" aria-hidden /></Link>
            <Link href="/contact" className="inline-flex min-h-[46px] items-center rounded-full px-5 font-semibold text-ink underline underline-offset-4">Talk to us</Link>
          </p>
        </div>
        <div className="grid gap-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group rounded-2xl border border-black/[0.08] bg-white p-5 shadow-card">
              <summary className="cursor-pointer list-none text-[16px] font-semibold text-ink">{q}</summary>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-3">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </MarketShell>
  );
}
