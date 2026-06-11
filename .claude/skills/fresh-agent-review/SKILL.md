# Fresh Agent Review Skill

## Purpose

Independently review work produced by builder agents to prevent false green checks and builder bias.

## When to Use

Trigger this skill when:
- A builder agent has completed implementation
- Before human reviews the work
- Before merge/release decisions
- After any significant code change

## What This Skill Does

1. **Verifies independence** — Confirms reviewer did not implement the work
2. **Reviews changed files** — Examines actual code changes
3. **Compares against source of truth** — Prototype, plan, or specification
4. **Tests functionality** — Verifies routes, links, behavior
5. **Scores visual parity** — For UI work, compares with prototype
6. **Assesses risk** — Scores multiple risk dimensions
7. **Returns verdict** — ACCEPTED, REJECTED, or NEEDS_REWORK

## Input Requirements

Provide:
- **Visual plan** (if applicable) — What was approved
- **Files changed** — What was actually implemented
- **Evidence** — Screenshots, routes tested, tests output
- **Source of truth** — Prototype screenshots or specifications
- **Builder claims** — What the builder says was done

## Process

1. **Verify independence**
   - Confirm reviewer did not implement the change
   - If reviewer = builder, request different reviewer

2. **Review implementation**
   - Examine each changed file
   - Verify against approved plan
   - Check for scope creep
   - Look for placeholder content

3. **Verify functionality**
   - Test the route
   - Verify links work
   - Check for console errors
   - Confirm no broken functionality

4. **Verify visual parity** (for UI work)
   - Compare with prototype screenshot
   - Score header, hero, typography, spacing, colors, CTAs
   - Identify visual mismatches
   - Calculate overall parity score

5. **Assess risk**
   - Product risk — Does this deliver value?
   - Design risk — Does this match prototype?
   - Technical risk — Is implementation sound?
   - Security risk — Are there vulnerabilities?
   - Deployment risk — Can this release safely?

6. **Return verdict**
   - ACCEPTED — All dimensions pass, parity >= 4.5/5
   - REJECTED — Critical blockers, parity < 4.0/5
   - NEEDS_REWORK — Specific fixes needed

## Output Format

```markdown
# Fresh Review: [Task Name]

## Independence Statement
**Reviewer did not implement this change:** YES / NO

## Implementation Review
**Files Changed:** [list]
**Match Plan:** YES / NO
**Scope Creep:** NONE / MINOR / MAJOR

## Evidence Reviewed
- [ ] Visual plan
- [ ] Changed files
- [ ] Route: [URL, status]
- [ ] Screenshots: [reference, current]
- [ ] Tests: [status]

## Prototype Parity (UI Work)
**Header:** [MATCHES/DOES NOT MATCH]
**Hero:** [MATCHES/DOES NOT MATCH]
**Typography:** [MATCHES/DOES NOT MATCH]
**Spacing:** [MATCHES/DOES NOT MATCH]
**Colors:** [MATCHES/DOES NOT MATCH]
**CTAs:** [MATCHES/DOES NOT MATCH]

**Overall Parity Score:** [X/5]

## Functional Review
**Route Works:** YES / NO
**Links Work:** YES / NO
**Console Errors:** NONE / FOUND
**Tests Pass:** YES / NO

## Risk Assessment
| Category | Level | Concerns |
|----------|-------|----------|
| Product | LOW/MEDIUM/HIGH | [details] |
| Design | LOW/MEDIUM/HIGH | [details] |
| Technical | LOW/MEDIUM/HIGH | [details] |
| Security | LOW/MEDIUM/HIGH | [details] |
| Deployment | LOW/MEDIUM/HIGH | [details] |

## Verdict
**Status:** ACCEPTED / REJECTED / NEEDS_REWORK

### If REJECTED:
- [Blocker 1]
- [Blocker 2]

### If NEEDS_REWORK:
- [Fix 1]
- [Fix 2]

---

**Reviewer:** Fresh Review Agent
**Review Date:** [timestamp]
```

## Quality Checklist

The fresh review is complete when:
- [ ] Independence verified (reviewer ≠ builder)
- [ ] All changed files examined
- [ ] Route tested and verified
- [ ] Visual parity scored (for UI work)
- [ ] All risk dimensions assessed
- [ ] Verdict clearly stated
- [ ] Specific fixes listed (if not ACCEPTED)

## Scoring Guidelines

### Prototype Parity Score (UI Work)
- **5/5:** Exact match with prototype
- **4/5:** Minor deviations, acceptable
- **3/5:** Noticeable deviations, needs work
- **2/5:** Major deviations, significant rework
- **1/5:** Barely resembles prototype
- **0/5:** No prototype alignment

### Risk Levels
- **LOW:** No concerns, minimal risk
- **MEDIUM:** Some concerns, monitoring needed
- **HIGH:** Significant concerns, may block release

## Success Criteria

A successful fresh review:
- Is independent (reviewer did not implement)
- Examines actual changes, not builder claims
- Requires evidence (screenshots, routes, tests)
- Scores visual parity objectively
- Returns clear verdict with reasoning
- Identifies specific blockers or fixes

## Notes

- This skill prevents builder bias
- Evidence is required, not claims
- For UI work, visual parity < 4.5/5 = REJECT
- Tests passing is necessary but not sufficient
- Builder cannot be the final reviewer

## Related Documentation

- **Fresh Review Agent:** `.claude/agents/fresh-review-agent.md`
- **Fresh Review Protocol:** `docs/agentic-delivery/FRESH_REVIEW_PROTOCOL.md`
- **Risk Scored Review:** `docs/agentic-delivery/RISK_SCORED_REVIEW.md`
