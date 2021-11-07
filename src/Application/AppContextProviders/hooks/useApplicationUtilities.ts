/* eslint-disable import/prefer-default-export */
import React from "react";
import { ApplicationUtilitiesContext } from "../ApplicationUtilitiesProvider";
import type { ApplicationUtilitiesType } from "../ApplicationUtilitiesProvider";
import { i18nBuilder } from "../../i18n/i18nBuilder";

export const useApplicationUtilities = () => {
  const {
    //    changeLanguage,
    getAppStateItem,
    getCurrentLocale,
    getCurrentLocaleCode,
    getLocale,
    setAppStateItem,
    setCurrentLocale,
    t,
    toast,
  } = React.useContext(ApplicationUtilitiesContext) as ApplicationUtilitiesType;

  return {
    // changeLanguage, //
    getAppConfigItem: getAppStateItem,

    getCurrentLocale,
    getCurrentLocaleCode,
    getLocale,
    setAppConfigItem: setAppStateItem,
    // setLanguageCode: changeLanguage,
    setCurrentLocale,
    t,
    toast,
  };
};
