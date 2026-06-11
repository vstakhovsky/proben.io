# UI Slice Acceptance Checklist

## Purpose

Comprehensive checklist for evaluating UI implementation slices. Ensures consistent, evidence-based evaluation and prevents false acceptance from green tests or text-only review.

## Core Principles

1. **Visual acceptance is evidence-based** — No UI slice can be accepted from text description alone
2. **Screenshot/browser state is source of truth** — If agent verdict conflicts with browser/screenshot, browser/screenshot wins
3. **P0 blocker caps score** — If any P0 visual blocker fails, maximum score is 2.9/5
4. **Generic SaaS output is rejection** — If implementation looks like generic template, status is NEEDS_REWORK or REJECTED
5. **Visual similarity is not optional** — For Phase 2.1, target is Proben MVP 6 visual direction

---

## Pre-Review Checklist

### Evidence Requirements (All Required)

- [ ] **Target screenshot** — Approved prototype from `reference/screenshots/proben-mvp-6/`
- [ ] **Before screenshot** — Pre-implementation state
- [ ] **After screenshot** — Post-implementation state  
- [ ] **Diff comparison** — Visual comparison HTML
- [ ] **Evidence manifest** — JSON metadata file
- [ ] **DOM blocker test results** — Required/forbidden element tests
- [ ] **HTML visual report** — Four-panel comparison with checklist
- [ ] **Route tested** — Correct URL verified
- [ ] **Screenshot timestamp** — Evidence is current, not stale

**If any evidence is missing:** Maximum score 2.0/5, cannot be ACCEPTED

---

## P0 Blocker Check (Slice A)

### Required Elements (Auto-REJECT if missing)

- [ ] **Rounded pill header** — Pill-shaped container, not full-width navbar
- [ ] **"MEETING READINESS" subtitle** — Visible below Proben logo
- [ ] **"Log in" button** — Present in header
- [ ] **"Run readiness check" CTA** — Green button in header
- [ ] **Required nav items** — All present: Sample report, How it works, Checks, Resources, Pricing
- [ ] **Proper spacing** — Header has margin, not flush to edges

### Forbidden Elements (Auto-REJECT if present)

- [ ] **"Home" nav item** — Old generic nav indicator
- [ ] **"Build Process" nav item** — Portfolio nav in wrong place
- [ ] **Full-width navbar** — Generic SaaS pattern
- [ ] **Generic CTA text** — "Get Started" without context

**If any P0 blocker fails:** Maximum score 2.9/5, automatic REJECTED

---

## P1 Blocker Check (Slice A)

### High-Priority Issues

