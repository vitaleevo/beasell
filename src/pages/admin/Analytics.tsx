
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  DollarSign,
  Eye,
  Clock,
  Award,
  Target
} from 'lucide-react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  // Mock data para analytics
  const revenueData = [
    { month: 'Jan', revenue: 450000, students: 25 },
    { month: 'Fev', revenue: 520000, students: 32 },
    { month: 'Mar', revenue: 380000, students: 28 },
    { month: 'Abr', revenue: 680000, students: 45 },
    { month: 'Mai', revenue: 750000, students: 52 },
    { month: 'Jun', revenue: 820000, students: 58 }
  ];

  const courseEngagement = [
    { course: 'Vendas Avançadas', completion: 85, enrolled: 156 },
    { course: 'Atendimento Cliente', completion: 72, enrolled: 89 },
    { course: 'Liderança', completion: 91, enrolled: 134 },
    { course: 'Marketing Digital', completion: 68, enrolled: 67 }
  ];

  const subscriptionDistribution = [
    { name: 'Básico', value: 45, color: '#8884d8' },
    { name: 'Premium', value: 35, color: '#82ca9d' },
    { name: 'Empresarial', value: 20, color: '#ffc658' }
  ];

  const userActivity = [
    { day: 'Seg', activeUsers: 120 },
    { day: 'Ter', activeUsers: 135 },
    { day: 'Qua', activeUsers: 142 },
    { day: 'Qui', activeUsers: 158 },
    { day: 'Sex', activeUsers: 163 },
    { day: 'Sáb', activeUsers: 89 },
    { day: 'Dom', activeUsers: 76 }
  ];

  const stats = {
    totalRevenue: 3600000,
    totalStudents: 240,
    activeCourses: 12,
    completionRate: 74,
    avgSessionTime: '24min',
    churnRate: 8.5
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Relatórios</h1>
            <p className="text-gray-600">Insights detalhados da plataforma</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>
            
            <Button className="bg-blue-900 hover:bg-blue-800">
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold">AOA {stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5% vs mês anterior
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total de Alunos</p>
                  <p className="text-2xl font-bold">{stats.totalStudents}</p>
                  <p className="text-xs text-blue-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.3% vs mês anterior
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Target className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Taxa de Conclusão</p>
                  <p className="text-2xl font-bold">{stats.completionRate}%</p>
                  <p className="text-xs text-purple-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +3.2% vs mês anterior
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Tempo Médio</p>
                  <p className="text-2xl font-bold">{stats.avgSessionTime}</p>
                  <p className="text-xs text-orange-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.1% vs mês anterior
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Receita e Novos Alunos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Receita (AOA)" />
                  <Bar dataKey="students" fill="#10b981" name="Novos Alunos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* User Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Atividade de Usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="activeUsers" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Subscription Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Planos</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subscriptionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Course Engagement */}
          <Card>
            <CardHeader>
              <CardTitle>Engajamento por Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseEngagement.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{course.course}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{course.enrolled} alunos</Badge>
                        <span className="text-sm">{course.completion}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Métricas de Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">92.1%</div>
                <div className="text-sm text-gray-600">Taxa de Satisfação</div>
                <div className="text-xs text-green-600 mt-1">+2.3% vs período anterior</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">{stats.churnRate}%</div>
                <div className="text-sm text-gray-600">Taxa de Churn</div>
                <div className="text-xs text-red-600 mt-1">-1.2% vs período anterior</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">4.7</div>
                <div className="text-sm text-gray-600">Avaliação Média</div>
                <div className="text-xs text-blue-600 mt-1">+0.2% vs período anterior</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Analytics;
