
"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/shared/components/ui/button';
import { useClerk } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '@convex/_generated/api';
import {
  LayoutDashboard,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  GraduationCap,
  ChevronRight,
  Settings,
  HelpCircle
} from 'lucide-react';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const student = useQuery(api.users.currentUser);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Painel Principal', path: '/aluno/dashboard' },
    { icon: BookOpen, label: 'Meus Cursos', path: '/aluno/cursos' },
    { icon: Settings, label: 'Preferências', path: '/aluno/perfil' },
    { icon: HelpCircle, label: 'Suporte', path: '/aluno/suporte' },
  ];

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      {/* Sidebar */}
      <aside className={`bg-white shadow-2xl transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-72' : 'w-72 -translate-x-full lg:translate-x-0'
        } fixed lg:relative z-30 h-screen border-r border-slate-200`}>

        {/* Header da Sidebar */}
        <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-blue-900 to-indigo-950 text-white">
          <div className="flex items-center justify-between mb-6">
            <Link href="/aluno/dashboard" className="flex items-center space-x-3">
              <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Beasell</h2>
                <p className="text-[10px] text-blue-200 font-medium uppercase tracking-widest">Plataforma de Alunos</p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Perfil do Usuário */}
          <div className="p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20">
                <span className="text-white font-bold text-sm">
                  {student?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{student?.name || 'Carregando...'}</p>
                <div className="flex items-center text-[10px] text-blue-200">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100vh-280px)] mt-2">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 px-3">
            Menu Principal
          </div>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center justify-between p-3.5 rounded-xl transition-all duration-200 ${isActive
                  ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20 translate-x-1'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-blue-900'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-900'
                    }`} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer da Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 bg-slate-50/50 border-t border-slate-200">
          <Link href="/" className="block">
            <Button
              variant="outline"
              className="w-full justify-start bg-white hover:bg-slate-50 border-slate-200 group h-11"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-semibold text-slate-700">Ir para o Website</span>
              </div>
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600 h-11"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span className="text-xs font-semibold">Sair da Conta</span>
          </Button>
        </div>
      </aside>

      {/* Overlay para Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-20 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-h-screen w-full relative">
        {/* Header Superior Mobile & Desktop Breadcrumbs */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-10 hidden sm:block">
          <div className="flex items-center justify-between p-4 px-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden hover:bg-slate-100"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="hidden lg:block">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                  <span>Plataforma</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span className="text-blue-600">{pathname.split('/').pop()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Search or notifications would go here */}
              <div className="bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100 flex items-center gap-2">
                <span className="text-[10px] font-bold text-orange-600 uppercase">Premium Member</span>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header only */}
        <div className="sm:hidden bg-blue-900 text-white p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="text-white"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="font-bold">Beasell</div>
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-xs border-2 border-white/20">
            {student?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
        </div>

        {/* Área de Conteúdo */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;

