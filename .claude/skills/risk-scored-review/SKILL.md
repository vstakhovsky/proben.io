# Risk Scored Review Skill

## Purpose

Assess and score multiple risk dimensions for any change to determine if it can be safely released.

## When to Use

Trigger this skill when:
- Reviewing implementation work
- Making release decisions
- Evaluating merge requests
- Before deploying to production

## What This Skill Does

1. **Scores risk across dimensions** — Product, design, technical, security, deployment
2. **Assesses risk level** — LOW, MEDIUM, or HIGH
3. **Identifies concerns** — Specific issues in each dimension
4. **Recommends action** — Release, hold, or reject based on risk
5. **Documents rationale** — Why risk level was assigned

## Input Requirements

Provide:
- **Description of change** — What was implemented
- **Files changed** — What was actually modified
- **Evidence** — Screenshots, tests, routes verified
- **Context** — Is this UI, architecture, security-sensitive?

## Risk Dimensions

### 1. Product Risk
**Question:** Does this deliver user value?

**Score:**
- **LOW:** Clear value proposition, user problem addressed
- **MEDIUM:** Value somewhat clear, some ambiguity
- **HIGH:** Value unclear, user problem not addressed

### 2. Design Risk
**Question:** Does this match the approved prototype?

**Score:**
- **LOW:** Parity >= 4.5/5, matches prototype
- **MEDIUM:** Parity 3.5-4.4, minor deviations
- **HIGH:** Parity < 3.5, major deviations or no prototype

### 3. Technical Risk
**Question:** Is the implementation sound?

**Score:**
- **LOW:** Clean, maintainable, no complexity
- **MEDIUM:** Some complexity, maintainable with effort
- **HIGH:** Overengineered, brittle, or incomplete

### 4. Security Risk
**Question:** Are there security concerns?

**Score:**
- **LOW:** No security issues, input validation present
- **MEDIUM:** Minor concerns, mitigations present
- **HIGH:** Exposed data, no validation, unsafe patterns

### 5. Data/Privacy Risk
**Question:** Is user data safe?

**Score:**
- **LOW:** No data handling, data handled correctly
- **MEDIUM:** Data handling with some safeguards
- **HIGH:** Data exposed, privacy violated

### 6. Deployment Risk
**Question:** Can this deploy safely?

**Score:**
- **LOW:** Tests pass, build succeeds, no breaking changes
- **MEDIUM:** Tests pass with warnings, some breaking changes
- **HIGH:** Tests fail, build breaks, or major breaking changes

### 7. Maintenance Risk
**Question:** Is this maintainable?

**Score:**
- **LOW:** Well-structured, documented, simple
- **MEDIUM:** Adequately structured, some complexity
- **HIGH:** Poorly structured, undocumented, complex

### 8. Portfolio Credibility Risk
**Question:** Does this demonstrate quality?

**Score:**
- **LOW:** Professional quality, good practices shown
- **MEDIUM:** Acceptable quality, some concerns
- **HIGH:** Poor quality, damaging to portfolio

## Process

1. **Review the change**
   - Understand what was implemented
   - Examine files changed
   - Review evidence provided

2. **Score each dimension**
   - Assess product value
   - Check prototype parity (for UI)
   - Evaluate technical quality
   - Check security issues
   - Assess deployment safety

3. **Determine overall risk**
   - Count HIGH risks
   - Assess MEDIUM risks
   - Consider overall impact

4. **Make recommendation**
   - **LOW risk overall:** Can release with standard review
   - **MEDIUM risk overall:** Release with caution, monitor
   - **HIGH risk overall:** Do not release, address risks first

## Output Format

```markdown
# Risk Scored Review: [Change Name]

## Change Summary
**Description:** [what was implemented]
**Files Changed:** [list]
**Evidence:** [screenshots, tests, routes]

## Risk Assessment

| Dimension | Risk Level | Concerns |
|-----------|------------|----------|
| Product Risk | LOW/MEDIUM/HIGH | [specific concerns] |
| Design Risk | LOW/MEDIUM/HIGH | [specific concerns] |
| Technical Risk | LOW/MEDIUM/HIGH | [specific concerns] |
| Security Risk | LOW/MEDIUM/HIGH | [specific concerns] |
| Data/Privacy Risk | LOW/MEDIUM/HIGH | [specific concerns] |
| Deployment Risk | LOW/MEDIUM/HIGH | [specific concerns] |
| Maintenance Risk | LOW/MEDIUM/HIGH | [specific concerns] |
| Portfolio Credibility Risk | LOW/MEDIUM/HIGH | [specific concerns] |

## Overall Risk Level: **LOW / MEDIUM / HIGH**

### Rationale
[Explanation of overall risk level]

### Critical Concerns
1. **[Concern 1]:** [impact, mitigation needed]
2. **[Concern 2]:** [impact, mitigation needed]

## Recommendation

### If LOW Risk
**Status:** CAN RELEASE
**Requirements:** Standard review and approval

### If MEDIUM Risk
**Status:** RELEASE WITH CAUTION
**Requirements:**
- [ ] [Requirement 1]
- [ ] [Requirement 2]
**Monitoring:** [what to watch post-release]

### If HIGH Risk
**Status:** DO NOT RELEASE
**Blockers:**
1. **[Blocker 1]:** [what must be fixed]
2. **[Blocker 2]:** [what must be fixed]

## Risk Mitigation (if applicable)
1. **[Mitigation 1]:** [how to reduce risk]
2. **[Mitigation 2]:** [how to reduce risk]

---

**Risk Assessor:** [agent name]
**Assessment Date:** [timestamp]
```

## Risk Thresholds

### Release Criteria

**CAN RELEASE:**
- All dimensions are LOW or MEDIUM risk
- No more than 2 MEDIUM risks
- Zero HIGH risks

**RELEASE WITH CAUTION:**
- 1-2 HIGH risks with mitigations
- More than 2 MEDIUM risks
- Requires additional review

**DO NOT RELEASE:**
- 3 or more HIGH risks
- Unmitigated HIGH risks
- Any failed deployment risk

## Quality Checklist

The risk assessment is complete when:
- [ ] All 8 dimensions scored
- [ ] Specific concerns documented
- [ ] Overall risk level determined
- [ ] Recommendation clear
- [ ] Mitigation or blockers listed (if applicable)

## Success Criteria

A successful risk assessment:
- Scores all dimensions objectively
- Provides specific concerns, not vague feelings
- Makes clear release recommendation
- Identifies mitigations or blockers
- Documents rationale for overall risk level

## Notes

- Risk scoring is independent of technical correctness
- Tests can pass but risk can still be HIGH
- Prototype parity < 4.5/5 = HIGH design risk
- Security concerns always elevate risk
- Deployment risk is blocking if HIGH

## Related Documentation

- **Fresh Review Agent:** `.claude/agents/fresh-review-agent.md`
- **Risk Scored Review:** `docs/agentic-delivery/RISK_SCORED_REVIEW.md`
- **Visual Agentic Delivery:** `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md`
