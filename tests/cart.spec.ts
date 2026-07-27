import { test, expect } from '../fixtures/test';
import { users } from '../data/users';

test('adds a product to the cart', async ({ loginPage, inventoryPage, cartPage }) => {
  await test.step('Login with standard user', async () => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await loginPage.expectInventoryPage();
  });

  let firstProductName = '';
  let secondProductName = '';
  let thirdProductName = '';

  await test.step('Add two products to cart', async () => {
    firstProductName = await inventoryPage.getProductName(0);
    secondProductName = await inventoryPage.getProductName(1);
    thirdProductName = await inventoryPage.getProductName(2);
    await inventoryPage.addProductToCart(0);
    await inventoryPage.expectCartBadge('1');
    await inventoryPage.addProductToCart(1);
    await inventoryPage.expectCartBadge('2');
    await inventoryPage.addProductToCart(2);
    await inventoryPage.expectCartBadge('3');
    await inventoryPage.openCart();
  });

  await test.step('Validate cart', async () => {
    await cartPage.expectCartPage();
    await cartPage.expectProductInCart(firstProductName);
    await cartPage.expectProductInCart(secondProductName);
    await cartPage.expectProductInCart(thirdProductName);
  });
    await test.step('Remove all products from cart', async () => {
    await inventoryPage.openCart();
    await cartPage.removeProductFromCart(firstProductName);
    await cartPage.removeProductFromCart(secondProductName);
    await cartPage.removeProductFromCart(thirdProductName);
    await cartPage.expectCartEmpty();
  });
  });
