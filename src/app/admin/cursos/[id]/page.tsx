"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { CourseForm } from "@/features/courses/components/admin/CourseForm";
import { ModuleLessonManager } from "@/features/courses/components/admin/ModuleLessonManager";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { ChevronLeft, Layout, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Id } from "../../../../../convex/_generated/dataModel";

export default function EditCoursePage() {
    const { id } = useParams();
    const course = useQuery(api.courses.getFullCourse, { courseId: id as Id<"courses"> });
    const updateCourse = useMutation(api.courses.updateCourse);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    if (course === undefined) return <div className="p-8">A carregar detalhes do curso...</div>;
    if (course === null) return <div className="p-8 text-red-500">Curso não encontrado.</div>;

    const onUpdateMetadata = async (values: any) => {
        setLoading(true);
        try {
            await updateCourse({ id: course._id, ...values });
            toast.success("Curso actualizado!");
        } catch (e) {
            toast.error("Erro ao guardar alterações");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="mb-8">
                <Link href="/admin/cursos">
                    <Button variant="ghost" className="mb-4 pl-0">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Voltar para a lista
                    </Button>
                </Link>
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                        <p className="text-gray-600">ID: {course._id}</p>
                    </div>
                    <Link href={`/plataforma/cursos/${course.slug}`}>
                        <Button variant="outline">Visualizar como aluno</Button>
                    </Link>
                </div>
            </div>

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
                            description: course.description,
                            thumbnailUrl: course.thumbnailUrl,
                            price: course.price,
                            isPublished: course.isPublished,
                        }}
                        onSubmit={onUpdateMetadata}
                        loading={loading}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
