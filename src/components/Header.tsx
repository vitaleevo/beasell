
import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      {/* Top bar with contact info */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>+244 923 456 789</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span>info@beasell.ao</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Luanda, Angola</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-900">
            <span className="text-orange-500">Bea</span>sell
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('inicio')}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('sobre')}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              Sobre Nós
            </button>
            <button 
              onClick={() => scrollToSection('servicos')}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('testemunhos')}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              Testemunhos
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              Blog
            </button>
            <Button 
              onClick={() => scrollToSection('contacto')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Contacto
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('inicio')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors"
              >
                Início
              </button>
              <button 
                onClick={() => scrollToSection('sobre')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors"
              >
                Sobre Nós
              </button>
              <button 
                onClick={() => scrollToSection('servicos')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors"
              >
                Serviços
              </button>
              <button 
                onClick={() => scrollToSection('testemunhos')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors"
              >
                Testemunhos
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors"
              >
                Blog
              </button>
              <Button 
                onClick={() => scrollToSection('contacto')}
                className="bg-orange-500 hover:bg-orange-600 text-white w-fit"
              >
                Contacto
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
