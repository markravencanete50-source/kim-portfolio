"use client";

import { Gauge, LineChart, Users, GitBranch, Check } from "lucide-react";
import { capabilities } from "@/data/profile";
import Reveal from "./Reveal";

const icons = [Gauge, LineChart, Users, GitBranch];

export default function Capabilities() {
  return (
    <section id="capabilities" className="section-pad border-t border-line">
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="eyebrow">02 — Capabilities</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-[2.6rem]">
            What I own on the floor.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {capabilities.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={c.title} delay={(i % 2) * 0.08}>
                <article className="group h-full rounded-xl border border-line bg-surface/50 p-6 transition-colors hover:border-teal/40 md:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-base text-teal">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink">{c.title}</h3>
                  </div>
                  <p className="text-[14px] leading-relaxed text-ink-muted">{c.body}</p>
                  <ul className="mt-5 space-y-2 border-t border-line-soft pt-5">
                    {c.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[13px] text-ink">
                        <Check className="h-3.5 w-3.5 shrink-0 text-teal" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
