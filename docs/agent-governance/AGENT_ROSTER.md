# Agent Roster

## Purpose

Simplified roster of Proben.io agents using clean role names without title grades. Authority comes from workflow gates and evidence, not inflated titles.

## Agent Naming Policy

**Prohibited title grades:**
- principal ❌
- senior ❌
- staff ❌
- lead ❌
- chief ❌
- head ❌

**Use clean role names:**
- product-manager ✅
- design-reviewer ✅
- architect ✅
- release-manager ✅
- engineer ✅

**Rationale:** Authority comes from gates, evidence, and workflow — not from titles.

---

## Agent Roster Summary

**Total Active Agents:** 14 (9 core + 3 specialist + 2 conditional)
**Total Harness Roles:** 5 (state-machine roles)
**Reduction from 33 agents:** 42%
**Model:** Harness with state machine + gates + evidence + retro

---

## Core Product & Release Agents (9)

### 1. product-manager

**File:** `.claude/agents/product-manager.md`
**Former Name:** product-manager (renamed)

**Purpose:** Product requirements, product quality evaluation, product clarity

**Responsibilities:**
- Evaluate product clarity and value proposition
- Verify PRD alignment
- Assess user problem definition
- Score product quality dimensions
- Can block release for product quality reasons
- Includes AI product strategy (merged from ai-product-manager)

**Authority:** Level 2 — Can block on product grounds

**Evidence Produced:** PM eval scores, requirement coverage analysis

**When to Invoke:**
- Gate 1 (Product Goal Gate)
- Gate 4 (Product QA Gate)
- Product quality concerns
- PRD alignment issues

**Can Block Release:** YES — Product quality

**Failure Mode Prevented:** Weak product, unclear value proposition, PRD misalignment

**Hard Rules:**
- Do not claim ACCEPTED without evidence
- Do not use green tests as proof of product quality
- If visual quality < 4.5/5, cannot approve product
- Human approval is required before release

**Status:** ✅ Active

---

### 2. ai-product-manager

**File:** `.claude/agents/ai-product-manager.md`
**Former Name:** ai-product-manager (renamed)

**Purpose:** AI-specific features, eval strategy, AI quality metrics, guardrails, and integration sequencing

**Responsibilities:**
- AI product strategy and features
- AI quality metrics and guardrails
- Prompt engineering strategy
- AI integration sequencing
- AI cost optimization

**Authority:** Level 2 — Can block on AI product grounds

**Evidence Produced:** AI eval scores, quality metrics

**When to Invoke:**
- AI feature planning
- AI quality concerns
- Prompt strategy decisions
- AI integration decisions

**Can Block Release:** YES — AI product quality

**Failure Mode Prevented:** Poor AI features, weak AI quality, bad AI integration

**Status:** ✅ Active (conditional - Phase 2+)

---

### 3. release-manager

**File:** `.claude/agents/release-manager.md`
**Former Name:** release-manager (renamed)

**Purpose:** Owns final release quality bar, can veto any release

**Responsibilities:**
- Verify all gates passed before release
- Review evidence package for completeness
- Verify human approval obtained
- Check eval cases for previous failures addressed
- Can block any release for quality reasons

**Authority:** Level 3 — Final release authority

**Evidence Produced:** Release verification, evidence package validation

**When to Invoke:**
- Before any deployment
- Before public sharing
- After phase completion
- For release decisions

**Can Block Release:** YES — Final authority

**Failure Mode Prevented:** Premature or low-quality releases

**Status:** ✅ Active

---

### 4. architect

**File:** `.claude/agents/architect.md`
**Former Name:** architect (renamed)

**Purpose:** Architecture design and review for technical decisions

**Responsibilities:**
- Review architecture decisions
- Assess routing, data flows, dependencies
- Prevent overengineering
- Can block release for architecture reasons

**Authority:** Level 2 — Can block on architecture grounds

**Evidence Produced:** Architecture reviews, ADR validation, technical quality assessment

**When to Invoke:**
- **CONDITIONAL:** For architecture, routing, data flows, dependencies
- Architecture decisions
- Technical design changes
- Dependency additions

**Can Block Release:** YES — Architecture

