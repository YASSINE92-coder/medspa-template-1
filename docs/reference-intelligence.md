# Reference Intelligence Report — EPIC-WEB-001

**Status:** Analysis only. No code was written or modified.
**Date:** 2026-08-14 · **Inspected live via playwright:** apple.com/airpods-pro · linear.app · cuberto.com · superpower.com
**Method:** `.claude/skills/reference-analysis` (principles → borrow/redesign/avoid → original spec). All recommendations bind to the existing Mint & Ink tokens, `.claude/rules/*`, and the Nick-approved 9-section architecture.

---

## 1. Executive summary

The four references share one meta-principle: **restraint is the luxury signal.** Each site picks ONE expressive dimension and keeps every other dimension quiet: Apple spends on cinematic imagery while typography stays disciplined; Linear spends on surface depth (layered shadows, hairlines) while layout stays rigid; Cuberto spends on motion personality while color stays black-on-white; Superpower spends on human warmth and trust-proof while type stays modest (42px/400 H1 — the smallest hero of the four).

Our takeaway for a med-spa template: **spend our expressiveness on imagery warmth + one calm motion language; keep type scale, color and layout strict.** The current Mint & Ink direction already matches this. What the references add is precision: an exact depth recipe, a chapter-based storytelling rhythm, a trust-proof pattern, and hard "avoid" lines that keep us from looking like a clone or a template.

Everything below feeds three artifacts: a combined pattern library (§9), an original design direction (§11), and a per-section architecture + workflow (§12–13) ready to drive Phase C.

---

## 2. Reference-by-reference analysis

### 2.1 apple.com/airpods-pro — product cinema, typographic restraint

**Observed facts (live):** 39.7 viewport-heights long · 16 `<video>` + 202 images · body = SF Pro Text · **H1 is tiny (24px) — it's a label**, display weight goes to H2s at 56px with −0.28px tracking · sticky product localnav (name left, price + Buy right) · chapters: Highlights → Take a closer look → Intelligent noise control → Audio performance → Personalized listening → Fitness.

- **Brand & art direction:** monochrome neutrality; the PRODUCT is the only color event. Emotional tone: awe through scale contrast (huge product renders vs small calm text).
- **Layout:** single centered column rhythm; full-bleed media panels alternating with narrow text measures (~600px). Section height is generous — one idea per viewport.
- **Typography why it works:** hierarchy is created by *scale contrast and space*, not by weight or color. Small eyebrow-labels (24px) orient; 56px statements land one message each. Tracking tightens as size grows.
- **Scroll behavior:** the famous scroll-scrubbed product animation (video frames tied to scrollbar; fully reversible). Sticky localnav appears after hero. Progressive chapter reveals.
- **Interaction:** almost none besides play/pause chips and the localnav Buy. Zero hover cleverness — touch-first thinking.
- **Motion purpose:** motion = product demonstration (rotate, explode, fit-in-ear), never decoration. Text simply fades/rises a few px.
- **UX:** one long persuasion ladder ending in Buy; price is never hidden (sticky Buy). Cognitive load per viewport ≈ one sentence.
- **Responsive:** same narrative stacked; media swaps to portrait crops; localnav persists (thumb-reachable Buy).
- **Performance strategy:** poster-first videos, aggressive lazy-loading, image `srcset` everywhere, scrub sequences only on capable viewports.
- **Accessibility:** semantic chapters, real headings, captions on demos; motion heavy but reduced-motion serves stills.
- **Transferable principle:** *small label + huge statement + one idea per viewport + price always visible.*

### 2.2 linear.app — surface depth, hairline precision

**Observed facts (live):** near-black `rgb(8,9,10)` body · Inter Variable · H1 64/64, tracking −1.4px, weight 510 (variable-font precision) · pill CTAs (9999px) · **layered shadow recipe measured: 4 stacked shadows, 1–8px offsets, opacities 0.01→0.07** · 16.3 viewport-heights · 0 videos — all crafted UI stills · 8 H2 chapters.

