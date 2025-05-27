
import React from 'react';
import PageHero from './PageHero';
import { Award, Users, Star } from 'lucide-react';

const AboutHero = () => {
  const stats = [
    { icon: Users, label: 'Profissionais Formados', value: '500+' },
    { icon: Star, label: 'Taxa de Satisfação', value: '95%' },
    { icon: Award, label: 'Anos de Experiência', value: '10+' },
  ];

  return (
    <PageHero
      title="Sobre a Beasell"
      subtitle="Especialistas em Formação Comercial"
      description="Conheça a história da empresa líder em formação de vendas em Angola e da formadora Beatriz Chavier, especialista reconhecida no desenvolvimento de competências comerciais."
      className="bg-gradient-to-br from-blue-50 to-orange-50"
    >
      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="bg-gradient-to-br from-blue-900 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="text-3xl font-bold text-blue-900 mb-2">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </PageHero>
  );
};

export default AboutHero;
