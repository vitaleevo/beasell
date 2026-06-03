"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Award, BookOpen, CalendarCheck, CheckCircle2, ShieldCheck, XCircle } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

function formatDate(timestamp: number | null | undefined) {
  if (!timestamp) return "Sem data";
  return new Intl.DateTimeFormat("pt-AO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(timestamp));
}

export default function CertificateVerificationPage() {
  const params = useParams<{ code: string }>();
  const certificate = useQuery(api.certificates.verifyByCode, { code: params.code });

  if (certificate === undefined) {
    return (
      <section className="mx-auto flex min-h-[520px] max-w-5xl items-center justify-center px-4 py-16">
        <p className="text-sm font-semibold text-gray-500">A verificar certificado...</p>
      </section>
    );
  }

  if (certificate === null) {
    return (
      <section className="mx-auto flex min-h-[520px] max-w-4xl items-center justify-center px-4 py-16">
        <Card className="w-full border-0 shadow-sm">
          <CardContent className="p-10 text-center">
            <XCircle className="mx-auto h-14 w-14 text-red-500" />
            <h1 className="mt-5 text-3xl font-black tracking-tight text-gray-950">
              Certificado não encontrado
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-gray-500">
              O código informado não corresponde a um certificado activo da Beasell.
            </p>
            <Button asChild className="mt-8 bg-blue-900 text-white hover:bg-blue-800">
              <Link href="/plataforma/cursos">Ver cursos</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );
  }

  const { certificate: issuedCertificate, course } = certificate;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-5 border-b border-gray-200 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge className="mb-4 bg-green-50 text-green-700 hover:bg-green-50">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Certificado verificado
          </Badge>
          <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-5xl">
            Certificado Beasell
          </h1>
          <p className="mt-3 max-w-3xl text-gray-600">
            Este certificado foi emitido pela Beasell Angola e encontra-se activo.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">Código</p>
          <p className="mt-1 font-mono text-lg font-black text-blue-900">
            {issuedCertificate.certificateNumber}
          </p>
        </div>
      </div>

      <Card className="overflow-hidden border-0 bg-white shadow-sm">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
            <div className="flex min-h-80 items-center justify-center bg-blue-950 p-10 text-white">
              <div className="text-center">
                <Award className="mx-auto h-24 w-24 text-orange-400" />
                <p className="mt-6 text-sm font-bold tracking-[0.25em] text-blue-200 uppercase">
                  Beasell Angola
                </p>
                <p className="mt-2 text-3xl font-black">Certificado</p>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="h-5 w-5" />
                <span className="text-sm font-bold">Autenticidade confirmada</span>
              </div>

              <p className="mt-8 text-sm font-bold tracking-widest text-gray-400 uppercase">
                Concedido a
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-gray-950">
                {issuedCertificate.recipientName}
              </h2>

              <p className="mt-8 text-sm font-bold tracking-widest text-gray-400 uppercase">
                Curso concluído
              </p>
              <h3 className="mt-2 text-2xl font-black text-blue-900">
                {issuedCertificate.courseTitle}
              </h3>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CalendarCheck className="h-4 w-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">Emissão</span>
                  </div>
                  <p className="mt-2 font-semibold text-gray-900">
                    {formatDate(issuedCertificate.issuedAt)}
                  </p>
                </div>
                <div className="rounded-2xl bg-gray-50 p-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <BookOpen className="h-4 w-4" />
                    <span className="text-xs font-bold tracking-widest uppercase">Aulas</span>
                  </div>
                  <p className="mt-2 font-semibold text-gray-900">
                    {issuedCertificate.completedLessons}/{issuedCertificate.totalLessons} concluídas
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {course && (
                  <Button asChild className="bg-blue-900 text-white hover:bg-blue-800">
                    <Link href={`/plataforma/cursos/${course.slug}`}>Ver curso</Link>
                  </Button>
                )}
                <Button asChild variant="outline">
                  <Link href="/plataforma/cursos">Explorar formações</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
