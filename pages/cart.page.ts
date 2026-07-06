import { expect, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header';

export class CartPage {
  readonly header: HeaderComponent;

  constructor(private page: Page) {
    this.header = new HeaderComponent(page);
  }

  async expectProductInCart(productName: string) {
    await expect(this.page.locator('.inventory_item_name')).toContainText(productName);
  }

  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}
