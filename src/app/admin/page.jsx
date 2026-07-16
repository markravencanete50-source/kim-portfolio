"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Lock,
  LogOut,
  RefreshCw,
  Eye,
  Users,
  CalendarCheck,
  Inbox,
  Loader2,
  Mail,
} from "lucide-react";
import { fetchLeads, fetchPageViews, updateLeadStatus } from "@/lib/analytics";
import { firebaseReady } from "@/lib/firebase";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "changeme";

// Normalize Firestore Timestamp | Date | null -> Date | null
function toDate(ts) {
  if (!ts) return null;
  if (typeof ts.toDate === "function") return ts.toDate();
  if (ts instanceof Date) return ts;
  return null;
}

function dayKey(d) {
  return d.toISOString().slice(0, 10);
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [authError, setAuthError] = useState("");

  const [leads, setLeads] = useState([]);
  const [views, setViews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  // Restore session unlock
  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("kc_admin") === "1") {
      setAuthed(true);
    }
  }, []);

  async function load() {
    setLoading(true);
    setLoadError("");
    try {
      const [l, v] = await Promise.all([fetchLeads(), fetchPageViews()]);
      setLeads(l);
      setViews(v);
    } catch (err) {
      setLoadError(err.message || "Could not load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authed && firebaseReady) load();
  }, [authed]);

  function unlock(e) {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) {
      setAuthed(true);
      window.sessionStorage.setItem("kc_admin", "1");
      setAuthError("");
    } else {
      setAuthError("Incorrect password.");
    }
  }

  function lock() {
    setAuthed(false);
    window.sessionStorage.removeItem("kc_admin");
  }

  async function setStatus(id, status) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await updateLeadStatus(id, status);
    } catch {
      load();
    }
  }

  // --- Derived analytics ---
  const metrics = useMemo(() => {
    const now = new Date();
    const todayKey = dayKey(now);
    const sessions = new Set(views.map((v) => v.session)).size;
    const viewsToday = views.filter((v) => {
      const d = toDate(v.createdAt);
      return d && dayKey(d) === todayKey;
    }).length;
    const newLeads = leads.filter((l) => l.status === "new").length;

    // last 7 days series
    const series = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const key = dayKey(d);
      const count = views.filter((v) => {
        const vd = toDate(v.createdAt);
        return vd && dayKey(vd) === key;
      }).length;
      series.push({ key, count, label: d.toLocaleDateString("en", { weekday: "short" }) });
    }

    // referrers
    const refMap = {};
    views.forEach((v) => {
      let r = v.referrer || "direct";
      try {
        if (r !== "direct") r = new URL(r).hostname.replace("www.", "");
      } catch {
        /* keep raw */
      }
      refMap[r] = (refMap[r] || 0) + 1;
    });
    const referrers = Object.entries(refMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      totalViews: views.length,
      sessions,
      viewsToday,
      totalLeads: leads.length,
      newLeads,
      series,
      referrers,
    };
  }, [views, leads]);

  const maxSeries = Math.max(1, ...metrics.series.map((s) => s.count));

  // --- Login gate ---
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-atmos px-5">
        <form
          onSubmit={unlock}
          className="w-full max-w-sm rounded-2xl border border-line bg-surface/70 p-8 backdrop-blur"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-base text-teal">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-5 font-display text-xl font-semibold text-ink">Command center</h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Enter the admin password to view analytics and leads.
          </p>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            autoFocus
            className="mt-6 w-full rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-teal"
          />
          {authError && <p className="mt-2 text-[13px] text-gold">{authError}</p>}
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-teal px-5 py-2.5 text-sm font-semibold text-base transition-transform hover:-translate-y-0.5"
          >
            Unlock
          </button>
          <a href="/" className="mt-4 block text-center font-mono text-[11px] text-ink-faint hover:text-ink">
            ← Back to site
          </a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-atmos">
      {/* top bar */}
      <header className="sticky top-0 z-40 border-b border-line bg-base/80 backdrop-blur">
        <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-surface font-mono text-sm text-teal">
              KC
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-ink">Command center</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                Analytics · Leads
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-[12px] text-ink-muted transition-colors hover:text-ink"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>
            <button
              onClick={lock}
              className="flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-[12px] text-ink-muted transition-colors hover:text-ink"
            >
              <LogOut className="h-3.5 w-3.5" /> Lock
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-content px-5 py-8 md:px-8 md:py-10">
        {!firebaseReady && (
          <div className="mb-6 rounded-lg border border-gold/40 bg-gold/5 p-4 text-sm text-gold">
            Firebase isn&apos;t configured yet. Add your keys to <code>.env.local</code> to see live data.
          </div>
        )}
        {loadError && (
          <div className="mb-6 rounded-lg border border-gold/40 bg-gold/5 p-4 text-sm text-gold">
            {loadError}
          </div>
        )}

        {/* metric cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Metric icon={Eye} label="Total views" value={metrics.totalViews} />
          <Metric icon={Users} label="Unique sessions" value={metrics.sessions} />
          <Metric icon={CalendarCheck} label="Views today" value={metrics.viewsToday} />
          <Metric icon={Inbox} label="New leads" value={metrics.newLeads} accent />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* views chart */}
          <section className="rounded-xl border border-line bg-surface/50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-base font-semibold text-ink">Views · last 7 days</h2>
              <span className="font-mono text-[11px] text-ink-faint">
                {metrics.series.reduce((a, s) => a + s.count, 0)} total
              </span>
            </div>
            <div className="flex h-44 items-end justify-between gap-2">
              {metrics.series.map((s) => (
                <div key={s.key} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-teal/30 to-teal transition-all"
                      style={{ height: `${(s.count / maxSeries) * 100}%`, minHeight: s.count ? "6px" : "2px" }}
                      title={`${s.count} views`}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-ink-faint">{s.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* referrers */}
          <section className="rounded-xl border border-line bg-surface/50 p-6">
            <h2 className="mb-5 font-display text-base font-semibold text-ink">Top sources</h2>
            {metrics.referrers.length === 0 ? (
              <p className="text-sm text-ink-faint">No traffic recorded yet.</p>
            ) : (
              <ul className="space-y-3">
                {metrics.referrers.map(([ref, count]) => (
                  <li key={ref}>
                    <div className="mb-1 flex items-center justify-between text-[13px]">
                      <span className="truncate text-ink">{ref}</span>
                      <span className="font-mono text-ink-muted">{count}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
                      <div
                        className="h-full rounded-full bg-teal"
                        style={{ width: `${(count / metrics.totalViews) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* leads table */}
        <section className="mt-6 rounded-xl border border-line bg-surface/50">
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 className="font-display text-base font-semibold text-ink">
              Leads <span className="font-mono text-sm text-ink-faint">({metrics.totalLeads})</span>
            </h2>
            {loading && <Loader2 className="h-4 w-4 animate-spin text-ink-faint" />}
          </div>

          {leads.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Inbox className="mx-auto h-8 w-8 text-ink-faint" />
              <p className="mt-3 text-sm text-ink-muted">No leads yet. They&apos;ll appear here the moment someone books.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line-soft font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                    <th className="px-6 py-3 font-normal">Name</th>
                    <th className="px-6 py-3 font-normal">Details</th>
                    <th className="px-6 py-3 font-normal">Message</th>
                    <th className="px-6 py-3 font-normal">When</th>
                    <th className="px-6 py-3 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => {
                    const d = toDate(l.createdAt);
                    return (
                      <tr key={l.id} className="border-b border-line-soft last:border-0 align-top">
                        <td className="px-6 py-4">
                          <p className="font-medium text-ink">{l.name}</p>
                          {l.company && <p className="text-[12px] text-ink-faint">{l.company}</p>}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={`mailto:${l.email}`}
                            className="flex items-center gap-1.5 text-[13px] text-teal hover:underline"
                          >
                            <Mail className="h-3 w-3" /> {l.email}
                          </a>
                          {l.preferredTime && (
                            <p className="mt-1 text-[12px] text-ink-muted">Prefers: {l.preferredTime}</p>
                          )}
                        </td>
                        <td className="max-w-[16rem] px-6 py-4 text-[13px] text-ink-muted">
                          {l.message || "—"}
                        </td>
                        <td className="px-6 py-4 font-mono text-[12px] text-ink-faint">
                          {d ? d.toLocaleDateString("en", { month: "short", day: "numeric" }) : "…"}
                          <br />
                          {d ? d.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }) : ""}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={l.status || "new"}
                            onChange={(e) => setStatus(l.id, e.target.value)}
                            className={`rounded-md border bg-base px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wide ${
                              l.status === "new"
                                ? "border-teal/50 text-teal"
                                : l.status === "contacted"
                                ? "border-gold/50 text-gold"
                                : "border-line text-ink-muted"
                            }`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Metric({ icon: Icon, label, value, accent }) {
  return (
    <div className={`rounded-xl border p-5 ${accent ? "border-teal/40 bg-teal/5" : "border-line bg-surface/50"}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">{label}</span>
        <Icon className={`h-4 w-4 ${accent ? "text-teal" : "text-ink-faint"}`} />
      </div>
      <p className="mt-3 font-display text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}
