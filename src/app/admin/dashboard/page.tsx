"use client";

import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
    Users,
    BookOpen,
    FileText,
    ShoppingCart,
    TrendingUp,
    ArrowRight,
    PlusCircle,
    Clock
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";

export default function AdminDashboard() {
    const stats = useQuery(api.users.getStats);

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Painel de Controlo 🛠️</h1>
                    <p className="text-gray-500 mt-2 text-lg">Bem-vindo de volta! Aqui está o que está a acontecer na Beasell hoje.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/cursos/novo">
                        <Button className="bg-blue-900 hover:bg-black text-white px-6 h-12 rounded-xl shadow-lg transition-all">
                            <PlusCircle className="mr-2 h-5 w-5" /> Novo Curso
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Alunos", value: stats?.totalStudents ?? 0, icon: Users, color: "blue", sub: "Registados" },
                    { label: "Cursos Activos", value: stats?.totalCourses ?? 0, icon: BookOpen, color: "orange", sub: "Disponíveis" },
                    { label: "Inscrições", value: stats?.activeEnrollments ?? 0, icon: ShoppingCart, color: "green", sub: "Em curso" },
                    { label: "Posts Blog", value: stats?.totalPosts ?? 0, icon: FileText, color: "purple", sub: "Conteúdos" },
                ].map((stat, i) => (
                    <Card key={i} className="border-0 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 relative z-10">
                            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</CardTitle>
                            <div className={`h-10 w-10 bg-${stat.color}-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <stat.icon className={`h-5 w-5 text-${stat.color}-600`} />
                            </div>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                            <p className="text-xs font-medium text-gray-400 mt-1">{stat.sub} na plataforma</p>
                        </CardContent>
                        {/* Minimalist background decoration */}
                        <div className={`absolute -right-4 -bottom-4 opacity-5 h-24 w-24 bg-${stat.color}-900 rounded-full`} />
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 border-0 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl">Actividade Recente</CardTitle>
                            <p className="text-sm text-gray-400 mt-1">Acções recentes dos utilizadores</p>
                        </div>
                        <Link href="/admin/alunos" className="text-sm font-bold text-blue-900 flex items-center gap-1 hover:underline">
                            Ver todos <ArrowRight className="h-4 w-4" />
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {[
                                { user: "Manuel Silva", action: "concluiu o curso 'Vendas Pro'", time: "Há 5 min", icon: TrendingUp, color: "green" },
                                { user: "Ana Paula", action: "inscreveu-se no curso 'Mestre Vendas'", time: "Há 2 horas", icon: ShoppingCart, color: "blue" },
                                { user: "Utilizador Novo", action: "registou-se na plataforma", time: "Há 4 horas", icon: Users, color: "orange" },
                                { user: "Ricardo Jorge", action: "deixou um comentário no blog", time: "Há 6 horas", icon: FileText, color: "purple" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-all border border-transparent hover:border-gray-100 group">
                                    <div className={`h-12 w-12 bg-${item.color}-50 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                                        <item.icon className={`h-6 w-6 text-${item.color}-600`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-gray-900 truncate">
                                            {item.user} <span className="font-medium text-gray-500">{item.action}</span>
                                        </p>
                                        <div className="flex items-center gap-1 mt-1 text-[11px] text-gray-400 font-medium">
                                            <Clock className="h-3 w-3" />
                                            {item.time}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card className="border-0 shadow-sm bg-blue-900 text-white overflow-hidden relative">
                        <CardHeader>
                            <CardTitle className="text-xl">Acesso Rápido</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10 text-blue-100">
                            {[
                                { label: "Gestão de Alunos", href: "/admin/alunos" },
                                { label: "Publicar no Blog", href: "/admin/conteudos" },
                                { label: "Relatórios Anuais", href: "/admin/analise" },
                            ].map((item) => (
                                <Link key={item.href} href={item.href}>
                                    <Button variant="ghost" className="w-full justify-start text-blue-100 hover:bg-white/10 hover:text-white px-4 h-12 font-bold mb-2">
                                        {item.label}
                                    </Button>
                                </Link>
                            ))}
                        </CardContent>
                        {/* Decorative circle */}
                        <div className="absolute -left-10 -bottom-10 h-40 w-40 bg-white/5 rounded-full" />
                    </Card>

                    <Card className="border-0 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold text-gray-500 uppercase tracking-widest">Estado do Sistema</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Base de Dados</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-green-600 uppercase">Online</span>
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Servidor API</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold text-green-600 uppercase">Online</span>
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

