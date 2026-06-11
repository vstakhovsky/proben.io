# Phase 2.1 Retry Protocol

## Purpose

This protocol defines the exact process for retrying the Phase 2.1 design parity implementation using the new Visual Agentic Delivery System to prevent the previous failure from happening again.

## Previous Failure Summary

### What Went Wrong

The first Phase 2.1 implementation:
- ✅ Build succeeded
- ✅ Tests passed
- ✅ Routes worked
- ✅ Code compiled

But was rejected because:
- ❌ Did not match Proben MVP 6 prototype
- ❌ Missing critical visual elements
- ❌ Generic SaaS appearance instead of premium design

### Root Cause

**Agents behaved like builders, not quality gatekeepers.**

The system lacked:
- Evidence-based completion requirements
- Mandatory visual verification
- Clear blocking authority for visual mismatch
- Separation of functional and visual success

### What Changed

The system was upgraded with:
- Visual planning before implementation
- Fresh review (builder ≠ reviewer)
- Risk-scored release gates
- Evidence-based completion rules
- Clear agent authority matrix

## Retry Process

### Step 1: Visual Plan Creation

**Agent:** Visual Plan Architect

**Task:** Create detailed visual plan for landing page redesign

**Input:**
- Target screenshot: `reference/screenshots/proben-mvp-6/hero-target-light-1.png`
- Current state: `app/page.tsx` (existing implementation)
- Scope: Landing page hero section, navigation, readiness preview card

**Output:**
- Section map
- Layout map
- Component map
- Exact copy
- Design tokens
- Acceptance criteria
- Out-of-scope list
- Risk list
- Rollback plan

**Completion Criteria:**
- Visual plan created using `VISUAL_PLAN_TEMPLATE.md`
- All sections complete
- Exact copy specified (no placeholders)
- Design tokens with actual values
- Human approval received

### Step 2: Human Approval

**Human reviews visual plan:**
- Approve as-is
- Request revisions
- Clarify ambiguities

**Implementation does NOT start until human approval.**

### Step 3: Isolated Implementation

**Agent:** Frontend Engineer (builder)

**Context:** Worktree isolation

**Task:** Implement only what is in approved visual plan

**Input:**
- Approved visual plan
- Worktree assignment

**Process:**
1. Create worktree: `worktree-redesign-landing-hero`
2. Navigate to worktree
3. Implement from plan only
4. Do NOT expand scope
5. Commit to worktree branch

**Constraints:**
- Must implement exact copy from plan
- Must use design tokens from plan
- Must NOT add "nice to have" features
- Must stay within visual acceptance criteria

**Completion Criteria:**
- Implementation matches plan
- Tests pass in worktree
- Build succeeds in worktree
- No scope creep

### Step 4: Screenshot Evidence

**Agent:** Frontend Engineer (builder)

**Task:** Capture visual evidence from worktree

**Input:**
- Worktree implementation
- Reference prototype

**Process:**
1. Start dev server in worktree
2. Navigate to `/`
3. Capture screenshot of current state
4. Compare with reference screenshot
5. Document differences

**Output:**
- Current implementation screenshot
- Side-by-side comparison
- List of matches and differences

### Step 5: Fresh Review

**Agent:** Fresh Review Agent (did NOT implement)

**Task:** Independently review implementation

**Input:**
- Visual plan (what was approved)
- Files changed (what was implemented)
- Screenshot evidence
- Reference prototype

**Process:**
1. Verify independence (did not implement)
2. Review changed files
3. Compare screenshots with prototype
4. Test functionality
5. Score visual parity
6. Assess risk
7. Return verdict

**Output:**
- Verdict: ACCEPTED / REJECTED / NEEDS_REWORK
- Prototype parity score (1-5)
- Risk assessment
- Specific blockers or fixes

**Blocking Rules:**
- Must reject if parity < 4.0/5
- Must request rework if parity 4.0-4.4/5
- Must accept only if parity >= 4.5/5

