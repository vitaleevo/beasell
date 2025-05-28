
import React from 'react';
import PageHero from './PageHero';
import { BookOpen, Bell, Rss, PenTool, Lightbulb, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BlogHero = () => {
  return <PageHero title="Blog & Recursos" subtitle="Conhecimento Especializado" description="Mantenha-se atualizado com as últimas tendências, estratégias e insights do mundo das vendas, adaptados ao mercado angolano." backgroundImage="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" className="bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-orange-600 text-white relative overflow-hidden min-h-[80vh]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-brand-orange/20 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500/20 rounded-full filter blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-brand-orange/30 rounded-full filter blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white/15 backdrop-blur-sm p-10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 shadow-xl">
            <BookOpen className="h-16 w-16 text-brand-orange mb-8 mx-auto" />
            <h3 className="font-bold mb-4 text-xl">Artigos Especializados</h3>
            <p className="text-gray-200 leading-relaxed">Conteúdo profissional sobre vendas e estratégias comerciais adaptadas ao mercado angolano</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm p-10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 shadow-xl">
            <Bell className="h-16 w-16 text-blue-400 mb-8 mx-auto" />
            <h3 className="font-bold mb-4 text-xl">Newsletter Semanal</h3>
            <p className="text-gray-200 leading-relaxed">Dicas exclusivas e insights práticos direto na sua caixa de email todas as semanas</p>
          </div>
          
          <div className="bg-white/15 backdrop-blur-sm p-10 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 shadow-xl">
            <Rss className="h-16 w-16 text-green-400 mb-8 mx-auto" />
            <h3 className="font-bold mb-4 text-xl">Recursos Gratuitos</h3>
            <p className="text-gray-200 leading-relaxed">Downloads e materiais práticos para aplicar imediatamente no seu dia a dia comercial</p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 mt-16 justify-center">
          <Button className="bg-gradient-to-r from-brand-orange to-brand-orange-600 hover:from-brand-orange-600 hover:to-brand-orange-700 text-white px-10 py-6 text-lg shadow-2xl hover:shadow-brand-orange/25 transition-all duration-300 hover:-translate-y-1">
            <Bell className="mr-3 h-6 w-6" />
            Subscrever Newsletter
          </Button>
          <Link to="/blog/arquivo">
            <Button variant="outline" className="border-2 border-white/30 px-10 py-6 text-lg backdrop-blur-sm bg-slate-400 hover:bg-slate-300 text-slate-900">
              <PenTool className="mr-3 h-6 w-6" />
              Ver Todos os Artigos
            </Button>
          </Link>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full border border-white/20">
            <Lightbulb className="h-6 w-6 text-yellow-400 mr-3" />
            <span className="font-medium">Insights Exclusivos</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full border border-white/20">
            <TrendingUp className="h-6 w-6 text-green-400 mr-3" />
            <span className="font-medium">Estratégias Comprovadas</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full border border-white/20">
            <BookOpen className="h-6 w-6 text-blue-400 mr-3" />
            <span className="font-medium">Conteúdo Prático</span>
          </div>
        </div>
      </div>
    </PageHero>;
};
export default BlogHero;
