
import React from 'react';
import { Button } from '@/components/ui/button';

interface CourseCardProps {
  title: string;
  description: string;
  modules: string[];
  onAction: (serviceType: string) => void;
}

const CourseCard = ({ title, description, modules, onAction }: CourseCardProps) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl h-full flex flex-col border border-blue-100/50 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Header - Mobile Optimized */}
      <div className="mb-3 sm:mb-4">
        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
          {title}
        </h4>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed flex-1">
          {description}
        </p>
      </div>
      
      {/* Modules List - Mobile Optimized */}
      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 lg:mb-6 flex-1">
        <div className="font-semibold text-blue-900 text-xs sm:text-sm lg:text-base">
          Módulos:
        </div>
        <div className="grid grid-cols-1 gap-2">
          {modules.map((module, idx) => (
            <div key={idx} className="flex items-start text-xs sm:text-sm lg:text-base text-gray-700">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">{module}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Action Button - Mobile Optimized */}
      <Button 
        variant="outline" 
        className="w-full border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 touch-manipulation"
        onClick={() => onAction('curso')}
      >
        Inscrever-se
      </Button>
    </div>
  );
};

export default CourseCard;
