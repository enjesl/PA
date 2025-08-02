export const MarketingPageLocators = {
    // Accordion and toggle
    detailsAccordionToggleIcon: "//mat-panel-title[normalize-space()='Details']/following::mat-icon[1]",

    // Input fields
    searchByTitleInput: "//input[@placeholder='Search by Title']",
    searchByHospitalInput: "//input[@placeholder='Search by Hospital']",

    // Dropdown trigger icons
    categoryDropdownIcon: "//mat-label[normalize-space()='Select Category']/ancestor::mat-form-field//mat-icon",
    statusDropdownIcon: "//mat-label[normalize-space()='Select Status']/ancestor::mat-form-field//mat-icon",
    hospitalDropdownIcon: "//mat-label[normalize-space()='Search by Hospital']/ancestor::mat-form-field//mat-icon",

    // Date fields (input IDs)
    startDateInput: "//input[@id='admin_marketing_marketing_start-date']",
    endDateInput: "//input[@id='admin_marketing_marketing_end-date']",

    // Datepicker toggle buttons
    startDateCalendarToggle: "//input[@id='admin_marketing_marketing_start-date']/ancestor::mat-form-field//button[@aria-label='Open calendar']",
    endDateCalendarToggle: "//input[@id='admin_marketing_marketing_end-date']/ancestor::mat-form-field//button[@aria-label='Open calendar']",

    // Action buttons
    searchButton: "//button[.//span[normalize-space()='Search']]",
    clearAllButton: "//button[.//span[normalize-space()='Clear All']]",

    // Collapse all label
    collapseAllLabel: "//div[@id='admin_marketing_marketing_collapse']",

    // Table header by name
    tableHeaders: (headerText: string) =>
        `//mat-header-cell[@role='columnheader' and normalize-space()='${headerText}']`,

    // Row Action (ellipsis button) by index
    getEllipsisButtonByRow: (rowIndex: number) =>
        `//mat-row[@id='admin_img-maintenance_home_Row_${rowIndex}']//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Edit']`,

    // Status button by row index
    getStatusLocatorByRow: (rowIndex: number) =>
        `//mat-row[@id='admin_img-maintenance_home_Row_${rowIndex}']//mat-cell[contains(@class,'cdk-column-Status')]//button[contains(@class,'status-btn')]`,

    // Status button by Title value
    getStatusByTitleText: (titleText: string) =>
        `//mat-row[.//mat-cell[contains(@class,'cdk-column-Title')]//span[normalize-space()='${titleText}']]//mat-cell[contains(@class,'cdk-column-Status')]//button[contains(@class,'status-btn')]`,

    // Ellipsis button by Title, Category, and Hospital combined
    getEllipsisButtonByRowData: (title: string, category: string, hospital: string) =>
        `//mat-row[
            .//mat-cell[contains(@class,'cdk-column-Title')]//span[normalize-space()='${title}']
            and .//mat-cell[contains(@class,'cdk-column-Category')]//span[normalize-space()='${category}']
            and .//mat-cell[contains(@class,'cdk-column-Hospital')]//div[normalize-space()='${hospital}']
        ]//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Edit']`,

    getEllipsisButtonByTitle: (titleText: string) =>
    `//mat-row[.//mat-cell[contains(@class,'cdk-column-Title')]//span[normalize-space()='${titleText}']]//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Edit']`,
    createWhatsHappeningButton: "//button[@id='admin_marketing_marketing_create-whats-happening']//span[contains(text(), \"Create What's Happening\")]"


};
