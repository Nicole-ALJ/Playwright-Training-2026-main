import { test, expect } from '@playwright/test';

test('login with env credentials', async ({ page }) => {
  await page.goto(process.env.BASE_URL || 'https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(process.env.STANDARD_USER || 'standard_user');
  await page.locator('[data-test="password"]').fill(process.env.SAUCEDEMO_PASSWORD || 'secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory/);
});