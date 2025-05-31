
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
      className="bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-orange text-white relative overflow-hidden min-h-[80vh]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-brand-orange/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-500"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 relative z-10">
        {categories.map((category, index) => (
          <div key={index} className="group">
            <div className={`${category.bgColor} backdrop-blur-sm p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 border border-white/20`}>
              <div className={`bg-gradient-to-br ${category.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-xl`}>
                <category.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-4">{category.title}</h3>
              <p className="text-blue-200 leading-relaxed">{category.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional features */}
      <div className="flex flex-wrap justify-center gap-6 mt-16 relative z-10">
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border border-white/20">
          <Zap className="h-6 w-6 text-yellow-400 mr-3" />
          <span className="font-medium">Acompanhamento Prático</span>
        </div>
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border border-white/20">
          <Target className="h-6 w-6 text-green-400 mr-3" />
          <span className="font-medium">Foco em Resultados</span>
        </div>
        <div className="flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border border-white/20">
          <BookOpen className="h-6 w-6 text-blue-400 mr-3" />
          <span className="font-medium">Materiais Adaptados</span>
        </div>
      </div>
    </PageHero>
  );
};

export default ServicesHero;
