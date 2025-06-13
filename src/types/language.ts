
export type SupportedLanguage = 'pt-ao' | 'pt-pt' | 'en';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export interface TranslationKey {
  [key: string]: string | TranslationKey;
}

export interface Translations {
  [key: string]: TranslationKey;
}

export interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  translations: Translations;
  changeLanguage: (language: SupportedLanguage) => void;
  t: (key: string, variables?: Record<string, string | number>) => string;
  availableLanguages: LanguageInfo[];
}
