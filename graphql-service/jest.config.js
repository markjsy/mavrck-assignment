module.exports = {
    clearMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./src/tests/prismaSingleton.ts'],
  }