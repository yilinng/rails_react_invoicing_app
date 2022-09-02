const { chromium } = require('@playwright/test');

module.exports = async config => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('/');

  // create a locator
  const loginLink = page.locator('text=log in');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(loginLink).toHaveAttribute('href', '/login');

  // Click the get started link.
  await loginLink.click();
 
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);

  const user = {
    email: "test12@test.com",
    password:"test12"
  }

  await page.locator('button[type="submit"]').click();
  await page.locator('[placeholder="email.."]').fill(user.email);
  await page.locator('[placeholder="password.."]').fill(user.password); 
  await page.locator('button[type="submit"]').click();
  // Save signed-in state to 'storageState.json'.
  await page.context().storageState({ path: 'storageState.json' });
  await browser.close();
};