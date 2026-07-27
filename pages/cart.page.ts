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

  async removeProductFromCart(productName: string) {
    await this.page.locator('.cart_item').filter({ hasText: productName }).getByRole('button', { name: 'Remove' }).click();
  }

  async expectCartEmpty() {
    await expect(this.page.locator('.cart_item')).toHaveCount(0);
  }
}
