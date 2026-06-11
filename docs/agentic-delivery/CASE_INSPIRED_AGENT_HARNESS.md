# Case-Inspired Agent Harness System

## Purpose

Implement a lightweight agent harness system inspired by Nick Nisi's "Case" approach from WorkOS. Enforce evidence-based workflow with code/state machines, not only prompts.

## Core Philosophy

> **Enforce with code, not prompts. Gates matter more than agent names.**
> **Do not trust agent claims. Trust artifacts.**

**Key Principles:**
1. **State machine enforcement** — Workflow progress through verifiable states
2. **Evidence requirements** — Every state transition requires proof
3. **SHA-256 verification** — Real command output, not marker files
4. **Before/after proof** — UI work requires visual evidence
5. **Revision budget** — Maximum 2 revision loops before human escalation
6. **Retro documentation** — Every failure creates learning entry
7. **Harness bug mindset** — Failures are harness bugs until proven otherwise

## From Agent Sprawl to Harness Model

### Old Model: Agent Sprawl

**Problems:**
- Too many agents with overlapping responsibilities
- Many skills with generic documentation
- Text-based PASS messages without hard evidence
- Green checkmarks creating false confidence
- Review by checklist without artifact verification
- Retry loops without structured feedback

**Result:** Quality issues could still occur even when all agents reported "PASS"

### New Model: Harness with 5 Roles

**Solution:**
Fewer roles organized around state machine transitions with enforced evidence gates.

**Principle:** Do not trust agent claims. Trust artifacts.

**Artifacts:**
- Logs (real command output)
- SHA-256 hashes (cryptographic proof)
- Screenshots (before/target/after for UI)
- Videos (where relevant)
- DOM blockers (deterministic tests)
- Manifests (metadata with hashes)
- Human approval (final authority)

## The 5 Roles

### 1. Implementer

**Maps to:** `frontend-engineer`, `builder-agent`

**Purpose:** Creates the change

**Allowed:**
- Write code
- Create UI
- Write docs
- Write tests
- Add test IDs for DOM blockers
- Capture evidence helpers

**NOT Allowed:**
- Final acceptance
- Self-scoring as ACCEPTED
- Proceeding to next slice without review
- Approving own work

**State:** IMPLEMENT

---

### 2. Verifier

**Maps to:** `test-engineer`, DOM blocker checker

**Purpose:** Verifies the change works

**Required Evidence:**
- Command logs (typecheck, tests, build)
- SHA-256 hashes of logs
- Exit codes === 0
- Screenshots (for UI work)
- DOM blocker results
- Visual reports (for UI work)
- Proof manifests

**NOT Allowed:**
- Accepting product quality alone
- Skipping proof verification
- Proceeding with missing evidence

**State:** VERIFY

---

### 3. Reviewer

**Maps to:** `fresh-review-agent`, `design-reviewer`

**Purpose:** Checks quality against source of truth

**Review Order (Evidence-First):**
1. Manifest (metadata)
2. Before screenshot
3. Target screenshot
4. After screenshot
5. Diff / side-by-side report
6. DOM blocker results
7. Product/design rubric
8. Code diff (scope verification)

**Allowed:**
- Block on visual grounds
- Block on missing evidence
- Block on P0 blockers
- Return verdict: ACCEPTED/NEEDS_REWORK/REJECTED

**NOT Allowed:**
- Inspect code first and infer quality
- Accept without screenshot evidence (for UI)
- Accept if browser state contradicts verdict

**State:** REVIEW

---

### 4. Closer

**Maps to:** `product-manager`, `release-manager`, `principal-architect` (conditional)

**Purpose:** Checks release readiness

**Validates:**
- PM/product alignment
- Design acceptance
- Architecture/security/QA risks
- Evidence package completeness
- Revision count (≤ 2)
- Release risk

**Allowed:**
- Block release on product grounds
- Block release on design grounds
- Block release on architecture grounds
- Block release on security grounds
- Require additional evidence

**NOT Allowed:**
- Approve without complete evidence package
- Approve without human review
- Override reviewer blockers without evidence

**State:** CLOSE

---

### 5. Retro

**Maps to:** `governance-auditor`

**Purpose:** Reviews the whole run for learning

**Questions:**
- Did any agent create a false PASS?
- Did any gate fail to block?
- Did the system get stuck in loops?
- Did skills help or add noise?
- What gotcha/eval/gate should be added?
- Should any agent or skill be removed?

**Output:**
- Retro entry in build learning log
- Updated gotchas (if needed)
- New eval cases (if failure)
- Gate updates (if needed)
- Agent/skill change recommendations

**State:** RETRO

---

## State Machine Overview

### States

```
IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO → DONE
```

### Allowed Transitions

