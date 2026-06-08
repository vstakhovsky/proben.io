# Request Intake Skill

## Description

Provides structured intake for new feature requests, bug reports, and development tasks for Proben.io, ensuring all necessary information is collected before work begins.

## Triggers

- Manual: `/request-intake`
- On-demand: When starting new work
- Scheduled: Weekly triage of requests

## Request Types

### 1. Feature Requests
- New functionality
- Feature enhancements
- UX improvements
- Performance optimizations

### 2. Bug Reports
- Software defects
- Error reports
- Performance issues
- Integration problems

### 3. Infrastructure Requests
- Configuration changes
- Dependency updates
- Security patches
- Scaling requirements

### 4. Documentation Requests
- Documentation updates
- Knowledge base articles
- Process improvements
- Training materials

## Intake Process

### 1. Initial Classification
- Determine request type
- Assess urgency
- Identify impact area
- Assign category

### 2. Information Gathering
- Collect requirements
- Identify stakeholders
- Define acceptance criteria
- Estimate complexity

### 3. Validation
- Verify completeness
- Check for duplicates
- Validate feasibility
- Assess dependencies

### 4. Triage
- Prioritize request
- Assign owner
- Set timeline
- Create tracking issue

## Output Format

```markdown
# Request Intake: [Title]

## Request Details
- **Type**: [Feature/Bug/Infrastructure/Documentation]
- **Submitted By**: [Name]
- **Date**: [Timestamp]
- **Priority**: [Critical/High/Medium/Low]
- **Status**: [New/In Review/Approved/Rejected]

## Description
[Detailed description of request]

## Requirements
[What needs to be accomplished]

## Acceptance Criteria
[Definition of done]

## Impact Analysis
- **Affected Systems**: [List]
- **User Impact**: [Description]
- **Risk Level**: [High/Medium/Low]

## Estimation
- **Complexity**: [Simple/Medium/Complex]
- **Effort**: [Story points or hours]
- **Timeline**: [Expected completion]

## Dependencies
[What needs to happen first]

## Recommendations
[Next steps and decisions needed]
```

## Required Information

### For Feature Requests
- Business justification
- User stories/use cases
- Acceptance criteria
- Success metrics
- Alternative approaches

### For Bug Reports
- Steps to reproduce
- Expected behavior
- Actual behavior
- Error messages/logs
- Environment details

### For Infrastructure Requests
- Current state
- Desired state
- Risk assessment
- Rollback plan
- Testing requirements

## Prioritization Framework

### Critical (Immediate Action)
- Security vulnerabilities
- Data loss risks
- System outages
- Regulatory compliance

### High (This Sprint)
- User-facing bugs
- Feature requests with high value
- Performance issues
- Technical debt with high impact

### Medium (Next Sprint)
- Feature enhancements
- Documentation updates
- Process improvements
- Low-impact bugs

### Low (Backlog)
- Nice-to-have features
- Future considerations
- Research items
- Minor improvements

## Configuration

- Auto-respond: Enabled
- Triage schedule: Weekly
- Retention period: 1 year
- Access level: Team-wide
