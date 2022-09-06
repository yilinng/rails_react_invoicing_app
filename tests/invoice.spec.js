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

test('click create link ,then redirect create page, create success', async ({ page }) => {

  // create a locator
  const createLink = page.locator('.createLink');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(createLink).toHaveAttribute('href', '/invoices/create');

  // Click the get started link.
  await createLink.click();
 
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*create/);

  await page.locator('input[id="create-invoice-name"]').fill('2022/09/04 post'); 

  await page.locator('button[id="Add-Transaction"]').click()

  await page.locator('.createTransaction input[id="txn_name_modal"]').fill('milk'); 
  await page.locator('.createTransactionPrice input[id="txn_price_modal"]').fill('100'); 

  await page.locator('text=Save Transaction').click()

  await page.locator('.createOne').click()

  await expect(page).not.toHaveURL(/.*create/);

});

test('click create link ,then redirect create page, missing title', async ({ page }) => {

  // create a locator
  const createLink = page.locator('.createLink');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(createLink).toHaveAttribute('href', '/invoices/create');

  // Click the get started link.
  await createLink.click();
 
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*create/);

  //await page.locator('input[id="create-invoice-name"]').fill(''); 

  await page.locator('button[id="Add-Transaction"]').click()

  await page.locator('.createTransaction input[id="txn_name_modal"]').fill('milk'); 
  await page.locator('.createTransactionPrice input[id="txn_price_modal"]').fill('100'); 

  await page.locator('text=Save Transaction').click()

  await page.locator('.createOne').click()

  await expect (page.locator('.createError')).toContainText('you have to input name and price...');

});

test('click create link ,then redirect create page, delete one,then create success', async ({ page }) => {

  // create a locator
  const createLink = page.locator('.createLink');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(createLink).toHaveAttribute('href', '/invoices/create');

  // Click the get started link.
  await createLink.click();
 
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*create/);

  await page.locator('input[id="create-invoice-name"]').fill('2022/09/04 post'); 

  await page.locator('button[id="Add-Transaction"]').click()

  await page.locator('.createTransaction input[id="txn_name_modal"]').fill('milk'); 
  await page.locator('.createTransactionPrice input[id="txn_price_modal"]').fill('100'); 

  await page.locator('text=Save Transaction').click()

  await page.locator('.btnlist .delete').click()

  await page.locator('button[id="Add-Transaction"]').click()

  await page.locator('.createTransaction input[id="txn_name_modal"]').fill('hamburger'); 
  await page.locator('.createTransactionPrice input[id="txn_price_modal"]').fill('120'); 

  await page.locator('text=Save Transaction').click()

  await page.locator('.createOne').click()

  await expect(page).not.toHaveURL(/.*create/);

});

test('click create link ,then redirect create page, edit one,then create success', async ({ page }) => {

  // create a locator
  const createLink = page.locator('.createLink');

  // Expect an attribute "to be strictly equal" to the value.
  await expect(createLink).toHaveAttribute('href', '/invoices/create');

  // Click the get started link.
  await createLink.click();
 
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*create/);

  await page.locator('input[id="create-invoice-name"]').fill('2022/09/04 post'); 

  await page.locator('button[id="Add-Transaction"]').click()

  await page.locator('.createTransaction input[id="txn_name_modal"]').fill('milk'); 
  await page.locator('.createTransactionPrice input[id="txn_price_modal"]').fill('100'); 

  await page.locator('text=Save Transaction').click()

  await page.locator('.btnlist .edit').click()

  await page.locator('.editTransaction input[id="txn_name_modal"]').fill('water'); 
  await page.locator('.editTransactionPrice input[id="txn_price_modal"]').fill('20'); 

  await page.locator('text=Update Transaction').click()

  await page.locator('.createOne').click()

  await expect(page).not.toHaveURL(/.*create/);

});



test('click first element of each sublist link,then show details', async ({ page }) => {

  // create a locator
  await page.locator('.invoiceLink').first().click()

  const namelocator = page.locator('.single-page .detail .name').first();
  await expect(namelocator).not.toBeEmpty();

  const pricelocator = page.locator('.single-page .detail .price').first();
  await expect(pricelocator).not.toBeEmpty();


});

test('click last element of each sublist edit button,then edit success', async ({ page }) => {

  await page.locator('.invoicelist .buttonList .edit').last().click()

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*edit/);

  await page.locator('button[id="Add-Transaction"]').click()

  await page.locator('.createTransaction input[id="txn_name_modal"]').fill('cola'); 
  await page.locator('.createTransactionPrice input[id="txn_price_modal"]').fill('80'); 

  await page.locator('text=Save Transaction').click()

  await page.locator('.btnlist .edit').first().click()

  await page.locator('.editTransaction input[id="txn_name_modal"]').fill('tomato'); 
  await page.locator('.editTransactionPrice input[id="txn_price_modal"]').fill('40'); 

  await page.locator('text=Update Transaction').click()

  await page.locator('.updateOne').click()

  await expect(page).not.toHaveURL(/.*edit/);

});

test('click last element of each sublist delete button,then delte success', async ({ page }) => {

  await page.locator('.invoicelist .buttonList .delete').last().click()

  await expect(page.locator('.noInvoice')).toContainText('no invoice can see..');

});