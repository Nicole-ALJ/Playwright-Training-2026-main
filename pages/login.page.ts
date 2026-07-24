import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(public page: Page) {}

  async open() {
    await this.page.goto('/');
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

  async logout() {
    // Support Sauce Demo menu button variants.
    const menuButton = this.page
      .getByTestId('open-menu')
      .or(this.page.locator('#react-burger-menu-btn'))
      .first();
    await menuButton.waitFor({ state: 'visible' });
    await menuButton.click();

    // Support Sauce Demo logout link variants.
    const logoutButton = this.page
      .getByTestId('logout-sidebar-link')
      .or(this.page.locator('#logout_sidebar_link'))
      .or(this.page.getByTestId('logout'))
      .first();
    await logoutButton.waitFor({ state: 'visible' });
    await logoutButton.click();
  }

  async expectLoginPage() {
    await expect(this.page).toHaveURL(/$/);
  }
}
