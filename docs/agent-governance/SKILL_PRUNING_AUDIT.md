# Skill Pruning Audit

**Audit Date:** 2026-06-11
**Purpose:** Audit all skills and classify as KEEP, MERGE, ARCHIVE, or DELETE
**Total Skills Before:** 17
**Total Skills After:** 9 (target)

---

## Audit Criteria

Each skill is evaluated against:
1. **Failure Prevention** — Does it prevent a known failure?
2. **Evidence Creation** — Does it create verifiable evidence?
3. **False PASS Reduction** — Does it reduce false PASS risk?
4. **Review Efficiency** — Does it shorten review time?
5. **Eval Improvement** — Does it improve eval results?
6. **Noise Reduction** — Does it add noise or confusion?

**Decision Matrix:**

| Criteria | Keep | Merge | Archive | Delete |
|---------|------|-------|---------|--------|
| Prevents failures | ✓ | ✗ | ✗ | ✗ |
| Creates evidence | ✓ | ✓ | ✗ | ✗ |
| Reduces false PASS | ✓ | ✓ | ✗ | ✗ |
| Shortens review | ✓ | ✓ | ✗ | ✗ |
| Improves evals | ✓ | ✓ | ✗ | ✗ |
| Adds noise | ✗ | ✗ | ✓ | ✓ |
| Long without value | ✗ | ✗ | ✗ | ✓ |

---

## Skills Inventory

### 1. context-pack-builder

**Location:** `.claude/skills/context-pack-builder/`

**Purpose:** Build context packs for AI assistants

**Evaluation:**
- Failure Prevention: LOW — Nice to have but not critical
- Evidence Creation: NO — Creates context, not evidence
- False PASS Reduction: LOW — Indirect impact
- Review Efficiency: LOW — Adds setup time
- Eval Improvement: LOW — Indirect impact
- Noise Reduction: HIGH — Adds complexity

**Decision:** ARCHIVE

**Reason:** Not critical for Phase 1, adds complexity without clear quality benefit

**Action:** Archive until context pack system is needed for Phase 2+

---

### 2. design-taste-review

**Location:** `.claude/skills/design-taste-review/`

**Purpose:** Design taste review and evaluation

**Evaluation:**
- Failure Prevention: MEDIUM — Can catch design issues
- Evidence Creation: NO — Creates subjective review
- False PASS Reduction: LOW — Subjective
- Review Efficiency: LOW — Adds review step
- Eval Improvement: LOW — Subjective
- Noise Reduction: LOW — Adds more review

**Decision:** ARCHIVE

**Reason:** Too subjective, long, doesn't create verifiable evidence

**Action:** Archive and extract key design principles to gotchas

---

### 3. fresh-agent-review

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

### 4. mermaid-diagram-generator

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

### 5. portfolio-process-page

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

### 6. prompt-optimization

**Location:** `.claude/skills/prompt-optimization/`

**Purpose:** Optimize prompts for better results

**Evaluation:**
- Failure Prevention: MEDIUM — Can prevent prompt-related failures
- Evidence Creation: NO — Creates optimized prompts
- False PASS Reduction: LOW — Indirect impact
- Review Efficiency: LOW — Adds optimization step
- Eval Improvement: LOW — Indirect impact
- Noise Reduction: MEDIUM — May create prompt complexity

**Decision:** ARCHIVE

**Reason:** Too generic, should be triggered by eval cases only

**Action:** Replace with failure-to-prompt-update (trigger on eval cases only)

---

### 7. release-check

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

**Action:** Keep as-is, integrate with release-manager workflow

---

### 8. request-intake

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

### 9. research-digest

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

### 10. risk-scored-review

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

**Action:** Keep as-is, integrate with reviewers

---

### 11. security-review

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

### 12. source-to-product-application

**Location:** `.claude/skills/source-to-product-application/`

**Purpose:** Convert source to product application

**Evaluation:**
- Failure Prevention: LOW — Niche conversion
- Evidence Creation: NO — Creates application
- False PASS Reduction: NONE — Conversion output
- Review Efficiency: LOW — Niche skill
- Eval Improvement: LOW — Application generation
- Noise Reduction: LOW — Niche skill

**Decision:** ARCHIVE

**Reason:** Not applicable to Phase 1, niche use

**Action:** Archive until product application phase

---

### 13. source-to-visual

**Location:** `.claude/skills/source-to-visual/`

**Purpose:** Convert source to visual

**Evaluation:**
- Failure Prevention: LOW — Visual conversion
- Evidence Creation: NO — Creates visual
- False PASS Reduction: NONE — Visual output
- Review Efficiency: LOW — Niche skill
- Eval Improvement: LOW — Visual generation
- Noise Reduction: LOW — Niche skill

**Decision:** ARCHIVE

**Reason:** Overlaps with visual-plan-architect, niche use

**Action:** Archive - functionality covered by visual-plan-builder skill

---

### 14. ui-structure-review

**Location:** `.claude/skills/ui-structure-review/`

**Purpose:** Review UI structure

