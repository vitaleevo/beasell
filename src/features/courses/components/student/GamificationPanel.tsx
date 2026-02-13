
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Progress } from '@/shared/components/ui/progress';
import { Button } from '@/shared/components/ui/button';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap,
  Award,
  Crown,
  Medal,
  TrendingUp,
  Calendar,
  Users
} from 'lucide-react';

interface GamificationPanelProps {
  studentData: {
    points: number;
    level: number;
    badges: any[];
    streak: number;
    rank: number;
    totalStudents: number;
  };
}

const GamificationPanel: React.FC<GamificationPanelProps> = ({ studentData }) => {
  const { points, level, badges, streak, rank, totalStudents } = studentData;
  
  // Calculate level progress
  const pointsForCurrentLevel = level * 1000;
  const pointsForNextLevel = (level + 1) * 1000;
  const pointsInCurrentLevel = points - pointsForCurrentLevel;
  const pointsNeededForNext = pointsForNextLevel - pointsForCurrentLevel;
  const levelProgress = (pointsInCurrentLevel / pointsNeededForNext) * 100;

  const achievements = [
    {
      id: 'daily-streak',
      title: 'Sequência Diária',
      description: `${streak} dias consecutivos`,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      progress: Math.min((streak / 30) * 100, 100)
    },
    {
      id: 'course-master',
      title: 'Mestre dos Cursos',
      description: '3 de 5 cursos completos',
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      progress: 60
    },
    {
      id: 'quiz-champion',
      title: 'Campeão de Quizzes',
      description: '8 de 10 quizzes perfeitos',
      icon: Target,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      progress: 80
    }
  ];

  const leaderboard = [
    { name: 'Ana Silva', points: 2850, avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=50' },
    { name: 'Carlos Santos', points: 2720, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50' },
    { name: 'Maria Costa', points: 2650, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50' },
    { name: 'Pedro Oliveira', points: 2580, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50' },
    { name: 'Você', points: points, avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=50', isCurrentUser: true }
  ];

  const getLevelBadge = (level: number) => {
    if (level >= 50) return { name: 'Grão-Mestre', color: 'text-purple-600', icon: Crown };
    if (level >= 30) return { name: 'Expert', color: 'text-yellow-600', icon: Trophy };
    if (level >= 15) return { name: 'Avançado', color: 'text-blue-600', icon: Star };
    if (level >= 5) return { name: 'Intermediário', color: 'text-green-600', icon: Medal };
    return { name: 'Iniciante', color: 'text-gray-600', icon: Target };
  };

  const levelBadge = getLevelBadge(level);

  return (
    <div className="space-y-6">
      {/* Level and Points */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-full bg-blue-100`}>
                <levelBadge.icon className={`h-8 w-8 ${levelBadge.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nível {level}</h3>
                <Badge className={`${levelBadge.color}`}>{levelBadge.name}</Badge>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Pontos Totais</div>
              <div className="text-2xl font-bold text-blue-900">{points.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso para o próximo nível</span>
              <span>{pointsInCurrentLevel} / {pointsNeededForNext} pontos</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Conquistas em Progresso</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => {
              const AchievementIcon = achievement.icon;
              return (
                <div key={achievement.id} className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${achievement.bgColor}`}>
                      <AchievementIcon className={`h-5 w-5 ${achievement.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <span className="text-sm font-medium">{achievement.progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Ranking</span>
            </div>
            <Badge variant="outline">#{rank} de {totalStudents}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((student, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  student.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-sm font-bold">
                  {index + 1}
                </div>
                <img 
                  src={student.avatar} 
                  alt={student.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className={`font-medium ${student.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                    {student.name}
                  </p>
                  <p className="text-sm text-gray-600">{student.points.toLocaleString()} pontos</p>
                </div>
                {index === 0 && <Crown className="h-5 w-5 text-yellow-500" />}
                {index === 1 && <Medal className="h-5 w-5 text-gray-400" />}
                {index === 2 && <Medal className="h-5 w-5 text-orange-600" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Challenge */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5" />
            <span>Desafio da Semana</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Maratona de Aprendizado</h3>
              <p className="text-purple-700 text-sm mb-3">
                Complete 5 lições esta semana e ganhe 500 pontos bônus!
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Progress value={60} className="w-32 h-2 mb-1" />
                  <span className="text-purple-600">3 de 5 lições</span>
                </div>
                <Badge className="bg-purple-600">500 pts</Badge>
              </div>
            </div>
            
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Aceitar Desafio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationPanel;
