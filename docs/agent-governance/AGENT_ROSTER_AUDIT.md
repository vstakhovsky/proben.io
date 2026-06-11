# Agent Roster Audit — Clean Role Names

**Audit Date:** 2026-06-11
**Purpose:** Remove title grades (principal, senior, staff, lead, chief, head) and simplify agent system
**Current Agent Count:** 33 files
**Target Agent Count:** ~15 core roles

## Naming Policy

**Prohibited Names:**
- principal ❌
- senior ❌
- staff ❌
- lead ❌
- chief ❌
- head ❌

**Correct Names:**
- product-manager ✅
- design-reviewer ✅
- architect ✅
- release-manager ✅
- frontend-engineer ✅

**Rationale:** Authority comes from workflow gates and evidence, not inflated titles.

---

## Complete Agent Inventory

### Core Product & Release Roles

#### 1. product-manager.md
**Status:** RENAME
**New Name:** product-manager
**Action:** Rename file, update content to remove "Principal" from all descriptions
**Reason:** Title grade "principal" is prohibited. Authority comes from gates, not titles.
**Dependencies:** Update all references across docs, skills, scripts

#### 2. release-manager.md
**Status:** RENAME
**New Name:** release-manager
**Action:** Rename file, update content to remove "CTO" title
**Reason:** "CTO" is a chief/head title (prohibited). "release-manager" is clearer role name.
**Dependencies:** Update all references across docs, skills, scripts

#### 3. architect.md
**Status:** RENAME
**New Name:** architect
**Action:** Rename file, update content to remove "Lead" title
**Reason:** "lead" is a prohibited seniority title. "architect" is the role.
**Dependencies:** Update all references

### Quality & Review Roles

#### 4. design-reviewer.md
**Status:** RENAME
**New Name:** design-reviewer
**Action:** Rename file, update content
**Reason:** Remove "principal" title grade
**Dependencies:** Update all references

#### 5. governance-auditor.md
**Status:** RENAME
**New Name:** governance-auditor
**Action:** Rename file, update content
**Reason:** "governance-auditor" is redundant. "governance-auditor" is cleaner.
**Dependencies:** Update all references

#### 6. fresh-review-agent.md
**Status:** KEEP
**New Name:** fresh-review-agent (already clean)
**Action:** No change needed
**Reason:** Already uses clean role name

#### 7. design-quality-reviewer.md
**Status:** ARCHIVE
**Action:** Move to _archive/
**Reason:** Merged into design-reviewer per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

#### 8. implementation-critic.md
**Status:** ARCHIVE
**Action:** Move to _archive/
**Reason:** Merged into fresh-review-agent per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

### Builder & Engineer Roles

#### 9. frontend-engineer.md
**Status:** KEEP
**New Name:** frontend-engineer (already clean)
**Action:** No change needed
**Reason:** Already uses clean role name

#### 10. test-engineer.md
**Status:** RENAME
**New Name:** test-engineer
**Action:** Rename file, update content
**Reason:** "test-engineer" is cleaner than "test-engineer"
**Dependencies:** Update all references

#### 11. ai-engineer.md
**Status:** KEEP (DISABLED)
**New Name:** ai-engineer
**Action:** Mark as DISABLED for Phase 1
**Reason:** Not applicable to Phase 1 (no AI implementation)
**Enable Condition:** Phase 2+ AI integration

#### 12. prototype-port-engineer.md
**Status:** KEEP
**New Name:** prototype-port-engineer
**Action:** No change needed
**Reason:** Specialist role for prototype porting, already clean name

#### 13. visual-plan-architect.md
**Status:** KEEP
**New Name:** visual-plan-architect
**Action:** No change needed
**Reason:** Specialist role, already clean name

#### 14. visual-regression-reviewer.md
**Status:** ARCHIVE
**Action:** Move to _archive/ (or merge into design-reviewer)
**Reason:** Overlaps with design-reviewer. Visual regression is design QA.
**Archive Date:** 2026-06-11

#### 15. visual-systems-designer.md
**Status:** ARCHIVE
**Action:** Move to _archive/
**Reason:** Merged into visual-plan-architect per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

### Specialized Roles (Conditional)

#### 16. security-reviewer.md
**Status:** KEEP
**New Name:** security-reviewer (already clean)
**Action:** No change needed
**Reason:** Conditional role for auth/security work, already clean name

#### 17. research-analyst.md
**Status:** KEEP
**New Name:** research-analyst (already clean)
**Action:** No change needed
**Reason:** Conditional role for research phases, already clean name

#### 18. ai-product-manager.md
**Status:** RENAME
**New Name:** ai-product-manager
**Action:** Rename file, update content
**Reason:** "ai-product-manager" is clearer than "ai-product-manager"
**Dependencies:** Update all references

### Downgraded to Skills

#### 19. documentation-engineer.md
**Status:** ARCHIVE (DOWNGRADED TO SKILL)
**Action:** Move to _archive/ (replaced by update-docs-and-build-history skill)
**Reason:** Downgraded to skill per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

#### 20. portfolio-documentation-engineer.md
**Status:** ARCHIVE (DOWNGRADED TO SKILL)
**Action:** Move to _archive/ (replaced by portfolio-process-page skill)
**Reason:** Downgraded to skill per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

