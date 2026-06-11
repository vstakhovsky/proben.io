# Proben.io Evaluation System

## Purpose

Create an eval-driven loop where every failure, false approval, rejected UI slice, or human override becomes a reusable regression case. Prevent green-text false acceptance by measuring product acceptance, visual quality, documentation alignment, and agent reliability.

## Core Principles

### 1. Tests Passing is Necessary But Not Sufficient
- Green tests do not prove product quality
- Green agent reports do not prove design parity
- Green build checks do not prove user value
- **Evals measure what tests cannot: product acceptance, visual quality, agent reliability**

### 2. Evals Must Measure Multiple Dimensions
- **Visual Quality** — Prototype parity, evidence completeness, generic pattern detection
- **Agent Reliability** — False PASS detection, self-approval prevention, evidence quality
- **Product Acceptance** — PRD/RFC/ADR alignment, user value clarity, requirement coverage
- **Security/Safety** — Protected file changes, secrets exposure, unsafe external calls

### 3. Every Failure Must Create an Eval Case
- Each visual mismatch → visual quality eval case
- Each false PASS → agent reliability eval case
- Each human override → product acceptance eval case
- Each rejected slice → comprehensive eval case

### 4. Every False PASS Must Update Prevention
- Update gate (add new blocker)
- Update hook (change trigger logic)
- Update prompt (strengthen instruction)
- Update test (add deterministic check)

### 5. Human Override is High-Value Evaluation Data
- Human override → automatic eval case creation
- Human override → root cause analysis
- Human override → agent instruction update
- Human override → regression test addition

## Eval Categories

### 1. Visual Quality Evals

**Measure:**
- Prototype parity score (target vs implementation)
- Before/target/after comparison quality
- Visual blocker detection (P0/P1 blockers)
- Generic SaaS pattern detection
- Typography/layout/CTA hierarchy quality
- Screenshot evidence completeness

**Thresholds:**
- UI slice cannot be accepted if visual parity < 4.5/5
- UI slice cannot be accepted if any P0 blocker fails
- Evidence completeness must be 100% for UI acceptance

**See:** `VISUAL_QUALITY_EVALS.md`

### 2. Agent Reliability Evals

**Measure:**
- False PASS count (agent claimed PASS, human disagreed)
- Self-approval attempts (builder reviewed own work)
- Missing evidence (no screenshots, no DOM tests)
- Stale screenshot usage (old timestamp)
- Wrong route tested (screenshot from different URL)
- Incorrect confidence score (overconfident on wrong result)
- Failure to escalate to human (should have escalated)

**Thresholds:**
- Agent reliability is unacceptable if false PASS rate > 0 for release-critical tasks
- Self-approval always results in eval case creation
- Missing evidence automatically creates reliability eval case

**See:** `AGENT_RELIABILITY_EVALS.md`

### 3. Product Acceptance Evals

**Measure:**
- PRD/RFC/ADR alignment (implementation matches source documents)
- User value clarity (value proposition is clear)
- Acceptance criteria coverage (all requirements met)
- Product clarity score (user problem addressed)
- Requirement-to-test mapping (tests exist for requirements)

**Thresholds:**
- Product acceptance score must be >= 4.0/5 for release
- All acceptance criteria must be covered by tests
- PRD/RFC/ADR alignment must be >= 4.5/5

**See:** `PRODUCT_ACCEPTANCE_EVALS.md`

### 4. Security/Safety Evals

**Measure:**
- Protected file changes (auth, payment, config files)
- Secrets/config edits (API keys, environment variables)
- Auth/payment/data risk (sensitive operations)
- Prompt-injection exposure (unvalidated user input)
- Unsafe external calls (unverified external dependencies)

**Thresholds:**
- Any protected file change requires security eval
- Secret exposure requires immediate security review
- Auth/payment changes require security approval

**See:** `../SECURITY.md`

## Failure Mode Taxonomy

### VISUAL_MISMATCH
Implementation does not match approved prototype
- Prototype parity < 4.5/5
- Generic SaaS patterns present
- P0/P1 blockers failed

### FALSE_AGENT_PASS
Agent claimed PASS when human/visual evidence disagreed
- Agent verdict: ACCEPTED
- Human verdict: REJECTED or NEEDS_REWORK
- Evidence contradicted agent score

