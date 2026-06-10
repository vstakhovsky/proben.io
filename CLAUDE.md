# Proben.io - AI-Assisted Development Guide

## Project Overview

Proben.io is a readiness assessment and portfolio platform for solo founders. This guide enables AI assistants to effectively contribute to the codebase while maintaining quality, security, and architectural consistency.

**IMPORTANT**: We are building a public demo MVP first. No database, authentication, or real AI integrations in Phase 1.

## Development Philosophy

- **MVP-First**: Start with a working public demo, iterate from there
- **Mock Data**: Use static/mock data instead of databases initially
- **Test-Driven Development**: Write tests before implementation
- **Security-First**: Every change must pass security review
- **Documentation-First**: Document decisions before coding
- **Incremental Delivery**: Small, verifiable changes over large refactorings
- **Memory-Enabled**: Use the memory system for context persistence

## Phase 1 Technology Stack (MVP)

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Data**: Static/mock data (TypeScript constants)
- **AI Features**: Deterministic mock scoring algorithms
- **Testing**: Vitest + Playwright
- **Deployment**: Vercel

## Phase 2+ Technology Stack (Future)

- **Authentication**: Clerk, Auth.js, or Supabase Auth
- **Database**: Supabase or Neon Postgres
- **Real AI**: OpenAI, Anthropic, or Braintrust
- **Monitoring**: Sentry, PostHog, Braintrust, Langfuse
- **Payment**: Stripe (later phase)

## Repository Structure

```
proben.io/
├── .claude/              # AI assistant configuration
│   ├── agents/          # Specialized agent definitions
│   ├── skills/          # Reusable skill packages
│   ├── hooks/           # Automation triggers
│   └── settings.json    # Claude configuration
├── docs/                 # Documentation
│   ├── ADR/             # Architecture Decision Records
│   ├── BDD/             # Behavior-Driven Development specs
│   └── research/        # Research findings and decisions
├── data/                 # Data directory (gitignored for sensitive data)
├── reference/            # Reference materials and screenshots
└── scripts/             # Utility scripts
```

## Development Workflow

### Before Writing Code

1. **Read Relevant Documentation**
   - Check `docs/ADR/` for architecture decisions
   - Review `docs/BDD/` for behavior specifications
   - Read `CLAUDE.md` for project context
   - Check `docs/ROADMAP.md` for current phase scope

2. **Plan the Implementation**
   - Verify feature is in current phase scope
   - Create or update the relevant ADR for significant changes
   - Identify affected components and dependencies
   - Plan tests before writing code

3. **Check Security Implications**
   - Review `docs/SECURITY.md` for security requirements
   - For Phase 1: Focus on XSS, input validation, headers
   - Plan for input validation and output sanitization

### During Development

1. **Write Tests First**
   - Unit tests for business logic (especially scoring algorithms)
   - Component tests for UI elements
   - E2E tests for critical user flows
   - Test with mock data structures

2. **Implement Features**
   - Follow existing code patterns and conventions
   - Use TypeScript for type safety
   - Maintain accessibility standards (WCAG 2.1 AA)
   - Use static/mock data (no database calls in Phase 1)

3. **Document Decisions**
   - Update ADRs for architectural changes
   - Add inline comments for complex logic only
   - Keep PR descriptions focused on "why" not "what"
   - Mark features as "Phase 1" vs "Future Phase"

### After Implementation

1. **Run Quality Checks**
   - Execute test suite (`npm test`)
   - Run type checking (`npm run type-check`)
   - Check for security vulnerabilities (`npm audit`)
   - Verify no database/API calls in Phase 1 code

2. **Security Review**
   - Use `/security-review` skill for pending changes
   - Address all security findings
   - Document security considerations
   - Focus on client-side security for Phase 1

3. **Code Review**
   - Submit pull request with clear description
   - Address review feedback promptly
   - Ensure CI/CD checks pass
   - Verify deployment readiness for Vercel

## Critical Rules

### Phase 1 Constraints (Current)
- **NO Database**: Use static/mock data only
- **NO Authentication**: Public demo only
- **NO Real AI**: Use deterministic mock algorithms
- **NO API Keys**: No external service integrations
- **NO Payment Processing**: Stripe in later phase

### Security
- Never commit secrets or API keys (even for future phases)
- Always validate and sanitize user input
- For Phase 1: Focus on client-side validation and security headers
- Implement proper CSP headers
- Log security events without exposing sensitive data

### Code Quality
- Maintain test coverage above 80%
- Keep functions small and focused (<50 lines)
- Use descriptive variable and function names
- Avoid premature optimization
- Follow the existing code style
- Use TypeScript for all code (no `any` types)

