# Context Pack Builder Skill

## Purpose

Build task-specific context packs for AI agents working on Proben.io, avoiding the "lost in the middle" problem.

## When to Use

When starting a new task:
- Route fix
- Test update
- Feature add
- Documentation update
- Build/deploy fix
- Any other implementation task

## Behavior

### Context Pack Creation

1. **Analyze Task Type**
   - Determine which template to use
   - Route fix, test update, feature add, documentation, build/deploy

2. **Select Relevant Information**
   - Which SPECIFIC files are needed? (not "read all")
   - Which documentation sections matter?
   - Which decisions/ADRs relate?
   - Which tests are relevant?

3. **Filter Aggressively**
   - Exclude full repository listings
   - Exclude adjacent features
   - Exclude future phase features
   - Exclude generic documentation
   - Exclude unrelated test files
   - Exclude build output/logs

4. **Structure Clearly**
   - Task description (one sentence)
   - Requirements (bulleted, explicit)
   - Constraints (what NOT to do)
   - Acceptance criteria (testable)
   - Relevant files (specific paths only)
   - Related documentation (section references)
   - Related decisions (links only)

5. **Validate Length**
   - Keep under 150 lines total
   - Route/test tasks: under 100 lines
   - Build/deploy tasks: under 50 lines

### Context Pack Types

Use appropriate template from `docs/context/CONTEXT_PACKS.md`:

1. **Route Fix Pack**
   - Current route files (specific)
   - Canonical route documentation
   - Navigation component
   - Test file path
   - Acceptance criteria

2. **Test Update Pack**
   - Test file being updated
   - Component/page being tested
   - Stable test ID guidelines
   - Testing best practices
   - Acceptance criteria

3. **Feature Add Pack**
   - Feature specification (ADR/BDD)
   - Related existing components
   - Routing structure reference
   - Phase constraints
   - Dependencies list
   - Acceptance criteria

4. **Documentation Pack**
   - Current documentation file
   - Related decisions (if ADR)
   - Source material reference
   - Documentation standards
   - Links/references

5. **Build/Deploy Pack**
   - Build error messages
   - Next.js config
   - Package.json (scripts/deps only)
   - Vercel config (if applicable)
   - Build documentation reference

## Quality Standards

- **Specificity**: Exact file paths, not "read the repo"
- **Brevity**: Under 150 lines, preferably under 100
- **Clarity**: Bulleted requirements, testable acceptance criteria
- **Constraints**: Explicit "DO NOT" items
- **Traceability**: Links to docs/ADRs, not full content

## Inputs

- Task description
- Task type (if not obvious)
- Current repository state (for file references)

## Outputs

- Task-specific context pack (markdown)

## Example

**Input**: "Fix route mismatch for readiness check"

**Output**:
```markdown
# Task Context: Readiness Check Route Fix

## Task Type
Route Fix

## Task Description
Update all links and CTAs to use canonical route /app/readiness-check

## Requirements
- Landing page hero CTA → /app/readiness-check
- Landing page bottom CTA → /app/readiness-check
- Navigation "Readiness Check" → /app/readiness-check
- Compatibility route /readiness-check must also work

## Constraints
- DO NOT add new features
- DO NOT change readiness check functionality
- DO NOT modify /sample-report route

## Acceptance Criteria
- [ ] All CTAs point to /app/readiness-check
- [ ] /app/readiness-check renders correctly
- [ ] /readiness-check also renders (compatibility)
- [ ] E2E tests pass with stable selectors

## Relevant Files
app/page.tsx
app/app/readiness-check/page.tsx
app/readiness-check/page.tsx
components/navigation.tsx
e2e/core-flow.spec.ts

## Related Documentation
- docs/RFC-0001-architecture.md (lines 169-175: Public Routes)
- docs/BUILD_PROCESS.md (lines 163-168: E2E testing)

## Related Decisions
- [Source Card] More context makes agents dumber - explains why we use focused context
```

## Related

- **Context Architect Agent**: Uses this skill to build context packs
- **Research Analyst Agent**: Provides insights about context optimization
- **Implementation Critic Agent**: Validates implementation against context constraints
