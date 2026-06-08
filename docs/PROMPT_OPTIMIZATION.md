# Prompt Optimization - Proben.io

## Overview

This document outlines strategies and best practices for optimizing prompts when working with AI assistants on Proben.io. Well-optimized prompts lead to better code quality, faster development, and fewer iterations.

## Prompt Engineering Principles

### Core Principles

1. **Be Specific**: Use precise, unambiguous language
2. **Provide Context**: Include relevant background information
3. **Set Expectations**: Clearly define the desired output
4. **Use Examples**: Show, don't just tell
5. **Iterate**: Refine prompts based on results

### The "Perfect Prompt" Formula

```
[CONTEXT] → What you're working on
[CONSTRAINTS] → What you do/don't want
[EXAMPLES] → Similar patterns to follow
[OUTPUT] → Expected format and structure
[REVIEW] → What to check before delivering
```

## Prompt Patterns

### Pattern 1: Context-First Prompts

**Bad:**
```
Create a user form component.
```

**Good:**
```
Create a user registration form component for Proben.io.

Context:
- This is the first step in our onboarding flow
- Users provide: name, email, company (optional), role
- Using Next.js 15 with App Router and shadcn/ui
- Must match our existing design system

Requirements:
- Form validation with proper error messages
- Loading state for submission
- Accessible with proper ARIA labels
- Responsive design (mobile-first)

Output:
- Create the component file
- Add TypeScript types for form data
- Include basic tests
- Document any design decisions
```

### Pattern 2: Constraints-First Prompts

**Bad:**
```
Fix the authentication bug.
```

**Good:**
```
Fix the authentication bug where users stay logged out after login.

Constraints:
- Do NOT change the NextAuth configuration
- Do NOT modify the database schema
- MUST preserve existing session handling
- MUST maintain backward compatibility

Investigation:
- Check session callback in authOptions
- Verify cookie settings
- Review token refresh logic
- Test with different browsers

Expected Result:
- Users are properly redirected after login
- Session persists across page refreshes
- Logout functionality still works
```

### Pattern 3: Example-Driven Prompts

**Bad:**
```
Write tests for the user service.
```

**Good:**
```
Write comprehensive tests for the user service.

Follow this existing test pattern:
```typescript
describe('ProjectService', () => {
  it('should create project with valid data', async () => {
    const input = { name: 'Test Project', userId: testUser.id };
    const result = await createProject(input);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe('Test Project');
  });

  it('should reject duplicate project names', async () => {
    await createProject({ name: 'Duplicate', userId: testUser.id });
    await expect(
      createProject({ name: 'Duplicate', userId: testUser.id })
    ).rejects.toThrow();
  });
});
```

Apply the same pattern to UserService testing:
- Test valid user creation
- Test duplicate email rejection
- Test invalid email handling
- Test password requirements
```

## Domain-Specific Prompts

### Frontend Development Prompts

#### Component Creation
```
Create a [COMPONENT_NAME] component following our patterns:

Existing Pattern:
- Functional components with hooks
- TypeScript for props and types
- shadcn/ui for base components
- Tailwind for styling
- Accessibility-first approach

Requirements:
- [SPECIFIC_REQUIREMENTS]
- [ACCEPTANCE_CRITERIA]

Include:
- Component file
- Props interface
- Basic tests
- Story (if using Storybook)
```

#### State Management
```
Implement state management for [FEATURE]:

Considerations:
- Should this be global or component state?
- Do we need persistence?
- What's the update frequency?

Using:
- Zustand for global state
- React hooks for local state
- Server components when possible

Provide:
- State store definition
- Type definitions
- Usage examples
- Tests for state transitions
```

### Backend Development Prompts

#### API Route Creation
```
Create API route: [METHOD] /api/[ROUTE]

Following our API patterns:
- Proper HTTP status codes
- Request validation with schemas
- Error handling with messages
- Response typing
- Rate limiting for public endpoints

Requirements:
- [BUSINESS_LOGIC]
- [VALIDATION_RULES]
- [AUTHORIZATION_CHECKS]

Include:
- Route handler
- Validation schema
- Error handling
- Integration tests
- OpenAPI documentation
```

