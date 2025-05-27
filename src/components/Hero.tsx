
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight, Star, Users, Trophy, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="inicio" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-10 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-gradient-to-r from-orange-100 to-blue-100 text-blue-800 px-6 py-3 rounded-full text-sm font-semibold shadow-lg">
                <Star className="h-5 w-5 mr-3 text-orange-500" />
                Formadora #1 em Vendas em Angola
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
                Treinamento em vendas
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-orange-500"> para equipas</span>
                <br />
                de alta performance
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                Transforme sua equipa em vendedores de excelência através de formação prática e personalizada, 
                adaptada ao mercado angolano. Com Beatriz Chavier, especialista em vendas.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-blue-900 mb-2">500+</div>
                <div className="text-sm text-gray-600 font-medium">Profissionais Formados</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-blue-900 mb-2">95%</div>
                <div className="text-sm text-gray-600 font-medium">Taxa de Sucesso</div>
              </div>
              <div className="text-center bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-4xl font-bold text-blue-900 mb-2">50+</div>
                <div className="text-sm text-gray-600 font-medium">Empresas Parceiras</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to="/servicos">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white px-10 py-5 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                >
                  Ver Formações
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Link to="/sobre">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-10 py-5 text-lg shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
                >
                  <Play className="mr-3 h-6 w-6" />
                  Conhecer Beatriz
                </Button>
              </Link>
            </div>
          </div>

          {/* Enhanced Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/lovable-uploads/c6346064-d31c-4824-978e-ae38c45567d3.png"
                  alt="Beatriz Chavier - Formadora em Vendas"
                  className="w-full h-auto transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
            
            {/* Enhanced floating elements */}
            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-2xl animate-pulse">
              <Users className="h-8 w-8 mb-3" />
              <div className="text-lg font-bold">Alta</div>
              <div className="text-sm opacity-90">Performance</div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-900 to-blue-800 text-white p-6 rounded-2xl shadow-2xl animate-pulse">
              <Trophy className="h-8 w-8 mb-3" />
              <div className="text-lg font-bold">Resultados</div>
              <div className="text-sm opacity-90">Comprovados</div>
            </div>

            <div className="absolute top-1/2 -left-4 bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl shadow-xl animate-pulse">
              <TrendingUp className="h-6 w-6 mb-2" />
              <div className="text-sm font-semibold">+40%</div>
              <div className="text-xs opacity-90">Vendas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
