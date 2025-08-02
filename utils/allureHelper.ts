import { allure } from 'allure-playwright';
import * as fs from 'fs';
import * as path from 'path';

// Declare ENV first
const ENV = process.env.TEST_ENV || 'dev';
const configFile = require(`../config/${ENV}.config.ts`).default;

/**
 * Attach a JSON object to the Allure report.
 */
export function attachJson(title: string, data: any): void {
    const formatted = JSON.stringify(data, null, 2);
    allure.attachment(title, formatted, 'application/json');
}

/**
 * Write environment variables to Allure environment.properties file.
 * This enables the "Environment" tab in Allure HTML report.
 */
export function writeAllureEnvironment(): void {
    const allureResultsDir = 'allure-results';
    if (!fs.existsSync(allureResultsDir)) {
        fs.mkdirSync(allureResultsDir);
    }

    const envVars: Record<string, string> = {
        'Test Environment': ENV,
        'Base URL': configFile.use?.baseURL || 'https://example.com',
        'Browser': process.env.BROWSER || 'chromium',
        'Headless': process.env.IS_HEADLESS || 'true',
        'Execution Date': new Date().toISOString(),
    };

    const content = Object.entries(envVars)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    fs.writeFileSync(path.join(allureResultsDir, 'environment.properties'), content);
    console.log('[Allure] Environment details written to environment.properties');
}

// Allow direct CLI execution like: `npx ts-node utils/allureHelper.ts`
if (require.main === module) {
    writeAllureEnvironment();
}
