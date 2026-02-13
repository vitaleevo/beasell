"use client";

import { CourseForm } from "@/features/courses/components/admin/CourseForm";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function NewCoursePage() {
    const router = useRouter();
    const createCourse = useMutation(api.courses.createCourse);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (values: any) => {
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
        <div className="p-8 max-w-5xl mx-auto">
            <div className="mb-8">
                <Link href="/admin/cursos">
                    <Button variant="ghost" className="mb-4 pl-0">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a lista
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Novo Curso</h1>
                <p className="text-gray-600">Preencha as informações básicas para começar.</p>
            </div>

            <CourseForm onSubmit={onSubmit} loading={loading} />
        </div>
    );
}

