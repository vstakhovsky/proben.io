# RFC-0001: Phase 1 Architecture - Static MVP Approach

## Status
**Accepted** - 2025-06-08

## Context

Proben.io is a readiness assessment platform for solo founders. The initial decision point is whether to build a fully-functional application with authentication, database, and AI integrations, or to start with a simpler public demo to validate the concept.

## Problem Statement

Building a full-featured application requires significant investment in:
- Infrastructure setup (database, authentication, AI providers)
- Development time (authentication flows, data persistence)
- Ongoing costs (database hosting, AI API costs)
- Complexity (user management, data security)

Before making this investment, we need to validate:
- Product-market fit
- User demand
- Value proposition clarity
- Willingness to pay

## Decision

**Proben.io Phase 1 will be a static public demo with:**
- No database (static/mock data only)
- No authentication (public access)
- No real AI providers (deterministic algorithms)
- No payment processing
- Static site deployment

### Architecture Diagram (Phase 1)

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Edge Network                     │
│                   (Static CDN + Edge Caching)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Static Export                     │
│              (Pre-rendered HTML + Client Components)          │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Landing Page    │  │  Sample Report   │  │ Readiness Demo   │
│  (Static HTML)   │  │  (Static HTML)   │  │ (Client Logic)   │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

## Rationale

### Advantages of Static MVP Approach

1. **Speed to Market**
   - No database setup required
   - No authentication flow to build
   - No API integrations to configure
   - Can deploy in days, not weeks

2. **Cost Efficiency**
   - Zero database costs
   - Zero AI provider costs
   - Minimal Vercel costs (free tier sufficient)
   - No ongoing infrastructure expenses

3. **Technical Simplicity**
   - No database migrations
   - No authentication security concerns
   - No API key management
   - No state management complexity

4. **Performance**
   - Static files served via CDN
   - No database latency
   - No API call overhead
   - Optimal Core Web Vitals

5. **Concept Validation**
   - Focus on value proposition
   - Gather user feedback
   - Test messaging
   - Validate demand before investing

### Trade-offs

**What we're giving up in Phase 1:**
- User personalization
- Assessment persistence
- Real AI insights
- User accounts
- Usage analytics

**Why this is acceptable:**
- These are "nice to have" for validation
- Can be added in Phase 2 if validated
- Mock data demonstrates concept effectively
- Public demo sufficient for feedback collection

## Implementation Details

### Technology Stack (Phase 1)

**Core:**
- Next.js 15 (App Router)
- TypeScript
- React 18

**Styling:**
- Tailwind CSS
- shadcn/ui components

**Testing:**
- Vitest (unit tests)
- Playwright (E2E tests)

**Deployment:**
- Vercel (static export)
- No additional services required

### Data Architecture (Phase 1)

**Mock Data Storage:**
```typescript
// src/data/mock-reports.ts
export const sampleReport: SampleReport = {
  readinessScore: 72,
  contextGaps: [
    "Customer research not conducted",
    "Pricing strategy undefined",
    "Launch timeline unclear"
  ],
  topFixes: [
    "Interview 5 potential customers",
    "Research 3 competitor pricing models",
    "Define MVP scope and timeline"
  ],
  practiceMoment: "Your biggest gap is customer validation. Before building anything, talk to 5 potential customers to validate your problem hypothesis.",
  readinessDelta: -15, // Below optimal readiness
  assessmentDate: new Date('2025-06-08')
};
```

**Deterministic Scoring:**
```typescript
// src/lib/scoring.ts
export function calculateReadinessScore(responses: Response[]): number {
  // Deterministic algorithm based on response weights
  const totalWeight = responses.reduce((sum, r) => sum + r.weight, 0);
  const weightedScore = responses.reduce((sum, r) => {
    return sum + (r.value * r.weight);
  }, 0);
  return Math.round((weightedScore / totalWeight) * 100);
}
```

### Page Structure (Phase 1)

**Public Routes:**
```
/                           → Landing page
/sample-report              → Sample readiness report
/app/readiness-check        → Interactive demo (CANONICAL ROUTE)
/readiness-check            → Compatibility route (also works)
/portfolio/build-process    → Development documentation
```

**No Protected Routes** (Phase 1)

## Phase 2+ Considerations

### When to Add Infrastructure

