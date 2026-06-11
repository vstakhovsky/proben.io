# Proben MVP 6 Agent Factory Plan

**Status:** Planning Phase
**Created:** 2026-06-11
**Phase:** 2.1 - Design Parity with Proben MVP 6

## Executive Summary

Previous attempts to port Proben MVP 6 failed because:
- One agent tried to port the entire design at once
- Build/import errors caused main UI file reverts
- Green summaries were produced without visible browser progress
- No visual evidence was captured before claims

**New Strategy:** Controlled parallel worktree workflow with bounded scope, one agent per component, source-first approach, and evidence-based acceptance.

## Source of Truth

**Reference Directory:** `reference/prototypes/proben-mvp-6/`

**Required Source Files (All agents MUST read these first):**

```
reference/prototypes/proben-mvp-6/
├── index.html           # Entry point and structure
├── radar.css            # All design tokens (colors, typography, spacing, shadows)
├── shared.jsx           # Icons, primitives, sample data
├── Mvp6Site.jsx         # Full app with navigation and routing
├── Mvp6Pages.jsx        # Page components
├── LandingMvp5.jsx      # Landing page implementation
├── Report.jsx           # Report component
├── Mascot.jsx           # Mascot (optional)
└── README.md            # Documentation
```

**Hard Rule:** No agent may begin implementation until they have read and referenced the actual source files. Text descriptions alone are insufficient.

## 1. Worktree Plan

### Worktree Structure

```bash
# Base worktree for reference implementation
.claude/worktrees/mvp6-reference/

# Component-specific worktrees
.claude/worktrees/mvp6-header/
.claude/worktrees/mvp6-hero/
.claude/worktrees/mvp6-card/
.claude/worktrees/mvp6-integration/
```

### Worktree Creation Commands

```bash
# Reference worktree
git worktree add .claude/worktrees/mvp6-reference -b mvp6/reference-main

# Header worktree  
git worktree add .claude/worktrees/mvp6-header -b mvp6/header-component

# Hero worktree
git worktree add .claude/worktrees/mvp6-hero -b mvp6/hero-component

# Report card worktree
git worktree add .claude/worktrees/mvp6-card -b mvp6/card-component

# Integration worktree
git worktree add .claude/worktrees/mvp6-integration -b mvp6/integration-main
```

### Worktree Rules

1. **One agent per worktree** - No parallel agents in same worktree
2. **Isolated branches** - Each worktree on its own branch
3. **Source prototype read-only** - Never modify reference files
4. **Main branch protected** - No direct commits to main
5. **Merge order enforced** - Follow sequential merge order

## 2. Agent Task Matrix

### Reference Agent

**Role:** Port reference implementation for inspection and planning

**Worktree:** `mvp6-reference`

**Files to Create:**
- `app/reference-mvp6/page.tsx`
- `components/mvp6-reference/Mvp6Reference.tsx`
- `components/mvp6-reference/Mvp6Reference.module.css`

**Task:**
1. Read all source prototype files
2. Create a reference route that renders the MVP 6 design as-is
3. Port CSS tokens from radar.css to CSS modules
4. Document mapping of prototype patterns to Next.js patterns
5. Create visual reference document

**Output:** `IMPLEMENTED` or `NEEDS_REVIEW`

**Cannot Output:** `ACCEPTED`, `DONE`, `READY`, `COMPLETE`

**Evidence Required:**
- Screenshot of reference route
- List of source files read
- CSS token mapping document
- Visual reference document

---

### Header Agent

**Role:** Port header component from MVP 6

**Worktree:** `mvp6-header`

**Files to Own:**
- `components/mvp6/Mvp6Header.tsx`
- `components/mvp6/Mvp6Header.module.css`
- `components/mvp6/Mvp6Logo.tsx`
- `components/mvp6/Mvp6Logo.module.css`

**Task:**
1. Read header-related code from prototype (Mvp6Site.jsx, shared.jsx)
2. Read radar.css for header tokens (colors, spacing, typography)
3. Port exact structure, spacing, colors
4. Do NOT invent "similar" generic navbar
5. Preserve pill shape, "MEETING READINESS" subtitle, nav items

**Output:** `IMPLEMENTED` or `NEEDS_REVIEW`

**Cannot Output:** `ACCEPTED`, `DONE`, `READY`

**Evidence Required:**
- Screenshot of header in browser
- Source files read list
- Specific differences from prototype (if any)
- Build passes (no import/export errors)

---

### Hero Agent

**Role:** Port hero section from MVP 6

**Worktree:** `mvp6-hero`

