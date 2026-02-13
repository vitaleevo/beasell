import { Button } from "@/shared/components/ui/button";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center">
            <ShieldAlert className="h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Acesso Negado</h1>
            <p className="text-gray-600 mb-8 max-w-md">
                Não tens permissões suficientes para aceder a esta área.
                Se achas que isto é um erro, contacta o administrador.
            </p>
            <div className="flex gap-4">
                <Link href="/">
                    <Button variant="outline">Voltar ao Início</Button>
                </Link>
                <Link href="/contacto">
                    <Button className="bg-blue-900 text-white">Contactar Suporte</Button>
                </Link>
            </div>
        </div>
    );
}
