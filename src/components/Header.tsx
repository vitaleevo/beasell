
import React, { useState } from 'react';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      {/* Top bar with contact info */}
      <div className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+244 926 238 518</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>info@beasell.ao</span>
            </div>
          </div>
          <div className="hidden md:block text-sm">
            <span>Luanda, Angola</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/aabccf71-2753-49b9-82b4-62156d717089.png" 
              alt="Beasell Logo" 
              className="h-14 w-auto object-contain"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-base font-medium",
                        isActive('/') ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                      )}
                    >
                      Início
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/sobre">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-base font-medium",
                        isActive('/sobre') ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                      )}
                    >
                      Sobre Nós
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/servicos">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-base font-medium",
                        isActive('/servicos') ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                      )}
                    >
                      Serviços
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/testemunhos">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-base font-medium",
                        isActive('/testemunhos') ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                      )}
                    >
                      Testemunhos
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/blog">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-base font-medium",
                        isActive('/blog') ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                      )}
                    >
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/contacto" className="ml-4">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-2.5 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Contacto
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/"
                className={cn(
                  "text-left px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium",
                  isActive('/') 
                    ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                    : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                to="/sobre"
                className={cn(
                  "text-left px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium",
                  isActive('/sobre') 
                    ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                    : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Nós
              </Link>
              <Link 
                to="/servicos"
                className={cn(
                  "text-left px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium",
                  isActive('/servicos') 
                    ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                    : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Serviços
              </Link>
              <Link 
                to="/testemunhos"
                className={cn(
                  "text-left px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium",
                  isActive('/testemunhos') 
                    ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                    : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Testemunhos
              </Link>
              <Link 
                to="/blog"
                className={cn(
                  "text-left px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium",
                  isActive('/blog') 
                    ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                    : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <div className="px-4 pt-2">
                <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    size="lg" 
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full py-3 text-base font-semibold shadow-lg"
                  >
                    Contacto
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
