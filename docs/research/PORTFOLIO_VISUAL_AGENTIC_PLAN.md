# Portfolio Page Plan: Visual Agentic Development at Proben.io

## Purpose

Create a public portfolio page at `/portfolio/build-process/visual-agentic-development` that demonstrates how Proben.io uses visual plans, agent loops, and systematic validation to build with AI agents.

**Route**: `/portfolio/build-process/visual-agentic-development` (subsection of build process)

**Portfolio Value**: Shows sophisticated understanding of AI-native product development, moving beyond "I used AI" to "here's my systematic approach."

---

## Page Content Structure

### Hero Section

**Title**: How I Build Proben.io with Visual Agentic Development

**Subtitle**: Planning, validation, and human oversight—not just code generation

**Intro**: The goal is not only to ship a product, but to show how the product is built with modern AI-native workflows.

---

### Why I Show the Process

Explain that the goal is twofold:
1. Build a real product (Proben.io readiness assessment)
2. Show the development process as portfolio evidence

**Key points**:
- Code doesn't show process
- Process demonstrates sophistication
- Hiring managers want to see how you think, not just what you built
- AI-native development is complex—making it visible shows understanding

---

### The Core Loop

**Show the loop**:
```
Source → Insight → Visual Plan → Human Feedback → 
Agent Implementation → Validation → Documentation → Next Iteration
```

**Explain each step**:
- **Source**: Research from AI community (talks, articles, repos)
- **Insight**: Core pattern extracted (agent loops, context optimization, etc.)
- **Visual Plan**: Diagram showing requirements, trade-offs, validation
- **Human Feedback**: Review and approve before implementation
- **Agent Implementation**: Execute approved plan
- **Validation**: Typecheck, tests, build, E2E, browser check
- **Documentation**: Public process log, source cards, diagrams
- **Next Iteration**: Learning applied to next cycle

---

### Planning Before Coding

Explain why plans and validation criteria matter more than raw code generation:

**Problem**: "Agents say done but product is broken"
- Code compiles ✓
- Tests pass ✓
- But product broken in browser ✗
- Requirements missed ✗

**Solution**: Visual plans before code
- Requirements visible at a glance
- Trade-offs explicit in tables
- Validation criteria defined upfront
- Human reviews plan (fast) before code (slow)

**Benefit**: Less rework, fewer misinterpretations, better quality

---

### Single-Agent Loop

**When to use**: Small tasks like UI fixes, doc updates, single-file changes

**Diagram**: [Embed single-agent loop diagram]

**Explanation**:
- One agent runs discovery → planning → execution → verification → iteration
- Human approves plan before implementation
- Agent validates before human review
- Max 2 iterations for small tasks

**Example use case**: Fixing button color or updating copy

---

### Fleet Loop

**When to use**: Complex tasks like architecture, new features, security changes

**Diagram**: [Embed fleet loop diagram]

**Explanation**:
- Orchestrator owns goal
- Specialist agents contribute (Research, Product, Architect, Security, QA, Docs)
- Every agent runs same cycle (discovery → planning → execution → verification)
- Human approves before implementation
- Synthesis combines all perspectives

**Example use case**: Adding canonical route structure

---

### Visual Plans

**Why visual plans?**
- Text specs hide requirements in prose
- Diagrams show sequence explicitly
- Tables show trade-offs clearly
- Visuals reviewed in minutes vs reading long markdown

**Visual plan types**:
1. **Task map**: Flowchart showing start → changes → end
2. **Flow diagram**: Step-by-step sequence
3. **Trade-offs table**: Options compared
4. **Risk assessment**: What could go wrong + mitigations
5. **Validation gates**: What must pass

**Example**: [Embed example visual plan for route fix]

---

### Validation Gates

**Why validation matters**: Agents report success but product might be broken

**Diagram**: [Embed validation gates diagram]

**The 5 gates**:
1. **Typecheck**: Code compiles, types are correct
2. **Unit tests**: 21 tests pass (and growing)
3. **Build**: Production build succeeds
4. **E2E tests**: 8 tests pass, user flows work
5. **Browser QA**: Manual verification in browser (for UI changes)

**No deployment unless**: All gates pass

---

### What I Applied to Proben.io

**Concrete changes**:
1. **Source cards**: 3 created (agent looping, visual plans, data viz)
2. **Diagram library**: 7 diagram types defined with Mermaid files
3. **Agent roles**: 4 new roles (visual systems, diagram engineer, storyteller, portfolio docs)
4. **Skills**: 4 new skills (source-to-visual, visual-plan-builder, mermaid-generator, portfolio-page)
5. **Visual plans**: Template for creating visual plans before implementation
6. **Agent loops**: Closed-loop structure defined for all non-trivial tasks

**Process changes**:
- All complex tasks use visual plans
- All tasks use closed loops (no open looping yet)
- All tasks have human approval before implementation
- All tasks go through 5 validation gates

---

### What I Rejected for Now

**Full open looping**:
- **Why not yet**: Too expensive, too risky, unclear quality criteria
- **Needs first**: Stronger evals, observability, budget controls
- **Reconsider when**: Product matures, budget allows

