---
name: reference-analysis
description: Analyse a visual reference (site, page, or screenshot) and turn it into an original spec for a section of this project. Use before implementing or redesigning any section, when the user names a reference like Apple, Linear, Cuberto or Superpower, or when a section needs a stronger composition idea. Produces a structured analysis plus an explicit borrow / redesign / avoid decision — never a copy.
argument-hint: [section name] [optional reference URL]
allowed-tools: Read, Grep, Glob, WebFetch, WebSearch
---

# Reference analysis

Goal: extract **principles** from a reference and design something original for
this med-spa. A reference is evidence about what works, not a template.

Hard line: never reproduce a reference's layout as-is, branding, illustrations,
photography, copy, icon set, or signature proprietary elements (Apple's product
scroll-scrub, Linear's exact gradient stack, Cuberto's cursor toys). If the output
would be recognisable as "that site with different text", start over.

## Standing reference set
| Reference | What it is good for |
| --- | --- |
| apple.com/airpods-pro | Product storytelling, image treatment, huge type used calmly, scroll-driven sequencing, restraint |
| linear.app | Density and precision, dark/neutral surfaces, hairline structure, micro-interactions, typographic hierarchy at small sizes |
| cuberto.com | Motion language, playful interaction, expressive layout, editorial rhythm |
| superpower.com | Health-adjacent trust and warmth, human imagery, plain-spoken copy blocks, calm palette |

Med-spa reality check before borrowing anything: the audience is prospective
clients, not developers. Trust, warmth, honest prices and a one-tap booking path
outrank cleverness. A device-marketing trick that hides the CTA is a bad borrow.

## Procedure
1. **Name the job.** What does this section have to accomplish for a visitor who
   is 60% of the way to booking? What must they feel, learn, and be able to do?
2. **Gather the reference.** Fetch/read the reference (WebFetch, or a screenshot
   the user supplies, or the playwright MCP to render and screenshot it). If you
   cannot actually see it, say so and analyse from stated principles instead of
   inventing detail.
3. **Analyse — fill in every row.** Values, not adjectives: "eyebrow 13px /
   0.08em / muted, 12px above a 56px headline", not "nice spacing".
4. **Decide** borrow / redesign / avoid, with a reason per line.
5. **Write the section spec** the implementation will follow.
6. **Originality test** (all three must pass) before implementing.

## Analysis template
```
SECTION: <name>            REFERENCE: <url or file>
Purpose            — visitor job, business job, single success metric
Layout             — grid, columns, container width, asymmetry, alignment spine
Hierarchy          — read order 1→n, what earns size, what earns colour
Typography         — families, sizes, weights, line-height, tracking, measure
Spacing            — vertical rhythm, block gaps, inner padding, edge gutters
Imagery            — subject, crop, aspect, treatment, scrim, how text sits on it
Focal point        — the one thing the eye lands on, and what makes it win
Interaction        — hover, press, drag, keyboard affordances, feedback
Motion             — what animates, trigger, distance, duration, easing, stagger
Responsive         — what reflows, what is dropped, what changes crop or order
Accessibility      — contrast, heading level, focus path, motion sensitivity
Principle          — the transferable idea in one sentence
```

## Decision table
```
BORROW    <principle>            → because <why it serves this section>
REDESIGN  <element>              → their approach becomes <our approach> because <why>
AVOID     <element>              → because <cost: perf, a11y, mobile, brand fit>
ORIGINAL  <what makes ours ours> → our tokens, our imagery, our copy, our composition twist
```

## Originality test
1. Could a viewer name the reference from our section? → must be **no**.
2. Is every value expressible in Mint & Ink tokens and our type/space scale?
3. Does the mobile design stand on its own, rather than being the desktop shrunk?

## Output — section spec
End with a spec the build follows directly: composition sketch (ASCII is fine),
breakpoint behaviour at 375 / 768 / 1440, type and spacing values, image
requirements (aspect + subject + `sizes`), interaction and motion plan with
reduced-motion fallback, content fields needed in `src/content.ts` (flag any that
don't exist yet), and the a11y notes. Then stop — implementation is a separate step.
