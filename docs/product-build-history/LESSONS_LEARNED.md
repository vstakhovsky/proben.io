# Lessons Learned — Proben.io Build System

## Purpose

Concise lessons grouped by theme. These are reusable insights from Build Learning & Decision Log entries.

---

## Product / PM Lessons

### Green Tests ≠ Product Quality
**From:** BLD-001

**Lesson:** Technical tests passing and build succeeding are necessary but not sufficient for product quality. CI validates syntax, not design or user value.

**Application:** Always include product acceptance evaluation, visual parity scoring, and PRD alignment checks before release.

---

### Functional Success ≠ Product Acceptance
**From:** BLD-001

**Lesson:** Just because code works doesn't mean it's ready for users. Product acceptance requires clarity, completeness, and alignment with requirements.

**Application:** Separate "code works" from "product accepted" gates.

---

## Design QA Lessons

### Visual Acceptance Must Be Evidence-Based
**From:** BLD-003

**Lesson:** Text descriptions and checklists are insufficient for visual work. Screenshots and side-by-side comparison are required.

**Application:** Never accept UI work from text description alone. Always require visual evidence.

---

### Screenshot/Browser State Is Source of Truth
**From:** BLD-003, BLD-004

**Lesson:** If agent verdict conflicts with browser/screenshot, browser/screenshot wins. Visual claims must be verified against actual browser state.

**Application:** Make visual evidence mandatory. Treat browser state as authoritative.

---

### Some Criteria Should Be Deterministic
**From:** BLD-004

**Lesson:** Visual review is important but not sufficient for all requirements. DOM tests provide objective verification for required/forbidden elements.

**Application:** Add DOM blockers for concrete requirements. Use tests for objective verification, review for subjective assessment.

---

### Change Direction Matters
**From:** BLD-005

**Lesson:** Comparing end state to target doesn't prove improvement. Need to verify that AFTER is closer to TARGET than BEFORE.

**Application:** Require three-way comparison (BEFORE/TARGET/AFTER) for all UI changes.

---

### Generic SaaS Output Should Be Rejected
**From:** Design quality gates

**Lesson:** If implementation looks like a generic template rather than approved prototype direction, it needs rework. "Reasonable alternative" is not sufficient.

**Application:** For Phase 2.1, target is Proben MVP 6 visual direction, not generic SaaS.

---

## Agent Governance Lessons

### Builder Cannot Review Own Work
**From:** BLD-002

**Lesson:** The agent that implements cannot be the final reviewer. Self-approval produces overconfident scores and misses problems.

**Application:** Separate builders (Level 1) from reviewers (Level 2+). Require independent review for release-critical work.

---

### Agent PASS Is Advisory, Not Authority
**From:** BLD-003, BLD-004, Phase gate policy

**Lesson:** Agent-generated PASS is advisory only. It is NOT release authority. Release requires evidence, deterministic blockers, reviewer verdict, and human approval.

**Application:** Treat agent scores as input, not decision. Require human approval for release.

---

### More Agents ≠ Better Quality
**From:** BLD-006

**Lesson:** Having many agents with overlapping responsibilities creates noise and false confidence. Fewer agents with clear authority beat many agents with vague responsibilities.

**Application:** Audit agents regularly. Keep only roles with clear value, evidence output, or blocking authority. Merge or remove redundant agents.

---

### Gates Matter More Than Agent Names
**From:** BLD-008

**Lesson:** The workflow is primary, agent selection is secondary. Enforcing state transitions and evidence gates is more important than having the "right" agent names.

**Application:** Focus on state machine enforcement, proof verification, and artifact validation rather than agent selection.

---

### Do Not Trust Agent Claims; Trust Artifacts
**From:** BLD-008

**Lesson:** Agent claims of "PASS" or "looks good" are not sufficient evidence. Only verifiable artifacts provide proof: logs with SHA-256 hashes, screenshots, DOM blockers, manifests, human approval.

**Application:** Require artifact verification. Marker files are NOT evidence. SHA-256 hash of real command output is required.

---

### Evidence-First Review, Not Code-First
**From:** BLD-008

**Lesson:** Reviewers must check evidence before code. Code-first review allows agents to infer quality from implementation rather than verify against source of truth.

**Application:** Enforce evidence-first review protocol: Manifest → Before → Target → After → Diff → DOM → Code.

---

### Every Repeated Failure Is a Harness Bug
**From:** BLD-008

**Lesson:** If the same failure occurs twice, it's a harness bug, not an agent mistake. The system should prevent recurrence through gotchas, evals, and gates.

**Application:** Fix the harness, not blame the agent. Update gotchas, evals, gates, and agent instructions.

---

## Evals Lessons

### Every Failure Should Become a Regression Case
**From:** Eval system design

**Lesson:** Failures are expensive but valuable if they prevent recurrence. Every false PASS, rejected slice, or human override should create an eval case.

**Application:** Create eval case for every failure. Update gate/eval/hook/test to prevent recurrence.

---

### Learning Must Be Durable
**From:** BLD-007

