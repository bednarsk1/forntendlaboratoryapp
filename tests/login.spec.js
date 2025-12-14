const { test, expect } = require('@playwright/test');

test('po zalogowaniu przejście do profilu użytkownika', async ({ page }) => {
  // 1 Wejście bezpośrednio na profil (symulacja niezalogowanego usera)
  await page.goto('http://localhost:3000/user/profile');

  // 2 Powinno przekierować do logowania
  await expect(page).toHaveURL(/\/user\/signin/);

  // 3 Wypełnij formularz
  await page.getByLabel('Email').fill('piotrbednarskibednar@gmail.com');
  await page.getByLabel('Hasło').fill('aaaaaa');

  // 4 Kliknij "Zaloguj się"
  await page.getByRole('button', { name: 'Zaloguj się' }).click();

  // 5 Po logowaniu wracasz na profil
  await expect(page).toHaveURL(/\/user\/profile/);
});