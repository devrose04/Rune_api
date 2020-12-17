module.exports = {
  /**
   * This will match ALL tests by default, both unit and integration,
   * so take care to provide the path to the type you want to run, or
   * just use the script in the package.json
   */
  testMatch: ['**/test/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: { '^.+\\.ts$': 'ts-jest' },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
