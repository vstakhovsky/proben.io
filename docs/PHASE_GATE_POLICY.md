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

**Purpose:** Ensure visual parity with prototype.

**Required Outputs:**
- Screenshot comparison (before/after)
- Visual parity score (1-5)
- Dimension scores (header, hero, typography, spacing, colors, CTAs)
- Side-by-side comparison with prototype

**Approval:** Design Quality Reviewer + Fresh Review Agent

**Block If:**
- No screenshot evidence
- Visual parity < 4.5/5
- Critical dimension < 4/5
- Does not match prototype

**See:** `docs/design/DESIGN_QUALITY_GATES.md` for complete visual quality gate specifications.
