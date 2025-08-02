// SchedulePageLocators.ts
// Reusable methods and locators for both Schedule listing and Create Schedule screen


export const SchedulePageLocators = {
    // ─── Filter Panel ─────────────────────────────────────────
    sectionFilterPanel: "//div[contains(@class, 'schedule-search-container')]",
    labelExpandAll: "//div[contains(@class,'collapse-label') and normalize-space()='Expand All']",

    // ─── Filter Section Headers ───────────────────────────────
    labelScheduleDetails: "//mat-panel-title[normalize-space()='Schedule Details']",
    labelParticipants: "//mat-panel-title[normalize-space()='Participants']",
    labelDate: "//mat-panel-title[normalize-space()='Date']",
    labelStatus: "//mat-panel-title[normalize-space()='Status']",

    labelSearchFilterSectionHeadeDynamic: (filrerSectionHeader: string) => `//mat-panel-title[normalize-space()='${filrerSectionHeader}']`,
    buttonSearch: "id=admin_location_home_search-btn",
    // ─── Filter and Create Schedule - Doctor & Service Selection ────────
    // ─── Schedule Details Dropdowns ───────────────────────────
    selectHospitalDropdown: "//mat-label[normalize-space()='Select Hospital' or normalize-space()='Hospital']/ancestor::mat-form-field",
    selectHospitalDropdownTrigger: "//mat-label[normalize-space()='Select Hospital' or normalize-space()='Hospital']/ancestor::mat-form-field//mat-icon[.='arrow_drop_down']",

    // ─── Participants Dropdowns ───────────────────────────────
    selectHealthcareServiceDropdown: "//mat-label[normalize-space()='Select Healthcare Service' or normalize-space()='Healthcare Service' ]/ancestor::mat-form-field",
    selectHealthcareServiceDropdownTrigger: "//mat-label[normalize-space()='Select Healthcare Service' or normalize-space()='Healthcare Service']/ancestor::mat-form-field//mat-icon[.='arrow_drop_down']",

    selectDoctorsDropdown: "//mat-label[normalize-space()='Select Doctors' or normalize-space()='Select Doctor/Practitioner' normalize-space()='Doctors' or normalize-space()='Doctor/Practitioner']/ancestor::mat-form-field",
    selectDoctorsDropdownTrigger: "//mat-label[normalize-space()='Select Doctors' or normalize-space()='Select Doctor/Practitioner' or normalize-space()='Doctors' or normalize-space()='Doctor/Practitioner']/ancestor::mat-form-field//mat-icon[.='arrow_drop_down']",


    selectLocationDropdown: "//mat-label[normalize-space()='Select Location' or normalize-space()='Location']/ancestor::mat-form-field",
    selectLocationDropdownTrigger: "//mat-label[normalize-space()='Select Location' or normalize-space()='Location']/ancestor::mat-form-field//mat-icon[.='arrow_drop_down']",
    // ─── End Create Schedule - Doctor & Service Selection ────────
    // ─── Date Filter Radio Buttons ────────────────────────────
    radioDateAll: "//label[normalize-space()='All']",
    radioDateToday: "//label[normalize-space()='Today']",
    radioDateYesterday: "//label[normalize-space()='Yesterday']",
    radioDateThisWeek: "//label[normalize-space()='This week']",
    radioDateLastWeek: "//label[normalize-space()='Last week']",
    radioDateThisMonth: "//label[normalize-space()='This Month']",
    radioDateLastMonth: "//label[normalize-space()='Last Month']",
    radioDateRange: "//label[normalize-space()='Date Range']",

    // Date Filter Radio Button - Dynamic
    radioDateFilterByLabel: (label: string) => `//label[normalize-space()='${label}']`,


    // ─── Status Field ─────────────────────────────────────────
    selectStatusDropdown: "//mat-label[normalize-space()='Select Status' or normalize-space()='Status']/ancestor::mat-form-field",
    selectStatusDropdownTrigger: "//mat-label[normalize-space()='Select Status' or normalize-space()='Status']/ancestor::mat-form-field//mat-icon[.='arrow_drop_down']",
    textFieldStatusInput: "//mat-label[normalize-space()='Select Status']/ancestor::mat-form-field//input",

    // ─── Table Row Actions ────────────────────────────────────
    getStatusButtonByRowId: (rowId: number) => `//mat-row[@id='admin_location_home_Row_${rowId - 1}']//mat-cell[contains(@class,'cdk-column-Status')]//button[contains(@class,'status-btn')]`,
    getEllipsisButtonByRowId: (rowId: number) => `//mat-row[@id='admin_location_home_Row_${rowId - 1}']//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Edit']`,
    getEllipsisButtonByDoctorName: (doctorName: string) =>
        `(//mat-row[.//mat-cell[contains(@class,'cdk-column-Doctor')]//div[contains(@class,'doctor') and normalize-space(text())='${doctorName}']]//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Edit'])[1]`,

    // ─── Ellipsis Menu Options ────────────────────────────────
    menuOptionViewSchedule: "//mat-list-item//span[normalize-space()='View Schedule']",
    menuOptionManageSchedule: "//mat-list-item//span/span[normalize-space()='Manage Schedule']",
    menuOptionManageLeaves: "//mat-list-item//span/span[normalize-space()='Manage Leaves']",
    menuOptionMarkInactive: "//mat-list-item//span/span[normalize-space()='Mark Inactive']",
    menuOptionCloneSchedule: "//mat-list-item//span/span[normalize-space()='Clone Schedule']",

    // ─── Create Schedule Button ──────────────────────────────
    buttonCreateSchedule: "//app-reusable-primary-button[@id='admin_location_home_create-btn']//button",

    // ─── Tab Navigation ──────────────────────────────────────
    tableRowCount: "//mat-table//mat-row[contains(@id, '_Row_')]",
    tabSchedule: "//div[@role='tab' and normalize-space()='Schedule']",
    tabLeaves: "//div[@role='tab' and normalize-space()='Leaves(Time Off)']",
    tabExceptions: "//div[@role='tab' and normalize-space()='Exceptions']",

    // ─── Create Schedule - Specialty, Timezone, Slot Duration ──────────────
    selectSpecialtyDropdownTrigger: "//mat-label[normalize-space()='Specialty']/ancestor::mat-form-field//mat-icon[.='arrow_drop_down']",
    selectTimezoneDropdownTrigger: "//mat-label[normalize-space()='Select Timezone' or normalize-space()='Timezone']/ancestor::mat-form-field//mat-icon[.='arrow_drop_down']",
    selectSlotDurationDropdownTrigger: "//mat-label[normalize-space()='Select Slot Duration' or normalize-space()='Slot Duration']/ancestor::mat-form-field//mat-icon[.='arrow_drop_down']",


    // ─── Create Schedule - Slot Type, Bookable For, Requestable For ────────
    selectSlotTypeDropdownTrigger: "//mat-label[normalize-space()='Slot Type']/ancestor::mat-form-field//div[contains(@class,'mat-mdc-select-arrow-wrapper')]",
    selectBookableForDropdownTrigger: "//mat-label[normalize-space()='Bookable for']/ancestor::mat-form-field//div[contains(@class,'mat-mdc-select-arrow-wrapper')]",
    selectRequestableForDropdownTrigger: "//mat-label[normalize-space()='Requestable for']/ancestor::mat-form-field//div[contains(@class,'mat-mdc-select-arrow-wrapper')]",

    // ─── Create Schedule - Date Range and Availability Day ────────────────
    selectAvailabilityDayDropdownTrigger: "//mat-form-field[.//mat-label[normalize-space()='Select Availability Day']]//mat-icon[normalize-space()='arrow_drop_down']",

    // ─── Create Schedule - Calendar Date Pickers ────────────────
    calendarScheduleStartsButton: "//mat-label[normalize-space()='Schedule Starts']/ancestor::mat-form-field//button",
    calendarScheduleEndsButton: "//mat-label[normalize-space()='Schedule Ends']/ancestor::mat-form-field//button",
    calendarScheduleStartsInput: "//mat-label[normalize-space()='Schedule Starts']/ancestor::mat-form-field//input",
    calendarScheduleEndsInput: "//mat-label[normalize-space()='Schedule Ends']/ancestor::mat-form-field//input",

    // Header button to switch views (from day → month/year → year grid)
    calendarHeaderButton: "//button[contains(@class, 'mat-calendar-period-button')]",

    // Navigation arrows (optional)
    calendarNextButton: "//button[contains(@class, 'mat-calendar-next-button')]",
    calendarPrevButton: "//button[contains(@class, 'mat-calendar-previous-button')]",

    // Dynamic locators as functions
    yearCell: (year: number) =>
        `//td//button[contains(@aria-label,'${year}')]`,

    monthCell: (monthAbbr: string) =>
        `//td//button[.//span[normalize-space()='${monthAbbr.toUpperCase()}']]`,

    dayCell: (day: number) =>
        `//td[not(contains(@class, 'outside'))]//button[normalize-space()='${day}' and not(@disabled)]`,


    // ─── Create Schedule - Occurrence and Time Slot ───────────────
    clearOccurrenceChipContainer: "//mat-label[normalize-space()='Occurrence']/ancestor::app-reusable-chipbox-dropdown",

    selectOccurrenceDropdown: "//mat-label[normalize-space()='Select Occurrence']/ancestor::mat-form-field",
    selectOccurrenceDropdownTrigger: "//mat-label[normalize-space()='Select Occurrence']/ancestor::mat-form-field//div[contains(@class,'mat-mdc-select-arrow-wrapper')]",

    inputStartTime: "//input[@formcontrolname='startTime']",
    toggleStartTimePeriod: "//mat-slide-toggle[@formcontrolname='startPeriod']//button[@role='switch']",
    labelToggleStartTimePeriod: "//mat-slide-toggle[@formcontrolname='startPeriod']/parent::div//span[contains(@class, 'active')]",

    inputEndTime: "//input[@formcontrolname='endTime']",
    toggleEndTimePeriod: "//mat-slide-toggle[@formcontrolname='endPeriod']//button[@role='switch']",
    labelToggleActiveEndTimePeriod: "//mat-slide-toggle[@formcontrolname='endPeriod']/parent::div//span[contains(@class, 'active')]",

    // ─── Create Schedule - Break Configuration ───────────────────
    inputBreakTitle: "//mat-label[normalize-space()='Enter Break Title']/ancestor::mat-form-field//input",

    inputBreakStartTime: "//input[@formcontrolname='breakStarttime']",
    toggleBreakStartTimePeriod: "//mat-slide-toggle[@formcontrolname='breakStartPeriod']//button[@role='switch']",
    labelToggleBreakStartTimePeriod: "//mat-slide-toggle[@formcontrolname='breakStartPeriod']/parent::div//span[contains(@class, 'active')]",

    inputBreakEndTime: "//input[@formcontrolname='breakEndtime']",
    toggleBreakEndTimePeriod: "//mat-slide-toggle[@formcontrolname='breakEndPeriod']//button[@role='switch']",
    labelToggleBreakEndTimePeriod: "//mat-slide-toggle[@formcontrolname='breakEndPeriod']/parent::div//span[contains(@class, 'active')]",

    // ─── Create Schedule - Add Break / Day Buttons ───────────────
    buttonAddBreakTime: "//button[normalize-space()='+ Add Break Time']",
    buttonAddDay: "//button[normalize-space()='+ Add Day']",

    // ─── Schedule Table - Row Wise Validation ─────────────────────
    scheduleTableRows: "//mat-row[contains(@id,'_Row_')]",
    getDayByRowIndex: (rowIndex: number, day: string) =>
        `(//mat-row[contains(@id,'_Row_')])[${rowIndex}]//mat-cell[contains(@class,'cdk-column-Day-s-')]//span[normalize-space()='${day}']`,

    getOccurrenceByRowIndex: (rowIndex: number, occurrence: string) =>
        `(//mat-row[contains(@id,'_Row_')])[${rowIndex}]//mat-cell[contains(@class,'cdk-column-Occurrence')]//span[contains(normalize-space(), '${occurrence}')]`,

    getStartTimeByRowIndex: (rowIndex: number, time: string) =>
        `(//mat-row[contains(@id,'_Row_')])[${rowIndex}]//mat-cell[contains(@class,'cdk-column-Start-Time')]//span[normalize-space()='${time}']`,

    getEndTimeByRowIndex: (rowIndex: number, time: string) =>
        `(//mat-row[contains(@id,'_Row_')])[${rowIndex}]//mat-cell[contains(@class,'cdk-column-End-Time')]//span[normalize-space()='${time}']`,

    getBreakTitleByRowIndex: (rowIndex: number, title: string) =>
        `(//mat-row[contains(@id,'_Row_')])[${rowIndex}]//mat-cell[contains(@class,'cdk-column-Break-Title')]//span/span[normalize-space()='${title}']`,

    getBreakStartTimeByRowIndex: (rowIndex: number, time: string) =>
        `(//mat-row[contains(@id,'_Row_')])[${rowIndex}]//mat-cell[contains(@class,'cdk-column-Break-Start-Time')]//span/span[normalize-space()='${time}']`,

    getBreakEndTimeByRowIndex: (rowIndex: number, time: string) =>
        `(//mat-row[contains(@id,'_Row_')])[${rowIndex}]//mat-cell[contains(@class,'cdk-column-Break-End-Time')]//span/span[normalize-space()='${time}']`,

    getDeleteButtonByRowIndex: (rowIndex: number) =>
        `(//mat-row[contains(@id,'_Row_')])[${rowIndex}]//mat-cell[contains(@class,'cdk-column-Action')]//button[@aria-label='Delete']`,

    // ─── Create Schedule - Reason / Instructions Textarea ────────
    textareaReasonOrInstructions: "//textarea[@formcontrolname='reason' and @placeholder='Enter Instructions']",

    // ─── Create Schedule - Action Buttons ────────────────────────
    buttonClearAll: "//button[normalize-space()='Clear All']",
    buttonCreateScheduleSubmit: "//button[normalize-space()='Create']",



};
