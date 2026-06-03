"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, GraduationCap } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";

const formatPrice = (price: number, currency = "AOA") =>
  new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

export default function PlatformCoursesPage() {
  const courses = useQuery(api.courses.list, { onlyPublished: true });

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <Badge className="mb-4 bg-blue-50 text-blue-900 hover:bg-blue-50">
            <GraduationCap className="mr-2 h-4 w-4" />
            Plataforma Beasell
          </Badge>
          <h1 className="text-3xl font-black tracking-tight text-gray-950 sm:text-5xl">
            Cursos para vender melhor em Angola
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
            Escolha uma formação, inscreva-se e acompanhe o seu progresso aula a aula.
          </p>
        </div>

        <Card className="border-0 bg-blue-900 text-white shadow-sm">
          <CardContent className="p-6">
            <p className="text-sm font-semibold text-blue-100">Fluxo completo</p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {["Escolher", "Inscrever", "Concluir"].map((item) => (
                <div key={item} className="rounded-xl bg-white/10 p-3">
                  <p className="text-sm font-bold">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {courses === undefined ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Skeleton key={item} className="h-96 rounded-xl" />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-10 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-gray-300" />
            <h2 className="mt-4 text-xl font-bold text-gray-900">Ainda não há cursos publicados</h2>
            <p className="mt-2 text-gray-500">
              Quando o professor publicar um curso, ele aparecerá aqui automaticamente.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course) => (
            <Card
              key={course._id}
              className="overflow-hidden border-0 shadow-sm transition hover:shadow-lg"
            >
              <RemoteImageFrame
                src={course.thumbnailUrl}
                alt={course.title}
                className="aspect-video w-full"
              />
              <CardContent className="flex min-h-72 flex-col p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="secondary">{course.level ?? "Todos os níveis"}</Badge>
                  <Badge variant="outline">{course.language ?? "Português"}</Badge>
                </div>
                <h2 className="text-xl leading-tight font-black text-gray-950">{course.title}</h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {course.description}
                </p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-gray-500">
                  <Clock className="h-4 w-4" />
                  Aulas organizadas por módulos
                </div>
                <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                  <div className="text-lg font-black text-blue-900">
                    {course.isFree ? "Grátis" : formatPrice(course.price, course.currency)}
                  </div>
                  <Button asChild className="bg-blue-900 text-white hover:bg-blue-800">
                    <Link href={`/plataforma/cursos/${course.slug}`}>
                      Ver curso <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
