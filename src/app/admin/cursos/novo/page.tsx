"use client";

import { CourseForm, type CourseFormValues } from "@/features/courses/components/admin/CourseForm";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";

export default function NewCoursePage() {
  const router = useRouter();
  const createCourse = useMutation(api.courses.createCourse);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: CourseFormValues) => {
    setLoading(true);
    try {
      const courseId = await createCourse(values);
      toast.success("Curso criado com sucesso!");
      router.push(`/admin/cursos/${courseId}`);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar o curso. Verifique se o slug é único.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminPageShell className="max-w-5xl">
      <AdminPageHeader
        eyebrow="Cursos"
        icon={BookOpen}
        title="Novo Curso"
        description="Configure capa, instrutor, objetivos, preço, acesso e publicação."
        actions={
          <Link href="/admin/cursos">
            <Button variant="ghost" className="pl-0">
              <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a lista
            </Button>
          </Link>
        }
      />

      <CourseForm onSubmit={onSubmit} loading={loading} />
    </AdminPageShell>
  );
}
