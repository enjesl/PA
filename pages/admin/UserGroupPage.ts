import { BasePage } from './BasePage';
import { UserGroupLocators } from '@locators';
import { assertTextEqualsDirectly, assertVisible, cmdWaitForVisible, cmdClick, cmdClickFirst } from '@commands';

export class UserGroupPage extends BasePage {
    
    /**
     * Clicks on the "Create User Group" button after verifying its visibility.
     * This method uses the `cmdClick` command to perform the click action.
     */
    async clickOnCreateUserGroup() {
        await assertVisible(this.page, UserGroupLocators.buttonCreateUserGroup);
        await cmdClick(this.page, UserGroupLocators.buttonCreateUserGroup);
    }


    /**
     * Clicks on the back arrow link after verifying its visibility.
     * This method uses the `cmdClick` command to perform the click action.
     */
    async clickOnBackArrow() {
        await assertVisible(this.page, UserGroupLocators.linlBackArrow);
        await cmdClick(this.page, UserGroupLocators.linlBackArrow);
    }

    async clickOnEdit() {
        await cmdWaitForVisible(this.page, UserGroupLocators.buttonEditUserGroup);
        await cmdClickFirst(this.page, UserGroupLocators.buttonEditUserGroup);
        await cmdWaitForVisible(this.page, UserGroupLocators.linkEditUserGroup);
        await cmdClick(this.page, UserGroupLocators.linkEditUserGroup);
    }
}
