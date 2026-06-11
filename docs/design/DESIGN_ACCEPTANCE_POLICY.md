# Design Acceptance Policy

## Purpose

Define strict, evidence-based rules for design and UI acceptance. Prevent false confidence from green tests, text-only reviews, or agent claims.

## Core Principles

### 1. Visual Acceptance is Evidence-Based

**No UI slice can be accepted from text description alone.**

Evidence required for UI acceptance:
- **Screenshot evidence** — Actual browser state capture
- **Side-by-side comparison** — Target vs current visual comparison
- **DOM verification** — Deterministic tests for required/forbidden elements
- **Human verification** — Human must confirm visual evidence matches target

**Text-only review is INSUFFICIENT.** Agent claims, checklists, or descriptions alone cannot prove visual quality.

---

### 2. Screenshot/Browser State is Source of Truth

**If agent verdict conflicts with browser/screenshot, browser/screenshot wins.**

**Hierarchy of Truth:**
1. **Browser state** — What actually renders in the browser
2. **Screenshot evidence** — Captured visual state
3. **DOM tests** — Deterministic verification
4. **Agent verdict** — Advisory input only
5. **Text claims** — Least reliable

**Conflict Resolution:**
- If agent says "looks good" but screenshot shows generic navbar → Screenshot wins
- If agent says "5.0/5" but browser shows wrong elements → Browser wins
- If agent says "ACCEPTED" but human disagrees → Human wins

---

### 3. P0 Blocker Caps Score

**If any P0 visual blocker fails, maximum score is 2.9/5.**

This prevents artificial inflation of scores when critical elements are missing.

**P0 Blocker = Automatic REJECTED** if:
- Missing rounded pill header
- Missing "MEETING READINESS" subtitle
- Missing "Log in" button
- Missing "Run readiness check" CTA
- Missing required nav items
- Forbidden old nav visible (Home, Build Process)
- Header is full-width generic navbar

**Score Cap:**
- Any P0 blocker fails → Maximum score 2.9/5
- No screenshot evidence → Maximum score 2.0/5
- DOM blockers missing → Cannot be ACCEPTED

---

### 4. Generic SaaS Output is Rejection

**If implementation looks like a generic template rather than approved prototype direction, status is NEEDS_REWORK or REJECTED.**

**Generic SaaS Indicators:**
- Full-width navbar
- Bootstrap-style nav
- Generic cards without personality
- Template feel without brand character
- "Reasonable alternative" instead of prototype fidelity

**For Phase 2.1:**
- **Target:** Proben MVP 6 visual direction
- **NOT acceptable:** Generic "clean SaaS" look
- **Required:** Premium editorial pill design

---

### 5. Visual Similarity is Not Optional

**For Phase 2.1, the target is Proben MVP 6 visual direction, not a "reasonable alternative."**

**Similarity Requirements:**
- Header structure must match prototype (rounded pill, not full-width)
- Typography must match prototype (font, size, weight)
- Colors must match prototype (exact values or equivalent visual impression)
- Spacing must match prototype (layout, proportions)
- CTAs must match prototype (position, color, text)

**"Reasonable Alternative" is REJECTION grounds** unless explicitly approved in visual plan.

---

## P0 Blockers for UI Slices

### Universal P0 Blockers (All UI Work)

| Blocker | Description | Auto-REJECT If |
|---------|-------------|---------------|
| No screenshot evidence | Missing target/current/before screenshots | ✅ YES |
| No side-by-side report | Missing four-panel comparison | ✅ YES |
| No DOM blocker result | Missing deterministic tests | ✅ YES |
| Wrong route tested | Screenshot from different URL/page | ✅ YES |
| Agent score contradicts browser | Agent claims PASS, browser shows failure | ✅ YES |
| Human override rejected | Human rejected even if agent approved | ✅ YES |

### Slice A Specific P0 Blockers

| Blocker | Description | Expected | Auto-REJECT If |
|---------|-------------|----------|---------------|
| Rounded pill header | Pill-shaped container, not full-width | Rounded-full with border | ✅ YES if missing |
| "MEETING READINESS" | Subtitle below Proben logo | Visible in header | ✅ YES if missing |
| "Log in" button | Before CTA, right side | Visible in header | ✅ YES if missing |
| "Run readiness check" CTA | Green button, right side | Visible in header | ✅ YES if missing |
| Nav items correct | Sample report, How it works, Checks, Resources, Pricing | All present | ✅ YES if any missing |
| Forbidden nav items | "Home" or "Build Process" in header | NOT in header | ✅ YES if visible |
| Not generic navbar | Premium editorial design, not SaaS template | Pill-shaped | ✅ YES if full-width |

---

## Scoring Rubric

### 5.0 — Excellent Parity

**Criteria:**
- Very close to prototype direction
- All P0/P1 requirements pass
- Evidence complete (screenshots, DOM tests, report)
- No generic SaaS patterns
- Visual differences: Minor spacing/token variations only

**When to Use:**
- Target achieved for production use
- Human approval appropriate
- Can proceed to next slice

---

### 4.5–4.9 — Acceptable Parity

