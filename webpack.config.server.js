/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    entry: './server/src/index.ts',
    mode: process.env.NODE_ENV,
    target: 'node',
    devServer: {
        watchFiles: ['dist/**/*.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
            },
        ],
    },
    externals: [nodeExternals()],
    plugins: [
        new NodemonPlugin({
            script: path.resolve(__dirname, 'dist', 'server.js'),
            watch: path.resolve(__dirname, 'dist'),
            verbose: true,
        }),
    ],
};
