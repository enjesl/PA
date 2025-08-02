export const LocationPageLocators = {
  // label header 
  labelHeaderSearch: "//div[normalize-space()='Search & Filter']",

  // Breadcrumbs
  breadcrumbLocation: "//nav[contains(@aria-label,'breadcrumb')]//span[normalize-space()='Locations']",

  // Filter Inputs
  enterLocation: "//input[@placeholder='Enter Location']",
  enterID: "//input[@placeholder='Enter ID']",

  //Buttons
  buttonSearch: "//app-reusable-primary-button[@id='admin_location_home_search-btn']//button[.//span[normalize-space(text())='Search']]",
  buttonClearAll: "//app-reusable-primary-button[@id='admin_location_home_clear-btn']//button[.//span[normalize-space(text())='Clear All']]",
  buttonCreateLocation: "//button//span[normalize-space()='Create Location']",

  //TextFields
  textFieldenterLocation: "//app-reusable-input-box[@id = 'admin_location_home_name']",
  enterLocationInput: "//app-reusable-input-box[@id = 'admin_location_home_name']//input",
  textFieldenterID: "//app-reusable-input-box[@id = 'admin_location_home_id']",
  enterIDinput: "//app-reusable-input-box[@id = 'admin_location_home_id']//input",
  selectStatus: "//app-reusable-dropdown[@id = 'admin_location_home_status-dropdown']//mat-select",
  selectStatusDropdown: "//app-reusable-dropdown[@id = 'admin_location_home_status-dropdown']//mat-icon",


// Table
  tableHeaders: (headerText: string) =>
    `//mat-header-cell[@role='columnheader' and normalize-space()='${headerText}']`,
  getEllipsisButtonByRow: (rowIndex: number) =>
    `//mat-row[@id='admin_location_home_Row_${rowIndex}']//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Edit']`,

  //Buttons 
  menuItemEdit: "//mat-list-item//span/span[normalize-space()='Edit']",
  menuItemDelete: "//mat-list-item//span/span[normalize-space()='Delete']",
  menuItemView: "//mat-list-item//span/span[normalize-space()='View']",
  menuItemMarkActive: "//mat-list-item//span/span[normalize-space()='Mark Active']",
  menuItemMarkInactive: "//mat-list-item//span/span[normalize-space()='Mark Inactive']",

  //Create Location
  enterIDCreateinput: "//app-reusable-input-box[@id = 'admin_location_phy-location_id']//input",
  locationNameCreate: "//input[@placeholder='Enter Location Name']",
  selectPartOfCreate: "//input[@placeholder='Select Part of']",
  enterWebsite:"//input[@placeholder='Enter Website']",
  enterContact: "//input[@placeholder='Enter Contact']",
  selectStatusCreate: "//app-reusable-dropdown[@id='admin_location_phy-location_status']//mat-select",
  selectOrganizationCreate: "//app-reusable-dropdown[@id='admin_location_phy-location_org']//mat-select",
  buttonUploadImage: "//app-upload-image[@id='admin_marketing_banner_create_edit_image']",
  verifyUploadImage: "//span[contains(@class, 'file-name')]",
  uploadImageCreateinput: "//app-upload-image[@id='admin_marketing_banner_create_edit_image']//input",
  textFieldDescription:"//app-ck-editor[@id='admin_location_phy-location_editor']//div[contains(@class,'ck-editor__editable')]",
  backArrowCreate: "//button[@id='admin_location_mng-location_icon']//mat-icon[text()='arrow_back']",

  //Dropdowns in Create location screen
  partofDropdown:"//app-reusable-autocomplete[@id='admin_location_phy-location_part-of']//mat-icon[normalize-space(text())='arrow_drop_down']",
  selectStatusCreatedropdown: "//app-reusable-dropdown[@id='admin_location_phy-location_status']//mat-icon[normalize-space(text())='arrow_drop_down']",
  selectOrganizationCreatedropdown:"//app-reusable-dropdown[@id='admin_location_phy-location_org']//mat-icon[normalize-space(text())='arrow_drop_down']",

  // Create location location address column placeHolder
  countryplaceHolder: "//input[@placeholder='Type or select a country']",
  stateplaceHolder: "//input[@placeholder='Type or select a state']",
  cityplaceHolder: "//input[@placeholder='Type or select a city']",
  addessLine1placeHolder: "//input[@placeholder='Enter Address - Line1']",
  addessLine2placeHolder: "//input[@placeholder='Enter Address - Line2']",
  enterpostcode: "//input[@placeholder='Enter Postcode']",
  menuItemMarkActiveCreate: "//mat-option//span//span[normalize-space()='Active']",
  menuItemMarkInactiveCreate: "//mat-option//span//span[normalize-space()='Inactive']",

  //Tabs
  physicalLocationTab: "//div[@role='tab' and .//span[normalize-space(text())='Physical Location']]",
  floorMapTab: "//div[@role='tab' and .//span[normalize-space(text())='Floor Map']]",

  // Create location location address column dropdown
  countryDropdown: "//app-reusable-autocomplete[@id='admin_location_phy-location_country']//mat-icon[normalize-space(text())='arrow_drop_down']",
  stateDropdown:"//app-reusable-autocomplete[@id='admin_location_phy-location_state']//mat-icon[normalize-space(text())='arrow_drop_down']",
  cityDropdown:"//app-reusable-autocomplete[@id='admin_location_phy-location_city']//mat-icon[normalize-space(text())='arrow_drop_down']",

  
  //Create location location address column TextFields
  textFieldaddessLine1:"//app-reusable-input-box[@id='admin_location_phy-location_address1']//input",
  textFieldaddessLine2:"//app-reusable-input-box[@id='admin_location_phy-location_address1']//input",
  textFieldEnterPostcode: "//app-reusable-input-box[@id='admin_location_phy-location_postcode']//input",

  //Create location location address column buttons
  buttonClearAllCreate: "//app-reusable-primary-button[@id='admin_location_phy-location_clear-btn']//button//span[normalize-space(text())='Clear All']",
  buttonCreate: "//app-reusable-primary-button[@id='admin_location_phy-location_create']//button//span[normalize-space(text())='Create Location']",
  buttonClose: "//app-reusable-primary-button[@id = 'admin_location_floormap_create']//button//span[normalize-space(text())='Close']",

  //Edit Location -> Floor map
  hospitalplaceHolder: "//input[@placeholder='Enter Hospital']",
  enterBuildingName: "//input[@placeholder='Enter Building Name']",
  selectFloorDropdownindex : (index: number) =>`//app-reusable-dropdown[@id='admin_location_floormap_floor-level-${index}']//mat-icon`,
  buttonUpload: "//button[@class='upload-btn' and normalize-space(text())='+ Upload Image']",
  imageupload:"//input[@type='file' and contains(@class, 'file-input')]",
  buttonAddMore: "//app-reusable-primary-button[@id = 'admin_location_floormap_add-more']",
  buttonClearAllFloorMap: "//app-reusable-primary-button[@id = 'admin_location_floormap_clear-btn']",
  buttonUpdateFloorMap: "//app-reusable-primary-button[@id = 'admin_location_floormap_create']",
  buttonDeleteFloorMap: "//button[@id='admin_location_floormap_remove-btn']",

  //Delete 
  buttonDeleteYes: "//div[contains(@class, 'dialog')]//a[normalize-space(text())='Yes']",
  buttonDelecteNo: "//div[contains(@class, 'dialog')]//a[normalize-space(text())='No']"
}