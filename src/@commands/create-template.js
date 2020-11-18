/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');

const log = (...args) => console.log('[create-template]', ...args);

// last passed parameter, assume = project name
const projectName = process.argv.slice(-1)[0];

if (typeof projectName !== 'string') {
    log('error', 'projectName is not defined properly', projectName);
    process.exit(1);
}

log('STARTED...');

const rootPath = path.join(__dirname, '..', projectName);

if (fs.existsSync(rootPath)) {
    log('error', rootPath, 'is already exists. Provide new project name');
    process.exit(1);
}

log(`Project: '${projectName}', path: ${rootPath}`);

const createFolder = folderPath => {
    fs.mkdir(folderPath, { recursive: true }, err => {
        if (err) {
            log(`ERROR while creating folder ${folderPath}`, err);
        }
    });
};

const createFile = (filePath, content = '// stub\n') => fs.writeFileSync(filePath, content, 'utf8');

createFolder(rootPath);
createFolder(path.join(rootPath, 'assets', 'images'));
createFolder(path.join(rootPath, 'assets', '_base64'));
// createFolder(path.join(rootPath, 'assets', 'audio'));
// createFolder(path.join(rootPath, 'assets', 'fonts'));
createFolder(path.join(rootPath, 'scripts'));
createFolder(path.join(rootPath, 'scripts', 'scenes'));
createFile(path.join(rootPath, 'scripts', 'scenes', 'MainScene.js'));
createFile(path.join(rootPath, 'scripts', 'scenes', 'IntroScene.js'));
createFile(path.join(rootPath, 'scripts', 'scenes', 'OutroScene.js'));
createFolder(path.join(rootPath, 'scripts', 'settings'));
createFolder(path.join(rootPath, 'scripts', 'utils'));


const indexHtml = `<!doctype html>
<html lang="en" dir="ltr">

<head>
  <meta charset="utf-8">
  <style type="text/css">
    html,
    body {
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
  </style>
</head>

<body>
  <div class="content"></div>
</body>

</html>
`;

const indexJs = `// entry point
import starter from './Starter';

document.addEventListener('DOMContentLoaded', () => {
    starter.init().then(() => {
        // eslint-disable-next-line no-unused-vars
        // const game = new Game();
    });
});
`;

fs.writeFileSync(path.join(rootPath, 'index.html'), indexHtml, 'utf8');
fs.writeFileSync(path.join(rootPath, 'scripts', 'index.js'), indexJs, 'utf8');
