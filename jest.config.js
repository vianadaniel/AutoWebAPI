module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
    // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  // A set of global variables that need to be available in all test environments
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  // A preset that is used as a base for Jest's configuration
  preset: '@shelf/jest-mongodb',
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/*.spec.ts'],
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
