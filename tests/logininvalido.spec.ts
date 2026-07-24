import { test } from '../fixtures/test';
import { users } from '../data/users';

test('logs in with a locked out user', async ({ loginPage }) => {
  await test.step('Attempt login with locked out user', async () => {
    await loginPage.open();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  });

  await test.step('Validate error message', async () => {
    await loginPage.expectErrorMessage('locked out');
  });
});