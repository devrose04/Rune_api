module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  globals: { 'ts-jest': { tsconfig: 'tsconfig.json' } },
  projects: [
    {
      transform: { '\\.ts$': ['ts-jest'] },
      displayName: 'unit',
      testMatch: ['**/test/unit/**/*.spec.ts'],
      setupFilesAfterEnv: ['<rootDir>/test/unit/setupTests.ts'],
    },
    {
      transform: { '\\.ts$': ['ts-jest'] },
      displayName: 'integration',
      testMatch: ['**/test/integration/**/*.spec.ts'],
    },
  ],
};
