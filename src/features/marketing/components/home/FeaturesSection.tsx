
import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Target, Users, Trophy } from 'lucide-react';
import Link from 'next/link';

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Formação Especializada",
      description: "Metodologia única adaptada ao mercado angolano"
    },
    {
      icon: Users,
      title: "Experiência Comprovada",
      description: "Mais de 500 profissionais formados com sucesso"
    },
    {
      icon: Trophy,
      title: "Resultados Garantidos",
      description: "95% de taxa de satisfação dos nossos formandos"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Por que escolher a Beasell?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Somos especialistas em transformar profissionais em vendedores de excelência
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in group border border-gray-100">
                <div className="bg-[#1A2A49] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#1A2A49] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center max-w-7xl mx-auto">
          <Link href="/servicos">
            <Button size="lg" className="bg-[#1A2A49] hover:bg-[#1A2A49]/90 text-white px-8 py-6 h-auto text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105">
              Ver Todos os Serviços
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
