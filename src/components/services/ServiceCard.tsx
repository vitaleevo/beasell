
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
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg">
          <Icon className="h-6 w-6 text-blue-900" />
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-xl text-gray-900">{title}</CardTitle>
        <p className="text-gray-600">{description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {duration}
          </div>
          <div className="font-semibold text-blue-900">
            {price}
          </div>
        </div>
        
        <Button 
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          onClick={() => onAction(serviceType)}
        >
          Saber Mais
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
