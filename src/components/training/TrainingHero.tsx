
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, Trophy, Target, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrainingHero = () => {
  const stats = [
    { number: "500+", label: "Alunos Formados", icon: Users },
    { number: "95%", label: "Taxa de Satisfação", icon: Star },
    { number: "50+", label: "Empresas Parceiras", icon: Trophy },
    { number: "40%", label: "Aumento Médio Vendas", icon: Target }
  ];

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-500 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-white/10 text-white border-white/20 mb-4">
            Formação de Excelência
          </Badge>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Transforme Sua <span className="text-orange-300">Carreira</span> com Nossos Treinamentos
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Cursos especializados em vendas, liderança e atendimento ao cliente. 
            Metodologia comprovada com resultados reais no mercado angolano.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link to="/aluno/login">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Acessar Plataforma
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold">
              Ver Demo Gratuita
              <PlayCircle className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-orange-300" />
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingHero;
