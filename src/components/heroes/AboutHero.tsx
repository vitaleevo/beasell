
import React from 'react';
import PageHero from './PageHero';
import { Award, Users, Star, Target, TrendingUp, Heart } from 'lucide-react';

const AboutHero = () => {
  const stats = [
    { icon: Users, label: 'Profissionais Formados', value: '500+', color: 'from-blue-500 to-blue-600' },
    { icon: Star, label: 'Taxa de Satisfação', value: '95%', color: 'from-yellow-500 to-orange-500' },
    { icon: Award, label: 'Anos de Experiência', value: '10+', color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <PageHero
      title="Sobre a Beasell"
      subtitle="Especialistas em Formação Comercial"
      description="Conheça a história da empresa líder em formação de vendas em Angola e da formadora Beatriz Chavier, especialista reconhecida no desenvolvimento de competências comerciais."
      className="bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden min-h-[70vh]"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16 relative z-10">
        {stats.map((stat, index) => (
          <div key={index} className="group bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className={`bg-gradient-to-br ${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="h-8 w-8 text-white" />
            </div>
            <div className="text-4xl font-bold text-gray-900 mb-3">{stat.value}</div>
            <div className="text-gray-600 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Additional mission elements */}
      <div className="grid md:grid-cols-3 gap-6 mt-12 relative z-10">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl border border-blue-200">
          <Target className="h-8 w-8 text-blue-600 mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">Missão</h3>
          <p className="text-sm text-gray-600">Capacitar profissionais angolanos com excelência em vendas</p>
        </div>
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-6 rounded-xl border border-orange-200">
          <TrendingUp className="h-8 w-8 text-orange-600 mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">Visão</h3>
          <p className="text-sm text-gray-600">Ser referência em formação comercial em Angola</p>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-xl border border-green-200">
          <Heart className="h-8 w-8 text-green-600 mb-3" />
          <h3 className="font-bold text-gray-900 mb-2">Valores</h3>
          <p className="text-sm text-gray-600">Integridade, excelência e compromisso com resultados</p>
        </div>
      </div>
    </PageHero>
  );
};

export default AboutHero;
