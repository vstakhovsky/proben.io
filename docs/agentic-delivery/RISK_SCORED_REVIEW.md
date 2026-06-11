# Risk Scored Review

## Purpose

This document defines the risk assessment and scoring system for all changes to Proben.io, ensuring release decisions are based on evaluated risk, not assumptions.

## Core Principle

**Every change receives a risk rating.**

Risk scoring is mandatory for all implementations before release decisions are made.

## Risk Dimensions

### 1. Product Risk

**Question:** Does this deliver user value?

**Scoring:**
- **LOW:** Clear value proposition, user problem addressed, obvious benefit
- **MEDIUM:** Value somewhat clear, some ambiguity, benefit unclear
- **HIGH:** Value unclear, user problem not addressed, benefit missing

**Examples:**
- LOW: Landing page hero showing product value clearly
- MEDIUM: Feature page with vague value proposition
- HIGH: Generic feature with no clear user value

### 2. Design Risk

**Question:** Does this match the approved prototype?

**Scoring:**
- **LOW:** Parity >= 4.5/5, matches prototype closely
- **MEDIUM:** Parity 3.5-4.4, minor deviations from prototype
- **HIGH:** Parity < 3.5, major deviations or no prototype alignment

**Examples:**
- LOW: Exact match to Proben MVP 6 prototype
- MEDIUM: Close to prototype but spacing off
- HIGH: Generic SaaS, not Proben MVP 6

### 3. Technical Risk

**Question:** Is the implementation sound?

**Scoring:**
- **LOW:** Clean, maintainable, simple, follows patterns
- **MEDIUM:** Some complexity, maintainable with effort, minor deviations from patterns
- **HIGH:** Overengineered, brittle, incomplete, breaks patterns

**Examples:**
- LOW: Simple component following existing patterns
- MEDIUM: Component with some complexity but documented
- HIGH: Unnecessary abstraction, hard to maintain

### 4. Security Risk

**Question:** Are there security concerns?

**Scoring:**
- **LOW:** No security issues, input validation present, safe patterns
- **MEDIUM:** Minor concerns, mitigations present, acceptable risk
- **HIGH:** Exposed data, no validation, unsafe patterns, breaking security rules

**Examples:**
- LOW: Client-side only, no data handling
- MEDIUM: Data handling with validation and sanitization
- HIGH: Exposed secrets, no input validation, XSS vulnerabilities

### 5. Data/Privacy Risk

**Question:** Is user data safe?

**Scoring:**
- **LOW:** No data handling or data handled correctly
- **MEDIUM:** Data handling with some safeguards
- **HIGH:** Data exposed, privacy violated, tracking without consent

**Examples:**
- LOW: Static content, no user data
- MEDIUM: Form data with proper handling
- HIGH: Data exposed to third parties, no privacy controls

### 6. Deployment Risk

**Question:** Can this deploy safely?

**Scoring:**
- **LOW:** Tests pass, build succeeds, no breaking changes, rollback plan exists
- **MEDIUM:** Tests pass with warnings, some breaking changes documented
- **HIGH:** Tests fail, build breaks, major breaking changes, no rollback plan

**Examples:**
- LOW: Content change, tests pass, build succeeds
- MEDIUM: Component update with some breaking changes
- HIGH: Architecture change, tests failing, no rollback

### 7. Maintenance Risk

**Question:** Is this maintainable?

**Scoring:**
- **LOW:** Well-structured, documented, simple, follows patterns
- **MEDIUM:** Adequately structured, some complexity, mostly follows patterns
- **HIGH:** Poorly structured, undocumented, complex, breaks patterns

**Examples:**
- LOW: Clean component with clear naming
- MEDIUM: Component with some complexity but documented
- HIGH: Spaghetti code, no comments, hard to understand

### 8. Portfolio Credibility Risk

**Question:** Does this demonstrate quality?

**Scoring:**
- **LOW:** Professional quality, good practices, impressive portfolio piece
- **MEDIUM:** Acceptable quality, some concerns, adequate portfolio piece
- **HIGH:** Poor quality, damaging to portfolio, embarrassing to show

**Examples:**
- LOW: Clean code, good design, impressive work
- MEDIUM: Adequate work, some rough edges
- HIGH: Sloppy code, poor design, not portfolio-worthy

## Risk Assessment Process

### Step 1: Review the Change

