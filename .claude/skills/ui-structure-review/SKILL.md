# UI Structure Review Skill

## Purpose

Review UI implementation structure, responsiveness, component logic, and common AI-generated UI mistakes. This skill complements design taste review by focusing on technical implementation quality rather than visual aesthetics.

## When to Use

* Before implementing UI changes
* After implementing UI changes
* When reviewing component structure
* When assessing responsive behavior
* When concerned about over-engineering

## Checklist Dimensions

### 1. Layout Structure

**Questions:**
* Is the layout simple and maintainable?
* Are sections clearly separated?
* Is the grid/background implemented cleanly?
* Is the DOM structure minimal?
* Are there unnecessary wrappers or divs?

**Scoring:**
* **5**: Layout is simple, clean, and maintainable
* **4**: Layout is good with minor complexity
* **3**: Layout is functional but could be simpler
* **2**: Layout has unnecessary complexity
* **1**: Layout is over-engineered
* **0**: Layout is broken

### 2. Component Structure

**Questions:**
* Are repeated UI patterns extracted only when useful?
* Is there unnecessary abstraction?
* Are components named clearly?
* Are props well-defined?
* Is component complexity justified?

**Scoring:**
* **5**: Components are minimal, clear, and reusable
* **4**: Components are mostly well-structured
* **3**: Components are functional but could be cleaner
* **2**: Components have unnecessary complexity
* **1**: Components are poorly structured
* **0**: Component structure is broken

### 3. Responsiveness

**Questions:**
* Does the hero work on desktop, laptop, tablet, and mobile?
* Does the report preview card stack correctly on smaller screens?
* Is navigation usable on mobile?
* Are breakpoints intentional?
* Is touch interaction adequate?

**Scoring:**
* **5**: Responsive behavior is excellent across all devices
* **4**: Responsive is good with minor issues
* **3**: Responsive is functional but not polished
* **2**: Responsive has clear problems on some devices
* **1**: Responsive is poor
* **0**: Responsive is broken

### 4. Interaction Logic

**Questions:**
* Do CTAs link to correct canonical routes?
* Are links and buttons semantically correct?
* Are test IDs stable?
* Are hover/focus states defined?
* Is interaction feedback clear?

**Scoring:**
* **5**: Interactions are correct, accessible, and well-defined
* **4**: Interactions are mostly correct
* **3**: Interactions are functional but incomplete
* **2**: Interactions have clear issues
* **1**: Interactions are poorly implemented
* **0**: Interactions are broken

### 5. Animation Discipline

**Questions:**
* Are animations minimal and useful?
* Is anything animated just because it looks flashy?
* Do animations harm performance or clarity?
* Are transitions consistent?
* Is animation accessible (prefers-reduced-motion)?

**Scoring:**
* **5**: Animations are minimal, useful, and accessible
* **4**: Animations are mostly disciplined
* **3**: Animations are acceptable but not refined
* **2**: Animations are excessive or distracting
* **1**: Animations are poorly implemented
* **0**: Animations are broken or harmful

### 6. Accessibility

**Questions:**
* Are headings structured correctly (h1-h6)?
* Are buttons and links semantically correct?
* Is keyboard navigation preserved?
* Are contrast and focus states acceptable?
* Are ARIA labels used where needed?

**Scoring:**
* **5**: Accessibility is excellent throughout
* **4**: Accessibility is good with minor issues
* **3**: Accessibility is acceptable but not comprehensive
* **2**: Accessibility has clear problems
* **1**: Accessibility is poor
* **0**: Accessibility fails basic standards

### 7. Performance

**Questions:**
* Is the page lightweight?
* Are there unnecessary images, scripts, or dependencies?
* Is the hero fast to render?
* Are there render-blocking resources?
* Is bundle size controlled?

**Scoring:**
* **5**: Performance is excellent, no bloat
* **4**: Performance is good with minor inefficiencies
* **3**: Performance is acceptable
* **2**: Performance has clear issues
* **1**: Performance is poor
* **0**: Performance is broken

### 8. AI-Generated UI Smell Check

**Detect signs of generic AI-generated UI:**

**Common Smells:**
* Too many gradients
* Too many cards
* Inconsistent border radius
* Inconsistent shadows
* Random icons
* Inconsistent text sizes
* Fake dashboards
* Excessive decorative elements
* Poor mobile behavior
* Generic content ("Powerful AI solution", "Unlock your potential")

**Scoring:**
* **5**: No AI smells detected, looks intentionally designed
* **4**: Minor smells but overall intentional
* **3**: Some smells visible but not overwhelming
* **2**: Clear signs of AI-generated patterns
* **1**: Strong AI-generated UI characteristics
* **0**: Obvious generic AI output

## Implementation Verdict

**Safe to Implement** — Proceed with implementation

**Needs Simplification** — Reduce complexity before implementing

**Needs Visual Correction** — Fix design issues before implementing

**Needs Responsive Correction** — Fix responsive approach before implementing

**Blocked** — Do not implement as proposed

## Output Format

```markdown
# UI Structure Review: [Page/Component]

## Implementation Verdict
[SAFE / NEEDS SIMPLIFICATION / NEEDS VISUAL CORRECTION / NEEDS RESPONSIVE CORRECTION / BLOCKED]

## Dimension Scores
| Dimension | Score | Notes |
|-----------|-------|-------|
| Layout Structure | X/5 | |
| Component Structure | X/5 | |
| Responsiveness | X/5 | |
| Interaction Logic | X/5 | |
| Animation Discipline | X/5 | |
| Accessibility | X/5 | |
| Performance | X/5 | |
| AI Smell Check | X/5 | |

## Average Score
X/5

## Strengths
[List what works well technically]

## Concerns
[List technical concerns]

## Required Changes
[P0/P1/P2 changes]

## AI Smell Detection
[Clear / Minor / Major smells detected]
```

## Usage

```bash
/skill ui-structure-review

Input: Component code, layout approach
Output: Structure review with scores and recommendations
```

## Related Documentation

* **Design Quality Gates:** `docs/design/DESIGN_QUALITY_GATES.md`
* **Design Review Template:** `docs/design/DESIGN_REVIEW_TEMPLATE.md`
* **Design Quality Reviewer:** `.claude/agents/design-quality-reviewer.md`
* **Design Taste Review:** `.claude/skills/design-taste-review/SKILL.md`
