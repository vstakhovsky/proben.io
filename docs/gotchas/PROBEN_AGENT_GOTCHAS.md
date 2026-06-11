# Proben Agent Gotchas

## Purpose

Concise, high-signal gotchas that agents reliably get wrong in Proben.io development. Keep only what prevents failures and improves eval results.

## Philosophy

> **Too many generated skills can make results worse. Keep concise handwritten gotchas instead.**

**Pruning Principle:** If a gotcha is long but doesn't improve eval results, prune it.

## Core Gotchas

### Visual Quality Gotchas

#### 1. Green Tests ≠ Visual Acceptance
**Gotcha:** Tests passing does NOT mean UI is visually acceptable.

**Reality:** Tests verify functionality only, not visual quality, prototype parity, or brand fit.

**Evidence Required:** Visual parity score >= 4.5/5, evidence completeness = 100%

**False PASS Risk:** HIGH — Agents may claim acceptance based on green tests alone.

---

#### 2. Generic SaaS Layout is NOT Acceptable
**Gotcha:** Generic "clean SaaS" layout is automatically rejected.

**Reality:** Phase 2.1 target is Proben MVP 6 visual direction, not Bootstrap-style templates.

**Specific Rejections:**
- Full-width navbar (Bootstrap-style) → REJECTED
- Generic white cards with shadow → REJECTED
- Generic blue/purple CTA → REJECTED
- "Get Started" without context → REJECTED

