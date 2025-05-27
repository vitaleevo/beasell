
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
      {/* Top bar with contact info - Hidden on mobile, visible on tablet+ */}
      <div className="bg-gradient-to-r from-brand-blue-900 to-brand-blue-800 text-white py-2 hidden sm:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="text-xs lg:text-sm">+244 926 238 518</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-3 w-3 lg:h-4 lg:w-4" />
              <span className="text-xs lg:text-sm">info@beasell.ao</span>
            </div>
          </div>
          <div className="hidden md:block text-xs lg:text-sm">
            <span>Luanda, Angola</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo - Updated with new image */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img 
              src="/lovable-uploads/06b8610c-4417-45a9-a695-12f10b09eeab.png" 
              alt="Beasell Logo" 
              className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
            />
          </Link>
          
          {/* Desktop Navigation - Hidden on mobile and small tablets */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink 
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
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
                        "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
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
                        "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
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
                        "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
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
                        "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
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
                className="bg-brand-orange hover:bg-brand-orange/90 text-white px-4 xl:px-6 py-2 xl:py-2.5 text-sm xl:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                Contacto
              </Button>
            </Link>
          </div>

          {/* Tablet Navigation - Visible only on medium screens */}
          <div className="hidden md:flex lg:hidden items-center space-x-1">
            <Link to="/" className={cn("px-2 py-1.5 rounded-md text-sm font-medium transition-colors", isActive('/') ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-700 hover:text-brand-blue')}>Início</Link>
            <Link to="/sobre" className={cn("px-2 py-1.5 rounded-md text-sm font-medium transition-colors", isActive('/sobre') ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-700 hover:text-brand-blue')}>Sobre</Link>
            <Link to="/servicos" className={cn("px-2 py-1.5 rounded-md text-sm font-medium transition-colors", isActive('/servicos') ? 'text-brand-blue bg-brand-blue/10' : 'text-gray-700 hover:text-brand-blue')}>Serviços</Link>
            <Link to="/contacto">
              <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xs px-3 py-1.5">
                Contacto
              </Button>
            </Link>
          </div>

          {/* Mobile menu button - Visible on mobile and small tablets */}
          <button
            className="md:hidden lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation - Full screen overlay on mobile */}
        {isMenuOpen && (
          <div className="md:hidden lg:hidden fixed inset-0 top-[60px] sm:top-[84px] bg-white z-40 overflow-y-auto">
            <div className="px-4 py-6 space-y-1">
              {/* Mobile Contact Info */}
              <div className="border-b border-gray-200 pb-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Phone className="h-4 w-4 text-brand-orange" />
                    <span className="text-sm">+244 926 238 518</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Mail className="h-4 w-4 text-brand-orange" />
                    <span className="text-sm">info@beasell.ao</span>
                  </div>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <Link 
                  to="/"
                  className={cn(
                    "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-target",
                    isActive('/') 
                      ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                      : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50 active:bg-gray-100'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link 
                  to="/sobre"
                  className={cn(
                    "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-target",
                    isActive('/sobre') 
                      ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                      : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50 active:bg-gray-100'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sobre Nós
                </Link>
                <Link 
                  to="/servicos"
                  className={cn(
                    "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-target",
                    isActive('/servicos') 
                      ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                      : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50 active:bg-gray-100'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Serviços
                </Link>
                <Link 
                  to="/testemunhos"
                  className={cn(
                    "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-target",
                    isActive('/testemunhos') 
                      ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                      : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50 active:bg-gray-100'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Testemunhos
                </Link>
                <Link 
                  to="/blog"
                  className={cn(
                    "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-target",
                    isActive('/blog') 
                      ? 'text-brand-blue bg-brand-blue/10 border-l-4 border-brand-blue' 
                      : 'text-gray-700 hover:text-brand-blue hover:bg-gray-50 active:bg-gray-100'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </div>

              {/* Mobile CTA Button */}
              <div className="pt-6 px-4">
                <Link to="/contacto" onClick={() => setIsMenuOpen(false)}>
                  <Button 
                    size="lg" 
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full py-4 text-base font-semibold shadow-lg touch-target"
                  >
                    Contacto
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden lg:hidden fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
