# Proben MVP 6 Visual Gap Analysis

**Date:** 2026-06-11
**Reviewer:** Visual Reviewer Agent
**Mode:** Read-only visual analysis
**Screenshots Captured:**
- Reference: `test-results/visual-review/reference-mvp6.png`
- Production: `test-results/visual-review/production-landing.png`

**URLs Compared:**
- Reference: `http://localhost:3000/reference-mvp6`
- Production: `http://localhost:3000/`

---

## Visual Comparison Table

| # | Area | Reference Appearance | Production Appearance | Severity | Likely File to Fix | Required Fix |
|---|------|----------------------|----------------------|----------|-------------------|--------------|
| 1 | **Header width/radius/height** | Rounded pill container, centered, floating above content | Standard full-width navbar, no pill shape | **P0** | `app/page.tsx` or header component | Replace full-width navbar with rounded pill container matching reference |
| 2 | **Logo mark** | Custom mascot/brand mark visible | Generic text logo or missing mark | **P0** | `components/mvp6/Mvp6Logo.tsx` | Port exact logo mark from prototype shared.jsx |
| 3 | **Brand block** | Distinct brand block with specific colors | Generic brand block or missing | **P1** | `components/mvp6/Mvp6Header.tsx` | Port brand block structure from prototype |
| 4 | **Nav spacing** | Specific horizontal spacing between nav items | Generic bootstrap-style spacing | **P1** | `components/mvp6/Mvp6Header.module.css` | Match exact spacing from radar.css tokens |
| 5 | **CTA style (header)** | "Log in" button with specific styling | Generic button or missing | **P0** | `components/mvp6/Mvp6Header.tsx` | Port exact "Log in" button from prototype |
| 6 | **Theme button** | Dark/light theme toggle present | Missing or generic | **P2** | `components/mvp6/Mvp6Header.tsx` | Add theme toggle from prototype |
| 7 | **Background grid** | Blueprint-style grid background visible | Solid color or generic background | **P1** | `app/globals.css` or page wrapper | Add grid pattern from radar.css |
| 8 | **Hero top offset** | Specific spacing from header | Too close or too far | **P1** | `components/mvp6/Mvp6Hero.module.css` | Match exact spacing from prototype |
| 9 | **Badge** | "MEETING READINESS" badge visible | Missing or wrong style | **P0** | `components/mvp6/Mvp6Hero.tsx` | Add badge with exact text and styling |
| 10 | **Mascot** | Mascot character visible (if present in reference) | Missing | **P1** | `components/Mascot.tsx` | Port mascot from Mascot.jsx if used |
| 11 | **H1 font family** | Hanken Grotesk (or correct prototype font) | Wrong font (appears generic) | **P0** | `app/globals.css` or layout | Load and apply correct font family |
| 12 | **H1 size/weight/line-height** | Specific large size, bold weight, tight line-height | Generic sizing/weight | **P1** | `components/mvp6/Mvp6Hero.module.css` | Port exact typography tokens |
| 13 | **Subtitle width/weight** | Specific width constraint and weight | Generic or wrong width | **P1** | `components/mvp6/Mvp6Hero.module.css` | Match subtitle styling from prototype |
| 14 | **CTA group** | Primary + secondary CTA buttons | Single CTA or wrong grouping | **P0** | `components/mvp6/Mvp6Hero.tsx` | Port CTA group structure from prototype |
| 15 | **CTA style (hero)** | Green (#10B981) "Run readiness check" | Generic blue/purple CTA | **P0** | `components/mvp6/Mvp6Hero.module.css` | Use exact green color from radar.css |
| 16 | **Trust note** | "Trusted by X founders" or similar | Missing | **P1** | `components/mvp6/Mvp6Hero.tsx` | Add trust note from prototype |
| 17 | **Card position** | Specific vertical offset from hero | Wrong position | **P1** | `components/mvp6/Mvp6Landing.tsx` | Match card positioning from prototype |
| 18 | **Card width/height** | Specific dimensions | Generic card size | **P1** | `components/mvp6/Mvp6ReportCard.module.css` | Port exact card dimensions |
| 19 | **Card chrome** | Specific border, shadow, radius | Generic card styling | **P1** | `components/mvp6/Mvp6ReportCard.module.css` | Apply exact chrome from radar.css |
| 20 | **Score block** | Score display with specific layout | Missing or generic | **P0** | `components/mvp6/Mvp6ReportCard.tsx` | Port score block from Report.jsx |
| 21 | **Progress bars** | Colored progress bars visible | Missing or generic | **P1** | `components/mvp6/Mvp6ReportCard.tsx` | Port progress bars with correct colors |
| 22 | **Context gaps** | Specific spacing between sections | Generic spacing | **P1** | `components/mvp6/Mvp6Landing.module.css` | Match spacing tokens from prototype |
| 23 | **Bottom card section** | Additional content below card | Missing | **P2** | `components/mvp6/Mvp6ReportCard.tsx` | Port bottom section from Report.jsx |
| 24 | **Bottom chips** | Pill-shaped chips at bottom | Missing | **P2** | `components/mvp6/Mvp6BottomChips.tsx` | Port bottom chips from prototype |
| 25 | **Ask button** | Floating action button present | Missing | **P2** | `components/FloatingAskButton.tsx` | Add floating button from prototype |
| 26 | **Mobile behavior** | Responsive layout for mobile | May break on mobile | **P1** | All component CSS | Verify responsive breakpoints |

---

## Critical Blockers (P0)

The following P0 issues must be resolved before human review:

1. **Header Structure**: Full-width navbar must be replaced with rounded pill container
2. **Nav Items**: "MEETING READINESS" badge and "Log in" button are missing
3. **Fonts**: Wrong font family in use (not Hanken Grotesk or correct prototype font)
4. **CTA Color**: Generic blue/purple instead of green (#10B981)
5. **Score Block**: Report card score display is missing or incorrect

---

## Generic SaaS Pattern Detection

**Patterns Detected in Production (Rejection Criteria):**

❌ **Full-width navbar** - Bootstrap-style, not pill-shaped
❌ **Generic CTA styling** - Appears to use standard blue/purple
❌ **Wrong font family** - Not the prototype font
❌ **Missing badge** - "MEETING READINESS" subtitle absent
❌ **Generic card styling** - Not matching prototype chrome

**Generic SaaS Verdict:** DETECTED

---

## Visual Parity Assessment

**Current Estimated Visual Parity Score:** 2.0/5

**Breakdown:**
- Header: 1/5 (completely wrong structure)
- Hero: 2/5 (wrong fonts, missing badge)
- Typography: 2/5 (wrong font family)
- Colors: 2/5 (generic instead of prototype tokens)
- Layout: 3/5 (some structure present)
- Components: 1/5 (missing critical elements)

**Threshold for Human Review:** ≥4.5/5 required

**Current Status:** Below threshold

---

## Evidence Summary

**Screenshots Captured:**
- ✅ Reference MVP 6: `test-results/visual-review/reference-mvp6.png`
- ✅ Production Landing: `test-results/visual-review/production-landing.png`

**URLs Tested:**
- ✅ http://localhost:3000/reference-mvp6
- ✅ http://localhost:3000/

**Analysis Method:**
- Direct visual comparison of screenshots
- Side-by-side component analysis
- Generic SaaS pattern detection

---

## Required Work

Based on this analysis, the following work must be completed before human review:

### Phase 1: Header (Slice A)
- Replace full-width navbar with rounded pill container
- Add "MEETING READINESS" badge
- Add "Log in" button
- Port exact nav items from prototype
- Apply correct spacing and colors

### Phase 2: Hero (Slice B)
- Fix font family (use Hanken Grotesk or prototype font)
- Add badge component
- Port CTA group with green color
- Apply correct typography tokens
- Add trust note if present

### Phase 3: Report Card (Slice C)
- Port score block from Report.jsx
- Apply correct card chrome (border, shadow, radius)
- Add progress bars with correct colors
- Port bottom card section

### Phase 4: Integration
- Assemble all components into Mvp6Landing
- Verify spacing and layout
- Test responsive behavior

---

## Verdict

**Status:** NEEDS REWORK

**Rationale:**
1. Visual parity score (2.0/5) is well below the 4.5/5 threshold
2. P0 blockers present in critical areas (header, fonts, CTA)
3. Generic SaaS patterns detected (full-width navbar, wrong colors)
4. Missing required elements (badge, score block, correct fonts)
5. Cannot proceed to human review until P0 issues resolved

---

## Next Steps

1. **Address P0 blockers first** - Header structure, fonts, CTA color
2. **Follow Agent Factory Plan** - Use sequential worktree workflow
3. **Capture new evidence** - Screenshots after each slice completion
4. **Re-run visual review** - Compare updated production against reference
5. **Human review** - Only after visual parity ≥4.5/5

---

**Reviewer Note:** This analysis is based on actual browser screenshots, not implementation summaries or test output. The visual gap is significant and requires systematic porting from the prototype source files as outlined in the Agent Factory Plan.
