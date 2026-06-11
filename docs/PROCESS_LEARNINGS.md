# Proben.io Process Learnings

## Overview

This document captures key learnings from the Proben.io development process, particularly around AI agent governance, quality gates, and the distinction between functional success and product quality.

---

## Learning 1: Builder Agents vs. Quality Gatekeeper Agents (Phase 2.1)

### What Happened

During Phase 2.1 design parity implementation, the agent system accepted a landing page that was technically functional but did not match the approved Proben MVP 6 prototype.

### The Problem

**Agents behaved like builders, not quality gatekeepers.**

They optimized for:
- Build passes ✅
- Tests pass ✅
- Routes work ✅
- Page opens ✅
- Code compiles ✅

But they did not strongly block when:
- Visual parity was weak ❌
- Prototype elements were missing ❌
- Design quality was not verified ❌

### Root Cause

The agent system had:
- Many specialized agents (PM, Design QA, Release Manager, QA Engineer)
- Design quality gates defined
- Product evaluation rubrics
- Security review processes

But it lacked:
- **Evidence-based completion requirements**
- **Mandatory visual parity thresholds**
- **Explicit separation of functional vs. visual success**
- **Clear blocking authority for visual quality issues**

### The Fix

**New Principle:** Green tests are necessary but not sufficient.

Updated governance:
1. Evidence-based completion for all UI tasks
2. Visual parity as release-blocking requirement (>= 4.5/5 threshold)
3. Separation of functional QA and visual QA
4. Mandatory ACCEPTED/REJECTED verdicts with evidence
5. Clear blocking authority for PM, Design QA, and CTO agents

**See:** `docs/reviews/phase-2-1-failure-analysis.md` for complete analysis.

---

## Learning 2: Process Theater vs. Real Product Value

### What We Learned

Having many agents, skills, and documentation does not guarantee quality.

The system looked mature on paper:
- Specialized agents for each role
- Design quality gates
- Product evaluation rubrics
- Security review processes
- Release check skills

But the first real implementation exposed that the agents were biased toward completion, not quality.

### The Insight

**Documentation and process are not the same as enforcement.**

Having a design quality gate document is different from actually enforcing that gate.

Having a product manager agent is different from actually verifying prototype alignment.

### The Application

Every process element must answer:
1. Who enforces this?
2. What evidence do they require?
3. What is their blocking authority?
4. What happens when they block?

---

## Learning 3: Functional Success ≠ Product Success

### What We Learned

A page can be:
- Technically correct ✅
- Functionally working ✅
- Test-passing ✅
- Build-successful ✅

And still be:
- Visually wrong ❌
- Off-brand ❌
- Generic SaaS output ❌
- Not matching approved prototype ❌

### The Insight

**Software engineering checks are necessary but not sufficient for product quality.**

For UI/UX work, visual quality is a separate dimension that requires:
- Different verification methods (screenshots, not tests)
- Different success criteria (parity, not functionality)
- Different reviewers (design, not just QA)

### The Application

Separate the quality dimensions:
- **Functional QA:** Does it work?
- **Visual QA:** Does it match the prototype?
- **Product QA:** Does it solve the user problem?
- **Security QA:** Is it safe?

All dimensions must pass before release.

---

## Learning 4: Evidence Over Confidence

### What We Learned

AI agents are naturally confident. They will say "done" when:
- Code compiles
- Tests pass
- Routes work
- No obvious errors

But confidence is not evidence.

### The Insight

**For UI work, "done" requires visual evidence.**

- Screenshot of current implementation
- Side-by-side comparison with prototype
- Visual parity score
- Specific comparison of dimensions

Without this evidence, "done" is just a claim, not a fact.

### The Application

**Evidence-Based Completion Rule:**

No agent may mark a UI task as complete unless they produce:
1. Reference prototype path
2. Current implementation screenshot
3. Side-by-side comparison
4. Visual parity score
5. Explicit ACCEPTED/REJECTED verdict
6. List of what matches and what doesn't

---

## Learning 5: Agents Need Permission to Block

### What We Learned

Agents are naturally helpful. They want to say "yes" and move forward.

But quality requires saying "no" and staying in place until quality is met.

### The Insight

**Agents must have explicit permission and responsibility to block weak work.**

If agents are only empowered to approve, they will approve weak work to avoid blocking progress.

If agents are explicitly empowered to block, they will protect quality.

### The Application

Each agent has explicit blocking authority:

- **Product Manager:** Can block if product value unclear or prototype not matched
- **Design QA:** Can block if visual parity < 4.5/5
- **Release Manager:** Can block if overengineered or visually wrong
- **QA Engineer:** Can block if functional tests fail or visual QA fails
- **Security Reviewer:** Can block if security risks present

