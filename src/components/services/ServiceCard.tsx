
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  image: string;
  serviceType: string;
  onAction: (serviceType: string) => void;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
  price,
  duration,
  image,
  serviceType,
  onAction
}: ServiceCardProps) => {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2 h-full flex flex-col overflow-hidden">
      {/* Image Container - Mobile Optimized with better positioning */}
      <div className="relative h-32 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-top"
          style={{ objectPosition: '50% 20%' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent"></div>
        <div className="absolute top-2 sm:top-3 lg:top-4 left-2 sm:left-3 lg:left-4 bg-white/95 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg shadow-lg">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-900" />
        </div>
      </div>
      
      {/* Header Section - Mobile Optimized */}
      <CardHeader className="p-3 sm:p-4 lg:p-6 pb-2 sm:pb-3">
        <CardTitle className="text-base sm:text-lg lg:text-xl text-gray-900 leading-tight line-clamp-2">
          {title}
        </CardTitle>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-3 mt-1 sm:mt-2">
          {description}
        </p>
      </CardHeader>
      
      {/* Content Section - Mobile Optimized */}
      <CardContent className="p-3 sm:p-4 lg:p-6 pt-0 flex-1 flex flex-col justify-between">
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5">
          {/* Features List - Mobile Optimized */}
          <ul className="space-y-1.5 sm:space-y-2">
            {features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed line-clamp-2">{feature}</span>
              </li>
            ))}
            {features.length > 4 && (
              <li className="text-xs sm:text-sm text-blue-600 font-medium pl-5 sm:pl-6">
                +{features.length - 4} mais módulos
              </li>
            )}
          </ul>
          
          {/* Pricing Info - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-2 sm:gap-3 pt-2 border-t border-gray-100">
            <div className="flex items-center text-gray-500">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
              <span className="leading-tight line-clamp-2">{duration}</span>
            </div>
            <div className="font-bold text-blue-900 text-sm sm:text-base">
              {price}
            </div>
          </div>
        </div>
        
        {/* Action Button - Mobile Optimized */}
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 touch-manipulation"
          onClick={() => onAction(serviceType)}
        >
          Saber Mais
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
