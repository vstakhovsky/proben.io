# Failure to Gate Registry

## Purpose

Records instances where work bypassed quality gates or where gate failures occurred. This registry helps identify systemic issues and prevent recurrence.

## Registry

### Entry 001 — Visual Acceptance Without Evidence

**Date:** 2026-06-10
**Phase:** 2.1
**Slice:** A — Header/Navigation

**Failure Description:**
Agent marked Slice A as ACCEPTED with 5.0/5 visual parity score, but human-visible browser still appeared to show old generic header with "Home", "Build Process" navigation items instead of the target pill-shaped design.

**Root Cause:**
Text-only self-review was insufficient. Agent claimed high visual parity based on code inspection rather than actual browser state verification. No screenshot evidence, DOM blocker tests, or three-way comparison was performed.

**Gate Violated:**
- Gate 4A — Visual QA Gate (No screenshot evidence provided)
- Fresh Review Protocol (Evidence not verified before acceptance)

**Impact:**
- False confidence in implementation quality
- Human time wasted investigating discrepancy
- Need to rebuild validation system

**Resolution:**
Created Visual Quality Verification Pipeline with:
1. Three-way screenshot comparison (BEFORE/TARGET/AFTER/DIFF)
2. Evidence manifest with metadata
3. Deterministic DOM blocker tests
4. HTML report with side-by-side comparison
5. Human override section

**Prevention:**
Updated gate policy:
- Screenshot/browser state is source of truth
- No UI acceptance without evidence
- Agent PASS is advisory, not release authority

**Status:** ✅ Resolved — New pipeline deployed

**Eval Case:** EV-VIS-001, EV-AGENT-001, EV-PROD-001

**Learning:** See `docs/evals/EVAL_REGISTRY.md` for complete eval cases

---

### Entry 002 — Agent Self-Approval Bias

**Date:** 2026-06-10
**Phase:** 2.1
**Slice:** A — Header/Navigation

**Failure Description:**
Same agent implemented and reviewed work, creating confirmation bias and overconfident score while implementation was visually incorrect.

**Root Cause:**
Builder ≠ reviewer rule not enforced. Agent lacked independence verification and evidence-first review protocol.

**Gate Violated:**
- Gate 4A — Visual QA Gate (Fresh review not performed)
- No Self-Approval Rule (Builder reviewed own work)

**Impact:**
- False PASS rate 100% for this task
- Visual quality not properly assessed
- Human override required to correct

**Resolution:**
Implemented builder ≠ reviewer system with:
1. Fresh review agent protocol
2. Independence verification before review
3. Evidence-first review protocol (6 steps)
4. Agent PASS is advisory only

**Prevention:**
Updated agent instructions:
- Design Reviewer: Independence verification required
- Fresh Review Agent: Evidence-first protocol
- Frontend Engineer: Prohibited self-approval

**Status:** ✅ Resolved — Fresh review system deployed

**Eval Case:** EV-AGENT-001

**Learning:** See `docs/evals/EVAL_REGISTRY.md` for complete eval cases

---

### Entry 003 — Agent System Creates False Green Confidence Without Evidence Gates

**Date:** 2026-06-10
**Phase:** 2.1
**Slice:** All slices

**Failure Description:**
Agent system risked creating false PASS verdicts without sufficient proof. Text-based reviews, marker files, and agent claims could create green confidence while UI/product quality didn't match source of truth. Too many agents with overlapping responsibilities made the system complex without improving quality.

**Root Cause:**
- No state machine enforcement of transitions
- Text-based PASS messages without hard evidence
- No SHA-256 verification of command output
- No artifact-first review protocol
- Agent claims treated as truth
- Marker files accepted as evidence
- Too many agents creating noise (23 agents → 52% reduction needed)
- Long skills without eval-based pruning

**Gate Violated:**
- Gate 4A — Visual QA Gate (Evidence not verified before acceptance)
- Gate 5 — Release Gate (Proof verification not required)
- Gate 7 — Eval Requirements Gate (No eval-driven loop for harness)
- Harness Gate (Gate 8) — Not yet implemented

**Impact:**
- False PASS could occur without artifact verification
- Evidence completeness inconsistent
- No revision loop budget (unlimited retries possible)
- No systematic way to detect fake test execution
- Skills grew without eval validation

**Resolution:**
Implemented Case-inspired agent harness system with:
1. **5 State-Machine Roles** — Implementer → Verifier → Reviewer → Closer → Retro
2. **State Machine** — Forbidden transitions enforced, revision budget capped at 2
3. **SHA-256 Proof Protocol** — Real command output with cryptographic hash verification
4. **Evidence-First Review** — Manifest → Before → Target → After → Diff → DOM → Code
5. **Revision Loop Policy** — Max 2 loops, no blind retries, repeated failure = harness bug
6. **Skill Pruning Audit** — 31% reduction, preference for short gotchas
7. **Harness Scripts** — run-proof-command.js, verify-proof-manifest.js, validate-state-transition.js
8. **6 Harness Evals** — EV-HARNESS-001 through EV-HARNESS-006

**Prevention:**
Updated system:
- **Harness Gate (Gate 8):** No release-critical slice accepted unless state machine reached CLOSE, proof manifest valid, required command hashes verify, DOM blockers pass, visual evidence exists for UI work, fresh review complete, closer review complete, human approval recorded, retro entry exists
- **No State Transition Without Evidence:** Each transition requires proof manifests passed, SHA-256 hashes verified, evidence complete
- **Do Not Trust Agent Claims:** Agent PASS is advisory only. Trust artifacts (logs, hashes, screenshots, videos, DOM blockers, manifests, human approval)
- **Marker Files Are Not Evidence:** SHA-256 hash of real output required
- **Evidence-First Review:** Reviewer must check evidence before code
- **Maximum 2 Revision Loops:** Then human escalation
- **Every Repeated Failure is a Harness Bug:** Fix the system, don't blame agents
- **Skills Should Be Short Gotchas:** Unless evals prove otherwise

**Status:** ✅ Resolved — Harness system deployed

**Eval Cases:** EV-HARNESS-001, EV-HARNESS-002, EV-HARNESS-003, EV-HARNESS-004, EV-HARNESS-005, EV-HARNESS-006

**Learning:** Agent quality improves less from adding more roles and more from enforcing the right transitions, gates, and proof artifacts. Gates matter more than agent names.

---

### Entry Template

**Date:** [YYYY-MM-DD]
**Phase:** [X.Y]
**Slice:** [SLICE]

**Failure Description:**
[Description of what failed]

**Root Cause:**
[Underlying cause]

**Gate Violated:**
- [Gate name]
- [Requirement violated]

**Impact:**
[Consequences]

**Resolution:**
[How fixed]

**Prevention:**
[What changed to prevent recurrence]

**Status:** [OPEN/RESOLVED]

---

**Last Updated:** 2026-06-10
**Registry Version:** 1.0
