# Domain and Infrastructure Setup - Proben.io

## Overview

This document describes the domain configuration, DNS setup, and infrastructure initialization for Proben.io.

## Domain Configuration

### Primary Domain
- **Domain**: proben.io
- **Registrar**: [To be configured]
- **DNS Provider**: Cloudflare (recommended)
- **Status**: Active

### Subdomains

#### Production
- **proben.io**: Main application
- **www.proben.io**: Redirects to proben.io

#### Development/Staging
- **staging.proben.io**: Staging environment
- **preview.proben.io**: Vercel preview deployments

#### Services
- **api.proben.io**: API endpoints (if separate)
- **admin.proben.io**: Admin dashboard
- **docs.proben.io**: Documentation site

## DNS Configuration

### DNS Records

#### A Records
```
proben.io          A    76.76.21.21    (Vercel)
*.proben.io        A    76.76.21.21    (Vercel wildcard)
```

#### CNAME Records
```
www                CNAME proben.io
staging            CNAME proben.io
admin              CNAME proben.io
```

#### MX Records (if email needed)
```
proben.io          MX   10   mx1.example.com
proben.io          MX   20   mx2.example.com
```

#### TXT Records
```
proben.io          TXT  "v=spf1 include:_spf.example.com ~all"
proben.io          TXT  "google-site-verification=..."
```

### DNS Configuration Steps

#### 1. Update Nameservers
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

Or for Cloudflare:
```
ns1.cloudflare.com
ns2.cloudflare.com
```

#### 2. Configure DNS Records
Add records to your DNS provider dashboard following the configuration above.

#### 3. Verify DNS Propagation
```bash
# Check DNS propagation
dig proben.io
nslookup proben.io

# Check specific record
dig A proben.io
dig MX proben.io
```

#### 4. Configure SSL/TLS
- Vercel provides automatic SSL
- Certificate auto-renewal
- Force HTTPS redirect
- HSTS enabled

## Vercel Configuration

### Project Setup

#### 1. Import Project
```bash
# Install Vercel CLI
npm i -g vercel

# Login and link
vercel login
vercel link
```

#### 2. Configure Project
- Framework Preset: Next.js
- Root Directory: `./`
- Build Command: `pnpm build`
- Output Directory: `.next`
- Install Command: `pnpm install`

#### 3. Environment Variables
Set in Vercel dashboard:
```
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
ANTHROPIC_API_KEY
```

### Vercel Configuration File

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXTAUTH_URL": {
      "value": "https://proben.io"
    }
  }
}
```

### Custom Domain Configuration

#### Add Domain to Vercel
1. Go to project settings → Domains
2. Add `proben.io`
3. Add `www.proben.io` (redirect)
4. Configure DNS records as prompted
5. Wait for DNS propagation
6. Verify SSL certificate

## Database Setup

### Neon Database Configuration

#### 1. Create Neon Project
```bash
# Install Neon CLI
npm i -g neonctl

# Login
neonctl login

# Create project
neonctl projects create --name proben-io

# Get connection string
neonctl connection-string --name proben-io
```

#### 2. Configure Database
```bash
# Set connection string
export DATABASE_URL="postgresql://[user]:[password]@[host]/[database]"

# Run migrations
pnpm prisma migrate deploy

# Seed database
pnpm prisma db seed
```

#### 3. Branch Management
```bash
# Create development branch
neonctl branches create --name dev --parent-id [branch-id]

# Switch to branch
export DATABASE_URL="[dev-connection-string]"

# Merge branch
neonctl branches merge --branch-id [branch-id]
```

### Database Schema

#### Initial Schema
```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Example models
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Redis Cache Setup

### Upstash Configuration

#### 1. Create Upstash Database
- Go to Upstash dashboard
- Create new Redis database
- Select region closest to users
- Copy connection details

#### 2. Configure Environment
```bash
# Add to Vercel environment
REDIS_URL="[upstash-redis-url]"
REDIS_REST_URL="[upstash-rest-url]"
REDIS_REST_TOKEN="[upshift-rest-token]"
```

#### 3. Implement Caching
```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_REST_URL!,
  token: process.env.REDIS_REST_TOKEN!,
});

export async function get(key: string) {
  return await redis.get(key);
}

export async function set(key: string, value: any, ttl?: number) {
  return await redis.set(key, value, { ex: ttl });
}
```

## OAuth Provider Setup

### Google OAuth

