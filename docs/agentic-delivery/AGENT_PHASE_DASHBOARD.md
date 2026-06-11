# Agent Phase Dashboard

## Purpose

Define the agent phase dashboard for visualizing workflow state, phases, gates, roles, evidence, and KPIs. Inspired by background task workflow monitors.

## Dashboard Overview

The agent phase dashboard provides real-time visibility into the agent harness workflow, showing:

- Workflow name and status
- Phase list with current state
- Role mapping
- Gates between phases
- Evidence artifacts
- KPIs
- Current slice status
- Retro notes
- Next safe step

## Workflow Status

### Status Values

- **RUNNING** — Workflow in progress
- **BLOCKED** — Blocked by dependency or gate failure
- **NEEDS_REWORK** — Review identified blockers, revision in progress
- **ACCEPTED** — Slice accepted, moving to RETRO
- **REJECTED** — Slice rejected, blocked from progression

### Current Workflow

**Workflow:** Phase 2.1 Design Parity

**Status:** RUNNING

**Started:** 2026-06-10

**Current Phase:** IMPLEMENT

## Phases

### Phase 1: IMPLEMENT

**Role:** Implementer (Level 1 - Builder)

**Status:** RUNNING

**Activities:**
- Write code according to visual plan
- Create tests for implementation
- Run local checks
- Add test IDs for DOM blockers (if UI work)
- Prepare evidence capture helpers (if UI work)

**Entry Criteria:**
- ✅ Visual plan approved (for UI work)
- ✅ Requirements defined
- ✅ Test plan ready

**Exit Criteria:**
- ⏳ Implementation complete
- ⏳ Tests passing locally
- ⏳ Evidence capture helpers ready (if UI work)

**Evidence Artifacts:**
- Code implementation (pending)
- Test files (pending)
- Local test results (pending)

**Gate to Next Phase:** Implementation complete → VERIFY

---

### Phase 2: VERIFY

**Role:** Verifier (Level 1 - Verification)

**Status:** PENDING

**Activities:**
- Run proof commands (typecheck, tests, build)
- Generate proof manifests with SHA-256 hashes
- Verify DOM blockers (if UI work)
- Capture visual evidence (if UI work)
- Validate state transition requirements

**Entry Criteria:**
- ⏳ IMPLEMENT state complete
- ⏳ Implementation ready for verification

**Exit Criteria:**
- ⏳ All proof manifests PASSED
- ⏳ SHA-256 hashes verified
- ⏳ Evidence complete (if UI work)
- ⏳ No blockers found

**Evidence Artifacts:**
- typecheck.log (pending)
- tests.log (pending)
- build.log (pending)
- proof-manifest.json (pending)
- screenshots (pending, if UI)
- dom-blocker-results.json (pending, if UI)

**Gate to Next Phase:** All proof manifests PASSED → REVIEW

---

### Phase 3: REVIEW

**Role:** Reviewer (Level 2 - Principal Reviewer)

**Status:** PENDING

**Activities:**
- Fresh review of work (builder ≠ reviewer)
- Evidence verification
- Comparison against source of truth
- Risk scoring
- Verdict determination (ACCEPTED/NEEDS_REWORK/REJECTED)

**Entry Criteria:**
- ⏳ VERIFY state complete
- ⏳ All proof manifests PASSED
- ⏳ Evidence complete

**Exit Criteria:**
- ⏳ Review complete
- ⏳ Verdict documented
- ⏳ Evidence verified

**Evidence Artifacts:**
- Review verdict (pending)
- Blocker list (pending, if NEEDS_REWORK/REJECTED)
- Evidence verification report (pending)
- Risk score (pending, if applicable)

**Gate to Next Phase:**
- ACCEPTED → CLOSE
- NEEDS_REWORK + budget < 2 → IMPLEMENT

---

### Phase 4: CLOSE

**Role:** Closer (Level 3 - Release Manager)

**Status:** PENDING

**Activities:**
- Verify all gates passed
- Check evidence package completeness
- Verify human approval
- Generate harness report
- Prepare retro entry

**Entry Criteria:**
- ⏳ REVIEW state complete
- ⏳ Review verdict: ACCEPTED
- ⏳ Evidence package complete

**Exit Criteria:**
- ⏳ All gates passed
- ⏳ Evidence verified
- ⏳ Human approval recorded
- ⏳ Harness report generated

**Evidence Artifacts:**
- Close validation report (pending)
- Evidence package verification (pending)
- Human approval record (pending)
- Harness report (pending)

**Gate to Next Phase:** CLOSE complete → RETRO

---

### Phase 5: RETRO

**Role:** Retro (Level 4 - System Governance)

**Status:** PENDING

**Activities:**
- Create retro entry
- Document what passed/failed
- Identify new gotchas
- Update eval cases (if failure)
- Update gates (if needed)
- Update gotchas (if needed)

**Entry Criteria:**
- ⏳ CLOSE state complete
- ⏳ Evidence package complete

**Exit Criteria:**
- ⏳ Retro entry written
- ⏳ Learning documented
- ⏳ Eval cases updated (if applicable)
- ⏳ Gates updated (if applicable)

**Evidence Artifacts:**
- Retro entry (pending)
- Eval cases (pending, if new failure)
- Gate updates (pending, if needed)
- Gotcha updates (pending, if needed)

**Gate to Next Phase:** RETRO complete → DONE

