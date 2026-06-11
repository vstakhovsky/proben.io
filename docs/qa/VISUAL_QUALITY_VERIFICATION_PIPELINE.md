# Visual Quality Verification Pipeline

## Purpose

The Visual Quality Verification Pipeline provides strict, evidence-based validation for UI implementation slices. It prevents false acceptance where agents claim high visual parity while the browser shows wrong or old UI.

## Problem Statement

**Previous Issue:** Agents could mark slices as ACCEPTED with 5.0/5 scores while the browser still showed the old generic header. Text-only review and single screenshots were insufficient to prove change.

**Solution:** Three-way screenshot comparison + DOM blockers + evidence manifest + deterministic tests.

## Core Principles

1. **Source of Truth:** Screenshot/browser state > agent score
2. **Three-Way Comparison:** BEFORE vs TARGET vs AFTER vs DIFF
3. **Deterministic Blockers:** DOM tests for required/forbidden elements
4. **Evidence Manifest:** Metadata tracking all artifacts
5. **Human Override:** Final decision by human, not agent

## Pipeline Components

### 1. Three-Way Screenshot Comparison

Every UI slice includes:

- **BEFORE** — Pre-implementation state (`test-results/visual-review/phase-X-Y-slice-Z-before.png`)
- **TARGET** — Approved prototype (`reference/screenshots/proben-mvp-6/[target].png`)
- **AFTER** — Post-implementation state (`test-results/visual-review/phase-X-Y-slice-Z-after.png`)
- **DIFF** — Visual comparison (`test-results/visual-review/phase-X-Y-slice-Z-diff-comparison.html`)

**Decision Criteria:**
- **ACCEPT** if AFTER looks closer to TARGET than BEFORE
- **REJECT** if AFTER looks identical to BEFORE (no change) or closer to BEFORE than TARGET

### 2. Evidence Manifest

`test-results/visual-review/phase-X-Y-slice-Z-manifest.json`

```json
{
  "phase": "2.1",
  "slice": "A",
  "route": "http://localhost:3000",
  "viewport": "1280,720",
  "browser": "chromium",
  "timestamp": "2026-06-10T00:00:00Z",
  "gitBranch": "phase-2-1-design-parity",
  "gitCommit": "abc123",
  "screenshots": {
    "target": "reference/screenshots/proben-mvp-6/hero-target-light-1.png",
    "before": "test-results/visual-review/phase-2-1-slice-a-before.png",
    "after": "test-results/visual-review/phase-2-1-slice-a-after.png",
    "diff": "test-results/visual-review/phase-2-1-slice-a-diff-comparison.html"
  },
  "report": "test-results/visual-review/phase-2-1-slice-a.html",
  "tests": {
    "domBlockers": "PASSED",
    "visualAssertions": "PASSED"
  },
  "verdict": "PENDING_REVIEW"
}
```

### 3. Deterministic DOM Blockers

Playwright test: `tests/slice-a-header-parity.test.ts`

**Required Elements (P0 Blocker if missing):**
- "MEETING READINESS" subtitle
- "Run readiness check" CTA
- "Log in" button
- Navigation items: Sample report, How it works, Checks, Resources, Pricing
- Rounded pill header container
- Proper spacing (not flush to edges)

**Forbidden Elements (P0 Blocker if present):**
- "Home" (indicates old generic nav)
- "Build Process" (indicates portfolio nav in wrong place)
- Full-width navbar structure

**Score Caps:**
- Any P0 blocker fails → Maximum score 2.9/5
- No screenshot evidence → Maximum score 2.0/5
- No DOM blocker results → Cannot be ACCEPTED

