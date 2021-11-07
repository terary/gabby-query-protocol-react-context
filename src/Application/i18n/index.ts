import { supportedLocaleDictionary, SUPPORTED_LOCALE_CODES_ARRAY } from "./locals";
import type { TLocaleSettings, TSupportedLanguages, TSupportedLocales } from "./type";
import { translations } from "./translations";

import { i18nBuilder } from "./i18nBuilder";

const i18nInit = (initialLanguageCode: TSupportedLanguages) => {
  return i18nBuilder(translations, initialLanguageCode);
};
const SUPPORTED_LOCALE_DICTIONARY = supportedLocaleDictionary;

export {
  supportedLocaleDictionary,
  SUPPORTED_LOCALE_DICTIONARY,
  SUPPORTED_LOCALE_CODES_ARRAY,
  i18nInit,
};
export type { TLocaleSettings, TSupportedLocales };
