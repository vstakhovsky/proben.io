# Research Decisions - Proben.io

This document records decisions made about applying research insights to Proben.io.

## Last Updated: 2026-06-09

---

## Decision: Adopt Agent Looping (Closed Looping First)

**Date**: 2026-06-09
**Source**: [Agent Looping Pattern](https://loops.elorm.xyz/loops)
**Decision**: ADOPT (phased approach)
**Confidence**: Medium-High

### Rationale

Agent looping provides a systematic structure for AI-assisted development that:
- Replaces fragile manual prompting with repeatable loops
- Adds verification at each step to catch issues early
- Enables predictable cost through iteration limits
- Makes the development process visible and traceable

Direct quote from Peter Steinberger: "You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."

### What We're Adopting

**Immediately (P0 - Documentation)**:
- AI Development Loop structure (docs/AI_DEVELOPMENT_LOOP.md)
- Loop Policy defining when to use each loop type (docs/LOOP_POLICY.md)
- Agent role definitions with loop behavior
- Verification gates and stop conditions

**Soon (P1 - Portfolio)**:
- /portfolio/build-process/agent-looping page
- Public explanation of how Proben.io uses loops
- Examples of loops in action

**Process Integration (Ongoing)**:
- Single-agent loops for small tasks
- Fleet loops for complex tasks
- Closed looping for all tasks (no open looping yet)
- Human approval before implementation

### What We're Rejecting

**Rejecting for now**:
- Open looping (too expensive, too risky without stronger evals)
- Autonomous deployment (human must verify behavior)
- Loops for trivial tasks (overhead not justified)
- Over-engineering (loops must have clear acceptance criteria)

**Reconsider later when**:
- Comprehensive test coverage exists
- Evals are in place and reliable
- Budget allows experimentation
- Observability tools implemented

### Risks and Mitigations

**Risk**: Loops add overhead to simple tasks
**Mitigation**: Use single-agent loops only for non-trivial tasks; skip loops for trivial fixes

**Risk**: Token cost can grow with iterations
**Mitigation**: Strict iteration limits (2-3 max); human approval before continuing

**Risk**: Agents might report success but product is broken
**Mitigation**: Verification includes E2E tests and browser checks, not just "code compiles"

**Risk**: Complex fleet loops may be hard to manage
**Mitigation**: Start with simple single-agent loops; add complexity gradually

### Expected Outcomes

- **Process quality**: Systematic approach reduces ad-hoc mistakes
- **Output quality**: Verification gates catch issues before deployment
- **Cost predictability**: Iteration limits prevent runaway token usage
- **Portfolio credibility**: Visible process demonstrates AI sophistication

---

## Decision: Adopt Context Optimization Approach

**Date**: 2026-06-09
**Source**: [Why More Context Makes Your Agent Dumber](https://www.youtube.com/watch?v=EcqMYoIV57A)
**Decision**: ADOPT with P0 priority
**Confidence**: High

### Rationale

The "lost in the middle" phenomenon directly explains observed issues in AI-assisted development:

1. **Route mismatch incident**: Agent was given full repo context but missed the canonical route requirement
2. **Broad test selectors**: Agent missed existing stable test IDs in favor of text-based selectors
3. **Feature creep**: Without focused context, agents propose features outside current phase scope

### What We're Adopting

**Immediately (P0)**:
- Task-specific context packs instead of full repo dumps
- Implementation critic before code changes
- Request intake and approval workflow
- QA validation of spec compliance

**Soon (P1)**:
- Research log portfolio page
- Source card documentation
- "Learned/Applied/Rejected" tracking

**Later (P2)**:
- Automated research digest
- MCP integrations
- Source ranking system

### What We're Rejecting

- Full-codebase context as default
- "More context is better" assumption
- Implementation without planning phase

### Risks and Mitigations

**Risk**: Context packs may miss important information
**Mitigation**: Use tests and documentation as validation sources

**Risk**: More upfront time before implementation
**Mitigation**: Planning prevents rework, net time savings

---

## Template for Future Decisions

```
## Decision: [Title]

**Date**: [Date]
**Source**: [Link]
**Decision**: [ADOPT/TEST/REJECT/WATCH]
**Confidence**: [High/Medium/Low]

### Rationale
[Why this decision]

### What We're Adopting
[List changes]

### What We're Rejecting
[List what we're not doing]

### Risks and Mitigations
[Risk]: [Mitigation]
```

---

## Decision: Deep Agents Validates Our Approach

**Date**: 2026-06-09
**Source**: [Deep Agents - LangChain](https://lnkd.in/dDgDAijZ)
**Decision**: VALIDATE our approach, DEFER framework adoption
**Confidence**: High

### Rationale

LangChain's Deep Agents release directly validates core Proben.io principles:

1. **Planning first validates visual plans**
   - LangChain: "Agent writes structured TODO list before executing"
   - Proben.io: Visual plans with human approval before code
   - **Our approach was ahead of mainstream adoption**

2. **Subagent delegation validates fleet loops**
   - LangChain: "Complex tasks split across isolated sub-agents"
   - Proben.io: Orchestrator + specialist agents model
   - **Our specialist model is proven pattern**

3. **Human-in-the-loop validates oversight**
   - LangChain: "Configure tools requiring approval before running"
   - Proben.io: Human approval gates at every implementation
   - **Our approach is essential, not optional**

4. **Structured execution validates closed loops**
   - LangChain: Built on LangGraph for orchestration
   - Proben.io: Closed loops with verification at each step
   - **Systematic execution is correct approach**

### What This Validates

**Our core principles are confirmed**:
- Planning-first development ✅
- Human oversight essential ✅
- Fleet orchestration proven ✅
- Closed loops necessary ✅

**Our implementation is validated**:
- Visual plans = structured TODOs ✅
- Approval gates = human-in-the-loop ✅
- Specialist agents = subagents ✅

### What We're Adopting

**Immediately (P0)**:
- Document this validation in source card ✅
- Update research digest with validation insight ✅
- Add validation section to AI Development Loop ✅
- Update portfolio messaging to emphasize "we did this before it was mainstream"

**Framework adoption**:
- Phase 1: NO adoption (Deep Agents overkill for static demo)
- Phase 2+: CONSIDER for backend, AI features, persistence (evaluate then)

### What We're Rejecting

**Framework adoption for Phase 1**:
- Deep Agents framework is overkill for static demo
- No backend = no filesystem access needed
- No AI features = no complex orchestration needed
- Static site = production-grade not required yet

**We're NOT saying**:
- Deep Agents is wrong (it's clearly right for production agents)
- Proben.io's approach is wrong (it's validated by this release)
- We should never use frameworks (just not for Phase 1)

### Risks and Mitigations

**Risk**: Might seem like we're ignoring a "better" approach
**Mitigation**: Emphasize we're ahead of the curve, not behind. We implemented this before it was mainstream.

**Risk**: Framework adoption adds complexity
**Mitigation**: Defer to Phase 2+ when product complexity warrants it.

**Risk**: Missing out on production-grade features
**Mitigation**: Phase 1 is for validation, not production use.

### Portfolio Value

**Messaging validated**:
- "We implemented planning-first, human-in-the-loop development before it was mainstream"
- Shows pattern recognition and early adoption
- Demonstrates sophistication in agent architecture understanding

**Differentiation**:
- Other candidates: "I use LangChain agents"
- Proben.io: "I implemented planning-first workflows before LangChain released Deep Agents"

---

**Status**: DOCUMENTATION UPDATED - Framework adoption deferred to Phase 2+
