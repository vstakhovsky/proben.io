# Design Parity Rubric

## Purpose

Detailed scoring rubric for evaluating visual parity between implementation and approved prototype. Ensures consistent, evidence-based evaluation.

## Scoring Scale

### 5.0 — Excellent Parity (Production Ready)

**Visual Criteria:**

| Dimension | Weight | Requirement | Score |
|-----------|--------|------------|-------|
| **Header Structure** | 20% | Rounded pill container, not full-width, correct spacing | 5/5 |
| **Logo/Subtitle** | 15% | "Proben" + "MEETING READINESS" subtitle visible | 5/5 |
| **Navigation Items** | 15% | All required items present, correct order | 5/5 |
| **CTA Hierarchy** | 15% | Green CTA in correct position with correct text | 5/5 |
| **Prototype Similarity** | 20% | Overall visual match to prototype direction | 5/5 |
| **Evidence Quality** | 15% | Complete screenshots, DOM tests, report | 5/5 |

**Success Criteria:**
- ✅ All dimensions score 5/5
- ✅ No P0 blockers
- ✅ Evidence complete (screenshots, DOM tests, report)
- ✅ Not generic SaaS appearance
- ✅ Visual differences: Minor spacing/token only

**Verdict:** ✅ ACCEPTED — Ready for production

---

### 4.5–4.9 — Acceptable Parity (Production Ready)

**Visual Criteria:**

| Dimension | Weight | Requirement | Score |
|-----------|--------|------------|-------|
| **Header Structure** | 20% | Rounded pill container present | 4-5/5 |
| **Logo/Subtitle** | 15% | Logo and subtitle visible | 4-5/5 |
| **Navigation Items** | 15% | All items present, minor spacing okay | 4-5/5 |
| **CTA Hierarchy** | 15% | CTA present and positioned correctly | 4-5/5 |
| **Prototype Similarity** | 20% | Close to prototype, minor differences | 4-5/5 |
| **Evidence Quality** | 15% | Evidence complete | 4-5/5 |

**Success Criteria:**
- ✅ Weighted average ≥ 4.5/5
- ✅ No P0 blockers
- ✅ Evidence complete
- ✅ Generic SaaS patterns absent
- ✅ Visual differences: Minor spacing/token only

**Verdict:** ✅ ACCEPTED — Ready for production

---

### 3.5–4.4 — Promising But Not Acceptable

**Visual Criteria:**

| Dimension | Weight | Requirement | Score |
|-----------|--------|------------|-------|
| **Header Structure** | 20% | Pill shape present but spacing/structure off | 3-4/5 |
| **Logo/Subtitle** | 15% | Present but styling/position off | 3-4/5 |
| **Navigation Items** | 15% | Most items present, some missing/wrong | 3-4/5 |
| **CTA Hierarchy** | 15% | CTA present but styling/position off | 3-4/5 |
| **Prototype Similarity** | 20% | Some resemblance but deviates | 3-4/5 |
| **Evidence Quality** | 15% | Evidence may be incomplete | 3-4/5 |

**Success Criteria:**
- Weighted average 3.5-4.4/5
- ❌ OR: P0 blocker present (auto-capped to 2.9/5)
- ❌ OR: Evidence incomplete
- ✅ Shows effort in right direction

**Verdict:** ⚠️ NEEDS_REWORK — Specific fixes required

---

### 2.0–3.4 — Major Structural Mismatch

**Visual Criteria:**

| Dimension | Weight | Requirement | Score |
|-----------|--------|------------|-------|
| **Header Structure** | 20% | Wrong structure (full-width, no pill) | 0-2/5 |
| **Logo/Subtitle** | 15% | Missing or wrong styling | 0-2/5 |
| **Navigation Items** | 15% | Missing or wrong items | 0-2/5 |
| **CTA Hierarchy** | 15% | Missing or wrong CTA | 0-2/5 |
| **Prototype Similarity** | 20% | Generic or completely different | 0-2/5 |
| **Evidence Quality** | 15% | Missing or incomplete | 0-2/5 |

**Success Criteria:**
- Weighted average < 3.5/5
- ❌ OR: Multiple P0 blockers
- ❌ OR: Generic SaaS appearance
- ❌ OR: Evidence missing

**Verdict:** ❌ REJECTED — Major rework required

---

### 0–1.9 — Wrong or No Evidence

**Visual Criteria:**

All dimensions score 0-1.9/5 OR no evidence provided.

**Typical Issues:**
- Wrong page/state entirely
- Major elements missing
- No evidence at all
- Completely different from target