- [ ] **Green CTA color** — Brand green (#10B981), not blue/purple
- [ ] **CTA text** — "Run readiness check", not generic
- [ ] **Typography hierarchy** — Serif headlines, sans body
- [ ] **Premium editorial feel** — Not generic SaaS template
- [ ] **Responsive behavior** — Works on mobile viewport
- [ ] **Test IDs preserved** — data-testid attributes maintained

**If P1 blocker fails:** Score impact, may NEEDS_REWORK

---

## Visual Quality Assessment

### Design Dimensions

#### Header Structure (20% weight)

- [ ] Pill-shaped container (rounded-full)
- [ ] Not full-width navbar
- [ ] Proper spacing and margins
- [ ] Border and background styling
- [ ] Sticky positioning if applicable

**Score:** ___/5

#### Logo/Subtitle (15% weight)

- [ ] "Proben" logo visible
- [ ] "MEETING READINESS" subtitle present
- [ ] Correct typography (font, size, weight)
- [ ] Proper positioning (subtitle below logo)
- [ ] Vertical alignment

**Score:** ___/5

#### Navigation Items (15% weight)

- [ ] All required items present
- [ ] Correct order: Sample report, How it works, Checks, Resources, Pricing
- [ ] Proper styling (color, size, spacing)
- [ ] Dividers between items if applicable
- [ ] Hover states if applicable

**Score:** ___/5

#### CTA Hierarchy (15% weight)

- [ ] "Run readiness check" CTA present
- [ ] Green color (#10B981)
- [ ] Correct text content
- [ ] Proper positioning (right side)
- [ ] Proper sizing and padding

**Score:** ___/5

#### Prototype Similarity (20% weight)

- [ ] Overall layout matches prototype
- [ ] Spacing and proportions similar
- [ ] Typography matches prototype feel
- [ ] Colors match prototype palette
- [ ] Premium editorial character achieved

**Score:** ___/5

#### Evidence Quality (15% weight)

- [ ] All screenshots present (BEFORE/TARGET/AFTER)
- [ ] DOM blocker tests passed
- [ ] Evidence manifest complete
- [ ] HTML report generated
- [ ] All evidence linked and accessible

**Score:** ___/5

---

## Score Calculation

### Weighted Average

```
Final Score = (Header × 0.20) + (Logo × 0.15) + (Nav × 0.15) + 
              (CTA × 0.15) + (Similarity × 0.20) + (Evidence × 0.15)
```

**Calculated Score:** ___/5

### Score Caps

Apply caps in order:

1. **P0 Blocker Cap:** If any P0 blocker failed → Maximum 2.9/5
2. **Evidence Cap:** If no screenshot evidence → Maximum 2.0/5
3. **DOM Blocker Cap:** If no DOM blocker results → Cannot be ACCEPTED

**Final Score after caps:** ___/5

---

## Generic SaaS Detection

### Navbar Patterns

- [ ] ❌ Full-width navbar (Bootstrap-style)
- [ ] ❌ Left-aligned logo with simple links
- [ ] ❌ Right-aligned CTA only
- [ ] ✅ Rounded pill container with proper structure

### Card Patterns

- [ ] ❌ Generic white cards with shadow
- [ ] ❌ Bootstrap/Material style
- [ ] ✅ Proben MVP 6 card style

### CTA Patterns

- [ ] ❌ Generic blue/purple primary CTA
- [ ] ❌ "Get Started" without context
- [ ] ✅ Green CTA with specific text

### Typography Patterns

- [ ] ❌ System font only, no personality
- [ ] ❌ Generic sans-serif headings
- [ ] ✅ Serif headlines with premium editorial feel

**Generic SaaS detected?** YES/NO

**If YES:** Verdict = NEEDS_REWORK or REJECTED

---

## Verdict Determination

### ACCEPTED (≥ 4.5/5)

- [ ] Weighted average ≥ 4.5/5
- [ ] No P0 blockers
- [ ] Evidence complete
- [ ] Generic SaaS patterns absent
- [ ] Human approval received

### NEEDS_REWORK (3.5–4.4/5 or specific issues)

- [ ] Weighted average 3.5–4.4/5
- [ ] OR Evidence incomplete
- [ ] OR Specific issues identified
- [ ] Shows effort in right direction

### REJECTED (< 3.5/5 or blockers)

- [ ] Weighted average < 3.5/5
- [ ] OR Multiple P0 blockers
- [ ] OR Generic SaaS appearance
- [ ] OR No evidence provided

**Verdict:** ___ ACCEPTED / NEEDS_REWORK / REJECTED

---

## Required Fixes (if NEEDS_REWORK or REJECTED)

List specific fixes required:

1. ____________________________________________________________
2. ____________________________________________________________
3. ____________________________________________________________
4. ____________________________________________________________
5. ____________________________________________________________

---

## Reviewer Inspection Order

**Principal Design Reviewer must inspect in this order:**

1. ✅ Target screenshot — Understand what we're building toward
2. ✅ Before screenshot — See starting state
3. ✅ After screenshot — See what was actually implemented
4. ✅ Diff/side-by-side report — Compare before vs after
5. ✅ DOM blocker results — Verify deterministic tests
6. ✅ Design rubric — Apply scoring framework
7. ✅ Code (only after visual evidence) — Check implementation details

**Do NOT inspect code first** — Code review without visual evidence leads to false confidence.

---

## Evidence Quality Checklist

### Screenshot Quality

- [ ] High resolution, not blurry
- [ ] Full viewport visible
- [ ] Correct route displayed
- [ ] Current timestamp (not stale)
- [ ] All UI elements visible

### DOM Test Quality

- [ ] All required elements tested
- [ ] All forbidden elements tested
- [ ] Tests passing (green checkmark)
- [ ] Test output accessible
- [ ] Test IDs preserved in code

### Report Quality

- [ ] Four-panel comparison complete
- [ ] Requirement checklist filled
- [ ] Scores documented
- [ ] Verdict documented
- [ ] Evidence linked

---

## Automatic Rejection Triggers

**REJECTED automatically if ANY:**

### Evidence Missing
- ❌ No screenshot evidence (score capped at 2.0/5)
- ❌ No side-by-side report
- ❌ No DOM blocker results

### P0 Blocker Failed
- ❌ Rounded pill header missing
- ❌ "MEETING READINESS" missing
- ❌ "Log in" missing
- ❌ "Run readiness check" CTA missing
- ❌ Required nav items missing
- ❌ Forbidden nav items present (Home, Build Process)
- ❌ Full-width generic navbar

### State Contradiction
- ❌ Agent score contradicts browser state
- ❌ Agent score contradicts screenshot evidence
- ❌ Human override rejected

### Generic Appearance
- ❌ Looks like generic SaaS template
- ❌ Lacks Proben MVP 6 visual character
- ❌ "Reasonable alternative" without approval

---

## Source of Truth Hierarchy

**When in conflict:**

1. **Browser state** — What actually renders
2. **Screenshot evidence** — Captured visual state
3. **DOM tests** — Deterministic verification
4. **Agent verdict** — Advisory input only
5. **Text claims** — Least reliable

**Rule:** Screenshot/browser state > agent score

---

## Human Override Section

**Human reviewer:**

- [ ] Reviewed visual evidence
- [ ] Compared against target prototype
- [ ] Verified DOM blocker results
- [ ] Confirmed verdict or provided override

**Human Override:** ACCEPTED / NEEDS_REWORK / REJECTED

**Override Reason (if different from agent):**
_______________________________________________________________

_______________________________________________________________

_______________________________________________________________

---

## Next Steps

### If ACCEPTED:
- [ ] Forward to release gates
- [ ] Update build learning log (if applicable)
- [ ] Proceed to next slice

### If NEEDS_REWORK:
- [ ] Return to builder with specific fixes
- [ ] Update visual plan if needed
- [ ] Re-evaluate after fixes

### If REJECTED:
- [ ] Return to builder with blockers
- [ ] Consider returning to visual planning stage
- [ ] Investigate root cause
- [ ] Update build learning log

---

## Related Documentation

- **[DESIGN_ACCEPTANCE_POLICY.md](DESIGN_ACCEPTANCE_POLICY.md)** — Acceptance policy and rules
- **[DESIGN_PARITY_RUBRIC.md](DESIGN_PARITY_RUBRIC.md)** — Detailed scoring rubric
- **[GENERIC_SAAS_REJECTION_RULES.md](GENERIC_SAAS_REJECTION_RULES.md)** — Generic pattern detection
- **[../qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md](../qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md)** — Evidence pipeline

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Authority:** Principal Design Reviewer + Human Approval
