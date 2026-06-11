# Phase 2.1 Design Parity Plan

## Purpose

Achieve design parity with the Proben MVP 6 target prototype while maintaining all existing functionality. This phase focuses on surface-layer changes to improve visual quality, clarity, and credibility without adding backend complexity.

---

## Current State

### What the Current Landing Page Looks Like

**Hero Section:**
* H1: "Don't walk into important meetings unprepared"
* Subheadline: "Assess your readiness for critical meetings and product launches..."
* Two CTAs: "Run readiness check" (green) and "View sample report" (outline)
* Basic layout with left-aligned content

**Navigation:**
* Logo: "Proben" (serif, plain text)
* Links: Home, Sample Report, Readiness Check, Build Process
* Standard navbar with border-bottom
* Desktop + mobile responsive

**Features Section:**
* 3-column grid showing 5 dimensions
* Each dimension has: badge, title, description
* Green badges for each dimension

**How It Works Section:**
* 3-step numbered list
* Left-aligned with description

**Missing Elements:**
* ❌ Right-side readiness report preview card
* ❌ "Know what to fix before the meeting starts" headline
* ❌ Pill-shaped header/navigation
* ❌ "MEETING READINESS" subtitle under logo
* ❌ Trust note: "No account required · Use rough notes · Not a personality score"
* ❌ Bottom outcome chips
* ❌ Score visualization on landing page
* ❌ Context gaps preview
* ❌ Top fix preview
* ❌ Practice moment preview
* ❌ Five checks visualization

### Why Current Implementation Is Not Yet Aligned

**1. Value Proposition Difference**
* Current: Focus on "don't walk unprepared" (fear-based)
* Target: Focus on "know what to fix" (actionable, empowering)

**2. Missing Visual Proof**
* Current: No preview of the actual product output
* Target: Right-side preview card showing what users get

**3. Navigation Structure**
* Current: 4 links (Home, Sample Report, Readiness Check, Build Process)
* Target: 5 links (Sample report, How it works, Checks, Resources, Pricing)

**4. Premium Aesthetic**
* Current: Functional but basic
* Target: Premium editorial SaaS feel

**5. Social Proof Elements**
* Current: No trust signals
* Target: Trust note, credibility cues

---

## Target State

### Proben MVP 6 Landing Page Description

**Header/Navigation:**
* Proben logo (serif)
* "MEETING READINESS" subtitle
* Pill-shaped navigation container
* Links: Sample report, How it works, Checks, Resources, Pricing
* Clean, premium aesthetic

**Hero Section:**
* H1: "Know what to fix before the meeting starts."
* Subheadline: Brief value proposition
* Left: Hero content and CTA
* Right: Readiness report preview card

**Right-Side Readiness Report Preview Card:**
* Score: 6.2 / 10 (prominently displayed)
* Status: "Partly ready" (badge/indicator)
* Five checks with scores:
  * Goal clarity — 8.0
  * Strategic context — 5.8
  * Evidence — 6.0
  * Stakeholder risk — 5.5
  * Decision ask — 5.2
* Context gaps:
  * Business impact unclear
  * Decision threshold missing
  * Stakeholder pushback likely
* Top fix: "Add a business-impact number"
* Practice moment: "Why now?"
* Visual card design with shadow/border

**Trust Note:**
* "No account required · Use rough notes · Not a personality score"
* Positioned strategically (likely near CTA)

**Bottom Outcome Chips:**
* Readiness score
* Missing context
* Top 3 fixes
* Likely questions
* One practice moment

**Aesthetic:**
* Light grid background (already exists)
* Premium editorial feel
* Sophisticated typography
* Strategic use of green for CTAs
* Clean, uncluttered layout

---

## Gap Analysis

