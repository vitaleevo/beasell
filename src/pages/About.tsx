
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';
import AboutHero from '../components/heroes/AboutHero';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <AboutHero />
      <About />
      <Footer />
    </div>
  );
};

export default AboutPage;
