import { test, Page, BrowserContext } from '@playwright/test';
import { getUserCredentials, getTestData, getEnv } from '@utils';
import { AdminPage, LocationPage, LoginPage, CommonPage } from '@pages';
import { cmdPause } from '@commands';

const authType = getEnv('AUTH_TYPE', 'nonMicrosoft');
const userRole = getEnv('USER_ROLE', 'admin');
const { userName, password } = getUserCredentials(authType, userRole); // or 'nonMicrosoft', 'support'
const locationManagement = getTestData('admin/location', 'locationManagement');

test.describe.serial('Location Management - System Settings', () => {
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

  test('Navigate to Location screen from System Settings', async () => {
    const adminPage = new AdminPage(page);
    const commonPage = new CommonPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', locationManagement.wait);        
    await page.goto('/admin');
    await adminPage.clickSystemSetting(locationManagement.systemSettingLabel, locationManagement.pageTitle);
    await commonPage.verifyBreadcrumb(locationManagement.expectedLocationBreadcrumb);
    await commonPage.clickBreadcrumbByText(locationManagement.breadcrumbText);  
    await page.waitForLoadState('networkidle');
  });

  
  test('Verify Location Search & Filter options and floating labels', async () => {
    const adminPage = new AdminPage(page);
    const locationPage = new LocationPage(page);
    await adminPage.clickSystemSetting(locationManagement.systemSettingLabel, locationManagement.pageTitle);
    await locationPage.checkVisibilityLabels();
    await locationPage.verifysTableHeaderVisibility(locationManagement.locationTableHeaders);
  });

  

  test('Verify Reset Location Search & Filter', async () => {
    const locationPage = new LocationPage(page);
    await locationPage.checkVisibilityLabels();
    await locationPage.fillSearchFiltersLocation(
      locationManagement.enterLocation,
      locationManagement.enterID,
      locationManagement.isStatusActive
    );
    await locationPage.verifyClearFilledSearchFilter();
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});
test.describe.serial('Location Screen - Create Location', () => {
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

  test('[87398]Verify Create Location functionality', async () => {
    const locationPage = new LocationPage(page);
    const adminPage = new AdminPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', locationManagement.wait);
    await page.goto('/admin');
    await adminPage.clickSystemSetting(locationManagement.systemSettingLabel, locationManagement.pageTitle); 
    await locationPage.clickcreateLocationButton()
    await locationPage.fillLocationCreationDetails(locationManagement.partOfCreate, locationManagement.selectOrganizationCreate, locationManagement.enterContactNumber, locationManagement.enterWebsite);
    await locationPage.uploadImage(locationManagement.imagePath);
    await locationPage.locationAddressDetails(locationManagement.city, locationManagement.state, locationManagement.addessLine1, locationManagement.addessLine2, locationManagement.enterpostcode)
    await locationPage.clickCreateButton()
    await locationPage.clickBackArrowOnCreateLocation()
  });

  test('[65864] Add Floor map tab', async () => {
    const locationPage = new LocationPage(page);
    await locationPage.clickEllipsisButtonByRow(locationManagement.rowIndexForEdit); 
    await locationPage.clickEllipsisMenuItemLocation('Edit');
    await locationPage.addFloormap(locationManagement.floorindexnumber, locationManagement.floor, locationManagement.imagePath)
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});

test.describe.serial('Location Screen - Edit', () => {
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

  test('[66257][66258]Verify Edit Location functionality', async () => {
    const locationPage = new LocationPage(page);
    const adminPage = new AdminPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', locationManagement.wait);
    await page.goto('/admin');
    await adminPage.clickSystemSetting(locationManagement.systemSettingLabel, locationManagement.pageTitle);
    await locationPage.clickEllipsisButtonByRow(locationManagement.rowIndexForEdit); 
    await locationPage.clickEllipsisMenuItemLocation('Edit');
    await locationPage.editLocation();
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});

test.describe.serial('Location screen - View', () => {
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

  test('Verify View location functionality', async () => {
    const locationPage = new LocationPage(page);
    const adminPage = new AdminPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', locationManagement.wait);
    await page.goto('/admin');
    await adminPage.clickSystemSetting(locationManagement.systemSettingLabel, locationManagement.pageTitle);
    await locationPage.clickEllipsisButtonByRow(locationManagement.rowIndexForEdit); 
    await locationPage.clickEllipsisMenuItemLocation('View');
    await locationPage.viewLocation(locationManagement.floorindexnumber);
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});

test.describe.serial('Location screen - Mark Active and Mark Inactive', () => {
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

  test('Verify Mark Inactive functionality', async () => {
    const locationPage = new LocationPage(page);
    const adminPage = new AdminPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', locationManagement.wait);
    await page.goto('/admin');
    await adminPage.clickSystemSetting(locationManagement.systemSettingLabel, locationManagement.pageTitle);
    await locationPage.clickEllipsisButtonByRow(locationManagement.rowIndexForEdit); 
    await locationPage.clickEllipsisMenuItemLocation('Mark Inactive');
  });

  test('Verify Mark Active functionality', async () => {
    const locationPage = new LocationPage(page); 
    await locationPage.clickEllipsisButtonByRow(locationManagement.rowIndexForEdit); 
    await locationPage.clickEllipsisMenuItemLocation('Mark Active');
  });


  test.afterAll(async () => {
    await page.close();
    await context.close();
  });
});


test.describe.serial('Location screen - Delete Functionality', () => {
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

  test('[65762]Delete functionality', async () => {
    const locationPage = new LocationPage(page);
    const adminPage = new AdminPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', locationManagement.wait);
    await page.goto('/admin');
    await adminPage.clickSystemSetting(locationManagement.systemSettingLabel, locationManagement.pageTitle);
    await locationPage.clickEllipsisButtonByRow(locationManagement.rowIndexForEdit); 
    await locationPage.clickEllipsisMenuItemLocation('Delete');
    await locationPage.deleteLocation()
  });


  test.afterAll(async () => {
    await page.close();
    await context.close();
  });
});
