import { test } from '../fixtures/test';
import { users } from '../data/users';

test.describe('Checkout - mandatory field validation', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, cartPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await loginPage.expectInventoryPage();
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('shows error when all fields are empty', async ({ checkoutPage }) => {
    await checkoutPage.submitWithoutFilling();
    await checkoutPage.expectErrorMessage('First Name is required');
  });

  test('shows error when first name is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillField('lastName', 'Silva');
    await checkoutPage.fillField('postalCode', '12345');
    await checkoutPage.submitWithoutFilling();
    await checkoutPage.expectErrorMessage('First Name is required');
  });

  test('shows error when last name is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillField('firstName', 'João');
    await checkoutPage.fillField('postalCode', '12345');
    await checkoutPage.submitWithoutFilling();
    await checkoutPage.expectErrorMessage('Last Name is required');
  });

  test('shows error when postal code is missing', async ({ checkoutPage }) => {
    await checkoutPage.fillField('firstName', 'João');
    await checkoutPage.fillField('lastName', 'Silva');
    await checkoutPage.submitWithoutFilling();
    await checkoutPage.expectErrorMessage('Postal Code is required');
  });
});
