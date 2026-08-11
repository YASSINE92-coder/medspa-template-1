import content from "@/content";

export default function TrustStrip() {
  const t = content.home.trustStrip;
  return (
    <section className="bg-surface border-y border-ink/5">
      <div className="mx-auto max-w-6xl px-4 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm">
        <p className="font-semibold">
        ★ {t.rating} · {t.reviewCount}+ reviews
        </p>
        {t.blurbs.map((b) => (
          <p key={b} className="text-muted">{b}</p>
        ))}
      </div>
    </section>
  );
}
