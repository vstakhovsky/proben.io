# Generic SaaS Rejection Rules

## Purpose

Define patterns and indicators that signal generic SaaS output versus Proben MVP 6 design direction. Prevent "good enough" implementations that lack brand character.

## Core Principle

> **"Reasonable alternative" is NOT sufficient.** For Phase 2.1, the target is Proben MVP 6 visual direction, not a generic "clean SaaS" look.

## Automatic Rejection Patterns

### Navbar Patterns

**REJECT if:**

❌ **Full-width navbar**
- Bootstrap-style top navigation bar
- Logo, links, CTA in single horizontal bar
- No pill container
- Typical of admin dashboards

❌ **Left-aligned logo with simple links**
- Logo on left
- Simple text links below or beside
- No visual hierarchy
- Lacks premium feel

❌ **Right-aligned CTA only**
- Logo left, CTA right
- Nothing in middle or no visual structure
- Generic landing page pattern

**ACCEPT (Proben MVP 6):**

✅ **Rounded pill container**
- Pill-shaped header container
- Logo + "MEETING READINESS" subtitle
- Navigation items in pill
- Vertical dividers for structure
- CTAs on right side with button between

---

### Card Patterns

**REJECT if:**

❌ **Generic white cards with shadow**
- White card with box-shadow
- Generic border radius
- No visual personality
- Bootstrap/Material style

❌ **Template feel without personality**
- Looks like any SaaS product
- Could be from any company
- No brand character
- Template-like spacing

**ACCEPT (Proben MVP 6):**

✅ **Proben MVP 6 card style**
- Specific card structure defined in prototype
- Context header with status
- Score display with specific styling
- Progress bars with specific colors
- Context gaps section
- Top fix section
- Practice moment link

---

### CTA Patterns

**REJECT if:**

