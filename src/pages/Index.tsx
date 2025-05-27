
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Users, Trophy, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: Target,
      title: "Formação Especializada",
      description: "Metodologia única adaptada ao mercado angolano"
    },
    {
      icon: Users,
      title: "Experiência Comprovada",
      description: "Mais de 500 profissionais formados com sucesso"
    },
    {
      icon: Trophy,
      title: "Resultados Garantidos",
      description: "95% de taxa de satisfação dos nossos formandos"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Features Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que escolher a <span className="text-blue-900">Beasell</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Somos especialistas em transformar profissionais em vendedores de excelência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="bg-gradient-to-br from-blue-900 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/servicos">
              <Button size="lg" className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 text-lg">
                Ver Todos os Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
