module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  projects: [
    {
      transform: { '\\.ts$': ['ts-jest'] },
      displayName: 'unit',
      testMatch: ['**/test/unit/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/test/unit/setupTests.ts'], // Run before each suite, but before all tests in that suite
    },
    {
      transform: { '\\.ts$': ['ts-jest'] },
      displayName: 'integration',
      testMatch: ['**/test/integration/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/test/integration/util/setupTests.ts'], // Run before each suite, but before all tests in that suite
      globalSetup: '<rootDir>/test/integration/util/setupEnvironment.ts', // One time run before all suites
      globalTeardown: '<rootDir>/test/integration/util/teardownEnvironment.ts', // One time run before all suites
    },
  ],
};
