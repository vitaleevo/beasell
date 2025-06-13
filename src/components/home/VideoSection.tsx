
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle } from 'lucide-react';

const VideoSection = () => {
  const features = [
    "Técnicas adaptadas ao mercado angolano",
    "Foco em resultados mensuráveis",
    "Acompanhamento pós-formação",
    "Certificação reconhecida"
  ];

  return (
    <section className="py-12 sm:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Veja a Beasell em Ação
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra como transformamos profissionais através da nossa metodologia única
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl mx-auto">
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                <p className="text-gray-600">Vídeo em breve</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-4 rounded-xl shadow-xl">
              <Play className="h-6 w-6" />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Metodologia Comprovada
            </h3>
            <p className="text-base sm:text-lg text-gray-600">
              Nossa abordagem combina teoria e prática para garantir resultados reais e duradouros
            </p>
            
            <div className="space-y-4">
              {features.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Assistir Mais Vídeos
              <Play className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
