import { test, expect } from '@playwright/test';

test('adds a product to the cart', async ({ page }) => {
  await page.goto(process.env.BASE_URL || 'https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(process.env.STANDARD_USER || 'standard_user');
  await page.locator('[data-test="password"]').fill(process.env.SAUCEDEMO_PASSWORD || 'secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory/);

  const productName = await page.locator('.inventory_item_name').first().textContent();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.locator('[data-test="shopping-cart-link"]').click();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.locator('.inventory_item_name')).toContainText(productName?.trim() || '');
});