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

  await test.step('Add more than 1 product to cart', async () => {
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

  await test.step('Sort products Z to A', async () => {
    await inventoryPage.open();
    await inventoryPage.sortProducts('za');
    const productsAfterSort = await inventoryPage.getAllProductNames();
    
    // Verify products are sorted Z to A (reverse alphabetically)
    const isSorted = productsAfterSort.every((product, i) => {
      if (i === 0) return true;
      return product <= productsAfterSort[i - 1];
    });
    expect(isSorted).toBeTruthy();
  });
});
