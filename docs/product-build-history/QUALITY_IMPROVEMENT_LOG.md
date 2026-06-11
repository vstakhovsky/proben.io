# Quality Improvement Log

## Purpose

Records quality improvements made to the development process, tools, and gates. This log helps track the evolution of quality standards and prevents regression.

## Improvements

### Improvement 001 — Visual Quality Verification Pipeline

**Date:** 2026-06-10
**Area:** UI Quality Assurance
**Impact:** HIGH

**Problem:**
Visual report/checklist could still create false confidence if it did not include:
- Before/target/after comparison
- DOM blockers for required/forbidden elements
- Evidence manifest with metadata
- Deterministic tests

Agents could mark slices as ACCEPTED with high scores while the browser still showed wrong or old UI.

**Root Cause:**
Evidence existed (text checklist, agent claims) but was not strict enough to prove visual quality. No mechanism to verify actual browser state against approved prototype.

**Solution Implemented:**
Created Visual Quality Verification Pipeline with:

1. **Three-Way Screenshot Comparison**
   - BEFORE (pre-implementation)
   - TARGET (approved prototype)
   - AFTER (post-implementation)
   - DIFF (visual comparison)

2. **Evidence Manifest**
   - JSON metadata tracking all artifacts
   - Git branch and commit
   - Test results
   - Timestamps

3. **Deterministic DOM Blockers**
   - Playwright test for required elements
   - Playwright test for forbidden elements
   - Layout assertions
   - Automatic rejection on failure

4. **HTML Report Generation**
   - Four-panel screenshot display
   - Requirement checklist
   - DOM blocker results
   - Visual parity scoring
   - Human override section

5. **Updated Scripts**
   - `scripts/capture-ui-slice-evidence.js` — Evidence capture
   - `scripts/generate-visual-diff.js` — Diff generation
   - `scripts/generate-visual-review-report.js` — Report generation

**New Gate:**
No UI slice can be marked ACCEPTED unless:
- ✅ Screenshot evidence exists (BEFORE, TARGET, AFTER)
- ✅ DOM blockers passed
- ✅ Visual report generated
- ✅ Reviewer verdict documented
- ✅ Human approval received

**Policy Updates:**
- "Screenshot/browser state is the source of truth for UI acceptance"
- "Agent-generated PASS is advisory only. It is not release authority."

**Files Created/Updated:**
- `scripts/capture-ui-slice-evidence.js` (new)
- `scripts/generate-visual-diff.js` (new)
- `scripts/generate-visual-review-report.js` (updated)
- `tests/slice-a-header-parity.test.ts` (new)
- `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md` (new)
- `docs/qa/VISUAL_REVIEW_TEMPLATE.md` (updated)
- `docs/agentic-delivery/FRESH_REVIEW_PROTOCOL.md` (updated)
- `docs/PHASE_GATE_POLICY.md` (updated)
- `CLAUDE.md` (updated)

**Verification:**
Run tests and capture evidence for Slice A:
```bash
npm run type-check
npm test -- slice-a-header-parity
npm run build
node scripts/capture-ui-slice-evidence.js --phase "2.1" --slice "A"
node scripts/generate-visual-diff.js --phase "2.1" --slice "A"
node scripts/generate-visual-review-report.js --phase "2.1" --slice "A"
```

**Status:** ✅ Deployed

---

### Improvement 002 — Build Learning & Decision Log System

**Date:** 2026-06-10
**Area:** Process Documentation
**Impact:** HIGH

**Problem:**
Decisions, failures, and learnings disappeared into chat history. No systematic way to track quality system evolution or prevent recurrence of failures.

**Root Cause:**
No durable documentation for:
- What problems we encountered
- What quality failures happened
- What decisions we made
- Which agents were added/changed/removed
- Which gates/evals/hooks were introduced
- How metrics changed
- What we learned

**Solution Implemented:**
Created Build Learning & Decision Log system:

1. **Chronological BLD Log**
   - BUILD_LEARNING_DECISION_LOG.md with 7 pre-filled entries
   - Each entry: Trigger, Problem, Root Cause, Decision, Change, Learning
   - Links to evidence and related docs

2. **Decision Template**
   - BUILD_LEARNING_DECISION_TEMPLATE.md for reusable entry format
   - All fields defined with usage guidance

3. **Quick Reference Index**
   - BUILD_LEARNING_DECISION_INDEX.md for fast lookup
   - Categorized by type and status

4. **Lessons Learned**
   - LESSONS_LEARNED.md grouped by theme
   - 15 reusable lessons extracted

