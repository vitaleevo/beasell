
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import ContactHero from '../components/heroes/ContactHero';
import SEOHead from '../components/ui/seo-head';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Contacto - Beasell | Entre em Contacto Connosco"
        description="Fale connosco para saber mais sobre nossos cursos de vendas. Contacte a Beasell em Luanda, Angola. Telefone: +244 926 238 518"
        keywords="contacto beasell, telefone beasell luanda, email beasell angola, localização beasell"
        url="https://beasell.ao/contacto"
      />
      
      <Header />
      <ContactHero />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
