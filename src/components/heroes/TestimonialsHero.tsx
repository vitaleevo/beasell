
import React from 'react';
import PageHero from './PageHero';
import { Quote, Star } from 'lucide-react';

const TestimonialsHero = () => {
  const featuredTestimonial = {
    name: 'Carlos Mendes',
    role: 'Director Comercial, Empresa XYZ',
    content: 'A formação com a Beatriz transformou completamente nossa equipa de vendas. Os resultados foram imediatos e sustentáveis.',
    rating: 5,
  };

  return (
    <PageHero
      title="Testemunhos"
      subtitle="Histórias de Sucesso"
      description="Descubra como profissionais e empresas transformaram seus resultados comerciais através das nossas formações especializadas."
      className="bg-gradient-to-br from-blue-900 to-orange-500 text-white"
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mt-12 max-w-2xl mx-auto">
        <Quote className="h-12 w-12 text-orange-300 mb-4 mx-auto" />
        <div className="flex justify-center mb-4">
          {[...Array(featuredTestimonial.rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-lg italic mb-6">"{featuredTestimonial.content}"</p>
        <div className="text-center">
          <div className="font-semibold">{featuredTestimonial.name}</div>
          <div className="text-blue-200 text-sm">{featuredTestimonial.role}</div>
        </div>
      </div>
    </PageHero>
  );
};

export default TestimonialsHero;
