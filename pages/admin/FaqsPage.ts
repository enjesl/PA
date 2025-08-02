import { BasePage } from './BasePage';
import { FaqsPageLocators } from '@locators';
import { assertValueEquals, assertDisabled, assertEnabled, assertTextEquals, assertVisible, cmdClick, cmdFill, cmdGetText, cmdPress, cmdKeyboardPress, cmdSelectMatMultiOptions } from '@commands';
import { CommonPage } from './CommonPage';
import { cmdSelectMatOption } from '@commands';
import { generateAutoLetterSpecial, generateAutoMixed, generateOnlyNumbers, generateOnlySpecial } from 'utils/generateAndStore';

export class FaqsPage extends BasePage {

    /**
     * Verifies the visibility and disabled state of the search FAQs fields.
     * Checks that all relevant fields are visible and that the Search and Clear All buttons are disabled.
     */
    async verifySearchFaqsFieldVisibility() {
        await assertVisible(this.page, FaqsPageLocators.labelHeaderSearch, true);
        await assertVisible(this.page, FaqsPageLocators.selectPlatforms, true);
        await assertVisible(this.page, FaqsPageLocators.selectUserGroup, true);
        await assertVisible(this.page, FaqsPageLocators.textFieldEnterHeader, true);
        await assertVisible(this.page, FaqsPageLocators.selectStatus, true);
        await assertDisabled(this.page, FaqsPageLocators.buttonSearch, true);
        await assertDisabled(this.page, FaqsPageLocators.buttonClearAll, true);
    }

    async verifyFaqsTableHeaderVisibility(expectedTableHeaders: string[]) {
        for (const headerText of expectedTableHeaders) {
            const headerLocator = FaqsPageLocators.tableHeaders(headerText);
            await assertVisible(this.page, headerLocator, true);
        }
    }

    async verifyCreateFaqsButtonVisibility() {
        await assertVisible(this.page, FaqsPageLocators.buttonCreateFaqs, true);
        await assertEnabled(this.page, FaqsPageLocators.buttonCreateFaqs, true);
    }

    async FillSearchFilters(optionPlatformValue: string, optionUserGroupValue: string, headerValue: string, optionStatusValue: string) {
        const commonPage = new CommonPage(this.page);
        await assertVisible(this.page, FaqsPageLocators.labelHeaderSearch);
        await cmdSelectMatOption(this.page, FaqsPageLocators.selectPlatformsDownArrow, 'mat-option span', undefined, true, [optionPlatformValue]);
        await assertVisible(this.page, FaqsPageLocators.selectUserGroupDownArrow);
        await cmdSelectMatMultiOptions(this.page, FaqsPageLocators.selectUserGroupDownArrow, 'mat-option span', optionUserGroupValue ? [optionUserGroupValue] : [], true, 2);
        await assertVisible(this.page, FaqsPageLocators.textFieldEnterHeader);
        await cmdFill(this.page, FaqsPageLocators.textFieldEnterHeader, headerValue);
        await assertVisible(this.page, FaqsPageLocators.selectStatusDownArrow);
        await cmdClick(this.page, FaqsPageLocators.selectStatusDownArrow);
        await commonPage.selectMatOption(optionStatusValue);
    }


    async verifyClearFilledSearchFilter() {
        await assertVisible(this.page, FaqsPageLocators.selectPlatformsPlaceHolder);
        await assertVisible(this.page, FaqsPageLocators.selectUserGroupPlaceHolder);
        await assertTextEquals(this.page, FaqsPageLocators.textFieldEnterHeader, '');
        await assertVisible(this.page, FaqsPageLocators.selectStatusPlaceHolder);
        await assertDisabled(this.page, FaqsPageLocators.buttonSearch, true);
        await assertDisabled(this.page, FaqsPageLocators.buttonClearAll, true);
    }

    async clickSearchButton() {
        await assertVisible(this.page, FaqsPageLocators.buttonSearch);
        await assertEnabled(this.page, FaqsPageLocators.buttonSearch, true);
        await cmdClick(this.page, FaqsPageLocators.buttonSearch);
    }

