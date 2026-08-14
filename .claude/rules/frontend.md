# Frontend engineering rules

## Stack (do not change without being asked)
Next.js 16.3 App Router · React 19.2 · TypeScript 5 (strict) · Tailwind CSS v4
(`@tailwindcss/postcss`, CSS-first config — there is **no** `tailwind.config.js`)
· `motion` v13 (import from `motion/react`) · `embla-carousel-react` v8.
Never downgrade a major to make an implementation easier. If an API looks
unfamiliar, check current docs (context7 / official docs), don't guess from memory.

## Dependencies
Already available: `motion`, `embla-carousel-react`, `next/font`, `next/image`.
Before adding anything: (1) can the existing stack do it? (2) is it small and
maintained? (3) does it earn its bundle cost on a mobile connection?
Prefer a 20-line local utility over a dependency; prefer a real library over a
hand-rolled version of something hard (drag, touch, focus trapping, carousels).
State what you're installing and why before you install it.

## Server-first React
Components are server components by default. `"use client"` is a cost, not a
default — it ships JS and blocks static rendering.
- Add `"use client"` only for hooks, browser APIs, event handlers, or `motion`.
- Push it to the **leaf**: a client `<RevealOnScroll>` wrapper around server
  children beats marking a whole section client.
- No client-side state for content that never changes. No `useEffect` to do what
  CSS or the server can do.

## Tailwind v4 conventions
- Tokens only: `bg-bg`, `text-ink`, `text-muted`, `bg-surface`, `text-accent`,
  `bg-accent-soft`, `bg-blush`. Never a raw hex or `text-[#0fb5a6]` in a component.
- New token → add it to the `@theme` block in `src/app/globals.css`. That block is
  the single source of truth for the palette and fonts.
- Mobile-first order: unprefixed classes are the phone design; `sm:`/`md:`/`lg:`
  only *add* to it. Never use `md:` to repair a broken base layout.
- Arbitrary values (`h-[560px]`, `aspect-[4/5]`) are allowed when they're a real
  design decision, but repeated ones become tokens or a shared class.
- Fonts: `font-sans` (Geist) for body, `font-heading` (Sora) for h1–h4 — already
  wired globally in `globals.css`; don't re-declare per component.

## Content discipline
`src/content.ts` is the only place business text lives. In components:
`import content from "@/content"` and read `content.home.<section>`, plus types
(`Service`, `Testimonial`, `SectionCopy`, `ImageAsset`, …) from the same module.
- A string a client could want to change = content.ts. A string that is pure UI
  chrome ("Close", "Next slide") may live in the component.
- Adding a field means extending the interface first, then the data — the shape
  must stay JSON-safe (no functions, no `Date`) so a CMS can produce it later.
- Relations use slugs, never object references.

## TypeScript
Strict mode is on and stays on: no `any`, no non-null `!` to silence a real
nullable, no `@ts-expect-error` without a one-line reason. Type props explicitly;
derive from content.ts types instead of restating shapes. Import path alias is
`@/*` → `src/*`.

## Images
`next/image` always. Every image needs `alt` from the `ImageAsset`, real
`sizes` for responsive art direction, and `priority` **only** on the LCP image.
Wrap `fill` images in a container with an explicit aspect ratio so nothing shifts.
Remote hosts must be allow-listed in `next.config.ts` (currently
`images.unsplash.com`).

## Accessibility is part of "works"
Semantic elements first (`section`, `nav`, `header`, `footer`, `button` vs `a`),
one `h1` per page, no heading level skips, visible focus states, labelled
controls, `aria-hidden` on decorative glows and icons. See `/accessibility`.

## Verification gate — run before saying done
`npx tsc --noEmit` → `npm run lint` → `npm run build` → browser console clean.
Report real output. A failing check is a finding, not a footnote.
