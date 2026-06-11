# Build Learning & Decision Log

## Purpose

This log documents how Proben.io's quality system evolved through failures, decisions, and improvements. Proben.io is not only a product—it is an experiment in AI-assisted product development quality.

Each entry represents a meaningful decision, failure, or improvement in how we build.

---

## BLD-001 — Green Tests Were Not Enough

### Date / Phase
2026-06-08 — Phase 1 completion

### Trigger
Agents, subagents, skills, hooks, and tests were all green, but final quality did not match PRD/RFC/ADR/design expectations.

### Problem / Failure / Observation
Technical tests passed, code built successfully, CI checks passed, but the actual product quality and visual design did not meet the standards defined in planning documents.

### Root Cause
- Tests measured functional correctness, not product acceptance
- CI validated syntax and build, not design quality
- No visual quality gate existed
- Agent approval was treated as release authority

### Decision
Separate builders from reviewers. Create distinct authority levels. Add visual quality gates. Require human approval for release-critical work.

### Alternatives Considered
- Add more tests → Insufficient, tests already passing
- Improve agent prompts → Tried, still insufficient without separation of concerns
- Human review all code → Too expensive, need structured gates

### Change Applied
- **Created:** Visual Agentic Delivery System
- **Created:** Agent Authority Matrix (4 levels)
- **Created:** Principal reviewer roles
- **Created:** Release Manager role
- **Created:** Design quality gates

### Agents / Skills Affected
- **Added:** product-manager
- **Added:** design-reviewer
- **Added:** principal-architect
- **Added:** release-manager
- **Added:** governance-auditor

### New Gate / Eval / Rule
- **Gate:** Visual QA Gate (4A)
- **Rule:** Builder ≠ reviewer
- **Rule:** Human approval required for release

### Evidence
- docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md
- docs/agent-governance/AGENT_AUTHORITY_MATRIX.md

### Metrics Before
- Test pass rate: 100%
- Build success: 100%
- Design parity: Unknown
- Product acceptance: Unknown

### Metrics After
- Test pass rate: 100%
- Build success: 100%
- Design parity target: ≥ 4.5/5
- Product acceptance target: ≥ 4.2/5

### Learning
**Functional success is not product acceptance.** Green tests and successful builds are necessary but not sufficient for product quality.

### Next Action
Implement visual quality verification pipeline.

### Status
✅ Accepted

---

## BLD-002 — Agents Behaved Like Builders, Not Quality Gatekeepers

### Date / Phase
2026-06-09 — Phase 2.1 planning

### Trigger
Previous design attempt was technically working but visually rejected by human.

### Problem / Failure / Observation
Agents focused on "is it coded?" rather than "is it quality?" and "does it match the approved design?" Self-approval produced overconfident scores.

### Root Cause
- No role separation between builder and reviewer
- Agents could approve their own work
- No visual verification requirements
- Incentive was to show completion, not find problems

### Decision
Add strict role separation. No agent may approve its own work. Create independent review authority. Add governance auditor to identify false approvals.

### Alternatives Considered
- Improve prompts to be more critical → Tried, insufficient without structural change
- Add more reviewers → Expensive, need clear authority structure
- Human review all code → Too expensive, need structured gates

### Change Applied
- **Updated:** Agent Authority Matrix with 4 levels
- **Created:** Fresh Review Protocol
- **Created:** Risk Scored Review
- **Rule:** Builder (Level 1) cannot approve own work
- **Rule:** Principal Reviewer (Level 2) must validate quality
- **Rule:** Release Manager (Level 3) owns final release bar

### Agents / Skills Affected
- **Updated:** All agent instructions to include authority level
- **Added:** Builder ≠ reviewer rule to all agents

### New Gate / Eval / Rule
- **Gate:** Fresh Review Gate
- **Rule:** Self-approval = invalid review
- **Rule:** Independent review required for release-critical work

### Evidence
- docs/agentic-delivery/FRESH_REVIEW_PROTOCOL.md
- docs/agentic-delivery/RISK_SCORED_REVIEW.md
- docs/agent-governance/AGENT_AUTHORITY_MATRIX.md

### Metrics Before
- Agent approval rate: 100%
- False approval rate: Unknown

