import { BasePage } from '../admin/BasePage'; 
import { MicrosoftLoginPage } from '@pages';
import { assertDisabled, assertVisible, cmdClick, cmdFill } from '@commands';
import { LoginPageLocators } from '@locators';

export class LoginPage extends BasePage {

  async loginOtherAD() {
    await assertVisible(this.page, LoginPageLocators.labelSignIn);
    await assertVisible(this.page, LoginPageLocators.linkOther);
    await cmdClick(this.page, LoginPageLocators.linkOther);
    await assertVisible(this.page, LoginPageLocators.buttonADLogin);
    await cmdClick(this.page, LoginPageLocators.buttonADLogin);
  }

  async loginOtherWithoutAD(userName: string, password: string) {
    await assertVisible(this.page, LoginPageLocators.labelSignIn);
    await assertVisible(this.page, LoginPageLocators.linkOther);
    await cmdClick(this.page, LoginPageLocators.linkOther);
    await assertVisible(this.page, LoginPageLocators.buttonSignIn);
    await assertDisabled(this.page, LoginPageLocators.buttonSignIn);
    await cmdFill(this.page, LoginPageLocators.inputUsername, userName);
    await assertVisible(this.page, LoginPageLocators.inputPassword);
    await cmdFill(this.page, LoginPageLocators.inputPassword, password);
    await assertVisible(this.page, LoginPageLocators.buttonSignIn, false);
    await cmdClick(this.page, LoginPageLocators.buttonSignIn);
    await this.page.waitForLoadState('networkidle');
  }

  async loginByTypeAndRole(authType: string, userName: string, password: string) {
    await assertVisible(this.page, LoginPageLocators.labelSignIn);

    // Common flow: Click 'Other' link to reveal login options
    await assertVisible(this.page, LoginPageLocators.linkOther);
    await cmdClick(this.page, LoginPageLocators.linkOther);

    if (authType === 'microsoft') {
      //  Microsoft login flow (AD users)
      const microsoftLogin = new MicrosoftLoginPage(this.page);
      await this.loginOtherAD(); // opens Microsoft auth
      await microsoftLogin.login(userName, password); // fill Microsoft UI
    } else {
      //  Non-Microsoft login flow
      await this.loginOtherWithoutAD(userName, password);
    }
  }

}
