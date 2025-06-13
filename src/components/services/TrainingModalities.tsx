
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, HeadphonesIcon, Users } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

interface TrainingModalitiesProps {
  onAction: (serviceType: string) => void;
}

const TrainingModalities = ({ onAction }: TrainingModalitiesProps) => {
  const { t } = useLanguage();

  const modalities = [
    {
      icon: MapPin,
      title: t('services.presential'),
      description: t('services.presential_desc'),
      color: 'orange'
    },
    {
      icon: HeadphonesIcon,
      title: t('services.online'),
      description: t('services.online_desc'),
      color: 'blue'
    },
    {
      icon: Users,
      title: t('services.incompany'),
      description: t('services.incompany_desc'),
      color: 'green'
    }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
      {/* Image Section - Mobile Optimized */}
      <div className="order-2 lg:order-1">
        <div className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-lg">
          <img
            src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
            alt="Formação prática em vendas"
            className="w-full h-48 sm:h-56 md:h-64 lg:h-auto object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
      
      {/* Content Section - Mobile Optimized */}
      <div className="space-y-4 sm:space-y-5 lg:space-y-6 order-1 lg:order-2 px-2 sm:px-0">
        <div className="text-center lg:text-left">
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            {t('services.modalities_title')}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            {t('services.modalities_description')}
          </p>
        </div>
        
        {/* Modalities List - Mobile Optimized */}
        <div className="space-y-3 sm:space-y-4">
          {modalities.map((modality, index) => (
            <div key={index} className="flex items-start p-3 sm:p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className={`bg-${modality.color}-100 p-2 sm:p-2.5 rounded-lg mr-3 sm:mr-4 flex-shrink-0`}>
                <modality.icon className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-${modality.color}-600`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg mb-1">
                  {modality.title}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                  {modality.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Button - Mobile Optimized */}
        <div className="pt-2 sm:pt-4 text-center lg:text-left">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 sm:px-8 text-sm sm:text-base font-medium transition-all duration-200 touch-manipulation"
            onClick={() => onAction('modalidade')}
          >
            {t('services.request_quote')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingModalities;
