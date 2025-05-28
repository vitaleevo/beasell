
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/ui/seo-head';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, Trophy, Clock, CheckCircle, Award, BookOpen, Target, Zap, Globe, Shield, Heart, PlayCircle, Download, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Training = () => {
  const courses = [
    {
      id: 1,
      title: "Técnicas Avançadas de Vendas",
      duration: "40 horas",
      level: "Avançado",
      price: "150.000 Kz",
      rating: 4.9,
      students: 250,
      description: "Domine as técnicas mais eficazes para fechar vendas e aumentar sua performance comercial",
      image: "/lovable-uploads/503294f6-01e8-4bd8-86ac-2479dca24e4f.png",
      modules: 8,
      highlights: [
        "Psicologia do Cliente",
        "Técnicas de Persuasão", 
        "Gestão de Objeções",
        "Negociação Win-Win"
      ],
      benefits: [
        "Aumento médio de 45% nas vendas",
        "Certificado reconhecido",
        "Suporte personalizado",
        "Acesso vitalício"
      ]
    },
    {
      id: 2,
      title: "Liderança Comercial",
      duration: "32 horas",
      level: "Intermediário",
      price: "120.000 Kz",
      rating: 4.8,
      students: 180,
      description: "Desenvolva habilidades de liderança para gestão de equipas comerciais de alto desempenho",
      image: "/lovable-uploads/76d86aa0-dea3-4404-9025-5a39f1fba708.png",
      modules: 6,
      highlights: [
        "Gestão de Equipas",
        "Motivação e Coaching",
        "Definição de Metas",
        "Análise de Performance"
      ],
      benefits: [
        "Melhoria na gestão de equipas",
        "Técnicas de motivação",
        "Ferramentas de análise",
        "Cases práticos"
      ]
    },
    {
      id: 3,
      title: "Atendimento ao Cliente Excellence",
      duration: "24 horas",
      level: "Iniciante",
      price: "80.000 Kz",
      rating: 4.7,
      students: 320,
      description: "Aprenda a criar experiências excepcionais para os clientes e construir relacionamentos duradouros",
      image: "/lovable-uploads/938e4a08-1df3-48f7-876f-b8d847d0cf68.png",
      modules: 5,
      highlights: [
        "Comunicação Eficaz",
        "Resolução de Conflitos",
        "Fidelização de Clientes",
        "Service Recovery"
      ],
      benefits: [
        "Melhoria na satisfação",
        "Redução de reclamações",
        "Aumento da fidelização",
        "Técnicas de recuperação"
      ]
    }
  ];

  const stats = [
    { number: "500+", label: "Alunos Formados", icon: Users },
    { number: "95%", label: "Taxa de Satisfação", icon: Star },
    { number: "50+", label: "Empresas Parceiras", icon: Trophy },
    { number: "40%", label: "Aumento Médio Vendas", icon: Target }
  ];

  const features = [
    {
      icon: PlayCircle,
      title: "Aulas em Vídeo HD",
      description: "Conteúdo em alta qualidade com explicações práticas e dinâmicas"
    },
    {
      icon: Download,
      title: "Material Complementar",
      description: "PDFs, exercícios e ferramentas para aplicação imediata"
    },
    {
      icon: Award,
      title: "Certificado Reconhecido",
      description: "Certificação válida no mercado angolano e internacional"
    },
    {
      icon: Heart,
      title: "Suporte Personalizado",
      description: "Acompanhamento direto da instrutora Beatriz Chavier"
    },
    {
      icon: Globe,
      title: "Acesso Vitalício",
      description: "Estude no seu ritmo com acesso ilimitado ao conteúdo"
    },
    {
      icon: Shield,
      title: "Garantia 30 Dias",
      description: "Satisfação garantida ou devolvemos seu investimento"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Mendes",
      position: "Director Comercial, Banco Millennium",
      text: "A formação transformou completamente nossa equipa. Resultados excepcionais!",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Ana Silva", 
      position: "Gerente de Vendas, Unitel",
      text: "Metodologia única da Beatriz. Conhecimentos aplicáveis imediatamente.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <SEOHead 
        title="Treinamentos Beasell - Cursos de Vendas e Liderança | Angola"
        description="Descubra nossos cursos especializados em vendas, liderança e atendimento. Formação prática com resultados comprovados em Angola."
        keywords="cursos vendas angola, treinamento comercial, formação liderança, beasell training"
        url="https://beasell.ao/treinamento"
      />
      
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-white/10 text-white border-white/20 mb-4">
              Formação de Excelência
            </Badge>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transforme Sua <span className="text-orange-300">Carreira</span> com Nossos Treinamentos
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Cursos especializados em vendas, liderança e atendimento ao cliente. 
              Metodologia comprovada com resultados reais no mercado angolano.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/aluno/login">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Acessar Plataforma
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold">
                Ver Demo Gratuita
                <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-orange-300" />
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher a <span className="text-orange-500">Beasell</span>?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma oferece uma experiência de aprendizado completa e resultados comprovados
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-900 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nossos <span className="text-blue-900">Cursos</span> Populares
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Formações desenhadas para acelerar seu crescimento profissional e gerar resultados reais
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-orange-500">
                    {course.level}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl text-blue-900">{course.title}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students} alunos
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <h4 className="font-semibold text-sm">O que você aprenderá:</h4>
                    {course.highlights.slice(0, 3).map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-2xl font-bold text-orange-500">{course.price}</div>
                    <div className="text-sm text-gray-500">{course.modules} módulos</div>
                  </div>
                  
                  <Button className="w-full bg-blue-900 hover:bg-blue-800">
                    Ver Detalhes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/aluno/login">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8">
                Acesse Todos os Cursos
                <BookOpen className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que nossos <span className="text-orange-500">Alunos</span> dizem
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Comece Sua Jornada de Transformação Hoje!
            </h2>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              Junte-se a centenas de profissionais que já transformaram suas carreiras
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/aluno/login">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Acessar Plataforma
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contacto">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg font-semibold">
                  Falar com Consultor
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <p className="text-sm text-blue-200">
              💳 Parcelamento disponível • 🛡️ Garantia de 30 dias • 🎓 Certificado incluso
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Training;
