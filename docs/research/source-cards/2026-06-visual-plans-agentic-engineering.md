# Source Card: Visual Plans for Agentic Engineering

## Source

**Source title**: Visual Plans for Agentic Engineering

**Source type**: Concept pattern / Best practice

**URL**: Multiple practitioner discussions on agentic engineering workflows

**Date reviewed**: 2026-06-09

**Confidence level**: Medium (pattern from multiple sources, not single paper)

**Related tags**:
- visual planning
- agentic engineering
- plan-implement-validate
- parallel agents
- human review
- validation gates
- portfolio process

---

## Core Idea

**Summary**: Move from "agents generate code" to "agents execute plans"—spending more time planning and validating with visual artifacts, not coding.

**Key points** (5-8 bullets):

1. **Plan → Implement → Validate**: Core rhythm replaces "prompt → generate → hope"
2. **Visual plans over walls of markdown**: Turn long specs into diagrams that are easy to review
3. **Parallel agents with isolated work**: Multiple agents work simultaneously but on separate slices
4. **Let agents review before humans**: Agents critique each other's work before human review
5. **Human at key gates**: Humans approve plans and validate results, agents execute
6. **Visual artifacts as portfolio evidence**: Diagrams and plans show sophistication, not just code
7. **Validation at every step**: No step proceeds without checks

---

## Key Concepts

### Plan → Implement → Validate

**Traditional approach**:
- Human writes long prompt
- Agent generates code
- Human reviews code
- Issues found, rework needed

**Visual approach**:
- Human defines goal
- Agent creates visual plan
- Human reviews plan (fast)
- Agent implements code
- Agent validates
- Human approves results

**Why better**: Plans reviewed before code = less rework

### Visual Plans Instead of Walls of Markdown

**Problems with text specs**:
- Long markdown hides requirements
- Trade-offs buried in prose
- Hard to scan quickly
- Ambiguity leads to agent errors

**Benefits of visual plans**:
- Flowcharts show sequence explicitly
- Tables show trade-offs clearly
- Diagrams make relationships visible
- Easy to review in minutes
- Faster feedback = less rework

### Parallel Agents with Isolated Work

**Approach**:
- Assign multiple agents simultaneously
- Each agent works on isolated slice
- No coordination complexity
- Combine results at end

**Example**:
- Agent 1: Component A
- Agent 2: Component B
- Agent 3: Tests
- All work in parallel
- Orchestrator combines

**When to use**: Complex but decomposable tasks

### Agent Review Before Human Review

**Approach**:
- Agent 1 creates plan/code
- Agent 2 (critic) reviews before human
- Human sees already-critiqued work
- Human makes final decision

**Benefits**:
- Humans review higher-quality output
- Agents catch agent-level issues
- Humans focus on product decisions

**Roles**:
- Implementation Critic agent reviews plans
- QA Release Engineer validates implementation
- Human approves final output

---

## Why It Matters

### For AI Product Development

- **Quality comes from planning**: Better plans = better agent output
- **Visual plans reduce ambiguity**: Diagrams > paragraphs for clarity
- **Parallel execution speeds up**: Isolated work can run simultaneously
- **Agent review improves quality**: Pre-human validation catches issues

### For Coding with AI Agents

- **Less rework**: Plans reviewed before code means fewer misinterpretations
- **Faster feedback**: Visuals reviewed in minutes vs reading long specs
- **Clear responsibilities**: Who plans, who implements, who validates

### For Avoiding "Agents Say Green But Product Is Broken"

- **Validation at each step**: Not just "code compiles" but full verification
- **Agent review before human**: Implementation critic catches issues
- **Human gates**: No deployment without human verification
- **Portfolio evidence**: Visual plans show the planning quality

### For Making Development Process Visible

- **Diagrams as evidence**: Show you plan before coding
- **Visual plans traceability**: Link from plan to implementation
- **Process documentation**: Shows sophistication in agentic workflows
- **Hiring manager comprehension**: Visuals easier to understand than code

---

## Critical View

### When This Is Useful

**Good for**:
- Complex tasks with multiple steps
- Tasks where requirements could be ambiguous
- Tasks where trade-offs need to be visible
- Portfolio-worthy work (shows sophistication)

**Not good for**:
- Trivial one-line fixes (overhead not worth it)
- Emergency fixes (speed matters more than process)
- Well-understood tasks (no ambiguity)

### When It Becomes Expensive

- **Over-planning**: Spending more time planning than implementing
- **Too many agents**: Parallel agents multiply cost
- **Visual for everything**: Not every task needs a diagram

### When It Creates Low-Quality Output

- **Vague visual plans**: "Make it better" without specifics
- **Weak validation**: Agent says "done" but product broken
- **No human review**: Agents validating agents without oversight

### When It Needs Human Approval

- **Before implementation**: Plan approval required
- **Before deployment**: Results verification required
- **For complex changes**: Architecture, security, features
- **For 4th+ iterations**: Prevent runaway loops

### What Can Go Wrong Without Strong Acceptance Criteria

