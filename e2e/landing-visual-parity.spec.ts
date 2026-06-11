import { test, expect } from '@playwright/test';

test.describe('Landing Page Visual Parity - Phase 2.1', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav', { timeout: 10000 });
  });

  test('Landing nav contains required elements', async ({ page }) => {
    // Check for required nav items
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
    
    // Check that required nav items exist
    expect(await page.getByRole('link', { name: /sample report/i }).count()).toBeGreaterThan(0);
    expect(await page.getByRole('link', { name: /how it works/i }).count()).toBeGreaterThan(0);
    expect(await page.getByRole('link', { name: /checks/i }).count()).toBeGreaterThan(0);
    expect(await page.getByRole('link', { name: /resources/i }).count()).toBeGreaterThan(0);
    expect(await page.getByRole('link', { name: /pricing/i }).count()).toBeGreaterThan(0);
    
    // Check for "Log in" link
    expect(await page.getByRole('link', { name: /log in/i }).count()).toBeGreaterThan(0);
    expect(await page.getByRole('link', { name: /run readiness check/i }).count()).toBeGreaterThan(0);
    
    // Check for Proben branding
    expect(await page.getByRole('link', { name: /proben/i }).count()).toBeGreaterThan(0);
    
    // Check for MEETING READINESS subtitle
    const meetingReadiness = page.getByText(/meeting readiness/i);
    await expect(meetingReadiness.first()).toBeVisible();
  });

  test('Landing page contains hero content', async ({ page }) => {
    // Check for main headline
    const headline = page.getByText(/know what to fix before the meeting starts/i);
    await expect(headline.first()).toBeVisible();
    
    // Check for the score 6.2/10 in the hero
    const scoreValue = page.getByText(/6\.2/);
    await expect(scoreValue.first()).toBeVisible();
    
    // Check for key content elements from hero
    await expect(page.getByText(/no account required/i).first()).toBeVisible();
    await expect(page.getByText(/paste rough meeting context/i).first()).toBeVisible();
  });

  test('Landing page does NOT contain old generic nav items in main nav', async ({ page }) => {
    // Get the main nav
    const mainNav = page.getByRole('navigation').first();
    await expect(mainNav).toBeVisible();
    
    // Check that "Home" nav item is not present in main nav
    const homeLinkInNav = mainNav.getByRole('link', { name: /^home$/i });
    const homeCount = await homeLinkInNav.count();
    expect(homeCount).toBe(0);
    
    // Check that "Build Process" is not in main landing nav
    const buildProcessLinkInNav = mainNav.getByRole('link', { name: /build process/i });
    const buildProcessCount = await buildProcessLinkInNav.count();
    expect(buildProcessCount).toBe(0);
  });

  test('Rounded pill nav structure is present', async ({ page }) => {
    // Check for pill-shaped nav container
    const nav = page.getByRole('navigation').first();
    await expect(nav).toBeVisible();
    
    // Look for the pill container within nav - it should have the Proben link
    const probenLink = nav.getByRole('link', { name: /proben/i }).first();
    await expect(probenLink).toBeVisible();
    
    // The pill is the parent container of the Proben link
    const pillContainer = probenLink.locator('..');
    await expect(pillContainer).toBeVisible();
    
    // Check for rounded class (the pill shape)
    const pillClasses = await pillContainer.getAttribute('class') || '';
    const hasRounded = pillClasses.includes('rounded-full') || pillClasses.includes('rounded');
    expect(hasRounded).toBeTruthy();
  });

  test('Green Run readiness check CTA is present', async ({ page }) => {
    // Check that the primary CTA exists and is green
    const cta = page.getByRole('link', { name: /run readiness check/i }).first();
    await expect(cta).toBeVisible();
    
    // Check that it's green (using Tailwind green classes)
    const ctaClasses = await cta.getAttribute('class') || '';
    const hasGreenColor = ctaClasses.includes('green') || ctaClasses.includes('emerald') || ctaClasses.includes('bg-brand-green');
    expect(hasGreenColor).toBeTruthy();
  });

  test('Split hero layout is present with preview card', async ({ page }) => {
    // Check for headline
    const headline = page.getByText(/know what to fix before the meeting starts/i);
    await expect(headline.first()).toBeVisible();
    
    // Check for score in preview card
    const score = page.getByText(/6\.2/).first();
    await expect(score).toBeVisible();
    
    // Check for preview card structure
    const previewCard = page.locator('div').filter({ hasText: /your context/i }).first();
    await expect(previewCard).toBeVisible();
  });

  test('Theme toggle is present', async ({ page }) => {
    // Check for theme toggle button
    const themeToggle = page.getByRole('button', { name: /toggle theme/i }).first();
    await expect(themeToggle).toBeVisible();
  });
});
