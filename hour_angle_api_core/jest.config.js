module.exports = {
    globalSetup: '<rootDir>/test/setup.js',
    testEnvironment: '<rootDir>/test/environment.js',
    verbose: true,
    collectCoverageFrom: [
        '<rootDir>/src/**/*.js',
        '!<rootDir>/node_modules/'
    ],
    transform: {
        '^.+\\.(js|html|scss)$': '<rootDir>/test/preprocessor.js'
    },
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ],
    testMatch: [
        '**/__tests__/**/*.{js,jsx,mjs}',
        '**/+(*.)(spec|test).{js,jsx,mjs}'
    ]
};