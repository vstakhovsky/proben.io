# Agent Authority Matrix

## Purpose

This document defines four responsibility levels for agents in the Proben.io development system, ensuring clear separation of powers and preventing self-approval.

## Core Principle

**A builder must never approve its own work.**

## Responsibility Levels

### Level 1 — Builders

**Role:** Create implementation artifacts

**Examples:**
- `frontend-engineer`
- `documentation-engineer`
- `ai-engineer`
- `test-writer`

**Allowed Actions:**
- ✅ Implement code
- ✅ Propose changes
- ✅ Explain implementation
- ✅ Run checks (tests, build, lint)
- ✅ Report changed files

**Prohibited Actions:**
- ❌ Approve their own work
- ❌ Declare release-ready
- ❌ Override reviewer blockers
- ❌ Skip visual/product/security gates
- ❌ Review their own implementation

**Scope:** Implementation only. Builders produce artifacts but cannot approve them for release.

---

### Level 2 — Principal Reviewers

**Role:** Validate quality and can block release

**Examples:**
- `product-manager`
- `design-reviewer`
- `principal-architect`
- `security-reviewer`
- `qa-release-engineer`

**Allowed Actions:**
- ✅ Accept work
- ✅ Reject work
- ✅ Request rework
- ✅ Assign scores
- ✅ Define blockers
- ✅ Require evidence
- ✅ Challenge builder claims

**Prohibited Actions:**
- ❌ Silently fix builder work and approve it without evidence
- ❌ Approve without source-of-truth comparison
- ❌ Approve UI work without screenshot evidence
- ❌ Approve based only on builder confidence
- ❌ Override evidence-based rejections

**Scope:** Quality validation. Principal reviewers evaluate work produced by builders and can block release.

---

### Level 3 — Release Manager

**Role:** Owns final release quality bar

**Allowed Actions:**
- ✅ Block release
- ✅ Challenge overengineering
- ✅ Challenge false green checks
- ✅ Require rework
- ✅ Require evidence package
- ✅ Challenge scope creep
- ✅ Verify all gates passed

**Prohibited Actions:**
- ❌ Approve without PM, Design QA, QA, and Security evidence when relevant
- ❌ Override all principal reviewer concerns without evidence
- ❌ Approve work that failed any quality gate

**Scope:** Final quality bar. Release Manager ensures all quality gates are passed before release.

---

### Level 4 — Governance Auditor

**Role:** Audits the agent system itself

**Allowed Actions:**
- ✅ Evaluate agent usefulness
- ✅ Flag false approvals
- ✅ Recommend merging, disabling, or deleting agents/skills
- ✅ Identify weak gates
- ✅ Recommend hooks for deterministic enforcement
- ✅ Score agent effectiveness
- ✅ Detect builder bias
- ✅ Audit approval patterns

**Prohibited Actions:**
- ❌ Implement product features
- ❌ Protect agents from criticism
- ❌ Approve release as a replacement for human approval
- ❌ Add roles without proving value

**Scope:** System governance. Governance Auditor evaluates the agent system itself, not product work.

---

## Authority Flow

```
Builder (Level 1)
    ↓ produces work
Principal Reviewer (Level 2)
    ↓ validates quality
Release Manager (Level 3)
    ↓ confirms all gates passed
Human Owner
    ↓ final approval
Release
```

**Governance Auditor (Level 4)**
    ↓ evaluates entire system
Can audit any level, recommend changes

---

## Decision Authority Matrix

| Decision Type | Builder | Principal Reviewer | Release Manager | Human Owner |
|---------------|---------|-------------------|----------------|-------------|
| Implement feature | ✅ | ❌ | ❌ | ✅ |
| Approve implementation | ❌ | ✅ | ✅ | ✅ |
| Reject implementation | ❌ | ✅ | ✅ | ✅ |
| Request rework | ❌ | ✅ | ✅ | ✅ |
| Block release | ❌ | ✅ | ✅ | ✅ |
| Override rejection | ❌ | ❌ | ❌ | ✅ |
| Add new agent | ❌ | ❌ | ❌ | ✅ |
| Remove agent | ❌ | ❌ | ❌ | ✅ |
| Change governance | ❌ | ❌ | ❌ | ✅ |

---

## Separation of Powers

### Builder Cannot

- Review own work
- Approve own work
- Declare own work release-ready
- Override reviewer decision

### Principal Reviewer Cannot

- Review work they implemented
- Approve without evidence
- Approve based on builder claims only
- Skip source-of-truth comparison

### Release Manager Cannot

- Approve without all principal reviewer evidence
- Override all quality gates
- Approve failed work
- Skip verification

### Governance Auditor Cannot

- Approve product releases
- Implement product features
- Protect agents from audit
- Override rejection based on popularity

---

## UI Task Specific Authority

**For any UI task, the following authorities apply:**

1. **Builder** (Level 1) — May implement only from approved visual plan
2. **Fresh Reviewer** (Level 2) — Must review (did not implement)
3. **Design Reviewer** (Level 2) — Must score visual parity
4. **Principal PM** (Level 2) — Must score product value
5. **Release Manager** (Level 3) — Must confirm release readiness
6. **Human Owner** — Must give final approval

**If any blocking gate fails, status is REJECTED — DO NOT RELEASE.**

---

## Enforcement Mechanisms

### 1. Evidence Requirements

All approvals require evidence:
- Screenshots for UI work
- Source-of-truth comparison
- Test results
- Risk scores

### 2. Independence Verification

Before review, agent must confirm:
- "I did not implement this change"
- "I have no stake in this approval"
- "I am incentivized to find problems"

### 3. Decision Documentation

All decisions must include:
- What was reviewed
- Evidence examined
- Specific concerns
- Clear verdict (ACCEPT/REJECT/REWORK)

### 4. Override Protection

Principal reviewer decisions can only be overridden by:
- Release Manager (with evidence)
- Human Owner (final authority)

Builder cannot override any decision.

---

## Anti-Patterns to Prevent

### Pattern 1: Builder Self-Approval

**Anti-Pattern:** Builder implements and approves own work

**Prevention:** Builder explicitly prohibited from reviewing own work

**Detection:** Governance Auditor monitors approval patterns

### Pattern 2: Evidence-Free Approval

**Anti-Pattern:** Reviewer approves based on builder confidence

**Prevention:** All approvals require evidence (screenshots, comparisons, scores)

**Detection:** Release Manager requires evidence package before approval

### Pattern 3: Gate Bypassing

**Anti-Pattern:** Work released without passing quality gates

**Prevention:** Each gate must pass before next step

**Detection:** Governance Auditor identifies skipped gates

### Pattern 4: Popularity-Based Override

**Anti-Pattern:** Popular agent decisions override evidence-based rejection

**Prevention:** Decisions based on evidence, not agent authority

**Detection:** Governance Auditor identifies override patterns

---

## Related Documentation

- **RACI Matrix:** `docs/agent-governance/RACI_MATRIX.md`
- **No Self Approval Rule:** `docs/agent-governance/NO_SELF_APPROVAL_RULE.md`
- **Visual Agentic Delivery:** `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md`
- **Agent Definitions:** `.claude/agents/`

---

**Last Updated:** 2026-06-10
