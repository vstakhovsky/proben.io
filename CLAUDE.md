# Proben.io - AI-Assisted Development Guide

## Project Overview

Proben.io is a readiness assessment and portfolio platform for solo founders. This guide enables AI assistants to effectively contribute to the codebase while maintaining quality, security, and architectural consistency.

**IMPORTANT**: We are building a public demo MVP first. No database, authentication, or real AI integrations in Phase 1.

## Development Philosophy

- **MVP-First**: Start with a working public demo, iterate from there
- **Mock Data**: Use static/mock data instead of databases initially
- **Test-Driven Development**: Write tests before implementation
- **Security-First**: Every change must pass security review
- **Documentation-First**: Document decisions before coding
- **Incremental Delivery**: Small, verifiable changes over large refactorings
- **Memory-Enabled**: Use the memory system for context persistence

## Phase 1 Technology Stack (MVP)

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Data**: Static/mock data (TypeScript constants)
- **AI Features**: Deterministic mock scoring algorithms
- **Testing**: Vitest + Playwright
- **Deployment**: Vercel

## Phase 2+ Technology Stack (Future)

- **Authentication**: Clerk, Auth.js, or Supabase Auth
- **Database**: Supabase or Neon Postgres
- **Real AI**: OpenAI, Anthropic, or Braintrust
- **Monitoring**: Sentry, PostHog, Braintrust, Langfuse
- **Payment**: Stripe (later phase)

## Repository Structure

```
proben.io/
├── .claude/              # AI assistant configuration
│   ├── agents/          # Specialized agent definitions
│   ├── skills/          # Reusable skill packages
│   ├── hooks/           # Automation triggers
│   └── settings.json    # Claude configuration
├── docs/                 # Documentation
│   ├── ADR/             # Architecture Decision Records
│   ├── BDD/             # Behavior-Driven Development specs
│   └── research/        # Research findings and decisions
├── data/                 # Data directory (gitignored for sensitive data)
├── reference/            # Reference materials and screenshots
└── scripts/             # Utility scripts
```

## Development Workflow

### Before Writing Code

1. **Read Relevant Documentation**
   - Check `docs/ADR/` for architecture decisions
   - Review `docs/BDD/` for behavior specifications
   - Read `CLAUDE.md` for project context
   - Check `docs/ROADMAP.md` for current phase scope

2. **Plan the Implementation**
   - Verify feature is in current phase scope
   - Create or update the relevant ADR for significant changes
   - Identify affected components and dependencies
   - Plan tests before writing code

3. **Check Security Implications**
   - Review `docs/SECURITY.md` for security requirements
   - For Phase 1: Focus on XSS, input validation, headers
   - Plan for input validation and output sanitization

### During Development

1. **Write Tests First**
   - Unit tests for business logic (especially scoring algorithms)
   - Component tests for UI elements
   - E2E tests for critical user flows
   - Test with mock data structures

2. **Implement Features**
   - Follow existing code patterns and conventions
   - Use TypeScript for type safety
   - Maintain accessibility standards (WCAG 2.1 AA)
   - Use static/mock data (no database calls in Phase 1)

3. **Document Decisions**
   - Update ADRs for architectural changes
   - Add inline comments for complex logic only
   - Keep PR descriptions focused on "why" not "what"
   - Mark features as "Phase 1" vs "Future Phase"

### After Implementation

1. **Run Quality Checks**
   - Execute test suite (`npm test`)
   - Run type checking (`npm run type-check`)
   - Check for security vulnerabilities (`npm audit`)
   - Verify no database/API calls in Phase 1 code

2. **Security Review**
   - Use `/security-review` skill for pending changes
   - Address all security findings
   - Document security considerations
   - Focus on client-side security for Phase 1

3. **Code Review**
   - Submit pull request with clear description
   - Address review feedback promptly
   - Ensure CI/CD checks pass
   - Verify deployment readiness for Vercel

## Critical Rules

### Phase 1 Constraints (Current)
- **NO Database**: Use static/mock data only
- **NO Authentication**: Public demo only
- **NO Real AI**: Use deterministic mock algorithms
- **NO API Keys**: No external service integrations
- **NO Payment Processing**: Stripe in later phase

### Security
- Never commit secrets or API keys (even for future phases)
- Always validate and sanitize user input
- For Phase 1: Focus on client-side validation and security headers
- Implement proper CSP headers
- Log security events without exposing sensitive data

### Code Quality
- Maintain test coverage above 80%
- Keep functions small and focused (<50 lines)
- Use descriptive variable and function names
- Avoid premature optimization
- Follow the existing code style
- Use TypeScript for all code (no `any` types)

### AI-Specific Guidelines
- Use the memory system for important context
- Reference related decisions with `[[ADR-number]]`
- Ask questions when requirements are unclear
- Propose alternatives for significant decisions
- Never implement features without clear requirements
- **For Phase 1**: Implement deterministic algorithms, not AI calls

## Evidence-Based Completion Rule (CRITICAL FOR UI WORK)

**Agents must never mark UI work as complete based only on build, tests, or route availability.**

**For all UI/UX tasks, the following evidence MUST be produced before claiming "done":**

1. **Reference Evidence**
   - Reference prototype path (e.g., `reference/screenshots/proben-mvp-6/hero-target-light-1.png`)
   - Source screenshot identified

2. **Current Evidence**
   - Current implementation screenshot captured
   - Route tested in browser
   - Responsive behavior verified

3. **Comparison Evidence**
   - Side-by-side comparison with prototype
   - Visual parity score (1-5 scale, >= 4.5/5 required for approval)
   - Dimension scores: header, hero, typography, spacing, colors, CTAs, responsiveness, brand fit

4. **Verdict Evidence**
   - Explicit ACCEPTED or REJECTED status
   - List of what matches
   - List of what doesn't match
   - Required fixes (if rejected)

**Acceptance Threshold:** Visual parity score >= 4.5/5

**Below Threshold:** Automatic REJECTION with specific blockers

