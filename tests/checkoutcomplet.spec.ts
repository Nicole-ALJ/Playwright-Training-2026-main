import { test } from '../fixtures/test';
import { users } from '../data/users';

test('completes checkout after adding a product to the cart', async ({ loginPage, inventoryPage, cartPage, checkoutPage }) => {
  await test.step('Login with standard user', async () => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await loginPage.expectInventoryPage();
  });

  let productName = '';
  await test.step('Add product and open cart', async () => {
    productName = await inventoryPage.getFirstProductName();
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.expectCartBadge('1');
    await inventoryPage.openCart();
  });

  await test.step('Validate cart and proceed to checkout', async () => {
    await cartPage.expectCartPage();
    await cartPage.expectProductInCart(productName);
    await cartPage.checkout();
  });

  await test.step('Fill checkout info and complete purchase', async () => {
    await checkoutPage.fillCustomerInfo('N', 'J', '3242');
    await checkoutPage.finishCheckout();
    await checkoutPage.expectCheckoutCompleted();
  });
});