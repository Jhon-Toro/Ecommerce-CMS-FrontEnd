import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(scss|sass|css)$': 'identity-obj-proxy',
    '^@/(.+)$': '<rootDir>/src/$1',
    '^next/font/google$': '<rootDir>/__mocks__/next/font/google.ts',
  },
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.jest.json',
      },
    ],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@babel|@testing-library|identity-obj-proxy|next))',
    'node_modules/(?!(.*@vercel/speed-insights).*)',
    'node_modules/(?!(.*@vercel/analytics).*)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.constant.ts',
    '!src/**/*.ts',
  ],
  maxWorkers: 1,
  verbose: true,
};

export default config;