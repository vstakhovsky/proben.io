# Eval Case Template

## Purpose

Reusable template for documenting evaluation cases. Use this template when creating eval cases from failures, false approvals, rejected UI slices, or human overrides.

## Eval Case Structure

```json
{
  "eval_id": "EV-{CATEGORY}-{NUMBER}",
  "date": "YYYY-MM-DD",
  "phase": "X.Y",
  "slice": "A/B/C/etc or task-name",
  "failure_type": "FAILURE_MODE",
  "input_task": "Original task or prompt",
  "expected_behavior": "What should have happened",
  "actual_agent_behavior": "What agent actually did",
  "evidence_paths": {
    "target": "path/to/target.png",
    "before": "path/to/before.png",
    "after": "path/to/after.png",
    "diff": "path/to/diff.html",
    "manifest": "path/to/manifest.json",
    "tests": "path/to/test-results",
    "report": "path/to/report.html"
  },
  "blocker_expected": "Which blocker should have caught this",
  "correct_verdict": "ACCEPTED/NEEDS_REWORK/REJECTED",
  "agent_verdict": "What agent actually said",
  "human_verdict": "What human decided (if applicable)",
  "root_cause": "Why failure occurred",
  "required_gate_update": "What gate/change needed",
  "regression_test_added": "Test to prevent recurrence",
  "status": "OPEN/IN_PROGRESS/CLOSED",
  "related_evals": ["EV-XXX-001", "EV-XXX-002"],
  "related_adrs": ["ADR-number"],
  "related_docs": ["path/to/doc.md"],
  "learning_outcomes": ["What we learned"],
  "prevention_added": ["What prevention was added"],
  "metrics": {
    "visual_parity_score": 4.5,
    "evidence_completeness": 1.0,
    "time_to_detect": "15 minutes",
    "time_to_fix": "2 hours",
    "recurrences": 0
  }
}
```

## Field Definitions

### eval_id
**Format:** `EV-{CATEGORY}-{NUMBER}`
**Examples:**
- `EV-VIS-001` — Visual quality eval case #1
- `EV-AGENT-001` — Agent reliability eval case #1
- `EV-PROD-001` — Product acceptance eval case #1
- `EV-SEC-001` — Security eval case #1

**Categories:**
- `VIS` — Visual quality
- `AGENT` — Agent reliability
- `PROD` — Product acceptance
- `SEC` — Security/safety

### date
**Format:** `YYYY-MM-DD`
**Description:** Date when failure occurred

### phase
**Format:** `X.Y`
**Description:** Project phase when failure occurred (e.g., "2.1")

### slice
**Format:** `A/B/C/etc or task-name`
**Description:** UI slice or task identifier (e.g., "A", "B", "header-implementation")

### failure_type
**Format:** `FAILURE_MODE`
**Description:** Failure mode from taxonomy (see `FAILURE_MODE_TAXONOMY.md`)

**Options:**
- `VISUAL_MISMATCH`
- `FALSE_AGENT_PASS`
- `TEXT_ONLY_ACCEPTANCE`
- `STALE_SCREENSHOT`
- `WRONG_ROUTE_TESTED`
- `MISSING_DOM_BLOCKER`
- `MISSING_ACCEPTANCE_CRITERIA`
- `GENERIC_SAAS_OUTPUT`
- `PRD_ALIGNMENT_FAIL`
- `DESIGN_GATE_FAIL`
- `SECURITY_REVIEW_MISSING`
- `HUMAN_OVERRIDE_REQUIRED`

### input_task
**Format:** Text
**Description:** Original task, prompt, or requirement that led to the failure

### expected_behavior
**Format:** Text
**Description:** What should have happened according to requirements, gates, and documentation

### actual_agent_behavior
**Format:** Text
**Description:** What the agent actually did, including any incorrect assessments or missed requirements

### evidence_paths
**Format:** Object with file paths
**Description:** Links to all relevant evidence (screenshots, tests, reports, manifests)

**Required paths (when applicable):**
- `target` — Approved prototype screenshot
- `before` — Pre-implementation state
- `after` — Post-implementation state
- `diff` — Visual comparison
- `manifest` — Evidence metadata
- `tests` — Test results
- `report` — HTML review report

