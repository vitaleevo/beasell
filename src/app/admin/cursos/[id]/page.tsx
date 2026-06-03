"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useParams } from "next/navigation";
import { CourseForm, type CourseFormValues } from "@/features/courses/components/admin/CourseForm";
import { ModuleLessonManager } from "@/features/courses/components/admin/ModuleLessonManager";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { BookOpen, ChevronLeft, Layout, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import type { Id } from "@convex/_generated/dataModel";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";

export default function EditCoursePage() {
  const { id } = useParams();
  const course = useQuery(api.courses.getFullCourse, { courseId: id as Id<"courses"> });
  const updateCourse = useMutation(api.courses.updateCourse);
  const [loading, setLoading] = useState(false);

  if (course === undefined) {
    return (
      <AdminPageShell>
        <p className="text-sm font-medium text-gray-500">A carregar detalhes do curso...</p>
      </AdminPageShell>
    );
  }

  if (course === null) {
    return (
      <AdminPageShell>
        <p className="text-sm font-medium text-red-500">Curso não encontrado.</p>
      </AdminPageShell>
    );
  }

  const onUpdateMetadata = async (values: CourseFormValues) => {
    setLoading(true);
    try {
      await updateCourse({ id: course._id, ...values });
      toast.success("Curso actualizado!");
    } catch {
      toast.error("Erro ao guardar alterações");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Editor de curso"
        icon={BookOpen}
        title={course.title}
        description={`ID: ${course._id}`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/cursos">
              <Button variant="ghost" className="pl-0">
                <ChevronLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
            </Link>
            <Link href={`/plataforma/cursos/${course.slug}`}>
              <Button variant="outline">Visualizar como aluno</Button>
            </Link>
          </div>
        }
      />

      <Tabs defaultValue="curriculum" className="space-y-6">
        <TabsList>
          <TabsTrigger value="curriculum" className="flex items-center">
            <Layout className="mr-2 h-4 w-4" /> Currículo
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="mr-2 h-4 w-4" /> Definições Gerais
          </TabsTrigger>
        </TabsList>

        <TabsContent value="curriculum">
          <ModuleLessonManager courseId={course._id as Id<"courses">} />
        </TabsContent>

        <TabsContent value="settings">
          <CourseForm
            initialValues={{
              title: course.title,
              slug: course.slug,
              description: course.description ?? course.shortDescription ?? "",
              fullDescription: course.fullDescription ?? "",
              thumbnailUrl: course.thumbnailUrl,
              price: course.price,
              currency: course.currency ?? "AOA",
              category: course.category ?? "",
              level: course.level ?? "Intermediário",
              language: course.language ?? "pt",
              tags: course.tags ?? [],
              objectives: course.objectives ?? [],
              requirements: course.requirements ?? [],
              instructorName: course.instructor?.name ?? "",
              isFree: course.isFree ?? course.price <= 0,
              allowPreview: course.allowPreview ?? true,
              hasPromotion: course.hasPromotion ?? false,
              isPublished: course.isPublished,
              certificateEnabled: course.certificateEnabled !== false,
            }}
            onSubmit={onUpdateMetadata}
            loading={loading}
          />
        </TabsContent>
      </Tabs>
    </AdminPageShell>
  );
}
