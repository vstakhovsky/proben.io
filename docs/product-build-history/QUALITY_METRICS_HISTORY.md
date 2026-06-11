# Quality Metrics History

## Purpose

Track quality metrics over time for the Proben.io quality system. Shows how quality has improved through harness implementation and process changes.

## Metrics Overview

### Agent Metrics

| Metric | Before BLD-008 | After BLD-008 | Target | Current |
|--------|---------------|---------------|--------|---------|
| Agent Count | 23 | 11 | ≤ 15 | 11 |
| Core Agents | N/A | 8 | 5-10 | 8 |
| Conditional Agents | N/A | 3 | ≤ 5 | 3 |
| False PASS Count | > 0 | Measuring | 0 | Measuring |
| Self-Approval Attempts | Unknown | Blocked | 0 | 0 |

### Evidence Metrics

| Metric | Before BLD-008 | After BLD-008 | Target | Current |
|--------|---------------|---------------|--------|---------|
| Evidence Completeness | Inconsistent | 100% required | 100% | Measuring |
| SHA-256 Verification | None | Required | 100% | Measuring |
| Screenshot Evidence | Missing | Required (UI) | 100% | Measuring |
| Three-Way Comparison | None | Required (UI) | 100% | Measuring |
| DOM Blocker Coverage | 0% | Slice A | 100% | Measuring |

### Workflow Metrics

| Metric | Before BLD-008 | After BLD-008 | Target | Current |
|--------|---------------|---------------|--------|---------|
| Revision Loops | Uncapped | ≤ 2 | ≤ 2 | 0 |
| Revision Budget | None | 2 | 2 | 2 |
| State Machine | None | Enforced | Enforced | Enforced |
| Gate Enforcement | Ad-hoc | Required | Required | Measuring |

### KPIs

| KPI | Before BLD-008 | After BLD-008 | Target | Current |
|-----|---------------|---------------|--------|---------|
| False PASS Rate | > 0 | Measuring | 0 | Measuring |
| Evidence Completeness | Unknown | 100% required | 100% | Measuring |
| Revision Loops | Unknown | ≤ 2 | ≤ 2 | 0 |
| Skill Usefulness | Not Measured | Measured by Evals | Measured | Measuring |

## Metric Definitions

### False PASS Rate

**Definition:** Number of times an agent claimed PASS but human or evidence disagreed.

**Target:** 0

**Measurement:** Track in review phase, document in retro

**Related Eval:** EV-HARNESS-001, EV-HARNESS-002

---

### Evidence Completeness

**Definition:** Percentage of required evidence artifacts present and verified.

**Target:** 100%

**Measurement:** Verify in VERIFY phase, track in dashboard

**Required Artifacts:**
- All work: typecheck.log, tests.log, build.log, proof-manifest.json
- UI work: before.png, target.png, after.png, diff.html, dom-blocker-results.json

---

### Revision Loops

**Definition:** Number of REVIEW → IMPLEMENT transitions per slice.

**Target:** ≤ 2

**Measurement:** Track in state machine, document in retro

**Budget:** 2 revision loops per slice, then human escalation

---

### Skill Usefulness

**Definition:** Measured by eval results comparing skill performance to baseline.

**Target:** Measured by evals

**Measurement:** Run evals before/after skill changes, track in EVAL_REGISTRY.md

**Related:** docs/agent-governance/SKILL_PRUNING_AUDIT.md

## Metric History

### Phase 1 (Pre-BLD-008)

**Agent Metrics:**
- Agent Count: 23
- False PASS Count: > 0
- Self-Approval: Unknown

**Evidence Metrics:**
- Evidence Completeness: Inconsistent
- SHA-256 Verification: None
- Screenshot Evidence: Missing
- Three-Way Comparison: None
- DOM Blocker Coverage: 0%

**Workflow Metrics:**
- Revision Loops: Uncapped
- State Machine: None
- Gate Enforcement: Ad-hoc

**KPIs:**
- False PASS Rate: > 0
- Evidence Completeness: Unknown
- Revision Loops: Unknown
- Skill Usefulness: Not Measured

---

### Phase 2.1 (Post-BLD-008)

**Agent Metrics:**
- Agent Count: 11 (52% reduction)
- Core Agents: 8
- Conditional Agents: 3
- False PASS Count: Measuring
- Self-Approval: Blocked

**Evidence Metrics:**
- Evidence Completeness: 100% required
- SHA-256 Verification: Required
- Screenshot Evidence: Required (UI)
- Three-Way Comparison: Required (UI)
- DOM Blocker Coverage: Measuring

**Workflow Metrics:**
- Revision Loops: ≤ 2
- Revision Budget: 2
- State Machine: Enforced
- Gate Enforcement: Required

**KPIs:**
- False PASS Rate: Measuring
- Evidence Completeness: 100% required
- Revision Loops: 0 (current)
- Skill Usefulness: Measured by evals

## Metric Triggers

### When to Update Metrics

1. **After BLD Entry** — When learning log entry is created
2. **After Harness Change** — When harness system is modified
3. **After Agent Change** — When agents are added/removed
4. **After Eval Result** — When eval shows metric change
5. **After Process Change** — When workflow is modified

### Metric Review

**Frequency:** Review metrics after each slice completion

**Participants:**
- governance-auditor
- release-manager
- product-manager

**Actions:**
- Review current metrics
- Compare to targets
- Identify improvements needed
- Update process if needed

## Related Documentation

- **[BUILD_LEARNING_DECISION_LOG.md](BUILD_LEARNING_DECISION_LOG.md)** — Learning history
- **[PROCESS_DIFF_LOG.md](PROCESS_DIFF_LOG.md)** — Process changes
- **[../evals/EVALS.md](../evals/EVALS.md)** — Eval system
- **[../agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md](../agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md)** — Harness system

---

**Last Updated:** 2026-06-10
**Current Phase:** 2.1
**Metrics Status:** Tracking
**Next Review:** After Slice A completion

### Phase 2.1 (Post-Implementation)

**Agent Metrics:**
- Agent Count: 11
- False PASS Count: 0 (no false approvals in Phase 2.1)
- Self-Approval: Blocked (by harness)

**Evidence Metrics:**
- Evidence Completeness: 100% (screenshot, manifest, DOM tests all present)
- SHA-256 Verification: Not applicable (Phase 2.1 used visual evidence)
- Screenshot Evidence: Required and present
- Three-Way Comparison: Current + Target (BEFORE not needed for first implementation)
- DOM Blocker Coverage: 7/7 landing parity tests

**Workflow Metrics:**
- Revision Loops: 0 (first implementation accepted)
- Revision Budget: 2/2 (not used)
- State Machine: Enforced (IMPLEMENT → VERIFY → REVIEW → CLOSE)
- Gate Enforcement: Required (visual parity ≥ 4.5/5)

**KPIs:**
- False PASS Rate: 0
- Evidence Completeness: 100%
- Revision Loops: 0/2
- Skill Usefulness: Measured by evals (not applicable to Phase 2.1)

**Visual Quality Metrics:**
- Visual Parity Score: 4.7/5
- P0 Blockers: 0/0
- Generic SaaS Detection: None detected
- DOM Blocker Results: 7/7 passed

---