### blocker_expected
**Format:** Text
**Description:** Which blocker, gate, test, or check should have caught this failure

### correct_verdict
**Format:** `ACCEPTED/NEEDS_REWORK/REJECTED`
**Description:** What the correct verdict should have been

### agent_verdict
**Format:** `ACCEPTED/NEEDS_REWORK/REJECTED`
**Description:** What the agent actually claimed as the verdict

### human_verdict
**Format:** `ACCEPTED/NEEDS_REWORK/REJECTED`
**Description:** What the human decided (if human override occurred)

### root_cause
**Format:** Text
**Description:** Why the failure occurred at the systemic level

**Common root causes:**
- Agent instruction unclear
- Gate missing or insufficient
- Evidence requirement missing
- Process gap
- Training gap
- Tool limitation

### required_gate_update
**Format:** Text
**Description:** What gate, test, prompt, or process update is required to prevent recurrence

**Examples:**
- "Add DOM blocker for forbidden nav items"
- "Update agent instruction to require screenshot evidence"
- "Add visual plan gate before UI implementation"
- "Strengthen generic SaaS detection"

### regression_test_added
**Format:** Text
**Description:** Test or check added to prevent recurrence

**Examples:**
- "Added DOM blocker test for 'Home' nav item"
- "Added evidence completeness check"
- "Added visual parity threshold check"

### status
**Format:** `OPEN/IN_PROGRESS/CLOSED`
**Description:** Current status of the eval case

- `OPEN` — Failure identified, no action taken yet
- `IN_PROGRESS` — Working on gate updates, tests, or fixes
- `CLOSED` — All prevention measures implemented and verified

### related_evals
**Format:** Array of eval IDs
**Description:** Related eval cases (e.g., similar failures, follow-up cases)

### related_adrs
**Format:** Array of ADR numbers
**Description:** Related Architecture Decision Records

### related_docs
**Format:** Array of document paths
**Description:** Related documentation files

### learning_outcomes
**Format:** Array of text strings
**Description:** What we learned from this failure

**Examples:**
- "Evidence must precede code review"
- "Builder cannot be same as reviewer"
- "Generic patterns need explicit detection"

### prevention_added
**Format:** Array of text strings
**Description:** What prevention measures were added

**Examples:**
- "Added evidence requirement to agent instructions"
- "Added visual parity threshold gate"
- "Added generic SaaS pattern detection"

### metrics
**Format:** Object with numeric metrics
**Description:** Quantitative metrics about the failure and prevention

**Fields:**
- `visual_parity_score` — Visual parity score (0-5)
- `evidence_completeness` — Evidence completeness (0-1)
- `time_to_detect` — Time to detect failure
- `time_to_fix` — Time to implement prevention
- `recurrences` — Number of recurrences (should stay 0)

## Markdown Format (Alternative)

For documentation purposes, eval cases can also be documented in Markdown:

```markdown
# EV-{CATEGORY}-{NUMBER} — Title

## Metadata
- **Date:** YYYY-MM-DD
- **Phase:** X.Y
- **Slice:** A/B/C/etc
- **Failure Type:** FAILURE_MODE
- **Status:** OPEN/IN_PROGRESS/CLOSED

## Task
**Input:** Original task or prompt

**Expected Behavior:** What should have happened

**Actual Agent Behavior:** What agent actually did

## Evidence
- **Target:** `path/to/target.png`
- **Before:** `path/to/before.png`
- **After:** `path/to/after.png`
- **Diff:** `path/to/diff.html`
- **Manifest:** `path/to/manifest.json`
- **Tests:** `path/to/test-results`
- **Report:** `path/to/report.html`

## Verdicts
- **Blocker Expected:** Which blocker should have caught this
- **Correct Verdict:** ACCEPTED/NEEDS_REWORK/REJECTED
- **Agent Verdict:** What agent actually said
- **Human Verdict:** What human decided (if applicable)

## Root Cause
Why the failure occurred at the systemic level

## Prevention
**Required Gate Update:** What gate/change needed

**Regression Test Added:** Test to prevent recurrence

**Learning Outcomes:** What we learned

## Metrics
- **Visual Parity Score:** X/5
- **Evidence Completeness:** X%
- **Time to Detect:** X minutes
- **Time to Fix:** X hours
- **Recurrences:** 0

## Related
- **Related Evals:** [EV-XXX-001, EV-XXX-002]
- **Related ADRs:** [ADR-number]
- **Related Docs:** [path/to/doc.md]
```

