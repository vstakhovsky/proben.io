# Failure Mode Taxonomy

## Purpose

Comprehensive taxonomy of failure modes in AI-assisted product development. Each failure mode includes detection, prevention, and recovery strategies. Used for categorizing eval cases and designing prevention gates.

## Failure Modes

### 1. VISUAL_MISMATCH

**Description:** Implementation does not match approved prototype

**Detection:**
- Visual parity score < 4.5/5
- Generic SaaS patterns present
- P0/P1 blockers failed
- Screenshot shows different layout/structure than target

**Prevention:**
- Visual planning before implementation
- Three-way screenshot comparison (BEFORE/TARGET/AFTER)
- DOM blocker tests for required/forbidden elements
- Generic SaaS pattern detection
- Evidence-based review (screenshot > text)

**Recovery:**
- Return to visual planning stage
- Rebuild from approved plan
- Add visual blockers to DOM tests
- Update agent design instructions

**Examples:**
- Full-width navbar instead of pill header
- Generic cards instead of Proben MVP 6 design
- Wrong typography (sans-serif headlines instead of serif)
- Missing CTAs or wrong CTA positions

**Eval Category:** Visual Quality Evals

**Related Documentation:**
- `docs/design/DESIGN_PARITY_RUBRIC.md`
- `docs/design/GENERIC_SAAS_REJECTION_RULES.md`
- `docs/design/UI_SLICE_ACCEPTANCE_CHECKLIST.md`

---

### 2. FALSE_AGENT_PASS

**Description:** Agent claimed PASS when human/visual evidence disagreed

**Detection:**
- Agent verdict: ACCEPTED
- Human verdict: REJECTED or NEEDS_REWORK
- Evidence contradicts agent score
- Browser state ≠ agent description

**Prevention:**
- Builder ≠ reviewer (no self-approval)
- Evidence-first review protocol
- Screenshot/browser state as source of truth
- Agent PASS is advisory only
- Human approval required for release

**Recovery:**
- Create agent reliability eval case
- Update agent instructions
- Add evidence requirements
- Strengthen reviewer independence
- Add gate to catch similar failures

**Examples:**
- Agent says "looks good" but screenshot shows generic navbar
- Agent scores 5.0/5 but browser shows wrong elements
- Agent claims ACCEPTED but human rejects on visual inspection

**Eval Category:** Agent Reliability Evals

**Related Documentation:**
- `.claude/agents/fresh-review-agent.md`
- `.claude/agents/principal-design-reviewer.md`
- `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md`

---

### 3. TEXT_ONLY_ACCEPTANCE

**Description:** UI accepted without screenshot evidence

**Detection:**
- No target screenshot in evidence
- No before/after comparison
- No DOM blocker tests
- Agent verdict based only on code inspection or text checklist

**Prevention:**
- Mandatory screenshot evidence for UI work
- Three-way comparison required
- DOM blocker tests required
- Evidence manifest required
- Reviewer inspects screenshots before code

**Recovery:**
- Reject current acceptance
- Require screenshot evidence
- Re-run review with evidence
- Update reviewer instructions
- Add evidence gate

**Examples:**
- Agent accepted UI based only on code review
- Checklist completed without visual comparison
- Text-only report with no screenshots

**Eval Category:** Visual Quality Evals + Agent Reliability Evals

**Related Documentation:**
- `docs/qa/VISUAL_EVIDENCE_WORKBENCH.md`
- `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md`

---

### 4. STALE_SCREENSHOT

**Description:** Evidence is outdated or from wrong time

**Detection:**
- Timestamp shows old evidence (days/weeks old)
- Screenshot doesn't match current code state
- Evidence reused from previous review without recapture
- Git commit ≠ screenshot timestamp

**Prevention:**
- Timestamp validation in evidence manifest
- Screenshot capture as part of review process
- Evidence recapture for each review
- Commit/timestamp matching requirement

**Recovery:**
- Recapture current screenshots
- Update evidence manifest
- Re-run review with fresh evidence
- Add timestamp validation gate

**Examples:**
- Screenshot from last week used for today's review
- Evidence from different commit
- Reused visual report without updating

**Eval Category:** Agent Reliability Evals

**Related Documentation:**
- `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md`

---

### 5. WRONG_ROUTE_TESTED

**Description:** Screenshot from different URL/page than intended

**Detection:**
- Route tested ≠ route specified in task
- Screenshot shows wrong page
- Evidence from different environment (dev vs prod)
- URL in screenshot ≠ target URL

**Prevention:**
- Route verification in evidence manifest
- Screenshot URL validation
- Environment check (dev/staging/prod)
- Route-specific evidence requirements

**Recovery:**
- Capture correct route screenshot
- Update evidence manifest
- Re-run review for correct route
- Add route validation gate

