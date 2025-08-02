import { test } from '@playwright/test';

export function runTestMultipleTimes(
    iterations: number,
    testName: string,
    callback: (iteration: number) => Promise<void>
) {
    for (let i = 1; i <= iterations; i++) {
        test(`${testName} - Iteration ${i}`, async () => {
            await callback(i);
        });
    }
}