**Evaluation:**
- Failure Prevention: MEDIUM — Can catch structure issues
- Evidence Creation: NO — Creates structure review
- False PASS Reduction: LOW — Structure review
- Review Efficiency: LOW — Adds review step
- Eval Improvement: LOW — Structure assessment
- Noise Reduction: LOW — Adds review complexity

**Decision:** ARCHIVE

**Reason:** Too vague, long, doesn't create verifiable evidence

**Action:** Archive and extract UI structure gotchas

---

### 15. visual-plan-builder

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

### 16. worktree-isolation

**Location:** `.claude/skills/worktree-isolation/`

**Purpose:** Worktree isolation policy

**Evaluation:**
- Failure Prevention: MEDIUM — Prevents conflicts
- Evidence Creation: NO — Policy documentation
- False PASS Reduction: NONE — Process tool
- Review Efficiency: MEDIUM — Adds process step
- Eval Improvement: LOW — Process documentation
- Noise Reduction: MEDIUM — Process clarity

**Decision:** ARCHIVE

**Reason:** Process automation, not a skill. Better as script/hook.

**Action:** Convert to worktree-management script and hook

---

### 17. prototype-to-nextjs-porting

**Location:** `.claude/skills/prototype-to-nextjs-porting/`

**Purpose:** Port prototypes from source to Next.js

**Evaluation:**
- Failure Prevention: HIGH — Prevents approximation errors
- Evidence Creation: YES — Creates ported code
- False PASS Reduction: HIGH — Exact porting prevents drift
- Review Efficiency: HIGH — Systematic porting
- Eval Improvement: HIGH — Evidence-based porting
- Noise Reduction: HIGH — Focused porting

**Decision:** KEEP

**Reason:** Critical for Phase 2.2 landing implementation

**Action:** Keep as-is, integrate with prototype-port-engineer

---

## Skills Decisions Summary

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
10. **prototype-to-nextjs-porting** — Exact prototype porting

### ARCHIVE (7)

1. **context-pack-builder** — Not Phase 1 applicable
2. **design-taste-review** — Too subjective, extract gotchas
3. **prompt-optimization** — Too generic, replace with failure-to-prompt-update
4. **source-to-product-application** — Not Phase 1 applicable
5. **source-to-visual** — Covered by visual-plan-builder
6. **ui-structure-review** — Too vague, extract gotchas
7. **worktree-isolation** — Convert to script

### NEW SKILLS TO CREATE

1. **failure-to-prompt-update** — Update prompts based on eval cases
2. **visual-parity-review** — Evidence-based visual quality review
3. **evidence-proof-protocol** — SHA-256 verified evidence
4. **agent-governance-audit** — Audit agent system
5. **product-quality-eval** — Product quality evaluation
6. **repository-cleanup** — Repository cleanup operations

---

## Action Items

### Immediate Actions

1. **Archive obsolete skills**
   - Move 7 skills to `.claude/skills/_archive/`

2. **Create new skills**
   - failure-to-prompt-update
   - visual-parity-review
   - evidence-proof-protocol
   - agent-governance-audit
   - product-quality-eval
   - repository-cleanup

3. **Extract gotchas**
   - Add design taste gotchas to PROBEN_AGENT_GOTCHAS.md
   - Add UI structure gotchas to PROBEN_AGENT_GOTCHAS.md

4. **Create worktree-management script**
   - Automate worktree creation
   - Add hook for automatic setup

### Documentation Updates

1. **Update .claude/skills/** — Remove archived skills
2. **Update docs/gotchas/** — Add new gotchas
3. **Update CLAUDE.md** — Add skills reference
4. **Update BUILD_PROCESS.md** — Add worktree script usage

---

## Skill Pruning Impact

### Before Pruning
- 17 skills
- Mixed quality and value
- Some long skills without clear value
- Generic skills without specific purpose

### After Pruning
- 10 skills kept
- 6 new skills to create
- 7 archived (Phase 2+ or replaced)
- Simpler, more focused
- Higher signal-to-noise ratio

### Reduction
- 41% reduction (17 → 10 kept)
- 6 new skills for specific needs
- Net change: +6% (10 kept + 6 new = 16 vs 17 before)

---

## Related Documentation

- **[../gotchas/PROBEN_AGENT_GOTCHAS.md](../gotchas/PROBEN_AGENT_GOTCHAS.md)** — Gotchas
- **[AGENT_SYSTEM_AUDIT.md](AGENT_SYSTEM_AUDIT.md)** — Agent audit
- **[AGENT_RETIREMENT_DECISIONS.md](AGENT_RETIREMENT_DECISIONS.md)** — Agent retirement
- **[../product-build-history/BUILD_LEARNING_DECISION_LOG.md](../product-build-history/BUILD_LEARNING_DECISION_LOG.md)** — Learning log

---

**Last Updated:** 2026-06-11
**Version:** 2.0
**Total Skills Before:** 17
**Total Skills After:** 16 (10 kept + 6 new)
**Archived:** 7
**Reduction:** 41% (kept), +6 new skills for specific needs
