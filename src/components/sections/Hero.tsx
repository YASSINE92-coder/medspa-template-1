import content from "@/content";

export default function Hero() {
  const c = content.home.hero;
  const { business } = content;
  return (
    <section className="bg-accent-soft">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          {c.eyebrow && (
            <p className="text-accent text-sm font-medium uppercase tracking-wide mb-3">{c.eyebrow}</p>
          )}
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight">{c.headline}</h1>
          {c.subheadline && <p className="mt-4 text-muted text-lg max-w-md">{c.subheadline}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={c.ctaHref}
              className="rounded-full bg-accent text-white font-medium px-7 py-3.5 hover:opacity-90 transition-opacity"
            >
              {c.ctaLabel}
            </a>
            <a href={`tel:${business.phone.e164}`} className="text-ink font-medium">
              {business.phone.display}
            </a>
          </div>
        </div>
        {/* Image placeholder — real asset lands in Phase C */}
        <div
          className="aspect-[4/5] max-h-[480px] w-full rounded-2xl bg-gradient-to-br from-accent/20 to-blush grid place-items-center text-muted text-sm"
          aria-label={c.image.alt}
        >
          hero image — Phase C
        </div>
      </div>
    </section>
  );
}
