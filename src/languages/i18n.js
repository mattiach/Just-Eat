import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { supportedLanguages } from "@settings/supportedLanguages";

// traslations
import { en } from "@languages/en/translations";
import { it } from "@languages/it/translations";
import { fr } from "@languages/fr/translations";
import { de } from "@languages/de/translations";

i18n
  .use(initReactI18next)
  .init({
    // debug: true, 
    fallbackLng: 'en', // language to use if translations in user language are not available
    resources: { en, it, fr, de }, // available languages in the application
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: true // disable XSS (cross site scripting) - attacks
    }
  });

export default i18n;