---

### Phase 6: DONE

**Status:** PENDING

**Status:**
- ⏳ Slice accepted
- ⏳ All gates passed
- ⏳ Evidence complete
- ⏳ Retro documented

**Final State:** No further phases.

## Role Mapping

| Role | Level | Mapped Agents | Current Phase |
|------|-------|---------------|---------------|
| Implementer | Level 1 | frontend-engineer, visual-plan-architect, test-engineer | IMPLEMENT |
| Verifier | Level 1 | test-engineer, DOM blocker checker | VERIFY |
| Reviewer | Level 2 | fresh-review-agent, design-reviewer, product-manager | REVIEW |
| Closer | Level 3 | product-manager, release-manager, principal-architect (conditional) | CLOSE |
| Retro | Level 4 | governance-auditor | RETRO |

## Gates

### Gate 1: IMPLEMENT → VERIFY

**Condition:** Implementation complete

**Checks:**
- Implementation complete
- Tests passing locally
- Evidence capture helpers ready (if UI work)

**Status:** ⏳ PENDING

---

### Gate 2: VERIFY → REVIEW

**Condition:** All proof manifests PASSED

**Checks:**
- All proof manifests PASSED
- SHA-256 hashes verified
- Evidence complete (if UI work)
- No blockers found

**Status:** ⏳ PENDING

---

### Gate 3: REVIEW → CLOSE

**Condition:** Review verdict ACCEPTED

**Checks:**
- Review complete
- Verdict: ACCEPTED
- Evidence verified
- No outstanding blockers

**Status:** ⏳ PENDING

---

### Gate 4: REVIEW → IMPLEMENT

**Condition:** Review verdict NEEDS_REWORK and budget < 2

**Checks:**
- Review verdict: NEEDS_REWORK
- Specific blockers identified
- Revision budget < 2

**Status:** ⏳ PENDING

---

### Gate 5: CLOSE → RETRO

**Condition:** CLOSE complete

**Checks:**
- All gates passed
- Evidence package complete
- Human approval recorded
- Harness report generated

**Status:** ⏳ PENDING

---

### Gate 6: RETRO → DONE

**Condition:** RETRO complete

**Checks:**
- Retro entry written
- Learning documented
- Eval cases updated (if applicable)
- Gates updated (if applicable)

**Status:** ⏳ PENDING

## Evidence Artifacts

### Required for All Work

- ✅ typecheck.log
- ✅ tests.log
- ✅ build.log
- ✅ proof-manifest.json

### Required for UI Work

- ⏳ before.png
- ⏳ target.png
- ⏳ after.png
- ⏳ diff.html or side-by-side-report.html
- ⏳ dom-blocker-results.json
- ⏳ visual-review-report.html

## KPIs

### False PASS Rate

**Target:** 0

**Current:** Measuring

**Status:** ⏳ TRACKING

---

### Evidence Completeness

**Target:** 100%

**Current:** Measuring

**Status:** ⏳ TRACKING

---

### Revision Loops

**Target:** ≤ 2

**Current:** 0

**Status:** ✅ WITHIN BUDGET

---

### Skill Usefulness

**Target:** Measured by evals

**Current:** Measuring

**Status:** ⏳ TRACKING

## Current Slice Status

### Slice A: Phase 2.1 Header/Navigation Parity

**Status:** RUNNING

**Phase:** IMPLEMENT

**Target:** Proben MVP 6 visual direction

**Revision Count:** 0

**Revision Budget:** 2

**Blocker:** Generic SaaS output rejection

---

### Slice B: Phase 2.1 Hero Section Parity

**Status:** BLOCKED

**Blocker:** Slice A must pass harness before Slice B can start

**Reason:** Sequential slice progression required

---

## Retro Notes

### Latest Retro Entries

- BLD-008 — Replace Agent Sprawl with Case-Inspired State Machine and Evidence Gates (2026-06-10)
- BLD-007 — AI Build Speed Requires Experimentation Infrastructure (2026-06-10)
- BLD-006 — Agent Sprawl Creates Process Noise (2026-06-10)

## Next Safe Step

**For Slice A:**
1. Complete IMPLEMENT phase
2. Proceed to VERIFY phase
3. Generate proof manifests
4. Capture visual evidence
5. Submit for REVIEW

**For Slice B:**
- ⏸️ **BLOCKED** — Wait for Slice A to pass harness

## Generating Dashboard Report

```bash
# Generate background task report
node scripts/harness/generate-background-task-report.js

# View report
open test-results/harness/latest/background-task-report.html
```

## Related Documentation

- **[BACKGROUND_TASK_HARNESS.md](BACKGROUND_TASK_HARNESS.md)** — Harness system
- **[CASE_INSPIRED_AGENT_HARNESS.md](CASE_INSPIRED_AGENT_HARNESS.md)** — Case-inspired harness
- **[AGENT_STATE_MACHINE.md](AGENT_STATE_MACHINE.md)** — State machine details
- **[EVIDENCE_PROOF_PROTOCOL.md](EVIDENCE_PROOF_PROTOCOL.md)** — Proof requirements
- **[REVISION_LOOP_POLICY.md](REVISION_LOOP_POLICY.md)** — Revision budget rules

---

**Last Updated:** 2026-06-10
**Current Phase:** 2.1 Design Parity
**Current Slice:** A (Header/Navigation)
**Overall Status:** RUNNING
