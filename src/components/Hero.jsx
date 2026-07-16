"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import RoleCycler from "./RoleCycler";

const readout = [
  { k: "SLA", v: "on target", tone: "teal" },
  { k: "AHT", v: "vs. forecast", tone: "ink" },
  { k: "Attrition", v: "trending down", tone: "gold" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-atmos pt-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-content items-center gap-12 px-5 pb-20 md:grid-cols-[1.15fr_0.85fr] md:px-8 md:pb-28">
        {/* Left — copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="eyebrow">{profile.tagline}</span>
            <span className="h-3 w-px bg-line" />
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
              <MapPin className="h-3 w-3" /> {profile.location}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-[2.7rem] font-bold leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-[4.2rem]"
          >
            Karl Ian Martin
            <span className="block text-ink-muted">Cañeda</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.09 }}
          >
            <RoleCycler roles={profile.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink-muted md:text-base"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-md bg-teal px-5 py-3 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
            >
              Book a call
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-teal/50 hover:text-teal"
            >
              <Download className="h-4 w-4" />
              Résumé
            </a>
          </motion.div>
        </div>

        {/* Right — headshot + readout signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm md:max-w-none"
        >
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
            <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full border border-line/80 bg-base/70 px-3 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-teal" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                Open to lead
              </span>
            </div>
            <Image
              src={profile.photo}
              alt={profile.name}
              width={720}
              height={900}
              priority
              className="h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent" />
          </div>

          {/* Floating readout card */}
          <div className="absolute -bottom-5 -left-4 w-[62%] rounded-xl border border-line bg-surface-2/95 p-3.5 shadow-2xl backdrop-blur md:-left-8">
            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
              Floor readout
            </p>
            <ul className="space-y-2">
              {readout.map((r) => (
                <li key={r.k} className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] text-ink-muted">{r.k}</span>
                  <span
                    className={`font-mono text-[11px] ${
                      r.tone === "teal" ? "text-teal" : r.tone === "gold" ? "text-gold" : "text-ink"
                    }`}
                  >
                    {r.v}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
