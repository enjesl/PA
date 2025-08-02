export const AgreementsPageLocators = {
    // Table
    tableHeaders: (headerText: string) =>
        `//mat-header-cell[@role='columnheader' and normalize-space()='${headerText}']`,

    // Clicks the ellipsis button for a given row index (1-based)
    getEllipsisButtonByRow: (rowNumber: number) =>
        `//mat-row[@id='admin_agreement_home_Row_${rowNumber - 1}']//button[contains(@class,'mat-mdc-menu-trigger')]`,
    getEllipsisButtonByName: (agreementName: string) =>
        `//mat-row[.//mat-cell[contains(@class,'cdk-column-Name')]//span[normalize-space(text())='${agreementName}']]//button[contains(@class,'mat-mdc-menu-trigger')]`,
    getEllipsisButtonById: (agreementId: string) =>
        `//mat-row[.//mat-cell[contains(@class,'cdk-column-agreementUniqueId')]//span[normalize-space(text())='${agreementId}']]//button[contains(@class,'mat-mdc-menu-trigger')]`,
    etStatusButtonById: (agreementId: string) =>
        `//mat-row[.//mat-cell[contains(@class,'cdk-column-agreementUniqueId')]//span[normalize-space(text())='${agreementId}']]//button[contains(@class,'status-btn')]`,

    // Specific Actions within the ellipsis dropdown
    menuView: "//div[@role='menu']//mat-list-item[.//span[contains(normalize-space(), 'View')]]",
    menuEdit: "//div[@role='menu']//mat-list-item[.//span[contains(normalize-space(), 'Edit')]]",
    menuMarkInactive: "//div[@role='menu']//mat-list-item[.//span[contains(normalize-space(), 'Mark Inactive')]]",

    createAgreementButton: "//button[@id='admin_agreement_home_create-btn' and .//span[normalize-space()='Create Agreement']]",

    // Create Agreement 
    inputUniqueId: "//app-text-input[@id='admin_agreement_create-edit_unique-id']//input",
    selectLanguageDropdown: "//app-select-input[@id='admin_agreement_create-edit_language']//mat-select",
    dropdownSelectFrequency: "//app-select-input[@id='admin_agreement_create-edit_frequency-id']//mat-select",
    inputAgreementName: "//app-text-input[@id='admin_agreement_create-edit_name']//input",

    // Rich Editor Content Area
    richTextEditorDescription: "//app-ck-editor[@id='admin_agreement_create-edit_editor']//div[contains(@class,'ck-editor__editable')]",

    // Rich Editor Toolbar Buttons
    ckBoldButton: "//button[@data-cke-tooltip-text='Bold (Ctrl+B)']",
    ckItalicButton: "//button[@data-cke-tooltip-text='Italic (Ctrl+I)']",
    ckUnderlineButton: "//button[@data-cke-tooltip-text='Underline (Ctrl+U)']",
    ckBulletedListButton: "//button[@data-cke-tooltip-text='Bulleted List']",
    ckNumberedListButton: "//button[@data-cke-tooltip-text='Numbered List']",
    ckHeadingDropdownButton: "//div[contains(@class,'ck-heading-dropdown')]//button[contains(@class,'ck-dropdown__button')]",
    ckFontColorDropdownButton: "//div[contains(@class,'ck-color-ui-dropdown')]//button[contains(@class,'ck-dropdown__button')]",

    // Form Action Buttons
    clearAllButton: "//button[@id='admin_agreement_create-edit_clear-al-btn']",
    createButton: "//button[@id='admin_agreement_create-edit_submit-btn']",

    // Exit Confirmation Dialog
    exitDialogHeading: "//h2[normalize-space()='Exit?']",
    exitDialogBodyText: "//p[contains(text(),'You have unsaved data')]",
    exitDialogYesButton: "//a[normalize-space()='Yes']",
    exitDialogNoButton: "//a[normalize-space()='No']",

    // View Agreement Dialog
    viewAgreementDialogTitle: "//mat-dialog-container[@role='dialog']//h2[contains(@class, 'header')]",
    viewAgreementCloseButton: "//button[@id='admin_agreement_view_close']",
    viewAgreementLanguageDropdown: "//app-reusable-mat-input[@id='admin_agreement_view_language']//mat-select",
    viewAgreementDialogContent: "//mat-dialog-content[contains(@class,'mat-mdc-dialog-content')]",
    viewAgreementContentParagraphs: "//mat-dialog-content//p",

    // Update Button on Create/Edit Agreement screen
    btnUpdateAgreement: "//button[@id='admin_agreement_create-edit_submit-btn']",

    // Get status text by row number (1-based)
    getStatusTextByRow: (rowNumber: number) =>
        `//mat-row[@id='admin_agreement_home_Row_${rowNumber - 1}']//mat-cell[contains(@class,'cdk-column-Status')]//button[contains(@class,'status-btn')]`,

    // Get status text by Agreement Name
    getStatusTextByName: (agreementName: string) =>
        `//mat-row[.//mat-cell[contains(@class,'cdk-column-Name')]//span[normalize-space(text())='${agreementName}']]//mat-cell[contains(@class,'cdk-column-Status')]//button[contains(@class,'status-btn')]`,

    // Get status text by Agreement ID
    getStatusTextById: (agreementId: string) =>
        `//mat-row[.//mat-cell[contains(@class,'cdk-column-agreementUniqueId')]//span[normalize-space(text())='${agreementId}']]//mat-cell[contains(@class,'cdk-column-Status')]//button[contains(@class,'status-btn')]`,
}