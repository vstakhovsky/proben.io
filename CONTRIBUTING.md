# Contributing to Proben.io

**Thank you for your interest in contributing!** This document explains how to work with this repository effectively.

## Project Principles

### 1. Evidence Over Claims

**Do not trust agent claims. Trust artifacts:**
- Logs (real output, not marker files)
- Screenshots (visual evidence)
- Hashes (SHA-256 verification)
- DOM checks (deterministic tests)
- Manifests (evidence metadata)
- Build output (compilation results)
- Human approval (final authority)

### 2. No Self-Approval

**Builders cannot approve their own work.**
- The agent that implements cannot be the final reviewer
- Fresh review required for all release-critical work
- Human approval is the final gate

### 3. Visual Work Requires Visual Evidence

**UI changes must include:**
- BEFORE screenshot (pre-implementation)
- TARGET screenshot (approved design)
- AFTER screenshot (post-implementation)
- DIFF comparison (side-by-side or visual diff)
- Evidence manifest (metadata)

### 4. Green Tests Are Necessary But Not Sufficient

**Tests passing is required, but not enough for release:**
- Type-check must pass
- Build must succeed
- Tests must pass
- Visual parity must meet threshold (≥ 4.5/5)
- Product acceptance criteria must be met
- Human must approve

### 5. Documentation Before Deletion

**Before deleting or archiving:**
- Update decision log ([`docs/product-build-history/PROCESS_DIFF_LOG.md`](docs/product-build-history/PROCESS_DIFF_LOG.md))
- Archive evidence properly ([`docs/archive/`](docs/archive/))
- Update agent roster if removing agents ([`docs/agent-governance/AGENT_ROSTER.md`](docs/agent-governance/AGENT_ROSTER.md))
- Update skills audit if removing skills ([`docs/agent-governance/SKILL_PRUNING_AUDIT.md`](docs/agent-governance/SKILL_PRUNING_AUDIT.md))

## Development Workflow

### 1. Before Starting Work

**Read relevant documentation:**
- Check [`docs/PRD.md`](docs/PRD.md) for product requirements
- Check [`docs/ROADMAP.md`](docs/ROADMAP.md) for current phase scope
- Check [`CLAUDE.md`](CLAUDE.md) for AI assistant guidance
- Check [`docs/ADR/`](docs/ADR/) for architecture decisions

### 2. Plan Your Work

**For product features:**
1. Create or update ADR for significant changes
2. Identify acceptance criteria
3. Plan tests before implementation
4. Consider security implications

**For UI work:**
1. Create visual plan ([`docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md`](docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md))
2. Get human approval on plan before coding
3. Specify evidence capture requirements
4. Define DOM blockers for required/forbidden elements

### 3. Implementation

**Follow existing patterns:**
- Use TypeScript strict mode
- Follow component structure in [`components/`](components/)
- Follow page structure in [`app/`](app/)
- Use existing utilities from [`lib/`](lib/)
- Match design tokens from [`reference/prototypes/proben-mvp-6/radar.css`](reference/prototypes/proben-mvp-6/radar.css)

**For UI work:**
- Port exact structure, spacing, typography, colors from prototype
- Do not create "similar" designs
- Use actual text, numbers, labels from prototype
- Add test IDs for DOM blockers

### 4. Quality Checks

**Before considering work complete:**
1. Run `npm run type-check` — No TypeScript errors
2. Run `npm run build` — Build succeeds
3. Run `npm test` — Tests pass
4. For UI: Capture screenshot evidence
5. For UI: Run DOM blocker tests
6. For UI: Generate visual parity report

### 5. Review Process

**Work flows through:**
1. **IMPLEMENT** — Builder creates implementation
2. **VERIFY** — Verifier generates proof (logs, hashes, screenshots)
3. **REVIEW** — Independent reviewer checks evidence
4. **CLOSE** — Closer verifies all gates passed
5. **RETRO** — Retro documents learning

**See:** [`docs/agentic-delivery/AGENT_STATE_MACHINE.md`](docs/agentic-delivery/AGENT_STATE_MACHINE.md) for complete workflow.

## Branch Naming

### Feature Branches

```bash
feature/phase-2-2-landing-polish
feature/phase-3-readiness-check-mvp
feature/phase-4-report-generation
```

