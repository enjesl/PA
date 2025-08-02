import { BasePage } from './BasePage';
import { DoctorsPageLocators, CommonLocators } from '@locators';
import { assertDisabled, assertEnabled, assertTextEquals, assertVisible ,cmdClick, cmdFill, cmdSelectMatMultiOptions } from '@commands';
import { cmdSelectMatOption, getAllMatOptionValues } from '@commands';

export class DoctorsPage extends BasePage {

    async checkVisibilityLabels(){
        await assertVisible(this.page, DoctorsPageLocators.labelHeaderSearch);
        await assertVisible(this.page, DoctorsPageLocators.breadcrumbDoctors);
        await assertVisible(this.page, DoctorsPageLocators.enterID);
        await assertVisible(this.page, DoctorsPageLocators.enterName);
        await assertVisible(this.page, DoctorsPageLocators.selectLocation);
        await assertVisible(this.page, DoctorsPageLocators.selectOrganization);
        await assertVisible(this.page, DoctorsPageLocators.selectSpeciality);
        await assertVisible(this.page, DoctorsPageLocators.enterEmail);
        await assertVisible(this.page, DoctorsPageLocators.mobileNumber);
        await assertVisible(this.page, DoctorsPageLocators.selectLocationDropdown);
        await assertVisible(this.page, DoctorsPageLocators.selectOrganizationDropdown);
        await assertVisible(this.page, DoctorsPageLocators.selectSpecialityDropdown);
        await assertDisabled(this.page, DoctorsPageLocators.buttonSearch, true);
        await assertDisabled(this.page, DoctorsPageLocators.buttonClearAll, true);
        await assertEnabled(this.page, DoctorsPageLocators.buttonFilter, true);
        await assertEnabled(this.page, DoctorsPageLocators.sortBy, true)
        
    }
    async verifysTableHeaderVisibility(expectedTableHeaders: string[]) {
        for (const headerText of expectedTableHeaders) {
            const headerLocator = DoctorsPageLocators.tableHeaders(headerText);
            await assertVisible(this.page, headerLocator);
        }
    }
    

    async fillSearchFiltersDoctors(
        idValue: string,
        nameValue: string,
        locationOption: string,
        organizationOption: string,
        specialityOption: string,
        emailValue: string,
        mobileNumber: string,
        selectLocationCount: number,
        selectSpecialityCount: number,
        selectOrganizationCount: number, 
        isMultiSelectSearchEnabled: boolean,
    ): Promise<void> {
        await assertVisible(this.page, DoctorsPageLocators.labelHeaderSearch);

        await cmdClick(this.page, DoctorsPageLocators.textFieldEnterID);
        await cmdFill(this.page, DoctorsPageLocators.textFieldEnterID, idValue);

        await cmdClick(this.page, DoctorsPageLocators.textFieldEnterName);
        await cmdFill(this.page, DoctorsPageLocators.textFieldEnterName, nameValue);

        await assertVisible(this.page, DoctorsPageLocators.selectLocationDropdown);
        await cmdSelectMatMultiOptions(
            this.page,
            DoctorsPageLocators.selectLocationDropdown,
            CommonLocators.matOption,
            locationOption ? [locationOption] : [],
            isMultiSelectSearchEnabled,
            selectLocationCount
        );

        await assertVisible(this.page, DoctorsPageLocators.selectOrganizationDropdown);
        await cmdSelectMatMultiOptions(
            this.page,
            DoctorsPageLocators.selectOrganizationDropdown,
            CommonLocators.matOption,
            organizationOption ? [organizationOption] : [],
            isMultiSelectSearchEnabled,
            selectOrganizationCount
        );

        await assertEnabled(this.page, DoctorsPageLocators.selectSpeciality);
        await assertEnabled(this.page, DoctorsPageLocators.selectSpecialityDropdown);
        await cmdSelectMatMultiOptions(
            this.page,
            DoctorsPageLocators.selectSpecialityDropdown,
            CommonLocators.matOption,
            specialityOption ? [specialityOption] : [],
            isMultiSelectSearchEnabled,
            selectSpecialityCount
        );

        await cmdClick(this.page, DoctorsPageLocators.textFieldEnterEmail);
        await cmdFill(this.page, DoctorsPageLocators.textFieldEnterEmail, emailValue);

        await cmdClick(this.page, DoctorsPageLocators.textFieldmobileNumber);
        await cmdFill(this.page, DoctorsPageLocators.textFieldmobileNumber, mobileNumber);
    }        

