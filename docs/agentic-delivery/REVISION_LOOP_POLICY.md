# Revision Loop Policy

## Purpose

Define revision budget, retry logic, and escalation rules for the agent state machine. Prevent blind retries and infinite revision loops.

## Core Principle

> **Maximum 2 revision loops per slice. No blind retries.**

**Problem:** Uncontrolled retries can waste time and create frustration without addressing root causes.

**Solution:** Limited revision budget with specific blocker requirements and human escalation.

## Revision Budget

### Maximum Revisions

**Budget:** 2 revision loops per slice

**Counter:**
- Initialize at 0 for each slice
- Increment on each REVIEW → IMPLEMENT transition
- Reset on new slice

### Budget Exhaustion

**When Budget = 2:**
1. Stop automated revision loop
2. Escalate to human
3. Require human decision on next steps
4. No further automated revisions

**Human Decision Options:**
- **Approve one more revision** — Manual override + budget increment
- **Restart slice** — Go back to IMPLEMENT with reset budget
- **Escalate to specialist** — Bring in domain expert
- **Cancel slice** — Stop work on this slice
- **Pivot approach** - Try different approach

## Revision Loop Pattern

### First Revision (Budget: 0 → 1)

**Trigger:** REVIEW → IMPLEMENT with verdict NEEDS_REWORK

**Requirements:**
- Review identifies specific blockers
- Blockers documented in review verdict
- Implementation addresses specific blockers

**State Flow:**
```
REVIEW (budget: 0) → IMPLEMENT (budget: 1)
  → Address specific blockers
  → VERIFY
  → REVIEW (budget: 1)
```

**Allowed If:**
- Budget < 2
- Specific blockers identified
- First revision

---

### Second Revision (Budget: 1 → 2)

**Trigger:** REVIEW → IMPLEMENT with verdict NEEDS_REWORK (again)

**Requirements:**
- Review identifies remaining blockers
- Blockers different from first revision
- Implementation addresses remaining blockers

**State Flow:**
```
REVIEW (budget: 1) → IMPLEMENT (budget: 2)
  → Address remaining blockers
  → VERIFY
  → REVIEW (budget: 2)
```

**Allowed If:**
- Budget < 2
- Different blockers than first revision
- Second revision

---

### Budget Exhaustion

**Trigger:** REVIEW with budget: 2

**State Flow:**
```
REVIEW (budget: 2)
  → ESCALATE TO HUMAN
  → Human decision required
```

**Human Options:**
1. **Approve one more revision** — Manual override + budget increment
2. **Restart slice** — Go back to IMPLEMENT with reset budget
3. **Escalate to specialist** — Bring in domain expert
4. **Cancel slice** — Stop work on this slice
5. **Pivot approach** — Try different approach

---

## No Blind Retries

### Forbidden Patterns

**✗ "Try again" without specific blockers**
**✗ "Rework it" without identifying issues**
**✗ Automatic retry without analysis**
**✗ "Another attempt" without changes**

### Required Patterns

**✓ "REVIEW → IMPLEMENT with specific blockers"**
**✓ "Address these specific issues: [list]"**
**✓ "Fix blockers: [specific blocker 1], [specific blocker 2]"**

### Blocker Requirements

**For NEEDS_REWORK Verdict:**

**Required in Review Verdict:**
- Specific blockers listed
- Each blocker has evidence
- Each blocker has fix suggestion
- Priority indicated

**Example:**
```json
{
  "verdict": "NEEDS_REWORK",
  "blockers": [
    {
      "blocker": "Missing 'MEETING READINESS' subtitle",
      "evidence": "Screenshot shows no subtitle",
      "fix": "Add subtitle to header"
    },
    {
      "blocker": "Full-width navbar instead of pill shape",
      "evidence": "Screenshot shows generic navbar",
      "fix": "Implement pill-shaped header"
    }
  ]
}
```

---

## State Transitions

### Allowed Revision Transition

