# Source Card: More Context Can Make Agents Worse

## Source

**URL**: https://www.youtube.com/watch?v=EcqMYoIV57A

**Type**: Conference talk (YouTube - AI Engineer channel)

**Speaker / Author**: Nupur Sharma, AI Engineer at Qodo

**Date Reviewed**: 2026-06-09

**Confidence Level**: High (official talk with comprehensive description available)

**Related Tags**: agents, context engineering, orchestration, testing, evals, AI workflow

---

## Core Insight

**Summary**: Giving an agent your full codebase causes it to attend to the start and end, then quietly drop the middle. Nupur calls this the "U curve" and builds the talk around why growing the context window did not fix the problem, and what actually does.

**Key Points**:

1. **The U Curve Problem**: Models attend strongly to information at the beginning and end of context, but lose attention to information in the middle
2. **Context Window Expansion Didn't Help**: Simply increasing context length didn't solve agent performance issues
3. **Lost in the Middle**: As context grows, models increasingly miss or discount information in the middle portions
4. **Context Pollution**: Self-generated and iterative context can degrade performance over time
5. **Solutions Matter More Than Size**: Strategic context optimization (iterative retrieval, hierarchical summarization, self-correction) outperforms maximal context
6. **80/20 Architecture**: Use high-reasoning models for open-ended discovery (20%) and lighter deterministic models for validation (80%)
7. **Feedback Loops**: Qodo's code review architecture uses PR acceptance/rejection history to weight future suggestions

---

## Why This Matters

This insight is critical for AI-assisted product development because:

1. **Explains Real Failures**: The route mismatch incident (/readiness-check vs /app/readiness-check) directly demonstrates the "lost in the middle" problem—agent had full repo context but missed the canonical route requirement in the middle of that context

2. **Validates Skepticism**: Challenges the industry assumption that "more context = better agents" and supports evidence-based context engineering

3. **Supports Process Changes**: Justifies why we need:
   - Task-specific context packs instead of full repo dumps
   - Implementation critics before code changes
   - Request intake and approval workflows
   - QA validation against specs

4. **Portfolio Credibility**: Applying these insights demonstrates sophisticated understanding of AI agent limitations and how to work around them—key signal for AI PM roles

---

## Application to Proben.io

### How This Applies

**Current Anti-Patterns to Avoid**:
- Full codebase context dumps in agent prompts
- "Read the whole repo and fix X" instructions
- Assuming agent will find all relevant requirements
- Long specification documents in single context

**New Patterns to Adopt**:

1. **Task-Specific Context Packs**
   - Create focused context for each task type (route fix, test update, feature add)
   - Include only: relevant files, specific requirements, acceptance criteria
   - Keep under 50-100 lines of core content

2. **Request Intake Before Implementation**
   - Agent produces: request interpretation, risks, trade-offs, options, recommendation
   - Human reviews and approves before code changes
   - Prevents "lost in the middle" of implementation

3. **Implementation Critic**
   - Separate agent role reviews implementation plan against spec
   - Checks for: scope creep, missing requirements, route consistency, test stability
   - Can reject implementation plan before code is written

4. **QA Validation**
   - After implementation, separate validation step
   - Checks: Did agent follow spec? Are tests stable? Is documentation updated?
   - Prevents silent failures

5. **Short, Explicit Specs**
   - Keep specs under 200 lines
   - Use explicit test IDs and acceptance criteria
   - Avoid burying requirements in long prose

6. **Tests as Truth**
   - Use BDD, E2E, and unit tests as validation
   - Agents verify against tests, not against memory of context
   - Tests catch "lost in the middle" requirements

### Specific Area Impact

**Affected Areas**:
- ✅ **agent workflow**: Request intake → planning → approval → implementation → validation
- ✅ **testing**: Stable test IDs, explicit selectors, BDD scenarios
- ✅ **documentation**: Short specs, clear acceptance criteria, decision records
- ✅ **portfolio**: Research log shows applied learning
- ⚠️ **landing**: Indirect (better implementation quality)
- ⚠️ **app**: Indirect (better implementation quality)
- ⚠️ **lab**: Not applicable yet
- ⚠️ **admin**: Not applicable yet
- ⚠️ **evals**: Future opportunity

---

## Proposed Changes

### P0 (Critical - Implement Now)

**Task-Specific Context Packs**
```
File: docs/context/TASK_CONTEXT_TEMPLATE.md
Purpose: Template for creating focused context per task
Content:
- Task type (route fix, test update, feature add, documentation)
- Relevant files (specific paths, not "read all")
- Requirements (bulleted, explicit)
- Acceptance criteria (testable)
- Constraints (what NOT to do)
- Related decisions (ADR links)
```

**Context Intake Template**
```
File: docs/context/CONTEXT_STRATEGY.md
Purpose: Guidelines for what to include in agent context
Content:
- Context pack types and when to use each
- Maximum length guidelines
- What to exclude (full repos, adjacent features)
- How to validate context completeness
```

