# Product Build History

## Purpose

This directory documents the evolution of Proben.io's quality system through failures, decisions, and improvements. Proben.io is an experiment in AI-assisted product development quality.

## Contents

### Core Documents

- **[BUILD_LEARNING_DECISION_LOG.md](BUILD_LEARNING_DECISION_LOG.md)** — Chronological log of all BLD entries with full details
- **[BUILD_LEARNING_DECISION_TEMPLATE.md](BUILD_LEARNING_DECISION_TEMPLATE.md)** — Reusable template for creating new BLD entries
- **[BUILD_LEARNING_DECISION_INDEX.md](BUILD_LEARNING_DECISION_INDEX.md)** — Quick reference index for all BLD entries
- **[LESSONS_LEARNED.md](LESSONS_LEARNED.md)** — Reusable lessons grouped by theme
- **[QUALITY_METRICS_HISTORY.md](QUALITY_METRICS_HISTORY.md)** — Metrics tracking over time

### Quality Records

- **[FAILURE_TO_GATE_REGISTRY.md](FAILURE_TO_GATE_REGISTRY.md)** — Registry of gate failures and violations
- **[QUALITY_IMPROVEMENT_LOG.md](QUALITY_IMPROVEMENT_LOG.md)** — Log of quality improvements made

## How This Works

### For Every Meaningful Change

1. **Document** the decision or failure in BUILD_LEARNING_DECISION_LOG.md
2. **Index** in BUILD_LEARNING_DECISION_INDEX.md
3. **Capture** learning in LESSONS_LEARNED.md (if reusable)
4. **Track** metrics in QUALITY_METRICS_HISTORY.md (if changed)
5. **Link** to evidence (screenshots, tests, reports)

### Mandatory Triggers

A BLD entry is REQUIRED when:
- Failed or rejected slice
- False PASS occurred
- Human override happened
- New gate/eval/agent added
- Visual QA process changed
- Architecture/security decision made

### Optional (Trivial Changes Only)

For very small changes that don't represent learning:
- Mark as "no new learning" in commit message
- No full BLD entry needed

## Public Documentation

The build learning and quality evolution is also documented publicly:

**[/portfolio/how-proben-was-built](../../app/portfolio/how-proben-was-built/page.tsx)** — Public portfolio page explaining the quality journey

## Related Documentation

- **[CLAUDE.md](../../CLAUDE.md)** — Build Learning & Decision Log rule (mandatory)
- **[docs/BUILD_PROCESS.md](../BUILD_PROCESS.md)** — Build process as learning system
- **[docs/PHASE_GATE_POLICY.md](../PHASE_GATE_POLICY.md)** — Learning Log Gate

---

**Last Updated:** 2026-06-10
**Total BLD Entries:** 7
