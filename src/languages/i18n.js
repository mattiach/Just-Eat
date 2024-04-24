import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// traslations
import { en } from "@languages/en/translations";
import { it } from "@languages/it/translations";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true, // if enabled it helps in finding issues with loading not working
    lng: 'en', // language to use 
    fallbackLng: 'en', // language to use if translations in user language are not available
    resources: { en, it }, // available languages in the application
    interpolation: {
      escapeValue: true // disable XSS (cross site scripting) - attacks
    }
  });

export default i18n;
