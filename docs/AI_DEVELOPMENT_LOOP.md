# AI Development Loop - Proben.io

This document defines the closed-loop development process that Proben.io uses to build products through disciplined AI-assisted development.

## Last Updated: 2026-06-09

## Core Principle

**Design loops, not prompts.**

Instead of manually writing one-off prompts for coding agents, we design repeatable loops that systematically progress through discovery → planning → execution → verification → iteration.

---

## The Proben.io Development Loop

### 1. Source Intake

New patterns and insights enter through research:

- **User or Research Analyst adds source**
  - URL, type (talk, article, paper, repo)
  - Topic tags (agents, context, evals, guardrails, MCP)
  - Date reviewed
  - Confidence level

- **Initial summary**
  - Core idea extracted
  - Key points identified
  - Relevance assessed

**Output**: Source card in `docs/research/source-cards/`

---

### 2. Pattern Extraction

Specialist agents analyze the source from their perspective:

- **Research Analyst**: What is the core pattern? What's new?
- **Product Manager**: How does this apply to Proben.io users? Portfolio value?
- **Lead Architect**: What are the technical implications? Trade-offs?
- **Security Reviewer**: What are the risks? Data leakage? Prompt injection?
- **QA Release Engineer**: How do we verify this works? What tests?

**Output**: Multi-perspective analysis in source card

---

### 3. Human Decision Gate

Before any implementation, the system must ask:

**Should we adopt this?**
- **Adopt now**: Clear value, low risk, fits current phase
- **Test in limited scope**: Valuable but needs validation
- **Reject**: Not applicable, low value, high risk
- **Watch**: Monitor but don't act yet
- **Document only**: Record insight but don't apply

**Decision recorded in**: `docs/research/RESEARCH_DECISIONS.md`

---

### 4. Implementation Slice

Only after human approval:

- **Small vertical slice**
  - One focused change
  - No over-engineering
  - No unnecessary folders or features

- **Clear boundaries**
  - What we're doing (requirements)
  - What we're NOT doing (constraints)
  - Acceptance criteria (testable)

- **Task-specific context**
  - Use context pack (not full repo dump)
  - Include only relevant files
  - Keep under 150 lines

**Output**: Task context + implementation plan

---

### 5. Verification

After implementation, run verification checks:

```bash
# Type checking
npm run type-check

# Unit tests
npm run test

# Production build
npm run build

# E2E tests
npx playwright test e2e/core-flow.spec.ts --project=chromium

# Manual browser check (if UI changed)
# Verify in browser that changes work as expected
```

**Accept only if**: All checks pass

---

### 6. Feedback

After verification completes:

- **What worked?**
  - Did the loop save time?
  - Did it reduce mistakes?
  - Was the output higher quality?

- **What failed?**
  - Were acceptance criteria met?
  - Did tests catch issues?
  - Did we need additional iterations?

- **Process learning**
  - Should we adjust the loop?
  - Should we update context packs?
  - Should we refine verification steps?

**Output**: Feedback in application log

---

### 7. Public Process Log

Add to portfolio/blog:

- **What I learned**
  - Core insight from source
  - Why it matters

- **How I applied it**
  - Specific changes to Proben.io
  - Process improvements

- **What I rejected**
  - What didn't fit
  - Why I rejected it

- **What I will test next**
  - Next experiments to try
  - Open questions

**Output**: Portfolio entry showing research-driven development

---

## Loop Structure

### Single-Agent Loop (for small tasks)

**Use for**:
- Small UI fixes
- Small doc updates
- Single-file changes
- Simple tests
- Small content changes

**Structure**:
```
Agent receives task
├─ Discovery: Understand what's needed
├─ Planning: Break into steps
├─ Execution: Implement
├─ Verification: Run checks
└─ Iteration: Fix gaps (max 2-3 times)
```

**Termination**: When acceptance criteria met or max iterations reached.

---

### Fleet Loop (for complex tasks)

**Use for**:
- Architecture decisions
- New product areas
- AI/evals/guardrails
- Security-sensitive changes
- Multi-page UX changes
- Portfolio process documentation

**Structure**:
```
Orchestrator receives task
├─ Discovery: Understand scope
├─ Planning: Decide specialist roles
├─ Assignment: Delegate to specialists
│  ├─ Research Analyst: Pattern extraction
│  ├─ Product Manager: User/portfolio value
│  ├─ Lead Architect: Technical fit
│  ├─ Security Reviewer: Risk assessment
│  ├─ QA Release Engineer: Verification
│  └─ Documentation Engineer: Public explanation
├─ Synthesis: Combine perspectives
├─ Human Gate: Approval before implementation
├─ Execution: Implement approved plan
├─ Verification: Run all checks
└─ Iteration: Address gaps (with human approval)
```

**Termination**: When all specialists agree + human approves + all checks pass.

---

## Verification at Each Step

Every agent in the loop runs:

1. **Discovery**: What do I need to know? (Context gathering)
2. **Planning**: How will I approach this? (Step breakdown)
3. **Execution proposal**: What will I do? (Not code yet—plan first)
4. **Verification criteria**: How do I know I succeeded? (Acceptance criteria)
5. **Iteration plan**: What if it doesn't work? (Fallback options)

**Critical**: No agent implements code until orchestrator and human approve the plan.

---

## Agent Roles in the Loop

### Orchestrator

- Owns the overall goal
- Decides: single-agent or fleet loop?
- Breaks work into tasks
- Assigns specialist agents
- Enforces stop conditions
- Prevents scope creep
- Escalates to human for approval

