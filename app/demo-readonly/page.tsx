import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Read-only demo | GrowQR", robots: { index: false, follow: false } };

export default function DemoReadOnly() {
  return (
    <main className="mx-auto max-w-[560px] px-6 py-24 text-center">
      <h1 className="text-[28px] font-semibold text-ink">This is a read-only demo</h1>
      <p className="mt-3 text-[16px] text-ink-3">You can look around every screen, but changes, downloads and exports are switched off for this account.</p>
      <p className="mt-6"><Link href="/console" className="inline-flex min-h-[48px] items-center rounded-lg bg-orange px-6 font-semibold text-white hover:bg-orange-dark">Back to the dashboard</Link></p>
    </main>
  );
}
