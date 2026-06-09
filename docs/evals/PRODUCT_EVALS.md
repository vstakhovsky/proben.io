# Product Evaluation Rubric - Proben.io

## Purpose

This document defines the product evaluation rubric for Proben.io phases. The PM agent uses this rubric to evaluate whether a phase actually improved the product or only added code/docs.

## Scoring System

Each dimension is scored on a 0–5 scale:

* **5** = excellent / ready to share broadly
* **4** = good / minor improvements needed
* **3** = acceptable but not polished
* **2** = weak / needs rework
* **1** = poor / does not meet requirement
* **0** = missing

## Approval Thresholds

* **Average score >= 4.2**: Approve — Ready to share
* **Average score 3.5–4.1**: Approve with fixes — Minor improvements needed
* **Average score 2.5–3.4**: Block broad sharing — Rework needed
* **Average score < 2.5**: Block next phase — Major rework required

## Critical Blockers

Any dimension scoring below 3 **blocks the next phase**:

1. Value Proposition Clarity
2. Design Parity
3. UX Flow Quality
4. Requirements Compliance
5. Evidence Quality

---

## Evaluation Dimensions

### 1. Value Proposition Clarity (Critical Blocker)

**Question:**
Can a new visitor understand what Proben.io does in 5 seconds?

**Scoring:**
* **5**: Clear value prop above the fold, no confusion possible
* **4**: Value prop clear but could be more prominent
* **3**: Value prop understandable but not immediately obvious
* **2**: Value prop vague or buried
* **1**: Value prop unclear or confusing
* **0**: No value proposition visible

### 2. Target User Clarity

**Question:**
Is it clear who the product is for?

**Scoring:**
* **5**: Target audience obvious from headline and copy
* **4**: Target audience clear but could be more explicit
* **3**: Target audience implied but not stated
* **2**: Target audience ambiguous
* **1**: Wrong or confusing target audience signals
* **0**: No target audience indication

### 3. Problem/Solution Fit

**Question:**
Does the product clearly solve meeting readiness / context gap problems?

**Scoring:**
* **5**: Problem and solution clearly aligned and compelling
* **4**: Good problem/solution fit with minor gaps
* **3**: Problem/solution fit acceptable but not strong
* **2**: Weak connection between problem and solution
* **1**: Problem/solution mismatch
* **0**: No clear problem or solution

### 4. Design Parity (Critical Blocker)

**Question:**
Does the implementation match the approved Claude Design / Proben MVP 6 prototype?

**Scoring:**
* **5**: Matches prototype in layout, visual style, and interaction
* **4**: Minor deviations from prototype
* **3**: Noticeable deviations but maintains essence
* **2**: Major deviations from prototype
* **1**: Barely resembles prototype
* **0**: No prototype alignment

### 5. UX Flow Quality (Critical Blocker)

**Question:**
Can the user move from landing → readiness check → result/report without confusion?

**Scoring:**
* **5**: Smooth, intuitive flow with clear CTAs
* **4**: Good flow with minor friction points
* **3**: Functional flow but some confusion likely
* **2**: Confusing flow, user may get stuck
* **1**: Broken flow, major obstacles
* **0**: Flow incomplete or non-functional

### 6. Readiness Check Credibility

**Question:**
Does the readiness check feel useful and realistic, not like a toy demo?

**Scoring:**
* **5**: Feels like a real, useful tool
* **4**: Credible with minor demo limitations
* **3**: Acceptable demo quality
* **2**: Feels like a toy or mock
* **1**: Obviously fake or trivial
* **0**: Non-functional

### 7. Result/Report Quality

**Question:**
Does the report provide actionable output: score, gaps, fixes, likely questions, practice moment?

**Scoring:**
* **5**: All elements present, actionable, and valuable
* **4**: Most elements present and useful
* **3**: Basic report with limited actionability
* **2**: Minimal report value
* **1**: Report barely useful
* **0**: No report or non-functional

### 8. Strategic Alignment

