# Visual Quality Evals

## Purpose

Evaluate visual quality and prototype parity for UI implementations. Measure implementation fidelity against approved prototypes, detect generic SaaS patterns, and ensure evidence-based acceptance.

## What Visual Quality Evals Measure

### 1. Prototype Parity
- **Target:** Implementation matches approved prototype (>= 4.5/5)
- **Measurement:** Visual comparison scoring across dimensions
- **Threshold:** >= 4.5/5 for acceptance

### 2. Before/Target/After Comparison Quality
- **Target:** AFTER looks closer to TARGET than BEFORE
- **Measurement:** Three-way screenshot comparison
- **Threshold:** Clear progression toward target

### 3. Visual Blocker Detection
- **Target:** No P0/P1 blockers present
- **Measurement:** DOM blocker tests
- **Threshold:** 100% of P0 blockers must pass

### 4. Generic SaaS Detection
- **Target:** No generic template patterns
- **Measurement:** Generic pattern detection
- **Threshold:** Zero generic patterns for acceptance

### 5. Typography/Layout/CTA Hierarchy
- **Target:** Design dimensions meet quality standards
- **Measurement:** Dimensional scoring (header, logo, nav, CTA, similarity, evidence)
- **Threshold:** Weighted average >= 4.5/5

### 6. Screenshot Evidence Completeness
- **Target:** All required evidence present
- **Measurement:** Evidence manifest validation
- **Threshold:** 100% completeness required

## Evaluation Metrics

### Visual Parity Score (0-5)

**Scoring Dimensions:**
- Header Structure (20% weight)
- Logo/Subtitle (15% weight)
- Navigation Items (15% weight)
- CTA Hierarchy (15% weight)
- Prototype Similarity (20% weight)
- Evidence Quality (15% weight)

**Formula:**
```
Final Score = (Header × 0.20) + (Logo × 0.15) + (Nav × 0.15) +
              (CTA × 0.15) + (Similarity × 0.20) + (Evidence × 0.15)
```

**Score Caps:**
- Any P0 blocker fails → Maximum 2.9/5
- No screenshot evidence → Maximum 2.0/5
- No DOM blocker results → Cannot be ACCEPTED

### Evidence Completeness Score (0-1)

**Required Evidence:**
- Target screenshot (approved prototype)
- Before screenshot (pre-implementation)
- After screenshot (post-implementation)
- Diff comparison (visual or HTML)
- Evidence manifest (JSON metadata)
- DOM blocker test results
- HTML visual report

**Scoring:**
- 1.0 = All evidence present and valid
- 0.8 = Minor gaps (one element missing but not critical)
- 0.5 = Major gaps (multiple elements missing)
- 0.0 = No evidence or critically incomplete

### DOM Blocker Pass Rate (0-1)

**P0 Blockers (Slice A):**
- Rounded pill header (not full-width navbar)
- "MEETING READINESS" subtitle
- "Log in" button
- "Run readiness check" CTA
- Required nav items: Sample report, How it works, Checks, Resources, Pricing
- Forbidden nav items: Home, Build Process NOT present

**Scoring:**
- 1.0 = All P0 blockers pass
- 0.0 = Any P0 blocker fails (automatic rejection)

### Generic SaaS Detection Rate (0-1)

**Generic Patterns Detected:**
- Full-width navbar (Bootstrap-style)
- Generic white cards with shadow
- Generic blue/purple CTA
- "Get Started" without context
- System fonts only, no personality
- Template-like spacing

**Scoring:**
- 1.0 = No generic patterns detected
- 0.0 = Any generic pattern detected (needs rework or rejection)

### Rework Loop Count (visual issues)

**Measurement:** Number of rework iterations due to visual issues

**Target:** 0 rework loops (first implementation accepted)

**Tracking:**
- Count each NEEDS_REWORK due to visual quality
- Count each REJECTED due to visual mismatch
- Track visual issues by category (header, typography, layout, etc.)

## Thresholds

### Acceptance Thresholds

**Visual Parity Score:**
- **>= 4.5/5:** ACCEPTED — Matches prototype
- **3.5-4.4/5:** NEEDS_REWORK — Minor visual gaps
- **< 3.5/5:** REJECTED — Does not match prototype

**Evidence Completeness:**
- **100%:** Required for UI acceptance
- **< 100%:** Cannot be ACCEPTED

**DOM Blocker Pass Rate:**
- **100% (all P0 pass):** Required for UI acceptance
- **< 100% (any P0 fail):** Automatic REJECTED

**Generic SaaS Detection:**
- **0 patterns:** Required for UI acceptance
- **> 0 patterns:** NEEDS_REWORK or REJECTED

### Rejection Thresholds (Automatic)

**REJECTED automatically if ANY:**
- Visual parity < 3.5/5
- Any P0 blocker fails
- Evidence completeness < 100%
- Generic SaaS patterns detected
- No DOM blocker results

## Evaluation Process

### 1. Evidence Collection

**Required:**
- Target screenshot from `reference/screenshots/proben-mvp-6/`
- Before screenshot (pre-implementation)
- After screenshot (post-implementation)
- Diff comparison HTML
- Evidence manifest JSON
- DOM blocker test results
- HTML visual report

### 2. Dimensional Scoring

