# Playwright Training 2026

An automated **E2E (End-to-End)** test suite using Playwright for the [SauceDemo](https://www.saucedemo.com/) application, covering authentication flows, inventory navigation, cart management, and checkout.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Available Tests](#available-tests)
- [Page Objects](#page-objects)
- [Docker](#docker)
- [Test Reports](#test-reports)

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **yarn**
- **Docker** (optional, for running tests in container)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nicole-ALJ/Playwright-Training-2026.git
   cd Playwright-Training-2026
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## Project Structure

```
├── tests/                      # Test files
│   ├── auth.spec.ts           # Authentication tests
│   ├── login.spec.ts          # Successful login tests
│   ├── invalidlogin.spec.ts   # Invalid login tests
│   ├── logininvalido.spec.ts  # Locked user login tests
│   ├── logout.spec.ts         # Logout tests
│   ├── inventory.spec.ts      # Product listing tests
│   ├── cart.spec.ts           # Shopping cart tests
│   ├── removeproduct.spec.ts  # Product removal tests
│   ├── sort.spec.ts           # Sorting tests
│   ├── addproduct.spec.ts     # Product addition tests
│   ├── checkoutcomplet.spec.ts # Complete checkout tests
│   └── checkout.negative.spec.ts # Negative tests (mandatory field validation)
│
├── pages/                      # Page Objects (POM pattern)
│   ├── login.page.ts          # Login page
│   ├── inventory.page.ts      # Inventory/products page
│   ├── cart.page.ts           # Cart page
│   ├── checkout.page.ts       # Checkout page
│   └── components/
│       └── header.ts          # Reusable components
│
├── fixtures/                   # Playwright fixtures
│   └── test.ts               # Fixtures and page objects configuration
│
├── data/                       # Test data
│   └── users.ts              # User credentials
│
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies
├── Dockerfile                # Docker image
├── docker-compose.yml        # Docker orchestration
└── README.md                 # This file
```

## Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
BASE_URL=https://www.saucedemo.com/
STANDARD_USER=standard_user
SAUCEDEMO_PASSWORD=secret_sauce
SAUCEDEMO_PASSWORD_INVALID=secret_sauce_invalid
```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run a specific test file:
```bash
npx playwright test tests/login.spec.ts
```

### Run a specific test:
```bash
npx playwright test -g "shows error when first name is missing"
```

### Run tests in debug mode:
```bash
npx playwright test --debug
```

### Run tests with UI mode:
```bash
npx playwright test --ui
```

### Generate coverage report:
```bash
npx playwright test --coverage
```

## Available Tests

### Authentication & Login
- ✅ **auth.spec.ts** - Successful login with standard user
- ✅ **login.spec.ts** - Page verification after login
- ✅ **invalidlogin.spec.ts** - Error messages for invalid credentials
- ✅ **logininvalido.spec.ts** - Locked user blocking
- ✅ **logout.spec.ts** - Successful logout

### Cart and Products
- ✅ **addproduct.spec.ts** - Adding products to cart
- ✅ **removeproduct.spec.ts** - Removing products from cart
- ✅ **inventory.spec.ts** - Product listing and viewing
- ✅ **sort.spec.ts** - Product sorting
- ✅ **cart.spec.ts** - Cart validations

### Checkout
- ✅ **checkoutcomplet.spec.ts** - Complete purchase flow
- ✅ **checkout.negative.spec.ts** - Mandatory field validation:
  - Without filling any field
  - Without first name
  - Without last name
  - Without postal code

## Page Objects

The project uses the **Page Object Model (POM)** pattern for better maintainability:

### LoginPage
```typescript
await loginPage.open();
await loginPage.login(username, password);
await loginPage.expectErrorMessage(message);
```

### InventoryPage
```typescript
await inventoryPage.getFirstProductName();
await inventoryPage.addFirstProductToCart();
await inventoryPage.expectCartBadge('1');
```

### CartPage
```typescript
await cartPage.expectCartPage();
await cartPage.expectProductInCart(productName);
await cartPage.checkout();
```

### CheckoutPage
```typescript
await checkoutPage.fillCustomerInfo(firstName, lastName, postalCode);
await checkoutPage.fillField(testId, value);
await checkoutPage.finishCheckout();
await checkoutPage.expectCheckoutCompleted();
```

## Docker

### Build and Run with Docker Compose

1. **Build the image:**
   ```bash
   npm run test:docker:build
   ```

2. **Run the tests:**
   ```bash
   npm run test:docker
   ```

Or execute directly:
```bash
docker compose run --rm playwright
```

## Test Reports

After running tests, an HTML report is generated at:
```
playwright-report/index.html
```

To open the report:
```bash
npx playwright show-report
```

## Debugging

### Inspect elements with Playwright Inspector:
```bash
npx playwright test --debug
```

### Use Code Generation to generate code:
```bash
npx playwright codegen https://www.saucedemo.com/
```

## Adding New Tests

1. Create a new file in `tests/` with suffix `.spec.ts`
2. Import the necessary fixtures:
   ```typescript
   import { test } from '../fixtures/test';
   ```
3. Use available Page Objects:
   ```typescript
   test('your new test', async ({ loginPage, inventoryPage }) => {
     // your test here
   });
   ```

## Contributing

1. Create a branch for your feature: `git checkout -b feature/new-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/new-feature`
4. Open a Pull Request

## License

ISC

## Author

Developed as part of Playwright Training 2026.

---

**For more information about Playwright, see the [official documentation](https://playwright.dev/)**
