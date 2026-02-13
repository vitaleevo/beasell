
"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Button } from "@/shared/components/ui/button";
import { BookOpen, Trophy, Clock, ArrowRight, Zap, Target } from "lucide-react";
import AdvancedDashboard from "@/shared/components/student/AdvancedDashboard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
    const user = useQuery(api.users.currentUser);
    const router = useRouter();

    // In a real app we would fetch these stats from Convex
    // For now we'll provide some realistic defaults based on the user
    const stats = {
        totalCourses: 3,
        completedCourses: 1,
        totalHours: 12,
        studyStreak: 4,
        averageScore: 85,
        pointsThisMonth: 450,
        coursesThisMonth: 1,
        timeThisWeek: 5
    };

    const weeklyProgress = [30, 45, 0, 60, 20, 0, 15];

    const monthlyGoals = {
        courses: { current: 1, target: 2 },
        hours: { current: 12, target: 20 },
        points: { current: 450, target: 1000 }
    };

    if (!user) {
        return (
            <div className="h-[60vh] flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500">A carregar seu painel...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
                        Olá, {user.name}! 👋
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Você já concluiu <span className="text-blue-600 font-bold">35%</span> do seu plano de estudos este mês. Continue assim!
                    </p>
                    <div className="flex gap-4 mt-6">
                        <Button
                            onClick={() => router.push('/aluno/cursos')}
                            className="bg-blue-900 hover:bg-blue-800 text-white rounded-xl px-6 h-12 font-bold shadow-lg shadow-blue-900/20"
                        >
                            Continuar Aprendendo
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Visual Accent */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-50 to-transparent hidden lg:block" />
                <div className="relative z-10 hidden lg:flex items-center gap-8">
                    <div className="text-center">
                        <p className="text-4xl font-black text-blue-900 mb-1">12</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aulas Vistas</p>
                    </div>
                    <div className="w-px h-12 bg-slate-200" />
                    <div className="text-center">
                        <p className="text-4xl font-black text-orange-500 mb-1">850</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pontos Beasell</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Stats & Goals */}
                <div className="lg:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                            <Zap className="h-5 w-5 text-orange-500 fill-orange-500" />
                            Seu Desempenho
                        </h2>
                        <AdvancedDashboard
                            stats={stats}
                            weeklyProgress={weeklyProgress}
                            monthlyGoals={monthlyGoals}
                        />
                    </section>
                </div>

                {/* Right Column: Recommendations & Activity */}
                <div className="space-y-8">
                    <section className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-orange-400" />
                                Sugestão para Hoje
                            </h3>
                            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                                Baseado no seu progresso, sugerimos que você finalize o módulo de
                                <span className="text-white font-bold"> Fechamento de Vendas</span> no curso Beasell Pro.
                            </p>
                            <Button className="w-full bg-white text-blue-900 hover:bg-slate-100 font-bold rounded-xl h-12 transition-transform hover:scale-[1.02]">
                                Começar Agora
                            </Button>
                        </div>
                        {/* Background decor */}
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                    </section>

                    <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <Clock className="h-5 w-5 text-blue-600" />
                            Atividades Recentes
                        </h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 group cursor-pointer">
                                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 ring-4 ring-blue-50" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-900 transition-colors">Concluiu a aula: Prospecção Ativa</p>
                                        <p className="text-xs text-slate-500">Há {i * 2} horas atrás</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-8 text-blue-900 font-bold hover:bg-blue-50">
                            Ver Histórico Completo
                        </Button>
                    </section>
                </div>
            </div>
        </div>
    );
}

