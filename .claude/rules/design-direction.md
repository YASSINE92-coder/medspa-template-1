# Design direction — binding decisions (from docs/reference-intelligence.md)

This file is the distilled, always-loaded version of the Reference Intelligence
Report. Full reasoning, per-section specs and reference analysis live in
`docs/reference-intelligence.md` (the report). When this file and the report
disagree, the report §5/§11/§12 wins — and say so out loud.

## The meta-principle
Restraint is the luxury signal. We spend expressiveness on TWO things only:
imagery warmth and one calm motion language. Type scale, color and layout stay
strict. Every "wow, add it" idea routes through the MUST/NICE/AVOID table below
before any code.

## Build order (creative-director order — do not reshuffle silently)
Hero (01) → Trust strip (02) → Services grid (03) → Testimonials (06) →
About preview (07) → Final CTA (08) → Footer (09) → Planner band (05) →
**Before/After slider (04) LAST** — the hard thing is built on a proven system,
never the system around the hard thing.

## Motion constitution (numbers are law)
```
easing      cubic-bezier(0.21, 0.68, 0.32, 0.99)  everywhere, no second curve
micro       120–200ms   hover, focus, color, nav elevation
entrance    450–700ms   whileInView, once:true, amount 0.3, total ≤800ms/section
distance    8–16px      translate only — no fly-ins
scale       0.97–1.00   media reveals only
stagger     60–90ms     max 5 steps, then group
properties  transform + opacity ONLY
```
- MUST: group reveals per section · Tailwind-class hovers (lift −2px + shadow
  step + `active:translate-y-0`) · nav elevation on scroll · reduced-motion =
  final state instantly, never blank.
- NICE (needs explicit approval + perf check): ≤4% hero image scroll-linked
  scale · one-time masked H1 line reveal if LCP unaffected.
- AVOID (hard): scroll-scrub cinema, parallax, cursor followers/magnetic
  buttons, replaying entrances, JS-animated blur/shadow, counters/typewriters,
  anything recognizable as Apple/Linear/Cuberto/Superpower's signature.

## Depth recipe (exactly two elevation levels)
- Resting: `ring-1 ring-ink/5` + `shadow-sm`.
- Raised/hover: stacked low-opacity pair ≈ `0 1px 2px rgb(16 24 40 / .06),
  0 8px 24px -8px rgb(16 24 40 / .10)` — define once, reuse everywhere.
- Never a single fat drop-shadow. Hairlines never gray borders. Depth never
  animates via JS.

## Composition laws
- ONE accent event per viewport — the primary CTA owns the color moment.
- Eyebrows small (13–14px, wide tracking); statements win by size contrast,
  never by weight (Sora caps at 600).
- All media sits in `rounded-3xl` frames; the frame never moves — motion may
  live inside it.
- One deliberate overlap/asymmetry moment per page (hero chip). Not per section.
- Body copy measure ≤ ~65ch. One idea per viewport on the homepage narrative.

## Trust & conversion laws (from Superpower/recon)
- Prices always visible; booking never behind an account wall or modal.
- Credibility is shown (ratings, counts, credentials as content.ts data),
  never claimed in adjectives.
- The conversion ladder order of the 9 sections is Nick-approved — changes go
  through him, not through taste.

## Avoid-copying line (originality test before every section is "done")
1. Could a viewer name the reference from our section? Must be NO.
2. Every value expressible in Mint & Ink tokens + our type/space scale.
3. The 375px design stands on its own (not desktop shrunk).

## Per-section ritual (non-negotiable)
Before building section XX: read `docs/reference-intelligence.md` §12-XX and
run the §13 workflow (research → analysis → UX → visual → tech plan → implement
→ render → visual/responsive/a11y/perf QA → refine ×2 → screenshot + live URL
comment for Nick). Definition of done = the 10 points in `visual-quality.md`.

## Performance budgets (Phase D gates, respected during Phase C)
Lighthouse mobile ≥90 ×4 · LCP <2.5s throttled · initial JS ≤ ~160KB gz ·
`priority` on the hero image only · real `sizes` on every image · client
boundaries stay leaf-level · no new animation/scroll libraries (GSAP, Lenis,
Locomotive are rejected — see report §11).