- **Brand:** engineered calm. Feels expensive because *edges are perfect*: hairlines (1px, low-alpha), consistent radii, shadows that behave like real light.
- **Layout:** strict container, dense but ordered; feature "panels" as floating glass cards on dark felt.
- **Typography why it works:** variable weight 510 (not 500/600) tuned for dark bg; tracking scales with size; small text stays highly legible via generous line-height.
- **Depth recipe (the steal of the whole study):** never one big shadow — 3–4 stacked, low-opacity, small-offset shadows + a 1px hairline ring. Depth reads as *physical*, not "drop-shadowed".
- **Motion:** micro only — 120–200ms fades/translate on hover, staggered card reveals; nothing loops; nothing parallaxes.
- **UX:** confidence through density — everything scannable, CTAs repeat quietly.
- **Responsive:** panels stack; density relaxes; nothing disappears except decoration.
- **Performance:** static imagery instead of video; variable font = one file; GPU-safe transforms only.
- **Transferable principle:** *depth = stacked low-opacity shadows + hairlines; motion = micro-feedback, never spectacle.*

### 2.3 cuberto.com — editorial rhythm, personality in doses

**Observed facts (live):** white bg · Suisse Intl · centered H1 58px/500 · 12 videos used as *project reels inside rounded cards* · 5 cursor-follower elements (signature toy) · 14.9 viewport-heights · IA: What we do → Trusted by → Selected work → Clients → Why → Insights → FAQ → Contact CTA.

- **Brand:** confident editorial minimalism — giant type, huge whitespace, then bursts of motion inside contained cards.
- **Layout why it works:** asymmetric editorial spreads; media never full-bleed chaos — motion lives INSIDE rounded frames, so the page grid stays calm while content moves.
- **Typography:** display sans at extreme sizes with normal-ish weight (500) — scale does the work, weight stays elegant.
- **Interaction:** magnetic buttons, cursor blob, hover-to-play reels — the personality layer. It works for an agency selling motion; it would be noise for a med-spa.
- **Motion:** masked text reveals, videos autoplay on hover/in-view; choreography feels hand-made.
- **UX cost:** style over scanning — service pages bury information; fine for a portfolio, wrong for conversion.
- **Transferable principle:** *contain motion inside rounded media frames; let whitespace and type scale carry the "design" feeling; personality in small, deliberate doses.*

### 2.4 superpower.com — health trust, conversion narrative

**Observed facts (live):** white bg · NB International Pro · **H1 modest: 42px / weight 400** · black pill CTAs repeated · 11 videos + 2 canvas · 18.3 viewport-heights · chapters: How it works → 100+ biomarkers → All your data in one place → Personalized protocol → Care team 24/7 → Doctor credibility → Outcomes → Social proof → Membership CTA · physician credential strip (Stanford/Harvard/UCSF/Oxford) · full-screen email-capture modal on entry (mobile too).

- **Brand:** warm clinical — human photography (hands, faces, real devices), plain-spoken copy, ivory/black with soft color accents.
- **Typography why it works:** the *smallest* hero type of the four, weight 400 — warmth and honesty instead of shouting. Trust niches (health!) lower the volume.
- **UX conversion ladder:** exactly the arc a med-spa needs — how it works → proof (biomarkers ≈ our before/afters) → personalization (≈ our planner) → humans behind it (≈ our team) → outcomes/social proof → repeated single CTA.
- **Trust pattern:** credential logos + "designed by physicians" chips + real member counts — credibility is *shown*, not claimed.
- **Mobile (inspected at 390px):** same ladder stacked; full-width black pill CTAs; nothing lost.
- **Anti-pattern observed:** the entry modal demanding email before showing the page — high-friction, exactly what our recon flagged at Me LA. We refuse this.
- **Transferable principle:** *conversion narrative in chapters + shown credibility + one repeated CTA; warmth via photography and 400-weight honesty.*

