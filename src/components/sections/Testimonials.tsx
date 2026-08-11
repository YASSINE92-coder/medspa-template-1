import content from "@/content";
import Section from "./Section";

export default function Testimonials() {
  return (
    <Section copy={content.home.testimonials} tone="bg">
      {/* Embla carousel lands in Phase C — static grid for the skeleton */}
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {content.testimonials.map((t) => (
          <figure key={t.id} className="rounded-2xl bg-surface p-6 shadow-sm">
            <p className="text-accent text-sm">{"★".repeat(t.rating)}</p>
            <blockquote className="mt-2">&ldquo;{t.text}&rdquo;</blockquote>
            <figcaption className="mt-3 text-sm text-muted">{t.author}</figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