    async verifyClearFilledSearchFilter(){
        await assertTextEquals(this.page,DoctorsPageLocators.enterID,'')  
        await assertTextEquals(this.page,DoctorsPageLocators.enterName,'')   
        await assertVisible(this.page,DoctorsPageLocators.selectLocationplaceHolder)    
        await assertVisible(this.page,DoctorsPageLocators.selectOrganizationplaceHolder)   
        await assertVisible(this.page,DoctorsPageLocators.selectSpecialityplaceHolder)
        await assertTextEquals(this.page,DoctorsPageLocators.enterEmail,'')
        await assertTextEquals(this.page,DoctorsPageLocators.mobileNumber,'')  
        await assertDisabled(this.page, DoctorsPageLocators.buttonSearch, true);
        await assertDisabled(this.page, DoctorsPageLocators.buttonClearAll, true);

    }

    async clickSearchButton() {
        await assertVisible(this.page, DoctorsPageLocators.buttonSearch);
        await assertEnabled(this.page, DoctorsPageLocators.buttonSearch, true);
        await cmdClick(this.page, DoctorsPageLocators.buttonSearch);
    }
    
    async clickClearAllButton() {
        await assertVisible(this.page, DoctorsPageLocators.buttonClearAll);
        await assertEnabled(this.page, DoctorsPageLocators.buttonClearAll, true);
        await cmdClick(this.page, DoctorsPageLocators.buttonClearAll);
    }



