"use client";

import React from 'react';
import Image from 'next/image';
import { Building2, Users, TrendingUp, BookOpen, Target, Zap, Sparkles, ArrowDown } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';

const ServicesHero = () => {
  const categories = [
    {
      icon: Building2,
      title: 'Consultoria em Gestão',
      description: 'Diagnóstico e reestruturação para melhorar eficiência',
      gradient: 'from-blue-500 to-cyan-400',
      delay: '0ms',
    },
    {
      icon: Users,
      title: 'Treinamento de Vendedores',
      description: 'Capacitação para equipas comerciais de alta performance',
      gradient: 'from-emerald-500 to-teal-400',
      delay: '100ms',
    },
    {
      icon: TrendingUp,
      title: 'Prospecção Comercial',
      description: 'Estratégias para aumentar carteira de clientes',
      gradient: 'from-violet-500 to-purple-400',
      delay: '200ms',
    },
    {
      icon: BookOpen,
      title: 'Formação PMEs',
      description: 'Preparação completa para pequenos empreendedores',
      gradient: 'from-[#F39200] to-amber-400',
      delay: '300ms',
    },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
          alt="Beasell Services Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A2A49] via-[#1A2A49]/95 to-[#0f1b33]/90"></div>
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {/* Top-left glow */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#F39200]/10 rounded-full blur-3xl animate-pulse"></div>
        {/* Bottom-right glow */}
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F39200]/5 rounded-full blur-3xl"></div>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-28 pb-16">
        <div className="max-w-5xl mx-auto text-center mb-12 sm:mb-16">
          {/* Subtitle Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-8 border border-white/20 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#F39200]" />
            Consultoria e Formação Especializada
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
            Nossos{' '}
            <span className="relative inline-block">
              <span className="text-[#F39200]">Serviços</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#F39200] to-amber-400 rounded-full opacity-80"></span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Soluções completas para pequenos empreendedores, equipas comerciais e
            organizações em crescimento, com foco em resultados práticos e acompanhamento de proximidade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/contacto?service=consultoria">
              <Button size="lg" className="bg-[#F39200] hover:bg-[#d68000] text-white px-8 py-6 h-auto text-lg font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-900/30">
                Solicitar Orçamento
                <Target className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="#servicos">
              <Button size="lg" variant="outline" className="border-2 border-white/30 hover:bg-white/10 px-8 py-6 h-auto text-lg text-white font-semibold rounded-full backdrop-blur-sm transition-all">
                Explorar Serviços
                <ArrowDown className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative"
              style={{ animationDelay: category.delay }}
            >
              <div className="relative bg-white/[0.07] backdrop-blur-md p-5 sm:p-6 lg:p-7 rounded-2xl border border-white/[0.12] hover:border-white/25 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                {/* Card Hover Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 rounded-2xl`}></div>

                {/* Icon */}
                <div className={`bg-gradient-to-br ${category.gradient} w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <category.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="font-bold text-base sm:text-lg mb-2 text-center text-white leading-tight">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-sm text-center group-hover:text-gray-300 transition-colors">
                  {category.description}
                </p>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Tags */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-10 sm:mt-14">
          {[
            { icon: Zap, label: 'Acompanhamento Prático', color: 'text-yellow-400' },
            { icon: Target, label: 'Foco em Resultados', color: 'text-emerald-400' },
            { icon: BookOpen, label: 'Materiais Adaptados', color: 'text-sky-400' },
          ].map((tag, index) => (
            <div
              key={index}
              className="flex items-center bg-white/[0.07] backdrop-blur-md px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              <tag.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${tag.color} mr-2`} />
              <span className="font-medium text-sm sm:text-base text-white/90">{tag.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
