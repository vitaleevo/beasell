
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
