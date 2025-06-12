
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

const TabletNav = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
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
  );
};

export default TabletNav;