**Files to Own:**
- `components/mvp6/Mvp6Hero.tsx`
- `components/mvp6/Mvp6Hero.module.css`
- `components/mvp6/Mvp6BottomChips.tsx`
- `components/mvp6/Mvp6BottomChips.module.css`

**Task:**
1. Read hero-related code from LandingMvp5.jsx
2. Read radar.css for hero tokens
3. Port exact layout, typography hierarchy, CTA styling
4. Preserve visual density and spacing
5. Do NOT substitute generic hero pattern

**Output:** `IMPLEMENTED` or `NEEDS_REVIEW`

**Evidence Required:**
- Screenshot of hero section
- Source files read list
- Typography and spacing mapping
- Build passes

---

### Report Card Agent

**Role:** Port report card component from MVP 6

**Worktree:** `mvp6-card`

**Files to Own:**
- `components/mvp6/Mvp6ReportCard.tsx`
- `components/mvp6/Mvp6ReportCard.module.css`

**Task:**
1. Read Report.jsx from prototype
2. Read shared.jsx for icons/primitives
3. Port card structure, scoring display, visual hierarchy
4. Preserve exact colors (lime, blueprint blue, etc.)
5. Do NOT create generic card component

**Output:** `IMPLEMENTED` or `NEEDS_REVIEW`

**Evidence Required:**
- Screenshot of report card
- Source files read list
- Color token mapping
- Build passes

---

### Integration Agent

**Role:** Integrate all components into landing page

**Worktree:** `mvp6-integration`

**Files to Own:**
- `components/mvp6/Mvp6Landing.tsx`
- `components/mvp6/Mvp6Landing.module.css`
- `app/page.tsx`

**Task:**
1. Read Mvp6Site.jsx and LandingMvp5.jsx
2. Integrate Header, Hero, ReportCard components
3. Preserve overall layout structure from prototype
4. Ensure no build errors
5. Do NOT redesign layout

**Output:** `IMPLEMENTED` or `NEEDS_REVIEW`

**Evidence Required:**
- Screenshot of full landing page
- Source files read list
- Build passes
- All components integrated

---

### Visual Reviewer Agent

**Role:** Independent visual QA, not implementation

**Worktree:** Read-only (uses main branch or integration worktree)

**Files to Read:** All created component files

**Task:**
1. Read prototype source files
2. Capture screenshots of current implementation
3. Compare side-by-side with prototype
4. Document specific visual differences
5. Detect generic SaaS patterns

**Output Options:**
- `ACCEPTED` - Only if human visual approval obtained
- `NEEDS_REWORK` - Specific blockers listed
- `REJECTED` - Generic patterns detected or major mismatch

**Evidence Required:**
- Target screenshot (from prototype)
- Current screenshot (from browser)
- Side-by-side comparison
- Specific differences listed
- Verdict with evidence

**Cannot:**
- Allow ACCEPTED without human visual review
- Write code
- Modify files

## 3. File Ownership Map

### Reference Agent Ownership

```
app/reference-mvp6/
├── page.tsx                              # Reference route entry
components/mvp6-reference/
├── Mvp6Reference.tsx                     # Reference component
├── Mvp6Reference.module.css              # Ported radar.css tokens
└── VISUAL_REFERENCE.md                   # Visual reference doc

app/globals.css                           # ONLY if MVP 6 global styles needed
```

### Header Agent Ownership

```
components/mvp6/
├── Mvp6Header.tsx                        # Header component
├── Mvp6Header.module.css                 # Header styles
├── Mvp6Logo.tsx                          # Logo component
└── Mvp6Logo.module.css                   # Logo styles
```

### Hero Agent Ownership

```
components/mvp6/
├── Mvp6Hero.tsx                          # Hero section
├── Mvp6Hero.module.css                   # Hero styles
├── Mvp6BottomChips.tsx                   # Bottom chips/pills
└── Mvp6BottomChips.module.css            # Chip styles
```

### Report Card Agent Ownership

```
components/mvp6/
├── Mvp6ReportCard.tsx                    # Report card
└── Mvp6ReportCard.module.css             # Card styles
```

### Integration Agent Ownership

```
components/mvp6/
├── Mvp6Landing.tsx                       # Landing page composition
└── Mvp6Landing.module.css                # Landing layout

app/
└── page.tsx                              # Main landing route
```

### Visual Reviewer Ownership (Read-Only)

