"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
    Plus,
    GripVertical,
    Video,
    FileText,
    HelpCircle,
    Trash2,
    ChevronDown,
    ChevronUp,
    MoreVertical
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Id } from "@convex/_generated/dataModel";

interface ModuleLessonManagerProps {
    courseId: Id<"courses">;
}

export function ModuleLessonManager({ courseId }: ModuleLessonManagerProps) {
    const fullCourse = useQuery(api.courses.getFullCourse, { courseId });
    const addModule = useMutation(api.courses.addModule);
    const addLesson = useMutation(api.courses.addLesson);

    const [isAddingModule, setIsAddingModule] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState("");

    const handleAddModule = async () => {
        if (!newModuleTitle) return;
        try {
            await addModule({
                courseId,
                title: newModuleTitle,
                order: (fullCourse?.modules.length || 0) + 1,
            });
            setNewModuleTitle("");
            setIsAddingModule(false);
            toast.success("Módulo adicionado!");
        } catch (e) {
            toast.error("Erro ao adicionar módulo");
        }
    };

    const handleAddLesson = async (moduleId: Id<"modules">, type: "video" | "text" | "quiz") => {
        const title = window.prompt("Título da aula:");
        if (!title) return;

        try {
            await addLesson({
                moduleId,
                title,
                type,
                contentUrl: "", // Admin can edit this later
                duration: 0,
                order: 100, // Just append for now
            });
            toast.success("Aula adicionada!");
        } catch (e) {
            toast.error("Erro ao adicionar aula");
        }
    };

    if (!fullCourse) return <div>A carregar currículo...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Estrutura do Curso</h2>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddingModule(true)}
                    className="border-dashed"
                >
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Módulo
                </Button>
            </div>

            {isAddingModule && (
                <Card className="border-blue-200 bg-blue-50/30">
                    <CardContent className="pt-6">
                        <div className="flex gap-4">
                            <input
                                autoFocus
                                className="flex-1 bg-white border rounded px-3 py-2 text-sm"
                                placeholder="Título do módulo..."
                                value={newModuleTitle}
                                onChange={(e) => setNewModuleTitle(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddModule()}
                            />
                            <Button onClick={handleAddModule} size="sm">Adicionar</Button>
                            <Button variant="ghost" onClick={() => setIsAddingModule(false)} size="sm">Cancelar</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="space-y-4">
                {fullCourse.modules.map((module) => (
                    <Card key={module._id} className="overflow-hidden">
                        <div className="bg-gray-50/80 p-4 flex items-center justify-between border-b">
                            <div className="flex items-center gap-3">
                                <GripVertical className="h-4 w-4 text-gray-400" />
                                <span className="font-bold text-gray-700">{module.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <CardContent className="p-0">
                            <div className="divide-y">
                                {module.lessons.map((lesson) => (
                                    <div key={lesson._id} className="p-4 flex items-center justify-between hover:bg-gray-50 group">
                                        <div className="flex items-center gap-3">
                                            {lesson.type === 'video' ? <Video className="h-4 w-4 text-blue-500" /> :
                                                lesson.type === 'quiz' ? <HelpCircle className="h-4 w-4 text-orange-500" /> :
                                                    <FileText className="h-4 w-4 text-green-500" />}
                                            <span className="text-sm font-medium text-gray-700">{lesson.title}</span>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 bg-gray-50/30 border-t flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-blue-900"
                                    onClick={() => handleAddLesson(module._id, 'video')}
                                >
                                    <Plus className="mr-1 h-3 w-3" /> Vídeo
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-green-700"
                                    onClick={() => handleAddLesson(module._id, 'text')}
                                >
                                    <Plus className="mr-1 h-3 w-3" /> Texto
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs text-orange-600"
                                    onClick={() => handleAddLesson(module._id, 'quiz')}
                                >
                                    <Plus className="mr-1 h-3 w-3" /> Quiz
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