```
IMPLEMENT → VERIFY
  ↓ (proof manifest passes)
VERIFY → REVIEW
  ↓ (review passes)
REVIEW → CLOSE
  ↓ (evidence package complete)
CLOSE → RETRO
  ↓ (retro entry written)
RETRO → DONE

REVIEW → IMPLEMENT (if review fails and revision budget < 2)
```

### Forbidden Transitions

```
✗ IMPLEMENT → CLOSE (no review)
✗ IMPLEMENT → DONE (no retro)
✗ VERIFY → CLOSE (no review)
✗ REVIEW → DONE (no close evidence)
✗ Any → DONE (without retro for failures)
```

### Revision Budget

- **Maximum 2 revision loops** per slice
- **Stop after 2 failures** and ask human for decision
- **No blind retries** — each revision must address specific blockers
- **Budget reset** — New slice starts with budget of 2

## Proof System

### Proof Command Execution

**Script:** `scripts/harness/run-proof-command.js`

**Usage:**
```bash
node scripts/harness/run-proof-command.js --name typecheck -- npm run type-check
node scripts/harness/run-proof-command.js --name tests -- npm test
node scripts/harness/run-proof-command.js --name build -- npm run build
```

**Output:**
- `test-results/harness/<run-id>/<command-name>.log` — Real command output
- `test-results/harness/<run-id>/proof-manifest.json` — Proof metadata

### Proof Manifest Structure

```json
{
  "runId": "uuid",
  "command": "npm run typecheck",
  "startedAt": "2026-06-10T18:00:00Z",
  "finishedAt": "2026-06-10T18:00:05Z",
  "durationMs": 5000,
  "exitCode": 0,
  "logPath": "test-results/harness/<run-id>/typecheck.log",
  "sha256": "abc123...",
  "status": "PASSED"
}
```

### SHA-256 Verification

**Critical:** A marker file alone is not evidence. The proof must be derived from real command output.

**Verification process:**
1. Read proof manifest
2. Recompute SHA-256 from log file
3. Verify hashes match
4. Verify exitCode === 0 for required commands
5. Verify manifest is not stale
6. Fail if manifest claims success but output is missing

**Script:** `scripts/harness/verify-proof-manifest.js`

## Required Commands for Release

**For UI Work (release-critical):**
1. `typecheck` — TypeScript compilation
2. `tests` — Test execution
3. `build` — Build verification
4. `DOM blocker test` — Required/forbidden elements
5. `visual evidence report` — Screenshot comparison

**All commands must:**
- Exit with code 0 (for required commands)
- Have verifiable SHA-256 hash
- Have real output captured
- Be within time threshold

## Visual Evidence Requirements

**For UI Work:**

**Required Evidence:**
1. **BEFORE screenshot** — Pre-implementation state
2. **TARGET screenshot** — Approved prototype
3. **AFTER screenshot** — Post-implementation state
4. **DIFF or side-by-side report** — Visual comparison
5. **DOM blocker results** — Required/forbidden element tests
6. **Visual report** — HTML report with checklist
7. **Human override section** — Final approval field

**Optional:**
- **Playwright before/after video** — Dynamic evidence

**Rule:** Do not inspect code first for UI acceptance. Evidence first, code second.

## State Transition Requirements

### IMPLEMENT → VERIFY

**Required:**
- Implementation complete
- Tests written and passing
- DOM blockers passing (if UI work)
- Evidence captured (if UI work)

**Blocked if:**
- Tests failing
- Missing evidence
- DOM blockers failing

### VERIFY → REVIEW

**Required:**
- All required proof manifests PASSED
- SHA-256 hashes verified
- Real output captured (not marker files)
- Evidence complete (if UI work)

**Blocked if:**
- Any proof manifest FAILED
- Hash verification failed
- Evidence incomplete

### REVIEW → CLOSE

**Required:**
- Fresh review complete
- Evidence verified
- No blockers found
- Review verdict: ACCEPTED

**Alternative (REVIEW → IMPLEMENT):**
- Review verdict: NEEDS_REWORK
- Revision budget < 2
- Specific blockers identified

**Blocked if:**
- Review verdict: REJECTED
- Revision budget exhausted (2 failures)

### CLOSE → RETRO

**Required:**
- Evidence package complete
- All proofs verified
- Human approval recorded

**Always:**
- Retro entry created
- Learning documented
- Eval case if failure occurred

## Gotchas System

**Purpose:** Keep concise, high-signal gotchas that agents reliably get wrong.

**Documentation:** `docs/gotchas/PROBEN_AGENT_GOTCHAS.md`

