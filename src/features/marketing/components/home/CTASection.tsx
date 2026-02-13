"use client";

import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Phone, Mail, MapPin, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-24 bg-[#1A2A49] text-white w-full relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#F39200]/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium mb-8 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-[#F39200]" />
            Pronto para o Próximo Nível?
          </div>

          <h2 className="text-3xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
            Pronto para Transformar o <br className="hidden md:block" />
            <span className="text-[#F39200]">Seu Negócio?</span>
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-blue-100/80 max-w-3xl mx-auto leading-relaxed">
            Junte-se a centenas de empresas que já alcançaram novos patamares de lucro e eficiência através da nossa consultoria especializada em Angola.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
            <Link href="/contacto" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-[#F39200] text-white hover:bg-[#d68000] px-10 py-7 h-auto text-lg font-bold rounded-2xl shadow-2xl shadow-orange-900/40 transition-all hover:scale-105 group/btn">
                Começar Agora
                <ArrowRight className="ml-2 h-6 w-6 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/servicos" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white/10 px-10 py-7 h-auto text-lg font-bold rounded-2xl bg-white/5 backdrop-blur-sm transition-all hover:border-white/40">
                Ver Nossos Serviços
                <BookOpen className="ml-2 h-6 w-6 opacity-70" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-white/10">
            <div className="flex items-center justify-center space-x-3 text-white/80 hover:text-white transition-colors cursor-default group">
              <div className="bg-white/10 p-2.5 rounded-xl group-hover:bg-[#F39200]/20 transition-colors">
                <Phone className="h-5 w-5 text-[#F39200]" />
              </div>
              <span className="font-medium">(+244) 930 010 002</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/80 hover:text-white transition-colors cursor-default group">
              <div className="bg-white/10 p-2.5 rounded-xl group-hover:bg-[#F39200]/20 transition-colors">
                <Mail className="h-5 w-5 text-[#F39200]" />
              </div>
              <span className="font-medium text-lg">info@beasell.ao</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-white/80 hover:text-white transition-colors cursor-default group">
              <div className="bg-white/10 p-2.5 rounded-xl group-hover:bg-[#F39200]/20 transition-colors">
                <MapPin className="h-5 w-5 text-[#F39200]" />
              </div>
              <span className="font-medium">Luanda, Angola</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
