# Worktree Isolation Skill

## Purpose

Define when and how work must be isolated into dedicated git worktrees to prevent conflicts and maintain main branch stability.

## When to Use

Trigger this skill when:
- Starting implementation work
- Planning parallel agent work
- Running exploratory or experimental tasks
- Making significant changes that could break main

## What This Skill Does

1. **Assesses work complexity** — Determines if isolation is needed
2. **Recommends worktree strategy** — Worktree vs branch vs main
3. **Prevents conflicts** — Ensures parallel agents don't edit same files
4. **Maintains main stability** — Protects main from unstable work
5. **Plans cleanup** — Defines when/how to remove worktrees

## Input Requirements

Provide:
- **Task description** — What work is being done
- **Files affected** — Which files will be changed
- **Complexity level** — LOW/MEDIUM/HIGH
- **Parallel work** — Are other agents working simultaneously?

## Process

1. **Assess work type**
   - Feature implementation → worktree
   - Bug fix → branch or main (depending on complexity)
   - Experimental work → worktree
   - Trivial change → main (with approval)

2. **Check for conflicts**
   - Are other agents working?
   - Do they touch same files?
   - Can work be parallelized safely?

3. **Recommend strategy**
   - Create worktree: For significant or experimental work
   - Create branch: For moderate changes
   - Work in main: Only for trivial changes with approval

4. **Define lifecycle**
   - Creation command
   - Work process
   - Merge or discard decision
   - Cleanup command

## Output Format

```markdown
# Worktree Strategy: [Task Name]

## Task Analysis
**Type:** [feature/fix/experiment/refactor]
**Files:** [affected files]
**Complexity:** LOW/MEDIUM/HIGH
**Risk:** LOW/MEDIUM/HIGH

## Recommendation

### Worktree Strategy
**Create Worktree:** YES / NO

**If YES:**
- **Worktree name:** `worktree-[type]-[name]`
- **Branch name:** `[feature/name]`
- **Base:** `main`
- **Command:**
  ```bash
  git worktree add ../proben-[worktree-name] [branch-name]
  ```

**If NO:**
- **Work in:** `main` with approval OR simple branch
- **Reason:** [why worktree not needed]

## Parallel Work Analysis

### Safe to Run in Parallel
- [Task 1]: [agent, scope]
- [Task 2]: [agent, scope]

### Must Run Sequentially
- [Task 1]: [agent, scope]
- [Task 2]: [agent, scope]

**Reason:** [conflict risk]

## Lifecycle
1. **Create:** [command]
2. **Work:** [agent works in isolation]
3. **Review:** [fresh review in worktree]
4. **Decision:** MERGE / DISCARD
5. **Cleanup:** [command]

## Merge Strategy
- **Method:** merge / rebase / squash
- **Requirements:** [tests, reviews, approvals]

---

**Orchestrator:** Worktree Orchestrator
**Strategy Date:** [timestamp]
```

## Decision Tree

```
Is work experimental or high-risk?
├─ YES → Create worktree
└─ NO
    └─ Does work affect multiple files?
        ├─ YES → Create worktree or branch
        └─ NO
            └─ Is work trivial (typo, comment)?
                ├─ YES → Work in main with approval
                └─ NO → Create branch
```

## Worktree Naming Convention

```
worktree-[type]-[feature-name]

Types:
- feature: New feature implementation
- refactor: Code restructuring
- redesign: Visual design changes
- experiment: Experimental features
- fix: Bug fixes requiring isolation
```

## Parallel Work Rules

### ALLOWED Parallel
- Different file domains (app/, docs/, tests/)
- Different routes/pages
- Different worktrees

### FORBIDDEN Parallel
- Same files
- Same routes
- Shared components
- Same dependencies

## Quality Checklist

The worktree strategy is complete when:
- [ ] Work complexity assessed
- [ ] Strategy recommendation clear
- [ ] Conflicts identified and prevented
- [ ] Lifecycle defined (create, work, merge, cleanup)
- [ ] Parallel work safety verified

## Success Criteria

A successful worktree strategy:
- Matches isolation level to risk level
- Prevents file conflicts
- Maintains main branch stability
- Plans cleanup from the start
- Allows safe parallel work when possible

## Notes

- Worktrees isolate unstable work from main
- Not every change needs a worktree
- Parallel agents must not conflict
- Every worktree needs a cleanup plan
- Main branch protection is priority

## Related Documentation

- **Worktree Orchestrator Agent:** `.claude/agents/worktree-orchestrator.md`
- **Worktree Isolation Policy:** `docs/agentic-delivery/WORKTREE_ISOLATION_POLICY.md`
- **Build Process:** `docs/BUILD_PROCESS.md`
