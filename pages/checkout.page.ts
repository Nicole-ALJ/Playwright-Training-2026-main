import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
    await this.page.locator('[data-test="continue"]').click();
  }

  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  async expectCheckoutCompleted() {
    await expect(this.page.locator('[data-test="complete-header"]')).toBeVisible();
  }
}
