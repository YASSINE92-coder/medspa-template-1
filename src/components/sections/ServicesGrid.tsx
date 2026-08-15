import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/Reveal";
import { cardInteractive } from "@/components/ui/card";
import content from "@/content";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import Section from "./Section";

/**
 * 03 · Services grid (§12-03) — the transparent menu. Eight typographic cards
 * (no images v1, per spec), every price visible at every width, whole card is
 * one focusable link to its detail on /services.
 *
 * This section defines the site's card system: `cardSurface`/`cardInteractive`
 * in components/ui/card.ts plus the `shadow-raised` + `ease-brand` tokens.
 *
 * The "See all services" CTA renders after the grid rather than in the Section
 * header — it's the catch-all for people the eight cards didn't convert, so it
 * sits where that decision happens.
 */
export default function ServicesGrid() {
  // The section CTA is rendered below the grid, so strip it from the header copy.
  const { ctaLabel, ctaHref, ...head } = content.home.services;

  return (
    <Section copy={head} tone="bg">
      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {content.services.map((s, i) => (
          <li key={s.slug}>
            {/*
             * Each card observes its own viewport entry (a single observer on
             * the whole grid could never reach `amount: 0.3` on a phone, where
             * the grid is ~3 viewports tall). Stagger repeats per 4-card row:
             * 4 steps × 70ms, later rows group into the same slots; 210ms max
             * delay + 500ms = 710ms, inside the 800ms section budget.
             */}
            <Reveal className="h-full" delay={(i % 4) * 0.07} duration={0.5}>
              <Link
                href={`/services#${s.slug}`}
                className={cn(cardInteractive, "group relative flex h-full flex-col p-5")}
              >
                {s.popular && (
                  <span className="absolute top-5 right-5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-deep">
                    Popular
                  </span>
                )}
                <h3 className={cn("text-lg leading-snug font-semibold", s.popular && "pr-20")}>
                  {s.name}
                </h3>
                <p className="mt-1.5 mb-5 text-sm leading-relaxed text-muted">
                  {s.shortDescription}
                </p>
                <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink/5 pt-4">
                  <p className="text-sm">
                    <span className="font-semibold text-accent-deep">{formatPrice(s)}</span>
                    <span className="text-muted"> · {s.durationMinutes} min</span>
                  </p>
                  <ArrowRight
                    aria-hidden
                    strokeWidth={1.75}
                    className="size-4 shrink-0 text-accent-deep transition-transform duration-200 ease-brand motion-safe:group-hover:translate-x-0.5"
                  />
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      {ctaLabel && ctaHref && (
        <div className="mt-8 flex justify-end">
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-1.5 rounded-full font-medium text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:ring-offset-2"
          >
            {ctaLabel}
            <ArrowRight
              aria-hidden
              strokeWidth={1.75}
              className="size-4 transition-transform duration-200 ease-brand motion-safe:group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      )}
    </Section>
  );
}
