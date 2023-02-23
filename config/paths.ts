import path from 'path';

const ROOT_DIR = path.resolve(__dirname, '..');

const paths = {
    ROOT_DIR,
    BUILD_OUTPUT_DIR: path.resolve(ROOT_DIR, 'build'),
    DIST_OUTPUT_DIR: path.join(ROOT_DIR, 'dist'),
    CLIENT_ROOT: path.join(ROOT_DIR, 'client'),
    CLIENT_SRC: path.join(ROOT_DIR, 'client', 'src'),
    CLIENT_ASSETS: path.join(ROOT_DIR, 'client', 'src', 'assets'),
    CLIENT_PUBLIC: path.join(ROOT_DIR, 'client', 'public'),
    SERVER_ROOT: path.join(ROOT_DIR, 'server'),
    SERVER_SRC: path.join(ROOT_DIR, 'server', 'src'),
    ALIAS: {
        GLOBAL_PATH: path.join(ROOT_DIR, 'global'),
    },
    DOTENV_FILE_PATH: (mode: string): string => path.join(ROOT_DIR, `.env.${mode}`),
};

export type RepositoryPaths = typeof paths;

export default paths;
