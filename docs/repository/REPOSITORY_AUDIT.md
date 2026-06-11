# Repository Audit

**Audit Date:** 2026-06-11
**Purpose:** Comprehensive inventory of Proben.io repository structure before cleanup
**Status:** ✅ COMPLETED

---

## Executive Summary

The Proben.io repository contains 482MB of files, primarily consisting of:
- **node_modules/** (482MB) — Dependencies
- **reference/** (34MB) — Proben MVP 6 prototype and screenshots
- **docs/** (1.2MB) — 107 documentation files
- **test-results/** (572KB) — Evidence and test reports
- **playwright-report/** (520KB) — Test execution reports

**Key Findings:**
- Generated build files are properly gitignored
- No existing archive structure for obsolete files
- Reference prototypes are preserved (good)
- Evidence files need organized archiving
- Some temporary/experimental files should be archived

---

## Current Repository Structure

### Top-Level Folders

```
proben.io/
├── .claude/              # Claude Code agent system (2.2MB)
├── .cursor/              # Cursor AI rules (small)
├── .next/                # Next.js build output (generated)
├── app/                  # Next.js App Router pages (140KB)
├── components/           # React components (76KB)
├── data/                 # Mock data and research (small)
├── docs/                 # Documentation (1.2MB, 107 files)
├── e2e/                  # Playwright E2E tests (24KB)
├── evals/                # Eval cases (12KB)
├── lib/                  # Utility functions (20KB)
├── node_modules/         # Dependencies (482MB)
├── out/                  # Static export output (1.1MB, generated)
├── playwright-report/    # Test reports (520KB, generated)
├── public/               # Static assets (312KB)
├── reference/            # Reference materials (34MB)
├── scripts/             # Utility scripts (116KB)
├── test-results/        # Test results and evidence (572KB)
├── tests/               # Unit tests (20KB)
├── .gitignore           # Git ignore rules
├── CLAUDE.md            # AI assistant guide (52KB)
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── package-lock.json    # Lock file (304KB)
├── tsconfig.json        # TypeScript configuration
├── tsconfig.tsbuildinfo # TypeScript build cache (128KB)
├── vitest.config.ts     # Vitest test configuration
├── vitest.setup.ts      # Vitest setup file
└── vercel.json          # Vercel deployment config
```

---

## File Classification

### 1. Product Source Files (KEEP - DO NOT MODIFY)

**app/** — Next.js App Router pages
- ✅ app/page.tsx — Landing page
- ✅ app/readiness-check/ — Readiness check feature
- ✅ app/sample-report/ — Sample report page
- ✅ app/portfolio/ — Portfolio pages
- ✅ app/layout.tsx — Root layout
- ✅ app/globals.css — Global styles

**components/** — React components
- ✅ components/landing/ — Landing page components
- ✅ components/ui/ — UI components
- ✅ components/product/ — Product components
- ✅ components/mvp6-reference/ — Reference components

**lib/** — Utilities
- ✅ lib/scoring.ts — Scoring algorithms
- ✅ lib/utils.ts — Utility functions

**data/** — Mock data
- ✅ data/demo/ — Demo data
- ✅ data/research/ — Research data

**Status:** 🟢 KEEP — No changes needed

---

### 2. Reference Files (KEEP - PRESERVE)

**reference/prototypes/proben-mvp-6/** — Proben MVP 6 prototype
- ✅ index.html — Entry point
- ✅ LandingMvp5.jsx — Landing implementation
- ✅ Mvp6Site.jsx — Full app with navigation
- ✅ Mvp6Pages.jsx — Page components
- ✅ Report.jsx — Report component
- ✅ radar.css — Design tokens
- ✅ shared.jsx — Icons and primitives
- ✅ README.md — Prototype documentation
- ✅ Mascot.jsx — Mascot component (optional)

**reference/screenshots/proben-mvp-6/** — Proben MVP 6 screenshots
- ✅ Target screenshots for visual parity

**reference/design/** — Design specifications
- ✅ Design docs and specifications

**Status:** 🟢 KEEP — Source of truth for product implementation

---

### 3. Documentation Files (KEEP, ARCHIVE OBSOLETE)

**docs/product-build-history/** — Build history (KEEP)
- ✅ BUILD_LEARNING_DECISION_LOG.md
- ✅ BUILD_LEARNING_DECISION_INDEX.md
- ✅ LESSONS_LEARNED.md
- ✅ QUALITY_METRICS_HISTORY.md
- ✅ QUALITY_IMPROVEMENT_LOG.md
- ✅ FAILURE_TO_GATE_REGISTRY.md
- ✅ PROCESS_DIFF_LOG.md

**docs/agent-governance/** — Agent system docs (KEEP)
- ✅ AGENT_ROSTER.md
- ✅ AGENT_AUTHORITY_MATRIX.md
- ✅ AGENT_SYSTEM_AUDIT.md
- ✅ AGENT_RETIREMENT_DECISIONS.md
- ✅ SKILL_PRUNING_AUDIT.md
- ✅ NO_SELF_APPROVAL_RULE.md
- ✅ RACI_MATRIX.md

**docs/agentic-delivery/** — Agentic delivery system (KEEP)
- ✅ VISUAL_AGENTIC_DELIVERY_SYSTEM.md
- ✅ CASE_INSPIRED_AGENT_HARNESS.md
- ✅ AGENT_STATE_MACHINE.md
- ✅ EVIDENCE_PROOF_PROTOCOL.md
- ✅ REVISION_LOOP_POLICY.md
- ✅ BACKGROUND_TASK_HARNESS.md
- ✅ FRESH_REVIEW_PROTOCOL.md
- ✅ RISK_SCORED_REVIEW.md
- ✅ VISUAL_PLAN_TEMPLATE.md
- ✅ WORKTREE_ISOLATION_POLICY.md
- ✅ PHASE_2_1_RETRY_PROTOCOL.md
- ✅ AGENT_PHASE_DASHBOARD.md

**docs/evals/** — Eval system (KEEP)
- ✅ EVALS.md
- ✅ EVAL_REGISTRY.md
- ✅ FAILURE_MODE_TAXONOMY.md
- ✅ VISUAL_QUALITY_EVALS.md
- ✅ AGENT_RELIABILITY_EVALS.md
- ✅ PRODUCT_ACCEPTANCE_EVALS.md
- ✅ EVAL_CASE_TEMPLATE.md

**docs/design/** — Design docs (KEEP)
- ✅ DESIGN_QUALITY_GATES.md
- ✅ DESIGN_PARITY_RUBRIC.md
- ✅ GENERIC_SAAS_REJECTION_RULES.md
- ✅ UI_SLICE_ACCEPTANCE_CHECKLIST.md
- ✅ PROBEN_MVP6_IMPLEMENTATION_MAP.md

**docs/qa/** — Quality assurance (KEEP)
- ✅ VISUAL_EVIDENCE_WORKBENCH.md
- ✅ VISUAL_QUALITY_VERIFICATION_PIPELINE.md

**docs/reviews/** — Review documentation (KEEP)
- ✅ phase-2-1-design-review.md

**docs/gotchas/** — Gotchas and patterns (KEEP)
- ✅ PROBEN_AGENT_GOTCHAS.md

**docs/experimentation/** — Experiments (KEEP)
- ✅ EXPERIMENT_REGISTRY.md

**docs/ADR/** — Architecture Decision Records (KEEP)
- ✅ RFC-0001-architecture.md
- ✅ Other ADRs

**docs/BDD/** — Behavior-Driven Development (KEEP)
- ✅ BDD specs

**docs/research/** — Research findings (KEEP)
- ✅ Research docs

**docs/context/** — Context docs (REVIEW)
- ⚠️ Needs review - may be obsolete

**docs/diagrams/** — Diagrams (KEEP)
- ✅ Architecture diagrams

**docs/visual-process/** — Visual process docs (REVIEW)
- ⚠️ Needs review - may be obsolete

**Status:** 🟢 KEEP core docs, 🟡 REVIEW context/visual-process for archiving

---

### 4. Agent System Files (KEEP - ALREADY CLEANED)

**.claude/agents/** — Agent definitions (19 active)
- ✅ product-manager.md
- ✅ ai-product-manager.md
- ✅ release-manager.md
- ✅ architect.md
- ✅ design-reviewer.md
- ✅ governance-auditor.md
- ✅ security-reviewer.md
- ✅ research-analyst.md
- ✅ test-engineer.md
- ✅ frontend-engineer.md
- ✅ prototype-port-engineer.md
- ✅ visual-plan-architect.md
- ✅ fresh-review-agent.md
- ✅ ai-engineer.md (disabled)
- ✅ implementer.md (harness)
- ✅ verifier.md (harness)
- ✅ reviewer.md (harness)
- ✅ closer.md (harness)
- ✅ retro.md (harness)

**.claude/agents/_archive/** — Archived agents (13)
- ✅ Preserved for reference

**.claude/skills/** — Skills (16 active)
- ✅ Various skills for agent tasks

**.claude/hooks/** — Hooks (if any)
- ✅ Automation hooks

**Status:** 🟢 KEEP — Recently cleaned, good structure

---

### 5. Generated Files (GITIGNORED - CORRECT)

**.next/** — Next.js build output
- ✅ Already in .gitignore
- ✅ Can be deleted locally (regeneratable)

**out/** — Static export output
- ✅ Already in .gitignore
- ✅ Can be deleted locally (regeneratable)

**playwright-report/** — Playwright test reports
- ✅ Already in .gitignore
- ✅ Can be deleted locally (regeneratable)

**test-results/** — Test results and evidence
- ✅ Already in .gitignore
- ⚠️ CONTAINS EVIDENCE — Archive before deleting

**tsconfig.tsbuildinfo** — TypeScript build cache
- ⚠️ NOT in .gitignore (should be added)
- ✅ Can be deleted (regeneratable)

**node_modules/** — Dependencies
- ✅ Already in .gitignore
- ✅ Can be deleted locally (regeneratable)

**Status:** 🟢 Mostly correct, 🟡 Add tsconfig.tsbuildinfo to .gitignore

---

### 6. Evidence Files (ARCHIVE PROPERLY)

**test-results/visual-review/** — Visual evidence reports
- ⚠️ phase-2-1-landing-*.png — Screenshots
- ⚠️ phase-2-1-landing-manifest.json — Evidence manifest
- ⚠️ phase-2-1-landing-report.html — Visual review report
- ⚠️ BEFORE/AFTER/DIFF comparisons

**test-results/harness/** — Harness evidence
- ⚠️ Background task reports
- ⚠️ Proof manifests
- ⚠️ SHA-256 verification files

**Status:** 🟡 ARCHIVE — Move to docs/archive/visual-evidence/ before cleanup

---

### 7. Test Files (KEEP)

**e2e/** — Playwright E2E tests
- ✅ landing-visual-parity.spec.ts
- ✅ Other E2E tests

**tests/** — Unit tests
- ✅ Unit test files

**vitest.config.ts** — Vitest configuration
**vitest.setup.ts** — Vitest setup

**Status:** 🟢 KEEP — No changes needed

---

### 8. Scripts (KEEP)

**scripts/harness/** — Harness scripts
- ✅ run-proof-command.js
- ✅ verify-proof-manifest.js
- ✅ validate-state-transition.js
- ✅ create-retro-entry.js
- ✅ generate-harness-report.js
- ✅ generate-background-task-report.js

**scripts/visual-review/** — Visual review scripts
- ✅ capture-ui-slice-evidence.js
- ✅ generate-visual-review-report.js
- ✅ generate-visual-diff.js

**scripts/deployment/** — Deployment scripts (if any)

**Status:** 🟢 KEEP — No changes needed

---

### 9. Configuration Files (KEEP)

**CLAUDE.md** — AI assistant guide (52KB)
**package.json** — Dependencies and scripts
**package-lock.json** — Lock file (304KB)
**next.config.js** — Next.js configuration
**tsconfig.json** — TypeScript configuration
**vercel.json** — Vercel deployment config
**vitest.config.ts** — Vitest configuration
**vitest.setup.ts** — Vitest setup

**Status:** 🟢 KEEP — No changes needed

---

### 10. Public Assets (KEEP)

**public/proben-mvp6/** — Public prototype
- ✅ Serving the prototype via iframe

**public/favicon.svg**
**public/logo.svg**
**public/** — Other static assets

**Status:** 🟢 KEEP — No changes needed

---

## Files to Move

### 1. Evidence Files (MOVE TO ARCHIVE)

**Source:** test-results/visual-review/
**Destination:** docs/archive/visual-evidence/phase-2-1/

**Files:**
- phase-2-1-landing-before.png
- phase-2-1-landing-after.png
- phase-2-1-landing-target.png
- phase-2-1-landing-diff-comparison.html
- phase-2-1-landing-manifest.json
- phase-2-1-landing-report.html

**Reason:** Evidence files should be preserved in docs, not in generated test-results

---

### 2. Harness Reports (MOVE TO ARCHIVE)

**Source:** test-results/harness/
**Destination:** docs/archive/harness-reports/

**Files:**
- Latest background-task-report.html
- Other harness reports

**Reason:** Harness reports are historical evidence, preserve in docs

---

## Files to Archive

### 1. Obsolete Docs (ARCHIVE)

**docs/context/** — May be obsolete
- ⚠️ Review first, then archive if obsolete

**docs/visual-process/** — May be obsolete
- ⚠️ Review first, then archive if obsolete

**Destination:** docs/archive/obsolete-docs/

---

## Files to Delete Locally (Generated)

### Safe to Delete (Regeneratable)

- ✅ .next/ — Next.js build output
- ✅ out/ — Static export output
- ✅ playwright-report/ — Test reports
- ✅ tsconfig.tsbuildinfo — TypeScript build cache
- ✅ node_modules/ — Dependencies (if needed)

**CAUTION:** Only delete if you can run `npm install` and `npm run build` afterwards

---

## .gitignore Updates Needed

### Add to .gitignore

```gitignore
# TypeScript build cache
tsconfig.tsbuildinfo
*.tsbuildinfo
```

**Reason:** TypeScript build cache is regeneratable and should not be committed

---

## Recommended Archive Structure

### Create Archive Folders

```
docs/archive/
├── visual-evidence/
│   ├── phase-2-1/
│   │   ├── before.png
│   │   ├── after.png
│   │   ├── target.png
│   │   ├── diff-comparison.html
│   │   ├── manifest.json
│   │   └── report.html
│   └── phase-2-2/ (future)
├── harness-reports/
│   ├── background-task-report-2026-06-10.html
│   └── (future reports)
└── obsolete-docs/
    ├── context/ (if obsolete)
    └── visual-process/ (if obsolete)
```

---

## Safety Checks

### Files Requiring Human Review

**⚠️ NEEDS HUMAN REVIEW:**

1. **docs/context/** — Review for obsolescence before archiving
2. **docs/visual-process/** — Review for obsolescence before archiving
3. **evals/*.jsonl** — Eval case data files — preserve or archive?
4. **Any custom scripts** — Review before archiving

**DO NOT DELETE WITHOUT REVIEW:**

1. **app/** — Product code (KEEP)
2. **components/** — React components (KEEP)
3. **lib/** — Utilities (KEEP)
4. **reference/prototypes/** — Source of truth (KEEP)
5. **reference/screenshots/** — Evidence (KEEP)
6. **docs/product-build-history/** — Learning history (KEEP)
7. **docs/agent-governance/** — Agent system docs (KEEP)
8. **docs/agentic-delivery/** — Process docs (KEEP)
9. **CLAUDE.md** — AI assistant guide (KEEP)
10. **.claude/agents/** — Agent definitions (KEEP)

---

## Summary Statistics

### File Counts

- **Total directories:** 50+
- **Documentation files:** 107
- **Agent files:** 32 (19 active + 13 archived)
- **Skill files:** 16
- **Test files:** ~20
- **Script files:** ~15

### Storage

- **node_modules/:** 482MB (ignored)
- **reference/:** 34MB (keep)
- **docs/:** 1.2MB (keep)
- **test-results/:** 572KB (archive evidence, clear rest)
- **Total repo (without node_modules):** ~40MB

---

## Next Steps

1. ✅ Create docs/repository/ folder
2. ✅ Create archive folder structure
3. ⏳ Move evidence files to archive
4. ⏳ Update .gitignore
5. ⏳ Review and archive obsolete docs
6. ⏳ Create REPOSITORY_MAP.md
7. ⏳ Add cleanup entry to PROCESS_DIFF_LOG.md
8. ⏳ Run verification checks
9. ⏳ Generate final report

---

**Audit Completed:** 2026-06-11
**Auditor:** Repository Cleanup Task Force
**Next Action:** Create archive folders and move evidence files
