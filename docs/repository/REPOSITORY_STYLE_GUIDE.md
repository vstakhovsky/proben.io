# Repository Style Guide

This guide defines how to organize and present files in the Proben.io repository to maintain consistency, clarity, and professional presentation.

## Folder Naming

### Use Lowercase, Hyphen-Separated Names

**✅ Good:**
```
app/
components/
docs/
agent-governance/
product-build-history/
agentic-delivery/
visual-evidence/
```

**❌ Avoid:**
```
Components/                    # Capital letters
Docs/                         # Capital letters
agentGovernance/             # CamelCase
product_build_history/       # Underscores
Agent_Governance/            # Capitals and underscores
```

### Special Folders

**Standard folders:**
- `app/` — Next.js App Router pages
- `components/` — React components
- `lib/` — Utilities and shared logic
- `data/` — Data files
- `docs/` — Documentation
- `scripts/` — Automation scripts
- `e2e/` — E2E tests
- `tests/` — Unit tests
- `public/` — Static assets

**Agent system folders:**
- `.claude/` — Claude Code configuration (hidden)
- `.claude/agents/` — Agent definitions
- `.claude/agents/_archive/` — Archived agents
- `.claude/skills/` — Skills
- `.claude/hooks/` — Hooks

**Archive folders:**
- `docs/archive/` — Archived documentation
- `docs/archive/visual-evidence/` — Archived visual evidence
- `docs/archive/harness-reports/` — Archived harness reports
- `docs/archive/obsolete-docs/` — Obsolete docs

**Reference folders:**
- `reference/prototypes/` — Prototype source files
- `reference/screenshots/` — Target screenshots
- `reference/design/` — Design specifications

## Document Naming

### Use UPPERCASE_SNAKE_CASE for Filenames

**✅ Good:**
```
PRD.md
ROADMAP.md
AGENT_ROSTER.md
PROCESS_DIFF_LOG.md
DESIGN_PARITY_RUBRIC.md
VISUAL_AGENTIC_DELIVERY_SYSTEM.md
```

**❌ Avoid:**
```
prd.md                         # Lowercase
Agent_Roster.md                # Mixed case
agent-roster.md               # Lowercase with hyphens
README.txt                     # Wrong extension
```

### Document Title Format

**Use # Title as first line:**

```markdown
# Agent Roster

## Purpose

Simplified roster of Proben.io agents...
```

**Title case headings:**
- Use Title Case for headings
- Use sentence case for subheadings
- Use UPPERCASE for emphasized terms

## Markdown Formatting

### Headings

**Hierarchy:**
```markdown
# Level 1 — Document title (once per document)
## Level 2 — Main sections
### Level 3 — Subsections
#### Level 4 — Details
```

**✅ Good:**
```markdown
# Agent Roster

## Core Agents

### Product Manager

**Purpose:** Product requirements and quality evaluation

**Authority:** Level 2
```

**❌ Avoid:**
```markdown
# AGENT ROSTER               # All caps (except in code)

## Core Agents

## product manager          # Lowercase heading

### purpose                 # Lowercase subheading
```

### Tables

**Use markdown tables for structured data:**

```markdown
| Agent | Responsibility | Can Approve Own Work? |
| --- | --- | --- |
| Product Manager | Product scope | No |
| Design Reviewer | Visual quality | No |
```

**Table formatting:**
- Use `|` at column boundaries
- Use `---` for header separator
- Use `Left | Center | Right` alignment: `:--- | :---: | ---:`

### Lists

**Bullet lists:**
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

**Numbered lists:**
```markdown
1. First item
2. Second item
3. Third item
```

**Task lists:**
```markdown
- [ ] Task 1
- [x] Task 2 (completed)
- [ ] Task 3
```

### Code Blocks

**Inline code:**
```
Use `backticks` for inline code references.
```

**Code blocks:**
`````
```bash
npm run dev
```
```

**Specify language:**
```javascript
```javascript
function example() {
  return true;
}
```
```

### Links

**Internal links (relative paths):**
```markdown
See [AGENT_ROSTER.md](AGENT_ROSTER.md) for complete agent inventory.
```

**External links (absolute URLs):**
```markdown
Visit [proben.io](https://proben.io) for the live demo.
```

**Anchor links (within page):**
```markdown
## Quickstart

See [Build History](#build-history) below.
```

## Badge Usage

### Badge Sources

**Use badges.io for status badges:**

