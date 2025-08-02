import { BasePage } from './BasePage';
import { LocationPageLocators, CommonLocators } from '@locators';
import { assertDisabled, cmdPause, writeToReport, cmdScrollIntoView, cmdSelectMatOption, assertEnabled, cmdTypeAndSelectMatOption, assertTextEquals, assertVisible ,cmdClick, cmdFill, cmdUploadImage } from '@commands';
import { CommonPage } from './CommonPage';
import { generateAutoMixed, generateOnlyNumbers } from '@utils';

export class LocationPage extends BasePage {

    async checkVisibilityLabels(){
        await assertVisible(this.page, LocationPageLocators.labelHeaderSearch);
        await assertVisible(this.page, LocationPageLocators.breadcrumbLocation);
        await assertVisible(this.page, LocationPageLocators.enterLocation);
        await assertVisible(this.page, LocationPageLocators.selectStatus);
        await assertDisabled(this.page, LocationPageLocators.buttonSearch, true);
        await assertDisabled(this.page, LocationPageLocators.buttonClearAll, true);
        await assertEnabled(this.page, LocationPageLocators.buttonCreateLocation, true);
    }

    async verifysTableHeaderVisibility(expectedTableHeaders: string[]) {
            for (const headerText of expectedTableHeaders) {
                const headerLocator = LocationPageLocators.tableHeaders(headerText);
                await assertVisible(this.page, headerLocator);
            }
        }

    async fillSearchFiltersLocation(enterLocation: string, enterID: string, isStatusActive: string){
        const commonPage = new CommonPage(this.page);
        await assertVisible(this.page, LocationPageLocators.textFieldenterLocation);
        await assertVisible(this.page, LocationPageLocators.textFieldenterID);
        await cmdClick(this.page, LocationPageLocators.textFieldenterLocation);
        await cmdTypeAndSelectMatOption(this.page,LocationPageLocators.enterLocationInput, CommonLocators.matOption, enterLocation);
        await cmdClick(this.page, LocationPageLocators.textFieldenterID);
        await cmdTypeAndSelectMatOption(this.page,LocationPageLocators.enterIDinput, CommonLocators.matOption, enterID);   
        await cmdFill(this.page, LocationPageLocators.enterIDinput,enterID);
        await cmdClick(this.page, LocationPageLocators.selectStatusDropdown);
        await commonPage.selectMatOption(isStatusActive);
        await cmdClick(this.page, LocationPageLocators.buttonSearch);
        await cmdClick(this.page, LocationPageLocators.buttonClearAll);
    }

    async clearFilledSearchFields(){
        await assertVisible(this.page, LocationPageLocators.enterLocation);
        await assertVisible(this.page, LocationPageLocators.enterID);
        await assertTextEquals(this.page, LocationPageLocators.textFieldenterID,'');
        await assertTextEquals(this.page, LocationPageLocators.textFieldenterLocation,'');
        await assertVisible(this.page, LocationPageLocators.selectStatus);
        await cmdClick(this.page, LocationPageLocators.buttonSearch);
        await cmdClick(this.page, LocationPageLocators.buttonClearAll);
    }

    async clickSearchButton() {
        await assertVisible(this.page, LocationPageLocators.buttonSearch);
        await assertEnabled(this.page, LocationPageLocators.buttonSearch, true);
        await cmdClick(this.page, LocationPageLocators.buttonSearch);
    }
    
    async clickClearAllButton() {
        await assertVisible(this.page, LocationPageLocators.buttonClearAll);
        await assertEnabled(this.page, LocationPageLocators.buttonClearAll, true);
        await cmdClick(this.page, LocationPageLocators.buttonClearAll);
    }

    async verifyClearFilledSearchFilter(){
        await assertTextEquals(this.page, LocationPageLocators.enterLocationInput,'');
        await assertTextEquals(this.page, LocationPageLocators.enterIDinput, '');
        await assertTextEquals(this.page, LocationPageLocators.selectStatus,'');
    }

