# Phase 2.1 Failure Analysis: Why Agents Accepted a Visually Incorrect Result

## Executive Summary

During Phase 2.1 implementation, the agent system accepted a landing page implementation that did not visually match the approved Proben MVP 6 prototype. The human reviewer rejected the result because the page was functional but visually different from the approved design.

This analysis identifies why the agent governance system failed to block this result.

---

## What Went Wrong

### The Implementation Gap

**Current Implementation Status:**
- The `app/page.tsx` file contains hero content with the right copy
- The page is technically functional: routes work, tests pass, builds succeed
- **Critical Missing Element:** The implementation lacks the proper navigation/header structure shown in the prototype

**Prototype Requirements (from `reference/screenshots/proben-mvp-6/`):**
- Full-width navigation bar with white background
- Left-aligned logo "Proben" with minimalist icon
- Right-aligned navigation: "Sample report", "How it works", "Checks", "Resources", "Pricing"
- Far right: "Log in" button and prominent green "Run readiness check" button
- Clean, minimalist design with proper spacing

**What Was Built:**
- Hero section exists (partially correct)
- Missing: proper navigation header structure
- Missing: visual alignment with prototype layout
- Missing: proper spacing and whitespace ratios

---

## Root Cause Analysis

### 1. Which Agent Should Have Blocked the Result?

**Primary Responsibility: Design Quality Reviewer Agent**

The Design Quality Reviewer agent has the explicit responsibility to "prevent technically working but visually weak UI" and to detect "low design parity with prototype."

**Why It Failed to Block:**
- The agent definition exists but lacks explicit enforcement of evidence-based completion
- No mandatory requirement for screenshot comparison before declaring "done"
- No explicit visual parity score threshold that must be met
- The agent has gates but they were likely bypassed or not invoked

**Secondary Responsibility: Product Manager Agent**

The PM agent has authority to "block or challenge implementation if the product does not match the approved MVP/prototype."

**Why It Failed to Block:**
- The PM agent definition includes design quality review requirements but as "must request Design Quality Reviewer input" rather than explicit blocking
- No explicit requirement that PM must personally verify visual parity
- No requirement for PM to produce visual evidence before approval

**Tertiary Responsibility: CTO Bar Raiser**

The CTO Bar Raiser is supposed to challenge "green checkmarks without evidence" and "claims without verification."

**Why It Failed to Block:**
- The CTO Bar Raiser focuses on overengineering and scope creep
- Visual quality is listed as a concern but not as a primary blocking criterion
- No explicit mandate to verify visual evidence for UI tasks

---

### 2. Which Acceptance Criteria Were Too Weak?

**Weak Criterion 1: "Tests pass"**
- Tests passing is necessary but not sufficient for UI work
- Functional correctness ≠ visual correctness
- Tests verify behavior, not appearance

**Weak Criterion 2: "Build succeeds"**
- Build success proves compilation, not quality
- A visually incorrect page can build successfully

**Weak Criterion 3: "Routes work"**
- Route availability is functional, not visual
- A page can load and still not match the prototype

**Weak Criterion 4: "Code compiles"**
- TypeScript compilation checks types, not design
- Syntactically correct code can be visually wrong

**Missing Criterion: Visual Parity Score**
- No explicit requirement to score visual similarity
- No threshold (e.g., 4.5/5) that must be met
- No mandatory screenshot comparison

---

### 3. Which Checks Were Based on Build/Tests Instead of Visual Evidence?

**Build-Based Checks (Insufficient for UI):**
- `npm run type-check` — verifies types, not visuals
- `npm test` — verifies behavior, not appearance
- `npm run build` — verifies compilation, not design
- Route testing — verifies navigation, not layout

**What Was Missing: Visual Evidence Checks**
- Screenshot of current implementation
- Side-by-side comparison with prototype
- Visual parity score (1-5 scale)
- Header/navigation comparison
- Hero layout comparison
- Typography comparison
- Spacing comparison
- Color/token comparison
- CTA comparison
- Product preview card comparison
- Responsive behavior comparison

---

### 4. Which Prototype Elements Were Not Enforced?

