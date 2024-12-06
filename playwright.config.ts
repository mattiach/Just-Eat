import { defineConfig, devices } from '@playwright/test';
import { fullyParallel, localhost, workers, retries, headless } from './tests/utils/settings.json';

export default defineConfig({
  testDir: './tests',
  fullyParallel, // disabled parallel execution to prevent conflicts between tests that rely on session state.
  forbidOnly: !!process.env.CI,
  retries,
  workers,
  reporter: [['null', { printSteps: false }]],
  use: {
    baseURL: localhost,
    trace: 'on-first-retry',
  },
  projects: [
    /* PC viewports. */
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: headless.chrome,
      },
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     video: 'off',
    //     headless: headless.firefox,
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //     video: 'off',
    //     headless: headless.safari,
    //   },
    // },
    /* Mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],
});
