import content from "@/content";

export default function FinalCta() {
  const c = content.home.finalCta;
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">{c.headline}</h2>
        {c.subheadline && <p className="mt-3 text-white/70">{c.subheadline}</p>}
        {c.ctaLabel && (
          <a
            href={c.ctaHref}
            className="inline-block mt-8 rounded-full bg-accent text-white font-medium px-7 py-3.5 hover:opacity-90 transition-opacity"
          >
            {c.ctaLabel}
          </a>
        )}
      </div>
    </section>
  );
}
