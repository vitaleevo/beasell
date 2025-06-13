
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage, LanguageContextType, Translations, LanguageInfo } from '@/types/language';
import { loadTranslations, getNestedValue, interpolate, detectBrowserLanguage } from '@/utils/translations';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'beasell-language';

export const availableLanguages: LanguageInfo[] = [
  {
    code: 'pt-ao',
    name: 'Português (Angola)',
    nativeName: 'Português (Angola)',
    flag: '🇦🇴'
  },
  {
    code: 'pt-pt', 
    name: 'Português (Portugal)',
    nativeName: 'Português (Portugal)',
    flag: '🇵🇹'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  }
];

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('pt-ao');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  // Função para carregar traduções
  const loadLanguageTranslations = async (language: SupportedLanguage) => {
    setIsLoading(true);
    try {
      const newTranslations = await loadTranslations(language);
      setTranslations(newTranslations);
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para mudar idioma
  const changeLanguage = async (language: SupportedLanguage) => {
    setCurrentLanguage(language);
    localStorage.setItem(STORAGE_KEY, language);
    await loadLanguageTranslations(language);
  };

  // Função de tradução
  const t = (key: string, variables?: Record<string, string | number>): string => {
    if (isLoading) return key;
    
    const value = getNestedValue(translations, key);
    return interpolate(value, variables);
  };

  // Inicialização
  useEffect(() => {
    const initializeLanguage = async () => {
      // Tentar obter idioma salvo
      const savedLanguage = localStorage.getItem(STORAGE_KEY) as SupportedLanguage;
      
      // Se não houver idioma salvo, detectar do navegador
      const initialLanguage = savedLanguage || detectBrowserLanguage();
      
      setCurrentLanguage(initialLanguage);
      await loadLanguageTranslations(initialLanguage);
    };

    initializeLanguage();
  }, []);

  const value: LanguageContextType = {
    currentLanguage,
    translations,
    changeLanguage,
    t,
    availableLanguages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
