import { cn } from "@/lib/utils";

/**
 * The site-wide card system (defined by section 03, inherited by testimonials,
 * about preview and the planner band — never re-invent these values).
 *
 * Two elevation levels only (design-direction.md "depth recipe"):
 *   resting  = hairline ring + shadow-sm
 *   raised   = `shadow-raised` (the tokenized 2-layer pair in globals.css)
 *
 * Class strings rather than a <Card> component on purpose: consumers differ in
 * element (link, embla slide, static div) and simple cards stay hand-written
 * (architecture.md) — the recipe is the reusable part.
 */

/** Resting card: the only way a card surface is drawn. */
export const cardSurface = "rounded-2xl bg-surface shadow-sm ring-1 ring-ink/5";

/**
 * Interactive card (cards-as-links): CSS-only hover lift of −2px to the raised
 * shadow step on the house curve, pressed state returns flat, and the focus
 * ring replaces the hairline at the card's own edge. The lift is motion-safe;
 * reduced-motion users still get the shadow step. Add `group` at the call site
 * if children react to hover.
 */
export const cardInteractive = cn(
  cardSurface,
  // v4's translate utilities set the CSS `translate` property, not `transform`.
  "transition-[translate,box-shadow] duration-200 ease-brand",
  "motion-safe:hover:-translate-y-0.5 hover:shadow-raised active:translate-y-0",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink",
);
