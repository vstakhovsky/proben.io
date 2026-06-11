# Eval Case Registry

## Purpose

Central registry of all evaluation cases for Proben.io. Tracks failures, false approvals, rejected UI slices, and human overrides to ensure they become reusable regression cases.

## Summary Statistics

| Category | Total Cases | Open | In Progress | Closed | Recurrences |
|----------|-------------|------|------------|--------|-------------|
| Visual Quality | 2 | 0 | 0 | 2 | 0 |
| Agent Reliability | 1 | 0 | 0 | 1 | 0 |
| Product Acceptance | 1 | 0 | 0 | 1 | 0 |
| Security/Safety | 0 | 0 | 0 | 0 | 0 |
| **Total** | **4** | **0** | **0** | **4** | **0** |

## Eval Cases by Category

### Visual Quality Evals

#### EV-VIS-001 — Generic Header Accepted
- **Date:** 2026-06-10
- **Phase:** 2.1
- **Slice:** A
- **Failure Type:** VISUAL_MISMATCH
- **Status:** CLOSED
- **Agent Verdict:** ACCEPTED
- **Human Verdict:** REJECTED
- **Root Cause:** Agent lacked explicit visual blockers and generic SaaS detection
- **Prevention:** Added DOM blockers for P0 elements, generic SaaS pattern detection
- **Data File:** `evals/visual-quality-cases.jsonl`

**Issue:** Agent accepted Slice A while human-visible header still appeared generic with full-width navbar, missing MEETING READINESS subtitle, and wrong nav items.

**Required Blockers:**
- Home visible (forbidden old nav)
- Build Process visible (forbidden portfolio nav)
- MEETING READINESS missing (required subtitle)
- CTA missing (required element)

**Regression Test:** `e2e/slice-a-header-parity.spec.ts`

---

#### EV-VIS-002 — Text-Only UI Review
- **Date:** 2026-06-10
- **Phase:** 2.1
- **Slice:** A
- **Failure Type:** TEXT_ONLY_ACCEPTANCE
- **Status:** CLOSED
- **Agent Verdict:** ACCEPTED
- **Human Verdict:** REJECTED
- **Root Cause:** Reviewer inspected code before visual evidence
- **Prevention:** Evidence-first review protocol, screenshot requirements
- **Data File:** `evals/visual-quality-cases.jsonl`

**Issue:** UI review relied on text checklist without side-by-side screenshot evidence.

**Root Cause:** Reviewer inspected code first and inferred quality from implementation without visual comparison.

**Prevention Added:**
- Evidence-first review protocol (6 steps)
- Screenshot requirements for UI acceptance
- Three-way comparison required
- Code review only after visual evidence

---

### Agent Reliability Evals

#### EV-AGENT-001 — Self-Review Bias
- **Date:** 2026-06-10
- **Phase:** 2.1
- **Slice:** A
- **Failure Type:** FALSE_AGENT_PASS
- **Status:** CLOSED
- **Agent Verdict:** ACCEPTED
- **Human Verdict:** REJECTED
- **Root Cause:** Same agent implemented and reviewed work
- **Prevention:** Builder ≠ reviewer, fresh review protocol
- **Data File:** `evals/agent-reliability-cases.jsonl`

**Issue:** Builder/self-review bias produced overconfident score while implementation was visually incorrect.

**Root Cause:** Same agent implemented and reviewed work, creating confirmation bias.

**Prevention Added:**
- Builder ≠ reviewer rule
- Fresh review agent protocol
- Independence verification before review
- Agent PASS is advisory only

---

### Product Acceptance Evals

#### EV-PROD-001 — Technical ≠ Product Success
- **Date:** 2026-06-10
- **Phase:** 2.1
- **Slice:** A
- **Failure Type:** PRD_ALIGNMENT_FAIL
- **Status:** CLOSED
- **Agent Verdict:** ACCEPTED (tests passing)
- **Human Verdict:** REJECTED (visual parity insufficient)
- **Root Cause:** Green tests ≠ product acceptance
- **Prevention:** Product acceptance gate, visual quality gates
- **Data File:** `evals/product-acceptance-cases.jsonl`

**Issue:** Technically working UI (tests passing, build successful) does not match PRD/RFC/ADR/design source of truth for visual quality.

**Root Cause:** Green tests and passing build are necessary but not sufficient for product acceptance.

**Prevention Added:**
- Product acceptance gate
- Visual quality gates
- Evidence-based review requirements
- Prototype parity threshold

---

## Index by Failure Mode

### VISUAL_MISMATCH
- EV-VIS-001 — Generic Header Accepted

