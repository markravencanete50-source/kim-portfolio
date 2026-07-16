"use client";

import { stats, verticals } from "@/data/profile";
import Reveal from "./Reveal";

export default function Stats() {
  return (
    <section className="relative border-y border-line bg-surface/40">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="px-2 py-8 md:px-6 md:py-10">
                <div className="font-display text-3xl font-bold text-ink md:text-4xl">
                  {s.value}
                </div>
                <div className="mt-1.5 text-[13px] leading-snug text-ink-muted">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Verticals marquee */}
      <div className="overflow-hidden border-t border-line py-3.5">
        <div className="flex w-max animate-marquee gap-8 pr-8">
          {[...verticals, ...verticals].map((v, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint"
            >
              {v}
              <span className="h-1 w-1 rounded-full bg-teal/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
