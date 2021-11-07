import { GabbyToast } from "../../GabbyToast";
import type { TSupportedLocales, TLocaleSettings } from "../../i18n";

export type ApplicationUtilitiesType = {
  testUtilityResetState: () => void;
  changeLanguage: (languageCode: TSupportedLocales) => void;
  getAppStateItem: <T>(key: string) => T | undefined;
  getAppStateItemOrAlternative: <T>(key: string, alternative: T) => T;

  getCurrentLocale: () => TLocaleSettings;
  getCurrentLocaleCode: () => TSupportedLocales;
  getLocale: (locale?: TSupportedLocales) => TLocaleSettings; // get new or default Locale
  getLanguage: () => TSupportedLocales;
  setAppStateItem: <T>(key: string, value: T) => void;
  setCurrentLocale: (localeCode: TSupportedLocales) => void;
  t: (key: string, altText?: string) => string;
  toast: typeof GabbyToast;
};
