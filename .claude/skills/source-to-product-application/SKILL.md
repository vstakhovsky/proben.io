# Source-to-Product Application Skill

## Purpose

Convert research insights into concrete product/process changes for Proben.io with clear acceptance criteria and evaluation metrics.

## When to Use

When research has been ADOPTED or TEST decision:
- New insight from Research Analyst
- Decision to adopt research-based approach
- Need to translate insight into action

## Behavior

### Application Planning

1. **Extract Actionable Insight**
   - What specific change does this research recommend?
   - What problem does it solve?
   - What's the expected benefit?

2. **Define Scope of Application**
   - Which part of Proben.io does this affect?
   - Is this product code, process, or documentation?
   - Is this P0 (now), P1 (soon), or P2 (later)?

3. **Propose Concrete Changes**
   - What specific files will be created/updated?
   - What new behaviors will agents follow?
   - What new templates or processes are needed?

4. **Define Acceptance Criteria**
   - How do we know the change was applied correctly?
   - What tests/evals verify success?
   - What user/developer feedback confirms value?

5. **Define Evaluation Metrics**
   - What will we measure?
   - What's the baseline?
   - What's the target improvement?
   - What's the timeline for evaluation?

### Output Creation

Create/update:

1. **Application Log** (`docs/research/APPLICATION_LOG.md`)
2. **Implementation Tasks** (specific, actionable items)
3. **Evaluation Plan** (metrics and timeline)

## Quality Standards

- **Specificity**: Exact file names, not "update docs"
- **Measurability**: Quantifiable metrics where possible
- **Testability**: Clear acceptance criteria
- **Traceability**: Link back to source card and research digest
- **Priority**: Clear P0/P1/P2 classification

## Inputs

- Source card with adopted insight
- Decision record (adopt/test)
- Current Proben.io state

## Outputs

- Application log entry
- Implementation task list
- Evaluation plan
- Updated documentation (if applicable)

## Example

**Input**: Source card about "more context makes agents dumber" with ADOPT decision

**Output**:
```markdown
## Application: Context Optimization for AI-Assisted Development

**Source**: Why More Context Makes Your Agent Dumber (2026-06-09)
**Decision**: Adopt
**Date Applied**: [Date]

### Changes Applied

#### P0 Changes
- [ ] Create task-specific context pack templates
- [ ] Add implementation critic agent role
- [ ] Add request intake before implementation
- [ ] Add QA validation after implementation

#### P1 Changes
- [ ] Add research log page to portfolio
- [ ] Create source cards for all reviewed research
- [ ] Add "Learned/Applied/Rejected" tracking

### Acceptance Criteria
- [ ] All new tasks use context packs (not full repo dumps)
- [ ] Implementation critic reviews plans before code
- [ ] QA validates implementation after code
- [ ] Research log page shows at least 1 source application

### Evaluation Metrics
- % of tasks using context packs (target: 100%)
- Average context pack length (target: <100 lines)
- % of plans rejected by critic (target: 10-20%)
- % of implementations failing QA (target: <5%)

### Timeline
- Week 1: Implement P0 changes
- Week 2-4: Track metrics on 5-10 tasks
- Month 2: Review and adjust approach
```

## Related

- **AI Product Strategist Agent**: Evaluates strategic impact of application
- **Context Architect Agent**: Applies insights to context pack design
- **Research Analyst Agent**: Provides source cards and insights
