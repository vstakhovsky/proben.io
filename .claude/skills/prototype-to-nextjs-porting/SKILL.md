# Prototype to Next.js Porting

**Purpose:** Guide exact porting from prototype source files to Next.js.

## Overview

This skill provides structured guidance for porting the Proben MVP 6 prototype from reference source files to production Next.js code. The goal is exact visual fidelity, not creative reinterpretation.

## When to Use

Invoke this skill when:
- Porting components from `reference/prototypes/proben-mvp-6/`
- Implementing design features based on prototype source
- Translating JSX/React prototype code to Next.js
- Converting prototype CSS to Tailwind/CSS modules

## Source of Truth

**The prototype is always the source of truth:**

1. `reference/prototypes/proben-mvp-6/index.html` - Entry point, routing
2. `reference/prototypes/proben-mvp-6/radar.css` - All design tokens
3. `reference/prototypes/proben-mvp-6/shared.jsx` - Icons, primitives, data
4. `reference/prototypes/proben-mvp-6/LandingMvp5.jsx` - Landing page
5. `reference/prototypes/proben-mvp-6/Mvp6Site.jsx` - Full app structure
6. `reference/prototypes/proben-mvp-6/Mvp6Pages.jsx` - Page components
7. `reference/prototypes/proben-mvp-6/Report.jsx` - Report view
8. `reference/prototypes/proben-mvp-6/Mascot.jsx` - Mascot (optional)

## Instructions

### Step 1: Read Prototype Source First

Before writing any code:
1. Read the relevant prototype file(s)
2. Identify the main component being ported
3. Map out the component hierarchy
4. List CSS classes/tokens used
5. Note any icons or primitives

**What to look for:**
- Component name and structure
- Props and data flow
- CSS classes and inline styles
- Design tokens (var(--*) references)
- Icons from the Ic object

### Step 2: Identify Main Entry Component

Find the primary component:
- Landing page → `LandingMvp5` in `LandingMvp5.jsx`
- Nav → `Nav5` or `Nav6` in `LandingMvp5.jsx` or `Mvp6Site.jsx`
- Report → `Report5` in `Report.jsx`
- General pages → `Mvp6Pages` components

### Step 3: Map Prototype to Production

Create a mapping:
```
Prototype Component → Production File
----------------------------------------
<LandingMvp5 /> → app/page.tsx
<Nav5 /> → components/Navigation.tsx
<HeroShowcase /> → components/ReadinessPreviewCard.tsx
<HeroDemo /> → (inline in ReadinessPreviewCard.tsx)
```

### Step 4: Port CSS Tokens

**From radar.css, port these tokens:**

**Backgrounds:**
- `--bg-0: #F6F7EF` (main background)
- `--bg-1: #FBFCF6`
- `--bg-2: rgba(228,234,224,0.55)`
- `--panel: #FFFFFF`
- `--card: #FFFFFF`

**Typography:**
- `--ink: #13241C` (primary text)
- `--ink-dim: #2E3C34`
- `--muted: #5F6B63`
- `--serif: 'Hanken Grotesk', system-ui, sans-serif`
- `--sans: 'Hanken Grotesk', system-ui, sans-serif`
- `--mono: 'IBM Plex Mono', ui-monospace, monospace`

**Accents:**
- `--lime: #A6C94A` (primary CTA)
- `--lime-deep: #5B7F34`
- `--lime-glow: rgba(150,185,70,0.18)`
- `--ai: #5563E6` (blue accent)
- `--bp: #8BB7FF` (blueprint blue)

**Status Colors:**
- `--c-good: #4F8A2F` (green)
- `--c-warn: #B5792E` (amber)
- `--c-bad: #C0573A` (red)

**Lines:**
- `--line: #E1E6E0`
- `line-strong: #CAD3CB`

**Shadows:**
- `--shadow-card: 0 20px 50px -32px rgba(40,60,90,0.30)`
- `--shadow-hero: 0 2px 4px ...`

**Spacing:**
- `--r: 12px`
- `--r-lg: 18px`
- `--r-xl: 24px`

### Step 5: Port Component Structure

**Follow the prototype structure exactly:**

1. **Read the prototype JSX**
2. **Copy the element hierarchy**
3. **Map inline styles to CSS or Tailwind**
4. **Preserve text, numbers, labels exactly**

