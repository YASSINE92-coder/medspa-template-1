"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

/** The house curve — §5 of the reference-intelligence report. One curve, everywhere. */
const ease = [0.21, 0.68, 0.32, 0.99] as const;

/**
 * Client leaf for one group entrance: a single fade-up, played once when the
 * element enters the viewport. Wrap server-rendered children with it so the
 * section itself stays a server component (§9: client boundaries stay leaf-level).
 *
 * Motion constitution: transform + opacity only, 8–16px of travel, 450–700ms,
 * `once` so entrances never replay.
 *
 * Reduced motion is handled in CSS, NOT by branching on `useReducedMotion()`.
 * That hook is client-only: the server would still render the pre-animation
 * state (`opacity:0`), the client would render the plain one, and React refuses
 * to patch up that attribute mismatch — leaving `opacity:0` on the element
 * permanently, so the section stayed blank for exactly the users who need it
 * most. `motion-reduce:` utilities beat motion's inline style and already apply
 * before hydration, which gives the constitution's "final state instantly".
 */
export default function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`motion-reduce:transform-none! motion-reduce:opacity-100! ${className ?? ""}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
