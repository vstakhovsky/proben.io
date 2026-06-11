# Design Taste Review Skill

## Purpose

Run a taste-level design critique before and after UI implementation. This skill evaluates visual quality, hierarchy, spacing, rhythm, composition, color discipline, and brand fit.

## When to Use

* Before implementing UI changes
* After implementing UI changes
* When reviewing screenshot comparisons
* When assessing design parity with prototype
* When concerned about generic AI-generated UI

## Checklist Dimensions

### 1. Visual Hierarchy

**Questions:**
* Is the primary message obvious within 3 seconds?
* Does the H1 dominate correctly without overwhelming?
* Are secondary elements clearly secondary in size and weight?
* Is there a clear reading path for the user?

**Scoring:**
* **5**: Hierarchy is crystal clear, guides the eye perfectly
* **4**: Hierarchy is clear with minor inconsistencies
* **3**: Hierarchy exists but some elements compete
* **2**: Hierarchy is weak, unclear what to look at first
* **1**: No visible hierarchy, everything competes
* **0**: Chaotic, no structure

### 2. Typography

**Questions:**
* Are font sizes intentional and follow a scale?
* Is line-height comfortable for reading?
* Is there a clear relationship between headline, body, labels, and metadata?
* Does the type match the premium editorial SaaS direction?
* Is font weight used purposefully for emphasis?

**Scoring:**
* **5**: Typography is intentional, comfortable, and on-brand
* **4**: Typography is good with minor inconsistencies
* **3**: Typography is functional but not refined
* **2**: Typography has clear issues (size, weight, or spacing)
* **1**: Typography is poorly chosen or hard to read
* **0**: Typography is broken

### 3. Spacing

**Questions:**
* Are margins and paddings consistent across the interface?
* Is there enough empty space for content to breathe?
* Are sections clearly separated through spacing?
* Are elements neither too cramped nor too spread out?
* Does spacing follow a logical scale (4px, 8px, 16px, 32px)?

**Scoring:**
* **5**: Spacing is consistent, intentional, and comfortable
* **4**: Spacing is generally good with minor inconsistencies
* **3**: Spacing is adequate but not refined
* **2**: Spacing is inconsistent or uncomfortable
* **1**: Spacing is clearly poor (cramped or spread)
* **0**: No apparent spacing system

### 4. Rhythm

**Questions:**
* Do repeated elements (cards, chips, rows) follow a clear visual pattern?
* Are headers, buttons, and links rhythmically consistent?
* Does the interface feel cohesive or disconnected?
* Are similar elements sized and spaced consistently?

**Scoring:**
* **5**: Rhythm is consistent and creates cohesion
* **4**: Rhythm is mostly consistent with minor breaks
* **3**: Rhythm exists but not refined
* **2**: Rhythm is inconsistent in places
* **1**: Rhythm is poor throughout
* **0**: No apparent rhythm

### 5. Composition

**Questions:**
* Is the layout balanced and stable?
* Does the hero left/right composition feel intentional?
* Does the readiness report card have enough visual weight?
* Are elements aligned to a grid or system?
* Does the layout feel stable or liable to tip?

**Scoring:**
* **5**: Composition is balanced, intentional, and stable
* **4**: Composition is good with minor imbalances
* **3**: Composition is functional but not refined
* **2**: Composition has clear issues (unbalanced, unstable)
* **1**: Composition is poor
* **0**: No apparent composition

### 6. Color Discipline

**Questions:**
* Are colors limited and purposeful?
* Is green used primarily for CTAs and positive signals?
* Are warning/amber colors used consistently for gaps?
* Are there any random or unnecessary colors?
* Is color contrast sufficient for accessibility?

**Scoring:**
* **5**: Colors are disciplined, purposeful, and accessible
* **4**: Colors are mostly disciplined with minor issues
* **3**: Colors are acceptable but not refined
* **2**: Colors have clear issues (too many, inconsistent)
* **1**: Color usage is poor
* **0**: No color discipline

### 7. Contrast

**Questions:**
* Is important text easily readable?
* Are muted labels still legible?
* Are CTA buttons visually distinct and clear?
* Is there sufficient contrast between background and foreground?
* Are hover states clear?

**Scoring:**
* **5**: Contrast is excellent throughout
* **4**: Contrast is good with minor issues
* **3**: Contrast is acceptable
* **2**: Contrast has clear issues (hard to read)
* **1**: Contrast is poor
* **0**: Contrast fails accessibility standards

### 8. Empty Space

**Questions:**
* Does the design use whitespace to create clarity?
* Is the screen overloaded with content?
* Are there areas where the eye can rest?
* Does empty space guide attention to key elements?

**Scoring:**
* **5**: Whitespace used expertly to create clarity
* **4**: Whitespace used well with minor inefficiencies
* **3**: Whitespace acceptable but not strategic
* **2**: Whitespace poorly used (too much or too little)
* **1**: Whitespace misuse is obvious
* **0**: No apparent use of whitespace

### 9. Brand Fit

**Questions:**
* Does it feel like Proben (meeting readiness tool)?
* Does it avoid generic AI SaaS look?
* Does it communicate "meeting readiness" without words?
* Is it premium, calm, and structured rather than chaotic?
* Does it look like it was designed, not generated?

**Scoring:**
* **5**: Perfect brand fit, unique and credible
* **4**: Good brand fit with minor generic elements
* **3**: Acceptable brand fit but not distinctive
* **2**: Weak brand fit, looks generic
* **1**: Poor brand fit, wrong feel
* **0**: No brand alignment

### 10. Taste Verdict

**Overall Assessment:**

**Excellent (5 average)** — Design is premium, intentional, and on-brand. Ready to ship.

**Good (4 average)** — Design is strong with minor refinement needed. Ship with confidence.

**Acceptable (3 average)** — Design is functional but not polished. Acceptable for demo, needs refinement.

**Weak (2 average)** — Design has clear issues that should be fixed before sharing.

**Needs Redesign (1 average)** — Design is poor and needs significant work.

## Output Format

```markdown
# Design Taste Review: [Page/Component]

## Overall Verdict
[EXCELLENT / GOOD / ACCEPTABLE / WEAK / NEEDS REDESIGN]

## Dimension Scores
| Dimension | Score | Notes |
|-----------|-------|-------|
| Visual Hierarchy | X/5 | |
| Typography | X/5 | |
| Spacing | X/5 | |
| Rhythm | X/5 | |
| Composition | X/5 | |
| Color Discipline | X/5 | |
| Contrast | X/5 | |
| Empty Space | X/5 | |
| Brand Fit | X/5 | |

## Average Score
X/5

## Strengths
[List what works well]

## Weaknesses
[List what needs improvement]

## Required Fixes
[P0/P1/P2 fixes]
```

## Usage

```bash
/skill design-taste-review

Input: Page/component being reviewed, screenshots
Output: Taste review with scores and recommendations
```

## Related Documentation

* **Design Quality Gates:** `docs/design/DESIGN_QUALITY_GATES.md`
* **Design Review Template:** `docs/design/DESIGN_REVIEW_TEMPLATE.md`
* **Design Quality Reviewer:** `.claude/agents/design-quality-reviewer.md`
* **UI Structure Review:** `.claude/skills/ui-structure-review/SKILL.md`