---

## 3. Complete section maps (observed)

```
APPLE /airpods-pro                LINEAR                       CUBERTO                      SUPERPOWER
Localnav (sticky, price+Buy)      Nav (glass, slim)            Nav (logo + pill Contact)    Nav (center logo, pill CTA)
↓ Hero (product + tiny label)     ↓ Hero (type-first + app)    ↓ Hero (centered statement)  ↓ Hero (membership value)
↓ Highlights (video chapters)     ↓ Product tool intro         ↓ What we do (service list)  ↓ How it works
↓ Take a closer look (interactive)↓ Self-driving ops panel     ↓ Trusted by (logo strip)    ↓ 100+ biomarkers (proof)
↓ Noise control (feature chapter) ↓ Product direction panel    ↓ Selected work (reel grid)  ↓ Your data in one place
↓ Audio performance               ↓ Teams & agents panel       ↓ Client testimonials        ↓ Personalized protocol
↓ Personalized listening          ↓ PR/agent review panel      ↓ Why Cuberto                ↓ Care team 24/7
↓ Fitness                         ↓ Progress at scale          ↓ Insights (blog)            ↓ Doctor credibility
↓ Specs/compare + CTA             ↓ Changelog + closing CTA    ↓ FAQ                        ↓ Outcomes + social proof
Footer                            Footer                       ↓ Contact CTA · Footer       ↓ Membership CTA · Footer
```

Shared skeleton: **Nav → Value hero → Proof chapters → Human/credibility layer → Social proof → single repeated CTA → Footer.** Our approved 9-section homepage already follows this arc — validation, not accident.

## 4. Scroll behavior analysis

| Pattern | Where seen | Verdict for us |
|---|---|---|
| Scroll-scrubbed product cinema (reversible) | Apple | **Avoid** — proprietary signature, heavy assets, and our motion rules ban scroll-jacking; the "reversible" feel we wanted is delivered instead by scroll-*linked micro*-effects (see below) |
| Sticky sub-nav with price + primary CTA | Apple | **Redesign** → our sticky mobile Book bar already does this; add desktop nav elevation-on-scroll (shadow + hairline appear after 8px) |
| Once-only staggered reveals on chapter entry | Linear, Superpower | **Borrow** — matches our `whileInView once:true, amount 0.3` rule |
| Hover-to-play contained video reels | Cuberto | **Nice-to-have later** — before/after could adopt "motion inside a rounded frame" without video |
| Pinned storytelling panels | Superpower (light use) | **Avoid v1** — cost/benefit wrong for conversion page; revisit only for planner page v2 |
| Entry modal interrupting scroll | Superpower | **Refuse** — recon anti-pattern |

**Resolution of the "top-to-bottom AND bottom-to-top" wish:** entrance reveals replay is banned (template feel, motion rules). The *reversible* feeling comes from scroll-**linked** state that is inherently bidirectional: nav elevation appearing/disappearing, sticky Book bar, and (single approved experiment, Phase D gate) a ≤4% scroll-linked scale on the hero image — transform-only, no listener jank, reversible by construction.

## 5. Motion design language (combined)

Observed personalities: Apple = cinematic-demonstrative · Linear = micro-precise · Cuberto = playful-editorial · Superpower = calm-supportive. Durations cluster 150–250ms (micro) and 500–800ms (reveals) everywhere; nobody exceeds ~900ms; nobody bounces.

**Our motion constitution (locks the existing house rules):**

```
easing      cubic-bezier(0.21, 0.68, 0.32, 0.99)      — the house curve, everywhere
micro       120–200ms   hover, focus, color, nav elevation
entrance    450–700ms   whileInView reveals, once:true, amount 0.3
distance    8–16px      translate only — no fly-ins
scale       0.97–1.00   media reveals only
stagger     60–90ms     max 5 steps, then group
properties  transform + opacity ONLY
```

