import { BasePage, CommonPage } from '@pages';
import { AdminPageLocators, CommonLocators, ContentPageLocators } from '@locators';
import { assertVisible, assertTextEquals, cmdClick, cmdWaitForHidden, assertValueEquals, cmdFill, cmdSelectMatOption, assertTextEqualsDirectly, cmdIsVisible, assertDisabled } from '@commands';
import { generateAutoMixed } from '@utils';


export class ContentPage extends BasePage {
    /**
     * @param label
     * @param moduleDropDownText
     * @param platformDropDownText
     */
    async searchingAndValidatingRecordsInContent(label: string, waitTime: number, moduleDropDownText: string, platformDropDownText: string, firstRowContentTableIndex: number, secondRowContentTableIndex: number): Promise<void> {
        const commonPage = new CommonPage(this.page);
        await this.page.waitForLoadState('networkidle');
        const locator = AdminPageLocators.systemSettingIconByLabel(label);
        await assertVisible(this.page, locator);
        await assertTextEquals(this.page, ContentPageLocators.contentIconText, label);
        await commonPage.clickingIconInSystemSettings(locator, waitTime, CommonLocators.loader, ContentPageLocators.contentScreenHeader, label)
        let module: string = (await this.page.locator(ContentPageLocators.moduleColumnData(secondRowContentTableIndex)).textContent()) ?? ''
        let platform: string = (await this.page.locator(ContentPageLocators.platformsColumnData(secondRowContentTableIndex)).textContent()) ?? ''
        await cmdSelectMatOption(this.page, ContentPageLocators.selectModuleOrPlatformsDropdownField(moduleDropDownText), ContentPageLocators.selectModuleOrPlatformsDropdownList, module)
        await commonPage.clickingButton(ContentPageLocators.buttonSearch, CommonLocators.loader)
        await assertTextEquals(this.page, ContentPageLocators.moduleColumnData(firstRowContentTableIndex), module)
        await commonPage.clickingButton(ContentPageLocators.buttonClearAll, CommonLocators.loader)
        await cmdSelectMatOption(this.page, ContentPageLocators.selectModuleOrPlatformsDropdownField(platformDropDownText), ContentPageLocators.selectModuleOrPlatformsDropdownList, platform)
        await commonPage.clickingButton(ContentPageLocators.buttonSearch, CommonLocators.loader)
        await assertTextEquals(this.page, ContentPageLocators.platformsColumnData(firstRowContentTableIndex), platform)
        await commonPage.clickingButton(ContentPageLocators.buttonClearAll, CommonLocators.loader)
    }

    /**
     * @param firstRowContentTableIndex
     */
    async deletingRecordInContent(firstRowContentTableIndex: number): Promise<void> {
        const commonPage = new CommonPage(this.page);
        let range = (await this.page.locator(ContentPageLocators.paginationRange).textContent()) ?? ''
        let spl: string[] = range?.split('of')
        let num = Number(spl[1]) - 1
        await commonPage.clickEllipsisAction(ContentPageLocators.buttonEllipsis(firstRowContentTableIndex), ContentPageLocators.menuItemDelete)
        await cmdClick(this.page, CommonLocators.exitDialogYesButton)
        await cmdWaitForHidden(this.page, CommonLocators.loader)
        await assertVisible(this.page, ContentPageLocators.toastMessageBox)
        await cmdWaitForHidden(this.page, ContentPageLocators.toastMessageBox)
        let range1 = (await this.page.locator(ContentPageLocators.paginationRange).textContent()) ?? ''
        let spl1: string[] = range1?.split('of')
        await assertTextEqualsDirectly(this.page, String(num), spl1[1])
    }

