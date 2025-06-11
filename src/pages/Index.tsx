
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SEOHead from '../components/ui/seo-head';
import FeaturesSection from '../components/home/FeaturesSection';
import VideoSection from '../components/home/VideoSection';
import StatsSection from '../components/home/StatsSection';
import CoursesSection from '../components/home/CoursesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AboutSection from '../components/home/AboutSection';
import CTASection from '../components/home/CTASection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <SEOHead 
        title="Beasell - Formação de Excelência em Vendas | Angola" 
        description="A Beasell oferece formação especializada em vendas para profissionais e empresas em Angola. Transforme sua carreira comercial com metodologia comprovada." 
        keywords="formação vendas angola, curso vendas luanda, treinamento comercial, consultoria vendas, beasell" 
        url="https://beasell.ao" 
      />
      
      <Header />
      <Hero />
      <FeaturesSection />
      <VideoSection />
      <StatsSection />
      <CoursesSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