```
# Reads all above files
# Creates review artifacts in:
test-results/visual-review/
├── phase-2-1-slice-[A-D]-target.png      # Prototype screenshot
├── phase-2-1-slice-[A-D]-current.png     # Current screenshot
├── phase-2-1-slice-[A-D]-comparison.html # Side-by-side report
└── phase-2-1-slice-[A-D]-verdict.md      # Visual verdict
```

## 4. Merge Order

### Sequential Integration Path

```
1. Reference Worktree (mvp6-reference)
   ↓
   Merge to main after reference route verified
   ↓
2. Header Worktree (mvp6-header)
   ↓
   Merge to main after header verified
   ↓
3. Hero Worktree (mvp6-hero)
   ↓
   Merge to main after hero verified
   ↓
4. Report Card Worktree (mvp6-card)
   ↓
   Merge to main after card verified
   ↓
5. Integration Worktree (mvp6-integration)
   ↓
   Merge to main after full page verified
   ↓
6. Visual QA
   ↓
   Human review and approval
   ↓
7. Preview Deploy (ONLY after approval)
```

### Merge Rules

1. **No parallel merges to main** - Sequential only
2. **Build must pass** - No merge with build errors
3. **Visual evidence required** - Screenshot must exist
4. **Slice A (Header) gates Slice B** - No hero until header approved
5. **Human approval gates deploy** - No Vercel without human sign-off

### Merge Commands

```bash
# After each worktree completes:
git checkout main
git merge mvp6/[component-name]
git push origin main

# If merge conflicts:
# Stop and investigate
# Do not force merge
# Fix conflicts in worktree, then retry merge
```

## 5. Hard Rules

### For All Agents

1. **No agent may write ACCEPTED** - Only humans approve
2. **No agent may write READY FOR VERCEL** - No deployment prep
3. **All agents return NEEDS HUMAN REVIEW** - Default status
4. **Source prototype files MUST be read** - Text descriptions insufficient
5. **Evidence before claims** - Screenshot required for status

### Build Rules

6. **If build fails, stop** - Isolate and fix import/export error before continuing
7. **No revert of main UI files** - If work breaks main, investigate in worktree
8. **No "try again" without specific blockers** - No blind retries

### Visual Rules

9. **If browser does not visually change, stop** - No effective change made
10. **If only docs/reports changed, stop** - Must have code changes
11. **Human visual review overrides all agent summaries** - Human wins always

### Generic SaaS Detection

12. **Generic navbar detected = NEEDS_REWORK** - Full-width navbars rejected
13. **Generic CTA detected = NEEDS_REWORK** - Standard blue buttons rejected
14. **Wrong font detected = NEEDS_REWORK** - Must use Hanken Grotesk or IBM Plex Mono
15. **Wrong colors detected = NEEDS_REWORK** - Must use lime, blueprint blue from prototype

## 6. Acceptance Criteria

### A Slice Is NOT Accepted Until:

1. ✅ **Relevant component exists** - File created and committed
2. ✅ **Build passes** - No import/export errors, no type errors
3. ✅ **Browser loads** - Route accessible, no runtime errors
4. ✅ **Screenshot exists** - Visual evidence captured
5. ✅ **Human says it matches** - Human visual approval obtained

### Evidence Package Per Slice

```json
{
  "slice": "A - Header",
  "status": "NEEDS_HUMAN_REVIEW",
  "components": ["Mvp6Header", "Mvp6Logo"],
  "sourceFilesRead": [
    "reference/prototypes/proben-mvp-6/Mvp6Site.jsx",
    "reference/prototypes/proben-mvp-6/shared.jsx",
    "reference/prototypes/proben-mvp-6/radar.css"
  ],
  "screenshots": {
    "target": "test-results/visual-review/phase-2-1-slice-a-target.png",
    "current": "test-results/visual-review/phase-2-1-slice-a-current.png"
  },
  "buildStatus": "PASSED",
  "visualParityScore": "TBD - pending human review",
  "differences": [],
  "verdict": "NEEDS_HUMAN_REVIEW"
}
```

### Human Review Protocol

1. **Reviewer opens browser** to `http://localhost:3000`
2. **Reviewer opens prototype** in `reference/prototypes/proben-mvp-6/`
3. **Side-by-side comparison**
4. **Reviewer decision:**
   - "Matches" → Slice ACCEPTED
   - "Does not match" → Specific blockers listed → Slice REJECTED
5. **Human decision is final** - No debate, no override

## 7. Next Prompts Per Worktree

### Reference Worktree Prompt

