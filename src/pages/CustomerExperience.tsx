
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import CustomerExperienceHero from '../components/heroes/CustomerExperienceHero';
import SEOHead from '../components/ui/seo-head';

const CustomerExperiencePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Experiência do Cliente - Beasell | O que Nossos Clientes Dizem"
        description="Leia as experiências de profissionais e empresas que transformaram seus resultados com a formação da Beasell em Angola."
        keywords="experiência cliente beasell, avaliações curso vendas, depoimentos clientes angola, resultados formação vendas"
        url="https://beasell.ao/experiencia-cliente"
      />
      
      <Header />
      <CustomerExperienceHero />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default CustomerExperiencePage;
