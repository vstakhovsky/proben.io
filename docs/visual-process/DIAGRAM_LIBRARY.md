# Diagram Library - Proben.io

This document defines the standard diagrams that Proben.io uses to make AI-native product development visible.

## Last Updated: 2026-06-09

---

## Diagram Types

Proben.io uses 7 standard diagram types to visualize different aspects of AI-assisted development.

---

## 1. Agent Loop Diagram

### Purpose
Show how one agent moves through discovery, planning, execution, verification, and iteration.

### Goal
Make the single-agent loop structure visible and understandable.

### Audience
- Hiring managers (shows systematic approach)
- Technical team (shows process structure)
- Portfolio readers (shows sophistication)

### When to Use
- Explaining single-agent loop approach
- Onboarding to Proben.io development process
- Portfolio / build-process pages

### Recommended Format
- Mermaid flowchart
- 5-7 nodes maximum
- Clear labels for each phase
- Iteration path shown explicitly

### GitHub Location
`docs/diagrams/proben-build-loop.mmd`

### Public Page Location
`/portfolio/build-process/agent-looping` (embedded)

### Acceptance Criteria
- [ ] Shows discovery → planning → execution → verification → iteration
- [ ] Labels are clear and specific
- [ ] Iteration path is visible
- [ ] Renders correctly in GitHub
- [ ] Simple enough to understand at a glance

---

## 2. Fleet Loop Diagram

### Purpose
Show how orchestrator, specialist agents, and subagents work together.

### Goal
Make the fleet loop coordination visible and show how specialists contribute.

### Audience
- Technical team (shows coordination structure)
- Hiring managers (shows sophisticated orchestration)
- Portfolio readers (shows advanced agentic workflows)

### When to Use
- Explaining fleet loop approach
- Complex tasks requiring multiple specialists
- Architecture decisions
- Portfolio / build-process pages

### Recommended Format
- Mermaid flowchart or graph
- Orchestrator at top/center
- Specialists branching from orchestrator
- Clear handoff points
- Verification feedback loop

### GitHub Location
`docs/diagrams/proben-agent-fleet-loop.mmd`

### Public Page Location
`/portfolio/build-process/agent-looping` (embedded)

### Acceptance Criteria
- [ ] Shows orchestrator role clearly
- [ ] Shows specialist agents and their responsibilities
- [ ] Shows verification feedback to orchestrator
- [ ] Shows human approval gate
- [ ] Renders correctly in GitHub
- [ ] Complex but not overwhelming

---

## 3. Human-Agent Handoff Diagram

### Purpose
Show where humans plan and validate, and where agents execute.

### Goal
Make the human-in-the-loop approach visible and show clear responsibilities.

### Audience
- Hiring managers (shows oversight, not autonomous agents)
- Technical team (shows when to intervene)
- Portfolio readers (shows balanced approach)

### When to Use
- Explaining human oversight approach
- Security reviews
- Architecture decisions
- Portfolio / build-process pages

### Recommended Format
- Mermaid flowchart
- Swimlane-style (human lane vs agent lane)
- Clear handoff points
- Validation feedback to human

### GitHub Location
`docs/diagrams/proben-human-agent-handoff.mmd`

### Public Page Location
`/portfolio/build-process/visual-agentic-development` (embedded)

### Acceptance Criteria
- [ ] Shows human responsibilities clearly
- [ ] Shows agent responsibilities clearly
- [ ] Handoff points are visible
- [ ] Validation returns to human
- [ ] Renders correctly in GitHub

---

## 4. Research-to-Application Diagram

### Purpose
Show how market sources become Proben.io product/process improvements.

### Goal
Make the research-driven development process visible and traceable.

### Audience
- Hiring managers (shows market awareness)
- Technical team (shows where insights come from)
- Portfolio readers (shows learning mindset)

### When to Use
- Explaining research-driven approach
- Source card documentation
- Portfolio / research-log pages

### Recommended Format
- Mermaid flowchart
- Left-to-right flow
- Decision nodes (adopt/reject/watch)
- Feedback loops

### GitHub Location
`docs/diagrams/proben-research-to-implementation.mmd`

### Public Page Location
`/portfolio/research-log` (embedded)

### Acceptance Criteria
- [ ] Shows source → insight → application flow
- [ ] Shows decision points
- [ ] Shows feedback/iteration
- [ ] Links to source cards
- [ ] Renders correctly in GitHub

---

## 5. Validation Gates Diagram

### Purpose
Show the release quality gates: typecheck, unit tests, build, E2E, browser check, Vercel deployment.

### Goal
Make the verification process visible and show quality standards.

### Audience
- Hiring managers (shows quality standards)
- Technical team (shows what must pass)
- Portfolio readers (shows thoroughness)

