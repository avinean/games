/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const log = (...args) => console.log('[build-resources]', ...args);

// last passed parameter, assume = project name
const projectName = process.argv.slice(-1)[0];

if (typeof projectName !== 'string') {
    log('error', 'projectName is not defined properly', projectName);
    process.exit(1);
}

log('STARTED...');

const rootPath = path.join(__dirname, '..', projectName);
const assetsPath = path.join(rootPath, 'assets');
const sourceDir = path.join(assetsPath, 'images');
const destDir = path.join(assetsPath, '_base64');

log(`Project: '${projectName}', path: ${rootPath}`);

if (!fs.existsSync(sourceDir)) {
    log('error', sourceDir, 'does not exist');
    process.exit(1);
}

glob(`${sourceDir}/**/*.*`, (error, files) => {
    if (error) {
        log('reading files error', error);
        process.exit(1);
    }

    log('files found', files.length);

    const res = files.map((filePath, index) => {
        const extension = path.extname(filePath);
        const fileName = path.basename(filePath, extension);
        const type = extension.replace('.', '');

        const buff = fs.readFileSync(filePath);
        const base64Data = buff.toString('base64');

        log(`process file [${index + 1}] "${path.relative(sourceDir, filePath)}"`);

        return `'${fileName}': 'data:image/${type};base64,${base64Data}'`;
    });

    const base64Content = `export const IMAGES = {\n${res.join(',\n')}\n};`;
    const targetFile = path.join(destDir, 'images.js');

    fs.mkdir(destDir, { recursive: true }, err => {
        if (err) {
            log(`ERROR while creating folder ${destDir}`, err);
        }
    });


    fs.writeFileSync(targetFile, base64Content, 'utf8');

    log('files processed', files.length);
    log('result file', path.relative(rootPath, targetFile));

    log('DONE!');
});


// base64 format
// data:[<MIME-type>][;charset=<encoding>][;base64],<data>

// e.g.
// data:image/png;base64,xxxxxxxxxxxxx
// data:font/truetype;charset=utf-8;base64,xxxxxxxxxxxxxx
// data:application/x-font-woff;charset=utf-8;base64,xxxxxxxxxxx
// data:audio/ogg;base64,xxxxxxxxxxx
// data:image/svg+xml,xxxxxxxxxx
