import { type Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private page: Page) {}

  async openCart() {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
