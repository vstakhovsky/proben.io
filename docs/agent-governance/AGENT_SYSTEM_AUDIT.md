# Agent System Audit

## Purpose

Comprehensive audit of all Proben.io agents to identify duplicates, weak roles, and opportunities for simplification. Reduce agent sprawl while strengthening role authority and preventing false green approvals.

## Audit Criteria

Each agent is evaluated against:
- **Current purpose** — What it's supposed to do
- **Actual value** — What it actually delivers
- **Duplicates with** — Other agents with overlapping responsibilities
- **Evidence produced** — Does it create verifiable outputs
- **Can block release** — Does it have authority to stop release
- **Risk of false confidence** — Can it create false green checks
- **Decision** — KEEP / MERGE / DOWNGRADE TO SKILL / DISABLE / DELETE

## Current State (Before Simplification)

**Total Agents:** 23
**Total Skills:** 16
**Target Agents:** 6-8 core agents

## Comprehensive Audit Table

| Agent / Skill | Current Purpose | Actual Value | Duplicates With | Evidence Produced | Can Block Release | Risk of False Confidence | Decision | Reason | Required Instruction Update |
|---------------|----------------|--------------|-----------------|-------------------|------------------|-------------------------|----------|---------|-----------------------------|
| **product-manager** | Product requirements, PM eval, product quality | HIGH — Clear product authority | product-manager, ai-product-manager | PM eval scores, requirement docs | YES — Can block on product grounds | MEDIUM — May overlook visual quality | **KEEP** | Core product authority, Level 2 reviewer | Add visual quality awareness, evidence requirements |
| **design-reviewer** | Visual quality, design parity, brand fit | HIGH — Critical visual QA | design-quality-reviewer, visual-systems-designer | Visual scores, blocker detection | YES — Can block on visual grounds | LOW — Evidence-based | **KEEP** | Core design authority, Level 2 reviewer | Already updated with strict rules |
| **frontend-engineer** | React components, UI implementation | HIGH — Technical execution | — | Code components, test IDs | NO — Cannot approve own work | LOW — Builder only | **KEEP** | Core builder, Level 1 | Already updated with prohibitions |
| **test-engineer** | Tests, evals, quality verification | HIGH — Quality infrastructure | qa-release-engineer | Test files, eval results | NO — Advisor only | LOW — Evidence-based | **KEEP (NEW)** | Core quality builder, Level 1 | Create new, merge qa-release-engineer |
| **fresh-review-agent** | Independent review, evidence verification | VERY HIGH — Prevents false PASS | implementation-critic, design-quality-reviewer | Review reports, verdicts | YES — Can block | LOW — Independent | **KEEP** | Core reviewer, Level 2 | Already updated with evidence-first protocol |
| **visual-plan-architect** | Visual plans before implementation | HIGH — Planning quality | source-to-visual, visual-systems-designer | Visual plans, prototypes | NO — Advisor only | MEDIUM — Plans may not match execution | **KEEP** | Core planner, Level 1 | Add evidence capture requirements |
| **governance-auditor** | Audit agent system, recommend changes | HIGH — System governance | — | Audit reports, recommendations | YES — Can block weak agents | LOW — Independent oversight | **KEEP** | System governance, Level 4 | Add false approval detection |
| **release-manager** | Final release quality bar | VERY HIGH — Release authority | qa-release-engineer | Release decisions, evidence checks | YES — Final authority | LOW — Evidence-based | **KEEP** | Release authority, Level 3 | Already has strong instructions |
| **security-reviewer** | Security review, safe practices | HIGH — Security oversight | — | Security findings | YES — Can block on security | MEDIUM — May miss edge cases | **KEEP (CONDITIONAL)** | Security specialist, Level 2 | Add conditional invocation rules |
| **principal-architect** | Architecture, routing, dependencies | HIGH — Technical direction | architect, context-architect | ADRs, architecture docs | YES — Can block on architecture | MEDIUM — May overlook visual impact | **KEEP (CONDITIONAL)** | Architecture authority, Level 2 | Add conditional invocation rules |
| **research-analyst** | Research, competitive analysis | MEDIUM — Research value | research-digest | Research summaries | NO — Advisor only | MEDIUM — May create more text than value | **KEEP (CONDITIONAL)** | Research specialist | Add conditional invocation rules |
| **product-manager** | PM work, product evals | MEDIUM — Duplicate role | product-manager, ai-product-manager | PM evals, docs | NO — Lower authority | MEDIUM — Redundant with principal | **MERGE** | Merge into product-manager | Absorb any unique value |
| **ai-product-manager** | AI product strategy | LOW — Niche use | product-manager, product-manager | Strategy docs | NO — Niche only | MEDIUM — More text than value | **MERGE** | Merge into product-manager | Absorb AI strategy guidance |
| **design-quality-reviewer** | Design review, visual QA | MEDIUM — Duplicate role | design-reviewer | Design reviews | NO — Lower authority | MEDIUM — Redundant with principal | **MERGE** | Merge into design-reviewer | Already absorbed |
| **architect** | Architecture leadership | MEDIUM — Duplicate role | principal-architect, context-architect | Architecture docs | NO — Lower authority | MEDIUM — Redundant with principal | **MERGE** | Merge into principal-architect | Absorb any unique guidance |
| **context-architect** | Context organization | LOW — Weak value | architect, principal-architect | Context maps | NO — Advisor only | HIGH — Creates more structure than value | **DELETE** | No clear value add | Merge any unique concepts into principal-architect |
| **documentation-engineer** | Documentation | MEDIUM — Documentation needed | portfolio-documentation-engineer, process-storyteller | Documentation files | NO — Advisor only | MEDIUM — Creates docs without recording decisions | **DOWNGRADE TO SKILL** | Convert to update-docs-and-build-history skill | Add decision/failure/eval/gate documentation |
| **portfolio-documentation-engineer** | Portfolio docs | LOW — Niche use | documentation-engineer | Portfolio pages | NO — Advisor only | MEDIUM — More text than value | **DOWNGRADE TO SKILL** | Convert to portfolio-process-page skill | Already exists as skill |
| **process-storyteller** | Process narrative | LOW — Weak value | documentation-engineer | Narrative docs | NO — Advisor only | HIGH — Storytelling without evidence | **DELETE** | Adds fluff without quality value | Remove entirely |
| **prompt-optimizer** | Prompt optimization | MEDIUM — Sometimes useful | — | Optimized prompts | NO — Advisor only | MEDIUM — May create more prompt complexity | **DOWNGRADE TO SKILL** | Convert to failure-to-prompt-update skill | Trigger on eval cases only |
| **worktree-orchestrator** | Worktree management | MEDIUM — Process tool | — | Worktree setup | NO — Advisor only | LOW — Process tool, not agent | **DOWNGRADE TO POLICY/SCRIPT** | Convert to policy/script/hook | Not a standalone agent |
| **implementation-critic** | Code review, criticism | LOW — Duplicate role | fresh-review-agent | Critique | NO — Advisor only | MEDIUM — Overlaps with fresh review | **MERGE** | Merge into fresh-review-agent | Absorb critical review patterns |
| **qa-release-engineer** | QA, release management | MEDIUM — Partial duplicate | test-engineer, release-manager | QA plans, release checks | YES — Can block | LOW — Partial overlap with test-eval | **MERGE** | Merge into test-engineer + release-manager | Absorb unique release checks |
| **ai-engineer** | AI implementation | LOW — Phase 2+ only | — | AI code | NO — Advisor only | LOW — Not used in Phase 1 | **DISABLE** | Not applicable to Phase 1 | Enable when needed for Phase 2 |
| **diagram-engineer** | Diagrams, visuals | MEDIUM — Sometimes useful | mermaid-diagram-generator skill | Diagrams | NO — Advisor only | LOW — Visual output | **DOWNGRADE TO SKILL** | Already exists as mermaid-diagram-generator skill | Use skill instead |
| **visual-systems-designer** | Visual systems | LOW — Niche use | design-reviewer, visual-plan-architect | Visual systems docs | NO — Advisor only | MEDIUM — Overlaps with design agents | **MERGE** | Merge into visual-plan-architect | Absorb system design concepts |

