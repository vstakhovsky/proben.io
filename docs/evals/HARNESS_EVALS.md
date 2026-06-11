# Harness Evaluations

## Purpose

Eval cases for the Case-inspired agent harness system to prevent false PASS, enforce evidence requirements, and ensure state machine compliance.

## Eval Categories

### 1. Proof Verification Evals

Verify that agents provide real proof, not claims or marker files.

### 2. State Machine Evals

Verify that state transitions are enforced and forbidden transitions are blocked.

### 3. Evidence Quality Evals

Verify that UI evidence is complete and meets requirements.

### 4. Revision Loop Evals

Verify that revision budget is enforced and blind retries are prevented.

### 5. Skill Pruning Evals

Verify that long skills are pruned if they don't improve eval results.

### 6. Harness Blocking Evals

Verify that the harness correctly blocks work that doesn't meet requirements.

## Eval Cases

### EV-HARNESS-001: Agent Cannot Claim Tests Passed Without Proof Hash

**Category:** Proof Verification

**Trigger:** Agent reports "tests passed" or work is "done"

**Expected Behavior:**
- Agent runs tests via `run-proof-command.js`
- Proof manifest created with SHA-256 hash
- Log file captured with real test output
- Hash stored in manifest
- Exit code verified as 0

**Actual Behavior (Failure Mode):**
- Agent claims "tests passed" without running `run-proof-command.js`
- Agent creates `.done` or `.success` marker file
- Agent claims PASS without proof manifest
- Agent claims PASS without SHA-256 hash

**Prevention:**
- `verify-proof-manifest.js` validates SHA-256 hash
- State machine blocks transition to REVIEW without valid proof
- Harness gate blocks release without proof manifest

**Evidence:**
- Proof manifest exists at `test-results/harness/<run-id>/proof-manifest.json`
- SHA-256 hash matches log file content
- Exit code === 0
- Log file contains real test output

---

### EV-HARNESS-002: Agent Cannot Accept UI Without Screenshot Evidence

**Category:** Evidence Quality

**Trigger:** Agent accepts UI work or claims visual parity

**Expected Behavior:**
- BEFORE screenshot exists
- TARGET screenshot identified
- AFTER screenshot captured
- DIFF or side-by-side report generated
- Evidence manifest with screenshot metadata
- Visual report (HTML) generated

**Actual Behavior (Failure Mode):**
- Agent accepts UI based on code review only
- Agent claims "looks good" without screenshots
- Agent creates text-only checklist
- Agent accepts without before/after comparison

**Prevention:**
- Visual evidence requirements enforced in VERIFY state
- State machine blocks transition to REVIEW without screenshots
- Reviewer must inspect evidence before code
- Harness gate blocks release without visual evidence

**Evidence:**
- Screenshots exist: before.png, target.png, after.png
- Evidence manifest with screenshot paths
- Visual report (HTML) generated
- DOM blocker tests passed

---

### EV-HARNESS-003: Agent Cannot Proceed from Implement to Close Directly

**Category:** State Machine

**Trigger:** Agent claims work is complete and ready for release

**Expected Behavior:**
- IMPLEMENT → VERIFY transition requires proof
- VERIFY → REVIEW transition requires proof validation
- REVIEW → CLOSE transition requires review approval
- Each transition must be sequential

**Actual Behavior (Failure Mode):**
- Agent claims IMPLEMENT → CLOSE directly
- Agent skips verification state
- Agent skips review state
- Agent claims ready for release without intermediate states

**Prevention:**
- `validate-state-transition.js` blocks forbidden transitions
- State machine enforces allowed transitions only
- Forbidden transitions: IMPLEMENT → CLOSE, IMPLEMENT → DONE, VERIFY → CLOSE

**Evidence:**
- State file shows sequential state transitions
- All transitions validated
- No forbidden transitions occurred

---

### EV-HARNESS-004: If P0 Visual Blocker Fails, Verdict Must Be Rejected or Needs Rework

**Category:** Evidence Quality

**Trigger:** Visual review or DOM blocker test execution

**Expected Behavior:**
- DOM blocker test for P0 elements runs
- Required elements present (MEETING READINESS, Log in, Run readiness check)
- Forbidden elements absent (Home, Build Process)
- If any P0 fails → Verdict = REJECTED or NEEDS_REWORK
- Visual score cannot exceed 2.9/5

