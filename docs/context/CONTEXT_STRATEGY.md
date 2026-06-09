# Context Strategy - Proben.io AI-Assisted Development

This document defines how to manage context for AI agents working on Proben.io to avoid the "lost in the middle" problem.

## Last Updated: 2026-06-09

## Core Principle

**Task-specific context beats maximal context.**

Based on research showing that models attend strongly to start and end of context while dropping the middle ("U curve" problem), we use focused, task-specific context packs rather than full repository dumps.

---

## Context Pack Types

### 1. Route Fix Context Pack

**When to use**: Fixing route mismatches, adding redirects, updating navigation

**Include**:
- Current route file paths (specific files, not "all routes")
- Canonical route documentation (from docs/RFC-0001-architecture.md)
- Current navigation component
- Current landing page CTAs
- Related tests (e2e/core-flow.spec.ts)
- Acceptance criteria (canonical route must work, compatibility route must work)

**Exclude**:
- Full repository listing
- Unrelated components
- Feature documentation
- Build configuration

**Max length**: ~80 lines

---

### 2. Test Update Context Pack

**When to use**: Adding tests, fixing test selectors, updating test data

**Include**:
- Test file being updated
- Component/page being tested
- Current implementation (specific files only)
- Testing best practices (docs/BUILD_PROCESS.md excerpt)
- Stable test ID list (docs/research/source-cards/)
- Acceptance criteria (tests pass, stable selectors)

**Exclude**:
- All test files in repo
- Unrelated test utilities
- Full component library

**Max length**: ~100 lines

---

### 3. Feature Add Context Pack

**When to use**: Adding a new feature within current phase scope

**Include**:
- Feature specification (specific ADR or BDD)
- Related existing components
- Routing structure (if affects routes)
- Testing patterns (similar features)
- Phase constraints (from CLAUDE.md)
- Acceptance criteria (from spec)
- Dependencies list (explicit files)

**Exclude**:
- Full codebase
- Features from other phases
- Unrelated components
- Generic documentation

**Max length**: ~150 lines

---

### 4. Documentation Context Pack

**When to use**: Updating docs, adding ADRs, creating source cards

**Include**:
- Current documentation file
- Related decisions (if ADR)
- Source material (if source card)
- Documentation standards (from CLAUDE.md)
- Links/references only (not full content)

**Exclude**:
- Full documentation directory
- Unrelated docs
- Implementation code (unless specifically documenting it)

**Max length**: ~120 lines

---

### 5. Build/Deploy Context Pack

**When to use**: Fixing build issues, deployment configuration

**Include**:
- Build error messages
- Next.js config (next.config.js)
- Package.json (scripts and dependencies only)
- Vercel config (if applicable)
- Related build documentation

**Exclude**:
- Full source code
- Test files
- Documentation

**Max length**: ~60 lines

---

## Context Validation Checklist

Before providing context to an agent, verify:

- [ ] Context is specific to task type (use appropriate pack)
- [ ] Only relevant files included (not "read all")
- [ ] Requirements are bulleted and explicit
- [ ] Acceptance criteria are testable
- [ ] Constraints are clear (what NOT to do)
- [ ] Related decisions are linked (ADRs, source cards)
- [ ] Context length is under recommended max
- [ ] No redundant information
- [ ] No adjacent/parallel features mentioned
- [ ] Tests are referenced by path, not included in full

---

## What to Exclude

Always exclude from agent context:

1. **Full repository listings** ("read the whole repo")
2. **Adjacent features** (features not part of current task)
3. **Future phase features** (stay in current phase)
4. **Generic documentation** (only include specific, relevant sections)
5. **Long prose specifications** (use bullet points instead)
6. **Unrelated test files** (only tests for what's changing)
7. **Build output/logs** (only error messages)
8. **Git history** (unless specific commit is relevant)

---

## Agent Workflow with Context

1. **Request Intake**: Agent receives task + context pack
2. **Planning**: Agent produces plan (no code yet)
3. **Critic Review**: Implementation critic reviews plan against spec
4. **Approval**: Human approves plan (or critic rejects)
5. **Implementation**: Agent implements with same context pack
6. **Validation**: QA verifies implementation matched spec
7. **Documentation**: Update relevant docs if needed

This workflow ensures context stays focused and "lost in the middle" is caught before code is written.

---

## Template Usage

See [TASK_CONTEXT_TEMPLATE.md](TASK_CONTEXT_TEMPLATE.md) for the actual template to use when creating context packs for tasks.

---

## Metrics

Track to evaluate context strategy effectiveness:

- % of tasks using context packs (target: 100%)
- Average context pack length (target: <100 lines)
- % of plans rejected by critic (target: 10-20%—catches issues)
- % of implementations failing QA (target: <5%)
- Agent correction cycles before approval (target: <2)
