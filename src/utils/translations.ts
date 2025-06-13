
import { SupportedLanguage, Translations } from '@/types/language';

// Função para carregar traduções dinamicamente
export const loadTranslations = async (language: SupportedLanguage): Promise<Translations> => {
  try {
    const translations = await import(`../locales/${language}.json`);
    return translations.default;
  } catch (error) {
    console.warn(`Failed to load translations for ${language}, falling back to pt-ao`);
    const fallback = await import('../locales/pt-ao.json');
    return fallback.default;
  }
};

// Função para obter valor aninhado do objeto de tradução
export const getNestedValue = (obj: any, path: string): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
};

// Função para interpolar variáveis na string
export const interpolate = (text: string, variables?: Record<string, string | number>): string => {
  if (!variables) return text;
  
  return text.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
};

// Função para detectar idioma do navegador
export const detectBrowserLanguage = (): SupportedLanguage => {
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.includes('pt')) {
    // Detectar se é português de Portugal ou Angola
    if (browserLang.includes('pt-pt') || browserLang.includes('portugal')) {
      return 'pt-pt';
    }
    return 'pt-ao'; // Padrão para português
  }
  
  if (browserLang.includes('en')) {
    return 'en';
  }
  
  return 'pt-ao'; // Padrão
};

// Função para formatar números por região
export const formatNumber = (number: number, language: SupportedLanguage): string => {
  const locales = {
    'pt-ao': 'pt-AO',
    'pt-pt': 'pt-PT',
    'en': 'en-US'
  };
  
  return new Intl.NumberFormat(locales[language]).format(number);
};

// Função para formatar moeda (AOA)
export const formatCurrency = (amount: number, language: SupportedLanguage): string => {
  const locales = {
    'pt-ao': 'pt-AO',
    'pt-pt': 'pt-PT', 
    'en': 'en-US'
  };
  
  const currencySymbol = language === 'en' ? 'AOA' : 'AOA';
  
  return new Intl.NumberFormat(locales[language], {
    style: 'currency',
    currency: 'AOA',
    currencyDisplay: language === 'en' ? 'code' : 'symbol'
  }).format(amount);
};

// Função para formatar datas
export const formatDate = (date: Date, language: SupportedLanguage): string => {
  const locales = {
    'pt-ao': 'pt-AO',
    'pt-pt': 'pt-PT',
    'en': 'en-US'
  };
  
  return new Intl.DateTimeFormat(locales[language], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};
