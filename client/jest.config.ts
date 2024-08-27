module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jcx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
};
