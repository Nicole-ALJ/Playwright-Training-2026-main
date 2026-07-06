import { expect, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header';

export class InventoryPage {
  readonly header: HeaderComponent;

  constructor(public page: Page) {
    this.header = new HeaderComponent(page);
  }

  async getFirstProductName() {
    return (await this.page.locator('.inventory_item_name').first().textContent())?.trim() || '';
  }

  async addFirstProductToCart() {
    await this.page.getByTestId('add-to-cart-sauce-labs-backpack').click();
  }

  async openCart() {
    await this.header.openCart();
  }

  async expectCartBadge(value: string) {
    await expect(this.page.getByTestId('shopping-cart-badge')).toHaveText(value);
  }
}
