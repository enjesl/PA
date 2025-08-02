# 🎭 Playwright POM Framework

A scalable end-to-end testing framework built with [Playwright](https://playwright.dev/) using the Page Object Model (POM) pattern. Includes Allure and HTML reporting, environment-based configuration, and command wrappers for easy test maintenance.

---

## 📦 Features

- ✅ Page Object Model (POM) structure  
- ✅ Allure & native Playwright HTML reporting  
- ✅ Runtime environment & region configuration  
- ✅ Wrapper functions for common UI & assertion commands  
- ✅ Clean, modular, and scalable test structure

---

## 📁 Folder Structure

```
project-root/
│
├── tests/                       # Test suites
├── pages/                       # Page Object classes
├── locators/                    # Page element locators
├── utils/                       # Common utilities & helpers
├── playwright.config.ts         # Playwright config
├── .env                         # Default environment variables
├── allure-results/              # Auto-generated Allure raw results
├── allure-report/               # Generated multi-file Allure HTML
├── allure-single-report/        # Single-file HTML report (optional)
├── playwright-report/           # Native Playwright HTML report
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repo & install dependencies

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

---

### 2️⃣ Install Playwright browsers

```bash
npx playwright install
```

---

### 3️⃣ Run tests (default environment)

```bash
npm run test
```

This will:
- Clean old reports
- Run all tests
- Output results to `playwright-report/` and `allure-results/`

---

## ⚙️ CI/QA Mode Execution (with ENV + region support)

```bash
npm run run:ci
```

This will:
- Clean old reports
- Run tests with `ENV=qa regionCode=MYS`
- Generate:
  - Allure full HTML report
  - Allure single-file HTML report
  - Native Playwright HTML report

---

## 📊 Reporting

### ▶️ View native Playwright HTML report

```bash
npx playwright show-report
```

---

### 📁 Generate Allure reports

#### Full multi-file HTML report

```bash
npm run allure:generate
```

#### Single-file HTML report (for easy sharing)

```bash
npm run allure:single
```

#### Open Allure HTML report in browser

```bash
npm run allure:open
```

---

## 📜 Script Reference

| Command                 | Description                                         |
|-------------------------|-----------------------------------------------------|
| `npm run test`          | Clean + run tests using default setup               |
| `npm run test:ci`       | Run with `ENV=qa` and generate `allure-results`     |
| `npm run run:ci`        | Clean + test:ci + Allure full + single report       |
| `npm run clean:reports` | Deletes all old reports                             |
| `npm run allure:generate` | Generate Allure full HTML report                 |
| `npm run allure:single`   | Generate Allure single-file report               |
| `npm run allure:open`     | Open Allure report in browser                    |

---

## 🧪 Custom ENV & Region Setup

Pass custom environment variables like so:

```bash
npx cross-env ENV=staging regionCode=IDN npx playwright test
```

---

## 🛠️ Dependencies

- `@playwright/test`
- `allure-playwright`
- `cross-env`
- `dotenv`
- `allure-commandline` (for HTML report generation)

Install Allure CLI if not already:

```bash
npm install --save-dev allure-commandline
```

---

## 📂 Output Artifacts (after test run)

- `allure-results/` – raw JSON used to generate Allure reports  
- `allure-report/` – multi-file HTML report  
- `allure-single-report/` – single `.html` file (standalone)  
- `playwright-report/` – native HTML report with traces/screenshots

---

## 🙋 Need Help?

Open an issue or contact the maintainer for setup, debugging, or contributions.

---

## 📄 License

MIT © [Nayanajith Premasinghe / ColumbiaAsia]