| Area | Current Implementation | Target Prototype | Gap Severity | Proposed Change | Files Affected |
|------|----------------------|------------------|-------------|-----------------|----------------|
| **Header** | Standard navbar with border | Pill-shaped navigation, cleaner | P1 | Redesign header with pill-shaped nav | `components/navigation.tsx`, `app/globals.css` |
| **Logo** | "Proben" only | "Proben" + "MEETING READINESS" subtitle | P1 | Add subtitle under logo | `components/navigation.tsx` |
| **Navigation Links** | Home, Sample Report, Readiness Check, Build Process | Sample report, How it works, Checks, Resources, Pricing | P1 | Restructure navigation to match target | `components/navigation.tsx` |
| **Hero H1** | "Don't walk into important meetings unprepared" | "Know what to fix before the meeting starts." | P0 | Change headline to match target | `app/page.tsx` |
| **Hero Layout** | Single column, left-aligned | Two-column with right-side preview card | P0 | Add right-side column with preview card | `app/page.tsx` |
| **Right-Side Preview** | Missing | Full readiness report preview card with score, gaps, fixes | P0 | Create and position preview card component | `app/page.tsx`, new component |
| **Score Visualization** | Not on landing page | 6.2/10 prominently displayed | P0 | Add score display to preview card | `app/page.tsx` |
| **Five Checks** | Not on landing page | Goal clarity 8.0, Strategic 5.8, Evidence 6.0, Stakeholder 5.5, Decision 5.2 | P0 | Add checks visualization to preview | `app/page.tsx` |
| **Context Gaps** | Not on landing page | 3 gaps shown (Business impact, Decision threshold, Stakeholder pushback) | P0 | Add context gaps to preview | `app/page.tsx` |
| **Top Fix** | Not on landing page | "Add a business-impact number" | P0 | Add top fix to preview | `app/page.tsx` |
| **Practice Moment** | Not on landing page | "Why now?" | P0 | Add practice moment to preview | `app/page.tsx` |
| **Trust Note** | Missing | "No account required · Use rough notes · Not a personality score" | P0 | Add trust note near CTA | `app/page.tsx` |
| **Bottom Chips** | Missing | Readiness score, Missing context, Top 3 fixes, Likely questions, One practice moment | P1 | Add outcome chips section | `app/page.tsx` |
| **Grid Background** | Exists | Exists | ✓ | No change needed | — |
| **CTA Buttons** | Green + outline buttons | Maintain similar approach | P1 | Refine button styling if needed | `app/page.tsx` |
| **Mobile Responsive** | Basic responsive | Should maintain two-column or stack | P1 | Ensure preview card stacks properly on mobile | `app/page.tsx` |
| **Color Scheme** | Green CTAs, gray text | Maintain brand green | P2 | No major changes, refine if needed | `tailwind.config.ts` |

**Gap Summary:**
* **P0 (Critical):** 9 gaps — Hero headline, layout, preview card, score, checks, gaps, fix, practice moment, trust note
* **P1 (High):** 5 gaps — Header, logo, navigation, bottom chips, mobile
* **P2 (Medium):** 2 gaps — Color scheme refinements

---

## Implementation Slices

### Slice 2.1A — Design Tokens and Layout Foundation

**Goal:**
Establish the design foundation for pill-shaped navigation and premium aesthetic.

**Files Likely Affected:**
* `tailwind.config.ts` — Verify brand green and spacing tokens
* `app/globals.css` — Grid background exists, verify
* No new dependencies

