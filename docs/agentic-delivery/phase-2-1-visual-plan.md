# Phase 2.1 Visual Plan — Landing First Viewport

## 1. Goal

Transform the Proben.io landing page first viewport from its current generic SaaS appearance to match the approved Proben MVP 6 design direction. The implementation must achieve visual parity score >= 4.5/5 with the reference prototype while maintaining all existing functionality.

## 2. Source of Truth

**Reference Screenshots:**
- `reference/screenshots/proben-mvp-6/hero-target-light-1.png` — Primary reference for light theme hero
- `reference/screenshots/proben-mvp-6/hero-target-dark-2.png` — Dark theme reference
- `reference/screenshots/proben-mvp-6/hero-target-resources-3.png` — Resources section reference

**Reference Documentation:**
- `docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md` — Visual plan template
- `docs/agentic-delivery/PHASE_2_1_RETRY_PROTOCOL.md` — Retry protocol
- `docs/design/DESIGN_QUALITY_GATES.md` — Design quality gates
- `docs/evals/PRODUCT_EVALS.md` — Product evaluation rubric

## 3. Current State

### Current Landing Page (`app/page.tsx`)

**Header/Navigation:**
- ❌ **MISSING:** Rounded pill-shaped header container
- ❌ **MISSING:** "MEETING READINESS" subtitle under logo
- ❌ **WRONG:** Navigation structure doesn't match prototype
- ❌ **MISSING:** Theme toggle button
- ❌ **MISSING:** Proper navigation items order
- ❌ **MISSING:** "Log in" button
- ❌ **WRONG:** CTA hierarchy doesn't match

**Hero Section:**
- ✅ Badge exists: "Context readiness before important meetings"
- ✅ H1 exists: "Know what to fix before the meeting starts."
- ✅ Subtitle exists with bold phrases
- ✅ Two CTA buttons present
- ✅ Trust note exists: "No account required · Use rough notes · Not a personality score"
- ⚠️ **WEAK:** Two-column layout exists but spacing/positioning may not match prototype
- ✅ Right-side readiness preview card exists with content

**Overall Issues:**
- Missing proper rounded pill header
- Missing navigation structure elements
- Generic SaaS appearance vs premium editorial design
- Typography may not match prototype scale
- Spacing may not match prototype proportions
- Colors may not match prototype palette

## 4. Target State

### Approved Proben MVP 6 First Viewport