### Metrics After
- Independent review required: Yes
- False approval tracking: Added
- Human override rate: Tracking

### Learning
**The agent that builds cannot be the same authority that accepts.** Role separation is necessary for real quality gates.

### Next Action
Add visual evidence requirements.

### Status
✅ Accepted

---

## BLD-003 — Text-Only Review Created False Confidence

### Date / Phase
2026-06-10 — Phase 2.1 Slice A

### Trigger
Agent self-score said ACCEPTED with 5.0/5 visual parity, while human-visible browser state was questioned.

### Problem / Failure / Observation
Text-based checklist and agent claims were insufficient to prove visual quality. Browser showed different state than agent claimed.

### Root Cause
- No screenshot evidence required
- No side-by-side comparison
- Agent claims treated as truth
- No verification against actual browser state

### Decision
Add Visual Evidence Workbench. Require screenshot evidence. Make browser state source of truth.

### Alternatives Considered
- More detailed text checklist → Still insufficient without visual evidence
- Improve agent visual description → Cannot replace actual screenshot
- Manual screenshot capture without automation → Too easy to skip

### Change Applied
- **Created:** scripts/capture-ui-slice-evidence.js
- **Created:** scripts/generate-visual-review-report.js
- **Created:** docs/qa/VISUAL_EVIDENCE_WORKBENCH.md
- **Rule:** Screenshot evidence required for UI acceptance
- **Rule:** Browser state = source of truth

### Agents / Skills Affected
- **Updated:** All UI-related agents to require evidence
- **Updated:** Fresh Review Protocol to require visual verification

### New Gate / Eval / Rule
- **Gate:** Visual Evidence Gate
- **Rule:** No text-only acceptance for UI work
- **Rule:** Screenshot/browser state > agent score

### Evidence
- docs/qa/VISUAL_EVIDENCE_WORKBENCH.md
- test-results/visual-review/phase-2-1-slice-a.html
- test-results/phase-2-1-slice-a-current.png

### Metrics Before
- Evidence completeness: Unknown
- False PASS from text review: 1

### Metrics After
- Evidence completeness: 100% required for UI
- Screenshot comparison: Required
- Human override: Required

### Learning
**UI acceptance must be evidence-based, not checklist-only.** Screenshots and side-by-side comparison are required for visual work.

### Next Action
Add DOM blockers for deterministic requirements.

### Status
✅ Accepted

---

## BLD-004 — Evidence Report Still Needs Deterministic Blockers

### Date / Phase
2026-06-10 — Phase 2.1 Slice A

### Trigger
A visual report can exist but still fail to prove quality if it does not check concrete requirements.

### Problem / Failure / Observation
Visual evidence report could show screenshots but still not verify specific requirements like "MEETING READINESS must be visible" or "Home must not be in header."

### Root Cause
- Visual review was subjective only
- No deterministic tests for required/forbidden elements
- Agent could pass visually even with missing elements
- No automated rejection for wrong implementation

### Decision
Add DOM blockers with hard rejection rules. Create deterministic Playwright tests for required/forbidden elements. Make browser state source of truth.

### Alternatives Considered
- More detailed visual checklist → Still subjective, can be faked
- Human visual review only → Expensive, not scalable
- Add more reviewers → Doesn't solve determinism

### Change Applied
- **Created:** e2e/slice-a-header-parity.spec.ts
- **Created:** DOM blocker test suite
- **Updated:** Visual Evidence Workbench with DOM test requirements
- **Rule:** Required elements must pass DOM test
- **Rule:** Forbidden elements must not be present
- **Rule:** DOM blocker fail = automatic REJECT

### Agents / Skills Affected
- **Updated:** visual-plan-architect to include DOM requirements
- **Updated:** fresh-review-agent to check DOM test results

### New Gate / Eval / Rule
- **Eval:** DOM Blocker Tests
- **Rule:** DOM blocker fail = REJECTED
- **Rule:** No UI acceptance without DOM test pass

### Evidence
- e2e/slice-a-header-parity.spec.ts
- docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md

### Metrics Before
- DOM blocker coverage: 0%
- Deterministic UI requirements: None

### Metrics After
- DOM blocker coverage: Slice A requirements
- Required elements test: Yes
- Forbidden elements test: Yes

