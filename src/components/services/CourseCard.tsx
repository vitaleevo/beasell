
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
    <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-4 sm:p-6 rounded-lg sm:rounded-xl h-full flex flex-col">
      <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{title}</h4>
      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed flex-1">{description}</p>
      <div className="space-y-2 mb-4 sm:mb-6">
        <div className="font-semibold text-blue-900 text-xs sm:text-sm">Módulos:</div>
        {modules.map((module, idx) => (
          <div key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full mr-2 sm:mr-3 mt-1.5 sm:mt-2 flex-shrink-0"></div>
            <span className="leading-relaxed">{module}</span>
          </div>
        ))}
      </div>
      <Button 
        variant="outline" 
        className="w-full border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white py-2 sm:py-3 text-sm sm:text-base"
        onClick={() => onAction('curso')}
      >
        Inscrever-se
      </Button>
    </div>
  );
};

export default CourseCard;
