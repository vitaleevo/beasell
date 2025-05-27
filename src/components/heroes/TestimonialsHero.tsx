
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
      className="bg-gradient-to-br from-blue-900 via-blue-800 to-orange-500 text-white relative overflow-hidden min-h-[70vh]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-40 h-40 bg-white/10 rounded-full filter blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-orange-300/20 rounded-full filter blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Featured Testimonial */}
        <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-10 mt-16 max-w-3xl mx-auto border border-white/20 shadow-2xl">
          <Quote className="h-16 w-16 text-orange-300 mb-6 mx-auto opacity-80" />
          <div className="flex justify-center mb-6">
            {[...Array(featuredTestimonial.rating)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-yellow-400 fill-current mx-1" />
            ))}
          </div>
          <p className="text-xl md:text-2xl italic mb-8 leading-relaxed text-center">
            "{featuredTestimonial.content}"
          </p>
          <div className="text-center">
            <div className="font-bold text-lg mb-1">{featuredTestimonial.name}</div>
            <div className="text-blue-200">{featuredTestimonial.role}</div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <Heart className="h-10 w-10 text-red-400 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">95%</div>
            <div className="text-blue-200 text-sm">Satisfação dos Clientes</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <Award className="h-10 w-10 text-yellow-400 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">40%</div>
            <div className="text-blue-200 text-sm">Aumento Médio em Vendas</div>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
            <Users className="h-10 w-10 text-green-400 mx-auto mb-4" />
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-blue-200 text-sm">Profissionais Formados</div>
          </div>
        </div>
      </div>
    </PageHero>
  );
};

export default TestimonialsHero;
