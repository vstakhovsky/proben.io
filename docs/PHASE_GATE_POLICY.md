# Phase Gate Policy - Proben.io

## Purpose

This document defines the phase gates that Proben.io uses to ensure quality, prevent scope creep, and maintain product-process balance.

## Core Principle

**Every phase must pass through quality gates before proceeding.**

Gates prevent:
* Technical completion without product completion
* Green checkmarks without evidence
* Scope creep and overengineering
* Product-process inversion
* Premature infrastructure addition

## The Five Gates

### Gate 1 — Product Goal Gate

**Before Implementation Starts**

**Purpose:** Ensure we're solving the right problem.

**Questions:**
1. What user problem are we solving?
2. Who has this problem?
3. What happens if we don't solve it?
4. Is this the most important problem now?
5. What's the smallest useful slice?

**Required Outputs:**
* Clear user problem statement
* Target user/audience definition
* Success criteria defined
* Eval rubric specified
* Out-of-scope list explicit

**Approval:** Product Manager

**Block If:**
* User problem unclear
* Target audience ambiguous
* Success criteria missing
* Eval rubric undefined
* Scope boundaries fuzzy

---

### Gate 2 — Design / Requirements Gate

**Before Implementation Starts**

**Purpose:** Ensure we have clear specifications to execute against.

**Questions:**
1. Are design references available?
2. Is PRD up to date?
3. Is user flow defined?
4. Are routes specified?
5. Are acceptance criteria unambiguous?

**Required Outputs:**
* Design screenshots/prototype available
* PRD updated for this phase
* User flow documented
* Route expectations defined
* Acceptance criteria finalized

**Approval:** Product Manager + Lead Architect

**Block If:**
* Design references missing
* PRD outdated
* User flow unclear
* Routes undefined
* Acceptance criteria ambiguous

---

### Gate 3 — Implementation Gate

**During Implementation**

**Purpose:** Ensure implementation stays focused and minimal.

**Questions:**
1. Is this a small vertical slice?
2. Are we adding unnecessary dependencies?
3. Are we adding backend without justification?
4. Are we doing broad refactor without approval?
5. Are we staying within scope?

**Required Checks:**
* Small vertical slice (not platform)
* No new dependencies unless essential
* No backend unless justified
* No refactor without approval
* Scope boundaries maintained

**Approval:** Lead Architect + CTO Bar Raiser

**Block If:**
* Slice too large
* Unnecessary dependencies added
* Premature backend addition
* Unapproved refactor
* Scope creep detected

---

### Gate 4 — Product QA Gate

**After Implementation**

**Purpose:** Ensure the product actually improved, not just the code.

**Questions:**
1. What changed before vs after?
2. Did we meet acceptance criteria?
3. Is design parity achieved?
4. Is value proposition clearer?
5. Are there regressions?

**Required Outputs:**
* Before/after comparison
* Requirement coverage analysis
* Design/prototype alignment assessment
* User flow review
* PM eval scores

**Approval:** Product Manager + QA Release Engineer

**Block If:**
* PM eval < 3.5
* Design parity < 3
* Requirements not met
* Regressions introduced
* Evidence missing

---

### Gate 5 — Release Gate

**Before Deployment/Sharing**

**Purpose:** Ensure quality before public release.

**Questions:**
1. Did typecheck pass?
2. Did tests pass?
3. Did build pass?
4. Did E2E pass (if routes changed)?
5. Did browser QA complete?
6. Is PM eval above threshold?

**Required Outputs:**
* Typecheck: ✓
* Tests: ✓ (all passing)
* Build: ✓
* E2E: ✓ (if applicable)
* Browser QA: ✓
* PM eval: >= 4.2 (for public sharing)

**Approval:** QA Release Engineer + Product Manager

**Block If:**
* Typecheck failed
* Tests failing
* Build failed
* E2E failed (if applicable)
* Browser QA incomplete
* PM eval < 4.2 (for public sharing)

---

## Critical Blockers

**Any dimension below 3 blocks next phase:**

1. Value Proposition Clarity
2. Design Parity
3. UX Flow Quality
4. Requirements Compliance
5. Evidence Quality

## Approval Thresholds

**PM Eval Average Score:**

* **>= 4.2**: Approve — Ready to share broadly
* **3.5–4.1**: Approve with fixes — Minor improvements needed
* **2.5–3.4**: Block broad sharing — Rework needed
* **< 2.5**: Block next phase — Major rework required