### Bug Fix Branches

```bash
fix/navigation-broken-link
fix/typo-hero-section
fix/responsive-mobile-layout
```

### Documentation Branches

```bash
docs/update-readme-badges
docs/add-architecture-decision
docs/agent-cleanup-phase-2
```

### Experiment Branches

```bash
experiment/ai-integration-openai
experiment/mcp-prototype
experiment/eval-harness-v2
```

## Commit Message Style

### Format

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, etc.)
- **refactor:** Code refactoring
- **test:** Adding or updating tests
- **chore:** Maintenance tasks
- **perf:** Performance improvements
- **ci:** CI/CD changes
- **build:** Build system changes

### Examples

```bash
feat(phase-3): add readiness-check form component

Implement interactive readiness check form with:
- Goal clarity assessment
- Strategic context evaluation
- Evidence quality check
- Stakeholder risk identification
- Decision ask clarity verification

Closes #123
```

```bash
fix(landing): correct navigation link to sample report

The "View Sample Report" button was pointing to /sample instead of
/sample-report, causing 404 on production.

Fixes #456
```

```bash
docs(agent-governance): update AGENT_ROSTER.md after cleanup

Reflects the agent system simplification from 33 to 19 agents.
Updates all agent names to remove title grades (principal, senior, lead).

See docs/product-build-history/PROCESS_DIFF_LOG.md for details.
```

## Quality Gates Before PR

### For All Work

- [ ] Type-check passes (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] No new console errors
- [ ] No linter warnings

### For Product Features

- [ ] Acceptance criteria met
- [ ] PRD alignment verified
- [ ] User value clear
- [ ] Edge cases considered

### For UI Work

- [ ] BEFORE screenshot captured
- [ ] TARGET screenshot identified
- [ ] AFTER screenshot captured
- [ ] DIFF comparison generated
- [ ] Visual parity score ≥ 4.5/5
- [ ] DOM blockers pass
- [ ] Evidence manifest created

### For Architecture Changes

- [ ] ADR created or updated
- [ ] Impact assessment documented
- [ ] Migration path defined (if breaking)
- [ ] Performance implications considered

### For Agent/Skill Changes

- [ ] AGENT_ROSTER.md updated (if agent added/removed/renamed)
- [ ] SKILL_PRUNING_AUDIT.md updated (if skill added/removed)
- [ ] References updated across docs
- [ ] CLAUDE.md updated (if principles changed)

## Documentation Update Rules

### When to Update Documentation

**Always update when:**
- Adding or removing agents → Update [`AGENT_ROSTER.md`](docs/agent-governance/AGENT_ROSTER.md)
- Adding or removing skills → Update [`SKILL_PRUNING_AUDIT.md`](docs/agent-governance/SKILL_PRUNING_AUDIT.md)
- Architecture decision made → Create/update ADR in [`docs/ADR/`](docs/ADR/)
- Process change made → Update [`PROCESS_DIFF_LOG.md`](docs/product-build-history/PROCESS_DIFF_LOG.md)
- Lesson learned → Update [`LESSONS_LEARNED.md`](docs/product-build-history/LESSONS_LEARNED.md)
- Failure analyzed → Create eval case in [`docs/evals/`](docs/evals/)

**Update when relevant:**
- Quality gate added → Update quality docs
- Eval case created → Update [`EVAL_REGISTRY.md`](docs/evals/EVAL_REGISTRY.md)
- Build history milestone → Update build history docs

### Documentation Style

- Use clear, concise language
- Include examples where helpful
- Link to related docs
- Use markdown tables for structured data
- Use code blocks for commands and examples
- Use badges for status and metadata

## Visual Change Requirements

### Before Implementation

1. **Create visual plan** ([`docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md`](docs/agentic-delivery/VISUAL_PLAN_TEMPLATE.md))
2. **Specify:** Layout, components, copy, design tokens
3. **Get human approval** on plan before coding
4. **Define evidence capture:** What screenshots to capture

### During Implementation

1. **Read prototype source files** first ([`reference/prototypes/proben-mvp-6/`](reference/prototypes/proben-mvp-6/))
2. **Port exact** structure, spacing, typography, colors
3. **Use actual text** from prototype, not approximations
4. **Add test IDs** for DOM blockers

