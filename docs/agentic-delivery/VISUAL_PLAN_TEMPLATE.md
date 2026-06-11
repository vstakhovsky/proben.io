# Visual Plan Template

## Purpose

This template defines the required structure for visual implementation plans. Use this template for all UI/UX work before implementation begins.

## Template Structure

```markdown
# Visual Implementation Plan: [Page/Component Name]

## Goal
[One clear sentence describing what this plan achieves]

## Source of Truth
**Target Screenshot:** `reference/screenshots/[path-to-screenshot]`
**Current Screenshot:** `[path if available, or "none"]`
**Route:** `/[route-path]`
**Component:** `[component name if applicable]`

## Section Map
[Define all visual sections with dimensions and purpose]

- **[Section Name]**
  - Dimensions: [width x height, or relative sizes]
  - Purpose: [what this section communicates]
  - Content: [what's in this section]

## Layout Map
[Visual diagram showing layout structure]

Use ASCII art or clear description:
```
┌─────────────────────────────────────────┐
│           [Navigation/Header]            │
├─────────────────────────────────────────┤
│                                          │
│              [Hero Section]              │
│  ┌────────────────┬────────────────────┐ │
│  │  [Left/Text]   │  [Right/Preview]   │ │
│  │                │                    │ │
│  └────────────────┴────────────────────┘ │
│                                          │
└─────────────────────────────────────────┘
```

## Component Map
[Define all components with hierarchy]

- **[ComponentName]**
  - Purpose: [what it does]
  - Props: [key props it receives]
  - Children: [child components]
  - Location: [where it's used]

## Exact Copy
[Specify all text content exactly as it should appear]

### Headings
- H1: "[exact heading text]"
- H2: "[exact heading text]"
- H3: "[exact heading text if applicable]"

### Body Text
- **[Section Name]:** "[exact body text]"
- **[Section Name]:** "[exact body text]"

### CTAs
- **Primary CTA:** "[exact text]" → [destination route]
- **Secondary CTA:** "[exact text]" → [destination route]

### Labels & Microcopy
- **[Label 1]:** "[exact label text]"
- **[Label 2]:** "[exact label text]"
- **[Note]:** "[exact note text]"

## Design Tokens
[Specify actual values, not descriptions]

### Colors
- **Background:** `#hex-value`
- **Primary text:** `#hex-value`
- **Secondary text:** `#hex-value`
- **Accent/CTA:** `#hex-value`
- **Border:** `#hex-value`
- **Hover state:** `#hex-value`

### Typography
- **H1:** `[size] [weight] [line-height]` (e.g., `48px semibold 1.2`)
- **H2:** `[size] [weight] [line-height]`
- **Body:** `[size] [weight] [line-height]`
- **Small/Labels:** `[size] [weight] [line-height]`

### Spacing
- **Section padding:** `[value]` (e.g., `80px 0`)
- **Container max-width:** `[value]` (e.g., `1200px`)
- **Gap between columns:** `[value]` (e.g., `32px`)
- **Card padding:** `[value]` (e.g., `24px`)

### Borders & Effects
- **Border radius:** `[value]` (e.g., `8px`)
- **Box shadow:** `[value]` (e.g., `0 2px 8px rgba(0,0,0,0.1)`)
- **Border width:** `[value]` (e.g., `1px`)

## Responsive Behavior
[Define layout for each breakpoint]

### Desktop (>1024px)
- [Layout description]
- [Column arrangement]
- [Spacing adjustments if any]

### Tablet (768-1024px)
- [Layout description]
- [Column arrangement]
- [Spacing adjustments if any]

### Mobile (<768px)
- [Layout description]
- [Single column stacking]
- [Spacing adjustments if any]

## Acceptance Criteria

### Visual Blockers
[Must-have visual elements, implementation blocked if missing]

- [ ] [Visual requirement 1 with specific detail]
- [ ] [Visual requirement 2 with specific detail]
- [ ] [Visual requirement 3 with specific detail]

### Functional Blockers
[Must-work features, implementation blocked if broken]

- [ ] [Functional requirement 1]
- [ ] [Functional requirement 2]

### Success Criteria
[Measurable criteria for successful implementation]

1. [Specific, measurable criterion 1]
2. [Specific, measurable criterion 2]
3. [Specific, measurable criterion 3]

## Out of Scope
[Explicitly list what is NOT changing in this task]

