"use client";

import React from 'react';
import Image from 'next/image';
import { Quote, Star, Heart, Award, Users, Sparkles, MessageCircle } from 'lucide-react';

const CustomerExperienceHero = () => {
  const featuredTestimonial = {
    name: 'Carlos Mendes',
    role: 'Director Comercial',
    company: 'Empresa Telecomunicações',
    content: 'A formação com a Beasell transformou completamente nossa equipa de vendas. Em apenas 3 meses, observamos um crescimento real e mensurável na nossa performance comercial.',
    rating: 5,
  };

  const stats = [
    { icon: Heart, label: 'Experiência Positiva', value: '95%', color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { icon: Award, label: 'Aumento em Vendas', value: '40%', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { icon: Users, label: 'Profissionais Felizes', value: '500+', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Deep Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/lovable-uploads/90bb2b21-bbb6-4c39-9b32-4fdd01333270.png"
          alt="Clientes Beasell em Sessão de Formação"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2A49] via-[#1A2A49]/95 to-[#0f1b33]/90"></div>
      </div>

      {/* Decorative Animated Orbs */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-[#F39200]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8 border border-white/20 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#F39200]" />
              Excelência Comprovada
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
              Experiência do <span className="text-[#F39200]">Cliente</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Descubra como os nossos parceiros transformaram os seus negócios e carreiras através da nossa metodologia focada no mercado angolano.
            </p>
          </div>

          {/* Featured Testimonial Card */}
          <div className="relative group max-w-4xl mx-auto mb-20">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#F39200] to-[#E08500] rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-[2rem] p-8 md:p-14 shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-20 hidden md:block">
                <Quote className="w-32 h-32 text-white" />
              </div>

              <div className="flex justify-center md:justify-start mb-8 gap-1">
                {[...Array(featuredTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <blockquote className="text-xl md:text-3xl font-medium text-white mb-10 leading-relaxed italic text-center md:text-left">
                "{featuredTestimonial.content}"
              </blockquote>

              <div className="flex flex-col md:flex-row items-center gap-6 pt-8 border-t border-white/10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#F39200] to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">{featuredTestimonial.name.charAt(0)}</span>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-xl font-bold text-white mb-1">{featuredTestimonial.name}</div>
                  <div className="text-[#F39200] font-medium">{featuredTestimonial.role}</div>
                  <div className="text-gray-400 text-sm">{featuredTestimonial.company}</div>
                </div>
                <div className="md:ml-auto flex items-center gap-3 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                  <MessageCircle className="w-4 h-4 text-[#F39200]" />
                  <span className="text-sm font-medium text-white">Depoimento Verificado</span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-5 p-6 bg-white/[0.05] backdrop-blur-md rounded-2xl border border-white/10 group hover:bg-white/[0.08] transition-all duration-300">
                <div className={`${stat.bg} p-4 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-0.5">{stat.value}</div>
                  <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerExperienceHero;
