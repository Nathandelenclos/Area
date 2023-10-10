import fr from "./fr.json";
import en from "./en.json";

export type LangType = {
  [key: string]: string | LangType;
};

const lang = {
  fr: fr as LangType,
  en: en as LangType,
};

export type Language = keyof typeof lang;

export { lang };
