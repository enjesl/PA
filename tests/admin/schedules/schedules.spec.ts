import { test, Page, BrowserContext } from '@playwright/test';
import { getUserCredentials, getTestData, getEnv } from '@utils';
import { AdminPage, CommonPage, LoginPage, SchedulePage } from '@pages';
import { cmdPause } from '@commands';

const authType = getEnv('AUTH_TYPE', 'nonMicrosoft');
const userRole = getEnv('USER_ROLE', 'admin');
const { userName, password } = getUserCredentials(authType, userRole);
const filterPanelData = getTestData('admin/schedules', 'scheduleFilterPanel');
const createScheduleData = getTestData('admin/schedules', 'createSchedule');


test.describe.serial('Create Schedule Flow', () => {
    let context: BrowserContext;
    let page: Page;

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

    test('Navigate to Schedule screen from Admin Settings', async () => {
        const adminPage = new AdminPage(page);
        const commonPage = new CommonPage(page);

        await page.waitForLoadState('networkidle');

        // Optional pause if delay needed before navigation
        if (filterPanelData.wait) {
            await cmdPause(page, 'Pause before navigation', filterPanelData.wait);
        }

        // Step 1: Navigate to Admin landing page
        await page.goto('/admin');

        // Step 2: Click on System Setting > Schedule
        await adminPage.clickSystemSetting(
            filterPanelData.systemSettingLabel,
            filterPanelData.pageTitle
        );

        // Step 3: Verify breadcrumb
        await commonPage.verifyBreadcrumb(filterPanelData.expectedBreadcrumb);

        // Step 4: Click on specific breadcrumb
        await commonPage.clickBreadcrumbByText(filterPanelData.breadcrumbText);

        await page.waitForLoadState('networkidle');
    });


    test('Create a new schedule successfully', async () => {
        const schedulePage = new SchedulePage(page);
        const commonPage = new CommonPage(page);

        // Navigate to Schedule main page first
        await page.goto('/admin/schedule');

        // 🔹 Step 0: Expand filters before any interaction
        await schedulePage.handleFilterSections(
            createScheduleData.handleFilterSections.allSectionHeaders,
            createScheduleData.handleFilterSections.expandMode,
            createScheduleData.handleFilterSections.action,
            createScheduleData.handleFilterSections.sectionsToExpand
        );

        await schedulePage.clickCreateScheduleButton();

        // 🔹 Step 1: Select Doctor, Service, and Location
        await schedulePage.handleDoctorServiceLocationDropdowns(
            createScheduleData.doctorServiceLocationDropdowns.action,
            createScheduleData.doctorServiceLocationDropdowns.doctorValue,
            createScheduleData.doctorServiceLocationDropdowns.serviceValue,
            createScheduleData.doctorServiceLocationDropdowns.locationValue,
            createScheduleData.doctorServiceLocationDropdowns.randomSelection,
            createScheduleData.doctorServiceLocationDropdowns.restrictDoctorValues,
            createScheduleData.doctorServiceLocationDropdowns.restrictServiceValues,
            createScheduleData.doctorServiceLocationDropdowns.restrictLocationValues,
            createScheduleData.doctorServiceLocationDropdowns.pauseDuration
        );

        // 🔹 Step 2: Select Timezone and Slot Duration
        await schedulePage.handleScheduleTimezoneAndSlotDropdowns(
            createScheduleData.scheduleTimezoneAndSlotDropdowns.action,
            createScheduleData.scheduleTimezoneAndSlotDropdowns.timezoneValue,
            createScheduleData.scheduleTimezoneAndSlotDropdowns.slotDurationValue,
            createScheduleData.scheduleTimezoneAndSlotDropdowns.pause
        );

        // 🔹 Step 3: Select Schedule Start and End Date
        const {
            startDate,
            endDate,
            availabilityDay
        } = await schedulePage.handleScheduleStartAndEndDates(
            createScheduleData.scheduleStartAndEndDates.startType,
            createScheduleData.scheduleStartAndEndDates.startOffsetDays,
            createScheduleData.scheduleStartAndEndDates.endOffsetDays,
            createScheduleData.scheduleStartAndEndDates.optionAvailability,
            createScheduleData.scheduleStartAndEndDates.isRandom,
            createScheduleData.scheduleStartAndEndDates.excludeDays,
            createScheduleData.scheduleStartAndEndDates.pauseDuration
        );

        // 🔹 Optional: Use availabilityDay later in test
        console.log('Selected Availability Day:', availabilityDay);

        // 🔹 Step 4: Select Bookable and Requestable For
        await schedulePage.handleScheduleBookableAndRequestableDropdowns(
            createScheduleData.scheduleBookableAndRequestableDropdowns.action,
            createScheduleData.scheduleBookableAndRequestableDropdowns.bookableForValues,
            createScheduleData.scheduleBookableAndRequestableDropdowns.requestableForValues,
            createScheduleData.scheduleBookableAndRequestableDropdowns.useRandom,
            createScheduleData.scheduleBookableAndRequestableDropdowns.numberToSelect,
            createScheduleData.scheduleBookableAndRequestableDropdowns.pauseDuration
        );

        // 🔹 Step 5: Select Occurrence and Slot Times
        await schedulePage.handleOccurrenceAndTimeSlot(
            createScheduleData.occurrenceAndTimeSlot.occurrenceValues,
            createScheduleData.occurrenceAndTimeSlot.useRandom,
            createScheduleData.occurrenceAndTimeSlot.numberToSelect,
            createScheduleData.occurrenceAndTimeSlot.excludeValues,
            createScheduleData.occurrenceAndTimeSlot.startTime,
            createScheduleData.occurrenceAndTimeSlot.startPeriod,
            createScheduleData.occurrenceAndTimeSlot.endTime,
            createScheduleData.occurrenceAndTimeSlot.endPeriod,
            createScheduleData.occurrenceAndTimeSlot.pauseDuration
        );

        // 🔹 Step 6: Add Break
        await schedulePage.handleBreakConfiguration(
            createScheduleData.breakConfiguration.breakTitle,
            createScheduleData.breakConfiguration.breakStartTime,
            createScheduleData.breakConfiguration.breakStartPeriod,
            createScheduleData.breakConfiguration.breakEndTime,
            createScheduleData.breakConfiguration.breakEndPeriod,
            createScheduleData.breakConfiguration.pauseDuration
        );

        // 🔹 Step 7: Add Day
        await schedulePage.verifyAndClickAddDayButton();

        // 🔹 Step 8: Verify Added Row
        await schedulePage.verifyScheduleRowData(
            createScheduleData.verifyScheduleRowData.rowIndex,
            availabilityDay ?? createScheduleData.verifyScheduleRowData.day,
            createScheduleData.verifyScheduleRowData.occurrences,
            createScheduleData.occurrenceAndTimeSlot.startTime +" "+ createScheduleData.occurrenceAndTimeSlot.startPeriod,
            createScheduleData.occurrenceAndTimeSlot.endTime+" "+ createScheduleData.occurrenceAndTimeSlot.endPeriod,
            createScheduleData.breakConfiguration.breakTitle,
            createScheduleData.breakConfiguration.breakStartTime+" "+createScheduleData.breakConfiguration.breakStartPeriod,
            createScheduleData.verifyScheduleRowData.breakEndTime+" "+createScheduleData.breakConfiguration.breakEndPeriod,
            createScheduleData.verifyScheduleRowData.pauseDuration
        );

        // 🔹 Step 9: Fill Instructions
        await schedulePage.fillInstructions(createScheduleData.instructions);

        // 🔹 Step 10: Submit
        await schedulePage.submitCreateScheduleForm();

        await commonPage.assertToasterMessage(createScheduleData.expectedToasterMessage)
        // Final pause for observation (optional)
        await cmdPause(page, 'Final pause to observe the created schedule', 1000);
    });



    test.afterAll(async () => {
        await context.close();
    });
});
