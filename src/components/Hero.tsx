
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Star, Users, Trophy } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="pt-24 pb-12 bg-gradient-to-br from-blue-50 to-orange-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="h-4 w-4 mr-2" />
                Formadora #1 em Vendas em Angola
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Transforme sua
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-orange-500"> carreira</span>
                <br />
                em vendas
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Desenvolva competências comerciais através de formação prática e personalizada, 
                adaptada ao mercado angolano. Com Beatriz Chavier, especialista em vendas.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">500+</div>
                <div className="text-sm text-gray-600">Profissionais Formados</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">95%</div>
                <div className="text-sm text-gray-600">Taxa de Sucesso</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-900">50+</div>
                <div className="text-sm text-gray-600">Empresas Parceiras</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg"
                onClick={() => scrollToSection('servicos')}
              >
                Ver Formações
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-4 text-lg"
                onClick={() => scrollToSection('sobre')}
              >
                <Play className="mr-2 h-5 w-5" />
                Conhecer Beatriz
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              <img
                src="/lovable-uploads/c6346064-d31c-4824-978e-ae38c45567d3.png"
                alt="Beatriz Chavier - Formadora em Vendas"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-4 rounded-xl shadow-lg animate-pulse">
              <Users className="h-6 w-6 mb-2" />
              <div className="text-sm font-semibold">Especialista</div>
              <div className="text-xs">em Vendas</div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-blue-900 text-white p-4 rounded-xl shadow-lg animate-pulse">
              <Trophy className="h-6 w-6 mb-2" />
              <div className="text-sm font-semibold">Resultados</div>
              <div className="text-xs">Comprovados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
