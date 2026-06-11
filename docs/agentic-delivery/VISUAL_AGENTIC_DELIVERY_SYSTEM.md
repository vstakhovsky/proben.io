# Visual Agentic Delivery System

## Overview

The Visual Agentic Delivery System is Proben.io's AI-assisted development process that ensures quality through visual planning, isolated work, fresh review, and risk-scored release gates.

## The Problem We Solved

### Phase 2.1 Failure

The first Phase 2.1 design implementation passed all functional checks:
- ✅ Build succeeded
- ✅ Tests passed
- ✅ Routes worked
- ✅ Code compiled

But the human reviewer rejected it because:
- ❌ Did not match the Proben MVP 6 prototype
- ❌ Missing critical visual elements
- ❌ Generic SaaS appearance instead of premium design

### Root Cause

**Agents behaved like builders, not quality gatekeepers.**

They optimized for green checks (functional success) but did not enforce visual quality requirements. The system lacked:
- Evidence-based completion requirements
- Mandatory visual verification
- Clear blocking authority for visual mismatch
- Separation of functional and visual success

## The Solution: Visual Agentic Delivery

We upgraded the process to treat agents like a real engineering team:
- **Planners** create detailed visual plans
- **Builders** implement only approved scope
- **Fresh reviewers** independently verify work
- **Governance auditors** maintain system quality
- **Humans** make final release decisions

## Core Principles

### 1. Plan Before Code

**Visual planning is mandatory for UI work.**

Before any UI implementation:
1. Analyze the target screenshot
2. Create a detailed visual plan
3. Get human approval
4. Only then start coding

### 2. Isolated Build

**Significant work happens in isolated branches/worktrees.**

- Main branch protection
- Worktree isolation for features
- Parallel agents must not conflict
- Clean merge targets

### 3. Fresh Review

**The builder cannot be the final reviewer.**

- Independent reviewer verifies work
- Evidence required, not claims
- Objective scoring against source of truth
- Clear verdict with reasoning

### 4. Risk-Scored Gates

**Every change receives a risk rating.**

- Multiple risk dimensions scored
- Overall risk level determined
- Release decision based on risk
- HIGH risks block release

### 5. Evidence-Based Completion

**Tests passing is necessary but never sufficient.**

For UI work, must provide:
- Reference prototype path
- Current implementation screenshot
- Side-by-side comparison
- Visual parity score
- Explicit verdict

## The Plan–Build–Review–Gate Loop

### Step 1: Visual Plan

**Agent:** Visual Plan Architect

**Input:**
- Target screenshot path
- Current screenshot (if available)
- Task scope
- Route context

**Output:**
- Section map
- Layout map
- Component map
- Exact copy
- Design tokens
- Acceptance criteria
- Risk list
- Rollback plan

**Step Complete When:**
- Human reviews and approves the plan
- All ambiguities resolved
- Implementation scope is clear

### Step 2: Human Feedback

The human reviews the visual plan and provides feedback:
- Approve as-is
- Request revisions
- Clarify ambiguities
- Adjust scope

**Implementation does NOT start until human approval.**

### Step 3: Isolated Build

**Agent:** Frontend Engineer (builder)

**Input:**
- Approved visual plan
- Worktree/branch assignment

**Process:**
- Work in isolated branch/worktree
- Implement only approved scope
- Do NOT expand scope
- Commit to worktree branch

**Constraints:**
- Must implement exact copy from plan
- Must use design tokens from plan
- Must NOT add "nice to have" features
- Must stay within visual acceptance criteria

### Step 4: Fresh Agent Review

**Agent:** Fresh Review Agent (did NOT implement)

**Input:**
- Visual plan (what was approved)
- Files changed (what was implemented)
- Evidence (screenshots, routes, tests)
- Source of truth (prototype)

**Process:**
- Verify independence (reviewer ≠ builder)
- Review changed files
- Compare against source of truth
- Test functionality
- Score visual parity
- Assess risk

**Output:**
- Verdict: ACCEPTED / REJECTED / NEEDS_REWORK
- Prototype parity score (1-5)
- Risk assessment
- Required fixes (if not accepted)

### Step 5: Risk Score

**Agent:** Fresh Review Agent + Risk Scoring

**Process:**
- Score 8 risk dimensions:
  - Product risk
  - Design risk
  - Technical risk
  - Security risk
  - Data/privacy risk
  - Deployment risk
  - Maintenance risk
  - Portfolio credibility risk

