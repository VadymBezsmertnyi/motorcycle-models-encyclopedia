import type { Language, Languages } from './localization.types';

export const defaultLanguage: Language = 'en';
export const languagesKeys = ['en', 'uk'] as const;
export const languageKey = 'language';

export const languages: Languages = [
  {
    title: 'Українська',
    key: 'uk',
  },
  {
    title: 'English',
    key: 'en',
  },
];

export const languages_short = {
  en: 'en-EN',
  uk: 'uk-UA',
};

export const languagesLinguiAlias = {
  en: 'en',
  uk: 'uk',
} as const;

export const normalizeLanguages = {
  en: 'en',
  uk: 'uk',
};

export const LANGUAGE_EN = 'en';
export const LANGUAGE_UK = 'uk';

export const languagePattern = /\b(en|uk)\b/;