**Related Documentation:**
- `docs/reviews/phase-2-1-failure-analysis.md` — Analysis of why agents accepted visually incorrect result
- `docs/PROCESS_LEARNINGS.md` — Process governance learnings
- `docs/design/DESIGN_QUALITY_GATES.md` — Design quality gate specifications
- `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md` — Visual agentic delivery system

## Visual Agentic Delivery System

For UI/UX work, Proben.io uses the Visual Agentic Delivery System to ensure quality through visual planning, isolated work, fresh review, and risk-scored gates.

**Core Process:**
1. Visual Plan — Create detailed visual plan before implementation
2. Human Feedback — Get approval on plan before coding
3. Isolated Build — Implement in worktree, only from approved plan
4. Fresh Review — Independent agent reviews (builder ≠ reviewer)
5. Risk Score — Assess risk across multiple dimensions
6. Gate Decision — PM, Design QA, CTO evaluate
7. Release or Rework — Human makes final decision

**Key Principles:**
- Plan before code — Visual planning is mandatory for UI work
- Builder ≠ reviewer — The agent that implements cannot be the final reviewer
- Evidence over claims — Screenshots and parity scores required
- Tests ≠ done — Tests passing is necessary but not sufficient
- Prototype parity — Must match approved design (>= 4.5/5)

**New Hard Rules:**
1. No one-line prompts for UI, architecture, or release-critical work
2. UI work must start with visual plan, not code
3. The builder cannot be the final reviewer
4. A fresh reviewer must review before human
5. Tests passing is never sufficient for UI work
6. Prototype parity is blocking (>= 4.5/5 required)
7. Generic SaaS output is rejected (must look like Proben MVP 6)
8. Parallel agents require isolation (worktrees/branches)
9. Research agents summarize, don't modify production code
10. Agent system is audited regularly for effectiveness

**See:** `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md` for complete system documentation.

## Visual Evidence Workbench

For UI/UX work, Proben.io requires evidence-based review using the Visual Evidence Workbench. This prevents false green checks where agents claim high visual parity scores while the browser shows the old generic implementation.

**Core Principle:**
> **If browser state or screenshot evidence contradicts agent score, the screenshot/browser state is the source of truth.**

**Required Evidence for UI Work:**
1. **Target Screenshot** — Approved prototype from `reference/screenshots/`
2. **Current Screenshot** — Actual browser state captured via Playwright
3. **HTML Report** — Side-by-side comparison with checklist
4. **Requirement Checklist** — PASS/FAIL based on visual evidence
5. **Visual Parity Score** — Scored from comparison (>= 4.5/5 required)

**No text-only acceptance:** Cannot accept UI slice based only on agent-written checklist or "looks good" claims. Must have visual evidence.

**Generate Evidence Report:**
```bash
# Capture screenshot
npx playwright screenshot http://localhost:3000 test-results/phase-X-Y-slice-Z-current.png --wait-for-selector="nav"

# Generate report
node scripts/generate-visual-review-report.js \
  --phase "2.1" \
  --slice "A" \
  --slice-name "Header/Navigation" \
  --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png" \
  --current "test-results/phase-2-1-slice-a-current.png" \
  --route "http://localhost:3000" \
  --output "test-results/visual-review/phase-2-1-slice-a.html"
```

**Blocker Logic (Automatic Rejection):**
- Current screenshot missing
- Target screenshot missing
- Critical UI element missing (as defined in slice requirements)
- Current browser state contradicts agent verdict
- Generic/wrong elements appear

**See:** `docs/qa/VISUAL_EVIDENCE_WORKBENCH.md` for complete documentation.
**See:** `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md` for complete pipeline documentation.

## Visual Quality Verification Pipeline

For UI/UX work, Proben.io requires strict evidence-based validation with three-way screenshots, DOM blockers, and evidence manifests.

**Core Principle:**
> **Screenshot/browser state is the source of truth for UI acceptance.**
> **Agent-generated PASS is advisory only. It is NOT release authority.**

**Three-Way Screenshot Comparison:**
- **BEFORE** — Pre-implementation state
- **TARGET** — Approved prototype
- **AFTER** — Post-implementation state
- **DIFF** — Visual comparison

**Decision Criteria:**
- **ACCEPT** if AFTER looks closer to TARGET than BEFORE
- **REJECT** if AFTER looks identical to BEFORE (no change) or closer to BEFORE than TARGET

**Required Evidence for UI Acceptance:**
- ✅ Screenshots (BEFORE, TARGET, AFTER, DIFF)
- ✅ Evidence manifest (JSON metadata)
- ✅ HTML report (four-panel comparison)
- ✅ DOM blocker tests (PASSED)
- ✅ Reviewer verdict documented
- ✅ Human approval received

**Generate Evidence:**
```bash
# 1. Capture evidence
node scripts/capture-ui-slice-evidence.js \
  --phase "2.1" \
  --slice "A" \
  --route "http://localhost:3000" \
  --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png"

# 2. Run DOM blockers
npm test -- slice-a-header-parity

# 3. Generate diff
node scripts/generate-visual-diff.js \
  --phase "2.1" \
  --slice "A"

# 4. Generate report
node scripts/generate-visual-review-report.js \
  --phase "2.1" \
  --slice "A" \
  --slice-name "Header/Navigation" \
  --target "reference/screenshots/proben-mvp-6/hero-target-light-1.png" \
  --route "http://localhost:3000"
```

**See:** `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md` for complete documentation.

## Proben MVP 6 Porting Rule

For Proben MVP 6 design work, the source of truth is the prototype source files, not text descriptions or generic SaaS patterns.

**Core Principle:**
> **The prototype is the source of truth. Porting is not redesigning.**
> **Green tests do not equal design acceptance.**
> **Agent acceptance is invalid without human visual approval.**

### Source of Truth

**The reference/prototypes/proben-mvp-6/ directory contains the actual design:**
- `index.html` - Entry point and structure
- `radar.css` - All design tokens (colors, typography, spacing, shadows)
- `shared.jsx` - Icons, primitives, sample data
- `LandingMvp5.jsx` - Landing page implementation
- `Mvp6Site.jsx` - Full app with navigation and routing
- `Mvp6Pages.jsx` - Page components
- `Report.jsx` - Report component
- `Mascot.jsx` - Mascot (optional)

