import { expect, type Page } from '@playwright/test';
import { HeaderComponent } from './components/header';

export class InventoryPage {
  readonly header: HeaderComponent;

  constructor(private page: Page) {
    this.header = new HeaderComponent(page);
  }

  async addFirstProductToCart() {
    await this.page.locator('.inventory_item_name').first().textContent();
    await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  }

  async openCart() {
    await this.header.openCart();
  }

  async expectCartBadge(value: string) {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText(value);
  }
}
