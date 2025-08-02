import { Page } from '@playwright/test';
import { LoginPage } from '@pages';
import { getUserCredentials } from './getCredentials';

export async function loginAsUser(
    page: Page,
    authType: string,
    role: string
) {
    const { userName, password } = getUserCredentials(authType, role);
    const loginPage = new LoginPage(page);
    await loginPage.loginByTypeAndRole(authType, userName, password);
}
