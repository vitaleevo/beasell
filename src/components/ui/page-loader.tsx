
import React from 'react';
import LoadingSpinner from './loading-spinner';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>
  );
};

export default PageLoader;
