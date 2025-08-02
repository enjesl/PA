import { Page } from '@playwright/test';
import { cmdClick, cmdFill, cmdIsVisible, cmdLogStorage, cmdPause } from '@commands';
import { MicrosoftLoginLocators } from '@locators';
import fs from 'fs';
import path from 'path';

export class MicrosoftLoginPage {
    constructor(private page: Page) { }

    async login(email: string, password: string) {
        await cmdFill(this.page, MicrosoftLoginLocators.emailInput, email);
        await this.page.waitForLoadState('networkidle');
        await cmdClick(this.page, MicrosoftLoginLocators.nextButton);
        await this.page.waitForLoadState('networkidle');
        await cmdPause(this.page, 'Waiting for password input to appear...', 2000);
        await cmdFill(this.page, MicrosoftLoginLocators.passwordInput, password);
        await cmdClick(this.page, MicrosoftLoginLocators.signInButton);
        await this.page.waitForLoadState('networkidle');
        // Handle "Stay signed in?" screen if it appears
        if (await cmdIsVisible(this.page, MicrosoftLoginLocators.staySignedInNo)) {
            await cmdClick(this.page, MicrosoftLoginLocators.staySignedInNo);
        }
        this.page.on('request', req => console.log(` ${req.method()} ${req.url()}`));
        this.page.on('response', res => console.log(` ${res.status()} ${res.url()}`));

        await this.page.waitForLoadState('networkidle');
        await saveSessionStorage(this.page, 'microsoft-auth.json');
        console.log(' Final URL after Microsoft login:', await this.page.url());

        await cmdLogStorage(this.page, 'localStorage');      // Logs localStorage
        await cmdLogStorage(this.page, 'sessionStorage');    // Logs sessionStorage

    }
}



export async function saveSessionStorage(page: Page, fileName = 'microsoft-auth.json') {
    const storageState = await page.context().storageState();
    const dirPath = path.join(__dirname, '../../auth');
    const filePath = path.join(dirPath, fileName);

    // Ensure directory exists
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(storageState, null, 2));
    console.log(`[Session] Saved Microsoft auth state to ${filePath}`);
}

