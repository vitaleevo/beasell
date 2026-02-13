"use client";

import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, HeadphonesIcon, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const ContactHero = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Telefone',
      info: '(+244) 930 010 002',
      color: 'bg-blue-500',
      shadow: 'shadow-blue-500/20'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      info: 'Resposta em Tempo Real',
      color: 'bg-green-500',
      shadow: 'shadow-green-500/20'
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@beasell.ao',
      color: 'bg-[#F39200]',
      shadow: 'shadow-orange-500/20'
    },
    {
      icon: MapPin,
      title: 'Localização',
      info: 'Luanda, Talatona',
      color: 'bg-red-500',
      shadow: 'shadow-red-500/20'
    },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
          alt="Beasell Contact Support"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2A49] via-[#1A2A49]/95 to-[#1A2A49]/70"></div>

        {/* Animated Glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#F39200]/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-32 pb-20 text-center lg:text-left">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-6 border border-white/20 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F39200] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F39200]"></span>
              </span>
              Estamos à Distância de um Clique
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Construa o <span className="text-[#F39200]">Sucesso</span> Comercial com a Gente
            </h1>

            <p className="text-lg md:text-xl text-blue-100/90 mb-10 max-w-2xl leading-relaxed font-light">
              Dúvidas sobre nossos cursos? Quer uma consultoria personalizada? Nossa equipa de especialistas em Luanda está pronta para acelerar seu negócio.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#fale-connosco" className="flex items-center bg-[#F39200] hover:bg-[#d68000] text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-orange-900/20 transition-all hover:scale-105 active:scale-95 group">
                Iniciar Conversa
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-4 rounded-full text-white font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1A2A49] bg-gray-300"></div>
                  ))}
                </div>
                <span className="text-sm">Suporte 24/7 disponível</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
              >
                <div className={`${method.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-2xl ${method.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{method.title}</h3>
                <p className="text-blue-200/70 text-sm font-light leading-relaxed truncate">{method.info}</p>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity">
                  <ArrowRight className="text-white h-8 w-8 -rotate-45" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
