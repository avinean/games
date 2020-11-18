
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const webpack = require('webpack');
const path = require('path');
const bodyParser = require('body-parser');

const host = 'localhost';
const port = 8080;

config.entry.unshift(`webpack-dev-server/client?http://${host}:${port}/`);
config.output.publicPath = `http://${host}:${port}`;

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, { hot: false, contentBase: path.resolve(__dirname) });

server.app.use(bodyParser.json());

server.app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.sendFile(`${__dirname}/dev_html.html`);
});

server.listen(port);

// Assets builders
const fs = require('fs');
const watch = require('node-watch');

const fontsPath = './src/fonts';
const audioPath = './src/audio';
const imagesPath = './src/images';

const fontsStart = `
@font-face {
  font-family:`;

const buildFonts = () => {
    fs.readdir(fontsPath, (err, files) => {
        const base64fonts = [];

        const fonts = files.filter(file => file.split('.')[1] === 'woff');

        fonts.forEach(file => {
            const buff = fs.readFileSync(`${fontsPath}/${file}`);
            const base64Data = buff.toString('base64');

            base64fonts.push([file.split('.')[0], base64Data]);
        });

        fs.writeFileSync(
            './dist/fonts.css',
            base64fonts.map(data => `${fontsStart} '${data[0]}';\n src: url(data:application/x-font-woff;charset=utf-8;base64,${data[1]}) format('woff')}`).join(''),
            'utf8',
        );

        fs.writeFileSync(`${fontsPath}/custom_fonts_names.js`, `export const CUSTOM_FONTS_NAMES = [${base64fonts.map(data => `'${data[0]}'`).join(',')}];`, 'utf8');

        console.log('Fonts builded');
    });
};

const buildAudio = () => {
    fs.readdir(audioPath, (err, files) => {
        const base64audio = [];

        files.forEach(file => {
            const buff = fs.readFileSync(`${audioPath}/${file}`);
            const base64Data = buff.toString('base64');

            base64audio.push([file.split('.')[0], base64Data]);
        });

        fs.writeFileSync(
            './src/base64/audio.js',
            `export const AUDIO = {\n${base64audio.map(data => `    '${data[0]}': '${data[1]}',\n`).join('')}};`,
            'utf8',
        );

        console.log('Audio builded');
    });
};

const buildImages = (imagesArray = [], path = imagesPath) => {
    const files = fs.readdirSync(path);

    files.forEach(fileName => {
        const filePath = `${path}/${fileName}`;

        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            buildImages(imagesArray, filePath);
            return;
        }

        const buff = fs.readFileSync(filePath);
        const base64Data = buff.toString('base64');

        const imageName = fileName.split('.')[0];
        const imageType = fileName.split('.')[1];

        imagesArray.push([imageName, `data:image/${imageType};base64,${base64Data}`]);
    });

    if (path === imagesPath) {
        fs.writeFileSync(
            './src/base64/images.js',
            `export const IMAGES = {\n${imagesArray.map(data => `    '${data[0]}': '${data[1]}',\n`).join('')}};`,
            'utf8',
        );

        console.log('Images builded');
    }
};

watch(fontsPath, { recursive: true }, (evt, name) => {
    if (name.indexOf('custom_fonts_names.js') === -1) {
        buildFonts();
    }
});

watch(audioPath, { recursive: true }, (evt, name) => {
    buildAudio();
});

watch(imagesPath, { recursive: true }, (evt, name) => {
    buildImages();
});

buildFonts();
buildAudio();
buildImages();
