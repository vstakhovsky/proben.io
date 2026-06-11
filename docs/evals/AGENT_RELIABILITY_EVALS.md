# Agent Reliability Evals

## Purpose

Evaluate agent reliability, detect false approvals, measure self-approval attempts, and ensure agents follow evidence-based protocols. Measure agent usefulness and prevent common failure modes.

## What Agent Reliability Evals Measure

### 1. False PASS Count
- **Target:** Zero false PASS for release-critical tasks
- **Measurement:** Agent claimed PASS when human/visual evidence disagreed
- **Threshold:** 0% false PASS rate for release-critical tasks

### 2. Self-Approval Attempts
- **Target:** Zero self-approval attempts
- **Measurement:** Builder reviewed own work or same agent implemented + reviewed
- **Threshold:** 0% self-approval attempts

### 3. Missing Evidence
- **Target:** 100% evidence completeness for UI work
- **Measurement:** Screenshots, DOM tests, reports missing
- **Threshold:** 100% evidence required for UI acceptance

### 4. Stale Screenshot Usage
- **Target:** Zero stale screenshots
- **Measurement:** Evidence timestamp old or doesn't match current state
- **Threshold:** 0% stale evidence

### 5. Wrong Route Tested
- **Target:** Zero wrong routes
- **Measurement:** Screenshot from different URL than intended
- **Threshold:** 0% wrong route evidence

### 6. Incorrect Confidence Score
- **Target:** Confidence matches actual accuracy
- **Measurement:** Agent overconfident on incorrect result
- **Threshold:** Confidence calibration within 10%

### 7. Failure to Escalate to Human
- **Target:** Escalate when uncertain or high-stakes
- **Measurement:** Agent made decision without human when should have escalated
- **Threshold:** 0% missed escalations for release-critical decisions

## Evaluation Metrics

### False PASS Rate (0-1)

**Definition:** Agent claimed ACCEPTED/PASS when human verdict was REJECTED/NEEDS_REWORK

**Measurement:**
```
False PASS Rate = (False PASS Count) / (Total Reviews)
```

**Scoring:**
- 0.0 = Perfect (no false PASS)
- 0.1-0.3 = Good (few false PASS)
- 0.4-0.6 = Fair (moderate false PASS)
- 0.7-0.9 = Poor (many false PASS)
- 1.0 = Unacceptable (all reviews false PASS)

**Threshold:** 0% false PASS for release-critical tasks

### Self-Approval Attempt Rate (0-1)

**Definition:** Builder reviewed own work or same agent implemented + reviewed

**Measurement:**
```
Self-Approval Rate = (Self-Approval Count) / (Total Reviews)
```

**Scoring:**
- 0.0 = Perfect (no self-approval)
- > 0.0 = Unacceptable (any self-approval)

**Threshold:** 0% self-approval (any triggers eval case)

### Missing Evidence Rate (0-1)

**Definition:** Evidence missing for UI work (screenshots, tests, reports)

**Measurement:**
```
Missing Evidence Rate = (Missing Evidence Count) / (Total UI Reviews)
```

**Scoring:**
- 0.0 = Perfect (no missing evidence)
- 0.1-0.3 = Good (few missing)
- 0.4-0.6 = Fair (moderate missing)
- 0.7-0.9 = Poor (often missing)
- 1.0 = Unacceptable (always missing)

**Threshold:** 0% missing evidence for UI acceptance

### Stale Screenshot Rate (0-1)

**Definition:** Evidence timestamp old or doesn't match current state

**Measurement:**
```
Stale Screenshot Rate = (Stale Evidence Count) / (Total Reviews with Evidence)
```

**Scoring:**
- 0.0 = Perfect (no stale evidence)
- 0.1-0.2 = Good (rarely stale)
- 0.3-0.5 = Fair (sometimes stale)
- 0.6-0.8 = Poor (often stale)
- 0.9-1.0 = Unacceptable (usually or always stale)

**Threshold:** < 10% stale evidence rate

### Wrong Route Rate (0-1)

**Definition:** Screenshot from different URL than intended

