"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Edit,
  FileText,
  GripVertical,
  HelpCircle,
  Link as LinkIcon,
  MoreVertical,
  Plus,
  Save,
  Trash2,
  Video,
} from "lucide-react";
import {
  normalizeVideoSource,
  type VideoProvider,
  videoProviderLabel,
} from "@/features/courses/lib/videoProviders";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Switch } from "@/shared/components/ui/switch";
import { Textarea } from "@/shared/components/ui/textarea";

type LessonType = "video" | "text" | "quiz";

type LessonEditorState = {
  id?: Id<"lessons">;
  moduleId: Id<"modules">;
  title: string;
  type: LessonType;
  contentUrl: string;
  videoProvider: VideoProvider;
  duration: number;
  order: number;
  isFree: boolean;
  isRequired: boolean;
};

interface ModuleLessonManagerProps {
  courseId: Id<"courses">;
}

const defaultLesson = (moduleId: Id<"modules">, order: number): LessonEditorState => ({
  moduleId,
  title: "",
  type: "video",
  contentUrl: "",
  videoProvider: "youtube",
  duration: 0,
  order,
  isFree: false,
  isRequired: true,
});

function resolveEditorVideoProvider(provider: string | undefined, contentUrl: string) {
  if (provider === "youtube" || provider === "vimeo") return provider;
  return normalizeVideoSource(contentUrl)?.provider ?? "youtube";
}

function detectSavedVideoProvider(provider: string | undefined, contentUrl: string) {
  if (provider === "youtube" || provider === "vimeo") return provider;
  return normalizeVideoSource(contentUrl)?.provider;
}

