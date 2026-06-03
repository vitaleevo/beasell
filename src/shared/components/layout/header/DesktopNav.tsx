"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shared/components/ui/navigation-menu";
import { cn } from "@/shared/lib/utils";

const DesktopNav = () => {
  const location = usePathname();
  const isActive = (path: string) => location === path;

  return (
    <div className="hidden items-center space-x-2 lg:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "px-3 py-2 text-sm font-medium xl:px-4 xl:text-base",
                isActive("/")
                  ? "bg-blue-900/10 text-blue-900"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-900",
              )}
            >
              <Link href="/">Início</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "px-3 py-2 text-sm font-medium xl:px-4 xl:text-base",
                isActive("/sobre")
                  ? "bg-blue-900/10 text-blue-900"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-900",
              )}
            >
              <Link href="/sobre">Sobre</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "px-3 py-2 text-sm font-medium xl:px-4 xl:text-base",
                isActive("/servicos")
                  ? "bg-blue-900/10 text-blue-900"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-900",
              )}
            >
              <Link href="/servicos">Serviços</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "px-3 py-2 text-sm font-medium xl:px-4 xl:text-base",
                isActive("/experiencia-cliente") || isActive("/testemunhos")
                  ? "bg-blue-900/10 text-blue-900"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-900",
              )}
            >
              <Link href="/experiencia-cliente">Experiência do Cliente</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={cn(
                navigationMenuTriggerStyle(),
                "px-3 py-2 text-sm font-medium xl:px-4 xl:text-base",
                isActive("/conteudos") || isActive("/blog")
                  ? "bg-blue-900/10 text-blue-900"
                  : "text-gray-700 hover:bg-gray-50 hover:text-blue-900",
              )}
            >
              <Link href="/conteudos">Conteúdos</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Button
        asChild
        size="lg"
        className="ml-4 bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-orange-600 hover:shadow-xl xl:px-6 xl:py-2.5 xl:text-base"
      >
        <Link href="/contacto">Contacto</Link>
      </Button>
    </div>
  );
};

export default DesktopNav;
