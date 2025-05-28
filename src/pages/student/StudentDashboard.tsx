
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useStudent } from '@/context/StudentContext';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Play,
  TrendingUp,
  Calendar
} from 'lucide-react';
import StudentLayout from '@/components/student/StudentLayout';

const StudentDashboard = () => {
  const { state } = useStudent();
  const { student, enrolledCourses, progress } = state;

  const totalCourses = enrolledCourses.length;
  const totalProgress = Object.values(progress).reduce((acc, courseProgress) => 
    acc + courseProgress.progressPercentage, 0
  );
  const averageProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;
  const completedCourses = Object.values(progress).filter(p => p.progressPercentage === 100).length;

  const recentActivity = enrolledCourses
    .filter(course => progress[course.id])
    .sort((a, b) => {
      const progressA = progress[a.id];
      const progressB = progress[b.id];
      return new Date(progressB.lastAccessedAt).getTime() - new Date(progressA.lastAccessedAt).getTime();
    })
    .slice(0, 3);

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header de Boas-vindas */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">
            Olá, {student?.name}! 👋
          </h1>
          <p className="text-blue-100">
            Continue seu aprendizado onde parou
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-900" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cursos Inscritos</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Progresso Médio</p>
                  <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cursos Concluídos</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Horas de Estudo</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {enrolledCourses.reduce((acc, course) => {
                      const hours = parseInt(course.duration.split(' ')[0]) || 0;
                      return acc + hours;
                    }, 0)}h
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Atividade Recente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Atividade Recente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((course) => {
                    const courseProgress = progress[course.id];
                    return (
                      <div key={course.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <img 
                          src={course.thumbnail} 
                          alt={course.title}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{course.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Progress 
                              value={courseProgress.progressPercentage} 
                              className="flex-1 h-2"
                            />
                            <span className="text-sm text-gray-600">
                              {courseProgress.progressPercentage}%
                            </span>
                          </div>
                        </div>
                        <Link to={`/aluno/curso/${course.id}`}>
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-1" />
                            Continuar
                          </Button>
                        </Link>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    Nenhuma atividade recente
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Próximos Passos */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    🎯 Continue onde parou
                  </h4>
                  <p className="text-blue-700 text-sm mb-3">
                    Mantenha o ritmo de estudos para melhor aproveitamento
                  </p>
                  <Link to="/aluno/cursos">
                    <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                      Ver Meus Cursos
                    </Button>
                  </Link>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">
                    📚 Explore novos cursos
                  </h4>
                  <p className="text-green-700 text-sm mb-3">
                    Expanda seus conhecimentos com nossa biblioteca completa
                  </p>
                  <Link to="/servicos">
                    <Button size="sm" variant="outline" className="border-green-600 text-green-600">
                      Ver Catálogo
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
