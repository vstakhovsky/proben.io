# Deployment Guide - Proben.io (Phase 1)

## Overview

This document describes the deployment process for Proben.io Phase 1, a static public demo with minimal infrastructure requirements.

**Phase 1 Deployment**: Static site on Vercel with no database, authentication, or external services.

## Deployment Architecture (Phase 1)

### Static Site Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Edge Network                     │
│                   (Static CDN + Edge Caching)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Next.js Static Export (HTML/CSS/JS)          │
└─────────────────────────────────────────────────────────────┘
```

### Phase 1 Characteristics
- **Static Files Only**: Pre-rendered HTML, CSS, and JavaScript
- **No Server-Side**: No API routes, no server functions
- **No Database**: All data is static/mock
- **No Authentication**: Public access only
- **CDN Delivered**: Edge caching for optimal performance

### Environment Tiers (Phase 1)

#### Development
- **Purpose**: Local development and testing
- **Infrastructure**: Next.js dev server
- **Data**: Static/mock data in code
- **Access**: Local machine only

#### Preview Deployments
- **Purpose**: Pre-production validation
- **Infrastructure**: Vercel preview deployments
- **Data**: Same static data as production
- **Access**: Public (via preview URLs)

#### Production
- **Purpose**: Live public demo
- **Infrastructure**: Vercel production deployment
- **Data**: Static mock data
- **Access**: Public

## Infrastructure Providers (Phase 1)

### Primary Provider

#### Vercel (Deployment Platform)
- **Service**: Static site hosting and CDN
- **Plan**: Free (sufficient for Phase 1)
- **Features**: Automatic HTTPS, edge caching, preview deployments

**Why Vercel for Phase 1:**
- Zero configuration required
- Automatic deployments from Git
- Built-in CDN
- Free tier sufficient for static site
- Preview deployments for testing

### Phase 1 Exclusions (Future Phases)

**NOT included in Phase 1:**
- Database providers (Neon, Supabase)
- Cache providers (Upstash Redis)
- AI providers (OpenAI, Anthropic)
- Authentication providers (Clerk, Auth.js)
- Monitoring providers (Sentry, PostHog)

These will be considered for Phase 2+ based on user feedback and business needs.

## Environment Configuration (Phase 1)

### Environment Variables

#### Required Variables (Phase 1)

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL="https://proben.io"

# Optional: Analytics wrapper (console-safe)
NEXT_PUBLIC_ANALYTICS_ENABLED="false"
```

**Note**: Phase 1 requires minimal configuration because:
- No database connections needed
- No authentication required
- No AI API keys needed
- No external service integrations

#### Optional Variables (Phase 1)

```bash
# Feature Flags (for testing)
NEXT_PUBLIC_SHOW_DEMO_MODE="true"
```

### Configuration Management (Phase 1)

#### Local Development
```bash
# .env.local (gitignored)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_ANALYTICS_ENABLED="false"
```

#### Vercel Environment
- Set `NEXT_PUBLIC_SITE_URL` to `https://proben.io`
- No secrets required for Phase 1
- Same configuration for preview and production

## Deployment Process (Phase 1)

### Initial Deployment

#### 1. Project Setup
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link
```

#### 2. Environment Configuration
```bash
# Set site URL
vercel env add NEXT_PUBLIC_SITE_URL production

# For production
# Value: https://proben.io
```

#### 3. Deploy to Production
```bash
# Deploy to production
vercel --prod

# Or push to main branch
git push origin main
```

### Regular Deployments (Phase 1)

#### Feature Branch Workflow
1. Create feature branch
2. Push to GitHub
3. Automatic Vercel preview deployment
4. Test on preview URL
5. Create pull request
6. Merge to main
7. Automatic production deployment

#### Deployment Commands
```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Static Build Process (Phase 1)

#### Build Configuration
```javascript
// next.config.js
module.exports = {
  output: 'export',
  images: {
    unoptimized: true
  }
};
```

#### Build Steps
```bash
# Build static site
pnpm build

# Output in: out/ directory
# Ready for deployment to any static host
```

### Phase 1 Deployment Notes

**No Database Migrations Required** - All data is static/mock in code

**No API Routes Required** - All functionality is client-side

**No Authentication Configuration** - Public access only

