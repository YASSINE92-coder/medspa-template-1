---
name: responsive-design
description: Design and review responsive behaviour across breakpoints on purpose — mobile, tablet, desktop, large desktop. Use when planning a section's layout, when something breaks or overflows at a viewport, when a design was built desktop-first and needs a real mobile design, or when the user mentions mobile, tablet, breakpoints or overflow.
argument-hint: [section or file path]
allowed-tools: Read, Grep, Glob, Edit
---

# Responsive design

Mobile is not a shrunken desktop. It is the primary design, with its own
composition, its own crops, and its own content priority. Most visitors to a
med-spa site are on a phone, one-handed, deciding whether to tap "Book now".

## Breakpoints and their intent
| Range | Tailwind | Design intent |
| --- | --- | --- |
| 375–639 | (base) | The real design. One column, thumb-first, one clear action. |
| 640–767 | `sm:` | Small easing only — slightly bigger type, 2-up small cards. |
| 768–1023 | `md:` | Two-column compositions appear; nav becomes horizontal; the mobile book bar disappears — the desktop CTA must take over. |
| 1024–1439 | `lg:` | Full grids (up to 4-up), richer side-by-side pairings. |
| 1440+ | (container caps) | Container stops at `max-w-6xl`; extra width becomes calm space, not stretched text. Check nothing floats apart. |

## Plan before you code — fill this in per section
```
375   layout: <stack order, what's above the fold, what's hidden or collapsed>
      type:   <h/body sizes>      spacing: <section py, block gaps>
      image:  <aspect + crop + sizes>    touch: <targets ≥44px, thumb zone>
768   what changes and why
1440  what changes and why
1920+ what holds it together
```

## Rules
- **Order matters, not just size**: on mobile, the most persuasive element goes
  first. Reordering with `order-*` or `flex-col-reverse` is a design decision —
  make it deliberately, and keep DOM order sensible for screen readers.
- **Content priority, not content deletion**: `hidden md:block` is acceptable for
  genuinely decorative elements. Never hide information a phone visitor needs.
- **Type scaling**: step down deliberately (`text-4xl sm:text-5xl md:text-6xl`),
  and tighten `leading` as size grows. Body text never below 16px; small print
  never below 14px.
- **Spacing scaling**: sections `py-16 md:py-24`; gaps compress on mobile
  (`gap-4 md:gap-8`) but stay on the scale.
- **Images**: change the aspect ratio, not just the size — a 4/5 portrait crop on
  mobile and 16/9 on desktop are different designs. Always supply real `sizes`.
- **Touch targets**: ≥44×44px with ≥8px between neighbours. Phone numbers are
  `tel:` links. Hover-only affordances must have a non-hover equivalent.
- **Section height**: nothing on mobile should require a full swipe to see one
  idea; avoid `h-screen` sections on phones (address-bar chrome makes them lie).
- **Grids**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` — check the orphan case
  (8 items in a 3-up grid leaves 2 alone; decide if that's acceptable).
- **Never** repair a broken base layout with a `md:` override. Fix the base.

## Overflow debugging recipe
1. At 375px, confirm `scrollWidth > clientWidth`.
2. Find the offender by outlining candidates or checking each section's width.
3. Usual causes: fixed `w-[...]` wider than the viewport; `min-w` on a grid child;
   long unbroken strings (add `break-words`/`hyphens-auto`); negative margins for
   bleed without `overflow-hidden` on the parent; absolutely positioned blur
   decorations (must be inside a `relative overflow-hidden` parent); tables and
   `pre` blocks (wrap in `overflow-x-auto`).

## Review output
Report per breakpoint: what works, what breaks, and the exact class change to fix
it. Then verify with `/visual-qa` at 375 / 768 / 1440 / 1920 — a responsive claim
without a render is not a verification.