### Porting, Not Redesigning

**DO:**
- Read the prototype source files first
- Port exact structure, spacing, typography, colors
- Preserve visual hierarchy and component density
- Use actual text, numbers, labels from prototype
- Map CSS tokens explicitly or port them
- Explain blockers when exact port is difficult

**DO NOT:**
- Create "similar" generic SaaS pages
- Invent new designs or "interpretations"
- Approximate spacing, colors, or typography
- Substitute fonts because you "prefer" another
- Rely on text descriptions alone
- Mark your own work as ACCEPTED

### Agent Acceptance Rules

1. **Prototype-port-engineer** (Level 1 Builder)
   - Can output: `IMPLEMENTED` or `NEEDS REVIEW`
   - CANNOT output: `ACCEPTED`, `DONE`, `COMPLETE`
   - Must use actual prototype source files
   - Must capture screenshot evidence

2. **Visual-regression-reviewer** (Level 2 Principal Reviewer)
   - Compares browser output against prototype
   - Detects generic SaaS patterns
   - CANNOT allow ACCEPTED without human visual review
   - Verdict options: `ACCEPTED` / `NEEDS REWORK` / `REJECTED`

3. **Human Override**
   - Human ALWAYS wins over agent verdict
   - If human says visual mismatch → REJECTED
   - If human says "this doesn't match" → REJECTED
   - No appeal. No debate.

### Required Evidence

For all Proben MVP 6 porting work:
1. **Prototype source files read** - List which files were referenced
2. **Screenshot captured** - Current browser rendering
3. **Specific differences listed** - If any
4. **Files modified** - What was changed
5. **Output status** - `IMPLEMENTED` or `NEEDS REVIEW`

### Generic SaaS Detection

