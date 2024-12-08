import en from "../translations/en";
import de from "../translations/de";
import { TranslationSchema } from "../types/translations";

const translations: Record<string, TranslationSchema> = {
  en,
  de,
};

export type TranslationKey = keyof typeof en;

export const getTranslation = (
  language: string,
  key: string,
  fallbackLanguage = "en"
): string => {
  const keys = key.split(".");
  let translation: any =
    translations[language] || translations[fallbackLanguage];

  for (const k of keys) {
    translation = translation?.[k];
    if (!translation) break;
  }

  return translation || key;
};