**Trigger for Phase 2:**
- Clear user demand for personalization
- Willingness to provide email address
- Product-market fit indicators
- Business model validation

**Planned Phase 2 Additions:**
- User authentication (Clerk, Auth.js, or Supabase)
- Database integration (Supabase or Neon Postgres)
- Assessment persistence
- Basic analytics

### Future Architecture (Phase 2+)

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Edge Network                     │
│                   (API Routes + Edge Functions)              │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   Next.js App     │  │  API Routes      │  │  Static Pages    │
│                  │  │                  │  │                  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
                              │
              ┌───────────────┼───────────────┐
              │               │               │
              ▼               ▼               ▼
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  Database        │  │  Auth Provider   │  │  AI Provider     │
│  (Supabase/Neon) │  │  (Clerk/Auth.js) │  │  (OpenAI/Anthropic)│
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

## Alternatives Considered

### Alternative 1: Full-Featured MVP
**Description**: Build complete application with auth, database, and AI from day one.

**Pros:**
- Complete feature set
- No rework needed for Phase 2
- Validates full user journey

**Cons:**
- Significantly longer time to market
- Higher upfront costs
- More complexity to debug
- Risk of building wrong features

**Decision**: Rejected in favor of incremental approach

### Alternative 2: No-Code/Low-Code Platform
**Description**: Use Webflow, Bubble, or similar for initial MVP.

**Pros:**
- Faster initial build
- Less technical complexity
- Easy iteration

**Cons:**
- Limited customization
- Vendor lock-in
- Migration complexity
- Doesn't showcase technical skills

**Decision**: Rejected to maintain control and flexibility

## Success Criteria

Phase 1 architecture is successful if:
1. Public demo deploys successfully
2. All pages load without errors
3. Deterministic scoring works correctly
4. Performance targets are met (Lighthouse > 90)
5. User feedback validates concept

## Migration Path

### Phase 1 → Phase 2 Migration

**When ready to add infrastructure:**

1. **Add Authentication**
   - Choose provider (Clerk, Auth.js, Supabase)
   - Implement login/signup
   - Protect relevant routes
   - Migrate mock users if needed

2. **Add Database**
   - Choose provider (Supabase, Neon)
   - Design schema
   - Implement migrations
   - Add Prisma ORM

3. **Add Persistence**
   - Update API routes
   - Modify data layer
   - Migrate mock data
   - Update tests

4. **Add AI Integration**
   - Choose provider (OpenAI, Anthropic)
   - Implement API calls
   - Add prompt optimization
   - Implement caching

**Key Principle**: Each phase is additive, not disruptive

## Risks and Mitigations

### Risk: Static Approach Too Limiting
**Mitigation**: Phase 1 is deliberately scoped to validate concept. If static approach proves insufficient, we can accelerate Phase 2.

### Risk: Mock Data Not Representative
**Mitigation**: Use realistic scenarios based on research. Gather real examples during Phase 1 for Phase 2 data.

### Risk: Performance Issues with Client Logic
**Mitigation**: Keep algorithms simple and fast. Use web workers if needed. Monitor Core Web Vitals.

### Risk: Users Expect Full Features
**Mitigation**: Clear communication that this is a demo. Set expectations appropriately on landing page.

## Documentation

### Related Documents
- [PRD.md](./PRD.md) - Product requirements
- [ROADMAP.md](./ROADMAP.md) - Development phases
- [BUILD_PROCESS.md](./BUILD_PROCESS.md) - Build and deployment
- [CLAUDE.md](../CLAUDE.md) - Development guide

### Code Structure
```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── sample-report/     # Sample report page
│   ├── readiness-check/   # Readiness check demo (compatibility route: /readiness-check)
│   ├── app/               # Product routes (canonical: /app/readiness-check)
│   │   └── readiness-check/
│   └── portfolio/         # Portfolio pages
├── components/            # React components
├── lib/                   # Utility functions
├── data/                  # Mock data
└── styles/                # Global styles
```

## References

### Inspiration
- Vercel's static site patterns
- Next.js static export documentation
- shadcn/ui component library

### Best Practices
- Static site performance optimization
- TypeScript for type safety
- Component-based architecture
- Test-driven development

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-06-08 | Solo Founder | Initial RFC |

---

**Status**: Accepted
**Next Review**: After Phase 1 deployment
**Owner**: Solo Founder
