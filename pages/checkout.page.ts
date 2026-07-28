import { expect, type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(public page: Page) {}

  async fillCustomerInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.getByTestId('firstName').fill(firstName);
    await this.page.getByTestId('lastName').fill(lastName);
    await this.page.getByTestId('postalCode').fill(postalCode);
    await this.page.getByTestId('continue').click();
  }

  async fillField(testId: string, value: string) {
    await this.page.getByTestId(testId).fill(value, { force: true });
  }

  async finishCheckout() {
    await this.page.getByTestId('finish').click();
  }

  async submitWithoutFilling() {
    await this.page.getByTestId('continue').click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.locator('[data-test="error"]')).toContainText(message);
  }

  async expectCheckoutCompleted() {
    await expect(this.page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  }
}
