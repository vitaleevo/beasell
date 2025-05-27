
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Star, Users, Trophy, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="inicio" className="pt-16 pb-8 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden relative w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>
      
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[65vh] max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in order-2 lg:order-1">
            <div className="space-y-3">
              <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                <Star className="h-3 w-3 mr-2 text-orange-500" />
                Formadora #1 em Vendas em Angola
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Treinamento em vendas
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-orange-500"> para equipas</span>
                <br />
                de alta performance
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
                Transforme sua equipa em vendedores de excelência através de formação prática e personalizada, 
                adaptada ao mercado angolano. Com Beatriz Chavier, especialista em vendas.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="text-center bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-1">500+</div>
                <div className="text-xs text-gray-600 font-medium">Profissionais Formados</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-1">95%</div>
                <div className="text-xs text-gray-600 font-medium">Taxa de Sucesso</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-1">50+</div>
                <div className="text-xs text-gray-600 font-medium">Empresas Parceiras</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/servicos" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-6 py-3 text-base shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1"
                >
                  Ver Formações
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sobre" className="w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-6 py-3 text-base shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Conhecer Beatriz
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced Hero Image */}
          <div className="relative animate-fade-in order-1 lg:order-2">
            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl max-w-md mx-auto lg:max-w-none">
                <img
                  src="/lovable-uploads/c6346064-d31c-4824-978e-ae38c45567d3.png"
                  alt="Beatriz Chavier - Formadora em Vendas"
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
            
            {/* Enhanced floating elements */}
            <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-2 sm:p-3 rounded-xl shadow-2xl animate-pulse">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
              <div className="text-xs font-bold">Alta</div>
              <div className="text-xs opacity-90">Performance</div>
            </div>
            
            <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 bg-gradient-to-br from-blue-900 to-blue-800 text-white p-2 sm:p-3 rounded-xl shadow-2xl animate-pulse">
              <Trophy className="h-4 w-4 sm:h-5 sm:w-5 mb-1" />
              <div className="text-xs font-bold">Resultados</div>
              <div className="text-xs opacity-90">Comprovados</div>
            </div>

            <div className="absolute top-1/2 -left-1 sm:-left-2 bg-gradient-to-br from-green-500 to-green-600 text-white p-2 rounded-lg shadow-xl animate-pulse">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mb-1" />
              <div className="text-xs font-semibold">+40%</div>
              <div className="text-xs opacity-90">Vendas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
