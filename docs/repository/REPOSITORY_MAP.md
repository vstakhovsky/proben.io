# Repository Navigation Guide

This guide explains where to find things in the Proben.io repository and how to navigate the project structure.

## Quick Overview

**Proben.io** is a meeting readiness simulator built with:
- **Product:** Next.js 15 + TypeScript + Tailwind CSS
- **Process:** AI-native development with Claude Code agents
- **Quality:** Evidence-based gates with visual parity verification
- **Documentation:** Comprehensive build history and decision logs

---

## Where Product Code Lives

### Frontend Routes (`app/`)

**Purpose:** Next.js App Router pages and routes

```
app/
├── page.tsx                    # Landing page (/)
├── layout.tsx                  # Root layout
├── globals.css                 # Global styles
├── readiness-check/            # Readiness check feature
│   └── page.tsx               # Readiness check page
├── sample-report/              # Sample report page
│   └── page.tsx               # Sample report display
└── portfolio/                 # Portfolio pages
    ├── build-process/         # Build process documentation
    ├── how-proben-was-built/  # Detailed build history
    └── visual-agentic-development/  # Agentic delivery system
```

**How to navigate:**
- Landing page: `/` (http://localhost:3000)
- Readiness check: `/readiness-check` (http://localhost:3000/readiness-check)
- Sample report: `/sample-report` (http://localhost:3000/sample-report)
- Build process: `/portfolio/build-process` (http://localhost:3000/portfolio/build-process)

### Components (`components/`)

**Purpose:** React components organized by domain

```
components/
├── landing/                   # Landing page components
├── mvp6-reference/            # Reference components from MVP 6
├── product/                    # Product feature components
└── ui/                         # Shared UI components
```

**How to use:**
- Import from `@/components/landing/` for landing features
- Import from `@/components/product/` for product features
- Import from `@/components/ui/` for shared UI components

### Utilities (`lib/`)

**Purpose:** Scoring algorithms and utility functions

```
lib/
├── scoring.ts                 # Readiness scoring algorithms
└── utils.ts                   # Utility functions
```

**How to use:**
- Import scoring functions from `@/lib/scoring`
- Import utilities from `@/lib/utils`

### Data (`data/`)

**Purpose:** Mock data and research

```
data/
├── demo/                      # Demo and mock data
└── research/                  # Research findings
```

**How to use:**
- Import mock data from `@/data/demo/`
- Import research data from `@/data/research/`

---

## Where References Live

### Prototypes (`reference/prototypes/`)

**Purpose:** Source-of-truth prototypes for product implementation

```
reference/prototypes/
└── proben-mvp-6/             # Proben MVP 6 prototype (SOURCE OF TRUTH)
    ├── index.html            # Entry point
    ├── LandingMvp5.jsx       # Landing implementation
    ├── Mvp6Site.jsx          # Full app with navigation
    ├── Mvp6Pages.jsx         # Page components
    ├── Report.jsx            # Report component
    ├── radar.css             # Design tokens (colors, typography, spacing)
    ├── shared.jsx            # Icons, primitives, sample data
    └── README.md            # Prototype documentation
```

**How to use:**
1. **Read prototype source files** before implementing
2. **Port exact structure**, spacing, typography, colors from prototype
3. **Use actual text** from prototype, not approximations
4. **Map CSS tokens** explicitly or port them

**⚠️ IMPORTANT:** The prototype is the source of truth. Porting is not redesigning.

### Screenshots (`reference/screenshots/`)

**Purpose:** Target screenshots for visual parity verification

```
reference/screenshots/
└── proben-mvp-6/             # Proben MVP 6 screenshots
    ├── hero-target-light-1.png
    ├── hero-target-dark-1.png
    └── ... (other target screenshots)
```

**How to use:**
- Identify target screenshot for your slice
- Capture BEFORE screenshot (if changing existing)
- Implement from prototype source
- Capture AFTER screenshot
- Generate DIFF comparison

---

## Where Docs Live

### Product Documentation (`docs/`)

**Purpose:** Product requirements, roadmap, and architecture

```
docs/
├── PRD.md                     # Product Requirements Document
├── ROADMAP.md                 # Implementation roadmap
├── SECURITY.md                # Security guidelines
└── BUILD_PROCESS.md           # Local development setup
```

**How to navigate:**
- Start with [`PRD.md`](PRD.md) for product context
- Check [`ROADMAP.md`](ROADMAP.md) for current phase
- Review [`SECURITY.md`](SECURITY.md) before security changes

### Build History (`docs/product-build-history/`)

**Purpose:** Process changes, decisions, lessons, and metrics

```
docs/product-build-history/
├── PROCESS_DIFF_LOG.md        # Process changes and decisions
├── LESSONS_LEARNED.md         # Mistakes and lessons
├── BUILD_LEARNING_DECISION_LOG.md  # Detailed learning log
├── BUILD_LEARNING_DECISION_INDEX.md # Learning index
├── QUALITY_METRICS_HISTORY.md # Quality metrics over time
├── QUALITY_IMPROVEMENT_LOG.md # Quality improvements
└── FAILURE_TO_GATE_REGISTRY.md  # Failures that created gates
```

**How to use:**
- Check [`PROCESS_DIFF_LOG.md`](PROCESS_DIFF_LOG.md) for recent changes
- Review [`LESSONS_LEARNED.md`](LESSONS_LEARNED.md) before repeating mistakes
- Consult [`FAILURE_TO_GATE_REGISTRY.md`](FAILURE_TO_GATE_REGISTRY.md) to understand quality gates

### Agent Governance (`docs/agent-governance/`)

**Purpose:** Agent system documentation and governance

```
docs/agent-governance/
├── AGENT_ROSTER.md            # Complete agent inventory
├── AGENT_AUTHORITY_MATRIX.md  # Authority levels and permissions
├── AGENT_SYSTEM_AUDIT.md      # Agent system audit
├── AGENT_RETIREMENT_DECISIONS.md  # Agent retirement history
├── SKILL_PRUNING_AUDIT.md     # Skill audit
├── NO_SELF_APPROVAL_RULE.md   # No self-approval policy
└── RACI_MATRIX.md             # Responsibility assignments
```

**How to use:**
- Check [`AGENT_ROSTER.md`](AGENT_ROSTER.md) before agent changes
- Consult [`AGENT_AUTHORITY_MATRIX.md`](AGENT_AUTHORITY_MATRIX.md) for permissions
- Review [`AGENT_RETIREMENT_DECISIONS.md`](AGENT_RETIREMENT_DECISIONS.md) before adding agents

### Agentic Delivery (`docs/agentic-delivery/`)

**Purpose:** AI-native development process and workflow

```
docs/agentic-delivery/
├── VISUAL_AGENTIC_DELIVERY_SYSTEM.md  # Visual quality system
├── CASE_INSPIRED_AGENT_HARNESS.md     # Harness overview
├── AGENT_STATE_MACHINE.md              # IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO
├── EVIDENCE_PROOF_PROTOCOL.md           # Proof requirements (SHA-256)
├── REVISION_LOOP_POLICY.md             # Revision budget (max 2 loops)
├── FRESH_REVIEW_PROTOCOL.md            # Independent review protocol
├── RISK_SCORED_REVIEW.md               # Risk assessment
├── VISUAL_PLAN_TEMPLATE.md            # Visual plan template
├── WORKTREE_ISOLATION_POLICY.md        # Worktree usage
├── BACKGROUND_TASK_HARNESS.md         # Background task workflow
├── AGENT_PHASE_DASHBOARD.md           # Phase dashboard
└── PHASE_2_1_RETRY_PROTOCOL.md        # Phase 2.1 retry protocol
```

**How to use:**
- Read [`CASE_INSPIRED_AGENT_HARNESS.md`](CASE_INSPIRED_AGENT_HARNESS.md) for harness overview
- Check [`AGENT_STATE_MACHINE.md`](AGENT_STATE_MACHINE.md) for workflow
- Review [`EVIDENCE_PROOF_PROTOCOL.md`](EVIDENCE_PROOF_PROTOCOL.md) for proof requirements
- Use [`VISUAL_PLAN_TEMPLATE.md`](VISUAL_PLAN_TEMPLATE.md) before UI work

### Design (`docs/design/`)

**Purpose:** Design quality system and rubrics

```
docs/design/
├── DESIGN_QUALITY_GATES.md              # Design quality gates
├── DESIGN_PARITY_RUBRIC.md              # Visual parity scoring
├── GENERIC_SAAS_REJECTION_RULES.md      # Generic pattern detection
├── UI_SLICE_ACCEPTANCE_CHECKLIST.md     # UI slice checklist
└── PROBEN_MVP6_IMPLEMENTATION_MAP.md   # Implementation mapping
```

**How to use:**
- Consult [`DESIGN_PARITY_RUBRIC.md`](DESIGN_PARITY_RUBRIC.md) for scoring
- Check [`GENERIC_SAAS_REJECTION_RULES.md`](GENERIC_SAAS_REJECTION_RULES.md) for patterns to avoid
- Use [`UI_SLICE_ACCEPTANCE_CHECKLIST.md`](UI_SLICE_ACCEPTANCE_CHECKLIST.md) before accepting UI

### Evals (`docs/evals/`)

**Purpose:** Evaluation framework and cases

```
docs/evals/
├── EVALS.md                             # Eval system overview
├── EVAL_REGISTRY.md                     # Eval case registry
├── FAILURE_MODE_TAXONOMY.md             # Failure types
├── VISUAL_QUALITY_EVALS.md              # Visual quality evals
├── AGENT_RELIABILITY_EVALS.md           # Agent reliability evals
├── PRODUCT_ACCEPTANCE_EVALS.md          # Product acceptance evals
└── EVAL_CASE_TEMPLATE.md                # Eval case template
```

**How to use:**
- Read [`EVALS.md`](EVALS.md) for eval system overview
- Check [`EVAL_REGISTRY.md`](EVAL_REGISTRY.md) for eval cases
- Consult [`FAILURE_MODE_TAXONOMY.md`](FAILURE_MODE_TAXONOMY.md) for failure types

### Quality Assurance (`docs/qa/`)

**Purpose:** Quality assurance and verification

```
docs/qa/
├── VISUAL_EVIDENCE_WORKBENCH.md         # Visual evidence requirements
└── VISUAL_QUALITY_VERIFICATION_PIPELINE.md  # Verification pipeline
```

**How to use:**
- Review [`VISUAL_EVIDENCE_WORKBENCH.md`](VISUAL_EVIDENCE_WORKBENCH.md) for evidence requirements
- Check [`VISUAL_QUALITY_VERIFICATION_PIPELINE.md`](VISUAL_QUALITY_VERIFICATION_PIPELINE.md) for pipeline

### Repository Docs (`docs/repository/`)

**Purpose:** Repository organization and navigation

```
docs/repository/
├── README.md                            # This file
├── REPOSITORY_AUDIT.md                  # Repository audit (2026-06-11)
├── REPOSITORY_MAP.md                    # Repository structure (this file)
└── REPOSITORY_STYLE_GUIDE.md            # Repository style guidelines
```

**How to use:**
- You are here! This file explains navigation
- Check [`REPOSITORY_AUDIT.md`](REPOSITORY_AUDIT.md) for audit details
- Review [`REPOSITORY_STYLE_GUIDE.md`](REPOSITORY_STYLE_GUIDE.md) for style guidelines

---

## Where Generated Files Go

### Build Outputs (Generated, Gitignored)

```
.next/                             # Next.js build output
out/                               # Static export output
tsconfig.tsbuildinfo               # TypeScript build cache
```

**Status:** Do not commit. These are regenerated by `npm run build`.

### Test Reports (Generated, Gitignored)

```
playwright-report/                 # Playwright test reports
test-results/                      # Test results and evidence
coverage/                          # Code coverage reports
```

**Status:** Do not commit. These are regenerated by test runs.

**⚠️ NOTE:** Evidence files in `test-results/visual-review/` should be archived to `docs/archive/visual-evidence/` before cleanup.

---

## What Should Not Be Committed

### Generated Files (Already Gitignored)

- `.next/` — Next.js build output
- `out/` — Static export output
- `playwright-report/` — Test reports
- `test-results/` — Test results (archive evidence first)
- `tsconfig.tsbuildinfo` — TypeScript build cache
- `*.tsbuildinfo` — Other build cache files
- `node_modules/` — Dependencies

### Local Configuration (Already Gitignored)

- `.claude/settings.local.json` — Local Claude settings
- `.claude/local/` — Local Claude files
- `.env` — Environment variables
- `.env.*` — Other environment files
- `*.log` — Log files

### OS Files (Already Gitignored)

- `.DS_Store` — macOS Desktop Services Store
- `Thumbs.db` — Windows thumbnail cache

---

## How to Run Checks

### Type Check

```bash
npm run type-check
```

**Purpose:** Verify TypeScript types without building

**Expected:** No TypeScript errors

### Build

```bash
npm run build
```

**Purpose:** Production build verification

**Expected:** Build succeeds with route table

### Tests

```bash
npm test
```

**Purpose:** Run unit and integration tests

**Expected:** All tests pass

### E2E Tests

```bash
npx playwright test
```

**Purpose:** Run end-to-end tests

**Expected:** All E2E tests pass

---

## Quick Start for New Contributors

### 1. Understand the Product

**Read:**
- [`README.md`](../README.md) — Product overview
- [`docs/PRD.md`](../PRD.md) — Product requirements
- [`docs/ROADMAP.md`](../ROADMAP.md) — Current roadmap

### 2. Understand the Process

**Read:**
- [`CLAUDE.md`](../CLAUDE.md) — AI assistant guide
- [`CONTRIBUTING.md`](../CONTRIBUTING.md) — Contribution guidelines
- [`docs/agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md`](../agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md) — Process overview

### 3. Check Current Phase

**Read:**
- [`docs/ROADMAP.md`](../ROADMAP.md) — Current phase scope
- [`docs/product-build-history/PROCESS_DIFF_LOG.md`](../PROCESS_DIFF_LOG.md) — Recent changes

### 4. Set Up Local Environment

```bash
npm install
npm run dev
```

**Navigate to:**
- http://localhost:3000 — Landing page
- http://localhost:3000/portfolio/build-process — Build process

### 5. Make Your Changes

**Follow:**
- [`CONTRIBUTING.md`](../CONTRIBUTING.md) — Contribution workflow
- [`docs/agentic-delivery/AGENT_STATE_MACHINE.md`](../agentic-delivery/AGENT_STATE_MACHINE.md) — IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO

### 6. Quality Gates

**Verify:**
- Type-check passes
- Build succeeds
- Tests pass
- For UI: Visual parity ≥ 4.5/5
- Evidence complete

---

## Common Tasks

### Implement New Feature

1. Check [`docs/PRD.md`](../PRD.md) for requirements
2. Check [`docs/ROADMAP.md`](../ROADMAP.md) for phase scope
3. Plan implementation
4. Write tests first
5. Implement feature
6. Run quality checks
7. Update docs if needed

### Update UI Component

1. Check [`reference/prototypes/proben-mvp-6/`](../reference/prototypes/proben-mvp-6/) for design
2. Create visual plan ([`docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md`](../agentic-delivery/VISUAL_PLAN_TEMPLATE.md))
3. Get human approval on plan
4. Capture BEFORE screenshot
5. Implement from prototype source
6. Capture AFTER screenshot
7. Generate DIFF comparison
8. Run DOM blocker tests
9. Verify visual parity ≥ 4.5/10

### Add Agent or Skill

1. Check [`docs/agent-governance/AGENT_ROSTER.md`](../AGENT_ROSTER.md) for current agents
2. Check [`docs/agent-governance/SKILL_PRUNING_AUDIT.md`](../SKILL_PRUNING_AUDIT.md) for current skills
3. Create agent/skill file
4. Update [`AGENT_ROSTER.md`](../AGENT_ROSTER.md) or [`SKILL_PRUNING_AUDIT.md`](../SKILL_PRUNING_AUDIT.md)
5. Update all references across docs
6. Run quality checks

### Document Decision

1. Check [`docs/product-build-history/PROCESS_DIFF_LOG.md`](../PROCESS_DIFF_LOG.md) format
2. Add decision entry with:
   - Date
   - Problem
   - Decision
   - Alternatives considered
   - Change applied
   - Evidence

---

## Summary

**Product Code:**
- [`app/`](../app/) — Routes
- [`components/`](../components/) — Components
- [`lib/`](../lib/) — Utilities
- [`data/`](../data/) — Data

**References:**
- [`reference/prototypes/proben-mvp-6/`](../reference/prototypes/proben-mvp-6/) — Prototype (SOURCE OF TRUTH)
- [`reference/screenshots/proben-mvp-6/`](../reference/screenshots/proben-mvp-6/) — Target screenshots

**Documentation:**
- [`docs/`](../docs/) — All docs
- [`docs/product-build-history/`](../product-build-history/) — Build history
- [`docs/agent-governance/`](../agent-governance/) — Agent system
- [`docs/agentic-delivery/`](../agentic-delivery/) — Process
- [`docs/evals/`](../evals/) — Evals

**Quality:**
- [`e2e/`](../e2e/) — E2E tests
- [`tests/`](../tests/) — Unit tests
- [`scripts/harness/`](../scripts/harness/) — Harness scripts
- [`scripts/visual-review/`](../scripts/visual-review/) — Visual review scripts

**Agent System:**
- [`.claude/agents/`](../.claude/agents/) — Agent definitions
- [`.claude/skills/`](../.claude/skills/) — Skills
- [`.claude/hooks/`](../.claude/hooks/) — Hooks

---

**Need help?** Check [`CONTRIBUTING.md`](../CONTRIBUTING.md) or [`docs/ROADMAP.md`](../ROADMAP.md).

**Last Updated:** 2026-06-11