**Examples:**
- Reviewing /portfolio instead of /
- Testing staging when prod required
- Screenshot from wrong phase/branch

**Eval Category:** Agent Reliability Evals

**Related Documentation:**
- `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md`

---

### 6. MISSING_DOM_BLOCKER

**Description:** Required deterministic tests not run

**Detection:**
- No DOM blocker test results
- Required elements not tested
- Forbidden elements not tested
- Test output missing or incomplete

**Prevention:**
- DOM blocker tests required for UI acceptance
- Test results in evidence manifest
- Automated test execution as part of review
- Test validation before acceptance

**Recovery:**
- Run DOM blocker tests
- Add missing test cases
- Update evidence with test results
- Add test requirement gate

**Examples:**
- No test for "MEETING READINESS" subtitle
- No test for forbidden "Home" nav item
- Missing required element tests

**Eval Category:** Visual Quality Evals + Agent Reliability Evals

**Related Documentation:**
- `docs/qa/VISUAL_QUALITY_VERIFICATION_PIPELINE.md`
- `e2e/slice-a-header-parity.spec.ts`

---

### 7. MISSING_ACCEPTANCE_CRITERIA

**Description:** Requirements not defined or testable

**Detection:**
- No clear acceptance criteria
- Criteria ambiguous or subjective
- No test coverage for criteria
- PRD/RFC missing or incomplete

**Prevention:**
- Gate 1 (Product Goal Gate) requires clear user problem
- Gate 2 (Design/Requirements Gate) requires acceptance criteria
- Testable requirements definition
- PRD/RFC completeness check

**Recovery:**
- Return to product planning
- Define clear acceptance criteria
- Update PRD/RFC
- Add requirement gate

**Examples:**
- "Make it look good" without specific criteria
- "Improve UX" without measurable goals
- Feature implemented without PRD

**Eval Category:** Product Acceptance Evals

**Related Documentation:**
- `docs/PHASE_GATE_POLICY.md`
- `docs/PRD.md`

---

### 8. GENERIC_SAAS_OUTPUT

**Description:** Implementation looks like template instead of prototype

**Detection:**
- Generic navbar patterns (full-width, Bootstrap-style)
- Generic card patterns (white cards with shadow)
- Generic CTA patterns (blue/purple, "Get Started")
- Generic typography (system fonts, template spacing)
- Template feel without brand character

**Prevention:**
- Generic SaaS pattern detection
- Prototype parity scoring
- Brand fit evaluation
- Design tokens specification
- Visual planning with specific direction

**Recovery:**
- Rebuild from prototype
- Apply Proben MVP 6 design tokens
- Update generic pattern detection
- Strengthen design QA gates

**Examples:**
- Bootstrap-style navbar instead of pill header
- Generic blue CTA instead of green
- Template card layout instead of Proben design

**Eval Category:** Visual Quality Evals

**Related Documentation:**
- `docs/design/GENERIC_SAAS_REJECTION_RULES.md`
- `docs/design/DESIGN_ACCEPTANCE_POLICY.md`

---

### 9. PRD_ALIGNMENT_FAIL

**Description:** Implementation does not match PRD/RFC/ADR

**Detection:**
- Feature not in PRD
- Implementation conflicts with RFC
- ADR not followed
- Architecture decision ignored
- Scope creep beyond PRD

**Prevention:**
- Gate 1 (Product Goal Gate) — User problem clarity
- Gate 2 (Design/Requirements Gate) — PRD completeness
- ADR process for architecture decisions
- Scope verification against PRD

**Recovery:**
- Update PRD or revert implementation
- Create ADR if architecture change needed
- Follow proper scope change process
- Add PRD alignment gate

**Examples:**
- Feature added without PRD entry
- Implementation conflicts with RFC-0001
- Architecture changed without ADR

**Eval Category:** Product Acceptance Evals

**Related Documentation:**
- `docs/PRD.md`
- `docs/RFC-0001-architecture.md`
- `docs/ADR/`

---

### 10. DESIGN_GATE_FAIL

**Description:** Design quality gate not passed

**Detection:**
- Visual parity < threshold (4.5/5)
- Evidence incomplete
- Generic patterns detected
- P0/P1 blockers failed
- Brand fit weak (< 4/5)

**Prevention:**
- Gate 2A (Visual Plan Gate) — Plan before code
- Gate 4A (Visual QA Gate) — Evidence-based review
- Design QA principles enforcement
- Prototype fidelity requirement

**Recovery:**
- Return to visual planning or implementation
- Address visual blockers
- Rebuild with prototype fidelity
- Strengthen design QA gates

**Examples:**
- Visual parity 3.0/5 (not acceptable)
- Missing screenshot evidence
- Generic SaaS appearance

**Eval Category:** Visual Quality Evals

