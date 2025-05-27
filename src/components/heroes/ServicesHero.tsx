
import React from 'react';
import PageHero from './PageHero';
import { GraduationCap, Building, Users, Target, Zap, BookOpen } from 'lucide-react';

const ServicesHero = () => {
  const categories = [
    { 
      icon: GraduationCap, 
      title: 'Formação Individual', 
      description: 'Cursos personalizados para o seu crescimento',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    { 
      icon: Building, 
      title: 'Formação Empresarial', 
      description: 'Soluções in-company para sua empresa',
      color: 'from-green-500 to-green-600',
      bgColor: 'from-green-50 to-green-100'
    },
    { 
      icon: Users, 
      title: 'Workshops', 
      description: 'Sessões intensivas e práticas',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    { 
      icon: Target, 
      title: 'Consultoria', 
      description: 'Assessoria especializada e estratégica',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    },
  ];

  return (
    <PageHero
      title="Nossos Serviços"
      subtitle="Formação de Excelência"
      description="Oferecemos uma gama completa de soluções de formação em vendas, adaptadas às necessidades específicas de cada cliente e do mercado angolano."
      className="bg-gradient-to-br from-orange-50 via-white to-blue-50 relative overflow-hidden min-h-[70vh]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-pulse delay-500"></div>
      </div>

      <div className="grid md:grid-cols-4 gap-8 mt-16 relative z-10">
        {categories.map((category, index) => (
          <div key={index} className="group">
            <div className={`bg-gradient-to-br ${category.bgColor} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50`}>
              <div className={`bg-gradient-to-br ${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                <category.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">{category.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Additional features */}
      <div className="flex flex-wrap justify-center gap-6 mt-12 relative z-10">
        <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <Zap className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Resultados Rápidos</span>
        </div>
        <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <BookOpen className="h-5 w-5 text-blue-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Metodologia Própria</span>
        </div>
        <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
          <Target className="h-5 w-5 text-green-500 mr-2" />
          <span className="text-sm font-medium text-gray-700">Foco em Performance</span>
        </div>
      </div>
    </PageHero>
  );
};

export default ServicesHero;
