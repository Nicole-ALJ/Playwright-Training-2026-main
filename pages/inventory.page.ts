import { expect, type Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addFirstProductToCart() {
    await this.page.locator('.inventory_item_name').first().textContent();
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }

  async expectCartBadge(value: string) {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText(value);
  }
}
