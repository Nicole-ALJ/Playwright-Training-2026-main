import { expect, type Page } from '@playwright/test';

export class CartPage {
  constructor(public page: Page) {}

  async expectCartPage() {
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async expectProductInCart(productName: string) {
    await expect(this.page.locator('.inventory_item_name')).toContainText(productName);
  }

  async checkout() {
    await this.page.getByTestId('checkout').click();
  }
}
