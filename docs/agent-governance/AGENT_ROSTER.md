# Agent Roster

## Purpose

Simplified roster of Proben.io agents organized around 5 state-machine roles. Moved from agent sprawl to harness model.

## Agent Roster Summary

**Total Roles:** 5 state-machine roles
**Total Mapped Agents:** 11 (8 core + 3 conditional)
**Reduction from 23 agents:** 52%
**Model:** Harness with state machine + gates + evidence + retro

## The 5 State-Machine Roles

### 1. Implementer (State: IMPLEMENT)

**Purpose:** Creates the change (code, UI, docs, tests)

**Mapped Agents:**
- **frontend-engineer** — Frontend component development, UI implementation

**Responsibilities:**
- Write code
- Create UI
- Write tests
- Add test IDs for DOM blockers
- Capture evidence helpers

**Authority:** Level 1 — Cannot approve own work

**Evidence Produced:** Code implementation, test IDs, evidence capture helpers

**Hard Rules:**
- Must NOT score visual quality
- Must NOT approve own work
- Must NOT claim accepted
- Must NOT proceed to next slice without review
- Must preserve test IDs

**Status:** ✅ Active

---

### 2. Verifier (State: VERIFY)

**Purpose:** Verifies the change works (proof, tests, screenshots)

**Mapped Agents:**
- **test-eval-engineer** — Tests, evals, quality infrastructure, includes QA capabilities

**Responsibilities:**
- Run proof commands (typecheck, tests, build)
- Generate proof manifests with SHA-256 hashes
- Verify DOM blockers (for UI work)
- Capture visual evidence (for UI work)
- Validate state transition requirements

**Authority:** Level 1 — Cannot approve product quality alone

**Evidence Produced:** Test files, eval results, proof manifests, quality metrics

**Hard Rules:**
- Must NOT claim tests passing proves product quality
- Must create eval case for every failure
- Must track quality metrics
- Must support evidence generation

**Status:** ✅ Active

---

### 3. Reviewer (State: REVIEW)

**Purpose:** Independent review of evidence and quality

**Mapped Agents:**
- **fresh-review-agent** — Independent review, evidence verification
- **principal-design-reviewer** — Visual quality, design parity, generic SaaS detection

**Responsibilities:**
- Fresh review of work (builder ≠ reviewer)
- Evidence verification (evidence-first protocol)
- Comparison against source of truth
- Score visual parity (for UI)
- Assess risk dimensions
- Return explicit verdicts

**Authority:** Level 2 — Can block release

**Evidence Produced:** Review reports, evidence verification, verdicts, design scores

**Hard Rules:**
- Must NOT review work they implemented
- Must NOT assume builder claims are true
- Must NOT approve without evidence
- Must NOT accept without screenshot evidence (for UI)
- Must inspect evidence before code (evidence-first protocol)

**Status:** ✅ Active

---

### 4. Closer (State: CLOSE)

**Purpose:** Final release readiness check

**Mapped Agents:**
- **principal-product-manager** — Product requirements, product quality evaluation
- **cto-bar-raiser** — Final release quality bar
- **principal-architect** (conditional) — Architecture design and review
- **security-reviewer** (conditional) — Security-focused code review

**Responsibilities:**
- Verify all gates passed
- Check evidence package completeness
- Verify human approval obtained
- Check eval cases for previous failures addressed
- Can block any release for quality reasons

**Authority:** Level 2/3 — Principal (Level 2) or CTO Bar Raiser (Level 3)

**Evidence Produced:** Release verification, evidence package validation, risk assessment

**Hard Rules:**
- Do NOT approve without complete evidence package
- Do NOT approve without human review
- Do NOT override reviewer blockers without evidence

**Status:**
- principal-product-manager: ✅ Active
- cto-bar-raiser: ✅ Active
- principal-architect: ✅ Active (conditional)
- security-reviewer: ✅ Active (conditional)

---

### 5. Retro (State: RETRO)

**Purpose:** System learning and governance

**Mapped Agents:**
- **agent-governance-auditor** — Audits agent system, recommends changes

**Responsibilities:**
- Review entire run for learning
- Identify false PASS events
- Detect and eliminate weak agents
- Track agent effectiveness
- Recommend agent additions, removals, or changes
- Update gotchas, evals, gates

**Authority:** Level 4 — Can recommend agent removal/merge/downgrade

**Evidence Produced:** Audit reports, retro entries, learning documentation

**Hard Rules:**
- Must identify false approvals
- Must recommend agent/skill changes if ineffective
- Must track failure-to-gate mappings
- Must update learning logs

