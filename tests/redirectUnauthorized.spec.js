import { test, expect } from '@playwright/test';

test('niezalogowany użytkownik jest przekierowany do logowania', async ({ page }) => {
  await page.goto('http://localhost:3000/user/profile');

  // kluczowa asercja
  await expect(page).toHaveURL(/\/user\/signin/);
});