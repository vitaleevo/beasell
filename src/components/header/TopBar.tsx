
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="bg-blue-900 text-white py-1.5 sm:py-2 text-xs sm:text-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 lg:gap-6">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400 flex-shrink-0" />
              <a 
                href="tel:+244930010002" 
                className="text-white hover:text-orange-300 transition-colors"
              >
                (+244) 930 010 002
              </a>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400 flex-shrink-0" />
              <a 
                href="mailto:info@beasell.ao" 
                className="text-white hover:text-orange-300 transition-colors"
              >
                info@beasell.ao
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400 flex-shrink-0" />
            <span className="text-white">Luanda, Angola</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
