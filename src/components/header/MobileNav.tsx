
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
  );
};

export default MobileNav;
