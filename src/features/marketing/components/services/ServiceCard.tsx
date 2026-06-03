import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";
import { CheckCircle, Clock, ArrowRight, LucideIcon } from "lucide-react";

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
  onAction,
}: ServiceCardProps) => {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-0 bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      {/* Top accent bar */}
      <div className="absolute top-0 right-0 left-0 z-10 h-1 bg-gradient-to-r from-[#1A2A49] via-[#F39200] to-[#1A2A49] opacity-60 transition-opacity duration-500 group-hover:opacity-100"></div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <RemoteImageFrame
          src={image}
          alt={title}
          className="h-full w-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Floating Icon Badge */}
        <div className="absolute top-4 left-4 rounded-xl border border-white/10 bg-gradient-to-br from-[#1A2A49] to-[#2a3f6e] p-3 shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5 text-[#F39200] sm:h-6 sm:w-6" />
        </div>

        {/* Price Badge */}
        <div className="absolute right-4 bottom-4 rounded-full bg-white/95 px-4 py-1.5 shadow-lg backdrop-blur-sm">
          <span className="text-sm font-bold text-[#1A2A49]">{price}</span>
        </div>
      </div>

      {/* Header Section */}
      <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-3 lg:p-6">
        <CardTitle className="text-lg leading-tight font-bold text-[#1A2A49] transition-colors duration-300 group-hover:text-[#F39200] sm:text-xl lg:text-[22px]">
          {title}
        </CardTitle>
        <p className="mt-2 text-sm leading-relaxed text-gray-500 sm:text-base">{description}</p>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="flex flex-1 flex-col justify-between p-4 pt-0 sm:p-5 lg:p-6">
        <div className="mb-5 space-y-4">
          {/* Features List */}
          <ul className="space-y-2.5">
            {features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start text-sm text-gray-600">
                <CheckCircle className="mt-0.5 mr-2.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
            {features.length > 4 && (
              <li className="pl-6 text-sm font-semibold text-[#F39200]">
                +{features.length - 4} mais módulos
              </li>
            )}
          </ul>

          {/* Duration Info */}
          <div className="flex items-center border-t border-gray-100 pt-3 text-sm text-gray-400">
            <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="leading-tight">{duration}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          className="group/btn w-full rounded-xl bg-gradient-to-r from-[#F39200] to-[#e08500] py-3 text-base font-semibold text-white shadow-md transition-all duration-300 hover:from-[#d68000] hover:to-[#c77600] hover:shadow-lg"
          onClick={() => onAction(serviceType)}
        >
          Saber Mais
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
