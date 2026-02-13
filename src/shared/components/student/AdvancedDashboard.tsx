
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Progress } from '@/shared/components/ui/progress';
import { Badge } from '@/shared/components/ui/badge';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  BookOpen,
  Trophy,
  Calendar,
  BarChart3,
  Zap
} from 'lucide-react';

interface AdvancedDashboardProps {
  stats: {
    totalCourses: number;
    completedCourses: number;
    totalHours: number;
    studyStreak: number;
    averageScore: number;
    pointsThisMonth: number;
    coursesThisMonth: number;
    timeThisWeek: number;
  };
  weeklyProgress: number[];
  monthlyGoals: {
    courses: { current: number; target: number };
    hours: { current: number; target: number };
    points: { current: number; target: number };
  };
}

const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({
  stats,
  weeklyProgress,
  monthlyGoals
}) => {
  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Comece uma nova sequência hoje!";
    if (streak === 1) return "Ótimo começo! Continue assim!";
    if (streak < 7) return `${streak} dias seguidos - continue firme!`;
    if (streak < 30) return `${streak} dias! Você está em fogo! 🔥`;
    return `${streak} dias! Você é um verdadeiro ninja do aprendizado! 🥷`;
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="h-5 w-5 text-blue-900" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completedCourses}/{stats.totalCourses}
                </p>
                <p className="text-sm text-gray-600">Cursos Concluídos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalHours}h</p>
                <p className="text-sm text-gray-600">Tempo Total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.studyStreak}</p>
                <p className="text-sm text-gray-600">Dias Seguidos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Trophy className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
                <p className="text-sm text-gray-600">Média Geral</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Study Streak */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Sequência de Estudos</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              {stats.studyStreak} {stats.studyStreak === 1 ? 'dia' : 'dias'}
            </div>
            <p className="text-gray-600 mb-4">{getStreakMessage(stats.studyStreak)}</p>
            
            {/* Weekly Progress Visualization */}
            <div className="flex justify-center space-x-2 mb-4">
              {weeklyProgress.map((day, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full ${
                    day > 0 ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  title={`Dia ${index + 1}: ${day} minutos`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">Últimos 7 dias</p>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Metas do Mês</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Courses Goal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Cursos Concluídos</span>
              <span className="text-sm text-gray-600">
                {monthlyGoals.courses.current}/{monthlyGoals.courses.target}
              </span>
            </div>
            <Progress 
              value={calculateProgress(monthlyGoals.courses.current, monthlyGoals.courses.target)} 
              className="h-2"
            />
          </div>

          {/* Hours Goal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Horas de Estudo</span>
              <span className="text-sm text-gray-600">
                {monthlyGoals.hours.current}h/{monthlyGoals.hours.target}h
              </span>
            </div>
            <Progress 
              value={calculateProgress(monthlyGoals.hours.current, monthlyGoals.hours.target)} 
              className="h-2"
            />
          </div>

          {/* Points Goal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Pontos Conquistados</span>
              <span className="text-sm text-gray-600">
                {monthlyGoals.points.current}/{monthlyGoals.points.target}
              </span>
            </div>
            <Progress 
              value={calculateProgress(monthlyGoals.points.current, monthlyGoals.points.target)} 
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* This Month Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="text-2xl font-bold text-blue-900">{stats.coursesThisMonth}</span>
            </div>
            <p className="text-sm text-gray-600">Cursos este mês</p>
            <Badge variant="outline" className="mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              +{stats.coursesThisMonth} vs mês anterior
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-6 w-6 text-green-600" />
              <span className="text-2xl font-bold text-green-900">{stats.timeThisWeek}h</span>
            </div>
            <p className="text-sm text-gray-600">Horas esta semana</p>
            <Badge variant="outline" className="mt-1">
              <BarChart3 className="h-3 w-3 mr-1" />
              Média diária: {Math.round((stats.timeThisWeek / 7) * 10) / 10}h
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Trophy className="h-6 w-6 text-yellow-600" />
              <span className="text-2xl font-bold text-yellow-900">{stats.pointsThisMonth}</span>
            </div>
            <p className="text-sm text-gray-600">Pontos este mês</p>
            <Badge variant="outline" className="mt-1">
              <Target className="h-3 w-3 mr-1" />
              Objetivo: {monthlyGoals.points.target}
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedDashboard;

