import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SEOHead from '../components/ui/seo-head';
import FeaturesSection from '../components/home/FeaturesSection';
import VideoSection from '../components/home/VideoSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Star, Users, Trophy, TrendingUp, Quote, Calendar, Clock, CheckCircle, Award, Heart, Shield, Globe, Phone, Mail, MapPin, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
const Index = () => {
  const courses = [{
    title: "Técnicas Avançadas de Vendas",
    duration: "40 horas",
    price: "150.000 Kz",
    description: "Domine as técnicas mais eficazes para fechar vendas",
    highlights: ["Psicologia do Cliente", "Técnicas de Persuasão", "Gestão de Objeções"]
  }, {
    title: "Liderança Comercial",
    duration: "32 horas",
    price: "120.000 Kz",
    description: "Desenvolva habilidades de liderança para equipas comerciais",
    highlights: ["Gestão de Equipas", "Motivação", "Definição de Metas"]
  }, {
    title: "Atendimento ao Cliente Excellence",
    duration: "24 horas",
    price: "80.000 Kz",
    description: "Aprenda a criar experiências excepcionais para os clientes",
    highlights: ["Comunicação Eficaz", "Resolução de Conflitos", "Fidelização"]
  }];
  const testimonials = [{
    name: "Carlos Mendes",
    position: "Director Comercial, Banco Millennium",
    text: "A formação transformou completamente nossa equipa. Aumentamos as vendas em 45% em apenas 3 meses!",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "Ana Silva",
    position: "Gerente de Vendas, Unitel",
    text: "Beatriz tem uma metodologia única. Os conhecimentos adquiridos são aplicáveis imediatamente.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face"
  }, {
    name: "João Santos",
    position: "Empresário, JM Construções",
    text: "Recomendo a todos. A formação é prática, dinâmica e focada em resultados reais.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }];
  const stats = [{
    number: "500+",
    label: "Profissionais Formados",
    icon: Users
  }, {
    number: "95%",
    label: "Taxa de Satisfação",
    icon: Star
  }, {
    number: "50+",
    label: "Empresas Parceiras",
    icon: Trophy
  }, {
    number: "40%",
    label: "Aumento Médio Vendas",
    icon: TrendingUp
  }];
  return <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <SEOHead title="Beasell - Formação de Excelência em Vendas | Angola" description="A Beasell oferece formação especializada em vendas para profissionais e empresas em Angola. Transforme sua carreira comercial com metodologia comprovada." keywords="formação vendas angola, curso vendas luanda, treinamento comercial, consultoria vendas, beasell" url="https://beasell.ao" />
      
      <Header />
      <Hero />
      
      <FeaturesSection />
      <VideoSection />

      {/* Enhanced Stats Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-orange-500 text-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Resultados que Falam por Si</h2>
            <p className="text-lg sm:text-xl text-blue-100">Números que comprovam nossa excelência</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {stats.map((stat, index) => <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
                  <stat.icon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-4 text-orange-300 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl sm:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-xs sm:text-base text-blue-200">{stat.label}</div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Courses Preview Section */}
      <section className="py-12 sm:py-20 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nossos <span className="text-blue-900">Cursos</span> Populares
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Formações desenhadas para acelerar o seu crescimento profissional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-7xl mx-auto">
            {courses.map((course, index) => <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-blue-900">{course.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="text-orange-500 font-bold text-lg">{course.price}</div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="space-y-2 mb-6">
                    {course.highlights.map((highlight, idx) => <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{highlight}</span>
                      </div>)}
                  </div>
                  <Button className="w-full bg-blue-900 hover:bg-blue-800">
                    Saber Mais
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center max-w-7xl mx-auto">
            <Link to="/servicos">
              <Button size="lg" variant="outline" className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white">
                Ver Todos os Cursos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-12 sm:py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              O que dizem os nossos <span className="text-orange-500">Clientes</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Histórias reais de transformação profissional
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-7xl mx-auto">
            {testimonials.map((testimonial, index) => <div key={index} className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <Quote className="h-8 w-8 text-orange-500 mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.position}</div>
                  </div>
                </div>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                </div>
              </div>)}
          </div>

          <div className="text-center max-w-7xl mx-auto">
            <Link to="/testemunhos">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                Ver Mais Testemunhos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Beatriz Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-gray-50 to-blue-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center max-w-7xl mx-auto">
            <div className="order-2 lg:order-1">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                <img src="/lovable-uploads/c6346064-d31c-4824-978e-ae38c45567d3.png" alt="Beatriz Chavier" className="w-full rounded-2xl shadow-2xl" />
                <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-4 rounded-xl shadow-xl">
                  <Award className="h-6 w-6" />
                </div>
              </div>
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Conheça <span className="text-orange-500">Beatriz Chavier</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">
                  Especialista em vendas com mais de 10 anos de experiência no mercado angolano
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">Certificações Internacionais</h3>
                    <p className="text-gray-600">Formação em Sales Management pela Dale Carnegie</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Globe className="h-6 w-6 text-blue-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">Experiência Internacional</h3>
                    <p className="text-gray-600">Trabalhou com empresas em 5 países africanos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Heart className="h-6 w-6 text-blue-900 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900">Paixão pelo Ensino</h3>
                    <p className="text-gray-600">Dedicada a transformar vidas através das vendas</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/sobre" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full bg-blue-900 hover:bg-blue-800 text-white">
                    Conhecer Mais
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contacto" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                    Agendar Consulta
                    <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-900 to-orange-500 text-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-6">
              Pronto para Transformar a Sua Carreira?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-blue-100">
              Junte-se a centenas de profissionais que já transformaram suas vidas através da nossa formação
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/contacto" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-white text-blue-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/servicos" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full border-2 border-white text-white hover:text-blue-900 px-8 py-4 text-lg font-semibold bg-gray-300 hover:bg-gray-200">
                  Ver Cursos
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+244 926 238 518</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@beasell.ao</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Luanda, Angola</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;