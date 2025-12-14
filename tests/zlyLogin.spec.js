import { test, expect } from '@playwright/test';

test('błędne dane logowania nie wpuszczają do profilu', async ({ page }) => {
  await page.goto('http://localhost:3000/user/signin');

  await page.getByLabel('Email').fill('zly@email.com');
  await page.getByLabel('Hasło').fill('zlehaslo');

  await page.getByRole('button', { name: 'Zaloguj się' }).click();

  // zostajesz na stronie logowania
  await expect(page).toHaveURL(/\/user\/signin/);

  // widoczny komunikat błędu
  await expect(
    page.getByText('Niepoprawne dane logowania')
  ).toBeVisible();
});