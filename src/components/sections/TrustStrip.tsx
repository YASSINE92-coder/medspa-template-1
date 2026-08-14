import { CalendarCheck, Star, Stethoscope, Tag, type LucideIcon } from "lucide-react";

import Reveal from "@/components/Reveal";
import content, { type TrustIcon } from "@/content";

/** Icon key (content) → glyph (UI). The mapping lives here so content.ts stays chrome-free. */
const glyphs: Record<TrustIcon, LucideIcon> = {
  nurse: Stethoscope,
  pricing: Tag,
  booking: CalendarCheck,
};

/**
 * 02 · Trust strip (§12-02) — a quiet band of instant proof between the hero's
 * promise and the services menu.
 *
 * Deliberately the only section on the page with no elevation: no cards, no
 * shadows, just hairlines — that is what makes it read as a seam rather than a
 * section. The three proof points lead; the rating trails, because the hero
 * already carries the headline rating and this band must complement it, not
 * repeat it. Server component: the single group fade is the only client code.
 */
export default function TrustStrip() {
  const t = content.home.trustStrip;

  // Stars are drawn from data, so any rating (4.2, 5.0) renders truthfully.
  const filledPercent = Math.min(100, Math.max(0, (t.rating / t.ratingOutOf) * 100));
  const stars = Array.from({ length: t.ratingOutOf }, (_, i) => i);

  const starRow = (className: string) => (
    <span className={`flex gap-0.5 ${className}`}>
      {stars.map((i) => (
        <Star key={i} className="size-3 shrink-0 fill-current" strokeWidth={0} />
      ))}
    </span>
  );

  return (
    <section aria-labelledby="trust-heading" className="border-y border-ink/5 bg-surface">
      <h2 id="trust-heading" className="sr-only">
        {t.heading}
      </h2>

      <Reveal className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 lg:flex-row lg:items-center lg:gap-10 lg:py-10">
        {/*
         * Proof points — ONE treatment (hairline-divided list) that reflows,
         * rather than two designs across breakpoints. §12-02 asks for chips
         * wrapping 2×2 at phone width; measured at 375 that forces two-line text
         * inside pill radii and ragged 52px/34px heights, so full-width rows win
         * instead. The divider flips axis at md — not sm, because the longest
         * label needs ~690px and 640 would overflow.
         */}
        <ul className="flex flex-col divide-y divide-ink/5 md:flex-row md:divide-x md:divide-y-0 lg:flex-1">
          {t.blurbs.map((b) => {
            const Glyph = glyphs[b.icon];
            return (
              <li
                key={b.label}
                className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0 md:flex-1 md:py-0 md:px-4 md:first:pl-0 md:last:pr-0"
              >
                <Glyph aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-accent-deep" />
                <span className="text-[15px] font-medium leading-snug text-ink">{b.label}</span>
              </li>
            );
          })}
        </ul>

        {/* Rating lockup — supporting, so ink stars rather than a second accent event. */}
        <div className="flex items-center gap-2.5 lg:shrink-0">
          <span className="relative inline-flex" aria-hidden>
            {starRow("text-ink/15")}
            <span
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${filledPercent}%` }}
            >
              {starRow("text-ink")}
            </span>
          </span>
          <p className="text-sm text-muted">
            <span className="font-medium text-ink">{t.rating}</span>
            <span className="sr-only"> out of {t.ratingOutOf}</span>
            <span aria-hidden>/{t.ratingOutOf}</span> · {t.reviewCount}+ {t.reviewLabel}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
