
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart, Award, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description: "Capacitar profissionais e empresas angolanas com treinamento em vendas de excelência, promovendo o crescimento sustentável do mercado nacional através de equipas de alta performance."
    },
    {
      icon: Eye,
      title: "Visão",
      description: "Ser a referência em formação comercial em Angola, reconhecida pela qualidade e resultados práticos das nossas formações especializadas."
    },
    {
      icon: Heart,
      title: "Valores",
      description: "Integridade, excelência, compromisso com resultados, adaptação cultural e desenvolvimento contínuo dos nossos formandos e equipas."
    }
  ];

  const achievements = [
    { icon: Award, number: "10+", text: "Anos de Experiência" },
    { icon: Briefcase, number: "200+", text: "Empresas Atendidas" },
    { icon: GraduationCap, number: "1000+", text: "Profissionais Formados" }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <img 
            src="/lovable-uploads/f0793518-7a6c-4991-9b60-ed1782287b96.png" 
            alt="Beasell Logo" 
            className="h-16 w-auto mx-auto mb-6"
          />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Sobre a <span className="text-blue-900">Beasell</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Especialistas em treinamento em vendas para equipas de alta performance. 
            Conheça nossa história, valores e a expertise de Beatriz Chavier.
          </p>
        </div>

        {/* About Beatriz Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Beatriz Chavier
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Especialista em vendas e formação comercial com mais de uma década de experiência no mercado angolano. 
              Beatriz desenvolveu uma metodologia única que combina técnicas internacionais com as especificidades 
              do mercado local, focando em equipas de alta performance.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Formada em Gestão Comercial e com certificações internacionais em vendas, dedica-se à transformação 
              de profissionais e equipas comerciais, focando sempre em resultados práticos e sustentáveis através 
              de treinamento especializado.
            </p>
            
            {/* Achievements */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                  <achievement.icon className="h-8 w-8 text-blue-900 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{achievement.number}</div>
                  <div className="text-sm text-gray-600">{achievement.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src="/lovable-uploads/f0abed31-5c2f-4ec4-b201-38181cb4cc67.png"
              alt="Beatriz Chavier apresentando formação"
              className="w-full h-auto rounded-2xl shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-blue-900 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
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
            <div>
              <img
                src="/lovable-uploads/55a9dff5-1780-4918-9ddb-b23bac4cdf75.png"
                alt="Metodologia de formação Beasell"
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Nossa Metodologia</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Desenvolvemos uma abordagem única que combina teoria sólida com prática intensiva, 
                especificamente adaptada para criar equipas de alta performance no mercado angolano.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-orange-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Diagnóstico personalizado das necessidades da equipa</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Técnicas de vendas adaptadas ao contexto local</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Role-plays e simulações práticas em equipa</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-orange-500 w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-600">Acompanhamento pós-formação e mentoring</span>
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
