# Fresh Review Protocol

## Purpose

This protocol defines how independent review agents verify implementation work without builder bias, preventing false green checks and ensuring quality before human review.

## Core Principle

**The builder cannot be the final reviewer.**

All implementation work must be reviewed by an agent that did NOT implement the change before the human sees it.

## Independence Requirement

### What is Independence?

A reviewer is independent when:
- They did not write the code being reviewed
- They did not create the visual plan for the work
- They have no stake in the approval of this specific work
- They are incentivized to find problems, not approve

### Verification Step

Before any review begins, the reviewer must confirm:

```markdown
## Independence Verification

**Reviewer Agent:** [agent name]
**Builder Agent:** [agent name]
**Are they the same?** NO

**I confirm that I did not implement this change.**
- [ ] I did not write the code
- [ ] I did not create the plan
- [ ] I have no stake in approval
- [ ] I am incentivized to find problems

**If YES to any "same agent" question, this review is INVALID. Request a different reviewer.**
```

## Review Process

### Step 1: Receive Implementation Package

The builder provides:
- Visual plan (what was approved)
- Files changed (what was implemented)
- Evidence (screenshots, routes, tests)
- Source of truth (prototype or specification)

### Step 2: Verify Evidence Completeness

Check that all required evidence is present:

- [ ] Visual plan exists and is approved
- [ ] Files changed are listed
- [ ] **Screenshots provided (REQUIRED for UI work)**
- [ ] **HTML report generated (REQUIRED for UI work)**
- [ ] Route tested and working
- [ ] Tests pass
- [ ] Build succeeds

**If evidence missing:** Request from builder. Do not review without evidence.

**For UI work:** Text-only review is INSUFFICIENT. Must have:
1. Target screenshot (reference)
2. Current screenshot (actual browser state)
3. Side-by-side comparison (HTML report)
4. Requirement checklist with visual evidence

### Step 3: Review Implementation

Examine each changed file:
- Does it match the approved plan?
- Is there scope creep?
- Are there placeholders?
- Is the code sound?

### Step 4: Verify Against Source of Truth

For UI work:
- Compare screenshot with prototype
- Score each dimension (header, hero, typography, etc.)
- Calculate overall parity score

For non-UI work:
- Compare with specification
- Verify functionality
- Check for side effects

### Step 5: Test Functionality

- Navigate to the route
- Verify links work
- Check for console errors
- Test user flows
- Verify responsive behavior (for UI)

### Step 6: Score Dimensions

### Functional Dimensions
- **Implementation Verification:** Matches plan?
- **Functional Verification:** Works as specified?
- **Test Coverage:** Tests adequate?

### Visual Dimensions (for UI work)
- **Header Parity:** Matches prototype?
- **Hero Parity:** Matches prototype?
- **Typography:** Matches prototype?
- **Spacing:** Matches prototype?
- **Colors:** Matches prototype?
- **CTAs:** Matches prototype?
- **Responsiveness:** Works at all breakpoints?

### Quality Dimensions
- **Product Value:** Delivers user value?
- **Technical Quality:** Sound implementation?
- **Design Quality:** (for UI) Visual quality acceptable?
- **Security:** No vulnerabilities?

### Step 7: Assess Risk

Score risk dimensions:
- Product risk: LOW/MEDIUM/HIGH
- Design risk: LOW/MEDIUM/HIGH
- Technical risk: LOW/MEDIUM/HIGH
- Security risk: LOW/MEDIUM/HIGH
- Deployment risk: LOW/MEDIUM/HIGH
- Maintenance risk: LOW/MEDIUM/HIGH

### Step 8: Return Verdict

**Status must be one of:**
- **ACCEPTED** — All dimensions pass, parity >= 4.5/5, LOW risk
- **REJECTED** — Critical blockers, parity < 4.0/5, HIGH risk
- **NEEDS_REWORK** — Specific fixes needed, parity 4.0-4.4/5, MEDIUM risk

## Review Templates

### UI Work Review Template

