
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
    <>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        {/* Top bar with contact info - Hidden on mobile, visible on tablet+ */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 hidden sm:block">
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
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <img 
                src="/lovable-uploads/06b8610c-4417-45a9-a695-12f10b09eeab.png" 
                alt="Beasell Logo" 
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink 
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
                          isActive('/') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
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
                          isActive('/sobre') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
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
                          isActive('/servicos') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
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
                          isActive('/testemunhos') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
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
                          isActive('/blog') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
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
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 xl:px-6 py-2 xl:py-2.5 text-sm xl:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  Contacto
                </Button>
              </Link>
            </div>

            {/* Tablet Navigation */}
            <div className="hidden md:flex lg:hidden items-center space-x-1">
              <Link to="/" className={cn("px-2 py-1.5 rounded-md text-sm font-medium transition-colors", isActive('/') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900')}>Início</Link>
              <Link to="/sobre" className={cn("px-2 py-1.5 rounded-md text-sm font-medium transition-colors", isActive('/sobre') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900')}>Sobre</Link>
              <Link to="/servicos" className={cn("px-2 py-1.5 rounded-md text-sm font-medium transition-colors", isActive('/servicos') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900')}>Serviços</Link>
              <Link to="/contacto">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5">
                  Contacto
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors touch-target relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Enhanced Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden lg:hidden fixed inset-0 z-40 bg-white">
          <div className="pt-20 px-4 pb-6 h-full overflow-y-auto">
            {/* Mobile Contact Info */}
            <div className="border-b border-gray-200 pb-4 mb-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">+244 926 238 518</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">info@beasell.ao</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              <Link 
                to="/"
                className={cn(
                  "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-target",
                  isActive('/') 
                    ? 'text-blue-900 bg-blue-900/10 border-l-4 border-blue-900' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50 active:bg-gray-100'
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
                    ? 'text-blue-900 bg-blue-900/10 border-l-4 border-blue-900' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50 active:bg-gray-100'
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
                    ? 'text-blue-900 bg-blue-900/10 border-l-4 border-blue-900' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50 active:bg-gray-100'
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
                    ? 'text-blue-900 bg-blue-900/10 border-l-4 border-blue-900' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50 active:bg-gray-100'
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
                    ? 'text-blue-900 bg-blue-900/10 border-l-4 border-blue-900' 
                    : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50 active:bg-gray-100'
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
                  className="bg-orange-500 hover:bg-orange-600 text-white w-full py-4 text-base font-semibold shadow-lg touch-target"
                >
                  Contacto
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
