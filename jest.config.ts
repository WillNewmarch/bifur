import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    testEnvironment: 'jest-environment-node',
    transform: {
        '^.+\\.jsx?$': [ 'babel-jest', { configFile: './babel.config.js' } ],
        '^.+\\.tsx?$': [ 'ts-jest', {} ]
    },
};

export default config;