"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 55; // per-character typing speed
const DELETE_MS = 30; // per-character deleting speed
const HOLD_MS = 1600; // pause once a role is fully typed

/**
 * Typewriter that cycles through `roles`, typing each one out, holding, then
 * deleting before moving to the next — with a blinking caret. Falls back to a
 * static first role when the user prefers reduced motion.
 */
export default function RoleCycler({ roles = [] }) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Respect prefers-reduced-motion.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || roles.length === 0) return;

    const current = roles[index % roles.length];

    // Finished typing → hold, then start deleting.
    if (!deleting && text === current) {
      const hold = setTimeout(() => setDeleting(true), HOLD_MS);
      return () => clearTimeout(hold);
    }

    // Finished deleting → advance to the next role.
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % roles.length);
      return;
    }

    const step = setTimeout(
      () => {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      },
      deleting ? DELETE_MS : TYPE_MS
    );
    return () => clearTimeout(step);
  }, [text, deleting, index, reduced, roles]);

  if (roles.length === 0) return null;

  // Static, accessible fallback when motion is reduced.
  if (reduced) {
    return (
      <p className="mt-4 font-mono text-sm text-teal sm:text-[1rem] md:text-lg">
        {roles[0]}
      </p>
    );
  }

  return (
    <p
      className="mt-4 flex min-h-[1.6em] items-center font-mono text-sm text-teal sm:text-[1rem] md:text-lg"
      aria-live="polite"
    >
      <span>{text}</span>
      <span
        className="animate-caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[1px] bg-teal"
        aria-hidden
      />
    </p>
  );
}
