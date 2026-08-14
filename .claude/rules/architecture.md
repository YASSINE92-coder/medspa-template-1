# Architecture rules

## Actual layout (adapt to it, don't rewrite it)
```
src/
├── app/                  # App Router: layout.tsx, page.tsx, /services, /about,
│   │                     # /planner, /contact, globals.css (@theme tokens)
│   └── globals.css       # THE design-token source: Mint & Ink @theme, then the
│                         # shadcn semantic layer mapped onto it.
├── components/
│   ├── Nav.tsx           # header + mobile sticky book bar
│   ├── sections/         # one file per homepage section + Section wrapper
│   └── ui/               # shadcn primitives (created on first `shadcn add`)
├── lib/
│   └── utils.ts          # `cn()` — class merging
└── content.ts            # all business content + its TypeScript shapes
```
Add files here as they're actually needed — not preemptively.

## Composition
- `app/page.tsx` stays a thin list of sections. It never contains markup.
- One section = one file in `components/sections/`, default-exported, reading its
  own copy from `content.ts`. A section owns its layout; it doesn't reach into
  another section's internals.
- `sections/Section.tsx` is the shared shell (tone background, container, eyebrow /
  headline / subheadline / CTA). Use it for standard sections so rhythm stays
  identical; a hero or a full-bleed showcase may opt out deliberately.
- Extract a component when it is used **twice**, exceeds ~100 lines, or needs its
  own client boundary. Don't abstract a one-off `<div>` into a component.
- Never build a single file that renders the whole page.

## Where things belong
| Thing | Home |
| --- | --- |
| Business text, prices, images, copy | `src/content.ts` |
| Palette, fonts, global element defaults | `src/app/globals.css` |
| Pure helpers (price/hours/phone formatting) | `src/lib/*.ts` |
| Reusable primitives (Button, Card, Badge) | `src/components/ui/` |
| One-page-only composition | the section file itself |

`formatPrice` currently lives in `sections/ServicesGrid.tsx`; move it to
`src/lib/format.ts` the next time that file is touched.

## Client boundaries
Mark the smallest possible unit `"use client"`. A section that is static except
for one animated element should stay a server component wrapping a small client
child. Heavy interactive widgets below the fold (before/after slider, carousel)
are candidates for `next/dynamic` once they exist.

## Design system growth
Before a value repeats a third time it becomes a token or a component. New
primitives must be built from the Mint & Ink tokens and the scales in
`visual-quality.md`, so a button looks the same in every section by construction
rather than by coincidence.

## shadcn/ui policy
shadcn **is** initialised: `components.json` (style `radix-nova`, lucide icons,
CSS variables), `src/lib/utils.ts` (`cn`), and deps `radix-ui`,
`class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`,
`tw-animate-css`. Components land in `src/components/ui/`.

Its semantic variables are mapped onto Mint & Ink in `globals.css` — Mint & Ink
stays the single source of truth, and shadcn's own `accent`/`muted`/font
definitions were removed because they overwrite mint and Sora. Consequences when
you add a primitive:
- Swap the two colliding surface utilities: `bg-accent`/`hover:bg-accent` →
  `bg-hover-surface`, `bg-muted` → `bg-subtle-surface`. `text-accent-foreground`
  and `text-muted-foreground` are already correct.
- `bg-primary` is **ink**, not mint — mint fails contrast behind white text.
- Radius utilities are not remapped; `rounded-2xl`/`rounded-3xl` are Tailwind's.
- Adding a `chart` or `sidebar` component means re-adding those token groups.

Add components à la carte and only for real a11y-heavy behaviour (dialog,
accordion, tabs, tooltip, select). Simple things — buttons, cards, badges — stay
hand-written; they're cheaper than the abstraction. Always restyle to our
identity: no view may read as an unmodified shadcn template.

## Routes and metadata
Metadata comes from `content.seo` via `app/layout.tsx`; per-page `metadata`
exports use the title template. `Nav`/`Footer` live in the layout, never inside a
page. New routes get a real `metadata` export, not a copy of the default title.