**For each dimension:**
1. Compare against target prototype
2. Identify specific matches and mismatches
3. Score 0-5 based on fidelity
4. Apply weight to dimension score
5. Calculate weighted average

### 3. Blocker Detection

**P0 Blocker Check:**
- Run DOM blocker tests
- Check for required elements
- Check for forbidden elements
- Verify layout assertions

**P1 Blocker Check:**
- Check for high-priority issues
- Verify responsive behavior
- Check accessibility

### 4. Generic Pattern Detection

**Check for:**
- Generic navbar patterns
- Generic card patterns
- Generic CTA patterns
- Generic typography patterns
- Generic color schemes
- Template layouts

### 5. Evidence Validation

**Verify:**
- All screenshots present
- Timestamps current
- Routes correct
- Test results valid
- Manifest complete

### 6. Score Calculation

**Apply in order:**
1. Calculate dimensional scores
2. Calculate weighted average
3. Apply P0 blocker cap (if needed)
4. Apply evidence cap (if needed)
5. Determine final verdict

## Output Format

```json
{
  "eval_id": "EV-VIS-{NUMBER}",
  "date": "YYYY-MM-DD",
  "phase": "X.Y",
  "slice": "A/B/C",
  "visual_parity_score": 4.7,
  "dimension_scores": {
    "header_structure": 4.5,
    "logo_subtitle": 5.0,
    "navigation_items": 4.5,
    "cta_hierarchy": 5.0,
    "prototype_similarity": 4.5,
    "evidence_quality": 5.0
  },
  "evidence_completeness": 1.0,
  "dom_blocker_pass_rate": 1.0,
  "generic_saaS_detection": 0,
  "p0_blockers": [],
  "p1_blockers": [],
  "generic_patterns_detected": [],
  "verdict": "ACCEPTED",
  "required_fixes": [],
  "thresholds_met": true
}
```

## Eval Cases

### EV-VIS-001 — Generic Header Accepted

**Visual Parity Score:** 2.5/5

**Dimension Scores:**
- Header Structure: 1/5 (full-width navbar, not pill)
- Logo/Subtitle: 2/5 (MEETING READINESS missing)
- Navigation Items: 2/5 (wrong items, forbidden items present)
- CTA Hierarchy: 2/5 (CTA missing)
- Prototype Similarity: 2/5 (generic appearance)
- Evidence Quality: 3/5 (evidence incomplete)

**Blockers:**
- P0: Rounded pill header missing
- P0: MEETING READINESS missing
- P0: Log in missing
- P0: CTA missing
- P0: Required nav items missing
- P0: Forbidden nav items present (Home, Build Process)

**Generic Patterns Detected:**
- Full-width navbar
- Generic card styling
- Template-like spacing

**Evidence Completeness:** 0.6 (missing some evidence)

**Verdict:** REJECTED

**Prevention Added:**
- DOM blocker tests for P0 elements
- Generic SaaS pattern detection
- Evidence requirements strengthened

### EV-VIS-002 — Text-Only UI Review

**Visual Parity Score:** Not calculated (no visual comparison)

**Issue:** UI review relied on text checklist without side-by-side screenshot evidence.

**Evidence Completeness:** 0.3 (no screenshots)

**Verdict:** REJECTED (lack of evidence)

**Prevention Added:**
- Evidence-first review protocol
- Screenshot requirements for UI acceptance
- Three-way comparison required

## Running Visual Quality Evals

### Automated Evaluation

```bash
node scripts/run-quality-evals.js \
  --category "visual-quality" \
  --phase "2.1" \
  --slice "A"
```

### Manual Evaluation

Use `docs/design/UI_SLICE_ACCEPTANCE_CHECKLIST.md` to manually evaluate visual quality.

## Prevention and Regression

### For Each Visual Quality Eval Case

1. **Add DOM Blocker** — Create deterministic test for issue
2. **Add Generic Pattern** — Update generic pattern detection
3. **Update Design Instructions** — Strengthen agent design guidance
4. **Update Evidence Requirements** — Add missing evidence requirement
5. **Create Regression Test** — Add test to prevent recurrence

### Regression Tests

**For EV-VIS-001:**
- Test: `e2e/slice-a-header-parity.spec.ts`
- Tests: P0 blockers (required/forbidden elements)

**For EV-VIS-002:**
- Test: Evidence manifest validation
- Test: Screenshot presence check

## Related Documentation

- **[EVALS.md](EVALS.md)** — Master eval system documentation
- **[EVAL_REGISTRY.md](EVAL_REGISTRY.md)** — Registry of all eval cases
- **[EVAL_CASE_TEMPLATE.md](EVAL_CASE_TEMPLATE.md)** — Template for eval cases
- **[FAILURE_MODE_TAXONOMY.md](FAILURE_MODE_TAXONOMY.md)** — Complete failure taxonomy
- **[../design/DESIGN_PARITY_RUBRIC.md](../design/DESIGN_PARITY_RUBRIC.md)** — Detailed scoring rubric
- **[../design/GENERIC_SAAS_REJECTION_RULES.md](../design/GENERIC_SAAS_REJECTION_RULES.md)** — Generic pattern detection

## Data Files

- **`evals/visual-quality-cases.jsonl`** — Visual quality eval cases

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Total Visual Quality Eval Cases:** 2
**Cases Closed:** 2 (100%)
**Recurrences:** 0
