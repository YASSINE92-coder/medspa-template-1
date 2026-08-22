import Reveal from "@/components/Reveal";
import content from "@/content";

/**
 * 08 · Final CTA (§12-08) — the ask, once, confidently. Ink band, white
 * statement, the page's LAST accent event on the booking pill; the phone is
 * the quiet secondary path so the closing bookend rhymes with the hero.
 * Zero new information, zero images, one group fade — server component with
 * Reveal as the only client leaf.
 */
export default function FinalCta() {
  const c = content.home.finalCta;
  const { business } = content;

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* One soft light source behind the ask so the band reads calm, not flat.
          `accent` is decoration-tier here; the pill owns the accent event. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl md:size-[760px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {c.headline}
          </h2>
          {c.subheadline && (
            <p className="mx-auto mt-4 max-w-md text-lg text-pretty text-white/70">
              {c.subheadline}
            </p>
          )}

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {c.ctaLabel && c.ctaHref && (
              <a
                href={c.ctaHref}
                className="w-full rounded-full bg-accent-ink px-7 py-3.5 text-center font-medium text-white shadow-lg shadow-accent/20 transition-all duration-200 ease-brand hover:bg-accent-deep hover:shadow-xl hover:shadow-accent/25 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none active:translate-y-0 motion-safe:hover:-translate-y-0.5 sm:w-auto"
              >
                {c.ctaLabel}
              </a>
            )}
            <a
              href={`tel:${business.phone.e164}`}
              className="rounded-full px-5 py-3.5 font-medium text-white/90 transition-colors duration-200 ease-brand hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
            >
              {business.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
