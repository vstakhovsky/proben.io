# Visual Plan Builder Skill

## Purpose

Convert a product or engineering task into a visual plan before implementation—making requirements, trade-offs, and validation gates visible and reviewable.

## When to Use

Before implementing any non-trivial change:
- New feature or page
- Route changes
- Architecture decisions
- Security-sensitive changes
- Portfolio documentation

## Behavior

### Plan Creation

1. **Define the goal**
   - One-sentence purpose
   - Specific outcome

2. **Create task map**
   - Starting state
   - Required changes
   - Ending state
   - Dependencies

3. **List requirements**
   - Bulleted, specific
   - Testable

4. **Identify constraints**
   - What NOT to do
   - Boundaries

5. **Document trade-offs**
   - Options considered
   - Why this approach
   - What was rejected

6. **Identify risks**
   - What could go wrong
   - Mitigations

7. **Define validation gates**
   - Typecheck, tests, build, E2E, browser
   - Acceptance criteria

### Visual Format

Use appropriate format:
- Flowchart for sequential changes
- Table for trade-offs/comparisons
- Diagram for system structure

## Inputs

- Task description
- Requirements from source card or human
- Context (what's changing, why)

## Outputs

- Visual plan (markdown + diagrams)
- Task map
- Requirements list
- Constraints list
- Trade-offs table
- Risk assessment
- Validation gates

## Example

**Input**: "Update readiness check routes to use /app/readiness-check as canonical"

**Output**:
```markdown
# Visual Plan: Readiness Check Route Update

## Goal
Update all readiness check CTAs and navigation to use canonical route /app/readiness-check

## Task Map
[Flowchart showing: CTAs → Navigation → Verification]

## Requirements
- Landing page hero CTA → /app/readiness-check
- Navigation → /app/readiness-check
- Compatibility route /readiness-check must work

## Constraints
- DO NOT add new features
- DO NOT change readiness check functionality

## Trade-offs
| Option | Decision | Reason |
|--------|----------|--------|
| Redirect only | ✗ | Loses /readiness-check URLs |
| Both routes render | ✓ | URLs work, canonical clear |

## Validation
- [ ] Type check
- [ ] 21 unit tests pass
- [ ] Build succeeds
- [ ] 8 E2E tests pass
- [ ] Browser verification
```

## Related Skills

- **Source to Visual**: Provides initial visualization ideas
- **Mermaid Diagram Generator**: Creates diagrams for plans
- **Portfolio Process Page**: Documents plans in portfolio
