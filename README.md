# Proben.io

![Live Site](https://img.shields.io/badge/site-live-success) ![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vercel](https://img.shields.io/badge/Vercel-deployed-000000) ![AI-Native](https://img.shields.io/badge/AI--native-Claude%20Code-purple) ![Status](https://img.shields.io/badge/Status-MVP%206%20Live-green) ![License](https://img.shields.io/badge/License-Private%20Portfolio-orange)

**Meeting readiness, measured.**

Proben.io is a meeting readiness simulator that helps product managers, engineers, founders, and operators prepare for high-stakes conversations before they happen.

Many people prepare slides, notes, and arguments, but rarely know whether they are actually ready for the meeting. Proben checks the quality of context before the room does.

## Live Demo

- **Production:** https://proben.io
- **Vercel:** https://proben-landing.vercel.app

> **Note:** If custom domain DNS is still propagating, the Vercel fallback remains available.

## What Proben Checks

| Readiness Dimension | What It Checks | Example Risk |
| --- | --- | --- |
| **Goal clarity** | Is the meeting goal explicit? | The room does not know what decision is needed |
| **Strategic context** | Is the business reason clear? | The proposal sounds cool, not strategic |
| **Evidence** | Are claims supported by data? | Stakeholders challenge assumptions |
| **Stakeholder risk** | Are objections anticipated? | Legal, security, or engineering blocks appear late |
| **Decision ask** | Is the requested decision clear? | Meeting ends without commitment |

## Current MVP

**What's Live Now:**
- ✅ Public landing page with MVP 6 design
- ✅ Static readiness preview and sample report
- ✅ Navigation and public routes
- ✅ Portfolio/build-process page documenting the build process
- ✅ Product build history and decision log

**What's Not Yet Live:**
- ⏳ Real AI scoring (currently deterministic algorithms)
- ⏳ User authentication
- ⏳ Saved reports and workspaces
- ⏳ Database persistence
- ⏳ MCP integrations
- ⏳ Voice practice mode
- ⏳ Dynamic report generation

## Product Roadmap

| Phase | Focus | Status |
| --- | --- | --- |
| **Phase 1** | Public demo MVP | Complete |
| **Phase 2** | MVP 6 landing and domain launch | Complete |
| **Phase 3** | Functional readiness-check MVP | Planned |
| **Phase 4** | Report generation MVP | Planned |
| **Phase 5** | Evals and quality measurement | Planned |
| **Phase 6** | Integrations and MCP | Planned |
| **Phase 7** | Auth and saved workspaces | Planned |

## AI-Native Development Process

Proben.io is also a build-process experiment. The product was built using an AI-native development process with Claude Code, agents, evals, screenshots, visual parity checks, and release gates.

Early process failures created false green checks. The process was improved with evidence-based gates. The project now tracks decisions, failures, lessons, and quality metrics in [`docs/product-build-history/`](docs/product-build-history/).

**Core Principle:** Do not trust agent claims. Trust artifacts:
- Logs
- Screenshots
- Hashes
- DOM checks
- Manifests
- Build output
- Human approval

## Agent System

Proben.io uses a simplified agent system with clear ownership and evidence-based validation:

| Agent | Responsibility | Can Approve Own Work? |
| --- | --- | --- |
| **Product Manager** | Product scope, roadmap, acceptance criteria | No |
| **AI Product Manager** | AI feature strategy, evals, guardrails | No |
| **Frontend Engineer** | UI implementation | No |
| **Test Engineer** | Tests, type-check, build, route checks | No |
| **Design Reviewer** | Screenshot-based visual parity review | No |
| **Architect** | Technical structure and maintainability | No |
| **Security Reviewer** | Security and data risk review | No |
| **Release Manager** | Final release gate | No |
| **Governance Auditor** | Agent system quality and pruning | No |
| **Research Analyst** | External best practices and research | No |

**See:** [`docs/agent-governance/AGENT_ROSTER.md`](docs/agent-governance/AGENT_ROSTER.md) for complete agent inventory.

## Quality Gates

| Gate | Evidence Required | Blocking Failure |
| --- | --- | --- |
| **Type-check** | `npm run type-check` output | TypeScript errors |
| **Build** | `npm run build` output | Build failure |
| **Functional QA** | Route and CTA checks | Broken navigation |
| **Visual QA** | Before/after/reference screenshots | Design mismatch |
| **Product QA** | Acceptance criteria review | Wrong product behavior |
| **Release QA** | Final release checklist | Missing evidence |
| **Human Approval** | Manual review | No final approval |

**See:** [`docs/agentic-delivery/AGENT_STATE_MACHINE.md`](docs/agentic-delivery/AGENT_STATE_MACHINE.md) for the IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO workflow.

## Repository Structure

```text
app/                     Next.js routes
components/              UI and product components
lib/                     Scoring and utility logic
data/                    Demo and research data
public/                  Static assets and public prototype files
reference/               Source-of-truth prototypes and screenshots
docs/                    Product, process, design, evals, and governance docs
scripts/                 Automation, harness, visual review, deployment scripts
e2e/                     Playwright tests
tests/                   Unit tests
.claude/                 Claude Code agents, skills, and hooks
.cursor/                 Cursor rules and project instructions
```

**See:** [`docs/repository/README.md`](docs/repository/README.md) for detailed navigation guide.

## Key Documents

| Document | Purpose |
| --- | --- |
| [`docs/product-build-history/PROCESS_DIFF_LOG.md`](docs/product-build-history/PROCESS_DIFF_LOG.md) | Process changes and decisions |
| [`docs/product-build-history/LESSONS_LEARNED.md`](docs/product-build-history/LESSONS_LEARNED.md) | Mistakes and lessons |
| [`docs/agent-governance/AGENT_ROSTER.md`](docs/agent-governance/AGENT_ROSTER.md) | Agent inventory and ownership |
| [`docs/agentic-delivery/AGENT_STATE_MACHINE.md`](docs/agentic-delivery/AGENT_STATE_MACHINE.md) | Implement → Verify → Review → Close → Retro workflow |
| [`docs/design/DESIGN_PARITY_RUBRIC.md`](docs/design/DESIGN_PARITY_RUBRIC.md) | Visual parity scoring |
| [`docs/evals/`](docs/evals/) | Product and agent evaluation framework |

## Quickstart

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check TypeScript
npm run type-check

# Production build
npm run build
```

**Local URLs:**
- http://localhost:3000 — Landing page
- http://localhost:3000/readiness-check — Readiness check
- http://localhost:3000/sample-report — Sample report
- http://localhost:3000/portfolio/build-process — Build process

## Deployment

- **Vercel Project:** proben-landing
- **Production Domain:** proben.io
- **Fallback Domain:** proben-landing.vercel.app
- **Deployment Source:** GitHub `main` branch

## Build History

| Date | Milestone | Outcome |
| --- | --- | --- |
| 2026-06-11 | Domain Launch | proben.io connected to Vercel Production |
| 2026-06-11 | MVP 6 Landing | Proben MVP 6 landing page launched |
| 2026-06-10 | Visual QA System | Screenshot evidence and visual gates introduced |
| 2026-06-10 | Agent Harness | IMPLEMENT → VERIFY → REVIEW → CLOSE → RETRO workflow introduced |

## Lessons Learned

- **Green tests are necessary but not sufficient.** Tests passing is required, but doesn't guarantee product quality.
- **A working page is not the same as an accepted product.** Functional code can still fail design parity.
- **Screenshot evidence is required for UI work.** Visual acceptance requires before/after/reference comparison.
- **Agents need hard gates, not just prompts.** State machine enforcement beats agent instructions.
- **Repository structure affects aiability.** Clear organization helps agents understand where to work.

**See:** [`docs/product-build-history/LESSONS_LEARNED.md`](docs/product-build-history/LESSONS_LEARNED.md) for complete lessons.

## Contributing

**See:** [`CONTRIBUTING.md`](CONTRIBUTING.md) for contribution guidelines.

**Key principles:**
- Do not change product UI without visual evidence
- Do not approve your own implementation
- Do not add new agents without updating [`AGENT_ROSTER.md`](docs/agent-governance/AGENT_ROSTER.md)
- Do not add generated files without updating `.gitignore`
- Every release should update the decision log

## License

Private portfolio project.

---

**Built with:** Claude Code + Next.js 15 + TypeScript + Vercel  
**Last Updated:** 2026-06-11