```markdown
# Fresh Review: [UI Task Name]

## Independence Verification
**Reviewer:** Fresh Review Agent
**Builder:** [builder agent name]
**Same agent?** NO
**Independence confirmed:** YES

## Evidence Received
- [ ] Visual plan: [path]
- [ ] Files changed: [count, listed below]
- [ ] Reference screenshot: [path]
- [ ] Current screenshot: [path]
- [ ] Route tested: [URL, status]
- [ ] Tests: [pass/fail, count]

## Implementation Review
**Files Changed:**
- `app/page.tsx` — [summary of changes]
- `components/Hero.tsx` — [summary of changes]

**Matches Plan:** YES / NO
**Scope Creep:** NONE / MINOR / MAJOR
**Placeholders Found:** NONE / FOUND [list]

## Prototype Parity Assessment

### Visual Comparison

| Dimension | Status | Details |
|-----------|--------|---------|
| Header | MATCHES / DOES NOT MATCH | [specific details] |
| Hero Layout | MATCHES / DOES NOT MATCH | [specific details] |
| Typography | MATCHES / DOES NOT MATCH | [specific details] |
| Spacing | MATCHES / DOES NOT MATCH | [specific details] |
| Colors | MATCHES / DOES NOT MATCH | [specific details] |
| CTAs | MATCHES / DOES NOT MATCH | [specific details] |
| Responsiveness | MATCHES / DOES NOT MATCH | [specific details] |

### Parity Score
**Overall Prototype Parity:** [X/5]

**Breakdown:**
- Header: [X/5]
- Hero: [X/5]
- Typography: [X/5]
- Spacing: [X/5]
- Colors: [X/5]
- CTAs: [X/5]
- Responsive: [X/5]

## Functional Review
- **Route works:** YES / NO
- **Links work:** YES / NO
- **Console errors:** NONE / FOUND
- **Tests pass:** YES / NO

## Quality Assessment

### Product Value
**Score:** [X/5]
- Value proposition clear: YES / NO
- User problem addressed: YES / NO

### Design Quality
**Score:** [X/5]
- Visual hierarchy: CLEAR / UNCLEAR
- Spacing consistent: YES / NO
- Generic SaaS patterns: NONE / FOUND
- Brand fit: STRONG / WEAK

### Technical Quality
**Score:** [X/5]
- Code maintainable: YES / NO
- Unnecessary complexity: NONE / FOUND
- TypeScript compliance: STRICT / ISSUES

## Risk Assessment

| Risk Category | Level | Concerns |
|---------------|-------|----------|
| Product | LOW/MEDIUM/HIGH | [details] |
| Design | LOW/MEDIUM/HIGH | [details] |
| Technical | LOW/MEDIUM/HIGH | [details] |
| Security | LOW/MEDIUM/HIGH | [details] |
| Deployment | LOW/MEDIUM/HIGH | [details] |
| Maintenance | LOW/MEDIUM/HIGH | [details] |

**Overall Risk Level:** LOW / MEDIUM / HIGH

## Verdict

**Status:** ACCEPTED / REJECTED / NEEDS_REWORK

### If ACCEPTED:
- Parity >= 4.5/5
- All critical dimensions >= 4/5
- No HIGH risks
- Evidence complete

### If REJECTED:
- Parity < 4.0/5 OR
- Critical dimension < 4/5 OR
- HIGH risk without mitigation

**Blockers:**
1. [Specific blocker 1]
2. [Specific blocker 2]

### If NEEDS_REWORK:
- Parity 4.0-4.4/5 OR
- MEDIUM risk OR
- Specific issues fixable

**Required Fixes:**
1. [Specific fix 1]
2. [Specific fix 2]

## Next Steps
- [If ACCEPTED:] Forward to PM and Design QA for evaluation
- [If REJECTED:] Return to builder with blockers
- [If NEEDS_REWORK:] Return to builder with specific fixes

---

**Reviewer:** Fresh Review Agent (Independent)
**Review Date:** [timestamp]
**Review Duration:** [time]
```

## Blocking Rules

### Must Reject If:

1. **No Evidence Provided**
   - No screenshots
   - No route verification
   - No test results

2. **Visual Parity < 4.0/5**
   - Does not match prototype
   - Missing critical elements

3. **Functional Failure**
   - Route doesn't work
   - Links broken
   - Console errors

4. **HIGH Risk Without Mitigation**
   - Security concerns
   - Data exposure
   - Breaking changes

5. **Scope Creep**
   - Implemented beyond approved plan
   - Added unapproved features

### Must Request Rework If:

1. **Visual Parity 4.0-4.4/5**
   - Minor deviations from prototype
   - Fixable with specific changes

2. **MEDIUM Risk**
   - Some concerns
   - Mitigations possible

3. **Minor Issues**
   - Specific fixable problems
   - Not critical blockers

## Quality Checklist

The fresh review is complete when:
- [ ] Independence verified
- [ ] Evidence completeness confirmed
- [ ] Implementation reviewed
- [ ] Source of truth compared
- [ ] Functionality tested
- [ ] Dimensions scored
- [ ] Risk assessed
- [ ] Verdict returned
- [ ] Blockers or fixes listed (if applicable)

## Source of Truth Policy

> **For UI work: If browser state or screenshot evidence contradicts agent score, the screenshot/browser state is the source of truth.**

### Rules

1. **No text-only acceptance** — Cannot accept UI slice without screenshot evidence
2. **Screenshot source of truth** — Visual evidence trumps agent claims
3. **Side-by-side required** — Must compare target vs current visually
4. **Human can override** — Agent verdict is preliminary, human makes final call

### Evidence Requirements for UI Work

**REQUIRED:**
- Target screenshot (approved prototype)
- Current screenshot (actual browser state)
- HTML report with side-by-side comparison
- Requirement checklist with PASS/FAIL based on visual evidence
- Visual parity scoring based on comparison

**NOT SUFFICIENT:**
- Agent text description
- Agent "looks good" claim
- Code review alone
- Route availability alone

### Visual Evidence Workbench

Use the Visual Evidence Workbench for all UI slice reviews:

```bash
# Generate visual evidence report
node scripts/generate-visual-review-report.js \
  --phase "2.1" \
  --slice "A" \
  --slice-name "Header/Navigation" \
  --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png" \
  --current "test-results/phase-2-1-slice-a-current.png" \
  --route "http://localhost:3000" \
  --output "test-results/visual-review/phase-2-1-slice-a.html"
```

See `docs/qa/VISUAL_EVIDENCE_WORKBENCH.md` for complete documentation.

## Related Documentation

- **Fresh Review Agent:** `.claude/agents/fresh-review-agent.md`
- **Fresh Agent Review Skill:** `.claude/skills/fresh-agent-review/SKILL.md`
- **Risk Scored Review:** `RISK_SCORED_REVIEW.md`
- **Visual Agentic Delivery System:** `VISUAL_AGENTIC_DELIVERY_SYSTEM.md`

---

**Last Updated:** 2026-06-09
