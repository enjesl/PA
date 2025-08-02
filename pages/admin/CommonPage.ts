import { BasePage } from '@pages';
import { CommonLocators } from '@locators';
import { cmdSetOrientation, cmdResetToDefaultViewport, cmdSetViewportSize, cmdWaitForVisible, assertTextEqualsDirectly, cmdClick, assertVisible, cmdPause, cmdWaitForHidden, assertTextEquals, getAllMatOptionValues, cmdSelectMatOption, cmdGetText, cmdGetTextContent } from '@commands';

export class CommonPage extends BasePage {
    /**
     * Set to mobile view (portrait or landscape)
     */
    async setMobileView(orientation: 'portrait' | 'landscape') {
        const size = orientation === 'portrait'
            ? { width: 375, height: 812 }
            : { width: 812, height: 375 };

        await cmdSetViewportSize(this.page, size.width, size.height, `Mobile ${orientation}`);
    }

    /**
     * Set to tablet view (portrait or landscape)
     */
    async setTabletView(orientation: 'portrait' | 'landscape') {
        const size = orientation === 'portrait'
            ? { width: 768, height: 1024 }
            : { width: 1024, height: 768 };

        await cmdSetViewportSize(this.page, size.width, size.height, `Tablet ${orientation}`);
    }

    /**
     * Set to desktop view (landscape by default)
     */
    async setDesktopView() {
        await cmdResetToDefaultViewport(this.page);
    }

    /**
     * Set orientation using the basic command (default mobile)
     */
    async setOrientation(orientation: 'portrait' | 'landscape') {
        await cmdSetOrientation(this.page, orientation);
    }


    /**
     * Verifies breadcrumb text content against an expected array.
     */
    async verifyBreadcrumb(expectedBreadcrumbs: string[]) {
        // Reuse visibility wrapper for breadcrumb check

        await cmdWaitForVisible(this.page, CommonLocators.breadcrumbItems);

        const breadcrumbElements = await this.page.locator(CommonLocators.breadcrumbTextNodes).all();

        const actualTexts: string[] = [];
        for (const el of breadcrumbElements) {
            const text = await el.textContent();
            actualTexts.push(text?.trim() || '');
        }

        await assertTextEqualsDirectly(
            this.page,
            String(actualTexts.length),
            String(expectedBreadcrumbs.length),
            'Breadcrumb Items Count'
        );

        for (let i = 0; i < actualTexts.length; i++) {
            await assertTextEqualsDirectly(
                this.page,
                actualTexts[i],
                expectedBreadcrumbs[i],
                `Breadcrumb Text [${i + 1}]`
            );
        }
    }

    /**
     * Clicks on a breadcrumb link using exact text match, with readable logging.
     * @param linkText The exact breadcrumb text to click.
     */
    async clickBreadcrumbByText(linkText: string): Promise<void> {
        await cmdWaitForVisible(this.page, CommonLocators.breadcrumbItems);

        const breadcrumbElements = await this.page.locator(CommonLocators.breadcrumbTextNodes).all();

        for (const el of breadcrumbElements) {
            const text = (await el.textContent())?.trim();
            if (text === linkText) {
                // Use readable label for command log
                const locatorLabel = `Breadcrumb[text="${linkText}"]`;
                await cmdClick(this.page, el, true, locatorLabel); // 👈 use locator label for reporting
                return;
            }
        }

        throw new Error(`Breadcrumb link with exact text "${linkText}" was not found.`);
    }

    /**
     * Selects a <mat-option> dropdown item by visible text.
     * @param optionText The visible text of the mat-option
     */
    async selectMatOption(optionText: string) {
        const optionLocator = CommonLocators.matOptions(optionText);
        await assertVisible(this.page, optionLocator, true);
        await cmdClick(this.page, optionLocator);
    }


    async clickingButton(buttonEle: string, loader: string): Promise<void> {
        await cmdClick(this.page, buttonEle)
        await cmdWaitForHidden(this.page, loader)
    }

    async clickingIconInSystemSettings(iconLocator: string, loaderTime: number, loaderLocator: string, headerLocator: string, expectedHeaderText: string): Promise<void> {
        await cmdClick(this.page, iconLocator);
        await cmdPause(this.page, 'Loading Issue', loaderTime);
        await cmdWaitForHidden(this.page, loaderLocator);
        await assertTextEquals(this.page, headerLocator, expectedHeaderText);
    }

    async clickEllipsisAction(ellipsis: string, actionButton: string): Promise<void> {
        await cmdClick(this.page, ellipsis)
        await cmdClick(this.page, actionButton)
    }


    async toggleToExpectedPeriod(
        toggleLocator: string,
        labelLocator: string,
        expected: 'AM' | 'PM',
        pauseDuration: number = 300 // optional, with default
    ): Promise<void> {
        await assertVisible(this.page, labelLocator);

        const currentText = await this.page.locator(labelLocator).textContent();
        const current = currentText?.trim().toUpperCase();
        const target = expected.toUpperCase();

        if (current === target) return;

        await cmdClick(this.page, toggleLocator);
        await cmdPause(this.page, `Toggle switched to ${expected}`, pauseDuration);
    }

    async validateDropdownFilterResults(
        dropdownTriggerLocator: string,
        optionLocator: string,
        tableRowLocator: string,
        searchButtonLocator: string,
        pauseDuration: number = 500
    ): Promise<{
        option: string;
        rowCount: number;
    } | null> {
        const allOptions = await getAllMatOptionValues(this.page, dropdownTriggerLocator, optionLocator);

        for (const option of allOptions) {
            await cmdSelectMatOption(this.page, dropdownTriggerLocator, optionLocator, option, false);
            await cmdPause(this.page, `Pause after selecting option "${option}"`, pauseDuration);

            await cmdClick(this.page, searchButtonLocator);
            await cmdPause(this.page, `Pause after clicking search for "${option}"`, pauseDuration);

            const rowCount = await this.page.locator(tableRowLocator).count();
            await cmdPause(this.page, `Pause after checking row count for "${option}"`, pauseDuration);

            console.log(`Option "${option}" → ${rowCount} rows`);

            if (rowCount === 0) {
                console.warn(`Found zero-result option: ${option}`);
                return { option, rowCount };
            }
        }

        // If no zero-result found, fail the step
        await assertTextEqualsDirectly(
            this.page,
            'false',
            'true',
            'No dropdown filter option resulted in 0 rows',
            true
        );

        return null;
    }


    async assertToasterMessage(toasterMessage: string): Promise<void> {
        // Wait for toaster to appear (adjust timeout if needed)
        await cmdWaitForVisible(this.page, CommonLocators.toasterMessageLocator);
        await cmdGetTextContent(this.page, CommonLocators.toasterMessageLocator)
        await assertTextEquals(this.page,CommonLocators.toasterMessageLocator,toasterMessage);
    }


}