import { test, expect } from '@playwright/test';
import { localhost, title_website } from './utils/settings.json';
import dotenv from 'dotenv';
import { storageStatePath } from './utils/settings.json';
import { getSessionFunction, saveSessionFunction } from './utils/const';

dotenv.config();

test.beforeAll(async () => {
  console.log(`Environment: ${process.env.BASE_URL || localhost}`);
});

test('Orders Page: Display of category images and restaurant search functionality', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(title_website);
  await page.getByRole('button', { name: 'Find a restaurant' }).click();
  await page.getByRole('img', { name: 'cinese' }).click();
  await page.getByRole('img', { name: 'fritti' }).click();
  await page.getByRole('img', { name: 'giapponese' }).click();
  await page.locator('img[alt="sushi"]').click();
  await page.getByRole('img', { name: 'hamburger' }).click();
  await page.getByRole('img', { name: 'italiano' }).click();
  await page.getByRole('img', { name: 'pizza' }).click();
  await page.locator('.max-w-\\[987px\\] > .container > .flex').click();
  await page.getByPlaceholder('Search for a restaurant ..').fill('pizzeria');
  await page.getByRole('img', { name: 'Al Country - Ristorante' }).click();
});

test('Restaurant page: Add to cart', async ({ page }) => {
  await page.goto('restaurant/1604677748');
  await expect(page.getByRole('heading', { name: 'Al Country - Ristorante' })).toBeVisible();
  await page.getByText('Pizza Marinata5,00 €').click();
  await expect(page.getByLabel('Pizza Marinata').getByText('0', { exact: true })).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await expect(page.getByLabel('Pizza Marinata').getByText('1', { exact: true })).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await expect(page.getByLabel('Pizza Marinata').getByText('2', { exact: true })).toBeVisible();
  await page.getByRole('button').nth(1).click();
  await expect(page.getByLabel('Pizza Marinata').getByText('3', { exact: true })).toBeVisible();
  await page.getByRole('button').first().click();
  await expect(page.getByLabel('Pizza Marinata').getByText('2', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('span').filter({ hasText: '2' }).first()).toHaveText('2');

  // saves the current session state
  await saveSessionFunction(page);
});

test('Orders Page: Pagination', async ({ page }) => {
  await page.goto('orders');
  await expect(page).toHaveTitle(title_website);
  await page.getByRole('button', { name: 'Show all' }).click();
  await page.getByRole('button', { name: 'Hide', exact: true }).click();
  await page.locator('section').getByRole('button').nth(3).waitFor({ state: 'visible' });
  await page.locator('section').getByRole('button').nth(3).click();
  await page.locator('section').getByRole('button').nth(3).click();
  await page.locator('section').getByRole('button').nth(2).click();
  await page.locator('section').getByRole('button').nth(2).click();
});

test('Translations', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(title_website);
  await expect(page.getByRole('heading', { name: 'Tuck into a takeaway today!' })).toBeVisible();
  await page.getByRole('button', { name: 'en English' }).click();
  await page.getByRole('menuitem', { name: 'it Italian' }).click();
  await expect(page.getByRole('heading', { name: 'È bello prenderci gusto!' })).toBeVisible();
  await page.locator('span').filter({ hasText: 'Italiano' }).first().click();
  await page.getByText('Spagnolo').click();
  await expect(page.getByRole('heading', { name: '¡Es bueno darse un gusto!' })).toBeVisible();
  await page.getByRole('button', { name: 'es Español' }).click();
  await page.getByText('Alemán').click();
  await expect(page.getByRole('heading', { name: 'Es ist schön, Geschmack zu finden!' })).toBeVisible();
  await page.getByRole('button', { name: 'de Deutsch' }).click();
  await page.getByText('Französisch').click();
  await expect(page.getByRole('heading', { name: 'C\'est bon de se faire plaisir!' })).toBeVisible();
});

test('Restaurant page: Add to cart - using saved session', async ({ browser }) => {
  // Read session state from the specified 'storageStatePath'
  const context = await getSessionFunction(browser);

  const page = await context.newPage();
  await page.goto('restaurant/1604677748');
  await expect(page.getByRole('heading', { name: 'Al Country - Ristorante' })).toBeVisible();
  await page.getByText('Pizza Marinata5,00 €').click();
  await page.getByRole('button').nth(1).click();
  await page.getByRole('button', { name: 'Close' }).click();
  const locator = page.locator('span').filter({ hasText: '3' }).first();
  await locator.waitFor({ state: 'visible', timeout: 20000 });
  await expect(locator).toHaveText('3');
  await page.context().storageState({ path: storageStatePath });
});
