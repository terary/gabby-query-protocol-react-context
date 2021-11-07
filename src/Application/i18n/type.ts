// *********** imported strictly for typing information, otherwise not used
import enUsDateLocale from "date-fns/locale/en-US";
import { enUS } from "@mui/material/locale";
// ***********
type TMaterialThemeLocalization = typeof enUS;
type TDateFnsLocale = typeof enUsDateLocale;

type TLocaleSettings = {
  countryCode: string;
  countryNameLocal: string;
  countryNameEnglish: string;
  currencyCodeISO: string;
  currencySymbol: string | undefined;
  dateFnsLocale: TDateFnsLocale;
  dateFormatMap: string;
  languageCode: string;
  localeCode: string; // [languageCode]_[countryCode]
  materialThemeLocal: TMaterialThemeLocalization;
  languageDir: "rtl" | "ltr";
};
type TSupportedLocales =
  | "ar_ma"
  | "de_de"
  | "en_gb"
  | "en_us"
  | "es_es"
  | "es_mx"
  | "es_us"
  | "ru_ru"
  | "th_th";

type LanguageWithoutLocale = "ar" | "de" | "en" | "es" | "ru" | "th";
type TSupportedLanguages = TSupportedLocales | LanguageWithoutLocale;

type TSupportedLocaleDictionary = { [key in TSupportedLocales]: TLocaleSettings };

type TTranslationDictionary = { [key: string]: string };

type TSupportedTranslationDictionary = {
  [languageCode in TSupportedLanguages]: TTranslationDictionary;
};

export type {
  TLocaleSettings,
  TSupportedLocales,
  TSupportedLocaleDictionary,
  TSupportedLanguages, // language can be 'en' OR 'en_us' or 'en_gb'
  TSupportedTranslationDictionary,
  TTranslationDictionary, // key:value
};
