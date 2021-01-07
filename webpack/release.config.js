/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');

module.exports = rootPath => ({
    mode: 'production',
    // devtool: 'source-map',

    entry: path.resolve(rootPath, 'main.ts'),

    output: {
        filename: 'main.js?hash=[contenthash]',
        path: path.resolve(rootPath, 'dist', 'release'),
    },

    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                exclude: /assets/,
            }),
        ],
    },

    module: {
        rules: [
            // {
            //     test: /\.css$/i,
            //     use: ['style-loader', 'css-loader'],
            // },
            {
                test: /\.js$/,
                exclude: /(node_modules|dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /(node_modules|dist|base64)/,
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'playables',
            template: path.resolve(rootPath, 'index.html'),
            // For build in one file (js and css to index.html)
            inlineSource: '(main.js|vendors.js|assets.js)',
        }),
        new HtmlWebpackInlineSourcePlugin(),
    ],

    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(rootPath, '..'),
            '@root': path.resolve(rootPath, '..'/* , '@common' */),
            '@engine': path.resolve(rootPath, '..', 'engine'),
            '@scripts': path.resolve(rootPath, 'scripts'),
            '@assets': path.resolve(rootPath, 'assets', '_base64'),
        },
    },
});
