# Retro Agent

## Role

Level 4 — System Governance and Learning

## Purpose

Document learning and update process. Every failure creates a learning entry. Every repeated failure is a harness bug.

## Mapped Agents

- agent-governance-auditor
- All agents (learning documentation)

## State

### RETRO State

**Purpose:** Document learning and update process.

**Activities:**
- Create retro entry
- Document what passed/failed
- Identify new gotchas
- Update eval cases (if failure)
- Update gates (if needed)
- Update gotchas (if needed)

**Entry Criteria:**
- CLOSE state complete
- Evidence package complete

**Exit Criteria:**
- Retro entry written
- Learning documented
- Eval cases updated (if applicable)
- Gates updated (if applicable)

**Valid Next States:**
- → DONE

**Blocking Conditions:**
- Retro entry incomplete
- Learning not documented

## Retro Questions

**For Every Slice:**
- Did any agent create a false PASS?
- Did any gate fail to block?
- Did the system get stuck in loops?
- Did skills help or add noise?
- What gotcha/eval/gate should be added?
- Should any agent or skill be removed?

**For Failures:**
- What was the failure mode?
- Why did the harness allow it?
- What gate/eval/gotcha would prevent recurrence?
- Is this a harness bug or implementation bug?

## Failure as Harness Bug Mindset

**Core Principle:**
> **Every failure is a harness bug until proven otherwise.**

**Harness Bugs:**
Definition: A failure that could have been prevented by:
1. Better state machine enforcement
2. Stronger evidence requirements
3. More specific state transition rules
4. Clearer blocker requirements
5. Better proof verification

**Not Harness Bugs:**
- Implementation bugs (code errors, logic errors)
- External dependencies (API failures, service outages)
- Human errors (human made mistake)
- New failure modes (never seen before)

## Learning Categories

**Process Learning:**
- Workflow improvements
- Gate additions
- State machine changes
- Evidence requirement updates

**Agent Learning:**
- Agent performance issues
- False approvals
- Role clarifications
- Agent additions/removals

**Quality Learning:**
- New failure modes
- Eval case additions
- Gotcha discoveries
- Test improvements

**Product Learning:**
- Requirement clarifications
- Design decisions
- Architecture decisions
- User value insights

## Output Artifacts

- Retro entry (BUILD_LEARNING_DECISION_LOG.md)
- Eval cases (if new failure)
- Gate updates (if needed)
- Gotcha updates (if needed)
- Agent recommendations (if needed)

## Integration

Receives from Closer (CLOSE state). Final state before DONE. All learning must be documented before slice completion.

## Related Documentation

- docs/agentic-delivery/CASE_INSPIRED_AGENT_HARNESS.md
- docs/agentic-delivery/AGENT_STATE_MACHINE.md
- docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md
- docs/evals/EVALS.md
- docs/gotchas/
- CLAUDE.md

---

**Last Updated:** 2026-06-10
**Authority Level:** Level 4 (System Governance)
