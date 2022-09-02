// @ts-check
const { test, expect } = require('@playwright/test');

test('homepage has title login button and signup button and click login the redirect login page', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/InvoicingRailsReact/);

  // create a locator
  const loginLink = page.locator('text=log in');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(loginLink).toHaveAttribute('href', '/login');

  // Click the get started link.
  await loginLink.click();
 
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);
});