#### Database Operations
```
Create database operation for [ENTITY]:

Using Prisma ORM:
- Follow existing schema patterns
- Use transactions for multi-step operations
- Handle connection errors
- Log queries in development

Requirements:
- [OPERATION_TYPE]
- [BUSINESS_RULES]
- [PERFORMANCE_CONSIDERATIONS]

Provide:
- Prisma query code
- Error handling
- Type definitions
- Unit tests
```

### AI Integration Prompts

#### Claude API Integration
```
Integrate Claude API for [USE_CASE]:

Requirements:
- Model: claude-3-5-sonnet-20241022
- Max tokens: [LIMIT]
- Streaming: [YES/NO]
- Caching: [ENABLE_IF_BENEFICIAL]

Implement:
- API call with proper error handling
- Token usage tracking
- Rate limiting
- Cost monitoring
- Fallback handling

Include:
- Service module
- Type definitions
- Tests for various scenarios
- Monitoring hooks
```

## Debugging Prompts

### Issue Investigation
```
Investigate this issue:
[ERROR_MESSAGE or PROBLEM_DESCRIPTION]

Investigation checklist:
1. When does this occur? [CONTEXT]
2. What's the expected behavior? [EXPECTED]
3. What's actually happening? [ACTUAL]
4. Recent changes that might affect this?
5. Error messages or stack traces?

Focus on:
- Root cause analysis
- Not just symptoms
- Potential side effects
- Similar issues in codebase

Deliver:
- Root cause explanation
- Proposed fix
- Tests to prevent regression
- Related code that needs review
```

### Performance Investigation
```
Investigate performance issue:
[SLOW_COMPONENT or API_ENDPOINT]

Measurements:
- Current: [METRICS]
- Expected: [TARGET_METRICS]

Investigation:
1. Profile the code
2. Identify bottlenecks
3. Check for N+1 queries
4. Review bundle size
5. Analyze render cycles

Propose:
- Specific optimizations
- Expected improvements
- Trade-offs considered
- Implementation priority
```

## Code Review Prompts

### Review Request
```
Review this code for [SCOPE]:

Files changed:
- [LIST_FILES]

Review focus:
- [SECURITY_CONCERNS]
- [PERFORMANCE_ISSUES]
- [CODE_QUALITY]
- [TEST_COVERAGE]
- [DOCUMENTATION_GAPS]

Checklist:
- Follows project patterns?
- Proper error handling?
- Security vulnerabilities?
- Type safety?
- Test coverage?
- Performance implications?

Provide:
- Line-by-line feedback
- Blocker vs. nitpick classification
- Suggested improvements
- Questions about design decisions
```

### Security Review Request
```
Perform security review of [CHANGES]:

Security focus:
- Input validation
- Output sanitization
- Authentication/authorization
- Data exposure
- Injection vulnerabilities
- Authentication bypass

Standards:
- OWASP Top 10
- Project security guidelines
- Industry best practices

Deliver:
- Vulnerability findings
- Severity classification
- Exploitation scenarios
- Remediation steps
- Prevention strategies
```

## Refactoring Prompts

### Code Improvement
```
Refactor this code for better [QUALITY_ATTRIBUTE]:

Current code:
[PASTE_CODE]

Issues:
- [SPECIFIC_PROBLEMS]
- [TECHNICAL_DEBT]
- [MAINTAINABILITY_CONCERNS]

Goals:
- Improve [READABILITY/PERFORMANCE/TESTABILITY]
- Maintain existing functionality
- Add tests if missing
- Update documentation

Constraints:
- Don't break existing APIs
- Maintain backward compatibility
- Keep changes focused
- Add migration guide if needed
```

### Modernization
```
Modernize [COMPONENT/MODULE]:

Current tech:
- [CURRENT_APPROACH]

Target tech:
- [MODERN_APPROACH]

Migration scope:
- [SCOPE_OF_CHANGES]

Considerations:
- Breaking changes
- Migration path
- Testing requirements
- Documentation updates

Provide:
- Modernized code
- Migration guide
- Backward compatibility notes
- Rollback plan if needed
```

## Testing Prompts

### Test Generation
```
Generate tests for [COMPONENT/FUNCTION]:

Code to test:
[PASTE_CODE_OR_REFERENCE]

Test coverage needed:
- Unit tests for business logic
- Integration tests for dependencies
- E2E tests for user flows
- Edge cases and error handling
- Accessibility tests (if UI)

Test framework:
- Vitest for unit/integration
- Playwright for E2E
- Testing Library for React

Include:
- Test suite structure
- Mock/stub setup
- Test data fixtures
- Assertion strategies
```

