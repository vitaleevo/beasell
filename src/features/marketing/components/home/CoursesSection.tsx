
import Image from 'next/image';
import { Button } from '@/shared/components/ui/button';
import { ArrowRight, Clock, Users, Award } from 'lucide-react';
import Link from 'next/link';

const CoursesSection = () => {
  const courses = [
    {
      title: "Técnicas Avançadas de Vendas",
      description: "Domine as técnicas mais eficazes para fechar vendas",
      duration: "20 horas",
      students: "200+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
      topics: ["Psicologia do Cliente", "Técnicas de Persuasão", "Gestão de Objeções"]
    },
    {
      title: "Liderança Comercial",
      description: "Desenvolva habilidades de liderança para equipas comerciais",
      duration: "16 horas",
      students: "150+",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop",
      topics: ["Gestão de Equipas", "Motivação", "Definição de Metas"]
    },
    {
      title: "Atendimento ao Cliente Excellence",
      description: "Aprenda a criar experiências excepcionais para os clientes",
      duration: "12 horas",
      students: "300+",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1553028826-f4804151e2b2?w=600&h=400&fit=crop",
      topics: ["Comunicação Eficaz", "Resolução de Conflitos", "Fidelização"]
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nossos Cursos Populares
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Formações desenhadas para acelerar o seu crescimento profissional
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 max-w-7xl mx-auto">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
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

                <div className="space-y-2 mb-6">
                  {course.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="text-sm text-gray-600">• {topic}</div>
                  ))}
                </div>

                <Button className="w-full bg-[#1A2A49] hover:bg-[#1A2A49]/90 text-white font-medium py-2 rounded-lg transition-colors">
                  Saber Mais
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center max-w-7xl mx-auto">
          <Link href="/treinamento">
            <Button size="lg" className="bg-[#F39200] hover:bg-[#d68000] text-white px-8 py-6 h-auto text-lg font-semibold rounded-full shadow-lg transition-all hover:scale-105">
              Ver Todos os Cursos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
