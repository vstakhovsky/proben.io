# Source Card: Agent Looping / Loop Engineering

## Source

**Source title**: Agent Looping / Loop Engineering Pattern

**Source type**: Concept pattern / Best practice

**URL**:
- https://loops.elorm.xyz/loops
- Attributed to Peter Steinberger: "You shouldn't be prompting coding agents anymore. You should be designing loops that prompt your agents."

**Date reviewed**: 2026-06-09

**Confidence level**: Medium (concept pattern, not a single paper or talk)

**Related tags**:
- agent loops
- AI-assisted development
- Claude Code
- coding agents
- orchestration
- evals
- verification
- portfolio process

---

## Core Idea

**Summary**: Instead of manually writing one-off prompts for coding agents, design loops that systematically prompt your agents through discovery → planning → execution → verification → iteration.

**Key points** (5-8 bullets):

1. **Manual prompting is fragile**: Step-by-step manual prompting doesn't scale for complex development work
2. **Loops are systematic**: Design repeatable loops that agents run autonomously within defined boundaries
3. **Single-agent loop**: One agent runs discovery → planning → execution → verification → iteration on a task
4. **Fleet loop**: Orchestrator owns the goal, specialist agents own subproblems, every agent runs the same cycle
5. **Open looping**: Wide exploratory space, agent can discover new paths—powerful but expensive and risky
6. **Closed looping**: Human defines the path first, clear goals and steps, eval at every step, stop based on acceptance criteria
7. **Termination is critical**: Loops must stop when acceptance criteria are met or after max iterations
8. **Verification gates**: Every step needs checks against goals and standards before proceeding

---

## Key Concepts

### Single-Agent Loop

One agent handles a task end-to-end:
1. **Discovery**: Find what the agent needs to know
2. **Planning**: Break work into clear steps
3. **Execution**: Produce output
4. **Verification**: Check against goal and standard
5. **Iteration**: Fix gaps and loop again until goal is met

**Best for**: Small, focused tasks like UI fixes, doc updates, single-file changes.

### Fleet Loop (Orchestrator + Specialist Agents)

Multiple agents work together:
- **Orchestrator**: Owns the overall goal, decides when to use specialist agents
- **Specialist agents (subagents)**: Handle narrower tasks with specific expertise
- **Tree structure**: Every agent in the tree runs the same cycle (discovery → planning → execution → verification → iteration)

**Best for**: Architecture decisions, new product areas, AI/evals/guardrails, security-sensitive changes.

### Orchestrator

The agent that:
- Owns the overall goal
- Breaks work into tasks
- Assigns specialist agents
- Enforces stop conditions
- Prevents scope creep
- Escalates to human for approval

### Specialist Agents / Subagents

Agents that:
- Handle narrower tasks
- Have specific expertise (research, architecture, security, QA, docs)
- Run the same cycle as orchestrator (discovery → planning → execution → verification → iteration)
- Report back to orchestrator or parent agent

### Open Looping

Characteristics:
- Wide exploratory space
- Agent can discover new paths
- Potentially powerful but expensive and risky
- Can burn too many tokens
- Can produce poor output if standards are loose

**Risks**: Unbounded token cost, unclear stop conditions, quality drift, scope creep.

### Closed Looping

Characteristics:
- Human defines the path first
- Clear goal
- Clear steps
- Eval at every step
- Stop or return result based on acceptance criteria
- Cheaper, repeatable, safer

**Benefits**: Predictable cost, repeatable process, clear termination, safer for normal budgets.

### Termination Criteria

Every loop must stop when:
- Acceptance criteria are met
- Tests pass
- Human approval is required
- Max iteration count is reached
- Cost/tokens exceed budget
- Agent uncertainty is high
- Security risk appears

### Verification Gates

Checks that happen at each step:
- Does output match goal?
- Does output meet standards?
- Are tests passing?
- Is acceptance criteria satisfied?
- Should we iterate or stop?

### Token/Budget Constraints

Default limits:
- Max 2 iterations for small tasks
- Max 3 iterations for medium tasks
- Human approval before any 4th iteration
- No open-ended autonomous work

---

## Why It Matters

### For AI Product Development

- **Systematic process**: Loops provide a repeatable structure for AI-assisted development
- **Quality at each step**: Verification gates catch issues before they compound
- **Predictable cost**: Closed looping with iteration limits prevents token runaway
- **Clear responsibility**: Orchestrator owns goal, specialists own execution

### For Coding with AI Agents

- **Reduces manual prompting**: Instead of writing 10 prompts manually, design 1 loop
- **Better handoffs**: Each agent has clear role and termination criteria
- **Traceable decisions**: Each step produces documentation of why decisions were made

