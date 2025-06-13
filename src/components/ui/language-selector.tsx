
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { SupportedLanguage } from '@/types/language';

interface LanguageSelectorProps {
  variant?: 'default' | 'compact' | 'icon';
  showFlag?: boolean;
  showText?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  variant = 'default',
  showFlag = true,
  showText = true 
}) => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLangInfo = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = async (language: SupportedLanguage) => {
    await changeLanguage(language);
    setIsOpen(false);
  };

  // Variante ícone apenas
  if (variant === 'icon') {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Globe className="h-4 w-4 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {availableLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center space-x-2 cursor-pointer ${
                currentLanguage === language.code ? 'bg-blue-50 text-blue-900' : ''
              }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm">{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Variante compacta
  if (variant === 'compact') {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs hover:bg-gray-100 transition-colors"
          >
            {showFlag && <span className="mr-1">{currentLangInfo?.flag}</span>}
            {showText && <span>{currentLanguage.toUpperCase()}</span>}
            <ChevronDown className="h-3 w-3 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          {availableLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`flex items-center space-x-2 cursor-pointer text-xs ${
                currentLanguage === language.code ? 'bg-blue-50 text-blue-900' : ''
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Variante padrão
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2 hover:bg-gray-50 border-gray-200 transition-all"
        >
          {showFlag && <span className="text-base">{currentLangInfo?.flag}</span>}
          {showText && (
            <span className="text-sm font-medium text-gray-700">
              {currentLanguage.toUpperCase()}
            </span>
          )}
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`flex items-center space-x-3 cursor-pointer p-3 hover:bg-gray-50 transition-colors ${
              currentLanguage === language.code ? 'bg-blue-50 text-blue-900' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <div className="flex-1">
              <div className="text-sm font-medium">{language.name}</div>
              <div className="text-xs text-gray-500">{language.nativeName}</div>
            </div>
            {currentLanguage === language.code && (
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
