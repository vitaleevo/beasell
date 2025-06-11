
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      position: "Director Comercial, Banco Millennium",
      text: "A formação transformou completamente nossa equipa. Aumentamos as vendas em 45% em apenas 3 meses!",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Ana Silva",
      position: "Gerente de Vendas, Unitel",
      text: "Beatriz tem uma metodologia única. Os conhecimentos adquiridos são aplicáveis imediatamente.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "João Santos",
      position: "Empresário, JM Construções",
      text: "Recomendo a todos. A formação é prática, dinâmica e focada em resultados reais.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            O que dizem os nossos <span className="text-orange-500">Clientes</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Histórias reais de transformação profissional
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{
              animationDelay: `${index * 0.2}s`
            }}>
              <Quote className="h-8 w-8 text-orange-500 mb-4" />
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center space-x-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.position}</div>
                </div>
              </div>
              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center max-w-7xl mx-auto">
          <Link to="/testemunhos">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Ver Mais Testemunhos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
