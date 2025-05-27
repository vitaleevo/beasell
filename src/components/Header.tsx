
import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      {/* Top bar with contact info */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>+244 926 238 518</span>
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
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/aabccf71-2753-49b9-82b4-62156d717089.png" 
              alt="Beasell Logo" 
              className="h-8 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/"
              className={`transition-colors ${isActive('/') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
            >
              Início
            </Link>
            <Link 
              to="/sobre"
              className={`transition-colors ${isActive('/sobre') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/servicos"
              className={`transition-colors ${isActive('/servicos') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
            >
              Serviços
            </Link>
            <Link 
              to="/testemunhos"
              className={`transition-colors ${isActive('/testemunhos') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
            >
              Testemunhos
            </Link>
            <Link 
              to="/blog"
              className={`transition-colors ${isActive('/blog') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
            >
              Blog
            </Link>
            <Link to="/contacto">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Contacto
              </Button>
            </Link>
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
              <Link 
                to="/"
                className={`text-left transition-colors ${isActive('/') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/sobre"
                className={`text-left transition-colors ${isActive('/sobre') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link 
                to="/servicos"
                className={`text-left transition-colors ${isActive('/servicos') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link 
                to="/testemunhos"
                className={`text-left transition-colors ${isActive('/testemunhos') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Testemunhos
              </Link>
              <Link 
                to="/blog"
                className={`text-left transition-colors ${isActive('/blog') ? 'text-blue-900 font-semibold' : 'text-gray-700 hover:text-blue-900'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white w-fit">
                  Contacto
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