```markdown
![Live Site](https://img.shields.io/badge/site-live-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
```

### Common Badges

**Status badges:**
- `site-live-(success|building|down)`
- `Status-(MVP|Beta|Stable|Deprecated)`

**Technology badges:**
- `Next.js-(version)` — Next.js version
- `TypeScript-(version)` — TypeScript version
- `Vercel-(deployed|building|error)` — Vercel status

**Process badges:**
- `AI-(native|assisted|hybrid)` — AI development style
- `Quality-(Verified|Gated|Evaluated)` — Quality status

**License badges:**
- `License-(MIT|Apache|Private|Portfolio)` — License type

### Badge Placement

**In README.md:**
- Place badges at top under title
- Group by category (status, tech, process, license)
- Keep total under 8 badges

**In docs:**
- Use sparingly
- Only for status indicators
- Avoid badge clutter

## Table Style

### Standard Table Format

```markdown
| Column 1 | Column 2 | Column 3 |
| --- | --- | --- |
| Data 1 | Data 2 | Data 3 |
| Data 4 | Data 5 | Data 6 |
```

### Alignment

```markdown
| Left | Center | Right |
| :--- | :---: | ---: |
| L | C | R |
```

### Column Headers

**Use Title Case for headers:**
```markdown
| Agent Name | Responsibility | Authority Level |
| --- | --- | --- |
```

**NOT:**
```markdown
| agent name | responsibility | authority level |
```

### Empty Cells

**Use `—` or empty:**
```markdown
| Status | Result |
| --- | --- |
| Pending | — |
| Complete | ✅ |
```

## Decision Log Style

### Entry Format

**Use this format in [`docs/product-build-history/PROCESS_DIFF_LOG.md`](../product-build-history/PROCESS_DIFF_LOG.md):**

```markdown
## YYYY-MM-DD — [Short Title]

### Problem

[Describe the problem or trigger for this decision]

### Decision

[Describe the decision made]

### Alternatives Considered

1. [Alternative 1]
2. [Alternative 2]
3. [Alternative 3]

### Change Applied

- [File 1 changed]
- [File 2 changed]
- [File 3 changed]

### Evidence

* [Evidence 1]
* [Evidence 2]

### Learning

**[Key learning from this decision]

### Status

✅ Accepted / ⏳ In Progress / ❌ Rejected / ↪️ Superseded
```

### Date Format

**Use YYYY-MM-DD:**
```markdown
2026-06-11 — Repository Cleanup
```

**NOT:**
```markdown
June 11, 2026
06/11/2026
11-06-2026
```

## Agent Documentation Style

### Agent File Format

**Use this structure for agent files in [`.claude/agents/`](../.claude/agents/):**

```markdown
# [Agent Name] Agent

## Role Description

[Clear statement of agent's purpose and responsibility]

## Core Responsibility

**[Single sentence core responsibility]**

The [Agent Name] must:
- [Action 1]
- [Action 2]
- [Action 3]

## Authority Level

**Level [X] — [Role]**

**Allowed:**
- ✅ [Permission 1]
- ✅ [Permission 2]

**Prohibited:**
- ❌ [Restriction 1]
- ❌ [Restriction 2]

## When to Invoke

**Required:**
- [Use case 1]
- [Use case 2]

**Optional:**
- [Use case 3]
- [Use case 4]

## Responsibilities

- [Responsibility 1]
- [Responsibility 2]
- [Responsibility 3]

## Evidence Produced

- [Evidence type 1]
- [Evidence type 2]

## Hard Rules

1. [Rule 1]
2. [Rule 2]
3. [Rule 3]

## Configuration

- Model: [Model name]
- Temperature: [Temperature]
- Context Window: [Context description]

## Related Documentation

- **[Doc 1](path)**: [Description]
- **[Doc 2](path)**: [Description]

---

**Last Updated:** YYYY-MM-DD
**Version:** X.X
**Status:** ✅ Active / ⏸️ Disabled / ❌ Deprecated
```

### Agent Naming

**Use clean role names without title grades:**

✅ **Good:**
```
product-manager
design-reviewer
architect
release-manager
frontend-engineer
```

❌ **Avoid:**
```
principal-product-manager      # "principal" is a title grade
senior-frontend-engineer       # "senior" is a title grade
lead-architect                 # "lead" is a title grade
chief-technology-officer      # "chief" is a title grade
head-of-product               # "head" is a title grade
```

## Skill Documentation Style

### Skill File Format

