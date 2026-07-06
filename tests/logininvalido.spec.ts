import { test } from '../fixtures/test';
import { users } from '../data/users';

test('login with env credentials', async ({ loginPage }) => {
  await loginPage.open();
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  await loginPage.expectErrorMessage('locked out');
});