### TEXT_ONLY_ACCEPTANCE
UI accepted without screenshot evidence
- No target screenshot
- No before/after comparison
- No DOM blocker tests

### STALE_SCREENSHOT
Evidence is outdated or from wrong time
- Timestamp shows old evidence
- Screenshot doesn't match current state
- Evidence reused from previous review

### WRONG_ROUTE_TESTED
Screenshot from different URL/page than intended
- Route tested ≠ route specified
- Screenshot shows wrong page
- Evidence from different environment

### MISSING_DOM_BLOCKER
Required deterministic tests not run
- No DOM blocker test results
- Required elements not tested
- Forbidden elements not tested

### MISSING_ACCEPTANCE_CRITERIA
Requirements not defined or testable
- No clear acceptance criteria
- Criteria ambiguous or subjective
- No test coverage for criteria

### GENERIC_SAAS_OUTPUT
Implementation looks like template instead of prototype
- Generic navbar patterns
- Generic card patterns
- Generic CTA patterns
- Template feel without brand character

### PRD_ALIGNMENT_FAIL
Implementation does not match PRD/RFC/ADR
- Feature not in PRD
- Implementation conflicts with RFC
- ADR not followed

### DESIGN_GATE_FAIL
Design quality gate not passed
- Visual parity < threshold
- Evidence incomplete
- Generic patterns detected

### SECURITY_REVIEW_MISSING
Security-sensitive change without review
- Protected file changed
- Secrets/config edited
- Auth/payment logic changed

### HUMAN_OVERRIDE_REQUIRED
Agent should have escalated to human
- Complex judgment required
- High uncertainty situation
- Release-critical decision

**See:** `FAILURE_MODE_TAXONOMY.md`

## Eval Loop Process

### For Every Failure:

1. **Categorize Failure Mode**
   - Identify failure type from taxonomy
   - Determine which eval category applies
   - Assess severity and impact

2. **Create Eval Case**
   - Use `EVAL_CASE_TEMPLATE.md`
   - Document input task, expected behavior, actual behavior
   - Record evidence paths, blocker status, verdicts
   - Identify root cause and required gate update

3. **Add or Update Blocker**
   - Create new DOM blocker if missing
   - Update existing blocker if insufficient
   - Add visual blocker to checklist
   - Update generic pattern detection

4. **Update Relevant Agent Instruction**
   - Update agent prompt to prevent recurrence
   - Add prohibition to agent instructions
   - Add evidence requirement to workflow
   - Update inspection order or checklist

5. **Update Relevant Skill/Hook/Test**
   - Add skill to catch failure mode
   - Add hook to trigger review
   - Add test to detect issue
   - Update evaluation threshold

6. **Re-run Evals Before Retry**
   - Run affected eval category
   - Verify new blocker catches issue
   - Confirm agent instruction updated
   - Check regression test added

7. **Record Learning in Build History**
   - Update `BUILD_LEARNING_DECISION_LOG.md`
   - Update `BUILD_LEARNING_DECISION_INDEX.md`
   - Update `QUALITY_IMPROVEMENT_LOG.md`
   - Update `FAILURE_TO_GATE_REGISTRY.md`

## Evaluation Metrics

### Visual Quality Metrics
- Visual parity score (target vs implementation)
- Evidence completeness score
- DOM blocker pass rate
- Generic SaaS detection rate
- Rework loop count (visual issues)

### Agent Reliability Metrics
- False PASS rate (agent vs human disagreement)
- Self-approval attempt rate
- Missing evidence rate
- Stale screenshot rate
- Wrong route rate
- Human override rate
- Agent usefulness score

### Product Acceptance Metrics
- PRD/RFC/ADR alignment score
- User value clarity score
- Acceptance criteria coverage
- Product clarity score
- Requirement-to-test mapping

### Overall Quality Metrics
- Regression prevention rate (recurrences prevented)
- Cost per accepted slice
- Time to accepted slice
- Eval case creation rate
- Gate update effectiveness

## Thresholds and Triggers

### Automatic Rejection Thresholds
- **Visual parity < 4.5/5** → REJECTED
- **Any P0 blocker fails** → REJECTED
- **Evidence completeness < 100%** → Cannot be ACCEPTED
- **False PASS rate > 0** for release-critical → Agent reliability issue
- **Product acceptance < 4.0/5** → Cannot release

