import { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import NodemonPlugin from 'nodemon-webpack-plugin';
import ESlintPlugin from 'eslint-webpack-plugin';
import dotenv from 'dotenv';
import paths, { RepositoryPaths } from './paths';

const isDev = process.env.NODE_ENV === 'development';
const {
    SERVER_ROOT,
    SERVER_SRC,
    DOTENV_FILE_PATH,
    BUILD_OUTPUT_DIR,
    ALIAS: { GLOBAL_PATH },
}: RepositoryPaths = paths;

const getConfig = (env: { [key: string]: string }, _argv: string[]): Configuration => {
    dotenv.config({
        path: DOTENV_FILE_PATH(env.mode),
    });
    return {
        entry: SERVER_ROOT + '/server.ts',
        mode: isDev ? 'development' : 'production',
        target: 'node',
        output: {
            path: BUILD_OUTPUT_DIR,
            filename: 'server-entry.js',
        },
        externals: [nodeExternals()],
        plugins: [
            new NodemonPlugin({
                script: BUILD_OUTPUT_DIR + '/server-entry.js',
                watch: [BUILD_OUTPUT_DIR],
                verbose: true,
                delay: 3,
            }),
            new ESlintPlugin({
                extensions: ['js', 'ts'],
            }),
        ],
        resolve: {
            extensions: ['.ts'],
            alias: {
                '@global': GLOBAL_PATH,
                '@server': SERVER_SRC,
            },
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    use: ['ts-loader'],
                },
            ],
        },
    };
};

export default getConfig(process.env, process.argv);