**Failure Mode Prevented:** Overengineering, wrong abstractions, architecture violations

**Hard Rules:**
- Only invoke for architecture, routing, data flows, dependencies
- Consider visual impact of architecture decisions
- Document architecture decisions as ADRs

**Status:** ✅ Active (conditional)

---

### 5. design-reviewer

**File:** `.claude/agents/design-reviewer.md`
**Former Name:** design-reviewer (renamed)

**Purpose:** Visual quality and design parity review, generic SaaS detection

**Responsibilities:**
- Evaluate visual quality against prototype
- Detect generic SaaS patterns
- Score design dimensions (header, logo, nav, CTA, similarity, evidence)
- Verify evidence completeness
- Can block release for visual quality reasons

**Authority:** Level 2 — Can block on visual grounds

**Evidence Produced:** Visual parity scores, design rubric evaluation, blocker detection

**When to Invoke:**
- Gate 2A (Visual Plan Gate)
- Gate 4A (Visual QA Gate)
- Visual quality concerns
- Design parity issues

**Can Block Release:** YES — Visual quality

**Failure Mode Prevented:** Generic SaaS output, poor visual quality, design mismatch

**Hard Rules:**
- Do not claim ACCEPTED without screenshot evidence
- If screenshots contradict text verdict, screenshots win
- If browser state contradicts agent verdict, browser wins
- If any P0 blocker fails, final verdict cannot be ACCEPTED
- Must inspect in order: Target → Before → After → Diff → DOM → Rubric → Code

**Status:** ✅ Active

---

### 6. governance-auditor

**File:** `.claude/agents/governance-auditor.md`
**Former Name:** governance-auditor (renamed)

**Purpose:** Audit agent system, evaluate agent usefulness, recommend changes

**Responsibilities:**
- Audit agent system quarterly and after failures
- Track false approval rate
- Identify duplicate or overlapping agents
- Recommend agent additions, removals, or changes
- Identify weak agents that create false confidence

**Authority:** Level 4 — Can recommend agent removal/merge/downgrade

**Evidence Produced:** Audit reports, false approval tracking, agent recommendations

**When to Invoke:**
- Quarterly agent system audit
- After false PASS event
- After major failure
- When agent quality concerns arise

**Can Block Release:** YES — Can recommend agent blocking

**Failure Mode Prevented:** Agent sprawl, zombie agents, false confidence

**Status:** ✅ Active

---

### 7. security-reviewer

**File:** `.claude/agents/security-reviewer.md`

**Purpose:** Security-focused code review for protected operations

**Responsibilities:**
- Review auth, payment, secrets, user data changes
- Assess security risks
- Identify vulnerabilities
- Can block release for security reasons

**Authority:** Level 2 — Can block on security grounds

**Evidence Produced:** Security analysis, vulnerability assessment

**When to Invoke:**
- **CONDITIONAL:** For auth, payments, secrets, user data, AI/prompt risks only
- Security-sensitive changes
- Protected file modifications

**Can Block Release:** YES — Security

**Failure Mode Prevented:** Security vulnerabilities, unprotected sensitive operations

**Hard Rules:**
- Only invoke for auth, payments, secrets, user data, AI/prompt risks
- Do not review general frontend changes
- Escalate critical security issues immediately

**Status:** ✅ Active (conditional)

---

### 8. research-analyst

**File:** `.claude/agents/research-analyst.md`

**Purpose:** Research and competitive analysis

**Responsibilities:**
- Research and competitive analysis
- Market research
- Technology research
- Validation research

**Authority:** None (research role)

**Evidence Produced:** Research reports, competitive analysis

**When to Invoke:**
- **CONDITIONAL:** During research or validation phases
- Research needed
- Competitive analysis needed

**Can Block Release:** NO — Research role

**Failure Mode Prevented:** Poor research decisions, lack of validation

**Hard Rules:**
- Only invoke during research or validation phases
- Must NOT create more text than value
- Must provide actionable research findings

**Status:** ✅ Active (conditional)

---

### 9. test-engineer

**File:** `.claude/agents/test-engineer.md`
**Former Name:** test-engineer (renamed)

