import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

/*
  TODO - *tmc*
  i18n does some kind of initialization that depends on
  the translations files. For the time being this 
  needs to be like this, but should be reorganized
  to import normally
*/
// import "../i18n/i18nBuilder";
import { i18nInit } from "../../i18n";
import type { TSupportedLocales, TLocaleSettings } from "../../i18n";
import { supportedLocaleDictionary } from "../../i18n";
import type { ApplicationUtilitiesType } from "./type";
import { GabbyToast, GabbyToastContainer } from "../../GabbyToast";

export const ApplicationUtilitiesContext =
  React.createContext<ApplicationUtilitiesType | null>(null);

const initialState = {
  // locale: "en_us",
  // // locale: "es_mx",
  // // locale: "ru_ru",
  // // locale: "ar_ma",
};

type Props = {
  initialLocaleCode?: TSupportedLocales;
  children: React.ReactNode;
};

const initialProps = { localeCode: "es_mx" as TSupportedLocales };

i18nInit(initialProps.localeCode); // the package - injects, we dont need to wrap it into a provider

const ApplicationUtilitiesProvider = ({ initialLocaleCode, children }: Props): JSX.Element => {
  const { t: i18nT, i18n } = useTranslation();

  // so far the only preset is locale
  const [appState, setAppState] = React.useState(initialState as { [key: string]: unknown });

  // make sure this is being used
  const testUtilityResetState = () => {
    i18nInit(initialProps.localeCode);
    setAppState(initialState);
  };

  const _updateState = <T,>(key: string, value: T): void => {
    setAppState({ ...appState, ...{ [key]: value as T } });
  };

  const getAppStateItem = <T,>(key: string): T => {
    return appState[key] as T;
  };

  const getAppStateItemOrAlternative = <T,>(key: string, alternative: T): T => {
    return getAppStateItem(key) || alternative;
  };

  const getCurrentLocaleCode = (): TSupportedLocales => {
    return i18n.language as TSupportedLocales;
  };

  const getCurrentLocale = () => {
    return getLocale(getCurrentLocaleCode());
  };

  const getLocale = (locale?: TSupportedLocales): TLocaleSettings => {
    if (locale !== undefined && supportedLocaleDictionary[locale] !== undefined) {
      return supportedLocaleDictionary[locale];
    }

    // ideally we'll be using locale code (en_us) as language keys and locale keys
    // but there its possibility end-user chooses language without locale 'en' or 'ar'

    // no longer applicable
    if (supportedLocaleDictionary[i18n.language as TSupportedLocales] !== undefined) {
      return supportedLocaleDictionary[i18n.language as TSupportedLocales];
    }

    return supportedLocaleDictionary["en_us"];
  };

  const setAppStateItem = <T,>(key: string, value: T): void => {
    _updateState<T>(key, value);
  };

  const setCurrentLocale = (localeCode: TSupportedLocales): void => {
    i18n.changeLanguage(localeCode);
  };

  const t = (key: string, altText?: string) => {
    return i18n.exists(key) ? i18nT(key) : altText || key;
  };

  // post initialization... Mostly for testing purposes.
  if (initialLocaleCode !== undefined) {
    setCurrentLocale(initialLocaleCode);
  }

  const exportedFunctions = {
    testUtilityResetState,
    changeLanguage: (languageCode: TSupportedLocales) => {
      i18n.changeLanguage(languageCode);
    },

    getAppStateItem,
    getAppStateItemOrAlternative,
    getLanguage: () => i18n.language as TSupportedLocales,
    getCurrentLocale,
    getCurrentLocaleCode,
    getLocale,
    setAppStateItem,
    setCurrentLocale,
    t,
    toast: GabbyToast,
  };

  return (
    <ApplicationUtilitiesContext.Provider value={exportedFunctions}>
      <GabbyToastContainer />
      {children}
    </ApplicationUtilitiesContext.Provider>
  );
};
export default ApplicationUtilitiesProvider;

export const useTestUtilities = () => {
  const {
    testUtilityResetState,
    // //    changeLanguage,
    // getAppStateItem,
    // getCurrentLocale,
    // getCurrentLocaleCode,
    // getLocale,
    // setAppStateItem,
    // setCurrentLocale,
    // t,
    // toast,
  } = React.useContext(ApplicationUtilitiesContext) as ApplicationUtilitiesType;
  return {
    resetState: testUtilityResetState,
  };
};
