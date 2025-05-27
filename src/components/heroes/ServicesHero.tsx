
import React from 'react';
import PageHero from './PageHero';
import { GraduationCap, Building, Users, Target } from 'lucide-react';

const ServicesHero = () => {
  const categories = [
    { icon: GraduationCap, title: 'Formação Individual', description: 'Cursos personalizados' },
    { icon: Building, title: 'Formação Empresarial', description: 'Soluções in-company' },
    { icon: Users, title: 'Workshops', description: 'Sessões intensivas' },
    { icon: Target, title: 'Consultoria', description: 'Assessoria especializada' },
  ];

  return (
    <PageHero
      title="Nossos Serviços"
      subtitle="Formação de Excelência"
      description="Oferecemos uma gama completa de soluções de formação em vendas, adaptadas às necessidades específicas de cada cliente e do mercado angolano."
      className="bg-gradient-to-br from-orange-50 to-blue-50"
    >
      <div className="grid md:grid-cols-4 gap-6 mt-12">
        {categories.map((category, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="bg-gradient-to-br from-orange-500 to-blue-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <category.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{category.title}</h3>
            <p className="text-gray-600 text-sm">{category.description}</p>
          </div>
        ))}
      </div>
    </PageHero>
  );
};

export default ServicesHero;
