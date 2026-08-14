import type { ReactNode } from "react";
import type { SectionCopy } from "@/content";

/** Shared stub wrapper: consistent spacing + copy pattern for every section. */
export default function Section({
  copy,
  tone = "bg",
  children,
  id,
}: {
  copy?: SectionCopy;
  tone?: "bg" | "surface" | "accent-soft" | "blush";
  children?: ReactNode;
  id?: string;
}) {
  const tones: Record<string, string> = {
    bg: "bg-bg",
    surface: "bg-surface",
    "accent-soft": "bg-accent-soft",
    blush: "bg-blush",
  };
  return (
    <section id={id} className={`${tones[tone]} py-16 md:py-24`}>
      <div className="mx-auto max-w-6xl px-4">
        {copy && (
          <div className="max-w-2xl">
            {copy.eyebrow && (
              <p className="text-accent-deep text-sm font-medium uppercase tracking-wide mb-2">
                {copy.eyebrow}
              </p>
            )}
            <h2 className="text-3xl md:text-4xl font-semibold">{copy.headline}</h2>
            {copy.subheadline && <p className="mt-3 text-muted">{copy.subheadline}</p>}
            {copy.ctaLabel && copy.ctaHref && (
              <a
                href={copy.ctaHref}
                className="inline-block mt-5 rounded-full text-accent-deep font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                {copy.ctaLabel} →
              </a>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
