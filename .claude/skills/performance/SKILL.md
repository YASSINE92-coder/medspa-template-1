---
name: performance
description: Audit and improve loading and rendering performance — rendering strategy, client/server boundaries, images, fonts, JavaScript bundle size, animation cost, layout shift and Core Web Vitals. Use before calling a section done, when chasing the Lighthouse performance target, when adding a dependency or a client component, or when the user mentions speed, bundle size, LCP or CLS.
argument-hint: [route or file path]
allowed-tools: Bash, PowerShell, Read, Grep, Glob, Edit
---

# Performance audit

Budget: Lighthouse **mobile** ≥90 on Performance (and Accessibility, Best
Practices, SEO). LCP < 2.5s, CLS < 0.1, TBT low, zero console errors.
A med-spa visitor on a phone on mobile data is the reference user.

## Measure properly
Dev-mode numbers are meaningless. Always:
```
npm run build     # read the route table: First Load JS per route
npm run start     # then Lighthouse (mobile preset) against http://localhost:3000
```
Report real numbers, not impressions. Compare against the previous build when
judging whether a change helped. Keep First Load JS per route small — if a route
jumps after a change, find out which import did it before moving on.

## Rendering strategy (the biggest lever)
- Server components by default; `"use client"` only where hooks, events or
  `motion` genuinely require it, and always at the **leaf**.
- Grep for `"use client"` before shipping a section: is each one necessary, and is
  it as small as it can be? A client wrapper around server children is the pattern.
- No client state, effect, or fetch for content that is static in `content.ts`.
- Below-the-fold interactive widgets (before/after slider, embla carousel) are
  candidates for `next/dynamic` so their JS doesn't compete with the hero.
- The homepage should stay statically rendered — nothing that forces dynamic
  rendering (cookies, headers, no-store fetches) without a stated reason.

## Images — usually the LCP
- `next/image` always, with an explicit aspect-ratio container so nothing shifts.
- `priority` on the single LCP image only (currently the hero image); everything
  else lazy-loads by default. More than one `priority` image is a bug.
- Real `sizes` matching the layout (`"(min-width: 768px) 45vw, 92vw"`) so phones
  don't download a desktop-sized file.
- The hero currently loads a **remote Unsplash** URL (allow-listed in
  `next.config.ts`). It is optimised through `/_next/image`, but a local asset in
  `public/images/` is faster and stable — prefer local, correctly sized WebP for
  anything above the fold, and check the served bytes at 375px.
- Target: no above-the-fold image over ~200KB at mobile widths.

## Fonts
`next/font/google` (Geist + Sora, `latin` subset) self-hosts at build time and
already avoids a third-party request — keep it that way. Don't add a third family
or extra weights without a reason; every weight is another file. Never swap to a
`<link>` to Google Fonts. Watch for layout shift from font fallback on the h1.

## JavaScript and dependencies
- `motion`: import from `motion/react` only, never the whole package. Prefer
  Tailwind `transition-*` for simple hover/colour changes — zero JS.
- `embla-carousel-react`: only on routes that actually carousel.
- Before adding any dependency, check the existing stack can't do it and state the
  size cost. No polyfill libraries, no icon mega-packages, no date libraries.
- No unused imports left behind — `npm run lint` catches most of them.

## Layout shift
Every image, embed and animated element has reserved space. Never animate
`width`/`height`/`top`/`left` — transform and opacity only. Skeletons must match
the final size of what they replace; don't invent fake loading states for content
that is already available at build time.

## Animation cost
Transform/opacity only, no looping animations, no animated `filter`/`box-shadow`,
no scroll handlers doing layout reads on every frame (`whileInView` handles
reveals). Check a mid-range phone profile for dropped frames on the hero entrance.

## Report format
```
Route            First Load JS   LCP     CLS    Perf score
/                <n> kB          <n>s    <n>    <n>
Findings: <ordered by impact — file:line → cost → fix>
Regressions vs previous build: <or none>
```
Fix the top items, rebuild, re-measure, and state the before/after numbers.