**Purpose:** Tests, evals, quality infrastructure, includes QA capabilities

**Responsibilities:**
- Write and maintain tests
- Create eval cases from failures
- Track quality metrics
- Generate quality evidence
- Support eval infrastructure
- Includes QA planning and verification (merged from qa-release-engineer)

**Authority:** Level 1 — Cannot approve own work

**Evidence Produced:** Test files, eval results, quality metrics

**When to Invoke:**
- Test writing needed
- Eval case creation needed
- Quality metrics tracking
- QA planning needed

**Can Block Release:** NO — Advisor only

**Failure Mode Prevented:** Test gaps, eval gaps, quality blindness

**Hard Rules:**
- Must NOT claim tests passing proves product quality
- Must create eval case for every failure
- Must track quality metrics
- Must support evidence generation

**Status:** ✅ Active

---

## Specialist Agents (3)

### 10. frontend-engineer

**File:** `.claude/agents/frontend-engineer.md`

**Purpose:** Frontend component development, UI implementation

**Responsibilities:**
- Create React components
- Implement UI features
- Add test IDs for DOM blockers
- Preserve test IDs
- Capture evidence (screenshots, tests)
- Stop after completion, wait for approval

**Authority:** Level 1 — Cannot approve own work

**Evidence Produced:** Code implementation, test IDs, evidence capture

**When to Invoke:**
- UI component development
- Feature implementation
- Styling changes
- Responsive design

**Can Block Release:** NO — Builder only

**Failure Mode Prevented:** None (builder role)

**Hard Rules:**
- Must NOT score visual quality
- Must NOT approve own work
- Must NOT claim accepted
- Must NOT proceed to next slice without reviewer + human approval
- Must NOT implement beyond approved slice
- Must preserve test IDs
- Must capture evidence before claiming completion

**Status:** ✅ Active

---

### 11. prototype-port-engineer

**File:** `.claude/agents/prototype-port-engineer.md`

**Purpose:** Port prototypes to Next.js, exact implementation from source

**Responsibilities:**
- Port prototype source files to Next.js
- Preserve exact structure, spacing, typography, colors
- Map CSS tokens explicitly
- Explain blockers when exact port is difficult

**Authority:** Level 1 — Cannot approve own work

**Evidence Produced:** Next.js implementation, screenshot evidence

**When to Invoke:**
- Porting prototype to production
- Translating design to code
- Layout implementation from source

**Can Block Release:** NO — Builder only

**Failure Mode Prevented:** Visual drift, approximation errors

**Hard Rules:**
- Must NOT create "similar" designs
- Must NOT approximate spacing, colors, typography
- Must NOT invent new designs
- Must read prototype source files first
- Must port exact structure

**Status:** ✅ Active

---

### 12. visual-plan-architect

**File:** `.claude/agents/visual-plan-architect.md`

**Purpose:** Creates visual implementation plans before UI work

**Responsibilities:**
- Create visual plans before UI implementation
- Define layout, components, copy, design tokens
- Specify acceptance criteria
- Include visual system design (merged from visual-systems-designer)
- Capture evidence requirements

**Authority:** Level 1 — Cannot approve own work

**Evidence Produced:** Visual plans, layout maps, component maps

**When to Invoke:**
- Before UI implementation
- Visual planning needed
- Design specification needed

**Can Block Release:** NO — Advisor only

**Failure Mode Prevented:** Building without clear specs, plan-execution mismatch

**Hard Rules:**
- Must NOT implement without plan
- Must NOT proceed to code without human approval on plan
- Must specify evidence capture requirements
- Must include system-level visual thinking

**Status:** ✅ Active

---

### 13. fresh-review-agent

**File:** `.claude/agents/fresh-review-agent.md`

**Purpose:** Independent review of implementation work, evidence verification

**Responsibilities:**
- Review work they did not implement
- Verify evidence completeness
- Compare against source of truth independently
- Assign risk scores
- Return explicit verdicts
- Includes critical review capabilities (merged from implementation-critic)

**Authority:** Level 2 — Can block release

**Evidence Produced:** Review reports, evidence verification, verdicts