- **[Element/Feature]:** [why it's not changing]
- **[Element/Feature]:** [why it's not changing]

## Risk List
[Identify potential risks and mitigations]

### Visual Risks
1. **[Risk description]:** [mitigation strategy]

### Technical Risks
1. **[Risk description]:** [mitigation strategy]

### Scope Risks
1. **[Risk description]:** [mitigation strategy]

## Rollback Plan
[What to do if implementation fails]

If implementation fails or is rejected:
1. [Rollback step 1]
2. [Rollback step 2]
3. [What to restore]

## Approval Required
- [ ] Product Manager approval
- [ ] Design QA approval (if visual work)
- [ ] CTO Bar Raiser approval (if high risk)

---

**Plan Status:** READY FOR IMPLEMENTATION / REVISIONS REQUIRED
**Next Step:** Implement after human approval
**Plan Created:** [date]
**Plan Approved:** [date]
```

## Example: Landing Page Hero Section

```markdown
# Visual Implementation Plan: Landing Page Hero Redesign

## Goal
Update the landing page hero section to match Proben MVP 6 prototype with two-column layout and readiness preview card.

## Source of Truth
**Target Screenshot:** `reference/screenshots/proben-mvp-6/hero-target-light-1.png`
**Current Screenshot:** `screenshots/current-hero.png`
**Route:** `/`
**Component:** `app/page.tsx` (hero section)

## Section Map

- **Navigation/Header**
  - Full-width, white background
  - Logo left-aligned, navigation items right-aligned
  - Height: 64px

- **Hero Section**
  - Full-width, light background
  - Two-column layout
  - Max-width: 1200px container
  - Height: auto, min 600px

- **Left Column (Hero Text)**
  - Width: 50% of container
  - Contains: badge, H1, subtitle, CTAs, trust note

- **Right Column (Preview Card)**
  - Width: 50% of container
  - Contains: readiness report preview

## Layout Map

```
┌─────────────────────────────────────────┐
│  [Navigation: Logo | Nav Items | CTAs]   │
├─────────────────────────────────────────┤
│                                          │
│  [Hero Section - 1200px max container]  │
│  ┌──────────────────┬─────────────────┐ │
│  │  [Hero Text]     │  [Preview Card]  │ │
│  │  50% width       │  50% width      │ │
│  │                  │                 │ │
│  │  [Badge]         │  [Header]       │ │
│  │  [H1]            │  [Score]        │ │
│  │  [Subtitle]      │  [Checks]       │ │
│  │  [CTAs]          │  [Gaps]         │ │
│  │  [Trust Note]    │  [Top Fix]      │ │
│  │                  │  [Practice]     │ │
│  └──────────────────┴─────────────────┘ │
│                                          │
└─────────────────────────────────────────┘
```

## Component Map

- **HeroSection**
  - Purpose: Main landing page hero
  - Props: none
  - Children: HeroTextColumn, ReadinessPreviewCard
  - Location: app/page.tsx

- **HeroTextColumn**
  - Purpose: Left-side hero content
  - Props: badge, heading, subtitle, ctas, trustNote
  - Children: HeroBadge, HeroHeading, HeroCTAs, TrustNote
  - Location: HeroSection

- **ReadinessPreviewCard**
  - Purpose: Right-side product preview
  - Props: score, checks, gaps, topFix, practiceMoment
  - Children: PreviewHeader, PreviewScore, PreviewChecks, PreviewGaps, PreviewFix, PreviewPractice
  - Location: HeroSection

## Exact Copy

### Headings
- H1: "Know what to fix before the meeting starts."
- Subtitle: "Paste rough meeting context. Proben checks your goal, strategy, evidence, stakeholder risk, and decision ask — then shows what to fix before the room does."

### CTAs
- Primary CTA: "Run readiness check" → `/app/readiness-check`
- Secondary CTA: "See sample report" → `/sample-report`

### Labels & Microcopy
- Badge: "Context readiness before important meetings"
- Trust note: "No account required · Use rough notes · Not a personality score"
- Preview context: "Strategy review · roadmap pivot"
- Preview status: "Status: Analyzed"
- Preview gaps section: "Context gaps"
- Preview fix section: "Top fix"
- Preview practice section: "Practice moment"

## Design Tokens

### Colors
- **Background:** `#F9FAFB` (gray-50)
- **Primary text:** `#111827` (gray-900)
- **Secondary text:** `#6B7280` (gray-500)
- **Accent green:** `#22C55E` (green-500)
- **Border:** `#E5E7EB` (gray-200)
- **Card background:** `#FFFFFF` (white)
- **Hover state:** `#16A34A` (green-600)

### Typography
- **H1:** `48px semibold 1.2` (desktop), `32px semibold 1.2` (mobile)
- **Subtitle:** `18px normal 1.6` (desktop), `16px normal 1.5` (mobile)
- **Body:** `16px normal 1.5`
- **Small/Labels:** `14px normal 1.4`

### Spacing
- **Section padding:** `80px 24px` (desktop), `48px 16px` (mobile)
- **Container max-width:** `1200px`
- **Gap between columns:** `64px` (desktop), `0px` (mobile, stacks)
- **Card padding:** `32px`

### Borders & Effects
- **Border radius:** `8px` for cards, `full` for badge/CTAs
- **Box shadow:** `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- **Border width:** `1px`

## Responsive Behavior

### Desktop (>1024px)
- Two-column layout, 50/50 split
- 64px gap between columns
- Full navigation displayed

### Tablet (768-1024px)
- Two-column layout, 50/50 split
- 48px gap between columns
- Simplified navigation

### Mobile (<768px)
- Single column, stacks vertically
- Preview card below hero text
- 24px gap between stacked sections
- Hamburger navigation (not in scope for this task)

## Acceptance Criteria

### Visual Blockers
- [ ] H1 reads "Know what to fix before the meeting starts."
- [ ] Two-column layout with hero text left, preview card right
- [ ] Preview card shows readiness report with score, checks, gaps, fix, practice
- [ ] Primary CTA "Run readiness check" in green
- [ ] Secondary CTA "See sample report" in white with border
- [ ] Trust note with three bullet points
- [ ] Badge at top of hero text

### Functional Blockers
- [ ] Primary CTA links to `/app/readiness-check`
- [ ] Secondary CTA links to `/sample-report`
- [ ] No console errors on page load
- [ ] Responsive behavior works at all breakpoints

### Success Criteria
1. Visual parity score >= 4.5/5 compared to prototype
2. All CTAs function correctly
3. Layout matches prototype at all breakpoints
4. No placeholder text remains

## Out of Scope
- **Navigation structure:** Not changing navigation in this task
- **Hero badge design:** Using existing badge component
- **Preview card interactivity:** Static preview only, no live functionality
- **Below-hero sections:** Not changing features section or below
- **Mobile navigation:** Keeping existing mobile nav for now

## Risk List

### Visual Risks
1. **Layout mismatch:** Prototype spacing may be difficult to match exactly
   - Mitigation: Use reference measurements, adjust in 5% increments
2. **Preview card complexity:** Card has many elements that must align
   - Mitigation: Build card first, verify spacing, then add to hero

### Technical Risks
1. **Responsive breaking:** Two-column layout may break on smaller screens
   - Mitigation: Test at 768px, 1024px, 1200px breakpoints
2. **TypeScript errors:** New component structure may introduce type issues
   - Mitigation: Run type-check after each component

### Scope Risks
1. **Scope creep:** Temptation to improve navigation or other sections
   - Mitigation: Explicit out-of-scope list, refer to plan if suggested

## Rollback Plan
If implementation fails or is rejected:
1. Keep current hero section as-is
2. Revert `app/page.tsx` to previous version
3. Remove any new components created
4. Document what failed and why for retry

## Approval Required
- [ ] Product Manager approval
- [ ] Design QA approval
- [ ] CTO Bar Raiser approval (high visibility change)

---

**Plan Status:** READY FOR IMPLEMENTATION
**Next Step:** Implement after human approval
**Plan Created:** 2026-06-09
**Plan Approved:** [pending]
```

## Quality Checklist

Before submitting visual plan for human review:

- [ ] Target screenshot identified and accessible
- [ ] Section map complete with dimensions
- [ ] Layout map shows clear structure
- [ ] Component map identifies all components
- [ ] Copy is exact (no "Lorem ipsum" or placeholders)
- [ ] Design tokens have actual values (not "green" or "large")
- [ ] Responsive behavior defined for all breakpoints
- [ ] Visual blockers are specific and verifiable
- [ ] Functional blockers are testable
- [ ] Success criteria are measurable
- [ ] Out-of-scope items explicitly listed
- [ ] Risks identified with mitigations
- [ ] Rollback plan defined

## Related Documentation

- **Visual Plan Architect Agent:** `.claude/agents/visual-plan-architect.md`
- **Visual Plan Builder Skill:** `.claude/skills/visual-plan-builder/SKILL.md`
- **Visual Agentic Delivery System:** `VISUAL_AGENTIC_DELIVERY_SYSTEM.md`

---

**Last Updated:** 2026-06-09
