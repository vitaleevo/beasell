"use client";

import React from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Star, Quote, TrendingUp, Award, CheckCircle2, Building2, Calendar, Target, Sparkles } from 'lucide-react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      position: "Gestor Comercial",
      company: "Empresa Telecomunicações",
      content: "A formação com a Beatriz transformou completamente a nossa equipa. Aumentámos as vendas em 40% nos primeiros 3 meses de aplicação.",
      rating: 5,
      image: "/lovable-uploads/9eabbc77-0cbc-4852-b4ed-fce3e25f0c61.png",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      name: "Ana Silva",
      position: "Directora de Vendas",
      company: "Grupo Empresarial",
      content: "Metodologia prática e resultados imediatos. A Beatriz conhece profundamente o mercado angolano e isso faz toda a diferença nos resultados.",
      rating: 5,
      image: "/lovable-uploads/83611a92-93b3-4250-a932-2adfc6fe3e75.png",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      name: "Miguel Santos",
      position: "Vendedor Sénior",
      company: "Sector Automóvel",
      content: "Passei de vendedor iniciante a top performer em 6 meses. As técnicas ensinadas são realmente eficazes no nosso mercado nacional.",
      rating: 5,
      image: "/lovable-uploads/1413f088-2d63-4d2b-81d4-40356421fb46.png",
      gradient: "from-[#F39200] to-amber-600"
    }
  ];

  const successCases = [
    {
      company: "Banco Nacional",
      challenge: "Baixa conversão de leads e retenção",
      solution: "Formação em vendas consultivas e CRM",
      result: "Aumento de 60% na conversão",
      duration: "3 meses",
      icon: Building2
    },
    {
      company: "Construtora Luanda",
      challenge: "Equipa desmotivada e falta de métricas",
      solution: "Workshop de motivação e gestão de KPIs",
      result: "Melhoria de 50% no clima e reporte",
      duration: "2 meses",
      icon: Target
    },
    {
      company: "Empresa Tecnologia",
      challenge: "Vendas estagnadas em novos mercados",
      solution: "Reestruturação do funil de prospecção",
      result: "Crescimento de 80% no faturamento",
      duration: "6 meses",
      icon: TrendingUp
    }
  ];

  return (
    <section id="experiencia-cliente" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-1/2 bg-gradient-to-t from-white to-transparent"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, #1A2A49 1px, transparent 0)',
            backgroundSize: '40px 40px',
            opacity: '0.05'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A2A49]/5 text-[#1A2A49] text-sm font-medium mb-6 border border-[#1A2A49]/10">
            <Quote className="w-4 h-4 text-[#F39200]" />
            Voz do Cliente
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1A2A49] mb-6 leading-tight">
            Experiência de quem <span className="text-[#F39200]">confia</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Resultados reais de profissionais e empresas que transformaram sua abordagem comercial com a Beasell.
          </p>
        </div>

        {/* Testimonials Cards Slider/Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 rounded-3xl bg-white overflow-hidden flex flex-col">
              <div className={`h-2 bg-gradient-to-r ${testimonial.gradient}`}></div>
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-current" />
                  ))}
                </div>

                <Quote className="h-10 w-10 text-[#1A2A49]/10 mb-4 group-hover:text-[#F39200]/20 transition-colors" />

                <p className="text-gray-600 mb-8 italic text-lg leading-relaxed flex-1">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center pt-6 border-t border-gray-100">
                  <div className="relative">
                    <div className={`absolute -inset-1 bg-gradient-to-br ${testimonial.gradient} rounded-full blur opacity-40 group-hover:opacity-100 transition duration-300`}></div>
                    <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#1A2A49] font-bold border-2 border-white overflow-hidden shadow-md">
                      {testimonial.image ? (
                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" sizes="56px" />
                      ) : (
                        <span className="text-xl">{testimonial.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-[#1A2A49] group-hover:text-[#F39200] transition-colors">{testimonial.name}</div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{testimonial.position}</div>
                    <div className="text-xs text-brand-blue-600 font-bold">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Improved Success Cases Section */}
        <div className="relative bg-[#1A2A49] rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl mb-32">
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F39200]/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-medium mb-6 border border-white/10 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-[#F39200]" />
                Casos de Sucesso
              </div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">Transformação na Prática</h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Exemplos detalhados de como ajudamos empresas a superarem os seus maiores desafios comerciais.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {successCases.map((item, index) => (
                <div key={index} className="bg-white/[0.06] backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/[0.1] transition-all duration-300 flex flex-col group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#F39200] to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>

                  <h4 className="font-bold text-white text-xl mb-6">{item.company}</h4>

                  <div className="space-y-6 flex-1">
                    <div>
                      <div className="flex items-center gap-2 text-[#F39200] text-xs font-bold uppercase tracking-widest mb-2 px-3 py-1 bg-[#F39200]/10 w-fit rounded-full">
                        <Target className="w-3 h-3" />
                        Desafio
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.challenge}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-widest mb-2 px-3 py-1 bg-sky-400/10 w-fit rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        Solução
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.solution}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-emerald-400 font-bold text-2xl">{item.result}</div>
                      <div className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                        <Calendar className="w-3 h-3" />
                        Duração: {item.duration}
                      </div>
                    </div>
                    <div className="bg-emerald-400/20 p-2 rounded-full">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training Moments Gallery with Premium Overlay */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            { img: "/lovable-uploads/996de030-0f0d-42ed-af6d-e7247c08cde9.png", label: "Imersão Estratégica" },
            { img: "/lovable-uploads/76d86aa0-dea3-4404-9025-5a39f1fba708.png", label: "Workshops Práticos" }
          ].map((item, i) => (
            <div key={i} className="group relative h-72 md:h-96 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A49]/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="text-white font-bold text-2xl mb-2">{item.label}</div>
                <div className="w-12 h-1 bg-[#F39200] rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