**Related Documentation:**
- `docs/design/DESIGN_ACCEPTANCE_POLICY.md`
- `docs/design/DESIGN_PARITY_RUBRIC.md`
- `docs/PHASE_GATE_POLICY.md`

---

### 11. SECURITY_REVIEW_MISSING

**Description:** Security-sensitive change without review

**Detection:**
- Protected file changed (auth, payment, config)
- Secrets/config edited
- Auth/payment logic changed
- External dependencies added without review
- User input validation missing

**Prevention:**
- Security review required for sensitive changes
- Protected file monitoring
- Secret detection in commits
- Security gate for auth/payment changes
- `/security-review` skill usage

**Recovery:**
- Immediate security review
- Risk assessment
- Rollback if needed
- Add security gate
- Update security documentation

**Examples:**
- Auth logic changed without security review
- Environment variable edited without approval
- External dependency added with vulnerabilities

**Eval Category:** Security/Safety Evals

**Related Documentation:**
- `docs/SECURITY.md`
- `.claude/skills/security-review.md`

---

### 12. HUMAN_OVERRIDE_REQUIRED

**Description:** Agent should have escalated to human

**Detection:**
- Complex judgment required
- High uncertainty situation
- Release-critical decision
- Agent confidence low
- Multiple failure modes detected

**Prevention:**
- Escalation triggers defined
- Uncertainty thresholds set
- Human-in-the-loop gates
- Agent confidence calibration
- Release authority limits

**Recovery:**
- Escalate to human immediately
- Document uncertainty trigger
- Update escalation criteria
- Train agent on when to escalate
- Add escalation gate

**Examples:**
- Agent made release decision without human
- Ambiguous visual quality accepted
- High-risk change auto-approved

**Eval Category:** Agent Reliability Evals

**Related Documentation:**
- `.claude/agents/cto-bar-raiser.md`
- `docs/agent-governance/AGENT_AUTHORITY_MATRIX.md`

---

## Failure Mode Categories

### Visual Failures
- VISUAL_MISMATCH
- TEXT_ONLY_ACCEPTANCE
- GENERIC_SAAS_OUTPUT
- DESIGN_GATE_FAIL

### Agent Failures
- FALSE_AGENT_PASS
- TEXT_ONLY_ACCEPTANCE
- STALE_SCREENSHOT
- WRONG_ROUTE_TESTED
- MISSING_DOM_BLOCKER
- HUMAN_OVERRIDE_REQUIRED

### Product Failures
- MISSING_ACCEPTANCE_CRITERIA
- PRD_ALIGNMENT_FAIL
- DESIGN_GATE_FAIL

### Security Failures
- SECURITY_REVIEW_MISSING

---

## Prevention Strategy by Failure Mode

### High-Impact Failures (Prevent with Gates)
- **VISUAL_MISMATCH** — Visual QA gates
- **FALSE_AGENT_PASS** — Builder ≠ reviewer, evidence-first review
- **SECURITY_REVIEW_MISSING** — Security gates

### Medium-Impact Failures (Prevent with Process)
- **TEXT_ONLY_ACCEPTANCE** — Evidence requirements
- **GENERIC_SAAS_OUTPUT** — Generic pattern detection
- **PRD_ALIGNMENT_FAIL** — PRD completeness gates

### Low-Impact Failures (Prevent with Training)
- **STALE_SCREENSHOT** — Timestamp validation
- **WRONG_ROUTE_TESTED** — Route verification
- **MISSING_DOM_BLOCKER** — Test requirements

---

## Detection Methods

### Automated Detection
- DOM blocker tests
- Screenshot comparison
- Evidence manifest validation
- Route verification
- Timestamp validation
- Generic pattern detection

### Human Detection
- Visual inspection
- PRD alignment review
- Security review
- Agent behavior observation
- Escalation triggers

### Agent Detection
- Self-assessment
- Confidence scoring
- Uncertainty signaling
- Evidence quality checks

---

## Recovery Strategies

### Immediate Recovery
- Capture fresh evidence
- Run missing tests
- Escalate to human
- Reject acceptance

### Process Recovery
- Update gates
- Update agent instructions
- Add prevention tests
- Strengthen requirements

### Systemic Recovery
- Create eval case
- Update build learning log
- Adjust thresholds
- Train agents

---

## Related Documentation

- **[EVALS.md](EVALS.md)** — Master eval system documentation
- **[EVAL_REGISTRY.md](EVAL_REGISTRY.md)** — Registry of all eval cases
- **[EVAL_CASE_TEMPLATE.md](EVAL_CASE_TEMPLATE.md)** — Template for eval cases
- **[../product-build-history/FAILURE_TO_GATE_REGISTRY.md](../product-build-history/FAILURE_TO_GATE_REGISTRY.md)** — Failure to gate mapping

---

**Last Updated:** 2026-06-10
**Version:** 1.0