#### 21. prompt-optimizer.md
**Status:** ARCHIVE (DOWNGRADED TO SKILL)
**Action:** Move to _archive/ (replaced by failure-to-prompt-update skill)
**Reason:** Downgraded to skill per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

#### 22. diagram-engineer.md
**Status:** ARCHIVE (DOWNGRADED TO SKILL)
**Action:** Move to _archive/ (replaced by mermaid-diagram-generator skill)
**Reason:** Downgraded to skill per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

#### 23. worktree-orchestrator.md
**Status:** ARCHIVE (DOWNGRADED TO SCRIPT)
**Action:** Move to _archive/ (replaced by worktree-management script)
**Reason:** Downgraded to script per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

#### 24. qa-release-engineer.md
**Status:** ARCHIVE (MERGED)
**Action:** Move to _archive/ (merged into test-engineer)
**Reason:** Merged per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

### Harness State-Machine Roles

#### 25. implementer.md
**Status:** KEEP
**New Name:** implementer
**Action:** No change needed
**Reason:** Harness IMPLEMENT state role

#### 26. verifier.md
**Status:** KEEP
**New Name:** verifier
**Action:** No change needed
**Reason:** Harness VERIFY state role

#### 27. reviewer.md
**Status:** KEEP
**New Name:** reviewer
**Action:** No change needed
**Reason:** Harness REVIEW state role

#### 28. closer.md
**Status:** KEEP
**New Name:** closer
**Action:** No change needed
**Reason:** Harness CLOSE state role

#### 29. retro.md
**Status:** KEEP
**New Name:** retro
**Action:** No change needed
**Reason:** Harness RETRO state role

### Deleted Agents (Already Removed per AGENT_RETIREMENT_DECISIONS.md)

#### 30. context-architect.md
**Status:** ARCHIVE (DELETED)
**Action:** Move to _archive/
**Reason:** No clear value add, deleted per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-10

#### 31. process-storyteller.md
**Status:** ARCHIVE (DELETED)
**Action:** Move to _archive/
**Reason:** Adds narrative fluff without quality value, deleted per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-10

### Duplicate/Redundant

#### 32. product-manager.md
**Status:** ARCHIVE
**Action:** Move to _archive/ (merged into product-manager which will become product-manager)
**Reason:** Redundant with product-manager per AGENT_RETIREMENT_DECISIONS.md
**Archive Date:** 2026-06-11

---

## Final Agent Count

### Core Agents (11) — After Cleanup

1. **product-manager** (renamed from product-manager)
2. **ai-product-manager** (renamed from ai-product-manager)
3. **release-manager** (renamed from release-manager)
4. **architect** (renamed from architect)
5. **design-reviewer** (renamed from design-reviewer)
6. **governance-auditor** (renamed from governance-auditor)
7. **security-reviewer** (conditional)
8. **research-analyst** (conditional)
9. **frontend-engineer**
10. **test-engineer** (renamed from test-engineer)
11. **prototype-port-engineer**

### Specialist Agents (3)

12. **visual-plan-architect**
13. **fresh-review-agent**
14. **ai-engineer** (DISABLED for Phase 1)

### Harness Roles (5) — State Machine

15. **implementer**
16. **verifier**
17. **reviewer**
18. **closer**
19. **retro**

### Total: 19 agents (14 active + 5 harness)

### Archived: 13 agents

---

## Renaming Summary

| Current Name | New Name | Action |
|-------------|----------|--------|
| product-manager.md | product-manager.md | Rename |
| release-manager.md | release-manager.md | Rename |
| architect.md | architect.md | Rename |
| design-reviewer.md | design-reviewer.md | Rename |
| governance-auditor.md | governance-auditor.md | Rename |
| test-engineer.md | test-engineer.md | Rename |
| ai-product-manager.md | ai-product-manager.md | Rename |
| product-manager.md | (ARCHIVE) | Archive (duplicate) |
| design-quality-reviewer.md | (ARCHIVE) | Archive (merged) |
| implementation-critic.md | (ARCHIVE) | Archive (merged) |
| visual-regression-reviewer.md | (ARCHIVE) | Archive (duplicate) |
| visual-systems-designer.md | (ARCHIVE) | Archive (merged) |
| documentation-engineer.md | (ARCHIVE) | Archive (to skill) |
| portfolio-documentation-engineer.md | (ARCHIVE) | Archive (to skill) |
| prompt-optimizer.md | (ARCHIVE) | Archive (to skill) |
| diagram-engineer.md | (ARCHIVE) | Archive (to skill) |
| worktree-orchestrator.md | (ARCHIVE) | Archive (to script) |
| qa-release-engineer.md | (ARCHIVE) | Archive (merged) |
| context-architect.md | (ARCHIVE) | Archive (deleted) |
| process-storyteller.md | (ARCHIVE) | Archive (deleted) |

---

## Next Steps

1. **Archive obsolete agents** — Move 18 agents to _archive/
2. **Rename active agents** — Rename 7 agent files
3. **Update agent content** — Remove title grades from agent descriptions
4. **Update all references** — Search/replace across codebase
5. **Update CLAUDE.md** — Strengthen naming policy
6. **Run checks** — Verify type-check and build still work

---

**Last Updated:** 2026-06-11
**Audit Version:** 1.0
**Auditor:** Agent System Cleanup
