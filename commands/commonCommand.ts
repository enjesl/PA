// commonCommand.ts
import { Page, ElementHandle } from '@playwright/test';
import { cmdClick, cmdPause, commandStep } from '@commands';
import { allure } from 'allure-playwright';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Select a <mat-option> from a dropdown.
 * You can select either a specific value or let it pick randomly.
 *
 * @param page Playwright Page object
 * @param dropdownLocator Locator for the <mat-select> trigger
 * @param optionLocator Locator for all <mat-option> text elements
 * @param valueToSelect Specific value to select (optional)
 * @param random If true, selects a random option
 * @param excludeValues Optional array of values to exclude from random selection
 */
export async function cmdSelectMatOption(
    page: Page,
    dropdownLocator: string,
    optionLocator: string,
    valueToSelect?: string,
    random = false,
    excludeValues: string[] = []
) {
    return commandStep(page, {
        command: random ? 'Select Random Mat Option' : 'Select Specific Mat Option',
        locator: dropdownLocator,
        input: valueToSelect || 'random'
    }, async (stepContext) => {
        console.log(`[${new Date().toLocaleTimeString()}] ➤ Clicking dropdown: ${dropdownLocator}`);
        await page.locator(dropdownLocator).click();
        await page.waitForSelector(optionLocator);

        const options = await page.locator(optionLocator).elementHandles();

        if (options.length === 0) throw new Error('No mat options found.');

        let selectedText = '';
        let optionToClick;

        if (random) {
            const filtered: { option: any; text: string }[] = [];
            for (const option of options) {
                const text = await option.evaluate(el => el.textContent?.trim() || '');
                if (!excludeValues.includes(text)) {
                    filtered.push({ option, text });
                }
            }

            if (filtered.length === 0) throw new Error('No selectable options after exclusions.');

            const index = Math.floor(Math.random() * filtered.length);
            optionToClick = filtered[index].option;
            selectedText = filtered[index].text;
        } else {
            for (const option of options) {
                const text = await option.evaluate(el => el.textContent?.trim() || '');
                if (text === valueToSelect?.trim()) {
                    optionToClick = option;
                    selectedText = text;
                    break;
                }
            }
        }

        if (!optionToClick) throw new Error(`Option '${valueToSelect}' not found.`);

        // Re-acquire locator using innerText
        // const safeLocator = page.locator(`${optionLocator} >> text="${selectedText}"`);
        await optionToClick.scrollIntoViewIfNeeded();
        await optionToClick.hover();
        await optionToClick.click();


        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}]  Selected Option: ${selectedText}`);

        // Attach to Allure
        allure.attachment('Selected Mat Option', selectedText, 'text/plain');

        // Update step log with actual input/output
        stepContext.setInput(random ? `Randomly Selected: ${selectedText}` : selectedText);
        stepContext.setOutput(selectedText);

        await page.waitForTimeout(300); // Optional small delay
        return selectedText;
    });
}

export async function cmdTypeAndSelectMatOption(
    page: Page,
    dropdownLocator: string,
    optionLocator: string,
    valueToSelect: string,
    random = false,
    excludeValues: string[] = []
) {
    return commandStep(page, {
        command: random ? 'Select Random Mat Option' : 'Select Specific Mat Option',
        locator: dropdownLocator,
        input: valueToSelect || 'random'
    }, async (stepContext) => {
        console.log(`[${new Date().toLocaleTimeString()}] ➤ Clicking dropdown: ${dropdownLocator}`);
        await page.locator(dropdownLocator).fill(valueToSelect);
        //await page.waitForTimeout(10000);
        await page.waitForSelector(optionLocator);

        const options = await page.locator(optionLocator).elementHandles();

        if (options.length === 0) throw new Error('No mat options found.');

        let selectedText = '';
        let optionToClick;

        if (random) {
            const filtered: { option: any; text: string }[] = [];
            for (const option of options) {
                const text = await option.evaluate(el => el.textContent?.trim() || '');
                if (!excludeValues.includes(text)) {
                    filtered.push({ option, text });
                }
            }

            if (filtered.length === 0) throw new Error('No selectable options after exclusions.');

            const index = Math.floor(Math.random() * filtered.length);
            optionToClick = filtered[index].option;
            selectedText = filtered[index].text;
        } else {
            for (const option of options) {
                const text = await option.evaluate(el => el.textContent?.trim() || '');
                if (text === valueToSelect?.trim()) {
                    optionToClick = option;
                    selectedText = text;
                    break;
                }
            }
        }

        if (!optionToClick) throw new Error(`Option '${valueToSelect}' not found.`);

        await optionToClick.scrollIntoViewIfNeeded();
        await optionToClick.hover();
        await optionToClick.click();

        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}]  Selected Option: ${selectedText}`);

        // Attach to Allure
        allure.attachment('Selected Mat Option', selectedText, 'text/plain');

        // Update step log with actual input/output
        stepContext.setInput(random ? `Randomly Selected: ${selectedText}` : selectedText);
        stepContext.setOutput(selectedText);

        await page.waitForTimeout(300); // Optional small delay
        return selectedText;
    });
}
/**
 * Get all visible mat-option values (e.g., for verification, reuse, validation)
 */
