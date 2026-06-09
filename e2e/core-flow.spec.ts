import { test, expect } from '@playwright/test';

test.describe('Core User Flow', () => {
  test('landing page loads', async ({ page }) => {
    await page.goto('/');

    // Check title and heading
    await expect(page).toHaveTitle(/Proben.io/);
    await expect(page.locator('h1')).toContainText('Know what to fix');

    // Check CTA buttons using stable test IDs
    await expect(page.getByTestId('hero-run-readiness-check')).toBeVisible();
    await expect(page.getByTestId('hero-sample-report')).toBeVisible();
  });

  test('navigation works between pages', async ({ page }) => {
    await page.goto('/');

    // Navigate to readiness check using nav link
    await page.click('nav a:has-text("Run readiness check")');
    await expect(page).toHaveURL(/\/app\/readiness-check/);

    // Navigate to sample report
    await page.goto('/');
    await page.click('nav a:has-text("Sample report")');
    await expect(page).toHaveURL(/\/sample-report/);
    await expect(page.locator('h1')).toContainText('Sample Readiness Report');

    // Navigate back to home via logo
    await page.click('nav a:has-text("Proben")');
    await expect(page).toHaveURL('/');
  });

  test('readiness check demo works', async ({ page }) => {
    await page.goto('/app/readiness-check');

    // Check form is present using stable test IDs
    await expect(page.getByTestId('readiness-context-input')).toBeVisible();
    await expect(page.getByTestId('readiness-submit-button')).toBeVisible();

    // Fill form
    await page.fill('[data-testid="readiness-context-input"]', 'Strategy review meeting where I need to present a roadmap pivot to leadership.');

    // Submit form
    await page.click('[data-testid="readiness-submit-button"]');

    // Wait for results (simulated analysis delay)
    await page.waitForSelector('text=Your Readiness Results', { timeout: 5000 });

    // Check results are displayed
    await expect(page.getByTestId('readiness-result')).toBeVisible();
    await expect(page.locator('text=/Overall Readiness/')).toBeVisible();
  });

  test('sample report displays correctly', async ({ page }) => {
    await page.goto('/sample-report');

    // Check sample report content
    await expect(page.locator('h1')).toContainText('Sample Readiness Report');
    await expect(page.locator('text=/6.2\\/10/')).toBeVisible();
    await expect(page.locator('text=Partly ready')).toBeVisible();
    await expect(page.locator('text=Context Gaps')).toBeVisible();
    await expect(page.locator('text=Top Fixes')).toBeVisible();
  });

  test('portfolio page displays build process', async ({ page }) => {
    await page.goto('/portfolio/build-process');

    // Check build process page content using stable test ID
    await expect(page.getByTestId('build-process-page')).toBeVisible();
    await expect(page.locator('h1')).toContainText('How Proben.io is Being Built');
    await expect(page.locator('h2:has-text("Technology Stack")')).toBeVisible();
    await expect(page.locator('h2:has-text("Phase 1 Scope")')).toBeVisible();
  });

  test('canonical route /app/readiness-check works', async ({ page }) => {
    await page.goto('/app/readiness-check');

    // Verify we're on the canonical route
    await expect(page).toHaveURL(/\/app\/readiness-check/);

    // Check form is present
    await expect(page.getByTestId('readiness-context-input')).toBeVisible();
    await expect(page.getByTestId('readiness-submit-button')).toBeVisible();
  });

  test('compatibility route /readiness-check works', async ({ page }) => {
    await page.goto('/readiness-check');

    // Verify the compatibility route works
    await expect(page).toHaveURL(/\/readiness-check/);

    // Check form is present (same content as canonical route)
    await expect(page.getByTestId('readiness-context-input')).toBeVisible();
    await expect(page.getByTestId('readiness-submit-button')).toBeVisible();
  });

  test('landing page CTA navigates to canonical route', async ({ page }) => {
    await page.goto('/');

    // Click hero CTA
    await page.click('[data-testid="hero-run-readiness-check"]');
    await expect(page).toHaveURL(/\/app\/readiness-check/);

    // Go back and click bottom CTA
    await page.goBack();
    await page.click('[data-testid="cta-run-readiness-check"]');
    await expect(page).toHaveURL(/\/app\/readiness-check/);
  });
});
