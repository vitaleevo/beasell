
import React from 'react';
import { Phone, Mail } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 hidden sm:block">
      <div className="container mx-auto px-4 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <div className="flex items-center space-x-2">
            <Phone className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="text-xs lg:text-sm">+244 926 238 518</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-3 w-3 lg:h-4 lg:w-4" />
            <span className="text-xs lg:text-sm">info@beasell.ao</span>
          </div>
        </div>
        <div className="hidden md:block text-xs lg:text-sm">
          <span>Luanda, Angola</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
