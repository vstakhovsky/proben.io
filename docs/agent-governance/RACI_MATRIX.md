# RACI Matrix - Proben.io Agent Governance

## Purpose

This RACI (Responsible, Accountable, Consulted, Informed) matrix defines who does what, who is accountable, who must be consulted, and who must be informed for each activity in the development process.

## Legend

- **R (Responsible):** Does the work
- **A (Accountable):** Owns the decision, can veto
- **C (Consulted):** Must be consulted before decision/action
- **I (Informed):** Must be informed after decision/action

## Matrix

| Activity | Builder | Principal PM | Design Reviewer | Principal Architect | QA Release Engineer | Security Reviewer | Release Manager | Governance Auditor | Human Owner |
|----------|---------|--------------|--------------------------|--------------------|---------------------|------------------|----------------|-------------------------|-------------|
| **Create visual plan** | C | A | C | C | I | I | C | I | I |
| **Approve visual plan** | I | C | C | C | I | I | I | I | A |
| **Implement UI** | R | I | I | C | I | I | I | I | I |
| **Implement backend** | R | I | I | A | I | C | C | I | I |
| **Run functional tests** | R | I | I | I | A | I | I | I | I |
| **Capture screenshot evidence** | R | I | I | I | C | I | I | I | I |
| **Review visual parity** | I | I | A | I | C | I | C | I | I |
| **Review product value** | I | A | I | I | C | I | C | I | I |
| **Review architecture** | I | C | I | A | C | I | C | I | I |
| **Review security** | I | I | I | I | C | A | C | I | I |
| **Assign risk score** | I | C | C | C | A | C | C | I | I |
| **Approve release** | I | A | A | A | A | C | A | I | A |
| **Audit agent performance** | I | I | I | I | I | I | I | R | I |
| **Retire weak agent/skill** | I | C | C | C | C | C | C | A | A |
| **Override rejection** | I | C | C | C | C | C | C | I | A |

## Activity Details

### Create Visual Plan

**Who does what:**
- **Builder (C):** Consulted on implementation feasibility
- **Principal PM (A):** Accountable for product goal alignment
- **Design Reviewer (C):** Consulted on visual feasibility
- **Principal Architect (C):** Consulted on technical feasibility
- **Release Manager (C):** Consulted on scope and complexity
- **Human Owner (A):** Final approval of plan before implementation

**No work starts until Human Owner approves visual plan.**

---

### Approve Visual Plan

**Who does what:**
- **Principal PM (C):** Consulted on product value
- **Design Reviewer (C):** Consulted on visual feasibility
- **Principal Architect (C):** Consulted on technical feasibility
- **Human Owner (A):** Final approval authority

**Implementation cannot start until approved.**

---

### Implement UI

**Who does what:**
- **Builder (R):** Responsible for implementation from approved plan
- **Principal Architect (C):** Consulted on technical approach
- **Human Owner (I):** Informed when implementation complete

**Builder implements only from approved plan. No scope expansion.**

---

### Run Functional Tests

**Who does what:**
- **Builder (R):** Responsible for running tests
- **QA Release Engineer (A):** Accountable for test coverage and results

**Tests must pass before any review.**

---

### Capture Screenshot Evidence

**Who does what:**
- **Builder (R):** Responsible for capturing evidence
- **QA Release Engineer (C):** Consulted on evidence requirements
- **Human Owner (I):** Informed when evidence ready

**Evidence required for all UI work before review.**

---

### Review Visual Parity

**Who does what:**
- **Design Reviewer (A):** Accountable for visual quality assessment
- **QA Release Engineer (C):** Consulted on evidence quality
- **Release Manager (C):** Consulted on design decisions

**Visual parity >= 4.5/5 required for approval.**

---

### Review Product Value

**Who does what:**
- **Principal PM (A):** Accountable for product quality assessment
- **QA Release Engineer (C):** Consulted on evidence quality
- **Release Manager (C):** Consulted on product decisions

**Product value score >= 4.0/5 required for approval.**

---

### Review Architecture

**Who does what:**
- **Principal Architect (A):** Accountable for technical quality assessment
- **QA Release Engineer (C):** Consulted on evidence quality
- **Release Manager (C):** Consulted on architectural decisions