### Research Analyst

- Extracts insights from sources
- Creates source cards
- Tags sources appropriately
- Separates evidence from assumptions
- Avoids hype

### Product Manager

- Maps insights to Proben.io product value
- Defines user value
- Defines portfolio value
- Defines prioritization (P0/P1/P2)
- Decides whether idea supports target AI PM roles

### Lead Architect

- Checks architectural fit
- Prevents over-engineering
- Defines technical trade-offs
- Checks scalability implications

### AI Engineer

- Evaluates agentic workflow relevance
- Suggests evals, traces, guardrails
- Suggests prompt optimization
- Recommends MCP usage (when appropriate)
- Keeps AI features practical and measurable

### Security Reviewer

- Checks data leakage risks
- Checks prompt injection risks
- Checks dependency/security risks
- Checks whether loops could expose private data
- Checks whether loops could run too long

### QA Release Engineer

- Defines tests
- Defines acceptance criteria
- Checks that behavior works in browser
- Does not allow "green report" without evidence
- Verifies E2E behavior

### Documentation Engineer

- Updates research log
- Updates build process docs
- Updates portfolio pages
- Creates clear public explanations

### Implementation Critic

- Before implementation, critiques the request
- Finds weak spots
- Finds risks
- Suggests better scope
- Suggests smaller vertical slice
- Prevents unnecessary code

---

## Example: Applying Agent Looping to Proben.io

### Source
Agent looping / loop engineering pattern

### Insight
Agents should not be manually prompted step-by-step forever. Design loops that prompt agents systematically.

### Application
1. Created source card analyzing the pattern
2. Defined closed-loop structure for Proben.io
3. Created agent role definitions with loop behavior
4. Defined when to use single-agent vs fleet loops
5. Set verification gates and stop conditions

### Guardrail
Human approval required before:
- Implementation
- 4th+ iterations
- Architecture changes
- Security-sensitive changes

### Verification
- Type check: ✓ npm run type-check
- Tests: ✓ npm run test
- Build: ✓ npm run build
- E2E: ✓ npx playwright test e2e/core-flow.spec.ts
- Browser: ✓ Manual verification

### Decision
**Adopt as development process**
- NOT as fully autonomous open loop yet
- Use closed looping first
- Fleet loops only for complex tasks
- Open looping rejected for now (too expensive, too risky)

---

## What We Reject

### Full Open Looping

**Why not yet**:
- Too expensive for normal budget
- Too broad without strong evals
- Too risky without better guardrails
- Requires observability tools first

**Reconsider when**:
- Product has stronger tests
- Evals are in place
- Budget allows experimentation
- Observability tools are ready

### Autonomous Deployment

**Why not**:
- Human must verify behavior
- E2E and browser checks required
- Product cannot deploy itself yet

### Over-Engineering

**Why not**:
- Loops for trivial tasks waste time
- Small changes don't need orchestration
- One-line fixes don't need discovery phase

---

## What We Will Test Next

Planned loop experiments:

1. **Research digest loop**
   - Automated source intake
   - Pattern extraction
   - Multi-perspective analysis

2. **Design parity loop**
   - Ensure all pages follow design system
   - Catch inconsistencies
   - Suggest fixes

3. **QA release loop**
   - Pre-deployment verification
   - E2E test generation
   - Browser behavior checking

4. **Eval/guardrail loop**
   - Test AI features
   - Verify guardrails work
   - Measure quality

5. **Source-to-product hypothesis loop**
   - Extract insight from source
   - Propose application
   - Define tests
   - Verify results

---

## Related Documentation

- **Loop Policy**: `docs/LOOP_POLICY.md` - When to use which loop type
- **Context Strategy**: `docs/context/CONTEXT_STRATEGY.md` - Task-specific context packs
- **Research Decisions**: `docs/research/RESEARCH_DECISIONS.md` - Decision log
- **Application Log**: `docs/research/APPLICATION_LOG.md` - Implementation tracking

---

## Validation: External Sources Confirm Our Approach

### LangChain Deep Agents Release (June 2026)

**Source**: [Deep Agents](https://lnkd.in/dDgDAijZ) - LangChain

**What validates our approach**:

1. **Planning first principle** ✅
   - LangChain: "Before executing anything, the agent writes a structured TODO list"
   - Proben.io: Visual plans before implementation, human approval before code
   - **Validation**: Our approach matches this pattern exactly

2. **Subagent delegation** ✅
   - LangChain: "Complex tasks get split across isolated sub-agents"
   - Proben.io: Fleet loops with specialist agents
   - **Validation**: Our specialist model matches this pattern

3. **Human-in-the-loop** ✅
   - LangChain: "Configure which tools need approval before running"
   - Proben.io: Human approval gates before implementation
   - **Validation**: Our oversight approach is essential

**Portfolio messaging**:
- "We implemented planning-first, human-in-the-loop development before it was mainstream"
- Shows pattern recognition and early adoption

**Framework adoption**:
- Phase 1: No adoption (overkill for static demo)
- Phase 2+: Consider for backend, AI features, persistence

**Source card**: [Deep Agents - LangChain](docs/research/source-cards/2026-06-deep-agents-langchain.md)

---

## See Also

- Source Card: [Agent Looping](source-cards/2026-06-agent-looping.md)
- Context Engineering: [Why More Context Makes Agents Dumber](source-cards/2026-06-09-more-context-makes-agents-dumber.md)
