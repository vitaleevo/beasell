import React from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";
import { ArrowRight, Star, Users, Clock, CheckCircle, BookOpen } from "lucide-react";
import Link from "next/link";

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
      description:
        "Domine as técnicas mais eficazes para fechar vendas e aumentar sua performance comercial",
      image: "/lovable-uploads/503294f6-01e8-4bd8-86ac-2479dca24e4f.png",
      modules: 8,
      highlights: [
        "Psicologia do Cliente",
        "Técnicas de Persuasão",
        "Gestão de Objeções",
        "Negociação Win-Win",
      ],
    },
    {
      id: 2,
      title: "Liderança Comercial",
      duration: "32 horas",
      level: "Intermediário",
      price: "120.000 Kz",
      rating: 4.8,
      students: 180,
      description:
        "Desenvolva habilidades de liderança para gestão de equipas comerciais de alto desempenho",
      image: "/lovable-uploads/76d86aa0-dea3-4404-9025-5a39f1fba708.png",
      modules: 6,
      highlights: [
        "Gestão de Equipas",
        "Motivação e Coaching",
        "Definição de Metas",
        "Análise de Performance",
      ],
    },
    {
      id: 3,
      title: "Atendimento ao Cliente Excellence",
      duration: "24 horas",
      level: "Iniciante",
      price: "80.000 Kz",
      rating: 4.7,
      students: 320,
      description:
        "Aprenda a criar experiências excepcionais para os clientes e construir relacionamentos duradouros",
      image: "/lovable-uploads/938e4a08-1df3-48f7-876f-b8d847d0cf68.png",
      modules: 5,
      highlights: [
        "Comunicação Eficaz",
        "Resolução de Conflitos",
        "Fidelização de Clientes",
        "Service Recovery",
      ],
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Nossos <span className="text-blue-900">Cursos</span> Populares
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            Formações desenhadas para acelerar seu crescimento profissional e gerar resultados reais
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative">
                <RemoteImageFrame src={course.image} alt={course.title} className="h-48 w-full" />
                <Badge className="absolute top-4 left-4 bg-orange-500">{course.level}</Badge>
              </div>

              <CardHeader>
                <div className="mb-2 flex items-start justify-between">
                  <CardTitle className="text-xl text-blue-900">{course.title}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                    <span className="text-sm font-semibold">{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {course.students} alunos
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="mb-4 text-gray-600">{course.description}</p>

                <div className="mb-4 space-y-2">
                  <h4 className="text-sm font-semibold">O que você aprenderá:</h4>
                  {course.highlights.slice(0, 3).map((highlight, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-gray-600">{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-4 flex items-center justify-between">
                  <div className="text-2xl font-bold text-orange-500">{course.price}</div>
                  <div className="text-sm text-gray-500">{course.modules} módulos</div>
                </div>

                <Button asChild className="w-full bg-blue-900 hover:bg-blue-800">
                  <Link href="/plataforma/cursos">
                    Ver Detalhes
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/plataforma/cursos">
            <Button size="lg" className="bg-orange-500 px-8 hover:bg-orange-600">
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