### When to Use
- Explaining quality standards
- Before deployment
- Portfolio / build-process pages

### Recommended Format
- Mermaid flowchart
- Sequential gates
- Stop conditions shown
- Feedback loops for failures

### GitHub Location
`docs/diagrams/proben-validation-gates.mmd`

### Public Page Location
`/portfolio/build-process/visual-agentic-development` (embedded)

### Acceptance Criteria
- [ ] Shows all 5 gates in sequence
- [ ] Shows stop conditions
- [ ] Shows feedback loops
- [ ] Labels are specific (not just "test")
- [ ] Renders correctly in GitHub

---

## 6. Visual Plan Lifecycle Diagram

### Purpose
Show how a rough idea becomes a visual plan, then an implementation slice.

### Goal
Make the planning process visible and show iteration before coding.

### Audience
- Hiring managers (shows planning-first approach)
- Technical team (shows how to create visual plans)
- Portfolio readers (shows systematic planning)

### When to Use
- Explaining visual plan approach
- Creating new visual plans
- Portfolio / build-process pages

### Recommended Format
- Mermaid flowchart
- Shows evolution from idea → brief → plan → ticket → execution → QA → artifact
- Feedback loops at each stage

### GitHub Location
`docs/diagrams/proben-visual-plan-lifecycle.mmd`

### Public Page Location
`/portfolio/build-process/visual-agentic-development` (embedded)

### Acceptance Criteria
- [ ] Shows all stages from idea to artifact
- [ ] Shows feedback loops
- [ ] Shows human review points
- [ ] Shows where agents contribute
- [ ] Renders correctly in GitHub

---

## 7. Context Pack Diagram

### Purpose
Show how agents receive task-specific context instead of the full repository.

### Goal
Make the context optimization approach visible and show focused scoping.

### Audience
- Hiring managers (shows sophisticated context management)
- Technical team (shows how to scope agent work)
- Portfolio readers (shows advanced AI understanding)

### When to Use
- Explaining context strategy
- Creating task context packs
- Portfolio / build-process pages

### Recommended Format
- Mermaid flowchart
- Shows full repo → task type → context pack → agent
- Shows what's excluded

### GitHub Location
`docs/diagrams/proben-context-pack.mmd` (planned, not yet created)

### Public Page Location
`/portfolio/build-process/visual-agentic-development` (embedded)

### Acceptance Criteria
- [ ] Shows filtering process
- [ ] Shows what's included vs excluded
- [ ] Shows task-specific scoping
- [ ] Links to context templates
- [ ] Renders correctly in GitHub

---

## Diagram Standards

### General Rules

1. **Keep it simple**: More nodes ≠ better diagram. Aim for 5-10 nodes.
2. **Use clear labels**: Specific, not generic. "Type check" not "Verify code".
3. **Show flow**: Left-to-right or top-to-bottom. Don't make user guess direction.
4. **Show decisions**: Diamond nodes for yes/no decisions.
5. **Show feedback**: Loops back to previous steps when things fail.
6. **Use consistent styling**: Same shapes for same concepts across diagrams.

### Mermaid Syntax

- Use `flowchart` or `graph` type
- Keep syntax simple and standard
- Avoid experimental Mermaid features
- Test in GitHub before committing
- Indent properly for readability

### Color and Style

- Keep it minimal (GitHub renders basic Mermaid)
- Don't depend on custom styling
- Focus on structure, not decoration
- Use subgraphs for grouping (when helpful)

---

## Diagram Maintenance

### When to Update

Update diagrams when:
- Process changes (new steps, new gates)
- Agent roles change
- Validation criteria change
- Feedback indicates diagram is unclear

### How to Update

1. Update the `.mmd` file
2. Test rendering in GitHub
3. Update references in documentation
4. Update public pages if embedded
5. Commit with clear message: "Update X diagram to show Y"

---

## Diagram Review Process

Before finalizing a diagram:

1. **Self-review**: Does it communicate the concept clearly?
2. **Technical review**: Is the Mermaid syntax valid?
3. **User review**: Can a non-technical person understand it?
4. **GitHub test**: Does it render correctly in GitHub?

---

## Related Documentation

- **Visual Process System**: `docs/visual-process/VISUAL_PROCESS_SYSTEM.md` - Overall philosophy
- **Visual Plan Template**: `docs/visual-process/VISUAL_PLAN_TEMPLATE.md` - How to create visual plans
- **Agent Loop Visuals**: `docs/visual-process/AGENT_LOOP_VISUALS.md` - Loop-specific guidance

---

## See Also

- **AI Development Loop**: `docs/AI_DEVELOPMENT_LOOP.md` - Loop structure
- **Loop Policy**: `docs/LOOP_POLICY.md` - When to use which loop