**Lesson:** Decisions and failures disappear into chat history. Learning must be documented in durable files to be reusable.

**Application:** Every meaningful change requires a BLD entry. Every failure requires a gate/eval update.

---

## Release Quality Lessons

### Tests Passing Is Necessary But Not Sufficient
**From:** BLD-001, BLD-003

**Lesson:** Tests passing is a prerequisite, not a proof of quality. Visual parity, product acceptance, and evidence completeness are also required.

**Application:** Never claim "done" based on tests alone. Require evidence, review, and human approval.

---

### Human Override Is Final Authority
**From:** BLD-003, Phase gate policy

**Lesson:** Agent verdicts are preliminary. Human can and should override when evidence contradicts agent claims.

**Application:** Include human override section in all evidence reports. Human decision is final.

---

### Release Completeness Requires Domain Verification
**From:** PDL-002 — Domain Launch

**Lesson:** A release is not complete when the build passes. A release is complete only when production deployment is ready, domain configuration is valid, the public URL loads the expected product, the user verifies the experience, and evidence is recorded in the build history.

**Application:** Always verify production domain configuration, run smoke tests on public URL, and record evidence of successful launch. A working preview deployment is not the same as a launched product.

---

## Portfolio Storytelling Lessons

### Quality System Is Part of the Story
**From:** BLD-007

**Lesson:** How Proben.io was built is as interesting as what it does. The quality system itself demonstrates AI-assisted development capabilities.

**Application:** Document build learning publicly. Show how quality system evolved through failures and improvements.

---

## Cross-Cutting Principles

### Source of Truth Hierarchy
1. **Browser/Screenshot state** — For visual acceptance
2. **Artifacts (logs, hashes)** — For proof verification
3. **Deterministic tests** — For concrete requirements
4. **Human approval** — For release decision
5. **Agent verdict** — Advisory input only
6. **Text claims** — Least reliable

### Failure Response Pattern
1. **Document** in BLD log
2. **Categorize** failure mode
3. **Create** eval case
4. **Add/update** gate, eval, hook, or test
5. **Re-run** evals before retry
6. **Record** learning
7. **Fix harness** (if repeated failure)

### Evidence Requirements
- **UI work:** Screenshots (BEFORE/TARGET/AFTER), DOM tests, visual report, manifest
- **Product work:** PRD alignment, acceptance criteria, eval results
- **Agent work:** Evidence output, blocking authority, reviewer verification
- **Proof verification:** SHA-256 hashes, real command output, exit codes

### State Machine Principles
- **Enforce with code, not prompts** — State transitions enforced by scripts
- **Gates matter more than agent names** — Workflow is primary
- **No transition without evidence** — Each state requires proof verification
- **Revision budget enforced** — Maximum 2 loops, then human escalation
- **Retro required for learning** — Every run requires retro entry

### Artifact Trust Hierarchy
1. **Real command output** — Captured stdout/stderr
2. **SHA-256 hash** — Cryptographic proof of output
3. **Screenshot evidence** — Actual browser state
4. **DOM blocker results** — Deterministic verification
5. **Human approval** — Final authority

---

**Last Updated:** 2026-06-10
**Total Lessons:** 20

## Phase 2.1 Lessons

### Evidence-Based Review Works

**Learning:** Screenshots + DOM tests + visual rubric = verifiable quality

**Evidence:**
- Visual parity score 4.7/5 backed by actual screenshot comparison
- DOM tests prove required elements present and forbidden elements absent
- No reliance on text-only claims or agent self-scores

**Application:**
- Always capture screenshot evidence for UI work
- Always run DOM blockers for deterministic verification
- Always use visual rubric with scoring (not PASS/FAIL only)

### DOM Blockers Prevent Generic SaaS Regression

**Learning:** Tests like "no Home in main nav" prevent generic patterns from returning

**Evidence:**
- e2e/landing-visual-parity.spec.ts has 7 tests
- All tests passed
- Tests specifically check for old generic elements ("Home", "Build Process")

**Application:**
- Add DOM blockers for each new UI slice
- Test both required elements (must exist) and forbidden elements (must not exist)
- Run DOM blockers before claiming ACCEPTED

### First Implementation Can Be Accepted Without Revision

**Learning:** Quality-first approach reduces revision loops

**Evidence:**
- Phase 2.1 accepted on first review (0 revision loops)
- Visual parity 4.7/5 met threshold on first try
- No NEEDS_REWORK or REJECTED verdict

**Application:**
- Invest in visual planning before implementation
- Use target screenshots as reference
- Run DOM blockers early ( VERIFY phase)

### Background Task Harness Provides Workflow Visibility

**Learning:** Dashboard shows phases, gates, evidence, KPIs in real-time

**Evidence:**
- test-results/harness/latest/background-task-report.html generated
- Shows IMPLEMENT → VERIFY → REVIEW → CLOSE workflow
- Displays role mapping, evidence artifacts, KPIs

**Application:**
- Use background task reports for complex workflows
- Track KPIs across phases
- Visual dashboard helps humans understand agent work

---
