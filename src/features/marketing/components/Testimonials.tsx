"use client";

import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import {
  Star,
  Quote,
  TrendingUp,
  CheckCircle2,
  Building2,
  Calendar,
  Target,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      position: "Gestor Comercial",
      company: "Empresa Telecomunicações",
      content:
        "A formação com a Beatriz transformou completamente a nossa equipa. Aumentámos as vendas em 40% nos primeiros 3 meses de aplicação.",
      rating: 5,
      image: "/lovable-uploads/9eabbc77-0cbc-4852-b4ed-fce3e25f0c61.png",
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      name: "Ana Silva",
      position: "Directora de Vendas",
      company: "Grupo Empresarial",
      content:
        "Metodologia prática e resultados imediatos. A Beatriz conhece profundamente o mercado angolano e isso faz toda a diferença nos resultados.",
      rating: 5,
      image: "/lovable-uploads/83611a92-93b3-4250-a932-2adfc6fe3e75.png",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      name: "Miguel Santos",
      position: "Vendedor Sénior",
      company: "Sector Automóvel",
      content:
        "Passei de vendedor iniciante a top performer em 6 meses. As técnicas ensinadas são realmente eficazes no nosso mercado nacional.",
      rating: 5,
      image: "/lovable-uploads/1413f088-2d63-4d2b-81d4-40356421fb46.png",
      gradient: "from-[#F39200] to-amber-600",
    },
  ];

  const successCases = [
    {
      company: "Banco Nacional",
      challenge: "Baixa conversão de leads e retenção",
      solution: "Formação em vendas consultivas e CRM",
      result: "Aumento de 60% na conversão",
      duration: "3 meses",
      icon: Building2,
    },
    {
      company: "Construtora Luanda",
      challenge: "Equipa desmotivada e falta de métricas",
      solution: "Workshop de motivação e gestão de KPIs",
      result: "Melhoria de 50% no clima e reporte",
      duration: "2 meses",
      icon: Target,
    },
    {
      company: "Empresa Tecnologia",
      challenge: "Vendas estagnadas em novos mercados",
      solution: "Reestruturação do funil de prospecção",
      result: "Crescimento de 80% no faturamento",
      duration: "6 meses",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="experiencia-cliente" className="relative overflow-hidden bg-gray-50 py-24">
      {/* Decorative Background Patterns */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute top-1/2 left-0 h-1/2 w-full bg-gradient-to-t from-white to-transparent"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #1A2A49 1px, transparent 0)",
            backgroundSize: "40px 40px",
            opacity: "0.05",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Title */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1A2A49]/10 bg-[#1A2A49]/5 px-4 py-2 text-sm font-medium text-[#1A2A49]">
            <Quote className="h-4 w-4 text-[#F39200]" />
            Voz do Cliente
          </div>
          <h2 className="mb-6 text-3xl leading-tight font-bold text-[#1A2A49] md:text-5xl">
            Experiência de quem <span className="text-[#F39200]">confia</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-500">
            Resultados reais de profissionais e empresas que transformaram sua abordagem comercial
            com a Beasell.
          </p>
        </div>

        {/* Testimonials Cards Slider/Grid */}
        <div className="mb-32 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="group flex flex-col overflow-hidden rounded-3xl border-0 bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className={`h-2 bg-gradient-to-r ${testimonial.gradient}`}></div>
              <CardContent className="flex h-full flex-col p-8">
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />
                  ))}
                </div>

                <Quote className="mb-4 h-10 w-10 text-[#1A2A49]/10 transition-colors group-hover:text-[#F39200]/20" />

                <p className="mb-8 flex-1 text-lg leading-relaxed text-gray-600 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="flex items-center border-t border-gray-100 pt-6">
                  <div className="relative">
                    <div
                      className={`absolute -inset-1 bg-gradient-to-br ${testimonial.gradient} rounded-full opacity-40 blur transition duration-300 group-hover:opacity-100`}
                    ></div>
                    <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white font-bold text-[#1A2A49] shadow-md">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <span className="text-xl">{testimonial.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="font-bold text-[#1A2A49] transition-colors group-hover:text-[#F39200]">
                      {testimonial.name}
                    </div>
                    <div className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                      {testimonial.position}
                    </div>
                    <div className="text-brand-blue-600 text-xs font-bold">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Improved Success Cases Section */}
        <div className="relative mb-32 overflow-hidden rounded-[3rem] bg-[#1A2A49] p-8 shadow-2xl md:p-16">
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 -mt-32 -mr-32 h-64 w-64 rounded-full bg-[#F39200]/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>

          <div className="relative z-10">
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[#F39200]" />
                Casos de Sucesso
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white md:text-4xl">
                Transformação na Prática
              </h3>
              <p className="mx-auto max-w-2xl text-gray-300">
                Exemplos detalhados de como ajudamos empresas a superarem os seus maiores desafios
                comerciais.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {successCases.map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.1]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F39200] to-amber-500 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>

                  <h4 className="mb-6 text-xl font-bold text-white">{item.company}</h4>

                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="mb-2 flex w-fit items-center gap-2 rounded-full bg-[#F39200]/10 px-3 py-1 text-xs font-bold tracking-widest text-[#F39200] uppercase">
                        <Target className="h-3 w-3" />
                        Desafio
                      </div>
                      <p className="text-sm leading-relaxed text-gray-300">{item.challenge}</p>
                    </div>

                    <div>
                      <div className="mb-2 flex w-fit items-center gap-2 rounded-full bg-sky-400/10 px-3 py-1 text-xs font-bold tracking-widest text-sky-400 uppercase">
                        <CheckCircle2 className="h-3 w-3" />
                        Solução
                      </div>
                      <p className="text-sm leading-relaxed text-gray-300">{item.solution}</p>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{item.result}</div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                        <Calendar className="h-3 w-3" />
                        Duração: {item.duration}
                      </div>
                    </div>
                    <div className="rounded-full bg-emerald-400/20 p-2">
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training Moments Gallery with Premium Overlay */}
        <div className="grid gap-8 md:grid-cols-2">
          {[
            {
              img: "/lovable-uploads/996de030-0f0d-42ed-af6d-e7247c08cde9.png",
              label: "Imersão Estratégica",
            },
            {
              img: "/lovable-uploads/76d86aa0-dea3-4404-9025-5a39f1fba708.png",
              label: "Workshops Práticos",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative h-72 overflow-hidden rounded-[2.5rem] shadow-2xl md:h-96"
            >
              <Image
                src={item.img}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A49]/90 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-90"></div>
              <div className="absolute bottom-0 left-0 translate-y-4 transform p-8 transition-transform duration-500 group-hover:translate-y-0">
                <div className="mb-2 text-2xl font-bold text-white">{item.label}</div>
                <div className="h-1 w-12 rounded-full bg-[#F39200]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
