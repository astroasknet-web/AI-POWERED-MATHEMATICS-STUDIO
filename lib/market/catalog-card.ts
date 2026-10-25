import type { Course } from "./courses";

/** What a catalogue card needs, as plain data: it goes through the search API and into the browser, so it carries nothing private. */
export interface CardCourse {
  slug: string;
  title: string;
  brief: string;
  cat_name: string;
  c1: string;
  c2: string;
  icon: string;
  level_label: string;
  badge: string;
  hours: string;
  modules: number;
  /** Paise, only while the course can be bought; null otherwise (a course that is not for sale shows no price). */
  price_minor: number | null;
  /** Lessons are on GrowQR now. */
  here: boolean;
}

export const toCard = (c: Course, here: boolean): CardCourse => ({
  slug: c.slug, title: c.title, brief: c.brief ?? "", cat_name: c.cat_name, c1: c.c1, c2: c.c2, icon: c.icon, level_label: c.level_label,
  badge: c.badge, hours: c.hours, modules: c.modules, price_minor: here ? c.price_minor : null, here,
});

export interface CourseProgress { status: "enrolled" | "in_progress" | "completed"; progress: number }

/** The one action a card offers, from what the student has actually done in the course. */
export function cardAction(c: Pick<CardCourse, "slug" | "here">, p: CourseProgress | undefined): { label: string; href: string; primary: boolean } {
  if (!c.here) return { label: "View course", href: `/courses/${c.slug}`, primary: false };
  const learn = `/courses/${c.slug}/learn`;
  if (!p || (p.status === "enrolled" && p.progress === 0)) return { label: p ? "Start learning" : "View course", href: p ? learn : `/courses/${c.slug}`, primary: !!p };
  if (p.status === "completed") return { label: "Review course", href: learn, primary: false };
  return { label: "Continue learning", href: learn, primary: true };
}

export interface CatalogResult {
  items: CardCourse[];
  /** Courses matching the query. */
  total: number;
  /** Every course in the catalogue, matching or not. */
  all: number;
  pages: number;
  page: number;
  size: number;
}
