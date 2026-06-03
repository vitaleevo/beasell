"use client";

import {
  BarChart3,
  BookOpen,
  CreditCard,
  FileText,
  Users,
  DollarSign,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/shared/lib/auth-client";
import { cn } from "@/shared/lib/utils";

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

const navSections = [
  {
    label: "Visão geral",
    items: [{ name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operação",
    items: [
      { name: "Cursos", href: "/admin/cursos", icon: BookOpen },
      { name: "Alunos", href: "/admin/alunos", icon: Users },
      { name: "Pagamentos", href: "/admin/pagamentos", icon: CreditCard },
      { name: "Blog", href: "/admin/conteudos", icon: FileText },
      { name: "Análise", href: "/admin/analise", icon: BarChart3 },
    ],
  },
  {
    label: "Configurações",
    items: [
      { name: "Preços", href: "/admin/precos", icon: DollarSign },
      { name: "Definições", href: "/admin/settings", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const isActiveRoute = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <Sidebar className="border-r border-slate-900 bg-slate-950 text-white [&_[data-sidebar=sidebar]]:bg-slate-950">
      <SidebarHeader className="flex h-24 justify-center px-5">
        <Link href="/admin/dashboard" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-950/30 transition-transform group-hover:scale-105">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <span className="block text-lg font-black tracking-tight text-white">Beasell</span>
            <span className="block text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">
              Backoffice
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 pb-4">
        {navSections.map((section) => (
          <SidebarGroup key={section.label} className="py-3">
            <SidebarGroupLabel className="px-3 text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase">
              {section.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="mt-2 gap-1">
                {section.items.map((item) => {
                  const isActive = isActiveRoute(item.href);
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "h-11 rounded-xl px-3 text-sm font-semibold transition-all",
                          isActive
                            ? "bg-white text-slate-950 shadow-lg shadow-black/20 hover:bg-white"
                            : "text-slate-300 hover:bg-white/10 hover:text-white",
                        )}
                      >
                        <Link href={item.href} className="flex items-center gap-3">
                          <item.icon
                            className={cn(
                              "h-5 w-5",
                              isActive ? "text-orange-500" : "text-slate-500",
                            )}
                          />
                          <span>{item.name}</span>
                          {isActive && <ChevronRight className="ml-auto h-4 w-4 text-slate-400" />}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <p className="text-xs font-bold tracking-[0.16em] text-slate-500 uppercase">Sessão</p>
          <p className="mt-1 text-sm font-semibold text-slate-200">Dono / Professor</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/10 hover:text-red-100"
        >
          <LogOut className="h-5 w-5" />
          <span>Sair do Painel</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