## Gate Violation Consequences

**If a gate is bypassed:**

1. **Stop work immediately**
2. **Assess what was done**
3. **Determine what needs rollback**
4. **Complete the gate properly**
5. **Resume work if approved**

**If gate violation is systemic:**

1. **Review gate process**
2. **Identify why violations occurred**
3. **Strengthen gate checks**
4. **Retrain team on process**

## Gate Bypass Process

**Emergency bypass (rare):**

1. Document why bypass is necessary
2. Get explicit approval from Product Manager + Lead Architect
3. Define temporary workaround
4. Schedule proper gate completion
5. Monitor for risks

**Non-emergency bypass:**

**NOT ALLOWED.** Complete the gate properly.

## Gate Review Frequency

**Gates are reviewed:**

* After every phase
* Before every deployment
* When scope changes
* When risks identified

## Gate Ownership

**Gate 1 (Product Goal):** Product Manager
**Gate 2 (Design/Requirements):** Product Manager + Lead Architect
**Gate 3 (Implementation):** Lead Architect + CTO Bar Raiser
**Gate 4 (Product QA):** Product Manager + QA Release Engineer
**Gate 5 (Release):** QA Release Engineer + Product Manager

## Related Documentation

* **Product Eval Rubric:** `docs/evals/PRODUCT_EVALS.md`
* **Phase Template:** `docs/evals/PHASE_EVALUATION_TEMPLATE.md`
* **PM Agent:** `.claude/agents/product-manager.md`
* **CTO Bar Raiser:** `.claude/agents/cto-bar-raiser.md`
* **Visual Agentic Delivery System:** `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md`
* **Visual Plan Template:** `docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md`
* **Fresh Review Protocol:** `docs/agentic-delivery/FRESH_REVIEW_PROTOCOL.md`
* **Risk Scored Review:** `docs/agentic-delivery/RISK_SCORED_REVIEW.md`
* **Worktree Isolation Policy:** `docs/agentic-delivery/WORKTREE_ISOLATION_POLICY.md`

## UI/UX Work Requirements

**For UI/UX work, additional gates apply:**

### Gate 2A — Visual Plan Gate

**Before UI Implementation Starts**

**Purpose:** Ensure visual planning before coding.

**Required Outputs:**
- Visual plan with section map
- Layout map (ASCII or diagram)
- Component map
- Exact copy (no placeholders)
- Design tokens (actual values)
- Acceptance criteria
- Out-of-scope list

**Approval:** Human + Visual Plan Architect

**Block If:**
- Visual plan missing
- Layout not specified
- Copy has placeholders
- Design tokens vague

### Gate 4A — Visual QA Gate

**After UI Implementation**

**Purpose:** Ensure visual parity with prototype using evidence-based review.

**Required Outputs:**
- BEFORE screenshot (pre-implementation)
- TARGET screenshot (approved prototype)
- AFTER screenshot (post-implementation)
- DIFF comparison (visual comparison HTML)
- Evidence manifest (JSON with metadata)
- HTML report with four-panel comparison
- DOM blocker test results
- Requirement checklist with PASS/FAIL based on visual evidence
- Visual parity score (1-5)
- Dimension scores (header, hero, typography, spacing, colors, CTAs)
- Human override section (for final approval)

**Approval:** Design Quality Reviewer + Fresh Review Agent + Human

**Block If:**
- No screenshot evidence (missing BEFORE, TARGET, or AFTER)
- No evidence manifest
- No HTML report generated
- DOM blocker tests failed
- Visual parity < 4.5/5
- Critical dimension < 4/5
- Does not match prototype
- Browser state contradicts agent verdict
- AFTER looks identical to BEFORE (no change)
- AFTER looks closer to BEFORE than TARGET (wrong direction)

**Source of Truth Policy:**
> **Screenshot/browser state is the source of truth for UI acceptance.**

> **If browser state or screenshot evidence contradicts agent score, the screenshot/browser state is the source of truth.**

**Agent PASS Status:**
> **Agent-generated PASS is advisory only. It is NOT release authority.**

**No UI acceptance without:**
- ✅ Screenshot evidence (BEFORE, TARGET, AFTER)
- ✅ DOM blockers passed
- ✅ Visual report generated
- ✅ Reviewer verdict documented
- ✅ Human approval received

**No text-only acceptance:** Cannot accept UI slice based only on agent-written checklist or "looks good" claims.

