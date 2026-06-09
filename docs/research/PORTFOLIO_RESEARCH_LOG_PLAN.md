# Portfolio Research Log Page - Plan

## Purpose

Create a public portfolio page at `/portfolio/research-log` that demonstrates research-driven AI product development. This shows that Proben.io is built through a disciplined loop of research → insight → application → evaluation → decision.

**Portfolio Value**: Demonstrates sophisticated understanding of AI agent workflows, context engineering, and modern AI PM practices.

## Page Content Structure

### Hero Section
- Title: "Research-Driven Development"
- Subtitle: "How Proben.io applies AI research to build better products"
- Brief explanation of the research loop

### Sources Reviewed Section
- List of sources with cards
- Each card shows:
  - Source title and link
  - Type (talk, article, paper)
  - Date reviewed
  - Core insight (2-3 bullets)
  - Tags (agents, context, evals, etc.)

### Insights & Applications Section
- For each source that was adopted:
  - What was learned
  - How it was applied to Proben.io
  - Implementation status (P0/P1/P2)
  - Evaluation results (if available)

### Decision Log Section
- Table showing:
  - Source
  - Decision (Adopt/Test/Reject/Watch)
  - Reasoning
  - Date
  - Status (implemented/testing/watching)

### About the Process Section
- Explanation of the research loop
- Links to documentation:
  - docs/research/SOURCES.md
  - docs/research/RESEARCH_DIGEST.md
  - docs/context/CONTEXT_STRATEGY.md

## Technical Implementation Plan

### File Structure
```
app/portfolio/research-log/page.tsx
components/research/
  - SourceCard.tsx
  - InsightSummary.tsx
  - DecisionTable.tsx
data/research/
  - sources.ts (export from docs/research/source-cards/)
  - decisions.ts (export from docs/research/RESEARCH_DECISIONS.md)
```

### Data Approach (Phase 1)
- Static data exported from markdown files
- TypeScript constants for sources and decisions
- No database (consistent with Phase 1)

### Components Needed
1. **SourceCard** - Display individual source card
2. **InsightSummary** - Show insight and application
3. **DecisionTable** - Table of all decisions
4. **ResearchTimeline** - Visual timeline of research activity

### Styling
- Use existing Tailwind + design system
- Match build-process page aesthetic
- Editorial, professional tone

## Acceptance Criteria

### Functional Requirements
- [ ] Page loads at `/portfolio/research-log`
- [ ] Shows at least 1 source with full card
- [ ] Links to source cards in docs/
- [ ] Shows "Learned/Applied/Rejected" for each insight
- [ ] Decision table is sortable/filterable
- [ ] All links work (docs, external sources)
- [ ] Responsive design (mobile-friendly)
- [ ] Accessible (WCAG 2.1 AA)

### Content Requirements
- [ ] At least 1 source with complete application story
- [ ] Clear explanation of research loop
- [ ] Demonstrates sophistication in AI workflow
- [ ] Links to related documentation

### Quality Requirements
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] E2E tests pass
- [ ] Build succeeds
- [ ] Performance targets met (LCP < 2.5s)

### Portfolio Requirements
- [ ] Impresses target AI PM employers
- [ ] Shows thought leadership
- [ ] Demonstrates practical application
- [ ] Credible and professional

## Implementation Tasks

### P0 (MVP Launch)
- [ ] Create page structure
- [ ] Create SourceCard component
- [ ] Create InsightSummary component
- [ ] Export data from existing source cards
- [ ] Add navigation link
- [ ] Write E2E tests
- [ ] Update documentation

### P1 (Enhancement)
- [ ] Add DecisionTable component
- [ ] Add filtering by tag
- [ ] Add filtering by decision type
- [ ] Add ResearchTimeline visualization
- [ ] Add "Related Sources" links

### P2 (Future)
- [ ] Add source submission form (demo only)
- [ ] Add RSS feed for new research
- [ ] Add search functionality
- [ ] Add automated updates from docs/

## Risks and Mitigations

### Risk 1: Page looks empty with only 1-2 sources
**Mitigation**: Design for 1-2 sources initially, scale layout as more sources added. Use explanatory content to fill space meaningfully.

### Risk 2: Data sync between docs and page
**Mitigation**: Use build-time export from markdown to TypeScript. Document process for adding new sources.

### Risk 3: Page doesn't impress target employers
**Mitigation**: Focus on clear explanation of WHY this matters. Show sophistication in process, not just sources. Link to working examples.

### Risk 4: Maintenance burden
**Mitigation**: Keep simple. Export from markdown. No CMS. No database. Consistent with Phase 1 approach.

## Dependencies

### Must Exist First
- [ ] At least 1 complete source card in docs/research/source-cards/
- [ ] At least 1 decision record in docs/research/RESEARCH_DECISIONS.md
- [ ] Research digest in docs/research/RESEARCH_DIGEST.md
- [ ] Context strategy documented in docs/context/

### Can Be Created With Page
- [ ] Component structure
- [ ] Data export utilities
- [ ] E2E tests

## Timeline Estimate

- **P0 MVP**: 4-6 hours
  - Page structure: 1 hour
  - Components: 2-3 hours
  - Data export: 1 hour
  - Tests: 1 hour
  - Documentation: 30 minutes

- **P1 Enhancement**: 3-4 hours
  - Decision table: 1-2 hours
  - Filtering: 1 hour
  - Timeline: 1 hour

## Next Steps (Require Approval)

1. **Approve this plan** - Confirm page structure and approach
2. **Approve P0 scope** - Confirm MVP features are sufficient
3. **Create implementation task** - Break down into subtasks
4. **Implement P0** - Build MVP
5. **Test and launch** - Verify acceptance criteria
6. **Evaluate** - Decide on P1 features

## Alternative Approaches Considered

### Alternative 1: Use GitHub README as source
**Rejected**: Would require GitHub API integration, breaks Phase 1 static approach

### Alternative 2: Build separate research blog
**Rejected**: Duplicates effort, harder to maintain, separates research from product

### Alternative 3: Add to build-process page
**Rejected**: Build process page is already long, research deserves dedicated space

### Alternative 4: Use MDX for source cards
**Rejected**: Adds complexity, markdown export is simpler for Phase 1

---

**Status**: PLANNED - Awaiting approval to implement

**Last Updated**: 2026-06-09

**Related**:
- Source Card: 2026-06-09-more-context-makes-agents-dumber.md
- Decision: ADOPT context optimization approach
