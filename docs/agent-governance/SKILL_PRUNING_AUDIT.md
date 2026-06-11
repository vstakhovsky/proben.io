# Skill Pruning Audit

## Purpose

Audit all current skills and agent instructions to identify what to KEEP, REWRITE AS GOTCHA, MERGE, DISABLE, or DELETE. Reduce skill bloat and keep only high-signal content.

## Audit Criteria

Each skill/instruction is evaluated against:

1. **Failure Prevention** — Does it prevent a known failure?
2. **Evidence Creation** — Does it create verifiable evidence?
3. **False PASS Reduction** — Does it reduce false PASS risk?
4. **Review Efficiency** — Does it shorten review time?
5. **Eval Improvement** — Does it improve eval results?
6. **Noise Reduction** — Does it add noise or confusion?

**Decision Matrix:**

| Criteria | Keep | Rewrite | Merge | Disable | Delete |
|---------|------|--------|-------|---------|--------|
| Prevents failures | ✓ | ✗ | ✗ | ✗ | ✗ |
| Creates evidence | ✓ | ✗ | ✓ | ✗ | ✗ |
| Reduces false PASS | ✓ | Maybe | ✓ | ✗ | ✗ |
| Shortens review | ✓ | Maybe | ✓ | ✗ | ✗ |
| Improves evals | ✓ | Maybe | ✓ | ✗ | ✗ |
| Adds noise | ✗ | ✗ | ✗ | ✓ | ✓ |
| Long without value | ✗ | ✓ | ✗ | ✗ | ✓ |

**Decision Rules:**
- **KEEP** — Meets 3+ criteria, high value
- **REWRITE AS GOTCHA** — Useful but too long, condense to gotcha
- **MERGE** — Overlaps with other skill/instruction, combine
- **DISABLE** — Not currently useful, keep for potential future use
- **DELETE** — Creates noise without value, remove

## Current Skills Audit

### Existing Skills

#### 1. context-pack-builder

**Location:** `.claude/skills/context-pack-builder/`

**Purpose:** Build context packs for AI assistants

**Evaluation:**
- Failure Prevention: LOW — Nice to have but not critical
- Evidence Creation: NO — Creates context, not evidence
- False PASS Reduction: LOW — Indirect impact
- Review Efficiency: LOW — Adds setup time
- Eval Improvement: LOW — Indirect impact
- Noise Reduction: HIGH — Adds complexity

**Decision:** DISABLE

**Reason:** Not critical for Phase 1, adds complexity without clear quality benefit

**Action:** Disable until context pack system is needed

---

#### 2. design-taste-review

**Location:** `.claude/skills/design-taste-review/`

**Purpose:** Design taste review and evaluation

**Evaluation:**
- Failure Prevention: MEDIUM — Can catch design issues
- Evidence Creation: NO — Creates subjective review
- False PASS Reduction: LOW — Subjective
- Review Efficiency: LOW — Adds review step
- Eval Improvement: LOW — Subjective
- Noise Reduction: LOW — Adds more review

**Decision:** REWRITE AS GOTCHA

**Reason:** Too subjective, long, doesn't create verifiable evidence. Condense key points to gotchas.

**Action:** Extract key design principles to gotchas, remove skill

---

#### 3. fresh-agent-review

**Location:** `.claude/skills/fresh-agent-review/`

**Purpose:** Independent review of implementation work

**Evaluation:**
- Failure Prevention: HIGH — Prevents self-approval
- Evidence Creation: YES — Creates review reports
- False PASS Reduction: HIGH — Independent verification
- Review Efficiency: MEDIUM — Adds review step but prevents false PASS
- Eval Improvement: HIGH — Systematic review
- Noise Reduction: LOW — Adds complexity

**Decision:** KEEP

**Reason:** Critical for preventing self-approval, creates evidence, reduces false PASS

**Action:** Keep as-is, core quality mechanism

---

#### 4. mermaid-diagram-generator

**Location:** `.claude/skills/mermaid-diagram-generator/`

**Purpose:** Generate Mermaid diagrams

**Evaluation:**
- Failure Prevention: NONE — Diagram generation
- Evidence Creation: YES — Creates diagrams
- False PASS Reduction: NONE — Visual output
- Review Efficiency: HIGH — Quick visualization
- Eval Improvement: NONE — Visual aid
- Noise Reduction: HIGH — Simple, focused

**Decision:** KEEP

**Reason:** Simple, focused, creates visual evidence, doesn't create noise

**Action:** Keep as-is

---

#### 5. portfolio-process-page

**Location:** `.claude/skills/portfolio-process-page/`

**Purpose:** Generate portfolio process pages

**Evaluation:**
- Failure Prevention: NONE — Portfolio generation
- Evidence Creation: YES — Creates pages
- False PASS Reduction: NONE — Content generation
- Review Efficiency: MEDIUM — Adds documentation
- Eval Improvement: NONE — Documentation
- Noise Reduction: LOW — Adds portfolio content

**Decision:** KEEP

**Reason:** Downgraded from agent, simple purpose, creates public portfolio