### TEXT_ONLY_ACCEPTANCE
- EV-VIS-002 — Text-Only UI Review

### FALSE_AGENT_PASS
- EV-AGENT-001 — Self-Review Bias

### PRD_ALIGNMENT_FAIL
- EV-PROD-001 — Technical ≠ Product Success

## Index by Phase

### Phase 2.1
- EV-VIS-001 — Generic Header Accepted
- EV-VIS-002 — Text-Only UI Review
- EV-AGENT-001 — Self-Review Bias
- EV-PROD-001 — Technical ≠ Product Success

## Index by Slice

### Slice A
- EV-VIS-001 — Generic Header Accepted
- EV-VIS-002 — Text-Only UI Review
- EV-AGENT-001 — Self-Review Bias
- EV-PROD-001 — Technical ≠ Product Success

## Prevention Measures Added

### DOM Blockers
- Required nav items: Sample report, How it works, Checks, Resources, Pricing
- Forbidden nav items: Home, Build Process
- Required elements: MEETING READINESS subtitle, Log in button, Run readiness check CTA
- Required layout: Rounded pill header (not full-width navbar)

### Agent Instructions Updated
- Principal Design Reviewer: Evidence-first inspection order
- Fresh Review Agent: Evidence-first review protocol
- Frontend Engineer: Prohibited actions, evidence capture requirements

### Gates Added
- Gate 2A: Visual Plan Gate
- Gate 4A: Visual QA Gate
- Gate 6: Learning Log Gate

### Process Changes
- Evidence-first review protocol
- Three-way screenshot comparison
- Generic SaaS pattern detection
- Score cap rules (P0 blocker cap, evidence cap)

## Metrics

### Visual Quality Metrics
- Average visual parity score (before prevention): 2.5/5
- Target visual parity score: 4.5/5
- Evidence completeness (before prevention): 60%
- Target evidence completeness: 100%

### Agent Reliability Metrics
- False PASS rate (before prevention): 100% (1/1 cases)
- Target false PASS rate: 0%
- Self-approval attempts (before prevention): 1
- Target self-approval attempts: 0

### Product Acceptance Metrics
- Product acceptance failures (Phase 2.1): 1
- PRD alignment failures (Phase 2.1): 1
- Target product acceptance score: 4.0/5

### Overall Quality Metrics
- Total eval cases: 4
- Cases closed: 4 (100%)
- Recurrences: 0
- Prevention effectiveness: 100%

## Related Documentation

- **[EVALS.md](EVALS.md)** — Master eval system documentation
- **[VISUAL_QUALITY_EVALS.md](VISUAL_QUALITY_EVALS.md)** — Visual quality eval specifications
- **[AGENT_RELIABILITY_EVALS.md](AGENT_RELIABILITY_EVALS.md)** — Agent reliability eval specifications
- **[PRODUCT_ACCEPTANCE_EVALS.md](PRODUCT_ACCEPTANCE_EVALS.md)** — Product acceptance eval specifications
- **[EVAL_CASE_TEMPLATE.md](EVAL_CASE_TEMPLATE.md)** — Template for eval cases
- **[FAILURE_MODE_TAXONOMY.md](FAILURE_MODE_TAXONOMY.md)** — Complete failure taxonomy

## Data Files

- **`evals/visual-quality-cases.jsonl`** — Visual quality eval cases
- **`evals/agent-reliability-cases.jsonl`** — Agent reliability eval cases
- **`evals/product-acceptance-cases.jsonl`** — Product acceptance eval cases

## Adding New Eval Cases

### Process

1. **Create Eval Case** — Use `EVAL_CASE_TEMPLATE.md`
2. **Assign eval_id** — Follow format `EV-{CATEGORY}-{NUMBER}`
3. **Document Failure** — Complete all required fields
4. **Update Registry** — Add to appropriate section
5. **Add to Data File** — Append to appropriate JSONL file
6. **Implement Prevention** — Add gates, tests, or process changes
7. **Update Metrics** — Refresh summary statistics
8. **Close When Complete** — Update status when prevention verified

### Automation

Use `scripts/create-eval-case-from-failure.js`:

```bash
node scripts/create-eval-case-from-failure.js \
  --category "VIS" \
  --failure-type "VISUAL_MISMATCH" \
  --phase "2.1" \
  --slice "B" \
  --agent-verdict "ACCEPTED" \
  --human-verdict "REJECTED" \
  --root-cause "Missing DOM blocker" \
  --evidence "path/to/evidence"
```

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Total Eval Cases:** 4
**Cases Closed:** 4 (100%)
**Recurrences:** 0
