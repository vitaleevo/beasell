"use client";

import React, { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { Plus, Edit, Trash2, DollarSign, Star, Info, History, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import type { Doc } from "@convex/_generated/dataModel";
import { AdminPageHeader, AdminPageShell } from "@/shared/components/layout/AdminPageShell";
import { Badge } from "@/shared/components/ui/badge";

type ServiceDoc = Doc<"services">;
type ServiceCategory = "individual" | "empresarial" | "workshop" | "consultoria";
type ServiceCurrency = "AOA" | "USD" | "EUR";

type ServiceFormData = {
  name: string;
  description: string;
  price: number;
  currency: ServiceCurrency;
  duration: string;
  features: string[];
  popular: boolean;
  category: ServiceCategory;
};

type ServiceFormState = Omit<ServiceFormData, "features"> & {
  features: string;
};

export default function PriceManagerPage() {
  const services = useQuery(api.services.list);
  const auditLogs = useQuery(api.auditLogs.listForAdmin, { resourceType: "service", limit: 12 });
  const createService = useMutation(api.services.create);
  const updateService = useMutation(api.services.update);
  const removeService = useMutation(api.services.remove);

  const [editingService, setEditingService] = useState<ServiceDoc | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [savingService, setSavingService] = useState(false);
  const [deletingService, setDeletingService] = useState<ServiceDoc | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleUpdateService = async (values: ServiceFormData) => {
    setSavingService(true);
    try {
      if (editingService) {
        await updateService({ id: editingService._id, ...values });
        toast.success("Serviço actualizado");
      } else {
        await createService(values);
        toast.success("Serviço criado");
      }
      setIsDialogOpen(false);
      setEditingService(null);
    } catch {
      toast.error("Erro ao guardar serviço");
    } finally {
      setSavingService(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingService) return;
    setDeletingId(deletingService._id);
    try {
      await removeService({ id: deletingService._id });
      toast.success("Serviço removido");
      setDeletingService(null);
    } catch {
      toast.error("Erro ao remover serviço");
    } finally {
      setDeletingId(null);
    }
  };

  const categories: { key: ServiceCategory; label: string }[] = [
    { key: "individual", label: "Formação Individual" },
    { key: "empresarial", label: "Formação Empresarial" },
    { key: "workshop", label: "Workshops" },
    { key: "consultoria", label: "Consultoria" },
  ];

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Configurações"
        icon={DollarSign}
        title="Gestão de Preços"
        description="Gira os pacotes de serviços e preços da Beasell."
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-blue-900 text-white shadow-lg hover:bg-blue-800"
                onClick={() => setEditingService(null)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Serviço
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-blue-900">
                  {editingService ? "Editar Serviço" : "Criar Novo Serviço"}
                </DialogTitle>
              </DialogHeader>
              <ServiceEditor
                service={editingService}
                onSave={handleUpdateService}
                saving={savingService}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingService(null);
                }}
              />
            </DialogContent>
          </Dialog>
        }
      />

      {services === undefined ? (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 text-sm font-medium text-gray-500">
            A carregar serviços...
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            {categories.map((category) => (
              <Card key={category.key} className="border-0 border-l-4 border-blue-900 shadow-sm">
                <CardContent className="p-6">
                  <p className="mb-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
                    {category.label}
                  </p>
                  <p className="text-3xl font-black text-gray-900">
                    {services.filter((s) => s.category === category.key).length}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.7fr]">
            <Card className="border-0 shadow-sm">
              <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-green-700" />
                  <div>
                    <h2 className="font-bold text-gray-950">Controlo de preços activo</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-500">
                      Alterações de preço, criação e remoção de serviços ficam registadas no
                      histórico administrativo.
                    </p>
                  </div>
                </div>
                <Badge className="w-fit bg-green-50 text-green-700">
                  {services.filter((service) => service.popular).length} em destaque
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Total de pacotes
                </p>
                <p className="mt-2 text-3xl font-black text-gray-950">{services.length}</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-12">
            {categories.map((category) => {
              const categoryServices = services.filter((s) => s.category === category.key);
              if (categoryServices.length === 0) return null;

              return (
                <div key={category.key} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-900">{category.label}</h2>
                    <div className="h-[1px] flex-1 bg-gray-200" />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {categoryServices.map((service) => (
                      <Card
                        key={service._id}
                        className="group relative overflow-hidden border-gray-100 transition-all duration-300 hover:shadow-xl"
                      >
                        {service.popular && (
                          <div className="absolute top-0 right-0 z-10 flex items-center gap-1 rounded-bl-xl bg-blue-900 px-4 py-1 text-white">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="text-[10px] font-bold tracking-tighter uppercase">
                              Popular
                            </span>
                          </div>
                        )}

                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-xl leading-tight font-bold text-blue-900 group-hover:text-blue-700">
                              {service.name}
                            </CardTitle>
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                            {service.description}
                          </p>
                        </CardHeader>

                        <CardContent className="space-y-6 pt-0">
                          <div className="space-y-2 rounded-xl bg-gray-50 p-4">
                            <div className="flex items-end justify-between">
                              <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
                                Investimento
                              </span>
                              <div className="text-right">
                                <span className="text-2xl font-black text-gray-900">
                                  {service.price.toLocaleString("pt-AO")}
                                </span>
                                <span className="ml-1 text-sm font-bold text-blue-900">
                                  {service.currency}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 border-t border-gray-200/50 pt-2 text-xs font-medium text-gray-500">
                              <DollarSign className="h-3 w-3" />
                              Duração: {service.duration}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                              Incluído:
                            </p>
                            <ul className="space-y-2">
                              {service.features.map((feature: string, index: number) => (
                                <li key={index} className="group/li flex items-start gap-3">
                                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-900 transition-transform group-hover/li:scale-150" />
                                  <span className="text-sm leading-tight font-medium text-gray-600">
                                    {feature}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex gap-2 border-t pt-4">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="flex-1 bg-gray-50 text-gray-600 shadow-none transition-all hover:bg-blue-900 hover:text-white"
                              onClick={() => {
                                setEditingService(service);
                                setIsDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-3 w-3" /> Editar
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-9 w-9 p-0 text-red-400 hover:bg-red-50 hover:text-red-600"
                              onClick={() => setDeletingService(service)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5 text-blue-900" />
                Histórico recente de preços
              </CardTitle>
            </CardHeader>
            <CardContent>
              {auditLogs === undefined ? (
                <p className="text-sm text-gray-400">A carregar histórico...</p>
              ) : auditLogs.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Ainda não há alterações registadas em preços.
                </p>
              ) : (
                <div className="space-y-3">
                  {auditLogs.map((entry) => (
                    <div
                      key={entry._id}
                      className="flex flex-col gap-2 rounded-lg border border-gray-100 p-3 sm:flex-row sm:items-start sm:justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{entry.summary}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          {entry.actorEmail ?? "Admin"} · {entry.action}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-medium text-gray-400">
                        {new Intl.DateTimeFormat("pt-AO", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(entry.createdAt))}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Dialog
            open={Boolean(deletingService)}
            onOpenChange={(open) => !open && setDeletingService(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remover serviço</DialogTitle>
                <DialogDescription>
                  Esta ação remove o pacote da gestão de preços e será registada no histórico.
                </DialogDescription>
              </DialogHeader>
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                {deletingService
                  ? `Serviço: ${deletingService.name}`
                  : "Nenhum serviço selecionado."}
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setDeletingService(null)}>
                  Cancelar
                </Button>
                <Button
                  className="bg-red-700 text-white hover:bg-red-800"
                  disabled={deletingId === deletingService?._id}
                  onClick={handleDelete}
                >
                  Confirmar remoção
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </AdminPageShell>
  );
}

function ServiceEditor({
  service,
  onSave,
  saving,
  onCancel,
}: {
  service: ServiceDoc | null;
  onSave: (values: ServiceFormData) => void | Promise<void>;
  saving?: boolean;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<ServiceFormState>({
    name: service?.name || "",
    description: service?.description || "",
    price: service?.price || 0,
    currency: (service?.currency as ServiceCurrency | undefined) || "AOA",
    duration: service?.duration || "",
    features: service?.features?.join("\n") || "",
    popular: service?.popular || false,
    category: (service?.category as ServiceCategory | undefined) || "individual",
  });
  const [priceChangeConfirmed, setPriceChangeConfirmed] = useState(false);
  const hasPriceChange = Boolean(service && Number(formData.price) !== service.price);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hasPriceChange && !priceChangeConfirmed) {
      setPriceChangeConfirmed(true);
      return;
    }

    const serviceData: ServiceFormData = {
      ...formData,
      features: formData.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    };
    onSave(serviceData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      <div className="space-y-4">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700 italic">
            <Info className="h-3 w-3" /> Nome do Serviço
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="h-12 w-full rounded-xl border bg-gray-50 px-4 font-medium transition-all outline-none focus:ring-2 focus:ring-blue-900"
            placeholder="Ex: Formação VIP em Luanda"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700 italic">
            Descrição Curta
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full resize-none rounded-xl border bg-gray-50 p-4 font-medium transition-all outline-none focus:ring-2 focus:ring-blue-900"
            rows={2}
            placeholder="Resumo que aparecerá no card..."
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 italic">
              Investimento
            </label>
            <input
              type="number"
              min={0}
              value={formData.price}
              onChange={(e) => {
                setPriceChangeConfirmed(false);
                setFormData({ ...formData, price: Number(e.target.value) });
              }}
              className="h-12 w-full rounded-xl border bg-gray-50 px-4 font-medium transition-all outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 italic">Moeda</label>
            <select
              value={formData.currency}
              onChange={(e) =>
                setFormData({ ...formData, currency: e.target.value as ServiceCurrency })
              }
              className="h-12 w-full rounded-xl border bg-gray-50 px-4 font-medium transition-all outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="AOA">AOA</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700 italic">Duração</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="h-12 w-full rounded-xl border bg-gray-50 px-4 font-medium transition-all outline-none focus:ring-2 focus:ring-blue-900"
              placeholder="Ex: 8 horas"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700 italic">Categoria</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value as ServiceCategory })
            }
            className="h-12 w-full rounded-xl border bg-gray-50 px-4 font-medium transition-all outline-none focus:ring-2 focus:ring-blue-900"
            required
          >
            <option value="individual">Formação Individual</option>
            <option value="empresarial">Formação Empresarial</option>
            <option value="workshop">Workshops</option>
            <option value="consultoria">Consultoria</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold text-gray-700 italic">
            Características (uma por linha)
          </label>
          <textarea
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            className="w-full rounded-xl border bg-gray-50 p-4 font-medium transition-all outline-none focus:ring-2 focus:ring-blue-900"
            rows={4}
            placeholder="Acompanhamento personalizado&#10;Material didático&#10;Certificado Beasell"
            required
          />
        </div>

        {hasPriceChange && priceChangeConfirmed && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-bold">Confirme a alteração de preço</p>
            <p className="mt-1">
              O valor passa de {service?.price.toLocaleString("pt-AO")} {service?.currency} para{" "}
              {Number(formData.price).toLocaleString("pt-AO")} {formData.currency}. Submeta outra
              vez para guardar.
            </p>
          </div>
        )}

        <div className="flex items-center rounded-xl border border-blue-100 bg-blue-50/50 p-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm font-bold text-blue-900">
            <input
              type="checkbox"
              checked={formData.popular}
              onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
              className="h-5 w-5 rounded border-blue-900 text-blue-900 focus:ring-blue-900"
            />
            Destaque como &ldquo;Mais Procurado&rdquo;
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t pt-6">
        <Button type="button" variant="ghost" onClick={onCancel} className="text-gray-500">
          Cancelar
        </Button>
        <Button
          type="submit"
          className="min-w-[150px] bg-blue-900 text-white shadow-lg hover:bg-blue-800"
          disabled={saving}
        >
          {saving ? "A guardar..." : service ? "Guardar Alterações" : "Criar Serviço"}
        </Button>
      </div>
    </form>
  );
}
