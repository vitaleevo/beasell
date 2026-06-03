"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <html lang="pt-AO">
      <body>
        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
          <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-xl">
            <p className="text-sm font-bold tracking-widest text-red-500 uppercase">Erro</p>
            <h1 className="mt-3 text-3xl font-black text-gray-900">Ups! Algo correu mal.</h1>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              A equipa tecnica foi notificada. Tente novamente dentro de instantes.
            </p>
            {error.digest && (
              <p className="mt-5 rounded-lg bg-gray-50 p-3 font-mono text-xs break-all text-gray-400">
                Erro ID: {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
