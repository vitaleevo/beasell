"use client";

import { useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center space-y-6 border border-red-100">
                <div className="h-20 w-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-10 w-10" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Ups! Algo correu mal.</h1>
                    <p className="text-gray-500 font-medium">
                        Pedimos desculpa, mas ocorreu um erro inesperado no sistema Beasell.
                    </p>
                </div>

                {error.digest && (
                    <div className="p-3 bg-gray-100 rounded-lg text-[10px] font-mono text-gray-400 break-all">
                        Erro ID: {error.digest}
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => reset()}
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white h-12 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCcw className="h-5 w-5" />
                        Tentar Novamente
                    </Button>

                    <Link href="/" className="w-full">
                        <Button variant="outline" className="w-full h-12 rounded-xl font-bold border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2">
                            <Home className="h-5 w-5" />
                            Voltar ao Início
                        </Button>
                    </Link>
                </div>

                <p className="text-xs text-gray-400">
                    Se o problema persistir, contacte o suporte técnico Beasell.
                </p>
            </div>
        </div>
    );
}