    /**
     * @param label
     * @param moduleDropDownText
     * @param platformDropDownText
     */
    async creatingContentRecord(label: string, waitTime: number, moduleDropDownText: string, platformDropDownText: string, firstRowContentTableIndex: number, moduleValuesToSelect: string | undefined, randomModuleSelection: boolean, platformValuesToSelect: string | undefined, randomPlatformSelection: boolean): Promise<{ selectedModule: string; selectedPlatform: string }> {
        const commonPage = new CommonPage(this.page);
        let headerStatus: boolean = false
        await this.page.waitForLoadState('networkidle');
        const locator = AdminPageLocators.systemSettingIconByLabel(label);
        await commonPage.clickingIconInSystemSettings(locator, waitTime, CommonLocators.loader, ContentPageLocators.contentScreenHeader, label)
        await cmdClick(this.page, ContentPageLocators.buttonCreateContent)
        const selectedModule = await cmdSelectMatOption(this.page, ContentPageLocators.selectModuleOrPlatformsDropdownField(moduleDropDownText), ContentPageLocators.selectModuleOrPlatformsDropdownList, moduleValuesToSelect, randomModuleSelection)
        let character: string = await generateAutoMixed('headerAndReason', 15)
        if (!(await cmdIsVisible(this.page, ContentPageLocators.inputDisabledHeaderInCreateContent))) {
            await cmdFill(this.page, ContentPageLocators.inputEnterHeader, character);
            headerStatus = true;
        }
        await cmdFill(this.page, ContentPageLocators.textFieldEnterReason, character)
        const selectedPlatform = await cmdSelectMatOption(this.page, ContentPageLocators.selectModuleOrPlatformsDropdownField(platformDropDownText), ContentPageLocators.selectModuleOrPlatformsDropdownList, platformValuesToSelect, randomPlatformSelection)
        await commonPage.clickingButton(ContentPageLocators.buttonCreateAndUpdate, CommonLocators.loader)
        await assertVisible(this.page, ContentPageLocators.toastMessageBox)
        await cmdWaitForHidden(this.page, ContentPageLocators.toastMessageBox)
        await assertTextEquals(this.page, ContentPageLocators.moduleColumnData(firstRowContentTableIndex), selectedModule)
        await assertTextEquals(this.page, ContentPageLocators.platformsColumnData(firstRowContentTableIndex), selectedPlatform)
        if (headerStatus) {
            await assertTextEquals(this.page, ContentPageLocators.headerColumnData(firstRowContentTableIndex), character)
        } else {
            let headerValue: string = (await this.page.locator(ContentPageLocators.headerColumnData(firstRowContentTableIndex)).textContent()) ?? ''
            await assertTextEqualsDirectly(this.page, headerValue, ' ')
        }
        return { selectedModule, selectedPlatform }
    }

    /**
     * @param label
     * @param moduleDropDownText
     * @param platformDropDownText
     */
    async updatingContentRecord(label: string, waitTime: number, moduleDropDownText: string, platformDropDownText: string, firstRowContentTableIndex: number, moduleValuesToSelect: string | undefined, randomModuleSelection: boolean, platformValuesToSelect: string | undefined, randomPlatformSelection: boolean): Promise<void> {
        const commonPage = new CommonPage(this.page);
        let headerStatus: boolean = false
        await this.page.waitForLoadState('networkidle');
        const locator = AdminPageLocators.systemSettingIconByLabel(label);
        await commonPage.clickingIconInSystemSettings(locator, waitTime, CommonLocators.loader, ContentPageLocators.contentScreenHeader, label)
        let module: string = (await this.page.locator(ContentPageLocators.moduleColumnData(firstRowContentTableIndex)).textContent()) ?? ''
        let platform: string = (await this.page.locator(ContentPageLocators.platformsColumnData(firstRowContentTableIndex)).textContent()) ?? ''
        await commonPage.clickEllipsisAction(ContentPageLocators.buttonEllipsis(firstRowContentTableIndex), ContentPageLocators.menuItemEdit)
        const ModuleValue = await cmdSelectMatOption(this.page, ContentPageLocators.selectModuleOrPlatformsDropdownField(moduleDropDownText), ContentPageLocators.selectModuleOrPlatformsDropdownList, moduleValuesToSelect, randomModuleSelection, [module])
        const PlatformValue = await cmdSelectMatOption(this.page, ContentPageLocators.selectModuleOrPlatformsDropdownField(platformDropDownText), ContentPageLocators.selectModuleOrPlatformsDropdownList, platformValuesToSelect, randomPlatformSelection, [platform])
        let character: string = await generateAutoMixed('headerAndReason', 15)
        if (!(await cmdIsVisible(this.page, ContentPageLocators.inputDisabledHeaderInCreateContent))) {
            await cmdFill(this.page, ContentPageLocators.inputEnterHeader, character);
            headerStatus = true;
        }
        await cmdFill(this.page, ContentPageLocators.textFieldEnterReason, character)
        await commonPage.clickingButton(ContentPageLocators.buttonCreateAndUpdate, CommonLocators.loader)
        await assertVisible(this.page, ContentPageLocators.toastMessageBox)
        await cmdWaitForHidden(this.page, ContentPageLocators.toastMessageBox)
        await assertTextEquals(this.page, ContentPageLocators.moduleColumnData(firstRowContentTableIndex), ModuleValue)
        await assertTextEquals(this.page, ContentPageLocators.platformsColumnData(firstRowContentTableIndex), PlatformValue)
        if (headerStatus) {
            await assertTextEquals(this.page, ContentPageLocators.headerColumnData(firstRowContentTableIndex), character)
        } else {
            let headerValue: string = (await this.page.locator(ContentPageLocators.headerColumnData(firstRowContentTableIndex)).textContent()) ?? ''
            await assertTextEqualsDirectly(this.page, headerValue, ' ')
        }
    }

