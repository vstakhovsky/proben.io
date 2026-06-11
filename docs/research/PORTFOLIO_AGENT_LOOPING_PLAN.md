# Portfolio Page Plan: Agent Looping at Proben.io

## Purpose

Create a public portfolio page that demonstrates how Proben.io uses agent looping as a systematic, AI-native development process.

**Route**: `/portfolio/build-process/agent-looping` (subsection of build process)

**Portfolio Value**: Shows sophisticated understanding of agentic workflows, moving beyond manual prompting to structured loops.

---

## Page Content Structure

### Why I Changed the Process

**Problem**: One-off prompts are fragile for complex product work
- Manual prompting doesn't scale
- Each task requires custom prompts
- Hard to maintain consistency
- No clear verification steps
- Process is invisible to stakeholders

**Solution**: Design loops that prompt your agents systematically
- Repeatable structure
- Verification at each step
- Clear termination criteria
- Traceable decisions
- Visible process

### The Pattern I Studied

**Single-Agent Loop**:
1. Discovery — find what the agent needs to know
2. Planning — break the work into clear steps
3. Execution — produce output
4. Verification — check against goal and standard
5. Iteration — fix gaps and loop again until goal is met

**Fleet Loop**:
- Orchestrator owns the goal
- Specialist agents own subproblems
- Every agent runs the same cycle
- Coordination through orchestrator

**Open vs Closed Looping**:
- **Open**: Wide exploration, expensive, risky
- **Closed**: Human defines path, cheaper, safer, repeatable

### My Verdict

**Adopt**: Closed looping first
- Safer, cheaper, repeatable
- Predictable cost and timeline
- Clear termination criteria
- Suitable for normal budget

**Reject for now**: Open looping
- Too expensive for normal budget
- Too risky without strong evals
- Requires better observability first
- Needs guardrails and budget controls

**Use Fleet Loop**: Only for complex tasks
- Architecture decisions
- New product areas
- Security-sensitive changes
- Portfolio documentation

**Use Single-Agent Loop**: For small tasks
- UI fixes, doc updates, tests
- Single-file changes
- Content updates

### How I Apply It

**The Proben.io Development Loop**:

1. **Source Intake** — User or research agent adds source
2. **Pattern Extraction** — Specialists analyze from their perspectives
3. **Human Decision Gate** — Adopt/Test/Reject/Watch
4. **Implementation Slice** — Small vertical slice, clear boundaries
5. **Verification** — type-check, test, build, E2E, browser
6. **Feedback** — What worked? What failed?
7. **Public Process Log** — Document learning publicly

**Agent Roles in the Loop**:
- **Orchestrator**: Owns goal, assigns specialists, enforces stops
- **Research Analyst**: Extracts insights, avoids hype
- **Product Manager**: Maps to user/portfolio value
- **Architect**: Prevents over-engineering
- **Security Reviewer**: Identifies risks
- **QA Release Engineer**: Defines verification
- **Documentation Engineer**: Creates public explanation
- **Implementation Critic**: Finds weak spots before code

**Every agent runs**:
1. Discovery
2. Planning
3. Execution proposal
4. Verification criteria
5. Iteration plan

**But**: No code until orchestrator and human approve the plan.

### Example: Applying Agent Looping to Proben.io

**Source**: Agent looping / loop engineering pattern

**Insight**: Agents should not be manually prompted step-by-step forever. Design loops that prompt agents systematically.

**Application**:
1. Created source card analyzing the pattern
2. Defined closed-loop structure for Proben.io
3. Created agent role definitions with loop behavior
4. Defined when to use single-agent vs fleet loops
5. Set verification gates and stop conditions

**Guardrail**: Human approval required before implementation

**Verification**:
- Type check: ✓ npm run type-check
- Tests: ✓ npm run test
- Build: ✓ npm run build
- E2E: ✓ npx playwright test e2e/core-flow.spec.ts
- Browser: ✓ Manual verification

**Decision**: Adopt as development process (NOT as fully autonomous open loop)

