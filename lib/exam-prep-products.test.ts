import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { EXAM_PREP, STUDIO_COURSES } from "@/lib/pay/course-fees";
import { examByHub, examForExamSlug, examForIelts, examForLearn, examForStudy } from "@/lib/lms/exam-products";
import { hub, hubs } from "@/lib/market/exam-prep";
import { EXAMS } from "@/lib/lms/content";
import { EXAM_SLUGS } from "@/lib/lms/exams";
import { STUDY_KEYS } from "@/lib/lms/study";

describe("exam preparation products", () => {
  it("are priced as the owner set them", () => {
    expect(Object.fromEntries(EXAM_PREP.map((e) => [e.key, e.rupees]))).toEqual({ jee: 999, neet: 999, upsc: 1599, "ssc-cgl": 899, "cat-quant": 599, "sat-math": 1299, gre: 1599, gmat: 1599, ielts: 1299, "ap-calculus": 1299 });
  });
  it("GMAT is held back (no lessons yet) and everything else is on sale", () => {
    expect(EXAM_PREP.filter((e) => !e.onSale).map((e) => e.key)).toEqual(["gmat"]);
  });
  it("each is a studio-style course product with its own slug, and each belongs to a real exam-prep hub", () => {
    for (const e of EXAM_PREP) {
      expect(STUDIO_COURSES.some((s) => s.slug === e.slug && s.rupees === e.rupees), e.key).toBe(true);
      expect(hub(e.hub), e.hub).not.toBeNull();
      expect(examByHub(e.hub)?.key).toBe(e.key);
    }
  });
  it("every lesson and test route that has content maps to a product, and CTET stays free", () => {
    for (const x of EXAMS) expect(examForLearn(x.slug), x.slug).not.toBeNull();
    for (const s of EXAM_SLUGS) expect(examForExamSlug(s), s).not.toBeNull();
    for (const k of STUDY_KEYS) expect(examForStudy(k) === null, k).toBe(k === "ctet");
    expect(examForIelts()).toBe("ielts");
  });
  it("the Maths Olympiad hub is not listed for sale (it is sold per class instead)", () => {
    expect(examByHub("imo")).toBeNull();
    expect(hubs().some((h) => h.slug === "imo")).toBe(true); // the data stays; the page redirects to /olympiad/imo
  });
  it("the pages that gate content import the gate", () => {
    const need = ["app/learn/[exam]/[subject]/[chapter]/page.tsx", "app/learn/[exam]/[subject]/[chapter]/test/[testId]/page.tsx", "app/exam/[slug]/test/[paper]/page.tsx", "app/study/[course]/[chapter]/page.tsx", "app/ielts/[section]/[lesson]/page.tsx", "app/ielts/writing-practice-tests/[slug]/page.tsx", "app/ielts/speaking-practice-tests/[slug]/page.tsx"];
    for (const f of need) expect(fs.readFileSync(path.join(process.cwd(), f), "utf8"), f).toMatch(/lockedExam\(/);
  });
});
