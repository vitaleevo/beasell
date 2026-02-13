"use client";


import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { cn } from "@/shared/lib/utils";

const TabletNav = () => {
  const location = usePathname();
  const isActive = (path: string) => location === path;

  return (
    <div className="hidden md:flex lg:hidden items-center space-x-1">
      <Link href="/" className={cn("px-2 py-1.5 rounded-md text-sm font-medium transition-colors", isActive('/') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900')}>Início</Link>
      <Link href="/sobre" className={cn("px-2 py-1.5 rounded-md text-sm font-medium transition-colors", isActive('/sobre') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900')}>Sobre</Link>
      <Link href="/servicos" className={cn("px-2 py-1.5 rounded-md text-sm font-medium transition-colors", isActive('/servicos') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900')}>Serviços</Link>
      <Link href="/contacto">
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5">
          Contacto
        </Button>
      </Link>
    </div>
  );
};

export default TabletNav;
