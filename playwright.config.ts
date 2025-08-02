import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const ENV = process.env.TEST_ENV || 'dev';
const BROWSER = process.env.BROWSER || 'chromium';
const configFile = require(`./config/${ENV}.config.ts`).default;

export default defineConfig({
    ...configFile,
    testDir: './tests',
    timeout: 120_000,
    workers: process.env.CI ? 2 : 4,
    globalSetup: './utils/globalSetup.ts', 
    projects: [
        {
            name: BROWSER,
            use: {
                ...configFile.use,
                browserName: BROWSER,
                channel: BROWSER === 'chromium' ? 'chrome' : undefined,
            },
        },
    ],
    reporter: [
        ['list'],
        ['html', { open: 'never' }],
        ['junit', { outputFile: 'results/test-results.xml' }],
        ['allure-playwright'],
    ],
});
