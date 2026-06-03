import { Badge } from "@/shared/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CheckCircle2, KeyRound, Settings, ShieldCheck, XCircle } from "lucide-react";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";

const requiredEnv = [
  {
    name: "SITE_URL",
    description: "URL base usada pelo Better Auth para callbacks e origem da aplicacao.",
    value: process.env.SITE_URL,
    sensitive: false,
  },
  {
    name: "BETTER_AUTH_TRUSTED_ORIGINS",
    description: "Origens permitidas para o fluxo de autenticacao local e producao.",
    value: process.env.BETTER_AUTH_TRUSTED_ORIGINS,
    sensitive: false,
  },
  {
    name: "NEXT_PUBLIC_CONVEX_URL",
    description: "Deployment Convex usado pelo cliente Next.js.",
    value: process.env.NEXT_PUBLIC_CONVEX_URL,
    sensitive: false,
  },
  {
    name: "NEXT_PUBLIC_CONVEX_SITE_URL",
    description: "Endpoint HTTP do Convex usado pelas rotas de autenticacao.",
    value: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
    sensitive: false,
  },
  {
    name: "BETTER_AUTH_SECRET",
    description: "Segredo usado para assinar sessoes. Deve ficar apenas no ambiente do servidor.",
    value: process.env.BETTER_AUTH_SECRET,
    sensitive: true,
  },
  {
    name: "ADMIN_EMAILS",
    description: "Lista de emails que recebem o papel de administrador/dono.",
    value: process.env.ADMIN_EMAILS,
    sensitive: true,
  },
];

export default function AdminSettingsPage() {
  const configuredCount = requiredEnv.filter((item) => Boolean(item.value)).length;
  const adminEmailCount = process.env.ADMIN_EMAILS
    ? process.env.ADMIN_EMAILS.split(",")
        .map((email) => email.trim())
        .filter(Boolean).length
    : 0;

  return (
    <AdminPageShell className="max-w-6xl">
      <AdminPageHeader
        eyebrow="Definições do sistema"
        icon={Settings}
        title="Configuração do Backoffice"
        description="Verifique se o ambiente local está pronto para autenticação, Convex e acesso do dono."
        actions={
          <Card className="w-full border-0 shadow-sm md:w-64">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-900">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ambiente</p>
                <p className="text-2xl font-black text-gray-900">
                  {configuredCount}/{requiredEnv.length}
                </p>
              </div>
            </CardContent>
          </Card>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <KeyRound className="h-5 w-5 text-blue-900" />
              Variaveis obrigatorias
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {requiredEnv.map((item) => {
              const configured = Boolean(item.value);

              return (
                <div
                  key={item.name}
                  className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold text-gray-900">{item.name}</span>
                      {item.sensitive && (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          privado
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                  </div>

                  <Badge
                    className={
                      configured
                        ? "w-fit border-green-200 bg-green-50 text-green-700"
                        : "w-fit border-red-200 bg-red-50 text-red-700"
                    }
                    variant="outline"
                  >
                    {configured ? (
                      <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="mr-1 h-3.5 w-3.5" />
                    )}
                    {configured ? "Configurado" : "Em falta"}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Acesso do dono</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500">Emails admin configurados</p>
              <p className="mt-2 text-3xl font-black text-gray-900">{adminEmailCount}</p>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">
              O primeiro acesso administrativo depende do email estar em{" "}
              <span className="font-mono font-semibold text-gray-900">ADMIN_EMAILS</span>. Novos
              utilizadores fora dessa lista entram como alunos.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminPageShell>
  );
}
