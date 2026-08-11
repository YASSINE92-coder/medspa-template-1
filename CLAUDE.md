# medspa-template-1 — project standards

Med-spa website template #1 for MedSpa Scale (EPIC-WEB-001).
Stack: Next.js App Router + TypeScript + Tailwind v4. Deployed on Vercel.

## The one rule that never bends
ALL business content (name, phone, address, hours, services, prices,
testimonials, images, copy) lives in `src/content.ts` — typed, JSON-safe.
No business text is ever hardcoded in a component.
Test: change the spa's name and phone in content.ts → they update everywhere.

## Quality bar (from the EPIC — non-negotiable)
- Mobile-first: judge every section at phone size FIRST (375px), then 768/1440.
- A section is done when it looks intentional on a real phone — not when it renders.
- Iterate: 2–3 polish passes per section is normal. First render is never final.
- Motion and polish are where "wow" lives: scroll reveals, hover states, smooth
  transitions. Respect `prefers-reduced-motion`.
- Install real libraries, never hand-roll worse versions:
  animation = `motion` (Framer Motion), carousel = `embla-carousel-react`.
  The before/after slider needs proper touch support.
- Keep the site fast: Lighthouse mobile ≥90 on Performance, Accessibility,
  Best Practices, SEO. Zero console errors.
- Every image gets meaningful `alt` text (it's required by the ImageAsset type).

## Design tokens — "Mint & Ink"
Defined ONLY in `src/app/globals.css` (@theme block): bg, surface, ink, muted,
accent, accent-soft, blush. Fonts: Sora (headings) + Geist Sans (body).
Changing the palette = editing that one block. Never inline hex values in components.

## Verify before done (every task)
1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. Browser console clean
5. Real phone check at 375px

## Current phase
Phase B skeleton complete → building Phase C section by section (hero first,
before/after slider budgeted as the hard one).
