"use client";

import * as React from "react";
import {
    BarChart3,
    BookOpen,
    FileText,
    Users,
    DollarSign,
    Settings,
    LayoutDashboard,
    LogOut,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/shared/components/ui/sidebar";

const adminNav = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Cursos", href: "/admin/cursos", icon: BookOpen },
    { name: "Alunos", href: "/admin/alunos", icon: Users },
    { name: "Blog", href: "/admin/conteudos", icon: FileText },
    { name: "Análise", href: "/admin/analise", icon: BarChart3 },
];

const secondaryNav = [
    { name: "Preços", href: "/admin/precos", icon: DollarSign },
    { name: "Definições", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="border-r border-gray-200">
            <SidebarHeader className="h-20 flex items-center px-6">
                <Link href="/admin/dashboard" className="flex items-center gap-3 group">
                    <div className="h-8 w-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                        B
                    </div>
                    <span className="font-bold text-xl text-gray-900 tracking-tight">Beasell Admin</span>
                </Link>
            </SidebarHeader>

            <SidebarContent className="px-3">
                <SidebarGroup>
                    <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Gestão Principal
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {adminNav.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={`
                          my-1 h-11 px-4 rounded-xl transition-all duration-200
                          ${isActive
                                                    ? "bg-blue-900 text-white shadow-md hover:bg-blue-800"
                                                    : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                                                }
                        `}
                                        >
                                            <Link href={item.href} className="flex items-center gap-3 font-medium">
                                                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                                                <span>{item.name}</span>
                                                {isActive && <ChevronRight className="ml-auto h-4 w-4 text-blue-200" />}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Configurações
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondaryNav.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className={`
                          my-1 h-11 px-4 rounded-xl transition-all duration-200
                          ${isActive
                                                    ? "bg-blue-900 text-white shadow-md hover:bg-blue-800"
                                                    : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                                                }
                        `}
                                        >
                                            <Link href={item.href} className="flex items-center gap-3 font-medium">
                                                <item.icon className="h-5 w-5 text-gray-400 group-data-[active=true]:text-white" />
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t border-gray-100">
                <SignOutButton>
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut className="h-5 w-5" />
                        <span>Sair do Painel</span>
                    </button>
                </SignOutButton>
            </SidebarFooter>
        </Sidebar>
    );
}
