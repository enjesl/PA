import fs from 'fs';
import path from 'path';
import { addDays, format } from 'date-fns';

const basePath = path.join(__dirname, '..', 'data', 'admin', 'generate.json');

// Ensure the directory exists
fs.mkdirSync(path.dirname(basePath), { recursive: true });

/**
 * Saves a key-value pair into the JSON file.
 */
function saveToJson(key: string, value: string): void {
    let data: Record<string, string> = {};
    if (fs.existsSync(basePath)) {
        try {
            data = JSON.parse(fs.readFileSync(basePath, 'utf-8'));
        } catch {
            data = {};
        }
    }
    data[key] = value;
    fs.writeFileSync(basePath, JSON.stringify(data, null, 2));
    console.log(`[GEN] ${key}: ${value}`);
}

/**
 * Generates a random string from the given character pool.
 */
function generateRandom(length: number, charPool: string): string {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += charPool.charAt(Math.floor(Math.random() * charPool.length));
    }
    return result;
}

//  1. Letters + Numbers + Special Characters (with Auto prefix)
export async function generateAutoMixed(key: string, length: number): Promise<string> {
    const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=~';
    const value = 'Auto' + generateRandom(length, pool);
    saveToJson(key, value);
    return value;
}

//  2. Letters + Special Characters (with Auto prefix)
export async function generateAutoLetterSpecial(key: string, length: number): Promise<string> {
    const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*_-+=~';
    const value = 'Auto' + generateRandom(length, pool);
    saveToJson(key, value);
    return value;
}

//  3. Only Special Characters (no prefix)
export async function generateOnlySpecial(key: string, length: number): Promise<string> {
    const pool = '!@#$%^&*_-+=~';
    const value = generateRandom(length, pool);
    saveToJson(key, value);
    return value;
}

//  4. Only Numbers (no prefix)
export async function generateOnlyNumbers(key: string, length: number): Promise<string> {
    const pool = '0123456789';
    const value = generateRandom(length, pool);
    saveToJson(key, value);
    return value;
}

//  5. Only Numbers (no prefix)
export async function generateOnlyLetters(key: string, length: number): Promise<string> {
    const pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const value = generateRandom(length, pool);
    saveToJson(key, value);
    return value;
}

/**
 * Generates a date string in 'DD/MM/YYYY' format.
 * @param offsetDays - Number of days from today (0 = today, 1 = tomorrow, etc.)
 * @returns formatted date string (e.g., '21/07/2025')
 */
export function generateFutureDate(offsetDays: number = 0): string {
    const date = addDays(new Date(), offsetDays);
    return format(date, 'dd/MM/yyyy');
}

/**
 * Returns a date string in 'YYYY-MM-DD' format for given relative keyword or offset.
 * 
 * @param type - 'today' | 'tomorrow' | 'future'
 * @param daysAhead - Number of days ahead (for 'future' type)
 */
export function getDateString(
    type: 'today' | 'tomorrow' | 'future' = 'today',
    daysAhead: number = 0
): string {
    let date = new Date();

    switch (type) {
        case 'tomorrow':
            date.setDate(date.getDate() + 1);
            break;
        case 'future':
            date.setDate(date.getDate() + daysAhead);
            break;
        // 'today' case does nothing
    }

    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // months are 0-indexed
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
}
