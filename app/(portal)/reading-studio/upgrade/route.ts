import { NextResponse } from "next/server";
import { currentUser } from "@/lib/portal/guard";
import { buyLink, hasPremium } from "@/lib/reading/access";
import { logEvent } from "@/lib/reading/store";

export const dynamic = "force-dynamic";

/** Every "upgrade" button points here: the click is counted (for the administrator's conversion view) and the student goes to the existing checkout. Nothing here grants access. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const from = (url.searchParams.get("from") ?? "page").replace(/[^a-z0-9-]/gi, "").slice(0, 40) || "page";
  const base = process.env.PORTAL_APP_URL || url.origin;
  const me = await currentUser();
  if (!me) return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(`/reading-studio/upgrade?from=${from}`)}`, base));
  if (me.role !== "student") return NextResponse.redirect(new URL("/reading-studio", base));
  if (await hasPremium(me.id)) return NextResponse.redirect(new URL("/reading-studio/dashboard", base));
  await logEvent(me.id, "cta_click", from);
  return NextResponse.redirect(new URL(buyLink(), base));
}
