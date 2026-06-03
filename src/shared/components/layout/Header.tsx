"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TopBar from "./header/TopBar";
import DesktopNav from "./header/DesktopNav";
import TabletNav from "./header/TabletNav";
import MobileNav from "./header/MobileNav";
import UserNav from "./header/UserNav";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 z-50 hidden w-full border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm md:block">
        <TopBar />
        <nav className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-3 lg:py-4">
            <Link href="/" className="flex flex-shrink-0 items-center space-x-2">
              <div className="relative h-8 w-32 sm:h-10 sm:w-40 md:h-12 md:w-48 lg:h-14 lg:w-56">
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
            <div className="ml-4 hidden items-center md:flex">
              <UserNav />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Top Header - Single line minimal */}
      <header className="fixed top-0 right-0 left-0 z-50 flex h-[60px] items-center justify-between border-b border-gray-50 bg-white/90 px-4 backdrop-blur-md md:hidden">
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
