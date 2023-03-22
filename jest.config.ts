import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    roots: ['<rootDir>', '<rootDir>/server/'],
    moduleNameMapper: {
        '@global(.*)': '<rootDir>/global/$1',
        '@server(.*)': '<rootDir>/server/src/$1',
        '@models(.*)': '<rootDir>/server/src/models/$1',
    },
};

export default config;
