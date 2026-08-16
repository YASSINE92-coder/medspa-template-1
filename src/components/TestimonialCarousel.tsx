"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { cardSurface } from "@/components/ui/card";
import Stars from "@/components/ui/stars";
import type { Testimonial } from "@/content";
import { cn } from "@/lib/utils";

/** Slide data with the service relation resolved server-side, so this client
 *  leaf never imports content.ts (keeps the whole content object out of the
 *  client bundle). */
export interface TestimonialSlide extends Omit<Testimonial, "serviceSlug"> {
  service?: { name: string; href: string };
}

const arrowButton = cn(
  "inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink",
  "shadow-sm ring-1 ring-ink/5 transition-[box-shadow,opacity] duration-200 ease-brand",
  "hover:shadow-raised active:shadow-sm",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-ink",
  "disabled:pointer-events-none disabled:opacity-40",
);

/**
 * 06 · Testimonials rail (§12-06): native embla drag/snap is the only motion
 * layer — no per-slide entrances, no autoplay. Slides stay a real list so
 * every quote is screen-reader-reachable without operating the carousel;
 * embla's default `watchFocus` scrolls a slide into view when its chip is
 * focused via keyboard.
 */
export default function TestimonialCarousel({ items }: { items: TestimonialSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });

  useEffect(() => {
    if (!emblaApi) return;
    const update = () =>
      setCanScroll({ prev: emblaApi.canScrollPrev(), next: emblaApi.canScrollNext() });
    update();
    emblaApi.on("select", update).on("reInit", update);
    return () => {
      emblaApi.off("select", update).off("reInit", update);
    };
  }, [emblaApi]);

  // API-triggered scrolls jump instantly under reduced motion (drag needs no
  // guard — its speed is the user's own hand).
  const instant = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(instant()), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(instant()), [emblaApi]);

  return (
    <div>
      {/* -mx-4 bleeds the peek to the screen edge inside the px-4 container;
          the matching padding keeps card rings/shadows unclipped. */}
      <div ref={emblaRef} className="-mx-4 -my-1 overflow-hidden px-4 py-1">
        <ul className="-ml-5 flex touch-pan-y touch-pinch-zoom select-none">
          {items.map((t) => (
            <li
              key={t.id}
              className="min-w-0 flex-[0_0_87%] pl-5 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <figure className={cn(cardSurface, "flex h-full flex-col p-6")}>
                <Stars value={t.rating} className="text-accent-deep" starClassName="size-3.5" />
                <span className="sr-only">Rated {t.rating} out of 5</span>
                <blockquote className="mt-3 mb-5 text-base leading-relaxed text-pretty">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                {/* min-h-6 = chip height, so the hairline sits level across
                    cards whether or not a quote carries a service chip. */}
                <figcaption className="mt-auto flex min-h-6 flex-wrap items-center justify-between gap-x-2 gap-y-2 border-t border-ink/5 pt-4">
                  <span className="text-sm font-medium">{t.author}</span>
                  {t.service && (
                    <Link
                      href={t.service.href}
                      className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium whitespace-nowrap text-accent-deep transition-colors duration-200 ease-brand hover:bg-accent/20 focus-visible:ring-2 focus-visible:ring-accent-ink focus-visible:outline-none"
                    >
                      {t.service.name}
                    </Link>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Controls close the section bottom-right, the same spot section 03's
          "See all services" occupies — one rhythm across the page. */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={scrollPrev}
          disabled={!canScroll.prev}
          className={arrowButton}
        >
          <ArrowLeft aria-hidden strokeWidth={1.75} className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next reviews"
          onClick={scrollNext}
          disabled={!canScroll.next}
          className={arrowButton}
        >
          <ArrowRight aria-hidden strokeWidth={1.75} className="size-4" />
        </button>
      </div>
    </div>
  );
}
