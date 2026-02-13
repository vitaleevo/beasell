"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Badge as BadgeComponent } from '@/shared/components/ui/badge';
import { Badge } from '@/shared/types/student';
import {
  Award,
  Trophy,
  Star,
  Target,
  Zap,
  Medal,
  Crown
} from 'lucide-react';

interface BadgesPanelProps {
  badges: Badge[];
  totalPoints: number;
}

const BadgesPanel: React.FC<BadgesPanelProps> = ({ badges, totalPoints }) => {
  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'completion': return Trophy;
      case 'streak': return Zap;
      case 'performance': return Star;
      case 'special': return Crown;
      default: return Medal;
    }
  };

  const getBadgeColor = (color: string) => {
    const colors = {
      gold: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      silver: 'bg-gray-100 text-gray-800 border-gray-300',
      bronze: 'bg-orange-100 text-orange-800 border-orange-300',
      blue: 'bg-blue-100 text-blue-800 border-blue-300',
      green: 'bg-green-100 text-green-800 border-green-300',
      purple: 'bg-purple-100 text-purple-800 border-purple-300',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const availableBadges = [
    {
      id: 'first-course',
      title: 'Primeiro Passo',
      description: 'Complete seu primeiro curso',
      type: 'completion',
      color: 'bronze',
      requirement: 'Complete 1 curso'
    },
    {
      id: 'three-courses',
      title: 'Estudante Dedicado',
      description: 'Complete 3 cursos',
      type: 'completion',
      color: 'silver',
      requirement: 'Complete 3 cursos'
    },
    {
      id: 'ten-courses',
      title: 'Expert em Aprendizado',
      description: 'Complete 10 cursos',
      type: 'completion',
      color: 'gold',
      requirement: 'Complete 10 cursos'
    },
    {
      id: 'week-streak',
      title: 'Semana Completa',
      description: 'Estude por 7 dias consecutivos',
      type: 'streak',
      color: 'green',
      requirement: '7 dias seguidos'
    },
    {
      id: 'perfect-score',
      title: 'Pontuação Perfeita',
      description: 'Tire nota máxima em um quiz',
      type: 'performance',
      color: 'purple',
      requirement: '100% em um quiz'
    },
    {
      id: 'speed-learner',
      title: 'Aprendiz Rápido',
      description: 'Complete um curso em menos de um dia',
      type: 'special',
      color: 'blue',
      requirement: 'Curso em 1 dia'
    }
  ];

  const earnedBadgeIds = badges.map(b => b.id);
  const unearnedBadges = availableBadges.filter(b => !earnedBadgeIds.includes(b.id));

  return (
    <div className="space-y-6">
      {/* Points Display */}
      <Card>
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Target className="h-8 w-8 text-blue-900" />
            <span className="text-3xl font-bold text-blue-900">{totalPoints}</span>
          </div>
          <p className="text-gray-600">Pontos Totais</p>
        </CardContent>
      </Card>

      {/* Earned Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5" />
            <span>Conquistas Desbloqueadas</span>
            <BadgeComponent variant="outline">{badges.length}</BadgeComponent>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {badges.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Award className="h-12 w-12 mx-auto mb-3 text-gray-300" />
              <p>Nenhuma conquista ainda</p>
              <p className="text-sm">Continue estudando para desbloquear badges!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {badges.map((badge) => {
                const BadgeIcon = getBadgeIcon(badge.type);
                return (
                  <div
                    key={badge.id}
                    className={`p-4 border-2 rounded-lg ${getBadgeColor(badge.color)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <BadgeIcon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{badge.title}</h4>
                        <p className="text-sm opacity-90 mb-2">{badge.description}</p>
                        <p className="text-xs opacity-75">
                          Conquistado em {new Date(badge.earnedAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Próximas Conquistas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unearnedBadges.map((badge) => {
              const BadgeIcon = getBadgeIcon(badge.type);
              return (
                <div
                  key={badge.id}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 opacity-75"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-200 rounded-lg">
                      <BadgeIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-700">{badge.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                      <BadgeComponent variant="outline" className="text-xs">
                        {badge.requirement}
                      </BadgeComponent>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgesPanel;

