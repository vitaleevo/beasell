"use client";


import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu";
import { cn } from "@/shared/lib/utils";

const DesktopNav = () => {
  const location = usePathname();
  const isActive = (path: string) => location === path;

  return (
    <div className="hidden lg:flex items-center space-x-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
                isActive('/') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              )}
            >
              <Link href="/">Início</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
                isActive('/sobre') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              )}
            >
              <Link href="/sobre">Sobre</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
                isActive('/servicos') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              )}
            >
              <Link href="/servicos">Serviços</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
                isActive('/experiencia-cliente') || isActive('/testemunhos') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              )}
            >
              <Link href="/experiencia-cliente">Experiência do Cliente</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "text-sm xl:text-base font-medium px-3 xl:px-4 py-2",
                isActive('/conteudos') || isActive('/blog') ? 'text-blue-900 bg-blue-900/10' : 'text-gray-700 hover:text-blue-900 hover:bg-gray-50'
              )}
            >
              <Link href="/conteudos">Conteúdos</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Link href="/contacto" className="ml-4">
        <Button
          size="lg"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 xl:px-6 py-2 xl:py-2.5 text-sm xl:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          Contacto
        </Button>
      </Link>
    </div>
  );
};

export default DesktopNav;