**Acceptance Criteria:**
* Grid background verified working
* Brand green (#10B981) confirmed
* Spacing tokens ready for two-column layout

**Test/Update Required:**
* Visual check of grid background
* Verify color contrast

**Risk:**
* Low — Design tokens mostly exist

**Rollback Plan:**
* Revert `tailwind.config.ts` if changes made
* No breaking changes expected

---

### Slice 2.1B — Header and Navigation Parity

**Goal:**
Update header to match pill-shaped navigation with "MEETING READINESS" subtitle.

**Files Likely Affected:**
* `components/navigation.tsx` — Main navigation component
* `app/layout.tsx` — May need adjustment for new header

**Acceptance Criteria:**
* Logo shows "Proben" with "MEETING READINESS" subtitle
* Navigation is pill-shaped (rounded container)
* Links: Sample report, How it works, Checks, Resources, Pricing
* Desktop and mobile layouts work
* All links route correctly

**Test/Update Required:**
* Manual browser QA for navigation
* Verify all routes work
* Mobile menu test

**Risk:**
* Medium — Navigation is core functionality
* Risk of broken routes if not careful

**Rollback Plan:**
* Git revert of `components/navigation.tsx`
* Keep old navigation as backup

---

### Slice 2.1C — Hero Copy and CTA Parity

**Goal:**
Update hero section headline and copy to match target.

**Files Likely Affected:**
* `app/page.tsx` — Hero section

**Acceptance Criteria:**
* H1: "Know what to fix before the meeting starts."
* Subheadline aligned with target
* CTA buttons maintain green primary style
* Layout prepared for two-column

**Test/Update Required:**
* Smoke tests for hero section
* Copy verification
* CTA click test

**Risk:**
* Low — Copy changes only

**Rollback Plan:**
* Git revert of `app/page.tsx` hero section

---

### Slice 2.1D — Readiness Preview Card

**Goal:**
Create and position right-side readiness report preview card.

**Files Likely Affected:**
* `app/page.tsx` — Hero layout, new preview section
* Possibly new component: `components/product/readiness-preview-card.tsx`

**Acceptance Criteria:**
* Preview card visible on right side of hero
* Score: 6.2/10 prominently displayed
* Status: "Partly ready"
* Five checks with scores shown
* 3 context gaps listed
* Top fix shown
* Practice moment shown
* Card has shadow/border for premium feel

**Test/Update Required:**
* Visual regression test for hero layout
* Component test for preview card
* Manual browser QA

**Risk:**
* High — New component, layout changes
* Risk of breaking hero layout

**Rollback Plan:**
* Remove preview card component
* Revert `app/page.tsx` hero section
* Keep old layout as fallback

---

### Slice 2.1E — Bottom Outcome Chips and Trust Note

**Goal:**
Add trust note and bottom outcome chips section.

**Files Likely Affected:**
* `app/page.tsx` — New section after hero

**Acceptance Criteria:**
* Trust note visible: "No account required · Use rough notes · Not a personality score"
* Bottom chips section exists
* Chips: Readiness score, Missing context, Top 3 fixes, Likely questions, One practice moment
* Positioned correctly on page
* Mobile layout works

**Test/Update Required:**
* Component test for chips
* Mobile responsive test
* Manual browser QA

**Risk:**
* Low — New section, no breaking changes

**Rollback Plan:**
* Remove chips section from `app/page.tsx`

---

### Slice 2.1F — Responsive Polish and QA

**Goal:**
Ensure mobile responsiveness and polish all visual elements.

**Files Likely Affected:**
* `app/page.tsx` — Responsive adjustments
* `components/navigation.tsx` — Mobile menu refinements

**Acceptance Criteria:**
* Two-column layout stacks on mobile
* Preview card readable on mobile
* Navigation works on mobile
* All text readable at mobile widths
* No horizontal scroll
* Touch targets adequate size

**Test/Update Required:**
* E2E mobile test
* Manual browser QA on mobile
* Multiple device widths tested

**Risk:**
* Medium — Responsive issues can be tricky

**Rollback Plan:**
* Revert responsive changes
* Keep basic stacking as fallback

---

### Slice 2.1G — PM Product Eval and Release Manager Review

**Goal:**
Evaluate Phase 2.1 against product quality rubric and get independent technical review.

**Files Likely Affected:**
* `docs/reviews/phase-2-1-evaluation.md` — New evaluation document

**Acceptance Criteria:**
* PM eval completed using rubric
* PM eval average >= 4.2
* Design Parity score >= 4
* Requirements Compliance score >= 4
* Release Manager review completed
* No overengineering detected
* No scope creep identified

**Test/Update Required:**
* PM eval document created
* Release Manager review document created
* Screenshots captured as evidence

**Risk:**
* Low — Evaluation only

**Rollback Plan:**
* If eval < 4.2: identify required fixes
* If blocked: reassess approach

---

## Out of Scope

**Explicitly DO NOT add in Phase 2.1:**

### Infrastructure
* ❌ No authentication system
* ❌ No database
* ❌ No API routes
* ❌ No server-side rendering changes
* ❌ No edge functions

### Features
* ❌ No user accounts
* ❌ No save results functionality
* ❌ No result history
* ❌ No share links
* ❌ No email notifications
* ❌ No export to PDF

### Payments
* ❌ No Stripe integration
* ❌ No subscription management
* ❌ No payment processing

### AI
* ❌ No OpenAI API
* ❌ No Anthropic API
* ❌ No custom AI models
* ❌ No real scoring changes

### Operations
* ❌ No admin console
* ❌ No user management
* ❌ No analytics dashboard
* ❌ No monitoring infrastructure

### Process
* ❌ No new agent definitions
* ❌ No new skill definitions
* ❌ No new diagrams
* ❌ No new process documentation pages

### Unnecessary Refactoring
* ❌ No broad refactor of existing components
* ❌ No redesign of non-landing pages
* ❌ No changes to readiness check functionality
* ❌ No changes to sample report functionality
* ❌ No new dependencies

---

## Acceptance Criteria

Phase 2.1 is complete **ONLY IF** all of the following are true:

### Visual Requirements
* [ ] Landing page visually matches Proben MVP 6 direction
* [ ] H1 is "Know what to fix before the meeting starts."
* [ ] Header/navigation matches prototype direction (pill-shaped)
* [ ] Logo has "MEETING READINESS" subtitle
* [ ] Right-side readiness report preview card exists
* [ ] CTA buttons match target behavior
* [ ] Trust note exists: "No account required · Use rough notes · Not a personality score"
* [ ] Bottom outcome chips exist
* [ ] Mobile layout is usable

### Functional Requirements
* [ ] All existing routes still work
* [ ] Navigation links route correctly
* [ ] CTA buttons function properly
* [ ] No regressions in existing functionality

### Quality Requirements
* [ ] Product Manager eval average >= 4.2/5
* [ ] Design Parity score >= 4/5
* [ ] Requirements Compliance score >= 4/5
* [ ] Value Proposition Clarity score >= 4/5

### Technical Requirements
* [ ] Typecheck passes (or only vitest globals error)
* [ ] Unit tests pass (27/27)
* [ ] Build passes (9 static pages)
* [ ] E2E core flow passes
* [ ] No new dependencies added
* [ ] Static export still works

### Evidence Requirements
* [ ] Before/after screenshots captured
* [ ] Manual browser QA completed
* [ ] Mobile responsive verified
* [ ] PM eval document created
* [ ] Release Manager review completed

---

## Agent Reviews

### 1. Product Manager Agent Review

**Is this the right Phase 2.1 priority?**

**YES.** Design parity is P0 because:
* Current value proposition is weaker than target prototype
* Missing visual proof (preview card) makes value less obvious
* Premium aesthetic supports credibility
* This is surface-layer work with high impact, low risk

**What should be protected from scope creep?**

**Must protect against:**
* "Let's also add [feature]" → Reject, this is design parity only
* "Let's also fix [other page]" → Reject, landing page only
* "Let's improve the scoring algorithm" → Reject, functionality out of scope
* "Let's add more content" → Reject, prototype is spec
* "Let's redesign while we're at it" → Reject, match prototype

**Scope boundary enforcement:**
* Every change must reference prototype screenshot
* Every addition must answer "Is this in the target?"
* Every "one more thing" gets rejected

**What product eval scores must improve?**

**Target improvements:**
* Value Proposition Clarity: 3 → 4+ (clearer headline)
* Design Parity: 2 → 4+ (match prototype)
* UX Flow Quality: 3 → 4+ (smoother experience)
* Requirements Compliance: 3 → 4+ (meet prototype spec)

**Success threshold:**
* Average >= 4.2
* No critical blocker < 3

---

### 2. Architect Agent Review

**What is the smallest technical implementation?**

**Recommended approach:**
1. Update `components/navigation.tsx` for pill-shaped nav
2. Update `app/page.tsx` hero section
3. Add preview card inline in hero (new component if complex)
4. Add trust note and chips inline
5. Verify responsive layout

**Avoid:**
* Creating unnecessary new components
* Abstracting too early
* Building reusable component library
* Refactoring existing working code

**What should not be refactored?**

**DO NOT refactor:**
* Scoring algorithm in `lib/scoring.ts` — works fine
* Readiness check component — works fine
* Sample report page — works fine
* Build process pages — works fine
* Navigation mobile menu — works fine

**Only touch files that:**
* Directly implement landing page changes
* Are necessary for visual parity

**What files should be touched?**

**Minimum file set:**
1. `components/navigation.tsx` — Header/navigation changes
2. `app/page.tsx` — Hero section, preview card, chips, trust note
3. Possibly `app/globals.css` — If new styles needed
4. Possibly `tailwind.config.ts` — If new tokens needed (unlikely)

**Avoid touching:**
* `lib/scoring.ts` — No functional changes
* `components/product/readiness-check.tsx` — No changes
* `app/sample-report/page.tsx` — No changes
* `app/readiness-check/page.tsx` — No changes
* `app/portfolio/` — No changes

---

### 3. Release Manager Reviewer Review

**What could become overengineered?**

**Overengineering risks to avoid:**

**1. Component Over-Abstraction**
* Risk: Creating complex component hierarchy for preview card
* Mitigation: Keep preview card simple, inline if possible

**2. Design System Over-Build**
* Risk: Creating comprehensive design tokens for one page
* Mitigation: Use existing Tailwind classes, minimal custom CSS

**3. Responsive Over-Engineering**
* Risk: Building complex responsive system for one breakpoint
* Mitigation: Simple stacking on mobile, Tailwind responsive classes

**4. State Management**
* Risk: Adding React state for static preview
* Mitigation: Preview is static, no state needed

**5. Animation Over-Add**
* Risk: Adding animations to impress
* Mitigation: Prototype doesn't show animations, don't add

**What should be blocked?**

**BLOCK these if proposed:**
* "Let's create a reusable card component library" → NO
* "Let's add animations/transitions" → NO
* "Let's create a design system" → NO
* "Let's add state management" → NO
* "Let's refactor the whole page" → NO
* "Let's add new dependencies" → NO
* "Let's make this interactive" → NO (static preview)

**What evidence is required before saying "done"?**

**Required evidence:**
1. **Screenshot comparison:** Before vs after landing page
2. **Mobile screenshots:** Landing page on mobile widths
3. **Browser QA:** Manual check of all navigation links
4. **PM eval document:** Scores against rubric
5. **Release Manager review:** Independent technical approval
6. **Build verification:** Build still works
7. **Test verification:** All 27 tests still pass

**Without these, phase is NOT done.**

---

## Questions Before Implementation

**I only need answers to questions that BLOCK implementation.**

Based on my analysis, I have **NO blocking questions**. The plan is clear:

1. Target prototype is well-defined in screenshots
2. Gap analysis identifies specific changes
3. Implementation slices are small and focused
4. Out-of-scope is explicit
5. Acceptance criteria are unambiguous

**If you approve this plan, I will proceed with implementation in the defined slices.**

---

## Summary

### Gap Analysis Summary

**9 P0 Gaps (Critical):**
* Hero headline wrong
* Missing right-side preview card
* Missing score visualization
* Missing five checks
* Missing context gaps
* Missing top fix
* Missing practice moment
* Missing trust note
* Wrong layout (single vs two-column)

**5 P1 Gaps (High):**
* Header not pill-shaped
* Missing "MEETING READINESS" subtitle
* Navigation structure wrong
* Missing bottom chips
* Mobile layout needs verification

**2 P2 Gaps (Medium):**
* Color scheme refinements (minor)
* Visual polish (minor)

### Recommended Implementation Slices

**7 slices, ~2-3 weeks total:**

1. **Slice 2.1A** — Design tokens (1 day)
2. **Slice 2.1B** — Header/navigation (2-3 days)
3. **Slice 2.1C** — Hero copy/CTA (1 day)
4. **Slice 2.1D** — Preview card (3-5 days) ← MOST COMPLEX
5. **Slice 2.1E** — Chips/trust note (2-3 days)
6. **Slice 2.1F** — Responsive polish (2-3 days)
7. **Slice 2.1G** — PM eval/CTO review (1-2 days)

### Files Likely Affected

**Core files (4-5 max):**
* `components/navigation.tsx`
* `app/page.tsx`
* Possibly `app/globals.css`
* Possibly `tailwind.config.ts`
* One new component for preview card (if needed)

**NOT affected:**
* Scoring logic
* Readiness check functionality
* Sample report
* Portfolio pages
* Tests (except adding new ones if needed)

### Risks

**High Risk:**
* Slice 2.1D (Preview Card) — New component, layout complexity

**Medium Risk:**
* Slice 2.1B (Navigation) — Core functionality, route risks
* Slice 2.1F (Responsive) — Mobile layout challenges

**Low Risk:**
* All other slices — Copy/style changes only

**Mitigation:**
* Small slices with independent verification
* Keep old code as fallback
* Test after each slice
* Manual QA at each step

### Out-of-Scope List

**Explicitly excluded:**
* No backend, auth, database, Stripe
* No AI provider integrations
* No functional changes to readiness check
* No new pages beyond landing updates
* No new dependencies
* No process documentation
* No agent/skill additions

### Approval Question

**Do you approve this Phase 2.1 Design Parity Plan?**

**Options:**

**A. Approve as written** — Proceed with implementation as outlined

**B. Approve with modifications** — Specify what to change

**C. Reject and re-plan** — Specify concerns

**D. Need more info** — Ask specific questions

---

**Awaiting your approval to proceed with implementation.**

If approved, I will execute slices 2.1A through 2.1G sequentially, with verification after each slice, and deliver a completed Phase 2.1 that achieves design parity with Proben MVP 6.
