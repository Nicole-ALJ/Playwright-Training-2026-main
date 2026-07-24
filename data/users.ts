export const users = {
  standard: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
  },
  lockedOut: {
    username: 'locked_out_user',
    password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
  },
  problem: {
    username: 'problem_user',
    password: process.env.SAUCEDEMO_PASSWORD || 'secret_sauce',
  },
  invalid: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.SAUCEDEMO_PASSWORD_INVALID || 'secret_sauce_invalid',
  },
};
