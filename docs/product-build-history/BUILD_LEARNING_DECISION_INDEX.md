# Build Learning & Decision Index

## Purpose

Quick reference index for all Build Learning & Decision (BLD) entries.

---

## Index Table

| ID | Title | Phase | Category | Decision Type | Agents Affected | Gate/Eval Affected | Status | Link |
|----|-------|-------|----------|---------------|----------------|-------------------|--------|------|
| BLD-001 | Green Tests Were Not Enough | 1 | Product quality | System redesign | Added: 7 agents | 7 gates added | Accepted | [BLD-001](BUILD_LEARNING_DECISION_LOG.md#bld-001--green-tests-were-not-enough) |
| BLD-002 | Agents Behaved Like Builders | 2.1 | Agent governance | Role separation | Updated: All agents | Fresh Review Gate | Accepted | [BLD-002](BUILD_LEARNING_DECISION_LOG.md#bld-002---agents-behaved-like-builders-not-quality-gatekeepers) |
| BLD-003 | Text-Only Review Created False Confidence | 2.1 | Visual evidence | Evidence requirement | Updated: UI agents | Visual Evidence Gate | Accepted | [BLD-003](BUILD_LEARNING_DECISION_LOG.md#bld-003---text-only-review-created-false-confidence) |
| BLD-004 | Evidence Report Needs Deterministic Blockers | 2.1 | Design quality | Test requirement | Updated: Review agents | DOM Blocker Eval | Accepted | [BLD-004](BUILD_LEARNING_DECISION_LOG.md#bld-004---evidence-report-still-needs-deterministic-blockers) |
| BLD-005 | Need Three-Way Comparison | 2.1 | Visual evidence | Evidence pipeline | Updated: All UI agents | Three-Way Eval | Accepted | [BLD-005](BUILD_LEARNING_DECISION_LOG.md#bld-005---need-three-way-comparison) |
| BLD-006 | Agent Sprawl Creates Process Noise | 2.1 | Agent governance | Agent consolidation | Reduced: 20+ → 8 | Agent Audit Eval | Accepted | [BLD-006](BUILD_LEARNING_DECISION_LOG.md#bld-006---agent-sprawl-creates-process-noise) |
| BLD-007 | AI Build Speed Requires Experimentation Infrastructure | 2.1 | Experimentation | Learning system | Updated: Governance | Learning Log Gate | Accepted | [BLD-007](BUILD_LEARNING_DECISION_LOG.md#bld-007---ai-build-speed-requires-experimentation-infrastructure) |
| BLD-008 | Replace Agent Sprawl with Case-Inspired State Machine and Evidence Gates | 2.1 | Agent governance / Quality gates / Harness architecture | Harness implementation | 5 roles, 31% skill reduction, 6 harness evals | Harness Gate (Gate 8) | Accepted | [BLD-008](BUILD_LEARNING_DECISION_LOG.md#bld-008--replace-agent-sprawl-with-case-inspired-state-machine-and-evidence-gates) |

---

## Categories

### Product Quality
Decisions about product acceptance, PM evaluation, PRD alignment, user value clarity.

**Entries:** BLD-001

### Design Quality
Decisions about visual QA, design parity, generic SaaS rejection, UI acceptance criteria.

**Entries:** BLD-003, BLD-004, BLD-005

### Agent Governance
Decisions about agent roles, authority levels, self-approval, agent consolidation.

**Entries:** BLD-002, BLD-006, BLD-008

### Harness Architecture
Decisions about state machines, evidence gates, proof protocols, revision loops.

**Entries:** BLD-008

### Visual Evidence
Decisions about screenshot requirements, browser state source of truth, evidence completeness.

**Entries:** BLD-003, BLD-005

### Evals
Decisions about eval categories, failure taxonomy, regression prevention.

**Entries:** BLD-004, BLD-005, BLD-007, BLD-008

### Experimentation
Decisions about treating process changes as experiments, learning loops.

**Entries:** BLD-007

### Release Process
Decisions about release gates, human approval, blocking rules.

**Entries:** BLD-001, BLD-002, BLD-008

---

## Decision Types

### System Redesign
Major restructuring of the build or quality system.

**Entries:** BLD-001

### Role Separation
Separation of builder, reviewer, and approval authorities.

**Entries:** BLD-002

### Evidence Requirement
Adding or updating evidence requirements for acceptance.

**Entries:** BLD-003, BLD-005

### Test Requirement
Adding deterministic tests or blockers.

**Entries:** BLD-004

### Agent Consolidation
Reducing agent count or merging duplicate roles.

**Entries:** BLD-006

### Harness Implementation
Implementing state machines, evidence gates, proof protocols, revision loops.

**Entries:** BLD-008

### Learning System
Creating infrastructure for systematic learning.

**Entries:** BLD-007

---

## Quick Stats

- **Total Entries:** 8
- **Accepted:** 8
- **In Progress:** 0
- **Superseded:** 0
- **Rejected:** 0

### By Category

- Product quality: 1
- Design quality: 3
- Agent governance: 3
- Harness architecture: 1
- Visual evidence: 2
- Evals: 4
- Experimentation: 1

### By Phase

- Phase 1: 1
- Phase 2.1: 7

---

**Last Updated:** 2026-06-10
**Next BLD Number:** BLD-009
