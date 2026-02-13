import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Target, Eye, Heart, Award, Briefcase, GraduationCap, CheckCircle, ArrowRight, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

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

  const methodology = [
    "Diagnóstico personalizado das necessidades empresariais",
    "Materiais simples e adaptados à realidade local",
    "Acompanhamento prático presencial e remoto",
    "Flexibilidade de pagamentos e formatos adaptáveis"
  ];

  return (
    <>
      {/* Company Info Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <div className="relative h-24 w-auto mb-8 max-w-xs mx-auto">
              <Image
                src="/lovable-uploads/f0793518-7a6c-4991-9b60-ed1782287b96.png"
                alt="Beasell Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A2A49] mb-6 tracking-tight">
              BEASELL — Formação e Consultoria, LDA
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A Beasell é uma empresa angolana dedicada a consultoria em gestão de negócios, com foco no apoio a pequenos empreendedores,
              equipas comerciais e organizações em fase de estruturação ou crescimento.
            </p>
          </div>

          {/* Company Details Card */}
          <div className="bg-gradient-to-br from-[#1A2A49] to-[#2A3D66] rounded-3xl p-8 md:p-12 mb-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F39200]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6">Sobre a Empresa</h3>
                <p className="text-blue-100 text-lg leading-relaxed mb-6">
                  A Beasell oferece serviços orientados para resultados práticos e acompanhamento de proximidade,
                  especializando-se em soluções que realmente transformam negócios e equipas comerciais no mercado angolano.
                </p>
                <p className="text-blue-200 leading-relaxed">
                  Nossa metodologia única combina técnicas internacionais com as especificidades do mercado local,
                  garantindo resultados sustentáveis para os nossos clientes.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/10">
                  <div className="p-2 bg-[#F39200]/20 rounded-lg flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#F39200]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm uppercase tracking-wide mb-1">Endereço</h4>
                    <p className="text-blue-200 text-sm leading-relaxed">
                      Rua Marechal Brós Tito Nº 35, Edifício Skyone 4º andar<br />
                      Município de Ingombota, Bairro Kinaxixi, Luanda-Angola
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="p-2 bg-[#F39200]/20 rounded-lg flex-shrink-0">
                      <Phone className="h-4 w-4 text-[#F39200]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">(+244) 930 010 002</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                    <div className="p-2 bg-[#F39200]/20 rounded-lg flex-shrink-0">
                      <Mail className="h-4 w-4 text-[#F39200]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">info@beasell.ao</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <p className="text-blue-300 text-sm"><strong className="text-white">NIF:</strong> 5002528509</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-[#1A2A49] mb-4 tracking-tight">
                O que nos <span className="text-[#F39200]">define</span>
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Os pilares que norteiam o nosso trabalho e a nossa dedicação aos clientes.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
                  <CardContent className="p-8 text-center relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1A2A49] to-[#F39200] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="bg-[#1A2A49] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-[#1A2A49] mb-4">{value.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-50 text-[#F39200] font-semibold text-sm mb-6">
                  <Award className="w-4 h-4" />
                  Fundadora
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#1A2A49] mb-6 tracking-tight">
                  Beatriz Xavier
                </h3>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                A Beasell foi fundada por Beatriz Xavier, especialista em consultoria empresarial e formação comercial
                com mais de uma década de experiência no mercado angolano. A empresa desenvolveu uma metodologia única
                que combina técnicas internacionais com as especificidades do mercado local.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Com formação em Gestão Comercial e certificações internacionais, a Beasell dedica-se à transformação
                de pequenos empreendedores e equipas comerciais, sempre com foco em resultados sustentáveis
                através de consultoria especializada e formação prática.
              </p>

              {/* Achievements */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center p-5 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-xl mb-3">
                      <achievement.icon className="h-6 w-6 text-[#1A2A49]" />
                    </div>
                    <div className="text-2xl font-bold text-[#1A2A49]">{achievement.number}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-medium mt-1">{achievement.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 relative">
              <div className="relative aspect-[3/4] max-w-sm mx-auto">
                <Image
                  src="/lovable-uploads/f0abed31-5c2f-4ec4-b201-38181cb4cc67.png"
                  alt="Beatriz Xavier, Fundadora da Beasell"
                  fill
                  className="rounded-3xl shadow-2xl object-cover"
                  sizes="(max-width: 1024px) 384px, 384px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A49]/40 to-transparent rounded-3xl"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                    <p className="text-[#1A2A49] font-bold text-sm">Beatriz Xavier</p>
                    <p className="text-gray-500 text-xs">Fundadora & CEO — Beasell</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/lovable-uploads/97ed134f-d9a7-4561-93e4-b8ddc88a446b.png"
                alt="Metodologia de formação Beasell"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1A2A49]/30 to-transparent"></div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#1A2A49] font-semibold text-sm mb-6">
                  <Target className="w-4 h-4" />
                  Como Trabalhamos
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#1A2A49] mb-4 tracking-tight">
                  Metodologia <span className="text-[#F39200]">Beasell</span>
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  A Beasell desenvolveu uma abordagem única que combina consultoria prática com formação intensiva,
                  especificamente adaptada para pequenos empreendedores e equipas comerciais angolanas.
                </p>
              </div>

              <div className="space-y-4">
                {methodology.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
                    <div className="p-1 bg-[#F39200]/15 rounded-lg flex-shrink-0 group-hover:bg-[#F39200]/25 transition-colors">
                      <CheckCircle className="h-5 w-5 text-[#F39200]" />
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/servicos">
                <Button size="lg" className="bg-[#1A2A49] hover:bg-[#1A2A49]/90 text-white px-8 py-6 h-auto text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105 mt-4">
                  Ver Nossos Serviços
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
