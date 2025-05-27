
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
      {/* Top bar with contact info - further reduced padding */}
      <div className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-800 text-white py-0.5">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Phone className="h-3 w-3" />
              <span>+244 926 238 518</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-3 w-3" />
              <span>info@beasell.ao</span>
            </div>
          </div>
          <div className="hidden md:block text-xs">
            <span>Luanda, Angola</span>
          </div>
        </div>
      </div>

      {/* Main navigation - further reduced padding */}
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-1.5">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/aabccf71-2753-49b9-82b4-62156d717089.png" 
              alt="Beasell Logo" 
              className="h-12 w-auto object-contain"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/"
              className={`transition-colors text-sm ${isActive('/') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
            >
              Início
            </Link>
            <Link 
              to="/sobre"
              className={`transition-colors text-sm ${isActive('/sobre') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/servicos"
              className={`transition-colors text-sm ${isActive('/servicos') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
            >
              Serviços
            </Link>
            <Link 
              to="/testemunhos"
              className={`transition-colors text-sm ${isActive('/testemunhos') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
            >
              Testemunhos
            </Link>
            <Link 
              to="/blog"
              className={`transition-colors text-sm ${isActive('/blog') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
            >
              Blog
            </Link>
            <Link to="/contacto">
              <Button size="sm" className="bg-brand-orange hover:bg-brand-orange-600 text-white px-4 py-1.5 text-sm">
                Contacto
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/"
                className={`text-left transition-colors text-sm ${isActive('/') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/sobre"
                className={`text-left transition-colors text-sm ${isActive('/sobre') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link 
                to="/servicos"
                className={`text-left transition-colors text-sm ${isActive('/servicos') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link 
                to="/testemunhos"
                className={`text-left transition-colors text-sm ${isActive('/testemunhos') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Testemunhos
              </Link>
              <Link 
                to="/blog"
                className={`text-left transition-colors text-sm ${isActive('/blog') ? 'text-brand-blue font-semibold' : 'text-gray-700 hover:text-brand-blue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>
                <Button size="sm" className="bg-brand-orange hover:bg-brand-orange-600 text-white w-fit px-4 py-1.5 text-sm">
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