Example from `LandingMvp5.jsx`:
```jsx
<Nav5 onStart={onStart} onSample={onSample} theme={theme} onToggle={onToggle} />
<section className="bp-grid" style={{ borderBottom: '1px solid var(--line)' }}>
  <div style={{ maxWidth: 1240, margin: '0 auto', padding: '60px 36px', display: 'grid', gridTemplateColumns: '1fr 560px', gap: 56 }}>
```

Becomes in Next.js:
```tsx
<Navigation />
<section className="bp-grid" style={{ borderBottom: '1px solid var(--line)' }}>
  <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '60px 36px', display: 'grid', gridTemplateColumns: '1fr 560px', gap: '56px' }}>
```

### Step 6: Avoid Redesigning

**DO NOT:**
- Change font families because you "prefer" another
- Adjust spacing because it "looks better"
- Reorder elements because it "flows better"
- Simplify complex structures
- Approximate when exact is possible

**DO:**
- Port exact text, numbers, labels
- Match exact spacing, padding, gaps
- Use exact colors from design tokens
- Preserve exact layout hierarchy

### Step 7: Keep Source-of-Truth Comments

Add comments in code where helpful:
```tsx
{/* Ported from LandingMvp5.jsx lines 430-577 */}
{/* Hero section - matches prototype structure */}
{/* 5 CHECKS from HERO_CHECKS in shared.jsx */}
```

### Step 8: Capture Screenshot Evidence

After implementation:
1. Start dev server: `npm run dev`
2. Capture screenshot: `npx playwright screenshot http://localhost:3000 path/to/screenshot.png`
3. Save screenshot to: `test-results/visual-review/`
4. Document: What was ported, from which file, any blockers

### Step 9: Never Mark Accepted Without Review

**Your output status can only be:**
- `IMPLEMENTED` - Code written, screenshot captured
- `NEEDS REVIEW` - Blockers encountered, approximations required

**DO NOT mark work as:**
- `ACCEPTED` - You cannot approve your own work
- `DONE` - Human review is required
- `COMPLETE` - Visual verification is pending

## Common Pitfalls

### ❌ Don't Do This

```tsx
// Approximating spacing because "close enough"
<div style={{ padding: '20px' }}>  {/* Prototype says 60px 36px */}
```

```tsx
// Using different font
<h1 style={{ fontFamily: 'sans-serif' }}>  {/* Prototype says Hanken Grotesk */}
```

```tsx
// Reordering elements
<Button>Cta</Button>  {/* Prototype says icon first: <Btn icon={...}>Cta</Btn> */}
```

### ✅ Do This Instead

```tsx
// Exact spacing from prototype
<div style={{ padding: '60px 36px' }}>
```

```tsx
// Exact font from design token
<h1 style={{ fontFamily: 'var(--serif)' }}>
```

```tsx
// Exact element order from prototype
<Btn icon={<Ic.arrow />}>Cta</Btn>
```

## Quick Reference

**Typography Classes:**
- `.mono` - Uppercase, 0.16em letter-spacing, 11px
- `.serif` - 700 weight, -0.025em letter-spacing

**CSS Classes:**
- `.bp-card` - Blueprint card with border and gradient
- `.bp-grid` - Grid pattern background
- `.fade-up` - Fade-up animation
- `.pop-in` - Pop-in animation

**Design Tokens - Most Used:**
- `var(--ink)` - Primary text
- `var(--muted)` - Secondary text
- `var(--lime)` - Primary CTA background
- `var(--c-good)`, `var(--c-warn)`, `var(--c-bad)` - Status colors
- `var(--line)` - Default border
- `var(--shadow-hero)` - Hero card shadow

## Output Template

After completing work, output:

```
Status: IMPLEMENTED / NEEDS REVIEW

Source Files:
- reference/prototypes/proben-mvp-6/[file].jsx (lines X-Y)

Production Files:
- app/page.tsx (modified)
- components/[Component].tsx (created)

Screenshots:
- test-results/visual-review/[feature]-after.png

Notes:
- Ported exact structure from prototype
- All design tokens mapped from radar.css
- [Any blockers or approximations]
```

---

**Remember:** This is porting, not redesigning. The prototype is the source of truth. Human visual review is the final gate.