- **MUST HAVE:** hero entrance ≤800ms total; group reveals per section; Tailwind-class hovers (lift −2px + shadow step + `active:translate-y-0`); nav elevation on scroll; reduced-motion = final state instantly.
- **NICE TO HAVE:** ≤4% hero image scroll-scale (Phase D, perf-gated); masked one-time line reveal for H1 *if* LCP unaffected; Cuberto-style hover-play inside before/after frame.
- **SHOULD AVOID (hard):** scroll-scrub cinema, parallax-by-default, cursor followers/magnetic buttons, replaying entrances, animated blur/shadow via JS, counters/typewriters, anything Apple/Cuberto would recognize as theirs.

## 6. Interaction analysis

- **CTAs:** all four use pills; primary is *the only saturated element in view* (Apple's blue Buy, Superpower's black). → Ours: `bg-accent-ink text-white hover:bg-accent-deep`, one accent focal per viewport (already token-enforced).
- **Cards:** Linear = hairline + stacked shadow + hover lift; Cuberto = rounded media frame is the card. → Service cards: `ring-1 ring-ink/5` + 2-layer shadow + lift; media cards: motion stays inside the frame.
- **Navigation:** slim, glass-blurred, elevates on scroll (Linear); mobile keeps ONE thumb CTA visible (Apple localnav / Superpower pill / our Book bar).
- **Forms:** Superpower's inline single-field + pill submit → planner "get notified" pattern.
- **Draggables:** none of the four — our before/after slider must therefore follow *native* affordances (visible handle, pointer/touch/keyboard) rather than any reference.

## 7. UI/UX analysis (what makes them easy or hard)

Easy: one idea per viewport (Apple) · relentless scannability + repeated quiet CTA (Linear, Superpower) · price/CTA never hidden (Apple) · plain-language copy at 400 weight (Superpower).
Hard: entry modal gating content (Superpower) · style-over-info service pages (Cuberto) · 40-viewport pages demand chapter fatigue management (Apple solves with sticky Buy — we solve with sticky Book bar + shorter page).
**Our conversion ladder stays as approved:** Hero (promise + Book) → Trust strip (instant proof) → Services+prices (transparency = recon differentiator) → Before/After (visual proof) → Planner band (differentiator tease) → Testimonials (social proof) → About preview (humans) → Final CTA → Footer. This IS the Superpower ladder tuned to med-spa.

## 8. Responsive analysis

Common law across all four: **mobile is re-authored, not shrunk.** Concretely observed: type drops ~35–45% (Linear 64→~40px; Apple 56→~32px); multi-column panels become single stacks in identical narrative order; decorative layers (glows, cursor toys) are removed; CTAs become full-width pills in thumb reach; sticky elements *persist* (they matter more on mobile). Touch replaces every hover meaning — nothing may be hover-only.
→ Locks our rules: unprefixed classes = phone design; hover states get visible non-hover equivalents (chips, focus, default shadows); the Book bar is our persistent mobile CTA; decorative glows are `md:`-only or cheap.

## 9. Performance analysis → reproduction strategy

Observed strategies: Apple = poster-first lazy video + exhaustive `srcset`; Linear = *no video at all*, one variable font, crafted stills; Cuberto = videos only in-frame, on-demand; Superpower = mixed, pays for it (console errors, third-party chat, modal JS).

**Our budgets (bind Phase C/D):** Lighthouse mobile ≥90 ×4 (EPIC gate) · LCP <2.5s on throttled mobile · initial JS ≤ ~160KB gz (Next+React+motion fits; **no GSAP/Lenis/Locomotive — rejected**, see §11-tech) · images AVIF/WebP via `next/image`, `priority` ONLY hero LCP, correct `sizes` per §12 · fonts stay `next/font` (Sora+Geist, subsetted, zero CLS) · videos (if ever) poster+`preload="none"` · animate transform/opacity only · client boundaries stay leaf-level (`RevealOnScroll` wrapper pattern, not client sections) · hero H1 must not be opacity-gated past ~300ms — measure, else switch to CSS keyframes fallback.

