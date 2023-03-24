import fs from 'fs';
import webpack, { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ESlintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import dotenv from 'dotenv';
import paths, { RepositoryPaths } from './paths';

const isDev = process.env.NODE_ENV === 'development';

const { ROOT_DIR, BUILD_OUTPUT_DIR, CLIENT_SRC, CLIENT_ASSETS, CLIENT_PUBLIC }: RepositoryPaths = paths;

const getConfig = (_env: { [key: string]: string }, operation: { [key: string]: string }): Configuration => {
    const currentPath = ROOT_DIR;
    const basePath = currentPath + '/.env';
    const envPath = basePath + '.' + operation?.mode;

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
        entry: CLIENT_SRC + '/index.tsx',
        output: {
            path: BUILD_OUTPUT_DIR + '/public',
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
                    include: CLIENT_SRC,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: { postcssOptions: { indent: 'postcss', plugins: [tailwindcss, autoprefixer] } },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-inline-loader',
                },
            ],
        },
        devtool: process.env.NODE_ENV === 'production' ? undefined : 'source-map',
        plugins: [
            new CleanWebpackPlugin({ dangerouslyAllowCleanPatternsOutsideProject: true, dry: false }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.DefinePlugin(envKeys),
            new MiniCssExtractPlugin({ filename: 'styles/[name].bundle.css', chunkFilename: '[id].[contenthash].css' }),
            new CopyWebpackPlugin({
                patterns: [{ from: CLIENT_ASSETS, to: 'assets' }],
            }),
            new HtmlWebpackPlugin({
                title: 'webpack and react',
                favicon: CLIENT_PUBLIC + '/favicon.ico',
                template: CLIENT_PUBLIC + '/index.html',
                filename: 'index.html',
            }),
            new ESlintPlugin({
                extensions: ['tsx', 'ts', 'jsx', 'js', 'json'],
            }),
        ],
    };
};

export default getConfig;
