# Agent State Machine

## Purpose

Define the state machine that enforces evidence-based workflow for Proben.io development. Inspired by Nick Nisi's "Case" approach from WorkOS.

## States Overview

```
IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO → DONE
```

## Role-to-State Mapping

| State | Role | Mapped Agents |
|-------|------|---------------|
| IMPLEMENT | Implementer | frontend-engineer, builder-agent |
| VERIFY | Verifier | test-engineer, DOM blocker checker |
| REVIEW | Reviewer | fresh-review-agent, design-reviewer |
| CLOSE | Closer | product-manager, release-manager, principal-architect (conditional) |
| RETRO | Retro | governance-auditor |

## State Definitions

### IMPLEMENT

**Role:** Implementer

**Purpose:** Build and implement the slice.

**Activities:**
- Write code
- Create tests
- Run local checks
- Add test IDs for DOM blockers
- Capture evidence helpers

**Entry Criteria:**
- Visual plan approved (for UI work)
- Requirements defined
- Test plan ready

**Exit Criteria:**
- Implementation complete
- Tests passing locally
- Evidence capture helpers ready

**Valid Next States:**
- → VERIFY (only if implementation complete)

**Forbidden Next States:**
- ✗ CLOSE (no review performed)
- ✗ DONE (no retro)
- ✗ REVIEW (skipped verification)

**Implementer Cannot:**
- Approve own work
- Score visual quality
- Claim ACCEPTED status
- Proceed to next slice

---

### VERIFY

**Role:** Verifier

**Purpose:** Verify implementation with proof manifests and evidence.

**Activities:**
- Run proof commands (typecheck, tests, build)
- Generate proof manifests with SHA-256 hashes
- Verify DOM blockers (if UI work)
- Capture visual evidence (if UI work)
- Validate state transition requirements

**Entry Criteria:**
- IMPLEMENT state complete
- Implementation ready for verification

**Exit Criteria:**
- All proof manifests PASSED
- SHA-256 hashes verified
- Evidence complete (if UI work)
- No blockers found

**Valid Next States:**
- → REVIEW (only if all proof manifests pass)

