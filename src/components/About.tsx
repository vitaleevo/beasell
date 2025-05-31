
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart, Award, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Capacitar profissionais e empresas angolanas com consultoria e formação de excelência, promovendo o crescimento sustentável através de acompanhamento prático e personalizado."
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser a referência em consultoria e formação empresarial em Angola, reconhecida pela qualidade e resultados práticos dos nossos serviços especializados."
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Acompanhamento prático e personalizado, materiais adaptados à realidade do cliente, atendimento empático com foco em resultados reais e flexibilidade total."
    }
  ];

  const achievements = [
    { icon: Award, number: "5+", text: "Anos de Experiência" },
    { icon: Briefcase, number: "100+", text: "Empresas Apoiadas" },
    { icon: GraduationCap, number: "500+", text: "Profissionais Formados" }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <img 
            src="/lovable-uploads/f0793518-7a6c-4991-9b60-ed1782287b96.png" 
            alt="Beasell Logo" 
            className="h-40 w-auto mx-auto mb-8 object-contain"
          />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre a <span className="text-brand-blue">Beasell</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empresa angolana dedicada a consultoria em gestão de negócios, com foco no apoio a pequenos empreendedores, 
            equipas comerciais e organizações em fase de estruturação ou crescimento.
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">BEASELL - FORMAÇÃO E CONSULTORIA, LDA</h3>
            <div className="text-lg text-gray-700 space-y-2">
              <p><strong>NIF:</strong> 5002528509</p>
              <p><strong>Endereço:</strong> Rua Marechal Brós Tito Nº 35, Edifício Skyone 4º andar</p>
              <p>Município de Ingombota, Bairro Kinaxixi, Luanda-Angola</p>
              <p><strong>Telefone:</strong> (244) 930 010 002</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-600 text-center leading-relaxed max-w-4xl mx-auto">
            Oferecemos serviços orientados para resultados práticos e acompanhamento de proximidade, 
            especializando-nos em soluções que realmente transformam negócios e equipas comerciais no mercado angolano.
          </p>
        </div>

        {/* About Beatriz Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Beatriz Chavier
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Especialista em consultoria empresarial e formação comercial com mais de uma década de experiência no mercado angolano. 
              Beatriz desenvolveu uma metodologia única que combina técnicas internacionais com as especificidades 
              do mercado local, focando em resultados práticos e acompanhamento personalizado.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Formada em Gestão Comercial e com certificações internacionais, dedica-se à transformação 
              de pequenos empreendedores e equipas comerciais, sempre com foco em resultados sustentáveis 
              através de consultoria especializada e formação prática.
            </p>
            
            {/* Achievements */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                  <achievement.icon className="h-8 w-8 text-brand-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-brand-blue">{achievement.number}</div>
                  <div className="text-sm text-gray-600">{achievement.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center">
            <img
              src="/lovable-uploads/f0abed31-5c2f-4ec4-b201-38181cb4cc67.png"
              alt="Beatriz Chavier apresentando formação"
              className="w-full h-auto rounded-2xl shadow-xl object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-brand-blue to-brand-orange w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Methodology Section */}
        <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-3xl p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/lovable-uploads/55a9dff5-1780-4918-9ddb-b23bac4cdf75.png"
                alt="Metodologia de formação Beasell"
                className="w-full h-auto rounded-xl shadow-lg object-cover object-center"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Nossa Metodologia</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Desenvolvemos uma abordagem única que combina consultoria prática com formação intensiva, 
                especificamente adaptada para pequenos empreendedores e equipas comerciais angolanas.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-brand-orange w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Diagnóstico personalizado das necessidades empresariais</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-orange w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Materiais simples e adaptados à realidade local</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-orange w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Acompanhamento prático presencial e remoto</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-brand-orange w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Flexibilidade de pagamentos e formatos adaptáveis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
