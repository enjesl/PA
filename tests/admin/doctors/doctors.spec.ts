import { test, Page, BrowserContext } from '@playwright/test';
import { getUserCredentials, getTestData, getEnv } from '@utils';
import { AdminPage, DoctorsPage, LoginPage, CommonPage } from '@pages';
import { cmdPause } from '@commands';

const authType = getEnv('AUTH_TYPE', 'nonMicrosoft');
const userRole = getEnv('USER_ROLE', 'admin');
const { userName, password } = getUserCredentials(authType, userRole); // or 'nonMicrosoft', 'support'
const doctorManagement = getTestData('admin/doctors', 'doctorsManagement');

test.describe.serial('[65268]Doctors Management - System Settings', () => {
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

  test('Navigate to Doctors screen from System Settings', async () => {
    const adminPage = new AdminPage(page);
    const commonPage = new CommonPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', doctorManagement.wait);        
    await page.goto('/admin');
    await adminPage.clickSystemSetting(doctorManagement.systemSettingLabel, doctorManagement.pageTitle);
    await commonPage.verifyBreadcrumb(doctorManagement.expectedDoctorsBreadcrumb);
    await commonPage.clickBreadcrumbByText(doctorManagement.breadcrumbText);  
    await page.waitForLoadState('networkidle');
  });

  
  test('Verify Doctor Search & Filter options and floating labels', async () => {
    const adminPage = new AdminPage(page);
    const doctorsPage = new DoctorsPage(page);
    await adminPage.clickSystemSetting(doctorManagement.systemSettingLabel, doctorManagement.pageTitle);
    await doctorsPage.checkVisibilityLabels();
    await doctorsPage.verifysTableHeaderVisibility(doctorManagement.doctorsTableHeaders);
  });

  

  test('Verify Reset Doctors Search & Filter', async () => {
    const doctorsPage = new DoctorsPage(page);
    await doctorsPage.checkVisibilityLabels();
    await doctorsPage.fillSearchFiltersDoctors(
      doctorManagement.enterIDValue,
      doctorManagement.enterNameValue,
      doctorManagement.optionLocation,
      doctorManagement.optionOrganization,
      doctorManagement.optionSpecialty,
      doctorManagement.enterEmail,
      doctorManagement.enterMobileno,
      doctorManagement.selectLocationCount,
      doctorManagement.selectSpecialityCount,
      doctorManagement.selectOrganizationCount,
      doctorManagement.isMultiSelectSearchEnabled
    );
    await doctorsPage.clickClearAllButton();
    await doctorsPage.verifyClearFilledSearchFilter();
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});
test.describe.serial('[65648]Doctors Screen - Edit Doctor', () => {
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

  test('Verify Edit Doctor functionality', async () => {
    const doctorsPage = new DoctorsPage(page);
    const adminPage = new AdminPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', doctorManagement.wait);        
    await page.goto('/admin');
    await adminPage.clickSystemSetting(doctorManagement.systemSettingLabel, doctorManagement.pageTitle);
    await doctorsPage.clickEllipsisButtonByRow(doctorManagement.rowIndexForEdit); 
    await doctorsPage.clickEllipsisMenuItemDoctors('editDoctor');
    await doctorsPage.editDoctors(doctorManagement.locationOption, doctorManagement.isMultiSelectSearchEnabled, doctorManagement.selectLocationCount);
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});

test.describe.serial('Doctors Screen - View Doctor', () => {
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

  test('Verify View Doctor functionality', async () => {
    const doctorsPage = new DoctorsPage(page);
    const adminPage = new AdminPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', doctorManagement.wait);        
    await page.goto('/admin');
    await adminPage.clickSystemSetting(doctorManagement.systemSettingLabel, doctorManagement.pageTitle);
    await doctorsPage.clickEllipsisButtonByRow(doctorManagement.rowIndexForEdit); 
    await doctorsPage.clickEllipsisMenuItemDoctors('viewDoctor');
    await doctorsPage.viewDoctors();
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});

test.describe.serial('Doctors screen - Manage Visibility', () => {
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

  test('[72127][72128][72129]Verify Manage Visibility functionality', async () => {
    const doctorsPage = new DoctorsPage(page);
    const adminPage = new AdminPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', doctorManagement.wait);        
    await page.goto('/admin');
    await adminPage.clickSystemSetting(doctorManagement.systemSettingLabel, doctorManagement.pageTitle);
    await doctorsPage.clickEllipsisButtonByRow(doctorManagement.rowIndexForEdit); 
    await doctorsPage.clickEllipsisMenuItemDoctors('manageVisibility');
    await doctorsPage.manageVisibility('CreateAndAdd',doctorManagement.optionUserGroupValue, doctorManagement.isMultiSelectSearchEnabled, doctorManagement.selectLocationCount, doctorManagement.selectUserGroupCount, doctorManagement.isLocationDropdownSearchEnabled);
    await doctorsPage.deleteManageVisibility(doctorManagement.rowIndexForEdit);
  });

  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

});

test.describe.serial('[66981]Doctors screen - View Schedules', () => {
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

  test('Verify View Schedules functionality', async () => {
    const doctorsPage = new DoctorsPage(page);
    const adminPage = new AdminPage(page);
    await page.waitForLoadState('networkidle');
    await cmdPause(page, 'Wait time for navigation from login page', doctorManagement.wait);        
    await page.goto('/admin');
    await adminPage.clickSystemSetting(doctorManagement.systemSettingLabel, doctorManagement.pageTitle);
    await doctorsPage.clickEllipsisButtonByRow(doctorManagement.rowIndexForEdit); 
    await doctorsPage.clickEllipsisMenuItemDoctors('viewSchedules');
    await doctorsPage.viewSchedules();
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
