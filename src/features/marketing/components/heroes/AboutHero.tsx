import React from 'react';
import Image from 'next/image';
import { Award, Users, Star, Target, TrendingUp, Heart } from 'lucide-react';

const AboutHero = () => {
  const stats = [
    { icon: Users, label: 'Profissionais Formados', value: '500+' },
    { icon: Star, label: 'Taxa de Satisfação', value: '95%' },
    { icon: Award, label: 'Anos de Experiência', value: '10+' },
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/lovable-uploads/90bb2b21-bbb6-4c39-9b32-4fdd01333270.png"
          alt="Formação e entrega de certificados Beasell"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2A49]/95 via-[#1A2A49]/85 to-[#1A2A49]/95"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-medium mb-8 border border-white/20 backdrop-blur-sm">
            <Award className="w-4 h-4 text-[#F39200]" />
            Quem Somos
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
            Sobre a <span className="text-[#F39200]">Beasell</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Conheça a história da Beasell, empresa líder em formação de vendas em Angola,
            dedicada ao desenvolvimento de competências comerciais com resultados comprovados.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="group text-center bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/15 hover:-translate-y-2 transition-all duration-300">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-[#F39200]/15 mb-4 group-hover:bg-[#F39200]/25 transition-colors">
                <stat.icon className="h-7 w-7 text-[#F39200]" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="p-3 bg-[#F39200]/15 rounded-xl w-fit mb-5 group-hover:bg-[#F39200]/25 transition-colors">
              <Target className="h-7 w-7 text-[#F39200]" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3">Missão</h3>
            <p className="text-gray-300 leading-relaxed">Capacitar profissionais angolanos com excelência em vendas e consultoria de gestão</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="p-3 bg-[#F39200]/15 rounded-xl w-fit mb-5 group-hover:bg-[#F39200]/25 transition-colors">
              <TrendingUp className="h-7 w-7 text-[#F39200]" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3">Visão</h3>
            <p className="text-gray-300 leading-relaxed">Ser referência em formação comercial e consultoria empresarial em Angola</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="p-3 bg-[#F39200]/15 rounded-xl w-fit mb-5 group-hover:bg-[#F39200]/25 transition-colors">
              <Heart className="h-7 w-7 text-[#F39200]" />
            </div>
            <h3 className="font-bold text-xl text-white mb-3">Valores</h3>
            <p className="text-gray-300 leading-relaxed">Integridade, excelência e compromisso com resultados reais</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