### For Improving Delivery Quality

- **Verification at every step**: Catches issues before they compound
- **Human gates**: Approval before implementation prevents scope creep
- **Test-driven**: Loops can require tests to pass before proceeding

### For Avoiding "Agents Say Green But Product Is Broken"

- **Behavior verification**: E2E and browser checks, not just "code compiles"
- **Multi-role verification**: QA, security, architect all review before accepting
- **Human final check**: No deployment without human verification

### For Making Development Process Visible as Portfolio Evidence

- **Public process**: Document the loop structure, verification steps, decisions
- **Clear methodology**: Shows sophisticated understanding of AI-native development
- **Traceable learning**: Each loop produces artifacts that can be shared publicly

---

## Critical View

### When This Is Useful

**Good for**:
- Complex tasks requiring multiple steps
- Tasks where quality verification matters
- Repeatable processes (testing, reviews, documentation)
- Situations where cost control matters
- Portfolio building (shows sophisticated approach)

**Not good for**:
- Trivial one-line fixes (overhead not worth it)
- Emergency fixes (speed matters more than process)
- Highly exploratory work (open looping too risky)
- Situations with unclear acceptance criteria

### When It Is Overkill

- **Small changes**: One-line fixes, typo corrections
- **Well-understood tasks**: No need for discovery phase
- **Low-risk changes**: CSS tweaks, content updates
- **Time-sensitive fixes**: Process slows down response

### When It Becomes Expensive

- **Too many iterations**: Each iteration costs tokens and time
- **Too many specialists**: Fleet loops with many agents multiply cost
- **Open looping**: Unbounded exploration can burn budget
- **Over-engineering**: Designing loops for trivial tasks

### When It Creates Low-Quality Output

- **Loose acceptance criteria**: "Make it better" is not verifiable
- **Weak verification gates**: Code compiles ≠ product works
- **No human review**: Agents can miss edge cases
- **Poor context management**: "Lost in the middle" problem in loops

### When It Needs Human Approval

- **Architecture changes**: Before structural changes
- **Security-sensitive changes**: Before touching auth/data
- **New features**: Before adding functionality
- **4th+ iterations**: Before runaway iterations
- **Uncertain situations**: When agent expresses low confidence

### What Can Go Wrong Without Strong Acceptance Criteria

- **Scope creep**: Agent keeps "improving" beyond spec
- **Token waste**: Agent iterates without clear stop
- **Quality drift**: Standards loosen over iterations
- **False positives**: Agent reports success but product broken
- **Missing requirements**: Agent optimizes for wrong goal

---

## Verdict

**RECOMMENDATION: ADOPT with phased approach**

### Primary Recommendation: Closed Looping First

**Why**:
- Safer, cheaper, repeatable
- Predictable cost and timeline
- Clear termination criteria
- Suitable for normal budget

**Apply to**:
- All non-trivial development tasks
- Architecture decisions
- Security-sensitive changes
- Multi-page UX changes

### Secondary Recommendation: Fleet Loop for Complex Tasks

**Use for**:
- Architecture decisions
- New product areas
- AI/evals/guardrails implementation
- Portfolio process documentation

**Why**:
- Specialist expertise needed
- Multiple perspectives required
- Quality verification at each step

### Reject for Now: Open Looping

**Why reject**:
- Too expensive for normal budget
- Too risky without strong evals
- Requires better observability
- Needs guardrails and budget controls

**Reconsider when**:
- Product has stronger tests
- Evals are in place
- Budget allows experimentation
- Observability tools are ready

### Default for Proben.io

**Start with**:
1. Closed looping for all non-trivial tasks
2. Single-agent loop for small tasks (UI fixes, docs, tests)
3. Fleet loop only for complex tasks (architecture, new areas)
4. Human approval before implementation
5. Verification: typecheck, tests, build, E2E, browser check
6. Max 2-3 iterations before human review

### Avoid

- Open looping (too risky, too expensive)
- Loops for trivial tasks (overhead not worth it)
- Loops without clear acceptance criteria (unbounded)
- Autonomous deployment (human must verify)

---

## Related Sources

*(To be populated as more sources are reviewed)*

---

## Notes

- This is a conceptual pattern, not a single paper or talk
- Multiple practitioners discussing similar patterns
- Peter Steinberger quote widely cited in AI engineering community
- Loop engineering aligns with broader "agentic workflows" trend

*Uncertain Assumptions*:
- Exact origin of the pattern (multiple sources discussing similar ideas)
- Specific implementation details vary by practitioner
