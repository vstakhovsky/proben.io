# Agent Retirement Decisions

## Purpose

Document detailed decisions for agents that are merged, downgraded to skills, disabled, or deleted. This provides a complete audit trail of the agent system simplification process.

## Retirement Summary

**Total Agents Retired:** 15
- **Merged:** 7 agents
- **Downgraded to Skills:** 4 agents
- **Downgraded to Policy/Script:** 1 agent
- **Deleted:** 2 agents
- **Disabled:** 1 agent

## Merged Agents

### 1. product-manager → principal-product-manager

**Retirement Date:** 2026-06-10
**Retirement Type:** MERGE
**Reason:** Redundant with principal-product-manager, lower authority

**Absorption Process:**
- Merge PM evaluation patterns into principal-product-manager
- Absorb any unique prompts or instructions
- Update principal-product-agent authority to Level 2
- Add product quality gate responsibilities

**Value Preserved:**
- PM evaluation methodology
- Product assessment criteria
- Requirement documentation patterns

**Files Updated:**
- `.claude/agents/principal-product-manager.md` — Enhanced with merged capabilities

**Learning:**
- Having multiple PM agents creates confusion and authority conflicts
- Single principal PM with clear Level 2 authority is more effective

---

### 2. ai-product-strategist → principal-product-manager

**Retirement Date:** 2026-06-10
**Retirement Type:** MERGE
**Reason:** Niche AI strategy role, redundant with principal-product-manager

**Absorption Process:**
- Merge AI strategy guidance into principal-product-manager
- Add AI product considerations to PM instructions
- Preserve AI strategy as conditional invocation pattern

**Value Preserved:**
- AI product strategy patterns
- AI feature evaluation criteria

**Files Updated:**
- `.claude/agents/principal-product-manager.md` — Added AI strategy section

**Learning:**
- AI strategy is a product concern, not a separate agent role
- Conditional invocation patterns are better than separate agents

---

### 3. design-quality-reviewer → principal-design-reviewer

**Retirement Date:** 2026-06-10
**Retirement Type:** MERGE
**Reason:** Redundant with principal-design-reviewer, lower authority

**Absorption Process:**
- Already absorbed in principal-design-reviewer updates
- Merge design quality evaluation patterns
- Unify design scoring rubrics

**Value Preserved:**
- Design quality evaluation methodology
- Design rubric patterns

**Files Updated:**
- `.claude/agents/principal-design-reviewer.md` — Already enhanced

**Learning:**
- Single principal design reviewer prevents conflicting design guidance
- Design QA requires Level 2 authority to be effective

---

### 4. lead-architect → principal-architect

**Retirement Date:** 2026-06-10
**Retirement Type:** MERGE
**Reason:** Redundant with principal-architect, lower authority

**Absorption Process:**
- Merge architecture leadership patterns
- Absorb technical guidance methodologies
- Unify architecture review criteria

**Value Preserved:**
- Architecture leadership patterns
- Technical review methodologies

**Files Updated:**
- `.claude/agents/principal-architect.md` — Enhanced with merged capabilities

**Learning:**
- Single principal architect prevents architecture conflicts
- Conditional invocation for architecture work is more efficient

---

### 5. implementation-critic → fresh-review-agent

**Retirement Date:** 2026-06-10
**Retirement Type:** MERGE
**Reason:** Overlaps with fresh-review-agent, redundant critical review function

**Absorption Process:**
- Merge critical review patterns into fresh-review-agent
- Absorb code criticism methodologies
- Enhance evidence-first review with critical analysis

**Value Preserved:**
- Code criticism patterns
- Critical review methodologies

**Files Updated:**
- `.claude/agents/fresh-review-agent.md` — Enhanced with critical review capabilities

**Learning:**
- Critical review is part of fresh review, not a separate function
- Evidence-first review includes critical analysis

---

### 6. qa-release-engineer → test-eval-engineer + cto-bar-raiser

**Retirement Date:** 2026-06-10
**Retirement Type:** MERGE
**Reason:** Partially duplicate with test-eval-engineer and cto-bar-raiser

**Absorption Process:**
- Merge QA methodology into test-eval-engineer (NEW)
- Merge release checks into cto-bar-raiser
- Preserve release verification patterns

**Value Preserved:**
- QA planning methodologies
- Release verification checklists
- Smoke test patterns

**Files Updated:**
- `.claude/agents/test-eval-engineer.md` (NEW) — Created with QA capabilities
- `.claude/agents/cto-bar-raiser.md` — Enhanced with release checks

