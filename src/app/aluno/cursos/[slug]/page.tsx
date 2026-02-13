
"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/shared/components/ui/button";
import { Progress } from "@/shared/components/ui/progress";
import {
    PlayCircle,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Menu,
    X,
    Clock,
    Layout,
    FileText,
    HelpCircle,
    MessageSquare,
    ChevronDown,
    Lock,
    Trophy,
    ExternalLink
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

export default function CoursePlayerPage() {
    const { slug } = useParams();
    const router = useRouter();
    const course = useQuery(api.courses.getBySlug, { slug: slug as string });
    const fullCourse = useQuery(api.courses.getFullCourse, course ? { courseId: course._id } : "skip" as any);
    const enrollment = useQuery(api.enrollments.getEnrollment, course ? { courseId: course._id } : "skip" as any);
    const markComplete = useMutation(api.enrollments.markLessonComplete);
    const enroll = useMutation(api.enrollments.enroll);

    const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

    // Flatten lessons for easier navigation
    const allLessons = useMemo(() => {
        if (!fullCourse) return [];
        return fullCourse.modules.flatMap((m: any) => m.lessons);
    }, [fullCourse]);

    // Set first lesson or last uncompleted lesson as active by default
    useEffect(() => {
        if (fullCourse && allLessons.length > 0 && !activeLessonId) {
            const lastCompletedIndex = enrollment ?
                allLessons.findIndex((l: any) => !enrollment.completedLessons.includes(l._id as any)) : 0;

            const initialLessonId = lastCompletedIndex !== -1 ?
                allLessons[lastCompletedIndex]._id :
                allLessons[0]._id;

            setActiveLessonId(initialLessonId);

            // Expand the module of the active lesson
            const moduleWithActive = fullCourse.modules.find((m: any) =>
                m.lessons.some((l: any) => l._id === initialLessonId)
            );
            if (moduleWithActive) {
                setExpandedModules(prev => ({ ...prev, [moduleWithActive._id]: true }));
            }
        }
    }, [fullCourse, enrollment, activeLessonId, allLessons]);

    if (!course || !fullCourse || enrollment === undefined) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-slate-50">
                <div className="w-16 h-16 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-600 font-medium animate-pulse">Preparando sua sala de aula...</p>
            </div>
        );
    }

    // Handle enrollment if not enrolled
    if (enrollment === null) {
        return (
            <div className="h-screen flex flex-col items-center justify-center p-6 bg-slate-50 text-center">
                <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md border border-slate-100">
                    <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Lock className="h-10 w-10 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Acesso Restrito</h2>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Parece que você ainda não tem acesso a este treinamento exclusivo.
                        Inscreva-se agora para começar sua transformação.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={() => enroll({ courseId: course._id })}
                            className="bg-blue-900 hover:bg-blue-800 text-white h-14 rounded-xl text-lg font-bold shadow-lg shadow-blue-900/20"
                        >
                            Liberar Meu Acesso AGORA
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/aluno/dashboard')}
                            className="text-slate-500 hover:text-slate-700"
                        >
                            Voltar ao Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const activeLessonIndex = allLessons.findIndex((l: any) => l._id === activeLessonId);
    const activeLesson = allLessons[activeLessonIndex];
    const nextLesson = allLessons[activeLessonIndex + 1];
    const prevLesson = allLessons[activeLessonIndex - 1];

    const isLessonCompleted = (id: string) => enrollment?.completedLessons.includes(id as any);

    const handleLessonComplete = async () => {
        if (activeLessonId) {
            try {
                await markComplete({ courseId: course._id, lessonId: activeLessonId as any });
                // If there's a next lesson, move to it automatically
                if (nextLesson) {
                    setActiveLessonId(nextLesson._id);
                }
            } catch (error) {
                console.error("Error marking lesson complete:", error);
            }
        }
    };

    const toggleModule = (id: string) => {
        setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const progressPercentage = Math.round(((enrollment?.completedLessons?.length || 0) / allLessons.length) * 100) || 0;

    return (
        <div className="flex flex-col h-screen bg-[#F1F5F9] overflow-hidden">
            {/* Immersive Top Bar */}
            <header className="h-[72px] bg-blue-950 text-white flex items-center justify-between px-6 z-50 shadow-xl border-b border-white/5">
                <div className="flex items-center gap-4 flex-1">
                    <Link href="/aluno/dashboard" className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                        <ChevronLeft className="h-6 w-6" />
                    </Link>
                    <div className="h-8 w-px bg-white/10 mx-2 hidden sm:block" />
                    <div>
                        <h1 className="font-bold text-sm md:text-base line-clamp-1">{course.title}</h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] uppercase tracking-tighter text-blue-300 font-bold">Progresso do Aluno</span>
                            <div className="w-24 bg-white/10 h-1.5 rounded-full overflow-hidden hidden sm:block">
                                <div
                                    className="h-full bg-orange-500 transition-all duration-700 ease-out"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                            <span className="text-[10px] font-bold text-orange-400">{progressPercentage}%</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        className="text-white/70 hover:text-white hover:bg-white/10 hidden md:flex"
                        onClick={() => router.push('/aluno/suporte')}
                    >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Suporte
                    </Button>
                    <Button
                        onClick={handleLessonComplete}
                        disabled={isLessonCompleted(activeLesson?._id)}
                        className={cn(
                            "h-11 px-6 font-bold rounded-xl transition-all shadow-lg",
                            isLessonCompleted(activeLesson?._id)
                                ? "bg-green-500/20 text-green-400 border border-green-500/30 cursor-default"
                                : "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20"
                        )}
                    >
                        {isLessonCompleted(activeLesson?._id) ? (
                            <><CheckCircle2 className="mr-2 h-5 w-5" /> Concluída</>
                        ) : (
                            <><CheckCircle2 className="mr-2 h-5 w-5" /> Concluir Aula</>
                        )}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white lg:hidden ml-2"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Main Player Area */}
                <main className="flex-1 overflow-y-auto bg-slate-900 custom-scrollbar">
                    <div className="max-w-[1280px] mx-auto p-4 md:p-8 lg:p-12">
                        {activeLesson ? (
                            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {/* Video Player Card */}
                                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black border border-white/5 group relative">
                                    <iframe
                                        src={activeLesson.contentUrl}
                                        className="w-full h-full"
                                        allowFullScreen
                                        title={activeLesson.title}
                                    />
                                </div>

                                {/* Content Info */}
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-10 text-white shadow-2xl">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="space-y-4 flex-1">
                                            <div className="flex items-center gap-3">
                                                <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 py-1 px-3">
                                                    Módulo {fullCourse.modules.findIndex((m: any) => m.lessons.some((l: any) => l._id === activeLesson._id)) + 1}
                                                </Badge>
                                                <div className="flex items-center text-slate-400 text-sm font-medium">
                                                    <Clock className="mr-1.5 h-4 w-4" />
                                                    {Math.floor(activeLesson.duration / 60)} min
                                                </div>
                                            </div>
                                            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                                                {activeLesson.title}
                                            </h2>
                                            <div className="h-1 w-20 bg-orange-500 rounded-full" />
                                            <div className="prose prose-invert max-w-none mt-6">
                                                <p className="text-slate-300 text-lg leading-relaxed font-medium">
                                                    Nesta aula, você vai aprofundar seus conhecimentos sobre o tema selecionado.
                                                    Lembre-se de tomar notas e aplicar os conceitos no seu dia a dia profissional.
                                                </p>
                                            </div>
                                        </div>

                                        {/* Quick Actions Panel */}
                                        <div className="md:w-72 space-y-4">
                                            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                                                    <FileText className="h-3 w-3" />
                                                    Documentos de Apoio
                                                </h4>
                                                <div className="space-y-2">
                                                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm group">
                                                        <span className="text-slate-300 font-medium truncate">Guia Prático PDF</span>
                                                        <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-blue-400" />
                                                    </button>
                                                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm group">
                                                        <span className="text-slate-300 font-medium truncate">Planilha de Exercícios</span>
                                                        <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-blue-400" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Support Quick Link */}
                                            <button className="w-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-600/20 rounded-2xl p-4 transition-all flex items-center gap-3">
                                                <HelpCircle className="h-5 w-5" />
                                                <div className="text-left">
                                                    <p className="text-xs font-bold uppercase tracking-tighter">Dúvidas?</p>
                                                    <p className="text-[10px] opacity-70">Fale com o professor</p>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Navigation */}
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8">
                                    <Button
                                        variant="outline"
                                        className="h-14 px-8 rounded-2xl border-white/10 text-white bg-white/5 hover:bg-white/10 w-full sm:w-auto"
                                        onClick={() => prevLesson && setActiveLessonId(prevLesson._id)}
                                        disabled={!prevLesson}
                                    >
                                        <ChevronLeft className="mr-3 h-5 w-5" /> Aula Anterior
                                    </Button>

                                    <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-white/5 rounded-2xl border border-white/10">
                                        <Trophy className="h-5 w-5 text-orange-500" />
                                        <span className="text-slate-300 text-sm font-bold">Ganhe 50 pontos ao concluir</span>
                                    </div>

                                    <Button
                                        variant="outline"
                                        className="h-14 px-8 rounded-2xl border-white/10 text-white bg-white/5 hover:bg-white/10 w-full sm:w-auto"
                                        onClick={() => nextLesson && setActiveLessonId(nextLesson._id)}
                                        disabled={!nextLesson}
                                    >
                                        Próxima Aula <ChevronRight className="ml-3 h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-[80vh] items-center justify-center text-slate-400">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                                        <PlayCircle className="h-10 w-10 text-slate-700" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Seleccione uma aula</h3>
                                    <p className="text-slate-500">Escolha um dos tópicos no menu lateral para começar.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>

                {/* Sidebar with Lesson List */}
                <aside className={cn(
                    "bg-white h-full border-l border-slate-200 transition-all duration-300 overflow-hidden flex flex-col z-40 shadow-2xl lg:shadow-none fixed lg:relative right-0 top-0 lg:top-auto",
                    sidebarOpen ? "w-[340px]" : "w-0 border-0"
                )}>
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <div>
                            <h3 className="font-black text-slate-900 flex items-center gap-2">
                                <Layout className="h-4 w-4 text-blue-900" />
                                Conteúdo do Curso
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                                {allLessons.length} Aulas no Total
                            </p>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden text-slate-400"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Lesson Navigation Scrollable Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
                        {fullCourse.modules.map((module: any, mIdx: number) => (
                            <div key={module._id} className="rounded-2xl border border-slate-100 overflow-hidden bg-white shadow-sm">
                                <button
                                    onClick={() => toggleModule(module._id)}
                                    className={cn(
                                        "w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-slate-50",
                                        expandedModules[module._id] ? "bg-slate-50/80 border-b border-slate-100" : ""
                                    )}
                                >
                                    <div className="flex-1">
                                        <span className="text-[10px] font-bold text-blue-900/60 uppercase tracking-tighter block mb-1">Módulo {mIdx + 1}</span>
                                        <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{module.title}</h4>
                                    </div>
                                    <ChevronDown className={cn(
                                        "h-4 w-4 text-slate-400 transition-transform",
                                        expandedModules[module._id] ? "rotate-180" : ""
                                    )} />
                                </button>

                                {expandedModules[module._id] && (
                                    <div className="p-1 space-y-1 animate-in slide-in-from-top-2 duration-200">
                                        {module.lessons.map((lesson: any) => (
                                            <button
                                                key={lesson._id}
                                                onClick={() => setActiveLessonId(lesson._id)}
                                                className={cn(
                                                    "w-full flex items-start gap-4 p-4 rounded-xl transition-all text-left group border border-transparent",
                                                    activeLessonId === lesson._id
                                                        ? "bg-blue-900 text-white shadow-lg shadow-blue-900/20"
                                                        : "hover:bg-slate-50 text-slate-700"
                                                )}
                                            >
                                                <div className="mt-0.5 flex-shrink-0">
                                                    {isLessonCompleted(lesson._id) ? (
                                                        <div className={cn(
                                                            "h-5 w-5 rounded-full flex items-center justify-center",
                                                            activeLessonId === lesson._id ? "bg-white/20" : "bg-green-100"
                                                        )}>
                                                            <CheckCircle2 className={cn(
                                                                "h-3.5 w-3.5",
                                                                activeLessonId === lesson._id ? "text-white" : "text-green-600"
                                                            )} />
                                                        </div>
                                                    ) : activeLessonId === lesson._id ? (
                                                        <div className="h-5 w-5 bg-orange-400 rounded-full flex items-center justify-center animate-pulse shadow-sm">
                                                            <PlayCircle className="h-3.5 w-3.5 text-white" />
                                                        </div>
                                                    ) : (
                                                        <div className="h-5 w-5 rounded-full border-2 border-slate-200 group-hover:border-blue-900/40 transition-colors bg-white" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={cn(
                                                        "text-sm font-bold leading-snug line-clamp-2 transition-colors",
                                                        activeLessonId === lesson._id ? "text-white" : "text-slate-700"
                                                    )}>
                                                        {lesson.title}
                                                    </p>
                                                    <div className="flex items-center gap-3 mt-1.5">
                                                        <span className={cn(
                                                            "text-[10px] font-bold uppercase tracking-tight flex items-center gap-1",
                                                            activeLessonId === lesson._id ? "text-blue-200" : "text-slate-400"
                                                        )}>
                                                            <Clock className="h-2.5 w-2.5" />
                                                            {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')} min
                                                        </span>
                                                        {lesson.type === 'text' && (
                                                            <span className={cn(
                                                                "text-[10px] font-bold uppercase tracking-tight flex items-center gap-1",
                                                                activeLessonId === lesson._id ? "text-blue-200" : "text-blue-500"
                                                            )}>
                                                                <FileText className="h-2.5 w-2.5" />
                                                                Leitura
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(148, 163, 184, 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(148, 163, 184, 0.4);
                }
                .custom-scrollbar-dark::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
            className
        )}>
            {children}
        </span>
    );
}
