# Evaluation and Testing Framework - Proben.io

## Overview

This document defines the evaluation and testing framework for Proben.io. It covers unit testing, integration testing, end-to-end testing, and AI system evaluation.

## Testing Philosophy

### Core Principles
- **Test-Driven Development**: Write tests before implementation
- **Fast Feedback**: Quick test execution for rapid iteration
- **Reliable Tests**: Tests should be deterministic and independent
- **Comprehensive Coverage**: Test critical paths and edge cases
- **Maintainable Tests**: Tests should be easy to understand and update

### Testing Pyramid

```
           E2E Tests
          (5-10%)
         /          \
    Integration Tests
       (20-30%)
     /              \
  Unit Tests
    (60-80%)
```

## Unit Testing

### Framework: Vitest

Unit tests focus on individual functions and components in isolation.

### Structure

```typescript
// Feature: User validation
describe('User Validation', () => {
  describe('validateEmail', () => {
    it('should accept valid email addresses', () => {
      const result = validateEmail('user@example.com');
      expect(result).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      const result = validateEmail('invalid-email');
      expect(result).toBe(false);
    });

    it('should handle null input', () => {
      const result = validateEmail(null);
      expect(result).toBe(false);
    });
  });
});
```

### Best Practices

- **Descriptive Tests**: Use clear, descriptive test names
- **One Assertion per Test**: Prefer multiple tests over multiple assertions
- **Arrange-Act-Assert**: Structure tests clearly
- **Test Edge Cases**: Include null, undefined, boundary values
- **Mock External Dependencies**: Isolate the unit under test

### Component Testing

```typescript
// Testing React components
describe('UserProfile', () => {
  it('should render user information', () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com' };
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should show loading state', () => {
    render(<UserProfile user={null} isLoading={true} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<UserProfile user={mockUser} />);
    
    await user.click(screen.getByRole('button', { name: 'Edit' }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
```

## Integration Testing

### API Integration Tests

Test API routes and database interactions.

```typescript
// Testing API routes
describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: 'John', email: 'john@example.com' }),
    });
    
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data.name).toBe('John');
  });

  it('should reject duplicate email', async () => {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name: 'Jane', email: 'john@example.com' }),
    });
    
    expect(response.status).toBe(409);
  });
});
```

### Database Integration Tests

```typescript
// Testing database operations
describe('UserRepository', () => {
  beforeEach(async () => {
    await truncateDatabase();
  });

  it('should save and retrieve user', async () => {
    const user = await createUser({ name: 'John', email: 'john@example.com' });
    const found = await findUserById(user.id);
    
    expect(found).not.toBeNull();
    expect(found.name).toBe('John');
  });

  it('should handle transaction rollback', async () => {
    await expect(createUserWithInvalidData()).rejects.toThrow();
    const count = await countUsers();
    expect(count).toBe(0);
  });
});
```

## End-to-End Testing

### Framework: Playwright

E2E tests verify complete user workflows.

### Test Structure

```typescript
// E2E test example
test('user registration flow', async ({ page }) => {
  // Navigate to registration
  await page.goto('/register');
  
  // Fill registration form
  await page.fill('[name="name"]', 'John Doe');
  await page.fill('[name="email"]', 'john@example.com');
  await page.fill('[name="password"]', 'SecurePassword123!');
  
  // Submit form
  await page.click('button[type="submit"]');
  
  // Verify success
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toContainText('Welcome');
});
```

### Critical User Flows

1. **User Registration**: Sign up, verify email, login
2. **Project Creation**: Create, edit, delete projects
3. **Data Management**: CRUD operations with proper validation
4. **Authentication**: Login, logout, password reset
5. **Error Handling**: Invalid input, server errors, network failures

### E2E Test Guidelines

- **User-Centric**: Test from user perspective
- **Realistic Data**: Use production-like data
- **Independent Tests**: Each test should be independent
- **Proper Cleanup**: Clean up test data after tests
- **Visual Regression**: Compare visual output with baselines

## AI System Evaluation

### Claude API Integration Tests

```typescript
// Testing AI features
describe('Claude Integration', () => {
  it('should generate content successfully', async () => {
    const result = await generateContent('Write a summary');
    
    expect(result).toHaveProperty('content');
    expect(result.content.length).toBeGreaterThan(0);
    expect(result).toHaveProperty('usage');
  });

  it('should handle rate limits gracefully', async () => {
    // Make multiple requests
    const requests = Array(10).fill(null).map(() => 
      generateContent('Test prompt')
    );
    
    const results = await Promise.allSettled(requests);
    const failed = results.filter(r => r.status === 'rejected');
    
    expect(failed.length).toBeGreaterThan(0);
  });

  it('should track token usage', async () => {
    const result = await generateContent('Test prompt');
    
    expect(result.usage.inputTokens).toBeGreaterThan(0);
    expect(result.usage.outputTokens).toBeGreaterThan(0);
  });
});
```

