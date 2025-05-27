
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
    <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-xl">
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2 mb-6">
        <div className="font-semibold text-blue-900 text-sm">Módulos:</div>
        {modules.map((module, idx) => (
          <div key={idx} className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
            {module}
          </div>
        ))}
      </div>
      <Button 
        variant="outline" 
        className="w-full border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
        onClick={() => onAction('curso')}
      >
        Inscrever-se
      </Button>
    </div>
  );
};

export default CourseCard;
