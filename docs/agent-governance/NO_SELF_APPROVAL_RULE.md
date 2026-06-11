# No Self Approval Rule

## Core Rule

**A builder must never approve its own work.**

This is the most critical rule in the Proben.io agent governance system.

## What This Means

### For Builders (Level 1)

**Cannot:**
- ❌ Review their own implementation
- ❌ Approve their own code
- ❌ Declare their own work release-ready
- ❌ Score their own visual parity
- ❌ Assess their own product value
- ❌ Validate their own security

**Can:**
- ✅ Implement from approved plan
- ✅ Report what was changed
- ✅ Provide evidence (screenshots, tests)
- ✅ Explain implementation decisions
- ✅ Run checks and report results

### For Principal Reviewers (Level 2)

**Cannot:**
- ❌ Review work they implemented
- ❌ Approve work they contributed to
- ❌ Score their own visual design
- ❌ Assess their own product decisions

**Can:**
- ✅ Review work independently
- ✅ Approve based on evidence
- ✅ Reject based on standards
- ✅ Request specific rework
- ✅ Assign scores objectively

## Enforcement Mechanism

### Step 1: Independence Verification

Before any review, the reviewer must confirm:

```markdown
## Independence Statement

**Reviewer Agent:** [name]
**Builder Agent:** [name]
**Same Agent?** NO

**I confirm:**
- [ ] I did not implement this change
- [ ] I did not write the code being reviewed
- [ ] I did not create the plan for this work
- [ ] I have no stake in this approval
- [ ] I am incentivized to find problems

**If YES to "Same Agent" or NO to any confirmation, this review is INVALID.**
```

### Step 2: Evidence-Based Review

All approvals must be based on evidence, not claims:

- **For UI work:** Screenshots, side-by-side comparisons, visual parity scores
- **For product work:** Source-of-truth comparison, product eval scores
- **For security work:** Security scan results, risk assessment
- **For architecture work:** Design review, technical eval

**Approvals based on "builder says it's good" are INVALID.**

### Step 3: Decision Documentation

All decisions must document:

```markdown
## Review Decision

**Work Reviewed:** [what was reviewed]
**Evidence Examined:** [screenshots, tests, comparisons]
**Source of Truth:** [prototype, spec, plan]
**Builder Claims:** [what builder said was done]

**My Assessment:**
- [ ] Builder claims match evidence
- [ ] Evidence supports approval
- [ ] Source-of-truth comparison completed

**Verdict:** ACCEPTED / REJECTED / NEEDS_REWORK

**Reasoning:** [specific evidence, not builder confidence]
```

## Detection and Prevention

### Detection Patterns

**Agent Governance Auditor monitors for:**

1. **Self-approval pattern**
   - Same agent always approves certain type of work
   - Agent approves work without evidence
   - Agent never rejects work from certain builders

2. **Evidence-free approval pattern**
   - Approvals without screenshot comparison
   - Approvals without source-of-truth check
   - Approvals based only on builder claims

3. **Rubber-stamp pattern**
   - Agent always approves, never rejects
   - Agent approval rate > 95%
   - Agent approval time < 1 minute

### Prevention Mechanisms

**1. Assignment Separation**

When assigning work:
- Builder: [Agent A]
- Reviewer: [Agent B] (must be different from Builder)
- If same, system must auto-reject or reassign

**2. Evidence Requirements**

Before approval can be given:
- [ ] Screenshot evidence (for UI)
- [ ] Source-of-truth comparison
- [ ] Test results
- [ ] Risk assessment

**3. Decision Logging**

All decisions logged with:
- Who approved
- What evidence was reviewed
- What source of truth was used
- Specific reasoning

## Examples

### Example 1: Valid Review

**Scenario:** Frontend Engineer implements landing page hero

**Builder:** Frontend Engineer (Level 1)
**Reviewer:** Fresh Review Agent (Level 2) - did NOT implement

**Evidence:**
- Screenshot of current implementation
- Reference prototype screenshot
- Side-by-side comparison
- Visual parity score: 4.2/5

**Decision:** NEEDS_REWORK

**Reasoning:** Visual parity 4.2/5 below 4.5/5 threshold. Spacing issues identified in comparison.

✅ Valid: Independent review, evidence-based, below threshold

---

### Example 2: Invalid Self-Approval

**Scenario:** Frontend Engineer implements landing page hero

**Builder:** Frontend Engineer (Level 1)
**Reviewer:** Frontend Engineer (Level 1) - SAME AGENT

**Evidence:**
- Tests pass
- Build succeeds

**Decision:** APPROVED

**Reasoning:** Tests pass, implementation complete.

❌ Invalid: Self-approval, no visual evidence, no parity score

---

### Example 3: Invalid Evidence-Free Approval

**Scenario:** Frontend Engineer implements landing page hero

**Builder:** Frontend Engineer (Level 1)
**Reviewer:** Principal Design Reviewer (Level 2) - independent

**Evidence:**
- Builder claims: "Matches prototype well"
- Builder claims: "Looks good"

**Decision:** APPROVED

**Reasoning:** Builder confident it matches prototype.

❌ Invalid: No screenshot evidence, no parity score, approved based on claims

## Consequences

### For Violations

**If self-approval detected:**

1. **Immediate rejection** of approval
2. **Reassignment** to independent reviewer
3. **Audit** of agent's approval history
4. **Retraining** if pattern persists
5. **Downgrade** if violation repeated

**If evidence-free approval detected:**

1. **Immediate rejection** of approval
2. **Request** for evidence-based review
3. **Audit** of reviewer's pattern
4. **Monitoring** if pattern persists

### For Compliance

**Agents that consistently:**
- Reject their own implementation attempts
- Require evidence before approval
- Document decisions thoroughly

**Are:**
- Recognized as reliable reviewers
- Trusted with more complex reviews
- Considered for principal reviewer roles

## Hard Rule Summary

**For any UI task:**

1. **Builder** (Level 1) may implement
2. **Fresh reviewer** (Level 2, did not implement) must review
3. **Principal Design Reviewer** (Level 2) must score visual parity
4. **Principal PM** (Level 2) must score product value
5. **CTO Bar Raiser** (Level 3) must confirm release readiness
6. **Human Owner** gives final approval

**If any blocking gate fails, status is REJECTED — DO NOT RELEASE.**

**No exceptions. No self-approval. No evidence-free approval.**

## Related Documentation

- **Agent Authority Matrix:** `docs/agent-governance/AGENT_AUTHORITY_MATRIX.md`
- **RACI Matrix:** `docs/agent-governance/RACI_MATRIX.md`
- **Visual Agentic Delivery:** `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md`
- **Agent Definitions:** `.claude/agents/`

---

**Last Updated:** 2026-06-10
