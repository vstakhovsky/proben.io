# Product Acceptance Evals

## Purpose

Evaluate product acceptance, PRD/RFC/ADR alignment, user value clarity, and requirement coverage. Measure product success beyond technical implementation.

## What Product Acceptance Evals Measure

### 1. PRD/RFC/ADR Alignment
- **Target:** Implementation matches approved source documents
- **Measurement:** Comparison against PRD, RFC, ADR documentation
- **Threshold:** >= 4.5/5 alignment for release

### 2. User Value Clarity
- **Target:** Value proposition clear to target user
- **Measurement:** User problem statement, solution clarity
- **Threshold:** >= 4.0/5 for release

### 3. Acceptance Criteria Coverage
- **Target:** All requirements met and tested
- **Measurement:** Requirement-to-test mapping, criteria completeness
- **Threshold:** 100% coverage for release

### 4. Product Clarity Score
- **Target:** User problem addressed, solution clear
- **Measurement:** Problem statement quality, solution specificity
- **Threshold:** >= 4.0/5 for release

### 5. Requirement-to-Test Mapping
- **Target:** Every requirement has corresponding test
- **Measurement:** Test coverage for acceptance criteria
- **Threshold:** 100% mapping for release

## Evaluation Metrics

### PRD/RFC/ADR Alignment Score (0-5)

**Definition:** Implementation matches approved source documents

**Measurement:** Compare implementation against:
- PRD (Product Requirements Document)
- RFC (Request for Comments)
- ADR (Architecture Decision Records)

**Scoring Criteria:**
- 5.0 = Perfect alignment, implementation exactly matches PRD/RFC/ADR
- 4.5 = Excellent alignment, minor deviations approved
- 4.0 = Good alignment, some gaps but acceptable
- 3.5 = Fair alignment, significant gaps
- 3.0 = Poor alignment, major deviations
- < 3.0 = Unacceptable, does not match source documents

**Formula:**
```
Alignment Score = (Feature Match × 0.4) +
                  (Architecture Match × 0.3) +
                  (Scope Match × 0.3)
```

**Threshold:** >= 4.5/5 for release

### User Value Clarity Score (0-5)

**Definition:** Value proposition clear to target user

**Scoring Criteria:**
- 5.0 = Crystal clear value, specific user problem, clear solution
- 4.5 = Very clear value, minor ambiguity
- 4.0 = Clear value, some ambiguity acceptable
- 3.5 = Somewhat clear, significant ambiguity
- 3.0 = Unclear value, confusing
- < 3.0 = No clear value

**Measurement:**
- User problem statement clarity
- Target user specificity
- Solution clarity
- Value proposition specificity
- Benefit clarity

**Threshold:** >= 4.0/5 for release

### Acceptance Criteria Coverage (0-1)

**Definition:** All requirements met and tested

**Measurement:**
```
Coverage = (Requirements Met) / (Total Requirements)
```

**Scoring:**
- 1.0 = 100% coverage (all requirements met)
- 0.9 = 90% coverage (minor gaps)
- 0.8 = 80% coverage (moderate gaps)
- 0.7 = 70% coverage (significant gaps)
- < 0.7 = Unacceptable

**Threshold:** 100% coverage required for release

### Product Clarity Score (0-5)

**Definition:** User problem addressed, solution clear

**Scoring Criteria:**
- 5.0 = Perfect clarity, problem specific, solution specific
- 4.5 = Excellent clarity, minor ambiguity
- 4.0 = Good clarity, some ambiguity acceptable
- 3.5 = Fair clarity, significant ambiguity
- 3.0 = Poor clarity, confusing
- < 3.0 = No clarity

**Threshold:** >= 4.0/5 for release

### Requirement-to-Test Mapping (0-1)

**Definition:** Every requirement has corresponding test

**Measurement:**
```
Mapping = (Requirements with Tests) / (Total Requirements)
```

**Scoring:**
- 1.0 = 100% mapping (all requirements have tests)
- 0.9 = 90% mapping (minor gaps)
- 0.8 = 80% mapping (moderate gaps)
- < 0.8 = Unacceptable

**Threshold:** 100% mapping required for release

## Thresholds

### Product Acceptance Thresholds

**Release Requirements:**
- **PRD/RFC/ADR Alignment:** >= 4.5/5
- **User Value Clarity:** >= 4.0/5
- **Acceptance Criteria Coverage:** 100%
- **Product Clarity Score:** >= 4.0/5
- **Requirement-to-Test Mapping:** 100%

**Non-Release Work:**
- **PRD/RFC/ADR Alignment:** >= 4.0/5
- **Acceptance Criteria Coverage:** >= 90%

**Automatic Rejection:**
- PRD/RFC/ADR Alignment < 4.0/5
- Acceptance Criteria Coverage < 90%
- Feature not in PRD (scope creep)
- Architecture violates ADR

## Evaluation Process

### 1. Document Review

**Check:**
- PRD exists and is complete
- RFC exists for architecture
- ADR exists for decisions
- Requirements clearly defined
- Acceptance criteria unambiguous

**If failed:** Return to product planning

### 2. Implementation Comparison

**Compare:**
- Features implemented vs PRD requirements
- Architecture vs RFC specifications
- Decisions vs ADR guidance
- Scope vs PRD boundaries

**Identify:**
- Scope creep (features not in PRD)
- Deviations from RFC
- ADR violations
- Missing requirements

### 3. User Value Assessment

**Evaluate:**
- User problem statement clarity
- Target user specificity
- Solution clarity
- Value proposition specificity
- Benefit clarity

**Score:** User Value Clarity (0-5)

### 4. Acceptance Criteria Verification

**Check:**
- All acceptance criteria defined
- All acceptance criteria testable
- All acceptance criteria met
- Tests exist for all criteria

