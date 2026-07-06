import { test, expect } from '../fixtures/test';
import { users } from '../data/users';

test('adds a product to the cart', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await loginPage.expectInventoryPage();

  const productName = await inventoryPage.page.locator('.inventory_item_name').first().textContent();
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.expectCartBadge('1');
  await inventoryPage.openCart();

  await expect(cartPage.page).toHaveURL(/cart\.html/);
  await cartPage.expectProductInCart(productName?.trim() || '');
  await cartPage.checkout();

  await checkoutPage.fillCustomerInfo('N', 'J', '3242');
  await checkoutPage.finishCheckout();
  await checkoutPage.expectCheckoutCompleted();
});