### Step 6: PM Evaluation

**Agent:** Product Manager

**Task:** Evaluate product quality and value

**Input:**
- Fresh review verdict
- Visual evidence
- Prototype

**Process:**
1. Verify prototype alignment
2. Assess product value
3. Score product quality
4. Return verdict

**Output:**
- Verdict: ACCEPTED / REJECTED / NEEDS_REWORK
- Product eval scores
- Specific feedback

### Step 7: Design QA Evaluation

**Agent:** Design Quality Reviewer

**Task:** Evaluate visual quality and parity

**Input:**
- Fresh review verdict
- Visual evidence
- Prototype

**Process:**
1. Verify visual parity score
2. Assess design quality
3. Check brand fit
4. Return verdict

**Output:**
- Verdict: ACCEPTED / REJECTED / NEEDS_REWORK
- Design quality scores
- Specific feedback

**Blocking Rules:**
- Must reject if parity < 4.5/5
- Must reject if looks generic SaaS
- Must accept only if matches Proben MVP 6

### Step 8: Release Manager Evaluation

**Agent:** Release Manager

**Task:** Evaluate overall quality and release readiness

**Input:**
- All previous reviews
- Visual evidence
- Risk assessment

**Process:**
1. Verify all reviews completed
2. Check for overengineering
3. Verify evidence quality
4. Return final verdict

**Output:**
- Verdict: ACCEPTED / REJECTED / NEEDS_REWORK
- Overall quality assessment
- Release decision

### Step 9: Human Approval

**Human** reviews all agent verdicts and evidence:

**Input:**
- Visual plan
- Fresh review verdict and evidence
- PM evaluation
- Design QA evaluation
- Release Manager evaluation
- Screenshot comparison

**Decision:**
- **APPROVE** — All verdicts ACCEPTED, parity >= 4.5/5, evidence complete
- **REQUEST REWORK** — Specific fixes needed
- **REJECT** — Fundamental issues, start over

### Step 10: Release Decision

**If APPROVED:**
1. Merge worktree to main
2. Clean up worktree
3. Deploy to staging
4. Verify in production

**If REWORK:**
1. Return to builder with specific fixes
2. Builder implements in worktree
3. Return to Step 4 (screenshot evidence)

**If REJECT:**
1. Discard worktree
2. Return to Step 1 (visual planning)

## Exact Verdict Format

### Fresh Review Verdict

```markdown
# Fresh Review: Phase 2.1 Landing Page Design

## Independence
**Reviewer:** Fresh Review Agent
**Builder:** Frontend Engineer
**Same agent:** NO

## Evidence
- Visual plan: `docs/agentic-delivery/visual-plan-phase-2-1.md`
- Files changed: `app/page.tsx`, `components/ReadinessPreviewCard.tsx`
- Reference: `reference/screenshots/proben-mvp-6/hero-target-light-1.png`
- Current: `screenshots/phase-2-1-implementation.png`
- Route: `/` (tested and working)

## Prototype Parity
- Header: MATCHES / DOES NOT MATCH
- Hero: MATCHES / DOES NOT MATCH
- Typography: MATCHES / DOES NOT MATCH
- Spacing: MATCHES / DOES NOT MATCH
- Colors: MATCHES / DOES NOT MATCH
- CTAs: MATCHES / DOES NOT MATCH

**Overall Parity Score:** [X/5]

## Functional QA
- Route works: YES
- Links work: YES
- Console errors: NONE
- Tests pass: YES

## Risk Assessment
- Product risk: LOW/MEDIUM/HIGH
- Design risk: LOW/MEDIUM/HIGH
- Technical risk: LOW/MEDIUM/HIGH
- Security risk: LOW/MEDIUM/HIGH
- Deployment risk: LOW/MEDIUM/HIGH

**Overall Risk:** LOW/MEDIUM/HIGH

## Verdict
**Status:** ACCEPTED / REJECTED / NEEDS_REWORK

### If REJECTED
**Blockers:**
1. [Specific blocker]
2. [Specific blocker]

### If NEEDS_REWORK
**Required Fixes:**
1. [Specific fix]
2. [Specific fix]
```

