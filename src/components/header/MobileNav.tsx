
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';
import { cn } from "@/lib/utils";

interface MobileNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const MobileNav = ({ isMenuOpen, setIsMenuOpen }: MobileNavProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  if (!isMenuOpen) return null;

  return (
    <div className="md:hidden lg:hidden fixed inset-0 z-40 bg-white">
      <div className="pt-20 px-4 pb-6 h-full overflow-y-auto safe-area-top safe-area-bottom">
        {/* Mobile Contact Info */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-gray-600">
              <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <a href="tel:+244930010002" className="text-sm hover:text-blue-900 transition-colors">
                (+244) 930 010 002
              </a>
            </div>
            <div className="flex items-center space-x-3 text-gray-600">
              <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <a href="mailto:info@beasell.ao" className="text-sm hover:text-blue-900 transition-colors">
                info@beasell.ao
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <Link 
            to="/"
            className={cn(
              "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-manipulation",
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
              "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-manipulation",
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
              "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-manipulation",
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
              "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-manipulation",
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
              "flex items-center px-4 py-4 rounded-xl transition-all duration-200 text-base font-medium touch-manipulation",
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
              className="bg-orange-500 hover:bg-orange-600 text-white w-full py-4 text-base font-semibold shadow-lg touch-manipulation min-h-[48px]"
            >
              Contacto
            </Button>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="pt-4 px-4 space-y-2">
          <a 
            href="tel:+244930010002"
            className="flex items-center justify-center w-full py-3 bg-blue-100 text-blue-900 rounded-lg font-medium hover:bg-blue-200 transition-colors touch-manipulation"
          >
            <Phone className="h-4 w-4 mr-2" />
            Ligar Agora
          </a>
          <a 
            href="https://wa.me/244930010002"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-3 bg-green-100 text-green-900 rounded-lg font-medium hover:bg-green-200 transition-colors touch-manipulation"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
