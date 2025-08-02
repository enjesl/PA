
export const AdminPageLocators = {
    logo: "id=logo",
    labelSystemSetings: "id=menu-item-System Settings",
    profileText: "//span[@class='user-name']",
    buttonArrow: "//mat-icon[normalize-space()='arrow_drop_down']",
    iconFaq: "//mat-icon[normalize-space()='help_outline']",
    iconGlobe: "//mat-select//div[contains(@id, 'mat-select-value')]",

    /**
     * Returns XPath locator for a System Setting icon based on label text.
     * Example: "Users", "User Groups", "Doctors", etc.
     */
    systemSettingIconByLabel: (label: string) =>
        `//div[contains(@class,'grid-item')]//div[contains(text(),'${label}')]/..`,
    labelFooter: "//footer[@class='footer fixed-footer text-white pt-3']//span",
    buttonMenu: "//button[@aria-label='User menu']",
    linkLogout: "//button[@role='menuitem']//span[normalize-space()='Logout']",
};