```
You are the Reference Agent for Proben MVP 6 porting.

Your worktree: .claude/worktrees/mvp6-reference/
Your branch: mvp6/reference-main

Your task:
1. Read ALL source files from reference/prototypes/proben-mvp-6/
2. Create app/reference-mvp6/page.tsx
3. Create components/mvp6-reference/Mvp6Reference.tsx
4. Port CSS tokens from radar.css to CSS modules
5. Document visual reference in components/mvp6-reference/VISUAL_REFERENCE.md

Required source files to read:
- index.html
- radar.css
- shared.jsx
- Mvp6Site.jsx
- Mvp6Pages.jsx
- LandingMvp5.jsx
- Report.jsx
- Mascot.jsx

Evidence required:
- List which source files you read
- Screenshot of reference route
- Visual reference document

Output status: IMPLEMENTED or NEEDS_REVIEW

DO NOT output: ACCEPTED, DONE, READY, COMPLETE
```

### Header Worktree Prompt

```
You are the Header Agent for Proben MVP 6 porting.

Your worktree: .claude/worktrees/mvp6-header/
Your branch: mvp6/header-component

Your task:
1. Read header code from reference/prototypes/proben-mvp-6/Mvp6Site.jsx
2. Read shared.jsx for icons/primitives
3. Read radar.css for header design tokens
4. Port exact header structure to components/mvp6/Mvp6Header.tsx
5. Port exact styling to components/mvp6/Mvp6Header.module.css
6. Create components/mvp6/Mvp6Logo.tsx
7. Create components/mvp6/Mvp6Logo.module.css

Critical requirements:
- Rounded pill header (NOT full-width navbar)
- "MEETING READINESS" subtitle
- "Log in" button
- Nav items: Sample report, How it works, Checks, Resources, Pricing
- NO "Home" nav item
- NO "Build Process" nav item
- Exact colors from radar.css
- Exact spacing from prototype

Evidence required:
- List of source files read
- Screenshot of header in browser
- Build verification (no errors)

Output status: IMPLEMENTED or NEEDS_REVIEW

DO NOT output: ACCEPTED, DONE, READY
DO NOT create generic navbar
DO NOT invent "similar" design
```

### Hero Worktree Prompt

```
You are the Hero Agent for Proben MVP 6 porting.

Your worktree: .claude/worktrees/mvp6-hero/
Your branch: mvp6/hero-component

Your task:
1. Read hero code from reference/prototypes/proben-mvp-6/LandingMvp5.jsx
2. Read radar.css for hero design tokens
3. Port exact hero structure to components/mvp6/Mvp6Hero.tsx
4. Port exact styling to components/mvp6/Mvp6Hero.module.css
5. Create components/mvp6/Mvp6BottomChips.tsx
6. Create components/mvp6/Mvp6BottomChips.module.css

Critical requirements:
- Exact typography hierarchy from prototype
- Exact spacing and layout
- "Run readiness check" CTA
- Green CTA color (#10B981)
- Bottom chips/pills preserved
- Visual density from prototype

Evidence required:
- List of source files read
- Screenshot of hero section
- Typography/spacing mapping
- Build verification

Output status: IMPLEMENTED or NEEDS_REVIEW

DO NOT output: ACCEPTED, DONE, READY
DO NOT create generic hero
DO NOT substitute fonts
```

### Report Card Worktree Prompt

```
You are the Report Card Agent for Proben MVP 6 porting.

Your worktree: .claude/worktrees/mvp6-card/
Your branch: mvp6/card-component

Your task:
1. Read report code from reference/prototypes/proben-mvp-6/Report.jsx
2. Read shared.jsx for icons and primitives
3. Read radar.css for card design tokens
4. Port exact card structure to components/mvp6/Mvp6ReportCard.tsx
5. Port exact styling to components/mvp6/Mvp6ReportCard.module.css

Critical requirements:
- Exact card structure from prototype
- Lime color (#A6C94A) preserved
- Blueprint blue preserved
- Scoring display preserved
- Visual hierarchy from prototype
- Sample data from shared.jsx

Evidence required:
- List of source files read
- Screenshot of report card
- Color token mapping
- Build verification

Output status: IMPLEMENTED or NEEDS_REVIEW

DO NOT output: ACCEPTED, DONE, READY
DO NOT create generic card component
DO NOT change colors
```

### Integration Worktree Prompt