**Implementation Critic Agent**
```
File: .claude/agents/implementation-critic.md
Purpose: Agent role that reviews implementation plans
Behavior:
- Given implementation plan, check for:
  - Scope creep (features outside spec)
  - Missing requirements
  - Route inconsistency
  - Test selector instability
- Can REJECT plan with specific feedback
- Runs before implementation code is written
```

**QA Validation Checks**
```
File: .claude/agents/qa-release-engineer.md (update)
Purpose: Validate implementation matched spec
Behavior:
- After implementation, verify:
  - All acceptance criteria met
  - Tests use stable selectors
  - No extra features added
  - Documentation updated
- Can REQUEST CHANGES if validation fails
```

### P1 (Important - Implement Soon)

**Research Log Portfolio Page**
```
Route: /portfolio/research-log
Purpose: Public display of research-driven development
Content:
- Sources reviewed (with cards)
- Key insights extracted
- How each insight was applied
- Implementation status
- Evaluation results
- Decision log
Acceptance Criteria:
- Shows at least 1 source with full application story
- Links to source cards
- Shows "Learned/Applied/Rejected" for each insight
```

**Source Cards in GitHub**
```
Location: docs/research/source-cards/
Purpose: Permanent record of each source analyzed
Content: See template in this file
Process:
- Each source gets dated markdown file
- Added to SOURCES.md index
- Cross-referenced in decisions and application log
```

**Portfolio Credibility Section**
```
File: app/portfolio/build-process/page.tsx (update)
Add section:
- "Research-Driven Development"
- Link to /portfolio/research-log
- Show recent insights and applications
- Demonstrate sophistication in AI workflow
```

### P2 (Future - Consider Later)

**Automated Daily Research Digest**
- RSS feed monitoring of approved sources
- Automatic source card generation
- Draft application suggestions
- Requires: feed reader, content extraction, ranking

**MCP Integrations**
- Model Context Protocol for external tool use
- Research database access
- Source card search and retrieval
- Requires: MCP server development

**Source Ranking and Tagging**
- Automated relevance scoring
- Tag clustering and trends
- Application success tracking
- Requires: analytics, ML models

---

## Evaluation Plan

### Success Metrics

**Quantitative**:
- Fewer route mismatches (target: 0 per quarter)
- Higher ratio of stable test selectors (getByTestId vs text-based, target: >90%)
- Fewer unnecessary files created (files created vs files needed, target: <1.2)
- Fewer agent corrections before approval (target: <2 per task)
- Higher spec compliance (features implemented vs spec-defined, target: >95%)

**Qualitative**:
- Clearer documentation after each change
- More consistent implementation with approved plans
- Better traceability from requirement to implementation
- Portfolio demonstrates research sophistication

### Validation Methods

1. **Agent Workflow Audit**
   - Track number of times implementation critic rejects plans
   - Track number of times QA requests changes
   - Measure reduction in rework

2. **Test Selector Audit**
   - Scan test files for getByTestId vs text-based selectors
   - Track improvement over time

3. **Feature Creep Audit**
   - Compare implemented features vs spec
   - Track unauthorized additions

4. **Route Consistency Audit**
   - Verify all links use canonical routes
   - Track mismatches

5. **Documentation Completeness Audit**
   - Check for ADRs for architectural changes
   - Check for source cards for research applied
   - Check for application log entries

### Evaluation Timeline

- **Week 1**: Implement P0 changes, establish baseline metrics
- **Week 2-4**: Track metrics on 5-10 development tasks
- **Month 2**: Review and adjust approach based on data
- **Quarter 1**: Full evaluation, decide on P1 features

---

## Decision

**RECOMMENDATION: ADOPT with P0 priority**

**Confidence**: High

**Rationale**:

1. **Evidence-Based**: The "U curve" problem is well-documented and directly explains observed failures in our development process

2. **Actionable**: Clear, specific interventions (context packs, implementation critic, QA validation) map directly to the problem

3. **Low Risk**: Changes are process-only, no product code changes required. Can be adopted incrementally.

4. **High Value**: Prevents rework, improves implementation quality, strengthens portfolio credibility

5. **Relevant**: Directly applicable to AI-assisted development workflow and target role (AI PM)

**Next Steps** (Require Approval):

1. Review and approve this source card
2. Approve P0 changes (context packs templates, agent definitions)
3. Approve P1 research log page plan
4. Implement P0 changes in next development cycle
5. Establish baseline metrics
6. Track and report results after 5-10 tasks

**Watch Items**:
- Agent behavior changes (will context packs slow down development?)
- Template effectiveness (are templates actually helpful?)
- Evaluation burden (is tracking metrics worth the overhead?)

---

## Related Sources

*(To be populated as more sources are reviewed)*

---

## Notes

- Transcript not available; working from detailed description and search results
- Talk duration: ~26 minutes
- Speaker: Nupur Sharma, AI Engineer at Qodo
- Platform: AI Engineer YouTube channel
- Related to: context engineering, agent orchestration, evals, testing

*Uncertain Assumptions*:
- Exact specifics of "iterative retrieval" and "hierarchical summarization" techniques (need to watch full talk for details)
- Cost tradeoffs mentioned in description (specific numbers unclear)
