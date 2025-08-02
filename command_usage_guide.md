# 📘 Command Usage Guide

A comprehensive guide to using all custom commands and assertion helpers in the Playwright POM Framework.

---

## ✅ Click Element
```ts
await cmdClick(this.page, '#submit-button');
```

## ✍️ Fill Input Field
```ts
await cmdFill(this.page, '#email', 'user@example.com');
```

## ⌨️ Press a Key
```ts
await cmdPress(this.page, '#input-box', 'Enter');
```

## ☑️ Check a Checkbox
```ts
await cmdCheck(this.page, '#accept-terms');
```

## ☐ Uncheck a Checkbox
```ts
await cmdUncheck(this.page, '#accept-terms');
```

## 📂 Select Option from Dropdown
```ts
await cmdSelectOption(this.page, '#country-select', 'LK');
await cmdSelectOption(this.page, '#multi-select', ['A', 'B']);
```

## 🖱 Hover Over Element
```ts
await cmdHover(this.page, '#profile-icon');
```

## 🔽 Scroll Into View
```ts
await cmdScrollIntoView(this.page, '#footer');
```

## 📃 Get Text Content
```ts
const text = await cmdGetText(this.page, '#message');
```

## 🧪 Get Input Value
```ts
const value = await cmdGetValue(this.page, '#username');
```

## 👀 Wait for Element to be Visible
```ts
await cmdWaitForVisible(this.page, '#modal');
```

## 🙈 Wait for Element to be Hidden
```ts
await cmdWaitForHidden(this.page, '#loading-spinner');
```

## ✅ Check if Element is Visible
```ts
const isVisible = await cmdIsVisible(this.page, '#banner');
```

## 🔘 Check if Checkbox is Checked
```ts
const isChecked = await cmdIsChecked(this.page, '#terms');
```

## 📤 Upload File
```ts
await cmdUploadFile(this.page, '#upload', 'path/to/file.pdf');
```

## 🥇 Click First Match
```ts
await cmdClickFirst(this.page, '.item');
```

## 🔄 Set Orientation (Mobile Testing)
```ts
await cmdSetOrientation(this.page, 'portrait');
await cmdSetOrientation(this.page, 'landscape');
```

## 📸 Capture Screenshot
```ts
await cmdCaptureScreenshot(this.page, 'Homepage Screenshot');
```

## 📐 Set Viewport Size
```ts
await cmdSetViewportSize(this.page, 1440, 900);
```

## ♻️ Reset to Default Viewport
```ts
await cmdResetToDefaultViewport(this.page);
```

## 🌐 Capture & Check Network Errors
```ts
await cmdCaptureAndCheckNetworkErrors(this.page);
```

## 📦 Log Local/Session Storage
```ts
await cmdLogStorage(this.page, 'localStorage');
await cmdLogStorage(this.page, 'sessionStorage');
```

## 🧱 Is Element Disabled
```ts
const isDisabled = await cmdIsDisabled(this.page, '#submit');
```

## 🎹 Keyboard Typing (character by character)
```ts
await cmdKeyboardType(this.page, 'Hello World');
```

## ↩️ Keyboard Press (e.g., Enter, Tab)
```ts
await cmdKeyboardPress(this.page, 'Enter');
```

## ⌨️ Keyboard Shortcut (e.g., Ctrl+A)
```ts
await cmdKeyboardShortcut(this.page, ['Control', 'A']);
```

## ⏸ Pause Execution
```ts
await cmdPause(this.page, 'Waiting for backend sync', 5000);
```

## 📝 Write to Report
```ts
await writeToReport('Validation Step', 'Checked cart item count');
```

---

## 🎯 Select Mat Option (Custom Dropdown)
```ts
await cmdSelectMatOption(this.page, '#mat-select-status', 'mat-option span', 'Active'); // specific
await cmdSelectMatOption(this.page, '#mat-select-status', 'mat-option span', undefined, true); // random
await cmdSelectMatOption(this.page, '#mat-select-status', 'mat-option span', undefined, true, ['None']); // random excluding 'None'
```

## 🧾 Get All Mat Option Values
```ts
const options = await getAllMatOptionValues(this.page, '#mat-select-status', 'mat-option span');
```

## 🎯 Select Multiple Mat Options (Multi-Select)
```ts
await cmdSelectMatMultiOptions(this.page, '#mat-select-status', 'mat-option span', ['Value 1', 'Value 2']);
await cmdSelectMatMultiOptions(this.page, '#mat-select-status', 'mat-option span', [], true, 2); // random 2 options
await cmdSelectMatMultiOptions(this.page, '#mat-select-status', 'mat-option span', [], true, 2, ['None']); // random 2 options excluding 'None'
```

---

## 🛠 Utility: Random Data Generator (generateAndStore.ts)

```ts
import {
  generateAutoMixed,
  generateAutoLetterSpecial,
  generateOnlySpecial,
  generateOnlyNumbers
} from '@/utils/generateAndStore';
```

### 🔡 Mixed Characters with Prefix
```ts
const value = await generateAutoMixed('username', 10); // "AutoA1b2C3!@"
```

### 🔤 Letters + Special Characters with Prefix
```ts
const value = await generateAutoLetterSpecial('name', 8); // "AutoAb#_C$"
```

### 🔣 Only Special Characters
```ts
const value = await generateOnlySpecial('symbolKey', 5); // "!@#_~"
```

### 🔢 Only Numbers
```ts
const value = await generateOnlyNumbers('numberKey', 6); // "948301"
```

🔐 All values are automatically saved into `data/admin/generate.json` with their key for future reuse.

---

## 🧪 Assertion Helpers

### ✔️ Assert Visible
```ts
await assertVisible(this.page, '#element');
```

### ❌ Assert Hidden
```ts
await assertHidden(this.page, '#element');
```

### 🆎 Assert Text Equals
```ts
await assertTextEquals(this.page, '#title', 'Dashboard');
```

### 🔍 Assert Text Contains
```ts
await assertTextContains(this.page, '#summary', 'completed');
```

### 🅰️ Assert Value Equals
```ts
await assertValueEquals(this.page, '#username', 'admin');
```

### 🧾 Assert Value Contains
```ts
await assertValueContains(this.page, '#description', 'error');
```

### ☑️ Assert Checked
```ts
await assertChecked(this.page, '#remember');
```

### 🟢 Assert Enabled
```ts
await assertEnabled(this.page, '#submit');
```

### 🔒 Assert Disabled
```ts
await assertDisabled(this.page, '#locked');
```

### 🌐 Assert URL Contains
```ts
await assertUrlContains(this.page, '/dashboard');
```

### 📄 Assert Title Equals
```ts
await assertTitleEquals(this.page, 'Welcome Page');
```

### 🧮 Assert Text Equals Directly
```ts
await assertTextEqualsDirectly(this.page, actualText, 'Expected Text');
```

---

Use this guide to speed up development and ensure consistency when writing automation scripts.