export async function getAllMatOptionValues(
    page: Page,
    dropdownLocator: string,
    optionLocator: string
): Promise<string[]> {
    return commandStep(page, {
        command: 'Get All Mat Option Values',
        locator: dropdownLocator,
    }, async () => {
        await page.locator(dropdownLocator).click();
        await page.waitForSelector(optionLocator);

        const texts = await page.locator(optionLocator).evaluateAll((elements) => {
            return elements.map(el => el.textContent?.trim() || '').filter(Boolean);
        });

        allure.attachment('Available Mat Options', JSON.stringify(texts, null, 2), 'application/json');
        console.log(`[${new Date().toLocaleTimeString()}] 🧾 Found ${texts.length} options.`);

        await page.keyboard.press('Escape'); // close dropdown
        return texts;
    });
}


export async function cmdSelectMatMultiOptions(
    page: Page,
    dropdownLocator: string,
    optionLocator: string,
    valuesToSelect: string[] = [],
    random = false,
    numberToSelect = 1,
    excludeValues: string[] = []
) {
    return commandStep(page, {
        command: random ? 'Select Random Multi Mat Select' : 'Specific Multi Mat Select',
        locator: dropdownLocator,
        input: random ? `Random (${numberToSelect})` : valuesToSelect.join(', ')
    }, async (stepContext) => {
        await page.locator(dropdownLocator).click();
        await page.waitForSelector(optionLocator);

        const options = await page.locator(optionLocator).elementHandles();
        const selected: string[] = [];

        if (options.length === 0) throw new Error('No mat options found.');

        if (random) {
            const selectable: { option: ElementHandle; text: string }[] = [];

            for (const option of options) {
                const text = await option.evaluate(el => el.textContent?.trim() || '');
                if (!excludeValues.includes(text)) {
                    selectable.push({ option, text });
                }
            }

            if (selectable.length < numberToSelect) {
                throw new Error(`Not enough selectable options. Needed: ${numberToSelect}, Found: ${selectable.length}`);
            }

            const shuffled = selectable.sort(() => 0.5 - Math.random()).slice(0, numberToSelect);
            for (const { option, text } of shuffled) {
                await option.scrollIntoViewIfNeeded();
                await option.hover();
                await option.click();
                selected.push(text);
            }

        } else {
            for (const value of valuesToSelect) {
                let found = false;

                for (const option of options) {
                    const text = await option.evaluate(el => el.textContent?.trim() || '');
                    if (text === value.trim()) {
                        await option.scrollIntoViewIfNeeded();
                        await option.hover();
                        await option.click();
                        selected.push(text);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    throw new Error(`Multi-select option '${value}' not found.`);
                }
            }
        }

        await page.keyboard.press('Escape');

        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}]  Selected: ${selected.join(', ')}`);
        allure.attachment('Selected Multi Options', selected.join(', '), 'text/plain');

        stepContext.setInput(random ? `Random: ${selected.join(', ')}` : selected.join(', '));
        stepContext.setOutput(selected.join(', '));
        return selected;
    });
}


/**
 * Clear all selected chips (tags) from a scoped section of the DOM.
 *
 * @param page Playwright Page object
 * @param parentLocator Locator string for the container holding the chips (e.g., dropdown, form section)
 */
export async function cmdClearMatSelectedChips(
    page: Page,
    parentLocator: string
) {
    return commandStep(page, {
        command: `Clear Mat Chips`,
        locator: parentLocator
    }, async (stepContext) => {
        const container = page.locator(parentLocator);
        const removeIcons = container.locator('mat-icon.mat-mdc-chip-remove');
        const count = await removeIcons.count();

        if (count === 0) {
            const msg = `[Chip Clear] No chips found in '${parentLocator}'`;
            console.log(msg);
            stepContext.setOutput('No chips to clear');
            return;
        }

        console.log(`[Chip Clear] Found ${count} chip(s) in '${parentLocator}'`);

        for (let i = 0; i < count; i++) {
            await removeIcons.nth(0).click(); // DOM changes on each click
            await page.waitForTimeout(100);
        }

        const cleared = `Cleared ${count} chip(s) in '${parentLocator}'`;
        console.log(`[Chip Clear]  ${cleared}`);
        stepContext.setOutput(cleared);
        allure.attachment('Cleared Chips Info', cleared, 'text/plain');
    });
}

/**
 * Upload an image file using a hidden <input type="file"> element.
 *
 * @param page Playwright Page object
 * @param fileInputLocator Locator for the <input type="file"> element
 * @param imagePath Path to the image file to upload (relative or absolute)
 */
export async function cmdUploadImage(
    page: Page,
    fileInputLocator: string,
    imagePath: string,
    waitTime: number = 300
) {
    return commandStep(page, {
        command: 'Upload Image',
        locator: fileInputLocator,
        input: imagePath
    }, async (stepContext) => {
        const fullPath = path.resolve(imagePath);

        if (!fs.existsSync(fullPath)) {
            const errorMsg = `[${new Date().toLocaleTimeString()}]  File not found: ${fullPath}`;
            console.error(errorMsg);
            throw new Error(errorMsg);
        }

        const fileName = path.basename(fullPath);
        console.log(`[${new Date().toLocaleTimeString()}]  Uploading file: ${fileName}`);

        const fileInput = page.locator(fileInputLocator);
        await fileInput.setInputFiles(fullPath);

        stepContext.setInput(fileName);
        stepContext.setOutput('Upload triggered via input[type=file]');

        allure.attachment('Uploaded Image File', fs.readFileSync(fullPath), 'image/png');

        await page.waitForTimeout(waitTime); // Optional wait for preview/upload completion
    });
}


export async function pickDateByCalendar(
    page: Page,
    calendarTriggerLocator: string,
    dateString: string,
    locators: {
        headerButton: string;
        yearCell: (year: number) => string;
        monthCell: (month: string) => string;
        dayCell: (day: number) => string;
    },
    pauseDuration = 300
) {
    return commandStep(page, {
        command: 'Pick Date',
        locator: calendarTriggerLocator,
        input: dateString
    }, async () => {
        const [year, month, day] = dateString.split('-').map((val, i) => i === 1 ? parseInt(val) - 1 : parseInt(val));
        const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
        const monthText = monthNames[month];

        // Open calendar
        await cmdClick(page, calendarTriggerLocator, false, 'Click calendar input');

        // Open month/year view
        await cmdClick(page, locators.headerButton, false, 'Click to open month/year view');
        await cmdPause(page, 'Pause after opening month/year view', pauseDuration);

        // Select year (ensure strict locator)
        const yearLocator = page.locator(`${locators.yearCell(year)}[not(@aria-disabled='true')]`).first();
        await cmdClick(page, yearLocator, false, `Select year ${year}`);
        await cmdPause(page, `Pause after selecting year ${year}`, pauseDuration);

        // Select month
        const monthLocator = page.locator(locators.monthCell(monthText));
        await cmdClick(page, monthLocator, false, `Select month ${monthText}`);
        await cmdPause(page, `Pause after selecting month ${monthText}`, pauseDuration);

        // Select day (strict and not disabled)
        const dayLocator = page.locator(`${locators.dayCell(day)}[not(@aria-disabled='true')]`).first();
        await cmdClick(page, dayLocator, false, `Select day ${day}`);
        await cmdPause(page, `Pause after selecting day ${day}`, pauseDuration);
    });
}
