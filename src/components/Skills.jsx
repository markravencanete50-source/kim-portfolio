"use client";

import { skills } from "@/data/profile";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section className="section-pad border-t border-line">
      <div className="mx-auto max-w-content">
        <div className="grid gap-8 md:grid-cols-[0.6fr_1.4fr] md:gap-12">
          <Reveal>
            <p className="eyebrow">04 — Toolkit</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-[2.6rem]">
              The kit I run with.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2.5 md:pt-4">
              {skills.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-line bg-surface/50 px-3.5 py-2 text-[13px] text-ink-muted transition-colors hover:border-teal/40 hover:text-ink"
                >
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
