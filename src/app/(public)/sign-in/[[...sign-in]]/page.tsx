"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { authClient } from "@/shared/lib/auth-client";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function SignInPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/admin/dashboard";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const result = await authClient.signIn.email({
                email,
                password,
                rememberMe: true,
            });

            if (result.error) {
                setError(result.error.message ?? "Credenciais invalidas.");
                return;
            }

            router.push(redirectTo);
            router.refresh();
        } catch {
            setError("Nao foi possivel iniciar sessao.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-180px)] items-center justify-center bg-gray-50 px-4 py-16">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-900 text-white">
                        <LogIn className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Entrar na Beasell</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Use o seu email e palavra-passe para aceder.
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Palavra-passe</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                            minLength={8}
                            required
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                            {error}
                        </p>
                    )}

                    <Button type="submit" className="h-11 w-full bg-blue-900 text-white" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                A entrar...
                            </>
                        ) : (
                            "Entrar"
                        )}
                    </Button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Ainda nao tem conta?{" "}
                    <Link href="/sign-up" className="font-semibold text-blue-900 hover:underline">
                        Criar conta
                    </Link>
                </p>
            </form>
        </div>
    );
}