**Action:** Keep as-is

---

#### 6. prompt-optimization

**Location:** `.claude/skills/prompt-optimization/`

**Purpose:** Optimize prompts for better results

**Evaluation:**
- Failure Prevention: MEDIUM — Can prevent prompt-related failures
- Evidence Creation: NO — Creates optimized prompts
- False PASS Reduction: LOW — Indirect impact
- Review Efficiency: LOW — Adds optimization step
- Eval Improvement: LOW — Indirect impact
- Noise Reduction: MEDIUM — May create prompt complexity

**Decision:** REWRITE AS GOTCHA/SKILL

**Reason:** Too generic, should be triggered by eval cases only

**Action:** Downgrade to failure-to-prompt-update skill, trigger on eval cases only

---

#### 7. release-check

**Location:** `.claude/skills/release-check/`

**Purpose:** Pre-release validation checklist

**Evaluation:**
- Failure Prevention: HIGH — Prevents release failures
- Evidence Creation: YES — Creates checklist
- False PASS Reduction: HIGH — Systematic verification
- Review Efficiency: MEDIUM — Adds check step
- Eval Improvement: HIGH — Systematic release verification
- Noise Reduction: LOW — Adds checklist

**Decision:** KEEP

**Reason:** Critical for preventing release failures, systematic verification

**Action:** Keep as-is, integrate with CTO bar raiser workflow

---

#### 8. request-intake

**Location:** `.claude/skills/request-intake/`

**Purpose:** Structured intake of new requirements

**Evaluation:**
- Failure Prevention: LOW — Intake process
- Evidence Creation: NO — Creates requirements
- False PASS Reduction: LOW — Clarifies requests
- Review Efficiency: HIGH — Prevents ambiguity
- Eval Improvement: LOW — Better requirements
- Noise Reduction: HIGH — Structured input

**Decision:** KEEP

**Reason:** Prevents ambiguous requirements, improves clarity

**Action:** Keep as-is

---

#### 9. research-digest

**Location:** `.claude/skills/research-digest/`

**Purpose:** Summarize research findings

**Evaluation:**
- Failure Prevention: LOW — Research synthesis
- Evidence Creation: YES — Creates summaries
- False PASS Reduction: NONE — Research output
- Review Efficiency: HIGH — Condenses research
- Eval Improvement: LOW — Research summary
- Noise Reduction: HIGH — Reduces research noise

**Decision:** KEEP (CONDITIONAL)

**Reason:** Useful for research phases, but not needed for current development

**Action:** Keep for research/validation phases only

---

#### 10. risk-scored-review

**Location:** `.claude/skills/risk-scored-review/`

**Purpose:** Risk assessment for decisions

**Evaluation:**
- Failure Prevention: HIGH — Identifies risks
- Evidence Creation: YES — Creates risk scores
- False PASS Reduction: HIGH — Risk-based evaluation
- Review Efficiency: MEDIUM — Adds risk assessment
- Eval Improvement: HIGH — Systematic risk identification
- Noise Reduction: LOW — Adds complexity

**Decision:** KEEP

**Reason:** Critical for release decisions, systematic risk assessment

**Action:** Keep as-is, integrate with principal reviewers

---

#### 11. security-review

**Location:** `.claude/skills/security-review/`

**Purpose:** Security analysis of changes

**Evaluation:**
- Failure Prevention: HIGH — Prevents security issues
- Evidence Creation: YES — Creates security findings
- False PASS Reduction: HIGH — Security verification
- Review Efficiency: MEDIUM — Adds security step
- Eval Improvement: HIGH — Systematic security checks
- Noise Reduction: LOW — Adds security complexity

**Decision:** KEEP

**Reason:** Critical for security-sensitive changes

**Action:** Keep as-is, integrate with security-reviewer agent

---

#### 12. source-to-product-application

**Location:** `.claude/skills/source-to-product-application/`

**Purpose:** Convert source to product application

**Evaluation:**
- Failure Prevention: LOW — Niche conversion
- Evidence Creation: NO — Creates application
- False PASS Reduction: NONE — Conversion output
- Review Efficiency: LOW — Niche skill
- Eval Improvement: LOW — Application generation
- Noise Reduction: LOW — Niche skill

**Decision:** DISABLE

**Reason:** Not applicable to Phase 1, niche use

**Action:** Disable until product application phase

---

#### 13. source-to-visual

**Location:** `.claude/skills/source-to-visual/`

**Purpose:** Convert source to visual

**Evaluation:**
- Failure Prevention: LOW — Visual conversion
- Evidence Creation: NO — Creates visual
- False PASS Reduction: NONE — Visual output
- Review Efficiency: LOW — Niche skill
- Eval Improvement: LOW — Visual generation
- Noise Reduction: LOW — Niche skill

**Decision:** MERGE

**Reason:** Overlaps with visual-plan-architect, niche use

**Action:** Merge into visual-plan-architect skill if needed

---

#### 14. ui-structure-review

**Location:** `.claude/skills/ui-structure-review/`

**Purpose:** Review UI structure

