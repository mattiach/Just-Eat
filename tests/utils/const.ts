import { Browser, Page } from "@playwright/test";
import { storageStatePath } from './settings.json';

// Saves the current session state to the specified 'storageStatePath'
export async function saveSessionFunction(page: Page) {
  await page.context().storageState({ path: storageStatePath });
}

// Reads the session state from the specified 'storageStatePath' to create a new browser context
export async function getSessionFunction(browser: Browser) {
  return browser.newContext({ storageState: storageStatePath });
}
