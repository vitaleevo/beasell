
import React from 'react';
import PageHero from './PageHero';
import { Quote, Star, Heart, Award, Users } from 'lucide-react';

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
      backgroundImage="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      className="bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-orange text-white relative overflow-hidden min-h-[80vh]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-white/10 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-brand-orange/20 rounded-full filter blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Featured Testimonial */}
        <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-12 mt-20 max-w-4xl mx-auto border border-white/20 shadow-2xl">
          <Quote className="h-20 w-20 text-brand-orange mb-8 mx-auto opacity-80" />
          <div className="flex justify-center mb-8">
            {[...Array(featuredTestimonial.rating)].map((_, i) => (
              <Star key={i} className="h-8 w-8 text-yellow-400 fill-current mx-1" />
            ))}
          </div>
          <p className="text-2xl md:text-3xl italic mb-10 leading-relaxed text-center">
            "{featuredTestimonial.content}"
          </p>
          <div className="text-center">
            <div className="font-bold text-xl mb-2">{featuredTestimonial.name}</div>
            <div className="text-blue-200 text-lg">{featuredTestimonial.role}</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="text-center bg-white/10 backdrop-blur-sm p-10 rounded-2xl border border-white/20 shadow-xl">
            <Heart className="h-12 w-12 text-red-400 mx-auto mb-6" />
            <div className="text-4xl font-bold mb-3">95%</div>
            <div className="text-blue-200 text-lg">Satisfação dos Clientes</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm p-10 rounded-2xl border border-white/20 shadow-xl">
            <Award className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
            <div className="text-4xl font-bold mb-3">40%</div>
            <div className="text-blue-200 text-lg">Aumento Médio em Vendas</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm p-10 rounded-2xl border border-white/20 shadow-xl">
            <Users className="h-12 w-12 text-green-400 mx-auto mb-6" />
            <div className="text-4xl font-bold mb-3">500+</div>
            <div className="text-blue-200 text-lg">Profissionais Formados</div>
          </div>
        </div>
      </div>
    </PageHero>
  );
};

export default TestimonialsHero;