**Status:** ✅ Active

---

## Conditional Agents (Invoke When Needed)

### principal-architect

**File:** `.claude/agents/principal-architect.md`

**Purpose:** Architecture design and review for technical decisions

**When to Invoke:**
- **CONDITIONAL:** For architecture, routing, data flows, dependencies

**Hard Rules:**
- Only invoke for architecture, routing, data flows, dependencies
- Consider visual impact of architecture decisions
- Document architecture decisions as ADRs

**Status:** ✅ Active (conditional)

---

### security-reviewer

**File:** `.claude/agents/security-reviewer.md`

**Purpose:** Security-focused code review for protected operations

**When to Invoke:**
- **CONDITIONAL:** For auth, payments, secrets, user data, AI/prompt risks only

**Hard Rules:**
- Only invoke for auth, payments, secrets, user data, AI/prompt risks
- Do not review general frontend changes
- Escalate critical security issues immediately

**Status:** ✅ Active (conditional)

---

### research-analyst

**File:** `.claude/agents/research-analyst.md` (symbolic link)

**Purpose:** Research and competitive analysis

**When to Invoke:**
- **CONDITIONAL:** During research or validation phases

**Hard Rules:**
- Only invoke during research or validation phases
- Must NOT create more text than value
- Must provide actionable research findings

**Status:** ✅ Active (conditional)

---

## Downgraded to Skills

**These were agents, now skills:**

- **documentation-engineer** → update-docs-and-build-history skill
- **prompt-optimizer** → failure-to-prompt-update skill
- **worktree-orchestrator** → worktree-management skill
- **implementation-critic** → Merged into fresh-review-agent
- **qa-release-engineer** → Merged into test-eval-engineer

---

## Agent Authority Levels

### Level 4 — System Governance (Retro)
- **Authority:** Can audit and recommend changes to entire agent system
- **Role:** Retro (agent-governance-auditor)
- **Blocking:** Can recommend agent removal/merge/downgrade

### Level 3 — Release Quality (Closer)
- **Authority:** Owns final release quality bar
- **Role:** Closer (cto-bar-raiser)
- **Blocking:** Can veto any release

### Level 2 — Principal Reviewers (Reviewer, Closer)
- **Authority:** Can validate quality and block release
- **Roles:** Reviewer (fresh-review-agent, principal-design-reviewer, principal-product-manager), Closer (conditional: principal-architect, security-reviewer)
- **Blocking:** Can block for specific domain (product, design, security, architecture)

### Level 1 — Builders (Implementer, Verifier)
- **Authority:** Create implementation artifacts and verification
- **Roles:** Implementer (frontend-engineer), Verifier (test-eval-engineer)
- **Blocking:** Cannot approve own work

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

## Related Documentation

- **[CASE_INSPIRED_AGENT_HARNESS.md](../agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md)** — Harness overview
- **[AGENT_STATE_MACHINE.md](../agentic-delivery/AGENT_STATE_MACHINE.md)** — State machine details
- **[AGENT_AUTHORITY_MATRIX.md](AGENT_AUTHORITY_MATRIX.md)** — Authority matrix
- **[AGENT_SYSTEM_AUDIT.md](AGENT_SYSTEM_AUDIT.md)** — Audit report
- **[SKILL_PRUNING_AUDIT.md](SKILL_PRUNING_AUDIT.md)** — Skill audit

---

**Last Updated:** 2026-06-10
**Version:** 3.0 (5-role harness model)
**Total Roles:** 5 state-machine roles
**Total Mapped Agents:** 11 (8 core + 3 conditional)
**Reduction from 23 agents:** 52%

## Core Agents (8) — Always Active

### Level 4 — System Governance

#### agent-governance-auditor

**File:** `.claude/agents/agent-governance-auditor.md`

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

### Level 3 — Release Quality

#### cto-bar-raiser

**File:** `.claude/agents/cto-bar-raiser.md`

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

### Level 2 — Principal Reviewers

#### principal-product-manager

**File:** `.claude/agents/principal-product-manager.md`

**Purpose:** Product requirements, product quality evaluation, product clarity

**Responsibilities:**
- Evaluate product clarity and value proposition
- Verify PRD alignment
- Assess user problem definition
- Score product quality dimensions
- Can block release for product quality reasons
- Includes AI product strategy (merged from ai-product-strategist)

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

#### principal-design-reviewer

**File:** `.claude/agents/principal-design-reviewer.md`

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

**Status:** ✅ Active (updated with strict rules)

---

