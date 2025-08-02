export const CommonLocators = {
    breadcrumbItems: "//ol[contains(@class, 'breadcrumb')]/li",
    breadcrumbTextNodes: "//ol[contains(@class, 'breadcrumb')]/li/*[self::a or self::span]",
    matOptions: (optionText: string) => `//mat-option[normalize-space(.)='${optionText}']`,
    matOption: "mat-option span",

    //Pagination Locators
    itemsPerPageLabel: "//div[contains(@class, 'mat-mdc-paginator-page-size-label') and contains(text(), 'Items Per Page')]",
    pageSizeDropdown: "//mat-select[contains(@class, 'mat-mdc-select') and @aria-labelledby='mat-select-value-37 mat-paginator-page-size-label-3']",
    rangeLabel: "//div[contains(@class, 'mat-mdc-paginator-range-label')]",
    firstPageBtn: "//button[@aria-label='First Page']",
    previousPageBtn: "//button[@aria-label='Previous Page']",
    nextPageBtn: "//button[@aria-label='Next Page']",
    lastPageBtn: "//button[@aria-label='Last Page']",


    // Exit Confirmation Dialog
    exitDialogHeading: "//h2[normalize-space()='Exit?']",
    exitDialogBodyText: "//p[contains(text(),'You have unsaved data')]",
    exitDialogYesButton: "//a[normalize-space()='Yes']",
    exitDialogNoButton: "//a[normalize-space()='No']",

    // Loader Symbol
    loader: `#admin_content_content_header .bubble-loader`,

    // Table
    tableHeaders: (headerText: string) =>
        `//mat-header-cell[@role='columnheader' and normalize-space()='${headerText}']`,

    toasterMessageLocator: "//div[contains(@class,'notification-box')]//span",

};
