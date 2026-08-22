import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/Reveal";
import content from "@/content";

/**
 * 05 · Planner band (§12-05) — the differentiator tease. One accent-soft band,
 * one aspirational statement, one QUIET pill to /planner. The pill is a surface
 * chip with accent-deep text, not a saturated fill: the hero and final CTA own
 * the page's accent events, and this band's job is to plant "this spa is
 * modern" with zero pressure — no urgency copy, no fake planner UI.
 *
 * py-16/md:py-20 is one step tighter than the section rhythm on purpose: this
 * is a tease band between two full sections, not a destination. Server
 * component; the single group Reveal is the only client leaf. Text-only.
 */
export default function PlannerTeaser() {
  const c = content.home.plannerTeaser;

  return (
    <section aria-labelledby="planner-teaser-heading" className="bg-accent-soft">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <Reveal className="flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:gap-10 md:text-left">
          <div className="max-w-xl">
            {c.eyebrow && (
              <p className="text-sm font-medium uppercase tracking-wide text-accent-deep">{c.eyebrow}</p>
            )}
            <h2
              id="planner-teaser-heading"
              className="mt-2 text-3xl font-semibold tracking-tight text-balance md:text-4xl"
            >
              {c.headline}
            </h2>
            {c.subheadline && (
              <p className="mt-3 text-pretty text-muted">{c.subheadline}</p>
            )}
          </div>

          {c.ctaLabel && c.ctaHref && (
            <Link
              href={c.ctaHref}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-surface px-7 py-3.5 font-medium text-accent-deep shadow-sm ring-1 ring-ink/5 transition-[translate,box-shadow] duration-200 ease-brand hover:shadow-raised focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:outline-none active:translate-y-0 motion-safe:hover:-translate-y-0.5 sm:w-auto md:shrink-0"
            >
              {c.ctaLabel}
              <ArrowRight
                aria-hidden
                strokeWidth={1.75}
                className="size-4 transition-transform duration-200 ease-brand motion-safe:group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
