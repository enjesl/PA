import { test, Page, BrowserContext } from '@playwright/test';
import { LoginPage } from '@pages';
import { getUserCredentials, getTestData, getEnv } from '@utils';
const healthcareData = getTestData('admin/healthcare', 'healthcare');
import { HealthcareServicesPage } from '@pages';

const authType = getEnv('AUTH_TYPE', 'nonMicrosoft');
const userRole = getEnv('USER_ROLE', 'admin');
const { userName, password } = getUserCredentials(authType, userRole);

test.describe.serial('Admin Create Healthcare Services Screen - System Settings', () => {
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

    test('[91738] Verify that user able to create record in HealthCare Services screen', async () => {
        const healthcare = new HealthcareServicesPage(page)
        await healthcare.creatingHealthcareServicesRecord(healthcareData.healthcareServicesText, healthcareData.waitTime, healthcareData.locationText, healthcareData.firstRowHealthcareServicesTableIndex, undefined, healthcareData.randomLocationSelectionTrue, healthcareData.locationOptionToSelectTwo);
        await healthcare.createHealthcareServicesOnlyWithMandatoryFields(healthcareData.locationText, undefined, healthcareData.randomLocationSelectionTrue, healthcareData.locationOptionToSelectTwo)
    });

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });

});

test.describe.serial('Admin Healthcare Services Screen - System Settings', () => {
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

    test('[91598] Verify the user able to search the records in the Healthcare Services', async () => {
        const healthcare = new HealthcareServicesPage(page)
        await healthcare.searchingAndValidatingSpecialtyRecordsInHealthcareServices(healthcareData.healthcareServicesText, healthcareData.waitTime, healthcareData.specialtyDropdownText, healthcareData.secondRowHealthcareServicesTableIndex, healthcareData.firstRowHealthcareServicesTableIndex)
        await healthcare.searchingAndValidatingLocationRecordsInHealthcareServices(healthcareData.locationDropdownText, healthcareData.secondRowHealthcareServicesTableIndex, healthcareData.firstRowHealthcareServicesTableIndex)
        await healthcare.searchingAndValidatingStatusRecordsInHealthcareServices(healthcareData.statusDropdownText, healthcareData.secondRowHealthcareServicesTableIndex, healthcareData.firstRowHealthcareServicesTableIndex, healthcareData.statusActive, healthcareData.statusInActive)
    });

    test('[73079] Verify that user able to change the status from Inactive to Active', async () => {
        const healthcare = new HealthcareServicesPage(page)
        await healthcare.validatingChangedInactiveToActiveStatus(healthcareData.firstRowHealthcareServicesTableIndex, healthcareData.statusActive, healthcareData.toastMessage)
    });

    test('[73080] Verify that user able to change the status from Active to Inactive', async () => {
        const healthcare = new HealthcareServicesPage(page)
        await healthcare.validatingChangedActiveToInactiveStatus(healthcareData.secondRowHealthcareServicesTableIndex, healthcareData.firstRowHealthcareServicesTableIndex, healthcareData.statusInActive, healthcareData.toastMessage)
    });

    test('[91877] Verify that user able to delete the record in Healthcare Services Screen', async () => {
        const healthcare = new HealthcareServicesPage(page)
        await healthcare.deletingRecordInContent(healthcareData.firstRowHealthcareServicesTableIndex, healthcareData.waitTime)
    });

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });

});

test.describe.serial('Admin Edit Healthcare Services Screen - System Settings', () => {
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

    test('[91602] Verify that user able to update the record in Healthcare Services screen', async () => {
        const healthcare = new HealthcareServicesPage(page)
        await healthcare.updateHealthcareServicesRecord(healthcareData.healthcareServicesText, healthcareData.waitTime, healthcareData.locationText, healthcareData.firstRowHealthcareServicesTableIndex, undefined, healthcareData.randomLocationSelectionTrue, healthcareData.locationOptionToSelectTwo);
    });

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });

});
