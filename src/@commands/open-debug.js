const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const log = (...args) => console.log('[open-debug]', ...args);

// last passed parameter, assume = project name
const projectName = process.argv.slice(-1)[0];

if (typeof projectName !== 'string') {
    log('error', 'projectName is not defined properly', projectName);
    process.exit(1);
}

const rootPath = path.join(__dirname, '..', projectName);

log(`Project: '${projectName}', path: ${rootPath}`);

const targetFile = path.join(rootPath, 'dist', 'index.html');

if (!fs.existsSync(targetFile)) {
    log('error', targetFile, 'does not exist');
    process.exit(1);
}

const getOpenCommand = () => {
    const { platform } = process;

    // masOS
    if (platform === 'darwin') {
        return 'open';
    }

    // windows
    if (platform === 'win32') {
        return 'start';
    }

    // unix
    return 'xdg-open';
};

const openFileCommand = getOpenCommand();

exec(`${openFileCommand} ${targetFile}`);