### After Implementation

1. **Capture BEFORE screenshot** (if changing existing)
2. **Identify TARGET screenshot** (approved design)
3. **Capture AFTER screenshot** (current implementation)
4. **Generate DIFF comparison**
5. **Run DOM blocker tests**
6. **Calculate visual parity score**

### Evidence Requirements

**For UI acceptance, you must have:**
- BEFORE screenshot (pre-implementation)
- TARGET screenshot (approved prototype)
- AFTER screenshot (post-implementation)
- DIFF comparison (side-by-side or visual diff)
- Evidence manifest (JSON metadata)
- DOM blocker test results (PASS/FAIL)
- Visual review report (HTML)

**See:** [`docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md`](docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md) for complete pipeline.

## Release Checklist

### Before Merge

- [ ] All quality gates pass (type-check, build, tests)
- [ ] Visual parity ≥ 4.5/5 (for UI work)
- [ ] Product acceptance criteria met
- [ ] Documentation updated
- [ ] Build history log updated (if significant change)
- [ ] Agent roster updated (if agents changed)
- [ ] Skills audit updated (if skills changed)

### Before Deployment

- [ ] Environment variables configured (if needed)
- [ ] DNS settings verified (if domain change)
- [ ] Vercel project connected
- [ ] Deployment branch verified (usually `main`)

### After Deployment

- [ ] Test production URLs
- [ ] Verify SSL certificate
- [ ] Check analytics (if configured)
- [ ] Update build history milestone
- [ ] Document any issues or rollbacks

## Repository Structure

**See:** [`docs/repository/README.md`](docs/repository/README.md) for detailed navigation guide.

**Quick reference:**
- [`app/`](app/) — Next.js App Router pages
- [`components/`](components/) — React components
- [`lib/`](lib/) — Utilities and scoring logic
- [`data/`](data/) — Mock data
- [`reference/`](reference/) — Prototypes and screenshots
- [`docs/`](docs/) — Documentation
- [`scripts/`](scripts/) — Automation scripts
- [`.claude/`](.claude/) — Claude Code agents and skills
- [`e2e/`](e2e/) — E2E tests
- [`tests/`](tests/) — Unit tests

## Getting Help

### Documentation

- [`CLAUDE.md`](CLAUDE.md) — AI assistant guide
- [`docs/PRD.md`](docs/PRD.md) — Product requirements
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — Implementation roadmap
- [`docs/SECURITY.md`](docs/SECURITY.md) — Security guidelines
- [`docs/BUILD_PROCESS.md`](docs/BUILD_PROCESS.md) — Local development setup

### Process Documentation

- [`docs/agentic-delivery/`](docs/agentic-delivery/) — Agentic delivery system
- [`docs/agent-governance/`](docs/agent-governance/) — Agent system governance
- [`docs/evals/`](docs/evals/) — Evaluation framework
- [`docs/design/`](docs/design/) — Design quality system
- [`docs/qa/`](docs/qa/) — Quality assurance

### Build History

- [`docs/product-build-history/PROCESS_DIFF_LOG.md`](docs/product-build-history/PROCESS_DIFF_LOG.md) — Process changes
- [`docs/product-build-history/LESSONS_LEARNED.md`](docs/product-build-history/LESSONS_LEARNED.md) — Lessons learned
- [`docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md`](docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md) — Learning log

## Code of Conduct

### Principles

1. **Evidence-based discourse** — Back claims with artifacts
2. **Independent review** — Builders don't approve their own work
3. **Respect for source of truth** — Prototype is the design, not interpretation
4. **Process before product** — Good process leads to good product
5. **Learning over ego** — Document failures, share lessons

### Conflicts

**Disagreements about evidence:**
- Screenshot/browser state is the source of truth
- Agent claims are advisory
- Human approval is final

**Disagreements about quality:**
- Visual parity score must be ≥ 4.5/5 for UI acceptance
- All quality gates must pass
- Evidence must be complete

**Disagreements about process:**
- Follow the state machine (IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO)
- No state transition without evidence
- Revision loops capped at 2

---

**Questions?** Check [`docs/repository/README.md`](docs/repository/README.md) for repository navigation guide.

**Last Updated:** 2026-06-11
