"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
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
    DollarSign,
    Clock,
    Target
} from 'lucide-react';

export default function AnalyticsPage() {
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
        <div className="p-8 space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Análise & Relatórios 📊</h1>
                    <p className="text-gray-600">Insights detalhados da plataforma Beasell.</p>
                </div>

                <div className="flex items-center space-x-2">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value as any)}
                        className="bg-white border text-sm border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-900 outline-none"
                    >
                        <option value="7d">Últimos 7 dias</option>
                        <option value="30d">Últimos 30 dias</option>
                        <option value="90d">Últimos 90 dias</option>
                        <option value="1y">Último ano</option>
                    </select>

                    <Button className="bg-blue-900 hover:bg-blue-800 text-white shadow-lg">
                        Exportar CSV
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-50 rounded-xl text-green-600">
                                <DollarSign className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Receita Total</p>
                                <p className="text-xl font-bold text-gray-900">AOA {stats.totalRevenue.toLocaleString()}</p>
                                <div className="mt-1 flex items-center text-xs text-green-600">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    +12.5% vs mês anterior
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                                <Users className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Alunos</p>
                                <p className="text-xl font-bold text-gray-900">{stats.totalStudents}</p>
                                <div className="mt-1 flex items-center text-xs text-blue-600">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    +8.3% vs mês anterior
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                                <Target className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Taxa Conclusão</p>
                                <p className="text-xl font-bold text-gray-900">{stats.completionRate}%</p>
                                <div className="mt-1 flex items-center text-xs text-purple-600">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    +3.2% vs mês anterior
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">Tempo Médio</p>
                                <p className="text-xl font-bold text-gray-900">{stats.avgSessionTime}</p>
                                <div className="mt-1 flex items-center text-xs text-orange-600">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    +5.1% vs mês anterior
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm overflow-hidden">
                    <CardHeader className="bg-gray-50/50">
                        <CardTitle className="text-lg">Crescimento Financeiro</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="revenue" fill="#1e3a8a" radius={[4, 4, 0, 0]} name="Receita (AOA)" />
                                    <Bar dataKey="students" fill="#10b981" radius={[4, 4, 0, 0]} name="Novos Alunos" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm overflow-hidden">
                    <CardHeader className="bg-gray-50/50">
                        <CardTitle className="text-lg">Utilizadores Activos</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={userActivity}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="day"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="activeUsers" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4, fill: '#1e3a8a' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm overflow-hidden">
                    <CardHeader className="bg-gray-50/50">
                        <CardTitle className="text-lg">Distribuição de Planos</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={subscriptionDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {subscriptionDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-4">
                            {subscriptionDistribution.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-xs text-gray-500 font-medium">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-sm overflow-hidden">
                    <CardHeader className="bg-gray-50/50">
                        <CardTitle className="text-lg">Engajamento por Conteúdo</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            {courseEngagement.map((course) => (
                                <div key={course.course} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-gray-700">{course.course}</span>
                                        <Badge variant="outline" className="text-[10px] uppercase font-bold text-gray-500">
                                            {course.enrolled} Alunos
                                        </Badge>
                                    </div>
                                    <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-blue-900 rounded-full transition-all duration-500"
                                            style={{ width: `${course.completion}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[11px] text-gray-500 font-medium">
                                        <span>Taxa de conclusão</span>
                                        <span>{course.completion}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
