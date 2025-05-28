
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/ui/seo-head';
import TrainingHero from '../components/training/TrainingHero';
import TrainingFeatures from '../components/training/TrainingFeatures';
import TrainingCourses from '../components/training/TrainingCourses';
import TrainingTestimonials from '../components/training/TrainingTestimonials';
import TrainingCTA from '../components/training/TrainingCTA';

const Training = () => {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <SEOHead 
        title="Treinamentos Beasell - Cursos de Vendas e Liderança | Angola"
        description="Descubra nossos cursos especializados em vendas, liderança e atendimento. Formação prática com resultados comprovados em Angola."
        keywords="cursos vendas angola, treinamento comercial, formação liderança, beasell training"
        url="https://beasell.ao/treinamento"
      />
      
      <Header />
      <TrainingHero />
      <TrainingFeatures />
      <TrainingCourses />
      <TrainingTestimonials />
      <TrainingCTA />
      <Footer />
    </div>
  );
};

export default Training;
