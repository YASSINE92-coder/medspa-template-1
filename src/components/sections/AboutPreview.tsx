import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Reveal from "@/components/Reveal";
import content from "@/content";
import Section from "./Section";

/**
 * 07 · About preview (§12-07) — the humans. Blush band, one warm image in a
 * static rounded-3xl frame, two-line story, single link. The image scales
 * 0.97→1 on reveal — the page's only media-scale use — inside the frame,
 * which itself never moves (§11). Server component; Reveal is the client leaf.
 */
export default function AboutPreview() {
  const c = content.home.aboutPreview;

  return (
    <Section tone="blush">
      <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl ring-1 ring-ink/5">
          <Reveal y={0} scale={0.97} className="absolute inset-0">
            <Image
              src={c.image.src}
              alt={c.image.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 92vw"
            />
          </Reveal>
        </div>

        <Reveal delay={0.15} duration={0.5}>
          {/* 4xl waits for lg: at md this h2 lives in a half-width column and
              "un-intimidating" would break at its hyphen at 4xl. */}
          <h2 className="text-3xl font-semibold text-balance lg:text-4xl">{c.headline}</h2>
          {c.subheadline && (
            <p className="mt-3 max-w-md text-lg text-pretty text-muted">{c.subheadline}</p>
          )}
          {c.ctaLabel && c.ctaHref && (
            <div className="mt-6">
              {/* Padding + negative margin = a ≥44px touch target without moving the text. */}
              <Link
                href={c.ctaHref}
                className="group -mx-2 -my-2.5 inline-flex items-center gap-1.5 rounded-full px-2 py-2.5 font-medium text-accent-deep focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:outline-none"
              >
                {c.ctaLabel}
                <ArrowRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-4 transition-transform duration-200 ease-brand motion-safe:group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