- **Scope creep**: Visual plan doesn't constrain work
- **Token waste**: Agents iterate without clear stop
- **Quality drift**: Standards loosen over iterations
- **False positives**: Agent reports success but requirements missed

---

## Verdict

**RECOMMENDATION: ADOPT for appropriate tasks**

### Primary Recommendation: Visual Plans for Complex Tasks

**When to use visual plans**:
- Architecture decisions
- Route structure changes
- Feature additions
- Multi-page UX changes
- Security-sensitive changes

**When to skip visual plans**:
- Trivial fixes (typos, one-liners)
- Emergency fixes (time-sensitive)
- Well-understood changes (standard updates)

### Secondary Recommendation: Agent Review Before Human Review

**Use implementation critic**:
- Before agent implements code
- Before human reviews work
- For all non-trivial tasks

**Why**: Catches issues early, humans review higher-quality output

### Reject for Now: Fully Autonomous Parallel Work

**Why reject**:
- Too expensive without clear ROI
- Requires stronger coordination infrastructure
- Needs better observability first

**Reconsider when**:
- Budget allows experimentation
- Coordination tools in place
- Process is well-established

---

## Application to Proben.io

### How to Apply

**For complex tasks** (architecture, features, portfolio docs):
1. Create visual plan (diagram + requirements)
2. Implementation critic reviews plan
3. Human approves plan
4. Agent implements
5. Agent validates
6. Human verifies and approves

**For simple tasks** (UI fixes, docs, tests):
1. Create brief spec (not full visual plan)
2. Agent implements
3. Human reviews
4. Tests verify

### Visual Plan Types

**Task map**: Flowchart showing start → changes → end
**Flow diagram**: Step-by-step sequence
**Trade-offs table**: Options compared with reasoning
**Risk assessment**: What could go wrong + mitigations
**Validation gates**: What must pass before acceptance

### Diagram System

Create standard diagrams for:
- Agent loops (single and fleet)
- Human-agent handoffs
- Research to implementation
- Validation gates
- Visual plan lifecycles

**Location**: `docs/diagrams/*.mmd`

### Portfolio Evidence

Show in portfolio:
- Visual plans created for actual tasks
- Diagrams showing process sophistication
- "What I planned vs what I implemented"
- Rejected approaches with reasoning

---

## Proposed Changes

### P0 Changes (Documentation)

**Created**:
- [x] Agent looping source card
- [x] Visual plan source card
- [x] Diagram library (docs/visual-process/DIAGRAM_LIBRARY.md)
- [x] Visual plan template (docs/visual-process/VISUAL_PLAN_TEMPLATE.md)
- [x] Agent loop visuals (docs/visual-process/AGENT_LOOP_VISUALS.md)
- [x] Mermaid diagrams for all 7 diagram types

### P1 Changes (Portfolio Pages - Future)

- [ ] `/portfolio/build-process/agent-looping` page
- [ ] `/portfolio/build-process/visual-agentic-development` page
- [ ] `/portfolio/research-log` page
- [ ] Embedded diagrams in all pages

### P2 Changes (Future Enhancements)

- [ ] Automated visual plan generation
- [ ] Diagram version history
- [ ] Interactive diagram explorer
- [ ] Animated flows (where helpful)

---

## Evaluation Plan

### Success Metrics

**Process metrics**:
- % of complex tasks using visual plans (target: >80%)
- Time spent planning vs implementing (target: <30% planning)
- Rework required after implementation (target: <10%)
- Human approval time (target: <5 minutes per review)

**Portfolio metrics**:
- Page views for build-process pages
- Time on page (shows engagement)
- LinkedIn/frequency of portfolio mentions
- Interview questions about process

### Validation Steps

1. **Try on next complex task**
   - Create visual plan
   - Measure time to create
   - Measure time to review
   - Measure rework required

2. **Compare to non-visual approach**
   - Did visual plan reduce rework?
   - Did it speed up review?
   - Was it worth the overhead?

3. **Evaluate portfolio impact**
   - Do hiring managers ask about process?
   - Does it impress in interviews?
   - Does it lead to offers?

---

## Decision

**RECOMMENDATION: ADOPT with selective application**

**Confidence**: Medium-High

**Rationale**:
- Strong evidence that visual plans improve clarity
- Validated approach in engineering practice
- Portfolio value is clear
- Must be applied selectively to avoid overhead

**Adopt for**:
- Complex tasks (architecture, features, portfolio docs)
- Tasks where ambiguity is costly
- Portfolio-worthy work

**Skip for**:
- Trivial fixes
- Emergency fixes
- Well-understood changes

---

## Related Sources

- **Agent Looping**: docs/research/source-cards/2026-06-agent-looping.md
- **Context Optimization**: docs/research/source-cards/2026-06-09-more-context-makes-agents-dumber.md

---

## Notes

- This pattern emerges from multiple practitioner discussions
- No single authoritative source, but consistent themes across AI engineering community
- Core idea: Planning and validation quality matters more than raw coding speed

*Uncertain Assumptions*:
- Specific origin of pattern (multiple sources discussing similar ideas)
- Exact best practices vary by practitioner
