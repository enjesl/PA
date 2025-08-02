import { BasePage } from './BasePage';
import { CommonLocators, SchedulePageLocators } from '@locators';
import { assertDisabled, assertEnabled, assertVisible, cmdClearMatSelectedChips, cmdClick, cmdFill, cmdIsVisible, cmdPause, cmdScrollIntoView, cmdSelectMatMultiOptions, cmdSelectMatOption, getAllMatOptionValues, pickDateByCalendar } from '@commands';
import { getDateString } from '@utils';
import { CommonPage } from '@pages';

/**
 * Schedule Page
 */
export class SchedulePage extends BasePage {

    selectedDoctor: string | null = null;
    selectedService: string | null = null;
    selectedLocation: string | null = null;

    selectedTimezone: string | null = null;
    selectedSlotDuration: string | null = null;

    selectedBookableFor: string[] = [];
    selectedRequestableFor: string[] = [];

    public selectedScheduleStartDate?: string;
    public selectedScheduleEndDate?: string;

    public selectedOccurrences?: string[];
    public selectedBreakTitle?: string;

    public selectedAvailabilityDay?: string;




    /**
     * Verifies all filter section headers are visible.
     * Optionally clicks 'Expand All' first.
     */
    async verifyAllFilterSections(sections: string[], expandAll: boolean = true): Promise<void> {
        await assertVisible(this.page, SchedulePageLocators.sectionFilterPanel);

        if (expandAll) {
            await cmdClick(this.page, SchedulePageLocators.labelExpandAll);
        }

        for (const section of sections) {
            const locator = SchedulePageLocators.labelSearchFilterSectionHeadeDynamic(section);
            await assertVisible(this.page, locator, true);
        }
    }

    /**
     * Clicks custom filter section headers (expands/collapses individually).
     */
    async clickCustomFilterSections(sections: string[]): Promise<void> {
        for (const section of sections) {
            const locator = SchedulePageLocators.labelSearchFilterSectionHeadeDynamic(section);
            await cmdClick(this.page, locator, false, `Filter Section: ${section}`);
        }
    }

    /**
     * Handles verification and/or expansion of filter sections.
     *
     * @param allSectionHeaders All section headers available on the filter panel (e.g., from schedules.json)
     * @param expandMode 'all' to apply on all headers or 'custom' to apply only on specified ones
     * @param action 'verify' | 'click' | 'both'
     * @param sectionsToExpand Comma-separated string (e.g. "Date, Status") — only if expandMode is 'custom'
     */
    async handleFilterSections(
        allSectionHeaders: string[],
        expandMode: 'all' | 'custom' = 'all',
        action: 'verify' | 'click' | 'both' = 'verify',
        sectionsToExpand = ''
    ) {
        const targetSections =
            expandMode === 'custom'
                ? sectionsToExpand.split(',').map((s) => s.trim())
                : allSectionHeaders;

        await assertVisible(this.page, SchedulePageLocators.sectionFilterPanel);

        // Click only once for 'Expand All'
        if (expandMode === 'all') {
            if (action === 'click' || action === 'both') {
                await cmdClick(this.page, SchedulePageLocators.labelExpandAll);
            }

            // If only verifying, verify all section headers
            if (action === 'verify' || action === 'both') {
                for (const section of targetSections) {
                    const locator = SchedulePageLocators.labelSearchFilterSectionHeadeDynamic(section);
                    await assertVisible(this.page, locator, true);
                }
            }

            // Skip further clicking to prevent collapsing
            return;
        }

        // Only if custom, handle section-by-section
        for (const section of targetSections) {
            const locator = SchedulePageLocators.labelSearchFilterSectionHeadeDynamic(section);

            if (action === 'verify' || action === 'both') {
                await assertVisible(this.page, locator, true);
            }

            if (action === 'click' || action === 'both') {
                await cmdClick(this.page, locator, false, `Filter Section: ${section}`);
            }
        }
    }

