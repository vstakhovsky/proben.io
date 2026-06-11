# Visual Review Template (Updated)

**Phase:** [PHASE_NUMBER]
**Slice:** [SLICE_LETTER] — [SLICE_NAME]
**Date:** [YYYY-MM-DD]
**Reviewer:** [REVIEWER_NAME]

---

## Evidence Manifest

**Phase:** [PHASE_NUMBER]
**Slice:** [SLICE_LETTER]
**Route:** [ROUTE_URL]
**Viewport:** [WIDTH,HEIGHT]
**Browser:** chromium
**Timestamp:** [TIMESTAMP]
**Git Branch:** [BRANCH_NAME]
**Git Commit:** [COMMIT_HASH]

**Screenshots:**
- Target: `[PATH_TO_TARGET]`
- Before: `[PATH_TO_BEFORE]`
- After: `[PATH_TO_AFTER]`
- Diff: `[PATH_TO_DIFF]`

**Report:** `[PATH_TO_HTML_REPORT]`

**Tests:**
- DOM Blockers: [PASSED/FAILED/NOT_RUN]
- Visual Assertions: [PASSED/FAILED/NOT_RUN]

**Verdict:** [PENDING/ACCEPTED/NEEDS_REWORK/REJECTED]

---

## Four-Way Screenshot Comparison

### BEFORE
**File:** `[BEFORE_PATH]`
**Description:** Pre-implementation state

[OBSERVATIONS - What does it show?]

### TARGET
**File:** `[TARGET_PATH]`
**Description:** Approved prototype

[OBSERVATIONS - What are we aiming for?]

### AFTER
**File:** `[AFTER_PATH]`
**Description:** Post-implementation state

[OBSERVATIONS - What does it show?]

### DIFF
**File:** `[DIFF_PATH]`
**Description:** Visual comparison

[OBSERVATIONS - What changed?]

**Comparison Assessment:**
- Does AFTER look closer to TARGET than BEFORE? [YES/NO]
- Are expected changes visible? [YES/NO]
- Are there unintended changes? [YES/NO]
- Overall visual progress: [NONE/MINOR/SIGNIFICATIVE/COMPLETE]

---

## DOM Blocker Results

**Test File:** `tests/[TEST_FILE].test.ts`
**Run Command:** `npm test -- [TEST_FILE]`
**Result:** [PASSED/FAILED/NOT_RUN]

### Required Elements (Must Pass)

| Element | Status | Notes |
|---------|--------|-------|
| "MEETING READINESS" subtitle | [PASS/FAIL] | [Notes] |
| "Run readiness check" CTA | [PASS/FAIL] | [Notes] |
| "Log in" button | [PASS/FAIL] | [Notes] |
| Navigation items correct | [PASS/FAIL] | [Notes] |

### Forbidden Elements (Must NOT Be Present)

| Element | Status | Notes |
|---------|--------|-------|
| "Home" in landing header | [PASS/FAIL] | PASS = NOT FOUND |
| "Build Process" in landing header | [PASS/FAIL] | PASS = NOT FOUND |

### Layout Assertions

| Assertion | Status | Notes |
|-----------|--------|-------|
| Pill-shaped header | [PASS/FAIL] | [Notes] |
| Header centered (not full-width) | [PASS/FAIL] | [Notes] |
| CTA has green styling | [PASS/FAIL] | [Notes] |

**DOM Blocker Verdict:** [PASSED/FAILED]
**If FAILED, Slice is automatically REJECTED.**

---

## Requirement Checklist

| Requirement | Expected | Evidence | Status | Blocker |
|-------------|----------|----------|--------|---------|
| Rounded pill header container | Rounded-full, not full-width navbar | Screenshots + DOM test | [PASS/FAIL/NEEDS_REVIEW] | YES |
| "Proben" logo text | "Proben" in serif font | Screenshots | [PASS/FAIL/NEEDS_REVIEW] | YES |
| "MEETING READINESS" subtitle | Visible below logo | Screenshots + DOM test | [PASS/FAIL/NEEDS_REVIEW] | YES |
| "Run readiness check" CTA | Green button, right side | Screenshots + DOM test | [PASS/FAIL/NEEDS_REVIEW] | YES |
| "Log in" button | Visible before CTA | Screenshots + DOM test | [PASS/FAIL/NEEDS_REVIEW] | YES |
| Navigation items correct | Sample report, How it works, Checks, Resources, Pricing | Screenshots + DOM test | [PASS/FAIL/NEEDS_REVIEW] | YES |
| Theme button | Sun/moon icon present | Screenshots | [PASS/FAIL/NEEDS_REVIEW] | NO |
| NOT generic SaaS navbar | Premium editorial pill design | Screenshots | [PASS/FAIL/NEEDS_REVIEW] | YES |
| "Home" NOT in header | Old generic nav absent | DOM blocker test | [PASS/FAIL/NEEDS_REVIEW] | YES |
| "Build Process" NOT in header | Portfolio nav absent | DOM blocker test | [PASS/FAIL/NEEDS_REVIEW] | YES |

