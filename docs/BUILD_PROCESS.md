# Build Process - Proben.io (Phase 1 MVP)

## Overview

This document describes the build, test, and deployment process for Proben.io Phase 1 MVP. This is a **static public demo** with no database, authentication, or external AI services.

## Phase 1 Scope

**What IS included:**
- Landing page with product overview
- Sample readiness report (static/mock data)
- Readiness check demo (deterministic algorithm)
- Portfolio/build-process page
- Basic tests
- Vercel deployment

**What is NOT included (Phase 2+):**
- Database connectivity
- User authentication
- Real AI providers
- Payment processing
- Admin console
- MCP automation

## Prerequisites

### Required Tools (Phase 1)
- Node.js 20+ (LTS)
- pnpm 9+ (package manager)
- Git 2.40+

### Optional Tools
- Vercel CLI (for local deployment testing)

## Environment Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/proben.io.git
cd proben.io

# Install dependencies
pnpm install
```

### 2. Environment Variables (Phase 1)

For Phase 1 MVP, minimal environment configuration is needed:

```bash
# Optional: Site configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Optional: Analytics wrapper (console-safe)
NEXT_PUBLIC_ANALYTICS_ENABLED="false"
```

**Note**: Phase 1 does not require:
- Database URLs
- API keys
- Authentication secrets
- AI provider credentials
```

### Design References (Phase 1)

**Available Design Assets:**
- `/reference/design/` - PowerPoint files with design specifications
- `/reference/screenshots/` - 27 screenshot images showing visual design
- Design is comprehensive and ready for implementation

**Design System Implementation:**
- Light grid background: CSS pattern in `app/globals.css`
- Serif headlines: Georgia font family configured
- Green CTAs: Brand green (#10B981) in `tailwind.config.ts`
- Readiness report cards: Styled in page components
- Editorial tone: Professional, calm, serious content throughout

**Status**: All design references are comprehensive. Design tokens properly configured.

### 3. Mock Data Setup (Phase 1)

Phase 1 uses static/mock data stored in TypeScript files:

```bash
# Mock data is already included in src/data/
# No database setup required
```

Mock data structure:
- `src/data/mock-reports.ts` - Sample readiness reports
- `src/data/mock-questions.ts` - Assessment questions
- `src/data/mock-users.ts` - Sample user profiles (future use)

## Development Workflow (Phase 1)

### Local Development

```bash
# Start development server
pnpm dev

# Start with specific port
pnpm dev -- -p 3000
```

The development server includes:
- Hot module replacement
- Fast refresh for React components
- Source maps for debugging
- Static routes for public demo pages
- No API routes required in Phase 1

### Type Checking

```bash
# Type check without building
pnpm type-check

# Type check with watch mode
pnpm type-check --watch
```

### Testing (Phase 1)

#### Unit Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

Focus testing on:
- Readiness scoring algorithms (deterministic)
- Component rendering
- Mock data structures
- User interactions

#### E2E Tests

```bash
# Install Playwright browsers (first time only)
pnpm exec playwright install

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e --ui

# Run E2E tests in debug mode
pnpm test:e2e --debug
```

Focus E2E testing on:
- Landing page loads
- Sample report displays correctly
- Readiness check demo works (canonical route: `/app/readiness-check`)
- Navigation between pages
- Route consistency (canonical vs compatibility routes)
- Mobile responsiveness

**Important Route Information:**
- **Canonical route**: `/app/readiness-check` (use this in links, tests, and documentation)
- **Compatibility route**: `/readiness-check` (for backward compatibility, redirects work but not canonical)

### Linting and Formatting

```bash
# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

## Build Process (Phase 1)

### Production Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

The build process:
1. Runs TypeScript compilation
2. Executes production linter
3. Builds Next.js application (static export)
4. Generates static assets
5. Optimizes images and bundles
6. Creates production-ready static output

### Build Output

Build artifacts are placed in:
- `.next/` - Next.js build output
- `out/` - Static export output (for Phase 1)

### Static Export Configuration

Phase 1 uses Next.js static export for optimal performance:

```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true
  }
};
```

## CI/CD Pipeline (Phase 1)

### GitHub Actions

The project uses GitHub Actions for CI/CD:

#### Pull Request Checks

Every PR triggers:
- Type checking
- Linting
- Unit tests
- E2E tests
- Bundle size analysis
- Security audit (dependency scanning)

**Note**: Phase 1 skips:
- Database migration checks
- API integration tests
- Authentication flow tests

#### Deployment Pipeline

On merge to `main`:
1. Runs all PR checks
2. Creates deployment artifact (static build)
3. Deploys to Vercel (automatic)
4. Runs smoke tests (critical paths)
5. Notifies of deployment status

### Local CI Simulation

```bash
# Run all CI checks locally
pnpm ci:check