5. **Quality Metrics History**
   - QUALITY_METRICS_HISTORY.md for trend tracking
   - Metrics: visual parity, evidence completeness, DOM blocker pass, false PASS

6. **Process Diff Log**
   - PROCESS_DIFF_LOG.md showing evolution over time
   - Before/after comparisons

7. **Public Portfolio Page**
   - /portfolio/how-proben-was-built explaining quality journey
   - Shows process evolution, decisions, metrics

**New Gate/Policy:**
- **Learning Log Gate:** No release-critical task complete unless learning log updated
- **Mandatory Triggers:** Failed slice, False PASS, Human override, New gate/eval/agent

**Policy Updates:**
- "Every failure should become a gate, eval, or documented learning"
- "Agent systems should be optimized for fewer false approvals, not more green messages"

**Files Created/Updated:**
- `docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md` (new)
- `docs/product-build-history/BUILD_LEARNING_DECISION_TEMPLATE.md` (new)
- `docs/product-build-history/BUILD_LEARNING_DECISION_INDEX.md` (new)
- `docs/product-build-history/LESSONS_LEARNED.md` (new)
- `docs/product-build-history/QUALITY_METRICS_HISTORY.md` (new)
- `docs/product-build-history/PROCESS_DIFF_LOG.md` (new)
- `docs/product-build-history/README.md` (new)
- `app/portfolio/how-proben-was-built/page.tsx` (new)
- `docs/BUILD_PROCESS.md` (updated - added learning system section)
- `docs/PHASE_GATE_POLICY.md` (updated - added Learning Log Gate)
- `CLAUDE.md` (updated - added Build Learning & Decision Log Rule)
- `docs/agent-governance/AGENT_SYSTEM_AUDIT.md` (new)
- `docs/experimentation/EXPERIMENT_REGISTRY.md` (new)

**Verification:**
Check that learning system is in place:
- BLD entries exist for BLD-001 through BLD-007
- Lessons extracted and categorized
- Metrics tracking established
- Public portfolio page accessible

**Status:** ✅ Deployed

**Eval Cases:** EV-VIS-001, EV-VIS-002

**Learning:** See `docs/evals/EVAL_REGISTRY.md` for complete eval cases

---

### Improvement 003 — Eval-Driven Quality Loop System

**Date:** 2026-06-10
**Area:** Evaluation Infrastructure
**Impact:** HIGH

**Problem:**
Failures, false approvals, and rejected slices did not automatically create reusable regression cases. Quality issues could recur without systematic prevention.

**Root Cause:**
No eval-driven loop to:
- Categorize failure modes
- Create eval cases from failures
- Add/update blockers automatically
- Track agent reliability metrics
- Measure product acceptance beyond technical tests

**Solution Implemented:**
Created Eval-Driven Quality Loop System:

1. **Eval Documentation System**
   - EVALS.md — Master eval system overview
   - EVAL_REGISTRY.md — Registry of all eval cases
   - FAILURE_MODE_TAXONOMY.md — Complete failure taxonomy
   - EVAL_CASE_TEMPLATE.md — Reusable template
   - VISUAL_QUALITY_EVALS.md — Visual quality specifications
   - AGENT_RELIABILITY_EVALS.md — Agent reliability specifications
   - PRODUCT_ACCEPTANCE_EVALS.md — Product acceptance specifications

2. **Eval Data Files (JSONL)**
   - evals/visual-quality-cases.jsonl — Visual quality cases
   - evals/agent-reliability-cases.jsonl — Agent reliability cases
   - evals/product-acceptance-cases.jsonl — Product acceptance cases
   - Pre-filled with 4 initial eval cases

3. **Eval Automation Scripts**
   - scripts/create-eval-case-from-failure.js — Auto-create eval cases
   - scripts/run-quality-evals.js — Run eval suites and generate reports

4. **Eval Categories**
   - Visual Quality Evals: Prototype parity, evidence completeness, generic detection
   - Agent Reliability Evals: False PASS rate, self-approval, missing evidence
   - Product Acceptance Evals: PRD alignment, user value clarity, requirement coverage
   - Security/Safety Evals: Protected files, secrets exposure, unsafe calls

5. **Eval Metrics and Thresholds**
   - Visual parity score >= 4.5/5 for acceptance
   - Evidence completeness = 100% for UI acceptance
   - False PASS rate = 0% for release-critical tasks
   - Product acceptance score >= 4.0/5 for release
   - Human override always wins over agent verdict