**Not Enforced:**
1. **Navigation structure** — Not verified for visual match
2. **Logo placement and style** — Not checked
3. **Navigation items and order** — Not verified
4. **Header button placement** — Not enforced
5. **Two-column layout balance** — Not measured
6. **Typography scale** — Not verified
7. **Spacing ratios** — Not checked
8. **Color tokens** — Not validated
9. **Rounded corner consistency** — Not enforced
10. **Shadow and border usage** — not checked

**Why:**
- Agent definitions mention these elements but don't require evidence
- No mandatory screenshot comparison checklist
- No explicit visual parity scoring system

---

### 5. Why Did the PM Agent Accept the Result?

**PM Agent Weaknesses:**

1. **Design authority delegated but not enforced**
   - PM definition says "must request Design Quality Reviewer input"
   - But no requirement to wait for actual review completion
   - No requirement to verify visual evidence personally

2. **Acceptance criteria focused on function, not form**
   - PM checks: "Does the result match the target prototype and PRD?"
   - But no specification of HOW to verify this (screenshots, scores)
   - No explicit threshold for visual match

3. **Product eval exists but may not have been invoked**
   - `docs/evals/PRODUCT_EVALS.md` exists with scoring rubric
   - But no evidence it was actually used
   - No requirement to attach product eval to completion

---

### 6. Why Did the Design Reviewer Fail to Reject It?

**Design Quality Reviewer Weaknesses:**

1. **Gates defined but not enforced**
   - Five gates defined in `docs/design/DESIGN_QUALITY_GATES.md`
   - But no evidence they were actually executed
   - No gate completion status tracked

2. **Scoring system exists but not mandatory**
   - Design parity score defined (0-5 scale)
   - No explicit requirement to produce this score
   - No threshold that must be met before "done"

3. **Evidence requirements not enforced**
   - Agent definition mentions "no design complete verdict without screenshot/browser verification"
   - But no evidence this was actually checked
   - No mandatory evidence attachment to completion

---

### 7. Why Did the CTO Bar Raiser Not Detect This?

**CTO Bar Raiser Weaknesses:**

1. **Focus on different problems**
   - CTO Bar Raiser optimized for: overengineering, scope creep, dependencies
   - Visual quality is listed but not as primary blocker
   - "Green checkmarks without evidence" is an anti-pattern but not explicitly for UI

2. **No explicit visual quality mandate**
   - Agent mentions design quality challenges but focuses on technical overengineering
   - No explicit requirement to verify visual evidence
   - No authority to block based purely on visual mismatch

3. **Anti-patterns don't include "visually incorrect but functional"**
   - Listed anti-patterns: infrastructure first, future-proofing, process theater
   - Missing: "functional but visually wrong UI"

---

### 8. What Rules Must Be Added to Prevent This?

**Rule 1: Evidence-Based Completion for UI Tasks**

For any UI/UX task, the following evidence MUST be produced before declaring "complete":

- Reference prototype path
- Current implementation screenshot
- Side-by-side comparison
- Visual parity score (1-5)
- Explicit ACCEPTED/REJECTED verdict

**Rule 2: Design Parity as Release-Blocking Requirement**

Visual parity with approved prototype is a MANDATORY quality gate.

- Threshold: >= 4.5/5 for approval
- Scoring dimensions: header, hero, typography, spacing, colors, CTAs, responsiveness
- Below threshold: automatic rejection with specific blockers listed

**Rule 3: PM Agent Visual Verification**

The Product Manager agent MUST personally verify visual evidence for UI tasks.

- PM cannot delegate visual quality verification entirely
- PM must produce product eval scores for UI work
- PM must explicitly state ACCEPTED or REJECTED with evidence

**Rule 4: Design QA Agent Blocking Authority**

The Design Quality Reviewer agent MUST block UI work that doesn't match prototype.

- Automatic rejection if visual parity < 4.5/5
- Must produce detailed comparison: what matches, what doesn't
- Must list specific fixes required for approval
- Cannot be overridden by "tests pass" or "build succeeds"

**Rule 5: CTO Bar Raiser Visual Quality Mandate**

The CTO Bar Raiser MUST verify visual evidence for UI tasks before approval.

- Add "functional but visually wrong" to anti-patterns list
- Explicit authority to block based on visual mismatch
- Must verify screenshot evidence exists
- Must challenge "done" without visual verification

