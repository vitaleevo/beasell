
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Services from '../components/Services';
import ServicesHero from '../components/heroes/ServicesHero';
import SEOHead from '../components/ui/seo-head';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Serviços de Formação em Vendas - Beasell Angola"
        description="Descubra nossos serviços: Formação Individual, Empresarial, Workshops e Consultoria Comercial. Metodologia adaptada ao mercado angolano."
        keywords="serviços formação vendas, curso vendas individual, formação empresarial, workshops vendas, consultoria comercial angola"
        url="https://beasell.ao/servicos"
      />
      
      <Header />
      <ServicesHero />
      <Services />
      <Footer />
    </div>
  );
};

export default ServicesPage;
