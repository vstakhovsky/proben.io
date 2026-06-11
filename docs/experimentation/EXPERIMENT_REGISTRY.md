# Experiment Registry

## Purpose

Track process experiments, quality system improvements, and build learning initiatives at Proben.io.

## Philosophy

> **AI can increase implementation speed faster than validation speed.** The bottleneck moves from building to learning.

Every meaningful process change is treated as an experiment with:
- Hypothesis about improvement
- Success criteria
- Evidence requirements
- Decision criteria (continue/abandon/iterate)

## Experiment Format

### EXP-XXX — Title

**Status:** Active | Completed | Abandoned | Iterating

**Hypothesis:**
What do we expect to improve?

**Success Criteria:**
How will we measure success?

**Implementation:**
What changed in process, gates, agents, or evals?

**Evidence:**
What evidence shows the experiment worked?

**Decision:**
Continue, abandon, or iterate?

**Related BLD Entry:**
BLD-XXX

---

## Registered Experiments

### EXP-001 — Visual Evidence Workbench

**Status:** ✅ Completed

**Hypothesis:** Screenshot evidence and side-by-side comparison will prevent false PASS for UI work.

**Success Criteria:**
- No false PASS based on text-only review
- Browser state treated as source of truth
- Visual parity score based on actual comparison

**Implementation:**
- Created scripts/capture-ui-slice-evidence.js
- Created scripts/generate-visual-review-report.js
- Added four-panel screenshot requirement
- Added browser state source-of-truth rule

**Evidence:**
- test-results/visual-review/phase-2-1-slice-a.html
- BLD-003 decision and outcome

**Decision:** ✅ Continue and expand to all UI work

**Related BLD Entry:** BLD-003

---

### EXP-002 — DOM Blockers

**Status:** ✅ Completed

**Hypothesis:** Deterministic DOM tests will prevent generic or wrong implementations from passing.

**Success Criteria:**
- P0 failures = automatic REJECT
- Required elements verified automatically
- Forbidden elements rejected automatically

**Implementation:**
- Created e2e/slice-a-header-parity.spec.ts
- Added P0 blocker definitions
- Added automatic rejection rules

**Evidence:**
- 80/90 DOM tests passed (all critical)
- Generic nav items not found
- Required elements verified

**Decision:** ✅ Continue and expand DOM blocker coverage

**Related BLD Entry:** BLD-004

---

### EXP-003 — Three-Way Screenshot Comparison

**Status:** ✅ Completed

**Hypothesis:** BEFORE/TARGET/AFTER comparison will prove implementation direction and prevent no-op implementations.

**Success Criteria:**
- Can prove change occurred
- Can prove change was in right direction
- No-op implementations detected

**Implementation:**
- Added BEFORE screenshot requirement
- Added four-panel visual comparison
- Added decision criteria: AFTER must be closer to TARGET than BEFORE

**Evidence:**
- test-results/visual-review/phase-2-1-slice-a-manifest.json
- Visual reports with four panels

**Decision:** ✅ Continue for all UI work

**Related BLD Entry:** BLD-005

---

### EXP-004 — Agent Consolidation

**Status:** ✅ Completed

**Hypothesis:** Fewer agents with clear authority will produce better quality than many agents with vague responsibilities.

**Success Criteria:**
- Reduced agent count (20+ → 8)
- Clearer authority boundaries
- Less documentation noise
- Faster decision-making

**Implementation:**
- Audited all agents
- Consolidated to 8 core agents
- Downgraded some to skills
- Removed redundant agents

**Evidence:**
- docs/agent-governance/AGENT_SYSTEM_AUDIT.md
- docs/agent-governance/AGENT_RETIREMENT_DECISIONS.md

**Decision:** ✅ Continue current agent structure

**Related BLD Entry:** BLD-006

---

### EXP-005 — Build Learning & Decision Log

**Status:** ✅ Completed

**Hypothesis:** Documenting every failure and decision will prevent recurrence and create reusable learning.

**Success Criteria:**
- Every failure has BLD entry
- Every decision has BLD entry
- Learning captured in LESSONS_LEARNED.md
- Metrics tracked in QUALITY_METRICS_HISTORY.md

**Implementation:**
- Created BUILD_LEARNING_DECISION_LOG.md
- Created BUILD_LEARNING_DECISION_TEMPLATE.md
- Created BUILD_LEARNING_DECISION_INDEX.md
- Created LESSONS_LEARNED.md
- Created QUALITY_METRICS_HISTORY.md
- Added Learning Log Gate to PHASE_GATE_POLICY.md

**Evidence:**
- 7 BLD entries documenting quality evolution
- 15 reusable lessons extracted
- Metrics tracking established

**Decision:** ✅ Continue for all release-critical changes

**Related BLD Entry:** BLD-007

---

## Active Experiments

### EXP-006 — Phase 2.1 Landing Redesign

**Status:** 🔄 Active

**Hypothesis:** Visual planning + evidence-based review will achieve design parity with Proben MVP 6.

**Success Criteria:**
- Visual parity ≥ 4.5/5 for landing first viewport
- All navigation items correct
- Rounded pill header implemented
- No generic SaaS appearance

**Implementation:**
- Phase 2.1 split into slices A-F
- Visual plan created per slice
- Evidence capture and review per slice
- Human approval before proceeding

**Evidence:**
- docs/agentic-delivery/phase-2-1-visual-plan.md
- test-results/visual-review/phase-2-1-slice-a.html
- In progress (Slice A)

**Decision:** Pending results of Slice A

**Related BLD Entry:** BLD-001, BLD-003, BLD-004, BLD-005

---

## Abandoned Experiments

### EXP-XXX — [Title]

**Status:** ❌ Abandoned

**Hypothesis:** [What we thought would work]

**Why Abandoned:** [Why it didn't work or was replaced]

**Lessons Learned:** [What we learned]

---

## Experiment Template

Copy this template to register a new experiment:

```markdown
### EXP-XXX — Title

**Status:** Active | Completed | Abandoned | Iterating

**Hypothesis:**
[What do we expect to improve?]

**Success Criteria:**
[How will we measure success?]

**Implementation:**
[What changed in process, gates, agents, or evals?]

**Evidence:**
[What evidence shows the experiment worked?]

**Decision:**
[Continue, abandon, or iterate?]

**Related BLD Entry:**
BLD-XXX
```

---

## Related Documentation

- **[BUILD_LEARNING_DECISION_LOG.md](../product-build-history/BUILD_LEARNING_DECISION_LOG.md)** — Decisions from experiments
- **[LESSONS_LEARNED.md](../product-build-history/LESSONS_LEARNED.md)** - Reusable lessons
- **[QUALITY_METRICS_HISTORY.md](../product-build-history/QUALITY_METRICS_HISTORY.md)** - Metrics tracking

---

**Last Updated:** 2026-06-10
**Total Experiments:** 6
**Active:** 1
**Completed:** 5
**Abandoned:** 0