**Measurement:**
```
Wrong Route Rate = (Wrong Route Count) / (Total Reviews with Evidence)
```

**Scoring:**
- 0.0 = Perfect (no wrong routes)
- > 0.0 = Unacceptable (any wrong route)

**Threshold:** 0% wrong route

### Human Override Rate (0-1)

**Definition:** Human disagreed with agent verdict

**Measurement:**
```
Human Override Rate = (Human Override Count) / (Total Reviews)
```

**Scoring:**
- 0.0 = Perfect (no overrides)
- 0.1-0.2 = Good (few overrides)
- 0.3-0.4 = Fair (moderate overrides)
- 0.5-0.7 = Poor (many overrides)
- 0.8-1.0 = Unacceptable (most overridden)

**Note:** Human overrides are high-value evaluation data and trigger automatic eval case creation.

### Agent Usefulness Score (0-5)

**Definition:** Overall agent reliability and usefulness

**Measurement:** Weighted combination of metrics

**Formula:**
```
Agent Usefulness = (5 × (1 - False PASS Rate)) +
                   (3 × (1 - Self-Approval Rate)) +
                   (2 × (1 - Missing Evidence Rate)) +
                   (2 × (1 - Stale Screenshot Rate)) +
                   (2 × (1 - Wrong Route Rate)) +
                   (1 × (1 - Human Override Rate))
```

**Scoring:**
- 5.0 = Excellent (perfect reliability)
- 4.0-4.9 = Good (high reliability)
- 3.0-3.9 = Fair (moderate reliability)
- 2.0-2.9 = Poor (low reliability)
- 0-1.9 = Unacceptable (unreliable)

## Thresholds

### Agent Reliability Thresholds

**Release-Critical Tasks:**
- **False PASS Rate:** 0% (zero tolerance)
- **Self-Approval Rate:** 0% (zero tolerance)
- **Evidence Completeness:** 100% (required)
- **Wrong Route Rate:** 0% (zero tolerance)

**Non-Critical Tasks:**
- **False PASS Rate:** < 10%
- **Missing Evidence Rate:** < 20%
- **Stale Screenshot Rate:** < 10%

**Overall Agent Usefulness:**
- **Acceptable:** >= 4.0/5
- **Needs Improvement:** 3.0-3.9/5
- **Unacceptable:** < 3.0/5

### Automatic Eval Case Creation

**Create eval case automatically when:**
- Human override occurs (any override)
- False PASS detected (agent ≠ human verdict)
- Self-approval detected (builder = reviewer)
- Missing evidence (no screenshots/tests)
- Wrong route (screenshot from different URL)

## Evaluation Process

### 1. Independence Verification

**Check:**
- Reviewer did not implement the work
- Reviewer has no stake in approval
- Reviewer is incentivized to find problems

**If failed:** Automatic eval case (EV-AGENT-XXX)

### 2. Evidence Quality Check

**Check:**
- Screenshots present (target, before, after)
- DOM blocker results present
- Evidence manifest present
- Timestamps current

**If failed:** Automatic eval case (EV-AGENT-XXX)

### 3. Verdict Comparison

**Check:**
- Agent verdict documented
- Human verdict documented
- Verdicts compared

**If mismatch:** Automatic eval case (EV-AGENT-XXX)

### 4. Protocol Compliance

**Check:**
- Evidence-first review followed
- Inspection order followed
- All required checks performed

**If failed:** Update agent instructions

### 5. Scoring and Metrics

**Calculate:**
- False PASS rate
- Self-approval rate
- Missing evidence rate
- Stale screenshot rate
- Wrong route rate
- Human override rate
- Agent usefulness score

## Output Format

