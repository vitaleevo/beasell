
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { CheckCircle, Clock, ArrowRight, LucideIcon } from 'lucide-react';

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
    <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col overflow-hidden rounded-2xl bg-white relative">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1A2A49] via-[#F39200] to-[#1A2A49] opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Floating Icon Badge */}
        <div className="absolute top-4 left-4 bg-gradient-to-br from-[#1A2A49] to-[#2a3f6e] p-3 rounded-xl shadow-lg backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#F39200]" />
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg">
          <span className="font-bold text-[#1A2A49] text-sm">{price}</span>
        </div>
      </div>

      {/* Header Section */}
      <CardHeader className="p-4 sm:p-5 lg:p-6 pb-2 sm:pb-3">
        <CardTitle className="text-lg sm:text-xl lg:text-[22px] text-[#1A2A49] leading-tight font-bold group-hover:text-[#F39200] transition-colors duration-300">
          {title}
        </CardTitle>
        <p className="text-sm sm:text-base text-gray-500 leading-relaxed mt-2">
          {description}
        </p>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-4 sm:p-5 lg:p-6 pt-0 flex-1 flex flex-col justify-between">
        <div className="space-y-4 mb-5">
          {/* Features List */}
          <ul className="space-y-2.5">
            {features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2.5 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
            {features.length > 4 && (
              <li className="text-sm text-[#F39200] font-semibold pl-6">
                +{features.length - 4} mais módulos
              </li>
            )}
          </ul>

          {/* Duration Info */}
          <div className="flex items-center text-sm text-gray-400 pt-3 border-t border-gray-100">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="leading-tight">{duration}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="w-full bg-gradient-to-r from-[#F39200] to-[#e08500] hover:from-[#d68000] hover:to-[#c77600] text-white py-3 text-base font-semibold transition-all duration-300 rounded-xl shadow-md hover:shadow-lg group/btn"
          onClick={() => onAction(serviceType)}
        >
          Saber Mais
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
