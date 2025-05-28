
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Users, Clock, CheckCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrainingCourses = () => {
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
      ]
    }
  ];

  return (
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
  );
};

export default TrainingCourses;
