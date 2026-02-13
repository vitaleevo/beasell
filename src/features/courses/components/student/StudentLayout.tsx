"use client";

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
  ChevronRight
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
    { icon: LayoutDashboard, label: 'Dashboard', path: '/aluno' },
    { icon: BookOpen, label: 'Meus Cursos', path: '/aluno/cursos' },
    { icon: User, label: 'Perfil', path: '/aluno/perfil' },
  ];

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-xl transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-72' : 'w-72 -translate-x-full lg:translate-x-0'
        } fixed lg:relative z-30 h-full border-r border-gray-200`}>

        {/* Header da Sidebar */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <Link href="/aluno" className="flex items-center space-x-3">
              <div className="p-2 bg-blue-900 rounded-xl shadow-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-blue-900">Área do Aluno</h2>
                <p className="text-xs text-blue-700 font-medium">Beasell</p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden hover:bg-blue-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Perfil do Usuário */}
          <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {student?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{student?.name || 'Carregando...'}</p>
                <p className="text-xs text-gray-600 truncate">{student?.email || ''}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu de Navegação */}
        <nav className="p-4 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
            Navegação
          </div>
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${isActive
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-900'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-900'
                    }`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {isActive && (
                  <ChevronRight className="h-4 w-4 text-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer da Sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-3 bg-gray-50 border-t border-gray-200">
          <Link href="/" className="block">
            <Button
              variant="outline"
              className="w-full justify-start bg-white hover:bg-gray-100 border-gray-300"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Site Principal</span>
              </div>
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Sair da Conta</span>
          </Button>
        </div>
      </div>

      {/* Overlay para Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header Superior */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </Button>

              <div className="hidden lg:block">
                <h1 className="text-lg font-semibold text-gray-900">
                  Bem-vindo à sua área de estudos
                </h1>
                <p className="text-sm text-gray-600">
                  Continue seu aprendizado onde parou
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Área de Conteúdo */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
