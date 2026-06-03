"use client";

import React from "react";
import { Building2, Users, TrendingUp, BookOpen, Sparkles, Award, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import ServiceCard from "./services/ServiceCard";
import CourseCard from "./services/CourseCard";
import TrainingModalities from "./services/TrainingModalities";

const Services = () => {
  const router = useRouter();

  const services = [
    {
      icon: Building2,
      title: "Consultoria em Gestão de Negócios",
      description:
        "Melhorar a eficiência dos processos, aumentar as vendas e ajudar o empreendedor a tomar decisões mais conscientes",
      features: [
        "Diagnóstico empresarial e plano de acção",
        "Reestruturação organizacional",
        "Acompanhamento de gestão (presencial e remoto)",
        "Relatórios mensais com indicadores de performance",
        "Apoio na tomada de decisão estratégica",
      ],
      price: "Sob consulta",
      duration: "Pacotes mensais ou consultorias pontuais",
      image: "/lovable-uploads/503294f6-01e8-4bd8-86ac-2479dca24e4f.png",
      serviceType: "consultoria-gestao",
    },
    {
      icon: Users,
      title: "Treinamento para Vendedores",
      description:
        "Capacitar equipas comerciais para melhorar o atendimento, aumentar a taxa de conversão e fidelizar clientes",
      features: [
        "Atendimento ao cliente",
        "Técnicas de vendas e abordagem",
        "Contorno de objeções e fecho de vendas",
        "Funil de vendas prático para micro e pequenas empresas",
        "Comportamento e postura profissional",
      ],
      price: "Sob consulta",
      duration: "Workshops práticos, formações presenciais",
      image: "/lovable-uploads/90bb2b21-bbb6-4c39-9b32-4fdd01333270.png",
      serviceType: "treinamento-vendedores",
    },
    {
      icon: TrendingUp,
      title: "Prospecção e Apoio Comercial",
      description:
        "Aumentar a carteira de clientes através de estratégias de prospecção e apoio técnico à venda",
      features: [
        "Pesquisa e identificação de potenciais clientes",
        "Criação de scripts e templates para WhatsApp e e-mail",
        "Apoio operacional para gestão de leads",
        "Elaboração de propostas comerciais",
      ],
      price: "Sob consulta",
      duration: "Reduz tempo operacional e melhora resultados",
      image: "/lovable-uploads/bacd7dcc-ddf2-4bc3-a457-125fa18b7f04.png",
      serviceType: "prospeccao-comercial",
    },
    {
      icon: BookOpen,
      title: "Formações para Pequenos Negócios",
      description: "Preparar empreendedores para gerir de forma eficaz os seus negócios e equipas",
      features: [
        "Planeamento operacional",
        "Controlo financeiro e precificação",
        "Criação de pacotes de serviços e produtos",
        "Desenvolvimento de liderança e comunicação",
      ],
      price: "Sob consulta",
      duration: "Formações de curta duração com acompanhamento",
      image: "/lovable-uploads/af9a6669-8dd6-41b8-bb8b-548fbf81a34a.png",
      serviceType: "formacoes-pequenos-negocios",
    },
  ];

  const courses = [
    {
      title: "Atendimento ao Cliente",
      description: "Desenvolva habilidades excepcionais de atendimento",
      modules: [
        "Comunicação eficaz",
        "Resolução de conflitos",
        "Fidelização",
        "Postura profissional",
      ],
    },
    {
      title: "Técnicas de Vendas",
      description: "Domine as melhores técnicas de vendas e abordagem",
      modules: ["Abordagem eficaz", "Contorno de objeções", "Fecho de vendas", "Funil de vendas"],
    },
    {
      title: "Gestão de Negócios",
      description: "Aprenda a gerir seu negócio de forma eficiente",
      modules: ["Planeamento operacional", "Controlo financeiro", "Precificação", "Liderança"],
    },
  ];

  const differentials = [
    {
      icon: Users,
      title: "Acompanhamento Prático",
      description: "Acompanhamento prático e personalizado em cada etapa",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BookOpen,
      title: "Materiais Adaptados",
      description: "Materiais simples e adaptados à realidade do cliente",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: TrendingUp,
      title: "Foco em Resultados",
      description: "Atendimento empático, com foco em resultados reais",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      icon: Building2,
      title: "Flexibilidade",
      description: "Flexibilidade de pagamentos e formatos adaptáveis",
      gradient: "from-[#F39200] to-amber-500",
    },
  ];

  const handleServiceAction = (serviceType: string) => {
    router.push(`/contacto?service=${serviceType}`);
  };

  return (
    <section id="servicos" className="relative overflow-hidden bg-gray-50 py-12 sm:py-16 lg:py-24">
      {/* Subtle background pattern */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, #1A2A49 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl px-4 lg:px-6">
        {/* Section Header */}
        <div className="mb-12 text-center sm:mb-16 lg:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1A2A49]/10 bg-[#1A2A49]/5 px-4 py-2 text-sm font-medium text-[#1A2A49]">
            <Sparkles className="h-4 w-4 text-[#F39200]" />O que oferecemos
          </div>
          <h2 className="mb-4 text-3xl leading-tight font-bold text-[#1A2A49] sm:text-4xl lg:text-5xl">
            Nossos{" "}
            <span className="relative inline-block">
              <span className="text-[#F39200]">Serviços</span>
              <span className="absolute right-0 -bottom-1 left-0 h-1 rounded-full bg-gradient-to-r from-[#F39200] to-amber-400"></span>
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-500 sm:text-lg lg:text-xl">
            Empresa angolana dedicada a consultoria em gestão de negócios, com foco no apoio a
            pequenos empreendedores, equipas comerciais e organizações em fase de estruturação ou
            crescimento
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:mb-20 md:grid-cols-2 lg:mb-28 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="w-full">
              <ServiceCard
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
            </div>
          ))}
        </div>

        {/* Course Catalog */}
        <div id="cursos" className="mb-16 sm:mb-20 lg:mb-28">
          <div className="mb-10 text-center sm:mb-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1A2A49]/10 bg-[#1A2A49]/5 px-4 py-2 text-sm font-medium text-[#1A2A49]">
              <Award className="h-4 w-4 text-[#F39200]" />
              Formação Especializada
            </div>
            <h3 className="mb-3 text-2xl font-bold text-[#1A2A49] sm:text-3xl lg:text-4xl">
              Principais <span className="text-[#F39200]">Módulos</span>
            </h3>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
              Conteúdos focados em resultados práticos para empreendedores angolanos
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
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
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:mb-20 sm:p-8 lg:mb-28 lg:p-12">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#F39200]/5 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500/5 blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="mb-10 text-center sm:mb-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1A2A49]/10 bg-[#1A2A49]/5 px-4 py-2 text-sm font-medium text-[#1A2A49]">
                <Shield className="h-4 w-4 text-[#F39200]" />
                Porquê a Beasell
              </div>
              <h3 className="mb-3 text-2xl font-bold text-[#1A2A49] sm:text-3xl lg:text-4xl">
                Diferenciais da <span className="text-[#F39200]">Beasell</span>
              </h3>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-500 sm:text-lg">
                O que nos torna únicos no mercado angolano
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {differentials.map((item, index) => (
                <div
                  key={index}
                  className="group rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50/80 sm:p-6"
                >
                  <div
                    className={`bg-gradient-to-br ${item.gradient} mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="mb-2 text-base font-bold text-[#1A2A49] sm:text-lg">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Training Modalities */}
        <TrainingModalities onAction={handleServiceAction} />
      </div>
    </section>
  );
};

export default Services;
