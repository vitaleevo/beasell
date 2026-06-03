"use client";

import * as Sentry from "@sentry/nextjs";
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
    Sentry.captureException(error);
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertCircle className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Ups! Algo correu mal.
          </h1>
          <p className="font-medium text-gray-500">
            Pedimos desculpa, mas ocorreu um erro inesperado no sistema Beasell.
          </p>
        </div>

        {error.digest && (
          <div className="rounded-lg bg-gray-100 p-3 font-mono text-[10px] break-all text-gray-400">
            Erro ID: {error.digest}
          </div>
        )}

        {process.env.NODE_ENV === "development" && error.message && (
          <div className="rounded-lg bg-red-50 p-3 text-left font-mono text-xs break-words text-red-700">
            {error.message}
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => reset()}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-900 font-bold text-white transition-all hover:bg-blue-800"
          >
            <RefreshCcw className="h-5 w-5" />
            Tentar Novamente
          </Button>

          <Link href="/" className="w-full">
            <Button
              variant="outline"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-gray-200 font-bold hover:bg-gray-50"
            >
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
