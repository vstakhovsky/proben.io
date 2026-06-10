# Proben.io Design Quality Gates

## Purpose

Design quality gates prevent the team from shipping UI that is technically functional but visually weak, generic, or misaligned with the approved Proben MVP 6 prototype.

---

## Core Principle

**Design quality is not equal to technical correctness.**

A page can compile, pass tests, and deploy successfully while still being visually weak, generic, or misaligned with the product vision.

---

## Evidence-Based Completion Rule (CRITICAL)

**Agents must never mark UI work as complete based only on build, tests, or route availability.**

**Required Evidence for All UI Tasks:**

Before any UI task can be marked as "complete," the following evidence MUST be produced and reviewed:

1. **Reference Evidence**
   - [ ] Reference prototype path identified
   - [ ] Source screenshot available

2. **Current Evidence**
   - [ ] Current implementation screenshot captured
   - [ ] Route tested in browser
   - [ ] Responsive behavior verified

3. **Comparison Evidence**
   - [ ] Side-by-side comparison created
   - [ ] Visual parity score calculated (1-5 scale)
   - [ ] Each dimension scored

4. **Verdict Evidence**
   - [ ] Explicit ACCEPTED or REJECTED status
   - [ ] List of what matches
   - [ ] List of what doesn't match
   - [ ] Required fixes specified (if rejected)

**Acceptance Threshold:**

- Visual parity score: **>= 4.5/5**
- All critical dimensions: **>= 4/5**
- No missing prototype elements

**Below Threshold: Automatic REJECTION with specific blockers.**

---

## The Five Design Gates

### Gate 1 — Prototype Alignment

**Before Implementation**

**Purpose:** Ensure source of truth is clear before starting.

**Questions:**
1. Is the source-of-truth screenshot available?
2. Is the target section clearly identified?
3. Is the expected layout described?
4. Is the expected copy documented?
5. Is the expected route behavior documented?

**Required Evidence:**
* Reference screenshot from `reference/screenshots/proben-mvp-6/`
* Section or component being targeted
* Layout description
* Copy/content specified
* Route behavior defined

**Approval:** Design Quality Reviewer

**Block If:**
* Source screenshot missing
* Target section unclear
* Layout not specified
* Copy not defined
* Route behavior ambiguous

---

### Gate 2 — Taste Review

**Before Implementation**

**Purpose:** Ensure visual quality before writing code.

**Questions:**
1. Is visual hierarchy clear?
2. Is spacing consistent?
3. Is typography intentional?
4. Is composition balanced?
5. Are colors disciplined?
6. Is there enough empty space?
7. Does it fit the brand?

**Required Evidence:**
* Visual hierarchy assessment
* Spacing system defined
* Typography choices justified
* Color palette specified
* Layout composition described

**Approval:** Design Quality Reviewer

**Block If:**
* Visual hierarchy weak
* Spacing inconsistent
* Typography unclear
* Colors random or excessive
* Composition unbalanced
* Brand fit poor

---

### Gate 3 — Structure Review

**Before Implementation**

**Purpose:** Ensure implementation approach is sound.

**Questions:**
1. Is the layout approach simple?
2. Is component structure justified?
3. Are there unnecessary dependencies?
4. Is responsive approach defined?
5. Are accessibility requirements clear?

**Required Evidence:**
* Layout structure plan
* Component breakdown
* Responsive strategy
* Accessibility checklist
* No new dependencies unless essential

**Approval:** Design Quality Reviewer + Lead Architect

**Block If:**
* Layout too complex
* Over-abstraction planned
* New dependencies not justified
* Responsive approach unclear
* Accessibility not considered

---

### Gate 4 — Implementation Review

**After Implementation**

**Purpose:** Ensure implementation matches quality standards.

**Questions:**
1. Was screenshot comparison completed?
2. Was browser QA completed?
3. Does design parity score meet threshold?
4. Are there AI-generated UI smells?
5. Did we stay within scope?

**Required Evidence:**
* Before/after screenshots
* Browser QA checklist
* Design parity score >= 4
* PM product eval updated
* No scope creep detected

**Approval:** Design Quality Reviewer + Product Manager

**Block If:**
* No screenshots captured
* No browser QA performed
* Design parity < 4
* PM eval < 4.0
* Scope creep detected

---

### Gate 5 — Release Design Gate

**Before Deployment/Sharing**

**Purpose:** Final quality check before public release.

**Questions:**
1. Did all previous gates pass?
2. Is design parity >= 4?
3. Is value proposition clarity >= 4?
4. Is UX flow quality >= 4?
5. Are requirements compliance >= 4?
6. Is evidence quality >= 4?
7. Are there no P0 design gaps?

**Required Evidence:**
* Gate 1-4 completion verified
* Design parity score >= 4
* PM product eval average >= 4.2
* All critical blockers >= 4
* No P0 gaps remaining

**Approval:** Product Manager + Design Quality Reviewer

**Block If:**
* Any previous gate bypassed
* Design parity < 4
* PM eval < 4.2
* Critical blocker < 4
* P0 gaps remain

---

## Design Review Rubric

Use 0–5 scoring for each dimension:

### 1. Prototype Parity (Critical Blocker)

**Question:** Does the implementation match the approved prototype?

**Scoring:**
* 5: Exact match with prototype
* 4: Minor deviations from prototype
* 3: Noticeable deviations but maintains essence
* 2: Major deviations from prototype
* 1: Barely resembles prototype
* 0: No prototype alignment

