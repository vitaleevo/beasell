"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";
import {
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  Clock,
  GraduationCap,
  Mail,
  Trophy,
  UserRound,
} from "lucide-react";

function formatDate(timestamp: number | null | undefined) {
  if (!timestamp) return "Sem registo";
  return new Intl.DateTimeFormat("pt-AO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(timestamp));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0,
  }).format(value);
}

function paymentLabel(status: string | undefined) {
  if (status === "approved") return "Pagamento aprovado";
  if (status === "submitted") return "Comprovativo submetido";
  if (status === "pending") return "Pagamento pendente";
  if (status === "rejected") return "Pagamento rejeitado";
  if (status === "not_required") return "Sem pagamento";
  return "Pagamento legado";
}

export default function StudentDetailPage() {
  const { id } = useParams();
  const detail = useQuery(api.users.getStudentDetail, { userId: id as Id<"users"> });

  if (detail === undefined) {
    return (
      <AdminPageShell>
        <p className="text-sm font-medium text-gray-500">A carregar detalhes do aluno...</p>
      </AdminPageShell>
    );
  }

  if (detail === null) {
    return (
      <AdminPageShell>
        <AdminPageHeader
          eyebrow="Alunos"
          icon={UserRound}
          title="Aluno não encontrado"
          description="O registo solicitado não existe ou não pertence a um aluno."
          actions={
            <Link href="/admin/alunos">
              <Button variant="ghost" className="pl-0">
                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
            </Link>
          }
        />
      </AdminPageShell>
    );
  }

  const initials = detail.user.name.substring(0, 2).toUpperCase();

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Perfil do aluno"
        icon={UserRound}
        title={detail.user.name}
        description={detail.user.email}
        actions={
          <Link href="/admin/alunos">
            <Button variant="ghost" className="pl-0">
              <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-6">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={detail.user.imageUrl ?? undefined} alt={detail.user.name} />
                  <AvatarFallback className="bg-blue-100 text-lg font-black text-blue-900">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h2 className="truncate text-lg font-black text-gray-900">{detail.user.name}</h2>
                  <Badge variant="outline" className="mt-2">
                    {detail.user.status === "active" ? "Activo" : detail.user.status}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{detail.user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Registo: {formatDate(detail.user.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>Última actividade: {formatDate(detail.stats.lastActivity)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                Resumo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Cursos inscritos</span>
                <span className="font-black text-gray-900">{detail.stats.totalCourses}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Cursos concluídos</span>
                <span className="font-black text-gray-900">{detail.stats.completedCourses}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Aulas concluídas</span>
                <span className="font-black text-gray-900">
                  {detail.stats.totalCompletedLessons}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Certificados</span>
                <span className="font-black text-gray-900">{detail.stats.certificatesEarned}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Valor pago</span>
                <span className="font-black text-gray-900">
                  {formatCurrency(detail.stats.totalAmountPaid)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progresso médio</span>
                  <span className="font-black text-gray-900">{detail.stats.averageProgress}%</span>
                </div>
                <Progress value={detail.stats.averageProgress} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              {
                label: "Activos",
                value: detail.stats.activeEnrollments,
                icon: BookOpen,
                className: "bg-blue-50 text-blue-600",
              },
              {
                label: "Concluídos",
                value: detail.stats.completedCourses,
                icon: Trophy,
                className: "bg-green-50 text-green-600",
              },
              {
                label: "Aulas feitas",
                value: detail.stats.totalCompletedLessons,
                icon: GraduationCap,
                className: "bg-orange-50 text-orange-600",
              },
              {
                label: "Certificados",
                value: detail.stats.certificatesEarned,
                icon: Award,
                className: "bg-violet-50 text-violet-600",
              },
            ].map((stat) => (
              <Card key={stat.label} className="border-0 shadow-sm">
                <CardContent className="flex items-center gap-4 p-5">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.className}`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Cursos do aluno</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {detail.courses.length === 0 ? (
                <div className="rounded-2xl bg-gray-50 p-8 text-center">
                  <p className="text-sm font-semibold text-gray-700">Sem inscrições</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Quando o aluno se inscrever, os cursos aparecerão aqui.
                  </p>
                </div>
              ) : (
                detail.courses.map((course) => (
                  <div
                    key={course.enrollment._id}
                    className="rounded-2xl border border-gray-100 p-4 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                      <div className="flex h-20 w-full items-center justify-center rounded-xl bg-blue-50 text-blue-700 md:w-32">
                        <BookOpen className="h-7 w-7" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="font-black text-gray-900">{course.course.title}</h3>
                            <p className="mt-1 text-xs text-gray-400">
                              Inscrito em {formatDate(course.enrollment.enrolledAt)}
                            </p>
                          </div>
                          <Badge
                            className={
                              course.enrollment.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          >
                            {course.enrollment.status === "completed" ? "Concluído" : "Activo"}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                            <span>
                              {course.completedLessonsCount}/{course.totalLessons} aulas
                            </span>
                            <span>{course.enrollment.progress}%</span>
                          </div>
                          <Progress value={course.enrollment.progress} />
                        </div>

                        <div className="grid gap-2 text-xs text-gray-500 sm:grid-cols-2 lg:grid-cols-4">
                          <span>Pago: {formatCurrency(course.enrollment.amountPaid ?? 0)}</span>
                          <span>{paymentLabel(course.enrollment.paymentStatus)}</span>
                          <span>Concluído: {formatDate(course.enrollment.completedAt)}</span>
                          <Link
                            href={`/admin/cursos/${course.course._id}`}
                            className="font-bold text-blue-900 hover:underline"
                          >
                            Abrir curso
                          </Link>
                          {course.certificate ? (
                            <Link
                              href={`/certificados/${course.certificate.verificationCode}`}
                              className="font-bold text-green-700 hover:underline"
                            >
                              Certificado
                            </Link>
                          ) : (
                            <span>Certificado: sem emissão</span>
                          )}
                        </div>

                        {course.completedLessons.length > 0 && (
                          <div className="rounded-xl bg-white p-3">
                            <p className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                              Últimas aulas concluídas
                            </p>
                            <div className="space-y-2">
                              {course.completedLessons.slice(0, 4).map((lesson) => (
                                <div
                                  key={lesson.lessonId}
                                  className="flex items-center justify-between gap-3 text-xs"
                                >
                                  <span className="min-w-0 truncate text-gray-700">
                                    {lesson.moduleTitle}: {lesson.title}
                                  </span>
                                  <span className="shrink-0 text-gray-400">
                                    {formatDate(lesson.completedAt)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminPageShell>
  );
}
