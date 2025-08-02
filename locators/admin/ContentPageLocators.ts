export const ContentPageLocators = {
    // Content Screen Locators
    contentIconText: `.content-icon~div`,
    contentScreenHeader: `#admin_content_content_icon~span`,
    selectModuleOrPlatformsDropdownList: `div[role="listbox"] mat-option`,
    selectModuleOrPlatformsDropdownField: (label: string) => `//mat-label[text()='${label}']/ancestor::mat-form-field`,
    buttonSearch: `#admin_content_content_search-btn button`,
    buttonClearAll: `#admin_content_content_clear-btn button`,
    buttonEllipsis: (index: number) => `#admin_content_content_table mat-row:nth-child(${index}) button`,
    menuItemEdit: "//mat-list-item//span/span[normalize-space()='Edit']",
    menuItemDelete: "//mat-list-item//span/span[normalize-space()='Delete']",
    menuItemView: "//mat-list-item//span/span[normalize-space()='View']",
    headerColumnData: (index: number) => `#admin_content_content_table mat-row:nth-child(${index}) .cdk-column-header span`,
    moduleColumnData: (index: number) => `#admin_content_content_table mat-row:nth-child(${index}) .cdk-column-Module span`,
    platformsColumnData: (index: number) => `#admin_content_content_table mat-row:nth-child(${index}) .cdk-column-Platforms span`,
    paginationRange: `#admin_content_content_paginator .mat-mdc-paginator-range-label`,

    // Create Content Locators
    buttonCreateContent: `#admin_content_content_create button`,
    inputEnterHeader: `#admin_content_create_platform input`,
    textFieldEnterReason: `div[formarrayname="reasons"] textarea`,
    buttonCreateAndUpdate: `#admin_content_content_submit-btn button`,
    toastMessageBox: `#admin_content_content_gradient .notification-box`,
    inputDisabledHeaderInCreateContent: `#admin_content_create_platform .mat-form-field-disabled`,

    // View Content Locators
    inputDisabledModule: `#admin_content_create_module .mat-form-field-disabled`,
    inputDisabledPlatform: `//mat-label[text()='Platforms']//ancestor::mat-form-field[contains(@class,'mat-form-field-disabled')]`,
    breadcrumbContent: `a[href="/admin/content"]`
};
