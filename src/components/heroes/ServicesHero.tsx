
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
      className="bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-orange text-white relative overflow-hidden min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh]"
    >
      {/* Background Elements - Mobile Optimized */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-2 sm:top-5 lg:top-10 left-2 sm:left-5 lg:left-10 w-20 sm:w-40 lg:w-80 h-20 sm:h-40 lg:h-80 bg-brand-orange/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-2 sm:bottom-5 lg:bottom-10 right-2 sm:right-5 lg:right-10 w-16 sm:w-32 lg:w-64 h-16 sm:h-32 lg:h-64 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-500"></div>
      </div>

      {/* Categories Grid - Mobile First */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-6 sm:mt-10 lg:mt-16 relative z-10 px-2 sm:px-0">
        {categories.map((category, index) => (
          <div key={index} className="group">
            <div className={`${category.bgColor} backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2 border border-white/20`}>
              {/* Icon - Mobile Optimized */}
              <div className={`bg-gradient-to-br ${category.color} w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 lg:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                <category.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white" />
              </div>
              
              {/* Title - Mobile Optimized */}
              <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1.5 sm:mb-2 lg:mb-3 text-center leading-tight">
                {category.title}
              </h3>
              
              {/* Description - Mobile Optimized */}
              <p className="text-blue-200 leading-relaxed text-xs sm:text-sm lg:text-base text-center line-clamp-3">
                {category.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Features Tags - Mobile Optimized */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mt-6 sm:mt-8 lg:mt-12 relative z-10 px-2">
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 rounded-full shadow-lg border border-white/20">
          <Zap className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-yellow-400 mr-1.5 sm:mr-2" />
          <span className="font-medium text-xs sm:text-sm lg:text-base whitespace-nowrap">Acompanhamento Prático</span>
        </div>
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 rounded-full shadow-lg border border-white/20">
          <Target className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-400 mr-1.5 sm:mr-2" />
          <span className="font-medium text-xs sm:text-sm lg:text-base whitespace-nowrap">Foco em Resultados</span>
        </div>
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-2.5 sm:px-4 lg:px-6 py-1.5 sm:py-2 lg:py-3 rounded-full shadow-lg border border-white/20">
          <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-blue-400 mr-1.5 sm:mr-2" />
          <span className="font-medium text-xs sm:text-sm lg:text-base whitespace-nowrap">Materiais Adaptados</span>
        </div>
      </div>
    </PageHero>
  );
};

export default ServicesHero;
