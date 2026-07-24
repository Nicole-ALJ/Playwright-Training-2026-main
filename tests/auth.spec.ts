import { test } from '../fixtures/test';
import { users } from '../data/users';

test('login with env credentials', async ({ loginPage }) => {
  await test.step('Login with valid credentials', async () => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
    await loginPage.expectInventoryPage();
  });
});

test('logs in with a locked out user', async ({ loginPage }) => {
  await test.step('Attempt login with locked out user', async () => {
    await loginPage.open();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
  });

  await test.step('Validate error message', async () => {
    await loginPage.expectErrorMessage('locked out');
  });
});

test('logs in with a invalid password', async ({ loginPage }) => {
  await test.step('Attempt login with invalid password', async () => {
    await loginPage.open();
    await loginPage.login(users.invalid.username, users.invalid.password);
  });

  await test.step('Validate error message', async () => {
    await loginPage.expectErrorMessage('Username and password do not match any user in this service');
  });
});

