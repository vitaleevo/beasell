"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Circle,
  FileText,
  HelpCircle,
  ListChecks,
  LockKeyhole,
  PlayCircle,
  Video,
} from "lucide-react";
import ProtectedLayout from "@/shared/components/layout/ProtectedLayout";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { Skeleton } from "@/shared/components/ui/skeleton";

function LessonIcon({ type }: { type: "video" | "text" | "quiz" }) {
  if (type === "video") return <Video className="h-4 w-4 text-blue-500" />;
  if (type === "quiz") return <HelpCircle className="h-4 w-4 text-orange-500" />;
  return <FileText className="h-4 w-4 text-green-500" />;
}

function LearningPageContent() {
  const params = useParams<{ slug: string; lessonId: string }>();
  const router = useRouter();
  const slug = params.slug;
  const lessonId = params.lessonId as Id<"lessons">;
  const learning = useQuery(
    api.courses.getLearningSession,
    slug && lessonId ? { slug, lessonId } : "skip",
  );
  const enroll = useMutation(api.courses.enroll);
  const toggleCompletion = useMutation(api.courses.toggleCompletion);
  const [isSaving, setIsSaving] = useState(false);

  const handleEnroll = async () => {
    if (!learning || !("course" in learning) || !learning.course) return;

    setIsSaving(true);
    try {
      await enroll({ courseId: learning.course._id });
      const requiresPayment = !learning.course.isFree && learning.course.price > 0;
      toast.success(
        requiresPayment
          ? "Pedido de inscrição criado. Aguarde aprovação do pagamento."
          : "Inscrição confirmada",
      );
      if (requiresPayment) {
        router.push(`/plataforma/cursos/${learning.course.slug}`);
        return;
      }
      const firstLessonId = "firstLessonId" in learning ? learning.firstLessonId : null;
      if (firstLessonId) {
        router.push(`/plataforma/cursos/${learning.course.slug}/aulas/${firstLessonId}`);
      }
    } catch {
      toast.error("Não foi possível concluir a inscrição");
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleCompletion = async () => {
    if (!learning || !("lesson" in learning) || !learning.lesson) return;

    const isCompleted = learning.completedLessonIds.includes(learning.lesson._id);
    setIsSaving(true);
    try {
      await toggleCompletion({
        courseId: learning.course._id,
        lessonId: learning.lesson._id,
        completed: !isCompleted,
      });
      toast.success(isCompleted ? "Aula marcada como pendente" : "Aula concluída");
    } catch {
      toast.error("Não foi possível actualizar o progresso");
    } finally {
      setIsSaving(false);
    }
  };

  if (learning === undefined) {
    return (
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.35fr_0.65fr] lg:px-8">
        <Skeleton className="h-[620px] rounded-xl" />
        <Skeleton className="h-[620px] rounded-xl" />
      </div>
    );
  }

  if (learning === null || ("authRequired" in learning && learning.authRequired)) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <LockKeyhole className="mx-auto h-12 w-12 text-gray-300" />
        <h1 className="mt-4 text-2xl font-black text-gray-950">Acesso indisponível</h1>
        <p className="mt-2 text-gray-500">Entre com a sua conta para aceder às aulas.</p>
      </div>
    );
  }

  if ("requiresEnrollment" in learning && learning.requiresEnrollment) {
    const requiresPayment = "requiresPayment" in learning && learning.requiresPayment;
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <Card className="border-0 text-center shadow-sm">
          <CardContent className="p-10">
            <LockKeyhole className="mx-auto h-12 w-12 text-blue-900" />
            <h1 className="mt-4 text-2xl font-black text-gray-950">
              {requiresPayment ? "Pagamento em validação" : "Inscrição obrigatória"}
            </h1>
            <p className="mt-2 text-gray-500">
              {requiresPayment
                ? "O acesso às aulas será liberado quando o dono/professor aprovar o pagamento."
                : "Inscreva-se no curso para desbloquear o player e acompanhar o progresso."}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              {!requiresPayment && (
                <Button
                  onClick={handleEnroll}
                  disabled={isSaving}
                  className="bg-blue-900 text-white"
                >
                  {isSaving ? "A inscrever..." : "Inscrever-me agora"}
                </Button>
              )}
              <Button asChild variant="outline">
                <Link href={`/plataforma/cursos/${learning.course.slug}`}>Ver detalhes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!("lesson" in learning) || !learning.lesson) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <ListChecks className="mx-auto h-12 w-12 text-gray-300" />
        <h1 className="mt-4 text-2xl font-black text-gray-950">Curso sem aulas</h1>
        <p className="mt-2 text-gray-500">O professor ainda não publicou aulas para este curso.</p>
      </div>
    );
  }

  const lessonContent = learning.lesson.contentUrl ?? learning.lesson.videoUrl ?? "";
  const isCompleted = learning.completedLessonIds.includes(learning.lesson._id);

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[0.34fr_0.66fr] lg:px-8">
      <aside className="space-y-4">
        <Button asChild variant="ghost" className="pl-0 text-gray-500">
          <Link href={`/plataforma/cursos/${learning.course.slug}`}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Detalhes do curso
          </Link>
        </Button>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">{learning.course.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm font-medium text-gray-500">
              <span>
                {learning.completedLessons}/{learning.totalLessons} aulas
              </span>
              <span>{learning.progress}%</span>
            </div>
            <Progress value={learning.progress} className="mt-3 h-2" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Currículo</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[640px] space-y-4 overflow-y-auto pr-2">
            {learning.modules.map((module) => (
              <div key={module._id} className="space-y-2">
                <h2 className="text-sm font-black text-gray-900">{module.title}</h2>
                <div className="space-y-1">
                  {module.lessons.map((lesson) => (
                    <Link
                      key={lesson._id}
                      href={`/plataforma/cursos/${learning.course.slug}/aulas/${lesson._id}`}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                        lesson.isActive
                          ? "bg-blue-900 text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {lesson.isCompleted ? (
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${
                            lesson.isActive ? "text-white" : "text-green-600"
                          }`}
                        />
                      ) : (
                        <Circle
                          className={`h-4 w-4 shrink-0 ${
                            lesson.isActive ? "text-blue-100" : "text-gray-300"
                          }`}
                        />
                      )}
                      <span className="line-clamp-2 flex-1">{lesson.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>

      <main className="space-y-6">
        <Card className="overflow-hidden border-0 shadow-sm">
          <div className="flex aspect-video items-center justify-center bg-slate-950">
            {learning.lesson.type === "video" && lessonContent ? (
              <iframe
                src={lessonContent}
                title={learning.lesson.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : learning.lesson.type === "video" ? (
              <div className="text-center text-white">
                <PlayCircle className="mx-auto h-16 w-16 text-white/50" />
                <p className="mt-4 text-sm text-white/70">Vídeo ainda não configurado.</p>
              </div>
            ) : (
              <div className="p-8 text-center text-white">
                <LessonIcon type={learning.lesson.type} />
                <p className="mt-4 text-sm text-white/70">
                  Aula em formato {learning.lesson.type}.
                </p>
              </div>
            )}
          </div>

          <CardContent className="p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                <LessonIcon type={learning.lesson.type} />
                <span className="ml-2 capitalize">{learning.lesson.type}</span>
              </Badge>
              <Badge variant="outline">{learning.lesson.duration ?? 0} min</Badge>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">
              {learning.lesson.title}
            </h1>

            {learning.lesson.type !== "video" && lessonContent && (
              <div className="mt-6 rounded-xl bg-gray-50 p-5 text-sm leading-7 whitespace-pre-wrap text-gray-700">
                {lessonContent}
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button
                onClick={handleToggleCompletion}
                disabled={isSaving}
                className={
                  isCompleted
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }
              >
                <CheckCircle2 className="mr-2 h-5 w-5" />
                {isCompleted ? "Aula concluída" : "Marcar como concluída"}
              </Button>

              <div className="flex gap-2">
                {learning.certificate && (
                  <Button asChild variant="outline">
                    <Link href={`/certificados/${learning.certificate.verificationCode}`}>
                      <Award className="mr-2 h-4 w-4" /> Certificado
                    </Link>
                  </Button>
                )}
                {learning.previousLessonId && (
                  <Button asChild variant="outline">
                    <Link
                      href={`/plataforma/cursos/${learning.course.slug}/aulas/${learning.previousLessonId}`}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                    </Link>
                  </Button>
                )}
                {learning.nextLessonId && (
                  <Button asChild variant="outline">
                    <Link
                      href={`/plataforma/cursos/${learning.course.slug}/aulas/${learning.nextLessonId}`}
                    >
                      Próxima <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default function LessonPage() {
  return (
    <ProtectedLayout allowedRoles={["student", "admin"]}>
      <LearningPageContent />
    </ProtectedLayout>
  );
}
