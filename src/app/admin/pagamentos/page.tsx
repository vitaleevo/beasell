"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import { useState } from "react";
import { toast } from "sonner";
import {
  CheckCircle2,
  CreditCard,
  Download,
  ExternalLink,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

type PaymentFilter = "all" | "pending" | "submitted" | "approved" | "rejected";

const statusLabels: Record<string, string> = {
  pending: "Pendente",
  submitted: "Submetido",
  approved: "Aprovado",
  rejected: "Rejeitado",
};

const statusClasses: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  submitted: "bg-blue-50 text-blue-700 border-blue-200",
  approved: "bg-green-50 text-green-700 border-green-200",
  rejected: "bg-red-50 text-red-700 border-red-200",
};

function formatCurrency(value: number, currency = "AOA") {
  return new Intl.NumberFormat("pt-AO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(timestamp: number | null | undefined) {
  if (!timestamp) return "Sem registo";
  return new Intl.DateTimeFormat("pt-AO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(timestamp));
}

function csvCell(value: string | number | null | undefined) {
  const safeValue = String(value ?? "").replaceAll('"', '""');
  return `"${safeValue}"`;
}

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState<PaymentFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const payments = useQuery(api.payments.listForAdmin, filter === "all" ? {} : { status: filter });
  const approvePayment = useMutation(api.payments.approve);
  const rejectPayment = useMutation(api.payments.reject);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [rejectionTarget, setRejectionTarget] = useState<Id<"payments"> | null>(null);
  const [rejectionNote, setRejectionNote] = useState("");

  const handleApprove = async (paymentId: Id<"payments">) => {
    if (!window.confirm("Aprovar este pagamento e liberar o acesso do aluno?")) return;

    setLoadingId(paymentId);
    try {
      await approvePayment({ paymentId });
      toast.success("Pagamento aprovado e acesso liberado.");
    } catch {
      toast.error("Não foi possível aprovar o pagamento.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleReject = async (paymentId: Id<"payments">) => {
    setRejectionTarget(paymentId);
    setRejectionNote("");
  };

  const confirmReject = async () => {
    if (!rejectionTarget) return;
    const adminNote = rejectionNote.trim();
    if (adminNote.length < 8) {
      toast.error("Informe um motivo com pelo menos 8 caracteres.");
      return;
    }

    setLoadingId(rejectionTarget);
    try {
      await rejectPayment({ paymentId: rejectionTarget, adminNote });
      toast.success("Pagamento rejeitado.");
      setRejectionTarget(null);
      setRejectionNote("");
    } catch {
      toast.error("Não foi possível rejeitar o pagamento.");
    } finally {
      setLoadingId(null);
    }
  };

  const summary = payments
    ? {
        pending: payments.filter((row) => row.payment.status === "pending").length,
        submitted: payments.filter((row) => row.payment.status === "submitted").length,
        approved: payments.filter((row) => row.payment.status === "approved").length,
        rejected: payments.filter((row) => row.payment.status === "rejected").length,
      }
    : { pending: 0, submitted: 0, approved: 0, rejected: 0 };
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const visiblePayments = payments?.filter(({ payment, user, course }) => {
    if (!normalizedSearch) return true;

    return [
      user?.name,
      user?.email,
      course?.title,
      payment.method,
      payment.reference,
      payment.status,
      statusLabels[payment.status],
      payment.adminNote,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedSearch));
  });

  const handleExport = () => {
    if (!visiblePayments || visiblePayments.length === 0) return;

    const header = [
      "Aluno",
      "Email",
      "Curso",
      "Valor",
      "Moeda",
      "Estado",
      "Metodo",
      "Referencia",
      "Nota admin",
      "Actualizado",
    ];
    const rows = visiblePayments.map(({ payment, user, course }) => [
      user?.name || user?.email || "Aluno",
      user?.email ?? "",
      course?.title ?? "Curso removido",
      payment.amount,
      payment.currency,
      statusLabels[payment.status] ?? payment.status,
      payment.method ?? "",
      payment.reference ?? "",
      payment.adminNote ?? "",
      new Date(payment.updatedAt).toISOString(),
    ]);
    const csv = [header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `beasell-pagamentos-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Operação"
        icon={CreditCard}
        title="Gestão de Pagamentos"
        description="Aprove comprovativos, liberte acessos e acompanhe pagamentos manuais dos cursos."
        actions={
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <label htmlFor="payment-search" className="sr-only">
                Pesquisar pagamentos
              </label>
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="payment-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Pesquisar"
                className="h-10 bg-white pl-9 sm:w-56"
              />
            </div>
            <label htmlFor="payment-filter" className="sr-only">
              Filtrar pagamentos
            </label>
            <select
              id="payment-filter"
              value={filter}
              onChange={(event) => setFilter(event.target.value as PaymentFilter)}
              className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm font-semibold text-gray-700 outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="all">Todos</option>
              <option value="pending">Pendentes</option>
              <option value="submitted">Submetidos</option>
              <option value="approved">Aprovados</option>
              <option value="rejected">Rejeitados</option>
            </select>
            <Button
              type="button"
              variant="outline"
              className="h-10 bg-white"
              disabled={!visiblePayments || visiblePayments.length === 0}
              onClick={handleExport}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Pendentes", value: summary.pending, className: "text-amber-700 bg-amber-50" },
          { label: "Submetidos", value: summary.submitted, className: "text-blue-700 bg-blue-50" },
          { label: "Aprovados", value: summary.approved, className: "text-green-700 bg-green-50" },
          { label: "Rejeitados", value: summary.rejected, className: "text-red-700 bg-red-50" },
        ].map((item) => (
          <Card key={item.label} className="border-0 shadow-sm">
            <CardContent className="p-5">
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                {item.label}
              </p>
              <p
                className={`mt-3 w-fit rounded-xl px-3 py-1 text-3xl font-black ${item.className}`}
              >
                {item.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Pedidos de pagamento</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-3 p-4 md:hidden">
            {payments === undefined ? (
              <p className="py-6 text-center text-sm text-gray-400">A carregar pagamentos...</p>
            ) : !visiblePayments || visiblePayments.length === 0 ? (
              <p className="py-6 text-center text-sm text-gray-400">
                Nenhum pagamento encontrado para este filtro.
              </p>
            ) : (
              visiblePayments.map(({ payment, user, course }) => (
                <div key={payment._id} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold break-words text-gray-900">
                        {user?.name || user?.email || "Aluno"}
                      </p>
                      <p className="mt-1 text-xs break-all text-gray-400">{user?.email}</p>
                    </div>
                    <Badge
                      variant="outline"
                      className={statusClasses[payment.status] ?? "bg-gray-50 text-gray-700"}
                    >
                      {statusLabels[payment.status] ?? payment.status}
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-3 text-sm">
                    <div>
                      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Curso
                      </p>
                      {course ? (
                        <Link
                          href={`/admin/cursos/${course._id}`}
                          className="font-semibold break-words text-blue-900 hover:underline"
                        >
                          {course.title}
                        </Link>
                      ) : (
                        <span className="text-gray-400">Curso removido</span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                          Valor
                        </p>
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(payment.amount, payment.currency)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                          Actualizado
                        </p>
                        <p className="text-gray-600">{formatDate(payment.updatedAt)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Comprovativo
                      </p>
                      <p className="text-gray-600">{payment.method ?? "Método não informado"}</p>
                      {payment.reference && (
                        <p className="text-xs break-all text-gray-400">Ref: {payment.reference}</p>
                      )}
                      {payment.proofUrl && (
                        <Link
                          href={payment.proofUrl}
                          target="_blank"
                          className="mt-1 inline-flex items-center font-bold text-blue-900 hover:underline"
                        >
                          Abrir <ExternalLink className="ml-1 h-3 w-3" />
                        </Link>
                      )}
                      {payment.adminNote && (
                        <p className="mt-2 rounded-lg bg-red-50 p-2 text-xs font-medium text-red-700">
                          Motivo: {payment.adminNote}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-green-700 text-white hover:bg-green-800"
                      disabled={loadingId === payment._id || payment.status !== "submitted"}
                      onClick={() => handleApprove(payment._id)}
                    >
                      {loadingId === payment._id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                      )}
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-red-700"
                      disabled={loadingId === payment._id || payment.status !== "submitted"}
                      onClick={() => handleReject(payment._id)}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Rejeitar
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="hidden overflow-x-auto md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Curso</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Comprovativo</TableHead>
                  <TableHead>Actualizado</TableHead>
                  <TableHead className="text-right">Acções</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments === undefined ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-gray-400">
                      A carregar pagamentos...
                    </TableCell>
                  </TableRow>
                ) : !visiblePayments || visiblePayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-gray-400">
                      Nenhum pagamento encontrado para este filtro.
                    </TableCell>
                  </TableRow>
                ) : (
                  visiblePayments.map(({ payment, user, course }) => (
                    <TableRow key={payment._id}>
                      <TableCell>
                        <div className="min-w-48">
                          <p className="font-semibold text-gray-900">
                            {user?.name || user?.email || "Aluno"}
                          </p>
                          <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {course ? (
                          <Link
                            href={`/admin/cursos/${course._id}`}
                            className="min-w-56 font-semibold text-blue-900 hover:underline"
                          >
                            {course.title}
                          </Link>
                        ) : (
                          <span className="text-gray-400">Curso removido</span>
                        )}
                      </TableCell>
                      <TableCell>{formatCurrency(payment.amount, payment.currency)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusClasses[payment.status] ?? "bg-gray-50 text-gray-700"}
                        >
                          {statusLabels[payment.status] ?? payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="min-w-40 text-xs text-gray-500">
                          <p>{payment.method ?? "Método não informado"}</p>
                          {payment.reference && <p>Ref: {payment.reference}</p>}
                          {payment.proofUrl && (
                            <Link
                              href={payment.proofUrl}
                              target="_blank"
                              className="mt-1 inline-flex items-center font-bold text-blue-900 hover:underline"
                            >
                              Abrir <ExternalLink className="ml-1 h-3 w-3" />
                            </Link>
                          )}
                          {payment.adminNote && (
                            <p className="mt-2 rounded-md bg-red-50 p-2 text-red-700">
                              Motivo: {payment.adminNote}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {formatDate(payment.updatedAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            className="bg-green-700 text-white hover:bg-green-800"
                            disabled={loadingId === payment._id || payment.status !== "submitted"}
                            onClick={() => handleApprove(payment._id)}
                          >
                            {loadingId === payment._id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-700"
                            disabled={loadingId === payment._id || payment.status !== "submitted"}
                            onClick={() => handleReject(payment._id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={Boolean(rejectionTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setRejectionTarget(null);
            setRejectionNote("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rejeitar pagamento</DialogTitle>
            <DialogDescription>
              Explique ao aluno o que precisa ser corrigido antes de reenviar o comprovativo.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectionNote}
            onChange={(event) => setRejectionNote(event.target.value)}
            className="min-h-28"
            placeholder="Ex: O comprovativo não mostra o valor total ou a referência bancária."
          />
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setRejectionTarget(null);
                setRejectionNote("");
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              className="bg-red-700 text-white hover:bg-red-800"
              disabled={loadingId === rejectionTarget}
              onClick={confirmReject}
            >
              Confirmar rejeição
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminPageShell>
  );
}