**Decision Criteria:**
- **ACCEPT** if: AFTER looks closer to TARGET than BEFORE, DOM blockers passed, parity ≥ 4.5/5
- **NEEDS_REWORK** if: Some progress but doesn't fully match, parity 3.0-4.4/5
- **REJECT** if: AFTER identical to BEFORE (no change), DOM blockers failed, parity < 3.0/5

## Design QA Principles

### 1. Visual Acceptance is Evidence-Based
No UI slice can be accepted from text description alone. Evidence required for UI acceptance:
- Screenshot evidence (Actual browser state capture)
- Side-by-side comparison (Target vs current visual comparison)
- DOM verification (Deterministic tests for required/forbidden elements)
- Human verification (Human must confirm visual evidence matches target)

### 2. Screenshot/Browser State is Source of Truth
If agent verdict conflicts with browser/screenshot, browser/screenshot wins.

**Hierarchy of Truth:**
1. Browser state — What actually renders in the browser
2. Screenshot evidence — Captured visual state
3. DOM tests — Deterministic verification
4. Agent verdict — Advisory input only
5. Text claims — Least reliable

### 3. P0 Blocker Caps Score
If any P0 visual blocker fails, maximum score is 2.9/5.

**P0 Blocker = Automatic REJECTED** if:
- Missing rounded pill header
- Missing "MEETING READINESS" subtitle
- Missing "Log in" button
- Missing "Run readiness check" CTA
- Missing required nav items
- Forbidden old nav visible (Home, Build Process)
- Header is full-width generic navbar

**Score Cap:**
- Any P0 blocker fails → Maximum score 2.9/5
- No screenshot evidence → Maximum score 2.0/5
- DOM blockers missing → Cannot be ACCEPTED

### 4. Generic SaaS Output is Rejection
If implementation looks like a generic template rather than approved prototype direction, status is NEEDS_REWORK or REJECTED.

**Generic SaaS Indicators:**
- Full-width navbar
- Bootstrap-style nav
- Generic cards without personality
- Template feel without brand character
- "Reasonable alternative" instead of prototype fidelity

### 5. Visual Similarity is Not Optional
For Phase 2.1, the target is Proben MVP 6 visual direction, not a "reasonable alternative."

**Similarity Requirements:**
- Header structure must match prototype (rounded pill, not full-width)
- Typography must match prototype (font, size, weight)
- Colors must match prototype (exact values or equivalent visual impression)
- Spacing must match prototype (layout, proportions)
- CTAs must match prototype (position, color, text)

**"Reasonable Alternative" is REJECTION grounds** unless explicitly approved in visual plan.

**See:** `docs/design/DESIGN_QUALITY_GATES.md` for complete visual quality gate specifications.
**See:** `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md` for complete pipeline documentation.

---

## Gate 6 — Learning Log Gate

**After Implementation or Decision**

**Purpose:** Ensure that failures, decisions, and improvements are documented for learning and regression prevention.

**Required Documentation:**
- BUILD_LEARNING_DECISION_LOG.md updated with BLD entry
- BUILD_LEARNING_DECISION_INDEX.md updated
- QUALITY_METRICS_HISTORY.md updated (if metrics changed)
- LESSONS_LEARNED.md updated (if new reusable learning)

**Block If:**
- A failure occurred and no BLD entry was created
- A new gate was added but not linked to a failure/decision
- Agent roster changed but no decision entry exists
- Human override occurred but was not recorded
- Metrics changed but QUALITY_METRICS_HISTORY.md was not updated

**Mandatory Triggers:**
A BLD entry is REQUIRED when:
- Failed or rejected slice
- False PASS occurred
- Human override happened
- New gate/eval/agent added
- Visual QA process changed
- Architecture/security decision made

**Approval:** Governance Auditor + Human

**Documentation:**
- **Build Learning Log:** `docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md`
- **Learning Index:** `docs/product-build-history/BUILD_LEARNING_DECISION_INDEX.md`
- **Metrics History:** `docs/product-build-history/QUALITY_METRICS_HISTORY.md`
- **Lessons:** `docs/product-build-history/LESSONS_LEARNED.md`
- **Public Portfolio:** `/portfolio/how-proben-was-built`

**No Release-Critical Task Complete** unless:
- Learning/decision log is updated OR explicitly marked as "no new learning" (for trivial changes only)

---

## Gate 7 — Eval Requirements Gate