## Summary Statistics

### By Decision Type

| Decision | Count | Agents |
|----------|-------|--------|
| **KEEP** | 8 | product-manager, design-reviewer, frontend-engineer, test-engineer (new), fresh-review-agent, visual-plan-architect, governance-auditor, release-manager |
| **KEEP (CONDITIONAL)** | 3 | security-reviewer, principal-architect, research-analyst |
| **MERGE** | 7 | product-manager, ai-product-manager, design-quality-reviewer, architect, implementation-critic, qa-release-engineer, visual-systems-designer |
| **DOWNGRADE TO SKILL** | 4 | documentation-engineer, portfolio-documentation-engineer, prompt-optimizer, diagram-engineer |
| **DOWNGRADE TO POLICY/SCRIPT** | 1 | worktree-orchestrator |
| **DELETE** | 2 | context-architect, process-storyteller |
| **DISABLE** | 1 | ai-engineer |

### By Authority Level (After Simplification)

| Level | Count (After) | Agents |
|-------|---------------|--------|
| **Level 4 — System Governance** | 1 | governance-auditor |
| **Level 3 — Release Quality** | 1 | release-manager |
| **Level 2 — Principal Reviewers** | 5 | product-manager, design-reviewer, security-reviewer (conditional), principal-architect (conditional), fresh-review-agent |
| **Level 1 — Builders** | 3 | frontend-engineer, test-engineer, visual-plan-architect |

