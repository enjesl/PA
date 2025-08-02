import { Page, Locator, Response } from '@playwright/test';
import { allure } from 'allure-playwright';

type CommandMeta = {
  command: string;
  locator?: string;
  input?: string;
  output?: string;
  screenshotOnError?: boolean;
  screenshotAfter?: boolean;
};

type StepContext = {
  setInput: (input: string) => void;
  setOutput: (output: string) => void;
};

export async function commandStep<T>(
  page: Page,
  meta: CommandMeta,
  action: (ctx: StepContext) => Promise<T>
): Promise<T> {
  const {
    command,
    locator,
    input: initialInput,
    output: initialOutput,
    screenshotOnError = true,
    screenshotAfter = false,
  } = meta;

  let input = initialInput;
  let output = initialOutput;

  const timestamp = new Date().toLocaleTimeString();

  const stepContext: StepContext = {
    setInput: (val: string) => {
      input = val;
    },
    setOutput: (val: string) => {
      output = val;
    },
  };

  return await allure.step(`${command}`, async () => {
    try {
      const result = await action(stepContext);

      const stepInfo = [command, locator && `Locator: ${locator}`, input && `Input: ${input}`, output && `Output: ${output}`]
        .filter(Boolean)
        .join(' | ');

      console.log(`[${timestamp}] ➤ ${stepInfo}`);

      if (input) allure.attachment('Input', input, 'text/plain');
      if (output) allure.attachment('Output', output, 'text/plain');

      if (screenshotAfter) {
        const screenshot = await page.screenshot();
        allure.attachment('Screenshot After', screenshot, 'image/png');
      }

      return result;
    } catch (error) {
      if (screenshotOnError) {
        const errorShot = await page.screenshot();
        allure.attachment('Error Screenshot', errorShot, 'image/png');
      }
      console.error(`[${timestamp}]  Error during: ${command}`);
      throw error;
    }
  });
}


//  Common UI Command Wrappers with Visibility Waits Where Applicable

export async function cmdClick(page: Page, locator: string | Locator, screenshotAfter: boolean = false, logLabel?: string) {
  const element = typeof locator === 'string' ? page.locator(locator) : locator;
  await element.waitFor({ state: 'visible' });
  const label = logLabel || (typeof locator === 'string' ? locator : 'Custom Locator');
  return commandStep(page, { command: 'Click', locator: label, screenshotAfter, }, () => element.click());
}


export async function cmdFill(page: Page, locator: string, value: string) {
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Fill', locator, input: value }, () => page.fill(locator, value));
}


export async function cmdPress(page: Page, locator: string, key: string) {
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Press Key', locator, input: key }, () => page.press(locator, key));
}

export async function cmdCheck(page: Page, locator: string) {
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Check', locator }, () => page.check(locator));
}

export async function cmdUncheck(page: Page, locator: string) {
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Uncheck', locator }, () => page.uncheck(locator));
}

export async function cmdSelectOption(page: Page, locator: string, value: string | string[]) {
  const valStr = Array.isArray(value) ? value.join(',') : value;
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Select Option', locator, input: valStr }, () => page.selectOption(locator, value));
}

export async function cmdHover(page: Page, locator: string) {
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Hover', locator }, () => page.hover(locator));
}

export async function cmdScrollIntoView(page: Page, locator: string) {
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Scroll Into View', locator }, () =>
    page.locator(locator).scrollIntoViewIfNeeded()
  );
}

export async function cmdGetText(page: Page, locator: string) {
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Get Text', locator }, () => page.textContent(locator));
}

export async function cmdGetValue(page: Page, locator: string) {
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Get Value', locator }, () => page.inputValue(locator));
}

export async function cmdWaitForVisible(page: Page, locator: string, timeout: number = 10000) {
  const target = page.locator(locator).first(); // ensures only one element
  return commandStep(page, { command: `Wait for Visible (${timeout}ms)`, locator }, () =>
    target.waitFor({ state: 'visible', timeout })
  );
}



export async function cmdWaitForHidden(page: Page, locator: string, timeout: number = 10000) {
  return commandStep(page, { command: `Wait for Hidden (${timeout}ms)`, locator }, () =>
    page.locator(locator).waitFor({ state: 'hidden', timeout })
  );
}


