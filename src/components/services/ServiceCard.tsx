
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
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
      <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 p-2 rounded-lg">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-900" />
        </div>
      </div>
      
      <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
        <CardTitle className="text-lg sm:text-xl text-gray-900 leading-tight">{title}</CardTitle>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 pt-0 flex-1 flex flex-col justify-between">
        <div className="space-y-3 sm:space-y-4 mb-4">
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm gap-2">
            <div className="flex items-center text-gray-500">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
              <span className="leading-tight">{duration}</span>
            </div>
            <div className="font-semibold text-blue-900 text-sm sm:text-base">
              {price}
            </div>
          </div>
        </div>
        
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 sm:py-3 text-sm sm:text-base"
          onClick={() => onAction(serviceType)}
        >
          Saber Mais
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
