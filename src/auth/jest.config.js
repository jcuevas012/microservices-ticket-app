module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transformIgnorePatterns: ['/node_modules/'],
    transform: {
        '^.+\\.(js|ts)$': 'ts-jest',
    },
    testMatch: ['**/src/**/*.test.+(ts|js)'],
    verbose: true,
    setupFileAfterEnv: ['./src/test/setup.ts'],
}