**Score:** Acceptance Criteria Coverage (0-1)

### 5. Requirement-to-Test Mapping

**Verify:**
- Each requirement has corresponding test
- Test passes for requirement
- Test results documented
- Coverage complete

**Score:** Requirement-to-Test Mapping (0-1)

### 6. Product Acceptance Decision

**Combine Scores:**
- PRD/RFC/ADR Alignment (>= 4.5/5 required)
- User Value Clarity (>= 4.0/5 required)
- Acceptance Criteria Coverage (100% required)
- Product Clarity Score (>= 4.0/5 required)
- Requirement-to-Test Mapping (100% required)

**Verdict:**
- **ACCEPTED** — All thresholds met
- **NEEDS_REWORK** — Some thresholds not met, fixable
- **REJECTED** — Critical thresholds not met, significant gaps

## Output Format

```json
{
  "eval_id": "EV-PROD-{NUMBER}",
  "date": "YYYY-MM-DD",
  "phase": "X.Y",
  "slice": "A/B/C",
  "product_acceptance_metrics": {
    "prd_rfc_adr_alignment": 4.7,
    "user_value_clarity": 4.5,
    "acceptance_criteria_coverage": 1.0,
    "product_clarity_score": 4.3,
    "requirement_to_test_mapping": 1.0
  },
  "document_review": {
    "prd_exists": true,
    "prd_complete": true,
    "rfc_exists": true,
    "adr_exists": true,
    "requirements_defined": true,
    "acceptance_criteria_unambiguous": true
  },
  "implementation_comparison": {
    "features_match_prd": true,
    "architecture_matches_rfc": true,
    "decisions_follow_adr": true,
    "scope_within_prd": true,
    "scope_creep_detected": false,
    "missing_requirements": []
  },
  "verdict": "ACCEPTED",
  "required_improvements": [],
  "thresholds_met": true
}
```

## Eval Cases

### EV-PROD-001 — Technical ≠ Product Success

**Issue:** Technically working UI (tests passing, build successful) does not match PRD/RFC/ADR/design source of truth for visual quality.

**Product Acceptance Metrics:**
- PRD/RFC/ADR Alignment: 3.5/5 (design gaps)
- User Value Clarity: 4.0/5 (value clear but visual fails)
- Acceptance Criteria Coverage: 1.0 (all functional criteria met)
- Product Clarity Score: 4.0/5 (problem clear)
- Requirement-to-Test Mapping: 1.0 (all requirements tested)

**Document Review:**
- PRD exists: Yes
- PRD complete: Yes
- RFC exists: Yes
- ADR exists: Yes
- Requirements defined: Yes
- Acceptance criteria unambiguous: Yes

**Implementation Comparison:**
- Features match PRD: Yes (functionally)
- Architecture matches RFC: Yes
- Decisions follow ADR: Yes
- Scope within PRD: Yes
- **Scope creep detected:** No
- **Missing requirements:** Visual quality requirements not fully met

**Root Cause:** Green tests and passing build are necessary but not sufficient for product acceptance. Visual quality is part of product acceptance.

**Prevention Added:**
- Product acceptance gate (separate from technical tests)
- Visual quality gates (evidence-based review)
- Prototype parity requirements
- Evidence-based acceptance process

**Learning:** Technical success (tests pass, build works) ≠ product acceptance (visual quality, user value, PRD alignment).

## Running Product Acceptance Evals

### Automated Evaluation

```bash
node scripts/run-quality-evals.js \
  --category "product-acceptance" \
  --phase "2.1" \
  --slice "A"
```

### Manual Evaluation

Use product acceptance checklist:
1. Review PRD/RFC/ADR completeness
2. Compare implementation against documents
3. Evaluate user value clarity
4. Verify acceptance criteria coverage
5. Check requirement-to-test mapping

## Prevention and Regression

### For Each Product Acceptance Eval Case

1. **Update PRD** — Add missing requirements or clarity
2. **Create RFC** — For architecture decisions
3. **Create ADR** — For significant decisions
4. **Add Gate** — Add product acceptance gate
5. **Add Test** — Add test for requirement

### Regression Tests

**For EV-PROD-001:**
- Test: Product acceptance gate (visual quality check)
- Test: PRD alignment verification
- Test: Evidence completeness check

## Product Acceptance by Phase

### Phase 1 (MVP)
- **PRD Alignment Required:** Yes
- **RFC Required:** For architecture
- **ADR Required:** For decisions
- **Visual Quality Required:** Yes (evidence-based)
- **User Value Clarity:** >= 4.0/5

### Phase 2.1 (Design Parity)
- **PRD Alignment Required:** Yes
- **Visual Quality Required:** Yes (>= 4.5/5 prototype parity)
- **Evidence Completeness:** 100%
- **Generic SaaS Detection:** Zero patterns

## Related Documentation

- **[EVALS.md](EVALS.md)** — Master eval system documentation
- **[EVAL_REGISTRY.md](EVAL_REGISTRY.md)** — Registry of all eval cases
- **[EVAL_CASE_TEMPLATE.md](EVAL_CASE_TEMPLATE.md)** — Template for eval cases
- **[FAILURE_MODE_TAXONOMY.md](FAILURE_MODE_TAXONOMY.md)** — Complete failure taxonomy
- **[../PRD.md](../PRD.md)** — Product Requirements Document
- **[../RFC-0001-architecture.md](../RFC-0001-architecture.md)** — Architecture RFC
- **[../ADR/](../ADR/)** — Architecture Decision Records

## Data Files

- **`evals/product-acceptance-cases.jsonl`** — Product acceptance eval cases

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Total Product Acceptance Eval Cases:** 1
**Cases Closed:** 1 (100%)
**Recurrences:** 0