**Evaluation:**
- Failure Prevention: MEDIUM — Can catch structure issues
- Evidence Creation: NO — Creates structure review
- False PASS Reduction: LOW — Structure review
- Review Efficiency: LOW — Adds review step
- Eval Improvement: LOW — Structure assessment
- Noise Reduction: LOW — Adds review complexity

**Decision:** REWRITE AS GOTCHA

**Reason:** Too vague, long, doesn't create verifiable evidence. Condense to specific structure gotchas.

**Action:** Extract UI structure gotchas, remove skill

---

#### 15. visual-plan-builder

**Location:** `.claude/skills/visual-plan-builder/`

**Purpose:** Create visual implementation plans

**Evaluation:**
- Failure Prevention: HIGH — Prevents blind implementation
- Evidence Creation: YES — Creates visual plans
- False PASS Reduction: HIGH — Plan-before-code prevents false starts
- Review Efficiency: HIGH — Planning reduces rework
- Eval Improvement: HIGH — Systematic planning
- Noise Reduction: HIGH — Focused planning

**Decision:** KEEP

**Reason:** Critical for visual work, prevents false starts, creates evidence

**Action:** Keep as-is, integrate with visual-plan-architect

---

#### 16. worktree-isolation

**Location:** `.claude/skills/worktree-isolation/`

**Purpose:** Worktree isolation policy

**Evaluation:**
- Failure Prevention: MEDIUM — Prevents conflicts
- Evidence Creation: NO — Policy documentation
- False PASS Reduction: NONE — Process tool
- Review Efficiency: MEDIUM — Adds process step
- Eval Improvement: LOW — Process documentation
- Noise Reduction: MEDIUM — Process clarity

**Decision:** DOWNGRADE TO POLICY/SCRIPT

**Reason:** Process automation, not a skill. Better as script/hook.

**Action:** Convert to worktree-management script and hook

---

## Skill Decisions Summary

### KEEP (9)

1. **fresh-agent-review** — Critical for self-approval prevention
2. **mermaid-diagram-generator** — Simple, focused
3. **portfolio-process-page** — Portfolio documentation
4. **release-check** — Release verification
5. **request-intake** — Requirement clarity
6. **research-digest** — Research phases only
7. **risk-scored-review** — Risk assessment
8. **security-review** — Security verification
9. **visual-plan-builder** — Planning prevents false starts

### REWRITE AS GOTCHA (3)

1. **design-taste-review** → Extract design principles to gotchas
2. **prompt-optimization** → Convert to failure-to-prompt-update
3. **ui-structure-review** → Extract UI structure gotchas

### MERGE (1)

1. **source-to-visual** → Merge into visual-plan-architect

### DISABLE (2)

1. **context-pack-builder** — Not Phase 1 applicable
2. **source-to-product-application** — Not Phase 1 applicable

### DOWNGRADE TO POLICY/SCRIPT (1)

1. **worktree-isolation** → Convert to script/hook

## Action Items

### Immediate Actions

1. **Create failure-to-prompt-update skill**
   - Trigger on eval cases only
   - Focus on failure prevention
   - Remove generic prompt optimization

2. **Update PROBEN_AGENT_GOTCHAS.md**
   - Add design taste gotchas
   - Add UI structure gotchas
   - Add prompt optimization gotchas

3. **Create worktree-management script**
   - Automate worktree creation
   - Add hook for automatic setup
   - Document in BUILD_PROCESS.md

4. **Delete/disabled skills**
   - Disable context-pack-builder
   - Disable source-to-product-application
   - Delete merged skills

### Documentation Updates

1. **Update .claude/skills/** — Remove pruned/merged skills
2. **Update docs/gotchas/** — Add new gotchas
3. **Update CLAUDE.md** — Add gotchas reference
4. **Update BUILD_PROCESS.md** — Add worktree script usage

## Skill Pruning Impact

### Before Pruning
- 16 skills
- Mixed quality and value
- Some long skills without clear value
- Generic skills without specific purpose

### After Pruning
- 9 skills kept
- 3 rewritten as gotchas
- 2 disabled (Phase 2+)
- Simpler, more focused
- Higher signal-to-noise ratio

## Related Documentation

- **[../gotchas/PROBEN_AGENT_GOTCHAS.md](../gotchas/PROBEN_AGENT_GOTCHAS.md)** — Gotchas
- **[../agent-governance/AGENT_SYSTEM_AUDIT.md](../agent-governance/AGENT_SYSTEM_AUDIT.md)** — Agent audit
- **[../agent-governance/AGENT_RETIREMENT_DECISIONS.md](../agent-governance/AGENT_RETIREMENT_DECISIONS.md)** — Agent retirement
- **[../product-build-history/BUILD_LEARNING_DECISION_LOG.md](../product-build-history/BUILD_LEARNING_DECISION_LOG.md)** — Learning log

---

**Last Updated:** 2026-06-10
**Version:** 1.0
**Total Skills Before:** 16
**Total Skills After:** 9 (kept) + 3 (gotchas) + 2 (disabled)
**Reduction:** 31%
