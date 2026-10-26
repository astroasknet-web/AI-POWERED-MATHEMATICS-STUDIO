"use server";

import { redirect } from "next/navigation";
import { requireUser } from "@/lib/portal/guard";
import { createTicket } from "@/lib/support/store";
import { packageByKey, packageSku, priceLabel } from "@/lib/abroad/packages";

/** Ask for a quote on one of the quoted packages. It opens a study-abroad support ticket, so a counsellor replies there with the fee for this student. */
export async function requestPackageQuoteAction(fd: FormData): Promise<void> {
  const me = await requireUser("student");
  const p = packageByKey(String(fd.get("pkg") ?? ""));
  if (!p || p.online) redirect("/abroad/packages?e=" + encodeURIComponent("Choose one of the packages to request a quote for."));
  const note = String(fd.get("note") ?? "").trim().slice(0, 1500);
  const country = String(fd.get("country") ?? "").trim().slice(0, 80);
  const r = await createTicket({ id: me.id, name: me.name, email: me.email }, {
    category: "abroad",
    subject: `Package quote: ${p.name}`,
    related_ref: packageSku(p.key),
    body: `I would like a quote for the ${p.name} package (${priceLabel(p)}).${country ? `\nDestination I have in mind: ${country}.` : ""}${note ? `\n\n${note}` : ""}`,
  });
  redirect(`/abroad/packages?${r.ok ? `ok=${encodeURIComponent(r.no)}` : `e=${encodeURIComponent(r.error)}`}#quote`);
}
