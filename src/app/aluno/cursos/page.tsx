
"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { BookOpen, Clock, Star, ArrowRight, Play, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function StudentCoursesPage() {
    const courses = useQuery(api.courses.list, { onlyPublished: true });

    if (courses === undefined) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Carregando catálogo de excelência...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-widest mb-3">
                        <GraduationCap className="h-4 w-4" />
                        Seu Aprendizado
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
                        Catálogo de <span className="text-blue-900">Cursos</span>
                    </h1>
                    <p className="text-slate-500 mt-4 text-lg max-w-2xl">
                        Acesso exclusivo aos melhores treinamentos de vendas e prospecção do mercado angolano.
                    </p>
                </div>
                <div className="hidden sm:block">
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-4 py-2 rounded-xl font-bold">
                        {courses.length} Cursos Disponíveis
                    </Badge>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {courses.map((course) => (
                    <Card key={course._id} className="group overflow-hidden border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 rounded-[32px] bg-white border flex flex-col h-full">
                        <div className="relative h-56 overflow-hidden">
                            <img
                                src={course.thumbnailUrl}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                                    <Play className="h-8 w-8 text-white fill-white" />
                                </div>
                            </div>
                            <div className="absolute top-4 left-4">
                                <Badge className="bg-white/90 backdrop-blur-sm text-blue-900 border-0 font-bold px-3 py-1.5 shadow-lg">ANGOLA EDITION</Badge>
                            </div>
                        </div>

                        <CardHeader className="pb-2 pt-6 px-8">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="flex text-orange-400">
                                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-3 w-3 fill-current" />)}
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">(4.9)</span>
                            </div>
                            <CardTitle className="text-2xl font-black text-slate-900 line-clamp-2 leading-tight group-hover:text-blue-900 transition-colors">
                                {course.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="pb-4 px-8 flex-1">
                            <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                                {course.description}
                            </p>

                            <div className="flex items-center gap-6 text-xs font-bold text-slate-400 border-t border-slate-100 pt-6">
                                <div className="flex items-center gap-2 group-hover:text-blue-900 transition-colors">
                                    <BookOpen className="h-4 w-4 text-blue-600" />
                                    <span>Conteúdo VIP</span>
                                </div>
                                <div className="flex items-center gap-2 group-hover:text-orange-500 transition-colors">
                                    <Clock className="h-4 w-4 text-orange-500" />
                                    <span>Acesso Vitalício</span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-4 pb-8 px-8 border-0 mt-auto">
                            <Link href={`/aluno/cursos/${course.slug}`} className="w-full">
                                <Button className="w-full bg-slate-900 hover:bg-blue-900 text-white font-bold h-14 rounded-2xl transition-all shadow-lg shadow-slate-900/10 group">
                                    Acessar Minhas Aulas
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