**Initial Gotchas:**
1. Green tests do not mean visual acceptance
2. Generic SaaS layout is not acceptable for Phase 2.1
3. Header must match Proben MVP 6 direction
4. "Home" and "Build Process" must not appear in landing header for Slice A
5. "MEETING READINESS", "Log in", and "Run readiness check" are required
6. Builder agents cannot approve their own work
7. Agent PASS is advisory until evidence passes
8. Screenshot/browser state beats text verdict
9. If any P0 blocker fails, visual score cannot exceed 2.9/5
10. No UI slice proceeds without human approval

**Rule:** If a skill is long but does not improve eval results, prune it.

## Skill Pruning

**Purpose:** Reduce skill bloat, keep only high-signal gotchas.

**Audit:** `docs/agent-governance/SKILL_PRUNING_AUDIT.md`

**Criteria:**
- Does it prevent a known failure?
- Does it create evidence?
- Does it reduce false PASS?
- Does it shorten review time?
- Does it improve eval results?
- Does it add noise?

**Decision Categories:**
- **KEEP** — Prevents failures, improves evals
- **REWRITE AS GOTCHA** — Useful but too long, condense
- **MERGE** — Overlaps with other skill/gotcha
- **DISABLE** — Not currently useful
- **DELETE** — Creates noise without value

## Retro Stage

**Purpose:** Document learning from every slice, whether success or failure.

**Script:** `scripts/harness/create-retro-entry.js`

**Output:** `docs/product-build-history/retro/<run-id>.md`

**Retro Entry Must Include:**
- What was attempted
- What passed
- What failed
- Repeated tool loops
- Missing evidence
- Wrong assumptions
- New gotcha needed
- New eval needed
- New gate needed
- Whether agent/skill should be changed

**Learning Integration:**
- Update `BUILD_LEARNING_DECISION_LOG.md`
- Update `LESSONS_LEARNED.md`
- Create eval case if failure occurred
- Update `FAILURE_TO_GATE_REGISTRY.md`

## Harness Report

**Script:** `scripts/harness/generate-harness-report.js`

**Output:** `test-results/harness/<run-id>/harness-report.html`

**Report Contents:**
- Current state
- Completed gates
- Blocked gates
- Proof manifest links
- Visual evidence links
- Revision count
- Final verdict
- Retro entry link

## Harness Rules (CLAUDE.md)

**Case-inspired Harness Rules:**

1. **Enforce with code, not prompts** — State machine in code, not just instructions
2. **Gates matter more than agent names** — State transitions, not agent roles
3. **No state transition without evidence** — Proof required for transition
4. **Marker files are not evidence** — Real output with SHA-256 hash only
5. **Proof must include real command output and SHA-256 hash** — No fake markers
6. **UI proof must include before/target/after evidence** — Visual verification required
7. **Builder cannot approve own work** — No self-approval
8. **Reviewer checks evidence before code** — Evidence-first protocol
9. **Close stage cannot run without complete evidence package** — Evidence completeness
10. **Retro stage must record failures and update gotchas/evals/gates** — Learning required
11. **Maximum 2 revision loops before human escalation** — No blind retries
12. **Every failure is a harness bug until proven otherwise** — System mindset

## Harness Gate (Phase Gate Policy)

**A release-critical slice cannot be accepted unless:**

- State machine reached CLOSE
- Proof manifest is valid
- Required command hashes verified
- DOM blockers pass
- Visual evidence exists for UI work
- Fresh review is complete
- Human approval is recorded
- Retro entry exists for any failure/rework

## Integration with Existing Systems

**Integrates with:**
- **Visual Agentic Delivery System** — Evidence-based review
- **Eval System** — Eval cases from failures
- **Agent Governance** — State machine enforcement
- **Build Learning Log** — Retro integration

**Enhances:**
- **State transitions** — Enforced by code, not just prompts
- **Proof verification** — SHA-256 hashes prevent fake evidence
- **Revision budget** — Prevents blind retry loops
- **Retro documentation** — Systematic learning

## Related Documentation

- **[AGENT_STATE_MACHINE.md](AGENT_STATE_MACHINE.md)** — State machine details
- **[EVIDENCE_PROOF_PROTOCOL.md](EVIDENCE_PROOF_PROTOCOL.md)** — Proof requirements
- **[REVISION_LOOP_POLICY.md](REVISION_LOOP_POLICY.md)** — Revision budget rules
- **[../../docs/gotchas/PROBEN_AGENT_GOTCHAS.md](../../docs/gotchas/PROBEN_AGENT_GOTCHAS.md)** — Gotchas
- **[../../docs/agent-governance/SKILL_PRUNING_AUDIT.md](../../docs/agent-governance/SKILL_PRUNING_AUDIT.md)** — Skill audit
- **[../../CLAUDE.md](../../CLAUDE.md)** — Harness rules
- **[../../docs/PHASE_GATE_POLICY.md](../../docs/PHASE_GATE_POLICY.md)** — Harness gate

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Inspired By:** Nick Nisi's "Case" from WorkOS
