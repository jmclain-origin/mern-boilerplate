/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
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
        // new HtmlWebpackPlugin({
        //   template: "client/public/index.html",
        // }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [{ from: 'client/public', to: '' }],
        }),
    ],
};
