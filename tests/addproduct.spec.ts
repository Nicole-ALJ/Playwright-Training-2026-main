import { test, expect } from '../fixtures/test';
import { users } from '../data/users';

test('adds a product to the cart', async ({ loginPage, inventoryPage, cartPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await loginPage.expectInventoryPage();

  const productName = await inventoryPage.getFirstProductName();
  await inventoryPage.addFirstProductToCart();
  await inventoryPage.expectCartBadge('1');
  await inventoryPage.openCart();

  await cartPage.expectCartPage();
  await cartPage.expectProductInCart(productName);
});