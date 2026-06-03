"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus } from "lucide-react";
import { authClient } from "@/shared/lib/auth-client";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

export default function SignUpPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const result = await authClient.signUp.email({
                name,
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message ?? "Nao foi possivel criar a conta.");
                return;
            }

            router.push("/");
            router.refresh();
        } catch {
            setError("Nao foi possivel criar a conta.");
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
                        <UserPlus className="h-6 w-6" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Criar conta</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Registe-se para aceder aos cursos e conteudos reservados.
                    </p>
                </div>

                <div className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name"
                            required
                        />
                    </div>

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
                            autoComplete="new-password"
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
                                A criar...
                            </>
                        ) : (
                            "Criar conta"
                        )}
                    </Button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-500">
                    Ja tem conta?{" "}
                    <Link href="/sign-in" className="font-semibold text-blue-900 hover:underline">
                        Entrar
                    </Link>
                </p>
            </form>
        </div>
    );
}