#### Migration Process
```bash
# Create migration locally
pnpm prisma migrate dev --name [migration-name]

# Test migration on staging
# (Review schema changes in preview deployment)

# Apply to production
# Manual process for safety:
# 1. Review migration SQL
# 2. Test on staging
# 3. Backup production database
# 4. Apply migration
# 5. Verify application functionality
# 6. Monitor for issues
```

#### Migration Best Practices
- Review generated SQL before applying
- Test on staging first
- Create backups before production migrations
- Use transactions for multi-step changes
- Have rollback plan ready

## CI/CD Pipeline

### GitHub Actions Workflow

#### Pull Request Checks
```yaml
name: PR Checks

on:
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Setup Node.js
      - Install dependencies
      - Run type check
      - Run linter
      - Run unit tests
      - Run E2E tests
      - Security audit
```

#### Deployment Pipeline
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - Checkout code
      - Run all quality checks
      - Build application
      - Deploy to Vercel production
      - Run smoke tests
      - Notify team
```

### Automated Checks

#### Quality Gates
- TypeScript compilation
- Linting rules
- Test coverage (>80%)
- Security vulnerabilities
- Bundle size limits

#### Performance Checks
- Lighthouse scores
- Build time limits
- Bundle size analysis
- Memory usage monitoring

## Monitoring and Observability (Phase 1)

### Application Monitoring (Phase 1)

#### Vercel Analytics (Included)
- Page views and visitors
- Core Web Vitals
- Route performance
- Static asset delivery metrics

**Note**: Vercel Analytics included automatically, no additional setup required for Phase 1.

#### Console-Safe Analytics Wrapper
```typescript
// lib/analytics.ts
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
      // Future: Send to analytics service
      console.log('[Analytics]', event, properties);
    } else {
      // Development mode: console only
      console.log('[Analytics]', event, properties);
    }
  }
};
```

### Custom Monitoring (Phase 1)

#### Static Site Health
```typescript
// Public endpoint (optional)
// Since Phase 1 is static, site health = pages load successfully
```

**Phase 1 Monitoring Simplicity:**
- No API endpoints to monitor
- No database connections to check
- No external service dependencies
- Site health = static files accessible

### Future Monitoring (Phase 2+)

When ready for advanced monitoring, consider:
- Sentry for error tracking
- PostHog for product analytics
- Uptime monitoring
- Performance monitoring

## Security in Production (Phase 1)

### Security Headers (Static Site)
```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=(), microphone=(), camera=()'
  }
];
```

### Access Control (Phase 1)
- Public access only (no authentication)
- Rate limiting via Vercel (automatic)
- DDoS protection via Vercel (automatic)
- No admin areas to protect

### Data Protection (Phase 1)
- Encryption in transit (HTTPS via Vercel, automatic)
- No sensitive data stored (Phase 1 advantage)
- No user data to protect (public demo only)
- No database to secure

**Phase 1 Security Advantages:**
- No database to compromise
- No user credentials to leak
- No API keys to expose
- Minimal attack surface

## Backup and Recovery (Phase 1)

### Static Site Backup

#### Content in Git
- **All content**: Stored in Git repository
- **Backup**: GitHub repository backup
- **Version Control**: Complete history of changes
- **Restoration**: Git clone and redeploy

**Phase 1 Backup Advantages:**
- No database backups needed
- No data migration complexity
- Complete version control
- Instant rollback via Git

### Disaster Recovery (Phase 1)

#### Recovery Procedures
1. Assess damage and scope
2. Identify last known good commit
3. Revert to previous Git commit if needed
4. Redeploy to Vercel (automatic)
5. Verify site functionality
6. Monitor for issues

#### Recovery Testing
- Test rollback procedure
- Verify Vercel deployment
- Check static site functionality

**Phase 1 RTO/RPO:**
- Recovery Time Objective (RTO): 5 minutes
- Recovery Point Objective (RPO): Last commit

### Version Control as Backup

```bash
# Backup is automatic via Git
git status
git add .
git commit -m "Update content"
git push origin main

