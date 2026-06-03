"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";
import {
  Users,
  BookOpen,
  FileText,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  PlusCircle,
  Clock,
  LayoutDashboard,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

type DashboardStats = {
  totalStudents: number;
  totalCourses: number;
  activeEnrollments: number;
  totalPosts: number;
};

const statCards: {
  label: string;
  sub: string;
  value: (stats?: DashboardStats | null) => number;
  icon: LucideIcon;
  iconClassName: string;
  accentClassName: string;
}[] = [
  {
    label: "Total Alunos",
    sub: "Registados",
    value: (stats) => stats?.totalStudents ?? 0,
    icon: Users,
    iconClassName: "bg-blue-50 text-blue-600",
    accentClassName: "bg-blue-900",
  },
  {
    label: "Cursos Activos",
    sub: "Disponíveis",
    value: (stats) => stats?.totalCourses ?? 0,
    icon: BookOpen,
    iconClassName: "bg-orange-50 text-orange-600",
    accentClassName: "bg-orange-900",
  },
  {
    label: "Inscrições",
    sub: "Em curso",
    value: (stats) => stats?.activeEnrollments ?? 0,
    icon: ShoppingCart,
    iconClassName: "bg-green-50 text-green-600",
    accentClassName: "bg-green-900",
  },
  {
    label: "Posts Blog",
    sub: "Conteúdos",
    value: (stats) => stats?.totalPosts ?? 0,
    icon: FileText,
    iconClassName: "bg-violet-50 text-violet-600",
    accentClassName: "bg-violet-900",
  },
];

const activityPresentation = {
  completion: {
    icon: TrendingUp,
    iconClassName: "bg-green-50 text-green-600",
  },
  enrollment: {
    icon: ShoppingCart,
    iconClassName: "bg-blue-50 text-blue-600",
  },
  user: {
    icon: Users,
    iconClassName: "bg-orange-50 text-orange-600",
  },
  post: {
    icon: FileText,
    iconClassName: "bg-violet-50 text-violet-600",
  },
};

type ActivityType = keyof typeof activityPresentation;

function formatRelativeTime(timestamp: number) {
  const elapsedMs = Date.now() - timestamp;
  const elapsedMinutes = Math.max(0, Math.floor(elapsedMs / (60 * 1000)));

  if (elapsedMinutes < 1) return "Agora";
  if (elapsedMinutes < 60) return `Há ${elapsedMinutes} min`;

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `Há ${elapsedHours} h`;

  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedDays < 30) return `Há ${elapsedDays} d`;

  return new Intl.DateTimeFormat("pt-AO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(timestamp));
}

export default function AdminDashboard() {
  const stats = useQuery(api.users.getStats);
  const recentActivity = useQuery(api.users.getRecentActivity);
  const platformHealth = useQuery(api.operations.getPlatformHealth);
  const healthStatus =
    platformHealth?.status === "attention"
      ? {
          label: "Atenção",
          className: "bg-amber-50 text-amber-700",
          iconClassName: "text-amber-600",
          icon: AlertTriangle,
        }
      : platformHealth?.status === "watch"
        ? {
            label: "Em observação",
            className: "bg-blue-50 text-blue-700",
            iconClassName: "text-blue-600",
            icon: Clock,
          }
        : {
            label: "Saudável",
            className: "bg-green-50 text-green-700",
            iconClassName: "text-green-600",
            icon: ShieldCheck,
          };
  const HealthIcon = healthStatus.icon;

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Gestão principal"
        icon={LayoutDashboard}
        title="Painel de Controlo"
        description="Bem-vindo de volta! Aqui está o que está a acontecer na Beasell hoje."
        actions={
          <Link href="/admin/cursos/novo">
            <Button className="h-12 rounded-xl bg-blue-900 px-6 text-white shadow-lg transition-all hover:bg-black">
              <PlusCircle className="mr-2 h-5 w-5" /> Novo Curso
            </Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            className="relative overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-md"
          >
            <CardHeader className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                {stat.label}
              </CardTitle>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-transform ${stat.iconClassName}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="text-3xl font-black text-gray-900">{stat.value(stats)}</div>
              <p className="mt-1 text-xs font-medium text-gray-400">{stat.sub} na plataforma</p>
            </CardContent>
            <div
              className={`absolute -right-4 -bottom-4 h-24 w-24 rounded-full opacity-5 ${stat.accentClassName}`}
            />
          </Card>
        ))}
      </div>

      <div className="grid min-w-0 gap-8 lg:grid-cols-3">
        <Card className="min-w-0 border-0 shadow-sm lg:col-span-2">
          <CardHeader className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <CardTitle className="text-xl">Actividade Recente</CardTitle>
              <p className="mt-1 text-sm text-gray-400">Acções recentes dos utilizadores</p>
            </div>
            <Link
              href="/admin/alunos"
              className="flex items-center gap-1 text-sm font-bold text-blue-900 hover:underline"
            >
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="min-w-0 space-y-2">
              {recentActivity === undefined ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`activity-loading-${index}`}
                    className="flex items-center gap-4 rounded-2xl p-4"
                  >
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-100" />
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="h-4 w-3/4 rounded bg-gray-100" />
                      <div className="h-3 w-24 rounded bg-gray-100" />
                    </div>
                  </div>
                ))
              ) : recentActivity.length === 0 ? (
                <div className="rounded-2xl bg-gray-50 p-8 text-center">
                  <p className="text-sm font-semibold text-gray-700">Sem actividade recente</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Inscrições, conclusões, novos alunos e posts aparecerão aqui.
                  </p>
                </div>
              ) : (
                recentActivity.map((item) => {
                  const presentation =
                    activityPresentation[item.type as ActivityType] ?? activityPresentation.user;
                  const Icon = presentation.icon;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="group flex min-w-0 items-center gap-3 rounded-2xl border border-transparent p-3 transition-all hover:border-gray-100 hover:bg-gray-50 sm:gap-4 sm:p-4"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${presentation.iconClassName}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-5 font-bold break-words text-gray-900">
                          {item.actor}{" "}
                          <span className="font-medium text-gray-500">{item.action}</span>
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-[11px] font-medium text-gray-400">
                          <Clock className="h-3 w-3" />
                          {formatRelativeTime(item.timestamp)}
                        </div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="relative overflow-hidden border-0 bg-blue-900 text-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Acesso Rápido</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-4 text-blue-100">
              <div className="space-y-3">
                {[
                  { label: "Gestão de Alunos", href: "/admin/alunos" },
                  { label: "Publicar no Blog", href: "/admin/conteudos" },
                  { label: "Relatórios Anuais", href: "/admin/analise" },
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="block">
                    <Button
                      variant="ghost"
                      className="mb-2 h-12 w-full justify-start px-4 font-bold text-blue-100 hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                Estado do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className={`flex items-center gap-3 rounded-xl p-4 ${healthStatus.className}`}>
                <HealthIcon className={`h-5 w-5 shrink-0 ${healthStatus.iconClassName}`} />
                <div>
                  <p className="text-sm font-black">{healthStatus.label}</p>
                  <p className="mt-1 text-xs font-medium opacity-80">
                    {platformHealth
                      ? `Verificado às ${new Intl.DateTimeFormat("pt-AO", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(platformHealth.checkedAt))}`
                      : "A carregar sinais operacionais"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {(platformHealth?.checks ?? []).map((check) => (
                  <div key={check.label} className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-gray-600">{check.label}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-black ${
                          check.status === "attention"
                            ? "bg-amber-50 text-amber-700"
                            : check.status === "watch"
                              ? "bg-blue-50 text-blue-700"
                              : "bg-green-50 text-green-700"
                        }`}
                      >
                        {check.value}
                      </span>
                    </div>
                  </div>
                ))}
                {platformHealth === undefined &&
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={`health-loading-${index}`} className="h-8 rounded-lg bg-gray-100" />
                  ))}
                {platformHealth?.metrics.staleSubmittedPayments ? (
                  <p className="rounded-lg bg-amber-50 p-3 text-xs font-semibold text-amber-800">
                    {platformHealth.metrics.staleSubmittedPayments} pagamento(s) submetido(s) há
                    mais de 48h precisam de revisão.
                  </p>
                ) : null}
                <Link href="/admin/pagamentos" className="block">
                  <Button variant="outline" className="w-full">
                    Rever pagamentos
                  </Button>
                </Link>
                <Link href="/admin/settings" className="block">
                  <Button variant="ghost" className="w-full">
                    Ver configuração
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageShell>
  );
}