**REVIEW → IMPLEMENT (Conditional)**

**Allowed If:**
- Review verdict is NEEDS_REWORK
- Revision budget < 2
- Specific blockers identified

**Blocked If:**
- Review verdict is REJECTED
- Revision budget exhausted (= 2)
- No specific blockers identified

**Implementation:**
```javascript
// scripts/harness/validate-state-transition.js
if (toState === 'IMPLEMENT' && fromState === 'REVIEW') {
  if (verdict !== 'NEEDS_REWORK') {
    return BLOCK('REVIEW must be NEEDS_REWORK for revision');
  }
  if (revisionBudget >= 2) {
    return BLOCK('Revision budget exhausted, escalate to human');
  }
  if (!blockers || blockers.length === 0) {
    return BLOCK('REVIEW must identify specific blockers for revision');
  }
  return ALLOW();
}
```

---

## Revision Tracking

### Revision Counter

**File:** `test-results/harness/<run-id>/state.json`

```json
{
  "revisionCount": 1,
  "revisionBudget": 2,
  "revisions": [
    {
      "revision": 1,
      "blockers": ["Blocker 1", "Blocker 2"],
      "addressed": ["Blocker 1", "Blocker 2"]
    }
  ]
}
```

### Revision Log

**Each revision logs:**
- Revision number
- Blockers identified
- Implementation actions
- Verification results

---

## Human Escalation

### Escalation Triggers

1. **Budget Exhaustion** — Revision budget = 2
2. **Repeated Same Blocker** — Same blocker appears in multiple revisions
3. **New Failure Mode** — Failure not seen before
4. **Ambiguous Blocker** — Blocker unclear how to fix
5. **Stale Evidence** — Evidence becomes stale or inconsistent

### Escalation Process

1. **Create Retro Entry** — Document failure
2. **Create Eval Case** — If new failure mode
3. **Pause Harness** — Stop automated work
4. **Human Decision** — Human chooses next action
5. **Update Budget** — If human approves more revisions

### Human Override Options

**Option 1: Approve Additional Revision**
- Human specifies new budget (e.g., +1)
- Harness resumes with new budget
- Treat as manual override

**Option 2: Restart Slice**
- Reset to IMPLEMENT state
- Reset budget to 0
- Start fresh implementation

**Option 3: Specialist Intervention**
- Escalate to specialist agent
- Bring in domain expert
- Get expert analysis

**Option 4: Cancel Slice**
- Document incomplete work
- Create retro entry
- Move to next slice or pivot

---

## Revision Quality Requirements

### For Each Revision

**Required:**
1. **Specific Blockers Identified** — Clear list of what's wrong
2. **Evidence Provided** — Screenshot/test output showing issues
3. **Fix Suggested** — How to address each blocker
4. **Implementation Completed** — Changes actually made
5. **Verification Run** — Tests/evidence re-run

**Not Sufficient:**
- Generic "rework this" without specifics
- "Fix visual issues" without listing them
- "Try again" without changes
- "Another pass" without blockers

### Verification After Revision

**Required:**
1. Run proof commands again
2. Re-verify SHA-256 hashes
3. Capture new evidence (if UI)
4. Run DOM blockers (if UI)
5. Submit for review

**Outcome:**
- **PASSED** → Review → CLOSE (if accepted)
- **NEEDS_REWORK** → Another revision (if budget allows)
- **REJECTED** → Budget exhausted, escalate to human

---

## Failure as Harness Bug Mindset

### Core Principle

> **Every failure is a harness bug until proven otherwise.**

**Mindset Shift:**
- **Old:** "Agent made mistake" → Fix agent prompt
- **New:** "Harness allowed failure" → Fix harness code/gates

### Harness Bugs

**Definition:** A failure that could have been prevented by:
1. Better state machine enforcement
2. Stronger evidence requirements
3. More specific state transition rules
4. Clearer blocker requirements
5. Better proof verification

