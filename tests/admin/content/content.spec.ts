import { test, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '@pages';
import { getUserCredentials, getTestData, getEnv } from '@utils';
const contentData = getTestData('admin/content', 'content');
import { ContentPage } from '@pages';

const authType = getEnv('AUTH_TYPE', 'nonMicrosoft');
const userRole = getEnv('USER_ROLE', 'admin');
const { userName, password } = getUserCredentials(authType, userRole);

test.describe.serial('Admin Create Content Screen - System Settings', () => {
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

  test('[91277] Verify that user able to create record in Content screen', async () => {
    const content = new ContentPage(page)
    const { selectedModule, selectedPlatform } = await content.creatingContentRecord(contentData.contentText, contentData.waitTime, contentData.moduleDropdownText, contentData.platformDropdownText, contentData.firstRowContentTableIndex, undefined, contentData.randomModuleOrPlatformSelection, undefined, contentData.randomModuleOrPlatformSelection);
    await content.createContentOnlyWithMandatoryFields(contentData.moduleDropdownText, contentData.platformDropdownText, [selectedModule], [selectedPlatform], undefined, contentData.randomModuleOrPlatformSelection, undefined, contentData.randomModuleOrPlatformSelection)
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});

test.describe.serial('Admin Content Screen - System Settings', () => {
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

  test('[91203] Verify the user able to search the records in the Content Screen', async () => {
    const content = new ContentPage(page)
    await content.searchingAndValidatingRecordsInContent(contentData.contentText, contentData.waitTime, contentData.moduleDropdownText, contentData.platformDropdownText, contentData.firstRowContentTableIndex, contentData.secondRowContentTableIndex)
  });

  test('[91286] Verify that user able to delete the record in Content table', async () => {
    const content = new ContentPage(page)
    await content.deletingRecordInContent(contentData.firstRowContentTableIndex)
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});

test.describe.serial('Admin Edit Content Screen - System Settings', () => {
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

  test('[91283] Verify that user able to update the record in Content screen', async () => {
    const content = new ContentPage(page)
    await content.updatingContentRecord(contentData.contentText, contentData.waitTime, contentData.moduleFloatingLabel, contentData.platformFloatingLabel, contentData.firstRowContentTableIndex, undefined, contentData.randomModuleOrPlatformSelection, undefined, contentData.randomModuleOrPlatformSelection)
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});

test.describe.serial('Admin View Content Screen - System Settings', () => {
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

  test('[78832] Verify all the fields are disabled and correct data is displayed in View Content screen', async () => {
    const content = new ContentPage(page)
    await content.validatingFieldValuesAndDisabledFieldsInViewContent(contentData.contentText, contentData.waitTime, contentData.moduleFloatingLabel, contentData.platformFloatingLabel, contentData.arrowDropdown, contentData.firstRowContentTableIndex)
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});