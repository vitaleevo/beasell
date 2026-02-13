"use client";


import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import TopBar from './header/TopBar';
import DesktopNav from './header/DesktopNav';
import TabletNav from './header/TabletNav';
import MobileNav from './header/MobileNav';
import UserNav from './header/UserNav';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="hidden md:block fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        <TopBar />
        <nav className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-3 lg:py-4">
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
              <div className="relative h-8 sm:h-10 md:h-12 lg:h-14 w-32 sm:w-40 md:w-48 lg:w-56">
                <Image
                  src="/lovable-uploads/06b8610c-4417-45a9-a695-12f10b09eeab.png"
                  alt="Beasell Logo"
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 224px"
                />
              </div>
            </Link>
            <DesktopNav />
            <TabletNav />
            <div className="hidden md:flex items-center ml-4">
              <UserNav />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Top Header - Single line minimal */}
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-50 h-[60px] flex items-center px-4 justify-between">
        <Link href="/">
          <Image
            src="/lovable-uploads/06b8610c-4417-45a9-a695-12f10b09eeab.png"
            alt="Beasell Logo"
            width={120}
            height={35}
            className="object-contain"
          />
        </Link>
        <div className="flex items-center gap-3">
          <UserNav />
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;