export async function cmdIsVisible(page: Page, locator: string): Promise<boolean> {
  return commandStep(page, { command: 'Check Visibility', locator }, () => page.isVisible(locator));
}

export async function cmdIsChecked(page: Page, locator: string): Promise<boolean> {
  return commandStep(page, { command: 'Check Checked Status', locator }, () => page.isChecked(locator));
}

export async function cmdUploadFile(page: Page, locator: string, filePath: string) {
  await page.locator(locator).waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Upload File', locator, input: filePath }, () =>
    page.setInputFiles(locator, filePath)
  );
}

export async function cmdClickFirst(page: Page, locator: string, screenshotAfter = false) {
  const firstElement = page.locator(locator).first();
  await firstElement.waitFor({ state: 'visible' });
  return commandStep(page, { command: 'Click First Match', locator: `${locator} (first)`, screenshotAfter }, () =>
    firstElement.click()
  );
}

export async function cmdSetOrientation(page: Page, orientation: 'portrait' | 'landscape') {
  const newViewport = orientation === 'portrait'
    ? { width: 375, height: 812 }
    : { width: 812, height: 375 };

  return commandStep(page, {
    command: `Set Orientation to ${orientation.toUpperCase()}`,
    output: `${newViewport.width}x${newViewport.height}`,
    screenshotAfter: true
  }, () => page.setViewportSize(newViewport));
}

export async function cmdCaptureScreenshot(page: Page, label: string = 'Screenshot') {
  const screenshot = await page.screenshot();
  allure.attachment(label, screenshot, 'image/png');
  console.log(`[${new Date().toLocaleTimeString()}]  Screenshot captured: ${label}`);
}

export async function cmdSetViewportSize(page: Page, width: number, height: number, label?: string) {
  return commandStep(page, {
    command: `Set Viewport Size`,
    output: `${width}x${height}`,
    locator: label || '',
    screenshotAfter: true
  }, () => page.setViewportSize({ width, height }));
}


export async function cmdResetToDefaultViewport(page: Page) {
  const defaultViewport = { width: 1280, height: 720 }; // match your config
  return commandStep(page, {
    command: 'Reset to Default Viewport',
    output: `${defaultViewport.width}x${defaultViewport.height}`,
    screenshotAfter: true
  }, () => page.setViewportSize(defaultViewport));
}


/**
 * Captures all network responses and logs any 4xx or 5xx responses
 * as soft failures with Allure attachment.
 *
 * Should be called after key user interactions or navigation.
 */
export async function cmdCaptureAndCheckNetworkErrors(page: Page) {
  const errorResponses: { url: string; status: number; statusText: string }[] = [];

  // Temporary array to keep promises for pending requests
  const pendingResponses: Promise<void>[] = [];

  // Attach response listener only during this scoped time
  const responseHandler = (response: Response) => {
    const promise = (async () => {
      const status = response.status();
      if (status >= 400) {
        errorResponses.push({
          url: response.url(),
          status,
          statusText: response.statusText(),
        });
      }
    })();
    pendingResponses.push(promise);
  };
  page.on('response', responseHandler);
  // Wait for network to be idle
  await page.waitForLoadState('networkidle');
  // Wait for any response handlers still in progress
  await Promise.allSettled(pendingResponses);
  // Stop listening
  page.off('response', responseHandler);
  // Log if errors found
  if (errorResponses.length > 0) {
    const log = errorResponses.map(res => `[${res.status}] ${res.statusText} → ${res.url}`).join('\n');

    allure.attachment('Network Errors (4xx/5xx)', log, 'text/plain');
    console.warn('Soft failure: Network errors detected:\n' + log);
  }
}

/**
 * Command to log and attach localStorage/sessionStorage from the browser.
 * @param page Playwright Page object
 * @param type Either 'localStorage' or 'sessionStorage'
 */
