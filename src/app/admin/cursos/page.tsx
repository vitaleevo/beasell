"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Plus, Edit, Trash2, Eye, MoreVertical, BookOpen } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent } from "@/shared/components/ui/card";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";
import { RemoteImageFrame } from "@/shared/components/ui/remote-image-frame";

export default function AdminCoursesPage() {
  const courses = useQuery(api.courses.list, {});
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
    }).format(price);

  const renderCourseActions = (course: NonNullable<typeof courses>[number]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Abrir ações do curso ${course.title}`}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem asChild>
          <Link href={`/admin/cursos/${course._id}`} className="flex items-center">
            <Edit className="mr-2 h-4 w-4" /> Editar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/plataforma/cursos/${course.slug}`} className="flex items-center">
            <Eye className="mr-2 h-4 w-4" /> Ver Preview
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center text-red-600">
          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Cursos"
        icon={BookOpen}
        title="Gestão de Cursos"
        description="Crie, edite e organize o conteúdo dos seus cursos."
        actions={
          <Link href="/admin/cursos/novo">
            <Button className="bg-blue-900 text-white">
              <Plus className="mr-2 h-4 w-4" /> Novo Curso
            </Button>
          </Link>
        }
      />

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100 md:hidden">
            {courses === undefined ? (
              <div className="p-6 text-center text-sm text-gray-400">A carregar cursos...</div>
            ) : courses.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-400">
                Nenhum curso encontrado. Comece por criar um novo!
              </div>
            ) : (
              courses.map((course) => (
                <div key={course._id} className="p-4">
                  <div className="flex items-start gap-3">
                    <RemoteImageFrame
                      src={course.thumbnailUrl}
                      alt={`Capa do curso ${course.title}`}
                      className="h-14 w-20 flex-shrink-0 rounded"
                    />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm leading-5 font-semibold text-gray-950">
                        {course.title}
                      </h2>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        {course.isPublished ? (
                          <Badge className="border-green-200 bg-green-100 text-green-700">
                            Publicado
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Rascunho</Badge>
                        )}
                        <span className="text-sm font-medium text-gray-700">
                          {formatPrice(course.price)}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">
                        {course.stats?.enrollments ?? 0} inscrições
                      </p>
                    </div>
                    {renderCourseActions(course)}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Curso</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Inscrições</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses === undefined ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-gray-400">
                      A carregar cursos...
                    </TableCell>
                  </TableRow>
                ) : courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-10 text-center text-gray-400">
                      Nenhum curso encontrado. Comece por criar um novo!
                    </TableCell>
                  </TableRow>
                ) : (
                  courses.map((course) => (
                    <TableRow key={course._id}>
                      <TableCell>
                        <div className="flex min-w-64 items-center gap-3">
                          <RemoteImageFrame
                            src={course.thumbnailUrl}
                            alt={`Capa do curso ${course.title}`}
                            className="h-10 w-16 flex-shrink-0 rounded"
                          />
                          <span className="font-medium text-gray-900">{course.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>{formatPrice(course.price)}</TableCell>
                      <TableCell>
                        {course.isPublished ? (
                          <Badge className="border-green-200 bg-green-100 text-green-700">
                            Publicado
                          </Badge>
                        ) : (
                          <Badge variant="secondary">Rascunho</Badge>
                        )}
                      </TableCell>
                      <TableCell>{course.stats?.enrollments ?? 0}</TableCell>
                      <TableCell className="text-right">{renderCourseActions(course)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminPageShell>
  );
}
