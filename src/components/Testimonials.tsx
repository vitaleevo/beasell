
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote, TrendingUp, Award } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Carlos Mendes",
      position: "Gestor Comercial",
      company: "Empresa Telecomunicações",
      content: "A formação com a Beatriz transformou completamente a nossa equipa. Aumentámos as vendas em 40% nos primeiros 3 meses.",
      rating: 5,
      image: "/lovable-uploads/9eabbc77-0cbc-4852-b4ed-fce3e25f0c61.png"
    },
    {
      name: "Ana Silva",
      position: "Directora de Vendas",
      company: "Grupo Empresarial",
      content: "Metodologia prática e resultados imediatos. A Beatriz conhece profundamente o mercado angolano e isso faz toda a diferença.",
      rating: 5,
      image: "/lovable-uploads/83611a92-93b3-4250-a932-2adfc6fe3e75.png"
    },
    {
      name: "Miguel Santos",
      position: "Vendedor Sénior",
      company: "Sector Automóvel",
      content: "Passei de vendedor iniciante a top performer em 6 meses. As técnicas ensinadas são realmente eficazes no nosso mercado.",
      rating: 5,
      image: "/lovable-uploads/1413f088-2d63-4d2b-81d4-40356421fb46.png"
    }
  ];

  const stats = [
    { icon: TrendingUp, value: "95%", label: "Taxa de Satisfação", color: "text-green-600" },
    { icon: Award, value: "40%", label: "Aumento Médio em Vendas", color: "text-blue-600" },
    { icon: Star, value: "4.9", label: "Avaliação Média", color: "text-yellow-600" }
  ];

  const successCases = [
    {
      company: "Banco Nacional",
      challenge: "Baixa conversão de leads",
      solution: "Formação em vendas consultivas",
      result: "Aumento de 60% na conversão",
      duration: "3 meses"
    },
    {
      company: "Construtora Luanda",
      challenge: "Equipa desmotivada",
      solution: "Workshop de motivação e técnicas",
      result: "Melhoria de 50% no clima organizacional",
      duration: "2 meses"
    },
    {
      company: "Empresa Tecnologia",
      challenge: "Vendas estagnadas",
      solution: "Reestruturação do processo comercial",
      result: "Crescimento de 80% no faturamento",
      duration: "6 meses"
    }
  ];

  return (
    <section id="testemunhos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            O que dizem os nossos <span className="text-blue-900">formandos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Resultados reais de profissionais e empresas que transformaram suas vendas connosco
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
              <stat.icon className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-blue-900 mb-4" />
                
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-900 to-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                    <div className="text-sm text-blue-900">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Cases */}
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Casos de Sucesso</h3>
            <p className="text-lg text-gray-600">
              Exemplos práticos de transformações realizadas nas empresas parceiras
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successCases.map((case_, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-bold text-blue-900 text-lg mb-3">{case_.company}</h4>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Desafio:</span>
                    <p className="text-gray-600">{case_.challenge}</p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Solução:</span>
                    <p className="text-gray-600">{case_.solution}</p>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-700">Resultado:</span>
                    <p className="text-green-600 font-semibold">{case_.result}</p>
                  </div>
                  
                  <div className="text-xs text-gray-500 pt-2">
                    Duração: {case_.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Images */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <img
            src="/lovable-uploads/996de030-0f0d-42ed-af6d-e7247c08cde9.png"
            alt="Sessão de formação Beasell"
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
          <img
            src="/lovable-uploads/76d86aa0-dea3-4404-9025-5a39f1fba708.png"
            alt="Workshop de vendas Beasell"
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
