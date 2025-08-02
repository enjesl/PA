export const FaqsPageLocators = {
    // Header Section
    labelHeaderSearch: "//div[@class='search-container']//div[normalize-space()='Search & Filter']",

    // Breadcrumbs
    breadcrumbFaqs: "//nav[contains(@aria-label,'breadcrumb')]//span[normalize-space()='FAQs']",
    breadcrumbSystemSettings: "//nav[contains(@aria-label,'breadcrumb')]//a[normalize-space()='System Settings']",
    backButtonFaqs: "//button[@id='admin_faq_home_arrow-back']",
    backButtonFaqsByText: "//button[@id='admin_faq_home_arrow-back']/following-sibling::span",

    // Filter Inputs
    selectPlatforms: "//app-reusable-dropdown[@id='admin_faq_home_platform']//mat-select",
    selectUserGroup: "//app-reusable-chipbox-dropdown[@id='usersDropdown']//mat-select",
    textFieldEnterHeader: "//app-text-input[@id='admin_faq_home_header']//input",
    selectStatus: "//app-reusable-dropdown[@id='admin_faq_home_status']//mat-select",

    // Filter Inputs
    selectPlatformsDownArrow: "//app-reusable-dropdown[@id='admin_faq_home_platform']//mat-icon[normalize-space()='arrow_drop_down']",
    selectUserGroupDownArrow: "//app-reusable-chipbox-dropdown[@id='usersDropdown']//mat-select//div[contains(@id,'mat-select-value')]/following-sibling::div",
    selectStatusDownArrow: "//app-reusable-dropdown[@id='admin_faq_home_status']//mat-icon[normalize-space()='arrow_drop_down']",

    // Filter Inputs
    selectPlatformsPlaceHolder: "//app-reusable-dropdown[@id='admin_faq_home_platform']//span[contains(@class,'mat-mdc-select-placeholder')]",
    selectUserGroupPlaceHolder: "//app-reusable-chipbox-dropdown[@id='usersDropdown']//span[contains(@class,'mat-mdc-select-placeholder')]",
    selectStatusPlaceHolder: "//app-reusable-dropdown[@id='admin_faq_home_status']//span[contains(@class,'mat-mdc-select-placeholder')]",

    // Buttons
    buttonSearch: "//app-reusable-primary-button[@id='admin_faq_home_search-btn']//button",
    buttonClearAll: "//app-reusable-primary-button[@id='admin_faq_home_clear-btn']//button",
    buttonCreateFaqs: "//span[normalize-space()='Create FAQ']/parent::button",

    // Table
    tableHeaders: (headerText: string) =>
        `//mat-header-cell[@role='columnheader' and normalize-space()='${headerText}']`,
    getEllipsisButtonByRow: (rowIndex: number) =>
        `//mat-row[@id='admin_faq_home_Row_${rowIndex}']//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Edit']`,
    getStatusLocatorByRow: (rowIndex: number) =>
        `//mat-row[@id='admin_faq_home_Row_${rowIndex}']//mat-cell[contains(@class,'cdk-column-Status')]//button[contains(@class,'status-btn')]`,
    getStatusByHeaderText: (headerText: string) =>
        `//mat-row[.//mat-cell[normalize-space()='${headerText}']]//mat-cell[contains(@class,'cdk-column-Status')]//button[contains(@class,'status-btn')]`,
    getEllipsisButtonByHeaderText: (headerText: string) =>
        `//mat-row[.//mat-cell[normalize-space()='${headerText}']]//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Edit']`,

    // EllipsisMenuLocators 
    menuItemEdit: "//mat-list-item//span/span[normalize-space()='Edit']",
    menuItemDelete: "//mat-list-item//span/span[normalize-space()='Delete']",
    menuItemView: "//mat-list-item//span/span[normalize-space()='View']",
    menuItemMarkInactive: "//mat-list-item//span/span[normalize-space()='Mark Inactive']",


    // ─── Manage FAQ Form Section ───────────────────────────────────────────────
    selectPlatformsInManageFaqForm: "//app-reusable-dropdown[@id='admin_faq_home_platform']//div[contains(@class,'mat-mdc-select-trigger')]",
    selectUserGroupManage: "//mat-form-field[@id='admin_faq_manage_users']//mat-select",
    selectStatusManage: "//app-reusable-dropdown[@id='admin_faq_manage_status']//mat-select",
    textFieldEnterHeaderManage: "//app-reusable-input-box[@id='admin_faq_manage_header']//input",

    // Rich text editor editable area
    richTextEditorDescription: "//app-ck-editor[@id='admin_faq_manage_editor']//div[contains(@class, 'ck-editor__editable') and @contenteditable='true']",

    // Toolbar Buttons
    ckBoldButton: "//button[@data-cke-tooltip-text='Bold (Ctrl+B)']",
    ckItalicButton: "//button[@data-cke-tooltip-text='Italic (Ctrl+I)']",
    ckUnderlineButton: "//button[@data-cke-tooltip-text='Underline (Ctrl+U)']",
    ckTextAlignDropdown: "//button[@data-cke-tooltip-text='Text alignment']",
    ckFontColorDropdown: "//button[@data-cke-tooltip-text='Font Color']",
    ckBulletedListButton: "//button[@data-cke-tooltip-text='Bulleted List']",
    ckNumberedListButton: "//button[@data-cke-tooltip-text='Numbered List']",
    ckHeadingsDropdown: "//button[@aria-label='Headings, Heading']",

    btnClearAll: "//app-reusable-primary-button[@id='admin_faq_manage_clear-btn']//button[normalize-space()='Clear All']",
    btnCreateFAQ: "//app-reusable-primary-button[@id='admin_faq_create_create-btn']//button[normalize-space()='Create']",
    btnUpdateFAQ: "//app-reusable-primary-button[@id='admin_faq_manage_update-btn']//button[normalize-space()='Update']",

    // ─── Manage FAQ View ─────────────────────────────────────
    btnDone: "//app-reusable-primary-button[@id='admin_faq_manage_done-btn']//button[normalize-space()='Done']",
    btnClose: "//button[@id='admin_faq_home_menu']//mat-icon[normalize-space()='close']/ancestor::button",
    headerViewTitle: "//span[@id='header-title' and normalize-space()='View']",

    // ─── Delete Confirmation Modal ─────────────────────────────
    dialogContainer: "//mat-dialog-container[contains(@class, 'mat-mdc-dialog-container')]",
    dialogBox: "//div[contains(@class, 'dialog-box')]",
    headerIcon: "//div[contains(@class, 'dialog-header')]//div[contains(@class,'icon')]",
    headerTitle: "//div[contains(@class, 'dialog-header')]//h2[contains(text(),'Delete')]",
    bodyText: "//div[contains(@class, 'dialog-body')]//p[contains(text(),'Are you sure you want to delete this FAQ?')]",
    yesButton: "//div[contains(@class,'dialog-footer')]//a[normalize-space()='Yes']",
    noButton: "//div[contains(@class,'dialog-footer')]//a[normalize-space()='No']",
};
