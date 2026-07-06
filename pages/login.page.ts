import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(public page: Page) {}

  async open() {
    await this.page.goto(process.env.BASE_URL || 'https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-button').click();
  }

  async expectInventoryPage() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async expectErrorMessage(message: string) {
    await expect(this.page.getByTestId('error')).toContainText(message);
  }
}
