import { Page } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(path: string) {
        await this.page.goto(path);
    }

    async reload() {
        await this.page.reload();
    }

    async waitForSeconds(seconds: number) {
        await this.page.waitForTimeout(seconds * 1000);
    }
}
