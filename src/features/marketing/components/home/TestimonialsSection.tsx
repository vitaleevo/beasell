"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Star, Quote, Sparkles } from 'lucide-react';
import Link from 'next/link';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      position: "Director Comercial, Banco Millennium",
      text: "A formação transformou completamente nossa equipa. Aumentamos as vendas em 45% em apenas 3 meses!",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      gradient: "from-blue-500/10 to-transparent"
    },
    {
      name: "Ana Silva",
      position: "Gerente de Vendas, Unitel",
      text: "Beatriz tem uma metodologia única. Os conhecimentos adquiridos são aplicáveis imediatamente.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      gradient: "from-amber-500/10 to-transparent"
    },
    {
      name: "João Santos",
      position: "Empresário, JM Construções",
      text: "Recomendo a todos. A formação é prática, dinâmica e focada em resultados reais.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      gradient: "from-emerald-500/10 to-transparent"
    }
  ];

  return (
    <section className="py-24 bg-gray-50/50 w-full relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F39200]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A2A49]/5 text-[#1A2A49] text-sm font-medium mb-6 border border-[#1A2A49]/10">
            <Sparkles className="w-4 h-4 text-[#F39200]" />
            Voce é o Próximo Caso de Sucesso
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#1A2A49] mb-6 leading-tight">
            Experiência dos nossos <span className="text-[#F39200]">Clientes</span>
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Histórias reais de profissionais e empresas que transformaram o seu futuro comercial connosco.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group relative bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100/50 flex flex-col overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 flex justify-between items-start">
                  <div className="bg-[#F39200]/10 p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Quote className="h-6 w-6 text-[#F39200] fill-current" />
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 text-lg italic leading-relaxed mb-10 flex-1">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110">
                    <div className="absolute -inset-1 bg-gradient-to-br from-[#F39200] to-amber-500 rounded-full blur opacity-20 group-hover:opacity-60"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-[#1A2A49] group-hover:text-[#F39200] transition-colors">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 font-medium">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/experiencia-cliente">
            <Button size="lg" className="bg-[#1A2A49] hover:bg-[#1A2A49]/90 text-white px-10 py-7 h-auto text-lg font-bold rounded-2xl shadow-2xl shadow-[#1A2A49]/20 transition-all hover:scale-105 group/btn">
              Ver Todos os Depoimentos
              <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
