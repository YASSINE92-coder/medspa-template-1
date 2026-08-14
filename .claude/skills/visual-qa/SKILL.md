---
name: visual-qa
description: Run browser-based visual QA on a route or section — render it at real viewports, screenshot, and find overflow, spacing, typography, alignment, interaction and console problems. Use after implementing or changing anything visual, when the user asks how it looks or reports something broken, and before claiming a section is verified. Uses the playwright MCP when available.
argument-hint: [route, e.g. / or /services]
allowed-tools: Bash, PowerShell, Read, Grep, Glob, mcp__playwright__browser_navigate, mcp__playwright__browser_resize, mcp__playwright__browser_take_screenshot, mcp__playwright__browser_snapshot, mcp__playwright__browser_console_messages, mcp__playwright__browser_evaluate, mcp__playwright__browser_press_key, mcp__playwright__browser_hover, mcp__playwright__browser_click, mcp__playwright__browser_drag, mcp__playwright__browser_wait_for
---

# Visual QA

Rule zero: **never claim a visual result was verified without rendering it.**
If no browser tooling is available, say plainly that you inspected the code only.

## The loop
```
IMPLEMENT → RUN → OPEN IN BROWSER → INSPECT → IDENTIFY → FIX → RENDER AGAIN → FINAL REVIEW
```

## Setup
1. Is the dev server up? Check `http://localhost:3000`; if not, start
   `npm run dev` in the background and wait for the ready line. Don't start a
   second server on another port if one is already running.
2. Navigate with the playwright MCP. Save screenshots to the session scratchpad,
   named `<route>-<width>-<pass>.png`, so passes can be compared.

## Viewports (every pass)
| Width | Why |
| --- | --- |
| **375 × 812** | The judgement viewport. If it fails here, it fails. |
| 768 × 1024 | Tablet — the awkward middle where grids half-collapse. |
| 1440 × 900 | Primary desktop. |
| 1920 × 1080 | Large desktop — does the layout hold or drift apart? |

## Checks per viewport
- **Overflow**: `document.documentElement.scrollWidth > document.documentElement.clientWidth`
  → if true, find the culprit (usually a fixed width, a long unbroken string, a
  `-mx-` bleed, a grid with `min-content` children, or a blur decoration).
- **Above the fold**: at 375px, is the headline + primary CTA visible without
  scrolling? Is anything important hidden behind the fixed mobile book bar?
- **Bottom of page**: content not obscured by the mobile book bar (`main` keeps
  `pb-16 md:pb-0`); footer reachable.
- **Sticky header**: scrolled state legible, doesn't cover anchor targets.
- **Typography**: no clipped descenders, no orphan word alone on a headline's
  last line, measure not stretching edge-to-edge, no text overlapping images.
- **Images**: loaded (no broken/empty boxes), sharp, subject not cropped badly at
  this aspect, no shift as they arrive.
- **Alignment & spacing**: section rhythm consistent, container gutters equal,
  card heights even in a row, eyebrow→headline gaps identical across sections.
- **Console**: `browser_console_messages` — zero errors and zero React warnings
  (hydration mismatches, missing keys, `next/image` sizing warnings all count).

## Interaction pass (desktop viewport)
Hover every interactive element (buttons, nav links, cards) and confirm a visible,
smooth change. Tab through the page from the top: every focusable element must
show a clearly visible focus ring in a sensible order, and nothing focusable may
be invisible. Click the primary CTA and confirm it does what it claims.

## Motion pass
Reload and watch entrance animations: nothing flashes, nothing arrives after the
user would have started reading, no layout shift from animated elements. Then
emulate reduced motion (`prefers-reduced-motion: reduce`) and reload: content must
appear instantly and completely, never stuck at `opacity: 0`.

## Report
```
ROUTE <route> — pass <n>
375  ✅/❌ <findings>
768  ✅/❌
1440 ✅/❌
1920 ✅/❌
Console: <clean | errors>
Interaction/focus: <findings>
Reduced motion: <findings>
→ Fixing now: <ordered list>   → Deferred: <with reason>
```
Fix, re-render, and repeat until the pass is clean. Attach or reference the
screenshots you actually looked at.
