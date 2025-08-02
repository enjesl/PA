export const HealthcareServicesPageLocators = {
    // Create Healthcare Services Screen Locators
    buttonCreateHealthCare: `#admin_healthcare_home_create-btn button`,
    inputDisabledIdentifier: `#admin_healthcare_home_unique-id input`,
    inputSpecialityName: `#admin_healthcare_home_speciality-name input`,
    textFieldLaymanDescription: `#admin_healthcare_home_lyman-description textarea`,
    textFieldSpecialityKeyword: `#admin_healthcare_home_specialty-keyword-description textarea`,
    buttonCreate: `#admin_healthcare_home_create button`,
    toastMessageBox: `#admin_healthcare_home_back .notification-box`,
    toastMessage: `#admin_healthcare_home_back .message-box span`,
    buttonUpdate: `#admin_healthcare_home_update button`,

    // Content Screen Locators
    healthcareServicesIconText: `.region-icon~div`,
    healthcareServicesScreenHeader: `#admin_location_home_icon~span`,
    selectSpecialtyOrLocationOrStatusDropdownField: (label: string) => `//mat-label[text()='${label}']/ancestor::mat-form-field`,
    selectSpecialtyOrLocationOrStatusDropdownList: `div[role="listbox"] mat-option`,
    buttonSearch: `#admin_healthcare_home_search-btn button`,
    buttonClearAll: `#admin_healthcare_home_clear-btn button`,
    buttonEllipsis: (index: number) => `.healthcare-table-container mat-row:nth-child(${index}) .cdk-column-Action button`,
    menuItemEdit: "//mat-list-item//span/span[normalize-space()='Edit']",
    menuItemDelete: "//mat-list-item//span/span[normalize-space()='Delete']",
    menuItemMarkInactive: "//mat-list-item//span/span[normalize-space()='Mark Inactive']",
    menuItemMarkActive: "//mat-list-item//span/span[normalize-space()='Mark Active']",
    specialtyColumnData: (index: number) => `.healthcare-table-container mat-row:nth-child(${index}) .cdk-column-specialty span`,
    locationColumnData: (index: number) => `.healthcare-table-container mat-row:nth-child(${index}) .cdk-column-location span`,
    statusColumnData: (index: number) => `.healthcare-table-container mat-row:nth-child(${index}) .cdk-column-Status .status-btn`,
    paginationRange: `#admin_healthcare_home_paginator .mat-mdc-paginator-range-label`,
    locationChips: `#admin_healthcare_home_speciality-name mat-select mat-chip`,
    inputLocatioDropdownChipCrossIcon: `#admin_healthcare_home_speciality-name mat-select mat-chip:nth-child(1) mat-icon`
};