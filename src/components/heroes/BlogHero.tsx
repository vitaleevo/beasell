import React from 'react';
import PageHero from './PageHero';
import { BookOpen, Bell, Rss, PenTool, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogHero = () => {
  return (
    <PageHero
      title="Blog & Recursos"
      subtitle="Conhecimento Especializado"
      description="Mantenha-se atualizado com as últimas tendências, estratégias e insights do mundo das vendas, adaptados ao mercado angolano."
      className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white relative overflow-hidden min-h-[70vh]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-blue-500/20 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500/20 rounded-full filter blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-500/20 rounded-full filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
            <BookOpen className="h-12 w-12 text-orange-400 mb-6 mx-auto" />
            <h3 className="font-bold mb-3 text-lg">Artigos Especializados</h3>
            <p className="text-gray-200 text-sm leading-relaxed">Conteúdo profissional sobre vendas e estratégias comerciais</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
            <Bell className="h-12 w-12 text-blue-400 mb-6 mx-auto" />
            <h3 className="font-bold mb-3 text-lg">Newsletter Semanal</h3>
            <p className="text-gray-200 text-sm leading-relaxed">Dicas exclusivas direto na sua caixa de email</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
            <Rss className="h-12 w-12 text-green-400 mb-6 mx-auto" />
            <h3 className="font-bold mb-3 text-lg">Recursos Gratuitos</h3>
            <p className="text-gray-200 text-sm leading-relaxed">Downloads e materiais práticos para aplicar no dia a dia</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12 justify-center">
          <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1">
            <Bell className="mr-3 h-6 w-6" />
            Subscrever Newsletter
          </Button>
          <Button variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm">
            <PenTool className="mr-3 h-6 w-6" />
            Ver Todos os Artigos
          </Button>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <Lightbulb className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm font-medium">Insights Exclusivos</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
            <span className="text-sm font-medium">Estratégias Comprovadas</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
            <BookOpen className="h-5 w-5 text-blue-400 mr-2" />
            <span className="text-sm font-medium">Conteúdo Prático</span>
          </div>
        </div>
      </div>
    </PageHero>
  );
};

export default BlogHero;
