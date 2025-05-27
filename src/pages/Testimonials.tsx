
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-24">
        <Testimonials />
      </div>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