**Rule 6: Separation of Functional and Visual Success**

QA Release Engineer MUST distinguish between functional success and visual quality.

- Functional QA passed: routes work, tests pass
- Visual QA status: separate verdict
- Release blocked if visual QA fails
- Cannot release based only on functional success

**Rule 7: Explicit Verdict Format**

Every UI task MUST end with explicit verdict format:

```
Status: ACCEPTED / REJECTED

Evidence:
- Reference: [path]
- Current: [screenshot]
- Route: [tested]
- Parity Score: [X/5]

What Matches:
- [list]

What Does Not Match:
- [list]

Required Fixes:
- [specific list]
```

---

## Failed Control Points

### Control Point 1: Planning
**Expected:** Design review and parity plan before implementation
**Actual:** Implementation proceeded without visual quality constraints

### Control Point 2: Implementation
**Expected:** Continuous visual verification during development
**Actual:** Implementation based on functional requirements only

### Control Point 3: Pre-Completion
**Expected:** Design Quality Reviewer visual verification
**Actual:** No evidence of visual review or parity scoring

### Control Point 4: PM Approval
**Expected:** PM verification of prototype alignment
**Actual:** PM likely approved based on functional completeness

### Control Point 5: Final Gate
**Expected:** CTO Bar Raiser challenge of weak results
**Actual:** No visual evidence verified before "done"

---

## Updated Agent Responsibilities

### Product Manager Agent (Updated)

**New Blocking Authority:**
- MUST block UI tasks where visual parity < 4.5/5
- MUST personally verify visual evidence (screenshot comparison)
- MUST produce product eval scores for UI work
- CANNOT approve based on "tests pass" alone

**New Required Output:**
For any UI task, PM MUST produce:
1. Visual parity score with comparison
2. Product eval scores against rubric
3. Explicit ACCEPTED or REJECTED verdict
4. Evidence list: reference path, current screenshot, route tested

### Design Quality Reviewer Agent (Updated)

**New Blocking Authority:**
- MUST automatically reject if visual parity < 4.5/5
- MUST produce side-by-side comparison analysis
- MUST list specific visual elements that don't match
- CANNOT be overridden by functional success

**New Required Output:**
For any UI task, Design QA MUST produce:
1. Visual parity score (1-5) for each dimension
2. Detailed comparison: header, hero, typography, spacing, colors
3. Blocker list: specific visual elements requiring fixes
4. Verdict: ACCEPTED or REJECTED with evidence

### CTO Bar Raiser Agent (Updated)

**New Blocking Authority:**
- MUST block "functional but visually wrong" implementations
- MUST verify visual evidence exists for UI tasks
- MUST challenge "done" without screenshot verification
- CANNOT approve based on green checks alone

**New Anti-Pattern to Detect:**
- "Functional but visually incorrect" — page works but doesn't match prototype
- "Green checks without visual evidence" — tests pass but no screenshot comparison

### QA Release Engineer Agent (Updated)

**New Responsibility:**
- MUST distinguish between functional QA and visual QA
- MUST report both statuses separately
- MUST block release if visual QA fails
- CANNOT release based on functional success alone

**New Required Output:**
```
Functional QA: PASSED
- Routes: verified
- Tests: passing
- Build: successful

Visual QA: [PASSED/FAILED]
- Parity Score: [X/5]
- Screenshot Comparison: [completed/not completed]

Release Status: [BLOCKED/READY]
Reason: [specific reason]
```

---

## New Design Parity Gate

### Evidence-Based Completion Requirement

**For all UI tasks, the following MUST be completed before claiming "done":**

1. **Evidence Collection**
   - [ ] Reference prototype screenshot identified
   - [ ] Current implementation screenshot captured
   - [ ] Side-by-side comparison created
   - [ ] Route tested in browser

2. **Visual Parity Assessment**
   - [ ] Header structure compared
   - [ ] Hero layout compared
   - [ ] Typography compared
   - [ ] Spacing compared
   - [ ] Colors compared
   - [ ] CTAs compared
   - [ ] Responsiveness compared

3. **Scoring**
   - [ ] Visual parity score calculated (1-5)
   - [ ] Each dimension scored
   - [ ] Overall parity determined

