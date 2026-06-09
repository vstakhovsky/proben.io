# Context Packs - Proben.io

This document defines context pack templates for different task types in Proben.io development.

## Last Updated: 2026-06-09

## Available Context Packs

### 1. Route Fix Pack

**File**: `context-packs/route-fix.md`

**Purpose**: Fix route mismatches, update navigation, add redirects

**Usage**:
```bash
When task involves: routes, navigation, redirects, canonical URLs
Use: context-packs/route-fix.md
```

**Contents**:
- Relevant route files (specific paths)
- Canonical route documentation excerpt
- Current navigation component
- Test file path reference
- Acceptance criteria

---

### 2. Test Update Pack

**File**: `context-packs/test-update.md`

**Purpose**: Update tests, fix selectors, add test coverage

**Usage**:
```bash
When task involves: tests, selectors, test coverage
Use: context-packs/test-update.md
```

**Contents**:
- Test file being updated
- Component/page being tested
- Stable test ID guidelines
- Testing best practices excerpt
- Acceptance criteria

---

### 3. Feature Add Pack

**File**: `context-packs/feature-add.md`

**Purpose**: Add new feature within current phase scope

**Usage**:
```bash
When task involves: new feature, component, page
Use: context-packs/feature-add.md
```

**Contents**:
- Feature specification (ADR/BDD reference)
- Related existing components
- Routing structure reference
- Phase constraints
- Dependencies list
- Acceptance criteria

---

### 4. Documentation Pack

**File**: `context-packs/documentation.md`

**Purpose**: Update documentation, create ADRs, source cards

**Usage**:
```bash
When task involves: docs, ADRs, source cards, research
Use: context-packs/documentation.md
```

**Contents**:
- Current documentation file
- Related decisions (if ADR)
- Source material reference (if source card)
- Documentation standards
- Links/references

---

### 5. Build/Deploy Pack

**File**: `context-packs/build-deploy.md`

**Purpose**: Fix build issues, deployment configuration

**Usage**:
```bash
When task involves: build, deploy, Vercel, Next.js config
Use: context-packs/build-deploy.md
```

**Contents**:
- Build error messages
- Next.js config
- Package.json (scripts/deps only)
- Vercel config (if applicable)
- Build documentation reference

---

## How to Use Context Packs

1. **Identify task type** from the five categories above
2. **Copy the appropriate template** from `context-packs/`
3. **Fill in task-specific details**:
   - File paths (specific, not "all")
   - Requirements (bulleted, explicit)
   - Acceptance criteria (testable)
   - Constraints (what NOT to do)
4. **Provide to agent** with task description
5. **Validate** agent's plan against context before approving implementation

---

## Creating New Context Packs

To create a new context pack type:

1. Create file in `context-packs/[type].md`
2. Use [TASK_CONTEXT_TEMPLATE.md](TASK_CONTEXT_TEMPLATE.md) as base
3. Define when to use (task patterns)
4. List standard contents for this type
5. Specify max length target
6. Add to this index

---

## Context Pack Library

*(Planned for future - will contain pre-filled context packs for common Proben.io tasks)*

---

## See Also

- [CONTEXT_STRATEGY.md](CONTEXT_STRATEGY.md) - Overall context strategy
- [TASK_CONTEXT_TEMPLATE.md](TASK_CONTEXT_TEMPLATE.md) - Template for creating custom context
