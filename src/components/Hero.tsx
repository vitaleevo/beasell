import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Users, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  return <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-orange-500 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Beasell transforma pequenos negócios em <span className="text-orange-300">grandes sucessos</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Especialista em consultoria de gestão e formação comercial para pequenos empreendedores
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/servicos">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Ver Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/sobre">
              <Button size="lg" variant="outline" className="border-2 border-white hover:bg-white px-8 py-4 text-lg text-slate-900 font-semibold">
                Conhecer a Beasell
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {stats.map((stat, index) => <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-orange-300" />
                <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                <div className="text-blue-200">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;