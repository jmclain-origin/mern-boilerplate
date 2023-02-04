/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESlintPlugin = require('eslint-webpack-plugin');
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
            filename: 'bundle.js',
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
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
            ],
        },
        devtool: process.env.NODE_ENV === 'production' ? undefined : 'source-map',
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.DefinePlugin(envKeys),
            new MiniCssExtractPlugin(),
            new CopyWebpackPlugin({
                patterns: [{ from: 'public', context: path.resolve(__dirname, 'client') }],
            }),
            new ESlintPlugin({
                extensions: ['tsx', 'ts', 'jsx', 'js', 'json'],
            }),
        ],
    };
};
