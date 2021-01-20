const sharedProjectProperties = {
  testEnvironment: 'node',
  transform: { '\\.ts$': ['ts-jest'] },
};

module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  projects: [
    {
      ...sharedProjectProperties,
      displayName: 'unit',
      testMatch: ['**/test/unit/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/test/unit/setupTests.ts'],
    },
    {
      ...sharedProjectProperties,
      displayName: 'integration',
      testMatch: ['**/test/integration/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/test/integration/waitForEnv.ts'],
    },
  ],
};
