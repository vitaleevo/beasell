
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, BookOpen } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  modules: string[];
  onAction: (serviceType: string) => void;
}

const CourseCard = ({ title, description, modules, onAction }: CourseCardProps) => {
  return (
    <div className="group relative bg-white p-5 sm:p-6 lg:p-7 rounded-2xl h-full flex flex-col border border-gray-100 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
      {/* Subtle background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A2A49]/[0.02] to-[#F39200]/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1A2A49] to-[#F39200] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="mb-4 sm:mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gradient-to-br from-[#1A2A49] to-[#2a3f6e] rounded-xl">
              <BookOpen className="h-5 w-5 text-[#F39200]" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[#1A2A49] leading-tight group-hover:text-[#F39200] transition-colors duration-300">
              {title}
            </h4>
          </div>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Modules List */}
        <div className="space-y-3 mb-5 sm:mb-6 flex-1">
          <div className="font-semibold text-[#1A2A49] text-xs uppercase tracking-wider">
            Módulos incluídos:
          </div>
          <div className="grid grid-cols-1 gap-2.5">
            {modules.map((module, idx) => (
              <div key={idx} className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-br from-[#F39200] to-amber-400 rounded-full mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <span className="leading-relaxed font-medium">{module}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          className="w-full border-2 border-[#1A2A49] text-[#1A2A49] hover:bg-[#1A2A49] hover:text-white py-3 text-sm sm:text-base font-semibold transition-all duration-300 rounded-xl group/btn"
          onClick={() => onAction('curso')}
        >
          Inscrever-se
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