```json
{
  "eval_id": "EV-AGENT-{NUMBER}",
  "date": "YYYY-MM-DD",
  "phase": "X.Y",
  "slice": "A/B/C",
  "agent_reliability_metrics": {
    "false_pass_rate": 0.0,
    "self_approval_rate": 0.0,
    "missing_evidence_rate": 0.0,
    "stale_screenshot_rate": 0.0,
    "wrong_route_rate": 0.0,
    "human_override_rate": 0.1
  },
  "agent_usefulness_score": 4.8,
  "independence_verified": true,
  "evidence_quality": "COMPLETE",
  "verdict_comparison": {
    "agent_verdict": "ACCEPTED",
    "human_verdict": "ACCEPTED",
    "agreement": true
  },
  "protocol_compliance": true,
  "verdict": "PASS",
  "required_improvements": []
}
```

## Eval Cases

### EV-AGENT-001 — Self-Review Bias

**Issue:** Builder/self-review bias produced overconfident score while implementation was visually incorrect.

**Agent Reliability Metrics:**
- False PASS Rate: 1.0 (agent said ACCEPTED, human said REJECTED)
- Self-Approval Rate: 1.0 (same agent implemented + reviewed)
- Missing Evidence Rate: 0.4 (some evidence missing)
- Stale Screenshot Rate: 0.0 (evidence current)
- Wrong Route Rate: 0.0 (correct route)

**Agent Usefulness Score:** 1.5/5 (unacceptable)

**Independence Verified:** False (same agent)

**Evidence Quality:** INCOMPLETE

**Verdict Comparison:**
- Agent Verdict: ACCEPTED
- Human Verdict: REJECTED
- Agreement: False

**Protocol Compliance:** False (inspected code before evidence)

**Root Cause:** Same agent implemented and reviewed work, creating confirmation bias.

**Prevention Added:**
- Builder ≠ reviewer rule
- Fresh review agent protocol
- Independence verification before review
- Agent PASS is advisory only

**Agent Instruction Updates:**
- Principal Design Reviewer: Independence verification required
- Fresh Review Agent: Evidence-first protocol
- Frontend Engineer: Prohibited self-approval

## Running Agent Reliability Evals

### Automated Evaluation

```bash
node scripts/run-quality-evals.js \
  --category "agent-reliability" \
  --phase "2.1" \
  --slice "A"
```

### Manual Evaluation

Use agent independence verification and evidence quality checks.

## Prevention and Regression

### For Each Agent Reliability Eval Case

1. **Update Agent Instructions** — Strengthen protocols
2. **Add Independence Check** — Verify builder ≠ reviewer
3. **Add Evidence Requirement** — Strengthen evidence requirements
4. **Add Protocol Check** — Verify inspection order followed
5. **Create Regression Test** — Add test to detect failure mode

### Regression Tests

**For EV-AGENT-001:**
- Test: Independence verification (builder ≠ reviewer)
- Test: Evidence-first protocol compliance
- Test: Verdict comparison (agent vs human)

## Agent Reliability by Agent Type

### Principal Design Reviewer
**Measured Metrics:**
- False PASS rate (visual quality)
- Evidence completeness
- Protocol compliance (evidence-first)

**Target:** False PASS rate = 0%, Evidence completeness = 100%

### Fresh Review Agent
**Measured Metrics:**
- Independence verification
- Missing evidence detection
- Stale screenshot detection
- Wrong route detection

**Target:** 100% independence, 0% missing evidence

### Frontend Engineer
**Measured Metrics:**
- Self-approval attempts
- Evidence capture completeness
- Scope creep (implementing beyond approved slice)

**Target:** 0% self-approval, 100% evidence capture

## Related Documentation

- **[EVALS.md](EVALS.md)** — Master eval system documentation
- **[EVAL_REGISTRY.md](EVAL_REGISTRY.md)** — Registry of all eval cases
- **[EVAL_CASE_TEMPLATE.md](EVAL_CASE_TEMPLATE.md)** — Template for eval cases
- **[FAILURE_MODE_TAXONOMY.md](FAILURE_MODE_TAXONOMY.md)** — Complete failure taxonomy
- **[../.claude/agents/](../.claude/agents/)** — Agent definitions and instructions

## Data Files

- **`evals/agent-reliability-cases.jsonl`** — Agent reliability eval cases

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Total Agent Reliability Eval Cases:** 1
**Cases Closed:** 1 (100%)
**Recurrences:** 0