**Fully autonomous parallel agents**:
- **Why not yet**: Requires coordination infrastructure
- **Needs**: Better observability and tools

**Over-planning**:
- **Avoid**: Visual plans for trivial tasks
- **Use for**: Complex tasks where ambiguity is costly

**Decoration over substance**:
- **Avoid**: Complex styling, animation for its own sake
- **Focus**: Clarity and communication

---

### Next Experiments

Planned loop experiments:

1. **Research digest loop**
   - Automated source intake
   - Pattern extraction
   - Multi-perspective analysis
   - Summary generation

2. **Design parity loop**
   - Ensure all pages follow design system
   - Catch inconsistencies
   - Suggest fixes

3. **Visual plan review loop**
   - Agent reviews visual plan quality
   - Checks for ambiguity
   - Suggests improvements

4. **QA release loop**
   - Pre-deployment verification
   - E2E test generation
   - Browser behavior checking
   - Release decision

5. **Eval/guardrail loop**
   - Test AI features
   - Verify guardrails work
   - Measure quality
   - Improve prompts

---

## Technical Implementation (Phase 1 - Static)

**File**: `app/portfolio/build-process/visual-agentic-development/page.tsx`

**Data**: Static content, no database
**Styling**: Matches build-process page aesthetic
**Links**: To docs/, diagrams/, source cards

---

## Acceptance Criteria

### Functional Requirements
- [ ] Page loads at `/portfolio/build-process/visual-agentic-development`
- [ ] Shows all sections outlined above
- [ ] Embeds 6 Mermaid diagrams correctly
- [ ] Links to source cards work
- [ ] Links to docs files work
- [ ] Mobile-responsive
- [ ] Accessible (WCAG 2.1 AA)

### Content Requirements
- [ ] Clear explanation of visual agentic approach
- [ ] Shows at least 3 diagrams with explanations
- [ ] Shows "What I applied" with examples
- [ ] Shows "What I rejected" with reasoning
- [ ] Links to GitHub evidence

### Portfolio Requirements
- [ ] Impresses target AI PM employers
- [ ] Shows sophistication in agentic workflows
- [ ] Demonstrates planning-first mindset
- [ ] Shows learning and adaptation
- [ ] Credible and professional

### Quality Requirements
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] E2E tests pass
- [ ] Build succeeds
- [ ] Performance targets met (LCP < 2.5s)

---

## Risks and Mitigations

### Risk 1: Page is too long
**Mitigation**: Use clear sections, collapsible details if needed, link to docs for depth

### Risk 2: Diagrams don't render in browser
**Mitigation**: Use static images or Mermaid rendering, test before deploying

### Risk 3: Doesn't impress target employers
**Mitigation**: Focus on concrete examples, show real application, avoid hype

### Risk 4: Maintenance burden
**Mitigation**: Static content, simple structure, consistent with Phase 1

---

## Dependencies

### Must Exist First
- [x] Source card for agent looping
- [x] Source card for visual plans
- [x] Source card for data viz style guides
- [x] All 6 Mermaid diagrams created
- [x] Visual process system docs
- [x] Diagram library defined
- [x] Agent and skill definitions

### Can Be Created With Page
- [ ] Page structure
- [ ] Content layout
- [ ] Navigation links
- [ ] E2E tests

---

## Timeline Estimate

- **Content planning**: ✓ Done (this document)
- **Page implementation**: 3-4 hours
  - Page structure: 1 hour
  - Content writing: 1.5-2 hours
  - Diagram integration: 30 minutes
  - Links and styling: 30 minutes
- **Testing**: 30 minutes
- **Total**: 4-5 hours

---

## Next Steps (Require Approval)

1. ✅ **Approve this plan** - Confirm content structure
2. **Approve P0 scope** - Confirm MVP features sufficient
3. **Create implementation task** - Break down into subtasks
4. **Implement P0** - Build page
5. **Test and launch** - Verify acceptance criteria
6. **Evaluate** - Does it improve portfolio credibility?

---

## Alternative Approaches Considered

### Alternative 1: Separate top-level route `/visual-agentic-development`
**Rejected**: Better as subsection of build-process, shows integration with overall process

### Alternative 2: Add to main build-process page
**Rejected**: Content is too long, deserves dedicated space

### Alternative 3: Create interactive diagram explorer
**Rejected**: Phase 1 scope, static content is sufficient

### Alternative 4: Use images instead of Mermaid
**Rejected**: Mermaid is version-controlled and editable; images are static snapshots

---

**Status**: PLANNED - Awaiting approval to implement

**Last Updated**: 2026-06-09

**Related**:
- Source Card: Agent Looping (docs/research/source-cards/2026-06-agent-looping.md)
- Source Card: Visual Plans (docs/research/source-cards/2026-06-visual-plans-agentic-engineering.md)
- Diagram Library: (docs/visual-process/DIAGRAM_LIBRARY.md)
- Visual Process System: (docs/visual-process/VISUAL_PROCESS_SYSTEM.md)