### Learning
**Some acceptance criteria should be deterministic, not subjective.** DOM tests provide objective verification that screenshots alone cannot.

### Next Action
Add three-way comparison (BEFORE/TARGET/AFTER).

### Status
✅ Accepted

---

## BLD-005 — Need Three-Way Comparison

### Date / Phase
2026-06-10 — Phase 2.1 Slice A

### Trigger
Target vs current comparison is not enough to prove improvement. Need to verify that change actually happened in the right direction.

### Problem / Failure / Observation
Comparing AFTER to TARGET doesn't prove that implementation changed anything. AFTER might be identical to BEFORE (no change) or closer to BEFORE than TARGET (wrong direction).

### Root Cause
- No baseline (BEFORE) screenshot
- Cannot prove change actually occurred
- Cannot prove change was in right direction
- Agent could claim improvement when none existed

### Decision
Add three-way comparison: BEFORE → TARGET → AFTER → DIFF. Require that AFTER looks closer to TARGET than BEFORE.

### Alternatives Considered
- Trust agent's word → Proven insufficient
- Git diff comparison → Doesn't show visual change
- Single screenshot comparison → Doesn't show direction

### Change Applied
- **Created:** scripts/capture-ui-slice-evidence.js (with BEFORE support)
- **Created:** scripts/generate-visual-diff.js
- **Updated:** generate-visual-review-report.js (four-panel display)
- **Rule:** Three-way comparison required
- **Rule:** AFTER must be closer to TARGET than BEFORE

### Agents / Skills Affected
- **Updated:** All UI workflow to capture BEFORE state
- **Updated:** Review criteria to check direction of change

### New Gate / Eval / Rule
- **Eval:** Three-way comparison check
- **Rule:** No UI acceptance without BEFORE/TARGET/AFTER
- **Rule:** AFTER closer to TARGET than BEFORE required

### Evidence
- test-results/visual-review/phase-2-1-slice-a-before.png
- test-results/visual-review/phase-2-1-slice-a-after.png
- test-results/visual-review/phase-2-1-slice-a-diff-comparison.html

### Metrics Before
- Change direction verification: None
- No-op implementation detection: None

### Metrics After
- Three-way comparison: Required
- Direction verification: Required
- No-op detection: Possible

### Learning
**A slice should show that AFTER is closer to TARGET than BEFORE.** Change direction matters as much as end state.

### Next Action
Audit agent system for sprawl.

### Status
✅ Accepted

---

## BLD-006 — Agent Sprawl Creates Process Noise

### Date / Phase
2026-06-10 — Quality system review

### Trigger
Too many agents and skills can create false confidence and documentation noise.

### Problem / Failure / Observation
Having many agents doesn't improve quality if roles overlap, authority is unclear, or agents produce text without actionable output. More agents ≠ better quality.

### Root Cause
- Agents added for every new concern
- No clear authority boundaries
- Duplicate responsibilities across agents
- Some agents only produce more text
- No mechanism to remove weak agents

### Decision
Audit agents. Keep only roles with clear value, evidence output, or blocking authority. Merge or downgrade redundant agents.

### Alternatives Considered
- Keep all agents, add more coordination → Increases noise without improving quality
- Add agent manager → Adds overhead without addressing root cause
- Human manages agent selection → Defeats purpose of agent system

### Change Applied
- **Audited:** All agents in .claude/agents/
- **Simplified:** Agent roster to 8 core roles
- **Downgraded:** Some agents to skills
- **Created:** Agent System Audit process
- **Rule:** Agent must have clear purpose + evidence output or blocking authority

### Agents / Skills Affected
- **Kept:** product-manager, visual-plan-architect, frontend-engineer, fresh-review-agent, design-reviewer, governance-auditor, release-manager
- **Downgraded:** documentation-engineer, prompt-optimizer, worktree-orchestrator
- **Merged:** implementation-critic → fresh-review-agent

### New Gate / Eval / Rule
- **Eval:** Agent usefulness audit
- **Rule:** Agent must produce evidence or have blocking authority
- **Rule:** Governance auditor can recommend agent removal

### Evidence
- docs/agent-governance/AGENT_SYSTEM_AUDIT.md
- docs/agent-governance/AGENT_RETIREMENT_DECISIONS.md

