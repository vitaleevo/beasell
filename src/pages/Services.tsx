
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/Services';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24">
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