**New Gate/Policy:**
- **Gate 7 — Eval Requirements Gate:** No release-critical workflow change accepted unless eval case exists for previous failure, new gate prevents recurrence, evidence shows gate works, human approves
- **Automatic Eval Case Creation:** Human override, false PASS, visual rejection, generic detection, missing evidence
- **Mandatory Prevention:** Every failure must create eval case, every false PASS must update gate/hook/prompt/test

**Policy Updates:**
- "Tests passing is necessary but not sufficient"
- "Evals measure what tests cannot: product acceptance, visual quality, agent reliability"
- "Every failure must create an eval case"
- "Every false PASS must update a gate, hook, prompt, or test"

**Files Created/Updated:**
- `docs/evals/EVALS.md` (new)
- `docs/evals/EVAL_REGISTRY.md` (new)
- `docs/evals/FAILURE_MODE_TAXONOMY.md` (new)
- `docs/evals/EVAL_CASE_TEMPLATE.md` (new)
- `docs/evals/VISUAL_QUALITY_EVALS.md` (new)
- `docs/evals/AGENT_RELIABILITY_EVALS.md` (new)
- `docs/evals/PRODUCT_ACCEPTANCE_EVALS.md` (new)
- `evals/visual-quality-cases.jsonl` (new, 2 cases)
- `evals/agent-reliability-cases.jsonl` (new, 1 case)
- `evals/product-acceptance-cases.jsonl` (new, 1 case)
- `scripts/create-eval-case-from-failure.js` (new)
- `scripts/run-quality-evals.js` (new)
- `docs/PHASE_GATE_POLICY.md` (updated - added Gate 7)
- `CLAUDE.md` (updated - added Eval Loop section)
- `docs/product-build-history/FAILURE_TO_GATE_REGISTRY.md` (updated - added eval references)

**Verification:**
Run eval system:
```bash
# Create eval case from failure
node scripts/create-eval-case-from-failure.js \
  --category "VIS" \
  --failure-type "VISUAL_MISMATCH" \
  --phase "2.1" \
  --slice "B"

# Run quality evals
node scripts/run-quality-evals.js \
  --category "visual-quality" \
  --phase "2.1" \
  --slice "A"
```

**Status:** ✅ Deployed

**Eval Cases:** EV-VIS-001, EV-VIS-002, EV-AGENT-001, EV-PROD-001

**Learning:** See `docs/evals/EVAL_REGISTRY.md` for complete eval cases

---

### Improvement 004 — Agent System Audit and Simplification

**Date:** 2026-06-10
**Area:** Agent Governance
**Impact:** HIGH

**Problem:**
23 agents with overlapping responsibilities created confusion, unclear authority, and potential for false green approvals. Agent sprawl was making the system complex without improving quality.

**Root Cause:**
- No systematic audit of agent usefulness
- Duplicate agents for PM, architecture, design roles
- Multiple documentation agents creating more text than value
- Weak agents creating noise without blocking authority
- Missing core test/eval engineer role
- No clear agent retirement process

**Solution Implemented:**
Comprehensive agent system audit and simplification:

1. **Agent Audit with Decision Table**
   - Evaluated all 23 agents against criteria
   - Identified duplicates, weak agents, niche roles
   - Created decision matrix: KEEP/MERGE/DOWNGRADE/DELETE/DISABLE

2. **Agent Reduction (52%)**
   - From 23 agents → 11 agents (8 core + 3 conditional)
   - Merged 7 agents into core agents
   - Downgraded 4 agents to skills
   - Deleted 2 agents with no clear value
   - Disabled 1 agent (not Phase 1 applicable)

3. **Core Agent Roster (8)**
   - principal-product-manager (Level 2)
   - principal-design-reviewer (Level 2)
   - frontend-engineer (Level 1)
   - test-eval-engineer (Level 1) — NEW
   - fresh-review-agent (Level 2)
   - visual-plan-architect (Level 1)
   - agent-governance-auditor (Level 4)
   - cto-bar-raiser (Level 3)

4. **Conditional Agents (3)**
   - security-reviewer (conditional: auth/payments/secrets/AI)
   - principal-architect (conditional: architecture/routing/dependencies)
   - research-analyst (conditional: research/validation phases)

5. **Skills Created**
   - update-docs-and-build-history (from documentation-engineer)
   - failure-to-prompt-update (from prompt-optimizer)
   - portfolio-process-page (existing, from portfolio-documentation-engineer)
   - worktree-management (from worktree-orchestrator)

6. **Documentation Created**
   - AGENT_SYSTEM_AUDIT.md — Comprehensive audit table
   - AGENT_RETIREMENT_DECISIONS.md — Detailed retirement decisions
   - AGENT_ROSTER.md — Simplified agent roster

