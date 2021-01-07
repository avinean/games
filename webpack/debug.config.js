/* eslint-disable import/no-extraneous-dependencies */

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = rootPath => ({
    mode: 'development',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    // devServer: {
    //     contentBase: './dist',
    // },
    devtool: 'inline-source-map',

    entry: path.resolve(rootPath, 'main.ts'),

    output: {
        filename: 'main.js?hash=[contenthash]',
        path: path.resolve(rootPath, 'dist'),
        chunkFilename: '[name].js?hash=[contenthash]',
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    // filename: '[name].js',
                    chunks: 'all',
                    enforce: true,
                },
                assets: {
                    test: /[\\/]assets[\\/]_base64[\\/]/,
                    name: 'assets',
                    // filename: '[name].js',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },

            // allow to use .less files
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },

            // allow refer to images from components or styles (always inline base64)
            {
                test: /\.(jpg|png|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                    },
                },
            },

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
        // new ExtractTextPlugin("fonts.css"),
        new HtmlWebpackPlugin({
            title: 'playables',
            template: path.resolve(rootPath, 'index.html'),
        }),
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
