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
    <section className="relative min-h-[calc(100vh-60px)] md:min-h-[90vh] flex items-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A2A49]/90 via-[#1A2A49]/95 to-[#1A2A49]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {/* Desktop View */}
        <div className="hidden md:block max-w-4xl mx-auto text-center">
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

        {/* Mobile View - App Style */}
        <div className="md:hidden flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-medium border border-white/20 backdrop-blur-sm uppercase tracking-wider">
            Inscrições Abertas
          </div>

          <h1 className="text-3xl font-extrabold leading-tight text-white mb-2">
            Transforme seu negócio em <span className="text-[#F39200]">Angola</span>
          </h1>

          <p className="text-base text-gray-300 leading-relaxed px-4">
            Consultoria e formação comercial para empreendedores que buscam excelência.
          </p>

          <div className="w-full flex flex-col gap-3 pt-4 px-2">
            <Link href="/servicos" className="w-full">
              <Button className="w-full bg-[#F39200] text-white h-[56px] text-base font-bold rounded-2xl shadow-xl shadow-orange-900/40">
                Explorar Serviços
              </Button>
            </Link>
            <Link href="/contacto" className="w-full">
              <Button variant="ghost" className="w-full text-white h-[56px] text-base font-bold border border-white/20 rounded-2xl backdrop-blur-sm">
                Falar com Consultor
              </Button>
            </Link>
          </div>

          <div className="flex justify-center gap-6 pt-10 w-full overflow-hidden underline-offset-4 decoration-[#F39200]">
            {stats.slice(0, 2).map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white">{stat.number}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-tighter">{stat.label.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
