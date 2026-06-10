# Visual Plan Builder Skill

## Purpose

Create visual implementation plans before UI code is written.

## When to Use

Trigger this skill when:
- Starting any UI/UX implementation work
- Planning landing page changes
- Planning component redesigns
- Planning feature page implementations

## What This Skill Does

1. **Analyze the target screenshot** for layout structure
2. **Create a section map** of all visual areas
3. **Create a layout map** showing structure and flow
4. **Create a component map** identifying components
5. **Extract exact copy** (no placeholders)
6. **Identify design tokens** (colors, spacing, typography)
7. **Define acceptance criteria** for the visual work
8. **Identify risks** and rollback plan

## Input Requirements

Provide:
- **Target screenshot path** — Source of truth
- **Current state** (optional) — Screenshot or description
- **Task scope** — What area is being changed
- **Route context** — Which page/route is affected

## Process

1. **Load and analyze screenshot**
   - Identify layout structure
   - Map sections and components
   - Extract copy text
   - Identify design tokens

2. **Create visual plan**
   - Section map with dimensions
   - Layout map (ASCII or description)
   - Component map with hierarchy
   - Exact copy specification
   - Design token values

3. **Define acceptance criteria**
   - Visual blockers (must-have elements)
   - Functional blockers (must-work features)
   - Success criteria (measurable goals)

4. **Identify risks and boundaries**
   - Visual risks (what could go wrong)
   - Technical risks (implementation concerns)
   - Out-of-scope items (what's NOT changing)
   - Rollback plan (if it fails)

5. **Output plan for human review**
   - Present complete visual plan
   - Highlight areas needing clarification
   - Request human approval before implementation

## Output Format

```markdown
# Visual Implementation Plan: [Page/Feature Name]

## Goal
[Clear statement of what this plan achieves]

## Source of Truth
**Target Screenshot:** `reference/screenshots/[path]`
**Current Screenshot:** `[path if available]`
**Route:** `/[route-path]`

## Section Map
- **[Section 1]**: [dimensions, purpose, content]
- **[Section 2]**: [dimensions, purpose, content]
- **[Section 3]**: [dimensions, purpose, content]

## Layout Map
```
[ASCII diagram showing layout structure]
```

## Component Map
- **[Component 1]**
  - Purpose: [what it does]
  - Props: [key props]
  - Children: [child components]

## Exact Copy
- H1: "[exact heading text]"
- Subtitle: "[exact subtitle text]"
- CTA 1: "[exact text]" → [destination]
- CTA 2: "[exact text]" → [destination]
- Labels: [exact label text]

## Design Tokens
- Background: `#color-value`
- Text: `#color-value`
- CTA: `#color-value`
- Border: `#color-value`
- H1: `[size] [weight] [line-height]`
- Body: `[size] [weight] [line-height]`
- Padding: `[value]`
- Gap: `[value]`

## Acceptance Criteria
**Visual Blockers:**
- [ ] [Must-have visual element 1]
- [ ] [Must-have visual element 2]

**Functional Blockers:**
- [ ] [Must-work feature 1]
- [ ] [Must-work feature 2]

**Success Criteria:**
1. [Measurable criterion 1]
2. [Measurable criterion 2]

## Out of Scope
- [Element not changing 1]
- [Element not changing 2]

## Risk List
1. **Visual Risk:** [what could go wrong visually]
2. **Technical Risk:** [implementation concerns]
3. **Scope Risk:** [could scope expand?]

## Rollback Plan
If implementation fails:
1. [Rollback step 1]
2. [Rollback step 2]

---

**Ready for Implementation:** YES / NEEDS REVISION
**Human Approval Required:** YES
```

## Quality Checklist

The visual plan is complete when:
- [ ] Target screenshot identified and loaded
- [ ] Section map created with dimensions
- [ ] Layout map shows structure clearly
- [ ] Component map identifies all components
- [ ] Copy is exact (no "Lorem ipsum")
- [ ] Design tokens have actual values
- [ ] Acceptance criteria are specific
- [ ] Out-of-scope items listed
- [ ] Risks identified
- [ ] Rollback plan defined

## Success Criteria

A successful visual plan:
- Is specific enough to implement without clarification
- Shows the exact layout structure
- Specifies exact copy (no placeholders)
- Provides actual design token values
- Defines clear acceptance criteria
- Identifies risks and rollback plan

## Notes

- This skill produces plans, not code
- Human must review and approve the plan before implementation
- Builder agent should work only from approved plan
- Plan prevents scope creep and vague design tasks

## Related Documentation

- **Visual Plan Architect Agent:** `.claude/agents/visual-plan-architect.md`
- **Visual Plan Template:** `docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md`
- **Visual Agentic Delivery System:** `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md`
