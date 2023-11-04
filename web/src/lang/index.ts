import fr from "./fr.json";
import en from "./en.json";

/**
 * Lang type
 */
export type LangType = {
  [key: string]: string | LangType;
};

/**
 * Lang object
 */
const lang = {
  fr: fr as LangType,
  en: en as LangType,
};

export type Language = keyof typeof lang;

export { lang };