### AI-Specific Guidelines
- Use the memory system for important context
- Reference related decisions with `[[ADR-number]]`
- Ask questions when requirements are unclear
- Propose alternatives for significant decisions
- Never implement features without clear requirements
- **For Phase 1**: Implement deterministic algorithms, not AI calls

## Evidence-Based Completion Rule (CRITICAL FOR UI WORK)

**Agents must never mark UI work as complete based only on build, tests, or route availability.**

**For all UI/UX tasks, the following evidence MUST be produced before claiming "done":**

1. **Reference Evidence**
   - Reference prototype path (e.g., `reference/screenshots/proben-mvp-6/hero-target-light-1.png`)
   - Source screenshot identified

2. **Current Evidence**
   - Current implementation screenshot captured
   - Route tested in browser
   - Responsive behavior verified

3. **Comparison Evidence**
   - Side-by-side comparison with prototype
   - Visual parity score (1-5 scale, >= 4.5/5 required for approval)
   - Dimension scores: header, hero, typography, spacing, colors, CTAs, responsiveness, brand fit

4. **Verdict Evidence**
   - Explicit ACCEPTED or REJECTED status
   - List of what matches
   - List of what doesn't match
   - Required fixes (if rejected)

**Acceptance Threshold:** Visual parity score >= 4.5/5

**Below Threshold:** Automatic REJECTION with specific blockers

**Related Documentation:**
- `docs/reviews/phase-2-1-failure-analysis.md` — Analysis of why agents accepted visually incorrect result
- `docs/PROCESS_LEARNINGS.md` — Process governance learnings
- `docs/design/DESIGN_QUALITY_GATES.md` — Design quality gate specifications
- `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md` — Visual agentic delivery system

## Visual Agentic Delivery System

For UI/UX work, Proben.io uses the Visual Agentic Delivery System to ensure quality through visual planning, isolated work, fresh review, and risk-scored gates.

**Core Process:**
1. Visual Plan — Create detailed visual plan before implementation
2. Human Feedback — Get approval on plan before coding
3. Isolated Build — Implement in worktree, only from approved plan
4. Fresh Review — Independent agent reviews (builder ≠ reviewer)
5. Risk Score — Assess risk across multiple dimensions
6. Gate Decision — PM, Design QA, CTO evaluate
7. Release or Rework — Human makes final decision

**Key Principles:**
- Plan before code — Visual planning is mandatory for UI work
- Builder ≠ reviewer — The agent that implements cannot be the final reviewer
- Evidence over claims — Screenshots and parity scores required
- Tests ≠ done — Tests passing is necessary but not sufficient
- Prototype parity — Must match approved design (>= 4.5/5)

**New Hard Rules:**
1. No one-line prompts for UI, architecture, or release-critical work
2. UI work must start with visual plan, not code
3. The builder cannot be the final reviewer
4. A fresh reviewer must review before human
5. Tests passing is never sufficient for UI work
6. Prototype parity is blocking (>= 4.5/5 required)
7. Generic SaaS output is rejected (must look like Proben MVP 6)
8. Parallel agents require isolation (worktrees/branches)
9. Research agents summarize, don't modify production code
10. Agent system is audited regularly for effectiveness

**See:** `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md` for complete system documentation.

## Agent Governance System

Proben.io uses a four-level agent authority system to prevent self-approval and ensure quality.

**Four Responsibility Levels:**

**Level 1 — Builders:** Create implementation artifacts. Cannot approve own work.
- Examples: frontend-engineer, documentation-engineer, ai-engineer, test-writer

**Level 2 — Principal Reviewers:** Validate quality and can block release.
- Examples: principal-product-manager, principal-design-reviewer, principal-architect, security-reviewer, qa-release-engineer

**Level 3 — CTO Bar Raiser:** Owns final release quality bar.
- Can block release, verify all gates passed, require evidence package

**Level 4 — Agent Governance Auditor:** Audits the agent system itself.
- Can evaluate agent usefulness, flag false approvals, recommend agent removal

**Hard Rule:** A builder must never approve its own work.

**See:** `docs/agent-governance/AGENT_AUTHORITY_MATRIX.md` for complete authority matrix.

## Common Patterns

### Creating a New Feature

1. Create or update ADR documenting the architecture
2. Write BDD scenarios for expected behavior
3. Implement tests based on BDD scenarios
4. Implement the feature
5. Run security review
6. Update documentation

### Fixing a Bug

