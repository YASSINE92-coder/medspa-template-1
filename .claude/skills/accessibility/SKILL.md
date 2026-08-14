---
name: accessibility
description: Audit and fix accessibility — semantic HTML, keyboard navigation, focus states, accessible names, colour contrast, heading hierarchy, form labels, buttons vs links, reduced motion and screen-reader behaviour. Use when building or reviewing any interactive element, before calling a section done, when chasing the Lighthouse accessibility score, or when the user mentions a11y, contrast, keyboard or screen readers.
argument-hint: [section, file path, or route]
allowed-tools: Read, Grep, Glob, Edit, mcp__playwright__browser_snapshot, mcp__playwright__browser_press_key, mcp__playwright__browser_evaluate, mcp__playwright__browser_navigate
---

# Accessibility audit

Target: Lighthouse Accessibility ≥90 **and** genuinely usable by keyboard and
screen reader. Never trade accessibility for a visual effect — a focus ring that
"ruins the design" means the design needs a better focus ring.

## Contrast — verified numbers for the Mint & Ink tokens
Ratios computed against the real token values (audited 2026-08-14):

| Pair | Ratio | Verdict |
| --- | --- | --- |
| `ink` #101828 on `bg` #fafaf7 | 17.0:1 | ✅ |
| `ink` on `accent-soft` #e6f7f5 | 16.1:1 | ✅ |
| `muted` #5d6b7a on `bg` | 5.1:1 | ✅ body text ok |
| white on `accent-ink` #0a7d74 fill | 5.0:1 | ✅ the button pattern |
| white on `accent-deep` #096e66 (button hover) | 6.1:1 | ✅ |
| `accent-deep` text on `surface` / `bg` | 6.1 / 5.9:1 | ✅ |
| `accent-deep` text on `accent-soft` / `blush` | 5.5 / 5.1:1 | ✅ |
| `accent-ink` text on `blush` | 4.19:1 | ❌ why text uses accent-deep |
| `accent` #0fb5a6 on `bg`/`surface` | 2.5:1 | ❌ decoration only |
| white on `accent` fill | 2.6:1 | ❌ decoration only |

So: **`accent` is a decoration colour, not a text colour.** It is fine as a dot, a
rule, a large wash, or a tinted shadow — never as text, never behind white text.
Use `bg-accent-ink text-white hover:bg-accent-deep` for solid buttons and
`text-accent-deep` for accent-coloured text. Focus rings use `accent-ink` (5.0:1).

Watch for regressions: a new `text-accent` or a `bg-accent` behind white text is
the failure this project already fixed once. Opacity hover on a solid button is
the subtle version — `hover:opacity-90` on an accent fill drops white text to
2.4:1, which is why hovers go *darker* instead.

## Structure
- One `<h1>` per page (the page/hero headline). Section headlines are `<h2>`,
  card titles `<h3>`. Never skip a level, never pick a level for its font size.
- Landmarks: `header`, `nav`, `main`, `footer`, and `section` elements — already
  established in `layout.tsx`. Decorative wrappers stay `div`.
- Lists that are lists (services, hours, testimonials) use `ul`/`li`.
- Decorative glows, dots, stars and icons get `aria-hidden` (as in `Hero.tsx`) so
  they never reach the accessibility tree.

## Buttons vs links
`<a>` navigates, `<button>` acts. Booking currently uses `<a href="#book">` from
`content.business.bookingUrl` — correct if it navigates to an external booking
page or an on-page target that exists; if it ever opens a dialog, it must become a
`<button>`. Never a `div` with an `onClick`. External links get a discernible name
that says where they go, and `rel="noopener"` with `target="_blank"`.

## Keyboard and focus
- Tab through every route: order matches visual order, nothing focusable is
  invisible, nothing is unreachable, no trap.
- Every focusable element shows a visible ring. Use a token-based ring
  (`focus-visible:ring-2 focus-visible:ring-ink/60 focus-visible:ring-offset-2`)
  and never `outline-none` without a replacement.
- Card-as-link: the whole card is one `<a>` (as in `ServicesGrid`) — don't nest
  interactive elements inside it.
- Custom widgets need real keyboard behaviour: the before/after slider must work
  with arrow keys (prefer a visually restyled `<input type="range">` with an
  `aria-label`), the carousel needs focusable, labelled prev/next controls and must
  not trap focus in off-screen slides (`inert`/`aria-hidden` on hidden slides).

## Names and text alternatives
Every image gets its `alt` from the `ImageAsset` in `src/content.ts` — meaningful,
not "image of". Purely decorative images get `alt=""`. Icon-only buttons need an
`aria-label`. Star ratings need a text equivalent ("4.9 out of 5, 500+ reviews").
Phone numbers are `tel:` links whose visible text is the number.

## Forms (planner notify, contact)
Every input has a real `<label for>` — placeholders are not labels. Errors are
associated with `aria-describedby` and announced, not colour-only. Required fields
marked in text as well as `required`. Submit is a `<button type="submit">`.

## Motion and zoom
`prefers-reduced-motion` honoured everywhere (see `/motion-design`). Content must
survive 200% zoom and a 320px-wide viewport without loss. No text baked into
images.

## How to verify
1. Read the markup for structure, names, and semantics.
2. Render with the playwright MCP: take an accessibility snapshot, tab through
   with `browser_press_key`, and confirm the focus path and visible rings.
3. Run Lighthouse (mobile) on a production build and report the real score with
   any failing audits.
Report findings as `file:line → problem → fix`, blocking issues first.
