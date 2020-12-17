module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  globals: { 'ts-jest': { tsConfig: 'tsconfig.json' } },
  projects: [
    {
      displayName: 'unit',
      testMatch: ['**/test/unit/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/test/unit/setupTests.ts'], // Run before each suite, but before all tests in that suite
    },
    {
      displayName: 'integration',
      testMatch: ['**/test/integration/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/test/integration/util/setupTests.ts'], // Run before each suite, but before all tests in that suite
      globalSetup: '<rootDir>/test/integration/util/setupEnvironment.ts', // One time run before all suites
      globalTeardown: '<rootDir>/test/integration/util/teardownEnvironment.ts', // One time run before all suites
    },
  ],
};
