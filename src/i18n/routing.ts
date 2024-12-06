import { defaultLanguage, supportedLanguages } from '@/settings/const';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: supportedLanguages,
  defaultLocale: defaultLanguage,
  localePrefix: {
    mode: 'always',
    prefixes: {
      'en': '/en',
      'it': '/it',
      'es': '/es',
      'de': '/de',
      'fr': '/fr'
    }
  },
  pathnames: {
    '/': '/',
  }
});