### By Responsibility Type (After Simplification)

| Type | Count (After) | Agents |
|------|---------------|--------|
| **Builders** | 3 | frontend-engineer, test-engineer, visual-plan-architect |
| **Reviewers** | 5 | product-manager, design-reviewer, security-reviewer, principal-architect, fresh-review-agent |
| **Governance** | 2 | governance-auditor, release-manager |
| **Specialists** | 3 | security-reviewer (conditional), principal-architect (conditional), research-analyst (conditional) |

## Key Findings

### Problems Identified

1. **Agent Sprawl** — 23 agents for a Phase 1 MVP is excessive
2. **Duplicate Roles** — Multiple PM, architect, design agents with overlapping responsibilities
3. **Weak Authority** — Many agents lack clear blocking authority
4. **False Confidence Risk** — Several agents create text without evidence
5. **Missing Core Roles** — No dedicated test/eval engineer (function scattered)
6. **Documentation Bloat** — Multiple documentation agents creating more text than value

### Strengths Identified

1. **Strong Governance** — governance-auditor and release-manager provide oversight
2. **Evidence-Based Review** — fresh-review-agent has strong evidence requirements
3. **Clear Visual QA** — design-reviewer has strict visual rules
4. **Independent Review** — Builder ≠ reviewer separation established

## Recommended Target Model

### Core Agents (8) — Always Active

1. **product-manager** — Product authority, PM evals
2. **design-reviewer** — Visual QA, design parity
3. **frontend-engineer** — UI implementation
4. **test-engineer** (NEW) — Tests, evals, quality infrastructure
5. **fresh-review-agent** — Independent review
6. **visual-plan-architect** — Visual planning
7. **governance-auditor** — System oversight
8. **release-manager** — Final release authority

### Conditional Agents (3) — Invoke When Needed

1. **security-reviewer** — For auth, payments, secrets, AI/prompt risks
2. **principal-architect** — For architecture, routing, dependencies
3. **research-analyst** — For research or validation phases

### Skills to Strengthen

1. **update-docs-and-build-history** (NEW) — From documentation-engineer
2. **failure-to-prompt-update** (NEW) — From prompt-optimizer
3. **portfolio-process-page** — Existing
4. **worktree-management** (NEW) — From worktree-orchestrator

## False Approval Tracking

### Definition

A **false PASS** occurs when:
- Agent claimed PASS or ACCEPTED
- Human browser review disagreed
- Screenshot evidence contradicted agent claim
- DOM tests revealed blocker agent missed

### Current State

| Date | Agent | Task | Agent Verdict | Human/Browser Verdict | Eval Case | Resolution |
|------|-------|------|----------------|---------------------|-----------|------------|
| 2026-06-10 | Multiple agents | Slice A implementation | ACCEPTED | REJECTED | EV-AGENT-001, EV-VIS-001, EV-PROD-001 | Builder ≠ reviewer, evidence requirements added |

**Current False PASS Count:** 1 (EV-AGENT-001) — Resolved through agent system improvements

## Audit Schedule

### Quarterly Audit

Every quarter, audit the agent system:
1. Review all agents for usefulness criteria
2. Track false approval rate
3. Identify duplicate or overlapping agents
4. Recommend consolidations, removals, or additions

### Per-Failure Audit

After any false PASS or major failure:
1. Audit agents involved in the failure
2. Identify why agent didn't catch the issue
3. Recommend agent improvement or removal
4. Update agent instructions if needed

## Related Documentation

- **[AGENT_RETIREMENT_DECISIONS.md](AGENT_RETIREMENT_DECISIONS.md)** — Detailed retirement decisions
- **[AGENT_ROSTER.md](AGENT_ROSTER.md)** — Simplified agent roster
- **[AGENT_AUTHORITY_MATRIX.md](AGENT_AUTHORITY_MATRIX.md)** — Authority levels and permissions
- **[RACI_MATRIX.md](RACI_MATRIX.md)** — Responsibility assignments
- **[BUILD_LEARNING_DECISION_LOG.md](../product-build-history/BUILD_LEARNING_DECISION_LOG.md)** — Agent-related BLD entries
- **[FAILURE_TO_GATE_REGISTRY.md](../product-build-history/FAILURE_TO_GATE_REGISTRY.md)** — Gate failures

---

**Last Updated:** 2026-06-10
**Version:** 2.0
**Audit Date:** 2026-06-10
**Auditor:** Governance Auditor
**Current Agent Count (Before):** 23
**Current Agent Count (After):** 8 core + 3 conditional
**Reduction:** 67%
