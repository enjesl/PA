import * as fs from 'fs';
import * as path from 'path';

/**
 * Load test data from a file based on module and section.
 * Example: getTestData('admin/content', 'createContent')
 */
export function getTestData(modulePath: string, section: string) {
    const filePath = path.resolve(__dirname, `../data/${modulePath}.json`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Test data file not found at path: ${filePath}`);
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    if (!data[section]) {
        throw new Error(`Section '${section}' not found in ${modulePath}.json`);
    }

    return data[section];
}