# Run with verbose output
pnpm ci:check --verbose
```

## Quality Gates (Phase 1)

### Pre-commit
Before committing, ensure:
- [ ] Tests pass locally
- [ ] No TypeScript errors
- [ ] Linting passes
- [ ] No new dependencies added without review
- [ ] Static pages build correctly

### Pre-merge
Before merging, ensure:
- [ ] All CI checks pass
- [ ] Code review approved
- [ ] E2E tests pass
- [ ] Bundle size acceptable
- [ ] No database/API calls in code

### Pre-deployment
Before deploying, ensure:
- [ ] All merge checks pass
- [ ] Smoke tests pass on preview deployment
- [ ] All static pages are accessible
- [ ] Mobile responsiveness verified
- [ ] Performance targets met (Lighthouse)

## Product Manager Quality Gate

### Purpose

The Product Manager evaluates every phase against product strategy, PRD, prototype, user value, and product eval metrics. This prevents the team from treating technical completion as product completion.

### Visual Agentic Delivery System

For UI/UX work, Proben.io uses the Visual Agentic Delivery System to ensure quality through visual planning, isolated work, fresh review, and risk-scored gates.

**See:** `docs/agentic-delivery/VISUAL_AGENTIC_DELIVERY_SYSTEM.md`

**Key Process for UI Work:**
1. Visual Plan → Human Approval → Isolated Build → Fresh Review → Risk Score → PM/Design/CTO Review → Human Approval → Release

**Evidence-Based Completion:**
For UI tasks, "done" requires:
- Reference prototype path
- Current implementation screenshot
- Visual parity score (>= 4.5/5 required)
- Functional QA status
- Explicit ACCEPTED/REJECTED verdict

**Tests passing is necessary but not sufficient for UI work.**

### What the PM Gate Evaluates

The PM gate evaluates:

1. **Product Quality** — Did we build the right product?
2. **Design Parity** — Does it match the target prototype?
3. **Value Proposition** — Is the value clear and compelling?
4. **User Experience** — Does the flow work smoothly?
5. **Strategic Alignment** — Does this advance the product vision?

### PM Eval Process

**Before Phase:**
* Define product goal
* Document user problem
* Specify acceptance criteria
* Define eval rubric
* List out-of-scope items

**After Phase:**
* Compare before vs after
* Score against rubric
* Assess requirement coverage
* Check design alignment
* Document gaps and regressions

### PM Eval Rubric

See `docs/evals/PRODUCT_EVALS.md` for the complete evaluation rubric.

**Key Dimensions:**
* Value Proposition Clarity (0-5)
* Design Parity (0-5)
* UX Flow Quality (0-5)
* Requirements Compliance (0-5)
* Evidence Quality (0-5)

**Approval Thresholds:**
* Average >= 4.2: Approve
* Average 3.5-4.1: Approve with fixes
* Average < 3.5: Block broad sharing

**Critical Blockers:**
Any dimension below 3 blocks the next phase.

### PM Verdict Options

After each phase, the PM provides one of:

* **Approved** — Ready to share broadly
* **Approved with fixes** — Minor improvements needed
* **Blocked** — Rework needed before sharing
* **Needs redesign** — Major product work required
* **Needs rollback** — Phase made things worse

### What the PM Gate Prevents

The PM gate prevents:

* **"Green checkmarks without evidence"** — Tests pass but product is weak
* **"Technical completion ≠ Product completion"** — Code works but value unclear
* **"Product-process inversion"** — Portfolio work stronger than product
* **"Scope creep"** — Adding features without clear user value
* **"Premature infrastructure"** — Adding backend before proving user value

### When the PM Gate Runs

The PM gate runs:

* **After every phase** — Before starting next phase
* **Before deployment** — Before public sharing
* **When scope changes** — Re-evaluate if direction changes
* **When risks identified** — Check if product quality at risk

### Proben.io as a Build Learning System

Proben.io is not only a product—it is an experiment in AI-assisted product development quality. The build process itself is designed to learn from failures and improve over time.

### Recursive Quality Improvement

Every weak result becomes a process improvement:

1. **Failure occurs** — Quality gate fails or human override happens
2. **Document decision** — Create BLD entry explaining what failed and why
3. **Add/update gate** — Introduce new eval, test, or rule to prevent recurrence
4. **Document learning** — Extract reusable lesson for future situations
5. **Track metrics** — Monitor if improvement actually worked

### Decision Documentation

Every meaningful product, design, agent, eval, or release process change is documented:

- **BUILD_LEARNING_DECISION_LOG.md** — Chronological log of all BLD entries
- **BUILD_LEARNING_DECISION_INDEX.md** — Quick reference index
- **LESSONS_LEARNED.md** — Reusable lessons grouped by theme
- **QUALITY_METRICS_HISTORY.md** — Metrics tracking over time

### Mandatory Triggers

A BLD entry is REQUIRED for:
- Failed or rejected slice
- False PASS (agent claimed PASS but human/browser disagreed)
- Human override occurred
- New gate/eval/agent added
- Visual QA process change
- Architecture/security decision

**See:** `docs/product-build-history/` for complete learning documentation.

### Public Portfolio

The quality journey is documented publicly at:

**[/portfolio/how-proben-was-built](../app/portfolio/how-proben-was-built/page.tsx)** — Explains how Proben.io's quality system evolved through failures and improvements.

### Learning Focus

The bottleneck in AI-assisted development moves from **building** to **validating** and **learning**. Proben.io's build process is designed to:

- Capture every failure as learning
- Convert failures into gates and evals
- Document decisions for future reference
- Make learning durable and reusable
- Show quality evolution publicly

## Related Documentation

* **Product Eval Rubric:** `docs/evals/PRODUCT_EVALS.md`
* **Phase Template:** `docs/evals/PHASE_EVALUATION_TEMPLATE.md`
* **PM Agent:** `.claude/agents/product-manager.md`
* **Phase Gate Policy:** `docs/PHASE_GATE_POLICY.md`
* **Build Learning:** `docs/product-build-history/BUILD_LEARNING_DECISION_LOG.md`

## Quality Gates

### Pre-commit

Before committing, ensure:
- [ ] Tests pass locally
- [ ] No TypeScript errors
- [ ] Linting passes
- [ ] No security vulnerabilities

### Pre-merge

Before merging, ensure:
- [ ] All CI checks pass
- [ ] Code review approved
- [ ] Security review complete
- [ ] E2E tests pass
- [ ] Documentation updated

### Pre-deployment

Before deploying, ensure:
- [ ] All merge checks pass
- [ ] Smoke tests pass
- [ ] Performance thresholds met
- [ ] Security audit clean
- [ ] Rollback plan documented

## Performance Monitoring (Phase 1)

### Build Performance

```bash
# Analyze build performance
pnpm build --profile