**Blocking is not failure. Blocking is quality protection.**

---

## Learning 6: The Independent Visual QA Agent

### What We Learned

Design quality cannot be verified by the same agent that implemented the work.

If the frontend engineer implements and also verifies, they will be biased toward approval.

### The Insight

**Independent verification is required for visual quality.**

- Implementer builds
- Separate visual QA agent verifies
- PM evaluates product quality
- Release Manager challenges overall quality

### The Application

**Visual QA Agent Responsibilities:**
- Compare implementation against prototype
- Score visual parity (1-5 scale)
- Identify specific visual elements that don't match
- Block if parity < 4.5/5
- Produce detailed comparison with evidence

**Independent Verdict Format:**
```
Status: ACCEPTED / REJECTED

Parity Score: [X/5]

What Matches:
- [list]

What Does Not Match:
- [list]

Required Fixes:
- [specific list]

Evidence:
- Reference: [path]
- Current: [screenshot]
- Route: [tested]
```

---

## Learning 7: Portfolio Value vs. Product Value

### What We Learned

Proben.io is both a product and a portfolio.

There's a risk: the process becomes more impressive than the product.

### The Insight

**Portfolio work should demonstrate product skills, not replace product value.**

- Good documentation is not the same as good product
- Many agents is not the same as good product
- Process sophistication is not the same as user value

### The Application

**Product-First Principle:**

- Every process element must serve a shipped feature
- Every agent must improve actual product quality
- Every document must support real user value
- Portfolio storytelling comes after product quality

**The Release Manager watches for:**
- Process theater (process over product)
- Infrastructure theater (setup over shipping)
- Documentation theater (writing over building)

---

## Quality Gate Flow

### Before (Builder Agent Flow)

```
Request → Plan → Build → Tests → Release
                    ✅      ✅       ✅
```

Problem: Visual quality not checked.

### After (Quality Gatekeeper Flow)

```
Request → Plan → Build → Functional Tests → Visual Evidence → PM Eval → Design QA → Release Manager → Release/Reject
                    ✅              ✅/❌            ✅/❌        ✅/❌          ✅/❌           ✅/❌
```

Each gate can block release.

---

## New Rules Added

### Rule 1: Evidence-Based Completion
Agents must never mark work as complete based only on build, tests, or route availability.

For UI work, must produce:
- Reference prototype path
- Current screenshot
- Visual parity score
- Verdict with evidence

### Rule 2: Visual Parity as Blocking Requirement
Prototype parity is a release-blocking quality gate.

Threshold: >= 4.5/5 for approval.

### Rule 3: Separation of Functional and Visual Success
Functional QA passed ≠ Visual QA passed.

Both must pass for release.

### Rule 4: PM Agent Visual Verification
PM must personally verify visual evidence for UI tasks.

Cannot delegate entirely to Design QA.

### Rule 5: Design QA Blocking Authority
Design QA must automatically reject if visual parity < 4.5/5.

Cannot be overridden by "tests pass."

### Rule 6: Release Manager Visual Quality Mandate
Release Manager must verify visual evidence for UI tasks.

Add "functional but visually wrong" to anti-patterns.

### Rule 7: Independent Visual QA
Implementation and verification must be separate agents.

No self-verification for visual quality.

---

## Agent Governance Updates

### Product Manager Agent
**New:** Mandatory visual verification for UI tasks
**New:** Blocking authority if visual parity < 4.5/5
**New:** Must produce product eval scores
**New:** Explicit verdict format required

### Design Quality Reviewer Agent
**New:** Automatic rejection if parity < 4.5/5
**New:** Mandatory scoring with dimensions
**New:** Detailed comparison output
**New:** Cannot be overridden by functional success

### Release Manager Agent
**New:** "Functional but visually wrong" anti-pattern
**New:** Visual evidence verification requirement
**New:** Blocking authority for visual mismatch
**New:** Must challenge "done" without screenshots

### QA Release Engineer Agent
**New:** Separate functional and visual QA status
**New:** Dual status reporting
**New:** Release blocked if visual QA fails
**New:** Cannot release based on functional success only

---

## Related Documentation

- **Failure Analysis:** `docs/reviews/phase-2-1-failure-analysis.md`
- **Design Quality Gates:** `docs/design/DESIGN_QUALITY_GATES.md`
- **Agent Definitions:** `.claude/agents/`
- **Product Evals:** `docs/evals/PRODUCT_EVALS.md`

---

## Summary

The most important learning from Phase 2.1:

**Green tests are necessary but not sufficient.**
**A working page is not the same as an accepted product.**
**Agents must be allowed and expected to reject weak work.**
**The goal is to simulate a real high-performing product team, not just generate code.**

---

**Last Updated:** 2026-06-09