**Architecture must be sound and maintainable.**

---

### Review Security

**Who does what:**
- **Security Reviewer (A):** Accountable for security assessment
- **Release Manager (C):** Consulted on security decisions

**No HIGH security risks allowed for release.**

---

### Assign Risk Score

**Who does what:**
- **Principal PM (C):** Consulted on product risk
- **Design Reviewer (C):** Consulted on design risk
- **Principal Architect (C):** Consulted on technical risk
- **Security Reviewer (C):** Consulted on security risk
- **QA Release Engineer (A):** Accountable for overall risk assessment
- **Release Manager (C):** Consulted on risk decisions

**Overall risk must be LOW or MEDIUM for release.**

---

### Approve Release

**Who does what:**
- **Principal PM (A):** Accountable for product quality approval
- **Design Reviewer (A):** Accountable for design quality approval
- **Principal Architect (A):** Accountable for technical quality approval
- **QA Release Engineer (A):** Accountable for QA validation
- **Security Reviewer (C):** Consulted on security status
- **Release Manager (A):** Accountable for overall release quality
- **Human Owner (A):** Final approval authority

**All A's must approve for release. Any A can veto.**

---

### Audit Agent Performance

**Who does what:**
- **Governance Auditor (R):** Responsible for conducting audits
- **Human Owner (I):** Informed of audit results

**Audits happen regularly to ensure agent effectiveness.**

---

### Retire Weak Agent/Skill

**Who does what:**
- **Governance Auditor (A):** Accountable for identifying weak agents
- **Principal PM (C):** Consulted on product impact
- **Design Reviewer (C):** Consulted on design impact
- **Principal Architect (C):** Consulted on technical impact
- **QA Release Engineer (C):** Consulted on QA impact
- **Security Reviewer (C):** Consulted on security impact
- **Human Owner (A):** Final approval for agent changes

**Agents must demonstrate value to remain in system.**

---

### Override Rejection

**Who does what:**
- **Principal PM (C):** Consulted on product considerations
- **Design Reviewer (C):** Consulted on design considerations
- **Principal Architect (C):** Consulted on technical considerations
- **QA Release Engineer (C):** Consulted on QA considerations
- **Security Reviewer (C):** Consulted on security considerations
- **Human Owner (A):** Final override authority

**Rejections can only be overridden by Human Owner.**

---

## Decision Flow

### For UI Work

```
1. Builder creates visual plan (C)
   ↓
2. Principal PM approves plan (A)
   ↓
3. Builder implements (R)
   ↓
4. Builder captures evidence (R)
   ↓
5. Fresh reviewer reviews (did not implement)
   ↓
6. Design Reviewer scores visual parity (A)
   ↓
7. Principal PM scores product value (A)
   ↓
8. QA Release Engineer assigns risk score (A)
   ↓
9. Release Manager confirms release readiness (A)
   ↓
10. Human Owner gives final approval (A)
   ↓
11. Release
```

**Any A can veto at their step. Rejection requires return to appropriate step.**

---

## Governance Principles

### 1. No Self-Approval

**Principle:** The agent that implements cannot approve the implementation.

**Enforcement:** RACI matrix separates R (Builder) from A (Principal Reviewer) for all approvals.

### 2. Evidence-Based Decisions

**Principle:** All approvals require evidence, not builder confidence.

**Enforcement:** RACI matrix requires evidence capture (R) before review (A).

### 3. Multiple Accountability

**Principle:** Multiple agents are accountable for release decisions.

**Enforcement:** RACI matrix shows multiple A's for release approval.

### 4. Human Final Authority

**Principle:** Human Owner has final approval and override authority.

**Enforcement:** RACI matrix shows Human Owner as A for all final decisions.

---

## Related Documentation

- **Agent Authority Matrix:** `docs/agent-governance/AGENT_AUTHORITY_MATRIX.md`
- **No Self Approval Rule:** `docs/agent-governance/NO_SELF_APPROVAL_RULE.md`
- **Visual Agentic Delivery:** `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md`
- **Agent Definitions:** `.claude/agents/`

---

**Last Updated:** 2026-06-10