---

## Visual Parity Scoring

| Dimension | Score (0-5) | Notes |
|-----------|-------------|-------|
| Header Structure | [SCORE] | [NOTES] |
| Logo/Subtitle | [SCORE] | [NOTES] |
| Navigation Items | [SCORE] | [NOTES] |
| CTA Hierarchy | [SCORE] | [NOTES] |
| Prototype Similarity | [SCORE] | [NOTES] |
| **Overall** | **[SCORE]/5** | [Acceptance threshold: ≥ 4.5/5] |

---

## Blocker Check

**Automatic Rejection If:**
- [ ] Missing before screenshot
- [ ] Missing target screenshot
- [ ] Missing after screenshot
- [ ] Missing evidence manifest
- [ ] Required header text missing (DOM test)
- [ ] Forbidden old nav visible (DOM test)
- [ ] No DOM blocker result
- [ ] No side-by-side visual evidence
- [ ] Agent verdict contradicts screenshot/browser

**Blockers Found:** [LIST or NONE]

---

## Verdict

**Agent Verdict:** [ACCEPTED/NEEDS_REWORK/REJECTED]

**Rationale:** [EXPLAIN_BASED_ON_VISUAL_EVIDENCE_AND_DOM_TESTS]

**Comparison Criteria:**
- ✅ ACCEPT if: AFTER looks closer to TARGET than BEFORE, DOM blockers passed, parity ≥ 4.5/5
- ⚠️ NEEDS_REWORK if: Some progress but doesn't fully match, parity 3.0-4.4/5
- ❌ REJECT if: AFTER identical to BEFORE (no change), DOM blockers failed, parity < 3.0/5

---

## Fresh Reviewer Notes

**Reviewer:** [NAME]
**Review Date:** [TIMESTAMP]

[OBSERVATIONS FROM FRESH REVIEW - Must check evidence in order: manifest → screenshots → DOM blockers → report → code → verdict]

---

## Design Reviewer Notes

**Reviewer:** [NAME]
**Review Date:** [TIMESTAMP]

[DESIGN QUALITY OBSERVATIONS]

---

## Human Review Override

**Human Verdict:** [ACCEPTED/NEEDS_REWORK/REJECTED]

**Reason:** [HUMAN_EXPLANATION]

**Required Fixes:** [HUMAN_IDENTIFIED_FIXES or NONE]

**Approved By:** [NAME]

**Date:** [YYYY-MM-DD]

---

## Test Results

```
✅/❌ npm run type-check — [RESULT]
✅/❌ npm test — [RESULT]
✅/❌ npm test -- slice-a-header-parity — [RESULT]
✅/❌ npm run build — [RESULT]
```

---

## Evidence Files

- HTML Report: `test-results/visual-review/[REPORT].html`
- Manifest: `test-results/visual-review/[SLICE]-manifest.json`
- Target Screenshot: `reference/screenshots/[TARGET]`
- Before Screenshot: `test-results/visual-review/[SLICE]-before.png`
- After Screenshot: `test-results/visual-review/[SLICE]-after.png`
- Diff Comparison: `test-results/visual-review/[SLICE]-diff-comparison.html`
- DOM Test: `tests/[TEST_FILE].test.ts`

---

## Next Steps

- [If ACCEPTED:] Document acceptance, update manifest, proceed to next slice
- [If NEEDS_REWORK:] Implement fixes, re-capture screenshots, re-generate report
- [If REJECTED:] Return to builder with blockers, start fresh if needed

---

**Source of Truth Policy:** If browser state or screenshot evidence contradicts agent score, the screenshot/browser state is the source of truth.

**Agent PASS Status:** Agent-generated PASS is advisory only. It is NOT release authority.

---

**Last Updated:** [YYYY-MM-DD]
**Template Version:** 2.0