**After Failure, False PASS, or Human Override**

**Purpose:** Ensure every failure creates a reusable regression case through eval-driven quality loops.

**Required Eval Documentation:**
- Eval case created using `EVAL_CASE_TEMPLATE.md`
- Eval case added to appropriate registry (VISUAL_QUALITY_EVALS, AGENT_RELIABILITY_EVALS, PRODUCT_ACCEPTANCE_EVALS)
- Eval case added to data file (visual-quality-cases.jsonl, agent-reliability-cases.jsonl, product-acceptance-cases.jsonl)
- Root cause analysis documented
- Required gate update specified
- Regression test identified or added
- Learning outcomes documented

**Block If:**
- Failure occurred and no eval case was created
- False PASS occurred and no agent reliability eval case was created
- Human override occurred and no eval case was created
- Eval case created but no prevention measures specified
- Gate/eval/test added but not linked to failure case

**Mandatory Triggers:**
An eval case is REQUIRED when:
- Visual mismatch detected (VISUAL_MISMATCH)
- False PASS occurred (FALSE_AGENT_PASS)
- Text-only acceptance without evidence (TEXT_ONLY_ACCEPTANCE)
- Generic SaaS output detected (GENERIC_SAAS_OUTPUT)
- PRD alignment failure (PRD_ALIGNMENT_FAIL)
- Design gate failure (DESIGN_GATE_FAIL)
- Security review missing (SECURITY_REVIEW_MISSING)
- Human override required (HUMAN_OVERRIDE_REQUIRED)

**Eval Categories:**

**1. Visual Quality Evals**
- Prototype parity score (target vs implementation)
- Before/target/after comparison quality
- Visual blocker detection (P0/P1 blockers)
- Generic SaaS pattern detection
- Typography/layout/CTA hierarchy quality
- Screenshot evidence completeness

**2. Agent Reliability Evals**
- False PASS count (agent claimed PASS, human disagreed)
- Self-approval attempts (builder reviewed own work)
- Missing evidence (no screenshots, no DOM tests)
- Stale screenshot usage (old timestamp)
- Wrong route tested (screenshot from different URL)
- Incorrect confidence score (overconfident on wrong result)
- Failure to escalate to human

**3. Product Acceptance Evals**
- PRD/RFC/ADR alignment (implementation matches source documents)
- User value clarity (value proposition is clear)
- Acceptance criteria coverage (all requirements met)
- Product clarity score (user problem addressed)
- Requirement-to-test mapping (tests exist for requirements)

**4. Security/Safety Evals**
- Protected file changes (auth, payment, config files)
- Secrets/config edits (API keys, environment variables)
- Auth/payment/data risk (sensitive operations)
- Prompt-injection exposure (unvalidated user input)
- Unsafe external calls (unverified external dependencies)

**Eval Metrics and Thresholds:**

**Visual Quality:**
- UI slice cannot be accepted if visual parity < 4.5/5
- UI slice cannot be accepted if any P0 blocker fails
- Evidence completeness must be 100% for UI acceptance

**Agent Reliability:**
- Agent reliability is unacceptable if false PASS rate > 0 for release-critical tasks
- Self-approval always results in eval case creation
- Missing evidence automatically creates reliability eval case

**Product Acceptance:**
- Product acceptance score must be >= 4.0/5 for release
- All acceptance criteria must be covered by tests
- PRD/RFC/ADR alignment must be >= 4.5/5

**Overall:**
- Human override always wins over agent verdict
- Tests passing is necessary but not sufficient
- Every failure must create an eval case
- Every false PASS must update a gate, hook, prompt, or test

**Approval:** Governance Auditor + Human

**Documentation:**
- **Eval System:** `docs/evals/EVALS.md`
- **Eval Registry:** `docs/evals/EVAL_REGISTRY.md`
- **Failure Taxonomy:** `docs/evals/FAILURE_MODE_TAXONOMY.md`
- **Visual Quality Evals:** `docs/evals/VISUAL_QUALITY_EVALS.md`
- **Agent Reliability Evals:** `docs/evals/AGENT_RELIABILITY_EVALS.md`
- **Product Acceptance Evals:** `docs/evals/PRODUCT_ACCEPTANCE_EVALS.md`

**Scripts:**
- **Create Eval Case:** `scripts/create-eval-case-from-failure.js`
- **Run Quality Evals:** `scripts/run-quality-evals.js`