export function ModuleLessonManager({ courseId }: ModuleLessonManagerProps) {
  const fullCourse = useQuery(api.courses.getFullCourse, { courseId });
  const addModule = useMutation(api.courses.addModule);
  const updateModule = useMutation(api.courses.updateModule);
  const deleteModule = useMutation(api.courses.deleteModule);
  const addLesson = useMutation(api.courses.addLesson);
  const updateLesson = useMutation(api.courses.updateLesson);
  const deleteLesson = useMutation(api.courses.deleteLesson);

  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [editingModuleId, setEditingModuleId] = useState<Id<"modules"> | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState("");
  const [lessonEditor, setLessonEditor] = useState<LessonEditorState | null>(null);
  const [isSavingLesson, setIsSavingLesson] = useState(false);

  const totalLessons = useMemo(
    () => fullCourse?.modules.reduce((total, module) => total + module.lessons.length, 0) ?? 0,
    [fullCourse],
  );

  const handleAddModule = async () => {
    if (!newModuleTitle.trim()) return;

    try {
      await addModule({
        courseId,
        title: newModuleTitle.trim(),
        order: (fullCourse?.modules.length || 0) + 1,
      });
      setNewModuleTitle("");
      setIsAddingModule(false);
      toast.success("Módulo adicionado");
    } catch {
      toast.error("Erro ao adicionar módulo");
    }
  };

  const handleSaveModuleTitle = async (moduleId: Id<"modules">) => {
    if (!editingModuleTitle.trim()) return;

    try {
      await updateModule({ id: moduleId, title: editingModuleTitle.trim() });
      setEditingModuleId(null);
      setEditingModuleTitle("");
      toast.success("Módulo actualizado");
    } catch {
      toast.error("Erro ao actualizar módulo");
    }
  };

  const handleDeleteModule = async (moduleId: Id<"modules">) => {
    if (!window.confirm("Remover este módulo e todas as suas aulas?")) return;

    try {
      await deleteModule({ id: moduleId });
      toast.success("Módulo removido");
    } catch {
      toast.error("Erro ao remover módulo");
    }
  };

  const handleSaveLesson = async () => {
    if (!lessonEditor || !lessonEditor.title.trim()) return;

    setIsSavingLesson(true);
    try {
      const normalizedVideo =
        lessonEditor.type === "video" ? normalizeVideoSource(lessonEditor.contentUrl) : null;

      if (lessonEditor.type === "video" && !normalizedVideo) {
        toast.error("Cole um link válido do YouTube ou Vimeo para esta aula.");
        return;
      }

      const values = {
        title: lessonEditor.title.trim(),
        type: lessonEditor.type,
        contentUrl: normalizedVideo?.embedUrl ?? lessonEditor.contentUrl.trim(),
        ...(normalizedVideo ? { videoProvider: normalizedVideo.provider } : {}),
        duration: Number.isFinite(lessonEditor.duration) ? lessonEditor.duration : 0,
        order: Number.isFinite(lessonEditor.order) ? lessonEditor.order : 1,
        isFree: lessonEditor.isFree,
        isRequired: lessonEditor.isRequired,
        allowDownload: false,
      };

      if (lessonEditor.id) {
        await updateLesson({ id: lessonEditor.id, ...values });
        toast.success("Aula actualizada");
      } else {
        await addLesson({
          moduleId: lessonEditor.moduleId,
          ...values,
        });
        toast.success("Aula adicionada");
      }

      setLessonEditor(null);
    } catch {
      toast.error("Erro ao guardar aula");
    } finally {
      setIsSavingLesson(false);
    }
  };

  const handleDeleteLesson = async (lessonId: Id<"lessons">) => {
    if (!window.confirm("Remover esta aula?")) return;

    try {
      await deleteLesson({ id: lessonId });
      toast.success("Aula removida");
    } catch {
      toast.error("Erro ao remover aula");
    }
  };

  if (!fullCourse) return <div>A carregar currículo...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900">Estrutura do Curso</h2>
          <p className="text-sm text-gray-500">
            {fullCourse.modules.length} módulos, {totalLessons} aulas configuradas
          </p>
        </div>
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
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input
                autoFocus
                placeholder="Título do módulo..."
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddModule()}
              />
              <Button onClick={handleAddModule} size="sm">
                Adicionar
              </Button>
              <Button variant="ghost" onClick={() => setIsAddingModule(false)} size="sm">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {fullCourse.modules.map((module) => (
          <Card key={module._id} className="overflow-hidden">
            <div className="flex flex-col gap-3 border-b bg-gray-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <GripVertical className="h-4 w-4 shrink-0 text-gray-400" />
                {editingModuleId === module._id ? (
                  <Input
                    value={editingModuleTitle}
                    onChange={(e) => setEditingModuleTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveModuleTitle(module._id)}
                    className="max-w-xl bg-white"
                  />
                ) : (
                  <span className="truncate font-bold text-gray-700">{module.title}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingModuleId === module._id ? (
                  <Button size="sm" onClick={() => handleSaveModuleTitle(module._id)}>
                    <Save className="mr-2 h-4 w-4" /> Guardar
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingModuleId(module._id);
                      setEditingModuleTitle(module.title);
                    }}
                  >
                    <Edit className="mr-2 h-4 w-4" /> Editar
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500"
                  onClick={() => handleDeleteModule(module._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-0">
              <div className="divide-y">
                {module.lessons.length === 0 ? (
                  <div className="p-5 text-sm text-gray-500">Este módulo ainda não tem aulas.</div>
                ) : (
                  module.lessons.map((lesson) => {
                    const lessonContent = lesson.contentUrl ?? lesson.videoUrl ?? "";
                    const videoProvider =
                      lesson.type === "video"
                        ? detectSavedVideoProvider(lesson.videoProvider, lessonContent)
                        : undefined;

                    return (
                      <div
                        key={lesson._id}
                        className="group flex flex-col gap-3 p-4 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          {lesson.type === "video" ? (
                            <Video className="h-4 w-4 shrink-0 text-blue-500" />
                          ) : lesson.type === "quiz" ? (
                            <HelpCircle className="h-4 w-4 shrink-0 text-orange-500" />
                          ) : (
                            <FileText className="h-4 w-4 shrink-0 text-green-500" />
                          )}
                          <div className="min-w-0">
                            <span className="block truncate text-sm font-medium text-gray-700">
                              {lesson.title}
                            </span>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                              <span>{lesson.duration ?? lesson.videoDuration ?? 0} min</span>
                              {videoProvider && (
                                <Badge variant="outline" className="rounded-md px-1.5 py-0">
                                  {videoProviderLabel(videoProvider)}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setLessonEditor({
                                id: lesson._id,
                                moduleId: module._id,
                                title: lesson.title,
                                type: lesson.type,
                                contentUrl: lessonContent,
                                videoProvider: resolveEditorVideoProvider(
                                  lesson.videoProvider,
                                  lessonContent,
                                ),
                                duration: lesson.duration ?? lesson.videoDuration ?? 0,
                                order: lesson.order,
                                isFree: lesson.isFree ?? false,
                                isRequired: lesson.isRequired ?? true,
                              })
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" /> Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500"
                            onClick={() => handleDeleteLesson(lesson._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <MoreVertical className="hidden h-4 w-4 text-gray-300 sm:block" />
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex flex-wrap gap-2 border-t bg-gray-50/30 p-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-blue-900"
                  onClick={() =>
                    setLessonEditor(defaultLesson(module._id, module.lessons.length + 1))
                  }
                >
                  <Plus className="mr-1 h-3 w-3" /> Nova Aula
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={Boolean(lessonEditor)} onOpenChange={(open) => !open && setLessonEditor(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{lessonEditor?.id ? "Editar aula" : "Nova aula"}</DialogTitle>
          </DialogHeader>

          {lessonEditor &&
            (() => {
              const normalizedVideo =
                lessonEditor.type === "video"
                  ? normalizeVideoSource(lessonEditor.contentUrl)
                  : null;

              return (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="lesson-title">Título</Label>
                    <Input
                      id="lesson-title"
                      value={lessonEditor.title}
                      onChange={(e) => setLessonEditor({ ...lessonEditor, title: e.target.value })}
                      placeholder="Ex: Introdução ao mercado angolano"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="lesson-type">Tipo</Label>
                      <select
                        id="lesson-type"
                        value={lessonEditor.type}
                        onChange={(e) =>
                          setLessonEditor({
                            ...lessonEditor,
                            type: e.target.value as LessonType,
                          })
                        }
                        className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-blue-900"
                      >
                        <option value="video">Vídeo</option>
                        <option value="text">Texto</option>
                        <option value="quiz">Quiz</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lesson-duration">Duração (min)</Label>
                      <Input
                        id="lesson-duration"
                        type="number"
                        min={0}
                        value={lessonEditor.duration}
                        onChange={(e) =>
                          setLessonEditor({
                            ...lessonEditor,
                            duration: e.target.valueAsNumber || 0,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lesson-order">Ordem</Label>
                      <Input
                        id="lesson-order"
                        type="number"
                        min={1}
                        value={lessonEditor.order}
                        onChange={(e) =>
                          setLessonEditor({
                            ...lessonEditor,
                            order: e.target.valueAsNumber || 1,
                          })
                        }
                      />
                    </div>
                  </div>

                  {lessonEditor.type === "video" ? (
                    <div className="space-y-3 rounded-lg border bg-gray-50/60 p-4">
                      <div className="grid gap-3 sm:grid-cols-[0.45fr_1fr]">
                        <div className="space-y-2">
                          <Label>Fonte</Label>
                          <Select
                            value={lessonEditor.videoProvider}
                            onValueChange={(value) =>
                              setLessonEditor({
                                ...lessonEditor,
                                videoProvider: value as VideoProvider,
                              })
                            }
                          >
                            <SelectTrigger className="bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="youtube">YouTube</SelectItem>
                              <SelectItem value="vimeo">Vimeo</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lesson-content">Link do vídeo</Label>
                          <div className="relative">
                            <LinkIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                              id="lesson-content"
                              value={lessonEditor.contentUrl}
                              onChange={(e) => {
                                const nextUrl = e.target.value;
                                const nextSource = normalizeVideoSource(nextUrl);
                                setLessonEditor({
                                  ...lessonEditor,
                                  contentUrl: nextUrl,
                                  videoProvider: nextSource?.provider ?? lessonEditor.videoProvider,
                                });
                              }}
                              placeholder={
                                lessonEditor.videoProvider === "vimeo"
                                  ? "https://vimeo.com/123456789"
                                  : "https://www.youtube.com/watch?v=..."
                              }
                              className="bg-white pl-9"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex min-h-7 flex-wrap items-center gap-2 text-xs text-gray-500">
                        {normalizedVideo ? (
                          <>
                            <Badge className="rounded-md bg-blue-900 text-white">
                              {videoProviderLabel(normalizedVideo.provider)}
                            </Badge>
                            <span className="break-all">{normalizedVideo.embedUrl}</span>
                          </>
                        ) : (
                          <span>Suporta links normais de YouTube e Vimeo.</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="lesson-content">Conteúdo / referência</Label>
                      <Textarea
                        id="lesson-content"
                        value={lessonEditor.contentUrl}
                        onChange={(e) =>
                          setLessonEditor({ ...lessonEditor, contentUrl: e.target.value })
                        }
                        placeholder="Resumo, instruções, pergunta do quiz ou link de apoio da aula"
                        className="min-h-28"
                      />
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3">
                      <div>
                        <Label>Aula grátis</Label>
                        <p className="text-xs text-gray-500">Aparece como pré-visualização.</p>
                      </div>
                      <Switch
                        checked={lessonEditor.isFree}
                        onCheckedChange={(checked) =>
                          setLessonEditor({ ...lessonEditor, isFree: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3">
                      <div>
                        <Label>Obrigatória</Label>
                        <p className="text-xs text-gray-500">Conta para a conclusão do curso.</p>
                      </div>
                      <Switch
                        checked={lessonEditor.isRequired}
                        onCheckedChange={(checked) =>
                          setLessonEditor({ ...lessonEditor, isRequired: checked })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 border-t pt-4">
                    <Button variant="ghost" onClick={() => setLessonEditor(null)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveLesson} disabled={isSavingLesson}>
                      {isSavingLesson ? "A guardar..." : "Guardar aula"}
                    </Button>
                  </div>
                </div>
              );
            })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
