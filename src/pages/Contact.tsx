
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import ContactHero from '../components/heroes/ContactHero';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ContactHero />
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
