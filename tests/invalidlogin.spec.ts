import { test } from '../fixtures/test';
import { users } from '../data/users';

test('logs in with a invalid password', async ({ loginPage }) => {
  await test.step('Attempt login with invalid password', async () => {
    await loginPage.open();
    await loginPage.login(users.invalid.username, users.invalid.password);
  });

  await test.step('Validate error message', async () => {
    await loginPage.expectErrorMessage('Username and password do not match any user in this service');
  });
});