    /**
     * Clicks the ellipsis (edit) button for the given 1-based row number.
     * @param rowNumber The 1-based index of the row (1 = first row)
     */
    async clickEllipsisButtonByRow(rowNumber: number) {
        const zeroBasedIndex = rowNumber - 1; // internally adjust for zero-based index
        const locator = DoctorsPageLocators.getEllipsisButtonByRow(zeroBasedIndex);
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator);
    }

    async selectLocationDropdownValuesIndex(rowNumber: number) {
        const zeroBasedIndex = rowNumber - 1; // internally adjust for zero-based index
        const locator = DoctorsPageLocators.selectLocationDropdownValuesIndex(zeroBasedIndex);
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator);
    }

    
    async clickEllipsisMenuItemDoctors(action: 'editDoctor' | 'viewDoctor' | 'manageVisibility' | 'viewSchedules') {
        const locatorMap: Record<string, string> = {
            editDoctor: DoctorsPageLocators.menuItemEditDoctor,
            viewDoctor: DoctorsPageLocators.menuItemViewDoctor,
            manageVisibility: DoctorsPageLocators.menuItemManageVisibility,
            viewSchedules: DoctorsPageLocators.menuItemViewSchedules,
        };
        const locator = locatorMap[action];
        if (!locator) {
            throw new Error(`Invalid action: ${action}`);
        }
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator);
    }
    
    async editDoctors(locationOption: string,isMultiSelectSearchEnabled:boolean, selectLocationCount: number){
        await assertDisabled(this.page, DoctorsPageLocators.firstNameplaceHolder);
        await assertDisabled(this.page, DoctorsPageLocators.lastNameplaceholder);
        await assertDisabled(this.page, DoctorsPageLocators.uniqueIDplaceHolder);
        await assertVisible(this.page, DoctorsPageLocators.genderplaceholder);
        await assertVisible(this.page, DoctorsPageLocators.emailplaceholder);
        await assertVisible(this.page, DoctorsPageLocators.mobileNumberplaceholder);
        await assertVisible(this.page, DoctorsPageLocators.roleplaceholder);
        await assertVisible(this.page, DoctorsPageLocators.organizationplaceholder);
        await assertVisible(this.page, DoctorsPageLocators.healthCareplaceholder);
        await assertEnabled(this.page, DoctorsPageLocators.locationsplaceholder);
        await cmdSelectMatMultiOptions(this.page, DoctorsPageLocators.selectLocationDropdown, CommonLocators.matOption, locationOption ? [locationOption] : [], isMultiSelectSearchEnabled,selectLocationCount);
        await assertEnabled(this.page, DoctorsPageLocators.buttonUpdateeditDoctor);
        await cmdClick(this.page, DoctorsPageLocators.buttonUpdateeditDoctor);

    }

    async editDoctorsClearAll(){
        await assertEnabled(this.page, DoctorsPageLocators.ButtonClearAlleditDoctor);
        await cmdClick(this.page, DoctorsPageLocators.ButtonClearAlleditDoctor);
        await assertTextEquals(this.page, DoctorsPageLocators.locationsplaceholder,'')

    }

    async viewDoctors(){
        await assertDisabled(this.page, DoctorsPageLocators.firstNameplaceHolder);
        await assertDisabled(this.page, DoctorsPageLocators.lastNameplaceholder);
        await assertDisabled(this.page, DoctorsPageLocators.uniqueIDplaceHolder);
        await assertVisible(this.page, DoctorsPageLocators.genderplaceholder);
        await assertDisabled(this.page, DoctorsPageLocators.emailplaceholder);
        await assertDisabled(this.page, DoctorsPageLocators.mobileNumberplaceholder);
        await assertVisible(this.page, DoctorsPageLocators.roleplaceholder);
        await assertVisible(this.page, DoctorsPageLocators.organizationplaceholder);
        await assertVisible(this.page, DoctorsPageLocators.healthCareplaceholder);
        await assertVisible(this.page, DoctorsPageLocators.locationsplaceholder);
        await cmdClick(this.page, DoctorsPageLocators.ButtoncloseViewDoctor);
    }

    async viewSchedules(){
        await assertVisible(this.page, DoctorsPageLocators.doctorNameLabel);
        await assertVisible(this.page, DoctorsPageLocators.locationLabel);
        await assertVisible(this.page, DoctorsPageLocators.specialityLabel);
        await assertVisible(this.page, DoctorsPageLocators.availableStatus);
        await assertVisible(this.page, DoctorsPageLocators.bookedStatus);
        await assertVisible(this.page, DoctorsPageLocators.slotsNotAvailable);
        await assertVisible(this.page, DoctorsPageLocators.buttonManageleave);
        await assertEnabled(this.page, DoctorsPageLocators.dayButton);
        await cmdClick(this.page, DoctorsPageLocators.dayButton);
        await assertEnabled(this.page, DoctorsPageLocators.weekButton);
        await cmdClick(this.page, DoctorsPageLocators.weekButton);
        await assertEnabled(this.page, DoctorsPageLocators.monthButton);
        await cmdClick(this.page, DoctorsPageLocators.monthButton);

    }


    async manageVisibility(action: string, optionUserGroupValue: string, isMultiSelectSearchEnabled: boolean,selectLocationCount: number, selectUserGroupCount: number, isLocationDropdownSearchEnabled: boolean, optionlocationDropdowncount?: number){
        if (action === 'create'){
            await assertEnabled(this.page, DoctorsPageLocators.selectLocation);
            await assertEnabled(this.page, DoctorsPageLocators.selectLocationDropdownMV);
            await cmdSelectMatOption(this.page, DoctorsPageLocators.selectLocationDropdownMV,CommonLocators.matOption, '',isLocationDropdownSearchEnabled);
            await assertEnabled(this.page, DoctorsPageLocators.selectUserGroup);
            await assertEnabled(this.page, DoctorsPageLocators.selectUserGroupDropdownMV);
            await cmdSelectMatMultiOptions(this.page, DoctorsPageLocators.selectUserGroupDropdownMV, CommonLocators.matOption, optionUserGroupValue ? [optionUserGroupValue] : [], isMultiSelectSearchEnabled,selectUserGroupCount);
            await cmdClick(this.page, DoctorsPageLocators.buttonCreate);    
        }
        else if (action === 'add'){  
        for (let i = 1; i <= optionlocationDropdowncount!; i++) {
            await cmdClick(this.page, DoctorsPageLocators.buttonAdd);
            await assertEnabled(this.page, DoctorsPageLocators.selectLocationDropdownMV);
            await cmdClick(this.page, DoctorsPageLocators.selectLocationDropdownMV);
            await getAllMatOptionValues(this.page, DoctorsPageLocators.selectLocationDropdownMV, DoctorsPageLocators.selectLocationDropdownValuesIndex(i));
            await assertVisible(this.page, DoctorsPageLocators.selectLocationDropdownValuesIndex(i));
            await cmdClick(this.page, DoctorsPageLocators.selectLocationDropdownValuesIndex(i));
            await assertEnabled(this.page, DoctorsPageLocators.selectUserGroup);
            await assertEnabled(this.page, DoctorsPageLocators.selectUserGroupDropdownMV);
            await cmdSelectMatMultiOptions(this.page, DoctorsPageLocators.selectUserGroupDropdownMV, CommonLocators.matOption, optionUserGroupValue ? [optionUserGroupValue] : [], isMultiSelectSearchEnabled,selectUserGroupCount);
            await cmdClick(this.page, DoctorsPageLocators.buttonAddAfterCreate);
        }

        }

        else if (action === 'CreateAndAdd'){
            await assertEnabled(this.page, DoctorsPageLocators.selectLocation);
            await assertEnabled(this.page, DoctorsPageLocators.selectLocationDropdownMV);
            await cmdSelectMatOption(this.page, DoctorsPageLocators.selectLocationDropdownMV,CommonLocators.matOption, '',isLocationDropdownSearchEnabled);
            await assertEnabled(this.page, DoctorsPageLocators.selectUserGroup);
            await assertEnabled(this.page, DoctorsPageLocators.selectUserGroupDropdownMV);
            await cmdSelectMatMultiOptions(this.page, DoctorsPageLocators.selectUserGroupDropdownMV, CommonLocators.matOption, optionUserGroupValue ? [optionUserGroupValue] : [], isMultiSelectSearchEnabled,selectUserGroupCount);
            await cmdClick(this.page, DoctorsPageLocators.buttonCreate);
            await cmdClick(this.page, DoctorsPageLocators.buttonAdd);
            await assertEnabled(this.page, DoctorsPageLocators.selectLocationDropdownMV);
            await cmdSelectMatOption(this.page, DoctorsPageLocators.selectLocationDropdownMV,CommonLocators.matOption, '',isLocationDropdownSearchEnabled);
            await assertEnabled(this.page, DoctorsPageLocators.selectUserGroup);
            await assertEnabled(this.page, DoctorsPageLocators.selectUserGroupDropdownMV);
            await cmdSelectMatMultiOptions(this.page, DoctorsPageLocators.selectUserGroupDropdownMV, CommonLocators.matOption, optionUserGroupValue ? [optionUserGroupValue] : [], isMultiSelectSearchEnabled,selectUserGroupCount);
            await cmdClick(this.page, DoctorsPageLocators.buttonAddAfterCreate);
            await cmdClick(this.page, DoctorsPageLocators.buttonSubmit);
        }
    }
    async editManageVisibility(optionUserGroupValue: string, isMultiSelectSearchEnabled: boolean, selectLocationCount: number, selectUserGroupCount: number){
        await assertEnabled(this.page, DoctorsPageLocators.buttonEdit);
        await cmdClick(this.page,DoctorsPageLocators.buttonEdit);
        await assertEnabled(this.page, DoctorsPageLocators.buttonUpdateeditDoctor);
        await cmdSelectMatMultiOptions(this.page, DoctorsPageLocators.buttonUpdateeditDoctor, CommonLocators.matOption, optionUserGroupValue ? [optionUserGroupValue] : [], isMultiSelectSearchEnabled,selectUserGroupCount);
        await cmdClick(this.page, DoctorsPageLocators.buttonUpdateeditDoctor);

    }

    async deleteManageVisibility(rowIndexForEdit: number) {
        const rowLocator = this.page.locator(DoctorsPageLocators.manageVisibilityRow(rowIndexForEdit));

        while (await rowLocator.count() > 0) {

            await assertEnabled(this.page, DoctorsPageLocators.buttonDelete);
            await cmdClick(this.page, DoctorsPageLocators.buttonDelete);

            await assertEnabled(this.page, DoctorsPageLocators.buttonDeleteYes);
            await cmdClick(this.page, DoctorsPageLocators.buttonDeleteYes);

        }
    }



};