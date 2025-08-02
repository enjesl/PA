import { spawn } from 'child_process';

/**
 * Runs a shell command and streams the output.
 */
function runCommandWithStreaming(command: string, args: string[]): Promise<void> {
    return new Promise((resolve, reject) => {
        const process = spawn(command, args, { stdio: 'inherit', shell: true });

        process.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Command "${command} ${args.join(' ')}" exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

(async () => {
    try {
        console.log(' Generating multi-file Allure report...');
        await runCommandWithStreaming('npx', ['allure', 'generate', './allure-results', '--clean', '-o', './allure-report']);
        console.log(' Allure report generated at ./allure-report\n');

        console.log(' Generating single-file Allure report...');
        await runCommandWithStreaming('npx', ['allure', 'generate', '--single-file', './allure-results', '--clean', '-o', './allure-single-report']);
        console.log(' Single-file Allure report generated at ./allure-single-report/index.html\n');
    } catch (error) {
        console.error(` Failed to generate Allure reports: ${(error as Error).message}`);
        process.exit(1);
    }
})();
