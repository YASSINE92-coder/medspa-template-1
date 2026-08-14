import type { Metadata } from "next";
import content from "@/content";

export const metadata: Metadata = { title: content.pages.planner.title };

export default function PlannerPage() {
  const p = content.pages.planner;
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <span className="inline-block rounded-full bg-accent-soft text-accent-deep text-sm font-medium px-4 py-1.5">
        {p.comingSoonLabel}
      </span>
      <h1 className="mt-6 text-4xl md:text-5xl font-semibold">{p.title}</h1>
      <p className="mt-3 text-lg text-muted">{p.intro}</p>
      <p className="mt-6 text-ink max-w-lg mx-auto">{p.pitch}</p>
      <ul className="mt-8 space-y-3 text-left max-w-md mx-auto">
        {p.bullets.map((b) => (
          <li key={b} className="flex gap-3 rounded-2xl bg-surface p-4 shadow-sm">
            <span className="text-accent-deep">✓</span>
            <span className="text-sm">{b}</span>
          </li>
        ))}
      </ul>
      {/* Notify form is a visual placeholder in v1 — no backend */}
      <form className="mt-10 flex gap-2 max-w-md mx-auto" aria-label={p.notifyLabel}>
        <input
          type="email"
          required
          placeholder="you@email.com"
          className="flex-1 rounded-full border border-ink/15 bg-surface px-5 py-3 text-sm"
        />
        <button
          type="button"
          className="rounded-full bg-accent-ink text-white text-sm font-medium px-6 py-3 transition-colors hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          {p.notifyLabel}
        </button>
      </form>
    </div>
  );
}
