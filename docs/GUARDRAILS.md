# AI Development Guardrails - Proben.io

## Overview

This document defines guardrails and constraints for AI-assisted development on Proben.io. These ensure safe, reliable, and maintainable code generation while leveraging AI capabilities effectively.

## Core Guardrails

### What AI Assistants CAN Do

- Write production code following established patterns
- Generate tests based on requirements
- Refactor existing code for better quality
- Debug issues and propose solutions
- Write documentation and comments
- Create configuration files
- Analyze code and suggest improvements
- Implement well-defined features

### What AI Assistants CANNOT Do

- Make architectural decisions without human review
- Deploy code to production
- Commit to main branch
- Modify security configurations without approval
- Make breaking changes without explicit request
- Access external systems or APIs
- Handle sensitive data or secrets
- Make decisions about user experience
- Change project scope or requirements

## Code Generation Constraints

### Mandatory Safeguards

#### Before Writing Code
1. **Requirement Verification**
   - Confirm requirements are clear and specific
   - Identify affected components and dependencies
   - Check for existing implementations
   - Verify alignment with architecture

2. **Security Review**
   - Check for security implications
   - Validate input sanitization
   - Verify authorization requirements
   - Review data handling practices

3. **Test Planning**
   - Design test cases before implementation
   - Identify edge cases and error conditions
   - Plan for integration testing
   - Define success criteria

#### During Code Generation
1. **Code Quality Standards**
   - Follow TypeScript best practices
   - Use proper error handling
   - Implement logging appropriately
   - Maintain accessibility standards

2. **Dependency Management**
   - Use existing dependencies when possible
   - Justify new dependency additions
   - Check for security vulnerabilities
   - Consider bundle size impact

3. **Documentation Requirements**
   - Document non-obvious implementations
   - Explain complex algorithms
   - Reference related architecture decisions
   - Update relevant documentation

#### After Code Generation
1. **Validation**
   - Verify code compiles without errors
   - Check for type safety
   - Validate against requirements
   - Review for security issues

2. **Testing**
   - Generate comprehensive tests
   - Include unit and integration tests
   - Test edge cases
   - Verify test coverage

3. **Review Preparation**
   - Summarize changes made
   - Highlight potential issues
   - Suggest review focus areas
   - Document trade-offs

## Specific Guardrails

### Database Operations

#### ALLOWED
- Creating Prisma models following schema
- Writing database queries with Prisma
- Creating migrations for schema changes
- Seeding test data

#### NOT ALLOWED
- Direct SQL without Prisma (exceptional cases only)
- Modifying production database schema without review
- Deleting data without backup verification
- B ORM query optimization without metrics

#### Example
```typescript
// ✅ ALLOWED - Using Prisma with proper error handling
const user = await prisma.user.findUnique({
  where: { email: userInput.email },
  select: { id: true, name: true }
});

// ❌ NOT ALLOWED - Direct SQL injection risk
const query = `SELECT * FROM users WHERE email = '${userInput.email}'`;
```

### API Development

#### ALLOWED
- Creating new API routes following patterns
- Implementing validation with schemas
- Adding proper error responses
- Implementing rate limiting
- Writing API documentation

#### NOT ALLOWED
- Exposing sensitive data in responses
- Bypassing authentication/authorization
- Returning raw error messages to clients
- Implementing CORS without proper restrictions

#### Example
```typescript
// ✅ ALLOWED - Proper validation and error handling
export async function POST(request: Request) {
  const body = await request.json();
  const validated = await userSchema.parseAsync(body);
  const result = await createUser(validated);
  return NextResponse.json(result, { status: 201 });
}

// ❌ NOT ALLOWED - No validation or error handling
export async function POST(request: Request) {
  const body = await request.json();
  const result = await createUser(body);
  return NextResponse.json(result);
}
```

### Authentication & Authorization

#### ALLOWED
- Implementing authentication using NextAuth
- Adding role-based access control
- Creating permission helpers
- Implementing session management
- Writing authentication tests

#### NOT ALLOWED
- Implementing custom crypto (use established libraries)
- Storing passwords in plain text
- Creating authentication bypasses
- Implementing weak password policies
- Exposing session tokens in logs

#### Example
```typescript
// ✅ ALLOWED - Using NextAuth with proper configuration
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: { ...session.user, id: token.sub },
    }),
  },
};

// ❌ NOT ALLOWED - Custom insecure implementation
export async function insecureAuth(email: string, password: string) {
  const user = await findByEmail(email);
  return user?.password === password; // Plain text comparison!
}
```

### Frontend Development

#### ALLOWED
- Creating React components following patterns
- Using shadcn/ui components
- Implementing form validation
- Adding loading states
- Implementing error boundaries
- Writing component tests

#### NOT ALLOWED
- Creating components without accessibility
- Implementing insecure client-side auth checks
- Exposing sensitive data in client code
- Using eval() or similar dangerous functions
- Implementing client-only security