**When to Invoke:**
- After any UI implementation
- After any architecture change
- After any dependency addition
- For independent review

**Can Block Release:** YES — Can block

**Failure Mode Prevented:** Self-approval bias, false confidence, evidence gaps

**Hard Rules:**
- Must NOT review work they implemented
- Must NOT assume builder claims are true
- Must NOT approve without evidence
- Must NOT accept without screenshot evidence (for UI)
- Must NOT be diplomatic — call out problems directly
- Must inspect evidence before code
- Independence verification REQUIRED

**Status:** ✅ Active

---

### 14. ai-engineer

**File:** `.claude/agents/ai-engineer.md`

**Purpose:** AI/ML feature implementation

**Responsibilities:**
- AI feature implementation
- Prompt engineering
- Model integration
- AI workflow design

**Authority:** Level 1 — Cannot approve own work

**Evidence Produced:** AI implementation, prompt tests

**When to Invoke:**
- Phase 2: Real AI provider integration
- Phase 2: AI feature implementation
- Phase 2: AI/prompt engineering

**Can Block Release:** NO — Builder only

**Failure Mode Prevented:** Poor AI implementation

**Status:** ⏸️ DISABLED (Phase 1) — Enable when needed for Phase 2

---

## Harness State-Machine Roles (5)

These roles map to the harness workflow states. They are invoked by the harness system, not directly.

### 15. implementer

**File:** `.claude/agents/implementer.md`

**Harness State:** IMPLEMENT

**Purpose:** Creates the change (code, UI, docs, tests)

**Mapped Agent:** frontend-engineer

**Responsibilities:**
- Write code
- Create UI
- Write tests
- Add test IDs for DOM blockers
- Capture evidence helpers

**Authority:** Level 1 — Cannot approve own work

**Hard Rules:**
- Must NOT score visual quality
- Must NOT approve own work
- Must NOT claim accepted
- Must NOT proceed to next slice without review
- Must preserve test IDs

**Status:** ✅ Active (harness role)

---

### 16. verifier

**File:** `.claude/agents/verifier.md`

**Harness State:** VERIFY

**Purpose:** Verifies the change works (proof, tests, screenshots)

**Mapped Agent:** test-engineer

**Responsibilities:**
- Run proof commands (typecheck, tests, build)
- Generate proof manifests with SHA-256 hashes
- Verify DOM blockers (for UI work)
- Capture visual evidence (for UI work)
- Validate state transition requirements

**Authority:** Level 1 — Cannot approve product quality alone

**Hard Rules:**
- Must NOT claim tests passing proves product quality
- Must create eval case for every failure
- Must track quality metrics
- Must support evidence generation

**Status:** ✅ Active (harness role)

---

### 17. reviewer

**File:** `.claude/agents/reviewer.md`

**Harness State:** REVIEW

**Purpose:** Independent review of evidence and quality

**Mapped Agents:** fresh-review-agent, design-reviewer

**Responsibilities:**
- Fresh review of work (builder ≠ reviewer)
- Evidence verification (evidence-first protocol)
- Comparison against source of truth
- Score visual parity (for UI)
- Assess risk dimensions
- Return explicit verdicts

**Authority:** Level 2 — Can block release

**Hard Rules:**
- Must NOT review work they implemented
- Must NOT assume builder claims are true
- Must NOT approve without evidence
- Must NOT accept without screenshot evidence (for UI)
- Must inspect evidence before code (evidence-first protocol)

**Status:** ✅ Active (harness role)

---

### 18. closer

**File:** `.claude/agents/closer.md`

**Harness State:** CLOSE

**Purpose:** Final release readiness check

**Mapped Agents:** product-manager, release-manager, architect, security-reviewer

**Responsibilities:**
- Verify all gates passed
- Check evidence package completeness
- Verify human approval obtained
- Check eval cases for previous failures addressed
- Can block any release for quality reasons

**Authority:** Level 2/3 — Principal (Level 2) or Release Manager (Level 3)

**Hard Rules:**
- Do NOT approve without complete evidence package
- Do NOT approve without human review
- Do NOT override reviewer blockers without evidence

**Status:** ✅ Active (harness role)

---

### 19. retro

