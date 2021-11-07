/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import { TSupportedTranslationDictionary } from "../type";
import ar from "./ar.json";
import ar_ma from "./ar_MA.json";
import de from "./de.json";
import en from "./en.json";
import en_gb from "./en_gb.json";
import en_us from "./en_US.json";
import es from "./es.json";
import es_es from "./es_es.json";
import es_mx from "./es_mx.json";
import es_us from "./es_us.json";
import ru from "./ru.json";
import th from "./th.json";

export const translations: TSupportedTranslationDictionary = {
  ar,
  ar_ma,
  de,
  de_de: de,
  en,
  en_gb,
  en_us,
  es,
  es_es,
  es_mx,
  es_us,
  ru,
  ru_ru: ru,
  th,
  th_th: th,
};