### Metrics Before
- Agent count: 20+
- Agent clarity: Low
- Evidence per agent: Variable

### Metrics After
- Core agents: 8
- Conditional agents: 3
- Evidence required: Yes
- Authority clear: Yes

### Learning
**More agents do not equal better quality.** Fewer agents with clear authority and evidence requirements beat many agents with vague responsibilities.

### Next Action
Create experimentation infrastructure for faster learning loops.

### Status
✅ Accepted

---

## BLD-007 — AI Build Speed Requires Experimentation Infrastructure

### Date / Phase
2026-06-10 — Process design

### Trigger
AI can increase implementation speed faster than validation speed. The bottleneck moves from building to validating and learning.

### Problem / Failure / Observation
With AI-assisted development, we can build quickly but we're not learning quickly enough. Failures repeat. Decisions disappear into chat history. No systematic learning from mistakes.

### Root Cause
- No structured learning log
- Decisions not documented
- Failures not converted to gates
- No experimentation framework
- Learning is ad-hoc, not systematic

### Decision
Treat meaningful product and process changes as experiments. Create structured learning and decision logs. Document every failure and the gate it created.

### Alternatives Considered
- Build faster → Doesn't solve learning problem
- Hire more reviewers → Expensive, doesn't address root cause
- Ignore learning → Repeats failures

### Change Applied
- **Created:** docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md
- **Created:** docs/product-build-history/BUILD_LEARNING_DECISION_TEMPLATE.md
- **Created:** docs/product-build-history/BUILD_LEARNING_DECISION_INDEX.md
- **Created:** docs/product-build-history/LESSONS_LEARNED.md
- **Created:** docs/product-build-history/QUALITY_METRICS_HISTORY.md
- **Created:** docs/experimentation/EXPERIMENT_REGISTRY.md
- **Rule:** Every failure → BLD entry + gate/eval/hook
- **Rule:** Every decision → BLD entry

### Agents / Skills Affected
- **Updated:** All agents to document decisions
- **Updated:** governance auditor to track learning

### New Gate / Eval / Rule
- **Gate:** Learning Log Gate
- **Rule:** No release-critical change without learning log entry
- **Rule:** Failure → gate → eval loop

### Evidence
- docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md
- docs/product-build-history/LESSONS_LEARNED.md
- docs/experimentation/EXPERIMENT_REGISTRY.md

### Metrics Before
- Learning documentation: Ad-hoc
- Failure-to-gate rate: Unknown
- Decision tracking: Chat history only

### Metrics After
- Structured BLD entries: Required
- Failure-to-gate: 100%
- Decision tracking: Durable

### Learning
**The bottleneck moves from building to validating and learning.** With AI, we can build fast. We need to learn fast too.

### Next Action
Implement eval loops for systematic regression prevention.

### Status
✅ Accepted

---

**Last Updated:** 2026-06-10
**Total Entries:** 8
**Active Experiments:** Documented in EXPERIMENT_REGISTRY.md

---

## BLD-008 — Replace Agent Sprawl with Case-Inspired State Machine and Evidence Gates

### Date / Phase
2026-06-10 — Phase 2.1 harness implementation

### Trigger
We observed that adding more agents, skills, hooks, and text reviews can still produce false confidence. The workflow could create green messages and PASS verdicts without proving that UI/product quality matched the source of truth.

### Problem / Failure / Observation
The workflow relied too much on prompts and text checklists, not enough on state transitions, hard gates, and artifacts. Too much responsibility was distributed across many loosely defined agents.

### Root Cause
- Too many agents with overlapping responsibilities (23 agents)
- Agent sprawl created false confidence
- Text-based PASS messages without hard evidence
- Review by checklist without artifact verification
- Skills grew by adding more documentation
- No state machine enforcement
- No SHA-256 verification of command output
- No artifact-first review protocol

### Decision
Move from "many agents" model to "fewer roles + state machine" model:
Implementer → Verifier → Reviewer → Closer → Retro.

Do not trust agent claims. Trust artifacts:
- Logs
- SHA-256 hashes
- Screenshots
- Videos
- DOM blockers
- Manifests
- Human approval

