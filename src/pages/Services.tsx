
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/Services';
import ServicesHero from '../components/heroes/ServicesHero';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ServicesHero />
      <Services />
      <Footer />
    </div>
  );
};

export default ServicesPage;