# Restoration via rollback
git revert [commit-hash]
git push origin main
```

## Scaling Strategy

### Horizontal Scaling
- Automatic via Vercel edge functions
- Geographic distribution
- Load balancing
- Auto-scaling based on traffic

### Vertical Scaling
- Database connection pooling
- Redis clustering for cache
- CDN for static assets
- Image optimization

### Performance Optimization
- Code splitting and lazy loading
- Edge caching strategies
- Database query optimization
- Bundle size monitoring
- Resource compression

## Incident Response

### Incident Tiers

#### Tier 1 (Critical)
- System down
- Data breach
- Complete feature failure
- **Response Time**: 15 minutes

#### Tier 2 (High)
- Major feature degradation
- Partial system outage
- Performance issues
- **Response Time**: 1 hour

#### Tier 3 (Medium)
- Minor feature issues
- UI problems
- Documentation errors
- **Response Time**: 24 hours

### Response Process

#### Detection
1. Alert received
2. Verify incident
3. Classify severity
4. Notify team

#### Response
1. Assemble response team
2. Initial assessment
3. Implement temporary fix
4. Communicate status

#### Resolution
1. Permanent fix
2. Test thoroughly
3. Deploy to production
4. Monitor for recurrence

#### Post-Incident
1. Root cause analysis
2. Update documentation
3. Improve processes
4. Share learnings

## Rollback Procedures

### Immediate Rollback
```bash
# Vercel rollback
vercel rollback [deployment-url]

# Or revert Git commit
git revert [commit-hash]
git push origin main
```

### Database Rollback
```bash
# Revert last migration
pnpm prisma migrate resolve --rolled-back [migration-name]

# Restore from backup
# (Via Neon dashboard/API)
```

### Rollback Decision Criteria
- Critical bugs affecting users
- Security vulnerabilities
- Data corruption
- Performance degradation
- Feature not working as expected

## Maintenance Windows

### Scheduled Maintenance
- **Frequency**: Monthly
- **Duration**: 1 hour
- **Notification**: 7 days advance
- **Time**: Low-traffic period (2-3 AM UTC)

### Maintenance Activities
- Security updates
- Dependency upgrades
- Database optimization
- Performance tuning
- Feature deployments

### Communication
- Status page updates
- Email notifications
- In-app notifications
- Social media updates

## Cost Management (Phase 1)

### Phase 1 Monthly Costs

#### Vercel (Static Site)
- Free Plan: $0/month
- Bandwidth: Included (100GB)
- Functions: $0 (no server functions)
- **Total**: $0/month

#### Additional Services
- None required for Phase 1

#### Total Monthly Cost: $0/month

**Phase 1 Cost Advantages:**
- Zero infrastructure costs
- Zero database costs
- Zero API costs
- Zero authentication costs

### Future Phase Costs (Planning)

#### Phase 2 Estimated Costs
- Authentication: $0-25/month (Clerk/Supabase)
- Database: $0-25/month (Supabase/Neon)
- **Estimated**: $0-50/month

#### Phase 3 Estimated Costs
- AI API costs: Variable based on usage
- Monitoring: $0-20/month (PostHog/Sentry)
- **Estimated**: $50-200/month (including Phase 2)

### Cost Optimization (Phase 1)

**Already Optimized:**
- Static site serving
- CDN caching
- No server costs
- No database costs
- No API costs

**Future Considerations:**
- Monitor before adding services
- Validate value before investing
- Start with free tiers
- Scale costs with usage

## Deployment Checklist (Phase 1)

### Pre-Deployment
- [ ] All tests passing
- [ ] Code review approved
- [ ] Security review complete
- [ ] Documentation updated
- [ ] Static build tested locally
- [ ] Lighthouse scores verified (>90)
- [ ] No database/API calls in code

### During Deployment
- [ ] Build initiated
- [ ] Build successful
- [ ] Static files generated
- [ ] Deployment to Vercel successful
- [ ] HTTPS working
- [ ] Security headers active

### Post-Deployment
- [ ] Landing page loads
- [ ] Sample report displays
- [ ] Readiness check demo works
- [ ] Portfolio page accessible
- [ ] All links functional
- [ ] Mobile responsiveness verified
- [ ] Lighthouse scores verified (>90)
- [ ] No console errors

### Phase 1 Specific Checks
- [ ] No authentication required (public access)
- [ ] No database connections needed
- [ ] No API calls failing
- [ ] Static site generation complete
- [ ] All content served from CDN

---

**Last Updated**: 2025-06-08
**Current Phase**: 1 (Static MVP)
**Deployment Platform**: Vercel (Static Site)
**Monthly Cost**: $0
**Related Docs**: `docs/BUILD_PROCESS.md`, `docs/SECURITY.md`, `docs/ROADMAP.md`
