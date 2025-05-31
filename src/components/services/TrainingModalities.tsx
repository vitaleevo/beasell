
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, HeadphonesIcon, Users } from 'lucide-react';

interface TrainingModalitiesProps {
  onAction: (serviceType: string) => void;
}

const TrainingModalities = ({ onAction }: TrainingModalitiesProps) => {
  return (
    <div className="mt-12 sm:mt-16 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <div className="order-2 lg:order-1">
        <img
          src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
          alt="Formação prática em vendas"
          className="w-full h-auto rounded-lg sm:rounded-xl shadow-lg"
        />
      </div>
      <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">Modalidades de Formação</h3>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Presencial</h4>
              <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">Formações no nosso centro em Luanda ou nas suas instalações</p>
            </div>
          </div>
          <div className="flex items-start">
            <HeadphonesIcon className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Online</h4>
              <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">Sessões virtuais interactivas com a mesma qualidade</p>
            </div>
          </div>
          <div className="flex items-start">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 text-sm sm:text-base">In-Company</h4>
              <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">Formações customizadas na sua empresa</p>
            </div>
          </div>
        </div>
        <div className="pt-2 sm:pt-4">
          <Button 
            size="lg" 
            className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white py-3 px-6 text-sm sm:text-base"
            onClick={() => onAction('modalidade')}
          >
            Solicitar Orçamento
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrainingModalities;