❌ **Generic blue/purple primary CTA**
- Bootstrap blue (#0d6efd or similar)
- Generic purple
- "Get Started" without context
- Full-width hero CTA only

❌ **"Get Started" without context**
- Generic CTA text without product specificity
- Could be for any SaaS product
- No connection to value proposition

**ACCEPT (Proben MVP 6):**

✅ **Green CTA in specific positions**
- Brand green (#10B981)
- "Run readiness check" (specific action)
- Header CTA + Hero CTA (both present)
- Specific size and padding

---

### Typography Patterns

**REJECT if:**

❌ **System font only, no personality**
- All system-ui fonts
- No font weight variation
- Generic sans-serif headings
- No editorial feel

❌ **Generic sans-serif headings**
- All headings in same sans-serif
- No hierarchy through font
- Template-like spacing

**ACCEPT (Proben MVP 6):**

✅ **Serif headlines with premium editorial feel**
- Georgia or serif for headlines (H1, H2)
- Sans-serif for body text
- Font weight variation for hierarchy
- Premium editorial tone

---

### Hero Patterns

**REJECT if:**

❌ **Generic hero with center alignment**
- Full-width hero section
- Centered text and CTA
- Generic gradient background
- No visual personality

❌ **Two-column layout with generic cards**
- Standard SaaS hero layout
- Feature boxes in grid
- No visual hierarchy
- Template feel

**ACCEPT (Proben MVP 6):**

✅ **Left-column hero with right-side preview card**
- Specific badge with green/amber colors
- H1 with specific copy
- Bold phrases in subtitle
- Dual CTAs (green primary, white secondary)
- Trust note below CTAs
- Right-side readiness preview card with specific structure

---

### Color Patterns

**REJECT if:**

❌ **Generic blue/purple primary**
- Bootstrap blue (#0d6efd)
- Generic purple (#6366f6 or similar)
- No brand color identity

❌ **Template color schemes**
- Default MUI/Material colors
- Default Bootstrap colors
- No brand color palette

**ACCEPT (Proben MVP 6):**

✅ **Brand green (#10B981) for CTAs**
- Specific amber/green for status badges
- Specific colors for progress bars
- Brand-consistent palette

---

## Layout Patterns

**REJECT if:**

❌ **Standard grid layouts**
- 3-column feature grid
- 4-column testimonial grid
- Generic spacing
- Template feel

❌ **Generic hero + feature list**
- Full-width hero
- List of features below
- No visual hierarchy
- Template feel

**ACCEPT (Proben MVP 6):**

✅ **Specific layouts with character**
- Two-column hero (45%/50% with gap)
- Preview card with specific structure
- Specific spacing (64px header gap, 32px column gap)
- Editorial proportions

---

## Detection Methods

### Visual Inspection

Review screenshots for:
- Navbar shape (pill vs full-width)
- Card styling (generic vs specific)
- Typography (generic sans-serif vs serif headlines)
- Colors (brand green vs generic blue/purple)
- Layout (template vs specific)

### Evidence Comparison

**For acceptance, evidence must show:**
1. Rounded pill header container (not full-width)
2. "MEETING READINESS" subtitle visible
3. Green CTAs with specific text
4. Serif headlines for premium feel
5. Proben MVP 6 card structure
6. Brand green color palette
7. Specific two-column hero layout

### DOM Tests

**Automatic rejection if:**
- Generic classes detected (bootstrap, material-ui, etc.)
- Generic CTA text ("Get Started" without context)
- Wrong CTA color (blue/purple instead of green)
- Full-width navbar structure

---

## Rejection Process

### 1. Pattern Detection

During visual review or DOM testing, check for:
- Generic navbar patterns
- Generic card patterns
- Generic CTA patterns
- Generic typography patterns
- Generic color schemes
- Template layouts

### 2. Evidence Comparison

Compare current implementation against:
- Target screenshot
- Proben MVP 6 design specifications
- DESIGN_ACCEPTANCE_POLICY.md requirements

### 3. Apply Decision

**If generic patterns detected:**
- Document specific generic elements in review
- Score dimension for Prototype Similarity ≤ 2/5
- Apply overall score cap if warranted
- Verdict: NEEDS_REWORK or REJECTED

### 4. Record Learning

If generic patterns led to rejection:
- Update LESSONS_LEARNED.md
- Consider updating design tokens
- Add generic pattern to DOM blockers if recurring

---

## Examples

### REJECTED — Generic Navbar

```
What we saw:
<nav class="navbar navbar-expand-lg">
  <div class="container">
    <a class="navbar-brand" href="/">Proben</a>
    <ul class="navbar-nav me-auto">
      <li><a href="/sample-report">Sample Report</a></li>
      <li><a href="#how-it-works">How It Works</a></li>
    </ul>
    <a class="btn btn-primary" href="/app/readiness-check">Get Started</a>
  </div>
</nav>
```

**Why REJECTED:** Full-width Bootstrap navbar, generic SaaS pattern, no pill shape.

---

### ACCEPTED — Pill Header

```
What we saw:
<nav class="sticky top-0">
  <div class="max-w-6xl mx-auto px-4">
    <div class="inline-flex items-center gap-4 px-6 py-3 bg-white border border-gray-200 rounded-full mt-4">
      <a href="/" class="flex flex-col">
        <span class="font-serif text-xl">Proben</span>
        <span class="text-xs text-gray-500">MEETING READINESS</span>
      </a>
      <!-- nav items with dividers -->
      <!-- theme button, log in, green CTA -->
    </div>
  </div>
</nav>
```

**Why ACCEPTED:** Rounded pill container, logo + subtitle, proper structure, Proben MVP 6 direction.

---

## Related Documentation

- **[DESIGN_ACCEPTANCE_POLICY.md](DESIGN_ACCEPTANCE_POLICY.md)** — Acceptance policy
- **[DESIGN_PARITY_RUBRIC.md](DESIGN_PARITY_RUBRIC.md)** — Scoring rubric
- **[UI_SLICE_ACCEPTANCE_CHECKLIST.md](UI_SLICE_ACCEPTANCE_CHECKLIST.md)** - Slice checklist
- **[../qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md](../qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md)** - Evidence pipeline

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Authority:** Design Reviewer
