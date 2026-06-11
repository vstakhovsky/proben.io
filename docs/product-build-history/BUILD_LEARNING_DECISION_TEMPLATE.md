# Build Learning & Decision Template

## Purpose

Reusable template for creating BLD entries in the Build Learning & Decision Log.

Copy this template and fill in all fields for every meaningful decision, failure, or improvement.

---

## Template Fields

### BLD-XXX — [Title]

## Date / Phase

**Date:** YYYY-MM-DD
**Phase:** [X.Y]
**Slice:** [If applicable]

## Trigger

What happened? What forced us to reconsider the process?

**Describe the event or situation that triggered this decision.**

## Problem / Failure / Observation

What failed or looked suspicious?

**Describe the problem, failure, or observation that led to this decision.**

## Root Cause

Why did it happen?

**Analyze the underlying cause, not just symptoms.**

## Decision

What decision did we make?

**State the decision clearly and concisely.**

## Alternatives Considered

What did we decide not to do and why?

**List 2-3 alternatives and explain why they were not chosen.**

## Change Applied

What changed in code, docs, agents, skills, hooks, tests, evals, or process?

**List all changes made:**

- Files created/updated
- Agents/skills affected
- Gates/evals added
- Process changes

## Agents / Skills Affected

**List any agent or skill changes:**

- **Added:** [Name — reason]
- **Updated:** [Name — what changed]
- **Merged:** [Name into what]
- **Downgraded to skill:** [Name → skill name]
- **Disabled / Deleted:** [Name — reason]

## New Gate / Eval / Rule

What new quality control was introduced?

**Describe any new gate, eval, hook, or rule.**

## Evidence

Links to supporting artifacts:

- Screenshots: [Paths or URLs]
- Visual reports: [Paths or URLs]
- DOM tests: [Paths or URLs]
- Docs: [Paths or URLs]
- Review files: [Paths or URLs]
- Experiment entries: [Paths or URLs]

## Metrics Before

Use available data or mark TBD.

**List relevant metrics before the change:**

- Metric 1: [Value]
- Metric 2: [Value]
- Metric 3: [TBD]

## Metrics After

Use available data or mark TBD.

**List relevant metrics after the change:**

- Metric 1: [Value]
- Metric 2: [Value]
- Metric 3: [TBD]

## Learning

What did we learn?

**State the key learning clearly and concisely. This should be reusable.**

## Next Action

What happens next?

**Describe follow-up actions, if any.**

## Status

- [ ] Accepted
- [ ] In Progress
- [ ] Superseded
- [ ] Rejected

**Select one status.**

---

## Usage Guidance

### When to Create a BLD Entry

**Mandatory Triggers:**
- Failed or rejected slice
- False PASS (agent claimed PASS but human/browser disagreed)
- Human override occurred
- New gate added
- New eval added
- New agent added
- Agent removed or downgraded
- Visual QA process change
- Experiment result
- Architecture decision
- Security decision

**Optional (for trivial changes only):**
- Mark as "no new learning" in commit message instead of creating full entry

### How to Use This Template

1. Copy the entire template
2. Assign next BLD number (e.g., BLD-008)
3. Fill in all required fields
4. Add to `docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md`
5. Update `docs/product-build-history/BUILD_LEARNING_DECISION_INDEX.md`
6. Update `docs/product-build-history/QUALITY_METRICS_HISTORY.md` if metrics changed
7. Update `docs/product-build-history/LESSONS_LEARNED.md` if new reusable learning

### Quality Check

Before marking a BLD entry complete:

- [ ] All fields filled in
- [ ] Trigger clearly described
- [ ] Root cause analyzed (not just symptom)
- [ ] Decision clearly stated
- [ ] Alternatives considered
- [ ] Changes listed
- [ ] Evidence linked
- [ ] Metrics captured (before/after or TBD)
- [ ] Learning is reusable (not specific to one instance)
- [ ] Status selected

### Entry Quality

**Good Entry:**
- Clear problem statement
- Analyzed root cause
- Decision with rationale
- Alternatives considered
- Specific changes applied
- Evidence linked
- Reusable learning

**Poor Entry:**
- Vague problem description
- Symptom-level analysis only
- Decision without rationale
- No alternatives considered
- Changes not listed
- No evidence
- Learning too specific

---

**Last Updated:** 2026-06-10
**Template Version:** 1.0
