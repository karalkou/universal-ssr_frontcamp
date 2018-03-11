module.exports = {
    automock: false,
    browser: false,
    bail: false,
    collectCoverageFrom: ['src/**/*.{js,jsx}', '!**/node_modules/**'],

    coverageDirectory: '<rootDir>/coverage',

    moduleFileExtensions: ['js', 'jsx'],

    moduleNameMapper: {
        '\\.(css|less|styl|scss|sass|sss)$': 'identity-obj-proxy',
    },

    transform: {
        '\\.(js|jsx)$': '<rootDir>/node_modules/babel-jest',
        '^(?!.*\\.(js|jsx|json|css|less|styl|scss|sass|sss)$)':
            '<rootDir>/configs/jest/fileMock.js',
    },

    testRegex: '(\\.|/)(test)\\.js?$',

    unmockedModulePathPatterns: ['node_modules/react/', 'node_modules/enzyme/'],

    setupTestFrameworkScriptFile: './configs/enzyme/index.js',

    verbose: true,
};