    /**
     * Handles selection from the Hospital filter dropdown.
     * @param hospitalValue Specific value to select (if randomSelection = false)
     * @param randomSelection Whether to select randomly
     * @param restrictValues Values to restrict selection from
     */
    async handleSelectHospitalFilter(hospitalValue: string = '', randomSelection = true, restrictValues: string = '') {
        const selectedHospitals = await getAllMatOptionValues(this.page, SchedulePageLocators.selectHospitalDropdownTrigger, CommonLocators.matOption);
        await cmdSelectMatOption(
            this.page,
            SchedulePageLocators.selectHospitalDropdownTrigger,
            CommonLocators.matOption,
            hospitalValue,
            randomSelection,
            [restrictValues]
        );
        return selectedHospitals
    }

    /**
     * Handles selection from the Healthcare Services filter dropdown.
     */
    async handleSelectHealthcareServiceFilter(serviceValue: string, randomSelection = true, restrictValues: string = '') {
        await cmdSelectMatOption(
            this.page,
            SchedulePageLocators.selectHealthcareServiceDropdownTrigger,
            CommonLocators.matOption,
            serviceValue,
            randomSelection,
            [restrictValues]
        );
    }

    /**
     * Handles selection from the Doctor filter dropdown.
     */
    async handleSelectDoctorFilter(doctorValue: string, randomSelection = true, restrictValues: string = '') {
        await cmdSelectMatOption(
            this.page,
            SchedulePageLocators.selectDoctorsDropdownTrigger,
            CommonLocators.matOption,
            doctorValue,
            randomSelection,
            [restrictValues]
        );
    }

    async validateDoctorDropdownFilters(pause: number = 500) {
        const commonPage = new CommonPage(this.page);
        return await commonPage.validateDropdownFilterResults(
            SchedulePageLocators.selectDoctorsDropdownTrigger,
            CommonLocators.matOption,
            SchedulePageLocators.tableRowCount,
            SchedulePageLocators.buttonSearch,
            pause
        );
    }


