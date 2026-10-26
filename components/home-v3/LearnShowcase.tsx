"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Award, Hammer, Layers, Clock } from "lucide-react";

export interface LearnCourse { slug: string; title: string; brief: string; levelLabel: string; hours: string; cat: string }
export interface LearnTab { key: string; label: string; courses: LearnCourse[] }

/** The course picker on the home page: choose a field, see real courses with their own pictures. Everything comes from the catalogue the page passes in. */
export default function LearnShowcase({ tabs, total, fields, catNames }: { tabs: LearnTab[]; total: number; fields: number; catNames: Record<string, string> }) {
  const [key, setKey] = useState(tabs[0].key);
  const tab = tabs.find((t) => t.key === key)!;
  return (
    <div>
      <ul data-rv className="hx-ln-stats" aria-label="What every course includes">
        <li><Layers className="h-4 w-4" aria-hidden /><b>{total}</b> courses in <b>{fields}</b> fields</li>
        <li><Hammer className="h-4 w-4" aria-hidden />Hands-on project</li>
        <li><Award className="h-4 w-4" aria-hidden />Certificate and badge</li>
        <li><Clock className="h-4 w-4" aria-hidden />Self-paced</li>
      </ul>

      <div data-rv role="group" aria-label="Choose a field" className="hx-ln-tabs">
        {tabs.map((t) => <button key={t.key} type="button" aria-pressed={key === t.key} onClick={() => setKey(t.key)} className="hx-ln-tab">{t.label}</button>)}
      </div>

      <ul key={key} className="hx-ln-grid hx-jn-in" aria-label={`${tab.label} courses`}>
        {tab.courses.map((c) => (
          <li key={c.slug}>
            <Link href={`/courses/${c.slug}`} className="hx-ln-card group">
              <span className="hx-ln-thumb">
                {/* eslint-disable-next-line @next/next/no-img-element -- fixed pre-built WebP, two sizes */}
                <img src={`/course-thumbs/${c.slug}-640.webp`} srcSet={`/course-thumbs/${c.slug}-640.webp 640w, /course-thumbs/${c.slug}.webp 1920w`} sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw" alt="" width={640} height={360} loading="lazy" decoding="async" />
                <span className="hx-ln-lvl">{c.levelLabel}</span>
              </span>
              <span className="hx-ln-body">
                <span className="hx-ln-cat">{catNames[c.cat]}</span>
                <span className="hx-ln-title">{c.title}</span>
                <span className="hx-ln-brief">{c.brief}</span>
                <span className="hx-ln-foot"><span>{c.hours}</span><span className="hx-ln-go">Explore <ArrowRight className="h-4 w-4" aria-hidden /></span></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
