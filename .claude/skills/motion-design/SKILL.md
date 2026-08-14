---
name: motion-design
description: Design subtle, purposeful motion and interaction for a section — entrances, scroll reveals, hover and press feedback, transitions — using the motion library and this project's timing language. Use when adding or reviewing animation, when a section feels static or flat, or when motion looks busy, janky or distracting. Always includes a prefers-reduced-motion path.
argument-hint: [section or file path]
allowed-tools: Read, Grep, Glob, Edit
---

# Motion design

Motion exists to explain hierarchy and confirm interaction. If an animation
doesn't tell the eye where to look or acknowledge an action, it's decoration —
cut it. Restraint reads as expensive; bounce and parallax read as a template.

## This project's motion language (stay in it)
```
easing      cubic-bezier(0.21, 0.68, 0.32, 0.99)   // the house curve, already in Hero.tsx
micro       120–200ms  hover, focus, colour, small transform
entrance    450–700ms  section and element reveals
distance    8–16px     translate — never a long fly-in
scale       0.97–1.00  media reveals only
stagger     60–90ms    between siblings, max ~5 steps then treat as a group
properties  transform + opacity ONLY (never width/height/top/left/filter loops)
```
Library: `motion` v13 — `import { motion, useReducedMotion } from "motion/react"`.
Simple hover/press states belong in Tailwind `transition-*` classes, not JS.

## Patterns
**Entrance (above the fold)** — the existing `Hero.tsx` pattern: `initial`/`animate`
fade-up with a small per-element delay. Keep total choreography under ~800ms so
the page never feels withheld, and never animate the LCP text in a way that
delays first paint.

**Scroll reveal (below the fold)** — `whileInView` with
`viewport={{ once: true, amount: 0.3 }}`. Reveal groups, not every element:
a heading block as one unit, then cards with a short stagger. Anything already in
view on load must not wait for a scroll event to appear.

**Hover / press** — lift `-translate-y-0.5` plus a shadow step, or a colour
transition, 150–200ms, with `active:translate-y-0` so presses feel physical.
Cards get one effect, not three. Never move text on hover.

**Drag (before/after slider)** — real touch support via the library's gestures or
a native `range` input; must work with pointer, touch, and arrow keys, must not
hijack vertical page scroll on mobile, and must show a grab affordance at rest.

**Carousel (embla)** — momentum and snapping come from embla; don't add a second
animation layer on top of it.

## Reduced motion — required
Follow the established pattern: `const reduce = useReducedMotion()` and spread an
empty object instead of the animation props, so content renders in its final state
immediately. Never leave an element at `opacity: 0` when motion is off, and never
gate content behind an animation that may not run. Reduced motion keeps
*colour and opacity-free* feedback: hover colour changes are fine, movement isn't.

## Client-boundary discipline
`motion` requires `"use client"`. Keep that boundary as small as possible — a
small client reveal wrapper around server-rendered children beats marking a whole
section client. Import from `motion/react` (tree-shaken), never a whole-library
import.

## Banned
Animation on every element · looping/attention-seeking motion · parallax by
default · bounce/elastic easings · scroll-jacking · animated blur or shadow ·
counters and typewriters that delay reading · motion that shifts layout ·
entrance animations that replay every time a section scrolls back into view.

## Checklist before done
Purposeful (name the job of each animation) · under 700ms · transform/opacity only ·
60fps on a mid-range phone · reduced-motion path verified by emulating it in the
browser · no layout shift · nothing hidden if JS fails to hydrate.