**Forbidden Next States:**
- ✗ CLOSE (no review performed)
- ✗ IMPLEMENT (can't go back without failing review)
- ✗ DONE (no close evidence)

**Blocking Conditions:**
- Tests failing
- Build failing
- Typecheck failing
- DOM blockers failing
- Evidence incomplete
- SHA-256 hash mismatch

**Required Proof:**
- Command logs (typecheck, tests, build)
- SHA-256 hashes of logs
- Exit codes === 0
- Screenshots (for UI work)
- DOM blocker results

---

### REVIEW

**Role:** Reviewer

**Purpose:** Independent review of implementation and evidence.

**Activities:**
- Fresh review of work (builder ≠ reviewer)
- Evidence verification
- Comparison against source of truth
- Risk scoring
- Verdict determination (ACCEPTED/NEEDS_REWORK/REJECTED)

**Entry Criteria:**
- VERIFY state complete
- All proof manifests PASSED
- Evidence complete

**Exit Criteria:**
- Review complete
- Verdict documented
- Evidence verified

**Valid Next States:**
- → CLOSE (if verdict: ACCEPTED)
- → IMPLEMENT (if verdict: NEEDS_REWORK and revision budget < 2)

**Forbidden Next States:**
- ✗ DONE (no close evidence)
- ✗ VERIFY (can't go back)

**Blocking Conditions:**
- Review incomplete
- Evidence missing
- Independence violation (builder = reviewer)

**Evidence-First Review Order:**
1. Manifest (metadata)
2. Before screenshot
3. Target screenshot
4. After screenshot
5. Diff / side-by-side report
6. DOM blocker results
7. Product/design rubric
8. Code diff (scope verification only)

**No Code-First Review:** Reviewer must NOT inspect code first and infer quality from implementation.

**Revision Budget:**
- Maximum 2 revision loops per slice
- If review fails 2 times, escalate to human
- No blind retries

---

### CLOSE

**Role:** Closer

**Purpose:** Final quality gate before completion.

**Activities:**
- Verify all gates passed
- Check evidence package completeness
- Verify human approval
- Generate harness report
- Prepare retro entry

**Entry Criteria:**
- REVIEW state complete
- Review verdict: ACCEPTED
- Evidence package complete

**Exit Criteria:**
- All gates passed
- Evidence verified
- Human approval recorded
- Harness report generated

**Valid Next States:**
- → RETRO (always required for learning)

**Forbidden Next States:**
- ✗ DONE (without retro)
- ✗ IMPLEMENT (can't revisit after close)

**Blocking Conditions:**
- Any gate failed
- Evidence package incomplete
- Human approval missing
- Release risk too high

**Closer Validates:**
- PM/product alignment
- Design acceptance
- Architecture/security/QA risks
- Evidence package completeness
- Revision count (≤ 2)
- Release risk

---

### RETRO

**Role:** Retro

**Purpose:** Document learning and update process.

**Activities:**
- Create retro entry
- Document what passed/failed
- Identify new gotchas
- Update eval cases (if failure)
- Update gates (if needed)
- Update gotchas (if needed)

**Entry Criteria:**
- CLOSE state complete
- Evidence package complete

**Exit Criteria:**
- Retro entry written
- Learning documented
- Eval cases updated (if applicable)
- Gates updated (if applicable)

**Valid Next States:**
- → DONE

**Blocking Conditions:**
- Retro entry incomplete
- Learning not documented

**Retro Questions:**
- Did any agent create a false PASS?
- Did any gate fail to block?
- Did the system get stuck in loops?
- Did skills help or add noise?
- What gotcha/eval/gate should be added?
- Should any agent or skill be removed?

---

### DONE

**Purpose:** Slice completion.

**Status:**
- Slice accepted
- All gates passed
- Evidence complete
- Retro documented

**Final State:** No further states.

## State Transitions

### Allowed Transitions

```
IMPLEMENT → VERIFY
  Conditions: Implementation complete, tests passing, evidence captured

VERIFY → REVIEW
  Conditions: All proof manifests PASSED, SHA-256 verified, evidence complete

REVIEW → CLOSE
  Conditions: Review verdict ACCEPTED, evidence package complete

REVIEW → IMPLEMENT
  Conditions: Review verdict NEEDS_REWORK, revision budget < 2, specific blockers identified

CLOSE → RETRO
  Conditions: CLOSE complete, evidence package complete

RETRO → DONE
  Conditions: Retro entry written, learning documented
```

### Forbidden Transitions

```
✗ IMPLEMENT → CLOSE
  Reason: No review performed

✗ IMPLEMENT → DONE
  Reason: No retro for learning

✗ VERIFY → CLOSE
  Reason: No review performed

✗ REVIEW → DONE
  Reason: No close evidence, no retro

✗ Any → DONE (without retro)
  Reason: Learning required
```

## Revision Budget

### Maximum Revisions

**Budget:** 2 revision loops per slice

**Counter:**
- Start at 0
- Increment on each REVIEW → IMPLEMENT transition
- Reset on new slice

**Escalation:**
- If revision budget reaches 2, escalate to human
- Stop automated revision loop
- Require human decision on next steps

### Revision Loop Pattern

```
First Revision:
REVIEW → IMPLEMENT (budget: 0→1)
  → Address specific blockers
  → VERIFY
  → REVIEW

Second Revision:
REVIEW → IMPLEMENT (budget: 1→2)
  → Address remaining blockers
  → VERIFY
  → REVIEW

Budget Exhausted:
REVIEW (budget: 2)
  → ESCALATE TO HUMAN
  → Human decision required
```

### No Blind Retries

**Rule:** Each revision must address specific blockers identified in review.

**Forbidden:**
- "Try again" without specific blockers
- "Rework" without identifying issues
- Automatic retry without analysis

**Required:**
- Specific blockers listed in NEEDS_REWORK verdict
- Evidence of blockers addressed
- Verification that blockers fixed

## State Machine Enforcement

### Code-Based Enforcement

**Enforced by:**
- `scripts/harness/validate-state-transition.js` — Validates transitions
- Proof manifest verification — Prevents invalid transitions
- Evidence requirements — Blocks without proper evidence
- SHA-256 hash verification — Prevents fake evidence

**Not enforced by:**
- Agent prompts (agents can be wrong)
- Instructions (instructions can be ignored)
- Hopes (hopes are not verification)

### State Transition Validation

**Script:** `scripts/harness/validate-state-transition.js`

**Validates:**
- Current state is valid
- Next state is allowed
- Entry criteria met
- Exit criteria met
- Evidence requirements satisfied
- Revision budget available (if IMPLEMENT)

**Blocks if:**
- Invalid transition
- Evidence missing
- Proof manifests failed
- Budget exhausted

## State Machine in Context

### Integration with Agent System

**Agents Operate Within States:**
- **IMPLEMENT:** frontend-engineer, visual-plan-architect, test-engineer
- **VERIFY:** All agents (self-verification)
- **REVIEW:** fresh-review-agent, design-reviewer, product-manager
- **CLOSE:** release-manager, governance-auditor
- **RETRO:** All agents (learning documentation)

### Integration with Quality System

**Quality Gates in States:**
- **VERIFY:** Proof verification gates
- **REVIEW:** Evidence quality gates
- **CLOSE:** Release readiness gates

**Eval Creation:**
- In RETRO state (for failures)
- When revision budget exhausted
- When new failure mode discovered

## State Machine Monitoring

### Current State Tracking

**File:** `test-results/harness/<run-id>/state.json`

```json
{
  "runId": "uuid",
  "currentState": "IMPLEMENT",
  "previousStates": ["IMPLEMENT"],
  "revisionCount": 0,
  "revisionBudget": 2,
  "startedAt": "2026-06-10T18:00:00Z",
  "updatedAt": "2026-06-10T18:00:00Z"
}
```

### State Transition Logging

**Each transition logs:**
- From state
- To state
- Timestamp
- Justification
- Evidence references
- Revision count update

## Error Handling

### State Machine Errors

**Errors:**
- Invalid state transition
- Missing entry criteria
- Missing exit criteria
- Budget exhausted

**Handling:**
- Log error to state machine log
- Block transition
- Escalate to human if critical
- Create eval case for system improvement

### Recovery

**From Invalid State:**
- Identify how we got here
- Determine valid previous state
- Create eval case for prevention
- Update instructions to prevent recurrence

**From Budget Exhaustion:**
- Escalate to human
- Document blockers
- Human decides next action
- May require slice restart

## Related Documentation

- **[CASE_INSPIRED_AGENT_HARNESS.md](CASE_INSPIRED_AGENT_HARNESS.md)** — Harness system overview
- **[EVIDENCE_PROOF_PROTOCOL.md](EVIDENCE_PROOF_PROTOCOL.md)** — Proof requirements
- **[REVISION_LOOP_POLICY.md](REVISION_LOOP_POLICY.md)** — Revision budget rules
- **[../../CLAUDE.md](../../CLAUDE.md)** — Harness rules in main guide
- **[../../docs/PHASE_GATE_POLICY.md](../../docs/PHASE_GATE_POLICY.md)** — Harness gate

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Inspired By:** Nick Nisi's "Case" from WorkOS
