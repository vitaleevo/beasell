"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  FileUp,
  GraduationCap,
  LockKeyhole,
  PlayCircle,
} from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Progress } from "@/shared/components/ui/progress";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { authClient } from "@/shared/lib/auth-client";

const formatPrice = (price: number, currency = "AOA") =>
  new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

const formatDuration = (minutes: number) => {
  if (!minutes) return "Duração flexível";
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes ? `${hours}h ${remainingMinutes}min` : `${hours}h`;
};

const MAX_PAYMENT_PROOF_BYTES = 8 * 1024 * 1024;
const PAYMENT_PROOF_ACCEPT = "application/pdf,image/png,image/jpeg,image/webp";

export default function PlatformCourseDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;
  const overview = useQuery(api.courses.getCourseOverviewBySlug, slug ? { slug } : "skip");
  const enroll = useMutation(api.courses.enroll);
  const generatePaymentProofUploadUrl = useMutation(api.payments.generateProofUploadUrl);
  const submitPaymentProof = useMutation(api.payments.submitProof);
  const { data: session } = authClient.useSession();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  const [paymentProofInputKey, setPaymentProofInputKey] = useState(0);

  const handlePaymentProofFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setPaymentProofFile(null);
      return;
    }

    if (!PAYMENT_PROOF_ACCEPT.split(",").includes(file.type)) {
      toast.error("Envie um comprovativo em PDF, PNG, JPG ou WEBP.");
      event.target.value = "";
      setPaymentProofFile(null);
      return;
    }

    if (file.size > MAX_PAYMENT_PROOF_BYTES) {
      toast.error("O comprovativo deve ter no máximo 8 MB.");
      event.target.value = "";
      setPaymentProofFile(null);
      return;
    }

    setPaymentProofFile(file);
  };

  const uploadPaymentProof = async () => {
    if (!paymentProofFile) return undefined;

    const uploadUrl = await generatePaymentProofUploadUrl();
    const response = await fetch(uploadUrl, {
      method: "POST",
      headers: paymentProofFile.type ? { "Content-Type": paymentProofFile.type } : undefined,
      body: paymentProofFile,
    });

    if (!response.ok) {
      throw new Error("Falha no upload do comprovativo.");
    }

    const result = (await response.json()) as { storageId: Id<"_storage"> };
    return result.storageId;
  };

  const resetPaymentProofFile = () => {
    setPaymentProofFile(null);
    setPaymentProofInputKey((key) => key + 1);
  };

  const handleEnroll = async () => {
    if (!overview) return;

    if (!session) {
      router.push(`/sign-in?redirect=/plataforma/cursos/${overview.course.slug}`);
      return;
    }

    setIsEnrolling(true);
    try {
      if (overview.payment.requiresPayment && !paymentProofFile) {
        toast.error("Envie o comprovativo do pagamento antes de pedir inscrição.");
        return;
      }

      const paymentProofStorageId = await uploadPaymentProof();
      await enroll({
        courseId: overview.course._id,
        paymentMethod: paymentMethod || undefined,
        paymentReference: paymentReference || undefined,
        paymentProofStorageId,
      });
      if (overview.payment.requiresPayment) {
        toast.success("Pedido de inscrição criado. Aguarde aprovação do pagamento.");
        resetPaymentProofFile();
      } else {
        toast.success("Inscrição confirmada");
      }
      if (!overview.payment.requiresPayment && overview.firstLessonId) {
        router.push(`/plataforma/cursos/${overview.course.slug}/aulas/${overview.firstLessonId}`);
      }
    } catch {
      toast.error("Não foi possível concluir a inscrição");
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleSubmitPayment = async () => {
    if (!overview) return;

    setIsSubmittingPayment(true);
    try {
      if (!paymentProofFile) {
        toast.error("Envie o comprovativo do pagamento antes de submeter.");
        return;
      }

      const paymentProofStorageId = await uploadPaymentProof();
      await submitPaymentProof({
        courseId: overview.course._id,
        paymentMethod: paymentMethod || undefined,
        paymentReference: paymentReference || undefined,
        paymentProofStorageId,
      });
      toast.success("Comprovativo submetido. O dono irá validar o pagamento.");
      resetPaymentProofFile();
    } catch {
      toast.error("Não foi possível submeter o comprovativo.");
    } finally {
      setIsSubmittingPayment(false);
    }
  };

  if (overview === undefined) {
    return (
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.3fr_0.7fr] lg:px-8">
        <Skeleton className="h-[520px] rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    );
  }

  if (overview === null) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
        <h1 className="mt-4 text-2xl font-black text-gray-950">Curso não encontrado</h1>
        <p className="mt-2 text-gray-500">Este curso não existe ou ainda não foi publicado.</p>
        <Button asChild className="mt-6 bg-blue-900 text-white hover:bg-blue-800">
          <Link href="/plataforma/cursos">Ver cursos publicados</Link>
        </Button>
      </div>
    );
  }

  const { course, modules } = overview;
  const isEnrolled = Boolean(overview.enrollment);
  const payment = overview.payment;
  const isPaymentBlocked = isEnrolled && payment.requiresPayment && !payment.canAccessLessons;
  const startHref = overview.firstLessonId
    ? `/plataforma/cursos/${course.slug}/aulas/${overview.firstLessonId}`
    : null;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" className="w-fit pl-0 text-gray-500">
        <Link href="/plataforma/cursos">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar aos cursos
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <RemoteImageFrame
            src={course.thumbnailUrl}
            alt={course.title}
            className="aspect-[16/8] w-full"
          />
          <div className="p-6 sm:p-8">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-blue-50 text-blue-900 hover:bg-blue-50">
                <GraduationCap className="mr-2 h-4 w-4" />
                Curso Beasell
              </Badge>
              <Badge variant="secondary">{course.level ?? "Todos os níveis"}</Badge>
              <Badge variant="outline">{course.language ?? "Português"}</Badge>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-5xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-7 text-gray-600 sm:text-lg">
              {course.fullDescription ?? course.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Módulos</p>
                <p className="mt-1 text-2xl font-black text-gray-950">{modules.length}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Aulas</p>
                <p className="mt-1 text-2xl font-black text-gray-950">{overview.totalLessons}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Duração</p>
                <p className="mt-1 text-2xl font-black text-gray-950">
                  {formatDuration(overview.totalDuration)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <aside className="sticky top-28 space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <p className="text-sm font-semibold text-gray-500">Investimento</p>
              <p className="mt-2 text-3xl font-black text-blue-900">
                {course.isFree ? "Grátis" : formatPrice(course.price, course.currency)}
              </p>

              {isEnrolled && (
                <div
                  className={`mt-6 rounded-xl p-4 ${
                    isPaymentBlocked ? "bg-amber-50" : "bg-green-50"
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-sm font-bold ${
                      isPaymentBlocked ? "text-amber-700" : "text-green-700"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {isPaymentBlocked ? "Pagamento em validação" : "Inscrição activa"}
                  </div>
                  <Progress
                    value={overview.progress}
                    className={`mt-3 h-2 ${isPaymentBlocked ? "bg-amber-100" : "bg-green-100"}`}
                  />
                  <p className="mt-2 text-xs font-medium text-green-700">
                    {overview.progress}% concluído
                  </p>
                </div>
              )}

              {payment.requiresPayment && !payment.canAccessLessons && (
                <div className="mt-5 space-y-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
                  <div>
                    <p className="text-sm font-bold text-amber-900">Pagamento manual</p>
                    <p className="mt-1 text-xs leading-5 text-amber-800">
                      Envie o comprovativo em PDF ou imagem. O dono/professor abre o ficheiro no
                      backoffice e aprova ou rejeita o acesso.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-method">Método</Label>
                    <Input
                      id="payment-method"
                      value={paymentMethod}
                      onChange={(event) => setPaymentMethod(event.target.value)}
                      placeholder="transferencia, deposito, cash"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-reference">Referência</Label>
                    <Input
                      id="payment-reference"
                      value={paymentReference}
                      onChange={(event) => setPaymentReference(event.target.value)}
                      placeholder="Nº da transferência ou observação"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-proof">Comprovativo</Label>
                    <Input
                      key={paymentProofInputKey}
                      id="payment-proof"
                      type="file"
                      accept={PAYMENT_PROOF_ACCEPT}
                      onChange={handlePaymentProofFileChange}
                    />
                    <div className="flex items-start gap-2 text-xs leading-5 text-amber-800">
                      <FileUp className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>
                        {paymentProofFile
                          ? `${paymentProofFile.name} (${Math.ceil(paymentProofFile.size / 1024)} KB)`
                          : "PDF, PNG, JPG ou WEBP até 8 MB."}
                      </span>
                    </div>
                  </div>
                  {isEnrolled && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-amber-300 bg-white text-amber-900"
                      disabled={isSubmittingPayment}
                      onClick={handleSubmitPayment}
                    >
                      {isSubmittingPayment ? "A submeter..." : "Submeter comprovativo"}
                    </Button>
                  )}
                  {payment.status === "rejected" && (
                    <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700">
                      <p className="font-semibold">
                        Pagamento rejeitado. Envie nova referência ou comprovativo.
                      </p>
                      {payment.adminNote && (
                        <p className="mt-1 leading-5">Orientação do admin: {payment.adminNote}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6">
                {isEnrolled && startHref && payment.canAccessLessons ? (
                  <Button asChild className="h-12 w-full bg-blue-900 text-white hover:bg-blue-800">
                    <Link href={startHref}>
                      <PlayCircle className="mr-2 h-5 w-5" /> Continuar curso
                    </Link>
                  </Button>
                ) : (
                  <Button
                    className="h-12 w-full bg-blue-900 text-white hover:bg-blue-800"
                    onClick={handleEnroll}
                    disabled={isEnrolling || overview.totalLessons === 0 || isEnrolled}
                  >
                    {isEnrolled
                      ? "Aguardar aprovação"
                      : isEnrolling
                        ? "A inscrever..."
                        : payment.requiresPayment
                          ? "Pedir inscrição"
                          : "Inscrever-me"}
                  </Button>
                )}
              </div>

              {overview.totalLessons === 0 && (
                <p className="mt-3 text-sm text-amber-700">
                  Este curso ainda precisa de aulas antes de receber alunos.
                </p>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>O que vai aprender</CardTitle>
          </CardHeader>
          <CardContent>
            {course.objectives?.length ? (
              <ul className="space-y-3">
                {course.objectives.map((objective) => (
                  <li key={objective} className="flex gap-3 text-sm leading-6 text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                    {objective}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-gray-600">
                Acompanhe o conteúdo organizado pelo professor e avance aula a aula.
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Currículo do curso</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {modules.map((module) => (
              <div key={module._id} className="rounded-xl border border-gray-100">
                <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
                  <h3 className="font-bold text-gray-900">{module.title}</h3>
                  <Badge variant="outline">{module.lessons.length} aulas</Badge>
                </div>
                <div className="divide-y">
                  {module.lessons.map((lesson) => (
                    <div key={lesson._id} className="flex items-center gap-3 px-4 py-3">
                      {isEnrolled ? (
                        <CheckCircle2
                          className={`h-4 w-4 ${
                            overview.completedLessonIds.includes(lesson._id)
                              ? "text-green-600"
                              : "text-gray-300"
                          }`}
                        />
                      ) : (
                        <LockKeyhole className="h-4 w-4 text-gray-300" />
                      )}
                      <span className="flex-1 text-sm font-medium text-gray-700">
                        {lesson.title}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        {lesson.duration || 0} min
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
