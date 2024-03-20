import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  catalogs: [
    {
      path: '<rootDir>/localization/{locale}/messages',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
    {
      path: '<rootDir>/localization/{locale}/messages',
      include: ['.', '<rootDir>'],
      exclude: ['**/node_modules/**'],
    },
  ],
  locales: ['en', 'uk'],
  compileNamespace: 'ts',
  format: 'po',
  sourceLocale: 'en',
  fallbackLocales: {
    default: 'en',
  },
  formatOptions: {
    origins: false,
  },
};

export default config;
