import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            babelConfig: { presets: ['@babel/preset-env'] }
        },
    },
};

export default config;