7. **New Core Agent**
   - Created test-eval-engineer.md
   - Merged qa-release-engineer QA capabilities
   - Focus on tests, evals, quality infrastructure

8. **Hard Rules Added**
   - Added to CLAUDE.md Agent Operating Model section
   - 9 universal hard rules for all agents
   - Evidence-first review requirements
   - No self-approval enforcement
   - Human override rule

**New Gate/Policy:**
- **Agent Operating Model:** Builder ≠ reviewer ≠ governance ≠ human approval
- **No Self-Approval Rule:** Builders cannot approve own work
- **Evidence-First Review Rule:** Reviewers must inspect evidence before code
- **Visual QA Source-of-Truth Rule:** Browser/screenshot > agent verdict
- **Eval Loop Rule:** Every failure → eval case → prevention measure
- **Failure-to-Gate Rule:** Every failure must create gate/eval/learning

**Policy Updates:**
- "More agents do not equal better quality"
- "Fewer agents with clear authority beat many agents with vague responsibilities"
- "Agent-generated PASS is advisory only, not release authority"
- "Every agent must have clear responsibility, evidence output, and blocking authority"

**Files Created/Updated:**
- `docs/agent-governance/AGENT_SYSTEM_AUDIT.md` (new)
- `docs/agent-governance/AGENT_RETIREMENT_DECISIONS.md` (new)
- `docs/agent-governance/AGENT_ROSTER.md` (new)
- `.claude/agents/test-eval-engineer.md` (new)
- `CLAUDE.md` (updated - added Agent Operating Model section)
- `docs/product-build-history/PROCESS_DIFF_LOG.md` (updated - added agent consolidation details)

**Verification:**
- Agent count reduced from 23 → 11 (52% reduction)
- Core agents reduced from 15 → 8 (47% reduction)
- All agents updated with hard rules
- Authority levels clearly defined
- Evidence requirements established

**Status:** ✅ Deployed

**Eval Cases:** None (this is a governance improvement, not a failure)

**Learning:** Agent sprawl creates complexity without improving quality. Clear authority and evidence requirements are more important than agent count.

---

### Improvement 005 — Case-Inspired Agent Harness System

**Date:** 2026-06-10
**Area:** Harness Architecture / Evidence Verification
**Impact:** CRITICAL

**Problem:**
Agent system risked creating false green text confidence. The workflow could create PASS verdicts without proving that UI/product quality matched the source of truth. Too much reliance on prompts and text checklists, not enough on enforced state transitions, hard gates, and verifiable artifacts.

**Root Cause:**
- No state machine enforcement
- Text-based PASS messages without hard evidence
- No SHA-256 verification of command output
- No artifact-first review protocol
- Agent claims treated as truth
- Marker files accepted as evidence
- No revision loop budget
- Skills grew without eval-based pruning

**Solution Implemented:**
Created Case-inspired agent harness system with 5-role model and state machine enforcement:

1. **5 State-Machine Roles**
   - Implementer → Creates change (code, UI, docs, tests)
   - Verifier → Verifies change works (proof, tests, screenshots)
   - Reviewer → Checks quality (evidence-first review)
   - Closer → Checks release readiness (final gate)
   - Retro → System learning (governance)

2. **State Machine with Forbidden Transitions**
   - IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO → DONE
   - Forbidden: IMPLEMENT → CLOSE, IMPLEMENT → DONE, VERIFY → CLOSE
   - Revision loops: Maximum 2, then human escalation
   - No blind retries

3. **SHA-256 Proof Protocol**
   - Real command output captured to .log files
   - SHA-256 hash computed and stored in manifest
   - Verification recomputes hash and compares
   - Mismatch = fake execution = reject
   - Marker files are NOT evidence

4. **Evidence-First Review Protocol**
   - Review order: Manifest → Before → Target → After → Diff → DOM → Code
   - No code-first review: Infer quality from code forbidden
   - Screenshot/browser state beats text verdict

5. **Required Artifacts (Not Text Claims)**
   - Logs (real command output)
   - SHA-256 hashes (cryptographic proof)
   - Screenshots (before/target/after for UI)
   - Videos (where relevant)
   - DOM blockers (deterministic tests)
   - Manifests (metadata with hashes)
   - Human approval (final authority)

6. **Revision Loop Policy**
   - Maximum 2 revision loops per slice
   - No blind retries
   - Each retry must explain what changed
   - Repeated failure becomes harness bug

