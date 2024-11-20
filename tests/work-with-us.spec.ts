import { test, expect } from '@playwright/test';
import path from 'path';

test('Work with us page: FAQ', async ({ page }) => {
  await page.goto('work-with-us');
  await expect(page.getByRole('heading', { name: 'Work with us' })).toBeVisible();
  await page.getByRole('button', { name: 'My city is not on the list,' }).click();
  await expect(page.locator('#faq-q1 div').nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'My city is not on the list,' }).click();
  await page.getByRole('button', { name: 'Are Just Eat riders paid' }).click();
  await expect(page.locator('#faq-q2 div').nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'Are Just Eat riders paid' }).click();
  await page.getByRole('button', { name: 'What type of vehicle and' }).click();
  await expect(page.locator('#faq-q3 div').nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'What type of vehicle and' }).click();
  await page.getByRole('button', { name: 'What documents do I need to' }).click();
  await expect(page.locator('#faq-q4 div').nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'What documents do I need to' }).click();
  await page.getByRole('button', { name: 'I have other questions, how' }).click();
  await expect(page.locator('#faq-q5 div').nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'I have other questions, how' }).click();
  await page.getByRole('button', { name: 'What are the benefits of' }).click();
  await expect(page.locator('#faq-q6 div').nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'What are the benefits of' }).click();
  await page.getByRole('button', { name: 'Are the medical check-up and' }).click();
  await expect(page.locator('#faq-q7 div').nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'Are the medical check-up and' }).click();
  await page.getByRole('button', { name: 'How do contracts with Just' }).click();
  await expect(page.locator('#faq-q8 div').nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'How do contracts with Just' }).click();
  await page.getByRole('button', { name: 'How can I become a Just Eat' }).click();
  await expect(page.locator('#faq-q9 div').nth(2)).toBeVisible();
  await page.getByRole('button', { name: 'How can I become a Just Eat' }).click();
});

test('Work with us page: Modal', async ({ page }) => {
  await page.goto('work-with-us');
  await expect(page.getByRole('heading', { name: 'Work with us' })).toBeVisible();
  await page.getByRole('button', { name: 'Apply now' }).click();
  await expect(page.getByRole('heading', { name: 'Application' })).toBeVisible();
  await page.getByText('Select').click();
  await page.locator('input[type="file"]').setInputFiles(path.join(__dirname, '../README.md'));
  await expect(page.getByText('File uploaded successfully')).toBeVisible();
  await page.getByRole('button', { name: 'Send application' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
});