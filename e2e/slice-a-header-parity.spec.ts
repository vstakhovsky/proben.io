import { test, expect } from '@playwright/test';

/**
 * Slice A Header Parity Test
 *
 * DOM Blocker Test for Phase 2.1 Slice A: Header/Navigation + Layout Foundation
 *
 * Verifies that the landing page header matches Proben MVP 6 specifications.
 * This test provides deterministic DOM-based verification to complement visual evidence.
 *
 * REQUIRED ELEMENTS (Blockers if missing):
 * - "MEETING READINESS" subtitle
 * - "Run readiness check" CTA
 * - "Log in" button
 * - Navigation items: Sample report, How it works, Checks, Resources, Pricing
 *
 * FORBIDDEN ELEMENTS (Blockers if present in landing header):
 * - "Home" (indicates old generic nav)
 * - "Build Process" (indicates portfolio nav in wrong place)
 *
 * Scope: Landing page header only (not whole page, not mobile menu dropdown)
 */

test.describe('Slice A - Header/Navigation DOM Blockers', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    // Wait for navigation to be visible
    await page.waitForSelector('nav', { timeout: 5000 });
  });

  test('has landing header container', async ({ page }) => {
    const header = page.locator('nav').first();
    await expect(header).toBeVisible();
  });

  test('has rounded pill header container', async ({ page }) => {
    const header = page.locator('nav').first();
    // Check for pill-shaped container (rounded-full class)
    const pillContainer = header.locator('.rounded-full').first();
    await expect(pillContainer).toBeVisible();
  });

  test('has "Proben" logo text', async ({ page }) => {
    const header = page.locator('nav').first();
    const logo = header.getByText('Proben').first();
    await expect(logo).toBeVisible();
  });

  test('has "MEETING READINESS" subtitle', async ({ page }) => {
    const header = page.locator('nav').first();
    const subtitle = header.getByText('MEETING READINESS');
    await expect(subtitle).toBeVisible();
  });

  test('has "Run readiness check" CTA button', async ({ page }) => {
    const header = page.locator('nav').first();
    const cta = header.getByRole('link', { name: 'Run readiness check' });
    await expect(cta).toBeVisible();
  });

  test('has green CTA styling', async ({ page }) => {
    const header = page.locator('nav').first();
    const cta = header.getByRole('link', { name: 'Run readiness check' });
    // Check for green background class (brand-green or bg-green)
    const ctaButton = cta.first();
    const classList = await ctaButton.getAttribute('class');
    expect(classList).toMatch(/brand-green|green/);
  });

  test('has "Log in" button', async ({ page }) => {
    const header = page.locator('nav').first();
    const login = header.getByRole('link', { name: 'Log in' });
    await expect(login).toBeVisible();
  });

  test('has "Sample report" navigation item', async ({ page }) => {
    const header = page.locator('nav').first();
    const sampleReport = header.getByRole('link', { name: 'Sample report' });
    await expect(sampleReport).toBeVisible();
  });

  test('has "How it works" navigation item', async ({ page }) => {
    const header = page.locator('nav').first();
    const howItWorks = header.getByRole('link', { name: 'How it works' });
    await expect(howItWorks).toBeVisible();
  });

  test('has "Checks" navigation item', async ({ page }) => {
    const header = page.locator('nav').first();
    const checks = header.getByRole('link', { name: 'Checks' });
    await expect(checks).toBeVisible();
  });

  test('has "Resources" navigation item', async ({ page }) => {
    const header = page.locator('nav').first();
    const resources = header.getByRole('link', { name: 'Resources' });
    await expect(resources).toBeVisible();
  });

  test('has "Pricing" navigation item', async ({ page }) => {
    const header = page.locator('nav').first();
    const pricing = header.getByRole('link', { name: 'Pricing' });
    await expect(pricing).toBeVisible();
  });

  test('has theme toggle button', async ({ page }) => {
    const header = page.locator('nav').first();
    const themeButton = header.getByRole('button', { name: /theme/i }).or(
      header.locator('[data-testid="theme-toggle"]')
    );
    // Theme button is optional for MVP, so we check if it exists
    // but don't fail if missing
    const isVisible = await themeButton.isVisible().catch(() => false);
    if (isVisible) {
      console.log('✅ Theme button found');
    } else {
      console.log('⚠️  Theme button not found (acceptable for MVP)');
    }
  });

  // FORBIDDEN ELEMENT TESTS

  test('does NOT have "Home" in landing header', async ({ page }) => {
    const header = page.locator('nav').first();
    const home = header.getByRole('link', { name: 'Home' });
    // Home should not be visible in the landing header
    const isVisible = await home.isVisible().catch(() => false);
    expect(isVisible).toBeFalsy();
    if (isVisible) {
      throw new Error('❌ BLOCKER: "Home" found in landing header - indicates old generic nav');
    }
  });

  test('does NOT have "Build Process" in landing header', async ({ page }) => {
    const header = page.locator('nav').first();
    const buildProcess = header.getByRole('link', { name: 'Build Process' });
    // Build Process should not be visible in the landing header
    const isVisible = await buildProcess.isVisible().catch(() => false);
    expect(isVisible).toBeFalsy();
    if (isVisible) {
      throw new Error('❌ BLOCKER: "Build Process" found in landing header - indicates portfolio nav in wrong place');
    }
  });

  // LAYOUT ASSERTIONS

  test('header is not full-width generic navbar', async ({ page }) => {
    const header = page.locator('nav').first();
    // Check that the nav contains a pill container (not full-width navbar)
    const pillContainer = header.locator('.rounded-full').first();
    await expect(pillContainer).toBeVisible();

    // Verify it's not a full-width navbar by checking for max-width constraint
    const hasMaxWidth = await pillContainer.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      // Check if element has some width constraint (max-width or is inline-flex)
      return styles.maxWidth !== 'none' || styles.display === 'inline-flex';
    });
    expect(hasMaxWidth).toBeTruthy();
  });

  test('header container is centered', async ({ page }) => {
    const nav = page.locator('nav').first();
    // Check that nav has centering (mx-auto or similar)
    const navElement = nav.first();
    const classList = await navElement.getAttribute('class');
    // Check for common Tailwind centering classes
    const hasCentering = classList?.match(/mx-auto|max-w-|container/);
    expect(hasCentering).toBeTruthy();
  });
});

test.describe('Slice A - Header Links Work', () => {
  test('navigation links are functional', async ({ page }) => {
    await page.goto('http://localhost:3000');

    // Test Sample Report link
    const sampleReportLink = page.getByRole('link', { name: 'Sample report' });
    await expect(sampleReportLink).toHaveAttribute('href', '/sample-report');

    // Test Readiness Check CTA
    const ctaLink = page.getByRole('link', { name: 'Run readiness check' });
    await expect(ctaLink).toHaveAttribute('href', '/app/readiness-check');
  });
});

/**
 * Test Results Summary
 *
 * Run this test with: npm test -- slice-a-header-parity
 *
 * All tests must PASS for Slice A to be accepted.
 * Any BLOCKER failure (forbidden element present) causes automatic REJECTION.
 *
 * Expected results for Slice A ACCEPTED:
 * - All DOM blocker tests: PASS
 * - All required element tests: PASS
 * - All forbidden element tests: PASS (meaning forbidden elements NOT found)
 * - All layout assertion tests: PASS
 */
