import { writeAllureEnvironment } from '@utils';

async function globalSetup() {
    writeAllureEnvironment();
}

export default globalSetup;
