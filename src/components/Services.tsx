
import React from 'react';
import { User, Users, Presentation, HeadphonesIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './services/ServiceCard';
import CourseCard from './services/CourseCard';
import TrainingModalities from './services/TrainingModalities';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: User,
      title: "Formação Individual",
      description: "Desenvolvimento personalizado para profissionais que desejam melhorar suas competências em vendas",
      features: ["Avaliação individual", "Plano personalizado", "Mentoring 1:1", "Certificação"],
      price: "Desde 25.000 AOA",
      duration: "4-8 semanas",
      image: "/lovable-uploads/af9a6669-8dd6-41b8-bb8b-548fbf81a34a.png",
      serviceType: "individual"
    },
    {
      icon: Users,
      title: "Formação Empresarial",
      description: "Capacitação de equipas comerciais para empresas que querem melhorar seus resultados de vendas",
      features: ["Diagnóstico empresarial", "Formação in-company", "Material personalizado", "Relatório de resultados"],
      price: "Sob consulta",
      duration: "2-12 semanas",
      image: "/lovable-uploads/90bb2b21-bbb6-4c39-9b32-4fdd01333270.png",
      serviceType: "empresarial"
    },
    {
      icon: Presentation,
      title: "Workshops Intensivos",
      description: "Workshops focados em técnicas específicas de vendas e desenvolvimento comercial",
      features: ["Temas específicos", "Metodologia prática", "Grupos reduzidos", "Material didático"],
      price: "15.000 AOA",
      duration: "1-2 dias",
      image: "/lovable-uploads/bacd7dcc-ddf2-4bc3-a457-125fa18b7f04.png",
      serviceType: "workshop"
    },
    {
      icon: HeadphonesIcon,
      title: "Consultoria Comercial",
      description: "Consultoria estratégica para otimização de processos comerciais e aumento de vendas",
      features: ["Análise de processos", "Estratégias customizadas", "Implementação assistida", "Monitoramento"],
      price: "Sob consulta",
      duration: "3-6 meses",
      image: "/lovable-uploads/503294f6-01e8-4bd8-86ac-2479dca24e4f.png",
      serviceType: "consultoria"
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

  const handleServiceAction = (serviceType: string) => {
    navigate('/contacto', { state: { selectedService: serviceType } });
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
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              price={service.price}
              duration={service.duration}
              image={service.image}
              serviceType={service.serviceType}
              onAction={handleServiceAction}
            />
          ))}
        </div>

        {/* Course Catalog */}
        <div id="cursos" className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Catálogo de Cursos</h3>
            <p className="text-lg text-gray-600">
              Programas estruturados para diferentes níveis de experiência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <CourseCard
                key={index}
                title={course.title}
                description={course.description}
                modules={course.modules}
                onAction={handleServiceAction}
              />
            ))}
          </div>
        </div>

        <TrainingModalities onAction={handleServiceAction} />
      </div>
    </section>
  );
};

export default Services;
