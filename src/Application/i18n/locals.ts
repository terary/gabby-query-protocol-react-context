// cspell:disable

// Locale code:
//    languageCode_countryCode
//    ar_eg -> Arabic Egypt
//    en_us -> English United States
//    en_uk -> English United Kingdom
// https://developers.google.com/interactive-media-ads/docs/sdks/android/client-side/localization

import {
  arEG,
  deDE,
  elGR,
  enUS,
  esES,
  /* esMx, doesn't exist */
  /* esUs,  doesn't exist */
  ruRU,
  thTH,
} from "@mui/material/locale";

// import arMaDateLocale from "date-fns/locale/ar-MA";
import arMaDateLocale from "date-fns/locale/ar-TN";
// using ar-MA, produces date fromat mm/dd/yyyy, expected dd/mm/yyyy
// founds some other Arabic locale that seems to work.  I think
// Arabic locale support is patchy at best.

import deDeDateLocale from "date-fns/locale/de";
import enGbDateLocale from "date-fns/locale/en-GB";
import enUsDateLocale from "date-fns/locale/en-US";
import esEsDateLocale from "date-fns/locale/es";
// import esMxDateLocale from "date-fns/locale/es";    // dont exist
// import esUsDateLocale from "date-fns/locale/en-US"; // dont exist
import ruRuDateLocale from "date-fns/locale/ru";
import thThDateLocale from "date-fns/locale/th";

import type { TLocaleSettings, TSupportedLocaleDictionary } from "./type";

const esUsDateLocale = enUsDateLocale;
const esMxDateLocale = esEsDateLocale;

const SUPPORTED_LOCALE_CODES_ARRAY = [
  "ar_ma",
  "de_de",
  "en_gb",
  "en_us",
  "es_es",
  "es_mx",
  "es_us",
  "ru_ru",
  "th_th",
];

const supportedLocaleDictionary: TSupportedLocaleDictionary = {
  ar_ma: {
    countryCode: "ma",
    countryNameLocal: "المغرب", // this may not be the symbol
    countryNameEnglish: "Morocco",
    currencyCodeISO: "MAD",
    currencySymbol: "درهم‎,",
    dateFnsLocale: arMaDateLocale,
    dateFormatMap: "__/__/____", // dd/mm/yyyy
    languageCode: "ar",
    languageDir: "rtl",
    localeCode: "ar_ma",
    materialThemeLocal: arEG, // Egypt will have to do
  } as TLocaleSettings,
  de_de: {
    countryCode: "de",
    countryNameLocal: "Deutsch",
    countryNameEnglish: "German",
    currencySymbol: "€",
    currencyCodeISO: "US",
    dateFnsLocale: deDeDateLocale,
    dateFormatMap: "____-__-__", // yyyy-mm-dd (google says this format, date picker said something different)
    languageCode: "de",
    languageDir: "ltr",
    localeCode: "de_de",
    materialThemeLocal: deDE,
  } as TLocaleSettings,
  en_gb: {
    countryCode: "uk",
    countryNameLocal: "England",
    countryNameEnglish: "England",
    currencyCodeISO: "GBP",
    currencySymbol: "£",
    dateFnsLocale: enGbDateLocale,
    dateFormatMap: "__/__/____", // dd/mm/yyyy
    languageCode: "en",
    languageDir: "ltr",
    localeCode: "en_uk",
    materialThemeLocal: elGR,
  } as TLocaleSettings,
  en_us: {
    countryCode: "us",
    countryNameLocal: "United States",
    countryNameEnglish: "United States",
    currencyCodeISO: "USD",
    currencySymbol: "$",
    dateFnsLocale: enUsDateLocale,
    dateFormatMap: "__/__/____", // mm/dd/yyyy
    languageCode: "en",
    languageDir: "ltr",
    localeCode: "en_us",
    materialThemeLocal: enUS,
  } as TLocaleSettings,
  es_es: {
    countryCode: "es",
    countryNameLocal: "España",
    countryNameEnglish: "Spain",
    currencyCodeISO: "EUR",
    currencySymbol: "€",
    dateFnsLocale: esEsDateLocale,
    dateFormatMap: "__-__-__", // dd-mm-yy
    languageCode: "es",
    languageDir: "ltr",
    localeCode: "es_es",
    materialThemeLocal: esES,
  } as TLocaleSettings,
  es_mx: {
    countryCode: "mx",
    countryNameLocal: "México",
    countryNameEnglish: "Mexico",
    currencyCodeISO: "MXN",
    currencySymbol: "mex$",
    dateFnsLocale: esMxDateLocale,
    dateFormatMap: "__/__/____", // dd-mm-yy
    languageCode: "es",
    languageDir: "ltr",
    localeCode: "es_mx",
    materialThemeLocal: esES, // no Mexico
  } as TLocaleSettings,
  es_us: {
    countryCode: "us",
    countryNameLocal: "Estados Unidos",
    countryNameEnglish: "United States",
    currencyCodeISO: "USD",
    currencySymbol: "$",
    dateFnsLocale: esUsDateLocale,
    dateFormatMap: "__/__/____", // mm/dd/yyyy
    languageCode: "es",
    languageDir: "ltr",
    localeCode: "es_us",
    materialThemeLocal: esES, // no US Spanish
  } as TLocaleSettings,
  ru_ru: {
    countryCode: "ru",
    countryNameLocal: "Россия",
    countryNameEnglish: "Russia",
    currencyCodeISO: "RUB",
    currencySymbol: "₽",
    dateFnsLocale: ruRuDateLocale,
    dateFormatMap: "__.__.____", // dd.mm.yy(yy)
    languageCode: "ru",
    languageDir: "ltr",
    localeCode: "ru_ru",
    materialThemeLocal: ruRU, // no US Spanish
  } as TLocaleSettings,
  th_th: {
    countryCode: "th",
    countryNameLocal: "ประเทศไทย",
    countryNameEnglish: "Thailand",
    currencyCodeISO: "THB",
    currencySymbol: "฿",
    dateFnsLocale: thThDateLocale,
    dateFormatMap: "__/__/____", // dd/mm/yyyy
    languageCode: "th",
    languageDir: "ltr",
    localeCode: "th_th",
    materialThemeLocal: thTH, // no US Spanish
  } as TLocaleSettings,
};

export { supportedLocaleDictionary, SUPPORTED_LOCALE_CODES_ARRAY };