**File:** `.claude/agents/retro.md`

**Harness State:** RETRO

**Purpose:** System learning and governance

**Mapped Agent:** governance-auditor

**Responsibilities:**
- Review entire run for learning
- Identify false PASS events
- Detect and eliminate weak agents
- Track agent effectiveness
- Recommend agent additions, removals, or changes
- Update gotchas, evals, gates

**Authority:** Level 4 — Can recommend agent removal/merge/downgrade

**Hard Rules:**
- Must identify false approvals
- Must recommend agent/skill changes if ineffective
- Must track failure-to-gate mappings
- Must update learning logs

**Status:** ✅ Active (harness role)

---

## Agent Authority Levels

### Level 4 — System Governance (Retro)
- **Authority:** Can audit and recommend changes to entire agent system
- **Role:** Retro (governance-auditor)
- **Blocking:** Can recommend agent removal/merge/downgrade

### Level 3 — Release Quality (Closer)
- **Authority:** Owns final release quality bar
- **Role:** Closer (release-manager)
- **Blocking:** Can veto any release

### Level 2 — Principal Reviewers (Reviewer, Closer)
- **Authority:** Can validate quality and block release
- **Roles:** Reviewer (fresh-review-agent, design-reviewer, product-manager), Closer (conditional: architect, security-reviewer)
- **Blocking:** Can block for specific domain (product, design, security, architecture)

### Level 1 — Builders (Implementer, Verifier)
- **Authority:** Create implementation artifacts and verification
- **Roles:** Implementer (frontend-engineer), Verifier (test-engineer)
- **Blocking:** Cannot approve own work

---

## Agent Operating Principles

### Core Principles

1. **State machine enforces workflow** — Not agent instructions
2. **Implementer builds, Verifier verifies, Reviewer reviews, Closer closes, Retro learns**
3. **No agent may approve its own work**
4. **Every agent must produce verifiable evidence**
5. **Agent-generated PASS is advisory only, not release authority**
6. **Human approval is required before release**
7. **Gates matter more than agent names**

### Evidence Requirements

**For UI Work:**
- Screenshot evidence required (target, before, after, diff)
- DOM blocker tests required
- Evidence manifest required
- HTML report required

**For All Work:**
- Evidence must be produced
- Claims must be verified
- Browser/screenshot state is source of truth

### Hard Rules (All Agents)

1. **Do not claim ACCEPTED without evidence**
2. **Do not use green tests as proof of product quality**
3. **If screenshots contradict text verdict, screenshots win**
4. **If browser state contradicts agent verdict, browser wins**
5. **If any P0 blocker fails, final verdict cannot be ACCEPTED**
6. **Builder agents cannot score or approve their own work**
7. **Reviewer agents must inspect evidence before code**
8. **Governance auditor must identify false approvals**
9. **Human approval is required before release**
10. **Do not trust agent claims; trust artifacts**

---

## Role Separation

**Implementer ≠ Reviewer**
- Builder cannot review own work
- Fresh reviewer must be different agent
- Independence verification REQUIRED

**Verifier ≠ Closer**
- Verifier checks technical correctness
- Closer checks product/release readiness
- Separate responsibilities

**Reviewer ≠ Human**
- Agent review is advisory
- Human makes final decision
- Human always wins

---

## Related Documentation

- **[AGENT_ROSTER_AUDIT.md](AGENT_ROSTER_AUDIT.md)** — Detailed audit with renaming decisions
- **[AGENT_RETIREMENT_DECISIONS.md](AGENT_RETIREMENT_DECISIONS.md)** — Historical retirement decisions
- **[AGENT_AUTHORITY_MATRIX.md](AGENT_AUTHORITY_MATRIX.md)** — Authority matrix
- **[CASE_INSPIRED_AGENT_HARNESS.md](../agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md)** — Harness overview
- **[AGENT_STATE_MACHINE.md](../agentic-delivery/AGENT_STATE_MACHINE.md)** — State machine details

---

**Last Updated:** 2026-06-11
**Version:** 4.0 (Clean role names)
**Total Agents:** 19 (14 active + 5 harness)
**Reduction from 33 agents:** 42%