## Usage

### Creating a New Eval Case

1. **Identify Failure Mode** — Use `FAILURE_MODE_TAXONOMY.md`
2. **Assign eval_id** — Follow `EV-{CATEGORY}-{NUMBER}` format
3. **Fill Required Fields** — Complete all required fields
4. **Collect Evidence** — Gather screenshots, tests, reports
5. **Determine Root Cause** — Analyze why failure occurred
6. **Define Prevention** — Specify what gate/test/update is needed
7. **Set Status** — OPEN → IN_PROGRESS → CLOSED

### Example: EV-VIS-001

```json
{
  "eval_id": "EV-VIS-001",
  "date": "2026-06-10",
  "phase": "2.1",
  "slice": "A",
  "failure_type": "VISUAL_MISMATCH",
  "input_task": "Implement Slice A header/navigation matching Proben MVP 6 design",
  "expected_behavior": "Agent should detect generic navbar and reject or request rework",
  "actual_agent_behavior": "Agent accepted implementation with full-width navbar, missing MEETING READINESS subtitle, and wrong nav items",
  "evidence_paths": {
    "target": "reference/screenshots/proben-mvp-6/hero-target-light-1.png",
    "after": "test-results/phase-2-1-slice-a-after.png",
    "report": "test-results/visual-review/phase-2-1-slice-a.html"
  },
  "blocker_expected": "DOM blocker for forbidden 'Home' nav item and required 'MEETING READINESS' subtitle",
  "correct_verdict": "REJECTED",
  "agent_verdict": "ACCEPTED",
  "human_verdict": "REJECTED",
  "root_cause": "Agent lacked explicit visual blockers and generic SaaS detection",
  "required_gate_update": "Add DOM blockers for required/forbidden nav items and generic SaaS pattern detection",
  "regression_test_added": "e2e/slice-a-header-parity.spec.ts with P0 blocker tests",
  "status": "CLOSED",
  "related_evals": ["EV-VIS-002", "EV-AGENT-001"],
  "learning_outcomes": [
    "Visual acceptance requires deterministic blockers",
    "Generic patterns must be explicitly detected",
    "Agent verdict ≠ final acceptance"
  ],
  "prevention_added": [
    "Added DOM blocker tests for P0 blockers",
    "Added generic SaaS pattern detection",
    "Updated agent instructions with evidence requirements"
  ],
  "metrics": {
    "visual_parity_score": 2.5,
    "evidence_completeness": 0.6,
    "time_to_detect": "2 days",
    "time_to_fix": "4 hours",
    "recurrences": 0
  }
}
```

## Automation

### Script-Based Creation

Use `scripts/create-eval-case-from-failure.js` to automatically generate eval cases from failures:

```bash
node scripts/create-eval-case-from-failure.js \
  --category "VIS" \
  --failure-type "VISUAL_MISMATCH" \
  --phase "2.1" \
  --slice "A" \
  --evidence "test-results/phase-2-1-slice-a-manifest.json"
```

### JSONL Format

Eval cases are stored in JSONL format for easy parsing:

```jsonl
{"eval_id":"EV-VIS-001","date":"2026-06-10",...}
{"eval_id":"EV-VIS-002","date":"2026-06-10",...}
```

Files:
- `evals/visual-quality-cases.jsonl`
- `evals/agent-reliability-cases.jsonl`
- `evals/product-acceptance-cases.jsonl`

## Related Documentation

- **[EVALS.md](EVALS.md)** — Master eval system documentation
- **[FAILURE_MODE_TAXONOMY.md](FAILURE_MODE_TAXONOMY.md)** — Complete failure taxonomy
- **[EVAL_REGISTRY.md](EVAL_REGISTRY.md)** — Registry of all eval cases

---

**Last Updated:** 2026-06-10
**Version:** 1.0
