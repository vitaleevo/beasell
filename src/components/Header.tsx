
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopBar from './header/TopBar';
import DesktopNav from './header/DesktopNav';
import TabletNav from './header/TabletNav';
import MobileNav from './header/MobileNav';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
        {/* Top bar with contact info */}
        <TopBar />

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
            <DesktopNav />

            {/* Tablet Navigation */}
            <TabletNav />

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

      {/* Mobile Navigation Overlay */}
      <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </>
  );
};

export default Header;