**Use this structure for skills in [`.claude/skills/`](../.claude/skills/):**

```markdown
# [Skill Name]

**Purpose:** [Clear statement of skill's purpose]

## When to Use

[Description of when to invoke this skill]

## What It Does

[Description of what the skill accomplishes]

## Inputs

[Required inputs or parameters]

## Outputs

[Expected outputs or results]

## Configuration

[Any relevant configuration]

## Examples

[Example usage]

## Related Skills

- **[Skill 1](path)**: [Relationship]
- **[Skill 2](path)**: [Relationship]

---

**Last Updated:** YYYY-MM-DD
**Version:** X.X
**Status:** ✅ Active / ⏸️ Disabled / ❌ Deprecated
```

## ADR Style

### Architecture Decision Record Format

**Use this format in [`docs/ADR/`](../ADR):**

```markdown
# ADR-[Number]: [Title]

**Status:** Accepted / Proposed | Deprecated | Superseded | [Other]

**Date:** YYYY-MM-DD

## Context

[What is the issue that we're seeing that is motivating this decision or change?]

## Decision

[What is the change that we're proposing and/or doing?]

## Rationale

[Why are we making this decision? What are the alternatives we considered and why is this the best one?]

## Consequences

- [Positive consequence 1]
- [Positive consequence 2]
- [Negative consequence 1]
- [Negative consequence 2]

## Implementation

[How will we implement this decision?]

## Related Decisions

- [ADR-1](ADR-1): [Related decision]
- [ADR-2](ADR-2): [Related decision]

## References

- [Link 1]
- [Link 2]
```

## Eval Case Style

### Eval Case Format

**Use this format in [`docs/evals/`](../evals/):**

```markdown
# Eval Case: [Title]

**Eval ID:** EV-[TYPE]-[NUMBER]
**Category:** [Visual Quality | Agent Reliability | Product Acceptance | Security/Safety]
**Created:** YYYY-MM-DD
**Status:** Active | Retired | Superseded

## Trigger

[What triggered this eval case?]

## Input Task

[Original task or situation that led to this eval]

## Expected Behavior

[What should happen?]

## Actual Behavior

[What actually happened?]

## Evidence

- [Evidence 1]
- [Evidence 2]

## Verdict

[Final verdict on the case]

## Root Cause

[What caused the failure?]

## Required Gate Update

[What gate/eval/hook/test needs to be added?]

## Related Eval Cases

- [Eval case 1](path)
- [Eval case 2](path)

## References

- [Reference 1]
- [Reference 2]
```

## Formatting Best Practices

### Line Length

**Keep lines under 100 characters when possible:**
- Improves readability
- Better for diff reviews
- Easier to edit

### Blank Lines

**Use one blank line between sections:**
```markdown
## Section 1

Content here.

## Section 2

Content here.
```

**Use two blank lines before major headings:**
```markdown
Content here.


## Major Section

Content here.
```

### Emphasis

**Use bold for emphasis:**
```markdown
This is **important**.
```

**Use italic for terms:**
```markdown
The term *foo* is used for...
```

**Use bold + italic for strong emphasis:**
```markdown
This is ***really*** important.
```

### Code in Headings

**Avoid code in headings when possible:**

✅ **Good:**
```markdown
## Product Manager Agent
```

❌ **Avoid:**
```markdown
## `Product Manager` Agent
```

## Adding New Agents

### 1. Create Agent File

**Create file in [`.claude/agents/`](../.claude/agents/):**
```markdown
.claude/agents/[new-agent].md
```

**Use agent file format (see above)**

### 2. Update AGENT_ROSTER.md

**Add entry to [`docs/agent-governance/AGENT_ROSTER.md`](../AGENT_ROSTER.md):**
- Agent name
- File location
- Purpose
- Authority level
- When to invoke
- Can block release?
- Failure mode prevented

### 3. Update References

**Update all docs that reference agents:**
- [`CLAUDE.md`](../../CLAUDE.md)
- [`CONTRIBUTING.md`](../../CONTRIBUTING.md)
- [`docs/agentic-delivery/`](../agentic-delivery/)
- Other relevant docs

### 4. Create Archive Entry (if replacing agent)

**If replacing an agent, add entry to [`AGENT_RETIREMENT_DECISIONS.md`](../AGENT_RETIREMENT_DECISIONS.md):**
- Retirement date
- Retirement type (MERGE/DOWNGRADE/DISABLE/DELETE)
- Reason
- Value preserved
- Files updated