**Data Files:**
- **Visual Quality Cases:** `evals/visual-quality-cases.jsonl`
- **Agent Reliability Cases:** `evals/agent-reliability-cases.jsonl`
- **Product Acceptance Cases:** `evals/product-acceptance-cases.jsonl`

**No Release-Critical Workflow Change Accepted** unless:
- Eval case exists for previous failure
- New gate prevents recurrence
- Evidence shows gate works
- Human approves

---

## Gate 8 — Harness Gate

**After All Other Gates, Before Final Release**

**Purpose:** Ensure that the Case-inspired agent harness state machine reached CLOSE with valid proof and complete evidence package.

**Required Harness State:**
- State machine reached CLOSE (not stuck in IMPLEMENT, VERIFY, or REVIEW)
- All state transitions were valid (no forbidden transitions)
- Revision budget not exhausted (or human escalation occurred)

**Required Proof Manifests:**
- All required commands executed (typecheck, tests, build)
- All required commands passed (exitCode === 0)
- All SHA-256 hashes verified (no fake execution)
- All proof manifests valid (not stale, not tampered)

**Required Evidence Package:**
- ✅ Proof manifests valid and verified
- ✅ SHA-256 hashes match (no fake evidence)
- ✅ DOM blockers pass (if UI work)
- ✅ Visual evidence exists (BEFORE/TARGET/AFTER) if UI work
- ✅ Fresh review complete (builder ≠ reviewer)
- ✅ Human approval recorded
- ✅ Retro entry exists (for any failure/rework)

**Block If:**
- State machine stuck in IMPLEMENT/VERIFY/REVIEW
- State transition invalid (forbidden transition occurred)
- Proof manifest missing or invalid
- SHA-256 hash mismatch (fake execution detected)
- DOM blockers failed
- Visual evidence incomplete (if UI work)
- No fresh review (self-approval detected)
- No human approval
- No retro entry (for failures)

**Approval:** CTO Bar Raiser + Human

**Harness State Verification:**
```bash
# Verify proof manifest
node scripts/harness/verify-proof-manifest.js <run-id>

# Validate state transition
node scripts/harness/validate-state-transition.js --from REVIEW --to CLOSE --run-id <run-id>

# Generate harness report
node scripts/harness/generate-harness-report.js --run-id <run-id>
```

**Required State:**
- currentState = "CLOSE"
- All proof manifests PASSED
- All SHA-256 hashes verified
- Evidence package complete
- Fresh review documented
- Human approval recorded
- Retro entry exists (if applicable)

**Forbidden States:**
- currentState = "IMPLEMENT" (no verification occurred)
- currentState = "VERIFY" (no review occurred)
- currentState = "REVIEW" (review incomplete or failed)
- currentState = "RETRO" (no close evidence)
- Missing state.json file
- Invalid state transition detected

**Evidence Package Completeness:**
- ✅ State file (test-results/harness/<run-id>/state.json)
- ✅ Proof manifest (test-results/harness/<run-id>/proof-manifest.json)
- ✅ Command logs (typecheck.log, tests.log, build.log)
- ✅ SHA-256 hashes verified
- ✅ DOM blocker results (if UI work)
- ✅ Visual evidence (if UI work)
- ✅ Harness report (HTML)
- ✅ Retro entry (docs/product-build-history/retro/<run-id>.md)

**Proof Verification:**
- SHA-256 hashes recomputed and verified
- Log files exist and are not empty
- Exit codes === 0 for required commands
- Manifests not stale (timestamps recent)
- Duration reasonable (not instantaneous)

**State Machine Verification:**
- State transitions valid (no forbidden transitions)
- Revision budget respected (≤ 2 loops)
- Entry criteria met for each state
- Exit criteria met for each state
- Evidence requirements satisfied

**Harness Gate Decision:**
- **PASS** — State = CLOSE, all proofs valid, evidence complete, human approved
- **FAIL** — State ≠ CLOSE, proofs invalid, evidence incomplete, no human approval

**Documentation:**
- **Harness System:** `docs/agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md`
- **State Machine:** `docs/agentic-delivery/AGENT_STATE_MACHINE.md`
- **Evidence Protocol:** `docs/agentic-delivery/EVIDENCE_PROOF_PROTOCOL.md`
- **Revision Policy:** `docs/agentic-delivery/REVISION_LOOP_POLICY.md`
- **Scripts:** `scripts/harness/`

---