### Eval Case Creation Triggers
- Human override (automatic)
- False PASS (automatic)
- Visual rejection (automatic)
- Generic SaaS detection (automatic)
- Missing evidence (automatic)

### Gate Update Requirements
- New failure mode → New gate
- Recurring failure → Strengthen existing gate
- Agent pattern → Update agent instruction
- Evidence gap → Add evidence requirement

## Eval Case Structure

Each eval case includes:

- **eval_id** — Unique identifier (e.g., EV-VIS-001)
- **date** — When failure occurred
- **phase** — Project phase (e.g., 2.1)
- **slice** — UI slice or task identifier
- **failure_type** — From failure taxonomy
- **input_task** — Original task/prompt
- **expected_behavior** — What should have happened
- **actual_agent_behavior** — What agent actually did
- **evidence_paths** — Links to screenshots, tests, reports
- **blocker_expected** — Which blocker should have caught this
- **correct_verdict** — What the verdict should have been
- **agent_verdict** — What agent actually said
- **human_verdict** — What human decided
- **root_cause** — Why failure occurred
- **required_gate_update** — What gate/change needed
- **regression_test_added** — Test to prevent recurrence
- **status** — Open/In Progress/Closed

**See:** `EVAL_CASE_TEMPLATE.md`

## Initial Eval Cases

### EV-VIS-001 — Generic Header Accepted
**Failure:** Agent accepted Slice A while human-visible header still appeared generic.

**Expected:** NEEDS_REWORK or REJECTED.

**Required Blockers:**
- Home visible (forbidden old nav)
- Build Process visible (forbidden portfolio nav)
- MEETING READINESS missing (required subtitle)
- CTA missing (required element)

**See:** `EVAL_REGISTRY.md`

### EV-VIS-002 — Text-Only UI Review
**Failure:** UI review relied on text checklist without side-by-side evidence.

**Expected:** REJECTED until screenshot evidence exists.

**Root Cause:** Reviewer inspected code before visual evidence.

### EV-AGENT-001 — Self-Review Bias
**Failure:** Builder/self-review bias produced overconfident score.

**Expected:** Fresh reviewer must inspect evidence first and cannot reuse builder verdict.

**Root Cause:** Same agent implemented and reviewed work.

### EV-PROD-001 — Technical ≠ Product Success
**Failure:** Technically working UI does not match PRD/RFC/ADR/design source of truth.

**Expected:** Product acceptance gate fails.

**Root Cause:** Green tests ≠ product acceptance.

## Related Documentation

- **[EVAL_REGISTRY.md](EVAL_REGISTRY.md)** — Complete registry of all eval cases
- **[VISUAL_QUALITY_EVALS.md](VISUAL_QUALITY_EVALS.md)** — Visual quality eval specifications
- **[AGENT_RELIABILITY_EVALS.md](AGENT_RELIABILITY_EVALS.md)** — Agent reliability eval specifications
- **[PRODUCT_ACCEPTANCE_EVALS.md](PRODUCT_ACCEPTANCE_EVALS.md)** — Product acceptance eval specifications
- **[EVAL_CASE_TEMPLATE.md](EVAL_CASE_TEMPLATE.md)** — Template for documenting eval cases
- **[FAILURE_MODE_TAXONOMY.md](FAILURE_MODE_TAXONOMY.md)** — Complete failure mode taxonomy

## Data Files

- **`evals/visual-quality-cases.jsonl`** — Visual quality eval cases
- **`evals/agent-reliability-cases.jsonl`** — Agent reliability eval cases
- **`evals/product-acceptance-cases.jsonl`** — Product acceptance eval cases

## Scripts

- **`scripts/create-eval-case-from-failure.js`** — Create eval case from failure
- **`scripts/run-quality-evals.js`** — Run quality eval suites

## Integration with Build System

**Eval Loop integrates with:**
- **Visual Agentic Delivery System** — Evidence-based review
- **Build Learning & Decision Log** — Learning documentation
- **Phase Gate Policy** — Gate enforcement
- **Visual Quality Verification Pipeline** — Evidence capture

**No release-critical workflow change is accepted unless:**
- Eval case exists for previous failure
- New gate prevents recurrence
- Evidence shows gate works
- Human approves

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Authority:** Governance Auditor + Human Approval