4. **Verdict**
   - [ ] Explicit ACCEPTED or REJECTED issued
   - [ ] Evidence listed with paths
   - [ ] Blockers or approval conditions specified

### Acceptance Threshold

**Minimum for Approval:**
- Visual parity score: >= 4.5/5
- All critical dimensions >= 4/5
- No missing prototype elements
- Screenshot evidence provided

**Below Threshold:**
- Automatic REJECTION
- Specific blockers listed
- Required fixes identified
- Evidence of what must change

---

## New Rejection Criteria

### Automatic Rejection Triggers

A UI task MUST be rejected if ANY of the following:

1. **No Screenshot Evidence**
   - No current implementation screenshot provided
   - No side-by-side comparison with prototype
   - No browser verification shown

2. **Visual Parity Below Threshold**
   - Overall parity score < 4.5/5
   - Any critical dimension < 4/5
   - Missing prototype elements

3. **Missing Critical Prototype Elements**
   - Layout structure wrong (e.g., centered vs split)
   - Header structure missing or wrong
   - Typography scale incorrect
   - Key visual components missing

4. **Generic SaaS Output**
   - Result looks like generic AI-generated UI
   - Weak visual hierarchy
   - Inconsistent spacing
   - Poor color discipline

5. **Evidence Incomplete**
   - Reference prototype not identified
   - Route not tested
   - Comparison not completed

### Rejection Format

All rejections MUST include:

```
Status: REJECTED

Evidence:
- Reference: [path or MISSING]
- Current: [screenshot or MISSING]
- Route: [tested or NOT TESTED]

Blockers:
1. [Specific blocker 1]
2. [Specific blocker 2]

Required Fixes:
1. [Specific fix 1]
2. [Specific fix 2]

Parity Score: [X/5] (Below 4.5 threshold)
```

---

## Required Files to Change

### 1. Agent Definitions

**`.claude/agents/product-manager.md`**
- Add mandatory visual verification requirement
- Add explicit blocking authority for visual parity < 4.5
- Add required output format with verdict

**`.claude/agents/design-quality-reviewer.md`**
- Add automatic rejection threshold
- Add mandatory scoring requirement
- Add detailed comparison output format

**`.claude/agents/cto-bar-raiser.md`**
- Add "functional but visually wrong" to anti-patterns
- Add visual evidence verification requirement
- Add blocking authority for visual mismatch

**`.claude/agents/qa-release-engineer.md`**
- Add separation of functional and visual QA
- Add dual status reporting requirement
- Add release blocking authority for visual QA failure

### 2. Documentation

**`docs/design/DESIGN_QUALITY_GATES.md`**
- Add evidence-based completion requirement
- Add mandatory scoring threshold
- Add rejection criteria
- Add verdict format specification

**`docs/PROCESS_LEARNINGS.md`** (new file)
- Document this failure analysis
- Document the governance changes
- Document the new rules

**`CLAUDE.md`**
- Add evidence-based completion rule
- Add visual parity requirement for UI tasks
- Add explicit verdict requirement

### 3. New Documentation

**`docs/reviews/phase-2-1-failure-analysis.md`** (this file)
- Complete failure analysis
- Root cause identification
- Governance fix recommendations

---

## Summary

The Phase 2.1 failure was not a technical failure but a governance failure.

**The Problem:**
- Agents were optimized for functional success (tests pass, build succeeds)
- Visual quality was treated as "nice to have" rather than blocking requirement
- No mandatory evidence requirement for visual verification
- No explicit threshold for visual parity
- No authority structure for blocking based on visual mismatch

**The Solution:**
- Evidence-based completion for all UI tasks
- Visual parity as release-blocking requirement
- Explicit scoring thresholds (>= 4.5/5)
- Separation of functional and visual success
- Mandatory ACCEPTED/REJECTED verdicts with evidence
- Clear blocking authority for PM, Design QA, and CTO agents

**The Principle:**
Green tests are necessary but not sufficient.
A working page is not the same as an accepted product.
Agents must be allowed and expected to reject weak work.
The goal is to simulate a real high-performing product team, not just generate code.

---

**Status:** Awaiting approval for agent governance fix.

**Last Updated:** 2026-06-09