### Test Improvement
```
Improve these tests:

Current tests:
[PASTE_TEST_CODE]

Issues:
- [TEST_PROBLEMS]
- [MAINTENANCE_ISSUES]
- [FLAKY_TESTS]

Goals:
- More reliable tests
- Better coverage
- Faster execution
- Clearer intent

Focus on:
- Test isolation
- Proper mocking
- Clear assertions
- Good test data
- Descriptive test names
```

## Prompt Templates

### Template 1: Feature Implementation
```
# Feature: [FEATURE_NAME]

## Context
[BACKGROUND_INFO]

## Requirements
- [REQUIREMENT_1]
- [REQUIREMENT_2]
- [REQUIREMENT_3]

## Technical Details
- Stack: [TECH_STACK]
- Pattern to follow: [EXISTING_PATTERN]
- Dependencies: [EXTERNAL_SERVICES]

## Acceptance Criteria
- [CRITERION_1]
- [CRITERION_2]
- [CRITERION_3]

## Deliverables
1. Implementation code
2. Tests (unit + integration)
3. Documentation updates
4. Migration notes (if breaking)

## Constraints
- [CONSTRAINT_1]
- [CONSTRAINT_2]

## Review Checklist
- [ ] Code follows patterns
- [ ] Tests pass
- [ ] No security issues
- [ ] Documentation updated
```

### Template 2: Bug Fix
```
# Bug: [BUG_TITLE]

## Problem
[BUG_DESCRIPTION]

## Expected Behavior
[SHOULD_HAPPEN]

## Actual Behavior
[ACTUALLY_HAPPENS]

## Steps to Reproduce
1. [STEP_1]
2. [STEP_2]
3. [STEP_3]

## Environment
- Browser/Environment: [ENV_DETAILS]
- User: [AFFECTED_USERS]

## Investigation Areas
- [AREA_1]
- [AREA_2]

## Fix Requirements
- [FIX_REQUIREMENT_1]
- [FIX_REQUIREMENT_2]

## Testing
- Test case that reproduces bug
- Verify fix works
- Check for regressions
```

## Common Mistakes to Avoid

### Mistake 1: Vague Requirements
❌ "Make it better"
✅ "Improve load time by reducing initial bundle size"

### Mistake 2: Missing Context
❌ "Fix the login"
✅ "Fix the login bug where users stay logged out after entering valid credentials"

### Mistake 3: Ignoring Constraints
❌ "Add feature X"
✅ "Add feature X but don't break existing Y and Z integrations"

### Mistake 4: No Examples
❌ "Write tests like we usually do"
✅ "Write tests following this pattern: [EXAMPLE]"

### Mistake 5: Unclear Output
❌ "Handle this"
✅ "Provide: 1) Implementation, 2) Tests, 3) Documentation update"

## Advanced Techniques

### Chain of Thought Prompting
```
Let's think through this step by step:

1. First, analyze the requirements
2. Then, consider the constraints
3. Next, propose approaches
4. Finally, implement the best solution

For [TASK]:

Step 1: [ANALYSIS]
Step 2: [CONSTRAINTS]
Step 3: [APPROACHES]
Step 4: [IMPLEMENTATION]
```

### Few-Shot Prompting
```
Here are examples of how we handle similar situations:

Example 1: [SIMPLE_CASE]
Solution: [APPROACH]

Example 2: [COMPLEX_CASE]
Solution: [APPROACH]

Now handle: [CURRENT_CASE]
```

### Self-Reflection Prompting
```
After implementing, verify:
1. Does this meet all requirements?
2. Are there edge cases missed?
3. Is this maintainable?
4. What could go wrong?

If any concerns, address them before final delivery.
```

## Measuring Prompt Effectiveness

### Metrics
- **Iterations**: How many refinement cycles?
- **Success Rate**: Does output work on first try?
- **Quality**: Does code meet standards?
- **Time**: How long from prompt to working code?

### Optimization Cycle
1. **Analyze**: Review prompt and output
2. **Identify**: Find improvement areas
3. **Refine**: Update prompt
4. **Test**: Try on similar tasks
5. **Document**: Save effective patterns

---

**Last Updated**: 2025-06-08
**Related Docs**: `CLAUDE.md`, `docs/GUARDRAILS.md`, `.claude/skills/prompt-optimization/SKILL.md`
