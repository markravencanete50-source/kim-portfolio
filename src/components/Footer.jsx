import { profile } from "@/data/profile";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-base">
      <div className="mx-auto flex max-w-content flex-col items-start justify-between gap-6 px-5 py-10 md:flex-row md:items-center md:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-ink">{profile.name}</p>
          <p className="mt-1 text-[13px] text-ink-muted">
            {profile.title} · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <a href={`mailto:${profile.email}`} className="text-[13px] text-ink-muted transition-colors hover:text-teal">
            {profile.email}
          </a>
          <a href={profile.resume} download className="text-[13px] text-ink-muted transition-colors hover:text-teal">
            Résumé
          </a>
        </div>
      </div>
      <div className="border-t border-line-soft">
        <div className="mx-auto flex max-w-content items-center justify-between px-5 py-5 md:px-8">
          <p className="font-mono text-[11px] text-ink-faint">© {year} — All rights reserved</p>
          <p className="font-mono text-[11px] text-ink-faint">Bohol · PH</p>
        </div>
      </div>
    </footer>
  );
}
