# Background Task Harness

## Purpose

Define the background task harness system for Proben.io. Inspired by agent workflow monitors and Nick Nisi's "Case" from WorkOS.

## Overview

Proben.io uses a Case-inspired agent harness that enforces evidence-based workflow through state machines, gates, and proof verification.

### Core Philosophy

> **Enforce with code, not prompts. Gates matter more than agent names.**

**Key Principles:**
1. State machine enforcement — Workflow progress through verifiable states
2. Evidence requirements — Every state transition requires proof with SHA-256 verification
3. SHA-256 verification — Real command output, not marker files
4. Before/after proof — UI work requires visual evidence
5. Revision budget — Maximum 2 revision loops before human escalation
6. Retro documentation — Every failure creates a learning entry
7. Gotchas over skills — Keep concise handwritten gotchas

### State Machine

```
IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO → DONE
```

### Role Mapping

| State | Role | Authority Level | Mapped Agents |
|-------|------|-----------------|---------------|
| IMPLEMENT | Implementer | Level 1 | frontend-engineer, visual-plan-architect, test-eval-engineer |
| VERIFY | Verifier | Level 1 | test-eval-engineer, DOM blocker checker |
| REVIEW | Reviewer | Level 2 | fresh-review-agent, principal-design-reviewer, principal-product-manager |
| CLOSE | Closer | Level 3 | principal-product-manager, cto-bar-raiser, principal-architect (conditional) |
| RETRO | Retro | Level 4 | agent-governance-auditor |

## Workflow States

### IMPLEMENT

**Role:** Implementer (Level 1 - Builder)

**Purpose:** Build and implement the slice.

**Activities:**
- Write code according to visual plan
- Create tests for implementation
- Run local checks
- Add test IDs for DOM blockers (if UI work)
- Prepare evidence capture helpers (if UI work)

**Entry Criteria:**
- Visual plan approved (for UI work)
- Requirements defined
- Test plan ready

**Exit Criteria:**
- Implementation complete
- Tests passing locally
- Evidence capture helpers ready (if UI work)

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
- Skip verification state

### VERIFY

**Role:** Verifier (Level 1 - Verification)

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

### REVIEW

**Role:** Reviewer (Level 2 - Principal Reviewer)

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

### CLOSE

**Role:** Closer (Level 3 - CTO Bar Raiser)

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

### RETRO

**Role:** Retro (Level 4 - System Governance)

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

### DONE

**Purpose:** Slice completion.

**Status:**
- Slice accepted
- All gates passed
- Evidence complete
- Retro documented

**Final State:** No further states.

## Evidence Requirements

### For All Work

**Minimum Required:**
1. `typecheck` — TypeScript compilation
2. `tests` — Test execution
3. `build` — Build verification

**Proof Manifest Structure:**
```json
{
  "runId": "uuid-v4",
  "command": "npm run typecheck",
  "startedAt": "2026-06-10T18:00:00.000Z",
  "finishedAt": "2026-06-10T18:00:05.123Z",
  "durationMs": 5123,
  "exitCode": 0,
  "logPath": "test-results/harness/abc123/typecheck.log",
  "sha256": "a1b2c3d4e5f6...",
  "status": "PASSED"
}
```

### For UI Work (Release-Critical)

**Required:**
1. `typecheck` — TypeScript compilation
2. `tests` — Test execution
3. `build` — Build verification
4. `DOM blocker test` — Required/forbidden elements
5. `visual evidence report` — Screenshot comparison

**Visual Evidence Requirements:**
- BEFORE screenshot
- TARGET screenshot
- AFTER screenshot
- DIFF or side-by-side report
- DOM blocker results
- Visual report
- Human override section

## Revision Budget

### Maximum Revisions

**Budget:** 2 revision loops per slice

**Counter:**
- Start at 0 for each slice
- Increment on each REVIEW → IMPLEMENT transition
- Reset on new slice

**Escalation:**
- If revision budget reaches 2, escalate to human
- Stop automated revision loop
- Require human decision on next steps

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

## Hard Rules

1. **No state transition without evidence** — Proof manifests required
2. **No UI acceptance without before/target/after evidence** — Screenshots mandatory
3. **No Slice B until Slice A passes harness** — Sequential slice progression
4. **Revision loops max 2** — No blind retries
5. **Every repeated failure is a harness bug** — System improvement required
6. **Marker files are not evidence** — SHA-256 hash of real output only
7. **Agent PASS is advisory only** — Evidence verification required
8. **Reviewer must inspect evidence before code** — Evidence-first protocol
9. **Gates matter more than agent names** — State machine enforcement
10. **Do not trust agent claims** — Trust artifacts

## KPIs

**Target Metrics:**
- False PASS rate: 0
- Evidence completeness: 100%
- Revision loops: ≤ 2
- Skill usefulness: Measured by evals
- State machine: Enforced
- SHA-256 verification: Required

## Scripts

**Run Proof Command:**
```bash
node scripts/harness/run-proof-command.js --name <command-name> -- <command>
```

**Verify Proof Manifest:**
```bash
node scripts/harness/verify-proof-manifest.js <run-id>
```

**Validate State Transition:**
```bash
node scripts/harness/validate-state-transition.js --from IMPLEMENT --to VERIFY --run-id <run-id>
```

**Generate Background Task Report:**
```bash
node scripts/harness/generate-background-task-report.js
```

## Related Documentation

- **[AGENT_STATE_MACHINE.md](AGENT_STATE_MACHINE.md)** — State machine details
- **[EVIDENCE_PROOF_PROTOCOL.md](EVIDENCE_PROOF_PROTOCOL.md)** — Proof requirements
- **[REVISION_LOOP_POLICY.md](REVISION_LOOP_POLICY.md)** — Revision budget rules
- **[AGENT_PHASE_DASHBOARD.md](AGENT_PHASE_DASHBOARD.md)** — Phase dashboard
- **[../../CLAUDE.md](../../CLAUDE.md)** — Harness rules
- **[../../docs/PHASE_GATE_POLICY.md](../../docs/PHASE_GATE_POLICY.md)** — Harness gate

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Inspired By:** Nick Nisi's "Case" from WorkOS
