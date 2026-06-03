import Image from "next/image";
import { Button } from "@/shared/components/ui/button";
import { ArrowRight, Clock, Users, Award } from "lucide-react";
import Link from "next/link";

const CoursesSection = () => {
  const courses = [
    {
      title: "Técnicas Avançadas de Vendas",
      description: "Domine as técnicas mais eficazes para fechar vendas",
      duration: "20 horas",
      students: "200+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      topics: ["Psicologia do Cliente", "Técnicas de Persuasão", "Gestão de Objeções"],
    },
    {
      title: "Liderança Comercial",
      description: "Desenvolva habilidades de liderança para equipas comerciais",
      duration: "16 horas",
      students: "150+",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop",
      topics: ["Gestão de Equipas", "Motivação", "Definição de Metas"],
    },
    {
      title: "Atendimento ao Cliente Excellence",
      description: "Aprenda a criar experiências excepcionais para os clientes",
      duration: "12 horas",
      students: "300+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1553028826-f4804151e2b2?w=600&h=400&fit=crop",
      topics: ["Comunicação Eficaz", "Resolução de Conflitos", "Fidelização"],
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-7xl text-center sm:mb-16">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Nossos Cursos Populares
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
            Formações desenhadas para acelerar o seu crescimento profissional
          </p>
        </div>

        <div className="mx-auto mb-12 grid max-w-7xl gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={index}
              className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900">{course.title}</h3>
                <p className="mb-4 text-gray-600">{course.description}</p>

                <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="mb-6 space-y-2">
                  {course.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="text-sm text-gray-600">
                      • {topic}
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className="bg-brand-blue-900 mt-auto w-full rounded-lg py-2 font-medium text-white transition-colors hover:bg-[#1A2A49]/90"
                >
                  <Link href="/plataforma/cursos">Saber Mais</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-7xl text-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-orange-500 h-auto rounded-full px-8 py-6 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:bg-[#d68000]"
          >
            <Link href="/plataforma/cursos">
              Ver Todos os Cursos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
