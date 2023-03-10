import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '@global(.*)': '<rootDir>/global/$1',
    },
};

export default config;