**Output:**
- Overall risk level: LOW / MEDIUM / HIGH
- Release recommendation
- Mitigation or blockers (if applicable)

### Step 6: Gate Decision

**Agents:** PM + Design QA + Release Manager

**Process:**
- PM evaluates product quality
- Design QA evaluates visual quality
- Release Manager evaluates overall quality
- Each agent provides verdict

**Output:**
- Combined verdict: ACCEPTED / REJECTED / NEEDS_REWORK
- Evidence of reviews
- Required fixes (if not accepted)

### Step 7: Release or Rework

**Decision Criteria:**

**RELEASE IF:**
- Fresh review: ACCEPTED
- Risk level: LOW or MEDIUM
- PM eval: ACCEPTED
- Design QA: ACCEPTED
- Release Manager: ACCEPTED
- Human approval: YES

**REWORK IF:**
- Any review: NEEDS_REWORK
- Risk level: HIGH with mitigations
- Specific fixes identified

**REJECT IF:**
- Fresh review: REJECTED
- Risk level: HIGH without mitigations
- Any critical blocker
- Human approval: NO

## Flow Diagram

```
┌─────────────────┐
│  Visual Plan    │
│  Architect      │
└────────┬────────┘
         │ Visual plan
         ▼
┌─────────────────┐
│  Human Review   │
│  & Approval     │
└────────┬────────┘
         │ Approved plan
         ▼
┌─────────────────┐
│  Isolated Build │
│  (Builder)      │
└────────┬────────┘
         │ Implementation
         ▼
┌─────────────────┐
│  Fresh Review   │
│  Agent          │
└────────┬────────┘
         │ Verdict + risk score
         ▼
┌─────────────────┐
│  PM + Design QA │
│  + CTO Review   │
└────────┬────────┘
         │ Combined verdict
         ▼
┌─────────────────┐
│  Human Approval │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌──────┐  ┌─────────┐
│Release│  │ Rework  │
└──────┘  └─────────┘
```

## Comparison: Old vs New

### Old Process (Builder Agents)

```
Prompt → Build → Tests → Release
           ✅      ✅       ✅
```

**Problems:**
- No visual planning
- Builder reviews own work
- Tests = done
- False green checks

### New Process (Quality Gatekeepers)

```
Visual Plan → Human → Build → Fresh Review → Risk → PM/Design/CTO → Human → Release
              Approve        ✅/❌              Score    Review             Approve  ✅/❌
```

**Improvements:**
- Visual planning before code
- Human approves plan
- Independent reviewer
- Risk-scored gates
- Multiple quality checks
- Human final approval

## New Hard Rules

### Rule 1: No One-Line Prompts for Critical Work
**UI, architecture, and release-critical work require planning, not one-line prompts.**

❌ Bad: "Update the landing page"
✅ Good: "Create visual plan for landing page hero section based on reference/screenshots/proben-mvp-6/hero-target-light-1.png"

### Rule 2: UI Work Starts with Visual Plan
**UI implementation requires an approved visual plan before code starts.**

❌ Bad: Start coding from verbal description
✅ Good: Create visual plan → Human approves → Implement from plan

### Rule 3: Builder Cannot Be Final Reviewer
**The agent that implements cannot be the final reviewer.**

❌ Bad: Builder implements and reviews own work
✅ Good: Fresh review agent (who did not implement) reviews

### Rule 4: Fresh Agent Reviews Before Human
**A fresh reviewer agent must review before the human sees the work.**

❌ Bad: Builder presents work directly to human
✅ Good: Fresh review agent reviews → Presents verdict to human

### Rule 5: Tests Passing is Never Sufficient
**Functional correctness is necessary but not sufficient for UI work.**

❌ Bad: "Tests pass, done!"
✅ Good: "Tests pass, visual parity 4.2/5, NEEDS REWORK for spacing"

### Rule 6: Prototype Parity is Blocking
**Visual parity < 4.5/5 blocks release for Phase 2.1.**

❌ Bad: "Tests pass, close enough to prototype"
✅ Good: "Parity 3.8/5, REJECTED, does not match prototype"

### Rule 7: Generic SaaS is Rejected
**If result looks like generic AI-generated SaaS, release is rejected.**

