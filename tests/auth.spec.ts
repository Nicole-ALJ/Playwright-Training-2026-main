import { test, expect } from '../fixtures/test';
import { users } from '../data/users';

test('login with env credentials', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(users.standard.username, users.standard.password);
  await loginPage.expectInventoryPage();
});