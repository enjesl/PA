import { BasePage } from '@pages';
import { AdminPageLocators, LoginPageLocators } from '@locators';
import { assertVisible, cmdGetText, assertTextEquals, cmdClick,cmdCaptureAndCheckNetworkErrors, cmdIsVisible } from '@commands';

export class AdminPage extends BasePage {

    /**
     * Verifies the UI elements and user profile information after an admin logs in.
     *
     * This method waits for the page to finish loading, then checks for the visibility
     * of key admin page elements such as the logo, system settings label, navigation arrow,
     * FAQ icon, and globe icon. It also asserts that the displayed profile text matches
     * the provided email address.
     *
     * @param email - The email address expected to be displayed in the profile section after login.
     * @returns A promise that resolves when all verifications are complete.
     */
    async verifyAfterAdminLogin(email: string, pageTitle: string): Promise<void> {
        await this.page.waitForLoadState('networkidle');
        await assertVisible(this.page, AdminPageLocators.logo);
        await assertVisible(this.page, AdminPageLocators.labelSystemSetings);
        await cmdGetText(this.page, AdminPageLocators.labelSystemSetings);
        await assertTextEquals(this.page, AdminPageLocators.labelSystemSetings, pageTitle);
        await assertVisible(this.page, AdminPageLocators.buttonArrow);
        await assertVisible(this.page, AdminPageLocators.iconFaq);
        await cmdGetText(this.page, AdminPageLocators.profileText);
        await assertTextEquals(this.page, AdminPageLocators.profileText, email);
        await assertVisible(this.page, AdminPageLocators.iconGlobe);
    }


    /**
     * Click on a system setting icon by its visible label
     * Example: "Users", "Doctors", "Marketing"
     */
    async clickSystemSetting(label: string, pageTitle: string): Promise<void> {
        const locator = AdminPageLocators.systemSettingIconByLabel(label);
        await assertVisible(this.page, AdminPageLocators.labelSystemSetings,true);
        await cmdGetText(this.page, AdminPageLocators.labelSystemSetings);
        await assertTextEquals(this.page, AdminPageLocators.labelSystemSetings, pageTitle);
        await assertVisible(this.page, locator);
        await cmdClick(this.page, locator);
        await cmdCaptureAndCheckNetworkErrors(this.page);
    }

    async verifyFooterLabel(footerText: string) {   
        await assertVisible(this.page, AdminPageLocators.labelFooter);
        await cmdGetText(this.page, AdminPageLocators.labelFooter);
        await assertTextEquals(this.page, AdminPageLocators.labelFooter, footerText, true);
    }
    
    async logout() {
        await cmdIsVisible(this.page, AdminPageLocators.buttonMenu);
        await cmdClick(this.page, AdminPageLocators.buttonMenu);
        await cmdIsVisible(this.page, AdminPageLocators.linkLogout);
        await cmdClick(this.page, AdminPageLocators.linkLogout);
        await cmdIsVisible(this.page, LoginPageLocators.labelSignIn);
    }

}
