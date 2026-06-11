# Worktree Isolation Policy

## Purpose

This policy defines when and how work must be isolated into git worktrees to prevent conflicts, maintain main branch stability, and enable safe parallel agent work.

## Core Principles

1. **Main branch protection** — No direct work on main without explicit approval
2. **Isolation by default** — Significant work happens in isolated contexts
3. **Parallel separation** — Parallel agents must not touch same files
4. **Clean merge targets** — Worktrees must merge cleanly
5. **Planned cleanup** — Every worktree has removal strategy

## When to Use Worktrees

### Requires Worktree (Isolated Branch)

Create a worktree for:

- **Feature implementation** — New feature pages or components
- **UI redesigns** — Significant visual changes requiring iteration
- **Architecture changes** — Affects multiple files or core structure
- **Dependency updates** — New packages or version changes
- **Routing changes** — New routes or route modifications
- **Migration work** — Data or code migrations
- **Experimental features** — Features that may be discarded

### Requires Simple Branch (Not Full Worktree)

Create a simple branch for:

- **Single file changes** — Content updates, copy changes
- **Minor styling** — Small visual tweaks
- **Bug fixes** — Clear, scoped fixes
- **Configuration changes** — Settings updates

### Can Work in Main (With Human Approval)

Only for:

- **Typo fixes** — Trivial text corrections
- **Comment-only changes** — Documentation updates only
- **Emergency hotfixes** — With explicit human approval

## Worktree Strategy

### Worktree Naming Convention

```
worktree-[type]-[feature-name]

Types:
- feature: New feature implementation
- refactor: Code restructuring
- redesign: Visual design changes
- experiment: Experimental features
- fix: Bug fixes requiring isolation
```

**Examples:**
- `worktree-feature-readiness-check`
- `worktree-redesign-landing-hero`
- `worktree-experiment-new-layout`
- `worktree-fix-navigation-bug`

### Creating a Worktree

**Command:**
```bash
# From main branch
git worktree add ../proben-[worktree-name] [branch-name]

# Example
git worktree add ../proben-worktree-feature-readiness-check feature/readiness-check
```

**This creates:**
- New branch: `feature/readiness-check`
- New worktree directory: `../proben-worktree-feature-readiness-check/`
- Linked to original repo

### Working in a Worktree

1. **Navigate to worktree:**
   ```bash
   cd ../proben-worktree-feature-readiness-check
   ```

2. **Builder agent works in isolation:**
   - Makes changes in worktree
   - Commits to worktree branch
   - Tests pass in worktree context

3. **Review happens in worktree:**
   - Fresh review agent reviews worktree branch
   - Screenshots captured from worktree
   - Evidence collected from worktree

### Deciding on Worktree

**Decision Tree:**
```
Is work experimental or high-risk?
├─ YES → Create worktree
└─ NO
    └─ Does work affect multiple files?
        ├─ YES → Create worktree
        └─ NO
            └─ Is work trivial (typo, comment)?
                ├─ YES → Work in main with approval
                └─ NO → Create branch
```

## Parallel Agent Guidelines

### Allowed Parallel Work

Parallel agents can work simultaneously when:

1. **Different File Domains**
   - Agent A: `app/page.tsx` (landing page)
   - Agent B: `docs/` (documentation)
   - Agent C: `tests/` (test updates)

2. **Different Routes/Pages**
   - Agent A: `app/about/` (about page)
   - Agent B: `app/contact/` (contact page)
   - Agent C: `app/blog/` (blog page)

3. **Different Worktrees**
   - Agent A: `worktree-feature-landing-redesign`
   - Agent B: `worktree-feature-blog-implementation`
   - Agent C: `worktree-experiment-new-layout`

### Forbidden Parallel Work

**Parallel agents MUST NOT work simultaneously on:**

1. **Same Files**
   - Agent A: `app/page.tsx`
   - Agent B: `app/page.tsx` ← CONFLICT!

2. **Same Routes**
   - Agent A: Hero section of landing page
   - Agent B: Navigation of landing page ← CONFLICT!

