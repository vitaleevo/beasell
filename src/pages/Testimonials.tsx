
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import TestimonialsHero from '../components/heroes/TestimonialsHero';

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <TestimonialsHero />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