#### security-reviewer

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

#### principal-architect

**File:** `.claude/agents/principal-architect.md`

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

#### fresh-review-agent

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

**Status:** ✅ Active (updated with evidence-first protocol)

---

### Level 1 — Builders

#### frontend-engineer

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

**Status:** ✅ Active (updated with prohibitions)

---

#### test-eval-engineer

**File:** `.claude/agents/test-eval-engineer.md` (NEW)

**Purpose:** Tests, evals, quality infrastructure, includes QA capabilities (merged from qa-release-engineer)

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

**Status:** ✅ Active (new, to be created)

---

#### visual-plan-architect

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

## Conditional Agents (3) — Invoke When Needed

### research-analyst

**File:** `.claude/agents/research-analyst.md` (symbolic link)

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

## Skills

### update-docs-and-build-history (NEW)

**Location:** `.claude/skills/update-docs-and-build-history/`

**Purpose:** Update documentation when recording decisions, failures, evals, or gates

**When to Use:**
- BLD entry created
- Eval case created
- Gate added/updated
- Decision documented

**Downgraded From:** documentation-engineer

---

### failure-to-prompt-update (NEW)

**Location:** `.claude/skills/failure-to-prompt-update/`

**Purpose:** Update agent prompts based on eval cases to prevent failure recurrence

**When to Use:**
- Eval case created
- Failure recurrence detected
- Agent instruction update needed

**Downgraded From:** prompt-optimizer

---

### portfolio-process-page

**Location:** `.claude/skills/portfolio-process-page/`

**Purpose:** Generate portfolio process pages

**When to Use:**
- Portfolio page needed
- Build history documentation needed

**Downgraded From:** portfolio-documentation-engineer

---

### worktree-management

**Location:** `scripts/worktree-management.js` + `.claude/hooks/worktree-setup`

**Purpose:** Manage worktree creation and cleanup

**When to Use:**
- Worktree needed for isolated work
- Branch isolation required

**Downgraded From:** worktree-orchestrator

---

## Agent Authority Levels

### Level 4 — System Governance
- **Authority:** Can audit and recommend changes to entire agent system
- **Blocking:** Can recommend agent removal/merge/downgrade
- **Example:** agent-governance-auditor

### Level 3 — Release Quality
- **Authority:** Owns final release quality bar
- **Blocking:** Can veto any release
- **Example:** cto-bar-raiser

### Level 2 — Principal Reviewers
- **Authority:** Can validate quality and block release
- **Blocking:** Can block for specific domain (product, design, security, architecture)
- **Examples:** principal-product-manager, principal-design-reviewer, security-reviewer, principal-architect, fresh-review-agent

### Level 1 — Builders
- **Authority:** Create implementation artifacts
- **Blocking:** Cannot approve own work
- **Examples:** frontend-engineer, test-eval-engineer, visual-plan-architect

## Agent Operating Principles

### Core Principles

1. **Builders build, reviewers validate, governance audits, humans approve**
2. **No agent may approve its own work**
3. **Every agent must have clear responsibility, evidence output, and blocking authority (if relevant)**
4. **Agent-generated PASS is advisory only, not release authority**
5. **Human approval is required before release**

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

## Conditional Invocation Rules

### security-reviewer
**Invoke when:**
- Auth logic changes
- Payment logic changes
- Secret/config changes
- User data changes
- AI/prompt risks

**Do NOT invoke for:**
- General frontend changes
- UI-only changes
- Component updates

### principal-architect
**Invoke when:**
- Architecture decisions
- Routing changes
- Data flow changes
- Dependency additions

**Do NOT invoke for:**
- Component implementation
- UI-only changes
- Styling changes

### research-analyst
**Invoke when:**
- Research phase
- Validation phase
- Competitive analysis needed

**Do NOT invoke for:**
- Implementation work
- Feature development
- Regular development

## Related Documentation

- **[AGENT_SYSTEM_AUDIT.md](AGENT_SYSTEM_AUDIT.md)** — Comprehensive audit
- **[AGENT_RETIREMENT_DECISIONS.md](AGENT_RETIREMENT_DECISIONS.md)** — Retirement decisions
- **[AGENT_AUTHORITY_MATRIX.md](AGENT_AUTHORITY_MATRIX.md)** — Authority matrix
- **[RACI_MATRIX.md](RACI_MATRIX.md)** — Responsibility assignments

---

**Last Updated:** 2026-06-10
**Version:** 2.0
**Total Agents:** 11 (8 core + 3 conditional)
**Reduction from 23 agents:** 52%