7. **Skill Pruning Audit**
   - Audited all 16 skills
   - Reduced to 9 kept + 3 gotchas + 2 disabled
   - 31% skill reduction
   - Policy: Long skills without eval improvement → prune

8. **Proben-Specific Gotchas**
   - 15 core gotchas that agents reliably get wrong
   - Short, high-signal gotchas from real failures
   - "No Slice B until Slice A passes harness"

**New Gate/Policy:**
- **Harness Gate (Gate 8):** No release-critical slice accepted unless state machine reached CLOSE, proof manifest valid, required command hashes verify, DOM blockers pass, visual evidence exists, fresh review complete, closer review complete, human approval recorded, retro entry exists
- **No State Transition Without Evidence:** Each transition requires proof manifests passed, SHA-256 hashes verified, evidence complete
- **Do Not Trust Agent Claims:** Agent PASS is advisory only. Trust artifacts.
- **Marker Files Are Not Evidence:** SHA-256 hash of real output required
- **Evidence-First Review:** Reviewer must check evidence before code
- **Maximum 2 Revision Loops:** Then human escalation
- **Every Repeated Failure is a Harness Bug:** Fix the system, don't blame agents

**Policy Updates:**
- "Gates matter more than agent names"
- "Do not trust agent claims; trust artifacts"
- "Enforce with code/state machine, not prompts"
- "Skills should be short gotchas unless evals prove otherwise"
- "No Slice B until Slice A passes harness or is correctly blocked"

**Files Created/Updated:**
- `docs/agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md` (updated - added 5-role model)
- `docs/agentic-delivery/AGENT_STATE_MACHINE.md` (updated - added role mappings)
- `docs/agentic-delivery/EVIDENCE_PROOF_PROTOCOL.md` (updated - added artifact requirements)
- `docs/agentic-delivery/REVISION_LOOP_POLICY.md` (existing)
- `docs/gotchas/PROBEN_AGENT_GOTCHAS.md` (updated - added 5 harness gotchas)
- `docs/agent-governance/SKILL_PRUNING_AUDIT.md` (existing)
- `docs/agent-governance/AGENT_ROSTER.md` (updated - 5-role model)
- `docs/agent-governance/AGENT_AUTHORITY_MATRIX.md` (needs update)
- `docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md` (updated - BLD-008)
- `docs/product-build-history/BUILD_LEARNING_DECISION_INDEX.md` (updated)
- `docs/product-build-history/PROCESS_DIFF_LOG.md` (needs update)
- `docs/product-build-history/FAILURE_TO_GATE_REGISTRY.md` (needs update)
- `docs/product-build-history/LESSONS_LEARNED.md` (needs update)
- `docs/product-build-history/QUALITY_METRICS_HISTORY.md` (needs update)
- `docs/evals/HARNESS_EVALS.md` (new - 6 eval cases)
- `CLAUDE.md` (updated - added Case-inspired Harness Rules)
- `docs/PHASE_GATE_POLICY.md` (updated - added Harness Gate)
- `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md` (updated - added harness integration)
- `scripts/harness/run-proof-command.js` (new - SHA-256 proof)
- `scripts/harness/verify-proof-manifest.js` (new - hash verification)
- `scripts/harness/validate-state-transition.js` (new - state enforcement)
- `scripts/harness/create-retro-entry.js` (new - retro generation)
- `scripts/harness/generate-harness-report.js` (new - HTML reports)

**Verification:**
```bash
# Test harness proof system
node scripts/harness/run-proof-command.js --name typecheck -- npm run type-check
node scripts/harness/verify-proof-manifest.js <run-id>

# Test state machine
node scripts/harness/validate-state-transition.js --from VERIFY --to REVIEW --run-id <run-id>
```

**Status:** ✅ Deployed

**Eval Cases:** EV-HARNESS-001 through EV-HARNESS-006

**Learning:** Agent quality improves less from adding more roles and more from enforcing the right transitions, gates, and proof artifacts. Gates matter more than agent names.

---

### Improvement Template

**Date:** [YYYY-MM-DD]
**Area:** [Quality Area]
**Impact:** [LOW/MEDIUM/HIGH]

**Problem:**
[Description of quality issue]

**Root Cause:**
[Underlying cause]

**Solution Implemented:**
[What was built/changed]

**New Gate/Policy:**
[New requirements or rules]

**Files Created/Updated:**
- [File 1]
- [File 2]

**Verification:**
[How to verify the improvement works]

**Status:** [DEPLOYED/PENDING]

---

**Last Updated:** 2026-06-10
**Log Version:** 1.0