**Question:**
Does this phase move Proben.io toward the intended product vision?

**Scoring:**
* **5**: Clearly advances the product vision
* **4**: Good progress toward vision
* **3**: Neutral progress, neither helps nor hurts
* **2**: Drifts from vision
* **1**: Contradicts vision
* **0**: Opposes product strategy

### 9. Portfolio Signal

**Question:**
Does this phase demonstrate relevant AI PM / Technical PM skills?

**Scoring:**
* **5**: Strong demonstration of relevant skills
* **4**: Good demonstration with clear evidence
* **3**: Acceptable portfolio value
* **2**: Weak portfolio signal
* **1**: Minimal portfolio value
* **0**: No portfolio value demonstrated

### 10. Simplicity / Scope Control

**Question:**
Did we avoid unnecessary complexity?

**Scoring:**
* **5**: Excellent scope control, no unnecessary complexity
* **4**: Good scope control with minor overbuilding
* **3**: Acceptable complexity for the value delivered
* **2**: Unnecessary complexity present
* **1**: Significant overengineering
* **0**: Massive overengineering

### 11. Requirements Compliance (Critical Blocker)

**Question:**
Does the product match PRD, RFC, design spec, and phase acceptance criteria?

**Scoring:**
* **5**: Full compliance with all source documents
* **4**: Minor deviations with justification
* **3**: Acceptable compliance with documented gaps
* **2**: Significant non-compliance
* **1**: Major requirements missed
* **0**: Requirements ignored

### 12. Evidence Quality (Critical Blocker)

**Question:**
Are claims supported by tests, screenshots, browser checks, or deployment evidence?

**Scoring:**
* **5**: Strong evidence across multiple verification methods
* **4**: Good evidence with minor gaps
* **3**: Acceptable evidence quality
* **2**: Weak evidence, many unverified claims
* **1**: Minimal evidence
* **0**: No evidence provided

---

## Phase Evaluation Template

Use this template when evaluating a phase:

```markdown
# Phase Evaluation: [Phase Name]

## Product Eval Scores

| Dimension | Score | Notes |
|-----------|-------|-------|
| Value Proposition Clarity | X/5 | |
| Target User Clarity | X/5 | |
| Problem/Solution Fit | X/5 | |
| Design Parity | X/5 | |
| UX Flow Quality | X/5 | |
| Readiness Check Credibility | X/5 | |
| Result/Report Quality | X/5 | |
| Strategic Alignment | X/5 | |
| Portfolio Signal | X/5 | |
| Simplicity/Scope Control | X/5 | |
| Requirements Compliance | X/5 | |
| Evidence Quality | X/5 | |
| **Average** | **X/5** | |

## Critical Blockers Check

* Value Proposition Clarity: [PASS/FAIL]
* Design Parity: [PASS/FAIL]
* UX Flow Quality: [PASS/FAIL]
* Requirements Compliance: [PASS/FAIL]
* Evidence Quality: [PASS/FAIL]

## PM Verdict

[ ] Approve — Ready to share
[ ] Approve with fixes — Minor improvements needed
[ ] Block broad sharing — Rework needed
[ ] Block next phase — Major rework required

## Required Fixes

List P0/P1/P2 fixes.
```

---

## Usage Guidelines

1. **Evaluate honestly, not optimistically.** A 3/5 is not good enough for critical dimensions.
2. **Use evidence, not feelings.** Point to specific screenshots, test results, or user feedback.
3. **Consider the user perspective.** What would a first-time visitor think?
4. **Check for product-process inversion.** Is the portfolio work stronger than the product?
5. **Challenge technical completeness.** Working code is not the same as a good product.

---

## Related Documentation

* **Phase Evaluation Template**: `docs/evals/PHASE_EVALUATION_TEMPLATE.md`
* **Phase Gate Policy**: `docs/PHASE_GATE_POLICY.md`
* **PRD**: `docs/PRD.md`
* **RFC**: `docs/RFC-0001-architecture.md`
