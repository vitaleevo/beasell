
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            Por que escolher a <span className="text-blue-900">Beasell</span>?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Somos especialistas em transformar profissionais em vendedores de excelência
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="bg-gradient-to-br from-blue-900 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center max-w-7xl mx-auto">
          <Link to="/servicos">
            <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg hover:scale-105 transform transition-all duration-200">
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
