import { test } from '../fixtures/test';
import { users } from '../data/users';

test('logout', async ({ loginPage }) => {
  await test.step('Login with standard user', async () => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await loginPage.expectInventoryPage();
  });

  await test.step('Logout', async () => {
    await loginPage.logout();
    await loginPage.expectLoginPage();
  });
});