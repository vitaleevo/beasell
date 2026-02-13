"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, BookOpen, MessageCircle, User } from 'lucide-react';
import { cn } from "@/shared/lib/utils";

const MobileTabNavigation = () => {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: 'Início', href: '/' },
        { icon: Compass, label: 'Serviços', href: '/servicos' },
        { icon: MessageCircle, label: 'Contacto', href: '/contacto' },
        { icon: BookOpen, label: 'Conteúdos', href: '/conteudos' },
        { icon: User, label: 'Conta', href: '/sign-in' },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-[100] pb-safe">
            <nav className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
                {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200 active:scale-90",
                                active ? "text-[#F39200]" : "text-gray-400"
                            )}
                        >
                            <item.icon className={cn("h-6 w-6", active && "animate-pulse")} />
                            <span className="text-[10px] font-medium leading-none">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default MobileTabNavigation;