3. **Shared Components**
   - Agent A: Modifying `components/Button.tsx`
   - Agent B: Using `components/Button.tsx` ← RISK!

4. **Same Dependencies**
   - Agent A: Adding `package-x`
   - Agent B: Modifying `package-x` ← CONFLICT!

### Conflict Prevention

**Before starting parallel work:**

1. **List all files each agent will touch**
2. **Check for file overlaps**
3. **Check for route overlaps**
4. **Check for component dependencies**
5. **Assign to different worktrees if any overlap**

**If overlap detected:**
- Run work sequentially, OR
- Split work to avoid overlap, OR
- Use different worktrees with clear merge strategy

## Worktree Lifecycle

### 1. Create

**Input:** Task description, scope, complexity

**Process:**
- Assess if worktree is needed
- Determine worktree name
- Create worktree with git command
- Navigate to worktree directory

**Output:** New worktree ready for work

### 2. Work

**Input:** Approved visual plan or task

**Process:**
- Builder agent works in worktree
- Commits changes to worktree branch
- Runs tests in worktree context
- Ensures tests pass

**Output:** Implementation in worktree

### 3. Review

**Input:** Worktree branch

**Process:**
- Fresh review agent reviews worktree
- Screenshots captured from worktree
- Evidence collected from worktree
- Risk score assigned

**Output:** Review verdict with evidence

### 4. Decision

**Input:** Review verdict

**Process:**
- If ACCEPTED: Merge to main
- If REJECTED: Discard worktree
- If NEEDS_REWORK: Continue in worktree

**Output:** Merge or discard decision

### 5. Cleanup

**Input:** Merge complete or work discarded

**Process:**
- Navigate back to main repo
- Remove worktree with git command
- Delete branch if needed

**Command:**
```bash
# Remove worktree
git worktree remove ../proben-worktree-feature-name

# Delete branch (if not merged)
git branch -D feature-name
```

**Output:** Worktree removed, branches cleaned

## Exploratory Tasks

### Research in Isolation

Exploratory/research tasks should:
- Run in isolated worktrees
- Summarize findings
- Report recommendations
- NOT directly modify production code

### Exploratory Output

```markdown
# Exploratory Task Report: [Task Name]

## Task
[Original research question]

## Worktree
**Worktree:** [name]
**Branch:** [name]
**Files explored:** [list]

## Findings
1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

## Recommendations
1. [Recommendation 1]
2. [Recommendation 2]

## Proposed Changes
- [ ] [Change 1 with rationale]
- [ ] [Change 2 with rationale]

## Risk Assessment
- **Risk Level:** LOW/MEDIUM/HIGH
- **Risk Details:** [description]

## Next Steps
- [ ] [Step 1]
- [ ] [Step 2]

---

**Exploratory Agent:** [agent name]
**Worktree:** [worktree name]
**Report Date:** [timestamp]
```

## Quality Checklist

Worktree strategy is complete when:
- [ ] Work necessity assessed
- [ ] Worktree name follows convention
- [ ] Conflicts prevented
- [ ] Lifecycle defined
- [ ] Cleanup plan in place
- [ ] Parallel work safety verified

## Risk Management

### Worktree Risks

1. **Merge Conflicts**
   - **Mitigation:** Regular syncs with main, clean commit history

2. **Divergence**
   - **Mitigation:** Time limits on worktrees, regular reviews

3. **Forgotten Worktrees**
   - **Mitigation:** Cleanup plans, worktree listing

4. **Disk Space**
   - **Mitigation:** Regular cleanup, prune old worktrees

### Commands

```bash
# List worktrees
git worktree list

# Prune worktrees
git worktree prune

# Remove worktree
git worktree remove [path]
```

## Related Documentation

- **Worktree Orchestrator Agent:** `.claude/agents/worktree-orchestrator.md`
- **Worktree Isolation Skill:** `.claude/skills/worktree-isolation/SKILL.md`
- **Visual Agentic Delivery System:** `VISUAL_AGENTIC_DELIVERY_SYSTEM.md`
- **Build Process:** `docs/BUILD_PROCESS.md`

---

**Last Updated:** 2026-06-09