#### 1. Create Google Cloud Project
1. Go to Google Cloud Console
2. Create new project
3. Enable Google+ API
4. Configure OAuth consent screen
5. Create OAuth 2.0 credentials

#### 2. Configure NextAuth
```bash
# Add environment variables
GOOGLE_CLIENT_ID="[google-client-id]"
GOOGLE_CLIENT_SECRET="[google-client-secret]"
```

#### 3. Configure Callback URLs
- Authorized redirect URI: `https://proben.io/api/auth/callback/google`

### Additional Providers

#### GitHub (optional)
- Create OAuth app in GitHub settings
- Configure callback URL
- Add client ID/secret to environment

#### Email/Password (optional)
- Configure email service
- Setup password hashing
- Implement email verification

## Monitoring Setup

### Sentry Configuration

#### 1. Create Sentry Project
1. Go to Sentry dashboard
2. Create new project
3. Select Next.js framework
4. Copy DSN

#### 2. Configure Application
```bash
# Add to environment
SENTRY_DSN="[sentry-dsn]"
SENTRY_AUTH_TOKEN="[sentry-auth-token]"
```

#### 3. Install SDK
```bash
pnpm add @sentry/nextjs
```

#### 4. Configure Sentry
```javascript
// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Analytics Setup

#### Vercel Analytics
```bash
# Install
pnpm add @vercel/analytics

# Add to layout
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Git Repository Setup

### GitHub Configuration

#### 1. Create Repository
```bash
# Create repository on GitHub
# Copy repository URL

# Initialize local repository
git init
git remote add origin git@github.com:username/proben.io.git
```

#### 2. Configure Branch Protection
- Main branch protection enabled
- Require pull request reviews
- Require status checks to pass
- Require branches to be up to date

#### 3. Configure GitHub Actions
- Enable workflows
- Configure required secrets
- Set up deployment notifications

## CI/CD Configuration

### GitHub Actions Workflows

#### 1. Create Workflow Directory
```bash
mkdir -p .github/workflows
```

#### 2. Add CI Workflow
```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: pnpm install
      - run: pnpm test
      - run: pnpm lint
      - run: pnpm type-check
```

#### 3. Add Deployment Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Security Configuration

### Environment Variable Management

#### 1. Vercel Environment Variables
- Set in dashboard
- Separate for preview/production
- Never commit to git
- Regular rotation schedule

#### 2. Git Secret Management
```bash
# Add .env.example
cp .env.example .env.local

# Update .gitignore
echo ".env.local" >> .gitignore
echo ".env.*.local" >> .gitignore
```

### Security Headers

#### Next.js Configuration
```javascript
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
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

## Verification Checklist

### Domain Verification
- [ ] DNS records configured
- [ ] DNS propagation complete
- [ ] SSL certificate active
- [ ] HTTP to HTTPS redirect working
- [ ] WWW redirect configured

### Application Verification
- [ ] Application builds successfully
- [ ] Environment variables configured
- [ ] Database connection working
- [ ] Redis connection working
- [ ] OAuth providers configured
- [ ] Monitoring integrated

### CI/CD Verification
- [ ] GitHub Actions enabled
- [ ] Tests passing in CI
- [ ] Deployment workflow configured
- [ ] Preview deployments working
- [ ] Production deployment working

### Security Verification
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] Environment variables secured
- [ ] Secrets not committed
- [ ] Rate limiting configured

## Troubleshooting

### Domain Issues

#### DNS Not Propagating
```bash
# Check propagation
dig proben.io

# Clear local DNS cache
# macOS
sudo dscacheutil -flushcache

# Linux
sudo systemd-resolve --flush-caches

# Windows
ipconfig /flushdns
```

#### SSL Certificate Issues
- Verify DNS records
- Wait for full propagation
- Check Vercel dashboard
- Re-issue certificate if needed

### Database Issues

#### Connection Failures
```bash
# Test connection
psql $DATABASE_URL

# Check firewall rules
# Verify IP whitelisting in Neon dashboard

# Test migrations
pnpm prisma migrate status
```

### Deployment Issues

#### Build Failures
```bash
# Check build logs
vercel logs

# Test build locally
pnpm build

# Verify dependencies
pnpm install
```

#### Runtime Errors
- Check environment variables
- Verify database schema
- Review server logs
- Test health endpoint

---

**Last Updated**: 2025-06-08
**Infrastructure Status**: Ready for Setup
**Related Docs**: `docs/DEPLOYMENT.md`, `docs/BUILD_PROCESS.md`