**Learning:**
- QA and eval functions are closely related
- Release authority should be centralized in cto-bar-raiser

---

### 7. visual-systems-designer → visual-plan-architect

**Retirement Date:** 2026-06-10
**Retirement Type:** MERGE
**Reason:** Niche visual systems role, overlaps with visual-plan-architect

**Absorption Process:**
- Merge visual system design patterns into visual-plan-architect
- Absorb system-level visual thinking
- Preserve visual system documentation

**Value Preserved:**
- Visual system design patterns
- System-level visual consistency methodologies

**Files Updated:**
- `.claude/agents/visual-plan-architect.md` — Enhanced with system design capabilities

**Learning:**
- Visual system design is part of visual planning
- System-level thinking should be integrated into planning, not separate

---

## Downgraded to Skills

### 1. documentation-engineer → update-docs-and-build-history skill

**Retirement Date:** 2026-06-10
**Retirement Type:** DOWNGRADE TO SKILL
**Reason:** Creates documentation without recording decisions/failures/evals

**Downgrade Process:**
- Convert to skill: `.claude/skills/update-docs-and-build-history/`
- Focus on decision/failure/eval/gate documentation
- Remove general documentation capability
- Add trigger: only when BLD entry or eval case created

**Skill Purpose:**
- Update build learning logs
- Update decision documentation
- Update eval documentation
- Update gate documentation

**Value Preserved:**
- Documentation capabilities for governance

**Files Created:**
- `.claude/skills/update-docs-and-build-history/skill.md` (NEW)

**Learning:**
- Documentation should only be created when it records decisions, failures, evals, or gates
- General documentation without governance purpose creates noise

---

### 2. portfolio-documentation-engineer → portfolio-process-page skill

**Retirement Date:** 2026-06-10
**Retirement Type:** DOWNGRADE TO SKILL
**Reason:** Niche portfolio role, skill already exists

**Downgrade Process:**
- Use existing skill: `.claude/skills/portfolio-process-page/`
- Remove agent, keep skill
- Focus on portfolio page generation

**Skill Purpose:**
- Generate portfolio process pages
- Document build history for portfolio

**Value Preserved:**
- Portfolio documentation capabilities

**Files Kept:**
- `.claude/skills/portfolio-process-page/` (existing)

**Learning:**
- Niche portfolio work is better as a skill than a full agent

---

### 3. prompt-optimizer → failure-to-prompt-update skill

**Retirement Date:** 2026-06-10
**Retirement Type:** DOWNGRADE TO SKILL
**Reason:** Prompt optimization should be triggered by eval cases, not general use

**Downgrade Process:**
- Convert to skill: `.claude/skills/failure-to-prompt-update/`
- Change trigger: only when eval case created
- Focus on preventing failure recurrence

**Skill Purpose:**
- Update agent prompts based on eval cases
- Update agent instructions based on failures
- Optimize prompts to prevent recurrence

**Value Preserved:**
- Prompt optimization capabilities for failure prevention

**Files Created:**
- `.claude/skills/failure-to-prompt-update/skill.md` (NEW)

**Learning:**
- Prompt optimization should be reactive (to failures), not proactive
- Eval cases should trigger prompt updates

---

### 4. diagram-engineer → mermaid-diagram-generator skill

**Retirement Date:** 2026-06-10
**Retirement Type:** DOWNGRADE TO SKILL
**Reason:** Diagram generation is better as a skill, skill already exists

**Downgrade Process:**
- Use existing skill: `.claude/skills/mermaid-diagram-generator/`
- Remove agent, keep skill
- Focus on diagram generation

**Skill Purpose:**
- Generate Mermaid diagrams
- Create visual documentation

**Value Preserved:**
- Diagram generation capabilities

**Files Kept:**
- `.claude/skills/mermaid-diagram-generator/` (existing)

**Learning:**
- Diagram generation is a utility, not a full agent role

---

## Downgraded to Policy/Script

### 1. worktree-orchestrator → worktree-management policy/script

**Retirement Date:** 2026-06-10
**Retirement Type:** DOWNGRADE TO POLICY/SCRIPT
**Reason:** Worktree management is a process tool, not a standalone agent

**Downgrade Process:**
- Convert to policy/script
- Create worktree management script
- Add hook for automatic worktree setup
- Document in BUILD_PROCESS.md

