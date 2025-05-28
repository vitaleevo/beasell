
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useStudent } from '@/context/StudentContext';
import StudentLayout from '@/components/student/StudentLayout';
import AdvancedDashboard from '@/components/student/AdvancedDashboard';
import BadgesPanel from '@/components/student/BadgesPanel';
import GamificationPanel from '@/components/student/GamificationPanel';
import { 
  BookOpen, 
  Clock, 
  Award, 
  Play,
  TrendingUp,
  Calendar,
  Zap
} from 'lucide-react';

const StudentDashboard = () => {
  const { state } = useStudent();
  const { student, enrolledCourses, progress } = state;

  const totalCourses = enrolledCourses.length;
  const totalProgress = Object.values(progress).reduce((acc, courseProgress) => 
    acc + courseProgress.progressPercentage, 0
  );
  const averageProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;
  const completedCourses = Object.values(progress).filter(p => p.progressPercentage === 100).length;

  // Calculate advanced stats
  const totalHours = enrolledCourses.reduce((acc, course) => {
    const hours = parseInt(course.duration.split(' ')[0]) || 0;
    return acc + hours;
  }, 0);

  const studyStreak = 5; // Mock data - seria calculado baseado em atividade real
  const averageScore = 87; // Mock data
  
  const advancedStats = {
    totalCourses,
    completedCourses,
    totalHours,
    studyStreak,
    averageScore,
    pointsThisMonth: 450,
    coursesThisMonth: 2,
    timeThisWeek: 12
  };

  const weeklyProgress = [60, 45, 90, 30, 75, 120, 85]; // Mock data em minutos

  const monthlyGoals = {
    courses: { current: 2, target: 4 },
    hours: { current: 15, target: 25 },
    points: { current: 450, target: 600 }
  };

  // Gamification data
  const gamificationData = {
    points: student?.points || 0,
    level: Math.floor((student?.points || 0) / 1000) + 1,
    badges: student?.badges || [],
    streak: studyStreak,
    rank: 5,
    totalStudents: 240
  };

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
      <div className="space-y-8">
        {/* Header de Boas-vindas */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Olá, {student?.name}! 👋
              </h1>
              <p className="text-blue-100">
                Continue seu aprendizado onde parou
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-blue-200">Nível {gamificationData.level}</div>
              <div className="text-3xl font-bold flex items-center">
                <Zap className="h-8 w-8 mr-2" />
                {student?.points || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Avançado */}
        <AdvancedDashboard 
          stats={advancedStats}
          weeklyProgress={weeklyProgress}
          monthlyGoals={monthlyGoals}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Atividade Recente */}
          <div className="lg:col-span-2 space-y-6">
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
                        <div key={course.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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

            {/* Recomendações */}
            <Card>
              <CardHeader>
                <CardTitle>Recomendações Personalizadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      Baseado no seu progresso, recomendamos cursos de liderança
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

          {/* Gamification Panel */}
          <div className="lg:col-span-1">
            <GamificationPanel studentData={gamificationData} />
          </div>
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentDashboard;
