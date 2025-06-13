
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSelector from '@/components/ui/language-selector';

const DesktopNav = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const isActive = (path: string) => location.pathname === path;

  return (
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
                {t('navigation.home')}
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
                {t('navigation.about')}
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
                {t('navigation.services')}
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
                {t('navigation.testimonials')}
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
                {t('navigation.blog')}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
      {/* Language Selector */}
      <div className="ml-2">
        <LanguageSelector variant="compact" />
      </div>
      
      <Link to="/contacto" className="ml-4">
        <Button 
          size="lg" 
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 xl:px-6 py-2 xl:py-2.5 text-sm xl:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          {t('navigation.contact')}
        </Button>
      </Link>
    </div>
  );
};

export default DesktopNav;
