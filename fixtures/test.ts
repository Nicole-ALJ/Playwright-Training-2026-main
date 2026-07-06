import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { HeaderComponent } from '../pages/components/header';

export type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  header: HeaderComponent;
};

export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
});

export { expect } from '@playwright/test';
