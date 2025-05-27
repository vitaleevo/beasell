
import React from 'react';
import PageHero from './PageHero';
import { Award, Users, Star, Target, TrendingUp, Heart } from 'lucide-react';

const AboutHero = () => {
  const stats = [
    { icon: Users, label: 'Profissionais Formados', value: '500+', color: 'from-brand-blue to-brand-blue-600' },
    { icon: Star, label: 'Taxa de Satisfação', value: '95%', color: 'from-brand-orange to-brand-orange-600' },
    { icon: Award, label: 'Anos de Experiência', value: '10+', color: 'from-green-500 to-emerald-600' },
  ];

  return (
    <PageHero
      title="Sobre a Beasell"
      subtitle="Especialistas em Formação Comercial"
      description="Conheça a história da empresa líder em formação de vendas em Angola e da formadora Beatriz Chavier, especialista reconhecida no desenvolvimento de competências comerciais."
      backgroundImage="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      className="bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-orange text-white relative overflow-hidden min-h-[80vh]"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-80 h-80 bg-brand-orange/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-pulse delay-1000"></div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-20 relative z-10">
        {stats.map((stat, index) => (
          <div key={index} className="group bg-white/15 backdrop-blur-sm p-10 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-white/20">
            <div className={`bg-gradient-to-br ${stat.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
              <stat.icon className="h-10 w-10 text-white" />
            </div>
            <div className="text-5xl font-bold mb-4">{stat.value}</div>
            <div className="text-blue-200 font-medium text-lg">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Mission, Vision, Values */}
      <div className="grid md:grid-cols-3 gap-8 mt-16 relative z-10">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <Target className="h-10 w-10 text-brand-orange mb-4" />
          <h3 className="font-bold text-xl mb-3">Missão</h3>
          <p className="text-blue-200">Capacitar profissionais angolanos com excelência em vendas</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <TrendingUp className="h-10 w-10 text-green-400 mb-4" />
          <h3 className="font-bold text-xl mb-3">Visão</h3>
          <p className="text-blue-200">Ser referência em formação comercial em Angola</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <Heart className="h-10 w-10 text-red-400 mb-4" />
          <h3 className="font-bold text-xl mb-3">Valores</h3>
          <p className="text-blue-200">Integridade, excelência e compromisso com resultados</p>
        </div>
      </div>
    </PageHero>
  );
};

export default AboutHero;
