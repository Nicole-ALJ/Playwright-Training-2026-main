import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(public page: Page) {}

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByTestId('firstName').fill(firstName);
    await this.page.getByTestId('lastName').fill(lastName);
    await this.page.getByTestId('postalCode').fill(postalCode);
    await this.page.getByTestId('continue').click();
  }

  async finishCheckout() {
    await this.page.getByTestId('finish').click();
  }

  async expectCheckoutCompleted() {
    await expect(this.page.getByTestId('complete-header')).toBeVisible();
  }
}
