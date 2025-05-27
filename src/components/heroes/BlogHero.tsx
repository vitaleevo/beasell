
import React from 'react';
import PageHero from './PageHero';
import { BookOpen, Bell, Rss } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogHero = () => {
  return (
    <PageHero
      title="Blog & Recursos"
      subtitle="Conhecimento Especializado"
      description="Mantenha-se atualizado com as últimas tendências, estratégias e insights do mundo das vendas, adaptados ao mercado angolano."
      className="bg-gradient-to-br from-gray-900 to-blue-900 text-white"
    >
      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <BookOpen className="h-8 w-8 text-orange-400 mb-4 mx-auto" />
          <h3 className="font-bold mb-2">Artigos Especializados</h3>
          <p className="text-gray-200 text-sm">Conteúdo profissional sobre vendas e estratégias comerciais</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <Bell className="h-8 w-8 text-orange-400 mb-4 mx-auto" />
          <h3 className="font-bold mb-2">Newsletter Semanal</h3>
          <p className="text-gray-200 text-sm">Dicas exclusivas direto na sua caixa de email</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
          <Rss className="h-8 w-8 text-orange-400 mb-4 mx-auto" />
          <h3 className="font-bold mb-2">Recursos Gratuitos</h3>
          <p className="text-gray-200 text-sm">Downloads e materiais práticos para aplicar no dia a dia</p>
        </div>
      </div>
      
      <div className="mt-8">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
          <Bell className="mr-2 h-5 w-5" />
          Subscrever Newsletter
        </Button>
      </div>
    </PageHero>
  );
};

export default BlogHero;