Examine:
- What was implemented
- Files changed
- Evidence provided
- Context (UI, architecture, security-sensitive?)

### Step 2: Score Each Dimension

For each of 8 dimensions:
- Assess the concern level
- Assign LOW, MEDIUM, or HIGH
- Document specific concerns

### Step 3: Determine Overall Risk

**Overall Risk Calculation:**

- **LOW Overall Risk:**
  - All dimensions are LOW or MEDIUM
  - No more than 2 MEDIUM risks
  - Zero HIGH risks

- **MEDIUM Overall Risk:**
  - 1-2 HIGH risks with mitigations
  - More than 2 MEDIUM risks
  - Requires additional review

- **HIGH Overall Risk:**
  - 3 or more HIGH risks
  - Unmitigated HIGH risks
  - Any failed deployment risk

### Step 4: Make Recommendation

Based on overall risk:
- **LOW:** Can release with standard review
- **MEDIUM:** Release with caution, monitor post-release
- **HIGH:** Do not release, address risks first

## Release Criteria

### CAN RELEASE

All of:
- All dimensions scored
- Overall risk: LOW or MEDIUM
- No more than 2 MEDIUM risks
- Zero HIGH risks
- All QA gates passed

### RELEASE WITH CAUTION

All of:
- All dimensions scored
- Overall risk: MEDIUM
- 1-2 HIGH risks with documented mitigations
- Additional review completed
- Monitoring plan in place

### DO NOT RELEASE

Any of:
- Overall risk: HIGH
- 3 or more HIGH risks
- Any unmitigated HIGH risk
- Deployment risk: HIGH
- Any failed QA gate
- Tests failing
- Build broken

## Risk Assessment Template

```markdown
# Risk Scored Review: [Change Name]

## Change Summary
**Description:** [what was implemented]
**Files Changed:** [list]
**Evidence:** [screenshots, tests, routes verified]

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
1. **[Concern 1]:** [impact, mitigation needed if applicable]
2. **[Concern 2]:** [impact, mitigation needed if applicable]

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

### For UI Work

**CAN RELEASE:**
- Design risk: LOW
- Visual parity >= 4.5/5

**RELEASE WITH CAUTION:**
- Design risk: MEDIUM
- Visual parity 4.0-4.4/5
- Specific visual fixes needed

**DO NOT RELEASE:**
- Design risk: HIGH
- Visual parity < 4.0/5
- Does not match prototype

### For Architecture Work

**CAN RELEASE:**
- Technical risk: LOW
- No breaking changes
- Tests pass

**RELEASE WITH CAUTION:**
- Technical risk: MEDIUM
- Some breaking changes documented
- Migration path clear

**DO NOT RELEASE:**
- Technical risk: HIGH
- Major breaking changes
- Tests failing

### For Security-Sensitive Work

**CAN RELEASE:**
- Security risk: LOW
- Input validation present
- No data exposure

**RELEASE WITH CAUTION:**
- Security risk: MEDIUM
- Mitigations documented
- Security review completed

**DO NOT RELEASE:**
- Security risk: HIGH
- Exposed secrets
- No input validation
- Data exposure

## Risk Mitigation Strategies

### Product Risk Mitigation
- Clarify value proposition
- Add user benefit statements
- Remove confusing elements
- Test with users

### Design Risk Mitigation
- Compare with prototype more closely
- Fix visual mismatches
- Improve spacing and typography
- Strengthen brand fit

### Technical Risk Mitigation
- Simplify implementation
- Remove unnecessary complexity
- Follow existing patterns
- Add documentation

### Security Risk Mitigation
- Add input validation
- Sanitize outputs
- Implement safe patterns
- Conduct security review

### Deployment Risk Mitigation
- Fix failing tests
- Document breaking changes
- Create rollback plan
- Test in staging

## Quality Checklist

Risk assessment is complete when:
- [ ] All 8 dimensions scored
- [ ] Specific concerns documented
- [ ] Overall risk level determined
- [ ] Recommendation clear
- [ ] Mitigation or blockers listed (if applicable)
- [ ] Rationale provided

## Related Documentation

- **Risk Scored Review Skill:** `.claude/skills/risk-scored-review/SKILL.md`
- **Fresh Review Protocol:** `FRESH_REVIEW_PROTOCOL.md`
- **Visual Agentic Delivery System:** `VISUAL_AGENTIC_DELIVERY_SYSTEM.md`

---

**Last Updated:** 2026-06-09
