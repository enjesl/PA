export const DoctorsPageLocators = {
  // label header locators
  labelHeaderSearch: "//div[@class='search-container search-left-container']//div[normalize-space()='Search & Filter']",

  // Breadcrumbs
  breadcrumbDoctors: "//nav[contains(@aria-label,'breadcrumb')]//span[normalize-space()='Doctors']",

  // Filter Inputs
  enterID: "//input[@placeholder='Enter ID']",
  enterName: "//input[@placeholder='Enter Name']",
  selectLocationplaceHolder: "//mat-form-field[@id='admin_doctor_manage_location']//span[contains(@class,'mat-mdc-select-placeholder')]",
  selectLocation: "//*[@id='admin_doctor_manage_location']//mat-label[normalize-space(text())='Select Location']",
  selectOrganization: "//*[@id='admin_doctor_home_organisation']//mat-label[normalize-space(text())='Select Organization']",
  selectOrganizationplaceHolder: "//mat-form-field[@id='admin_doctor_home_organisation']//span[contains(@class,'mat-mdc-select-placeholder')]",
  selectSpeciality: "//*[@id='admin_doctor_home_specialty']//mat-label[normalize-space(text())='Select Speciality']",
  selectSpecialityplaceHolder:"//mat-form-field[@id='admin_doctor_home_specialty']//span[contains(@class,'mat-mdc-select-placeholder')]",
  enterEmail: "//input[@placeholder='Enter Email']",
  mobileNumber: "//input[@placeholder='Enter Mobile Number']",
  selectLocationDropdown: "//mat-form-field[@id='admin_doctor_manage_location']//mat-select//div[contains(@id,'mat-select-value')]/following-sibling::div",
  selectOrganizationDropdown: "//mat-form-field[@id='admin_doctor_home_organisation']//mat-select//div[contains(@id,'mat-select-value')]/following-sibling::div",
  selectSpecialityDropdown: "//mat-form-field[@id='admin_doctor_home_specialty']//mat-select//div[contains(@id,'mat-select-value')]/following-sibling::div",
  collapseAll: "//div[@class='faq-container-box']//div[@class='search-container search-left-container']//div[text()='Collapse All']",
  expandAll: "//div[text()='Expand All' and contains(@class, 'collapse-label')]",

  // Fields
  textFieldEnterID: "//app-text-input[@id='admin_doctor_home_uniqueId']//input",
  textFieldEnterName: "//app-text-input[@id='admin_doctor_home_name']//input",
  textFieldEnterEmail: "//app-text-input[@id='admin_doctor_home_email']//input",
  textFieldmobileNumber: "//app-reusable-phone-no[@id='admin_doctor_home_mobileNumber']//input",
  sortBy: "//button[contains(text(), 'Sort by:')]",

  // Table
  tableHeaders: (headerText: string) =>
    `//mat-header-cell[@role='columnheader' and normalize-space()='${headerText}']`,
  getEllipsisButtonByRow: (rowIndex: number) =>
    `//mat-row[@id='admin_doctor_home_Row_${rowIndex}']//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Edit']`,

  // Buttons
  buttonSearch: "//button[@id='admin_doctor_home_search']",
  buttonClearAll: "//button[@id='admin_doctor_home_clear']",
  buttonFilter: "//app-reusable-sort-button//button[contains(@class, 'sort-btn-desc')]",

  // Column Headers
  nameHeader: "//mat-header-cell[@role='columnheader' and normalize-space(text())='Name']",
  partOfHeader: "//mat-header-cell[@role='columnheader' and normalize-space(text())='Part of']",
  detailsHeader: "//mat-header-cell[@role='columnheader' and normalize-space(text())='Details']",
  lastUpdateHeader: "//mat-header-cell[@role='columnheader' and normalize-space(text())='Last Update']",
  actionHeader: "//mat-header-cell[@role='columnheader' and normalize-space(text())='Action']",

  // Actions
  menuItemEditDoctor: "//div[contains(@class, 'mat-mdc-menu-content')]//span[contains(text(), 'Edit Doctor')]",
  menuItemViewDoctor: "//div[contains(@class, 'mat-mdc-menu-content')]//span[contains(text(), 'View Doctor')]",
  menuItemManageVisibility: "//div[contains(@class, 'mat-mdc-menu-content')]//span[contains(text(), 'Manage Visibility')]",
  menuItemViewSchedules: "//div[contains(@class, 'mat-mdc-menu-content')]//span[contains(text(), 'View Schedules')]",

  // Titles in edit and view Doctor screen
  uniqueID: "//mat-label[normalize-space(text())='Unique ID']",
  firstName: "//mat-label[normalize-space(text())='First Name']",
  lastName: "//mat-label[normalize-space(text())='Last Name']",
  gender: "//mat-label[normalize-space(text())='Gender']",
  email: "//mat-label[normalize-space(text())='Email']",
  mobileNumberviewDoctor: "//mat-label[normalize-space(text())='Mobile Number']",
  Role: "//mat-label[normalize-space(text())='Role']",
  Locations: "//mat-label[normalize-space(text())='Locations']",
  Organization: "//mat-label[normalize-space(text())='Organization']",
  healthCareService: "//mat-label[normalize-space(text())='Health Care Service']",

  // Placeholders in edit and view Doctor screen
  firstNameplaceHolder: "//input[@placeholder='First Name']",
  lastNameplaceholder: "//input[@placeholder='Last Name']",
  uniqueIDplaceHolder: "//input[@placeholder='Unique ID']",
  genderplaceholder: "#admin_doctor_manage_gender .mat-form-field-disabled",
  emailplaceholder: "//input[@placeholder='Email']",
  mobileNumberplaceholder: "//input[@placeholder='Enter Mobile Number']",
  roleplaceholder: "#admin_doctor_manage_role .mat-form-field-disabled",
  locationsdropdownd: "#admin_doctor_manage_role .mat-form-field-disabled",
  locationsplaceholder: "//mat-form-field[@id='admin_doctor_manage_location']",
  organizationplaceholder: "#admin_doctor_manage_organization .mat-form-field-disabled",
  healthCareplaceholder: "//mat-form-field[@id='admin_doctor_manage_specialty']//mat-select",

  // Buttons in edit and View Doctors screen
  ButtoncloseViewDoctor: "//button[@id='admin_doctor_manage_close-btn']",
  ButtonClearAlleditDoctor: "//span[contains(@class, 'mdc-button__ripple')]/following-sibling::span[normalize-space(text())='Clear All']",
  buttonUpdateeditDoctor: "//span[normalize-space(text())='Update']",

  // Manage Visibility
  selectLocationDropdownMV: "//h2[normalize-space()='Manage Visibility']/ancestor::app-manage-visibility//mat-label[normalize-space()='Select Location']/ancestor::mat-form-field//mat-icon",
  selectUserGroup: "//mat-label[normalize-space(text())='Select User Group']",
  selectUserGroupDropdownMV: "//mat-label[normalize-space()='Select User Group']/ancestor::mat-form-field//div[contains(@class,'mat-mdc-select-arrow-wrapper')]",
  buttonCreate: "//button[.//span[normalize-space(text())='Create']]",
  buttonCancel: "//button[.//span[normalize-space(text())='Cancel']]",
  buttonAdd: "//button[.//span[normalize-space(text())='+ Add']]",
  buttonAddAfterCreate: "//button[.//span[normalize-space(text())='Add']]",
  buttonSubmit: "//button[@id='admin_doctor_manage_visibility_submit-btn']",
  buttonEdit: "button:has(mat-icon.editIcon)",
  buttonDelete: "button.deleteIcon[aria-label='Delete']",
  buttonDeleteYes: "//span[normalize-space(text())='Yes']",
  manageVisibilityRow: (index: number) => `//mat-row[@id='admin_doctor_manage_visibility_Row_${index}']`,
  selectLocationDropdownValuesIndex: (index: number) => `//div[contains(@class, 'cdk-overlay-pane')]//mat-option[${index}][not(@aria-disabled='true')]`,

  // View Schedules
  doctorNameLabel: "//div[@class='label' and normalize-space(text())='Doctor Name']",
  locationLabel: "//mat-label[normalize-space(text())='Location']",
  specialityLabel: "//mat-label[normalize-space(text())='Specialty']",
  availableStatus: "//span[normalize-space(text())='Available']",
  bookedStatus: "//span[normalize-space(text())='Booked Slots']",
  slotsNotAvailable: "//span[normalize-space(text())='Slots Not Available']",
  buttonManageleave: "//button[normalize-space(text())='Manage Leave']",
  date_range: "//button[normalize-space(text())='Manage Leave']",
  dayButton: "//button[normalize-space(text())='Day']",
  weekButton: "//button[normalize-space(text())='Week']",
  monthButton: "//button[normalize-space(text())='Month']",

};