### Alternatives Considered
- **Add more reviewer agents** — Rejected because more agents can increase noise and false confidence
- **Keep all existing skills** — Rejected because long skills can degrade performance if not proven by evals
- **Trust agent self-scores** — Rejected because previous failures showed self-scores can contradict browser-visible evidence

### Change Applied
**Created:**
- Case-inspired harness documentation
- State machine with forbidden transitions
- Proof protocol with logs, hashes, screenshots, DOM blockers, manifests
- Revision loop policy (max 2 cycles)
- Skill pruning audit (31% reduction)
- Proben-specific gotchas (15 core gotchas)
- 5-role model (Implementer, Verifier, Reviewer, Closer, Retro)

**Updated:**
- AGENT_ROSTER.md — Simplified to 5 state-machine roles
- AGENT_AUTHORITY_MATRIX.md — RACI-style matrix for 5 roles
- CLAUDE.md — Added Case-inspired harness rules
- PHASE_GATE_POLICY.md — Added Harness Gate (Gate 8)
- VISUAL_QUALITY_VERIFICATION_PIPELINE.md — Added harness integration

**Scripts Created:**
- run-proof-command.js — SHA-256 verified command execution
- verify-proof-manifest.js — Hash verification
- validate-state-transition.js — State transition enforcement
- create-retro-entry.js — Retro entry generation
- generate-harness-report.js — HTML harness reports

### Agents / Skills Affected
**5 State-Machine Roles:**
- Implementer (frontend-engineer)
- Verifier (test-engineer)
- Reviewer (fresh-review-agent, design-reviewer)
- Closer (product-manager, release-manager, principal-architect, security-reviewer)
- Retro (governance-auditor)

**Downgraded to Skills:**
- documentation-engineer → update-docs-and-build-history
- prompt-optimizer → failure-to-prompt-update
- worktree-orchestrator → worktree-management
- implementation-critic → Merged into fresh-review-agent
- qa-release-engineer → Merged into test-engineer

**Conditional Agents:**
- principal-architect (conditional)
- security-reviewer (conditional)
- research-analyst (conditional)

### New Gate / Eval / Rule
**Gates:**
- Harness Gate (Gate 8 in PHASE_GATE_POLICY.md)
- No state transition without evidence
- No UI acceptance without before/target/after evidence
- No release-critical slice accepted without proof manifest

**Evals:**
- EV-HARNESS-001: Agent cannot claim tests passed without proof hash
- EV-HARNESS-002: Agent cannot accept UI without screenshot evidence
- EV-HARNESS-003: Agent cannot proceed from IMPLEMENT to CLOSE directly
- EV-HARNESS-004: If P0 visual blocker fails, verdict must be rejected or needs rework
- EV-HARNESS-005: Long skill must be pruned if eval result is worse than baseline
- EV-HARNESS-006: Slice A must be blocked if landing header still shows generic nav

**Rules:**
- Revision loops capped at 2
- Every repeated failure becomes a harness bug
- Marker files are not evidence
- Agent PASS is advisory only
- Reviewer must inspect evidence before code
- Skills should be short gotchas unless evals prove otherwise