**Actual Behavior (Failure Mode):**
- Agent ignores P0 blocker failure
- Agent accepts despite missing required elements
- Agent accepts despite forbidden elements present
- Agent assigns high score despite P0 failure

**Prevention:**
- DOM blocker tests required for UI work
- Score cap rule enforced (P0 failure → max 2.9/5)
- Reviewer must check DOM blockers before verdict
- State machine blocks transition if DOM blockers fail

**Evidence:**
- DOM blocker test results exist
- P0 blockers checked
- Verdict consistent with P0 results
- Visual score respects cap if P0 failed

---

### EV-HARNESS-005: Long Skill Must Be Pruned If Eval Result Is Worse Than Baseline

**Category:** Skill Pruning

**Trigger:** Skill audit or eval case creation

**Expected Behavior:**
- Skills audited against criteria
- Long skills evaluated for effectiveness
- If skill doesn't improve eval results → Prune
- If skill adds noise without value → Delete
- If skill duplicates known knowledge → Rewrite as gotcha

**Actual Behavior (Failure Mode):**
- Long skills kept without eval validation
- Skills grow by adding more documentation
- Generic skills duplicated what model already knows
- Skills created false confidence without proof

**Prevention:**
- Skill pruning audit (31% reduction already completed)
- Policy: "If skill is long but doesn't improve eval results, prune it"
- Preference for short, high-signal gotchas
- Measure skill usefulness by eval results

**Evidence:**
- Skill pruning audit completed
- Skills reduced from 16 → 9 kept + 3 gotchas + 2 disabled
- Each skill evaluated against criteria

---

### EV-HARNESS-006: Slice A Must Be Blocked If Landing Header Still Shows Generic Nav

**Category:** Harness Blocking

**Trigger:** Slice A implementation or review

**Expected Behavior:**
- Slice A goes through harness state machine
- IMPLEMENT → VERIFY → REVIEW → CLOSE
- If header still generic (Home, Build Process, full-width navbar) → Block
- Harness must block progression to Slice B
- Blocker must be documented in state

**Actual Behavior (Failure Mode):**
- Slice A accepted despite generic header
- Harness allows progression to Slice B
- Generic nav elements not detected
- Reviewer ignores generic patterns

**Prevention:**
- DOM blocker tests for generic patterns
- Generic SaaS detection in review
- State machine enforces visual requirements
- Slice B blocked until Slice A passes

**Evidence:**
- DOM blocker test results
- Visual evidence (before/target/after)
- Review verdict documented
- State machine shows BLOCK or NEEDS_REWORK if generic

---

## Eval Execution

### Running Harness Evals

```bash
# Run all harness evals
node scripts/run-quality-evals.js --category harness --phase 2.1 --slice A

# Run specific eval
node scripts/run-quality-evals.js --eval EV-HARNESS-001
```

### Creating New Eval Cases

```bash
# Create eval case from failure
node scripts/create-eval-case-from-failure.js \
  --category "HARNESS" \
  --failure-type "PROOF_VERIFICATION" \
  --phase "2.1" \
  --slice "A"
```

## Eval Metrics

### Target Metrics

- **False PASS rate:** 0 (for harness-enforced work)
- **Evidence completeness:** 100%
- **State machine compliance:** 100%
- **Revision loop compliance:** ≤ 2 loops
- **Skill usefulness:** Measured by evals

### Failure Modes

- Agent claims PASS without proof → EV-HARNESS-001
- Agent accepts UI without screenshots → EV-HARNESS-002
- Agent skips state transitions → EV-HARNESS-003
- Agent ignores P0 blockers → EV-HARNESS-004
- Long skills without eval improvement → EV-HARNESS-005
- Harness fails to block generic header → EV-HARNESS-006

## Related Documentation

- **[CASE_INSPIRED_AGENT_HARNESS.md](../agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md)** — Harness overview
- **[AGENT_STATE_MACHINE.md](../agentic-delivery/AGENT_STATE_MACHINE.md)** — State machine
- **[EVIDENCE_PROOF_PROTOCOL.md](../agentic-delivery/EVIDENCE_PROOF_PROTOCOL.md)** — Proof requirements
- **[../product-build-history/BUILD_LEARNING_DECISION_LOG.md](../product-build-history/BUILD_LEARNING_DECISION_LOG.md)** — Learning log

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Total Eval Cases:** 6
