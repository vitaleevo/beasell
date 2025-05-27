
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Users, Presentation, HeadphonesIcon, Clock, MapPin, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: User,
      title: "Formação Individual",
      description: "Desenvolvimento personalizado para profissionais que desejam melhorar suas competências em vendas",
      features: ["Avaliação individual", "Plano personalizado", "Mentoring 1:1", "Certificação"],
      price: "Desde 25.000 AOA",
      duration: "4-8 semanas",
      image: "/lovable-uploads/af9a6669-8dd6-41b8-bb8b-548fbf81a34a.png"
    },
    {
      icon: Users,
      title: "Formação Empresarial",
      description: "Capacitação de equipas comerciais para empresas que querem melhorar seus resultados de vendas",
      features: ["Diagnóstico empresarial", "Formação in-company", "Material personalizado", "Relatório de resultados"],
      price: "Sob consulta",
      duration: "2-12 semanas",
      image: "/lovable-uploads/90bb2b21-bbb6-4c39-9b32-4fdd01333270.png"
    },
    {
      icon: Presentation,
      title: "Workshops Intensivos",
      description: "Workshops focados em técnicas específicas de vendas e desenvolvimento comercial",
      features: ["Temas específicos", "Metodologia prática", "Grupos reduzidos", "Material didático"],
      price: "15.000 AOA",
      duration: "1-2 dias",
      image: "/lovable-uploads/bacd7dcc-ddf2-4bc3-a457-125fa18b7f04.png"
    },
    {
      icon: HeadphonesIcon,
      title: "Consultoria Comercial",
      description: "Consultoria estratégica para otimização de processos comerciais e aumento de vendas",
      features: ["Análise de processos", "Estratégias customizadas", "Implementação assistida", "Monitoramento"],
      price: "Sob consulta",
      duration: "3-6 meses",
      image: "/lovable-uploads/503294f6-01e8-4bd8-86ac-2479dca24e4f.png"
    }
  ];

  const courses = [
    {
      title: "Vendas Básicas",
      description: "Fundamentos essenciais para iniciar na área comercial",
      modules: ["Psicologia do cliente", "Técnicas de abordagem", "Objeções", "Fechamento"]
    },
    {
      title: "Vendas Avançadas",
      description: "Técnicas sofisticadas para vendedores experientes",
      modules: ["Vendas consultivas", "Negociação avançada", "Gestão de contas", "Cross-selling"]
    },
    {
      title: "Liderança Comercial",
      description: "Desenvolvimento de gestores e líderes de equipes comerciais",
      modules: ["Gestão de equipas", "Coaching comercial", "KPIs e métricas", "Motivação"]
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById('contacto');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="servicos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Nossos <span className="text-blue-900">Serviços</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas de formação em vendas, adaptadas às suas necessidades específicas
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg">
                  <service.icon className="h-6 w-6 text-blue-900" />
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{service.title}</CardTitle>
                <p className="text-gray-600">{service.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {service.duration}
                  </div>
                  <div className="font-semibold text-blue-900">
                    {service.price}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={scrollToContact}
                >
                  Saber Mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Catalog */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Catálogo de Cursos</h3>
            <p className="text-lg text-gray-600">
              Programas estruturados para diferentes níveis de experiência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h4>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="space-y-2">
                  <div className="font-semibold text-blue-900 text-sm">Módulos:</div>
                  {course.modules.map((module, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      {module}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Image Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
              alt="Formação prática em vendas"
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Modalidades de Formação</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-orange-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Presencial</h4>
                  <p className="text-gray-600">Formações no nosso centro em Luanda ou nas suas instalações</p>
                </div>
              </div>
              <div className="flex items-start">
                <HeadphonesIcon className="h-6 w-6 text-orange-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Online</h4>
                  <p className="text-gray-600">Sessões virtuais interactivas com a mesma qualidade</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-6 w-6 text-orange-500 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">In-Company</h4>
                  <p className="text-gray-600">Formações customizadas na sua empresa</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