    /**
     * @param label
     */
    async validatingFieldValuesAndDisabledFieldsInViewContent(label: string, waitTime: number, moduleFloatingLabel: string, platformFloatingLabel: string, arrowDropdown: string, firstRowContentTableIndex: number): Promise<void> {
        const commonPage = new CommonPage(this.page);
        await this.page.waitForLoadState('networkidle');
        const locator = AdminPageLocators.systemSettingIconByLabel(label);
        await commonPage.clickingIconInSystemSettings(locator, waitTime, CommonLocators.loader, ContentPageLocators.contentScreenHeader, label)
        const module: string = (await this.page.locator(ContentPageLocators.moduleColumnData(firstRowContentTableIndex)).textContent()) ?? ''
        const platform: string = (await this.page.locator(ContentPageLocators.platformsColumnData(firstRowContentTableIndex)).textContent()) ?? ''
        const header: string = (await this.page.locator(ContentPageLocators.headerColumnData(firstRowContentTableIndex)).textContent()) ?? ''
        await commonPage.clickEllipsisAction(ContentPageLocators.buttonEllipsis(firstRowContentTableIndex), ContentPageLocators.menuItemView)
        await assertVisible(this.page, ContentPageLocators.inputDisabledModule)
        await assertDisabled(this.page, ContentPageLocators.inputEnterHeader)
        await assertDisabled(this.page, ContentPageLocators.textFieldEnterReason)
        await assertVisible(this.page, ContentPageLocators.inputDisabledPlatform)
        let moduleView: string = (await this.page.locator(ContentPageLocators.inputDisabledModule).textContent()) ?? ''
        let moduleDropDownvalue: string = moduleView.replace(moduleFloatingLabel, "").replace(arrowDropdown, "")
        await assertTextEqualsDirectly(this.page, moduleDropDownvalue, module)
        await assertValueEquals(this.page, ContentPageLocators.inputEnterHeader, header.trim())
        let platformView: string = (await this.page.locator(ContentPageLocators.inputDisabledPlatform).textContent()) ?? ''
        let platformDropDownvalue: string = platformView.replace(platformFloatingLabel, "").replace(arrowDropdown, "")
        await assertTextEqualsDirectly(this.page, platformDropDownvalue, platform)
        await cmdClick(this.page, ContentPageLocators.breadcrumbContent)
        await commonPage.clickEllipsisAction(ContentPageLocators.buttonEllipsis(firstRowContentTableIndex), ContentPageLocators.menuItemDelete)
        await cmdClick(this.page, CommonLocators.exitDialogYesButton)
    }

    /**
     * @param moduleDropDownText
     * @param platformDropDownText
     */
    async createContentOnlyWithMandatoryFields(moduleDropDownText: string, platformDropDownText: string, module: string[], platform: string[], moduleValuesToSelect: string | undefined, randomModuleSelection: boolean, platformValuesToSelect: string | undefined, randomPlatformSelection: boolean): Promise<{ ModuleValue: string, PlatformValue: string }> {
        const commonPage = new CommonPage(this.page);
        await cmdClick(this.page, ContentPageLocators.buttonCreateContent)
        const ModuleValue = await cmdSelectMatOption(this.page, ContentPageLocators.selectModuleOrPlatformsDropdownField(moduleDropDownText), ContentPageLocators.selectModuleOrPlatformsDropdownList, moduleValuesToSelect, randomModuleSelection, module)
        const PlatformValue = await cmdSelectMatOption(this.page, ContentPageLocators.selectModuleOrPlatformsDropdownField(platformDropDownText), ContentPageLocators.selectModuleOrPlatformsDropdownList, platformValuesToSelect, randomPlatformSelection, platform)
        await commonPage.clickingButton(ContentPageLocators.buttonCreateAndUpdate, CommonLocators.loader)
        await assertVisible(this.page, ContentPageLocators.toastMessageBox)
        await cmdWaitForHidden(this.page, ContentPageLocators.toastMessageBox)
        return { ModuleValue, PlatformValue }
    }
}