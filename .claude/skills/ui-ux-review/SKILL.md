---
name: ui-ux-review
description: Review an implemented section or page as a senior UI/UX designer and return prioritised, concrete fixes. Use after a section is built or edited, when the user asks whether something looks right, says a section feels off or generic, or before calling a section done. Judges hierarchy, clarity, spacing, typography, consistency, interaction, accessibility and polish against this project's tokens and scales.
argument-hint: [section or file path]
allowed-tools: Read, Grep, Glob
---

# UI/UX review

You are the senior designer reviewing a teammate's build. Be exacting and
specific. Vague criticism is worthless: every finding names the element, the
current value, the replacement value, and the reason.

Bad: "spacing feels cramped." Good: "`Hero.tsx:57` — subheadline sits `mt-5`
(20px) under a 60px headline; the eyebrow above uses the same gap so the group
reads as three equal siblings. Use `mt-4` on the subheadline and `mt-6` on the
headline to bind headline+sub and separate the eyebrow."

## Before reviewing
Read the section file, `src/app/globals.css` (tokens), and the relevant
`src/content.ts` copy. Skim `.claude/rules/visual-quality.md` for the scales you
are judging against. If the review is about how it *renders*, run `/visual-qa`
first and review the screenshots — don't guess at rendered output from source.

## Review dimensions
1. **Hierarchy** — read order 1→n. Is there exactly one focal point? Does size,
   weight, colour and space agree with each other, or fight?
2. **Clarity** — would a prospective client understand the offer and the next
   action in three seconds? Is the CTA unmistakable and reachable by thumb?
3. **Spacing** — on the scale? Related things closer than unrelated things?
   Consistent gap for the same relationship across sections?
4. **Typography** — sizes from the scale, line-height tightening as size grows,
   measure ≤ ~65ch, tracking, balanced wrapping, no orphan words in headlines.
5. **Consistency** — buttons, cards, eyebrows, radii, shadows, hairlines
   identical to their counterparts elsewhere. Any new value must be justified.
6. **Colour** — accent used once as emphasis; text colours from ink/muted;
   contrast checked (see the accent constraint in CLAUDE.md).
7. **Interaction** — hover, focus-visible, active, disabled, loading. Do targets
   look tappable? Are card-links wholly clickable? Is feedback immediate?
8. **Composition** — alignment spine, deliberate asymmetry vs accidental,
   image crop and subject placement, negative space doing work.
9. **Polish** — optical alignment, hairline seams, transitions, small-detail
   consistency. Also: is anything decorative that could be removed with no loss?
10. **Distinctiveness** — does this look like *this* spa, or like a template?
    Name what makes it specific; if nothing does, that is the top finding.
11. **Accessibility** — semantics, heading level, focus order, alt text, motion.
12. **Content fidelity** — every string traced to `src/content.ts`; no hardcoded
    business text, no leftover placeholders.

## Output format
```
## Verdict: SHIP / POLISH / REWORK — one sentence why

### Blocking (breaks hierarchy, a11y, or the design system)
1. <file:line> — <what's wrong> → <exact fix> (<why>)

### Should fix (visible quality gap)
### Nice to have (refinement)
### Working well — keep
<2–4 things, so the next pass doesn't undo them>
```
Cap it at the ~10 findings that matter most, ordered by impact. If the section is
genuinely good, say so plainly and list only real refinements — don't invent
problems to look thorough.

## Then
Apply the blocking and should-fix items, re-render, and review once more. A
section is done after a review that produces no blocking findings.
