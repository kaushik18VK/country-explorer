const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  // Optional: add moduleNameMapper if you use path aliases
  // moduleNameMapper: {
  //   '^@/components/(.*)$': '<rootDir>/src/components/$1',
  //   '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
  // },
};

module.exports = createJestConfig(customJestConfig);
