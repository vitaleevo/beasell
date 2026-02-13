import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Play, Users, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  const stats = [{
    number: "500+",
    label: "Profissionais Formados",
    icon: Users
  }, {
    number: "95%",
    label: "Taxa de Satisfação",
    icon: Award
  }, {
    number: "40%",
    label: "Aumento Médio em Vendas",
    icon: TrendingUp
  }];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
          alt="Beasell Team Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A2A49] via-[#1A2A49]/95 to-[#1A2A49]/80"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium mb-8 border border-white/20 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F39200] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F39200]"></span>
            </span>
            Nova Turma: Inscrições Abertas
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight text-white">
            Beasell transforma pequenos negócios em <span className="text-[#F39200]">grandes sucessos</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Especialista em consultoria de gestão e formação comercial para empreendedores.
            Eleve o nível das suas vendas com nossa metodologia comprovada.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/servicos">
              <Button size="lg" className="bg-[#F39200] hover:bg-[#d68000] text-white px-8 py-6 h-auto text-lg font-semibold rounded-full transition-all hover:scale-105 shadow-lg shadow-orange-900/20">
                Ver Nossos Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/sobre">
              <Button size="lg" variant="outline" className="border-2 border-white/30 hover:bg-white/10 px-8 py-6 h-auto text-lg text-white font-semibold rounded-full backdrop-blur-sm transition-all">
                Conhecer a Beasell
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-white/10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:-translate-y-1 transition-transform duration-300">
                <div className="inline-flex items-center justify-center p-3 rounded-xl bg-white/5 mb-4 group-hover:bg-[#F39200]/10 transition-colors backdrop-blur-sm">
                  <stat.icon className="h-6 w-6 text-[#F39200]" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1 text-white">{stat.number}</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
