# Loop Policy - Proben.io

This document defines when and how to use different loop types for AI-assisted development at Proben.io.

## Last Updated: 2026-06-09

## Core Principles

1. **Design loops, not prompts**: Systematic approach over manual one-off prompting
2. **Closed looping first**: Safer, cheaper, repeatable
3. **Human gates**: Approval before implementation
4. **Verification at every step**: Don't proceed without checks
5. **Clear termination**: Stop conditions prevent runaway loops

---

## When to Use Single-Agent Loop

### Use For

**Small UI fixes**
- Button color changes
- Layout tweaks
- Typography adjustments
- Spacing changes

**Small doc updates**
- Fixing typos
- Updating examples
- Clarifying explanations
- Adding notes

**Single-file changes**
- Component updates
- Hook additions
- Utility function additions
- Test file updates

**Simple tests**
- Adding one test case
- Fixing broken test
- Updating test data

**Small content changes**
- Copy updates
- Text replacements
- Link updates

### Structure

```
Agent receives task
├─ Discovery: What needs to be done? (2-3 minutes)
├─ Planning: What are the steps? (list 3-5 steps)
├─ Execution: Implement the changes
├─ Verification: Run type-check, test, build
└─ Iteration: Fix issues (max 2 iterations)
```

### Termination

Stop when:
- Acceptance criteria are met
- All verification checks pass
- Max 2 iterations reached
- Agent uncertain about next step

### Budget

- **Max iterations**: 2
- **Token limit**: ~10K tokens per task
- **Time limit**: ~10 minutes per task

---

## When to Use Fleet Loop

### Use For

**Architecture decisions**
- Route structure changes
- Component architecture changes
- Data flow changes
- Build system changes

**New product areas**
- New features
- New pages
- New user flows
- New integrations

**AI/evals/guardrails**
- AI feature implementation
- Evaluation frameworks
- Guardrail systems
- Prompt optimization

**Security-sensitive changes**
- Auth touches
- Data handling
- API integrations
- Environment variables

**Multi-page UX changes**
- Navigation updates
- Layout system changes
- Design system updates
- Cross-component consistency

**Portfolio process documentation**
- Research process
- Build process explanation
- Development methodology

### Structure

```
Orchestrator receives task
├─ Discovery: Understand scope and complexity
├─ Planning: Decide which specialists needed
├─ Assignment: Delegate to specialist agents
│  ├─ Research Analyst: Extract patterns, tag sources
│  ├─ Product Manager: Assess user/portfolio value
│  ├─ Lead Architect: Check technical fit, prevent over-engineering
│  ├─ AI Engineer: Assess agentic relevance, suggest evals
│  ├─ Security Reviewer: Identify risks, check data handling
│  ├─ QA Release Engineer: Define tests, acceptance criteria
│  ├─ Documentation Engineer: Plan public explanation
│  └─ Implementation Critic: Find weak spots, suggest smaller scope
├─ Synthesis: Combine specialist perspectives
├─ Human Gate: Approval before implementation
├─ Execution: Implement approved plan
├─ Verification: All specialists review output
└─ Iteration: Address gaps with human approval
```

### Termination

Stop when:
- All specialists approve
- Human approves implementation
- All verification checks pass
- Max 3 iterations reached
- Security risk identified

### Budget

- **Max iterations**: 3
- **Token limit**: ~50K tokens per task (all agents combined)
- **Time limit**: ~30 minutes per task
- **Human gates**: Before implementation, before 4th iteration

---

## When to Avoid Looping

### Avoid When

**The task is trivial**
- One-line fixes
- Simple typo corrections
- Minor formatting

**Acceptance criteria are unclear**
- "Make it better"
- "Improve the code"
- "Optimize performance"
- Without specific, measurable goals

**There is no testable output**
- Exploratory research without clear deliverable
- "Think about this problem"
- "Investigate X" without defined output

**Agent would need too much context**
- "Review the entire codebase"
- "Find all bugs"
- "Optimize everything"
- Without focused scope

**Token cost is not justified**
- Simple changes
- Low-risk changes
- Changes that don't affect product behavior

**Risk of over-engineering is high**
- "Refactor this module"
- "Improve architecture"
- Without specific problem to solve

### What to Do Instead

- **Direct implementation**: For trivial fixes
- **Human planning first**: Define acceptance criteria before looping
- **Manual prompting**: For simple, one-off tasks
- **Skip**: If the change doesn't matter enough to justify the process

---

## Stop Conditions

### Every Loop Must Stop When

**Acceptance criteria are met**
- All requirements satisfied
- All tests passing
- Product behavior verified

**Tests pass**
- Type check: ✓
- Unit tests: ✓
- Build: ✓
- E2E tests: ✓
- Browser check: ✓ (if UI changed)

**Human approval is required**
- Before implementation
- Before 4th iteration
- For architecture changes
- For security-sensitive changes

**Max iteration count is reached**
- Small tasks: 2 iterations max
- Medium tasks: 3 iterations max
- Large tasks: Human review before continuing

**Cost/tokens exceed budget**
- Single-agent: ~10K tokens
- Fleet: ~50K tokens total
- Pause and ask human before continuing

**Agent uncertainty is high**
- Agent expresses low confidence
- Agent asks for clarification
- Agent identifies blockers

