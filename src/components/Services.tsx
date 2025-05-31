
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
    <section id="servicos" className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Nossos <span className="text-blue-900">Serviços</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Empresa angolana dedicada a consultoria em gestão de negócios, com foco no apoio a pequenos empreendedores, 
            equipas comerciais e organizações em fase de estruturação ou crescimento
          </p>
        </div>

        {/* Main Services - Mobile First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
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
        <div id="cursos" className="bg-white rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg mb-12 sm:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Principais Módulos</h3>
            <p className="text-sm sm:text-base text-gray-600 px-4 sm:px-0">
              Conteúdos focados em resultados práticos para empreendedores angolanos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl lg:rounded-2xl p-6 sm:p-8 text-white mb-12 sm:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">Diferenciais da Beasell</h3>
            <p className="text-blue-100 text-sm sm:text-base">
              O que nos torna únicos no mercado angolano
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="bg-white/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Acompanhamento Prático</h4>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">Acompanhamento prático e personalizado</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Materiais Adaptados</h4>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">Materiais simples e adaptados à realidade do cliente</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Foco em Resultados</h4>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">Atendimento empático, com foco em resultados reais</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Building2 className="h-6 w-6 sm:h-8 sm:w-8" />
              </div>
              <h4 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">Flexibilidade</h4>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">Flexibilidade de pagamentos e formatos adaptáveis</p>
            </div>
          </div>
        </div>

        <TrainingModalities onAction={handleServiceAction} />
      </div>
    </section>
  );
};

export default Services;