    /**
     * Clicks the ellipsis (edit) button for the given 1-based row number.
     * @param rowNumber The 1-based index of the row (1 = first row)
     */
    async clickEllipsisButtonByRow(rowNumber: number) {
        const zeroBasedIndex = rowNumber - 1; // internally adjust for zero-based index
        const locator = LocationPageLocators.getEllipsisButtonByRow(zeroBasedIndex);
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator);
    }

    async clickEllipsisMenuItemLocation(action: 'Edit' | 'Delete' | 'View' | 'Mark Inactive' | 'Mark Active') {
            const locatorMap: Record<string, string> = {
                Edit: LocationPageLocators.menuItemEdit,
                Delete: LocationPageLocators.menuItemDelete,
                View: LocationPageLocators.menuItemView,
                'Mark Inactive': LocationPageLocators.menuItemMarkInactive,
                'Mark Active': LocationPageLocators.menuItemMarkActive
            };
            const locator = locatorMap[action];
            if (!locator) {
                throw new Error(`Invalid action: ${action}`);
            }
            await assertVisible(this.page, locator, true);
            await cmdClick(this.page, locator);
        }

    async clickcreateLocationButton(){
        await assertVisible(this.page, LocationPageLocators.buttonCreateLocation);
        await cmdClick(this.page, LocationPageLocators.buttonCreateLocation);
    }

    async fillLocationCreationDetails(partOfCreate: string, selectOrganizationCreate: string, enterContactNumber: string, enterWebsite: string){
        await assertVisible(this.page, LocationPageLocators.enterID);
        const text = await this.page.locator(LocationPageLocators.enterIDCreateinput).textContent();
        if (text && text.trim().length > 0) {
            await writeToReport(LocationPageLocators.enterIDCreateinput, "Field has ID value")
        }
        let locationName = await generateAutoMixed('specialityAndDescription', 10);
        await assertVisible(this.page, LocationPageLocators.locationNameCreate);
        await cmdClick(this.page, LocationPageLocators.locationNameCreate);
        await cmdFill(this.page, LocationPageLocators.locationNameCreate,locationName);
        await assertVisible(this.page, LocationPageLocators.selectStatusCreate);
        await cmdClick(this.page, LocationPageLocators.selectStatusCreatedropdown)
        await cmdClick(this.page, LocationPageLocators.menuItemMarkActiveCreate);
        await assertVisible(this.page, LocationPageLocators.partofDropdown);
        await cmdSelectMatOption(this.page, LocationPageLocators.partofDropdown, CommonLocators.matOption, partOfCreate);
        await assertVisible(this.page, LocationPageLocators.selectOrganizationCreate);
        await cmdSelectMatOption(this.page, LocationPageLocators.selectOrganizationCreate, CommonLocators.matOption, selectOrganizationCreate);
        await assertVisible(this.page, LocationPageLocators.enterContact);
        await cmdClick(this.page, LocationPageLocators.enterContact);
        await cmdFill(this.page, LocationPageLocators.enterContact, enterContactNumber);
        await assertVisible(this.page, LocationPageLocators.enterWebsite);
        await cmdClick(this.page, LocationPageLocators.enterWebsite);
        await cmdFill(this.page, LocationPageLocators.enterWebsite, enterWebsite);
    } 

    async uploadImage(imagePath: string){
        await assertVisible(this.page, LocationPageLocators.buttonUploadImage);
        const image = imagePath;
        await cmdUploadImage(this.page, LocationPageLocators.uploadImageCreateinput, image);
        await assertVisible(this.page, LocationPageLocators.verifyUploadImage)
    }

    async locationAddressDetails(city: string, state: string, addessLine1: string, addessLine2: string, enterpostcode: string){
        await assertVisible(this.page, LocationPageLocators.stateDropdown);
        await cmdSelectMatOption(this.page, LocationPageLocators.stateDropdown, CommonLocators.matOption, state);
        await cmdClick(this.page, LocationPageLocators.textFieldDescription);
        let description = await generateAutoMixed('specialityAndDescription', 10);
        await cmdFill(this.page, LocationPageLocators.textFieldDescription, description);
        await assertVisible(this.page, LocationPageLocators.cityDropdown);
        await cmdSelectMatOption(this.page, LocationPageLocators.cityDropdown, CommonLocators.matOption, city);
        await assertVisible(this.page, LocationPageLocators.addessLine1placeHolder);
        await cmdClick(this.page, LocationPageLocators.addessLine1placeHolder);
        await cmdFill(this.page, LocationPageLocators.addessLine1placeHolder, addessLine1);
        await assertVisible(this.page, LocationPageLocators.addessLine2placeHolder);
        await cmdClick(this.page, LocationPageLocators.addessLine2placeHolder);
        await cmdFill(this.page, LocationPageLocators.addessLine2placeHolder, addessLine2);
        await assertVisible(this.page, LocationPageLocators.enterpostcode);
        await cmdClick(this.page, LocationPageLocators.enterpostcode);
        await cmdFill(this.page, LocationPageLocators.enterpostcode, enterpostcode);
    }

    async clickCreateButton(){
        await assertVisible(this.page, LocationPageLocators.buttonCreateLocation);
        await cmdClick(this.page, LocationPageLocators.buttonCreateLocation);
        await assertVisible(this.page, LocationPageLocators.backArrowCreate);
    }

    async clickBackArrowOnCreateLocation(){
        await assertVisible(this.page, LocationPageLocators.backArrowCreate);
        await cmdClick(this.page, LocationPageLocators.backArrowCreate);
    }

    async addFloormap(floorindexnumber: number, floor: string, imagePath: string){
        await assertVisible(this.page, LocationPageLocators.floorMapTab)
        await cmdClick(this.page, LocationPageLocators.floorMapTab)
        await assertVisible(this.page, LocationPageLocators.enterBuildingName);
        let buildingName = await generateAutoMixed('specialityAndDescription', 10);
        await cmdFill(this.page, LocationPageLocators.enterBuildingName,buildingName)
        await cmdSelectMatOption(this.page, LocationPageLocators.selectFloorDropdownindex(floorindexnumber), CommonLocators.matOption, floor)
        await assertVisible(this.page, LocationPageLocators.buttonUpload);
        await cmdUploadImage(this.page, LocationPageLocators.imageupload, imagePath);
        await assertVisible(this.page, LocationPageLocators.buttonUpdateFloorMap);
        await cmdClick(this.page, LocationPageLocators.buttonUpdateFloorMap);
    }


    async editLocation(){
        await assertVisible(this.page, LocationPageLocators.enterID);
        await assertDisabled(this.page, LocationPageLocators.enterID);
        let text = await generateAutoMixed('specialityAndDescription', 10);
        let number = await generateOnlyNumbers('12345', 5)
        await assertVisible(this.page, LocationPageLocators.locationNameCreate);
        await cmdClick(this.page, LocationPageLocators.locationNameCreate);
        await cmdFill(this.page, LocationPageLocators.locationNameCreate,text);
        await assertVisible(this.page, LocationPageLocators.selectStatusCreate);
        await assertVisible(this.page, LocationPageLocators.enterContact);
        await cmdClick(this.page, LocationPageLocators.enterContact);
        await cmdFill(this.page, LocationPageLocators.enterContact, text);
        await assertVisible(this.page, LocationPageLocators.enterWebsite);
        await cmdClick(this.page, LocationPageLocators.enterWebsite);
        await cmdFill(this.page, LocationPageLocators.enterWebsite, text);
        await assertVisible(this.page, LocationPageLocators.addessLine1placeHolder);
        await cmdClick(this.page, LocationPageLocators.addessLine1placeHolder);
        await cmdFill(this.page, LocationPageLocators.addessLine1placeHolder, text);
        await assertVisible(this.page, LocationPageLocators.addessLine2placeHolder);
        await cmdClick(this.page, LocationPageLocators.addessLine2placeHolder);
        await cmdFill(this.page, LocationPageLocators.addessLine2placeHolder, text);
        await assertVisible(this.page, LocationPageLocators.enterpostcode);
        await cmdClick(this.page, LocationPageLocators.enterpostcode);
        await cmdFill(this.page, LocationPageLocators.enterpostcode, number);
        await assertVisible(this.page, LocationPageLocators.floorMapTab)
        await cmdClick(this.page, LocationPageLocators.floorMapTab)
        await assertVisible(this.page, LocationPageLocators.enterBuildingName);
        await cmdClick(this.page, LocationPageLocators.enterBuildingName);
        await cmdFill(this.page, LocationPageLocators.enterBuildingName,text);
        await assertVisible(this.page, LocationPageLocators.buttonUpdateFloorMap);
        await cmdClick(this.page, LocationPageLocators.buttonUpdateFloorMap);
    }

    async viewLocation(floorindexnumber: number){
        await assertDisabled(this.page, LocationPageLocators.enterID);
        await assertDisabled(this.page, LocationPageLocators.locationNameCreate);
        await assertDisabled(this.page, LocationPageLocators.selectStatusCreate);
        await assertDisabled(this.page, LocationPageLocators.selectPartOfCreate);
        await assertDisabled(this.page, LocationPageLocators.selectOrganizationCreate);
        await assertDisabled(this.page, LocationPageLocators.enterContact);
        await assertDisabled(this.page, LocationPageLocators.enterWebsite);
        await assertVisible(this.page, LocationPageLocators.buttonUploadImage);
        await assertDisabled(this.page, LocationPageLocators.countryplaceHolder);
        await assertDisabled(this.page, LocationPageLocators.stateplaceHolder);
        await assertDisabled(this.page, LocationPageLocators.cityplaceHolder);
        await assertDisabled(this.page, LocationPageLocators.addessLine1placeHolder);
        await assertDisabled(this.page, LocationPageLocators.addessLine2placeHolder);
        await assertDisabled(this.page, LocationPageLocators.textFieldEnterPostcode);
        await assertVisible(this.page, LocationPageLocators.floorMapTab)
        await cmdClick(this.page, LocationPageLocators.floorMapTab)
        await assertDisabled(this.page, LocationPageLocators.hospitalplaceHolder);
        await assertDisabled(this.page, LocationPageLocators.enterBuildingName);
        await assertVisible(this.page, LocationPageLocators.selectFloorDropdownindex(floorindexnumber));
    }

    async deleteLocation(){
        await assertVisible(this.page, LocationPageLocators.buttonDeleteYes);
        await cmdClick(this.page, LocationPageLocators.buttonDeleteYes);
        
    }

    async markActiveLocation(){
        await assertVisible(this.page, LocationPageLocators.menuItemMarkActive);
        await cmdClick(this.page, LocationPageLocators.menuItemMarkActive);
    }

    async markInActiveLocation(){
        await assertVisible(this.page, LocationPageLocators.menuItemMarkInactive);
        await cmdClick(this.page, LocationPageLocators.menuItemMarkInactive);
    }









}