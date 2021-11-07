import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { TSupportedLanguages, TSupportedTranslationDictionary } from "./type";
// import { translations } from "../translations/translations";

export const i18nBuilder = (
  translations: TSupportedTranslationDictionary,
  initialLanguage: TSupportedLanguages
) => {
  i18n
    .use(initReactI18next)
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
      resources: {
        en: {
          translation: translations.en,
        },
        ar: {
          translation: translations.ar,
        },
        ar_ma: {
          translation: translations.ar_ma,
        },
        de: {
          translation: translations.de,
        },
        en_gb: {
          translation: translations.en_gb,
        },
        en_us: {
          translation: translations.en_us,
        },
        es: {
          translation: translations.es,
        },
        es_es: {
          translation: translations.es_es,
        },
        es_mx: {
          translation: translations.es_mx,
        },
        es_us: {
          translation: translations.es_us,
        },
        ru: {
          translation: translations.ru,
        },
        th: {
          translation: translations.th,
        },
      },

      returnObjects: true,
      fallbackLng: "en_us",
      debug: false,
      lng: initialLanguage,
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
    });
};
