import type { Metadata } from "next";
import content from "@/content";
import { formatPrice } from "@/components/sections/ServicesGrid";

export const metadata: Metadata = { title: content.pages.services.title };

export default function ServicesPage() {
  const p = content.pages.services;
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-semibold">{p.title}</h1>
      <p className="mt-3 text-muted max-w-xl">{p.intro}</p>
      <div className="mt-12 space-y-6">
        {content.services.map((s) => (
          <article id={s.slug} key={s.slug} className="rounded-2xl bg-surface p-6 shadow-sm scroll-mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl font-semibold">{s.name}</h2>
              <p className="text-accent font-medium">{formatPrice(s)}</p>
            </div>
            <p className="mt-2 text-muted max-w-2xl">{s.longDescription}</p>
            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
              {s.benefits.map((b) => (
                <li key={b} className="rounded-full bg-accent-soft text-ink px-3 py-1">{b}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">{s.durationMinutes} min · {s.category}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
