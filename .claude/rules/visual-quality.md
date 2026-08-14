# Visual quality rules

"Looks good" is not a QA standard. Premium quality comes from consistency and
refinement — not from adding more effects. When something feels off, the fix is
almost always *subtract, align, or make it consistent*, not *add another gradient*.

## Definition of done for a section
1. Reads correctly at **375px** first, then 768, 1440, and 1920.
2. Type hierarchy is unambiguous: you can tell what to read first without colour.
3. Spacing follows the rhythm below — no one-off gaps.
4. Every interactive element has hover, focus-visible, and active states.
5. Motion is purposeful and disabled under `prefers-reduced-motion`.
6. No horizontal overflow, no clipped text, no layout shift on load.
7. Images are sharp, correctly cropped at every breakpoint, and have real `alt`.
8. Rendered and inspected in a browser — desktop *and* mobile viewport.
9. Console clean; `tsc`, `lint`, `build` pass.
10. It has had at least one deliberate polish pass after the first render.

## The system (stay inside it)
- **Container**: `mx-auto max-w-6xl px-4` (1152px + 16px gutters). Full-bleed
  backgrounds are fine; content stays in the container.
- **Section rhythm**: `py-16 md:py-24`. Deviate only for a deliberately tall
  hero or a deliberately tight strip, and say why.
- **Spacing scale**: 1/2/3/4/5/6/8/10/12/14/16/20/24 (Tailwind steps). Inside a
  block, related elements sit 1–3 steps apart; unrelated blocks 8+ apart.
- **Type scale**: h1 `text-4xl sm:text-5xl md:text-6xl` with
  `leading-[1.05] tracking-tight`; h2 `text-3xl md:text-4xl`; h3 `text-lg`–`xl`;
  body `text-base`/`text-lg text-muted`; eyebrow `text-sm font-medium`.
  Headings `font-semibold`, never heavier than 600 in Sora.
- **Measure**: body copy caps at ~65ch (`max-w-md`/`max-w-2xl`), never full width.
- **Radii**: pills for buttons (`rounded-full`), `rounded-2xl` cards,
  `rounded-3xl` large media. Don't mix a fourth radius into one view.
- **Elevation**: one soft shadow per surface (`shadow-sm` resting,
  `shadow-md/lg` raised). Hairlines are `ring-1 ring-ink/5` — not grey borders.
- **Colour**: `bg`/`surface` carry the page, `ink`/`muted` carry text, `accent`
  is the *single* emphasis colour, `accent-soft`/`blush` are large calm washes.
  At most one accent focal point per viewport.

## Banned — the generic AI look
- Purple/indigo gradient blobs, or any decorative blur that outnumbers content.
- Glassmorphism as a default treatment; blur only where something scrolls under it.
- Emoji as icons. Centred everything. Equal-weight 3- or 4-card grids where each
  card is a generic icon + two lines and nothing leads.
- Text over a busy photo with no scrim, gradient text on headings, drop-shadowed
  type, tracking so tight letters touch.
- Placeholder blocks ("slider — Phase C") left in a section that is called done.
- Filler copy that isn't in `src/content.ts`.

## Detail checklist (this is where the polish is)
Optical alignment (icon vs label baselines) · consistent gap between an eyebrow
and its headline everywhere · same button height and padding across all sections ·
line-height tightening as type gets bigger · balanced headline wrapping
(`text-balance` / `text-pretty`) · hover transitions 150–250ms on
transform/opacity/colour only · focus ring visible on every focusable element
including cards-as-links · image aspect ratios that don't crop faces · no
double borders where two surfaces meet · sticky nav that doesn't cover a
scroll-target heading · bottom content not hidden behind the mobile book bar
(`main` reserves `pb-16 md:pb-0` — keep it) · text still legible at 200% zoom.

## Iteration
First render is a draft. Second pass fixes spacing and hierarchy. Third pass adds
the small delight. Do not start the next section while the current one has known
visual problems — write them down and fix them.
