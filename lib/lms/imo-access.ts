import { currentUser } from "@/lib/portal/guard";
import { hasPurchasedCourse } from "@/lib/pay/plans";
import { courseFee } from "@/lib/pay/course-access";
import { imoFeeRupees, imoSlug } from "@/lib/pay/course-fees";
import { classNumber } from "./school";

/**
 * Maths Olympiad (IMO) is sold one class at a time (sku `course-imo-class-N`). Nothing in it is free: lessons, chapter tests and mock tests open only for
 * someone who bought that class. There is no plan pick and no free preview, and a class stays locked when the shop is unreachable (never open by default).
 */
export interface ImoAccess { open: boolean; signedIn: boolean; slug: string; rupees: number; onSale: boolean }

export async function imoAccess(cls: string): Promise<ImoAccess> {
  const n = classNumber(cls);
  const slug = imoSlug(n);
  const me = await currentUser().catch(() => null);
  const open = me ? await hasPurchasedCourse(me.id, slug).catch(() => false) : false;
  const fee = await courseFee(slug).catch(() => null);
  return { open, signedIn: !!me, slug, rupees: fee ? Math.round(fee.amountMinor / 100) : imoFeeRupees(n), onSale: !!fee };
}
