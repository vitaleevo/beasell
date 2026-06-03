"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  CreditCard,
  GraduationCap,
} from "lucide-react";
import ProtectedLayout from "@/shared/components/layout/ProtectedLayout";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";
import { Skeleton } from "@/shared/components/ui/skeleton";

function MyCoursesContent() {
  const rows = useQuery(api.courses.getMyCourses);

  if (rows === undefined) {
    return (
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-80 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-4 border-b border-gray-200 pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge className="mb-4 bg-blue-50 text-blue-900 hover:bg-blue-50">
            <GraduationCap className="mr-2 h-4 w-4" />
            Área do aluno
          </Badge>
          <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-4xl">
            Meus cursos
          </h1>
          <p className="mt-2 max-w-3xl text-gray-600">
            Continue de onde parou e acompanhe o seu progresso nas formações Beasell.
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href="/plataforma/cursos">Explorar cursos</Link>
        </Button>
      </section>

      {rows.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-10 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">Ainda não está inscrito</h2>
            <p className="mt-2 text-gray-500">
              Escolha um curso no catálogo para começar a aprender.
            </p>
            <Button asChild className="mt-6 bg-blue-900 text-white hover:bg-blue-800">
              <Link href="/plataforma/cursos">Ver catálogo</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rows.map(({ course, enrollment, payment, totalLessons, firstLessonId, certificate }) => {
            const continueHref = firstLessonId
              ? `/plataforma/cursos/${course.slug}/aulas/${firstLessonId}`
              : `/plataforma/cursos/${course.slug}`;
            const isPaymentBlocked = payment.requiresPayment && !payment.canAccessLessons;

            return (
              <Card key={enrollment._id} className="overflow-hidden border-0 shadow-sm">
                <RemoteImageFrame
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="aspect-video w-full"
                />
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <Badge
                      className={
                        isPaymentBlocked
                          ? "bg-amber-50 text-amber-700 hover:bg-amber-50"
                          : enrollment.status === "completed"
                            ? "bg-green-50 text-green-700 hover:bg-green-50"
                            : "bg-blue-50 text-blue-900 hover:bg-blue-50"
                      }
                    >
                      {isPaymentBlocked ? (
                        <CreditCard className="mr-2 h-4 w-4" />
                      ) : enrollment.status === "completed" ? (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      ) : (
                        <BookOpen className="mr-2 h-4 w-4" />
                      )}
                      {isPaymentBlocked
                        ? payment.status === "rejected"
                          ? "Pagamento rejeitado"
                          : "Pagamento pendente"
                        : enrollment.status === "completed"
                          ? "Concluído"
                          : "Em curso"}
                    </Badge>
                    <span className="text-xs font-semibold text-gray-400">
                      {totalLessons} aulas
                    </span>
                  </div>

                  <h2 className="text-xl leading-tight font-black text-gray-950">{course.title}</h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                    {course.description}
                  </p>

                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between text-sm font-medium">
                      <span className="text-gray-500">Progresso</span>
                      <span className="text-blue-900">{enrollment.progress}%</span>
                    </div>
                    <Progress value={enrollment.progress} className="h-2" />
                  </div>

                  {isPaymentBlocked && (
                    <div className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                      <div className="flex gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>
                          Acesso bloqueado até aprovação do pagamento pelo dono/professor.
                        </span>
                      </div>
                    </div>
                  )}

                  <Button asChild className="mt-6 w-full bg-blue-900 text-white hover:bg-blue-800">
                    <Link
                      href={isPaymentBlocked ? `/plataforma/cursos/${course.slug}` : continueHref}
                    >
                      {isPaymentBlocked ? "Ver pagamento" : "Continuar"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  {certificate && (
                    <Button asChild variant="outline" className="mt-3 w-full">
                      <Link href={`/certificados/${certificate.verificationCode}`}>
                        <Award className="mr-2 h-4 w-4" />
                        Ver certificado
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MyCoursesPage() {
  return (
    <ProtectedLayout allowedRoles={["student", "admin"]}>
      <MyCoursesContent />
    </ProtectedLayout>
  );
}