**Security risk appears**
- Data handling concern
- Prompt injection risk
- Dependency issue
- Environment variable exposure

### Immediate Stop

**Stop immediately and escalate to human when**:
- Security vulnerability identified
- Data leak detected
- Performance degradation >50%
- Build breaks unexpectedly
- Tests fail in unexpected ways
- Agent behavior is unpredictable

---

## Budget Limits

### Default Limits

**Small tasks (single-agent loop)**
- Max iterations: 2
- Token budget: ~10K
- Time budget: ~10 minutes
- After 2nd iteration: Human review required

**Medium tasks (single-agent or simple fleet)**
- Max iterations: 3
- Token budget: ~30K
- Time budget: ~20 minutes
- After 2nd iteration: Human review suggested

**Large tasks (full fleet loop)**
- Max iterations: 3
- Token budget: ~50K total
- Time budget: ~30 minutes
- Before implementation: Human approval required
- Before 4th iteration: Human approval required

### Budget Alerts

**Warn when approaching limits**:
- At 80% of token budget
- At 80% of time budget
- At iteration 2 (for tasks with max 3)

**Stop when limits exceeded**:
- Pause and ask human before continuing
- Don't automatically start next iteration
- Require explicit approval to exceed budget

---

## Loop Quality Standards

### Every Loop Must Have

**Clear acceptance criteria**
- Testable requirements
- Specific, measurable outcomes
- Not "make it better" or "improve"

**Verification steps**
- What checks will run?
- What constitutes success?
- What happens if checks fail?

**Termination conditions**
- When do we stop?
- What are the success criteria?
- What are the failure conditions?

**Human gates**
- When is human approval required?
- What requires escalation?
- How does human intervene?

### Every Loop Must Not Have

**Unbounded exploration**
- "Keep iterating until perfect"
- "Find all optimizations"
- Without clear stop condition

**Vague goals**
- "Improve quality"
- "Make it faster"
- Without specific metrics

**Missing verification**
- "Code compiles" is not enough
- Need E2E behavior verification
- Need browser check for UI changes

**No human oversight**
- Autonomous deployment
- Autonomous iteration beyond limits
- No approval before implementation

---

## Open Looping Policy

### Current Status: NOT APPROVED

**Why not approved yet**:
- Too expensive for normal budget
- Too risky without strong evals
- Requires better observability
- Needs guardrails and budget controls

**When to reconsider**:
- Product has comprehensive test coverage
- Evals are in place and reliable
- Budget allows for experimentation
- Observability tools are implemented
- Guardrails are tested and verified

**Requirements before approval**:
1. Comprehensive test suite (unit + E2E)
2. Evaluation framework for AI features
3. Budget controls and alerts
4. Observability and tracing
5. Human override capability
6. Clear rollback procedures

### What Open Looping Would Look Like (Future)

**Characteristics**:
- Wide exploratory space
- Agent can discover new paths
- Self-directed iteration within bounds
- Human sets goals, not steps

**Required guardrails**:
- Hard budget limits
- Automatic rollback on failure
- Continuous monitoring
- Human can interrupt anytime
- Clear success criteria

**Use cases (future)**:
- Exploratory research
- Optimization discovery
- Pattern recognition
- Automated testing strategies

---

## Examples

### Example 1: Single-Agent Loop (Small Task)

**Task**: Fix button color on landing page

**Loop**:
1. Discovery: Read landing page, find button, identify current color
2. Planning: Update CSS class, run type-check, run tests
3. Execution: Change button color in component
4. Verification: Type-check ✓, tests ✓, build ✓
5. Iteration: Not needed (acceptance criteria met)

**Budget**: 2K tokens, 5 minutes, 1 iteration

---

### Example 2: Fleet Loop (Complex Task)

**Task**: Add canonical route structure for readiness check

**Loop**:
1. **Orchestrator Discovery**: Understand route mismatch problem
2. **Orchestrator Planning**: Assign specialists
3. **Research Analyst**: Extract context optimization insights
4. **Product Manager**: Confirm user value (clear URLs)
5. **Lead Architect**: Check Next.js routing structure
6. **QA Release Engineer**: Define E2E tests
7. **Implementation Critic**: Review plan, suggest smaller scope
8. **Human Gate**: Approve plan
9. **Execution**: Update routes, tests, navigation
10. **Verification**: All checks pass
11. **Documentation**: Update docs, create portfolio entry

**Budget**: 35K tokens, 25 minutes, 2 iterations

---

### Example 3: Avoid Looping (Trivial Task)

**Task**: Fix typo in README

**Loop**: None

**Action**: Direct fix, no loop needed

**Reason**: Trivial change, loop overhead not justified

---

## Related Documentation

- **AI Development Loop**: `docs/AI_DEVELOPMENT_LOOP.md` - Full loop structure
- **Context Strategy**: `docs/context/CONTEXT_STRATEGY.md` - Task-specific context
- **Agent Roles**: `.claude/agents/*.md` - Individual agent responsibilities

---

## See Also

- Source Card: [Agent Looping](docs/research/source-cards/2026-06-agent-looping.md)
- Application: [How Proben.io Uses Agent Loops](docs/AI_DEVELOPMENT_LOOP.md)
