# Section Prompt Guide — driving Claude Code with the Reference Intelligence Report

How to make every Claude Code session (in Cursor or terminal) build strictly on
the report. The memory chain is: `CLAUDE.md` + `.claude/rules/*` auto-load every
session → they point to `docs/reference-intelligence.md` §12/§13 → your prompt
names the exact section. Auto-loading covers the rules; the prompt supplies the
focus. Always name the spec explicitly — explicit beats implicit.

## The master prompt (template for every section)

```
Build section {NN} — {Name}.

Base yourself on:
1. docs/reference-intelligence.md §12-{NN} (the spec for this section)
2. The §13 workflow — run EVERY step, including the QA gates
3. .claude/rules/design-direction.md (motion constitution, depth recipe,
   composition laws, avoid-copying tests)

Process requirements:
- Plan first: show me the section plan (composition sketch, content.ts fields
  needed, motion plan, responsive plan at 375/768/1440) BEFORE writing code.
- If content.ts is missing a field, extend the interface first, then the data.
- Implement server-first; smallest possible client leaves.
- Render in the browser (playwright MCP) at 375 first, then 768, then 1440.
  Screenshot each. Fix what looks wrong. Iterate 2–3 passes.
- Run the originality test from design-direction.md and tell me the result.
- Verify: npx tsc --noEmit && npm run lint && npm run build, console clean.
- End with: what changed, screenshots, and the one thing you would improve next.

Do not touch other sections. Do not move to another section.
```

## Ready per-section prompts (fill the template)

| Order | Prompt first line |
|---|---|
| 1st | `Refine section 01 — Hero to full compliance with §12-01 and the motion constitution (it is ~90% there; this is a polish pass, not a rebuild).` |
| 2nd | `Build section 02 — Trust strip. §12-02.` |
| 3rd | `Build section 03 — Services grid. §12-03. This section defines the card system (hairline + 2-layer shadow + hover lift) that later sections reuse — name the reusable pieces.` |
| 4th | `Build section 06 — Testimonials with Embla. §12-06. Embla momentum only — no second animation layer.` |
| 5th | `Build section 07 — About preview. §12-07. The only media-scale reveal on the page.` |
| 6th | `Build section 08 — Final CTA. §12-08. Last accent event of the page.` |
| 7th | `Build section 09 — Footer. §12-09.` |
| 8th | `Build section 05 — Planner band + /planner teaser polish. §12-05. Aspirational framing from Nick's LookLab notes.` |
| 9th (LAST) | `Spec FIRST, then build section 04 — Before/After slider. §12-04. Day 1: full /reference-analysis spec + technical plan for touch/keyboard/pointer, show me before coding. Day 2: build. Native-range fallback is the escape hatch.` |

## Session rituals

**Start of every session (paste as first message):**
```
Confirm you've loaded CLAUDE.md and .claude/rules/design-direction.md.
State: current section, its §12 spec number, and the three things the motion
constitution forbids that are most tempting for this section.
```
Claude repeating the constraints out loud at session start measurably improves
adherence for the whole session.

**End of every session:**
```
Run the verify gates (tsc, lint, build, console). Then give me:
1. The 375px screenshot for Nick's issue #5 comment
2. The section's DoD checklist (visual-quality.md, 10 points) — honest ticks only
3. Anything you did that deviates from the report — flagged, with why
```

## Red flags — stop and correct the session if you see:

- Code before a plan, or a plan without the §12 spec quoted
- A new dependency appearing (especially GSAP/Lenis/locomotive — rejected in §11)
- Business text in a component instead of content.ts
- A second easing curve, durations >800ms, or animation on width/height/blur
- "Looks good" without a rendered screenshot at 375px
- Entrances that replay on scroll-up (once:true is law)
- Any section recognizable as Apple/Linear/Cuberto/Superpower

Correction prompt: `Stop. Re-read .claude/rules/design-direction.md and the §12
spec, list what you violated, and fix only that before continuing.`

## Why this works (the memory model)

- `CLAUDE.md` + `.claude/rules/*.md` → auto-injected into EVERY Claude Code
  session: the constitution is always in context.
- `docs/reference-intelligence.md` → read on demand when a prompt names its
  section: full depth, zero permanent context cost.
- Your prompt → names the section + demands the ritual: focus + enforcement.
- Nick's issue #5 → receives the screenshot + URL per section: external
  accountability closes the loop.
