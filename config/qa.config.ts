import { PlaywrightTestConfig } from '@playwright/test';

const isHeadless = process.env.IS_HEADLESS === 'true';

const config: PlaywrightTestConfig = {
    use: {
        baseURL: 'https://exampleqa.com',
        headless: isHeadless,
        viewport: { width: 1280, height: 720 },
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        actionTimeout: 0,
        navigationTimeout: 60000,
        launchOptions: {
            slowMo: 100,
        },
    },
};

export default config;
