import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";
import { Star } from "lucide-react";

const TrainingTestimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      position: "Director Comercial, Banco Millennium",
      text: "A formação transformou completamente nossa equipa. Resultados excepcionais!",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
    {
      name: "Ana Silva",
      position: "Gerente de Vendas, Unitel",
      text: "Metodologia única da Beatriz. Conhecimentos aplicáveis imediatamente.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            O que nossos Alunos dizem
          </h2>
        </div>

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-blue-50 to-orange-50 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="mb-6 text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center space-x-4">
                  <RemoteImageFrame
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 flex-shrink-0 rounded-full"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingTestimonials;
