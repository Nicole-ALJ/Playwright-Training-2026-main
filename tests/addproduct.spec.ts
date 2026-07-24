import { test } from '../fixtures/test';
import { users } from '../data/users';

test('adds a product to the cart', async ({ loginPage, inventoryPage, cartPage }) => {
  await test.step('Login with standard user', async () => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await loginPage.expectInventoryPage();
  });

  let productName = '';
  await test.step('Add first product to cart', async () => {
    productName = await inventoryPage.getFirstProductName();
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.expectCartBadge('1');
    await inventoryPage.openCart();
  });

  await test.step('Validate cart', async () => {
    await cartPage.expectCartPage();
    await cartPage.expectProductInCart(productName);
  });
});