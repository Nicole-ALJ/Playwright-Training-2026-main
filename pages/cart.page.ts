import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async expectProductInCart(productName: string) {
    await expect(this.page.locator('.inventory_item_name')).toContainText(productName);
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
