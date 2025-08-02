import { test, Page, BrowserContext } from '@playwright/test';
import { getUserCredentials, getTestData, getEnv } from '@utils';
import { LoginPage, AdminPage, UserGroupPage, CommonPage } from '@pages';


const authType = getEnv('AUTH_TYPE', 'nonMicrosoft');
const userRole = getEnv('USER_ROLE', 'admin');
const { userName, password } = getUserCredentials(authType, userRole); // or 'nonMicrosoft', 'support'
const adminTestData = getTestData('admin/testData','adminLanding');
const userGroupData = getTestData('admin/testData','userGroup');



test.describe.serial('Admin Landing Screen', () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    const loginPage = new LoginPage(page);
    await page.goto('/login');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await context.clearCookies();
    await loginPage.loginByTypeAndRole(authType, userName, password);
  });

  test('[51494] Verify footer presence and content', async () => {
    const adminPage = new AdminPage(page);
    await adminPage.verifyFooterLabel(adminTestData.footerText);
  });

  test('Verify footer responsiveness on different screen sizes', async () => {
    const adminPage = new AdminPage(page);
    const commonPage = new CommonPage(page);
    await commonPage.setTabletView('portrait');
    await adminPage.verifyFooterLabel(adminTestData.footerText);
    await commonPage.setMobileView('landscape');
    await adminPage.verifyFooterLabel(adminTestData.footerText);
    await commonPage.setDesktopView();
  });

  test('[53295] Verify Admin Landing Screen', async () => {
    const adminPage = new AdminPage(page);
    await adminPage.verifyAfterAdminLogin(userName, adminTestData.pageTitle);
  });

  test('[53296] [53297] Verify that Main Navigation bar is configurable', async () => {
    const adminPage = new AdminPage(page);
    const userGroupPage = new UserGroupPage(page);
    const commonPage = new CommonPage(page);
    await adminPage.clickSystemSetting(userGroupData.systemSettingLabel,userGroupData.pageTitle);
    await commonPage.verifyBreadcrumb(userGroupData.expectedUserGroupBreadcrumb);
    await userGroupPage.clickOnCreateUserGroup();
    await commonPage.verifyBreadcrumb(userGroupData.expectedUserGroupCreateBreadcrumb);
    await userGroupPage.clickOnBackArrow();
    await commonPage.verifyBreadcrumb(userGroupData.expectedUserGroupBreadcrumb);
    await userGroupPage.clickOnEdit();
    await commonPage.verifyBreadcrumb(userGroupData.expectedUserGroupEditBreadcrumb);
  });


  test('Verify user dropdown and logout option', async () => {
    const adminPage = new AdminPage(page);
    await adminPage.logout();
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});