export async function cmdLogStorage(page: Page, type: 'localStorage' | 'sessionStorage' = 'localStorage') {
  const storageName = type === 'sessionStorage' ? 'sessionStorage' : 'localStorage';

  const data = await page.evaluate((storeType) => {
    const entries: Record<string, string> = {};
    const storage = storeType === 'sessionStorage' ? window.sessionStorage : window.localStorage;

    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key) entries[key] = storage.getItem(key) || '';
    }
    return entries;
  }, storageName);

  const formatted = JSON.stringify(data, null, 2);

  console.log(`\n🧾 ${storageName} Contents:\n`, formatted);
  allure.attachment(`${storageName} Snapshot`, formatted, 'application/json');

  return data;
}

export async function cmdIsDisabled(page: Page, locator: string): Promise<boolean> {
  await page.locator(locator).waitFor({ state: 'attached' });

  return commandStep(page, {
    command: 'Check Disabled Status',
    locator,
  }, async () => {
    const isDisabled = await page.locator(locator).isDisabled();
    allure.attachment('Disabled State', `${isDisabled}`, 'text/plain');
    return isDisabled;
  });
}


/**
 * Types a string using keyboard events, one character at a time.
 * Use when filling fields like CKEditor or custom inputs that don't support `.fill()`.
 */
export async function cmdKeyboardType(page: Page, content: string) {
  return commandStep(page, {
    command: 'Keyboard Type',
    input: content,
  }, async () => {
    await page.waitForTimeout(100); // slight delay to ensure focus
    await page.keyboard.type(content, { delay: 50 });
  });
}


/**
 * Sends a single key press like 'Enter', 'Tab', etc.
 */
export async function cmdKeyboardPress(page: Page, key: string) {
  return commandStep(page, {
    command: 'Keyboard Press',
    input: key,
  }, async () => {
    await page.waitForTimeout(100);
    await page.keyboard.press(key);
  });
}

/**
 * Sends a keyboard shortcut like Ctrl+B or Ctrl+A.
 * Order matters, will press all keys down, then release in reverse order.
 */
export async function cmdKeyboardShortcut(page: Page, keys: string[]) {
  const shortcut = keys.join(' + ');
  return commandStep(page, {
    command: 'Keyboard Shortcut',
    input: shortcut,
  }, async () => {
    for (const key of keys) {
      await page.keyboard.down(key);
    }
    for (const key of [...keys].reverse()) {
      await page.keyboard.up(key);
    }
  });
}


/**
 * Pauses execution with a custom message and logs it to Allure.
 * @param page Playwright Page object
 * @param message Message to log (shown in report and console)
 * @param durationMs Duration to pause in milliseconds
 */
export async function cmdPause(page: Page, message: string, durationMs: number) {
  //  Runtime check for duration
  if (typeof durationMs !== 'number' || isNaN(durationMs)) {
    throw new Error(`Invalid duration for cmdPause(): expected number, got "${durationMs}"`);
  }

  const timestamp = new Date().toLocaleTimeString();
  const pauseInfo = `Pause: ${message} | Duration: ${durationMs}ms`;

  console.log(`[${timestamp}] ⏸ ${pauseInfo}`);

  return commandStep(page, {
    command: 'Pause Execution',
    input: message,
    output: `${durationMs}ms`,
    screenshotAfter: false,
  }, async () => {
    allure.attachment('Pause Reason', message, 'text/plain');
    await page.waitForTimeout(durationMs);
  });
}


/**
 * Writes a custom message to Allure report as a step or attachment.
 * @param title Step or log title
 * @param message Content to attach to the report
 * @param asStep If true, logs as a step; otherwise, as an attachment
 */
export async function writeToReport(title: string, message: string, asStep = false) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}]  ${title} → ${message}`);

  if (asStep) {
    await allure.step(`${title}`, async () => {
      allure.attachment(title, message, 'text/plain');
    });
  } else {
    allure.attachment(title, message, 'text/plain');
  }
}

export async function cmdGetTextContent(page: Page, locator: string): Promise<string> {
  await page.locator(locator).waitFor({ state: 'visible' });

  return commandStep(page, { command: 'Get Text Content', locator }, async () => {
    const text = await page.locator(locator).textContent();
    if (text === null) {
      throw new Error(`No text content found for locator: ${locator}`);
    }
    return text.trim();
  });
}
