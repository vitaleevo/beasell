
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';
import AboutHero from '../components/heroes/AboutHero';
import SEOHead from '../components/ui/seo-head';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Sobre Nós - Beasell | Especialistas em Formação de Vendas"
        description="Conheça a equipa da Beasell e nossa missão de transformar profissionais de vendas em Angola. Experiência, dedicação e resultados comprovados."
        keywords="sobre beasell, equipa vendas angola, formadores vendas luanda, beatriz chavier"
        url="https://beasell.ao/sobre"
      />
      
      <Header />
      <AboutHero />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
