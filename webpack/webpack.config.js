const path = require('path');
const fs = require('fs');

module.exports = (_, argv) => {
    const { mode, proj: projectName } = argv;
    const isDev = mode !== 'production' && mode !== 'none';
    const config = isDev ? 'debug' : 'release';

    const log = (...args) => console.log(`[webpack-${config}]`, ...args);
    const logLine = (...args) => log(...args, '\n');

    // assume proj name is not passed properly
    if (typeof projectName !== 'string') {
        logLine('ERROR', 'project name is not defined properly!', 'got projectName =', projectName);
        process.exit(1);
    }

    const rootPath = path.join(__dirname, '..', 'src', projectName);

    log('STARTED...');
    log(`Project: '${projectName}', path: ${rootPath}`);

    if (!fs.existsSync(rootPath)) {
        logLine('ERROR', rootPath, 'does not exist');
        process.exit(1);
    }

    // NOTE: use 'debug.config.js' or 'release.config.js' and pass target project path

    // eslint-disable-next-line global-require, import/no-dynamic-require
    const targetConfig = require(`./${config}.config.js`);
    return targetConfig(rootPath);
};