## 10. Accessibility analysis → our rules

References are semantically strong (real heading ladders, buttons vs links) but imperfect (Superpower modal focus, Cuberto cursor toys are pointer-only). **Our binding rules:** semantic sections + single H1/page, no level skips · every interactive element keyboard-reachable with visible `focus-visible` ring (`accent-ink`, offset per surface — already in Hero) · contrast duty via token tiers: `accent` decoration-only / `accent-ink` fills / `accent-deep` text (never `text-accent`) · touch targets ≥44px (Book bar, slider handle) · reduced-motion renders final state, never blank · before/after slider operable by pointer, touch AND arrow keys with an accessible name + value · decorative glows `aria-hidden` · text legible at 200% zoom.

## 11. Original design direction (ours, not theirs)

- **Visual personality:** "calm glow" — Superpower's warmth × Linear's precision, in Mint & Ink. A viewer should feel *rested and in good hands*, never marketed at.
- **Typography:** Sora (600 max) for headings, Geist for everything else. Scale per `visual-quality.md` (h1 4xl→6xl tight; body base/lg muted). Apple's lesson applied: eyebrows stay small (13–14px, wide tracking) so 56–60px statements win by contrast, not weight.
- **Color philosophy:** bg/surface carry; ink/muted speak; **one accent event per viewport** (Apple's discipline); accent-soft/blush are the only washes; tiered accent tokens enforce contrast duty.
- **Depth (the Linear steal, tokenized):** two elevation levels only — resting: `ring-1 ring-ink/5` + `shadow-sm`; raised/hover: 2-layer stacked low-opacity shadow (≈ `0 1px 2px ink/6, 0 8px 24px −8px ink/10`) — define once as a utility, reuse everywhere. Never a single fat drop-shadow; hairlines never gray borders.
- **Spacing/grid:** container `max-w-6xl px-4`; rhythm `py-16 md:py-24`; scale steps per rules; one deliberate asymmetric/overlap moment per page (hero chip), not per section.
- **Radius:** pills / `rounded-2xl` cards / `rounded-3xl` media — Cuberto's "motion lives inside rounded frames" adopted as: *all media sits in rounded-3xl frames; the frame never moves, the content may*.
- **Imagery:** real humans, soft light, mint/blush-compatible tones; faces relaxed, never mid-procedure clinical; crops leave breathing room on the text side; every asset through `next/image` with real `sizes`.
- **Icons:** lucide, 1.5–2px stroke, `accent-deep` on light, always beside a label (never icon-only meaning).
- **Motion:** §5 constitution. **Mobile:** §8 laws. **A11y:** §10 rules. **Perf:** §9 budgets.
- **Tech choices (justified):** `motion` v13 — needed (reveals/gestures), already shipped, tree-shaken. `embla` — needed (testimonials), shipped. **GSAP+ScrollTrigger — rejected:** duplicates motion, +~30KB, license friction, invites banned scrub patterns. **Lenis/smooth-scroll — rejected:** scroll-jacking banned, a11y cost. **WebGL/canvas — rejected:** zero justified use on this page. **Native CSS first** for every hover/focus/transition (Tailwind `transition-*`); JS animation only where viewport/gesture logic requires it. `IntersectionObserver` arrives free via `whileInView`.

## 12. Page architecture (approved 9 sections, now specified)

Format: Purpose / Visual / UX goal / Interaction / Motion / Tech / Responsive / Perf.

**01 · Hero** — Promise + instant booking path. / Split: copy left, rounded-3xl image right, floating tagline chip (our overlap moment); eyebrow-label small, statement large. / Visitor knows *what, where, how much trust* in 3s; Book is the only saturated element. / CTA pill (accent-ink→deep), tel link, chip. / Entrance ≤800ms staggered fade-up (exists); optional Phase-D ≤4% image scroll-scale. / Server section + tiny client reveal; `priority` image, `sizes="(min-width:768px) 45vw, 92vw"`. / Mobile: copy-first stack, image 4/3, bar clearance `pb-16`. / LCP owner — no other priority asset.

**02 · Trust strip** — Instant third-party proof (Superpower credential pattern, adapted: rating + review count + 3 proof chips). / One quiet `bg-surface` band, hairline top/bottom. / Confirm "others chose them" pre-scroll. / None. / Single group fade, no stagger. / Server-only. / Chips wrap 2×2 ≥375. / Zero-cost section — no images.

**03 · Services grid** — Transparent menu + prices (recon differentiator). / 8 cards, `rounded-2xl`, hairline+shadow-sm, price `accent-deep`, Popular badge ≤2. / Scan 8 in <10s, tap → detail. / Hover lift+shadow step (CSS); whole card focusable link. / `whileInView` stagger ≤5. / Server; card = local component until reused. / 1col→2→4; row height equalized. / No images v1 (icons later) — keeps grid instant.

**04 · Before/After slider** — THE proof; Nick's flagged hard one. / Full-width rounded-3xl frame per case, handle pill with grab affordance, labels burned as chips. / "Real results, honestly shown." / Drag (pointer+touch) AND arrow keys AND visible handle; no scroll hijack on mobile (vertical pan passes through). / Frame static; only clip-path/transform moves — inside-the-frame rule. / Client leaf via `next/dynamic`; motion gestures or native range fallback; a11y name+valuetext. / Mobile: taller 4/3 crops, handle ≥44px. / Below-fold lazy; both images same intrinsic size to kill CLS.

**05 · Planner band** — Differentiator tease → /planner. / `accent-soft` band, aspirational one-liner, quiet pill. / Plant "this spa is modern," zero pressure. / Single CTA. / Group fade only. / Server. / Stacks center on mobile. / Text-only — free.

**06 · Testimonials** — Human proof, service-linked. / Embla carousel, 1.15 cards visible at 375 (peek = affordance), quotes with rating + linked service chip. / Real voices in their words. / Native embla drag/snap; prev/next buttons keyboard-visible. / Embla momentum only — no second layer. / Client leaf; embla ~7KB. / Peek 1.15→2→3 slides. / Text cards — free; no avatars v1.

**07 · About preview** — The humans (Superpower warmth). / Blush band, one warm team image + 2-line story + link. / "I'd let these people touch my face." / Single link hover. / Image scale 0.97→1 on reveal (the only media-scale use). / Server. / Image above text mobile. / One lazy image, exact `sizes`.

**08 · Final CTA** — Ask, once, confidently. / Ink band, white statement, accent pill (page's last accent event), phone alt. / Zero new info — decision space. / Pill + tel. / Group fade. / Server. / Full-width pill mobile. / Free.

**09 · Footer** — Utility trust: NAP, hours table, socials, map link. / Surface, hairline top, 3 cols→stack. / Findability + local-SEO surface. / Link hovers only. / None. / Server. / Stack with hours first. / Free.

## 13. Section implementation workflow (repeatable, enforced)

```
REFERENCE RESEARCH (skill: /reference-analysis — filled template, values not adjectives)
→ SECTION ANALYSIS (purpose, content fields vs content.ts — extend schema FIRST if needed)
→ UX DECISION (conversion job, hierarchy 1→3, CTA rule: one accent event)
→ VISUAL DIRECTION (composition sketch, 375-first, tokens only)
→ TECHNICAL PLAN (server/client boundary, deps check, sizes/priority, a11y plan)
→ IMPLEMENTATION (small client leaves; content.ts only for business text)
→ BROWSER RENDER (real render, no imagination)
→ VISUAL QA (/visual-qa: 375→768→1440, overflow, rhythm, focal count)
→ RESPONSIVE QA (/responsive-design checklist)
→ ACCESSIBILITY QA (/accessibility: keyboard walk, contrast tiers, reduced-motion emulation)
→ PERFORMANCE QA (/performance: console clean, tsc/lint/build, no CLS; Lighthouse spot-check on media sections)
→ REFINEMENT (2–3 passes expected — first render is never final)
→ APPROVAL (phone screenshot + live URL comment on issue #5)
→ NEXT SECTION
```
Definition of done per section = `visual-quality.md` §"Definition of done" (10 points) — unchanged, now with §5/§9/§10 of this report as measurable inputs.

## 14. Patterns to AVOID copying (the clone line)

Apple's scroll-scrub cinema, localnav look, SF-style type voice, monochrome-product staging · Linear's exact gradient/glass stack, dark theme as identity, changelog motif · Cuberto's cursor blob, magnetic buttons, reel-grid portfolio composition, mixed-case editorial layouts · Superpower's entry email modal, biomarker-dashboard visual language, credential-logo strip verbatim, black-pill-everything identity · generally: any composition recognizable as "that site with spa text", any copied copy voice, any borrowed proprietary imagery/iconography. **Originality test per section:** (1) could a viewer name the reference? must be NO; (2) all values expressible in our tokens/scales; (3) mobile stands alone.

## 15. Risks / tradeoffs

1. **Hero LCP vs animated H1** — current hero animates H1 opacity; if throttled-mobile LCP suffers, swap to CSS keyframes started pre-hydration. Measure in Phase D, budget in §9.
2. **Before/after complexity** — highest slip risk; time-boxed 2 days (Nick pre-warned); native-range fallback is the escape hatch.
3. **Remote Unsplash hosting** — fine for v1; self-host + AVIF at Phase D to remove third-party variance from Lighthouse.
4. **Template-feel creep** — the banned list (`visual-quality.md`) + §14 are the guardrails; `/ui-ux-review` after each section.
5. **Scope temptation from references** — every "wow, add it" idea routes through §5 MUST/NICE/AVOID, not straight into code.
6. **Motion library on low-end phones** — reveals are transform/opacity only; test on a real mid-range device at Phase D.

## 16. Recommended next step

1. Nick/owner approves this report (or amends §5/§11/§12).
2. Hero gets its formal `/reference-analysis` spec + one refinement pass to fully match §5 (it is ~90% there).
3. Sections 02–03 (trust strip + services grid) same-day — they are cheap and lock the rhythm.
4. Before/after slider gets its own spec day (the §12-04 plan) before any code.
5. Phase D runs §9 budgets as a checklist.

---

### Creative-director answer

*"If you were the senior creative director responsible for this project, exactly how would you recommend we build it section-by-section to achieve the highest possible result?"*

Build it as **one rhythm, nine verses — in this exact order: 1 → 2 → 3 → 6 → 7 → 8 → 9 → 5 → 4.** Hero first because it sets the type scale, depth recipe and motion timing every other section inherits — polish it until the 375px screenshot alone could sell the template. Then trust strip and services same-week: they're cheap, they complete the above-the-fold conversion story, and services locks the card system (hairline + 2-layer shadow + hover lift) that testimonials and about reuse. Testimonials next to prove the carousel pattern, about + final CTA + footer to close the emotional arc cheaply. Planner band ninth — one afternoon, but only after the page rhythm exists so its accent-soft band sits in contrast correctly. **The before/after slider goes ABSOLUTELY LAST** despite being section 4 in the layout: it's the highest-risk, highest-value piece, and by then every pattern it needs (frame, chips, shadows, motion timing, a11y conventions) already exists and is proven — you build the hard thing on a finished system, never a finished system around the hard thing. One section at a time, browser-rendered at 375 before 1440, two polish passes minimum, screenshot to Nick, next verse. The wow is not any single section — it's that verse nine feels like verse one wrote it.

*Report ends. Awaiting explicit approval before any implementation.*