## Success Criteria

Phase 2.1 retry is successful when:

1. **Visual Parity**
   - Overall score >= 4.5/5
   - Header matches prototype
   - Hero layout matches prototype
   - Typography matches prototype
   - Spacing matches prototype
   - Colors match prototype
   - CTAs match prototype

2. **Functional Success**
   - Route `/` works
   - Links function correctly
   - No console errors
   - Tests pass
   - Build succeeds

3. **Quality Gates**
   - Fresh review: ACCEPTED
   - PM eval: ACCEPTED
   - Design QA: ACCEPTED
   - Release Manager: ACCEPTED
   - Human approval: YES

4. **Evidence**
   - Screenshot provided
   - Side-by-side comparison completed
   - Route tested
   - All reviews documented

## What Must Not Happen

### Do NOT Repeat These Mistakes

1. **Do not implement without visual plan**
   - First attempt: Started coding without detailed plan
   - Retry: Must create and get approval for visual plan first

2. **Do not let builder review own work**
   - First attempt: Builder implemented and reviewed
   - Retry: Fresh review agent (who did not implement) must review

3. **Do not approve without visual evidence**
   - First attempt: Approved based on tests passing
   - Retry: Must provide screenshots and parity score

4. **Do not confuse functional with visual success**
   - First attempt: "Tests pass, done!"
   - Retry: Must separately verify functional and visual quality

5. **Do not ignore prototype mismatch**
   - First attempt: "Close enough to prototype"
   - Retry: Must match prototype with parity >= 4.5/5

## Risk Mitigation

### Risks and Mitigations

1. **Risk: Visual plan is vague**
   - **Mitigation:** Use exact template, require specific details, human approval

2. **Risk: Builder expands scope**
   - **Mitigation:** Work in isolated worktree, implement only from plan

3. **Risk: Fresh reviewer is biased**
   - **Mitigation:** Verify independence, require evidence not claims

4. **Risk: Parity score is inflated**
   - **Mitigation:** Score specific dimensions, require justification

5. **Risk: Multiple agents with different verdicts**
   - **Mitigation:** Clear blocking authority, human final decision

## Timeline Estimate

- Visual plan creation: 30 minutes
- Human plan approval: 15 minutes
- Worktree setup: 5 minutes
- Implementation: 2-3 hours
- Screenshot evidence: 15 minutes
- Fresh review: 30 minutes
- PM evaluation: 15 minutes
- Design QA evaluation: 15 minutes
- Release Manager evaluation: 15 minutes
- Human approval: 15 minutes
- Merge and cleanup: 15 minutes

**Total:** ~4-5 hours

## Quality Checklist

Before claiming Phase 2.1 complete:

- [ ] Visual plan created and approved
- [ ] Implementation in isolated worktree
- [ ] Screenshot evidence captured
- [ ] Fresh review completed (independent)
- [ ] Parity score >= 4.5/5
- [ ] PM evaluation: ACCEPTED
- [ ] Design QA evaluation: ACCEPTED
- [ ] Release Manager evaluation: ACCEPTED
- [ ] Human approval received
- [ ] Worktree merged and cleaned up

## Related Documentation

- **Visual Agentic Delivery System:** `VISUAL_AGENTIC_DELIVERY_SYSTEM.md`
- **Visual Plan Template:** `VISUAL_PLAN_TEMPLATE.md`
- **Fresh Review Protocol:** `FRESH_REVIEW_PROTOCOL.md`
- **Risk Scored Review:** `RISK_SCORED_REVIEW.md`
- **Worktree Isolation Policy:** `WORKTREE_ISOLATION_POLICY.md`
- **Phase 2.1 Failure Analysis:** `docs/reviews/phase-2-1-failure-analysis.md`

---

**Last Updated:** 2026-06-09
**Status:** Ready for retry
