export const UserGroupLocators = {
    breadcrumbItems: "//ol[contains(@class, 'breadcrumb')]/li",
    breadcrumbTextNodes: "//ol[contains(@class, 'breadcrumb')]/li/*[self::a or self::span]",
    labelUserGroups: "id=admin_user-groups_home_menu",
    buttonCreateUserGroup: "//app-reusable-primary-button[@id='admin_user-groups_home_create']/button",
    linlBackArrow: "//mat-icon[normalize-space()='arrow_back']",
    buttonEditUserGroup: "//button[@aria-label='Edit']",
    linkEditUserGroup: "(//span[normalize-space()='Edit'])[2]",
};
