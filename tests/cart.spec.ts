import { test, expect } from '@playwright/test';

test('Cart page: No Items', async ({ page }) => {
  await page.goto('cart');
  await expect(page.getByRole('heading', { name: 'Total order: 0,00 €' })).toBeVisible();
  await expect(page.locator('button').filter({ hasText: /^Confirm order$/ })).toHaveAttribute('disabled', '');
});

test('Cart Page: Items and User information missing', async ({ page }) => {
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
  await page.goto('cart');
  await expect(page.locator('button').filter({ hasText: /^Confirm order$/ })).toHaveAttribute('disabled', '');
});

test('Cart Page: Items and User information displayed', async ({ page }) => {
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
  await page.goto('cart');
  await expect(page.getByRole('heading', { name: 'Total order: 13,00 €' })).toBeVisible();
  await page.getByPlaceholder('Your name').click();
  await page.getByPlaceholder('Your name').fill('Mattia');
  await page.getByPlaceholder('Your last name').click();
  await page.getByPlaceholder('Your last name').fill('Ch');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test@email.com');
  await page.getByPlaceholder('Phone number').click();
  await page.getByPlaceholder('Phone number').fill('33344453212');
  await page.getByPlaceholder('Delivery address').click();
  await page.getByPlaceholder('Delivery address').fill('Piazza di Trevi');
  await page.getByPlaceholder('Zip Code').click();
  await page.getByPlaceholder('Zip Code').fill('00187');
  await expect(page.locator('button').filter({ hasText: /^Confirm order$/ })).not.toHaveAttribute('disabled', '');
});