### 2. Visual Hierarchy

**Question:** Is the primary message obvious?

**Scoring:**
* 5: Crystal clear hierarchy
* 4: Good hierarchy with minor issues
* 3: Acceptable hierarchy
* 2: Weak hierarchy
* 1: Poor hierarchy
* 0: No hierarchy

### 3. Typography Quality

**Question:** Is typography intentional and comfortable?

**Scoring:**
* 5: Excellent typography
* 4: Good typography
* 3: Acceptable typography
* 2: Poor typography
* 1: Bad typography
* 0: Broken typography

### 4. Spacing & Rhythm

**Question:** Are spacing and rhythm consistent?

**Scoring:**
* 5: Excellent spacing and rhythm
* 4: Good spacing and rhythm
* 3: Acceptable spacing and rhythm
* 2: Poor spacing or rhythm
* 1: Bad spacing and rhythm
* 0: No spacing system

### 5. Composition

**Question:** Is the layout balanced?

**Scoring:**
* 5: Excellent composition
* 4: Good composition
* 3: Acceptable composition
* 2: Poor composition
* 1: Bad composition
* 0: No composition

### 6. Color Discipline

**Question:** Are colors limited and purposeful?

**Scoring:**
* 5: Excellent color discipline
* 4: Good color discipline
* 3: Acceptable color discipline
* 2: Poor color discipline
* 1: Bad color discipline
* 0: No color discipline

### 7. CTA Clarity (Critical Blocker)

**Question:** Are CTAs obvious and compelling?

**Scoring:**
* 5: Excellent CTA clarity
* 4: Good CTA clarity
* 3: Acceptable CTA clarity
* 2: Poor CTA clarity
* 1: Bad CTA clarity
* 0: No clear CTA

### 8. Readiness Preview Credibility

**Question:** Does the preview feel useful and realistic?

**Scoring:**
* 5: Highly credible and useful
* 4: Good credibility
* 3: Acceptable credibility
* 2: Low credibility
* 1: Not credible
* 0: No credibility

### 9. Responsive Quality (Critical Blocker)

**Question:** Does responsive behavior work well?

**Scoring:**
* 5: Excellent responsive behavior
* 4: Good responsive behavior
* 3: Acceptable responsive behavior
* 2: Poor responsive behavior
* 1: Bad responsive behavior
* 0: Broken responsive behavior

### 10. Brand Fit (Critical Blocker)

**Question:** Does it feel like Proben, not generic SaaS?

**Scoring:**
* 5: Perfect brand fit
* 4: Good brand fit
* 3: Acceptable brand fit
* 2: Weak brand fit
* 1: Poor brand fit
* 0: No brand alignment

---

## Approval Thresholds

* **Visual Parity >= 4.5/5**: APPROVE — Matches prototype
* **4.0–4.4**: APPROVE WITH FIXES — Minor visual gaps
* **< 4.0**: REJECT — Does not match prototype, requires rework

**CRITICAL: No UI work can be approved if visual parity < 4.5/5.**

This threshold is non-negotiable. Tests passing, build succeeding, or routes working does NOT override low visual parity.

---

## Critical Blockers

**Any dimension scoring below 4 blocks deployment:**

1. **Prototype Parity** — Must match approved design (>= 4.5/5 required)
2. **CTA Clarity** — Users must know what to do
3. **Responsive Quality** — Must work on mobile
4. **Brand Fit** — Must feel like Proben
5. **Evidence Quality** — Must have screenshots/QA

**Automatic Rejection Triggers:**

A UI task MUST be rejected if ANY of:
1. No visual evidence provided (no screenshots, no comparison)
2. Visual parity score < 4.5/5
3. Critical dimension score < 4/5
4. Missing prototype elements
5. Result looks like generic AI-generated SaaS UI
6. Reference prototype not identified

---

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

---

## Related Documentation

* **Design Review Template:** `docs/design/DESIGN_REVIEW_TEMPLATE.md`
* **Design Quality Reviewer:** `.claude/agents/design-quality-reviewer.md`
* **Design Taste Review:** `.claude/skills/design-taste-review/SKILL.md`
* **UI Structure Review:** `.claude/skills/ui-structure-review/SKILL.md`
* **Product Eval Rubric:** `docs/evals/PRODUCT_EVALS.md`

---

**Last Updated:** 2026-06-09
**Current Phase:** 2.1 (Design Parity)

---

## Phase 2.1 Failure Analysis Update

After the Phase 2.1 implementation was rejected for visual mismatch with prototype, the following governance changes were made:

### New Rules Added

1. **Evidence-Based Completion** — UI tasks require screenshot evidence, not just tests passing
2. **Visual Parity Threshold** — Minimum 4.5/5 required for approval
3. **PM Visual Verification** — PM must personally verify visual evidence
4. **Design QA Blocking Authority** — Design QA must auto-reject if parity < 4.5/5
5. **CTO Visual Quality Mandate** — CTO Bar Raiser must verify visual evidence
6. **Functional/Visual Separation** — QA must distinguish functional vs visual success
7. **Independent Visual QA** — Implementation and verification must be separate

### Related Documentation

- **Failure Analysis:** `docs/reviews/phase-2-1-failure-analysis.md`
- **Process Learnings:** `docs/PROCESS_LEARNINGS.md`
- **Updated Agents:** `.claude/agents/product-manager.md`, `.claude/agents/design-quality-reviewer.md`, `.claude/agents/cto-bar-raiser.md`, `.claude/agents/qa-release-engineer.md`
