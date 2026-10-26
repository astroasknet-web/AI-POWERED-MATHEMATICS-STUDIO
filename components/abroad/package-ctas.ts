import { ABROAD_PACKAGES, packageSku, rs } from "@/lib/abroad/packages";
import type { PackageCta } from "./PackageShowcase";

/** The button for each package: a fixed-fee package goes to checkout (after sign-in), a quoted package goes to the quote request on the dashboard. */
export function packageCtas(signedIn: boolean): Record<string, PackageCta> {
  const out: Record<string, PackageCta> = {};
  for (const p of ABROAD_PACKAGES) {
    const target = p.online ? `/checkout?sku=${packageSku(p.key)}` : `/abroad/packages?quote=${p.key}#quote`;
    out[p.key] = {
      href: signedIn ? target : `/login?next=${encodeURIComponent(target)}`,
      label: p.online ? `Choose this package · ${rs(p.from)}` : "Request a quote",
      quote: !p.online,
    };
  }
  return out;
}