```
You are the Integration Agent for Proben MVP 6 porting.

Your worktree: .claude/worktrees/mvp6-integration/
Your branch: mvp6/integration-main

Your task:
1. Read reference/prototypes/proben-mvp-6/Mvp6Site.jsx
2. Read reference/prototypes/proben-mvp-6/LandingMvp5.jsx
3. Integrate all components into components/mvp6/Mvp6Landing.tsx
4. Update app/page.tsx to use Mvp6Landing
5. Ensure no build errors
6. Verify all components render

Prerequisites:
- Header component must be merged to main
- Hero component must be merged to main
- Report Card component must be merged to main

Critical requirements:
- Overall layout from prototype
- All components integrated
- No build errors
- No runtime errors
- Screenshot of full landing page

Evidence required:
- List of source files read
- Screenshot of full landing page
- Build verification (all tests pass)
- Component verification (all render)

Output status: IMPLEMENTED or NEEDS_REVIEW

DO NOT output: ACCEPTED, DONE, READY
DO NOT redesign layout
DO NOT skip components
```

### Visual Reviewer Prompt

```
You are the Visual Reviewer for Proben MVP 6 porting.

Your role: Independent visual QA, read-only

Your task:
1. Read reference/prototypes/proben-mvp-6/ source files
2. Read all implemented component files
3. Capture screenshot of current implementation
4. Compare side-by-side with prototype
5. Document specific visual differences
6. Detect generic SaaS patterns

Slice A (Header):
- Target: reference/screenshots/proben-mvp-6/hero-target-light-1.png
- Current: Capture from http://localhost:3000
- Required: Pill header, "MEETING READINESS", "Log in", "Run readiness check"
- Forbidden: "Home", "Build Process", full-width navbar

Slice B (Hero):
- Target: [reference screenshot]
- Current: Capture from http://localhost:3000
- Required: Typography hierarchy, green CTA, bottom chips
- Forbidden: Generic hero pattern

Slice C (Report Card):
- Target: [reference screenshot]
- Current: Capture from http://localhost:3000
- Required: Lime color, blueprint blue, scoring display
- Forbidden: Generic card

Visual parity score (1-5 scale):
- 5.0: Exact match
- 4.5-4.9: Minor differences, acceptable
- 4.0-4.4: Noticeable differences, needs review
- 3.0-3.9: Major differences, rework needed
- <3.0: Generic/wrong, rejected

Output options:
- ACCEPTED (only if human visual approval obtained AND parity >= 4.5)
- NEEDS_REWORK (specific blockers listed, parity 3.0-4.4)
- REJECTED (generic patterns, parity <3.0)

Evidence required:
- Target screenshot
- Current screenshot
- Side-by-side comparison
- Specific differences list
- Visual parity score
- Verdict

Cannot:
- Write code
- Modify files
- Allow ACCEPTED without human review

Generic SaaS Detection:
- Full-width navbar → REJECT
- Generic blue CTA → REJECT
- Wrong fonts → REJECT
- Wrong colors → REJECT
- Standard card grid → REJECT
```

## 8. Prevention of Past Failures

### Failure: Build Errors Caused Main UI Reverts

**Prevention:**
- Work in isolated worktrees
- Verify build in worktree before merge
- No merge to main without build passing
- If build fails, fix in worktree, not main

### Failure: Green Summaries Without Browser Progress

**Prevention:**
- Screenshot required for status
- No "looks good" without evidence
- Human visual review is final gate
- Browser state is source of truth

### Failure: One Agent Tried to Port Everything

**Prevention:**
- One agent per bounded scope
- One worktree per agent
- Sequential merge order
- Clear file ownership boundaries

### Failure: Generic SaaS Output

**Prevention:**
- Source prototype must be read
- Exact porting, not "similar" design
- Generic pattern detection
- Human review catches generic output

## 9. Summary

**What This Plan Does:**

1. ✅ Breaks MVP 6 port into bounded scopes
2. ✅ Assigns one agent per scope
3. ✅ Uses isolated worktrees
4. ✅ Requires source prototype reading
5. ✅ Demands visual evidence
6. ✅ Prevents self-approval
7. ✅ Makes human review final
8. ✅ Stops generic SaaS output
9. ✅ Prevents build error cascades
10. ✅ Creates clear merge path

**What This Plan Does NOT Do:**

- ❌ Implement UI (that's next phase)
- ❌ Write green acceptance reports
- ❌ Prepare deployment
- ❌ Add backend/auth/database
- ❌ Burn tokens on broad failed loops

**Next Steps:**

1. Create worktrees
2. Launch Reference Agent in mvp6-reference worktree
3. Reference Agent produces visual reference document
4. Launch Header Agent in mvp6-header worktree
5. Continue sequential merge order
6. Visual Reviewer validates each slice
7. Human approves each slice
8. Preview deploy after all slices approved

**Status:** Ready for worktree creation and agent launch
