"use client";

import React from "react";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight } from "lucide-react";
import Image from "next/image";

const ContactHero = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Telefone",
      info: "(+244) 930 010 002",
      color: "bg-blue-500",
      shadow: "shadow-blue-500/20",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      info: "Resposta em Tempo Real",
      color: "bg-green-500",
      shadow: "shadow-green-500/20",
    },
    {
      icon: Mail,
      title: "Email",
      info: "info@beasell.ao",
      color: "bg-[#F39200]",
      shadow: "shadow-orange-500/20",
    },
    {
      icon: MapPin,
      title: "Localização",
      info: "Luanda, Talatona",
      color: "bg-red-500",
      shadow: "shadow-red-500/20",
    },
  ];

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
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
        <div className="absolute top-1/4 -left-20 h-80 w-80 animate-pulse rounded-full bg-[#F39200]/10 blur-[100px]"></div>
        <div className="absolute -right-20 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-blue-500/10 blur-[100px] delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center lg:text-left">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F39200] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F39200]"></span>
              </span>
              Estamos à Distância de um Clique
            </div>

            <h1 className="mb-6 text-4xl leading-tight font-extrabold tracking-tight text-white md:text-6xl">
              Construa o <span className="text-[#F39200]">Sucesso</span> Comercial com a Gente
            </h1>

            <p className="mb-10 max-w-2xl text-lg leading-relaxed font-light text-blue-100/90 md:text-xl">
              Dúvidas sobre nossos cursos? Quer uma consultoria personalizada? Nossa equipa de
              especialistas em Luanda está pronta para acelerar seu negócio.
            </p>

            <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
              <a
                href="#fale-connosco"
                className="group flex items-center rounded-full bg-[#F39200] px-8 py-4 font-bold text-white shadow-xl shadow-orange-900/20 transition-all hover:scale-105 hover:bg-[#d68000] active:scale-95"
              >
                Iniciar Conversa
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-4 font-medium text-white backdrop-blur-md">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-[#1A2A49] bg-gray-300"
                    ></div>
                  ))}
                </div>
                <span className="text-sm">Suporte 24/7 disponível</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group relative rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/10"
              >
                <div
                  className={`${method.color} mb-6 flex h-12 w-12 items-center justify-center rounded-2xl shadow-2xl ${method.shadow} transition-transform duration-300 group-hover:scale-110`}
                >
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{method.title}</h3>
                <p className="truncate text-sm leading-relaxed font-light text-blue-200/70">
                  {method.info}
                </p>
                <div className="absolute top-6 right-6 opacity-0 transition-opacity group-hover:opacity-20">
                  <ArrowRight className="h-8 w-8 -rotate-45 text-white" />
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