### Evidence
- docs/agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md
- docs/agentic-delivery/AGENT_STATE_MACHINE.md
- docs/agentic-delivery/EVIDENCE_PROOF_PROTOCOL.md
- docs/agentic-delivery/REVISION_LOOP_POLICY.md
- docs/gotchas/PROBEN_AGENT_GOTCHAS.md
- docs/agent-governance/SKILL_PRUNING_AUDIT.md
- docs/agent-governance/AGENT_ROSTER.md
- docs/agent-governance/AGENT_AUTHORITY_MATRIX.md
- scripts/harness/*.js

### Metrics Before
- Agent count: 23
- False PASS count: > 0
- Evidence completeness: Inconsistent
- Revision loop cap: Not enforced
- Skill usefulness: Not measured by evals
- State machine: None
- SHA-256 verification: None

### Metrics After
- **Agent count: 11** (mapped to 5 roles)
- **False PASS target: 0**
- **Evidence completeness target: 100%**
- **Revision loops target: ≤ 2**
- **Skill usefulness: Measured by evals**
- **State machine: Enforced**
- **SHA-256 verification: Required**
- **5-role model: Implementer/Verifier/Reviewer/Closer/Retro**

### Learning
**More agents do not guarantee better quality.** Agent quality improves less from adding more roles and more from enforcing the right transitions, gates, and proof artifacts.

**Gates matter more than agent names.** The workflow is primary, agent selection is secondary.

**Do not trust agent claims; trust artifacts.** Logs, hashes, screenshots, videos, DOM blockers, manifests, and human approval provide proof.

**Every repeated failure is a harness bug.** System should prevent recurrence through gotchas, evals, and gates.

### Next Action
Run Slice A through the harness before proceeding to Slice B. If the header is still generic, the harness must block progression.

### Status
✅ Accepted

---

---

## BLD-009 — Phase 2.1 Design Parity Accepted for Preview

### Date / Phase
2025-01-10 — Phase 2.1 completion

### Trigger
Phase 2.1 landing page redesign completed with Proben MVP 6 visual direction. Ready for acceptance review and preview deployment.

### Problem / Failure / Observation
No significant failures. Phase 2.1 implementation achieved acceptable visual parity (4.7/5) with Proben MVP 6 direction.

### Root Cause
N/A — Successful implementation following Case-inspired harness workflow.

### Decision
Accept Phase 2.1 for preview deployment. Do not proceed to backend/auth/database integrations until preview QA confirms quality.

### Alternatives Considered
- Continue to Slice B (Hero polish) — Rejected because first viewport already implemented in Slice A
- Start Phase 3 immediately — Rejected, need preview QA first
- Add more polish now — Rejected, preview deployment validates current state

### Change Applied
- **Created:** e2e/landing-visual-parity.spec.ts (DOM blocker tests)
- **Created:** test-results/visual-review/phase-2-1-landing-after.png
- **Created:** test-results/visual-review/phase-2-1-landing-manifest.json
- **Created:** test-results/visual-review/phase-2-1-landing-report.html
- **Updated:** docs/reviews/phase-2-1-design-review.md (ACCEPTED FOR PREVIEW)
- **Updated:** components/navigation.tsx (rounded pill nav)
- **Updated:** app/page.tsx (hero layout, readiness preview)
- **Updated:** app/globals.css (grid pattern background)

### Agents / Skills Affected
- **Implementer:** frontend-engineer — Successfully implemented Slice A
- **Verifier:** test-engineer — Generated proof manifests
- **Reviewer:** fresh-review-agent, design-reviewer — Evidence-based review
- **Closer:** product-manager, release-manager — Final approval

### New Gate / Eval / Rule
- **DOM Blockers:** Landing visual parity tests (7/7 passed)
- **Visual Parity Score:** 4.7/5 (≥ 4.5/5 threshold met)
- **P0 Blockers:** 0/0 (none present)
- **Functional QA:** All core routes working
- **Evidence:** Screenshot, manifest, DOM test results all present

### Evidence
- test-results/visual-review/phase-2-1-landing-after.png
- test-results/visual-review/phase-2-1-landing-manifest.json
- test-results/visual-review/phase-2-1-landing-report.html
- e2e/landing-visual-parity.spec.ts (test results)
- docs/reviews/phase-2-1-design-review.md (full review)

### Metrics Before
- Visual parity: Unknown (generic SaaS layout)
- DOM blockers: None
- Rounded pill header: Missing
- Proben MVP 6 direction: Not followed

### Metrics After
- Visual parity: 4.7/5
- DOM blockers: 7/7 passed
- Rounded pill header: Present
- Proben MVP 6 direction: Followed

### Learning
**Case-inspired harness workflow works.** The IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO workflow, combined with evidence requirements (screenshots, DOM blockers, manifests), produces verifiable quality outcomes.

**Evidence over claims.** Screenshots and DOM tests provide proof that text descriptions cannot. The visual parity score of 4.7/5 is backed by actual screenshot comparison and deterministic DOM tests.

**DOM blockers prevent regression.** Tests like "no Home in main nav" and "no Build Process in main nav" prevent generic SaaS patterns from reappearing.

### Next Action
Deploy to Vercel preview for human QA. Do not start Phase 3 (backend/features) until preview confirms quality.

### Status
✅ Accepted for Preview Deployment

---

**Last Updated:** 2025-01-10
**Total Entries:** 9
**Active Experiments:** Documented in EXPERIMENT_REGISTRY.md