1. Write a failing test that reproduces the bug
2. Fix the bug with minimal changes
3. Verify the test passes
4. Add regression test if applicable
5. Document root cause in commit message

### Updating Dependencies

1. Review changelog for breaking changes
2. Update in separate PR
3. Run full test suite
4. Test manually in development environment
5. Document any required migrations

## Memory System Usage

### When to Save Memory

- **User Memories**: When learning about user preferences, role, or expertise
- **Feedback Memories**: When receiving corrections or validation of approach
- **Project Memories**: When learning about timelines, stakeholders, or constraints
- **Reference Memories**: When discovering external resources or systems

### Memory Format

```markdown
---
name: short-descriptive-name
description: One-line summary
metadata:
  type: [user|feedback|project|reference]
---

Content with **Why:** and **How to apply:** sections
```

## Skills and Agents

### Available Skills

- **visual-plan-builder**: Create visual implementation plans before UI work
- **fresh-agent-review**: Independent review of implementation work
- **worktree-isolation**: Define when work must be isolated
- **risk-scored-review**: Assess risk across multiple dimensions
- **security-review**: Security analysis of pending changes
- **research-digest**: Summarize research findings
- **prompt-optimization**: Optimize prompts for better results
- **request-intake**: Structured intake of new requirements
- **release-check**: Pre-release validation

### Specialized Agents

**Level 4 — System Governance:**
- **agent-governance-auditor:** Audits agent system, recommends changes

**Level 3 — Release Quality:**
- **cto-bar-raiser:** Owns final release quality bar, can veto any release

**Level 2 — Principal Reviewers:**
- **principal-product-manager:** Product requirements, product quality evaluation
- **principal-design-reviewer:** Visual quality and design parity review
- **principal-architect:** Architecture design and review
- **security-reviewer:** Security-focused code review
- **qa-release-engineer:** Quality assurance and release management

**Level 1 — Builders:**
- **visual-plan-architect:** Creates visual implementation plans before UI work
- **fresh-review-agent:** Independently reviews implementation work
- **worktree-orchestrator:** Defines worktree/branch strategy
- **frontend-engineer:** Frontend component development
- **documentation-engineer:** Documentation and technical writing
- **ai-engineer:** AI/ML feature implementation (future phases)

**Research:**
- **research-analyst:** Research and competitive analysis

**Key:** Builders (Level 1) cannot approve their own work. Principal Reviewers (Level 2) validate quality. CTO Bar Raiser (Level 3) owns final release bar. Agent Governance Auditor (Level 4) evaluates the system.

## Troubleshooting

### Build Failures
- Check `docs/BUILD_PROCESS.md` for build requirements
- Review recent dependency changes
- Verify environment variables are set

### Test Failures
- Run tests locally with verbose output
- Check for flaky tests that need isolation
- Verify test data and fixtures

### Security Issues
- Run `/security-review` skill
- Check `docs/SECURITY.md` for guidelines
- Document security considerations in ADR

## Resources

- Project Documentation: `docs/`
- Architecture Decisions: `docs/ADR/`
- Behavior Specifications: `docs/BDD/`
- Security Guidelines: `docs/SECURITY.md`
- Build Process: `docs/BUILD_PROCESS.md`
- Visual Agentic Delivery: `docs/agentic-delivery/`
- Agent Governance: `docs/agent-governance/`
- Agent Definitions: `.claude/agents/`

## Getting Started

### Phase 1 Focus (Current)
**Goal**: Build and deploy a public demo MVP with:
1. Landing page (`/`)
2. Sample readiness report (`/sample-report`)
3. Readiness check demo (`/app/readiness-check`)
4. Portfolio/build-process page (`/portfolio/build-process`)
5. Basic tests
6. Vercel-ready deployment

### Phase 1 Constraints
- Static/mock data only (no database)
- No authentication required
- No real AI providers (deterministic algorithms)
- No payment processing
- Public-facing demo only

### For First-Time Setup
1. `docs/PRD.md` - Product requirements (Phase 1 scope)
2. `docs/ROADMAP.md` - Implementation roadmap
3. `docs/BUILD_PROCESS.md` - Local development setup
4. `docs/RFC-0001-architecture.md` - Architecture decisions

### For Phase 2+ (Future)
- `docs/DOMAIN_SETUP.md` - Domain and infrastructure
- `docs/DEPLOYMENT.md` - Full deployment configuration
- `docs/SECURITY.md` - Complete security requirements

---

**Last Updated**: 2026-06-10
**Current Phase**: 1 (MVP Public Demo)
**Maintained By**: Solo Founder
