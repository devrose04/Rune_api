module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  projects: [
    {
      displayName: 'unit',
      testMatch: ['**/test/unit/**/*.spec.ts'],
    },
    {
      displayName: 'integration',
      testMatch: ['**/test/integration/**/*.spec.ts'],
    },
  ],
};
