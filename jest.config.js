export default {
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testEnvironment: 'node',
    testMatch: [
      "<rootDir>/tests/**/*.(test|spec).(ts|tsx|js|jsx)",  // Update this to match your folder structure
    ],
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
  };