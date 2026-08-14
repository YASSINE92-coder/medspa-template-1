"use client";

import Image from "next/image";
import { motion } from "motion/react";
import content from "@/content";

const ease = [0.21, 0.68, 0.32, 0.99] as const;

/*
 * Reduced motion is handled in CSS, NOT by branching on `useReducedMotion()`.
 * That hook is client-only: the server rendered the pre-animation state
 * (`opacity:0`), the client rendered the plain one, and React refuses to patch
 * up that attribute mismatch — which left the ENTIRE hero invisible for
 * reduced-motion users. These utilities beat motion's inline style and already
 * apply before hydration, giving the constitution's "final state instantly".
 */
const still = "motion-reduce:transform-none! motion-reduce:opacity-100!";

export default function Hero() {
  const c = content.home.hero;
  const { business } = content;
  const t = content.home.trustStrip;

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease },
  });

  return (
    <section className="relative overflow-hidden bg-accent-soft">
      {/* soft decorative glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-[420px] rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-[360px] rounded-full bg-blush/70 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 pt-14 pb-16 md:pt-24 md:pb-24 grid items-center gap-10 md:gap-14 md:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div>
          {c.eyebrow && (
            <motion.p
              {...fadeUp(0)}
              className={`${still} inline-flex items-center gap-2 rounded-full bg-surface/80 backdrop-blur px-4 py-1.5 text-sm font-medium text-accent-deep shadow-sm ring-1 ring-ink/5`}
            >
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              {c.eyebrow}
            </motion.p>
          )}

          <motion.h1
            {...fadeUp(0.08)}
            className={`${still} mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-balance`}
          >
            {c.headline}
          </motion.h1>

          {c.subheadline && (
            <motion.p {...fadeUp(0.16)} className={`${still} mt-5 max-w-md text-lg text-muted`}>
              {c.subheadline}
            </motion.p>
          )}

          <motion.div {...fadeUp(0.24)} className={`${still} mt-8 flex flex-wrap items-center gap-3`}>
            <a
              href={c.ctaHref}
              className="rounded-full bg-accent-ink px-7 py-3.5 font-medium text-white shadow-lg shadow-accent-ink/25 transition-all hover:-translate-y-0.5 hover:bg-accent-deep hover:shadow-xl hover:shadow-accent-ink/30 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-accent-soft"
            >
              {c.ctaLabel}
            </a>
            <a
              href={`tel:${business.phone.e164}`}
              className="rounded-full px-5 py-3.5 font-medium text-ink underline-offset-4 transition-colors hover:text-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-accent-soft"
            >
              {business.phone.display}
            </a>
          </motion.div>

          <motion.p {...fadeUp(0.32)} className={`${still} mt-6 text-sm text-muted`}>
            <span className="text-accent-deep" aria-hidden>★</span>{" "}
            <span className="font-medium text-ink">{t.rating}</span> · {t.reviewCount}+ reviews ·{" "}
            {business.address.city}, {business.address.state}
          </motion.p>
        </div>

        {/* Image */}
        <motion.div
          className={`${still} relative`}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
        >
          <div className="relative aspect-[4/3] md:aspect-[4/5] max-h-[560px] w-full overflow-hidden rounded-3xl shadow-xl ring-1 ring-ink/5">
            <Image
              src={c.image.src}
              alt={c.image.alt}
              fill
              priority
              sizes="(min-width: 768px) 45vw, 92vw"
              className="object-cover"
            />
          </div>

          {/* floating tagline chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease }}
            className={`${still} absolute -bottom-4 left-4 rounded-2xl bg-surface/95 backdrop-blur px-5 py-3 shadow-lg ring-1 ring-ink/5`}
          >
            <p className="font-heading text-sm font-semibold">{business.tagline}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