**Acceptance Required:** Pill-shaped header, brand green (#10B981), specific Proben elements.

---

#### 3. Header Must Match Proben MVP 6 Direction
**Gotcha:** Header must be pill-shaped, not full-width navbar.

**Reality:** Proben MVP 6 uses rounded pill header container, not generic navbar.

**Required Elements (P0 Blockers):**
- Rounded pill container (not full-width)
- "Proben" logo + "MEETING READINESS" subtitle
- Nav items: Sample report, How it works, Checks, Resources, Pricing
- CTAs: "Log in" (right side), "Run readiness check" (green, right side)

**Forbidden Elements (P0 Blockers):**
- "Home" (old generic nav) → REJECT if present
- "Build Process" (portfolio nav) → REJECT if present

---

### Evidence Gotchas

#### 4. Builder Agents Cannot Approve Their Own Work
**Gotcha:** Builder agents (Level 1) cannot score or approve their own work.

**Reality:** Self-approval creates false confidence. Builder ≠ reviewer rule is enforced.

**Required:** Fresh review agent (Level 2) must review before approval.

---

#### 5. Agent PASS Is Advisory Until Evidence Passes
**Gotcha:** Agent claiming "PASS" or "ACCEPTED" is NOT final acceptance.

**Reality:** Agent PASS is advisory only. Final acceptance requires:
- Evidence verification
- SHA-256 hash verification
- DOM blocker tests passed
- Visual evidence complete (if UI)
- Human approval

---

#### 6. Screenshot/Browser State Beats Text Verdict
**Gotcha:** If screenshots contradict text verdict, screenshots win.

**Reality:** Browser state is source of truth. Text descriptions are advisory.

**Hierarchy:**
1. Browser state (what actually renders)
2. Screenshot evidence (captured state)
3. DOM tests (deterministic verification)
4. Agent verdict (advisory input)
5. Text claims (least reliable)

---

#### 7. If Any P0 Blocker Fails, Score Cannot Exceed 2.9/5
**Gotcha:** P0 blocker failure = maximum score 2.9/5, automatic rejection.

**Reality:** Evidence requirements override scoring. No matter how good other dimensions are, P0 failure = rejection.

**Score Cap Rule:**
- Any P0 blocker fails → Maximum score 2.9/5
- No screenshot evidence → Maximum score 2.0/5
- No DOM blocker results → Cannot be ACCEPTED

---

### Process Gotchas

#### 8. No UI Slice Proceeds Without Human Approval
**Gotcha:** No UI slice can proceed to next slice without human approval.

**Reality:** Even if all agents say "ACCEPTED," human must review visual evidence and approve.

**Required for UI Progression:**
- Visual parity >= 4.5/5
- Evidence completeness = 100%
- All P0 blockers pass
- Generic patterns absent
- Human approval recorded

---

### Process Gotchas

#### 9. Marker Files Are NOT Evidence
**Gotcha:** A `.done` or `.success` file is NOT evidence of completion.

**Reality:** Evidence must be real command output with SHA-256 hash verifiable.

**Required:** Proof manifest with SHA-256 hash of real command output.

---

#### 10. No State Transition Without Evidence
**Gotcha:** Cannot progress through state machine without evidence.

**Reality:** Each state transition requires:
- Proof manifests passed
- SHA-256 hashes verified
- Evidence complete
- Entry criteria met

**Blocked Transitions:**
- IMPLEMENT → CLOSE (no review)
- IMPLEMENT → DONE (no retro)
- VERIFY → CLOSE (no review)
- REVIEW → DONE (no close evidence)

---

#### 11. Do Not Trust Agent Claims
**Gotcha:** Agent claims of "PASS" or "looks good" are NOT sufficient evidence.

**Reality:** Only artifacts provide proof:
- Logs with SHA-256 hashes
- Screenshots (before/target/after)
- DOM blocker results
- Visual reports
- Human approval

**Agent PASS Status:** Advisory only, not release authority

---

#### 12. Review Evidence Before Code
**Gotcha:** Reviewers must check evidence before code, not code before evidence.

**Reality:** Evidence-first review order:
1. Manifest
2. Before screenshot
3. Target screenshot
4. After screenshot
5. Diff report
6. DOM blockers
7. Code diff (scope verification only)

**No code-first review:** Infer quality from code is forbidden.

---

#### 13. Every Repeated Failure is a Harness Bug
**Gotcha:** If the same failure occurs twice, it's a harness bug, not an agent mistake.

**Reality:** System should prevent recurrence through:
- New gotcha
- New eval
- New gate
- Updated agent instruction
- Updated skill/hook/test

**Rule:** Fix the harness, not blame the agent.

---

#### 14. Skills Should Be Short Gotchas
**Gotcha:** Long generated skills make results worse.

**Reality:** Prefer short, high-signal gotchas from real failures.

**Rule:** If a skill is long but doesn't improve eval results, prune it.

---

#### 15. No Slice B Until Slice A Passes Harness
**Gotcha:** Cannot proceed to Slice B until Slice A passes through harness.

**Reality:** Slice A must go through state machine with evidence verification.

**If Slice A header is still generic:** Harness must block progression.

**Next Step:** Verify harness correctly blocks generic header.
**Gotcha:** Cannot progress through state machine without evidence.

**Reality:** Each state transition requires:
- Proof manifests passed
- SHA-256 hashes verified
- Evidence complete
- Entry criteria met

**Blocked Transitions:**
- IMPLEMENT → CLOSE (no review)
- IMPLEMENT → DONE (no retro)
- VERIFY → CLOSE (no review)
- REVIEW → DONE (no close evidence)

---

## Gotcha Categories

### Visual Quality (1-3, 7)
- Green tests ≠ visual acceptance
- Generic SaaS layout rejection
- Header must match Proben MVP 6 direction
- P0 blocker score cap

### Evidence Authority (4-6, 9, 11, 12)
- Builder cannot approve own work
- Agent PASS is advisory
- Screenshot/browser state beats text
- P0 blocker score cap
- Do not trust agent claims
- Review evidence before code

### Process Enforcement (8, 10, 13, 14, 15)
- Human approval required for UI
- Marker files not evidence
- No state transition without evidence
- Every repeated failure is a harness bug
- Skills should be short gotchas
- No Slice B until Slice A passes harness

---

**Last Updated:** 2026-06-10
**Version:** 2.0 (added harness gotchas)
**Total Gotchas:** 15 core gotchas

## Gotcha Format

Each gotcha includes:
- **Gotcha:** What agents get wrong
- **Reality:** What is actually required
- **Evidence Required:** What proves the gotcha
- **False PASS Risk:** Risk level if ignored
- **Related Eval:** Eval case that created this gotcha

## Adding New Gotchas

### Criteria

Add new gotcha when:
- Eval case reveals repeated failure pattern
- Agent makes same mistake repeatedly
- False PASS occurs due to misunderstanding
- Human override reveals agent confusion

### Process

1. Identify failure pattern from eval case
2. Write concise gotcha (1-3 sentences)
3. Document evidence requirements
4. Add to appropriate category
5. Update agent instructions to reference gotcha
6. Track in failure-to-gate registry

### Gotcha Pruning

**Audit Criteria:**
- Does gotcha prevent failures? YES → Keep
- Is gotcha still relevant? YES → Keep
- Is gotcha redundant? YES → Delete
- Is gotcha too long? YES → Condense

**Audit Frequency:** Quarterly (with agent system audit)

## Related Documentation

- **[../agent-governance/SKILL_PRUNING_AUDIT.md](../agent-governance/SKILL_PRUNING_AUDIT.md)** — Skill pruning
- **[../product-build-history/FAILURE_TO_GATE_REGISTRY.md](../product-build-history/FAILURE_TO_GATE_REGISTRY.md)** — Gotcha-to-gate mapping
- **[../evals/EVAL_REGISTRY.md](../evals/EVAL_REGISTRY.md)** — Eval cases

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Total Gotchas:** 10 core gotchas
