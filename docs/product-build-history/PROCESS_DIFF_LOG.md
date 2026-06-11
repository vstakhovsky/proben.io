# Process Diff Log

## Purpose

Track changes to the Proben.io quality system, agent harness, and development process. Each entry represents a meaningful process change.

## Format

Each entry includes:
- Date and phase
- What changed
- Why it changed
- Impact on workflow
- Related BLD entry

---

## PDL-001 — Implement Background Task Harness Dashboard

### Date / Phase
2026-06-10 — Phase 2.1 harness implementation

### What Changed

**Created:**
- Background task harness dashboard system
- Agent phase dashboard documentation
- Background task report generator script
- 5-role agent model (Implementer, Verifier, Reviewer, Closer, Retro)
- Cursor rules for agent harness

**Updated:**
- Agent state machine documentation
- Evidence proof protocol
- Revision loop policy

**Files:**
- .claude/agents/implementer.md
- .claude/agents/verifier.md
- .claude/agents/reviewer.md
- .claude/agents/closer.md
- .claude/agents/retro.md
- .cursor/rules/proben-agent-harness.mdc
- docs/agentic-delivery/BACKGROUND_TASK_HARNESS.md
- docs/agentic-delivery/AGENT_PHASE_DASHBOARD.md
- scripts/harness/generate-background-task-report.js
- docs/product-build-history/PROCESS_DIFF_LOG.md
- docs/product-build-history/QUALITY_METRICS_HISTORY.md

### Why It Changed

Need for better visibility into agent workflow:
- Agent work was not visible as a structured workflow
- No clear dashboard showing phases, gates, roles, and evidence
- Hard to see current state and next steps
- No KPI tracking for harness performance

### Impact on Workflow

**Before:**
- Agent work was ad-hoc and invisible
- No clear state tracking
- No dashboard for monitoring progress
- KPIs not tracked

**After:**
- Structured workflow with 5 phases (IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO)
- Clear dashboard showing status, gates, evidence, KPIs
- Background task report generator for HTML reports
- KPI tracking (False PASS rate, evidence completeness, revision loops)
- Better visibility into what agents are doing and what's blocking

### Related BLD Entry
BLD-008 — Replace Agent Sprawl with Case-Inspired State Machine and Evidence Gates

### Status
✅ Implemented

---

## PDL-002 — Domain Launch

### Date / Phase
2026-06-11 — Phase 1 production launch

### What Changed

**Connected:**
- proben.io and www.proben.io to Vercel Production
- Replaced Porkbun parking DNS with Vercel DNS records
- Verified valid domain configuration in Vercel Domains
- Launched Proben MVP 6 landing page publicly

**Files Updated:**
- docs/product-build-history/PROCESS_DIFF_LOG.md
- docs/product-build-history/LESSONS_LEARNED.md
- app/portfolio/build-process/page.tsx

### Why It Changed

Product was only accessible via Vercel preview URL and localhost. Custom domain connection required to launch publicly.

**Before:**
- Custom domain parked at Porkbun
- No production domain routing
- Product not publicly accessible at proben.io

**After:**
- proben.io and www.proben.io point to Vercel Production
- Valid DNS configuration verified
- MVP 6 landing page loads publicly at production domain

### Impact on Workflow

**Process Learning:**
A release is not complete when the build passes. A release is complete only when:
- Production deployment is ready
- Domain configuration is valid
- The public URL loads the expected product
- The user verifies the experience
- Evidence is recorded in the build history

**Evidence:**
- Vercel Domains: proben.io and www.proben.io show Valid Configuration
- Production site loads Proben MVP 6 landing page
- Build and type-check pass with documentation changes

### Related BLD Entry
None (milestone documentation, not a process change)

### Status
✅ Public Launch

---

**Last Updated:** 2026-06-11
**Total Entries:** 2
**Related Documentation:** docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md

## 2026-06-11 — Repository Presentation Upgrade

### Problem

The repository had strong implementation and process artifacts, but the public GitHub presentation did not clearly explain:
- What the product is
- How it was built
- How to navigate the project
- Where to find documentation

The README was minimal and did not showcase the AI-native development process, agent system, quality gates, or build history.

### Decision

Use a curated repository style inspired by modern awesome-list and agent-skill repositories:
- Clear positioning statement with badges
- Structured sections with tables and roadmaps
- Comprehensive documentation links
- Repository navigation guide
- Contribution guidelines
- Professional open-source presentation

### Alternatives Considered

1. **Keep minimal README** — Rejected because project portfolio value requires clear presentation
2. **Focus only on product code** — Rejected because build process is part of the portfolio value
3. **Separate process docs** — Rejected because unified presentation is stronger
4. **Only update README** — Rejected without adding supporting docs (navigation, style guide, contributing)

### Change Applied

**Created:**
- [`README.md`](../../README.md) — Complete rewrite with badges, positioning, roadmap, agents, quality gates
- [`CONTRIBUTING.md`](../../CONTRIBUTING.md) — Contribution guidelines with principles and workflow
- [`docs/repository/README.md`](README.md) — Repository navigation guide
- [`docs/repository/REPOSITORY_MAP.md`](REPOSITORY_MAP.md) — Detailed repository structure explanation
- [`docs/repository/REPOSITORY_STYLE_GUIDE.md`](REPOSITORY_STYLE_GUIDE.md) — Repository style guidelines
- [`docs/repository/REPOSITORY_AUDIT.md`](REPOSITORY_AUDIT.md) — Repository audit and cleanup

**Updated:**
- [`CLAUDE.md`](../../CLAUDE.md) — Added agent naming policy and agent system policy

**Archived:**
- Evidence files from `test-results/visual-review/` → `docs/archive/visual-evidence/phase-2-1/`
- Harness reports from `test-results/harness/` → `docs/archive/harness-reports/`

### Evidence

* New README provides clear product positioning and live demo links
* Comprehensive agent system table shows clean role names
* Quality gate table explains IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO workflow
* Repository map explains where to find product code, references, docs, and agent files
* Style guide defines consistent naming and formatting rules
* All README links validated (no broken links)

### Why

A clean, professional repository presentation:
- Improves portfolio credibility
- Helps new contributors navigate the project
- Showcases the AI-native development process
- Documents the quality system and governance
- Makes the build history accessible
- Separates product code from process artifacts

### Learning

**Repository presentation is part of the portfolio.** 
The way documentation is organized affects how people perceive the project's quality and maturity.

**Consistent structure reduces aiability friction.**
Clear folder naming, document formats, and style guides help AI assistants understand where to work and what to preserve.

**Evidence files should be archived, not deleted.**
Visual evidence and harness reports are historical artifacts that should be preserved in `docs/archive/` rather than left in generated folders or deleted.

### Next Action

Continue with Phase 2.2 (Landing Polish) using the new repository structure as the foundation for clean, documented development.

### Status

✅ Accepted