#### Example
```typescript
// ✅ ALLOWED - Accessible form component
export function UserForm() {
  const { register, handleSubmit } = useForm<UserFormData>();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="User form">
      <Input {...register('name')} aria-required="true" />
      <ErrorMessage errors={errors} name="name" />
    </form>
  );
}

// ❌ NOT ALLOWED - Inaccessible and insecure
export function UserForm() {
  const [name, setName] = useState('');
  
  return (
    <form onSubmit={() => saveUser({ name })}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </form>
  );
}
```

### AI Integration

#### ALLOWED
- Calling Anthropic API with proper error handling
- Implementing prompt caching
- Creating streaming responses
- Tracking token usage
- Implementing rate limiting
- Testing AI features

#### NOT ALLOWED
- Exposing API keys in client code
- Making unlimited API calls
- Storing full AI responses in logs
- Implementing AI without cost controls
- Passing user data without sanitization

#### Example
```typescript
// ✅ ALLOWED - Proper AI integration
export async function generateContent(prompt: string) {
  const sanitized = sanitizePrompt(prompt);
  const result = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [{ role: 'user', content: sanitized }],
  });
  
  trackTokenUsage(result.usage);
  return result;
}

// ❌ NOT ALLOWED - Insecure and unlimited
export async function generateContent(prompt: string) {
  const result = await anthropic.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 100000, // No limit!
    messages: [{ role: 'user', content: prompt }], // Not sanitized
  });
  return result;
}
```

## Workflow Constraints

### Development Process

#### Required Steps
1. **Planning Phase**
   - Create/update ADR for significant changes
   - Identify requirements and constraints
   - Plan testing approach
   - Estimate impact

2. **Implementation Phase**
   - Write tests before code (TDD)
   - Implement following patterns
   - Document non-obvious decisions
   - Run security review

3. **Validation Phase**
   - All tests must pass
   - Type checking must pass
   - Linting must pass
   - Security review must pass

4. **Review Phase**
   - Create descriptive PR
   - Address review feedback
   - Update documentation
   - Verify deployment readiness

#### Forbidden Actions
- Skipping tests for "temporary" solutions
- Committing directly to main
- Deploying without review
- Modifying security configs
- Changing data without migration

### Change Management

#### Require Approval For
- Breaking changes
- Security-related changes
- Database schema changes
- API interface changes
- Dependency updates (major versions)

#### Require Documentation For
- New features
- Bug fixes (non-trivial)
- Configuration changes
- Architecture decisions
- Performance optimizations

## Quality Gates

### Pre-commit Checks
- [ ] No TypeScript errors
- [ ] All tests pass
- [ ] Linting passes
- [ ] No secrets committed
- [ ] Code follows patterns

### Pre-merge Checks
- [ ] CI/CD passes
- [ ] Security review passed
- [ ] Test coverage maintained
- [ ] Documentation updated
- [ ] Performance validated

### Pre-deployment Checks
- [ ] All merge checks passed
- [ ] Smoke tests passed
- [ ] Monitoring configured
- [ ] Rollback plan ready
- [ ] Security audit passed

## Error Handling

### Mandatory Error Handling
```typescript
// ✅ CORRECT - Comprehensive error handling
export async function getUser(id: string) {
  try {
    if (!isValidUuid(id)) {
      throw new BadRequestError('Invalid user ID');
    }
    
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    return user;
  } catch (error) {
    logger.error('Failed to get user', { id, error });
    throw error;
  }
}

// ❌ INCORRECT - No error handling
export async function getUser(id: string) {
  return await prisma.user.findUnique({ where: { id } });
}
```

## Logging and Monitoring

### Required Logging
- All API errors
- Authentication failures
- Authorization failures
- Security events
- Performance issues

### Forbidden Logging
- Passwords (even hashed)
- API keys
- Personal information
- Session tokens
- Sensitive user data

## Review Process

### When AI Generates Code
1. **Human Review Required**
   - All code must be reviewed by human
   - Security review for sensitive changes
   - Architecture review for significant changes
   - Performance review for critical paths

2. **Review Focus Areas**
   - Security vulnerabilities
   - Performance implications
   - Architectural alignment
   - Code quality
   - Test coverage

3. **Approval Requirements**
   - One approval for normal changes
   - Two approvals for security changes
   - Architect approval for breaking changes
   - Security lead approval for auth changes

## Exception Handling

### Emergency Exceptions
- Security vulnerabilities (immediate fix)
- Production outages (hotfix process)
- Data loss prevention (immediate action)

### Exception Process
1. Document the exception
2. Implement temporary fix
3. Create follow-up issue
4. Schedule proper fix
5. Review and learn

## Compliance and Enforcement

### Automated Enforcement
- CI/CD checks for all changes
- Pre-commit hooks for code quality
- Automated security scanning
- Dependency vulnerability checks

### Manual Enforcement
- Code review process
- Architecture review board
- Security review process
- Quality assurance testing

---

**Last Updated**: 2025-06-08
**Version**: 1.0
**Related Docs**: `docs/SECURITY.md`, `CLAUDE.md`, `docs/EVALS.md`