    /**
     * Selects a radio button in the Date filter by visible label.
     * @param label e.g., "Today", "Last Week", "Date Range"
     */
    async selectDateFilterRadio(label: string) {
        const locator = SchedulePageLocators.radioDateFilterByLabel(label);
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator, false, `Date Filter Radio: ${label}`);
    }

    /**
     * Verifies and clicks the Create Schedule button.
     * After clicking, it optionally verifies that the button disappears.
     * 
     * @param verifyHiddenAfterClick Whether to check that the button is no longer visible after clicking
     */
    async clickCreateScheduleButton(verifyHiddenAfterClick: boolean = true) {
        const locator = SchedulePageLocators.buttonCreateSchedule;
        // Verify it's visible and enabled
        await assertVisible(this.page, locator, true);
        // Click the button
        await cmdClick(this.page, locator, false, 'Create Schedule');
        // Optionally verify it disappears (e.g. modal opened)
        if (verifyHiddenAfterClick) {
            await assertVisible(this.page, SchedulePageLocators.tabSchedule, true);
        }
    }

    /**
 * Verifies that only the 'Schedule' tab is enabled,
 * and 'Leaves' and 'Exceptions' tabs are disabled.
 */
    async verifyOnlyScheduleTabEnabled() {
        await assertVisible(this.page, SchedulePageLocators.tabSchedule);
        await assertEnabled(this.page, SchedulePageLocators.tabSchedule);

        await assertVisible(this.page, SchedulePageLocators.tabLeaves);
        await assertDisabled(this.page, SchedulePageLocators.tabLeaves);

        await assertVisible(this.page, SchedulePageLocators.tabExceptions);
        await assertDisabled(this.page, SchedulePageLocators.tabExceptions, true);
    }

    /**
     * Handle verify/select/both for Doctor, Healthcare Service, and Location dropdowns
     * with optional random selection.
     */
    async handleDoctorServiceLocationDropdowns(
        action: 'verify' | 'select' | 'both',
        doctorValue = '',
        serviceValue = '',
        locationValue = '',
        randomSelection = true,
        restrictDoctorValues: string[] = [],
        restrictServiceValues: string[] = [],
        restrictLocationValues: string[] = [],
        pauseDuration = 300
    ): Promise<{
        doctor: string | null,
        service: string | null,
        location: string | null
    }> {
        await this.page.waitForLoadState('load');

        let localDoctor: string | null = null;
        let localService: string | null = null;
        let localLocation: string | null = null;

        if (action === 'verify' || action === 'both') {
            await assertVisible(this.page, SchedulePageLocators.selectDoctorsDropdownTrigger, true);
            await assertVisible(this.page, SchedulePageLocators.selectHealthcareServiceDropdownTrigger, true);
            await assertVisible(this.page, SchedulePageLocators.selectLocationDropdownTrigger, true);
        }

        if (action === 'select' || action === 'both') {
            localDoctor = await cmdSelectMatOption(
                this.page,
                SchedulePageLocators.selectDoctorsDropdownTrigger,
                CommonLocators.matOption,
                doctorValue,
                randomSelection,
                restrictDoctorValues
            );
            await cmdPause(this.page, 'Pause after selecting Doctor', pauseDuration);

            localService = await cmdSelectMatOption(
                this.page,
                SchedulePageLocators.selectHealthcareServiceDropdownTrigger,
                CommonLocators.matOption,
                serviceValue,
                randomSelection,
                restrictServiceValues
            );
            await cmdPause(this.page, 'Pause after selecting Healthcare Service', pauseDuration);

            localLocation = await cmdSelectMatOption(
                this.page,
                SchedulePageLocators.selectLocationDropdownTrigger,
                CommonLocators.matOption,
                locationValue,
                randomSelection,
                restrictLocationValues
            );
        }

        // Store globally for use in other methods
        this.selectedDoctor = localDoctor;
        this.selectedService = localService;
        this.selectedLocation = localLocation;

        // Return locally for immediate use
        return {
            doctor: localDoctor,
            service: localService,
            location: localLocation
        };
    }

    async handleScheduleTimezoneAndSlotDropdowns(
        action: 'verify' | 'select' | 'both',
        timezoneValue: string = '',
        slotDurationValue: string = '',
        pause: number = 300
    ): Promise<{
        timezone: string | null;
        slotDuration: string | null;
    }> {
        let selectedTimezone: string | null = null;
        let selectedSlotDuration: string | null = null;

        if (action === 'verify' || action === 'both') {
            await assertVisible(this.page, SchedulePageLocators.selectTimezoneDropdownTrigger, true);
            await assertVisible(this.page, SchedulePageLocators.selectSlotDurationDropdownTrigger, true);
        }

        if (action === 'select' || action === 'both') {
            selectedTimezone = await cmdSelectMatOption(
                this.page,
                SchedulePageLocators.selectTimezoneDropdownTrigger,
                CommonLocators.matOption,
                timezoneValue,
                !timezoneValue,
                []
            );
            await cmdPause(this.page, 'Pause after selecting Timezone', pause);
            this.selectedTimezone = selectedTimezone;

            selectedSlotDuration = await cmdSelectMatOption(
                this.page,
                SchedulePageLocators.selectSlotDurationDropdownTrigger,
                CommonLocators.matOption,
                slotDurationValue,
                !slotDurationValue,
                []
            );
            await cmdPause(this.page, 'Pause after selecting Slot Duration', pause);
            this.selectedSlotDuration = selectedSlotDuration;
        }

        return {
            timezone: selectedTimezone,
            slotDuration: selectedSlotDuration
        };
    }

    async handleScheduleBookableAndRequestableDropdowns(
        action: 'verify' | 'select' | 'both',
        bookableForValues: string[] = [],
        requestableForValues: string[] = [],
        useRandom = true,
        numberToSelect: number = 1,
        pauseDuration = 300
    ): Promise<{
        bookableFor: string[],
        requestableFor: string[]
    }> {
        let selectedBookableFor: string[] = [];
        let selectedRequestableFor: string[] = [];

        // Step 1: Handle Bookable For
        if (action === 'verify' || action === 'both') {
            await assertVisible(this.page, SchedulePageLocators.selectBookableForDropdownTrigger, true);
        }

        if ((action === 'select' || action === 'both') && (useRandom || bookableForValues.length > 0)) {
            selectedBookableFor = await cmdSelectMatMultiOptions(
                this.page,
                SchedulePageLocators.selectBookableForDropdownTrigger,
                CommonLocators.matOption,
                bookableForValues,
                useRandom,
                numberToSelect,
                [] // No exclusions
            );
            this.selectedBookableFor = selectedBookableFor; // store globally
            await cmdPause(this.page, 'Pause after Bookable For selection', pauseDuration);
        }

        // Step 2: Handle Requestable For
        if (action === 'verify' || action === 'both') {
            await assertVisible(this.page, SchedulePageLocators.selectRequestableForDropdownTrigger, true);
        }

        if ((action === 'select' || action === 'both') && (useRandom || requestableForValues.length > 0)) {
            selectedRequestableFor = await cmdSelectMatMultiOptions(
                this.page,
                SchedulePageLocators.selectRequestableForDropdownTrigger,
                CommonLocators.matOption,
                requestableForValues,
                useRandom,
                numberToSelect,
                selectedBookableFor // Exclude already selected values
            );
            this.selectedRequestableFor = selectedRequestableFor; // store globally
            await cmdPause(this.page, 'Pause after Requestable For selection', pauseDuration);
        }

        return {
            bookableFor: selectedBookableFor,
            requestableFor: selectedRequestableFor
        };
    }

    /**
     * Handles selecting Start and End Dates for Schedule Availability using the calendar picker.
     *
     * @param startType 'today' | 'tomorrow' | 'future'
     * @param startOffsetDays Offset from today (only for 'future')
     * @param endOffsetDays Days after start date for end date
     * @param pauseDuration Delay between interactions
     */
    async handleScheduleStartAndEndDates(
        startType: 'today' | 'tomorrow' | 'future' = 'today',
        startOffsetDays = 0,
        endOffsetDays = 1,
        optionAvailability: string = '',
        isRandom: boolean = true,
        excludeDays: string = '',
        pauseDuration = 300
    ): Promise<{ startDate: string; endDate: string, availabilityDay: string | null; }> {
        const startDate = getDateString(startType, startOffsetDays);
        const endDate = getDateString('future', startOffsetDays + endOffsetDays);

        const calendarLocators = {
            headerButton: SchedulePageLocators.calendarHeaderButton,
            yearCell: SchedulePageLocators.yearCell,
            monthCell: SchedulePageLocators.monthCell,
            dayCell: SchedulePageLocators.dayCell,
        };

        await pickDateByCalendar(
            this.page,
            SchedulePageLocators.calendarScheduleStartsButton,
            startDate,
            calendarLocators,
            pauseDuration
        );

        await cmdPause(this.page, 'Pause after picking schedule start date', pauseDuration);

        await pickDateByCalendar(
            this.page,
            SchedulePageLocators.calendarScheduleEndsButton,
            endDate,
            calendarLocators,
            pauseDuration
        );


        // Select availability day
        const selectedAvailability = await cmdSelectMatOption(
            this.page,
            SchedulePageLocators.selectAvailabilityDayDropdownTrigger,
            CommonLocators.matOption,
            optionAvailability,
            isRandom,
            [excludeDays]
        );

        this.selectedAvailabilityDay = selectedAvailability;
        // Optional: Store globally if needed
        this.selectedScheduleStartDate = startDate;
        this.selectedScheduleEndDate = endDate;

        return {
            startDate,
            endDate,
            availabilityDay: selectedAvailability
        };
    }


    /**
 * Handles selecting occurrences and configuring start/end times with AM/PM.
 */
    async handleOccurrenceAndTimeSlot(
        occurrenceValues: string[] = [],
        useRandom = false,
        numberToSelect = 1,
        excludeValues: string[] = [],
        startTime: string,
        startPeriod: 'AM' | 'PM',
        endTime: string,
        endPeriod: 'AM' | 'PM',
        pauseDuration = 300
    ): Promise<{
        occurrences: string[]
    }> {
        const commonPage = new CommonPage(this.page);

        // ─── Select Occurrence(s) ────────────────────────
        await cmdClearMatSelectedChips(this.page, SchedulePageLocators.clearOccurrenceChipContainer);
        await assertVisible(this.page, SchedulePageLocators.selectOccurrenceDropdownTrigger, true);

        const selectedOccurrences = await cmdSelectMatMultiOptions(
            this.page,
            SchedulePageLocators.selectOccurrenceDropdownTrigger,
            CommonLocators.matOption,
            occurrenceValues,
            useRandom,
            numberToSelect,
            excludeValues
        );
        this.selectedOccurrences = selectedOccurrences;

        console.log('[Occurrence Selection] Selected occurrences:', selectedOccurrences);
        await cmdPause(this.page, 'Pause after selecting occurrences', pauseDuration);

        // ─── Fill Start Time ─────────────────────────────
        await assertVisible(this.page, SchedulePageLocators.inputStartTime, true);
        await cmdFill(this.page, SchedulePageLocators.inputStartTime, startTime);
        await commonPage.toggleToExpectedPeriod(
            SchedulePageLocators.toggleStartTimePeriod,
            SchedulePageLocators.labelToggleStartTimePeriod,
            startPeriod,
            pauseDuration
        );

        // ─── Fill End Time ───────────────────────────────
        await assertVisible(this.page, SchedulePageLocators.inputEndTime, true);
        await cmdFill(this.page, SchedulePageLocators.inputEndTime, endTime);
        await commonPage.toggleToExpectedPeriod(
            SchedulePageLocators.toggleEndTimePeriod,
            SchedulePageLocators.labelToggleActiveEndTimePeriod,
            endPeriod,
            pauseDuration
        );

        return {
            occurrences: selectedOccurrences
        };
    }


    /**
     * Handles filling break title, break start time, and break end time with AM/PM toggles.
     */
    async handleBreakConfiguration(
        breakTitle: string,
        breakStartTime: string,
        breakStartPeriod: 'AM' | 'PM',
        breakEndTime: string,
        breakEndPeriod: 'AM' | 'PM',
        pauseDuration = 300
    ): Promise<void> {
        const commonPage = new CommonPage(this.page);

        // ─── Fill Break Title ──────────────────────────────
        await assertVisible(this.page, SchedulePageLocators.inputBreakTitle, true);
        await cmdFill(this.page, SchedulePageLocators.inputBreakTitle, breakTitle);
        this.selectedBreakTitle = breakTitle;
        await cmdPause(this.page, 'Pause after filling break title', pauseDuration);

        // ─── Fill Break Start Time ─────────────────────────
        await assertVisible(this.page, SchedulePageLocators.inputBreakStartTime, true);
        await cmdFill(this.page, SchedulePageLocators.inputBreakStartTime, breakStartTime);
        await commonPage.toggleToExpectedPeriod(
            SchedulePageLocators.toggleBreakStartTimePeriod,
            SchedulePageLocators.labelToggleBreakStartTimePeriod,
            breakStartPeriod,
            pauseDuration
        );

        // ─── Fill Break End Time ───────────────────────────
        await assertVisible(this.page, SchedulePageLocators.inputBreakEndTime, true);
        await cmdFill(this.page, SchedulePageLocators.inputBreakEndTime, breakEndTime);
        await commonPage.toggleToExpectedPeriod(
            SchedulePageLocators.toggleBreakEndTimePeriod,
            SchedulePageLocators.labelToggleBreakEndTimePeriod,
            breakEndPeriod,
            pauseDuration
        );
    }

    async verifyAndClickAddBreakTimeButton(pauseDuration = 300) {
        // Ensure the "+ Add Break Time" button is visible and enabled before clicking
        await assertVisible(this.page, SchedulePageLocators.buttonAddBreakTime, true);
        await assertEnabled(this.page, SchedulePageLocators.buttonAddBreakTime, true);
        await cmdClick(this.page, SchedulePageLocators.buttonAddBreakTime);

        // Optional pause to allow DOM changes after click
        await cmdPause(this.page, 'Pause after clicking Add Break Time', pauseDuration);
    }

    async verifyAndClickAddDayButton(pauseDuration = 300) {
        // Ensure the "+ Add Day" button is visible and enabled before clicking
        await assertVisible(this.page, SchedulePageLocators.buttonAddDay, true);
        await assertEnabled(this.page, SchedulePageLocators.buttonAddDay, true);
        await cmdClick(this.page, SchedulePageLocators.buttonAddDay);

        // Optional pause to allow DOM changes after click
        await cmdPause(this.page, 'Pause after clicking Add Day', pauseDuration);
    }

    async verifyScheduleRowData(
        rowIndex: number,
        day: string,
        occurrences: string[], // <-- changed here
        startTime: string,
        endTime: string,
        breakTitle: string,
        breakStartTime: string,
        breakEndTime: string,
        pauseDuration = 300
    ) {
        await assertVisible(this.page, SchedulePageLocators.getDayByRowIndex(rowIndex, day), true);

        for (let i = 0; i < occurrences.length; i++) {
            await assertVisible(this.page, SchedulePageLocators.getOccurrenceByRowIndex(rowIndex, occurrences[i]), true);
        }

        await assertVisible(this.page, SchedulePageLocators.getStartTimeByRowIndex(rowIndex, startTime), true);
        await assertVisible(this.page, SchedulePageLocators.getEndTimeByRowIndex(rowIndex, endTime), true);
        await assertVisible(this.page, SchedulePageLocators.getBreakTitleByRowIndex(rowIndex, breakTitle), true);
        await assertVisible(this.page, SchedulePageLocators.getBreakStartTimeByRowIndex(rowIndex, breakStartTime), true);
        await assertVisible(this.page, SchedulePageLocators.getBreakEndTimeByRowIndex(rowIndex, breakEndTime), true);

        await cmdPause(this.page, `Pause after verifying schedule row ${rowIndex}`, pauseDuration);
    }

    async deleteScheduleRow(rowIndex: number, pauseDuration = 300) {
        const deleteBtn = SchedulePageLocators.getDeleteButtonByRowIndex(rowIndex);
        await assertVisible(this.page, deleteBtn, true);
        await assertEnabled(this.page, deleteBtn, true);
        await cmdClick(this.page, deleteBtn);
        await cmdPause(this.page, `Pause after deleting row ${rowIndex}`, pauseDuration);
    }

    async fillInstructions(instructionText: string, pause = 300) {
        const locator = SchedulePageLocators.textareaReasonOrInstructions;
        await assertVisible(this.page, locator, true);
        await cmdFill(this.page, locator, instructionText);
        await cmdPause(this.page, 'Pause after filling Instructions', pause);
    }

    async clickClearAllButton(pause = 300) {
        const locator = SchedulePageLocators.buttonClearAll;
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator);
        await cmdPause(this.page, 'Pause after clicking Clear All', pause);
    }

    async submitCreateScheduleForm(pause = 300) {
        const locator = SchedulePageLocators.buttonCreateScheduleSubmit;
        await assertVisible(this.page, locator, true);
        await cmdClick(this.page, locator);
        await cmdPause(this.page, 'Pause after clicking Create button on form', pause);
    }

    /**
     * Clicks the ellipsis (three-dot) button by doctor name.
     * @param doctorName Full name of the doctor to match in the table row.
     */
    async clickEllipsisButtonByDoctorName(doctorName: string): Promise<void> {
        const ellipsisLocator = SchedulePageLocators.getEllipsisButtonByDoctorName(doctorName);
        await cmdClick(this.page, ellipsisLocator);
    }

    async clickMenuOptionViewSchedule(): Promise<void> {
        await assertVisible(this.page, SchedulePageLocators.menuOptionViewSchedule);
        await cmdClick(this.page, SchedulePageLocators.menuOptionViewSchedule);
    }

    async clickMenuOptionManageSchedule(): Promise<void> {
        await assertVisible(this.page, SchedulePageLocators.menuOptionManageSchedule);
        await cmdClick(this.page, SchedulePageLocators.menuOptionManageSchedule);
    }

    async clickMenuOptionManageLeaves(): Promise<void> {
        await assertVisible(this.page, SchedulePageLocators.menuOptionManageLeaves);
        await cmdClick(this.page, SchedulePageLocators.menuOptionManageLeaves);
    }

    async clickMenuOptionMarkInactive(): Promise<void> {
        await assertVisible(this.page, SchedulePageLocators.menuOptionMarkInactive);
        await cmdClick(this.page, SchedulePageLocators.menuOptionMarkInactive);
    }

    async clickMenuOptionCloneSchedule(): Promise<void> {
        await assertVisible(this.page, SchedulePageLocators.menuOptionCloneSchedule);
        await cmdClick(this.page, SchedulePageLocators.menuOptionCloneSchedule);
    }


}