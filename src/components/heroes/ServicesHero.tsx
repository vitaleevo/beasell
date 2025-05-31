
import React from 'react';
import PageHero from './PageHero';
import { Building2, Users, TrendingUp, BookOpen, Target, Zap } from 'lucide-react';

const ServicesHero = () => {
  const categories = [
    { 
      icon: Building2, 
      title: 'Consultoria em Gestão', 
      description: 'Diagnóstico e reestruturação para melhorar eficiência',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-white/15'
    },
    { 
      icon: Users, 
      title: 'Treinamento de Vendedores', 
      description: 'Capacitação para equipas comerciais de alta performance',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-white/15'
    },
    { 
      icon: TrendingUp, 
      title: 'Prospecção Comercial', 
      description: 'Estratégias para aumentar carteira de clientes',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-white/15'
    },
    { 
      icon: BookOpen, 
      title: 'Formação PMEs', 
      description: 'Preparação completa para pequenos empreendedores',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-white/15'
    },
  ];

  return (
    <PageHero
      title="Nossos Serviços"
      subtitle="Consultoria e Formação Especializada"
      description="Soluções completas para pequenos empreendedores, equipas comerciais e organizações em crescimento, com foco em resultados práticos e acompanhamento de proximidade."
      backgroundImage="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      className="bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-orange text-white relative overflow-hidden min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-brand-orange/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-500"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-10 sm:mt-16 lg:mt-20 relative z-10">
        {categories.map((category, index) => (
          <div key={index} className="group">
            <div className={`${category.bgColor} backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-xl lg:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-4 border border-white/20`}>
              <div className={`bg-gradient-to-br ${category.color} w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl`}>
                <category.icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
              </div>
              <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-2 sm:mb-3 lg:mb-4 text-center">{category.title}</h3>
              <p className="text-blue-200 leading-relaxed text-xs sm:text-sm lg:text-base text-center">{category.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional features */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mt-8 sm:mt-12 lg:mt-16 relative z-10">
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full shadow-xl border border-white/20">
          <Zap className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-yellow-400 mr-2 sm:mr-3" />
          <span className="font-medium text-xs sm:text-sm lg:text-base">Acompanhamento Prático</span>
        </div>
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full shadow-xl border border-white/20">
          <Target className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-green-400 mr-2 sm:mr-3" />
          <span className="font-medium text-xs sm:text-sm lg:text-base">Foco em Resultados</span>
        </div>
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-full shadow-xl border border-white/20">
          <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-400 mr-2 sm:mr-3" />
          <span className="font-medium text-xs sm:text-sm lg:text-base">Materiais Adaptados</span>
        </div>
      </div>
    </PageHero>
  );
};

export default ServicesHero;
