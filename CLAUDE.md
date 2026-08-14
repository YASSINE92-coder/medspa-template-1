# medspa-template-1 — project standards

Med-spa website template #1 for MedSpa Scale (EPIC-WEB-001).
Stack: Next.js 16 App Router + React 19 + TypeScript + Tailwind v4. Deployed on Vercel.

## How to work on this project

You are the whole front-of-house team, not a code generator: senior frontend
engineer, senior UI/UX engineer, visual designer, interaction designer,
accessibility reviewer, performance engineer, and browser-based QA engineer.
Every change gets judged by all of those roles before it is called done.

The target is a **premium, highly polished** site — the quality level of an
exceptional modern product page. The result must feel intentional, refined,
cohesive, responsive, fast, accessible, distinctive, production-ready.
Generic AI-generated SaaS aesthetics are a failure, even when the code is clean.

Detailed standards live in `.claude/rules/` (loaded every session):
`frontend.md` (stack + code), `visual-quality.md` (the QA bar),
`architecture.md` (structure + design system), `design-direction.md`
(binding design decisions distilled from the Reference Intelligence Report).

## Design source of truth (per-section ritual)
The deep design system lives in `docs/reference-intelligence.md`.
Before building or redesigning ANY section: read that report's §12 spec for the
section, follow the §13 workflow, and obey `.claude/rules/design-direction.md`.
Build order: 01→02→03→06→07→08→09→05→04 (before/after slider LAST).

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

The accent has three tiers, split by contrast duty — pick by role, not by looks:
- `accent` #0fb5a6 — **decoration only** (2.6:1). Dots, glows, gradients, tinted
  shadows. Never text, never behind white text.
- `accent-ink` #0a7d74 — solid fill behind white text (5.0:1) and the focus-ring
  colour. Not for text: it measures 4.19:1 on `blush`.
- `accent-deep` #096e66 — accent-coloured **text** on any light surface (5.1:1
  even on blush, the worst case) and the hover/active state for accent-ink fills.

So: `bg-accent-ink text-white hover:bg-accent-deep` for buttons, `text-accent-deep`
for accent text. Never `text-accent` and never `bg-accent` behind white text.

## Build one section at a time
Never implement the whole page in one pass. Per section:
purpose → reference analysis → composition & hierarchy → responsive plan →
motion plan → implement → run → inspect in a real browser (desktop + mobile) →
fix → re-inspect. Do not move on while the current section has visible problems.

Skills for each step (invoke with `/name`, or they load when relevant):
`/reference-analysis`, `/ui-ux-review`, `/visual-qa`, `/responsive-design`,
`/motion-design`, `/accessibility`, `/performance`.

## Design references (principles only, never copies)
apple.com/airpods-pro, linear.app, cuberto.com, superpower.com.
Study hierarchy, composition, typography, spacing rhythm, storytelling, section
transitions, image treatment, interaction and motion language. Never reproduce
their layouts, branding, illustrations, copy, assets, or signature elements.
See `/reference-analysis` for the required borrow / redesign / avoid decision.

## Verify before done (every task)
1. `npx tsc --noEmit`
2. `npm run lint`
3. `npm run build`
4. Browser console clean
5. Real phone check at 375px

Never claim a visual result was verified without actually rendering it.

## Tooling
- MCP (project-scoped in `.mcp.json`): **playwright** for browser QA,
  **context7** for current library docs, **shadcn** for component registry.
- Look up current docs for Next.js / React / Tailwind / shadcn / motion instead
  of trusting remembered APIs — all four move fast and this repo is on the
  newest majors (Next 16, React 19, Tailwind v4, motion v13).

## Current phase
Phase B skeleton complete → building Phase C section by section (hero first,
before/after slider budgeted as the hard one).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
