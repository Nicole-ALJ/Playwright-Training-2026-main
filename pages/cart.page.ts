import { expect, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header';

export class CartPage {
  readonly header: HeaderComponent;

  constructor(public page: Page) {
    this.header = new HeaderComponent(page);
  }

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
