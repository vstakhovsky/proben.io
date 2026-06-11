# Visual Evidence Workbench

## Purpose

The Visual Evidence Workbench provides a systematic, evidence-based approach to UI validation. It ensures that all UI slice reviews are backed by visual evidence, not text-only claims.

## Problem Statement

**Previous Issue:** Agents were marking UI slices as ACCEPTED with high visual parity scores (e.g., 5.0/5) while the actual browser showed the old generic implementation. Text-only self-review is insufficient.

**Solution:** Every UI slice review must include:
1. Target screenshot (approved prototype)
2. Current screenshot (actual browser state)
3. Side-by-side visual comparison
4. Requirement checklist with PASS/FAIL status
5. Visual parity scoring
6. Human override section

## Core Principle

> **If browser state or screenshot evidence contradicts agent score, the screenshot/browser state is the source of truth.**

No UI slice can be accepted based only on agent-written checklist. Acceptance requires:
- Screenshot evidence
- Side-by-side visual review
- Human verification

## Components

### 1. Screenshot Capture

Using Playwright to capture consistent browser screenshots:

```bash
# Desktop screenshot
npx playwright screenshot http://localhost:3000 test-results/phase-X-Y-slice-Z-current.png --wait-for-selector="nav"

# Mobile screenshot
npx playwright screenshot http://localhost:3000 test-results/phase-X-Y-slice-Z-mobile.png --viewport-size=375,667 --wait-for-selector="nav"
```

### 2. HTML Report Generation

Generate static HTML report with side-by-side comparison:

```bash
node scripts/generate-visual-review-report.js \
  --phase "2.1" \
  --slice "A" \
  --slice-name "Header/Navigation" \
  --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png" \
  --current "test-results/phase-2-1-slice-a-current.png" \
  --route "http://localhost:3000" \
  --output "test-results/visual-review/phase-2-1-slice-a.html"
```

### 3. Requirement Checklist

For each UI slice, define requirements with:
- Requirement name
- Expected behavior
- Actual evidence (screenshot reference)
- Status: PASS / FAIL / NEEDS REVIEW
- Blocker: YES / NO

### 4. Visual Parity Scoring

Rate each dimension from 0-5:
- Header structure
- Logo/subtitle
- Navigation items
- CTA hierarchy
- Prototype similarity
- Overall parity

**Acceptance threshold:** ≥ 4.5/5

### 5. Blocker Logic

Automatic rejection if any of these are true:
- Current screenshot missing
- Target screenshot missing
- Critical UI element missing (as defined in slice requirements)
- Current browser state contradicts agent verdict
- Generic/wrong elements appear (e.g., "Home", "Build Process" in landing header when not specified)

### 6. Human Override

Every report includes a Human Review Override section that can be manually edited:
- Human verdict: ACCEPTED / NEEDS REWORK / REJECTED
- Reason
- Required fixes
- Approved by
- Date

## Workflow

### Before Implementation

1. Create visual plan (see `docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md`)
2. Define target requirements for the slice
3. Identify reference screenshot

### During Implementation

1. Implement the slice in isolation (worktree)
2. Run tests: `npm test`, `npm run type-check`, `npm run build`

### After Implementation

1. Start dev server: `npm run dev`
2. Capture current screenshot using Playwright
3. Generate visual evidence report
4. Review report in browser
5. Complete requirement checklist based on visual evidence
6. Score visual parity based on side-by-side comparison
7. Apply human override if needed

### Approval Decision

**ACCEPTED** if:
- All critical requirements PASS
- No blockers
- Visual parity ≥ 4.5/5
- Human reviewer confirms visual evidence

**NEEDS REWORK** if:
- Some requirements FAIL but not critical
- Visual parity < 4.5 but ≥ 3.0
- Specific fixes can be identified

**REJECTED** if:
- Any blocker present
- Visual parity < 3.0
- Current browser state contradicts agent verdict
- Generic/wrong design

## File Structure

```
test-results/
├── visual-review/
│   ├── phase-2-1-slice-a.html       # HTML report for slice A
│   ├── phase-2-1-slice-b.html       # HTML report for slice B
│   └── README.md                     # This directory's index
├── phase-2-1-slice-a-current.png     # Screenshot evidence
└── phase-2-1-slice-a-mobile.png      # Mobile screenshot

docs/qa/
├── VISUAL_EVIDENCE_WORKBENCH.md      # This document
├── VISUAL_REVIEW_TEMPLATE.md         # Template for visual reviews
└── SLICE_REQUIREMENTS.md             # Slice requirement definitions

scripts/
└── generate-visual-review-report.js # Report generation script
```

## Integration with Agentic Delivery

The Visual Evidence Workbench integrates with the Visual Agentic Delivery System:

1. **Visual Plan** — Before coding, define what success looks like
2. **Isolated Build** — Implement in worktree
3. **Screenshot Capture** — Capture actual browser state
4. **Evidence Generation** — Create HTML report with side-by-side comparison
5. **Fresh Review** — Independent agent reviews evidence, not code
6. **Human Override** — Human makes final decision based on visual evidence

## Rules

### Hard Rules

1. **No text-only acceptance** — Cannot accept UI slice without screenshot evidence
2. **Screenshot source of truth** — If screenshot contradicts agent score, screenshot wins
3. **Blockers block release** — Any blocker = automatic REJECTED
4. **Human can override** — Agent verdict is preliminary, human makes final call

### Process Rules

1. Capture screenshots before generating report
2. Generate report before marking slice as complete
3. Open report in browser for review (don't review from command line)
4. Complete checklist based on visual evidence only
5. Human must sign off with name and date

## Troubleshooting

### Screenshot Not Matching What I See

- Hard refresh browser (Cmd+Shift+R)
- Clear browser cache
- Verify dev server is running
- Verify correct URL
- Check viewport size matches target

### Report Images Not Loading

- Verify screenshot paths are correct relative to HTML file
- Check file permissions
- Ensure screenshots were actually captured

### Agent Score vs Visual Evidence Mismatch

- Trust the screenshot, not the agent score
- Use Human Override section to correct
- Document the mismatch in Reason field

## References

- `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md` — Full system documentation
- `docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md` — Visual planning template
- `docs/agentic-delivery/FRESH_REVIEW_PROTOCOL.md` — Fresh review process
- `docs/PHASE_GATE_POLICY.md` — Gate policy and rules

---

**Last Updated:** 2026-06-10
**Version:** 1.0
