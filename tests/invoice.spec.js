// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  const user = {
    email: "test12@test.com",
    password:"test12"
  }

  await page.goto('/login');

  await page.locator('[placeholder="email.."]').fill(user.email);
  await page.locator('[placeholder="password.."]').fill(user.password); 

  await page.locator('button[type="submit"]').click();
});


test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);
  // create a locator
  page.locator('.logoutLink').click();

  await expect(page).not.toHaveURL(/.*invoices/);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});

test('click create link ,then redirect create page', async ({ page }) => {

  // create a locator
  const createLink = page.locator('.createLink');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(createLink).toHaveAttribute('href', '/invoices/create');

  // Click the get started link.
  await createLink.click();
 
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*create/);
});