# Task Context Template

Use this template to create focused context for AI agents working on Proben.io tasks.

## Instructions

1. Copy this template
2. Fill in task-specific details
3. Keep only relevant sections
4. Remove unused sections
5. Keep total length under 150 lines

---

# Task Context: [Task Name]

## Task Type

Select one:
- [ ] Route Fix
- [ ] Test Update
- [ ] Feature Add
- [ ] Documentation
- [ ] Build/Deploy
- [ ] Other (specify): ___________

## Task Description

[One sentence description of what needs to be done]

## Requirements

[Bulleted list of specific requirements]

- Requirement 1
- Requirement 2
- Requirement 3

## Constraints

[What NOT to do - boundaries and limitations]

- DO NOT add features outside current phase
- DO NOT change unrelated files
- DO NOT modify [specific thing to avoid]
- DO NOT add new dependencies without approval

## Acceptance Criteria

[Testable criteria for success]

- [ ] Criterion 1 (measurable)
- [ ] Criterion 2 (measurable)
- [ ] Criterion 3 (measurable)

## Relevant Files

[Specific file paths - NOT "read the whole repo"]

```
app/page.tsx                    # Landing page
app/app/readiness-check/page.tsx  # Canonical route
components/navigation.tsx       # Navigation
e2e/core-flow.spec.ts           # E2E tests
docs/RFC-0001-architecture.md   # Route architecture
```

## Related Documentation

[Specific docs with section references]

- docs/RFC-0001-architecture.md (lines 169-175: Public Routes)
- docs/BUILD_PROCESS.md (lines 163-168: E2E testing)
- CLAUDE.md (Phase 1 constraints)

## Related Decisions

[ADRs or source cards that inform this task]

- [ADR-XXX] Title - brief relevance
- [Source Card] Title - brief relevance

## Current State

[Relevant current implementation - ONLY what's changing]

```typescript
// Current route (incorrect):
<Link href="/readiness-check">

// Should be (canonical):
<Link href="/app/readiness-check">
```

## Testing Considerations

[What tests to run/consider]

- Run: npm run type-check
- Run: npm run test
- Run: npx playwright test e2e/core-flow.spec.ts
- Verify: [specific behavior]

## Dependencies

[What this task depends on]

- [ ] Dependency 1 (must be done first)
- [ ] Dependency 2 (blocks this task)

## Risks

[What could go wrong]

- Risk: [description]
- Mitigation: [how to handle]

## Notes

[Any additional context not covered above]

[Keep brief - under 10 lines]

---

## Validation Checklist

After implementation, verify:

- [ ] All acceptance criteria met
- [ ] Tests pass (type-check, test, e2e)
- [ ] Build succeeds
- [ ] No extra features added
- [ ] Documentation updated (if applicable)
- [ ] Related tests updated (if applicable)

---

**Total Context Length: [ ] / 150 lines**
