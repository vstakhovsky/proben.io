# Repository Documentation

This folder contains repository organization and navigation documentation for Proben.io.

## Documents

### [REPOSITORY_AUDIT.md](REPOSITORY_AUDIT.md)
**Purpose:** Comprehensive audit of repository structure, file classification, and cleanup recommendations.

**Created:** 2026-06-11

**Sections:**
- Current repository structure
- File classification (keep/move/archive)
- Generated files to gitignore
- Archive folder structure
- Safety checks

### [REPOSITORY_MAP.md](REPOSITORY_MAP.md)
**Purpose:** Navigation guide explaining where to find things in the repository.

**Created:** 2026-06-11

**Sections:**
- Where product code lives
- Where references live  
- Where docs live
- Where generated files go
- What should not be committed
- How to run checks
- Quick start for new contributors

### [REPOSITORY_STYLE_GUIDE.md](REPOSITORY_STYLE_GUIDE.md)
**Purpose:** Style guidelines for organizing and presenting files in the repository.

**Created:** 2026-06-11

**Sections:**
- Folder naming conventions
- Document naming conventions
- Markdown formatting
- Badge usage
- Table style
- Decision log style
- Agent documentation style
- Skill documentation style
- ADR style
- Eval case style
- Adding new agents
- Adding new skills
- Archiving obsolete files

## Quick Reference

**Product Code:**
- [`app/`](../../app/) — Routes
- [`components/`](../../components/) — Components  
- [`lib/`](../../lib/) — Utilities
- [`data/`](../../data/) — Data

**References:**
- [`reference/prototypes/proben-mvp-6/`](../../reference/prototypes/proben-mvp-6/) — Prototype
- [`reference/screenshots/proben-mvp-6/`](../../reference/screenshots/proben-mvp-6/) — Screenshots

**Documentation:**
- [`docs/`](../../docs/) — All docs
- [`README.md`](../../README.md) — Project README
- [`CONTRIBUTING.md`](../../CONTRIBUTING.md) — Contribution guide

**Agent System:**
- [`.claude/agents/`](../../.claude/agents/) — Agents
- [`.claude/skills/`](../../.claude/skills/) — Skills

## Archive Structure

Archived files are organized in:

- [`docs/archive/visual-evidence/`](../archive/visual-evidence/) — Visual evidence from UI work
- [`docs/archive/harness-reports/`](../archive/harness-reports/) — Harness reports
- [`docs/archive/obsolete-docs/`](../archive/obsolete-docs/) — Obsolete documentation

---

**Last Updated:** 2026-06-11
