module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['./src/test/setEnvVars.ts'],
    setupFilesAfterEnv: ['./src/test/setup.ts'],
    moduleFileExtensions: ['ts', 'js'],
    transformIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.(js|ts)$': 'ts-jest',
    },
    testMatch: ['**/src/**/*.test.+(ts|js)'],
    verbose: true,
}
