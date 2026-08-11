import content, { type Service } from "@/content";
import Section from "./Section";

export function formatPrice(s: Service): string {
  switch (s.priceUnit) {
    case "perUnit":
      return `from $${s.priceFrom}/unit`;
    case "perSession":
      return `from $${s.priceFrom}/session`;
    default:
      return `from $${s.priceFrom}`;
  }
}

export default function ServicesGrid() {
  return (
    <Section copy={content.home.services} tone="bg">
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {content.services.map((s) => (
          <a
            key={s.slug}
            href={`/services#${s.slug}`}
            className="rounded-2xl bg-surface p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            {s.popular && (
              <span className="inline-block text-xs font-medium text-accent bg-accent-soft rounded-full px-2.5 py-1 mb-3">
                Popular
              </span>
            )}
            <h3 className="font-semibold">{s.name}</h3>
            <p className="mt-1 text-sm text-muted">{s.shortDescription}</p>
            <p className="mt-3 text-sm font-medium text-accent">{formatPrice(s)}</p>
          </a>
        ))}
      </div>
    </Section>
  );
}
