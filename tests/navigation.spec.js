const { test, expect } = require('@playwright/test');

test('nawigacja do strony logowania', async ({ page }) => {
  // 1. Strona główna
  await page.goto('http://localhost:3000/');

  // 2. Kliknij link do logowania (konkretny href)
  await page.locator('a[href="/user/signin"]').first().click();

  // 3. Sprawdź URL
  await expect(page).toHaveURL('http://localhost:3000/user/signin');

  // 4. Sprawdź nagłówek
  await expect(
    page.getByRole('heading', { name: 'Logowanie' })
  ).toBeVisible();
});