**Rounded Pill Header:**
- Height: 64px (desktop), 56px (mobile)
- Background: White (#FFFFFF)
- Border-bottom: 1px solid #E5E7EB
- Max-width: 1280px, centered
- Shape: Full-width with centered content

**Logo Section:**
- Logo: "Proben" in modern sans-serif (Inter), 18px, 700 weight, #111827
- Subtitle below logo: "MEETING READINESS" in smaller text
- Position: Left-aligned, 16px from left edge

**Navigation Items (Left-Aligned):**
- Order: "Sample report" → "How it works" → "Checks" → "Resources" → "Pricing"
- Style: 14px, 500 weight, #6B7280 color (hover: #111827)
- Spacing: 24px between items, 16px from logo

**Right Side CTAs:**
- **Theme button:** Sun/moon icon, small, minimal (desktop only)
- **"Log in" button:** White background, #6B7280 text, 14px, 500 weight, 8px padding (horizontal/vertical), 6px border radius
- **"Run readiness check" button:** Green background (#10B981), white text, 14px, 500 weight, 12px padding, 8px border radius, 16px from right edge

**Hero Background:**
- Light grid background pattern
- Subtle gradient for depth
- Overall: Light, clean, professional

**Hero Left Column:**
- **Badge:** Pill-shaped, green background (#10B981), white text, "Context readiness before important meetings"
- **H1:** "Know what to fix before the meeting starts." — 48px (desktop), 700 weight, #111827, line height 1.2
- **Subtitle:** "Paste rough meeting context. Proben checks your **goal**, **strategy**, **evidence**, **stakeholder risk**, and **decision ask**—then shows what to fix before the room does." — 16px, with bold phrases
- **Primary CTA:** "Run readiness check" — Green (#10B981), white text, 14px, 500 weight, 12px padding, 8px border radius
- **Secondary CTA:** "See sample report" — White background, #6B7280 text, 14px, 500 weight, 12px padding, 8px border radius
- **Trust note:** "No account required. Use rough notes. Not a personality score." — 12px, #9CA3AF

**Hero Right Column (Readiness Preview Card):**
- **Card:** White background, 16px border radius, 1px solid #E5E7EB border, subtle shadow
- **Context header:** "Strategy review / roadmap pivot" — 14px, 500 weight, #111827
- **Score:** "6.2 / 10" — Large 36px, 700 weight, #111827 for 6.2, 24px 400 weight #6B7280 for /10
- **Status:** "Partly ready · 3 context gaps found" — 14px, 400 weight, #EF4444 (red) for "Partly ready", #F59E0B (orange) for "3 context gaps"
- **5 Progress Bars:**
  - Goal clarity: 8.0 — Green bar
  - Strategic context: 5.8 — Orange/amber bar
  - Evidence: 6.0 — Orange/amber bar
  - Stakeholder risk: 5.5 — Orange/amber bar
  - Decision ask: 5.2 — Orange/amber bar
- **Context Gaps Section:**
  - "Business impact unclear" — 14px, 500 weight, #111827
  - "Decision threshold missing" — 12px, 400 weight, #6B7280
  - "Stakeholder pushback likely" — 14px, 500 weight, #111827
- **Top Fix:** "Add a business-impact number" — Green background (#10B981) or accent box
- **Practice Moment:** "Why now?" — Link, 12px, 400 weight, #10B981

**Layout:**
- Two-column: Left 45%, Right 50% (with 32px gap)
- Max-width: 1280px for hero content
- 64px vertical spacing between header and hero
- Generous padding and whitespace throughout

## 5. Current vs Target Gap Analysis

| Area | Current | Target | Gap Severity | Required Change | Evidence Source |
|------|--------|--------|--------------|-----------------|----------------|
| **Header shape** | Not visible/separate | Rounded pill container with 1px border | P0 | Create rounded pill header structure | hero-target-light-1.png |
| **Logo subtitle** | Missing | "MEETING READINESS" below logo | P0 | Add MEETING READINESS text | hero-target-light-1.png |
| **Navigation items** | Wrong/not visible | Sample report, How it works, Checks, Resources, Pricing | P0 | Add navigation items in correct order | hero-target-light-1.png |
| **Theme button** | Missing | Sun/moon icon button | P1 | Add theme toggle button (desktop) | hero-target-dark-2.png |
| **Log in button** | Missing | White background, right side | P1 | Add Log in button | hero-target-light-1.png |
| **Primary CTA** | In hero | In header (green, right side) | P0 | Move primary CTA to header | hero-target-light-1.png |
| **Secondary CTA** | In hero | Not visible in screenshot (may be removed) | P2 | Evaluate secondary CTA placement | hero-target-light-1.png |
| **Hero layout** | Two columns but spacing/positioning may differ | Precise 45/50 split with 32px gap | P1 | Adjust column widths and spacing | hero-target-light-1.png |
| **Hero badge** | Exists | Context readiness badge exists | P2 | Verify badge text and styling matches | hero-target-light-1.png |
| **H1** | Exists with correct text | Exists with correct text | P2 | Verify font size, weight, spacing | hero-target-light-1.png |
| **Subtitle** | Exists with bold phrases | Exists with bold phrases | P2 | Verify formatting and spacing | hero-target-light-1.png |
| **Trust note** | Exists | Exists with correct text | P2 | Verify positioning and text | hero-target-light-1.png |
| **Preview card** | Exists with content | Exists with detailed structure | P1 | Verify all card elements match | hero-target-light-1.png |
| **Card context header** | May differ | "Strategy review / roadmap pivot" | P1 | Verify exact header text | hero-target-light-1.png |
| **Score display** | Exists (6.2/10) | Exists with correct styling | P2 | Verify colors and positioning | hero-target-light-1.png |
| **Progress bars** | Exist (5 bars) | Exist with correct values and colors | P1 | Verify bar colors, sizes, values | hero-target-light-1.png |
| **Context gaps** | Exist | "Business impact unclear", "Decision threshold missing", "Stakeholder pushback likely" | P1 | Verify exact text and formatting | hero-target-light-1.png |
| **Top fix** | Exists | "Add a business-impact number" | P1 | Verify text and green background | hero-target-light-1.png |
| **Practice moment** | Exists | "Why now?" link | P1 | Verify text and styling | hero-target-light-1.png |
| **Background** | bg-grid-pattern | Light grid with gradient | P1 | Verify grid pattern matches | hero-target-light-1.png |
| **Typography** | Font sizes/weights may differ | Inter/sans-serif at specific sizes | P1 | Verify all font sizes, weights, line heights | hero-target-light-1.png |
| **Colors** | May differ | Specific color palette | P1 | Verify all colors match | hero-target-light-1.png |
| **Spacing** | May differ | Specific padding/margin values | P1 | Verify all spacing matches | hero-target-light-1.png |
| **Border radius** | May differ | 8px (buttons), 16px (card) | P2 | Verify all border radii match | hero-target-light-1.png |
| **Shadows** | May differ | Subtle card shadow | P2 | Verify shadow usage | hero-target-light-1.png |
| **Responsiveness** | Exists but may differ | Desktop two-column, mobile stacked | P1 | Verify responsive behavior | hero-target-light-1.png |

## 6. Layout Map

### Desktop (>1024px)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  [Rounded Pill Header - 1280px max-width]        │  │
│  │  Logo "Proben"                                    │  │
│  │  MEETING READINESS                               │  │
│  │  [Sample report] [How it works] [Checks]        │  │
│  │   [Resources] [Pricing]                        │  │
│  │                        [☼] [Log in] [Run readiness check] │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌───────────────────────────────────────────────────┐  │
│  │  [Hero Section - 1280px max-width]             │  │
│  │  ┌───────────────────────┬─────────────────────┐ │  │
│  │  │                       │                     │ │  │
│  │  │  [Left Column - 45%]    │  [Right Column - 50%] │ │  │
│  │  │                       │                     │ │  │
│  │  │  [Badge]               │  [Preview Card]       │ │  │
│  │  │  [H1]                 │  [6.2/10]           │ │  │
│  │  │  [Subtitle]            │  [Status]            │ │  │
│  │  │  [CTAs]               │  [Progress Bars]     │ │  │
│  │  │  [Trust note]          │  [Gaps]             │ │  │
│  │  │                       │  [Fix]               │ │  │
│  │  │                       │  [Practice]          │ │  │
│  │  │                       │                     │ │  │
│  │  └───────────────────────┴─────────────────────┘ │  │
│  │       [32px gap between columns]                   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Mobile (<768px)

```
┌─────────────────────────┐
│  [Rounded Pill Header]    │
│  Logo "Proben"           │
│  MEETING READINESS       │
│  [☰] [Run readiness check]│
└─────────────────────────┘
        [Stack vertically]
        [Hero badge]
        [H1]
        [Subtitle]
        [CTAs]
        [Trust note]
        [Preview card]
```

### Spacing Specifications

- **Header height:** 64px (desktop), 56px (mobile)
- **Header to hero spacing:** 64px
- **Hero vertical padding:** 80px (top), 80px (bottom) approx
- **Column gap:** 32px (desktop), 0px (mobile, stack)
- **Card internal padding:** 24px
- **CTA spacing:** 16px between buttons
- **Trust note spacing:** 8px from left column bottom

## 7. Component Map

### LandingHeader (NEW)

**Purpose:** Rounded pill header with logo, subtitle, navigation, and CTAs

**Content:**
- Logo "Proben" (18px, 700 weight, #111827)
- Subtitle "MEETING READINESS" (smaller text)
- Navigation items: Sample report, How it works, Checks, Resources, Pricing
- Theme toggle button (desktop)
- Log in button
- Run readiness check button (green)

**Props:** None (static content)

**Files affected:** Likely new component `components/LandingHeader.tsx`

---

### HeroSection (MODIFY)

**Purpose:** Hero section with badge, H1, subtitle, CTAs, trust note

**Content:**
- Badge: "Context readiness before important meetings"
- H1: "Know what to fix before the meeting starts."
- Subtitle with bold phrases
- CTA buttons (both)
- Trust note

**Props:** None (static content)

**Files affected:** Modify section in `app/page.tsx`

---

### ReadinessPreviewCard (MODIFY)

**Purpose:** Right-side readiness report preview card with detailed scoring

**Content:**
- Context header: "Strategy review / roadmap pivot"
- Score: "6.2 / 10"
- Status: "Partly ready · 3 context gaps found"
- 5 progress bars with values
- Context gaps section (3 items)
- Top fix section
- Practice moment link

**Props:** None (static demo data)

**Files affected:** Modify structure in `app/page.tsx`

---

### HeroTrustNote (NEW/EXTRACT)

**Purpose:** Trust indicators below CTAs

**Content:**
- "No account required. Use rough notes. Not a personality score."

**Props:** None (static content)

**Files affected:** Could be inline or extracted component

---

### OutcomeChips (NOT IN FIRST VIEWPORT)

**Purpose:** Bottom outcome chips (if visible)

**Content:** Not visible in first viewport screenshot

**Props:** None (static content)

**Files affected:** Not in scope for Phase 2.1

## 8. Exact Copy

### Header

**Logo:** "Proben"
**Subtitle:** "MEETING READINESS"
**Navigation items:** "Sample report", "How it works", "Checks", "Resources", "Pricing"
**Theme button:** [Icon only]
**Login button:** "Log in"
**Primary CTA:** "Run readiness check"

### Hero Section

**Badge:** "Context readiness before important meetings"

**H1:** "Know what to fix before the meeting starts."

**Subtitle:** "Paste rough meeting context. Proben checks your **goal**, **strategy**, **evidence**, **stakeholder risk**, and **decision ask**—then shows what to fix before the room does."

**Primary CTA:** "Run readiness check"
**Secondary CTA:** "See sample report"

**Trust note:** "No account required. Use rough notes. Not a personality score."

### Right Side Card

**Context header:** "Strategy review / roadmap pivot"

**Score:** "6.2" / "10"
**Status:** "Partly ready · 3 context gaps found"

**5 Checks with Labels and Values:**
- Goal clarity: 8.0
- Strategic context: 5.8
- Evidence: 6.0
- Stakeholder risk: 5.5
- Decision ask: 5.2

**Context Gaps:**
- Business impact unclear
- Decision threshold missing
- Stakeholder pushback likely

**Top Fix:** "Add a business-impact number"

**Practice Moment:** "Why now?"

## 9. Design Tokens

### Proposed Tokens

**Backgrounds:**
- `bg-grid-pattern`: Light gray grid pattern with subtle gradient
- `bg-white`: #FFFFFF
- `bg-card`: #FFFFFF (card background)
- `bg-accent-green`: #10B981 (CTA green)
- `bg-warning-orange`: #F59E0B (status orange)
- `bg-error-red`: #EF4444 (error red)

**Text Colors:**
- `text-primary`: #111827 (primary text)
- `text-secondary`: #6B7280 (secondary text)
- `text-muted`: #9CA3AF (muted text)
- `text-accent-green`: #10B981 (accent green)
- `text-accent-orange`: #F59E0B (accent orange)
- `text-accent-blue`: #3B82F6 (accent blue)

**Borders:**
- `border-default`: #E5E7EB (default border)
- `border-card`: #E5E7EB (card border)

**Shadows:**
- `shadow-card`: 0 4px 6px -1px rgba(0, 0, 0, 0.05)
- `shadow-subtle`: Subtle shadow for depth

**Border Radius:**
- `radius-button`: 8px
- `radius-card`: 16px
- `radius-pill`: 9999px (for pill shapes)

**Spacing:**
- `spacing-xs`: 4px
- `spacing-sm`: 8px
- `spacing-md`: 12px
- `spacing-lg`: 16px
- `spacing-xl`: 24px
- `spacing-2xl`: 32px
- `spacing-3xl`: 64px

**Typography:**
- `font-hero`: 48px (desktop), 700 weight
- `font-h1`: 48px, 700 weight
- `font-h2`: 36px, 700 weight
- `font-body`: 16px, 400 weight
- `font-small`: 14px, 400 weight
- `font-tiny`: 12px, 400 weight
- `font-label`: 12px, 500 weight

**Line Heights:**
- `leading-tight`: 1.2
- `leading-normal`: 1.6

**Colors for Progress Bars:**
- `bar-green`: #10B981
- `bar-orange`: #F59E0B
- `bar-gray`: #F3F4F6 (empty state)

### Token Usage

**Do NOT add new design library.** Use existing Tailwind utilities or extend `tailwind.config.ts` only if absolutely necessary.

## 10. Acceptance Criteria

Phase 2.1 implementation can be accepted only if ALL of the following are met:

### Visual Requirements
- [ ] First viewport visually matches Proben MVP 6 direction
- [ ] Design Parity score >= 4.5/5 (rated by Fresh Review Agent)
- [ ] H1 is exact copy: "Know what to fix before the meeting starts."
- [ ] Right readiness report preview card exists and matches prototype
- [ ] Header matches rounded pill structure with logo + "MEETING READINESS"
- [ ] Navigation items in correct order: Sample report, How it works, Checks, Resources, Pricing
- [ ] Theme button exists (desktop)
- [ ] Log in button exists (right side)
- ] Primary CTA "Run readiness check" in header (green, right side)
- [ ] CTA hierarchy matches prototype
- [ ] Trust note exists with correct text
- [ ] Page does not look like generic SaaS

### Functional Requirements
- [ ] All routes work correctly
- [ ] Links navigate to correct destinations
- [ ] No console errors
- [ ] Responsive behavior works (desktop/tablet/mobile)

### Quality Requirements
- [ ] Tests pass: `npm test` — 27 tests passing
- [ ] Type check passes: `npm run type-check` — No errors
- [ ] Build succeeds: `npm run build` — Static pages generated
- [ ] E2E tests pass: Core flow validated

### Evidence Requirements
- [ ] Screenshot evidence captured (current implementation)
- [ ] Side-by-side comparison with prototype created
- [ ] Visual parity score documented
- [ ] Fresh Review Agent independent verdict documented
- [ ] Principal Design Reviewer visual parity score documented
- [ ] Principal Product Manager product-quality verdict documented
- [ ] CTO Bar Raiser release readiness confirmation documented

### Approval Requirements
- [ ] Human approves this visual plan before implementation
- [ ] Human approves implementation after all reviews passed
- [ ] No scope creep from approved plan

## 11. Visual Blockers

Implementation will be AUTOMATICALLY REJECTED if ANY of these are present:

**Critical Blockers (P0):**
- ❌ Missing rounded pill header structure
- ❌ Missing "MEETING READINESS" subtitle under logo
- ❌ Wrong navigation items or order
- ❌ Missing readiness preview card (right side)
- ❌ Centered generic hero instead of split two-column layout
- ❌ H1 text is not exact: "Know what to fix before the meeting starts."
- ❌ Missing trust note or wrong trust note text
- ❌ Generic SaaS appearance (looks like AI-generated page)

**Quality Blockers (P0-P1):**
- ❌ Design parity score < 4.5/5
- ❌ No screenshot evidence provided
- ❌ No side-by-side comparison with prototype
- ❌ Tests, type-check, or build fails
- ❌ Functional QA failed
- ❌ Any critical dimension below 4/5

**Scope Blockers:**
- ❌ Backend code added
- ❌ Authentication added
- ❌ Database integration added
- ❌ Stripe payment integration added
- ❌ Real AI providers added
- ❌ MCP automation added
- ❌ New dependencies added without explicit approval
- ❌ Changes to non-landing pages

## 12. Out of Scope

**Explicitly EXCLUDED from Phase 2.1:**

### Infrastructure (NEVER)
- ❌ Backend implementation
- ❌ Database schema or connections
- ❌ Authentication system
- ❌ Payment processing (Stripe)
- ❌ Real AI API integrations
- ❌ MCP automation
- ❌ Admin console

### Non-Landing Pages (NOT NOW)
- ❌ Redesign of sample report page
- ❌ Redesign of readiness check page
- ❌ Redesign of portfolio pages
- ❌ New routes or pages

### Dependencies (MINIMAL)
- ❌ New UI libraries (Framer Motion, Radix UI, etc.)
- ❌ New icons libraries (use existing or SVG)
- ❌ New design systems
- ❌ New build tools

**Rule:** Use existing Tailwind CSS and current design tokens only.

## 13. Test Plan

### Pre-Implementation Tests
- ✅ Type check: `npm run type-check` — Must pass with no errors
- ✅ Unit tests: `npm test` — All 27 tests must pass
- ✅ Build: `npm run build` — Must succeed

### Post-Implementation Tests
- ✅ Type check: `npm run type-check` — Must pass with no errors
- ✅ Unit tests: `npm test` — All 27 tests must pass
- ✅ Build: `npm run build` — Must succeed
- ✅ E2E core flow: `npx playwright test e2e/core-flow.spec.ts --project=chromium` — Must pass

### Smoke Tests (Manual)
- ✅ Open http://localhost:3000
- ✅ Verify page loads without errors
- ✅ Verify no console errors
- ✅ Verify links work correctly

## 14. Manual QA Plan

### Pre-Implementation
- [ ] Review this visual plan document
- [ ] Open and analyze reference screenshots
- [ ] Open and analyze current implementation
- [ ] Verify all gaps are identified

### Post-Implementation
- [ ] Start dev server: `npm run dev`
- [ ] Navigate to http://localhost:3000
- [ ] **Desktop Verification:**
  - [ ] Compare with `hero-target-light-1.png`
  - [ ] Verify rounded pill header exists
  - [ ] Verify "MEETING READINESS" subtitle exists
  - [ ] Verify navigation items: Sample report, How it works, Checks, Resources, Pricing
  - [ ] Verify theme button exists
  - [ ] Verify Log in button exists
  - [ ] Verify "Run readiness check" button in header (green, right side)
  - [ ] Verify hero badge: "Context readiness before important meetings"
  - [ ] Verify H1: "Know what to fix before the meeting starts."
  - [ ] Verify subtitle with bold phrases
  - [ ] Verify primary CTA in header
  - [ ] Verify trust note exists
  - [ ] Verify right-side preview card exists
  - [ ] Verify score: "6.2 / 10"
  - [ ] Verify status: "Partly ready · 3 context gaps found"
  - [ ] Verify 5 progress bars with correct values
  - [ ] Verify context gaps section
  - [ ] Verify top fix section
  - [ ] Verify practice moment link
  - [ ] Capture screenshot of current implementation

- [ ] **Mobile Verification:**
  - [ ] Navigate to http://localhost:3000 on mobile viewport
  - [ ] Verify header stacks correctly
  - [ ] Verify navigation collapsed/hidden
  - [ ] Verify hero content stacks in correct order
  - [ ] Verify preview card stacks below hero
  - [ ] Verify CTA buttons still accessible

- [ ] **Screenshot Evidence:**
  - [ ] Save screenshot as `screenshots/phase-2-1-implementation.png`
  - [ ] Create side-by-side comparison with reference screenshot
  - [ ] Update design review document with comparison

## 15. Risk Score

### Preliminary Risk Assessment

**Product Risk: LOW-MEDIUM**
- **Risk:** User value proposition is clear
- **Mitigation:** Copy is from approved prototype
- **Residual:** Visual execution may not communicate value effectively

**Design Risk: MEDIUM**
- **Risk:** High visual parity required (>= 4.5/5)
- **Mitigation:** Detailed visual plan with exact specifications
- **Residual:** Spacing, typography, colors may deviate slightly

**Technical Risk: LOW**
- **Risk:** Component structure changes
- **Mitigation:** Reuse existing components where possible, incremental changes
- **Residual:** Header component creation may introduce complexity

**Release Risk: LOW**
- **Risk:** Breaking changes to visible page
- **Mitigation:** All tests must pass, manual QA performed
- **Residual:** Visual bugs may require hotfix

**Portfolio Credibility Risk: LOW-MEDIUM**
- **Risk:** If visual parity < 4.5/5, portfolio credibility damaged
- **Mitigation:** Strict Fresh Review process, multiple verification points
- **Residual:** Human rejection risk if quality not met

**Overall Risk Level: LOW-MEDIUM**

**Acceptable for Phase 2.1:** YES, with evidence requirements and multiple quality gates.

## 16. Implementation Slices

### Slice A: Header/Navigation Component (P0)

**Focus:** Create or modify landing header to match rounded pill prototype

**Tasks:**
- Create or update `components/LandingHeader.tsx` component
- Implement rounded pill container (1280px max-width, centered)
- Add logo "Proben" + "MEETING READINESS" subtitle
- Add navigation items in order: Sample report, How it works, Checks, Resources, Pricing
- Add theme toggle button (desktop)
- Add "Log in" button (right side)
- Add "Run readiness check" button (green, right side)
- Integrate header into `app/page.tsx`
- Remove or adjust hero section CTA buttons (since primary CTA now in header)

**Files affected:**
- `components/LandingHeader.tsx` (NEW or MODIFIED)
- `app/page.tsx` (MODIFIED)

**Acceptance:** Header matches prototype screenshot exactly

---

### Slice B: Hero Left Column Refinement (P1)

**Focus:** Refine hero left column content to match prototype

**Tasks:**
- Update hero badge styling if needed
- Verify H1 font size, weight, spacing matches prototype
- Verify subtitle formatting with bold phrases
- Adjust or remove hero section CTA buttons (moved to header in Slice A)
- Verify trust note text and positioning

**Files affected:**
- `app/page.tsx` (MODIFIED - hero section only)

**Acceptance:** Hero left column matches prototype screenshot exactly

---

### Slice C: Readiness Preview Card Refinement (P1)

**Focus:** Refine right-side readiness preview card to match prototype

**Tasks:**
- Verify card container styling (16px border radius, shadow, border)
- Verify context header text: "Strategy review / roadmap pivot"
- Verify score display: "6.2 / 10" with correct styling
- Verify status text: "Partly ready · 3 context gaps found"
- Verify 5 progress bars with correct labels, values, colors
- Verify context gaps section with 3 items
- Verify top fix section
- Verify practice moment link
- Adjust spacing within card if needed

**Files affected:**
- `app/page.tsx` (MODIFIED - preview card section only)

**Acceptance:** Preview card matches prototype screenshot exactly

---

### Slice D: Background, Grid, Design Tokens (P1)

**Focus:** Ensure background, grid pattern, and design tokens match prototype

**Tasks:**
- Verify or adjust light grid background pattern
- Verify or adjust hero background color/gradient
- Extend Tailwind config with any missing tokens
- Ensure color palette matches prototype
- Ensure spacing tokens match prototype

**Files affected:**
- `app/globals.css` (POTENTIAL - grid pattern)
- `tailwind.config.ts` (POTENTIAL - tokens)
- `app/page.tsx` (POTENTIAL - background)

**Acceptance:** Background, grid, tokens match prototype screenshot

---

### Slice E: Mobile Polish (P2)

**Focus:** Ensure mobile responsive behavior matches prototype

**Tasks:**
- Verify header stacks correctly on mobile
- Verify hero content stacks in correct order
- Verify preview card stacks below hero
- Verify spacing and padding on mobile
- Verify all elements remain accessible
- Test at 375px, 768px breakpoints

**Files affected:**
- `app/page.tsx` (MODIFIED - responsive classes)
- `components/LandingHeader.tsx` (MODIFIED - mobile behavior)

**Acceptance:** Mobile layout usable, all elements accessible

---

### Slice F: Review and Evidence Package (P0)

**Focus:** Complete verification and evidence gathering for release

**Tasks:**
- Run all tests and ensure passing
- Run type-check and ensure no errors
- Run build and ensure success
- Run E2E core flow test
- Capture screenshot of current implementation
- Create side-by-side comparison with prototype
- Document visual parity score
- Fresh Review Agent provides independent verdict
- Principal Design Reviewer provides visual parity score
- Principal Product Manager provides product-quality verdict
- CTO Bar Raiser confirms release readiness
- Human approves release

**Files affected:**
- Documentation files updated
- Screenshots captured
- Evidence package complete

**Acceptance:** All gates passed, human approval received

## 17. Approval Question

### Visual Plan Approval Required

**This visual plan must be approved by HUMAN OWNER before any implementation begins.**

**Approval Checklist:**

- [ ] I have reviewed this visual plan document
- [ ] I have reviewed the reference screenshots
- [ ] I understand the current vs target gaps
- [ ] I approve the layout map and component structure
-- [ ] I approve the exact copy specifications
- [ ] I approve the proposed design tokens
- [ ] I approve the acceptance criteria
- [ ] I approve the visual blockers
- [ ] I approve the out-of-scope exclusions
- [ ] I approve the implementation slices
- [ ] I understand that Design Parity score >= 4.5/5 is REQUIRED for acceptance
- [ ] I understand that visual blockers will AUTOMATICALLY REJECT implementation
- [ ] I approve proceeding to implementation

**If you approve this visual plan, implementation can begin following the Visual Agentic Delivery System:**

1. Create isolated worktree: `worktree-phase-2-1-landing-redesign`
2. Implement according to approved slices (A-F)
3. Run tests and verify after each slice
4. Capture screenshot evidence
5. Fresh Review Agent independent review
6. Principal Design Reviewer visual parity score
7. Principal Product Manager product-quality verdict
8. CTO Bar Raiser release readiness confirmation
9. Human final approval

---

**DO NOT implement any UI code until this visual plan is approved.**

**DO NOT mark Phase 2.1 as complete until all implementation slices are completed, all reviews passed, and human approval is received.**

---

**Status:** AWAITING HUMAN APPROVAL

**Plan Created:** 2026-06-10

**Next Step:** Await human approval before implementation begins

**Planned Implementation:** Phase 2.1 Landing Page First Viewport Redesign

**Expected Duration:** 4-5 hours (including reviews, evidence gathering, approvals)