    async clickClearAllButton() {
        await assertVisible(this.page, FaqsPageLocators.buttonClearAll);
        await assertEnabled(this.page, FaqsPageLocators.buttonClearAll, true);
        await cmdClick(this.page, FaqsPageLocators.buttonClearAll);
    }

    async clickCreateFaqsButton() {
        await assertVisible(this.page, FaqsPageLocators.buttonCreateFaqs);
        await assertEnabled(this.page, FaqsPageLocators.buttonCreateFaqs, true);
        await cmdClick(this.page, FaqsPageLocators.buttonCreateFaqs);
    }

    /**
     * Clicks the ellipsis (edit) button for the given 1-based row number.
     * @param rowNumber The 1-based index of the row (1 = first row)
     */
    async clickEllipsisButtonByRow(rowNumber: number) {
        const zeroBasedIndex = rowNumber - 1; // internally adjust for zero-based index
        const locator = FaqsPageLocators.getEllipsisButtonByRow(zeroBasedIndex);
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator);
    }

    async clickEllipsisButtonByHeaderText(headerText: string) {
        const locator = FaqsPageLocators.getEllipsisButtonByHeaderText(headerText);
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator);
    }

    async getStatusByRow(rowNumber: number): Promise<string> {
        const zeroBasedIndex = rowNumber - 1; // internally adjust for zero-based index
        const locator = FaqsPageLocators.getStatusLocatorByRow(zeroBasedIndex);
        await assertVisible(this.page, locator, true);
        const status = (await cmdGetText(this.page, locator)) ?? '';
        return status;
    }

    async getStatusByHeaderText(headerText: string): Promise<string> {
        const locator = FaqsPageLocators.getStatusByHeaderText(headerText);
        await assertVisible(this.page, locator, true);
        const status = (await cmdGetText(this.page, locator)) ?? '';
        return status;
    }

    async clickEllipsisMenuItem(action: 'Edit' | 'Delete' | 'View' | 'Mark Inactive') {
        const locatorMap: Record<string, string> = {
            Edit: FaqsPageLocators.menuItemEdit,
            Delete: FaqsPageLocators.menuItemDelete,
            View: FaqsPageLocators.menuItemView,
            'Mark Inactive': FaqsPageLocators.menuItemMarkInactive,
        };
        const locator = locatorMap[action];
        if (!locator) {
            throw new Error(`Invalid action: ${action}`);
        }
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator);
    }

    async fillManageFaqForm(platform: string, userGroup: string, status: string, headerText: string) {
        const commonPage = new CommonPage(this.page);

        await assertVisible(this.page, FaqsPageLocators.selectPlatformsInManageFaqForm);
        await cmdClick(this.page, FaqsPageLocators.selectPlatformsInManageFaqForm);
        await commonPage.selectMatOption(platform);

        await assertVisible(this.page, FaqsPageLocators.selectUserGroupManage);
        await cmdClick(this.page, FaqsPageLocators.selectUserGroupManage);
        await commonPage.selectMatOption(userGroup);

        await assertVisible(this.page, FaqsPageLocators.selectStatusManage);
        await cmdClick(this.page, FaqsPageLocators.selectStatusManage);
        await commonPage.selectMatOption(status);

        await assertVisible(this.page, FaqsPageLocators.textFieldEnterHeaderManage);
        await cmdFill(this.page, FaqsPageLocators.textFieldEnterHeaderManage, headerText);
    }

    async verifyManageFaqFormCleared(platformPlaceholder: string, userGroupPlaceholder: string, statusPlaceholder: string) {
        await assertTextEquals(this.page, FaqsPageLocators.selectPlatformsPlaceHolder, platformPlaceholder);
        await assertTextEquals(this.page, FaqsPageLocators.selectUserGroupPlaceHolder, userGroupPlaceholder);
        await assertTextEquals(this.page, FaqsPageLocators.selectStatusPlaceHolder, statusPlaceholder);
        await assertValueEquals(this.page, FaqsPageLocators.textFieldEnterHeaderManage, '');
    }

}