# Security Review Skill

## Description

Performs comprehensive security analysis of pending code changes in Proben.io, identifying vulnerabilities, security anti-patterns, and compliance issues.

## Triggers

- Manual: `/security-review`
- Pre-merge: Automatic for sensitive changes
- Post-commit: For security-related files

## Review Areas

### 1. Input Validation
- Check for user input sanitization
- Verify parameterized queries
- Validate file upload handling
- Review API input validation

### 2. Output Encoding
- Check for XSS vulnerabilities
- Verify HTML escaping
- Review JSON serialization
- Check template injection risks

### 3. Authentication & Authorization
- Verify authentication implementation
- Check authorization on all routes
- Review session management
- Verify MFA implementation

### 4. Data Protection
- Check for sensitive data exposure
- Verify encryption implementation
- Review logging practices
- Check error messages for info leaks

### 5. Dependencies
- Scan for vulnerable packages
- Review dependency updates
- Check supply chain risks
- Verify license compliance

## Output Format

```markdown
# Security Review Report

## Summary
[Brief overview of findings]

## Critical Issues
[List critical vulnerabilities with fixes]

## High Issues
[List high-severity issues]

## Medium Issues  
[List medium-severity issues]

## Low Issues
[List low-severity issues and recommendations]

## Remediation Plan
[Prioritized action items]
```

## Configuration

- Severity thresholds: Critical, High, Medium, Low
- Auto-fail on: Critical issues
- Required reviewers: Security lead
