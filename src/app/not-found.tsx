"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white p-6">
            <div className="max-w-xl w-full text-center space-y-10">
                <div className="relative">
                    <h1 className="text-[150px] md:text-[200px] font-black text-gray-100 leading-none select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <div className="h-20 w-20 bg-blue-900 text-white rounded-full flex items-center justify-center shadow-2xl mb-4 animate-bounce">
                            <Search className="h-10 w-10" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 relative z-10 -mt-10">
                    <h2 className="text-4xl font-extrabold text-blue-900 tracking-tight">Caminho não encontrado</h2>
                    <p className="text-xl text-gray-500 max-w-sm mx-auto font-medium">
                        O conteúdo que procura parece ter sido movido ou nunca existiu na Beasell.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button className="w-full h-14 px-8 bg-blue-900 hover:bg-black text-white rounded-2xl font-bold shadow-lg transition-all flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            Voltar ao Início
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto h-14 px-8 border-2 border-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 flex items-center gap-2"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Página Anterior
                    </Button>
                </div>

                <div className="pt-10">
                    <p className="text-sm text-gray-400 font-medium">
                        Beasell Angola - Excelência em Performance Comercial
                    </p>
                </div>
            </div>
        </div>
    );
}