### What I Rejected

**Full Open Looping**:
- **Why not yet**: Too expensive, too broad, too risky
- **Needs first**: Stronger tests, evals, observability, budget controls
- **Reconsider when**: Product matures and budget allows

**Over-Engineering**:
- Loops for trivial tasks waste time
- Small changes don't need orchestration
- One-line fixes don't need discovery phase

### What I Will Test Next

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

---

## Technical Implementation (Phase 1 - Static)

Since Proben.io is Phase 1 (static demo), this will be:

**File**: `app/portfolio/build-process/agent-looping/page.tsx`

**Data**: Static content, no database
**Styling**: Matches build-process page aesthetic
**Links**: To docs/ files for deeper details

**Components** (if needed):
- Simple content layout
- No complex state
- No interactivity beyond links

---

## Acceptance Criteria

### Functional Requirements
- [ ] Page loads at `/portfolio/build-process/agent-looping`
- [ ] Shows all sections outlined above
- [ ] Links to source card work
- [ ] Links to AI_DEVELOPMENT_LOOP.md work
- [ ] Links to LOOP_POLICY.md work
- [ ] Mobile-responsive
- [ ] Accessible (WCAG 2.1 AA)

### Content Requirements
- [ ] Clear explanation of pattern
- [ ] Shows verdict and reasoning
- [ ] Demonstrates application to Proben.io
- [ ] Explains what was rejected
- [ ] Links to next experiments

### Portfolio Requirements
- [ ] Impresses target AI PM employers
- [ ] Shows sophistication in agentic workflows
- [ ] Demonstrates practical application
- [ ] Shows learning and iteration

---

## Risks and Mitigations

### Risk 1: Page looks too academic
**Mitigation**: Focus on practical application, use concrete examples, show real impact

### Risk 2: Content is too long
**Mitigation**: Use clear sections, collapsible details if needed, link to docs for depth

### Risk 3: Doesn't impress target employers
**Mitigation**: Show sophistication in application, not just theory. Link to working examples.

### Risk 4: Maintenance burden
**Mitigation**: Static content, simple structure, consistent with Phase 1 approach

---

## Dependencies

### Must Exist First
- [x] Source card for agent looping
- [x] AI_DEVELOPMENT_LOOP.md
- [x] LOOP_POLICY.md
- [x] Updated agent role definitions
- [x] Research decision recorded

### Can Be Created With Page
- [ ] Page structure
- [ ] Content layout
- [ ] Navigation links
- [ ] E2E tests

---

## Timeline Estimate

- **Content planning**: ✓ Done (this document)
- **Page implementation**: 2-3 hours
- - Page structure: 30 minutes
- - Content writing: 1-1.5 hours
- - Links and styling: 30 minutes
- **Testing**: 30 minutes
- **Total**: 3-4 hours

---

## Next Steps (Require Approval)

1. ✅ **Approve this plan** - Confirm content structure
2. **Approve implementation** - Create the page
3. **Add navigation link** - From build-process page
4. **Test and launch** - Verify acceptance criteria
5. **Evaluate** - Does it improve portfolio credibility?

---

## Alternative Approaches Considered

### Alternative 1: Separate top-level route `/agent-looping`
**Rejected**: Better as subsection of build-process, shows integration with overall process

### Alternative 2: Add to main build-process page
**Rejected**: Content is too long, deserves dedicated space

### Alternative 3: Create interactive loop visualizer
**Rejected**: Phase 1 scope, static content is sufficient

### Alternative 4: Wait until we have more examples
**Rejected**: One good example (this page) is better than waiting. Shows we're learning as we go.

---

**Status**: PLANNED - Awaiting approval to implement

**Last Updated**: 2026-06-09

**Related**:
- Source Card: docs/research/source-cards/2026-06-agent-looping.md
- Process: docs/AI_DEVELOPMENT_LOOP.md
- Policy: docs/LOOP_POLICY.md
- Decision: docs/research/RESEARCH_DECISIONS.md