**Not Harness Bugs:**
- Implementation bugs (code errors, logic errors)
- External dependencies (API failures, service outages)
- Human errors (human made mistake)
- New failure modes (never seen before)

### Harness Bug Process

1. **Identify** — Recognize failure as harness bug or implementation bug
2. **Categorize** — Determine if harness should have prevented
3. **Fix Harness** — Update harness code/gates/instructions
4. **Document** — Create retro entry explaining harness improvement
5. **Prevent** — Add eval case to prevent recurrence

**Implementation Bugs:**
- Fix in code, update tests, verify fix
- No harness update needed

**Harness Bugs:**
- Fix harness, update gates, create eval case
- Document in retro entry

---

## Revision Loop Statistics

### Tracking

**Metrics to Track:**
- Revision rate (revisions per slice)
- Budget exhaustion rate (how often budget = 2)
- Human escalation rate (how often humans intervene)
- Same blocker recurrence (blocker appears in multiple revisions)
- Harness bug rate (failures caused by harness issues)

### Goals

**Target Metrics:**
- Revision rate < 50% (most slices pass on first review)
- Budget exhaustion rate < 10% (most slices don't exhaust budget)
- Human escalation rate < 20% (most slices resolve automatically)
- Same blocker recurrence < 5% (blockers fixed on first revision)

---

## Examples

### Example 1: Successful First Revision

**Initial Review:**
- Verdict: NEEDS_REWORK
- Blockers: ["Missing MEETING READINESS", "Generic navbar"]
- Budget: 0 → 1

**Implementation:**
- Added "MEETING READINESS" subtitle
- Changed navbar to pill shape
- Verified with new screenshots

**Second Review:**
- Verdict: ACCEPTED
- Budget: 1 (not exhausted)
- State: REVIEW → CLOSE → RETRO → DONE

---

### Example 2: Budget Exhaustion

**First Review:**
- Verdict: NEEDS_REWORK
- Blockers: ["Missing MEETING READINESS"]
- Budget: 0 → 1

**Implementation:**
- Added "MEETING READINESS" subtitle
- But kept generic navbar

**Second Review:**
- Verdict: NEEDS_REWORK
- Blockers: ["Generic navbar persists"]
- Budget: 1 → 2 (exhausted)

**Escalation:**
- Human decision required
- Human approves one more revision
- Budget manually incremented to 3

**Third Review:**
- Verdict: ACCEPTED
- Budget: 3 → APPROVED

---

### Example 3: Harness Bug

**Initial Reviews (both failed):**
- Review 1: NEEDS_REWORK — Generic navbar
- Review 2: NEEDS_REWORK — Generic navbar (same blocker)

**Analysis:**
- Same blocker recurs despite fixes
- Evidence shows generic pattern persists
- Agent not detecting generic pattern

**Harness Bug Identified:**
- Generic SaaS detection not enforced in state machine
- DOM blocker for generic navbar missing
- Evidence requirements not specific enough

**Harness Fix:**
- Add generic SaaS detection to VERIFY state
- Add DOM blocker test for generic navbar
- Update gotchas with generic pattern examples
- Create eval case: EV-HARNESS-002

**Next Slice:**
- Enhanced generic detection prevents recurrence

---

## Related Documentation

- **[CASE_INSPIRED_AGENT_HARNESS.md](CASE_INSPIRED_AGENT_HARNESS.md)** — Harness overview
- **[AGENT_STATE_MACHINE.md](AGENT_STATE_MACHINE.md)** — State machine details
- **[EVIDENCE_PROOF_PROTOCOL.md](EVIDENCE_PROOF_PROTOCOL.md)** — Proof requirements
- **[../../CLAUDE.md](../../CLAUDE.md)** — Harness rules
- **[../../docs/PHASE_GATE_POLICY.md](../../docs/PHASE_GATE_POLICY.md)** — Harness gate
- **[../../docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md](../../docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md)** — Learning log

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Inspired By:** Nick Nisi's "Case" from WorkOS
