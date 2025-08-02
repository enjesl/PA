import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Returns env value with optional fallback.
 */
export const getEnv = (k: string, d?: string) => process.env[k] || d || '';
