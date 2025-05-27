
import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, HeadphonesIcon, Users } from 'lucide-react';

interface TrainingModalitiesProps {
  onAction: (serviceType: string) => void;
}

const TrainingModalities = ({ onAction }: TrainingModalitiesProps) => {
  return (
    <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <img
          src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
          alt="Formação prática em vendas"
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>
      <div className="space-y-6">
        <h3 className="text-3xl font-bold text-gray-900">Modalidades de Formação</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="h-6 w-6 text-orange-500 mr-3 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900">Presencial</h4>
              <p className="text-gray-600">Formações no nosso centro em Luanda ou nas suas instalações</p>
            </div>
          </div>
          <div className="flex items-start">
            <HeadphonesIcon className="h-6 w-6 text-orange-500 mr-3 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900">Online</h4>
              <p className="text-gray-600">Sessões virtuais interactivas com a mesma qualidade</p>
            </div>
          </div>
          <div className="flex items-start">
            <Users className="h-6 w-6 text-orange-500 mr-3 mt-1" />
            <div>
              <h4 className="font-semibold text-gray-900">In-Company</h4>
              <p className="text-gray-600">Formações customizadas na sua empresa</p>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <Button 
            size="lg" 
            className="bg-blue-900 hover:bg-blue-800 text-white"
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