**Policy Purpose:**
- Define when to use worktrees
- Define worktree creation process
- Define worktree cleanup process

**Value Preserved:**
- Worktree management capabilities

**Files Created:**
- `scripts/worktree-management.js` (NEW)
- `.claude/hooks/worktree-setup` (NEW)
- Update `docs/BUILD_PROCESS.md` with worktree policy

**Learning:**
- Worktree management is a process automation, not an agent role
- Hooks and scripts are better than agents for process automation

---

## Deleted Agents

### 1. context-architect

**Retirement Date:** 2026-06-10
**Retirement Type:** DELETE
**Reason:** No clear value add, creates more structure than value

**Deletion Process:**
- Remove agent file
- No unique value to preserve
- Concepts merged into principal-architect (if any value)

**Rationale:**
- Context organization is not a distinct agent responsibility
- Architectural context should be part of principal-architect role
- Adding structure without value creates complexity

**Files Deleted:**
- `.claude/agents/context-architect.md`

**Learning:**
- Not every conceptual framework needs a dedicated agent
- Context and structure should emerge from core agents' work

---

### 2. process-storyteller

**Retirement Date:** 2026-06-10
**Retirement Type:** DELETE
**Reason:** Adds narrative fluff without quality value

**Deletion Process:**
- Remove agent file
- No unique value to preserve
- No replacement needed

**Rationale:**
- Storytelling about process doesn't improve quality
- Narrative without evidence creates false confidence
- Process should be documented through decisions and failures, not stories

**Files Deleted:**
- `.claude/agents/process-storyteller.md`

**Learning:**
- Process documentation should be evidence-based (decisions, failures, evals)
- Narrative storytelling without evidence is noise

---

## Disabled Agents

### 1. ai-engineer

**Retirement Date:** 2026-06-10
**Retirement Type:** DISABLE
**Reason:** Not applicable to Phase 1 (no AI implementation)

**Disable Process:**
- Keep agent file but mark as DISABLED
- Add note: Enable when needed for Phase 2
- Document when to enable (AI implementation phase)

**When to Enable:**
- Phase 2: Real AI provider integration
- Phase 2: AI feature implementation
- Phase 2: AI/prompt engineering

**Value Preserved:**
- AI implementation capabilities for future phases

**Files Updated:**
- `.claude/agents/ai-engineer.md` — Marked as DISABLED, added enable conditions

**Learning:**
- Some agents are phase-specific and should be disabled when not needed
- Agent roster should be minimal for current phase only

---

## Summary Statistics

### Before Simplification
- **Total Agents:** 23
- **Core Active Agents:** 15
- **Conditional Agents:** 5
- **Disabled/Unused:** 3

### After Simplification
- **Total Agents:** 11 (8 core + 3 conditional)
- **Core Active Agents:** 8
- **Conditional Agents:** 3
- **Skills Created/Enhanced:** 4
- **Agents Reduction:** 52% (23 → 11)
- **Core Agents Reduction:** 47% (15 → 8)

## Impact Assessment

### Quality Impact
- **Positive:** Reduced agent confusion, clearer authority
- **Positive:** Stronger evidence requirements across all agents
- **Positive:** Eliminated redundant review steps
- **Neutral:** Some niche expertise now in skills rather than agents

### Process Impact
- **Positive:** Simpler agent roster easier to understand
- **Positive:** Clearer invocation patterns for conditional agents
- **Positive:** Skills provide more focused capabilities
- **Neutral:** Some agent merges require knowledge transfer

### Risk Impact
- **Positive:** Reduced false approval risk through fewer agents
- **Positive:** Stronger governance through agent-governance-auditor
- **Positive:** Clearer escalation paths
- **Neutral:** Conditional agents need clear invocation rules

## Related Documentation

- **[AGENT_SYSTEM_AUDIT.md](AGENT_SYSTEM_AUDIT.md)** — Comprehensive audit table
- **[AGENT_ROSTER.md](AGENT_ROSTER.md)** — Simplified agent roster
- **[AGENT_AUTHORITY_MATRIX.md](AGENT_AUTHORITY_MATRIX.md)** — Authority levels and permissions
- **[BUILD_LEARNING_DECISION_LOG.md](../product-build-history/BUILD_LEARNING_DECISION_LOG.md)** — BLD entry for this simplification

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Retirement Date:** 2026-06-10
**Agents Retired:** 15
**Agents Kept:** 11 (8 core + 3 conditional)
