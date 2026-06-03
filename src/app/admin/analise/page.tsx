"use client";

import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
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
  Cell,
} from "recharts";
import { TrendingUp, Users, DollarSign, Clock, Target } from "lucide-react";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";

type TimeRange = "7d" | "30d" | "90d" | "1y";

const emptyDistribution = [{ name: "Sem dados", value: 1, color: "#e5e7eb" }];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0,
  }).format(value);
}

function escapeCsvValue(value: string | number) {
  const stringValue = String(value);
  return /[",\n]/.test(stringValue) ? `"${stringValue.replace(/"/g, '""')}"` : stringValue;
}

function ChartFrame({ children }: { children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver(([entry]) => {
      setIsReady(entry.contentRect.width > 0 && entry.contentRect.height > 0);
    });

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className="h-[300px] min-w-0 w-full">
      {isReady ? children : <div aria-hidden="true" className="h-full w-full" />}
    </div>
  );
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const analytics = useQuery(api.courses.getAdminAnalytics, { range: timeRange });

  const stats = analytics?.stats ?? {
    totalRevenue: 0,
    totalStudents: 0,
    activeCourses: 0,
    totalCourses: 0,
    activeEnrollments: 0,
    periodEnrollments: 0,
    totalPosts: 0,
    completionRate: 0,
    averageProgress: 0,
  };
  const revenueData = analytics?.revenueData ?? [];
  const userActivity = analytics?.userActivity ?? [];
  const courseDistribution =
    analytics?.courseDistribution && analytics.courseDistribution.length > 0
      ? analytics.courseDistribution
      : emptyDistribution;
  const courseEngagement = analytics?.courseEngagement ?? [];
  const isLoading = analytics === undefined;

  const handleExportCsv = () => {
    if (!analytics) return;

    const rows: Array<Array<string | number>> = [
      ["Relatório Beasell", timeRange],
      [],
      ["Métrica", "Valor"],
      ["Receita total", stats.totalRevenue],
      ["Total alunos", stats.totalStudents],
      ["Cursos publicados", stats.activeCourses],
      ["Inscrições activas", stats.activeEnrollments],
      ["Inscrições no período", stats.periodEnrollments],
      ["Taxa de conclusão", `${stats.completionRate}%`],
      ["Progresso médio", `${stats.averageProgress}%`],
      [],
      ["Receita por período"],
      ["Período", "Receita", "Novos alunos"],
      ...revenueData.map((item) => [item.month, item.revenue, item.students]),
      [],
      ["Actividade"],
      ["Dia", "Registos"],
      ...userActivity.map((item) => [item.day, item.registrations]),
      [],
      ["Engajamento por curso"],
      ["Curso", "Alunos", "Conclusão", "Receita"],
      ...courseEngagement.map((item) => [
        item.course,
        item.enrolled,
        `${item.completion}%`,
        item.revenue,
      ]),
    ];

    const csv = rows.map((row) => row.map(escapeCsvValue).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `beasell-analytics-${timeRange}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Relatórios"
        icon={TrendingUp}
        title="Análise & Relatórios"
        description="Insights detalhados da plataforma Beasell."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <label htmlFor="analytics-range" className="sr-only">
              Período dos relatórios
            </label>
            <select
              id="analytics-range"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="1y">Último ano</option>
            </select>

            <Button
              type="button"
              onClick={handleExportCsv}
              disabled={isLoading}
              className="bg-blue-900 text-white shadow-lg hover:bg-blue-800"
            >
              Exportar CSV
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-green-50 p-3 text-green-600">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Receita Total</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(stats.totalRevenue)}
                </p>
                <div className="mt-1 flex items-center text-xs text-green-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stats.periodEnrollments} inscrições no período
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Alunos</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalStudents}</p>
                <div className="mt-1 flex items-center text-xs text-blue-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stats.activeEnrollments} inscrições activas
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Taxa Conclusão</p>
                <p className="text-xl font-bold text-gray-900">{stats.completionRate}%</p>
                <div className="mt-1 flex items-center text-xs text-purple-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {stats.activeCourses} cursos publicados
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Progresso Médio</p>
                <p className="text-xl font-bold text-gray-900">{stats.averageProgress}%</p>
                <div className="mt-1 flex items-center text-xs text-orange-600">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  progresso médio dos alunos
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="min-w-0 overflow-hidden border-0 shadow-sm">
          <CardHeader className="bg-gray-50/50">
            <CardTitle className="text-lg">Crescimento Financeiro</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartFrame>
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#1e3a8a"
                    radius={[4, 4, 0, 0]}
                    name="Receita (AOA)"
                  />
                  <Bar
                    dataKey="students"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    name="Novos Alunos"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartFrame>
          </CardContent>
        </Card>

        <Card className="min-w-0 overflow-hidden border-0 shadow-sm">
          <CardHeader className="bg-gray-50/50">
            <CardTitle className="text-lg">Utilizadores Activos</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartFrame>
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <LineChart data={userActivity}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="registrations"
                    stroke="#1e3a8a"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#1e3a8a" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartFrame>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="min-w-0 overflow-hidden border-0 shadow-sm">
          <CardHeader className="bg-gray-50/50">
            <CardTitle className="text-lg">Distribuição de Cursos</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ChartFrame>
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartFrame>
            <div className="mt-4 flex justify-center gap-6">
              {courseDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-gray-500">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-0 shadow-sm">
          <CardHeader className="bg-gray-50/50">
            <CardTitle className="text-lg">Engajamento por Conteúdo</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {isLoading ? (
                <p className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-400">
                  A carregar métricas dos cursos...
                </p>
              ) : courseEngagement.length === 0 ? (
                <p className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-400">
                  Ainda não há inscrições suficientes para medir engajamento.
                </p>
              ) : (
                courseEngagement.map((course) => (
                  <div key={course.course} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-gray-700">{course.course}</span>
                      <Badge
                        variant="outline"
                        className="text-[10px] font-bold text-gray-500 uppercase"
                      >
                        {course.enrolled} Alunos
                      </Badge>
                    </div>
                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="absolute top-0 left-0 h-full rounded-full bg-blue-900 transition-all duration-500"
                        style={{ width: `${course.completion}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-medium text-gray-500">
                      <span>Taxa de conclusão</span>
                      <span>
                        {course.completion}% · {formatCurrency(course.revenue)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminPageShell>
  );
}
