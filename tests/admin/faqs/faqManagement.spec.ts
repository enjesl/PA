import { test, Page, BrowserContext } from '@playwright/test';
import { getUserCredentials, getTestData, getEnv } from '@utils';
import { AdminPage ,FaqsPage, LoginPage, CommonPage } from '@pages';


const authType = getEnv('AUTH_TYPE', 'nonMicrosoft');
const userRole = getEnv('USER_ROLE', 'admin');
const { userName, password } = getUserCredentials(authType, userRole); // or 'nonMicrosoft', 'support'
const faqManagement = getTestData('admin/faqs','faqManagement');



test.describe.serial('FAQ Management - System Settings', () => {
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

  test('Navigate to FAQs screen from System Settings', async () => {
    const adminPage = new AdminPage(page);
    const commonPage = new CommonPage(page);
    await adminPage.clickSystemSetting(faqManagement.systemSettingLabel, faqManagement.pageTitle);
    await commonPage.verifyBreadcrumb(faqManagement.expectedFaqsBreadcrumb);
    await commonPage.clickBreadcrumbByText(faqManagement.breadcrumbText);
    await page.waitForLoadState('networkidle');
  });

  test('Verify FAQ Search & Filter options and floating labels', async () => {
    const adminPage = new AdminPage(page);
    const faqsPage = new FaqsPage(page);
    await adminPage.clickSystemSetting(faqManagement.systemSettingLabel, faqManagement.pageTitle);
    await faqsPage.verifySearchFaqsFieldVisibility();
    await faqsPage.verifyFaqsTableHeaderVisibility(faqManagement.faqTableHeaders);
    await faqsPage.verifyCreateFaqsButtonVisibility();
  });


  test('Verify Reset FAQ Search & Filter', async () => {
    const faqsPage = new FaqsPage(page);
    await faqsPage.verifySearchFaqsFieldVisibility();
    await faqsPage.FillSearchFilters(faqManagement.optionPlatformValue, faqManagement.optionUserGroupValue, faqManagement.headerValue, faqManagement.optionStatusValue);
    await faqsPage.clickClearAllButton();
    await faqsPage.verifyClearFilledSearchFilter();

  });

  test('Logout', async () => {
    const adminPage = new AdminPage(page);
    await adminPage.logout();

  });
  test.afterAll(async () => {

    await page.close();
    await context.close();
  });

});


