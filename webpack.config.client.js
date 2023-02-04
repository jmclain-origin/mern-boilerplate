/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESlintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');
const isDev = process.env.NODE_ENV === 'development';

module.exports = (_env, operation) => {
    const currentPath = path.join(__dirname);
    const basePath = currentPath + '/.env';
    const envPath = basePath + '.' + operation.mode;

    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        if (/REACT_APP_/i.test(next)) {
            prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        }
        return prev;
    }, {});

    return {
        mode: isDev ? 'development' : 'production',
        entry: './client/src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist', 'public'),
            filename: '[name].bundle.js',
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    resolve: {
                        extensions: ['.ts', '.tsx', '.js', '.json'],
                    },
                    use: 'ts-loader',
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    include: path.resolve(__dirname, 'client', 'src'),
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: { postcssOptions: { indent: 'postcss', plugins: [tailwindcss, autoprefixer] } },
                        },
                    ],
                },
            ],
        },
        devtool: process.env.NODE_ENV === 'production' ? undefined : 'source-map',
        plugins: [
            new CleanWebpackPlugin({ dangerouslyAllowCleanPatternsOutsideProject: true }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.DefinePlugin(envKeys),
            new MiniCssExtractPlugin({ filename: 'styles/[name].bundle.css', chunkFilename: '[id].[contenthash].css' }),
            new CopyWebpackPlugin({
                patterns: [{ from: path.resolve(__dirname, 'client', 'src', 'assets'), to: 'assets' }],
            }),
            new HtmlWebpackPlugin({
                title: 'webpack and react',
                favicon: './client/public/favicon.ico',
                template: './client/public/index.html',
                filename: 'index.html',
            }),
            new ESlintPlugin({
                extensions: ['tsx', 'ts', 'jsx', 'js', 'json'],
            }),
        ],
    };
};
