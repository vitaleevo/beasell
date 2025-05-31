
import React from 'react';
import { Building2, Users, TrendingUp, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './services/ServiceCard';
import CourseCard from './services/CourseCard';
import TrainingModalities from './services/TrainingModalities';

const Services = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Building2,
      title: "Consultoria em Gestão de Negócios",
      description: "Melhorar a eficiência dos processos, aumentar as vendas e ajudar o empreendedor a tomar decisões mais conscientes",
      features: [
        "Diagnóstico empresarial e plano de acção",
        "Reestruturação organizacional", 
        "Acompanhamento de gestão (presencial e remoto)",
        "Relatórios mensais com indicadores de performance",
        "Apoio na tomada de decisão estratégica"
      ],
      price: "Sob consulta",
      duration: "Pacotes mensais ou consultorias pontuais",
      image: "/lovable-uploads/503294f6-01e8-4bd8-86ac-2479dca24e4f.png",
      serviceType: "consultoria-gestao"
    },
    {
      icon: Users,
      title: "Treinamento para Vendedores",
      description: "Capacitar equipas comerciais para melhorar o atendimento, aumentar a taxa de conversão e fidelizar clientes",
      features: [
        "Atendimento ao cliente",
        "Técnicas de vendas e abordagem", 
        "Contorno de objeções e fecho de vendas",
        "Funil de vendas prático para micro e pequenas empresas",
        "Comportamento e postura profissional"
      ],
      price: "Sob consulta",
      duration: "Workshops práticos, formações presenciais",
      image: "/lovable-uploads/90bb2b21-bbb6-4c39-9b32-4fdd01333270.png",
      serviceType: "treinamento-vendedores"
    },
    {
      icon: TrendingUp,
      title: "Prospecção e Apoio Comercial",
      description: "Aumentar a carteira de clientes através de estratégias de prospecção e apoio técnico à venda",
      features: [
        "Pesquisa e identificação de potenciais clientes",
        "Criação de scripts e templates para WhatsApp e e-mail", 
        "Apoio operacional para gestão de leads",
        "Elaboração de propostas comerciais"
      ],
      price: "Sob consulta",
      duration: "Reduz tempo operacional e melhora resultados",
      image: "/lovable-uploads/bacd7dcc-ddf2-4bc3-a457-125fa18b7f04.png",
      serviceType: "prospeccao-comercial"
    },
    {
      icon: BookOpen,
      title: "Formações para Pequenos Negócios",
      description: "Preparar empreendedores para gerir de forma eficaz os seus negócios e equipas",
      features: [
        "Planeamento operacional",
        "Controlo financeiro e precificação", 
        "Criação de pacotes de serviços e produtos",
        "Desenvolvimento de liderança e comunicação"
      ],
      price: "Sob consulta",
      duration: "Formações de curta duração com acompanhamento",
      image: "/lovable-uploads/af9a6669-8dd6-41b8-bb8b-548fbf81a34a.png",
      serviceType: "formacoes-pequenos-negocios"
    }
  ];

  const courses = [
    {
      title: "Atendimento ao Cliente",
      description: "Desenvolva habilidades excepcionais de atendimento",
      modules: ["Comunicação eficaz", "Resolução de conflitos", "Fidelização", "Postura profissional"]
    },
    {
      title: "Técnicas de Vendas",
      description: "Domine as melhores técnicas de vendas e abordagem",
      modules: ["Abordagem eficaz", "Contorno de objeções", "Fecho de vendas", "Funil de vendas"]
    },
    {
      title: "Gestão de Negócios",
      description: "Aprenda a gerir seu negócio de forma eficiente",
      modules: ["Planeamento operacional", "Controlo financeiro", "Precificação", "Liderança"]
    }
  ];

  const handleServiceAction = (serviceType: string) => {
    navigate('/contacto', { state: { selectedService: serviceType } });
  };

  return (
    <section id="servicos" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Nossos <span className="text-blue-900">Serviços</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Empresa angolana dedicada a consultoria em gestão de negócios, com foco no apoio a pequenos empreendedores, 
            equipas comerciais e organizações em fase de estruturação ou crescimento
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
        <div id="cursos" className="bg-white rounded-2xl p-6 md:p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Principais Módulos</h3>
            <p className="text-base text-gray-600">
              Conteúdos focados em resultados práticos para empreendedores angolanos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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

        {/* Diferenciais da Beasell */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Diferenciais da Beasell</h3>
            <p className="text-blue-100">
              O que nos torna únicos no mercado angolano
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h4 className="font-bold mb-2">Acompanhamento Prático</h4>
              <p className="text-sm text-blue-100">Acompanhamento prático e personalizado</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8" />
              </div>
              <h4 className="font-bold mb-2">Materiais Adaptados</h4>
              <p className="text-sm text-blue-100">Materiais simples e adaptados à realidade do cliente</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h4 className="font-bold mb-2">Foco em Resultados</h4>
              <p className="text-sm text-blue-100">Atendimento empático, com foco em resultados reais</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8" />
              </div>
              <h4 className="font-bold mb-2">Flexibilidade</h4>
              <p className="text-sm text-blue-100">Flexibilidade de pagamentos e formatos adaptáveis</p>
            </div>
          </div>
        </div>

        <TrainingModalities onAction={handleServiceAction} />
      </div>
    </section>
  );
};

export default Services;