**Criteria:**
- Acceptable visual similarity to prototype
- Only minor spacing/token differences from target
- No P0 blockers
- Evidence complete
- Generic SaaS patterns absent

**When to Use:**
- Good enough for production
- Minor polish recommended for next iteration
- Human approval appropriate

---

### 3.5–4.4 — Promising But Not Acceptable

**Criteria:**
- Shows effort in right direction
- Some elements match prototype
- At least one P0 blocker OR significant deviation
- OR Evidence incomplete

**When to Use:**
- **NEEDS_REWORK** required
- Identify specific fixes needed
- Re-evaluate after fixes

---

### 2.0–3.4 — Major Structural Mismatch

**Criteria:**
- Significant deviation from prototype
- Multiple P0 blockers
- Generic SaaS appearance
- OR No evidence provided

**When to Use:**
- **REJECTED** or major rework required
- Return to visual planning stage
- Rebuild from approved plan

---

### 0–1.9 — Wrong or No Evidence

**Criteria:**
- Wrong page/state entirely
- Missing major elements
- No evidence provided
- Completely different from target

**When to Use:**
- **REJECTED** — Wrong implementation
- Start over with clear requirements
- Investigate how this happened

---

## Automatic Rejection Rules

### REJECTED Automatically If:

**Evidence Missing:**
- ❌ No screenshot evidence (score capped at 2.0/5)
- ❌ No side-by-side report
- ❌ No DOM blocker results

**P0 Blocker Failed:**
- ❌ Rounded pill header missing
- ❌ "MEETING READINESS" missing
- ❌ "Log in" missing
- ❌ "Run readiness check" CTA missing
- ❌ Required nav items missing
- ❌ Forbidden nav items present (Home, Build Process)
- ❌ Full-width generic navbar

**State Contradiction:**
- ❌ Agent score contradicts browser state
- ❌ Agent score contradicts screenshot evidence
- ❌ Human override rejected

**Generic Appearance:**
- ❌ Looks like generic SaaS template
- ❌ Lacks Proben MVP 6 visual character
- ❌ "Reasonable alternative" without approval

---

## Acceptance Workflow

### For Design Reviewers:

1. **Inspect in order:**
   - Target screenshot
   - Before screenshot
   - After screenshot
   - Diff/side-by-side report
   - DOM blocker results
   - Design rubric
   - Code (only after visual evidence)

2. **Checklist:**
   - [ ] Screenshot evidence present
   - [ ] Side-by-side comparison shows improvement
   - [ ] DOM blockers passed
   - [ ] No P0 blockers
   - [ ] Not generic SaaS appearance
   - [ ] Evidence complete

3. **Score:**
   - Apply scoring rubric (0-5)
   - Cap score if P0 blockers failed (max 2.9/5)
   - Cap score if no evidence (max 2.0/5)

4. **Verdict:**
   - ACCEPTED (≥ 4.5/5, evidence complete)
   - NEEDS_REWORK (3.5-4.4 or specific issues)
   - REJECTED (< 3.5 or blockers)

---

## Generic SaaS Rejection Rules

### Automatic Rejection Patterns

**Navbar Patterns:**
- ❌ Full-width navbar (Bootstrap-style, generic)
- ❌ Left-aligned logo with simple links
- ❌ Right-aligned CTA only
- ✅ Rounded pill container with logo + subtitle + nav + CTAs

**Card Patterns:**
- ❌ Generic white cards with shadow
- ❌ Bootstrap-style cards
- ❌ Template feel without personality
- ✅ Proben MVP 6 card style with specific elements

**CTA Patterns:**
- ❌ Generic blue/purple primary CTA
- ❌ "Get Started" without context
- ❌ Full-width hero CTA
- ✅ Green CTA in specific positions with specific text

**Typography Patterns:**
- ❌ System font only, no personality
- ❌ Generic sans-serif headings
- ❌ Template-like spacing
- ✅ Serif headlines with premium editorial feel

---

## Evidence Requirements

### Required Evidence for UI Acceptance

**Screenshots:**
- Target screenshot (approved prototype)
- Before screenshot (pre-implementation)
- After screenshot (post-implementation)
- Diff comparison (visual or HTML)

**Tests:**
- DOM blocker test results (required/forbidden elements)
- Layout assertions
- Responsive behavior

**Documentation:**
- Evidence manifest (JSON with metadata)
- HTML visual report
- Requirement checklist with PASS/FAIL status

**Human Verification:**
- Human reviewed visual evidence
- Human confirmed verdict
- Human approved release

---

## Related Documentation

- **[DESIGN_PARITY_RUBRIC.md](DESIGN_PARITY_RUBRIC.md)** — Detailed scoring rubric
- **[GENERIC_SAAS_REJECTION_RULES.md](GENERIC_SAAS_REJECTION_RULES.md)** — Generic pattern detection
- **[UI_SLICE_ACCEPTANCE_CHECKLIST.md](UI_SLICE_ACCEPTANCE_CHECKLIST.md)** - Slice acceptance checklist
- **[../qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md](../qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md)** - Evidence pipeline

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Authority:** Principal Design Reviewer + Human Approval