**Verdict:** ❌ REJECTED — Start over with clear requirements

---

## Dimension Scoring Guides

### Header Structure (20%)

**5/5:**
- Rounded pill container clearly visible
- Proper spacing and proportions
- Not full-width generic navbar

**4/5:**
- Pill shape present but spacing/proportions slightly off

**3/5:**
- Pill shape present but structure significantly off

**2/5:**
- Wrong structure (e.g., full-width navbar)

**1/5:**
- Completely wrong structure

**0/5:**
- No header or completely missing

---

### Logo/Subtitle (15%)

**5/5:**
- "Proben" logo clearly visible
- "MEETING READINESS" subtitle present below
- Correct typography and positioning

**4/5:**
- Both present but minor styling/position off

**3/5:**
- Logo present but subtitle missing or wrong
- OR: Both present but styling significantly off

**2/5:**
- Logo missing or wrong
- Subtitle missing or wrong

**1/5:**
- Both elements wrong or missing

**0/5:**
- Neither element present

---

### Navigation Items (15%)

**5/5:**
- All required items present: Sample report, How it works, Checks, Resources, Pricing
- Correct order
- Correct styling

**4/5:**
- All items present, minor spacing/ordering issues

**3/5:**
- Most items present, 1-2 missing or wrong

**2/5:**
- Many items missing or wrong

**1/5:**
- Few correct items, many missing or wrong

**0/5:**
- No navigation or completely wrong

---

### CTA Hierarchy (15%)

**5/5:**
- "Run readiness check" CTA in header (green, right side)
- Correct text and styling
- Proper position

**4/5:**
- CTA present and styled green, minor position/styling off

**3/5:**
- CTA present but wrong color or position
- OR: Missing secondary CTAs

**2/5:**
- CTA missing or wrong
- OR: Wrong text

**1/5:**
- CTA completely wrong

**0/5:**
- No CTA at all

---

### Prototype Similarity (20%)

**5/5:**
- Virtually identical to prototype
- Premium editorial feel achieved
- Brand character strong

**4/5:**
- Very close, minor differences in spacing/tokens
- Premium editorial feel maintained

**3/5:**
- Somewhat resembles prototype but has noticeable deviations
- Generic elements mixed in

**2/5:**
- Barely resembles prototype or generic appearance
- Brand character weak

**1/5:**
- Looks nothing like prototype
- Generic SaaS template

**0/5:**
- Completely different or wrong

---

### Evidence Quality (15%)

**5/5:**
- Complete four-panel screenshot (BEFORE/TARGET/AFTER/DIFF)
- DOM blocker tests passed
- Evidence manifest complete
- HTML report generated
- All evidence linked

**4/5:**
- All evidence present but minor issues
- One element missing or incomplete

**3/5:**
- Most evidence present, some missing or incomplete
- Screenshot exists but no DOM test

**2/5:**
- Screenshot only, no DOM tests
- OR: DOM tests only, no screenshot

**1/5:**
- Minimal evidence, multiple gaps

**0/5:**
- No evidence provided

---

## Score Calculation

**Formula:**
```
Final Score = (Header × 0.20) + (Logo × 0.15) + (Nav × 0.15) + (CTA × 0.15) + (Similarity × 0.20) + (Evidence × 0.15)
```

**Score Caps:**
- Any P0 blocker → Maximum 2.9/5 (regardless of calculated score)
- No screenshot evidence → Maximum 2.0/5
- No DOM blocker results → Cannot be ACCEPTED

---

## Acceptance Thresholds

### Production Ready
- Weighted average ≥ 4.5/5
- No P0 blockers
- Evidence complete
- Human approval

### Needs Rework
- Weighted average 3.5-4.4/5
- OR Evidence incomplete
- Specific fixes identified

### Rejected
- Weighted average < 3.5/5
- OR Multiple P0 blockers
- OR Generic SaaS appearance
- OR No evidence

---

## Related Documentation

- **[DESIGN_ACCEPTANCE_POLICY.md](DESIGN_ACCEPTANCE_POLICY.md)** — Acceptance policy
- **[GENERIC_SAAS_REJECTION_RULES.md](GENERIC_SAAS_REJECTION_RULES.md)** — Generic pattern detection
- **[UI_SLICE_ACCEPTANCE_CHECKLIST.md](UI_SLICE_ACCEPTANCE_CHECKLIST.md)** - Slice checklist
- **[../qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md](../qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md)** - Evidence pipeline

---

**Last Updated:** 2026-06-10
**Version:** 1.0
