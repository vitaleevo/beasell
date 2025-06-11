
import React from 'react';
import { Users, Star, Trophy, TrendingUp } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      number: "500+",
      label: "Profissionais Formados",
      icon: Users
    },
    {
      number: "95%",
      label: "Taxa de Satisfação",
      icon: Star
    },
    {
      number: "50+",
      label: "Empresas Parceiras",
      icon: Trophy
    },
    {
      number: "40%",
      label: "Aumento Médio Vendas",
      icon: TrendingUp
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-500 text-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Resultados que Falam por Si</h2>
          <p className="text-lg sm:text-xl text-blue-100">Números que comprovam nossa excelência</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
                <stat.icon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-orange-300 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-xs sm:text-base text-blue-200">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
