import * as users from '../data/users.json';
import { getEnv } from './env';

/**
 * Dynamically fetches user credentials from .env or users.json
 */
export function getUserCredentials(
    authType: string,
    userRole: string
): { userName: string; password: string } {
    const userBlock = (users as any)[authType];
    if (!userBlock || !userBlock[userRole]) {
        throw new Error(`User not found for type='${authType}' and role='${userRole}'.`);
    }

    const envPrefix = `${authType.toUpperCase()}_${userRole.toUpperCase()}`;
    const userName = getEnv(`${envPrefix}_USERNAME`, userBlock[userRole].userName);
    const password = getEnv(`${envPrefix}_PASS`, userBlock[userRole].password);

    return { userName, password };
}
