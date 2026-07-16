"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { profile } from "@/data/profile";
import { submitLead } from "@/lib/analytics";
import { firebaseReady } from "@/lib/firebase";
import Reveal from "./Reveal";

const initial = { name: "", email: "", company: "", preferredTime: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please add your name and email.");
      return;
    }
    setState("sending");
    try {
      if (!firebaseReady) {
        // Graceful fallback before Firebase is wired up.
        const subject = encodeURIComponent(`Booking request from ${form.name}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nPreferred time: ${form.preferredTime}\n\n${form.message}`
        );
        window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
        setState("done");
        return;
      }
      await submitLead(form);
      setState("done");
      setForm(initial);
    } catch (err) {
      setError(err.message || "Something went wrong. Try email instead.");
      setState("error");
    }
  }

  return (
    <section id="contact" className="section-pad border-t border-line bg-surface/30">
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          {/* Left — invitation + direct channels */}
          <Reveal>
            <p className="eyebrow">05 — Contact</p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-ink md:text-[2.6rem]">
              Let&apos;s talk about your operation.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-muted">
              Hiring for an ops role, spinning up a new site, or need a steady hand on a struggling account? Send the details and I&apos;ll get back within a day.
            </p>

            <div className="mt-9 space-y-3">
              <a
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-3.5 rounded-lg border border-line bg-surface/60 p-4 transition-colors hover:border-teal/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-base text-teal">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Email</p>
                  <p className="truncate text-sm text-ink">{profile.email}</p>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-ink-faint transition-colors group-hover:text-teal" />
              </a>
              <a
                href={`tel:${profile.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-3.5 rounded-lg border border-line bg-surface/60 p-4 transition-colors hover:border-teal/40"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-base text-teal">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Phone</p>
                  <p className="text-sm text-ink">{profile.phone}</p>
                </div>
              </a>
              <div className="flex items-center gap-3.5 rounded-lg border border-line bg-surface/60 p-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-base text-teal">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Based in</p>
                  <p className="text-sm text-ink">{profile.location}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right — booking form */}
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-line bg-base/60 p-6 md:p-8">
              {state === "done" ? (
                <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                  <CheckCircle2 className="h-12 w-12 text-teal" />
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">Request received</h3>
                  <p className="mt-2 max-w-xs text-sm text-ink-muted">
                    Thanks, {form.name || "there"}. Your details are in — expect a reply within one business day.
                  </p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-6 text-sm font-medium text-teal hover:underline"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                    Book a call
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" required>
                      <input
                        value={form.name}
                        onChange={update("name")}
                        className={inputCls}
                        placeholder="Jane Dela Cruz"
                        autoComplete="name"
                      />
                    </Field>
                    <Field label="Email" required>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        className={inputCls}
                        placeholder="jane@company.com"
                        autoComplete="email"
                      />
                    </Field>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Company">
                      <input
                        value={form.company}
                        onChange={update("company")}
                        className={inputCls}
                        placeholder="Optional"
                        autoComplete="organization"
                      />
                    </Field>
                    <Field label="Preferred time">
                      <input
                        value={form.preferredTime}
                        onChange={update("preferredTime")}
                        className={inputCls}
                        placeholder="e.g. Tue AM, PH time"
                      />
                    </Field>
                  </div>
                  <Field label="What do you need?">
                    <textarea
                      value={form.message}
                      onChange={update("message")}
                      rows={4}
                      className={`${inputCls} resize-none`}
                      placeholder="A line or two about the role or the operation."
                    />
                  </Field>

                  {error && <p className="text-[13px] text-gold">{error}</p>}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-teal px-5 py-3 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {state === "sending" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Send request <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  {!firebaseReady && (
                    <p className="text-center font-mono text-[10px] text-ink-faint">
                      Connect Firebase to store leads — until then this opens your mail app.
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-teal";

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-medium text-ink-muted">
        {label} {required && <span className="text-teal">*</span>}
      </span>
      {children}
    </label>
  );
}
