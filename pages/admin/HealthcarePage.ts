import { BasePage, CommonPage } from '@pages';
import { AdminPageLocators, CommonLocators, HealthcareServicesPageLocators } from '@locators';
import { assertVisible, assertTextEquals, cmdClick, cmdWaitForHidden, cmdFill, cmdSelectMatOption, assertTextEqualsDirectly, assertDisabled, cmdSelectMatMultiOptions, assertHidden, assertAllValuesPresent, assertTextContains, cmdPause } from '@commands';
import { generateAutoMixed, generateOnlyLetters } from '@utils';

export class HealthcareServicesPage extends BasePage {

    /**
     * @param label
     * @param waitTime
     * @param locationText
     * @param firstRowHealthcareServicesTableIndex
     */
    async creatingHealthcareServicesRecord(label: string, waitTime: number, locationText: string, firstRowHealthcareServicesTableIndex: number, locationValuesToSelect: string[] = [], randomLocationSelection: boolean, locationOptionToSelect: number): Promise<{ character: string, values: string[] }> {
        const commonPage = new CommonPage(this.page);
        await this.page.waitForLoadState('networkidle');
        const locator = AdminPageLocators.systemSettingIconByLabel(label);
        await commonPage.clickingIconInSystemSettings(locator, waitTime, CommonLocators.loader, HealthcareServicesPageLocators.healthcareServicesScreenHeader, label)
        await cmdClick(this.page, HealthcareServicesPageLocators.buttonCreateHealthCare)
        await assertDisabled(this.page, HealthcareServicesPageLocators.inputDisabledIdentifier)
        let character: string = await generateAutoMixed('specialityAndDescription', 15)
        await cmdFill(this.page, HealthcareServicesPageLocators.inputSpecialityName, character)
        const values = await cmdSelectMatMultiOptions(this.page, HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownField(locationText), HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownList, locationValuesToSelect, randomLocationSelection, locationOptionToSelect)
        await cmdFill(this.page, HealthcareServicesPageLocators.textFieldLaymanDescription, character)
        let key: string = await generateOnlyLetters('KeyWord', 5)
        let key1: string = await generateOnlyLetters('KeyWord', 5)
        await cmdFill(this.page, HealthcareServicesPageLocators.textFieldSpecialityKeyword, `${key},${key1}`)
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonCreate, CommonLocators.loader)
        await assertHidden(this.page, HealthcareServicesPageLocators.toastMessageBox)
        await assertTextEquals(this.page, HealthcareServicesPageLocators.specialtyColumnData(firstRowHealthcareServicesTableIndex), character)
        await assertAllValuesPresent(this.page, HealthcareServicesPageLocators.locationColumnData(firstRowHealthcareServicesTableIndex), values)
        return { character, values }
    }

    /**
    * @param label
    * @param waitTime
    * @param specialtyDropdownText
    * @param secondRowHealthcareServicesTableIndex
    * @param firstRowHealthcareServicesTableIndex
    */
    async searchingAndValidatingSpecialtyRecordsInHealthcareServices(label: string, waitTime: number, specialtyDropdownText: string, secondRowHealthcareServicesTableIndex: number, firstRowHealthcareServicesTableIndex: number): Promise<void> {
        const commonPage = new CommonPage(this.page);
        await this.page.waitForLoadState('networkidle');
        const locator = AdminPageLocators.systemSettingIconByLabel(label);
        await assertVisible(this.page, locator);
        await assertTextEquals(this.page, HealthcareServicesPageLocators.healthcareServicesIconText, label);
        await commonPage.clickingIconInSystemSettings(locator, waitTime, CommonLocators.loader, HealthcareServicesPageLocators.healthcareServicesScreenHeader, label)
        let specialty: string = (await this.page.locator(HealthcareServicesPageLocators.specialtyColumnData(secondRowHealthcareServicesTableIndex)).textContent()) ?? ''
        await cmdSelectMatOption(this.page, HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownField(specialtyDropdownText), HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownList, specialty)
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonSearch, CommonLocators.loader)
        await assertTextEquals(this.page, HealthcareServicesPageLocators.specialtyColumnData(firstRowHealthcareServicesTableIndex), specialty)
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonClearAll, CommonLocators.loader)
    }

    /**
    * @param locationDropdownText
    * @param secondRowHealthcareServicesTableIndex
    * @param firstRowHealthcareServicesTableIndex
    */
    async searchingAndValidatingLocationRecordsInHealthcareServices(locationDropdownText: string, secondRowHealthcareServicesTableIndex: number, firstRowHealthcareServicesTableIndex: number): Promise<void> {
        const commonPage = new CommonPage(this.page);
        let location: string = (await this.page.locator(HealthcareServicesPageLocators.locationColumnData(secondRowHealthcareServicesTableIndex)).textContent()) ?? ''
        let location1 = location.split(',')
        await cmdSelectMatOption(this.page, HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownField(locationDropdownText), HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownList, location1[0])
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonSearch, CommonLocators.loader)
        await assertTextContains(this.page, HealthcareServicesPageLocators.locationColumnData(firstRowHealthcareServicesTableIndex), location1[0])
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonClearAll, CommonLocators.loader)
    }

    /**
    * @param statusDropdownText
    * @param secondRowHealthcareServicesTableIndex
    * @param firstRowHealthcareServicesTableIndex
    * @param statusActive
    * @param statusInactive
    */
    async searchingAndValidatingStatusRecordsInHealthcareServices(statusDropdownText: string, secondRowHealthcareServicesTableIndex: number, firstRowHealthcareServicesTableIndex: number, statusActive: string, statusInactive: string): Promise<void> {
        const commonPage = new CommonPage(this.page);
        await cmdSelectMatOption(this.page, HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownField(statusDropdownText), HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownList, statusActive)
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonSearch, CommonLocators.loader)
        await assertTextEquals(this.page, HealthcareServicesPageLocators.statusColumnData(firstRowHealthcareServicesTableIndex), statusActive)
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonClearAll, CommonLocators.loader)
        await commonPage.clickEllipsisAction(HealthcareServicesPageLocators.buttonEllipsis(secondRowHealthcareServicesTableIndex), HealthcareServicesPageLocators.menuItemMarkInactive)
        await assertHidden(this.page, HealthcareServicesPageLocators.toastMessageBox)
        await cmdSelectMatOption(this.page, HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownField(statusDropdownText), HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownList, statusInactive)
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonSearch, CommonLocators.loader)
        await assertTextEquals(this.page, HealthcareServicesPageLocators.statusColumnData(firstRowHealthcareServicesTableIndex), statusInactive)
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonClearAll, CommonLocators.loader)
    }

    /**
     * @param locationText
     */
    async createHealthcareServicesOnlyWithMandatoryFields(locationText: string, locationValuesToSelect: string[] = [], randomLocationSelection: boolean, locationOptionToSelect: number): Promise<void> {
        const commonPage = new CommonPage(this.page);
        await cmdClick(this.page, HealthcareServicesPageLocators.buttonCreateHealthCare)
        let character: string = await generateAutoMixed('speciality', 15)
        await cmdFill(this.page, HealthcareServicesPageLocators.inputSpecialityName, character)
        await cmdSelectMatMultiOptions(this.page, HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownField(locationText), HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownList, locationValuesToSelect, randomLocationSelection, locationOptionToSelect)
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonCreate, CommonLocators.loader)
        await assertHidden(this.page, HealthcareServicesPageLocators.toastMessageBox)
    }

    /**
     * @param secondRowHealthcareServicesTableIndex
     * @param firstRowHealthcareServicesTableIndex
     * @param status
     */
    async validatingChangedInactiveToActiveStatus(firstRowHealthcareServicesTableIndex: number, status: string, message: string): Promise<void> {
        const commonPage = new CommonPage(this.page);
        await commonPage.clickEllipsisAction(HealthcareServicesPageLocators.buttonEllipsis(firstRowHealthcareServicesTableIndex), HealthcareServicesPageLocators.menuItemMarkActive)
        await assertVisible(this.page, HealthcareServicesPageLocators.toastMessage)
        await assertTextEquals(this.page, HealthcareServicesPageLocators.toastMessage, message)
        await assertHidden(this.page, HealthcareServicesPageLocators.toastMessageBox)
        await assertTextEquals(this.page, HealthcareServicesPageLocators.statusColumnData(firstRowHealthcareServicesTableIndex), status)
    }

    /**
     * @param secondRowHealthcareServicesTableIndex
     * @param firstRowHealthcareServicesTableIndex
     * @param status
     */
    async validatingChangedActiveToInactiveStatus(secondRowHealthcareServicesTableIndex: number, firstRowHealthcareServicesTableIndex: number, status: string, message: string): Promise<void> {
        const commonPage = new CommonPage(this.page);
        await commonPage.clickEllipsisAction(HealthcareServicesPageLocators.buttonEllipsis(secondRowHealthcareServicesTableIndex), HealthcareServicesPageLocators.menuItemMarkInactive)
        await assertVisible(this.page, HealthcareServicesPageLocators.toastMessage)
        await assertTextEquals(this.page, HealthcareServicesPageLocators.toastMessage, message)
        await assertHidden(this.page, HealthcareServicesPageLocators.toastMessageBox)
        await assertTextEquals(this.page, HealthcareServicesPageLocators.statusColumnData(firstRowHealthcareServicesTableIndex), status)
    }

    /**
     * @param label
     * @param waitTime
     * @param locationText
     * @param firstRowHealthcareServicesTableIndex
     */
    async updateHealthcareServicesRecord(label: string, waitTime: number, locationText: string, firstRowHealthcareServicesTableIndex: number, locationValuesToSelect: string[] = [], randomLocationSelection: boolean, locationOptionToSelect: number): Promise<{ speciality: string, values: string[] }> {
        const commonPage = new CommonPage(this.page);
        await this.page.waitForLoadState('networkidle');
        const locator = AdminPageLocators.systemSettingIconByLabel(label);
        await commonPage.clickingIconInSystemSettings(locator, waitTime, CommonLocators.loader, HealthcareServicesPageLocators.healthcareServicesScreenHeader, label)
        await commonPage.clickEllipsisAction(HealthcareServicesPageLocators.buttonEllipsis(firstRowHealthcareServicesTableIndex), HealthcareServicesPageLocators.menuItemEdit)
        await assertDisabled(this.page, HealthcareServicesPageLocators.inputDisabledIdentifier)
        await assertDisabled(this.page, HealthcareServicesPageLocators.inputSpecialityName)
        let speciality = (await this.page.locator(HealthcareServicesPageLocators.inputSpecialityName).inputValue()) ?? ''
        let character: string = await generateAutoMixed('description', 15)
        const data = this.page.locator(HealthcareServicesPageLocators.locationChips);
        const length = await data.count();
        for (let i = 0; i < length; i++) {
            await cmdClick(this.page, HealthcareServicesPageLocators.inputLocatioDropdownChipCrossIcon)
        }
        const values = await cmdSelectMatMultiOptions(this.page, HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownField(locationText), HealthcareServicesPageLocators.selectSpecialtyOrLocationOrStatusDropdownList, locationValuesToSelect, randomLocationSelection, locationOptionToSelect)
        await cmdFill(this.page, HealthcareServicesPageLocators.textFieldLaymanDescription, character)
        let key: string = await generateOnlyLetters('KeyWord', 5)
        let key1: string = await generateOnlyLetters('KeyWord', 5)
        await cmdFill(this.page, HealthcareServicesPageLocators.textFieldSpecialityKeyword, `${key},${key1}`)
        await commonPage.clickingButton(HealthcareServicesPageLocators.buttonUpdate, CommonLocators.loader)
        await assertHidden(this.page, HealthcareServicesPageLocators.toastMessageBox)
        await assertTextEquals(this.page, HealthcareServicesPageLocators.specialtyColumnData(firstRowHealthcareServicesTableIndex), speciality)
        await assertAllValuesPresent(this.page, HealthcareServicesPageLocators.locationColumnData(firstRowHealthcareServicesTableIndex), values)
        return { speciality, values }
    }

    /**
         * @param firstRowHealthcareServicesTableIndex
         */
    async deletingRecordInContent(firstRowHealthcareServicesTableIndex: number, waitTime: number): Promise<void> {
        const commonPage = new CommonPage(this.page);
        await cmdPause(this.page, "Loading Issue", waitTime)
        let range = (await this.page.locator(HealthcareServicesPageLocators.paginationRange).textContent()) ?? ''
        let spl: string[] = range?.split('of')
        let num = Number(spl[1]) - 1
        await commonPage.clickEllipsisAction(HealthcareServicesPageLocators.buttonEllipsis(firstRowHealthcareServicesTableIndex), HealthcareServicesPageLocators.menuItemDelete)
        await cmdClick(this.page, CommonLocators.exitDialogYesButton)
        await cmdWaitForHidden(this.page, CommonLocators.loader)
        await assertVisible(this.page, HealthcareServicesPageLocators.toastMessageBox)
        await cmdWaitForHidden(this.page, HealthcareServicesPageLocators.toastMessageBox)
        let range1 = (await this.page.locator(HealthcareServicesPageLocators.paginationRange).textContent()) ?? ''
        let spl1: string[] = range1?.split('of')
        await assertTextEqualsDirectly(this.page, String(num), spl1[1])
    }
}