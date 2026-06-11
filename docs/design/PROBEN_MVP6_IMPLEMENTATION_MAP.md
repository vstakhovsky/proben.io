# Proben MVP 6 Implementation Map

## Source Files Analyzed

| File | Purpose | Key Content |
|------|---------|-------------|
| index.html | Entry point | Mounts React app, loads scripts in order |
| radar.css | Design tokens | Full "Context Radar" design system (light/dark) |
| shared.jsx | Primitives | Icons, Logo, Pill, Btn, Card, ScoreRing, ScoreBar, sample data |
| LandingMvp5.jsx | Landing page | Hero, readiness preview, sections, chips |
| Mvp6Site.jsx | Full site | Nav5/Nav6, routing, mega-menus, blog, changelog |
| Mascot.jsx | Mascot | Stacky mascot with states (idle, scanning, gap, etc.) |

## Component Mapping: Prototype → Next.js

| Prototype Component | Next.js Component | Status |
|---------------------|-------------------|--------|
| Nav5 | components/Navigation.tsx | ⚠️ Needs update for pill design |
| Logo | In Navigation.tsx | ✅ Exists |
| Pill | components/Pill.tsx | ✅ Exists |
| Btn | Inline/Link | ✅ Exists |
| HeroShowcase | components/ReadinessPreviewCard.tsx | ✅ Exists |
| HeroDemo | In ReadinessPreviewCard.tsx | ✅ Exists |
| ContextGapSection | In app/page.tsx | ⚠️ Partial |
| FloatingAskButton | components/FloatingAskButton.tsx | ✅ Exists |
| Mascot | Optional | ❌ Not MVP priority |

## Acceptance Criteria

### Visual Elements
- ✅ Rounded pill header with blur backdrop
- ✅ Proben logo + "MEETING READINESS" subtitle
- ✅ Nav: Sample report, How it works, Checks, Resources, Pricing
- ✅ Theme toggle button
- ✅ "Log in" button
- ✅ "Run readiness check" CTA in header
- ✅ Light grid background (bp-grid pattern)
- ✅ Badge: "CONTEXT READINESS BEFORE IMPORTANT MEETINGS"
- ✅ H1: "Know what to fix before the meeting starts."
- ✅ Subtitle with **bold terms**
- ✅ Primary CTA (lime green)
- ✅ Secondary CTA (ghost)
- ✅ Trust note with shield
- ✅ Right readiness report preview card (score 6.2/10, 5 checks, 3 gaps)
- ✅ Bottom chips strip
- ✅ Floating "Ask about this page" button

### Functional Requirements
- ✅ "Run readiness check" links to /app/readiness-check
- ✅ "See sample report" links to /sample-report
- ✅ Header anchors work for sections
- ✅ No broken visible CTAs

## Implementation Notes

- Mascot (Stacky) is optional - NOT MVP priority
- Theme toggle is nice-to-have but not blocking for MVP
- The animated context gap diagram is complex - placeholder acceptable for MVP
- Target route is / (landing page)
- Prototype uses inline SVG icons - Next.js uses emoji equivalents for MVP