## Adding New Skills

### 1. Create Skill File

**Create file in [`.claude/skills/`](../.claude/skills/):**
```markdown
.claude/skills/[new-skill]/SKILL.md
```

**Use skill file format (see above)**

### 2. Update SKILL_PRUNING_AUDIT.md

**Add entry to [`docs/agent-governance/SKILL_PRUNING_AUDIT.md`](../SKILL_PRUNING_AUDIT.md):**
- Skill name
- Purpose
- Decision (KEEP/MERGE/ARCHIVE/DELETE)
- Reason
- Action

### 3. Update References

**Update docs that reference skills:**
- [`CLAUDE.md`](../../CLAUDE.md)
- [`CONTRIBUTING.md`](../../CONTRIBUTING.md)
- Other relevant docs

## Archiving Obsolete Files

### 1. Determine Archive Location

**For docs:** `docs/archive/`
**For agents:** `.claude/agents/_archive/`
**For skills:** `.claude/skills/_archive/`
**For evidence:** `docs/archive/visual-evidence/`

### 2. Move File with Context

**Don't just delete — archive with context:**

```markdown
## [Original Title]

**Archived:** YYYY-MM-DD
**Reason:** [Why archived]
**Replaced by:** [New file or approach, if applicable]
**Status:** Superseded | Obsolete | Duplicate | Experimental

---

[Original content preserved below]
```

### 3. Update References

**Remove or update references to archived file:**
- Update [`AGENT_ROSTER.md`](../AGENT_ROSTER.md) if agent archived
- Update [`SKILL_PRUNING_AUDIT.md`](../SKILL_PRUNING_AUDIT.md) if skill archived
- Update other docs that reference archived file

### 4. Update Decision Log

**Add entry to [`docs/product-build-history/PROCESS_DIFF_LOG.md`](../PROCESS_DIFF_LOG.md):**
- What changed
- Why archived
- Evidence preserved

## README Sections

### Standard README Structure

**Include these sections in [`README.md`](../../README.md):**

1. **Title and positioning** — One-liner and badges
2. **Short description** — 2-3 sentences
3. **Live Demo** — Production links
4. **What [Product] Checks** — Feature overview table
5. **Current MVP** — What's live and what's planned
6. **Product Roadmap** — Phased roadmap table
7. **AI-Native Development** — Process explanation
8. **Agent System** — Agent overview table
9. **Quality Gates** — Gate overview table
10. **Repository Structure** — Tree overview
11. **Key Documents** — Curated doc list
12. **Quickstart** — Commands and URLs
13. **Deployment** — Deployment info
14. **Build History** — Milestone timeline
15. **Lessons Learned** — Key takeaways
16. **Contributing** — Link to CONTRIBUTING.md

## Checklist

### Before Creating New Doc

- [ ] Check if similar doc already exists
- [ ] Use UPPERCASE_SNAKE_CASE filename
- [ ] Place in appropriate `docs/` subfolder
- [ ] Use proper markdown formatting
- [ ] Include table of contents if long
- [ ] Add related docs links
- [ ] Update relevant indexes

### Before Creating New Agent

- [ ] Check [`AGENT_ROSTER.md`](../AGENT_ROSTER.md) for duplicates
- [ ] Use clean role name (no title grades)
- [ ] Follow agent file format
- [ ] Update [`AGENT_ROSTER.md`](../AGENT_ROSTER.md)
- [ ] Update [`CLAUDE.md`](../../CLAUDE.md)
- [ ] Archive replaced agent (if applicable)
- [ ] Update [`AGENT_RETIREMENT_DECISIONS.md`](../AGENT_RETIREMENT_DECISIONS.md)

### Before Creating New Skill

- [ ] Check [`SKILL_PRUNING_AUDIT.md`](../SKILL_PRUNING_AUDIT.md) for duplicates
- [ ] Follow skill file format
- [ ] Update [`SKILL_PRUNING_AUDIT.md`](../SKILL_PRUNING_AUDIT.md)
- [ ] Update [`CLAUDE.md`](../../CLAUDE.md)
- [ ] Archive replaced skill (if applicable)

### Before Archiving File

- [ ] Determine correct archive location
- [ ] Add archive context (reason, date, replacement)
- [ ] Update all references to file
- [ ] Update decision log
- [ ] Preserve evidence if needed

---

**Last Updated:** 2026-06-11
**Version:** 1.0
**Maintainer:** Proben.io Team