# Analyze bundle size
pnpm analyze
```

### Runtime Performance (Static Site)

Monitor:
- First Contentful Paint (FCP) < 1.0s (static target)
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- First Input Delay (FID) < 100ms

**Phase 1 advantages**:
- No database latency
- No API call overhead
- Static file serving via CDN
- Optimal performance out of the box

## Troubleshooting

### Common Issues

**Build fails with TypeScript errors**
```bash
# Check TypeScript version
pnpm tsc --version

# Clear cache and rebuild
rm -rf .next node_modules/.cache
pnpm build
```

**Tests fail in CI but pass locally**
```bash
# Check Node version matches CI
node --version

# Run with CI environment variables
CI=true pnpm test
```

**Static build issues**
```bash
# Phase 1: No database needed
# Check static export configuration
cat next.config.js | grep output

# Rebuild static files
rm -rf .next out
pnpm build
```

### Getting Help

- Check `docs/TROUBLESHOOTING.md`
- Review GitHub Actions logs
- Check Vercel deployment logs
- Verify static site configuration

## Security Considerations (Phase 1)

### Build Security

- Never commit `.env.local` or secrets
- Use `pnpm audit` regularly
- Keep dependencies updated
- Review security advisories
- Use `pnpm lock` for reproducible builds

### Deployment Security (Static Site)

- Enable security headers (CSP, HSTS, etc.)
- Configure CORS properly (public demo)
- Implement rate limiting (Vercel level)
- Monitor for anomalies (Vercel Analytics)
- No secrets to leak (Phase 1 advantage)

See `docs/SECURITY.md` for Phase 1 security details.

## Maintenance (Phase 1)

### Dependency Updates

```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Major version updates
pnpm upgrade-interactive
```

### Content Updates (Phase 1)

Since Phase 1 is static:
- Update mock data in `src/data/` files
- Rebuild and redeploy for content changes
- Version control for all content
- No database migrations required

### Future Phase Preparation

When ready for Phase 2:
- Review `docs/ROADMAP.md` for next steps
- Plan database schema
- Design authentication flow
- Prepare AI provider integration

---

**Last Updated**: 2025-06-08
**Current Phase**: 1 (Static MVP)
**Related Docs**: `docs/DEPLOYMENT.md`, `docs/SECURITY.md`, `docs/ROADMAP.md`
