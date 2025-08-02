import { Page, expect } from '@playwright/test';
import { allure } from 'allure-playwright';

function logStep(command: string, locator: string, expected?: string) {
  const timestamp = new Date().toLocaleTimeString();
  const msgParts = [`${command}`, `Locator: ${locator}`, expected && `Expected: ${expected}`].filter(Boolean);
  console.log(`[${timestamp}] ➤  ${msgParts.join(' | ')}`);
}

async function captureSuccessScreenshot(page: Page, command: string) {
  const screenshot = await page.screenshot();
  allure.attachment(`${command} - Success Screenshot`, screenshot, 'image/png');
}

/**
 * Generic assertion wrapper with wait, Allure step logging, and optional screenshots.
 */
async function assertStep<T>(
  page: Page,
  command: string,
  locator: string,
  expected?: string,
  action?: () => Promise<T>,
  isPageLevel = false,
  screenshotOnSuccess = false
): Promise<T | undefined> {
  logStep(command, locator, expected);

  return await allure.step(
    [command, `Locator: ${locator}`, expected && `Expected: ${expected}`].filter(Boolean).join(' | '),
    async () => {
      try {
        const target = page.locator(locator);

        if (!isPageLevel) {
          await target.waitFor({ state: 'attached', timeout: 10000 });
          await expect(target.first()).toBeVisible({ timeout: 10000 });
        }

        await page.waitForLoadState('domcontentloaded');

        const result = action ? await action() : undefined;

        if (expected) {
          allure.attachment('Expected Value', expected, 'text/plain');
        }

        if (screenshotOnSuccess) {
          await captureSuccessScreenshot(page, command);
        }

        return result;
      } catch (error) {
        if (!page.isClosed()) {
          const screenshot = await page.screenshot();
          allure.attachment('Assertion Failure Screenshot', screenshot, 'image/png');
        } else {
          console.warn(`[${new Date().toLocaleTimeString()}] ⚠️  Page is already closed — skipping screenshot for ${command}`);
        }

        console.error(`[${new Date().toLocaleTimeString()}]  ${command} failed on ${locator}`);
        throw error;
      }
    }
  );
}



// Visibility Assertions
export async function assertVisible(page: Page, locator: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Visible', locator, undefined, () =>
    expect(page.locator(locator)).toBeVisible(), false, screenshotOnSuccess
  );
}

export async function assertHidden(page: Page, locator: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Hidden', locator, undefined, () =>
    expect(page.locator(locator)).toBeHidden(), false, screenshotOnSuccess
  );
}

// Text Assertions
export async function assertTextEquals(page: Page, locator: string, expected: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Text Equals', locator, expected, () =>
    expect(page.locator(locator)).toHaveText(expected), false, screenshotOnSuccess
  );
}

export async function assertTextContains(page: Page, locator: string, expected: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Text Contains', locator, expected, async () =>
    expect(await page.locator(locator).textContent()).toContain(expected), false, screenshotOnSuccess
  );
}

// Value Assertions
export async function assertValueEquals(page: Page, locator: string, expected: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Value Equals', locator, expected, () =>
    expect(page.locator(locator)).toHaveValue(expected), false, screenshotOnSuccess
  );
}

export async function assertValueContains(page: Page, locator: string, expected: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Value Contains', locator, expected, async () =>
    expect(await page.locator(locator).inputValue()).toContain(expected), false, screenshotOnSuccess
  );
}

// Checkbox & State
export async function assertChecked(page: Page, locator: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Checked', locator, undefined, () =>
    expect(page.locator(locator)).toBeChecked(), false, screenshotOnSuccess
  );
}

export async function assertEnabled(page: Page, locator: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Enabled', locator, undefined, () =>
    expect(page.locator(locator)).toBeEnabled(), false, screenshotOnSuccess
  );
}

export async function assertDisabled(page: Page, locator: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Disabled', locator, undefined, () =>
    expect(page.locator(locator)).toBeDisabled(), false, screenshotOnSuccess
  );
}

// Page-level
export async function assertUrlContains(page: Page, expected: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert URL Contains', 'Current URL', expected, async () =>
    expect(page.url()).toContain(expected), true, screenshotOnSuccess
  );
}

export async function assertTitleEquals(page: Page, expected: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Title Equals', 'Page Title', expected, () =>
    expect(page).toHaveTitle(expected), true, screenshotOnSuccess
  );
}

export async function assertTextEqualsDirectly(page: Page, actual: string, expected: string, label = 'Text Comparison', screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Text Equals (Direct)', label, expected, async () => {
    expect(actual.trim()).toBe(expected.trim());
  }, true, screenshotOnSuccess);
}

export async function assertAllValuesPresent(page: Page, locator: string, expectedValues: string[]) {
  await assertStep(page, 'Assert All Values Present', locator, expectedValues.join(', '), async () => {
    const actual = await page.locator(locator).textContent() || '';
    const allPresent = expectedValues.every(val => actual.includes(val));
    expect(allPresent).toBeTruthy();
  });
}

export async function assertValueIsNotEmpty(page: Page, locator: string, screenshotOnSuccess = false) {
  await assertStep(page, 'Assert Value Is Not Empty', locator, 'Not empty', async () => {
    const value = await page.locator(locator).inputValue();
    expect(value.trim()).not.toBe('');
  }, false, screenshotOnSuccess);
}

