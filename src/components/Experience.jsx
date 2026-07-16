"use client";

import { experience } from "@/data/profile";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="section-pad border-t border-line bg-surface/20">
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="eyebrow">03 — Experience</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-[2.6rem]">
            Fifteen years, ten floors, one throughline.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] text-ink-muted">
            From first call to running the site — a record of hitting numbers while keeping teams intact.
          </p>
        </Reveal>

        <div className="relative mt-14">
          {/* vertical rail */}
          <div className="absolute left-2 top-2 bottom-2 w-px bg-line md:left-[7.5rem]" aria-hidden />

          <div className="space-y-10">
            {experience.map((job, i) => (
              <Reveal key={`${job.company}-${job.period}`} delay={0.04}>
                <div className="relative grid gap-4 pl-8 md:grid-cols-[7rem_1fr] md:gap-8 md:pl-0">
                  {/* node */}
                  <span className="absolute left-[3px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border-2 border-teal bg-base md:left-[7.15rem]" aria-hidden>
                    <span className="h-1 w-1 rounded-full bg-teal" />
                  </span>

                  {/* period column */}
                  <div className="md:pr-8 md:text-right">
                    <p className="font-mono text-[11px] leading-tight text-ink">{job.period}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                      {job.length}
                    </p>
                  </div>

                  {/* body */}
                  <div className="md:pl-8">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h3 className="font-display text-lg font-semibold text-ink">{job.role}</h3>
                      <span className="rounded-full border border-line bg-base px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-teal">
                        {job.account}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-ink-muted">{job.company}</p>
                    <ul className="mt-4 space-y-2">
                      {job.points.map((p, j) => (
                        <li key={j} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-muted">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-faint" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
