
import React from 'react';

const HeroStats = () => {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4">
      <div className="text-center bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-1">500+</div>
        <div className="text-xs text-gray-600 font-medium">Profissionais Formados</div>
      </div>
      <div className="text-center bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-1">95%</div>
        <div className="text-xs text-gray-600 font-medium">Taxa de Sucesso</div>
      </div>
      <div className="text-center bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-1">50+</div>
        <div className="text-xs text-gray-600 font-medium">Empresas Parceiras</div>
      </div>
    </div>
  );
};

export default HeroStats;
