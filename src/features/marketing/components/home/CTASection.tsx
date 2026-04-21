"use client";

import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Phone, Mail, MapPin, BookOpen, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CTASection = () => {
  return (
    <section className="py-32 bg-brand-blue-900 text-white w-full relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-brand-orange-500/20 rounded-full blur-[120px]"
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
        ></motion.div>
        
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-white text-sm font-bold mb-10 border border-white/20 backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-brand-orange-500" />
            Sua jornada para o sucesso começa aqui
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black mb-10 tracking-tight leading-[1.1]"
          >
            Pronto para Transformar o <br className="hidden md:block" />
            <span className="text-brand-orange-500">Seu Negócio?</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-14 text-blue-100/90 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Junte-se a centenas de empresas que já alcançaram novos patamares de lucro e eficiência através da nossa consultoria especializada em Angola.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-24"
          >
            <Button asChild size="lg" className="w-full sm:w-auto bg-brand-orange-500 text-white hover:bg-[#d68000] px-12 py-8 h-auto text-xl font-black rounded-[2rem] shadow-2xl shadow-orange-500/40 transition-all hover:scale-105 group/btn active:scale-95">
              <Link href="/contacto">
                Começar Agora
                <ArrowRight className="ml-3 h-7 w-7 group-hover/btn:translate-x-2 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 px-12 py-8 h-auto text-xl font-black rounded-[2rem] bg-white/5 backdrop-blur-md transition-all hover:border-white/60 active:scale-95">
              <Link href="/servicos">
                Ver Nossos Serviços
                <BookOpen className="ml-3 h-7 w-7 opacity-70" />
              </Link>
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-white/10"
          >
            <div className="flex flex-col items-center space-y-4 group">
              <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-brand-orange-500/30 transition-all duration-300 group-hover:rotate-6">
                <Phone className="h-6 w-6 text-brand-orange-500" />
              </div>
              <span className="font-bold text-xl tracking-tight">(+244) 930 010 002</span>
              <span className="text-blue-200/60 text-sm uppercase font-bold tracking-widest">Atendimento</span>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-brand-orange-500/30 transition-all duration-300 group-hover:-rotate-6">
                <Mail className="h-6 w-6 text-brand-orange-500" />
              </div>
              <span className="font-bold text-xl tracking-tight">info@beasell.ao</span>
              <span className="text-blue-200/60 text-sm uppercase font-bold tracking-widest">E-mail</span>
            </div>
            <div className="flex flex-col items-center space-y-4 group">
              <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-brand-orange-500/30 transition-all duration-300 group-hover:rotate-6">
                <MapPin className="h-6 w-6 text-brand-orange-500" />
              </div>
              <span className="font-bold text-xl tracking-tight">Luanda, Angola</span>
              <span className="text-blue-200/60 text-sm uppercase font-bold tracking-widest">Localização</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
