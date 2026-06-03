"use client";

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
  AlertTriangle,
  BookOpen,
  Calendar,
  Download,
  Mail,
  Search,
  Shield,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

type StudentFilter = "all" | "with_courses" | "no_courses" | "payment_attention" | "completed";

const filterLabels: Record<StudentFilter, string> = {
  all: "Todos",
  with_courses: "Com cursos",
  no_courses: "Sem cursos",
  payment_attention: "Pagamento pendente",
  completed: "Com conclusão",
};

function formatDate(timestamp: number | null | undefined) {
  if (!timestamp) return "Sem actividade";
  return new Intl.DateTimeFormat("pt-AO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(timestamp));
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency: "AOA",
    maximumFractionDigits: 0,
  }).format(value);
}

function csvCell(value: string | number | null | undefined) {
  const safeValue = String(value ?? "").replaceAll('"', '""');
  return `"${safeValue}"`;
}

export default function StudentManagerPage() {
  const [filter, setFilter] = useState<StudentFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const rows = useQuery(api.users.listStudentsForAdmin);

  const summary = useMemo(() => {
    if (!rows) {
      return {
        totalStudents: 0,
        withCourses: 0,
        paymentAttention: 0,
        completedStudents: 0,
      };
    }

    return {
      totalStudents: rows.length,
      withCourses: rows.filter((row) => row.stats.totalCourses > 0).length,
      paymentAttention: rows.filter((row) => row.stats.pendingPayments > 0).length,
      completedStudents: rows.filter((row) => row.stats.completedCourses > 0).length,
    };
  }, [rows]);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const visibleRows = rows?.filter((row) => {
    const matchesSearch =
      !normalizedSearch ||
      [
        row.user.name,
        row.user.email,
        row.user.status,
        filterLabels[filter],
        row.stats.totalCourses,
        row.stats.completedCourses,
        row.stats.pendingPayments,
      ].some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(normalizedSearch),
      );

    if (!matchesSearch) return false;

    if (filter === "with_courses") return row.stats.totalCourses > 0;
    if (filter === "no_courses") return row.stats.totalCourses === 0;
    if (filter === "payment_attention") return row.stats.pendingPayments > 0;
    if (filter === "completed") return row.stats.completedCourses > 0;
    return true;
  });

  const handleExport = () => {
    if (!visibleRows || visibleRows.length === 0) return;

    const header = [
      "Aluno",
      "Email",
      "Estado",
      "Cursos",
      "Activos",
      "Concluidos",
      "Pagamentos pendentes",
      "Pagamentos rejeitados",
      "Certificados",
      "Progresso medio",
      "Valor pago",
      "Ultima actividade",
    ];
    const body = visibleRows.map((row) => [
      row.user.name,
      row.user.email,
      row.user.status,
      row.stats.totalCourses,
      row.stats.activeEnrollments,
      row.stats.completedCourses,
      row.stats.pendingPayments,
      row.stats.rejectedPayments,
      row.stats.certificatesEarned,
      row.stats.averageProgress,
      row.stats.totalAmountPaid,
      row.stats.lastActivity ? new Date(row.stats.lastActivity).toISOString() : "",
    ]);
    const csv = [header, ...body].map((line) => line.map(csvCell).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `beasell-alunos-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Alunos"
        icon={Users}
        title="Gestão de Alunos"
        description="Acompanhe alunos, pagamentos, progresso e exportações operacionais."
        actions={
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <label htmlFor="student-search" className="sr-only">
                Pesquisar alunos
              </label>
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="student-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Pesquisar"
                className="h-10 bg-white pl-9 sm:w-56"
              />
            </div>
            <label htmlFor="student-filter" className="sr-only">
              Filtrar alunos
            </label>
            <select
              id="student-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value as StudentFilter)}
              className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm transition-colors outline-none focus:border-blue-900"
            >
              {Object.entries(filterLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="outline"
              className="h-10 bg-white"
              disabled={!visibleRows || visibleRows.length === 0}
              onClick={handleExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[
          {
            label: "Alunos",
            value: summary.totalStudents,
            icon: Users,
            className: "bg-blue-50 text-blue-700",
          },
          {
            label: "Com cursos",
            value: summary.withCourses,
            icon: BookOpen,
            className: "bg-green-50 text-green-700",
          },
          {
            label: "Pagamentos",
            value: summary.paymentAttention,
            icon: AlertTriangle,
            className: "bg-amber-50 text-amber-700",
          },
          {
            label: "Concluiram",
            value: summary.completedStudents,
            icon: Trophy,
            className: "bg-violet-50 text-violet-700",
          },
        ].map((item) => (
          <Card key={item.label} className="border-0 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.className}`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  {item.label}
                </p>
                <p className="text-2xl font-black text-gray-900">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>
            Alunos ({visibleRows?.length ?? 0}
            {rows ? ` de ${rows.length}` : ""})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-4 md:hidden">
            {rows === undefined ? (
              <p className="py-6 text-center text-sm text-gray-400">A carregar utilizadores...</p>
            ) : !visibleRows || visibleRows.length === 0 ? (
              <p className="py-6 text-center text-sm text-gray-400">
                Nenhum aluno encontrado para este filtro.
              </p>
            ) : (
              visibleRows.map((row) => {
                const initials = row.user.name.substring(0, 2).toUpperCase();

                return (
                  <div key={row.user._id} className="rounded-xl border border-gray-100 p-4">
                    <div className="flex min-w-0 items-start gap-3">
                      <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={row.user.imageUrl ?? undefined} alt={row.user.name} />
                        <AvatarFallback className="bg-blue-100 font-bold text-blue-900">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold break-words text-gray-900">{row.user.name}</p>
                        <p className="mt-1 text-xs break-all text-gray-500">{row.user.email}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-gray-500">
                      <span>{row.stats.totalCourses} cursos</span>
                      <span>{row.stats.averageProgress}% progresso</span>
                      <span>{row.stats.pendingPayments} pagamentos pendentes</span>
                      <span>{formatDate(row.stats.lastActivity)}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <Badge variant="outline" className="flex w-fit items-center gap-1">
                        <Shield className="h-3 w-3" />
                        {row.user.status === "active" ? "Activo" : row.user.status}
                      </Badge>
                      <Link
                        href={`/admin/alunos/${row.user._id}`}
                        className="text-sm font-semibold text-blue-900 hover:underline"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Aprendizagem</TableHead>
                  <TableHead>Pagamentos</TableHead>
                  <TableHead>Última actividade</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows === undefined ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-gray-400">
                      A carregar utilizadores...
                    </TableCell>
                  </TableRow>
                ) : !visibleRows || visibleRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-gray-400">
                      Nenhum aluno encontrado para este filtro.
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleRows.map((row) => {
                    const initials = row.user.name.substring(0, 2).toUpperCase();
                    const paymentClass =
                      row.stats.pendingPayments > 0
                        ? "bg-amber-100 text-amber-700"
                        : row.stats.rejectedPayments > 0
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700";
                    const paymentText =
                      row.stats.pendingPayments > 0
                        ? `${row.stats.pendingPayments} por rever`
                        : row.stats.rejectedPayments > 0
                          ? `${row.stats.rejectedPayments} rejeitado`
                          : `${row.stats.approvedPayments} aprovado`;

                    return (
                      <TableRow key={row.user._id}>
                        <TableCell>
                          <div className="flex min-w-64 items-center gap-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage
                                src={row.user.imageUrl ?? undefined}
                                alt={row.user.name}
                              />
                              <AvatarFallback className="bg-blue-100 font-bold text-blue-900">
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate font-medium text-gray-900">{row.user.name}</p>
                              <p className="mt-1 flex items-center text-xs text-gray-500">
                                <Mail className="mr-1 h-3 w-3 shrink-0" />
                                <span className="truncate">{row.user.email}</span>
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="min-w-40">
                            <p className="text-sm font-semibold text-gray-900">
                              {row.stats.totalCourses} cursos
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              {row.stats.completedCourses} concluidos, {row.stats.averageProgress}%
                              médio
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={paymentClass}>{paymentText}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex min-w-36 items-center text-xs text-gray-500">
                            <Calendar className="mr-1 h-3 w-3 shrink-0" />
                            {formatDate(row.stats.lastActivity)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-semibold text-gray-900">
                            {formatCurrency(row.stats.totalAmountPaid)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/admin/alunos/${row.user._id}`}
                            className="text-sm font-medium text-blue-900 hover:underline"
                          >
                            Detalhes
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminPageShell>
  );
}
