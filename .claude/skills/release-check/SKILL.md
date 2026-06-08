# Release Check Skill

## Description

Performs comprehensive pre-release validation for Proben.io deployments, ensuring all quality gates are passed and release readiness is confirmed.

## Triggers

- Manual: `/release-check`
- Pre-deploy: Automatic before production releases
- Scheduled: Weekly smoke tests

## Check Categories

### 1. Code Quality
- [ ] All tests passing
- [ ] Type checking clean
- [ ] Linting passing
- [ ] Code coverage maintained (>80%)
- [ ] No TODO/FIXME in critical paths

### 2. Security
- [ ] Security review passed
- [ ] No vulnerable dependencies
- [ ] Secrets not committed
- [ ] Security headers configured
- [ ] Authentication/authorization verified

### 3. Performance
- [ ] Build size within limits
- [ ] Load time targets met
- [ ] Core Web Vitals passing
- [ ] API response times acceptable
- [ ] Database queries optimized

### 4. Functionality
- [ ] Critical user flows working
- [ ] API endpoints responding
- [ ] Database migrations applied
- [ ] External integrations working
- [ ] Error handling functioning

### 5. Documentation
- [ ] README updated
- [ ] CHANGELOG updated
- [ ] Migration guides provided
- [ ] API docs current
- [ ] ADRs updated

### 6. Deployment
- [ ] Environment variables configured
- [ ] DNS records correct
- [ ] SSL certificates valid
- [ ] Monitoring active
- [ ] Rollback plan ready

## Output Format

```markdown
# Release Check Report

## Release Information
- **Version**: [Version number]
- **Environment**: [Staging/Production]
- **Date**: [Timestamp]
- **Status**: [PASS/FAIL]

## Check Results

### Code Quality
- Tests: ✅ PASS
- Type Check: ✅ PASS
- Linting: ✅ PASS
- Coverage: ✅ PASS (82%)
- **Status**: ✅ PASS

### Security
- Security Review: ✅ PASS
- Dependencies: ✅ PASS
- Secrets Check: ✅ PASS
- Headers: ✅ PASS
- **Status**: ✅ PASS

### Performance
- Build Size: ⚠️ WARNING (+15KB)
- Load Time: ✅ PASS
- Core Web Vitals: ✅ PASS
- API Response: ✅ PASS
- **Status**: ⚠️ WARNING

### Functionality
- User Flows: ✅ PASS
- API Endpoints: ✅ PASS
- Migrations: ✅ PASS
- Integrations: ✅ PASS
- **Status**: ✅ PASS

### Documentation
- README: ✅ PASS
- CHANGELOG: ❌ FAIL (missing)
- Migration Guide: N/A
- API Docs: ✅ PASS
- **Status**: ❌ FAIL

### Deployment
- Environment: ✅ PASS
- DNS: ✅ PASS
- SSL: ✅ PASS
- Monitoring: ✅ PASS
- Rollback Plan: ✅ PASS
- **Status**: ✅ PASS

## Overall Status
❌ FAIL - 1 category failed

## Blockers
1. CHANGELOG not updated

## Warnings
1. Build size increased by 15KB

## Recommendations
1. Update CHANGELOG with release notes
2. Investigate build size increase
3. Address blockers before deploying

## Approval
- [ ] Technical Lead: _______
- [ ] Security Lead: _______
- [ ] Product Owner: _______
```

## Pre-Release Checklist

### 24 Hours Before Release
- [ ] Run full test suite
- [ ] Perform security review
- [ ] Check dependencies for updates
- [ ] Review error rates
- [ ] Verify monitoring setup

### 1 Hour Before Release
- [ ] Verify environment variables
- [ ] Check DNS configuration
- [ ] Verify SSL certificates
- [ ] Test rollback procedure
- [ ] Notify team of release

### Immediately Before Release
- [ ] Final smoke test
- [ ] Verify no active incidents
- [ ] Check system health
- [ ] Verify capacity available
- [ ] Get final approval

## Post-Release Checks

### Immediately After Release
- [ ] Verify deployment successful
- [ ] Run smoke tests
- [ ] Check error rates
- [ ] Monitor performance
- [ ] Verify key functionality

### 1 Hour After Release
- [ ] Review error logs
- [ ] Check user reports
- [ ] Monitor performance metrics
- [ ] Verify analytics tracking
- [ ] Check third-party integrations

### 24 Hours After Release
- [ ] Review all metrics
- [ ] Address any issues
- [ ] Document any incidents
- [ ] Update runbook
- [ ] Archive release notes

## Rollback Criteria

Release should be rolled back if:
- Critical user flows fail
- Error rate increases >50%
- Performance degrades significantly
- Security vulnerability detected
- Data integrity issues found

## Configuration

- Auto-deploy: Disabled (requires approval)
- Test timeout: 10 minutes
- Retry attempts: 3
- Required approvers: 2
- Notification channels: Slack, email
