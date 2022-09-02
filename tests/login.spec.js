// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  // Runs before each test and signs in each page.
  await page.goto('/');
  // create a locator
  const loginLink = page.locator('text=log in');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(loginLink).toHaveAttribute('href', '/login');

  // Click the get started link.
  await loginLink.click();
 
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);
});


test('login success, then redirect to invoice list', async ({ page }) => {

  const user = {
    email: "test12@test.com",
    password:"test12"
  }

  await page.locator('[placeholder="email.."]').fill(user.email);
  await page.locator('[placeholder="password.."]').fill(user.password); 

  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/.*invoices/);

  page.locator('.logoutLink').click();

  await expect(page).not.toHaveURL(/.*invoices/);

});


test('invalid email', async ({ page }) => {

  const user = {
    email: "test125@test.com",
    password:"test123"
  }

  await page.locator('[placeholder="email.."]').fill(user.email);
  await page.locator('[placeholder="password.."]').fill(user.password); 

  await page.locator('button[type="submit"]').click();

  await expect (page.locator('.error')).toHaveText(/Invalid email or password./);

});
