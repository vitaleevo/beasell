
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import TestimonialsHero from '../components/heroes/TestimonialsHero';
import SEOHead from '../components/ui/seo-head';

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Testemunhos - Beasell | O que Nossos Clientes Dizem"
        description="Leia os testemunhos de profissionais e empresas que transformaram seus resultados com a formação da Beasell em Angola."
        keywords="testemunhos beasell, avaliações curso vendas, depoimentos clientes angola, resultados formação vendas"
        url="https://beasell.ao/testemunhos"
      />
      
      <Header />
      <TestimonialsHero />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