### Quality Metrics

#### Response Quality
- Relevance: Does it address the prompt?
- Accuracy: Is the information correct?
- Completeness: Does it fully answer?
- Clarity: Is it easy to understand?

#### Performance Metrics
- Latency: Response time < 3 seconds
- Throughput: Requests per second
- Error Rate: < 1% failure rate
- Token Efficiency: Tokens per result

#### Safety Metrics
- Content filtering: No harmful content
- PII detection: No personal data leakage
- Rate limiting: Proper throttling
- Cost control: Budget management

## Performance Testing

### Load Testing

```typescript
// Load test example
describe('Load Testing', () => {
  it('should handle 100 concurrent users', async () => {
    const concurrency = 100;
    const requests = Array(concurrency).fill(null).map(() =>
      fetch('/api/projects')
    );
    
    const results = await Promise.all(requests);
    const successful = results.filter(r => r.ok).length;
    
    expect(successful).toBeGreaterThan(concurrency * 0.95);
  });
});
```

### Performance Benchmarks

- **API Response Time**: P95 < 200ms
- **Page Load Time**: P95 < 2s
- **Database Queries**: P95 < 50ms
- **Memory Usage**: Stable under load

## Accessibility Testing

### Automated A11y Tests

```typescript
// Accessibility tests
describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const page = await browser.newPage();
    await page.goto('/');
    
    const violations = await axeCheck(page);
    expect(violations).toHaveLength(0);
  });
});
```

### A11y Requirements

- **WCAG 2.1 AA**: Compliance target
- **Keyboard Navigation**: All features accessible via keyboard
- **Screen Reader**: Compatible with JAWS, NVDA, VoiceOver
- **Color Contrast**: Minimum 4.5:1 for text
- **Focus Indicators**: Visible focus states

## Test Coverage

### Coverage Targets

- **Overall**: > 80% code coverage
- **Critical Paths**: 100% coverage
- **API Routes**: > 90% coverage
- **Components**: > 75% coverage

### Coverage Reports

```bash
# Generate coverage report
pnpm test:coverage

# View coverage report
open coverage/index.html
```

### Continuous Coverage

- Track coverage in CI/CD
- Block PRs that reduce coverage
- Review uncovered code regularly
- Set coverage goals per module

## Test Data Management

### Fixtures

```typescript
// Test fixtures
export const mockUsers = {
  valid: {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePassword123!'
  },
  invalid: {
    name: '',
    email: 'invalid-email',
    password: '123'
  }
};
```

### Factories

```typescript
// Factory for test data
export const userFactory = (overrides = {}) => ({
  id: faker.uuid(),
  name: faker.name.fullName(),
  email: faker.internet.email(),
  createdAt: new Date(),
  ...overrides
});
```

### Database Seeding

```typescript
// Seed test database
export async function seedTestDatabase() {
  await createTestUser();
  await createTestProject();
  await createTestData();
}
```

## Continuous Testing

### CI/CD Integration

```yaml
# Example CI test steps
- name: Run Unit Tests
  run: pnpm test

- name: Run E2E Tests
  run: pnpm test:e2e

- name: Check Coverage
  run: pnpm test:coverage --threshold=80

- name: Security Audit
  run: pnpm audit
```

### Pre-commit Hooks

```bash
# Run tests before commit
#!/bin/sh
pnpm test --changed
pnpm lint --changed
```

## Test Documentation

### Test Catalog

Maintain a catalog of tests with:
- Test name and description
- Requirements covered
- Test data used
- Expected results
- Owner and review date

### Test Reports

Generate regular reports on:
- Test pass rates
- Coverage trends
- Flaky test identification
- Performance metrics
- Quality improvement suggestions

## Troubleshooting

### Common Issues

**Flaky Tests**
- Identify race conditions
- Improve test isolation
- Add proper waits/timeouts
- Use deterministic test data

**Slow Tests**
- Optimize database operations
- Use test doubles appropriately
- Parallelize independent tests
- Profile performance bottlenecks

**High Maintenance**
- Reduce test duplication
- Improve test utilities
- Update test data strategies
- Clarify test purposes

---

**Last Updated**: 2025-06-08
**Test Framework**: Vitest + Playwright
**Coverage Target**: > 80%