❌ Bad: "Looks like a clean SaaS page"
✅ Good: "Looks generic, not Proben MVP 6, REJECTED"

### Rule 8: Parallel Agents Require Isolation
**Parallel agents allowed only in isolated branches/worktrees for separable tasks.**

❌ Bad: Two agents editing app/page.tsx simultaneously
✅ Good: Agent A in worktree-feature-landing, Agent B in docs/

### Rule 9: Research Agents Summarize, Don't Modify
**Exploratory agents report findings, they don't directly change production code.**

❌ Bad: Research agent refactors production code
✅ Good: Research agent reports findings and recommendations

### Rule 10: Agent System Audits
**If agents don't improve quality, Governance Auditor recommends deletion/merge.**

❌ Bad: Keep adding agents without measuring value
✅ Good: Regular audits, remove or merge low-value agents

## Agent Roles

### Visual Plan Architect
- Creates visual implementation plans
- Converts screenshots to detailed plans
- Defines acceptance criteria
- Prevents vague design tasks

### Builder (Frontend Engineer)
- Implements only approved plans
- Works in isolated worktrees
- Does not expand scope
- Does not review own work

### Fresh Review Agent
- Independently reviews implementation
- Compares against source of truth
- Scores visual parity
- Returns clear verdict

### Product Manager
- Evaluates product value
- Verifies prototype alignment
- Scores product quality
- Can block for product reasons

### Design Quality Reviewer
- Evaluates visual quality
- Scores design dimensions
- Can block for visual reasons
- Auto-rejects if parity < 4.5/5

### Release Manager
- Evaluates overall quality
- Challenges overengineering
- Can block for technical reasons
- Protects from builder bias

### Worktree Orchestrator
- Defines worktree strategy
- Prevents parallel conflicts
- Maintains main stability
- Plans worktree lifecycle

### Governance Auditor
- Audits agent system
- Scores agent effectiveness
- Detects false approvals
- Recommends agent changes

## Quality Gates

### Gate 1: Visual Plan Approval
**Owner:** Human
**Input:** Visual plan from architect
**Criteria:** Plan is specific, complete, and matches prototype
**Output:** Approved plan or request revisions

### Gate 2: Implementation Completeness
**Owner:** Builder
**Input:** Approved plan
**Criteria:** Implements exactly what was approved
**Output:** Code changes in worktree

### Gate 3: Fresh Review Verdict
**Owner:** Fresh Review Agent
**Input:** Implementation + evidence
**Criteria:** Matches plan, parity >= 4.5/5, functional
**Output:** ACCEPTED / REJECTED / NEEDS_REWORK

### Gate 4: Risk Score
**Owner:** Fresh Review Agent
**Input:** All review data
**Criteria:** Risk levels assessed
**Output:** LOW / MEDIUM / HIGH risk with rationale

### Gate 5: PM Evaluation
**Owner:** Product Manager
**Input:** Implementation + evidence
**Criteria:** Product value, prototype alignment
**Output:** ACCEPTED / REJECTED with reasoning

### Gate 6: Design QA Evaluation
**Owner:** Design Quality Reviewer
**Input:** Implementation + evidence
**Criteria:** Visual parity >= 4.5/5, brand fit
**Output:** ACCEPTED / REJECTED with scores

### Gate 7: Release Manager Evaluation
**Owner:** Release Manager
**Input:** Implementation + reviews
**Criteria:** Technical quality, no overengineering
**Output:** ACCEPTED / REJECTED with reasoning

### Gate 8: Human Approval
**Owner:** Human
**Input:** All agent reviews + evidence
**Criteria:** Overall quality acceptable
**Output:** Release approval or request changes

## Related Documentation

- **Visual Plan Template:** `VISUAL_PLAN_TEMPLATE.md`
- **Fresh Review Protocol:** `FRESH_REVIEW_PROTOCOL.md`
- **Worktree Isolation Policy:** `WORKTREE_ISOLATION_POLICY.md`
- **Risk Scored Review:** `RISK_SCORED_REVIEW.md`
- **Phase 2.1 Retry Protocol:** `PHASE_2_1_RETRY_PROTOCOL.md`
- **Agent Definitions:** `.claude/agents/`
- **Skills:** `.claude/skills/`

---

**Last Updated:** 2026-06-09
**Current Phase:** 2.1 (Design Parity Retry)