**Automatic REJECTION if generic patterns detected:**
- Full-width navbar (Bootstrap-style)
- Generic blue/purple primary CTA
- "Get Started" without context
- Left-aligned logo with simple links
- Standard card grids without Proben styling
- Missing pill navigation
- Missing "MEETING READINESS" subtitle
- Wrong fonts (not Hanken Grotesk, not IBM Plex Mono)
- Wrong colors (not lime #A6C94A, not blueprint blue)

### Related Skills and Agents

**Skill:**
- `prototype-to-nextjs-porting` - Guidance for exact porting from prototype source

**Agents:**
- `prototype-port-engineer` - Level 1 Builder for porting
- `visual-regression-reviewer` - Level 2 Principal Reviewer for visual QA

### Acceptance Protocol

1. **Implementation** - prototype-port-engineer ports from source
2. **Evidence** - Screenshot captured, files listed
3. **Review** - visual-regression-reviewer compares against prototype
4. **Human Approval** - Human visual review is FINAL gate
5. **Override** - Human says reject → REJECTED, no questions

**See:** `docs/design/PROBEN_MVP6_IMPLEMENTATION_MAP.md` for implementation mapping.

## Design QA Rules and P0 Blocker Definitions

For UI/UX work, Proben.io uses strict design QA rules to ensure visual quality and prevent generic SaaS output.

### Design QA Principles

1. **Visual acceptance is evidence-based** — No UI slice can be accepted from text description alone
2. **Screenshot/browser state is source of truth** — If agent verdict conflicts with browser/screenshot, browser/screenshot wins
3. **P0 blocker caps score** — If any P0 visual blocker fails, maximum score is 2.9/5
4. **Generic SaaS output is rejection** — If implementation looks like generic template, status is NEEDS_REWORK or REJECTED
5. **Visual similarity is not optional** — For Phase 2.1, target is Proben MVP 6 visual direction, not a "reasonable alternative"

### P0 Blockers (Slice A)

**Required Elements (Auto-REJECT if missing):**
- Rounded pill header (not full-width navbar)
- "MEETING READINESS" subtitle
- "Log in" button
- "Run readiness check" CTA
- Required nav items: Sample report, How it works, Checks, Resources, Pricing

**Forbidden Elements (Auto-REJECT if present):**
- "Home" nav item (old generic nav)
- "Build Process" nav item (portfolio nav in wrong place)
- Full-width navbar structure

### Score Cap Rules

1. **P0 Blocker Cap:** If any P0 blocker fails → Maximum score 2.9/5
2. **Evidence Cap:** If no screenshot evidence → Maximum score 2.0/5
3. **DOM Blocker Cap:** If no DOM blocker results → Cannot be ACCEPTED

### Hierarchy of Truth

**When in conflict, this order applies:**
1. Browser state — What actually renders in the browser
2. Screenshot evidence — Captured visual state
3. DOM tests — Deterministic verification
4. Agent verdict — Advisory input only
5. Text claims — Least reliable

### Generic SaaS Detection

**Automatic rejection if generic patterns detected:**

**Navbar Patterns:**
- ❌ Full-width navbar (Bootstrap-style)
- ❌ Left-aligned logo with simple links
- ❌ Right-aligned CTA only
- ✅ Rounded pill container with proper structure

**CTA Patterns:**
- ❌ Generic blue/purple primary CTA
- ❌ "Get Started" without context
- ✅ Green CTA (#10B981) with specific text

**If generic patterns detected:** Verdict = NEEDS_REWORK or REJECTED

### Required Evidence for UI Acceptance

- Target screenshot (approved prototype)
- Before screenshot (pre-implementation)
- After screenshot (post-implementation)
- Diff comparison (visual or HTML)
- Evidence manifest (JSON metadata)
- DOM blocker test results
- HTML visual report
- Route tested
- Screenshot timestamp

**If any evidence is missing:** Maximum score 2.0/5, cannot be ACCEPTED

**See:** `docs/design/DESIGN_ACCEPTANCE_POLICY.md` for complete design acceptance policy.
**See:** `docs/design/DESIGN_PARITY_RUBRIC.md` for detailed scoring rubric.
**See:** `docs/design/GENERIC_SAAS_REJECTION_RULES.md` for generic pattern detection.
**See:** `docs/design/UI_SLICE_ACCEPTANCE_CHECKLIST.md` for comprehensive acceptance checklist.

## Case-inspired Harness Rules

Proben.io uses a Case-inspired agent harness that enforces evidence-based workflow through code and state machines, not only prompts. Inspired by Nick Nisi's "Case" approach from WorkOS.

**Core Philosophy:**
> **Enforce with code, not prompts. Gates matter more than agent names.**

**Key Principles:**
1. **State machine enforcement** — Workflow progress through verifiable states (IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO → DONE)
2. **Evidence requirements** — Every state transition requires proof with SHA-256 hash verification
3. **SHA-256 verification** — Real command output, not marker files. A `.done` file is NOT evidence.
4. **Before/after proof** — UI work requires visual evidence (BEFORE/TARGET/AFTER/DIFF)
5. **Revision budget** — Maximum 2 revision loops before human escalation. No blind retries.
6. **Retro documentation** — Every failure creates learning entry. Every failure is a harness bug until proven otherwise.
7. **Gotchas over skills** — Keep concise handwritten gotchas instead of long generated skills.

**State Machine:**
```
IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO → DONE

REVIEW → IMPLEMENT (if review fails and revision budget < 2)
```

**Forbidden Transitions:**
- IMPLEMENT → CLOSE (no review)
- IMPLEMENT → DONE (no retro)
- VERIFY → CLOSE (no review)
- REVIEW → DONE (no close evidence)
- Any → DONE (without retro for failures)

**Hard Rules:**
1. **Enforce with code, not prompts** — State machine enforced by code, not just instructions
2. **Gates matter more than agent names** — State transitions > agent roles
3. **No state transition without evidence** — Proof required for transition
4. **Marker files are not evidence** — Real output with SHA-256 hash only
5. **Proof must include real command output and SHA-256 hash** — No fake markers
6. **UI proof must include before/target/after evidence** — Visual verification required
7. **Builder cannot approve own work** — No self-approval
8. **Reviewer checks evidence before code** — Evidence-first protocol
9. **Close stage cannot run without complete evidence package** — Evidence completeness
10. **Retro stage must record failures and update gotchas/evals/gates** — Learning required
11. **Maximum 2 revision loops before human escalation** — No blind retries
12. **Every failure is a harness bug until proven otherwise** — System mindset

**Proof Command Execution:**
```bash
# Run command with proof capture
node scripts/harness/run-proof-command.js --name typecheck -- npm run type-check
node scripts/harness/run-proof-command.js --name tests -- npm test
node scripts/harness/run-proof-command.js --name build -- npm run build

# Verify proof manifest
node scripts/harness/verify-proof-manifest.js <run-id>

# Validate state transition
node scripts/harness/validate-state-transition.js --from VERIFY --to REVIEW --run-id <run-id>
```

**Proof Manifest Structure:**
```json
{
  "runId": "uuid",
  "command": "npm run typecheck",
  "startedAt": "2026-06-10T18:00:00Z",
  "finishedAt": "2026-06-10T18:00:05Z",
  "durationMs": 5000,
  "exitCode": 0,
  "logPath": "test-results/harness/run-123/typecheck.log",
  "sha256": "abc123...",
  "status": "PASSED"
}
```

**Required Commands for Release-Critical UI Work:**
- typecheck (TypeScript compilation)
- tests (test execution)
- build (build verification)
- DOM blocker test (required/forbidden elements)
- visual evidence report (screenshot comparison)

**All commands must:**
- Exit with code 0 (for required commands)
- Have verifiable SHA-256 hash
- Have real output captured
- Be within time threshold

**SHA-256 Proof Prevents Fake Execution:**
- Real test output captured to `.log` file
- SHA-256 hash computed from actual output
- Hash stored in proof manifest
- Verification recomputes hash and compares
- Mismatch = fake execution = reject

**Gotchas:**
Concise, high-signal gotchas that agents reliably get wrong:
- Green tests do not mean visual acceptance
- Generic SaaS layout is not acceptable for Phase 2.1
- Header must match Proben MVP 6 direction
- "Home" and "Build Process" must not appear in landing header for Slice A
- "MEETING READINESS", "Log in", and "Run readiness check" are required
- Builder agents cannot approve their own work
- Agent PASS is advisory until evidence passes
- Screenshot/browser state beats text verdict
- If any P0 blocker fails, visual score cannot exceed 2.9/5
- No UI slice proceeds without human approval

**See:** `docs/agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md` for complete harness documentation.
**See:** `docs/agentic-delivery/AGENT_STATE_MACHINE.md` for state machine details.
**See:** `docs/agentic-delivery/EVIDENCE_PROOF_PROTOCOL.md` for proof requirements.
**See:** `docs/agentic-delivery/REVISION_LOOP_POLICY.md` for revision budget rules.
**See:** `docs/gotchas/PROBEN_AGENT_GOTCHAS.md` for gotchas.
**See:** `docs/agent-governance/SKILL_PRUNING_AUDIT.md` for skill pruning.

## Build Learning & Decision Log Rule

**For every meaningful product, design, agent, eval, or release process change:**

You MUST update the learning/decision log documentation:
- `docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md`
- `docs/product-build-history/BUILD_LEARNING_DECISION_INDEX.md`
- `docs/product-build-history/QUALITY_METRICS_HISTORY.md` (when metrics changed)
- `docs/product-build-history/LESSONS_LEARNED.md` (when new reusable learning appears)

**Mandatory Triggers:**
- Failed or rejected slice
- False PASS (agent claimed PASS but human/browser disagreed)
- Human override occurred
- New gate added
- New eval added
- New agent added
- Agent removed or downgraded
- Visual QA process change
- Experiment result
- Architecture decision (ADR)
- Security decision

**No Release-Critical Task Complete** unless:
- Learning/decision log is updated OR explicitly marked as "no new learning" (for trivial changes only)

**Evidence of Learning:**
Each BLD entry must include:
- Trigger: What happened?
- Problem: What failed?
- Root cause: Why did it happen?
- Decision: What did we decide?
- Change applied: What changed in code/docs/agents/process?
- Learning: What did we learn?
- Status: Accepted/In Progress/Superseded/Rejected

**See:** `docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md` for complete learning history.

## Eval Loop

**For every failure, false approval, rejected UI slice, or human override:**

Create an eval-driven loop so failures become reusable regression cases.

### Eval Loop Process

**1. Categorize Failure Mode**
- Identify failure type from taxonomy (see `docs/evals/FAILURE_MODE_TAXONOMY.md`)
- Determine which eval category applies:
  - Visual Quality (VISUAL_MISMATCH, GENERIC_SAAS_OUTPUT, etc.)
  - Agent Reliability (FALSE_AGENT_PASS, TEXT_ONLY_ACCEPTANCE, etc.)
  - Product Acceptance (PRD_ALIGNMENT_FAIL, MISSING_ACCEPTANCE_CRITERIA, etc.)
  - Security/Safety (SECURITY_REVIEW_MISSING, etc.)

**2. Create Eval Case**
- Use `docs/evals/EVAL_CASE_TEMPLATE.md`
- Document with script: `node scripts/create-eval-case-from-failure.js`
- Record: input task, expected behavior, actual behavior, evidence paths, verdicts
- Identify root cause and required gate update

**3. Add or Update Blocker**
- Create new DOM blocker if visual issue
- Update existing blocker if insufficient
- Add visual blocker to checklist
- Update generic pattern detection

**4. Update Relevant Agent Instruction**
- Update agent prompt to prevent recurrence
- Add prohibition to agent instructions
- Add evidence requirement to workflow
- Update inspection order or checklist

**5. Update Relevant Skill/Hook/Test**
- Add skill to catch failure mode
- Add hook to trigger review
- Add test to detect issue
- Update evaluation threshold

**6. Re-run Evals Before Retry**
- Run affected eval category: `node scripts/run-quality-evals.js`
- Verify new blocker catches issue
- Confirm agent instruction updated
- Check regression test added

**7. Record Learning in Build History**
- Update `docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md`
- Update `docs/product-build-history/BUILD_LEARNING_DECISION_INDEX.md`
- Update `docs/product-build-history/QUALITY_IMPROVEMENT_LOG.md`
- Update `docs/product-build-history/FAILURE_TO_GATE_REGISTRY.md`

### Eval Categories

**1. Visual Quality Evals**
- Prototype parity score (target vs implementation)
- Before/target/after comparison quality
- Visual blocker detection (P0/P1 blockers)
- Generic SaaS pattern detection
- Typography/layout/CTA hierarchy quality
- Screenshot evidence completeness

**2. Agent Reliability Evals**
- False PASS count (agent claimed PASS, human disagreed)
- Self-approval attempts (builder reviewed own work)
- Missing evidence (no screenshots, no DOM tests)
- Stale screenshot usage (old timestamp)
- Wrong route tested (screenshot from different URL)
- Incorrect confidence score (overconfident on wrong result)
- Failure to escalate to human

**3. Product Acceptance Evals**
- PRD/RFC/ADR alignment (implementation matches source documents)
- User value clarity (value proposition is clear)
- Acceptance criteria coverage (all requirements met)
- Product clarity score (user problem addressed)
- Requirement-to-test mapping (tests exist for requirements)

**4. Security/Safety Evals**
- Protected file changes (auth, payment, config files)
- Secrets/config edits (API keys, environment variables)
- Auth/payment/data risk (sensitive operations)
- Prompt-injection exposure (unvalidated user input)
- Unsafe external calls (unverified external dependencies)

### Eval Metrics and Thresholds

**Visual Quality:**
- UI slice cannot be accepted if visual parity < 4.5/5
- UI slice cannot be accepted if any P0 blocker fails
- Evidence completeness must be 100% for UI acceptance

**Agent Reliability:**
- Agent reliability is unacceptable if false PASS rate > 0 for release-critical tasks
- Self-approval always results in eval case creation
- Missing evidence automatically creates reliability eval case

**Product Acceptance:**
- Product acceptance score must be >= 4.0/5 for release
- All acceptance criteria must be covered by tests
- PRD/RFC/ADR alignment must be >= 4.5/5

**Overall:**
- Human override always wins over agent verdict
- Tests passing is necessary but not sufficient
- Every failure must create an eval case
- Every false PASS must update a gate, hook, prompt, or test

### Related Documentation

- **Eval System:** `docs/evals/EVALS.md`
- **Eval Registry:** `docs/evals/EVAL_REGISTRY.md`
- **Failure Taxonomy:** `docs/evals/FAILURE_MODE_TAXONOMY.md`
- **Eval Case Template:** `docs/evals/EVAL_CASE_TEMPLATE.md`
- **Visual Quality Evals:** `docs/evals/VISUAL_QUALITY_EVALS.md`
- **Agent Reliability Evals:** `docs/evals/AGENT_RELIABILITY_EVALS.md`
- **Product Acceptance Evals:** `docs/evals/PRODUCT_ACCEPTANCE_EVALS.md`

### Scripts

- **Create Eval Case:** `node scripts/create-eval-case-from-failure.js`
- **Run Quality Evals:** `node scripts/run-quality-evals.js`

### Data Files

- **Visual Quality Cases:** `evals/visual-quality-cases.jsonl`
- **Agent Reliability Cases:** `evals/agent-reliability-cases.jsonl`
- **Product Acceptance Cases:** `evals/product-acceptance-cases.jsonl`

### How This Prevents Green-Text False Acceptance

**Before Eval Loop:**
- Tests passing → Accepted
- Agent claims PASS → Accepted
- Build successful → Accepted
- **Result:** False confidence, quality failures

**After Eval Loop:**
- Tests passing + Visual quality eval → Maybe accepted
- Agent claims PASS + Human verification → Maybe accepted
- Build successful + Product acceptance eval → Maybe accepted
- **Result:** Evidence-based acceptance, regression prevention

**Key Insight:**
> Tests passing is necessary but not sufficient.
> Evals measure what tests cannot: product acceptance, visual quality, agent reliability.

## Agent Operating Model

### Agent Naming Policy

**Prohibited title grades:**
- principal ❌
- senior ❌
- staff ❌
- lead ❌
- chief ❌
- head ❌

**Use clean role names:**
- product-manager ✅
- design-reviewer ✅
- architect ✅
- release-manager ✅
- engineer ✅

**Rationale:** Authority comes from workflow gates and evidence, not inflated titles.

### Agent System Policy

**Core Principles:**
- Keep fewer agents with clearer responsibilities
- Builders cannot approve their own work
- Reviewer verdicts require evidence
- Green tests are necessary but not sufficient
- UI acceptance requires screenshot evidence and visual parity review
- Release acceptance requires product, technical, visual, and human approval

Proben.io uses a simplified agent system with clear authority, evidence requirements, and blocking rules. Reduced from 23 agents to 11 agents (8 core + 3 conditional) to prevent agent sprawl and false green approvals.

### Approved Agent Roster

**Core Agents (8) — Always Active:**

1. **principal-product-manager** (Level 2) — Product requirements, PM evals, product quality
2. **principal-design-reviewer** (Level 2) — Visual QA, design parity, generic SaaS detection
3. **frontend-engineer** (Level 1) — UI implementation, React components
4. **test-eval-engineer** (Level 1) — Tests, evals, quality infrastructure
5. **fresh-review-agent** (Level 2) — Independent review, evidence verification
6. **visual-plan-architect** (Level 1) — Visual planning before implementation
7. **agent-governance-auditor** (Level 4) — System oversight, agent audits
8. **cto-bar-raiser** (Level 3) — Final release authority

**Conditional Agents (3) — Invoke When Needed:**

1. **security-reviewer** (Level 2) — For auth, payments, secrets, AI/prompt risks only
2. **principal-architect** (Level 2) — For architecture, routing, dependencies only
3. **research-analyst** — For research or validation phases only

**Skills:**
- **update-docs-and-build-history** — Documentation for decisions/failures/evals/gates
- **failure-to-prompt-update** — Prompt updates triggered by eval cases
- **portfolio-process-page** — Portfolio page generation
- **worktree-management** — Worktree creation and cleanup

**See:** `docs/agent-governance/AGENT_ROSTER.md` for complete agent roster with detailed responsibilities.

### Builder/Reviewer/Governance/Release Authority Separation

**Authority Levels:**

**Level 4 — System Governance**
- **agent-governance-auditor** — Can audit and recommend changes to entire agent system

**Level 3 — Release Quality**
- **cto-bar-raiser** — Owns final release quality bar, can veto any release

**Level 2 — Principal Reviewers**
- **principal-product-manager** — Can block on product grounds
- **principal-design-reviewer** — Can block on visual grounds
- **security-reviewer** (conditional) — Can block on security grounds
- **principal-architect** (conditional) — Can block on architecture grounds
- **fresh-review-agent** — Can block based on evidence verification

**Level 1 — Builders**
- **frontend-engineer** — Cannot approve own work
- **test-eval-engineer** — Cannot approve own work
- **visual-plan-architect** — Cannot approve own work

**Rule:** Builders build, reviewers validate, governance audits, humans approve.

### No Self-Approval Rule

**Critical Rule:** A builder must never approve its own work.

**Enforcement:**
- Builder agents (Level 1) cannot score or approve their own work
- Fresh reviewer must be different agent than builder
- Reviewer must verify independence before review
- Agent PASS is advisory only, not release authority

**See:** `docs/agent-governance/AGENT_AUTHORITY_MATRIX.md` for complete authority matrix.

### Evidence-First Review Rule

**For UI Work:**
- Reviewer agents must inspect evidence before code
- Evidence inspection order: Target → Before → After → Diff → DOM → Rubric → Code
- No UI acceptance without screenshot evidence
- Screenshot/browser state is source of truth

**For All Work:**
- Evidence must be produced and verified
- Claims must be verified against evidence
- Agent verdict ≠ acceptance without evidence

### Visual QA Source-of-Truth Rule

**Hierarchy of Truth:**
1. **Browser state** — What actually renders in the browser
2. **Screenshot evidence** — Captured visual state
3. **DOM tests** — Deterministic verification
4. **Agent verdict** — Advisory input only
5. **Text claims** — Least reliable

**Rule:** If screenshots contradict text verdict, screenshots win. If browser state contradicts agent verdict, browser wins.

### Eval Loop Rule

**For every failure, false approval, rejected UI slice, or human override:**

1. **Categorize failure mode** — Identify failure type from taxonomy
2. **Create eval case** — Use `EVAL_CASE_TEMPLATE.md`
3. **Add or update blocker** — Create/update DOM blocker or gate
4. **Update agent instruction** — Strengthen agent prompts
5. **Update skill/hook/test** — Add prevention measures
6. **Re-run evals** — Verify prevention works
7. **Record learning** — Update build learning log

**See:** `docs/evals/EVALS.md` for complete eval system.

### Failure-to-Gate Rule

**Every failure must create a gate, eval, or documented learning.**

**Prevention Pattern:**
- Failure → Eval case → Gate update → Agent instruction update → Regression test
- No recurrence without documented prevention
- No release without verified prevention

**See:** `docs/product-build-history/FAILURE_TO_GATE_REGISTRY.md` for failure-to-gate mapping.

### Human Override Rule

**Human override always wins over agent verdict.**

**When Human Override Occurs:**
1. Automatic eval case creation
2. Root cause analysis
3. Agent instruction update
4. Regression test addition
5. Learning documentation

**Rule:** If human disagrees with agent, human wins. Always.

### Agent System Reduction

**From 23 agents to 11 agents (52% reduction):**

**Agents Merged (7):**
- product-manager → principal-product-manager
- ai-product-strategist → principal-product-manager
- design-quality-reviewer → principal-design-reviewer
- lead-architect → principal-architect
- implementation-critic → fresh-review-agent
- qa-release-engineer → test-eval-engineer + cto-bar-raiser
- visual-systems-designer → visual-plan-architect

**Downgraded to Skills (4):**
- documentation-engineer → update-docs-and-build-history skill
- portfolio-documentation-engineer → portfolio-process-page skill
- prompt-optimizer → failure-to-prompt-update skill
- diagram-engineer → mermaid-diagram-generator skill

**Deleted (2):**
- context-architect — No clear value add
- process-storyteller — Narrative fluff without quality value

**Disabled (1):**
- ai-engineer — Not applicable to Phase 1

**See:** `docs/agent-governance/AGENT_RETIREMENT_DECISIONS.md` for detailed retirement decisions.

### Hard Rules (All Agents)

**Every relevant agent must follow:**

1. **Do not claim ACCEPTED without evidence** — Evidence must be produced and verified
2. **Do not use green tests as proof of product quality** — Tests are necessary but not sufficient
3. **If screenshots contradict text verdict, screenshots win** — Visual evidence > text claims
4. **If browser state contradicts agent verdict, browser wins** — Browser state > agent verdict
5. **If any P0 blocker fails, final verdict cannot be ACCEPTED** — P0 failures are automatic rejection
6. **Builder agents cannot score or approve their own work** — No self-approval
7. **Reviewer agents must inspect evidence before code** — Evidence-first review protocol
8. **Governance auditor must identify false approvals** — Detect and eliminate weak agents
9. **Human approval is required before release** — Final authority always human

### Agent Governance System

Proben.io uses a four-level agent authority system to prevent self-approval and ensure quality.

**Four Responsibility Levels:**

**Level 1 — Builders:** Create implementation artifacts. Cannot approve own work.
- Examples: frontend-engineer, documentation-engineer, ai-engineer, test-writer

**Level 2 — Principal Reviewers:** Validate quality and can block release.
- Examples: principal-product-manager, principal-design-reviewer, principal-architect, security-reviewer, qa-release-engineer

**Level 3 — CTO Bar Raiser:** Owns final release quality bar.
- Can block release, verify all gates passed, require evidence package

**Level 4 — Agent Governance Auditor:** Audits the agent system itself.
- Can evaluate agent usefulness, flag false approvals, recommend agent removal

**Hard Rule:** A builder must never approve its own work.

**See:** `docs/agent-governance/AGENT_AUTHORITY_MATRIX.md` for complete authority matrix.

## Common Patterns

### Creating a New Feature

1. Create or update ADR documenting the architecture
2. Write BDD scenarios for expected behavior
3. Implement tests based on BDD scenarios
4. Implement the feature
5. Run security review
6. Update documentation

### Fixing a Bug

1. Write a failing test that reproduces the bug
2. Fix the bug with minimal changes
3. Verify the test passes
4. Add regression test if applicable
5. Document root cause in commit message

### Updating Dependencies

1. Review changelog for breaking changes
2. Update in separate PR
3. Run full test suite
4. Test manually in development environment
5. Document any required migrations

## Memory System Usage

### When to Save Memory

- **User Memories**: When learning about user preferences, role, or expertise
- **Feedback Memories**: When receiving corrections or validation of approach
- **Project Memories**: When learning about timelines, stakeholders, or constraints
- **Reference Memories**: When discovering external resources or systems

### Memory Format

```markdown
---
name: short-descriptive-name
description: One-line summary
metadata:
  type: [user|feedback|project|reference]
---

Content with **Why:** and **How to apply:** sections
```

## Skills and Agents

### Available Skills

- **visual-plan-builder**: Create visual implementation plans before UI work
- **fresh-agent-review**: Independent review of implementation work
- **worktree-isolation**: Define when work must be isolated
- **risk-scored-review**: Assess risk across multiple dimensions
- **security-review**: Security analysis of pending changes
- **research-digest**: Summarize research findings
- **prompt-optimization**: Optimize prompts for better results
- **request-intake**: Structured intake of new requirements
- **release-check**: Pre-release validation

### Specialized Agents

**Level 4 — System Governance:**
- **agent-governance-auditor:** Audits agent system, recommends changes

**Level 3 — Release Quality:**
- **cto-bar-raiser:** Owns final release quality bar, can veto any release

**Level 2 — Principal Reviewers:**
- **principal-product-manager:** Product requirements, product quality evaluation
- **principal-design-reviewer:** Visual quality and design parity review
- **principal-architect:** Architecture design and review
- **security-reviewer:** Security-focused code review
- **qa-release-engineer:** Quality assurance and release management

**Level 1 — Builders:**
- **visual-plan-architect:** Creates visual implementation plans before UI work
- **fresh-review-agent:** Independently reviews implementation work
- **worktree-orchestrator:** Defines worktree/branch strategy
- **frontend-engineer:** Frontend component development
- **documentation-engineer:** Documentation and technical writing
- **ai-engineer:** AI/ML feature implementation (future phases)

**Research:**
- **research-analyst:** Research and competitive analysis

**Key:** Builders (Level 1) cannot approve their own work. Principal Reviewers (Level 2) validate quality. CTO Bar Raiser (Level 3) owns final release bar. Agent Governance Auditor (Level 4) evaluates the system.

## Troubleshooting

### Build Failures
- Check `docs/BUILD_PROCESS.md` for build requirements
- Review recent dependency changes
- Verify environment variables are set

### Test Failures
- Run tests locally with verbose output
- Check for flaky tests that need isolation
- Verify test data and fixtures

### Security Issues
- Run `/security-review` skill
- Check `docs/SECURITY.md` for guidelines
- Document security considerations in ADR

## Resources

- Project Documentation: `docs/`
- Architecture Decisions: `docs/ADR/`
- Behavior Specifications: `docs/BDD/`
- Security Guidelines: `docs/SECURITY.md`
- Build Process: `docs/BUILD_PROCESS.md`
- Visual Agentic Delivery: `docs/agentic-delivery/`
- Agent Governance: `docs/agent-governance/`
- Agent Definitions: `.claude/agents/`

## Getting Started

### Phase 1 Focus (Current)
**Goal**: Build and deploy a public demo MVP with:
1. Landing page (`/`)
2. Sample readiness report (`/sample-report`)
3. Readiness check demo (`/app/readiness-check`)
4. Portfolio/build-process page (`/portfolio/build-process`)
5. Basic tests
6. Vercel-ready deployment

### Phase 1 Constraints
- Static/mock data only (no database)
- No authentication required
- No real AI providers (deterministic algorithms)
- No payment processing
- Public-facing demo only

### For First-Time Setup
1. `docs/PRD.md` - Product requirements (Phase 1 scope)
2. `docs/ROADMAP.md` - Implementation roadmap
3. `docs/BUILD_PROCESS.md` - Local development setup
4. `docs/RFC-0001-architecture.md` - Architecture decisions

### For Phase 2+ (Future)
- `docs/DOMAIN_SETUP.md` - Domain and infrastructure
- `docs/DEPLOYMENT.md` - Full deployment configuration
- `docs/SECURITY.md` - Complete security requirements

---

**Last Updated**: 2026-06-10
**Current Phase**: 1 (MVP Public Demo)
**Maintained By**: Solo Founder

## Background Task Harness Rules

Proben.io uses a Case-inspired agent harness with state machine enforcement, evidence requirements, and blocking rules. Inspired by background task workflow monitors and Nick Nisi's "Case" from WorkOS.

### Core Philosophy

> **Enforce with code, not prompts. Gates matter more than agent names.**

**Key Principles:**
1. **State machine enforcement** — Workflow progress through verifiable states
2. **Evidence requirements** — Every state transition requires proof with SHA-256 verification
3. **SHA-256 verification** — Real command output, not marker files
4. **Before/after proof** — UI work requires visual evidence
5. **Revision budget** — Maximum 2 revision loops before human escalation
6. **Retro documentation** — Every failure creates a learning entry
7. **Gotchas over skills** — Keep concise handwritten gotchas

### State Machine

```
IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO → DONE
```

**Forbidden Transitions:**
- ✗ IMPLEMENT → CLOSE (no review)
- ✗ IMPLEMENT → DONE (no retro)
- ✗ VERIFY → CLOSE (no review)
- ✗ REVIEW → DONE (no close evidence)
- ✗ Any → DONE (without retro)

### Role Mapping

**State → Role → Authority Level:**

| State | Role | Level | Mapped Agents |
|-------|------|-------|---------------|
| IMPLEMENT | Implementer | 1 | frontend-engineer, visual-plan-architect, test-eval-engineer |
| VERIFY | Verifier | 1 | test-eval-engineer, DOM blocker checker |
| REVIEW | Reviewer | 2 | fresh-review-agent, principal-design-reviewer, principal-product-manager |
| CLOSE | Closer | 3 | principal-product-manager, cto-bar-raiser, principal-architect (conditional) |
| RETRO | Retro | 4 | agent-governance-auditor |

### Hard Rules

1. **No state transition without evidence** — Proof manifests required
2. **No UI acceptance without before/target/after evidence** — Screenshots mandatory
3. **No Slice B until Slice A passes harness** — Sequential slice progression
4. **Revision loops max 2** — No blind retries
5. **Every repeated failure is a harness bug** — System improvement required
6. **Marker files are not evidence** — SHA-256 hash of real output only
7. **Agent PASS is advisory only** — Evidence verification required
8. **Reviewer must inspect evidence before code** — Evidence-first protocol
9. **Gates matter more than agent names** — State machine enforcement
10. **Do not trust agent claims** — Trust artifacts

### Evidence Requirements

**For All Work:**
- typecheck.log (TypeScript compilation)
- tests.log (test execution)
- build.log (build verification)
- proof-manifest.json (with SHA-256 hashes)

**For UI Work (additional):**
- before.png (pre-implementation)
- target.png (approved prototype)
- after.png (post-implementation)
- diff.html or side-by-side-report.html
- dom-blocker-results.json
- visual-review-report.html

### Revision Budget

- Maximum: 2 revision loops per slice
- Start at 0, increment on each REVIEW → IMPLEMENT transition
- Escalate to human at budget exhaustion
- No blind retries ("try again" without specific blockers)

### KPIs

**Target Metrics:**
- False PASS rate: 0
- Evidence completeness: 100%
- Revision loops: ≤ 2
- Skill usefulness: Measured by evals

### Generating Background Task Report

```bash
# Generate report
node scripts/harness/generate-background-task-report.js

# View report
open test-results/harness/latest/background-task-report.html
```

**Report shows:**
- Workflow status (RUNNING/BLOCKED/NEEDS_REWORK/ACCEPTED/REJECTED)
- Phase list with current state
- Role mapping
- Gates between phases
- Evidence artifacts
- KPIs
- Current slice status
- Retro notes
- Next safe step

### Agent State Files

**Implementer:** `.claude/agents/implementer.md`
- IMPLEMENT state role
- Cannot approve own work
- Hands off to Verifier

**Verifier:** `.claude/agents/verifier.md`
- VERIFY state role
- Generates proof manifests
- Hands off to Reviewer

**Reviewer:** `.claude/agents/reviewer.md`
- REVIEW state role
- Evidence-first review (NOT code-first)
- Hands off to Closer or back to Implementer

**Closer:** `.claude/agents/closer.md`
- CLOSE state role
- Final quality gate
- Hands off to Retro

**Retro:** `.claude/agents/retro.md`
- RETRO state role
- Documents learning
- Completes workflow

### Related Documentation

- **[BACKGROUND_TASK_HARNESS.md](docs/agentic-delivery/BACKGROUND_TASK_HARNESS.md)** — Harness system
- **[AGENT_PHASE_DASHBOARD.md](docs/agentic-delivery/AGENT_PHASE_DASHBOARD.md)** — Phase dashboard
- **[CASE_INSPIRED_AGENT_HARNESS.md](docs/agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md)** — Case-inspired harness
- **[AGENT_STATE_MACHINE.md](docs/agentic-delivery/AGENT_STATE_MACHINE.md)** — State machine details
- **[EVIDENCE_PROOF_PROTOCOL.md](docs/agentic-delivery/EVIDENCE_PROOF_PROTOCOL.md)** — Proof requirements
- **[REVISION_LOOP_POLICY.md](docs/agentic-delivery/REVISION_LOOP_POLICY.md)** — Revision budget rules

### Scripts

- **run-proof-command.js** — SHA-256 verified command execution
- **verify-proof-manifest.js** — Hash verification
- **validate-state-transition.js** — State transition enforcement
- **create-retro-entry.js** — Retro entry generation
- **generate-harness-report.js** — HTML harness reports
- **generate-background-task-report.js** — Background task dashboard