**Layout Assertions:**
- Header container exists with pill shape
- Header is centered (not full-width navbar)
- CTA has green styling (#10B981)

### 4. Visual Layout Assertions

Playwright checks for:
- `data-testid="landing-header"` — Header container
- `data-testid="brand-subtitle"` — MEETING READINESS text
- `data-testid="theme-button"` — Theme toggle
- `data-testid="login-button"` — Log in button
- `data-testid="run-readiness-check-cta"` — CTA button

**Note:** Add these testids to components if missing.

### 5. Visual Diff Generation

Script: `scripts/generate-visual-diff.js`

Creates HTML comparison showing BEFORE and AFTER side-by-side for manual pixel diff review. (No heavy image comparison library needed.)

### 6. HTML Report

Script: `scripts/generate-visual-review-report.js`

Generates comprehensive HTML report with:
- Status banner (ACCEPTED/REJECTED/NEEDS_REVIEW)
- Four visual panels (BEFORE, TARGET, AFTER, DIFF)
- Requirement checklist with status
- DOM blocker results
- Visual parity scoring
- Human override section

## Workflow

### Step 1: Capture Evidence

```bash
# Start dev server
npm run dev

# Capture AFTER screenshot and generate manifest
node scripts/capture-ui-slice-evidence.js \
  --phase "2.1" \
  --slice "A" \
  --route "http://localhost:3000" \
  --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png"
```

### Step 2: Run DOM Blocker Tests

```bash
npm test -- slice-a-header-parity
```

### Step 3: Generate Visual Diff

```bash
node scripts/generate-visual-diff.js \
  --phase "2.1" \
  --slice "A"
```

### Step 4: Generate HTML Report

```bash
node scripts/generate-visual-review-report.js \
  --phase "2.1" \
  --slice "A" \
  --slice-name "Header/Navigation" \
  --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png" \
  --route "http://localhost:3000"
```

### Step 5: Review in Browser

Open `test-results/visual-review/phase-2-1-slice-a.html` and:
1. Compare four screenshots
2. Review DOM blocker results
3. Complete requirement checklist
4. Score visual parity
5. Apply human override

### Step 6: Update Manifest

Update manifest with final verdict:
```json
{
  "verdict": "ACCEPTED"
}
```

## Automatic Rejection Rules

**REJECTED if any:**
- ❌ Missing before screenshot
- ❌ Missing target screenshot
- ❌ Missing after screenshot
- ❌ Missing evidence manifest
- ❌ Required header text missing (DOM test)
- ❌ Forbidden old nav visible (DOM test)
- ❌ No DOM blocker result
- ❌ No side-by-side visual evidence
- ❌ Agent verdict contradicts screenshot/browser
- ❌ Human override says rejected
- ❌ Generic SaaS patterns detected

## Hierarchy of Truth

**When in conflict, this order applies:**

1. **Browser state** — What actually renders in the browser
2. **Screenshot evidence** — Captured visual state
3. **DOM tests** — Deterministic verification
4. **Agent verdict** — Advisory input only
5. **Text claims** — Least reliable

**Rule:** Screenshot/browser state is the source of truth for UI acceptance.

**If agent says "looks good" but screenshot shows generic navbar → Screenshot wins**

**If agent says "5.0/5" but browser shows wrong elements → Browser wins**

**If agent says "ACCEPTED" but human disagrees → Human wins**

## Generic SaaS Detection (Automatic Rejection)

**Pipeline automatically rejects if generic patterns detected:**

### Navbar Patterns
- ❌ Full-width navbar (Bootstrap-style)
- ❌ Left-aligned logo with simple links
- ❌ Right-aligned CTA only
- ✅ Rounded pill container with proper structure

### CTA Patterns
- ❌ Generic blue/purple primary CTA
- ❌ "Get Started" without context
- ✅ Green CTA (#10B981) with specific text

**If generic patterns detected:** Verdict = NEEDS_REWORK or REJECTED

## Fresh Reviewer Protocol

Fresh reviewers check evidence in this order:

1. **Manifest** — Verify all artifacts present
2. **Screenshots** — Compare BEFORE/TARGET/AFTER
3. **DOM Blockers** — Verify test results
4. **Visual Report** — Review HTML report
5. **Code Diff** — Check scope creep
6. **Agent Verdict** — Compare with evidence

**Fresh reviewers must NOT:**
- Inspect code first and infer quality from implementation
- Accept based on agent claims alone
- Accept without screenshot evidence
- Accept without DOM blocker results

## Phase Gate Policy

**Source of Truth:**
> Screenshot/browser state is the source of truth for UI acceptance.

**No Acceptance Without:**
- ✅ Screenshot evidence (BEFORE, TARGET, AFTER)
- ✅ DOM blockers passed
- ✅ Visual report generated
- ✅ Reviewer verdict documented
- ✅ Human approval received

**Agent PASS Status:**
> Agent-generated PASS is advisory only. It is NOT release authority.

## Files

**Scripts:**
- `scripts/capture-ui-slice-evidence.js` — Screenshot + manifest capture
- `scripts/generate-visual-diff.js` — Visual diff generation
- `scripts/generate-visual-review-report.js` — HTML report generation

**Tests:**
- `tests/slice-a-header-parity.test.ts` — DOM blocker tests

**Documentation:**
- `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md` — This document
- `docs/qa/VISUAL_REVIEW_TEMPLATE.md` — Review template
- `docs/agentic-delivery/FRESH_REVIEW_PROTOCOL.md` — Reviewer protocol

**Outputs:**
- `test-results/visual-review/phase-X-Y-slice-Z-before.png`
- `test-results/visual-review/phase-X-Y-slice-Z-after.png`
- `test-results/visual-review/phase-X-Y-slice-Z-diff-comparison.html`
- `test-results/visual-review/phase-X-Y-slice-Z-manifest.json`
- `test-results/visual-review/phase-X-Y-slice-Z.html`

## Integration with Agentic Delivery

The Visual Quality Verification Pipeline integrates with:

1. **Visual Plan** — Before implementation, define success
2. **Isolated Build** — Implement in worktree
3. **Evidence Capture** — Screenshots + manifest
4. **DOM Blockers** — Deterministic tests
5. **Fresh Review** — Independent reviewer checks evidence
6. **Human Override** — Final decision by human

## Integration with Case-Inspired Harness

The Visual Quality Verification Pipeline integrates with the Case-inspired agent harness system:

### Harness State Machine Integration

**IMPLEMENT Stage:**
- Capture BEFORE screenshot (if not already exists)
- Implement visual changes
- Add test IDs for DOM blockers

**VERIFY Stage:**
- Run typecheck, tests, build
- Run DOM blocker tests
- Capture AFTER screenshot
- Generate visual diff
- Create visual report
- Verify all proof manifests

**REVIEW Stage:**
- Fresh reviewer checks visual evidence first (not code)
- Verify BEFORE/TARGET/AFTER screenshots exist
- Verify DOM blockers passed
- Score visual parity (must be >= 4.5/5 for acceptance)
- Check for generic SaaS patterns

**CLOSE Stage:**
- Verify evidence package complete
- Verify visual report generated
- Verify human approval recorded

**RETRO Stage:**
- Document visual quality learnings
- Create eval case if visual mismatch occurred
- Update gotchas if new pattern identified

### Harness Proof Verification

**For UI Work, the harness verifies:**

1. **Screenshot Evidence**
   - BEFORE screenshot exists and is not stale
   - TARGET screenshot identified and accessible
   - AFTER screenshot captured and recent
   - DIFF comparison generated

2. **DOM Blocker Evidence**
   - DOM blocker test executed
   - All required elements present
   - All forbidden elements absent
   - Test passed (exitCode === 0)

3. **Visual Report Evidence**
   - HTML report generated
   - Four-panel comparison complete
   - Dimension scores documented
   - Verdict assigned

4. **Proof Manifest Verification**
   - SHA-256 hashes verified
   - Exit codes validated
   - Manifests not stale
   - No fake execution detected

### Harness Gate Integration

**Gate 8 — Harness Gate** requires for UI work:

- ✅ Visual evidence complete (BEFORE/TARGET/AFTER)
- ✅ DOM blockers passed
- ✅ Visual report generated
- ✅ Visual parity >= 4.5/5
- ✅ Generic patterns absent
- ✅ Fresh review complete
- ✅ Human approval recorded
- ✅ Retro entry exists (if applicable)

**If any visual requirement fails:**
- Harness gate blocks release
- State machine stuck in REVIEW or VERIFY
- Revision loop initiated (if budget available)
- Human escalation (if budget exhausted)

### Evidence-First Review Protocol

**Fresh reviewers MUST check visual evidence before code:**

1. Check manifest exists and is valid
2. Verify screenshots exist (target, before, after)
3. Compare screenshots (before → target → after)
4. Verify DOM blocker tests passed
5. Review visual report (HTML)
6. Check code changes (scope verification)
7. Compare agent verdict with evidence

**No code-first review:** Reviewer must NOT inspect code first and infer quality from implementation.

### Harness Scripts for Visual Evidence

**Capture Evidence:**
```bash
node scripts/capture-ui-slice-evidence.js \
  --phase "2.1" \
  --slice "A" \
  --route "http://localhost:3000" \
  --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png"
```

**Run DOM Blockers:**
```bash
npm test -- slice-a-header-parity
```

**Generate Diff:**
```bash
node scripts/generate-visual-diff.js \
  --phase "2.1" \
  --slice "A"
```

**Generate Report:**
```bash
node scripts/generate-visual-review-report.js \
  --phase "2.1" \
  --slice "A" \
  --slice-name "Header/Navigation" \
  --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png" \
  --route "http://localhost:3000"
```

**Verify with Harness:**
```bash
# Verify proof manifests
node scripts/harness/verify-proof-manifest.js <run-id>

# Validate state transition
node scripts/harness/validate-state-transition.js --from VERIFY --to REVIEW --run-id <run-id>

# Generate harness report
node scripts/harness/generate-harness-report.js --run-id <run-id>
```

## Quality Improvement Log

**Problem:** Visual report/checklist could create false confidence without three-way comparison, DOM blockers, and manifest.

**Root Cause:** Evidence existed but was not strict enough to prove visual quality.

**Improvement:** Visual Quality Verification Pipeline with three-way screenshots, DOM blockers, manifest, diff, and human override.

**New Gate:** No UI acceptance without BEFORE/TARGET/AFTER evidence and deterministic blockers.

**Logged:** `docs/product-build-history/QUALITY_IMPROVEMENT_LOG.md`

---

**Last Updated:** 2026-06-10
**Version:** 3.0 (Added harness integration)
