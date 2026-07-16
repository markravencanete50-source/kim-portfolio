"use client";

import { GraduationCap } from "lucide-react";
import { profile, education } from "@/data/profile";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <p className="eyebrow">01 — About</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-[2.6rem]">
              Performance and people are the same problem.
            </h2>
            <div className="mt-8 space-y-4 rounded-xl border border-line bg-surface/50 p-5">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                <GraduationCap className="h-3.5 w-3.5" /> Education
              </p>
              {education.map((e) => (
                <div key={e.degree} className="flex items-baseline justify-between gap-4 border-t border-line-soft pt-4 first:border-t-0 first:pt-0">
                  <div>
                    <p className="text-sm font-medium text-ink">{e.degree}</p>
                    <p className="text-[13px] text-ink-muted">{e.school}</p>
                  </div>
                  <span className="font-mono text-xs text-ink-faint">{e.year}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-5 md:pt-14">
              {profile.about.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-ink-muted md:text-base">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
