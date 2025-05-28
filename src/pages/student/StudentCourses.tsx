
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useStudent } from '@/context/StudentContext';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Award,
  User,
  BarChart3
} from 'lucide-react';
import StudentLayout from '@/components/student/StudentLayout';

const StudentCourses = () => {
  const { state } = useStudent();
  const { enrolledCourses, progress } = state;

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante': return 'bg-green-100 text-green-800';
      case 'Intermediário': return 'bg-yellow-100 text-yellow-800';
      case 'Avançado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <StudentLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meus Cursos</h1>
            <p className="text-gray-600">
              Gerencie seu progresso e continue aprendendo
            </p>
          </div>
          <Link to="/servicos">
            <Button className="bg-blue-900 hover:bg-blue-800">
              <BookOpen className="h-4 w-4 mr-2" />
              Explorar Mais Cursos
            </Button>
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum curso inscrito
              </h3>
              <p className="text-gray-600 mb-6">
                Explore nosso catálogo e comece sua jornada de aprendizado
              </p>
              <Link to="/servicos">
                <Button className="bg-blue-900 hover:bg-blue-800">
                  Ver Cursos Disponíveis
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const courseProgress = progress[course.id];
              const progressPercentage = courseProgress?.progressPercentage || 0;
              const totalLessons = course.modules.reduce((total, module) => 
                total + module.lessons.length, 0
              );
              const completedLessons = courseProgress?.completedLessons.length || 0;

              return (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge className={getLevelColor(course.level)}>
                        {course.level}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Progress 
                        value={progressPercentage} 
                        className="h-2 bg-white/30"
                      />
                      <p className="text-white text-sm mt-2">
                        {progressPercentage}% concluído
                      </p>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {course.description}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{course.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <BarChart3 className="h-4 w-4" />
                        <span>{completedLessons} de {totalLessons} aulas</span>
                      </div>
                      {progressPercentage === 100 && (
                        <div className="flex items-center space-x-1 text-green-600">
                          <Award className="h-4 w-4" />
                          <span className="font-medium">Concluído</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Link to={`/aluno/curso/${course.id}`} className="flex-1">
                        <Button className="w-full bg-blue-900 hover:bg-blue-800">
                          <Play className="h-4 w-4 mr-2" />
                          {progressPercentage > 0 ? 'Continuar' : 'Começar'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentCourses;
